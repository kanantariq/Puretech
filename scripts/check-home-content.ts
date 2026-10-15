import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Supabase environment values are missing.');
const supabase = createClient(url, key, { auth: { persistSession: false } });
const { data, error } = await supabase.from('pages').select('status,content').eq('slug', 'home').single();
if (error) throw error;
const content = data.content as { hero?: { highlight?: string } };
console.log(JSON.stringify({ status: data.status, heroHighlight: content.hero?.highlight || '' }));
