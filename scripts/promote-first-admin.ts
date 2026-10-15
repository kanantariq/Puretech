import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Supabase environment values are missing.');
const supabase = createClient(url, key, { auth: { persistSession: false } });
const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 2 });
if (error) throw error;
if (data.total !== 1) throw new Error(`Expected exactly one auth user, found ${data.total}. Assign an admin explicitly.`);
const user = data.users[0];
const { error: profileError } = await supabase.from('profiles').upsert({
  id: user.id,
  role: 'admin',
  display_name: user.user_metadata?.full_name || 'PureTech Admin',
});
if (profileError) throw profileError;
console.log('The existing authentication user is now a CMS admin.');
