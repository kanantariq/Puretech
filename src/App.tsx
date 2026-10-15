'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClientsMarquee } from './components/ClientsMarquee';
import { WorkSection } from './components/WorkSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ReelModal } from './components/ReelModal';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { FoundationalPillarsSection } from './components/FoundationalPillarsSection';
import { WhatIfSection } from './components/WhatIfSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { InsightsNewsletter } from './components/InsightsNewsletter';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollVideoBackground } from './components/ScrollVideoBackground';
import { CustomCursor } from './components/CustomCursor';
import { CaseStudy } from './types';
import { LandingDirectory } from './components/LandingDirectory';
import { HomepageContentProvider } from './components/HomepageContentContext';
import { DEFAULT_HOME_PAGE_CONTENT, type HomePageContent } from './data/homepage';

export default function App({ content = DEFAULT_HOME_PAGE_CONTENT }: { content?: HomePageContent }) {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [inquirySubject, setInquirySubject] = useState<string>('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#08090d';
      document.body.style.color = '#f1f5f9';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [darkMode]);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(frame);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactWithSubject = (subject: string) => {
    setInquirySubject(subject);
    scrollToSection('contact');
  };

  return (
    <HomepageContentProvider content={content}>
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      {/* Custom Tactile Magnetic Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Fantasy.co-style Parallax Scroll-Driven Video Background Engine */}
      <ScrollVideoBackground />

      {/* Floating Header with Audio & Fullscreen Menu */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenEstimator={() => scrollToSection('estimator')}
        onOpenContact={() => scrollToSection('contact')}
        onOpenReel={() => setIsReelOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-20">
        <Hero
          onOpenEstimator={() => scrollToSection('estimator')}
          onOpenContact={() => scrollToSection('contact')}
          onExploreWork={() => scrollToSection('work')}
          onOpenReel={() => setIsReelOpen(true)}
        />

        <ClientsMarquee />

        <CapabilitiesSection
          onStartProjectWithCapability={(capName) =>
            handleOpenContactWithSubject(`Discipline Focus: ${capName}`)
          }
        />

        <WorkSection
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
        />

        <WhatIfSection
          onPartnerOnConcept={(conceptTitle) =>
            handleOpenContactWithSubject(`R&D Collaboration: ${conceptTitle}`)
          }
        />

        {/* Foundational Pillars (Nextnox Scrollytelling Methodology // PROCESS) */}
        <FoundationalPillarsSection />

        <AboutSection />

        <TeamSection />

        <TestimonialsSection />

        {/* Project Cost Blueprint & Estimator */}
        <ProjectEstimator
          onSubmitEstimate={(summary) =>
            handleOpenContactWithSubject(`Project Blueprint Estimate: ${summary}`)
          }
        />

        <FAQSection />

        <LandingDirectory />

        <ContactSection initialSubject={inquirySubject} />

        {/* 'Join our insights' Newsletter Component at the bottom of the page */}
        <InsightsNewsletter />
      </main>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onInquire={(projectName) =>
          handleOpenContactWithSubject(`Project Inquiry: Similar to ${projectName}`)
        }
      />

      {/* 4K Cinematic Showreel Modal */}
      <ReelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />

      {/* Grand Typographic Footer */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
    </HomepageContentProvider>
  );
}
