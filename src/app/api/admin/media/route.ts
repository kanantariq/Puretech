import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { createSupabaseAdminClient, createSupabaseServerClient } from '../../../../lib/supabase/server';

export const runtime = 'nodejs';
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'video/mp4', 'video/webm']);

export async function POST(request: Request) {
  const session = await createSupabaseServerClient();
  if (!session) return NextResponse.json({ error: 'CMS is not configured.' }, { status: 503 });
  const { data: { user } } = await session.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
  const { data: profile } = await session.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (!profile || !['admin', 'editor'].includes(profile.role)) return NextResponse.json({ error: 'CMS access is required.' }, { status: 403 });

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File) || !ALLOWED.has(file.type)) return NextResponse.json({ error: 'Choose a JPG, PNG, WebP, GIF, SVG, MP4, or WebM file.' }, { status: 400 });
  const isVideo = file.type.startsWith('video/');
  const limit = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > limit) return NextResponse.json({ error: `${isVideo ? 'Videos' : 'Images'} must be smaller than ${isVideo ? '50' : '10'} MB.` }, { status: 413 });

  const admin = createSupabaseAdminClient();
  if (!admin) return NextResponse.json({ error: 'Media storage is not configured.' }, { status: 503 });
  const bucket = 'cms-media';
  const buckets = await admin.storage.listBuckets();
  if (buckets.error) return NextResponse.json({ error: 'Could not access media storage.' }, { status: 500 });
  if (!buckets.data.some(item => item.name === bucket)) {
    const created = await admin.storage.createBucket(bucket, { public: true, fileSizeLimit: 50 * 1024 * 1024, allowedMimeTypes: [...ALLOWED] });
    if (created.error) return NextResponse.json({ error: 'Could not create the media library.' }, { status: 500 });
  }
  const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '').toLowerCase() || (isVideo ? 'mp4' : 'bin');
  const path = `${isVideo ? 'videos' : 'images'}/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`;
  const uploaded = await admin.storage.from(bucket).upload(path, file, { contentType: file.type, upsert: false, cacheControl: '31536000' });
  if (uploaded.error) return NextResponse.json({ error: uploaded.error.message }, { status: 500 });
  const { data } = admin.storage.from(bucket).getPublicUrl(path);
  await admin.from('media').insert({ storage_path: path, alt_text: file.name.replace(/\.[^.]+$/, ''), metadata: { name: file.name, size: file.size, type: file.type }, created_by: user.id });
  return NextResponse.json({ url: data.publicUrl, path }, { status: 201 });
}
