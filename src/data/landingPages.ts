export interface LandingPageContent {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  headline: string;
  heroLead: string;
  heroHighlight: string;
  description: string;
  accent: string;
  signal: string;
  challenge: string;
  approach: string;
  capabilities: { title: string; description: string; deliverable: string }[];
  journeys: { name: string; steps: string[]; description: string }[];
  criteria: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

// Serializable page records: presentation and content are deliberately separate.
// A future CMS can supply this same shape without rebuilding the page layout.
export const LANDING_PAGES: LandingPageContent[] = [
  {
    slug: 'top-ai-agent-development-companies',
    title: 'Top AI Agent Development Companies', shortTitle: 'AI Agent Development',
    heroLead: 'We build what’s next in', heroHighlight: 'intelligent AI agents.',
    category: 'Intelligent systems', headline: 'From answering questions. To getting things done.',
    description: 'Choosing an AI development partner? Start with the workflow, the permissions, and the evidence. Explore how PureTech can turn a repetitive process into a purposeful AI agent with people in control.',
    accent: '#a5b4fc', signal: 'INTELLIGENCE / WITH INTENTION',
    challenge: 'A convincing demo is only the beginning.',
    approach: 'Useful agents need more than a prompt. They need reliable information, scoped access to your tools, and a clear path back to a person when the task becomes uncertain. We start with one measurable workflow and design the controls around it.',
    capabilities: [
      { title: 'Knowledge agents', description: 'Help teams navigate internal documentation with permission-aware retrieval and answers that point back to their sources.', deliverable: 'Search, retrieval & source citations' },
      { title: 'Workflow agents', description: 'Connect language interfaces to useful actions, with validation and approval before consequential changes.', deliverable: 'Tool integrations & approval flows' },
      { title: 'Customer assistance', description: 'Design a helpful first response, collect the right context, and hand conversations to a human when needed.', deliverable: 'Conversation design & escalation' },
      { title: 'Evaluation & operations', description: 'Define task-specific evaluation cases, inspect failures, and monitor quality, latency, and cost after release.', deliverable: 'Evaluation sets & operational visibility' },
    ],
    journeys: [
      { name: 'Knowledge', steps: ['Ask a question', 'Retrieve sources', 'Ground the answer', 'Review evidence'], description: 'An internal assistant that helps people find useful answers while respecting the boundaries of the underlying information.' },
      { name: 'Operations', steps: ['Receive request', 'Check permissions', 'Approve action', 'Record outcome'], description: 'A controlled workflow that proposes an action and asks for approval before changing a business system.' },
      { name: 'Support', steps: ['Understand intent', 'Find context', 'Suggest resolution', 'Escalate clearly'], description: 'A support assistant designed around helpful resolutions and a clear handoff, rather than endless automated replies.' },
    ],
    criteria: [
      { title: 'Evaluate real tasks', description: 'Ask potential partners to demonstrate representative tasks, edge cases, and failure recovery using an agreed evaluation set.' },
      { title: 'Inspect the boundaries', description: 'Discuss tool permissions, source access, human approvals, and how sensitive information will be handled.' },
      { title: 'Plan beyond launch', description: 'Clarify monitoring, model changes, recurring costs, and ownership of prompts, integrations, and evaluation assets.' },
    ],
    faqs: [
      { question: 'How is an AI agent different from a chatbot?', answer: 'A chatbot primarily exchanges messages. An agent may also retrieve information and use tools to complete a defined task. The useful distinction is what it is allowed to do, how its work is checked, and when a human takes over.' },
      { question: 'Can we start with one internal workflow?', answer: 'Yes. A bounded pilot is a practical starting point: select a repetitive task, define success, connect only the necessary systems, and evaluate before expanding access.' },
      { question: 'Do we need to train our own model?', answer: 'Not necessarily. Retrieval, carefully designed tool use, and an existing model may be sufficient. Model selection and any fine-tuning should follow the task, data constraints, and evaluation results.' },
      { question: 'What should we share for an initial discussion?', answer: 'Describe the workflow, the tools involved, the intended users, and what a good outcome looks like. Use sample or anonymized information for the initial conversation.' },
    ],
  },
  {
    slug: 'top-custom-software-development-companies',
    title: 'Top Custom Software Development Companies', shortTitle: 'Custom Software',
    heroLead: 'Software built around', heroHighlight: 'your ambition.',
    category: 'Purpose-built platforms', headline: 'Your business is unique. Your software should fit.',
    description: 'Compare software partners on how well they understand your operation. PureTech helps shape custom products around real users, clear priorities, and the systems your business already depends on.',
    accent: '#67e8f9', signal: 'COMPLEXITY / MADE USEFUL',
    challenge: 'Stop building your process around the workaround.',
    approach: 'Disconnected tools and manual handoffs make everyday work harder than it needs to be. A custom platform should remove that friction. We map the workflow, identify the smallest valuable release, and build an architecture that can evolve.',
    capabilities: [
      { title: 'Business platforms', description: 'Bring approvals, records, and operational tasks into a focused application shaped around your team.', deliverable: 'Workflow mapping & role-based interfaces' },
      { title: 'SaaS products', description: 'Turn a product idea into a coherent experience, from onboarding and account management to the core customer workflow.', deliverable: 'Product discovery & release planning' },
      { title: 'System integrations', description: 'Connect existing tools with explicit data contracts, error handling, and visibility into synchronization.', deliverable: 'APIs & integration monitoring' },
      { title: 'Legacy modernization', description: 'Replace fragile parts of an existing system in stages, with migration and continuity considered from the start.', deliverable: 'Architecture review & migration roadmap' },
    ],
    journeys: [
      { name: 'Operations', steps: ['Receive work', 'Assign ownership', 'Review progress', 'Close the loop'], description: 'A shared workspace that gives people the context and controls to move work forward.' },
      { name: 'SaaS product', steps: ['Create account', 'Set up workspace', 'Complete core task', 'Manage access'], description: 'A purposeful product journey that brings customers to value without unnecessary complexity.' },
      { name: 'Integration', steps: ['Read event', 'Validate data', 'Sync systems', 'Track exceptions'], description: 'A visible integration pipeline with a plan for retries, mismatches, and operational ownership.' },
    ],
    criteria: [
      { title: 'Demand discovery', description: 'Look for a partner who asks about users, constraints, and existing workflows before promising a fixed solution.' },
      { title: 'Make delivery visible', description: 'Agree on acceptance criteria, demonstrations, testing responsibilities, and how scope changes are handled.' },
      { title: 'Own the outcome', description: 'Clarify source-code access, infrastructure ownership, documentation, handover, and ongoing support.' },
    ],
    faqs: [
      { question: 'When does custom software make sense?', answer: 'It is worth exploring when an important workflow cannot be served well by existing products, or when integrations and manual work create persistent friction. Discovery should also consider whether configuring an existing tool is enough.' },
      { question: 'Can you work with an existing application?', answer: 'An existing application can be assessed for incremental improvement, integration, or staged replacement. The starting point is a review of the code, architecture, and operational requirements.' },
      { question: 'How do you estimate cost and delivery time?', answer: 'An estimate depends on workflows, integrations, data migration, user roles, and release priorities. A scoped discovery phase helps turn assumptions into an actionable proposal.' },
      { question: 'What happens after the first release?', answer: 'Plan for a handover, monitoring, maintenance, and an agreed improvement backlog. Support arrangements and ownership should be explicit in the project agreement.' },
    ],
  },
  {
    slug: 'top-web-development-companies',
    title: 'Top Web Development Companies', shortTitle: 'Web Development',
    heroLead: 'We build what’s next in', heroHighlight: 'digital experiences.',
    category: 'Digital experiences', headline: 'Make your next impression impossible to ignore.',
    description: 'A great website brings brand, usability, and engineering together. Explore what to look for in a web development company and how PureTech can shape a digital experience around your next business goal.',
    accent: '#f6891f', signal: 'BRAND / MEETS ENGINEERING',
    challenge: 'Beautiful is the starting point. Useful is the goal.',
    approach: 'Your visitors arrive with a question or a task. We build the journey around that intent, then bring it to life through expressive design, responsive interfaces, and content your team can maintain.',
    capabilities: [
      { title: 'Brand websites', description: 'Translate your positioning into a distinctive, coherent experience with clear paths to the next action.', deliverable: 'Content architecture & visual design' },
      { title: 'Web applications', description: 'Build interactive tools and customer-facing workflows with purposeful navigation and thoughtful error states.', deliverable: 'Product interfaces & application logic' },
      { title: 'Content platforms', description: 'Structure reusable sections and publishing workflows so content changes do not depend on a developer.', deliverable: 'CMS models & editorial workflows' },
      { title: 'Commerce experiences', description: 'Help shoppers understand the offering and move through discovery, selection, and checkout with clarity.', deliverable: 'Catalog journeys & platform integrations' },
    ],
    journeys: [
      { name: 'Brand', steps: ['Make an impression', 'Explain the value', 'Build confidence', 'Start a conversation'], description: 'A brand experience that gives every section a job and every visitor a clear next step.' },
      { name: 'Content', steps: ['Draft a story', 'Preview the page', 'Review changes', 'Publish confidently'], description: 'An editorial workflow designed for the people who will maintain the website every week.' },
      { name: 'Commerce', steps: ['Discover products', 'Compare options', 'Add to basket', 'Complete checkout'], description: 'A purchase journey that prioritizes clear information, usable controls, and reliable integrations.' },
    ],
    criteria: [
      { title: 'Look beyond screenshots', description: 'Review mobile navigation, content structure, accessible interactions, and the quality of real page journeys.' },
      { title: 'Ask about maintainability', description: 'Understand how editors update pages, how reusable components work, and what requires a new deployment.' },
      { title: 'Define launch readiness', description: 'Agree on browser coverage, performance checks, redirects, analytics requirements, and post-launch support.' },
    ],
    faqs: [
      { question: 'Can the website match our existing brand?', answer: 'Yes. Existing identity assets, tone of voice, and design guidelines can inform the website. If the identity needs refinement, that work should be included in the scope.' },
      { question: 'Will our team be able to edit the content?', answer: 'A CMS can expose agreed content fields and reusable sections. The editing scope should be designed alongside the site so your team can maintain the content that matters.' },
      { question: 'Can we migrate content from an old website?', answer: 'Yes, subject to access and format. A migration plan should include a content inventory, URL mapping, asset handling, and validation before launch.' },
      { question: 'How do we get a useful proposal?', answer: 'Share the purpose of the website, key audiences, expected pages, integrations, brand assets, and any deadlines. We can use that context to define a practical scope.' },
    ],
  },
  {
    slug: 'top-web-development-companies-for-educational-institutions',
    title: 'Top Web Development Companies for Educational Institutions', shortTitle: 'Education',
    heroLead: 'A brighter digital future for', heroHighlight: 'education.',
    category: 'Education & learning', headline: 'Open a clearer path to the next chapter.',
    description: 'Connect prospective students, families, and faculty with the information they need. Explore an education website approach built around program discovery, admissions journeys, and manageable publishing.',
    accent: '#fcd34d', signal: 'CURIOSITY / WITHOUT FRICTION',
    challenge: 'An institution has many voices. Its website needs one clear structure.',
    approach: 'Courses, departments, admissions, and campus life all compete for attention. We organize content around audience needs, give editors a consistent framework, and make important next steps easier to find.',
    capabilities: [
      { title: 'Program discovery', description: 'Help prospective students explore subjects, formats, entry requirements, and relevant next steps.', deliverable: 'Program catalogs & useful filters' },
      { title: 'Admissions journeys', description: 'Explain application stages and deadlines, with clear links into existing admissions systems.', deliverable: 'Applicant pathways & inquiry journeys' },
      { title: 'Department publishing', description: 'Give distributed teams reusable content patterns with appropriate review and publishing roles.', deliverable: 'Department templates & content governance' },
      { title: 'Campus information', description: 'Organize events, resources, and student support information for visitors across devices.', deliverable: 'Resource hubs & event structures' },
    ],
    journeys: [
      { name: 'Admissions', steps: ['Explore programs', 'Check requirements', 'Plan an application', 'Connect with admissions'], description: 'A clear path from initial curiosity to an informed application decision.' },
      { name: 'Student life', steps: ['Find a resource', 'Explore support', 'Check an event', 'Contact the right team'], description: 'A usable information hub that reduces the effort of finding everyday campus support.' },
      { name: 'Publishing', steps: ['Update a program', 'Check accuracy', 'Approve content', 'Publish the change'], description: 'An editorial workflow for keeping course and department information consistent.' },
    ],
    criteria: [
      { title: 'Understand the audiences', description: 'Ask how the partner will distinguish prospective students, current students, families, and staff in the information architecture.' },
      { title: 'Test real journeys', description: 'Review how someone finds a program, understands its requirements, and reaches admissions using a phone or keyboard.' },
      { title: 'Plan content ownership', description: 'Agree on who updates program information, reviews deadlines, and maintains departmental pages after launch.' },
    ],
    faqs: [
      { question: 'Can departments manage their own pages?', answer: 'A CMS can support department-specific roles and approval steps. The permission model should reflect your institution’s editorial responsibilities.' },
      { question: 'Can the site connect to our LMS or student systems?', answer: 'Integration depends on the systems, APIs, and access available. We can assess whether the right approach is a direct integration, single sign-on, or a clear handoff to an existing portal.' },
      { question: 'How will accessibility be addressed?', answer: 'Accessibility should be included in design, development, and testing: keyboard navigation, readable content, labels, contrast, and assistive-technology checks. Specific acceptance criteria should be agreed before implementation.' },
      { question: 'Can we handle multiple campuses?', answer: 'Yes. Shared content models can support campus-specific programs, contacts, events, and pages while keeping navigation and visual identity consistent.' },
    ],
  },
  {
    slug: 'top-web-development-companies-for-healthcare-providers',
    title: 'Top Web Development Companies for Healthcare Providers', shortTitle: 'Healthcare',
    heroLead: 'Thoughtful digital experiences for', heroHighlight: 'better care journeys.',
    category: 'Patient-centered experiences', headline: 'Make the first step toward care feel simpler.',
    description: 'Help people find the right service, location, and next step with a website designed for clarity. PureTech’s approach centers on patient journeys, thoughtful content, and carefully scoped integrations.',
    accent: '#6ee7b7', signal: 'CLARITY / BUILDS CONFIDENCE',
    challenge: 'When people need care, confusion is a barrier.',
    approach: 'A healthcare website should help visitors orient themselves quickly. We prioritize clear service information, usable provider discovery, and deliberate handoffs to approved scheduling and patient systems.',
    capabilities: [
      { title: 'Provider discovery', description: 'Organize specialties, locations, languages, and provider profiles into a helpful directory.', deliverable: 'Directory structure & search journeys' },
      { title: 'Service information', description: 'Create readable service pages that explain what visitors can expect and where to go next.', deliverable: 'Service templates & editorial review flows' },
      { title: 'Appointment pathways', description: 'Connect visitors to the appropriate scheduling system with clear expectations and sensible fallback options.', deliverable: 'Booking handoffs & integration scoping' },
      { title: 'Location experiences', description: 'Make practical information easy to find, from opening hours and directions to contact details.', deliverable: 'Location pages & shared content fields' },
    ],
    journeys: [
      { name: 'Find care', steps: ['Choose a service', 'Explore providers', 'Select a location', 'Open scheduling'], description: 'An illustrative patient journey that reduces uncertainty before a visitor reaches your approved booking system.' },
      { name: 'Plan a visit', steps: ['Find the location', 'Check opening hours', 'Read visit guidance', 'Get directions'], description: 'Practical information presented together so visitors can prepare for an appointment.' },
      { name: 'Content review', steps: ['Draft information', 'Clinical review', 'Approve changes', 'Publish updates'], description: 'A publishing approach that leaves medical content review with the appropriate professionals.' },
    ],
    criteria: [
      { title: 'Map information handling', description: 'Establish which systems receive information and what should stay out of public website forms.' },
      { title: 'Scope integrations early', description: 'Discuss scheduling vendors, patient portals, identity requirements, and the approval process before committing to functionality.' },
      { title: 'Review the human experience', description: 'Evaluate readable language, clear contact paths, accessibility, and how urgent or sensitive journeys are handled.' },
    ],
    faqs: [
      { question: 'Does a new website automatically make us compliant?', answer: 'No. Compliance cannot be inferred from a design or framework. Requirements depend on your organization, jurisdiction, data flows, vendors, and operating practices, and should be reviewed with your legal and security teams.' },
      { question: 'Can the website connect to our appointment system?', answer: 'Potentially. The approach depends on your scheduling vendor and its supported integrations. A secure handoff to an existing system may be more appropriate than collecting information on the public site.' },
      { question: 'Who should approve medical content?', answer: 'Your designated clinical or editorial reviewers should approve medical content. The website can support a draft-and-review workflow and clear ownership of each page.' },
      { question: 'What should we send for an initial conversation?', answer: 'Share the public website goals, locations, service categories, and the names of systems that may need integration. Please do not send patient records or sensitive health information.' },
    ],
  },
  {
    slug: 'top-web-development-companies-for-manufacturing-companies',
    title: 'Top Web Development Companies for Manufacturing Companies', shortTitle: 'Manufacturing',
    heroLead: 'Precision engineering for', heroHighlight: 'your digital presence.',
    category: 'Industrial digital platforms', headline: 'Turn technical capability into commercial clarity.',
    description: 'Give engineers, procurement teams, and distributors a clearer view of what you make. Explore manufacturing websites built around product information, technical resources, and useful quote requests.',
    accent: '#fb923c', signal: 'PRECISION / IN EVERY INTERACTION',
    challenge: 'Your capabilities deserve more than a downloadable brochure.',
    approach: 'Industrial buyers need specifications, applications, and confidence that a supplier understands their requirements. We bring that information into an organized digital experience and connect it to a practical inquiry process.',
    capabilities: [
      { title: 'Product catalogs', description: 'Structure product families, specifications, and application information so buyers can find relevant options.', deliverable: 'Catalog models & comparison criteria' },
      { title: 'RFQ journeys', description: 'Help buyers describe requirements clearly and route inquiries to the appropriate commercial team.', deliverable: 'Quote-request workflows & routing' },
      { title: 'Technical libraries', description: 'Organize datasheets, drawings, manuals, and versioned resources alongside the products they describe.', deliverable: 'Document taxonomy & resource access' },
      { title: 'Distributor experiences', description: 'Scope partner access and useful integrations around your current sales and fulfillment processes.', deliverable: 'Partner portal discovery & integration plans' },
    ],
    journeys: [
      { name: 'Product search', steps: ['Choose a family', 'Filter specifications', 'Review documents', 'Request a quote'], description: 'A technical buying journey that puts specifications and commercial next steps in the same place.' },
      { name: 'RFQ', steps: ['Describe the need', 'Add requirements', 'Route to sales', 'Review the request'], description: 'An inquiry workflow designed to collect useful context before the first sales conversation.' },
      { name: 'Resources', steps: ['Find a product', 'Choose a document', 'Check the version', 'Access the resource'], description: 'A document library designed around relevance, ownership, and clear version information.' },
    ],
    criteria: [
      { title: 'Check catalog thinking', description: 'Ask how product families, units, specifications, and related documents will be modeled and maintained.' },
      { title: 'Follow an inquiry', description: 'Review what information an RFQ captures, where it goes, and how the sales team follows up.' },
      { title: 'Connect with care', description: 'Clarify the system of record for product and availability data before planning ERP, PIM, or CRM integration.' },
    ],
    faqs: [
      { question: 'Can the website support a large product catalog?', answer: 'Yes, with appropriate data models and search requirements. Catalog size, attribute consistency, and the source of product data should be assessed before selecting the implementation.' },
      { question: 'Can buyers download drawings and datasheets?', answer: 'A document library can connect files to products and categories. Public versus restricted access, version control, and file ownership should be agreed during discovery.' },
      { question: 'Can quote requests reach our CRM?', answer: 'This depends on the CRM and available integrations. We can scope field mapping, routing, validation, and failure handling as part of the inquiry workflow.' },
      { question: 'Do we need online checkout?', answer: 'Not always. For configured products or negotiated pricing, a well-designed RFQ journey may be more useful than checkout. The website should reflect how your customers actually buy.' },
    ],
  },
  {
    slug: 'top-web-development-companies-for-small-business',
    title: 'Top Web Development Companies for Small Business', shortTitle: 'Small Business',
    heroLead: 'Big digital possibilities for', heroHighlight: 'small businesses.',
    category: 'Built for your next stage', headline: 'A smaller business can make a bigger impression.',
    description: 'Build a website that clearly explains your offer and makes getting in touch easy. Explore a practical approach to small-business web development, with focused scope and room to grow.',
    accent: '#f9a8d4', signal: 'SMALL TEAM / BIG AMBITION',
    challenge: 'You need a useful website. And a manageable commitment.',
    approach: 'The strongest first release is often focused: explain the service, answer common questions, and help people take the next step. We prioritize what your customers need today and leave a clear path for tomorrow’s additions.',
    capabilities: [
      { title: 'Service websites', description: 'Present what you do, who you help, and how customers can start working with you.', deliverable: 'Focused pages & clear calls to action' },
      { title: 'Local business presence', description: 'Bring hours, service areas, contact details, and location information together in a usable mobile experience.', deliverable: 'Location content & contact journeys' },
      { title: 'Bookings & inquiries', description: 'Connect the website to the tools you already use to arrange appointments and respond to potential customers.', deliverable: 'Booking links & form integration scope' },
      { title: 'Easy content updates', description: 'Plan an editing experience for your real needs, from changing services to updating images and business details.', deliverable: 'Reusable sections & editor guidance' },
    ],
    journeys: [
      { name: 'Services', steps: ['Discover your offer', 'Understand the fit', 'Read common questions', 'Get in touch'], description: 'A focused service journey that helps people decide whether your business is right for them.' },
      { name: 'Bookings', steps: ['Choose a service', 'Check the details', 'Open booking tool', 'Arrange a time'], description: 'A simple handoff into your existing booking process, with clear expectations before the click.' },
      { name: 'Updates', steps: ['Choose a section', 'Update the content', 'Preview the page', 'Publish the change'], description: 'A future editing workflow designed for a busy owner, not a full-time content team.' },
    ],
    criteria: [
      { title: 'Keep the scope explicit', description: 'Compare included pages, content responsibilities, revision rounds, and what happens when you need an extra feature.' },
      { title: 'Understand ongoing costs', description: 'Ask about hosting, domain ownership, maintenance, third-party subscriptions, and support after launch.' },
      { title: 'Choose something maintainable', description: 'See how everyday updates will work and confirm that your team receives the access and guidance it needs.' },
    ],
    faqs: [
      { question: 'Can we start with a small website?', answer: 'Yes. A focused first release can cover your offer, business information, common questions, and contact options. Additional pages and features can follow when there is a clear need.' },
      { question: 'Do I need to provide all the copy and images?', answer: 'Content responsibilities can be included in the proposal. Existing brand assets and accurate business information are a helpful starting point; new copy should be reviewed by your team before publication.' },
      { question: 'Can you connect our existing booking tool?', answer: 'Many projects can use a booking link or supported embed. The implementation depends on your provider and whether a simple handoff or deeper integration is needed.' },
      { question: 'Will I be able to add pages later?', answer: 'A CMS and reusable page sections can make that possible. Agree on the types of pages you want to create so the editing tools can be designed around them.' },
    ],
  },
];

export function findLandingPage(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return LANDING_PAGES.find(page => page.slug === slug);
}
