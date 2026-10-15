import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '../../../lib/supabase/server';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || body.website) return NextResponse.json({ ok: true });

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim().toLowerCase();
  const message = String(body.message || '').trim();
  if (!name || name.length > 100 || !emailPattern.test(email) || email.length > 160 || !message || message.length > 1200) {
    return NextResponse.json({ error: 'Please check the required fields.' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) return NextResponse.json({ error: 'Lead storage is not configured.' }, { status: 503 });
  const { error } = await supabase.from('leads').insert({
    name, email, message,
    company: String(body.company || '').trim().slice(0, 120) || null,
    budget: String(body.budget || '').trim().slice(0, 80) || null,
    service: String(body.service || '').trim().slice(0, 160) || null,
    source_path: String(body.sourcePath || '').trim().slice(0, 300) || null,
  });
  if (error) return NextResponse.json({ error: 'Could not save inquiry.' }, { status: 500 });
  return NextResponse.json({ ok: true }, { status: 201 });
}
