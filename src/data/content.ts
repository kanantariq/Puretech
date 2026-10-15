import { CaseStudy, Capability, WhatIfConcept, Testimonial, ProcessStep, CorePillar, ManifestoPillar } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  // =========================================================================
  // 1. WEBSITES & DIGITAL FLAGSHIPS
  // =========================================================================
  {
    id: 'main-realty',
    title: 'Main Realty Developments',
    client: 'Main Realty Group · Dubai',
    tagline: 'Luxury Dubai real estate — boutique residences and high-value investment opportunities.',
    category: 'web',
    categoryLabel: 'Luxury Real Estate',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://mainrealtydevelopments.com/',
    tags: ['Real estate', 'Dubai', 'Luxury', 'Next.js'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Buyer Inquiries', value: '+140%', description: 'High-intent investor lead surge' },
      { label: 'Sub-Second Load', value: '0.4s', description: 'Core Web Vitals 100/100 score' },
      { label: 'Inventory Listed', value: '$180M+', description: 'Ultra-luxury residences & penthouses' }
    ],
    challenge: 'High-net-worth property buyers require instant, cinematic architectural previews and interactive floor plans without heavy asset lag.',
    solution: 'Engineered a bespoke high-throughput Next.js digital flagship with dynamic AED/USD investment calculators, 3D property walkthroughs, and instant VIP consultation funnels.',
    architecture: [
      'Edge-rendered responsive React 19 architecture with predictive image prefetching',
      'Multi-currency realtime forex converter and automated lead qualification pipeline',
      'Integration with Dubai Land Department MLS data feeds and CRM hubs'
    ],
    techStack: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel Edge', 'Sanity CMS'],
    year: '2025',
    duration: '3 Months',
    accentColor: '#f6891f',
    testimonial: {
      quote: 'The digital presence PureTech delivered immediately positioned our developments among Dubai’s elite real estate offerings.',
      author: 'Tariq Al-Mansoor',
      role: 'Managing Director, Main Realty Developments'
    }
  },
  {
    id: 'illumend-ai',
    title: 'illumend',
    client: 'illumend Systems · InsurTech',
    tagline: 'AI-driven insurance compliance and COI tracking software — automated renewals, risk gaps, and audit-ready reporting.',
    category: 'ai',
    categoryLabel: 'AI & InsurTech',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    liveUrl: 'https://www.illumend.ai/',
    tags: ['AI', 'SaaS', 'InsurTech', 'Compliance'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Audit Velocity', value: '10x', description: 'Automated COI verification speed' },
      { label: 'Precision Rate', value: '99.4%', description: 'Neural OCR risk detection accuracy' },
      { label: 'Policy Volume', value: '45,000+', description: 'Active compliance certificates tracked' }
    ],
    challenge: 'Enterprise risk managers spent hundreds of hours manually reviewing certificates of insurance, exposing organizations to costly liability gaps.',
    solution: 'Architected an AI-native compliance platform using quantized multimodal document parsers to detect policy deficiencies and trigger automated broker renewals.',
    architecture: [
      'Zero-latency OCR document intelligence pipeline extracting 30+ insurance fields in seconds',
      'Automated broker notification workflows with audit-ready reporting suites',
      'Enterprise role-based security with SOC2 and HIPAA compliant encryption'
    ],
    techStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
    year: '2025',
    duration: '5 Months',
    accentColor: '#38bdf8',
    testimonial: {
      quote: 'illumend revolutionized our risk posture. We turned a tedious manual paperwork process into autonomous, audit-proof compliance.',
      author: 'Rachel Adams',
      role: 'Head of Operations, illumend'
    }
  },
  {
    id: 'stride-soles',
    title: 'Stride Soles',
    client: 'Stride Health Technologies',
    tagline: 'Custom orthotics and insoles built from gait analysis and a 3D scan of your feet.',
    category: 'web',
    categoryLabel: 'E-commerce & Health',
    heroImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-what-is-an-app.mp4',
    liveUrl: 'https://www.stridesoles.com/',
    tags: ['E-commerce', 'Health', 'Shopify', '3D Scan'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+47%', description: 'Shopify Plus checkout conversion boost' },
      { label: '3D Scan Speed', value: '< 30s', description: 'Smartphone foot topography capture' },
      { label: 'Customer Rating', value: '4.9 ★', description: 'Over 12,000 verified custom reviews' }
    ],
    challenge: 'Selling medical-grade orthotics online requires simplifying complex gait measurements and ensuring high customer purchase confidence.',
    solution: 'Built a high-converting custom Shopify Plus experience integrated with mobile 3D foot scanning and interactive arch-support customizers.',
    architecture: [
      'Headless Shopify Storefront API paired with dynamic 3D WebGL mesh rendering',
      'Integrated CAD lab manufacturing pipeline converting customer scans directly to 3D printers',
      'Automated personalized post-purchase fitting cadences and subscription refills'
    ],
    techStack: ['Shopify Plus', 'Liquid', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Klaviyo'],
    year: '2024',
    duration: '4 Months',
    accentColor: '#f43f5e',
    testimonial: {
      quote: 'Our online conversion skyrocketed after launch. PureTech made ordering custom orthotics as simple as buying sneakers.',
      author: 'Marcus Vance',
      role: 'Founder & CEO, Stride Soles'
    }
  },
  {
    id: 'peace-of-mind-counseling',
    title: 'Peace of Mind Counseling',
    client: 'Peace of Mind Counseling · Freehold, NJ',
    tagline: 'Licensed therapy practice in Freehold, NJ — individual, couples, and family therapy, in person and via telehealth.',
    category: 'web',
    categoryLabel: 'Healthcare & Wellness',
    heroImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://pomcc.org/',
    tags: ['Healthcare', 'Therapy', 'Telehealth', 'Web'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Patient Intakes', value: '+165%', description: 'Direct digital consultation bookings' },
      { label: 'HIPAA Compliance', value: '100%', description: 'Secure encrypted intake pipelines' },
      { label: 'Bounce Rate', value: '28%', description: 'Warm empathetic user journey' }
    ],
    challenge: 'A licensed mental health practice needed a soothing, accessible, and HIPAA-secure web portal that builds immediate trust with individuals seeking therapy.',
    solution: 'Designed an elegant, patient-centric web platform featuring seamless clinician directory filtering, telehealth integration, and instant confidential intake workflows.',
    architecture: [
      'Accessible, ADA-compliant responsive web design with warm typographic hierarchy',
      'Encrypted confidential patient intake form dispatching to EHR systems',
      'Location-based directory routing patients between Freehold office and telehealth rooms'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HIPAA Secure Forms', 'Vercel'],
    year: '2024',
    duration: '2.5 Months',
    accentColor: '#10b981',
    testimonial: {
      quote: 'Our new website conveys the compassion and professionalism our practice stands for. Intake inquiries have more than doubled.',
      author: 'Dr. Rebecca Vance',
      role: 'Clinical Director, Peace of Mind Counseling'
    }
  },
  {
    id: 'mccarthy-veterinary',
    title: 'McCarthy Veterinary Supplies',
    client: 'McCarthy Veterinary Supplies · Canada',
    tagline: 'Veterinary equipment, supplies, and expert service for practices across Canada.',
    category: 'web',
    categoryLabel: 'Veterinary B2B',
    heroImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-what-is-an-app.mp4',
    liveUrl: 'https://mccarthyvet.com/',
    tags: ['Veterinary', 'B2B', 'Medical Supplies', 'Canada'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'B2B Catalog', value: '15,000+', description: 'SKUs indexed with instant search' },
      { label: 'Clinic Reorders', value: '+78%', description: 'Quick-order bulk workflow lift' },
      { label: 'National Coverage', value: '10 Provinces', description: 'Seamless shipping & ERP sync' }
    ],
    challenge: 'Veterinary clinics across Canada required a fast, specialized B2B ordering portal to restock surgical tools and medical supplies with customized tier pricing.',
    solution: 'Engineered a modern B2B distributor portal with custom clinic account tiers, automated bulk reordering, and real-time inventory synchronization.',
    architecture: [
      'B2B wholesale pricing engine supporting multi-tiered veterinary clinic contracts',
      'Real-time ERP warehouse inventory integration and automated quote generation',
      'Sub-50ms elastic search indexing thousands of specialized medical SKUs'
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'ERP Integration'],
    year: '2024',
    duration: '4 Months',
    accentColor: '#0ea5e9',
    testimonial: {
      quote: 'PureTech modernized our distributor operations. Canadian clinics can now restock critical veterinary supplies in minutes.',
      author: 'Colin McCarthy',
      role: 'Operations Director, McCarthy Vet'
    }
  },
  {
    id: 'glamup',
    title: 'GLAMUP',
    client: 'GLAMUP Retail Group · Pakistan',
    tagline: 'Pakistan\'s leading online beauty & cosmetic retail flagship store.',
    category: 'web',
    categoryLabel: 'E-commerce & Retail',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-master-sizzle.mp4',
    liveUrl: 'https://shopglamup.com/',
    tags: ['E-commerce', 'Retail', 'Cosmetics', 'Shopify Plus'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Flash Sale Concurrency', value: '45K Users', description: 'Zero lag during seasonal drops' },
      { label: 'Mobile Conversion', value: '+54%', description: 'Streamlined COD & mobile checkout' },
      { label: 'Orders Processed', value: '250,000+', description: 'Nationwide beauty fulfillment' }
    ],
    challenge: 'Scaling high-volume beauty flash sales in an emerging e-commerce market with heavy mobile traffic and cash-on-delivery (COD) logistics.',
    solution: 'Designed and deployed a hyper-optimized headless retail storefront with one-click checkout, automated inventory reservations, and courier API sync.',
    architecture: [
      'High-performance headless Shopify Plus frontend with sub-second page transitions',
      'Automated COD verification and SMS order tracking integration with local couriers',
      'Dynamic product bundling engine driving higher average order value (AOV)'
    ],
    techStack: ['Shopify Plus', 'Liquid', 'React', 'Tailwind CSS', 'Klaviyo', 'Courier APIs'],
    year: '2024',
    duration: '3 Months',
    accentColor: '#ec4899',
    testimonial: {
      quote: 'GLAMUP has become a household name in beauty retail. The storefront handles huge traffic surges effortlessly.',
      author: 'Ayesha Khan',
      role: 'Head of E-Commerce, GLAMUP'
    }
  },
  {
    id: 'nock-pay',
    title: 'Nock Pay',
    client: 'Nock Pay Systems',
    tagline: 'Secure payment gateway & merchant services.',
    category: 'web',
    categoryLabel: 'Fintech & Payments',
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-web-salesforce.mp4',
    liveUrl: 'https://nockpay.com/',
    tags: ['Fintech', 'Payments', 'Merchant Services', 'Web'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67e557224b?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Processing Speed', value: '< 250ms', description: 'Instant payment authorization' },
      { label: 'Merchant Onboarding', value: '3 Mins', description: 'Automated KYC & compliance checks' },
      { label: 'Security Standard', value: 'PCI DSS Level 1', description: 'Bank-grade tokenized gateway' }
    ],
    challenge: 'Merchants needed a transparent, ultra-reliable payment processing platform with lower transaction fees and instant onboarding.',
    solution: 'Built a sleek, high-trust fintech digital web experience detailing POS terminals, gateway APIs, and interactive merchant rate calculators.',
    architecture: [
      'Bank-grade interactive rate calculator showing instant interchange fee comparisons',
      'Streamlined merchant lead routing into risk underwriting pipelines',
      'Modern micro-interactions built with high-concurrency security standards'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    year: '2024',
    duration: '3 Months',
    accentColor: '#6366f1',
    testimonial: {
      quote: 'Nock Pay needed a digital experience that instantly communicated trust and speed. PureTech delivered beyond expectations.',
      author: 'Liam Patterson',
      role: 'Chief Product Officer, Nock Pay'
    }
  },
  {
    id: 'creative-community-outreach',
    title: 'Creative Community Outreach',
    client: 'Creative Community Outreach · USA',
    tagline: 'Nonprofit organization based in the USA.',
    category: 'web',
    categoryLabel: 'Nonprofit & Community',
    heroImage: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://creativecommunityoutreach.org/',
    tags: ['Nonprofit', 'Donations', 'Community', 'Web'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Donor Contributions', value: '+120%', description: 'Increase in digital recurring donations' },
      { label: 'Volunteer Signups', value: '3,500+', description: 'Active community volunteers engaged' },
      { label: 'Programs Funded', value: '45+', description: 'Youth & family support initiatives' }
    ],
    challenge: 'A national non-profit needed a modern digital portal to mobilize volunteers, showcase community programs, and process recurring online donations securely.',
    solution: 'Created an engaging, storytelling-driven web platform with automated recurring donor checkout, event registration, and impact reporting visualizers.',
    architecture: [
      'Frictionless donor checkout supporting Apple Pay, Google Pay, and recurring Stripe giving',
      'Community event registration calendar with automated volunteer check-in flows',
      'Interactive impact map visualizing funded community programs across the country'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Stripe Giving', 'Tailwind CSS', 'Sanity CMS'],
    year: '2024',
    duration: '2.5 Months',
    accentColor: '#f59e0b',
    testimonial: {
      quote: 'Our donors love the transparency and ease of giving on our new site. It has energized our entire community mission.',
      author: 'Marcus Bennett',
      role: 'Executive Director, Creative Community Outreach'
    }
  },
  {
    id: 'creative-labs-center',
    title: 'Creative Labs Center',
    client: 'Creative Labs Center · Alpharetta, USA',
    tagline: 'Day-care center in Alpharetta, USA.',
    category: 'web',
    categoryLabel: 'Education & Childcare',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-software-build.mp4',
    liveUrl: 'https://creativelabscenter.com/',
    tags: ['Education', 'Childcare', 'Early Learning', 'Web'],
    subCategory: 'Websites',
    galleryImages: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Enrollment Inquiries', value: '+190%', description: 'Tours booked via online calendar' },
      { label: 'Parent Satisfaction', value: '98%', description: 'Streamlined admissions experience' },
      { label: 'STEM Curriculum', value: 'Age 1-6', description: 'Interactive program explorers' }
    ],
    challenge: 'A premier childcare and early STEM center in Alpharetta needed a welcoming, informative web presence to allow parents to explore curriculum and book private tours.',
    solution: 'Designed a colorful, vibrant web platform with interactive program guides, teacher credentials, and an integrated tour booking calendar.',
    architecture: [
      'Interactive age-tiered curriculum visualizer highlighting STEM learning milestones',
      'Automated parent tour scheduling system with SMS appointment confirmations',
      'High-speed mobile optimization for parents browsing on smartphones'
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Calendly API', 'Vercel'],
    year: '2024',
    duration: '2 Months',
    accentColor: '#3b82f6',
    testimonial: {
      quote: 'Parent tour bookings hit full capacity within weeks of launching our new website. PureTech captured our spirit beautifully.',
      author: 'Jessica Simmons',
      role: 'Director, Creative Labs Center'
    }
  },

  // =========================================================================
  // 2. APPS & PLATFORMS
  // =========================================================================
  {
    id: 'noetic-adventure',
    title: 'Noetic Adventure',
    client: 'Noetic Research Lab',
    tagline: 'A quiz-based game built for specific research for philosophers — shipped across web, App Store, and Google Play.',
    category: 'mobile',
    categoryLabel: 'Cross-Platform Game',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-mobile-app.mp4',
    liveUrl: 'https://noeticadventure877.netlify.app/',
    appStoreUrl: 'https://apps.apple.com/us/app/noetic-adventure/id6756939932',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.noeticadventure&pcampaignid=web_share',
    tags: ['Game', 'iOS', 'Android', 'Flutter', 'Web'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'App Store Rating', value: '4.9 ★', description: 'Across iOS & Google Play stores' },
      { label: 'FPS Rendering', value: '60 FPS', description: 'Fluid tactile game loop on all devices' },
      { label: 'Active Thinkers', value: '120,000+', description: 'Engaged global research players' }
    ],
    challenge: 'Researchers needed a viral, gamified quiz platform capable of running synchronously across Web, iOS, and Android to harvest structured cognitive decision data.',
    solution: 'Designed and deployed a responsive cross-platform Flutter application featuring real-time multiplayer rounds, branching philosophical narratives, and cloud leaderboards.',
    architecture: [
      'Single unified Flutter codebase compiling to native iOS, Android, and WebAssembly targets',
      'Low-latency WebSocket game engine handling synchronized multi-user quiz rooms',
      'Real-time analytics pipeline aggregating behavioral decision models for research analysis'
    ],
    techStack: ['Flutter', 'Dart', 'Firebase Realtime DB', 'Node.js', 'WebAssembly', 'Cloudflare Workers'],
    year: '2025',
    duration: '4 Months',
    accentColor: '#10b981',
    testimonial: {
      quote: 'From App Store deployment to web gameplay, PureTech built an extraordinary gamified research experience that our community loves.',
      author: 'Dr. Gregory Thorne',
      role: 'Principal Investigator, Noetic Lab'
    }
  },
  {
    id: 'bluebolt-pediatric',
    title: 'Bluebolt Pediatric Care',
    client: 'Bluebolt Healthcare Network',
    tagline: 'HIPAA-compliant parent companion app for behaviour, routines, messaging, and appointment booking.',
    category: 'mobile',
    categoryLabel: 'Healthcare & Telehealth',
    heroImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-software-build.mp4',
    liveUrl: 'https://blueboltpediatriccare.com/',
    appStoreUrl: 'https://blueboltapp-981329790726.us-west4.run.app/',
    tags: ['Healthcare', 'HIPAA', 'Web App', 'Telehealth'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'HIPAA Security', value: '100%', description: 'Fully encrypted patient telemetry' },
      { label: 'Booking Speed', value: '< 20s', description: 'Instant pediatrician scheduling' },
      { label: 'Active Families', value: '38,000+', description: 'Parents managing child health daily' }
    ],
    challenge: 'Parents struggled with fragmented communication, messy appointment scheduling, and unsecured messaging when tracking child health routines.',
    solution: 'Engineered a secure, intuitive mobile-first telehealth portal with encrypted doctor messaging, milestone tracking, and seamless clinic integration.',
    architecture: [
      'End-to-end encrypted messaging complying with strict HIPAA/HITECH federal regulations',
      'Automated vaccine reminder pipelines and developmental growth curve visualizers',
      'WebRTC high-definition telehealth video consultation room embedded in the app'
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'Google Cloud Run', 'Docker'],
    year: '2024',
    duration: '6 Months',
    accentColor: '#38bdf8',
    testimonial: {
      quote: 'Bluebolt has transformed how pediatricians and parents collaborate. PureTech gave us an app that parents genuinely trust.',
      author: 'Dr. Sarah Jenkins',
      role: 'Chief Medical Officer, Bluebolt Pediatric'
    }
  },
  {
    id: 'amplify-hr',
    title: 'Amplify HR',
    client: 'Amplify PEO Solutions · USA',
    tagline: 'All-in-one PEO platform for a leading US employer org — payroll, benefits, HR, and a self-service portal.',
    category: 'enterprise',
    categoryLabel: 'Enterprise SaaS & Cloud',
    heroImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-web-salesforce.mp4',
    liveUrl: 'https://amplifyhr.com/',
    tags: ['SaaS', 'Enterprise', 'Payroll', 'Portals'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Payroll Volume', value: '$500M+', description: 'Annually processed across 50 US states' },
      { label: 'Active Workforce', value: '14,000+', description: 'Employees on self-service portal' },
      { label: 'Uptime Reliability', value: '99.99%', description: 'Zero-downtime microservices stack' }
    ],
    challenge: 'A prominent US Professional Employer Organization needed to replace slow legacy software with a unified, high-security HR and payroll platform.',
    solution: 'Architected a modern multi-tenant enterprise portal supporting multi-state tax compliance, benefits self-enrollment, and automated payroll runs.',
    architecture: [
      'Distributed microservices with automated ACH banking integrations and tax withholding engines',
      'Role-based granular access control for HR admins, company executives, and employees',
      'Automated digital onboarding workflows with DocuSign and E-Verify API integrations'
    ],
    techStack: ['Node.js', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'AWS ECS', 'Docker'],
    year: '2024',
    duration: '8 Months',
    accentColor: '#818cf8',
    testimonial: {
      quote: 'PureTech engineered our flagship PEO platform flawlessly. We onboarded thousands of employees without a single payroll glitch.',
      author: 'David Sterling',
      role: 'VP of Technology, Amplify HR'
    }
  },
  {
    id: 'headland-education',
    title: 'Headland Education',
    client: 'Headland Corporate EdTech',
    tagline: 'Learning platform helping business owners navigate laws and challenges — diligence tracking, in-app chat, live video, subscriptions, paid videos & community.',
    category: 'enterprise',
    categoryLabel: 'EdTech & Video Platforms',
    heroImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-master-sizzle.mp4',
    liveUrl: 'https://www.headlandeducation.com/',
    tags: ['EdTech', 'Video', 'Subscriptions', 'Payments'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Enrolled Leaders', value: '50,000+', description: 'Business owners and executives' },
      { label: 'Video Latency', value: '< 200ms', description: 'Adaptive multi-bitrate HLS playback' },
      { label: 'Course Completion', value: '88.5%', description: 'Interactive diligence checkpoint rate' }
    ],
    challenge: 'Corporate business owners needed structured educational pathways for legal and tax compliance, delivered via smooth interactive video and cohort discussions.',
    solution: 'Engineered an all-in-one EdTech SaaS with in-app chat, live video broadcasts, course diligence trackers, and paid subscription paywalls.',
    architecture: [
      'Cloudflare Stream HLS video delivery with DRM watermarking and progress tracking',
      'Stripe Billing recurring tiered subscriptions and corporate seat licensing',
      'Real-time interactive chat feeds and discussion boards powered by Redis pub/sub'
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Stripe Billing', 'Cloudflare Stream', 'PostgreSQL'],
    year: '2025',
    duration: '5 Months',
    accentColor: '#a855f7',
    testimonial: {
      quote: 'Headland Education is now the premier knowledge platform for our industry. PureTech delivered an exceptional product on time.',
      author: 'Elena Rostova',
      role: 'Director of Education, Headland'
    }
  },
  {
    id: 'inboxlumi',
    title: 'InboxLumi',
    client: 'InboxLumi Inc.',
    tagline: 'AI-powered platform that centralizes email, messages, and channels into one smart inbox — automating replies and prioritizing conversations.',
    category: 'ai',
    categoryLabel: 'AI & Automation',
    heroImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    liveUrl: 'https://inboxlumi.com/',
    tags: ['AI', 'SaaS', 'Automation', 'CRM'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Triage Acceleration', value: '80%', description: 'Reduction in inbox response time' },
      { label: 'Categorization', value: 'Sub-8ms', description: 'Real-time neural priority triage' },
      { label: 'Messages Routed', value: '3.2M+', description: 'Monthly automated communications' }
    ],
    challenge: 'High-growth sales and support teams drown in disjointed communications spread across email, WhatsApp, LinkedIn, and SMS.',
    solution: 'Built an AI-powered smart inbox that consolidates multi-channel conversations, auto-generates contextual replies, and synchronizes CRM records.',
    architecture: [
      'Custom LLM agent pipelines analyzing inbound email sentiment and synthesizing replies',
      'Bi-directional IMAP/SMTP/Gmail/Outlook sync with sub-second message ingestion',
      'Automated pipeline status updates pushed directly to HubSpot and Salesforce'
    ],
    techStack: ['Python', 'OpenAI API', 'FastAPI', 'React', 'TypeScript', 'Redis', 'AWS'],
    year: '2025',
    duration: '4 Months',
    accentColor: '#06b6d4',
    testimonial: {
      quote: 'InboxLumi has cut our response time by 80%. It’s like giving every sales rep a dedicated executive assistant.',
      author: 'Claire Beaumont',
      role: 'VP of Customer Growth, InboxLumi'
    }
  },
  {
    id: 'really-fast-realty',
    title: 'ReallyFastRealty',
    client: 'ReallyFastRealty USA',
    tagline: 'Cash-offer real estate platform with a chatbot that qualifies visitors and pushes leads into their FreedomSoft CRM.',
    category: 'ai',
    categoryLabel: 'AI & Real Estate',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://www.reallyfastrealty.com/',
    tags: ['AI', 'Real estate', 'CRM', 'Lead Gen'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Lead Qualification', value: '4.2x', description: 'Immediate conversational bot conversion' },
      { label: 'CRM Sync Delay', value: '0s', description: 'Instant FreedomSoft webhook push' },
      { label: 'Offers Generated', value: '$85M+', description: 'Automated property valuations' }
    ],
    challenge: 'Off-market real estate investors lose deals when lead qualification takes longer than 5 minutes from form submission.',
    solution: 'Created a high-converting web platform featuring a 24/7 conversational AI bot that calculates preliminary cash offers and routes leads into FreedomSoft CRM.',
    architecture: [
      'Conversational AI qualification flow capturing property condition, timeline, and asking price',
      'Real-time automated property valuation algorithms pulling county tax and comp data',
      'Direct CRM integration dispatching instant SMS alerts to acquisitions managers'
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'FreedomSoft API', 'Twilio', 'Vercel'],
    year: '2024',
    duration: '3 Months',
    accentColor: '#f59e0b',
    testimonial: {
      quote: 'Our acquisitions team receives pre-qualified, warm cash-offer leads around the clock. The ROI on this build was immediate.',
      author: 'Jason Miller',
      role: 'Acquisitions Director, ReallyFastRealty'
    }
  },
  {
    id: 'museum-of-stg',
    title: 'The Museum of STG',
    client: 'The Museum of STG · Culture & Heritage',
    tagline: 'Museum site for exhibits, collections, and programs — featuring a voice chatbot of a famous historian visitors can talk with.',
    category: 'ai',
    categoryLabel: 'Voice AI & Culture',
    heroImage: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    liveUrl: 'https://themuseumofstg.wpengine.com/',
    tags: ['AI', 'Voice', 'Culture', 'Web'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Voice Response', value: '< 300ms', description: 'Low-latency natural speech synthesis' },
      { label: 'Exhibit Engagement', value: '+210%', description: 'Interactive history Q&A time' },
      { label: 'Visitor Ratings', value: '4.95 ★', description: 'Praise for conversational immersion' }
    ],
    challenge: 'A prominent museum wanted to bring history to life for younger audiences through an interactive, talking avatar of a legendary historical scholar.',
    solution: 'Architected a lifelike bidirectional voice AI assistant embedded into the museum web portal, grounded in historical archives and interactive exhibit guides.',
    architecture: [
      'Real-time streaming speech-to-speech AI engine with historical voice cloning and timbre tuning',
      'Vector retrieval database indexing museum collections and primary historical documents',
      'Immersive audio visualizer UI with accessible live transcript overlays'
    ],
    techStack: ['Python', 'FastAPI', 'ElevenLabs API', 'OpenAI', 'React', 'Tailwind CSS', 'WordPress API'],
    year: '2024',
    duration: '3.5 Months',
    accentColor: '#d97706',
    testimonial: {
      quote: 'Visitors are astonished when they talk directly with the historian avatar. It has redefined how our exhibits engage the public.',
      author: 'Dr. Arthur Sterling',
      role: 'Chief Curator, Museum of STG'
    }
  },
  {
    id: 'family-tree-builder',
    title: 'Family Tree Builder',
    client: 'Family Tree Labs',
    tagline: 'Interactive web app to create, organize, and visualize family relationships and genealogical data.',
    category: 'web',
    categoryLabel: 'Data Visualization & Web App',
    heroImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-what-is-an-app.mp4',
    liveUrl: 'https://family-tree-builder-one.vercel.app/',
    tags: ['Web app', 'Data viz', 'Family Tree', 'React'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Graph Node Rendering', value: '10,000+', description: 'Smooth 60 FPS genealogical canvas' },
      { label: 'Export Formats', value: 'GEDCOM / PDF', description: 'Lossless family history exports' },
      { label: 'User Satisfaction', value: '99%', description: 'Effortless drag-and-drop hierarchy' }
    ],
    challenge: 'Genealogy hobbyists and families needed a frictionless, beautiful canvas to map multi-generational trees without bulky desktop software.',
    solution: 'Built a fluid React graph canvas with intuitive drag-and-drop lineage tools, photo attachments, and cross-generation timeline visualizers.',
    architecture: [
      'High-performance SVG and Canvas hierarchy layout algorithms handling multi-parent graphs',
      'GEDCOM file parsing and export engine ensuring data portability across genealogy tools',
      'Client-side encrypted local storage and cloud sync capabilities'
    ],
    techStack: ['React', 'TypeScript', 'D3.js / SVG Canvas', 'Tailwind CSS', 'Vercel'],
    year: '2024',
    duration: '2 Months',
    accentColor: '#059669',
    testimonial: {
      quote: 'Family Tree Builder turns complex genealogical charts into an intuitive, beautiful visual experience. PureTech built an absolute gem.',
      author: 'Julian Barnes',
      role: 'Product Lead, Family Tree Labs'
    }
  },
  {
    id: 'complain-about-the-weather',
    title: 'Complain About the Weather',
    client: 'Editorial & Personal Essays Hub',
    tagline: 'A privacy-first personal blog of essays on technology, web development, and everyday life — with a focus on accessibility and a clean reading experience.',
    category: 'web',
    categoryLabel: 'Privacy-First Publishing',
    heroImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://www.complainabouttheweather.com/',
    tags: ['Blog', 'Privacy', 'Web', 'Editorial'],
    subCategory: 'Apps & Platforms',
    galleryImages: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Lighthouse Score', value: '100/100', description: 'Performance, A11y, and SEO' },
      { label: 'Page Weight', value: '< 45 KB', description: 'Zero bloated tracker scripts' },
      { label: 'Reading Retention', value: '4.8 Mins', description: 'High reader focus on long-form essays' }
    ],
    challenge: 'Writers and readers are tired of intrusive popups, heavy tracking cookies, and cluttered layouts that ruin digital reading.',
    solution: 'Engineered an ultra-fast, zero-tracker editorial blog with exquisite typography, dark mode contrast tuning, and instant static page loading.',
    architecture: [
      'Zero-JS static site generation pipeline delivering instantaneous navigation',
      'Complete cookie-less privacy architecture adhering to strict telemetry-free principles',
      'Custom typography scale optimized for readability across mobile and desktop screens'
    ],
    techStack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Markdown / MDX', 'Cloudflare Pages'],
    year: '2024',
    duration: '1.5 Months',
    accentColor: '#64748b',
    testimonial: {
      quote: 'A masterclass in modern minimalist web design. The reading experience is pure, distraction-free, and lightning fast.',
      author: 'Nicholas Ward',
      role: 'Author & Publisher'
    }
  },

  // =========================================================================
  // 3. PERFORMANCE MARKETING & GROWTH
  // =========================================================================
  {
    id: 'coaching-ads-funnels',
    title: 'High-Volume Lead Gen & Coaching Ads',
    client: 'Executive Coaching Institute',
    tagline: 'High-volume registrations at consistently low cost per lead — event-based Meta Ads structured around workshop dates.',
    category: 'growth',
    categoryLabel: 'Performance Marketing',
    heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-master-sizzle.mp4',
    liveUrl: 'https://innoversol.com/freshfuelmarketing/coaching-case-study.pdf',
    tags: ['Meta Ads', 'Google Ads', 'Lead Gen', 'Coaching'],
    subCategory: 'Performance Marketing',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Cost Per Lead', value: '$2.7–$7.7', description: 'Stable CPL across multi-tier campaigns' },
      { label: 'Campaign Scale', value: 'Multi-Tier', description: 'Event-synchronized dynamic ad pacing' },
      { label: 'Registration Surge', value: '+310%', description: 'High-intent workshop attendee acquisition' }
    ],
    challenge: 'Fluctuating ad costs and declining webinar attendance rates were inflating customer acquisition costs for live corporate workshops.',
    solution: 'Designed an event-synchronized Meta & Google Ads architecture with tight conversion tracking, lookalike audience modeling, and automated SMS nurture sequences.',
    architecture: [
      'Full-funnel Meta Conversions API (CAPI) server-side integration ensuring zero signal loss',
      'Automated dynamic budget allocation shifting ad spend toward highest-converting creative angles',
      'Post-registration SMS and email bridge accelerating webinar show-up rates'
    ],
    techStack: ['Meta Ads Manager', 'Google Ads', 'Meta CAPI', 'Zapier', 'Klaviyo', 'Looker Studio'],
    year: '2024',
    duration: 'Ongoing',
    accentColor: '#f43f5e',
    testimonial: {
      quote: 'Our cost per registration dropped below $3 while attendance quality rose significantly. The ROI has been phenomenal.',
      author: 'Marcus Vance',
      role: 'Growth Director, Executive Coaching Institute'
    }
  },
  {
    id: 'local-services-messenger-ads',
    title: 'Local Services & Messenger Funnels',
    client: 'Home & Local Services Group',
    tagline: 'Appointment-ready leads through Messenger ads with hybrid chatbot-to-human qualification that turns chats into booked appointments.',
    category: 'growth',
    categoryLabel: 'Performance Marketing',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    liveUrl: 'https://innoversol.com/freshfuelmarketing/home-services-case-study.pdf',
    tags: ['Local Services', 'Messenger Ads', 'Chatbot', 'Bookings'],
    subCategory: 'Performance Marketing',
    galleryImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Audience Reach', value: '137K', description: 'Targeted local market reach' },
      { label: 'Booking Model', value: 'Hybrid Bot+Human', description: 'Zero friction calendar reservation' },
      { label: 'Show-Up Rate', value: '84%', description: 'Automated SMS reminder engagement' }
    ],
    challenge: 'Traditional web lead forms had high drop-off rates because residential homeowners wanted immediate real-time answers and quotes.',
    solution: 'Built a click-to-Messenger ad strategy powered by a rapid-qualification chatbot that hands off qualified quotes to dispatchers in real time.',
    architecture: [
      'Click-to-Messenger Meta Ads campaign targeting homeowners within 15-mile service radii',
      'Automated qualification bot gathering project size, postal code, and urgency in under 60s',
      'Instant SMS alert routing hot conversations directly to field dispatchers'
    ],
    techStack: ['Meta Ads Manager', 'ManyChat', 'Twilio SMS', 'Google Sheets API', 'Zapier'],
    year: '2024',
    duration: 'Ongoing',
    accentColor: '#06b6d4',
    testimonial: {
      quote: 'We stopped wasting money on dead form fills. Our service techs now receive pre-booked, qualified jobs every morning.',
      author: 'Braden Cole',
      role: 'Founder, Local Home Solutions'
    }
  },
  {
    id: 'shopify-lifestyle-meta-ads',
    title: 'Scaling a Shopify Lifestyle Store',
    client: 'Omnichannel Lifestyle Brand',
    tagline: 'Scaling a Shopify lifestyle store through Meta Ads with audience segmentation, dynamic product ads, and continuous ROAS optimization.',
    category: 'growth',
    categoryLabel: 'E-commerce Performance',
    heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-what-is-an-app.mp4',
    liveUrl: 'https://innoversol.com/freshfuelmarketing/ecommerce-case-study.pdf',
    tags: ['E-commerce', 'Meta Ads', 'ROAS Scaling', 'Shopify'],
    subCategory: 'Performance Marketing',
    galleryImages: [
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Total Impressions', value: '912K', description: 'Full-funnel brand & conversion reach' },
      { label: 'Average CTR', value: '3.3%', description: '29.7K high-intent storefront clicks' },
      { label: 'ROAS Lift', value: '4.8x', description: 'Sustainable profitable scaling' }
    ],
    challenge: 'A high-end lifestyle brand plateaued after iOS 14 privacy changes caused attribution gaps and rising ad costs on standard catalog ads.',
    solution: 'Restructured the paid acquisition funnel around creator UGC video hooks, dynamic product sets, and high-converting post-purchase cross-sells.',
    architecture: [
      'Multi-tiered audience segmentation separating cold discovery, warm engagers, and VIP cart abandoners',
      'Dynamic Product Ads (DPA) synced in real time with Shopify inventory and seasonal bundles',
      'Blended ROAS attribution dashboards cross-referencing Shopify analytics with Meta ad spend'
    ],
    techStack: ['Shopify Plus', 'Meta Ads Manager', 'Triple Whale', 'Klaviyo', 'Canva Pro'],
    year: '2024',
    duration: 'Ongoing',
    accentColor: '#ec4899',
    testimonial: {
      quote: 'PureTech scaled our ad spend profitably without deteriorating our margins. 4.8x ROAS has completely changed our growth trajectory.',
      author: 'Serena Liu',
      role: 'CMO, Lifestyle Flagship'
    }
  },

  // =========================================================================
  // 4. SEARCH ENGINE OPTIMIZATION (SEO / AEO / GEO)
  // =========================================================================
  {
    id: 'medical-education-seo',
    title: 'Medical Education Organic Growth',
    client: 'Premier Medical College & Institute',
    tagline: 'Driving organic growth for a medical institute — end-to-end technical, on-page, content, and local SEO.',
    category: 'growth',
    categoryLabel: 'Organic Search & SEO',
    heroImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://innoversol.com/innoversolcompanyprofile/#',
    tags: ['Medical Education', 'Organic Growth', 'Technical SEO', 'Content'],
    subCategory: 'Search Engine Optimization',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Organic Traffic', value: '2x Growth', description: 'Doubled organic traffic in 6 months' },
      { label: 'Search Reach', value: '2.54M', description: 'Impressions with 63.3K organic clicks' },
      { label: 'Keyword Rankings', value: '#1–#3', description: 'Top positions for competitive medical degrees' }
    ],
    challenge: 'A prominent medical education institute was losing prospective student enrollments to aggressive competitor PPC and outdated on-page schema.',
    solution: 'Executed a complete technical SEO overhaul, restructuring academic course taxonomy, publishing medically-reviewed content, and dominating regional search packs.',
    architecture: [
      'Schema.org Course & EducationalOrganization structured data markup for rich search snippets',
      'Core Web Vitals remediation cutting Largest Contentful Paint (LCP) from 4.2s to 1.1s',
      'High-authority medical content hub answering student admission and licensing queries'
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Next.js SEO', 'Schema.org'],
    year: '2024',
    duration: '2+ Years',
    accentColor: '#10b981',
    testimonial: {
      quote: 'We went from being invisible on page 3 to dominating top 3 rankings for our key degree programs. Our admissions phone lines haven\'t stopped ringing.',
      author: 'Dr. Hamza Siddiqui',
      role: 'Dean of Admissions, Medical Institute'
    }
  },
  {
    id: 'financial-services-state-seo',
    title: 'Financial Services State-Level SEO',
    client: 'Regional Wealth & Finance Group',
    tagline: 'State-level organic growth in a competitive niche with precise geographic targeting and search-console optimization.',
    category: 'growth',
    categoryLabel: 'Financial Services SEO',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-web-salesforce.mp4',
    liveUrl: 'https://innoversol.com/innoversolcompanyprofile/#',
    tags: ['Fintech', 'State SEO', 'Local Intent', 'Finance'],
    subCategory: 'Search Engine Optimization',
    galleryImages: [
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Organic Clicks', value: '+180%', description: 'Growth sustained over 8 months' },
      { label: 'Search Visibility', value: '590K', description: 'Impressions & 2.12K high-intent clicks' },
      { label: 'Geographic Capture', value: '98%', description: 'Dominant local state pack rankings' }
    ],
    challenge: 'A financial advisory firm struggled to capture commercial search traffic outside their home city, despite having licenses to operate across multiple US states.',
    solution: 'Engineered a programmatic state-by-state financial SEO architecture with localized compliance disclosures, retirement planning guides, and schema.',
    architecture: [
      'Programmatic state landing page templates with unique local financial regulatory disclosures',
      'Search Console intent cluster optimization targeting high-value retirement and wealth keywords',
      'Authoritative financial author bios structured with E-E-A-T rich schema markers'
    ],
    techStack: ['Google Search Console', 'Ahrefs', 'SurferSEO', 'Next.js', 'Schema.org JSON-LD'],
    year: '2024',
    duration: '8 Months',
    accentColor: '#3b82f6',
    testimonial: {
      quote: 'Our qualified consultation requests grew 180% without spending an extra dollar on PPC ads. PureTech\'s SEO strategy is pure gold.',
      author: 'Robert Sterling',
      role: 'Managing Partner, Wealth Advisory Group'
    }
  },
  {
    id: 'luxury-ecommerce-seo',
    title: 'Luxury E-Commerce SEO Stability',
    client: 'High-Net-Worth Luxury Retailer',
    tagline: 'Protecting organic performance through constant change — stability-first SEO holding rankings steady for an HNW brand.',
    category: 'growth',
    categoryLabel: 'Luxury Retail SEO',
    heroImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/bg-web-platforms.mp4',
    liveUrl: 'https://innoversol.com/innoversolcompanyprofile/#',
    tags: ['Luxury Retail', 'Catalog SEO', 'HNW E-commerce', 'Stability'],
    subCategory: 'Search Engine Optimization',
    galleryImages: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Average Position', value: '14.7 Held', description: 'Rock-solid SERP preservation' },
      { label: 'Ranking Drops', value: '0 Major', description: 'Zero penalty across catalog migrations' },
      { label: 'Revenue Retained', value: '$4.2M+', description: 'Protected high-value organic sales' }
    ],
    challenge: 'Frequent catalog deletions, seasonal inventory rotations, and URL redesigns were risking catastrophic organic revenue losses for a luxury brand.',
    solution: 'Implemented an automated canonical and redirection governance matrix that preserved equity and maintained top-tier organic rankings throughout site redesigns.',
    architecture: [
      'Dynamic automated 301 redirection engine mapping sold-out luxury items to relevant collections',
      'Faceted navigation SEO filtering preventing crawl budget waste on millions of variant combinations',
      'Server-side rendering optimization ensuring instant Googlebot catalog indexation'
    ],
    techStack: ['Shopify Plus', 'Google Search Console', 'Ahrefs', 'Screaming Frog', 'Cloudflare Workers'],
    year: '2024',
    duration: 'Ongoing',
    accentColor: '#eab308',
    testimonial: {
      quote: 'During our biggest catalog overhaul, our search traffic didn’t flinch. Zero ranking drops and total revenue protection.',
      author: 'Victoria Laurent',
      role: 'Head of Digital Luxury, Maison Privée'
    }
  },

  // =========================================================================
  // 5. PRODUCTION ENGINEERING & AUDIT SPOTLIGHT
  // =========================================================================
  {
    id: 'tream-ai',
    title: 'Tream.ai Engineering',
    client: 'Tream Platform · AI Labs',
    tagline: 'Code Audit, Architecture Hardening & Production Go-Live Deployment',
    category: 'enterprise',
    categoryLabel: 'Engineering & Go-Live',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
    videoUrl: '/videos/fantasy-software-build.mp4',
    liveUrl: 'https://tream.ai',
    appStoreUrl: 'https://app.tream.ai',
    tags: ['Code Audit', 'Hardening', 'Go-Live', 'AI Platform'],
    subCategory: 'Spotlight',
    galleryImages: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    ],
    metrics: [
      { label: 'Production Ready', value: '100%', description: 'Vibe-coded to hardened production' },
      { label: 'Security Vulnerabilities', value: '0', description: 'Remediated across full stack' },
      { label: 'Go-Live Velocity', value: '3 Weeks', description: 'From initial audit to live launch' }
    ],
    challenge: 'An AI startup built a prototype with AI coding tools that had critical memory leaks, authorization bypasses, and unstable deployment scripts.',
    solution: 'PureTech assigned a dedicated senior architect who conducted a comprehensive code audit, patched all security flaws, refactored the database, and shipped live.',
    architecture: [
      'Deep architectural audit identifying and remediating 24 critical security and performance bottlenecks',
      'Dockerized multi-stage CI/CD pipeline ensuring deterministic builds and zero-downtime rolling deploys',
      'Automated load testing validating 5,000 concurrent user sessions with zero database deadlocks'
    ],
    techStack: ['TypeScript', 'Node.js', 'React', 'Docker', 'PostgreSQL', 'AWS ECS', 'k6'],
    year: '2025',
    duration: '3 Weeks',
    accentColor: '#10b981',
    testimonial: {
      quote: 'PureTech saved our launch. They turned our raw prototype into an enterprise-grade, rock-solid platform ready for real customers.',
      author: 'Alexandre Roy',
      role: 'Co-Founder & CEO, Tream.ai'
    }
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: 'ui-ux-brand-design',
    number: '01',
    title: 'UI/UX & Brand Design',
    tagline: 'Elevate your digital presence with engaging, user-centered design and cohesive branding.',
    description: 'We craft human-centric interfaces, interactive prototypes, and timeless visual identities that turn complex digital journeys into effortless, memorable experiences across web, mobile, and spatial platforms.',
    iconName: 'LayoutGrid',
    subServices: [
      'UI/UX Design (Wireframing, User Journey Mapping, High-Fidelity UI, Interactive Prototypes)',
      'Brand & Identity (Brand Strategy, Visual Identity, Brand Guidelines, Design Systems)',
      'Video Editing & Motion (Promotional Videos, Motion Graphics, Social Media Reels)',
      'Social Media Design (Post & Ad Creatives, Carousel Visuals, Content Strategy)'
    ],
    technologies: ['Figma', 'Adobe XD', 'Illustrator', 'After Effects', 'Premiere Pro', 'Spline 3D', 'Tailwind CSS'],
    deliverables: [
      'Complete tokenized Figma design systems',
      'Clickable web and mobile prototypes (60 FPS)',
      'Vector visual identity kits & motion assets'
    ],
    color: '#f43f5e'
  },
  {
    id: 'web-app-development',
    number: '02',
    title: 'Web & App Development',
    tagline: 'Scalable, high-performance web and mobile solutions tailored to your business needs.',
    description: 'From high-concurrency web platforms and custom business portals to native iOS and Android flagship applications, we architect resilient, scalable software with clean code and modern cloud frameworks.',
    iconName: 'Globe',
    subServices: [
      'Web Design & Development (Custom Responsive Websites, React & Next.js Platforms, CMS)',
      'Mobile App Development (Native iOS Swift, Android Kotlin, Flutter & React Native)',
      'Custom Software Development (Tailored Business Software, Scalable Backend Systems)',
      'Custom Portal Development (Client & Vendor Portals, Admin Dashboards, Role-Based Access)'
    ],
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Flutter', 'React Native', 'Swift', 'Kotlin', 'Node.js', 'PostgreSQL', 'AWS'],
    deliverables: [
      'Production web apps & customer portal platforms',
      'Native iOS App Store & Android Google Play releases',
      '100% source code ownership & CI/CD deployment pipelines'
    ],
    color: '#38bdf8'
  },
  {
    id: 'ai-automation',
    number: '03',
    title: 'AI & Automation',
    tagline: 'Streamline operations, enhance customer engagement, and unlock data-driven efficiency.',
    description: 'We build autonomous AI agents, multi-turn conversational chatbots, automated workflow pipelines, and predictive intelligence dashboards that reduce operational friction and scale productivity.',
    iconName: 'Cpu',
    subServices: [
      'AI Chatbots & Conversational AI (Custom LLM Agents, Multi-Turn Bots, 24/7 Support)',
      'Process & Workflow Automation (Zapier, Make.com, Custom API Integrations)',
      'CRM Implementation & Maintenance (HubSpot, Salesforce, GoHighLevel Pipelines)',
      'Intelligent Reporting & Dashboards (Real-Time KPI Dashboards, Predictive Analytics)'
    ],
    technologies: ['OpenAI / Gemini APIs', 'LangChain', 'Python', 'Zapier', 'Make.com', 'HubSpot', 'Salesforce', 'BigQuery', 'Power BI'],
    deliverables: [
      'Custom trained AI assistant & chatbot integrations',
      'Automated end-to-end operational workflows',
      'Real-time executive reporting dashboards'
    ],
    color: '#10b981'
  },
  {
    id: 'growth-digital-marketing',
    number: '04',
    title: 'Growth & Digital Marketing',
    tagline: 'Accelerate visibility, generate qualified leads, and scale revenue with data-driven strategies.',
    description: 'We combine high-performance paid campaigns, modern search optimization (SEO/AEO/GEO), automated email funnels, and targeted B2B lead generation to convert digital attention into sustainable revenue.',
    iconName: 'Terminal',
    subServices: [
      'Performance Marketing (Meta & Google Ads Management, Precision Audience Targeting, Funnels)',
      'SEO / AEO / GEO (Search Engine, AI Engine & Generative Engine Optimization)',
      'Live Events & Webinars (Virtual Event Production, Funnel Strategy, Audience Engagement)',
      'Email Marketing & Automation (Drip Campaigns, Newsletter Strategy, Cold Outreach)',
      'Cold Calling & Lead Generation (B2B Lead Generation, Targeted Outreach, Appointment Setting)'
    ],
    technologies: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Semrush', 'Ahrefs', 'Klaviyo', 'Apollo.io', 'LinkedIn Sales Navigator'],
    deliverables: [
      'High-converting multi-channel ad campaigns',
      'Measurable top-ranking organic & AI search visibility',
      'Automated revenue & lead generation attribution dashboards'
    ],
    color: '#f59e0b'
  },
  {
    id: 'engineering-team-augmentation',
    number: '05',
    title: 'Engineering & Team Augmentation',
    tagline: 'Strengthen technical capabilities with expert code audits and dedicated engineering squads.',
    description: 'We provide senior software architects, code health audits, and cross-functional agile development pods that seamlessly integrate with your team to accelerate product delivery under strict NDA.',
    iconName: 'ShieldCheck',
    subServices: [
      'Code Audit & Go-Live Engineering (Architecture Review, Performance & Security Auditing)',
      'Dedicated Squad / Team Augmentation (Senior Engineers & Architects, Agile Pods)',
      'Zero-Defect QA & Automated Testing (Appium, Selenium, Multi-Device Test Harnesses)',
      'Cloud Infrastructure & CI/CD Hardening (Docker, Kubernetes, AWS/GCP Reliability)'
    ],
    technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Terraform', 'k6', 'SonarQube', 'Appium', 'Playwright'],
    deliverables: [
      'Full codebase audit & vulnerability remediation report',
      'Dedicated senior engineering squads deployed in sprints',
      'Zero-defect QA validation & automated CI/CD pipelines'
    ],
    color: '#a855f7'
  }
];

