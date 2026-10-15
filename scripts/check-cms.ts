import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Supabase environment values are missing.');
const supabase = createClient(url, key, { auth: { persistSession: false } });
const [{ count: pages, error: pagesError }, { count: profiles, error: profilesError }, users] = await Promise.all([
  supabase.from('pages').select('*', { count: 'exact', head: true }),
  supabase.from('profiles').select('*', { count: 'exact', head: true }),
  supabase.auth.admin.listUsers({ page: 1, perPage: 1 }),
]);
if (pagesError) throw pagesError;
if (profilesError) throw profilesError;
if (users.error) throw users.error;
console.log(JSON.stringify({ pages: pages ?? 0, authUsers: users.data.total ?? users.data.users.length, cmsProfiles: profiles ?? 0 }));
