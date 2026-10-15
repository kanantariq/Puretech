import { redirect } from 'next/navigation';
import { LANDING_PAGES } from '../../../../data/landingPages';
import { createSupabaseServerClient } from '../../../../lib/supabase/server';
import { createPage } from '../../actions';

export const dynamic = 'force-dynamic';

export default async function NewPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect('/admin');
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');
  const { error } = await searchParams;
  return <main className="cms-shell"><a href="/admin" className="cms-back">← Dashboard</a><section className="cms-card cms-login">
    <p className="cms-kicker">CREATE PAGE</p><h1>Start a landing page</h1><p>Choose the closest designed page as a starting point. The new page is created as a draft and can be edited before publishing.</p>
    {error && <div className="cms-alert">{error}</div>}
    <form action={createPage} className="cms-form">
      <label>Page title<input name="title" placeholder="Top Ecommerce Development Companies" required /></label>
      <label>URL slug<input name="slug" placeholder="top-ecommerce-development-companies" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></label>
      <label>Design/content starting point<select name="template">{LANDING_PAGES.map(page => <option value={page.slug} key={page.slug}>{page.title}</option>)}</select></label>
      <button type="submit">Create draft page</button>
    </form>
  </section></main>;
}