export const CORE_PILLARS: CorePillar[] = [
  {
    id: 'innovative-products',
    title: 'Innovative Digital Products',
    tagline: 'Solving real-world challenges and creating lasting business value.',
    description: 'At PureTech, we develop innovative digital products designed to solve real-world challenges and create lasting business value. Our management-ready solutions combine modern technology, intuitive functionality, and sustainable practices to help businesses operate smarter, faster, and more efficiently. From concept to deployment, we focus on creating products that are scalable, reliable, and built for long-term success.',
    iconName: 'Cpu',
    videoUrl: '/videos/fantasy-what-is-an-app.mp4',
    badge: 'FLAGSHIP PLATFORMS'
  },
  {
    id: 'sustainability-innovation',
    title: 'Sustainability Meets Innovation',
    tagline: 'Bridging innovation and sustainability for responsible technology.',
    description: 'We believe technology should not only drive growth but also contribute to a more sustainable future. Our solutions are designed to bridge innovation and sustainability by optimizing processes, reducing inefficiencies, and enabling businesses to make smarter use of their resources. By combining forward-thinking strategies with responsible technology, we help organizations create meaningful impact while staying competitive.',
    iconName: 'Globe',
    videoUrl: '/videos/capabilities-bg.mp4',
    badge: 'GREEN ARCHITECTURE'
  },
  {
    id: 'emerging-technologies',
    title: 'Emerging Technologies',
    tagline: 'Leveraging AI, blockchain, and automation for future-ready solutions.',
    description: 'At PureTech, we stay ahead of technological advancements by leveraging emerging technologies such as artificial intelligence, blockchain, automation, and other next-generation solutions. Our expertise allows us to transform complex ideas into practical digital products that are ready to meet today’s demands while remaining adaptable to tomorrow’s opportunities.',
    iconName: 'Terminal',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    badge: 'COGNITIVE AI & NEURAL'
  },
  {
    id: 'user-centered-experiences',
    title: 'User-Centered Experiences',
    tagline: 'Technology is only effective when people can use it effortlessly.',
    description: 'That’s why user experience is at the heart of everything we build. Our specialized UI/UX design approach focuses on creating intuitive, engaging, and visually compelling digital experiences. From the first interaction to everyday use, we ensure every product is designed around the needs of its users.',
    iconName: 'LayoutGrid',
    videoUrl: '/videos/fantasy-mobile-app.mp4',
    badge: '60 FPS FLUID MOTION'
  },
  {
    id: 'quality-built-in',
    title: 'Quality Built Into Every Product',
    tagline: 'Rigorously tested for reliability, security, and seamless functionality.',
    description: 'Quality assurance is an essential part of our development process. We rigorously test every solution to ensure reliability, security, performance, and seamless functionality before it reaches your users. Whether you’re a startup looking to turn an idea into reality or an established enterprise seeking digital transformation, PureTech is your trusted technology partner for building impactful products and achieving technological excellence.',
    iconName: 'ShieldCheck',
    videoUrl: '/videos/fantasy-software-build.mp4',
    badge: 'AUTOMATED QA SUITE'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Consultation',
    subtitle: 'Understanding Goals & Target Audience',
    description: 'We begin by understanding your business goals, project requirements, and target audience. Through detailed discussions, we gather insights that help us define the right strategy and create a roadmap tailored to your vision.',
    highlights: ['Stakeholder alignment', 'Requirement gathering', 'Audience profiling', 'Feasibility roadmap']
  },
  {
    number: '02',
    title: 'Planning & Strategy',
    subtitle: 'Structured Plan, Timelines & Architecture',
    description: 'Once the requirements are finalized, our team prepares a structured project plan, including timelines, technology selection, feature prioritization, and development milestones. This ensures transparency and keeps the project on track from day one.',
    highlights: ['Tech stack selection', 'Sprint milestone roadmaps', 'Feature prioritization', 'Resource architecture']
  },
  {
    number: '03',
    title: 'Design & Development',
    subtitle: 'Intuitive Interfaces & Scalable Code',
    description: 'Our designers create intuitive, user-focused interfaces while our developers transform ideas into scalable, high-performance digital solutions. Every feature is built with clean code, modern technologies, and future growth in mind.',
    highlights: ['Figma design systems', 'Clean modular code', 'Microservices & APIs', 'Modern frontend & mobile']
  },
  {
    number: '04',
    title: 'Testing & Quality Assurance',
    subtitle: 'Comprehensive Pre-Launch Verification',
    description: 'Before deployment, every product undergoes comprehensive testing to ensure security, performance, compatibility, and reliability. Our quality assurance process identifies and resolves issues early, delivering a seamless user experience.',
    highlights: ['Independent QA team', 'Automated regression', 'Security audit & pen testing', 'Real device validation']
  },
  {
    number: '05',
    title: 'Launch & Continuous Support',
    subtitle: 'Deployment, Maintenance & Evolution',
    description: 'After successful deployment, we continue to support your business with maintenance, updates, performance optimization, and feature enhancements. We believe long-term partnerships are built through continuous improvement and reliable support.',
    highlights: ['Zero-downtime cutover', 'Post-launch monitoring', 'Continuous feature updates', 'Long-term support SLA']
  }
];

