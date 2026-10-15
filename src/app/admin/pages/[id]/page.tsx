import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { VisualPageEditor } from '../../../../components/admin/VisualPageEditor';

export const dynamic = 'force-dynamic';

export default async function EditPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ saved?: string, error?: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: page } = await supabase.from('pages').select('*').eq('id', id).maybeSingle();
  if (!page) notFound();
  const query = await searchParams;
  return <main className="cms-shell"><a href="/admin" className="cms-back">← Dashboard</a><section className="cms-card">
    <p className="cms-kicker">EDIT PAGE</p><h1>{page.title}</h1><p>Structured JSON keeps every designed section editable while preserving the existing layout and animations.</p>
    <VisualPageEditor page={{ id: page.id, title: page.title, status: page.status, content: page.content }} saved={query.saved} error={query.error} />
  </section></main>;
}
