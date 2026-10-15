import {
  CAPABILITIES, CASE_STUDIES, CLIENT_LOGOS, COMPANY_FACTS, CORE_PILLARS,
  MANIFESTO_PILLARS, PROCESS_STEPS, TESTIMONIALS, WHAT_IF_CONCEPTS,
} from './content';

export const DEFAULT_HOME_PAGE_CONTENT = {
  slug: 'home',
  title: 'PureTech Innovations',
  description: 'PureTech engineers intelligent platforms, digital experiences, and high-performance products.',
  hero: {
    lead: 'We build what’s next in',
    highlight: 'digital products.',
    description: 'From Alpharetta to global enterprises, PureTech engineers intelligent platforms, spatial AI experiences, and high-performance mobile flagships.',
    primaryCta: 'Explore Work',
    secondaryCta: 'Estimate Project',
    trustOne: '100% IP CONFIDENTIALITY & NDA',
    trustTwo: 'ZERO-DEFECT QA GUARANTEE',
    location: 'ALPHARETTA, GA EST',
    descriptor: 'AI-NATIVE PRODUCT ATELIER',
  },
  caseStudies: CASE_STUDIES,
  capabilities: CAPABILITIES,
  corePillars: CORE_PILLARS,
  processSteps: PROCESS_STEPS,
  manifestoPillars: MANIFESTO_PILLARS,
  concepts: WHAT_IF_CONCEPTS,
  testimonials: TESTIMONIALS,
  clientLogos: CLIENT_LOGOS,
  companyFacts: COMPANY_FACTS,
};

export type HomePageContent = typeof DEFAULT_HOME_PAGE_CONTENT;
