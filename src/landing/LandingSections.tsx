import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Cpu, Fingerprint, Layers3, Pause, Play, Route, Sparkles } from 'lucide-react';
import { LANDING_PAGES, type LandingPageContent } from '../data/landingPages';
import { COMPANY_FACTS } from '../data/content';

const FILMS: Record<string, string> = {
  'AI Agent Development': '/videos/fantasy-ai-eliza.mp4',
  'Custom Software': '/videos/fantasy-software-build.mp4',
  'Web Development': '/videos/bg-web-platforms.mp4',
  Education: '/videos/bg-apps-showcase.mp4',
  Healthcare: '/videos/omnihealth-ai.mp4',
  Manufacturing: '/videos/aerologix-global.mp4',
  'Small Business': '/videos/fantasy-what-is-an-app.mp4',
};

const PHASES = [
  { label: 'Discover', title: 'Find the real problem.', text: 'Align on your users, existing systems, constraints, and what a useful first release should achieve.', output: 'A shared direction', icon: Fingerprint },
  { label: 'Design', title: 'Make the idea tangible.', text: 'Explore the content and key journeys in a prototype. Agree on scope and acceptance criteria before building.', output: 'A clear experience', icon: Layers3 },
  { label: 'Engineer', title: 'Build. Review. Refine.', text: 'Work through focused milestones with demonstrations, integration checks, and feedback along the way.', output: 'A working product', icon: Cpu },
  { label: 'Evolve', title: 'Launch with a plan.', text: 'Validate the agreed scope, prepare the handover, and define ownership for maintenance and future improvements.', output: 'An informed next step', icon: Route },
];

// Load a film only near its section and stop playback when it leaves the viewport.
function SectionFilm({ src, playing }: { src: string; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const preload = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setNearby(true); }, { rootMargin: '200px' });
    const visibility = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    preload.observe(ref.current); visibility.observe(ref.current);
    return () => { preload.disconnect(); visibility.disconnect(); };
  }, []);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (playing && visible && nearby) { video.playbackRate = 0.8; video.play().catch(() => {}); }
    else video.pause();
  }, [playing, visible, nearby]);
  return <div className="ls-film" aria-hidden="true"><video ref={ref} src={nearby ? src : undefined} muted loop playsInline preload="none" tabIndex={-1} /><div /></div>;
}

function Reveal({ children, className = '', enabled }: { children?: ReactNode; className?: string; enabled: boolean }) {
  return <motion.div className={className} initial={enabled ? { opacity: 0, y: 28 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: enabled ? 0.65 : 0 }}>{children}</motion.div>;
}

