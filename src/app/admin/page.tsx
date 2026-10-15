import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LANDING_PAGES } from '../../data/landingPages';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../lib/supabase/server';
import { signOut } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  if (!isSupabaseConfigured()) return <main className="cms-shell"><section className="cms-card"><p className="cms-kicker">PURETECH CMS</p><h1>Connect Supabase</h1><p>The dashboard code and database migration are ready. Add the keys from <code>.env.example</code>, run the SQL migration, then seed the seven pages.</p></section></main>;
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase!.auth.getUser();
  if (!user) redirect('/admin/login');
  const { data: pages } = await supabase!.from('pages').select('id,slug,title,status,updated_at').order('title');
  const { count: leadCount } = await supabase!.from('leads').select('*', { count: 'exact', head: true });
  return <main className="cms-shell"><header className="cms-header"><div><p className="cms-kicker">PURETECH CMS</p><h1>Content dashboard</h1></div><form action={signOut}><button className="cms-secondary">Sign out</button></form></header>
    <section className="cms-stats"><div><strong>{pages?.length ?? 0}</strong><span>Managed pages</span></div><div><strong>{leadCount ?? 0}</strong><span>Captured leads</span></div><div><strong>{pages?.filter(p => p.status === 'published').length ?? 0}</strong><span>Published</span></div></section>
    <section className="cms-card"><div className="cms-section-title"><div><h2>Landing pages</h2><span>Database content overrides the bundled fallback after publishing.</span></div><Link className="cms-create" href="/admin/pages/new">+ New page</Link></div>
      <div className="cms-list">{pages?.map(page => <Link href={`/admin/pages/${page.id}`} key={page.id}><span><strong>{page.title}</strong><small>/{page.slug}</small></span><b>{page.status}</b></Link>)}</div>
      {!pages?.length && <p>No database pages yet. Run <code>pnpm seed:content</code> after adding your Supabase keys. {LANDING_PAGES.length} bundled pages are ready to import.</p>}
    </section>
  </main>;
}
