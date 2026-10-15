import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '../../landing/LandingPage';
import { LANDING_PAGES } from '../../data/landingPages';
import { getPublishedLandingPage } from '../../lib/content';

export const revalidate = 60;

export function generateStaticParams() {
  return LANDING_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedLandingPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, type: 'website', url: `/${page.slug}` },
  };
}

export default async function DynamicLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedLandingPage(slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
