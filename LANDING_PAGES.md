# Development landing pages

Seven pages are available locally after `npm install` and `npm run dev`:

- `/top-ai-agent-development-companies`
- `/top-custom-software-development-companies`
- `/top-web-development-companies`
- `/top-web-development-companies-for-educational-institutions`
- `/top-web-development-companies-for-healthcare-providers`
- `/top-web-development-companies-for-manufacturing-companies`
- `/top-web-development-companies-for-small-business`

The homepage's **Solutions** navigation item leads to links for all seven pages. Each landing page reuses the original homepage Header and Footer components, plus related-page links. Shared navigation returns to the corresponding homepage section; the header Start button scrolls to the landing-page inquiry form.

## Content and presentation

- `src/data/landingPages.ts`: typed, serializable page records, including titles, descriptions, capabilities, sample journeys, comparison criteria, and FAQs.
- `src/pages/LandingPage.tsx`: shared responsive page layout with a homepage-style particle hero and topic-specific headline.
- `src/components/LandingLeadForm.tsx`: required name/email/project fields, optional company/budget, and a prefilled email draft.
- `src/pages/LandingSections.tsx`: shared cinematic body sections, interactive capability spotlight, lazy background video playback, process timeline, FAQs, and related solutions.
- `src/pages/landing-sections.css`: homepage-style dark sections, white/gold typography, glass panels, responsive layouts, and decorative motion.
- `src/pages/landing.css`: scoped presentation, responsive layouts, focus states, and reduced-motion handling.
- `src/components/LandingDirectory.tsx`: homepage directory.
- `src/main.tsx`: URL-based selection and lazy loading of homepage/landing-page components. Navigation uses ordinary links, so direct loads and browser history work without a router dependency.

These are PureTech service/buying-guide pages, not third-party company rankings. Their workflow previews are explicitly illustrative. Review the draft copy against the actual service offering before publication.

The hero form validates the required fields and opens a pre-addressed email draft containing the page topic and entered details. It retains the values if the visitor has no email app configured. The other inquiry links also open an email draft. They do not submit a form, store a lead, or claim delivery. There is no new backend or CMS in this change. The existing homepage forms remain as they were.

The future CMS can supply the `LandingPageContent` shape; publishing, authentication, storage, and validation still need implementation. Shared process text and contact messaging currently live in the template and should also be modeled when building the CMS.

## Build and hosting

Run `npm run lint` for the TypeScript check and `npm run build` for production output. The Vite build emits an HTML entry for every landing URL with its own initial title, description, and Open Graph text. Page body content is still rendered by React in the browser. Explicit Vercel rewrites precede the existing SPA fallback.

This change also removes the viewport zoom restriction and narrows a video element type in the existing homepage so the TypeScript check passes. No external deployment was performed.

## Section design and motion

All seven pages share the homepage-inspired section treatment. The former light section and basic capability grid are replaced with a dark orbital brand visual and an interactive capability showcase. Existing project videos are loaded near the relevant sections, played only while visible, and paused by the section motion toggle or reduced-motion preference. The process introduction is sticky on desktop and stacked on mobile. The homepage Header and Footer remain shared.
