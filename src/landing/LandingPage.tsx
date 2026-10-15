'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowDown, Fingerprint, Sparkles } from 'lucide-react';
import { type LandingPageContent } from '../data/landingPages';
import { COMPANY_FACTS } from '../data/content';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ReelModal } from '../components/ReelModal';
import { HeroWebGL } from '../components/HeroWebGL';
import { LandingLeadForm } from '../components/LandingLeadForm';
import { LandingSections } from './LandingSections';

export default function LandingPage({ page }: { page: LandingPageContent }) {
  const [darkMode, setDarkMode] = useState(true);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const inquiryHref = `mailto:${COMPANY_FACTS.email}?subject=${encodeURIComponent(`Project inquiry: ${page.shortTitle}`)}&body=${encodeURIComponent('Hello PureTech,\n\nI would like to discuss a project.\n\nBusiness / organization:\nProject goal:\nCurrent website or systems:\nPreferred timeline:\n\nThank you.')}`;

  useEffect(() => {
    document.title = `${page.title} | PureTech Innovations`;
    document.documentElement.classList.add('dark');
    const tags = [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', `${page.title} | PureTech Innovations`],
      ['meta[property="og:description"]', page.description],
    ];
    tags.forEach(([selector, content]) => document.querySelector(selector)?.setAttribute('content', content));
  }, [page]);

  return (
    <>
      <Header homePath="/" darkMode={darkMode} setDarkMode={setDarkMode}
        onOpenEstimator={() => { window.location.href = '/#estimator'; }}
        onOpenContact={() => document.getElementById('project-inquiry')?.scrollIntoView({ behavior: 'smooth' })}
        onOpenReel={() => setIsReelOpen(true)} />
    <div className="lp" style={{ '--lp-accent': page.accent } as CSSProperties}>
      <a className="lp-skip" href="#main-content">Skip to content</a>
      <main id="main-content">
        <section className="lp-hero lp-hero-cinematic">
          <div className="lp-particle-layer" aria-hidden="true"><HeroWebGL vivid /></div>
          <div className="lp-architectural-grid" aria-hidden="true" />
          <div className="lp-container lp-hero-inner">
            <div className="lp-hero-grid">
              <div className="lp-hero-copy">
                <p className="lp-eyebrow">{page.title}</p>
                <h1>{page.heroLead} <em>{page.heroHighlight}</em></h1>
                <p className="lp-hero-description">{page.description}</p>
                <div className="lp-actions">
                  <a className="lp-hero-primary" href="#expertise">Explore solutions <ArrowDown size={17} /></a>
                  <a className="lp-hero-secondary" href="#project-inquiry"><Sparkles size={17} /> Discuss your project</a>
                </div>
                <div className="lp-hero-promises"><span><Fingerprint size={14} /> YOUR VISION. YOUR DIRECTION.</span><span><Sparkles size={14} /> BUILT AROUND YOUR BUSINESS</span></div>
              </div>
              <LandingLeadForm service={page.shortTitle} />
            </div>
            <div className="lp-hero-bottom"><a href="#perspective"><span className="lp-status-dot" /> Scroll to explore <ArrowDown size={14} /></a><span>{page.signal}</span></div>
          </div>
        </section>

        <LandingSections page={page} inquiryHref={inquiryHref} />
      </main>

    </div>
      <Footer homePath="/" />
      <ReelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />
    </>
  );
}