export const MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    id: 'top-talent',
    number: '01',
    title: 'Top Talent',
    subtitle: 'Exceptional Engineering Craftsmanship',
    description: 'At Pure Tech, we prioritize recruiting top talent, as we believe in the immense value exceptional programmers bring to our team. Our rigorous selection process ensures that only the most skilled individuals join us, enabling us to deliver high-quality results for our clients.',
    keyPractices: ['Top 2% programmer evaluation', 'Continuous engineering mastery', 'Deep domain specialization']
  },
  {
    id: 'verification',
    number: '02',
    title: 'Verification',
    subtitle: 'Management, Peer Review & Independent QA',
    description: 'The verification process includes management review, peer review, automation, and quality assurance (QA). These practices ensure project oversight, maintain quality standards, promote knowledge sharing, and prevent errors. QA involves comprehensive testing by personnel outside the development team before client review, ensuring robustness and preventing regression errors.',
    keyPractices: ['Four-tier review protocol', 'Automated testing harnesses', 'Testing outside the dev pod']
  },
  {
    id: 'flexibility',
    number: '03',
    title: 'Flexibility',
    subtitle: 'Tailored Methodologies to Project Complexity',
    description: 'We tailor our software development methodologies to suit the unique requirements of each client’s project, recognizing its complexity. Our approach includes adapting coding styles and source management practices accordingly.',
    keyPractices: ['Adaptive Agile/Scrum cycles', 'Bespoke coding style alignment', 'Flexible repository workflows']
  },
  {
    id: 'the-right-balance',
    number: '04',
    title: 'The Right Balance',
    subtitle: 'Strategic Architecture vs. Iterative Velocity',
    description: 'The decision between extensive upfront design and an iterative approach is made at project initiation to ensure alignment with project goals and mitigate the risk of failure.',
    keyPractices: ['Risk mitigation analysis', 'Upfront architecture modeling', 'Iterative sprint delivery']
  }
];

