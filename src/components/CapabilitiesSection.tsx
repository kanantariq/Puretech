import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Globe, 
  LayoutGrid, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';
import { Capability } from '../types';
import { fadeInUp } from './MotionWrappers';

const ICON_MAP: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />,
  Smartphone: <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400" />,
  Globe: <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6 text-[#f6891f]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
  Terminal: <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
};

// Video showcases mapped directly to engineering capabilities
const CAPABILITY_VIDEOS: Record<string, string> = {
  'ui-ux-brand-design': '/videos/bg-web-platforms.mp4',
  'web-app-development': '/videos/fantasy-web-salesforce.mp4',
  'ai-automation': '/videos/fantasy-ai-eliza.mp4',
  'growth-digital-marketing': '/videos/fantasy-master-sizzle.mp4',
  'engineering-team-augmentation': '/videos/fantasy-software-build.mp4',
};

// High-fidelity fallback posters relevant to software, web, mobile, and design
const CAPABILITY_POSTERS: Record<string, string> = {
  'ui-ux-brand-design': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2000&q=80',
  'web-app-development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80',
  'ai-automation': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80',
  'growth-digital-marketing': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80',
  'engineering-team-augmentation': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80',
};

interface CapabilitiesProps {
  onStartProjectWithCapability: (capabilityName: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesProps> = ({
  onStartProjectWithCapability
}) => {
  const { capabilities: CAPABILITIES } = useHomepageContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapability = CAPABILITIES[activeIndex] || CAPABILITIES[0];
  const totalDisciplines = String(CAPABILITIES.length).padStart(2, '0');

  // Fantasy.co Scroll Synchronizer:
  // Detects which discipline title is currently centered on the left side and updates the sticky right showcase
  useEffect(() => {
    const handleScroll = () => {
      const elements = CAPABILITIES.map((c) =>
        document.getElementById(`cap-step-${c.id}`)
      );

      const targetY = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      elements.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - targetY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDiscipline = (index: number, id: string) => {
    setActiveIndex(index);
    const el = document.getElementById(`cap-step-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="capabilities" className="relative bg-[#06080d]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH EDGE-TO-EDGE STICKY BACKGROUND VIDEO                        */}
      {/* ========================================================================= */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-0">
        {CAPABILITIES.map((cap, idx) => {
          const isActive = activeIndex === idx;
          const vidSrc = CAPABILITY_VIDEOS[cap.id] || '/videos/capabilities-bg.mp4';
          const posterSrc = CAPABILITY_POSTERS[cap.id] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80';
          return (
            <div
              key={cap.id}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${posterSrc})` }}
            >
              <video
                ref={(el) => {
                  if (el) {
                    el.defaultMuted = true;
                    el.muted = true;
                    el.playbackRate = 0.8;
                    if (isActive) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                    }
                  }
                }}
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  v.defaultMuted = true;
                  v.muted = true;
                  if (isActive) v.play().catch(() => {});
                }}
                src={vidSrc}
                poster={posterSrc}
                autoPlay={isActive}
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.72] saturate-[1.1]"
              />
            </div>
          );
        })}

        {/* Ambient vignettes */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06080d] to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06080d] to-transparent pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[#06080d]/25 pointer-events-none z-20" />

        {/* Floating indicator */}
        <div className="absolute bottom-8 right-8 z-30 pointer-events-auto hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/75 backdrop-blur-xl border border-white/10 text-xs font-mono-tech shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-white font-bold">
            0{activeIndex + 1} <span className="text-slate-500">/</span> {totalDisciplines}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-semibold">{activeCapability.title}</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND CONTENT (SCROLLING OVER THE FULL-WIDTH BACKGROUND)          */}
      {/* ========================================================================= */}
      <div className="-mt-[100vh] relative z-10 pt-28 sm:pt-36 pb-36 sm:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            }}
            className="max-w-3xl mb-16 sm:mb-24"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-3">
              <span className="text-slate-200 font-medium">SERVICES &amp; DISCIPLINES // ARCHITECTURE</span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter leading-tight mb-4">
              Lead by design. <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                Engineered to scale.
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              From autonomous AI systems and flagship mobile apps to enterprise web architectures and mission-critical cloud infrastructure.
            </motion.p>
          </motion.div>

          {/* ========================================================================= */}
          {/* MOBILE DISCIPLINE INTERACTIVE EXPERIENCE (< lg)                           */}
          {/* ========================================================================= */}
          <div className="lg:hidden space-y-6 pt-4 pb-12">
            {/* Horizontal Scrollable Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
              {CAPABILITIES.map((cap, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full border text-xs font-mono-tech transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold">{cap.number}</span>
                    <span className="font-medium whitespace-nowrap">{cap.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Showcase Card */}
            <div className="relative rounded-[24px] overflow-hidden border border-white/20 bg-slate-950/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl p-5 sm:p-7">
              {/* Top Bar with Icon & Counter */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/20 backdrop-blur-md shadow-lg shrink-0">
                    {ICON_MAP[activeCapability.iconName] || <Cpu className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-400 block font-bold">
                      DISCIPLINE {activeCapability.number} // {totalDisciplines}
                    </span>
                    <h4 className="text-lg font-display font-black text-white tracking-tight leading-tight">
                      {activeCapability.title}
                    </h4>
                  </div>
                </div>

                <span className="shrink-0 whitespace-nowrap inline-flex items-center px-2.5 py-1 rounded-full bg-black/40 border border-white/15 text-[11px] font-mono-tech text-slate-200 backdrop-blur-md">
                  {activeCapability.technologies.length} Tech
                </span>
              </div>

              {/* Tagline & Overview */}
              <div className="space-y-1.5 py-4">
                <p className="text-sm font-medium text-white leading-snug">
                  {activeCapability.tagline}
                </p>
                <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                  {activeCapability.description}
                </p>
              </div>

              {/* Scopes */}
              <div className="space-y-2 pb-4">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-300/90 block font-semibold">
                  SPECIALIZED SCOPES
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {(activeCapability.subServices || []).slice(0, 4).map((sub, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2 text-xs text-slate-200 bg-black/35 p-2 rounded-lg border border-white/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-tight font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pb-4">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-300/90 block font-semibold">
                  FRAMEWORKS &amp; RUNTIMES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeCapability.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-black/35 border border-white/10 text-[11px] font-mono-tech text-slate-300 whitespace-nowrap"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prev / Next & CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
                  <button
                    onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : CAPABILITIES.length - 1))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-white"
                  >
                    ← Prev
                  </button>
                  <span>{activeCapability.number} / {totalDisciplines}</span>
                  <button
                    onClick={() => setActiveIndex((prev) => (prev < CAPABILITIES.length - 1 ? prev + 1 : 0))}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:text-white"
                  >
                    Next →
                  </button>
                </div>

                <button
                  onClick={() => onStartProjectWithCapability(activeCapability.title)}
                  className="w-full py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <span>ENGAGE THIS DISCIPLINE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SCROLLYTELLING SERVICES (LEFT TITLES SCROLL, RIGHT STICKS)                */}
          {/* ========================================================================= */}
          <div className="hidden lg:grid relative grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: SCROLLING SERVICE TITLES */}
            <div className="lg:col-span-6 space-y-16 sm:space-y-28 lg:space-y-48 py-6 sm:py-12 lg:py-16">
              {CAPABILITIES.map((cap, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={cap.id}
                    id={`cap-step-${cap.id}`}
                    onClick={() => scrollToDiscipline(idx, cap.id)}
                    className={`cursor-pointer transition-all duration-500 group relative ${
                      isActive ? 'opacity-100' : 'opacity-25 hover:opacity-60'
                    }`}
                  >
                    {/* Number & Category Eyebrow */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`font-mono-tech text-xs sm:text-sm font-bold tracking-widest px-3 py-1 rounded-full border transition-all ${
                          isActive
                            ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30 shadow-lg shadow-cyan-400/20'
                            : 'text-slate-500 bg-white/[0.02] border-white/5'
                        }`}
                      >
                        {cap.number}
                      </span>
                      <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-500">
                        DISCIPLINE {cap.number} // {totalDisciplines}
                      </span>
                    </div>

                    {/* Typography Title */}
                    <h3 className={`text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1] transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {cap.title}
                    </h3>

                    {/* Dynamic Tagline Snippet visible on active */}
                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                      }`}
                    >
                      <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-lg">
                        {cap.tagline}
                      </p>
                    </div>

                    {/* Interactive Glowing Indicator Bar */}
                    <div className="mt-6 flex items-center gap-3">
                      <div
                        className={`h-0.5 rounded-full transition-all duration-500 ${
                          isActive
                            ? 'w-24 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-400/50'
                            : 'w-8 bg-white/10 group-hover:w-12'
                        }`}
                      />
                      {isActive && (
                        <span className="text-[11px] font-mono-tech uppercase tracking-wider text-cyan-400 animate-pulse font-semibold">
                          CURRENT VIEW
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: STICKY SHOWCASE COCKPIT (WELL-ALIGNED IN VIEWPORT) */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 lg:self-start pt-2">
              <div className="relative rounded-[28px] overflow-hidden border border-white/20 bg-slate-950/70 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-6 sm:p-8">
                
                {/* Dynamic Content Panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCapability.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5 sm:space-y-6"
                  >
                    {/* Top Bar with Icon & Counter */}
                    <div className="flex items-center justify-between border-b border-white/15 pb-4 gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2.5 rounded-2xl bg-black/50 border border-white/20 backdrop-blur-md shadow-lg shrink-0">
                          {ICON_MAP[activeCapability.iconName] || <Cpu className="w-5 h-5 text-cyan-400" />}
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-400 block font-bold">
                            DISCIPLINE {activeCapability.number} // {totalDisciplines}
                          </span>
                          <h4 className="text-lg sm:text-xl font-display font-black text-white tracking-tight">
                            {activeCapability.title}
                          </h4>
                        </div>
                      </div>

                      <span className="shrink-0 whitespace-nowrap inline-flex items-center px-3 py-1 rounded-full bg-black/40 border border-white/15 text-xs font-mono-tech text-slate-200 backdrop-blur-md">
                        {activeCapability.technologies.length} Technologies
                      </span>
                    </div>

                    {/* Tagline & Architectural Overview */}
                    <div className="space-y-1.5">
                      <p className="text-sm sm:text-base font-medium text-white leading-snug">
                        {activeCapability.tagline}
                      </p>
                      <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                        {activeCapability.description}
                      </p>
                    </div>

                    {/* Specialized Scopes & Architecture Checklist */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-300/90 block font-semibold">
                        SPECIALIZED SCOPES &amp; ARCHITECTURES
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeCapability.subServices.slice(0, 4).map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-start gap-2 text-xs text-slate-200 bg-black/40 p-2.5 rounded-xl border border-white/10 backdrop-blur-md"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-tight font-medium">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Frameworks & Technologies Pills */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-300/90 block font-semibold">
                        FRAMEWORKS, RUNTIMES &amp; CLOUDS
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeCapability.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono-tech text-slate-200 backdrop-blur-md whitespace-nowrap"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono-tech text-emerald-400 flex items-center gap-1.5 uppercase font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Senior Squad Delivery
                        </span>
                        <span className="text-[10px] text-slate-400 font-light block">
                          Direct architect Slack &amp; MS Teams integration
                        </span>
                      </div>

                      <button
                        onClick={() => onStartProjectWithCapability(activeCapability.title)}
                        className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer active:scale-95"
                      >
                        <span>Engage This Discipline</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Bottom Timeline Quick Jump Dots */}
                <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                  <span className="text-[10px] uppercase tracking-wider">0{activeIndex + 1} // {totalDisciplines} Disciplines</span>
                  <div className="flex items-center gap-1.5">
                    {CAPABILITIES.map((c, dotIdx) => (
                      <button
                        key={c.id}
                        onClick={() => scrollToDiscipline(dotIdx, c.id)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeIndex === dotIdx
                            ? 'w-6 bg-cyan-400 shadow-md shadow-cyan-400/50'
                            : 'w-1.5 bg-white/20 hover:bg-white/50'
                        }`}
                        title={c.title}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
