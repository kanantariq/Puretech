import { redirect } from 'next/navigation';
import { createSupabaseServerClient, isSupabaseConfigured } from '../../../lib/supabase/server';
import { signIn } from '../actions';

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createSupabaseServerClient();
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  if (data.user) redirect('/admin');
  const { error } = await searchParams;
  return <main className="cms-shell cms-centered"><section className="cms-card cms-login">
    <p className="cms-kicker">PURETECH CMS</p><h1>Admin sign in</h1>
    <p>Manage landing-page content, publishing, and incoming leads.</p>
    {!isSupabaseConfigured() && <div className="cms-alert">Add the Supabase environment variables to enable admin login.</div>}
    {error && <div className="cms-alert">{error}</div>}
    <form action={signIn} className="cms-form">
      <label>Email<input name="email" type="email" required autoComplete="email" /></label>
      <label>Password<input name="password" type="password" required autoComplete="current-password" /></label>
      <button type="submit" disabled={!isSupabaseConfigured()}>Sign in</button>
    </form>
  </section></main>;
}