export const WHAT_IF_CONCEPTS: WhatIfConcept[] = [
  {
    id: 'concept-1',
    tag: 'EMERGING AI SOLUTIONS',
    question: 'What if autonomous software agents could orchestrate entire enterprise workflows with zero latency and complete privacy?',
    solutionTitle: 'Synapse Core: Edge Multimodal Business Intelligence',
    hypothesis: 'By combining local edge inference with structured agent tool calling, enterprise teams turn manual operations into automated, self-healing digital pipelines.',
    technicalFeasibility: 'Production-ready on custom quantized transformer runtimes with sub-10ms response times.',
    impactPotential: 'Cuts operational processing bottlenecks by up to 74% across enterprise workflows.',
    category: 'AI & Autonomous Systems',
    prototypeMockup: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/fantasy-ai-eliza.mp4',
    youtubeId: 'Fg5HYn5bkm8'
  },
  {
    id: 'concept-2',
    tag: 'SUSTAINABILITY & INNOVATION',
    question: 'What if intelligent cloud optimization could cut corporate compute energy and cloud bills by 30% automatically?',
    solutionTitle: 'EcoCompute: Green Infrastructure & Resource Governor',
    hypothesis: 'Dynamic workload shifting and algorithmic resource throttling bridge innovation and sustainability, optimizing processes and reducing carbon waste.',
    technicalFeasibility: 'Tested on multi-cloud Kubernetes clusters across AWS, Azure, and Google Cloud.',
    impactPotential: 'Delivers 32% direct cloud cost reduction while reducing corporate digital carbon footprint.',
    category: 'Sustainable Cloud',
    prototypeMockup: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/fantasy-software-build.mp4',
    youtubeId: 'ZK-rNEhJIDs'
  },
  {
    id: 'concept-3',
    tag: 'USER-CENTERED COMMERCE',
    question: 'What if digital experiences felt as tactile, responsive, and immediate as physical world-class flagships?',
    solutionTitle: 'Aura Commerce: Instant 60FPS Spatial Storefront',
    hypothesis: 'Pairing edge-rendered React architectures with predictive micro-interactions creates intuitive journeys that turn digital attention into loyal customers.',
    technicalFeasibility: 'Tested with 0.3s First Contentful Paint and 100/100 Core Web Vitals scores.',
    impactPotential: 'Drives verified +47% conversion gains across mobile and desktop interfaces.',
    category: 'Digital Experiences',
    prototypeMockup: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80',
    videoUrl: '/videos/fantasy-web-salesforce.mp4',
    youtubeId: 'J4xNhYeaGkI'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'PureTech Innovations transformed the way we manage our digital operations. Their team delivered a reliable, scalable solution that improved efficiency and streamlined our workflow. Their professionalism, communication, and attention to detail made the entire experience exceptional.',
    author: 'James Allen',
    role: 'CEO',
    company: 'Enterprise Digital Operations',
    location: 'Canada',
    projectType: 'Custom Software & Digital Transformation',
    metric: 'Streamlined Operational Workflow'
  },
  {
    id: 'test-2',
    quote: 'Working with PureTech Innovations was an excellent experience from start to finish. They understood our requirements quickly and turned our ideas into a modern, high-performance solution. The team was responsive, flexible, and genuinely committed to achieving the best results.',
    author: 'Mason Brooks',
    role: 'CEO',
    company: 'Technology Solutions',
    location: 'USA',
    projectType: 'High-Performance Web & Mobile Solution',
    metric: 'Fast Delivery & Modern UX'
  },
  {
    id: 'test-3',
    quote: 'PureTech Innovations helped us bring our vision to life with a solution that was both innovative and easy to use. Their technical expertise, creative thinking, and commitment to quality were evident throughout the project. We were extremely impressed with the final outcome.',
    author: 'Ryan Mitchell',
    role: 'COO',
    company: 'Product & Logistics Network',
    location: 'Canada',
    projectType: 'Innovative & Easy-To-Use Platform',
    metric: 'Technical Excellence & Quality'
  },
  {
    id: 'test-4',
    quote: 'PureTech Innovations provided an outstanding digital solution that significantly improved our business processes. Their team combined strong technical knowledge with a clear understanding of our goals. Their proactive communication and willingness to adapt made the collaboration smooth and highly productive.',
    author: 'Jimmy Franzen',
    role: 'Managing Director',
    company: 'Global Ventures',
    location: 'Dubai',
    projectType: 'Process Automation & Enterprise Solution',
    metric: 'Smooth Collaboration & Productive Output'
  },
  {
    id: 'test-5',
    quote: 'PureTech Innovations delivered a future-ready solution that exceeded our expectations. From design and development to testing and deployment, every stage was handled with professionalism and precision. Their team’s innovation, flexibility, and dedication made them a valuable technology partner.',
    author: 'Ethan Tan',
    role: 'Technology Director',
    company: 'Asia-Pacific Tech Hub',
    location: 'Singapore',
    projectType: 'Future-Ready Cloud & Mobile Architecture',
    metric: 'Precision & Technological Excellence'
  }
];

