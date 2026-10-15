import App from '../App';
import { getPublishedHomePage } from '../lib/content';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedHomePage();
  return { title: content.title, description: content.description };
}

export default async function HomePage() {
  const content = await getPublishedHomePage();
  return <App content={content} />;
}
