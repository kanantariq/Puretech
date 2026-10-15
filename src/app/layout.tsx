import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../index.css';
import '../landing/landing.css';
import '../landing/landing-sections.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://puretech-iota.vercel.app'),
  title: { default: 'PureTech Innovations', template: '%s | PureTech Innovations' },
  description: 'PureTech engineers intelligent platforms, digital experiences, and high-performance products.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