export const CLIENT_LOGOS = [
  { name: 'Vanguard Bio', category: 'HealthTech' },
  { name: 'AeroLogix', category: 'Logistics' },
  { name: 'Veloce Capital', category: 'Fintech' },
  { name: 'OmniHealth', category: 'Healthcare' },
  { name: 'Nexus Luxury', category: 'E-Commerce' },
  { name: 'Spectra Robotics', category: 'Robotics' },
  { name: 'Kinetix Labs', category: 'Computer Vision' },
  { name: 'Hyperion Cloud', category: 'Enterprise' },
  { name: 'Synapse AI', category: 'Deep Learning' }
];

export const COMPANY_FACTS = {
  name: 'PureTech Innovations',
  headline: 'Transform Ideas Into Success',
  subheadline: 'Technology That Moves Your Business Forward',
  missionStatement: 'We help businesses turn ambitious ideas into powerful digital products through innovative technology, smart strategy, and seamless user experiences.',
  quoteProposition: 'Providing you the perfect solution for your business needs. Let’s work together and unlock doors to success.',
  headquarters: '163 Parhouse St PMB 6017 Dallas, TX 75207, USA',
  phone: '+1 (972) 325-9561',
  secondaryPhone: '+1 (347) 783-9296',
  email: 'info@puretechinnovations.com',
  deliveryHubs: [
    { 
      country: 'United States', 
      code: 'US', 
      flag: '🇺🇸', 
      city: 'Dallas, Texas', 
      label: '163 Parhouse St PMB 6017 Dallas, TX 75207', 
      fullAddress: '163 Parhouse St PMB 6017 Dallas, TX 75207',
      region: 'North America' 
    },
    { 
      country: 'Canada', 
      code: 'CA', 
      flag: '🇨🇦', 
      city: 'Saskatoon, SK', 
      label: '1220 Pringle Way, Saskatoon, SK, S7T 1C9', 
      fullAddress: '1220 Pringle Way, Saskatoon, SK, S7T 1C9, Canada',
      region: 'North America' 
    },
    { 
      country: 'Pakistan', 
      code: 'PK', 
      flag: '🇵🇰', 
      city: 'Karachi, Sindh', 
      label: 'B-802, 8th floor Fortune Tower, Shahrah-e-faisal, PECHS Karachi', 
      fullAddress: 'B-802, 8th floor Fortune Tower, Shahrah-e-faisal, Block-6 PECHS Karachi Sindh',
      region: 'South Asia' 
    }
  ],
  stats: [
    { value: '140+', label: 'Shipped Products', detail: 'From concept and UI/UX to enterprise scale' },
    { value: '99.8%', label: 'QA Verification Rate', detail: 'Management & peer review + automated testing' },
    { value: '100%', label: 'Ownership & NDA', detail: 'Full IP transfer and strict confidentiality' },
    { value: '5★', label: 'Client Satisfaction', detail: 'Endorsed across US, Canada, Dubai & Singapore' }
  ]
};

