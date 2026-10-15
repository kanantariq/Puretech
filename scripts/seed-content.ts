import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { LANDING_PAGES } from '../src/data/landingPages';
import { DEFAULT_HOME_PAGE_CONTENT } from '../src/data/homepage';

config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.');
const supabase = createClient(url, key, { auth: { persistSession: false } });
const records = [
  { slug: 'home', title: DEFAULT_HOME_PAGE_CONTENT.title, status: 'published', content: DEFAULT_HOME_PAGE_CONTENT },
  ...LANDING_PAGES.map((content) => ({ slug: content.slug, title: content.title, status: 'published', content })),
];
const { error } = await supabase.from('pages').upsert(records, { onConflict: 'slug' });
if (error) throw error;
console.log(`Seeded the homepage and ${LANDING_PAGES.length} landing pages.`);