export function LandingSections({ page, inquiryHref }: { page: LandingPageContent; inquiryHref: string }) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);
  const [paused, setPaused] = useState(false);
  const moving = !reduced && !paused;
  const [active, setActive] = useState(0);
  const capability = page.capabilities[active];
  const journey = page.journeys[active % page.journeys.length];
  const icons = [Layers3, Route, Fingerprint, Sparkles];
  const ActiveIcon = icons[active];
  const index = LANDING_PAGES.indexOf(page);
  const related = [1, 2, 3].map(offset => LANDING_PAGES[(index + offset) % LANDING_PAGES.length]);
  const film = FILMS[page.shortTitle];
  return <div className="ls" data-motion={moving ? 'on' : 'off'}>
    <section id="perspective" className="ls-section ls-perspective">
      <div className="ls-grid-texture" aria-hidden="true" />
      <div className="lp-container">
        <div className="ls-topline"><span className="ls-label">THE PURETECH PERSPECTIVE / {page.shortTitle}</span><button className="ls-motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={!!reduced}>{moving ? <Pause size={12} /> : <Play size={12} />}{reduced ? 'Reduced motion enabled' : paused ? 'Resume section motion' : 'Pause section motion'}</button></div>
        <div className="ls-perspective-grid">
          <Reveal enabled={moving}>
            <span className="ls-kicker">01 / BEYOND THE EXPECTED</span>
            <h2 className="ls-title">Built with purpose.<br /><em>Made to move you.</em></h2>
            <p className="ls-challenge">{page.challenge}</p>
            <p className="ls-body">{page.approach}</p>
            <div className="ls-value-pills"><span><Fingerprint size={15} /> Human-centered thinking</span><span><Cpu size={15} /> Purposeful engineering</span></div>
            <a className="ls-arrow-link" href="#partner">Find your development partner <ArrowUpRight size={18} /></a>
          </Reveal>
          <Reveal enabled={moving} className="ls-orbit-panel">
            <div className="ls-orbit-grid" aria-hidden="true" />
            <div className="ls-orbit-ring ls-ring-one" aria-hidden="true"><i /></div><div className="ls-orbit-ring ls-ring-two" aria-hidden="true"><i /></div>
            <div className="ls-core"><img src="/puretech-icon.png" alt="" width="64" height="64" /><span>PURETECH</span><small>IDEAS INTO EXPERIENCES</small></div>
            <span className="ls-orbit-tag ls-tag-top"><Fingerprint size={16} /> STRATEGY</span><span className="ls-orbit-tag ls-tag-right"><Layers3 size={16} /> EXPERIENCE</span><span className="ls-orbit-tag ls-tag-bottom"><Cpu size={16} /> ENGINEERING</span>
            <div className="ls-orbit-caption"><span className="ls-dot" /> {page.category}<span>CONNECTED BY DESIGN</span></div>
          </Reveal>
        </div>
      </div>
    </section>

    <section id="expertise" className="ls-section ls-expertise">
      <SectionFilm src={film} playing={moving} />
      <div className="lp-container ls-foreground">
        <Reveal enabled={moving} className="ls-heading-row"><div><span className="ls-kicker">02 / OUR ENGINEERING DISCIPLINES</span><h2 className="ls-title">Purpose in every<br /><em>moving part.</em></h2></div><p className="ls-body">Explore the possibilities.<br />Every capability connects to a meaningful business outcome.</p></Reveal>
        <div className="ls-expertise-grid">
          <div className="ls-capability-nav" aria-label="Explore capabilities">
            {page.capabilities.map((item, i) => <button key={item.title} onClick={() => setActive(i)} aria-pressed={active === i} aria-controls="capability-detail" className={active === i ? 'is-active' : ''}><span className="ls-cap-number">0{i + 1}</span><span><strong>{item.title}</strong><small>{item.deliverable}</small></span><ArrowUpRight size={22} /></button>)}
            <a className="ls-arrow-link" href="#project-inquiry">Build something extraordinary <ArrowUpRight size={18} /></a>
          </div>
          <div id="capability-detail" className="ls-showcase" aria-live="polite" aria-atomic="true">
            <div className="ls-showcase-bar"><span><i className="ls-dot" /> CAPABILITY SPOTLIGHT</span><span>0{active + 1} / 04</span></div>
            <div className="ls-showcase-content" key={capability.title}>
              <div className="ls-showcase-icon"><ActiveIcon size={32} strokeWidth={1.25} /></div>
              <h3>{capability.title}</h3><p className="ls-body">{capability.description}</p>
              <div className="ls-flow-heading"><span>{journey.name} / AN EXAMPLE JOURNEY</span><Route size={15} /></div>
              <div className="ls-journey">{journey.steps.map((step, i) => <div key={step}><span>0{i + 1}</span><p>{step}</p>{i === journey.steps.length - 1 ? <Check size={14} /> : <ArrowDown size={14} />}</div>)}</div>
              <div className="ls-scope-note"><Check size={15} /><span>{capability.deliverable}</span></div>
            </div>
          </div>
        </div>
        <div className="ls-section-caption"><span>YOUR AMBITION. OUR CANVAS.</span><span>ILLUSTRATIVE WORKFLOW / TAILORED IN DISCOVERY</span></div>
      </div>
    </section>

    <section id="partner" className="ls-section ls-partner">
      <div className="ls-halo" aria-hidden="true" />
      <div className="lp-container">
        <Reveal enabled={moving} className="ls-heading-row"><div><span className="ls-kicker">03 / THE RIGHT PARTNERSHIP</span><h2 className="ls-title">Great work starts with<br /><em>the right questions.</em></h2></div><p className="ls-body">When comparing {page.title.replace(/^Top /, '').toLowerCase()}, look at how the team thinks, builds, and hands over the work.</p></Reveal>
        <div className="ls-partner-cards">{page.criteria.map((item, i) => <div key={item.title}><Reveal enabled={moving}><article className="ls-principle"><span className="ls-outline-number" aria-hidden="true">0{i + 1}</span><div className="ls-principle-icon">{i === 0 ? <Fingerprint /> : i === 1 ? <Layers3 /> : <Route />}</div><span className="ls-label">PARTNERSHIP PRINCIPLE / 0{i + 1}</span><h3>{item.title}</h3><p className="ls-body">{item.description}</p><a href={inquiryHref}>Let’s talk it through <ArrowUpRight size={17} /></a></article></Reveal></div>)}</div>
      </div>
    </section>

    <section id="approach" className="ls-section ls-approach">
      <div className="ls-grid-texture" aria-hidden="true" />
      <div className="lp-container ls-process-layout">
        <div className="ls-sticky-intro"><span className="ls-kicker">04 / HOW WE MAKE IT HAPPEN</span><h2 className="ls-title">From possibility<br />to <em>what’s next.</em></h2><p className="ls-body">A shared process. Clear decisions.<br />Space to learn as the work takes shape.</p><div className="ls-process-map" aria-label="Delivery stages">{PHASES.map((phase, i) => <a href={`#delivery-${i}`} key={phase.label}><span>0{i + 1}</span>{phase.label}<ArrowDown size={14} /></a>)}</div><a href="#project-inquiry" className="ls-arrow-link">Map out your next move <ArrowUpRight size={18} /></a></div>
        <div className="ls-process-track">{PHASES.map((phase, i) => <div key={phase.label}><Reveal enabled={moving}><article id={`delivery-${i}`} className="ls-process-card"><div className="ls-process-card-top"><span className="ls-label">PHASE 0{i + 1} / {phase.label}</span><phase.icon size={27} strokeWidth={1.3} /></div><span className="ls-process-ghost" aria-hidden="true">0{i + 1}</span><h3>{phase.title}</h3><p className="ls-body">{phase.text}</p><div className="ls-process-output"><Check size={15} /><span>{phase.output}</span></div></article></Reveal></div>)}</div>
      </div>
    </section>

    <section id="questions" className="ls-section ls-questions">
      <div className="lp-container ls-faq-grid"><Reveal enabled={moving}><span className="ls-kicker">05 / CLARITY BEFORE COMMITMENT</span><h2 className="ls-title">Big ideas.<br /><em>Clear answers.</em></h2><p className="ls-body">Your questions are part of the process.<br />Let’s make the next step an informed one.</p><a className="ls-question-contact" href={inquiryHref}><span><Sparkles size={24} /></span><div>Have something else in mind?<strong>Talk to PureTech <ArrowUpRight size={16} /></strong></div></a></Reveal><div className="ls-faq-list">{page.faqs.map((faq, i) => <details key={faq.question}><summary><span>0{i + 1}</span><strong>{faq.question}</strong><ChevronDown size={19} /></summary><p>{faq.answer}</p></details>)}</div></div>
    </section>

    <section id="start" className="ls-section ls-start">
      <SectionFilm src="/videos/contact-bg.mp4" playing={moving} />
      <div className="ls-start-lines" aria-hidden="true"><i /><i /><i /></div>
      <Reveal enabled={moving} className="lp-container ls-start-content"><span className="ls-kicker">THE NEXT CHAPTER IS YOURS TO CREATE</span><h2 className="ls-title">Bring the ambition.<br /><em>We’ll bring the spark.</em></h2><p className="ls-body">Tell us what you want to build, what is getting in the way,<br className="ls-desktop-break" /> and what a successful first release would look like.</p><a className="ls-start-button" href="#project-inquiry">LET’S BUILD WHAT’S NEXT <ArrowUpRight size={20} /></a><a className="ls-email-link" href={inquiryHref}>{COMPANY_FACTS.email}<ArrowUpRight size={14} /></a><div className="ls-start-signoff"><span /><p>THOUGHTFULLY DESIGNED. PURPOSEFULLY ENGINEERED.</p><span /></div></Reveal>
    </section>

    <section className="ls-section ls-related"><div className="lp-container"><Reveal enabled={moving} className="ls-heading-row"><div><span className="ls-kicker">EXPLORE THE POSSIBILITIES</span><h2 className="ls-title">Your next<br /><em>digital advantage.</em></h2></div><a className="ls-arrow-link" href="/#solutions">Explore all solutions <ArrowUpRight size={18} /></a></Reveal><div className="ls-related-grid">{related.map((item, i) => <a href={`/${item.slug}`} key={item.slug}><div className="ls-related-art" aria-hidden="true"><span className="ls-art-ring" /><span className="ls-art-ring" /><span className="ls-art-ring" /><div>{i === 0 ? <Cpu size={46} /> : i === 1 ? <Layers3 size={46} /> : <Route size={46} />}</div><small>0{i + 1} / PURETECH</small></div><div className="ls-related-copy"><span className="ls-label">{item.category}</span><h3>{item.shortTitle}<ArrowUpRight size={24} /></h3><p>{item.headline}</p></div></a>)}</div></div></section>
  </div>;
}
