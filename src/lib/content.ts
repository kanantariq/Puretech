import { LANDING_PAGES, type LandingPageContent } from '../data/landingPages';
import { createSupabaseServerClient } from './supabase/server';
import { DEFAULT_HOME_PAGE_CONTENT, type HomePageContent } from '../data/homepage';

function isLandingPageContent(value: unknown): value is LandingPageContent {
  if (!value || typeof value !== 'object') return false;
  const page = value as Partial<LandingPageContent>;
  return typeof page.slug === 'string' && typeof page.title === 'string' &&
    Array.isArray(page.capabilities) && Array.isArray(page.journeys) &&
    Array.isArray(page.criteria) && Array.isArray(page.faqs);
}

export async function getPublishedLandingPage(slug: string): Promise<LandingPageContent | undefined> {
  const fallback = LANDING_PAGES.find((page) => page.slug === slug);
  const supabase = await createSupabaseServerClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from('pages')
    .select('content')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error || !isLandingPageContent(data?.content)) return fallback;
  return data.content;
}

export async function getPublishedHomePage(): Promise<HomePageContent> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return DEFAULT_HOME_PAGE_CONTENT;
  const { data, error } = await supabase.from('pages').select('content').eq('slug', 'home').eq('status', 'published').maybeSingle();
  if (error || !data?.content || typeof data.content !== 'object') return DEFAULT_HOME_PAGE_CONTENT;
  return data.content as HomePageContent;
}
