'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../../lib/supabase/server';
import { LANDING_PAGES } from '../../data/landingPages';

export async function signIn(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin/login?error=Supabase%20is%20not%20configured');
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || ''),
  });
  if (error) redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  redirect('/admin');
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}

export async function savePage(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const id = String(formData.get('id') || '');
  let content: unknown;
  try { content = JSON.parse(String(formData.get('content') || '{}')); }
  catch { redirect(`/admin/pages/${id}?error=Content%20must%20be%20valid%20JSON`); }

  const status = formData.get('status') === 'published' ? 'published' : 'draft';
  const { error } = await supabase.from('pages').update({
    title: String(formData.get('title') || '').trim(), content, status,
    updated_at: new Date().toISOString(), updated_by: user.id,
  }).eq('id', id);
  if (error) redirect(`/admin/pages/${id}?error=${encodeURIComponent(error.message)}`);
  revalidatePath('/');
  revalidatePath(`/admin/pages/${id}`);
  redirect(`/admin/pages/${id}?saved=1`);
}

export async function createPage(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error('Supabase is not configured.');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const slug = String(formData.get('slug') || '').trim().toLowerCase();
  const title = String(formData.get('title') || '').trim();
  const templateSlug = String(formData.get('template') || 'top-web-development-companies');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !title) redirect('/admin/pages/new?error=Use%20a%20valid%20title%20and%20URL%20slug');
  const template = LANDING_PAGES.find((page) => page.slug === templateSlug) || LANDING_PAGES[0];
  const content = { ...template, slug, title, shortTitle: title.replace(/^Top /, '').slice(0, 80) };
  const { data, error } = await supabase.from('pages').insert({ slug, title, content, status: 'draft', updated_by: user.id }).select('id').single();
  if (error) redirect(`/admin/pages/new?error=${encodeURIComponent(error.message)}`);
  redirect(`/admin/pages/${data.id}`);
}
