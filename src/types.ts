export type ProjectCategory = 'all' | 'ai' | 'mobile' | 'web' | 'enterprise' | 'growth';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  tagline: string;
  category: ProjectCategory;
  categoryLabel: string;
  heroImage: string;
  videoUrl?: string;
  youtubeId?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  tags?: string[];
  subCategory?: string;
  galleryImages: string[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  challenge: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  year: string;
  duration: string;
  accentColor: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface Capability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  subServices: string[];
  technologies: string[];
  deliverables: string[];
  color: string;
}

export interface WhatIfConcept {
  id: string;
  tag: string;
  question: string;
  solutionTitle: string;
  hypothesis: string;
  technicalFeasibility: string;
  impactPotential: string;
  category: string;
  prototypeMockup: string;
  videoUrl?: string;
  youtubeId?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  projectType: string;
  metric: string;
}

export interface EstimatorState {
  projectType: 'mobile' | 'web' | 'ai-system' | 'enterprise-suite';
  scope: 'mvp' | 'growth' | 'enterprise-scale';
  aiIntegration: boolean;
  timeline: 'expedited' | 'standard' | 'flexible';
  qaLevel: 'standard' | 'mission-critical';
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

export interface CorePillar {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  videoUrl?: string;
  badge?: string;
}

export interface ManifestoPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  keyPractices: string[];
}

