import React, { useState, useRef } from 'react';
import { ShieldCheck, MapPin, Lock, CheckCircle2, Users, Eye, Sliders, Scale } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';
import { fadeInUp } from './MotionWrappers';

const MANIFESTO_ICONS: Record<string, React.ReactNode> = {
  'top-talent': <Users className="w-5 h-5 text-cyan-400" />,
  'verification': <Eye className="w-5 h-5 text-purple-400" />,
  'flexibility': <Sliders className="w-5 h-5 text-emerald-400" />,
  'the-right-balance': <Scale className="w-5 h-5 text-amber-400" />
};

export const AboutSection: React.FC = () => {
  const { manifestoPillars: MANIFESTO_PILLARS } = useHomepageContent();
  const [activeManifestoId, setActiveManifestoId] = useState(MANIFESTO_PILLARS[0].id);
  const activeManifesto = MANIFESTO_PILLARS.find(m => m.id === activeManifestoId) || MANIFESTO_PILLARS[0];
  const manifestoScrollerRef = useRef<HTMLDivElement>(null);

  // Scrollytelling scroll observer for the Manifesto section
  const { scrollYProgress } = useScroll({
    target: manifestoScrollerRef,
    offset: ['start start', 'end end']
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map 0 -> 1 progress to 4 manifesto steps:
    // 0.00 - 0.25 -> 0 (top-talent)
    // 0.25 - 0.50 -> 1 (verification)
    // 0.50 - 0.75 -> 2 (flexibility)
    // 0.75 - 1.00 -> 3 (the-right-balance)
    const count = MANIFESTO_PILLARS.length;
    let idx = Math.min(count - 1, Math.floor(latest * count));
    if (idx >= 0 && idx < count && MANIFESTO_PILLARS[idx].id !== activeManifestoId) {
      setActiveManifestoId(MANIFESTO_PILLARS[idx].id);
    }
  });

  const handlePillarClick = (id: string) => {
    setActiveManifestoId(id);
  };

  return (
    <section id="about" className="pt-20 sm:pt-32 pb-0 relative">
      {/* TOP GRID: THE PURETECH PRINCIPLE · ALPHARETTA HQ SPOTLIGHT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 border-b border-white/[0.08] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
            className="lg:col-span-7 space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-3">
              <span className="text-slate-200 font-medium">THE PURETECH PRINCIPLE // ABOUT US</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              Technology that moves{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                your business forward.
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-200 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Founded in Alpharetta, Georgia, PureTech Innovations helps businesses turn ambitious ideas into powerful digital products through innovative technology, smart strategy, and seamless user experiences.
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-sm sm:text-base text-slate-300 font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              We bridge innovation and sustainability to optimize processes, eliminate inefficiencies, and create products built for long-term operational success.
            </motion.p>

            {/* Core Values / High-Tech Glass Badges */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-[#f6891f]/30 transition-all space-y-2 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2.5 text-white font-display font-bold text-base">
                  <div className="p-1.5 rounded-lg bg-[#f6891f]/15 border border-[#f6891f]/30">
                    <Lock className="w-4 h-4 text-[#f6891f]" />
                  </div>
                  <span>100% IP Confidentiality</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Every concept, repository, and data pipeline is fortified with enterprise-grade non-disclosure agreements and zero-trust security.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-emerald-500/30 transition-all space-y-2 backdrop-blur-xl shadow-lg">
                <div className="flex items-center gap-2.5 text-white font-display font-bold text-base">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>QA at the Core</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Continuous multi-device automation (Appium, Selenium, k6) ensures zero-defect reliability across real production environments.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Device Chassis / Alpharetta HQ Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Device Frame with Top Notch / Browser Bar */}
            <div className="rounded-[28px] overflow-hidden border border-white/20 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative group">
              {/* Window Header */}
              <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono-tech text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f6891f]" />
                  <span>puretechinnovations.com // alpharetta-node</span>
                </span>
                <span className="w-6" />
              </div>

              {/* Video Showcase inside Device */}
              <div 
                className="relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80)' }}
              >
                <video
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                    }
                  }}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    v.defaultMuted = true;
                    v.muted = true;
                    v.play().catch(() => {});
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
                  className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.12]"
                >
                  <source src="/videos/fantasy-software-build.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Glassmorphic Location HUD Card */}
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-white/15 space-y-1.5 shadow-2xl">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#f6891f] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#f6891f]" />
                      GLOBAL HEADQUARTERS
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      ACTIVE STUDIO
                    </span>
                  </div>
                  <div className="text-base font-display font-bold text-white tracking-tight">
                    14800 Hopewell Rd, Alpharetta, GA 30004
                  </div>
                  <div className="text-[11px] font-mono-tech text-slate-400 flex items-center justify-between">
                    <span>Atlanta Tech Corridor · USA</span>
                    <span className="text-slate-300">Mon - Fri · 9AM - 6PM EST</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* OPERATING METHODOLOGY // MANIFESTO (Sticky Scrollytelling Stage) */}
      {/* ======================================================== */}
      <div 
        ref={manifestoScrollerRef} 
        className="relative min-h-[280vh] sm:min-h-[320vh] bg-transparent z-20"
      >
        {/* Pinned full-bleed stage */}
        <div className="sticky top-0 left-0 w-full min-h-screen flex flex-col justify-center py-6 sm:py-10 lg:py-16 z-20 overflow-hidden">
          {/* Subtle Ambient Background Lighting */}
          <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />
          <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Header Block */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-white/10 mb-5 sm:mb-8">
              <div className="max-w-3xl space-y-1.5 sm:space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-[0.25em] text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>OPERATING METHODOLOGY // MANIFESTO</span>
                </div>
                <h3 className="text-xl sm:text-3xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.08]">
                  How we engineer software without compromise.
                </h3>
              </div>
              <p className="max-w-md text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Our systematic approach eliminates guesswork, fortifies code quality, and ensures seamless execution from kickoff to multi-region production.
              </p>
            </div>

            {/* Interactive Inner Page Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-stretch">
              {/* Left Column: Interactive Tenet Navigation */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-2 sm:space-y-2.5">
                {MANIFESTO_PILLARS.map((manifesto) => {
                  const isSelected = activeManifestoId === manifesto.id;
                  return (
                    <div
                      key={manifesto.id}
                      id={`manifesto-item-${manifesto.id}`}
                      onClick={() => handlePillarClick(manifesto.id)}
                      className={`p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                        isSelected
                          ? 'bg-zinc-950/80 border-cyan-500/60 shadow-[0_10px_35px_rgba(6,182,212,0.2)] backdrop-blur-lg'
                          : 'bg-zinc-950/35 border-white/10 hover:border-white/25 hover:bg-zinc-950/50 backdrop-blur-md'
                      }`}
                    >
                      {/* Active Accent Left Border Bar */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeManifestoIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-400"
                        />
                      )}

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono-tech text-xs sm:text-base font-bold transition-colors ${
                            isSelected ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                          }`}>
                            {manifesto.number}
                          </span>

                          <div>
                            <h4 className={`text-sm sm:text-base lg:text-lg font-display font-bold transition-colors ${
                              isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                            }`}>
                              {manifesto.title}
                            </h4>
                            <span className="text-[10px] sm:text-xs font-mono-tech text-slate-400 line-clamp-1">
                              {manifesto.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className={`p-1.5 sm:p-2 rounded-xl border transition-all shrink-0 ${
                          isSelected 
                            ? 'bg-cyan-500/10 border-cyan-400/30 text-cyan-300' 
                            : 'bg-white/[0.04] border-white/10 text-slate-400 group-hover:text-white'
                        }`}>
                          {MANIFESTO_ICONS[manifesto.id]}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Assurance Note */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-2.5 text-[11px] sm:text-xs font-mono-tech text-slate-400">
                  <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-400 shrink-0" />
                  <span>Audited against ISO &amp; Zero-Trust Architecture benchmarks</span>
                </div>
              </div>

              {/* Right Column: Deep Editorial Tenet Showcase Canvas */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeManifesto.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl sm:rounded-[28px] p-5 sm:p-7 lg:p-10 bg-zinc-950/75 border border-white/20 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[320px] sm:min-h-[400px]"
                  >
                    {/* Decorative Background Large Watermark Number */}
                    <div className="absolute right-4 -bottom-6 text-[120px] sm:text-[220px] font-mono-tech font-black text-white/[0.03] select-none pointer-events-none leading-none">
                      {activeManifesto.number}
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

                    {/* Card Header */}
                    <div className="relative z-10 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono-tech text-cyan-300 font-bold uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>TENET {activeManifesto.number} // OPERATIONAL STANDARD</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10">
                          {MANIFESTO_ICONS[activeManifesto.id]}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                          {activeManifesto.title}
                        </h4>
                        <p className="text-xs sm:text-sm font-mono-tech text-cyan-400 mt-0.5">
                          {activeManifesto.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed pt-1">
                        {activeManifesto.description}
                      </p>
                    </div>

                    {/* Key Practices & Delivery Seal */}
                    <div className="relative z-10 space-y-4 pt-5 mt-5 border-t border-white/10">
                      <div className="space-y-2">
                        <span className="text-[10px] sm:text-[11px] font-mono-tech text-slate-400 uppercase tracking-widest block font-bold">
                          SYSTEMATIC PRACTICES &amp; CONTROLS
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {activeManifesto.keyPractices.map((practice, i) => (
                            <div
                              key={i}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 text-[11px] sm:text-xs font-mono-tech text-slate-200 transition-colors"
                            >
                              <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span>{practice}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] sm:text-xs font-mono-tech text-slate-400">
                        <span>PureTech Code Health Standard</span>
                        <span className="text-cyan-400 font-bold tracking-wider">
                          100% INDEPENDENT VALIDATION
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
