import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Cpu, 
  Globe, 
  Terminal, 
  LayoutGrid, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  Star,
  Check
} from 'lucide-react';
import { useHomepageContent } from './HomepageContentContext';

const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-7 h-7 text-cyan-400" />,
  Globe: <Globe className="w-7 h-7 text-emerald-400" />,
  Terminal: <Terminal className="w-7 h-7 text-indigo-400" />,
  LayoutGrid: <LayoutGrid className="w-7 h-7 text-[#f6891f]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 text-purple-400" />
};

const PILLAR_COLORS: Record<string, string> = {
  Cpu: '#06b6d4',
  Globe: '#10b981',
  Terminal: '#6366f1',
  LayoutGrid: '#f6891f',
  ShieldCheck: '#a855f7'
};

export const FoundationalPillarsSection: React.FC = () => {
  const { corePillars: CORE_PILLARS } = useHomepageContent();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hook into vertical scroll for scrollytelling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Spring physics for buttery smooth response
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4
  });

  // Track active pillar index based on scroll
  useEffect(() => {
    return springProgress.on('change', (latest) => {
      if (latest < 0.25) setActivePillarIndex(0);
      else if (latest < 0.43) setActivePillarIndex(1);
      else if (latest < 0.61) setActivePillarIndex(2);
      else if (latest < 0.79) setActivePillarIndex(3);
      else setActivePillarIndex(4);
    });
  }, [springProgress]);

  // Subtle vertical parallax on the flank headers for high-end momentum
  const leftFlankY = useTransform(springProgress, [0, 1], ['10px', '-10px']);
  const rightFlankY = useTransform(springProgress, [0, 1], ['-10px', '10px']);

  // Opening sequence: Headings start together in the MIDDLE, then part to the LEFT and RIGHT flanks!
  const leftFlankX = useTransform(springProgress, [0, 0.20], ['315px', '0px']);
  const rightFlankX = useTransform(springProgress, [0, 0.20], ['-315px', '0px']);

  // Heading scale: starts large (1.55) in the middle, then shrinks down smoothly to normal size (1.0) as they slide to flanks!
  const headingScale = useTransform(springProgress, [0, 0.20], [1.55, 1.0]);

  // Flank sub-details (stepper nav & compliance checklist) fade in as headings reach the flanks
  const flankDetailsOpacity = useTransform(springProgress, [0.10, 0.20], [0, 1]);
  const flankDetailsY = useTransform(springProgress, [0.10, 0.20], ['20px', '0px']);

  // Center corridor cards emerge as headings part
  const centerOpacity = useTransform(springProgress, [0.08, 0.20], [0, 1]);
  const centerScale = useTransform(springProgress, [0.04, 0.20], [0.92, 1]);

  // Center cards stream through the middle from Card 01 to Card 05 across [0.20, 0.90]
  const cardsY = useTransform(springProgress, [0.20, 0.90], ['0%', '-80%']);

  // Scrollytelling progress bar strictly mapped from 0.02 to 0.92 (reaches 100% when Card 05 settles, 0% dead scroll!)
  const activeProgress = useTransform(springProgress, [0.02, 0.92], [0, 1]);

  const scrollToPillar = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const scrollDist = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = 0.20 + index * 0.17;
    window.scrollTo({
      top: top + scrollDist * targetProgress,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef} 
      id="pillars" 
      className="relative h-[380vh] bg-[#05070f] select-none w-full"
    >
      {/* Background Ambience & Gradient Fades */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#05060b] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#05070b] to-transparent pointer-events-none z-10" />

      {/* Flank Ambient Glows behind the headings */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-[450px] h-[450px] bg-indigo-500/[0.07] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sticky Fullscreen Viewport that stays pinned while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 z-20">
        
        {/* Mobile/Tablet Fallback Header (Visible on screens < lg) */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 sm:px-6 w-full z-30 text-center pt-8 sm:pt-12 select-none">
          <h3 className="text-lg sm:text-2xl font-display font-black text-white uppercase tracking-tight drop-shadow-md">
            Our Proven <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white normal-case">Foundational Pillars</span>
          </h3>
        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN MAIN STAGE (Nextnox Work Process Architecture)                   */}
        {/* Left: FOUNDATIONAL, Center: Cards stream, Right: PILLARS                   */}
        {/* ========================================================================= */}
        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex items-center justify-center lg:justify-between gap-6 xl:gap-8">
          
          {/* 1. LEFT FLANK: "OUR PROVEN FOUNDATIONAL" (Sticky on Left) */}
          <motion.div 
            style={{ y: leftFlankY, x: leftFlankX }}
            className="hidden lg:flex flex-col items-end text-right w-[260px] xl:w-[320px] shrink-0 select-none will-change-transform space-y-4 z-30"
          >
            <motion.div 
              style={{ scale: headingScale, transformOrigin: 'right center' }}
              className="space-y-1.5 will-change-transform"
            >
              <span className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest block">
                OUR PROVEN
              </span>
              <h3 className="text-2xl sm:text-3xl xl:text-4xl font-display font-black text-white uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                FOUNDATIONAL
              </h3>
              <div className="flex items-center justify-end gap-2 pt-1.5 text-xs font-mono-tech text-slate-400">
                <span className="w-2.5 h-0.5 bg-cyan-400" />
                <span>05 CORE DISCIPLINES</span>
              </div>
            </motion.div>

            {/* Stepper Timeline Navigation (fades in as heading settles on left flank) */}
            <motion.div 
              style={{ opacity: flankDetailsOpacity, y: flankDetailsY }}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 w-full text-xs font-mono-tech"
            >
              <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                Architectural Standards
              </div>
              <ul className="space-y-1.5 text-slate-400 text-[11px]">
                {CORE_PILLARS.map((p, i) => {
                  const isActive = activePillarIndex === i;
                  return (
                    <li 
                      key={p.id} 
                      onClick={() => scrollToPillar(i)}
                      className={`flex items-center justify-end gap-2.5 cursor-pointer py-1 px-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-cyan-500/10 text-cyan-300 font-bold border-r-2 border-cyan-400' 
                          : 'hover:text-slate-200 hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="truncate">{p.badge}</span>
                      <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>0{i + 1}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>

          {/* 2. CENTER CORRIDOR: Cards Vertical Scroll Stream with Smooth Viewport Mask */}
          <motion.div 
            style={{ 
              opacity: isMobile ? 1 : centerOpacity, 
              scale: isMobile ? 1 : centerScale 
            }}
            className="relative w-full max-w-[92vw] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[580px] h-[390px] sm:h-[460px] lg:h-[510px] xl:h-[530px] shrink-0 overflow-hidden z-30 [mask-image:linear-gradient(to_bottom,transparent_0%,black_8%,black_92%,transparent_100%)]"
          >
            <motion.div 
              style={{ y: cardsY }}
              className="absolute inset-x-0 top-0 space-y-6 sm:space-y-10 will-change-transform pb-12"
            >
              {CORE_PILLARS.map((pillar, idx) => {
                const formattedIdx = `0${idx + 1}`;
                const accentColor = PILLAR_COLORS[pillar.iconName] || '#06b6d4';

                return (
                  <div
                    key={pillar.id}
                    className="group relative w-full rounded-[24px] sm:rounded-[30px] p-4 sm:p-7 bg-[#0a0d16]/95 border border-white/15 backdrop-blur-md shadow-[0_25px_80px_rgba(0,0,0,0.85)] hover:border-cyan-400/40 transition-all duration-500 overflow-hidden"
                  >
                    {/* Subtle Background Glow Halo in Pillar Color */}
                    <div 
                      className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
                      style={{ background: accentColor }}
                    />

                    {/* Concentric Geometric Orbit Ring (Nextnox-style Shape) */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-dashed border-white/[0.04] pointer-events-none group-hover:border-white/[0.1] transition-colors duration-700"
                    />

                    {/* Card Top Row: Index, Title & Nextnox 4-Star Quality Nodes */}
                    <div className="relative z-10 flex items-center justify-between gap-4 pb-3 sm:pb-5 border-b border-white/10">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span 
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full" 
                          style={{ backgroundColor: accentColor }}
                        />
                        <span className="font-mono-tech text-[10px] sm:text-xs font-bold uppercase tracking-widest text-cyan-400 truncate">
                          {formattedIdx} // {pillar.badge || 'FOUNDATIONAL DISCIPLINE'}
                        </span>
                      </div>

                      {/* Nextnox 4-Star / Quality Indicator Array */}
                      <div className="flex items-center gap-1 shrink-0">
                        {[...Array(4)].map((_, sIdx) => (
                          <Star 
                            key={sIdx} 
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400/90 transition-transform group-hover:scale-110" 
                            style={{ transitionDelay: `${sIdx * 60}ms` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Center: Icon Emblem with Ambient Rings (Nextnox item-icon) */}
                    <div className="relative z-10 my-2.5 sm:my-4 flex items-center justify-center">
                      <div className="relative p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/[0.04] border border-white/10 group-hover:border-cyan-400/40 transition-all duration-500 shadow-xl group-hover:scale-110">
                        {/* Concentric Pulsing Ring */}
                        <div 
                          className="absolute -inset-2 rounded-[28px] blur-sm opacity-30 group-hover:opacity-70 transition-opacity duration-500"
                          style={{ backgroundColor: accentColor }}
                        />
                        <div className="relative z-10 scale-90 sm:scale-100">
                          {PILLAR_ICONS[pillar.iconName]}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom: Typographic Content */}
                    <div className="relative z-10 space-y-1 sm:space-y-2 text-center sm:text-left">
                      <h4 className="text-lg sm:text-2xl lg:text-3xl font-display font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {pillar.title}
                      </h4>

                      <p className="text-[11px] sm:text-sm font-mono-tech text-cyan-400 font-semibold leading-relaxed">
                        {pillar.tagline}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-2 sm:line-clamp-none pt-0.5 sm:pt-1">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Footer Seal & Assurance Tag */}
                    <div className="relative z-10 pt-3 sm:pt-5 mt-3 sm:mt-5 border-t border-white/[0.08] flex items-center justify-between gap-3 text-[10px] sm:text-xs font-mono-tech text-slate-400">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                        <span className="truncate">PureTech Production-Ready Certified</span>
                      </div>

                      <div className="hidden sm:flex items-center gap-1.5 text-cyan-400 font-bold uppercase tracking-wider text-[11px] group-hover:translate-x-1 transition-transform shrink-0">
                        <span>ENTERPRISE ARCHITECTURE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* 3. RIGHT FLANK: "PILLARS OF EXCELLENCE" (Sticky on Right) */}
          <motion.div 
            style={{ y: rightFlankY, x: rightFlankX }}
            className="hidden lg:flex flex-col items-start text-left w-[260px] xl:w-[320px] shrink-0 select-none will-change-transform space-y-4 z-30"
          >
            <motion.div 
              style={{ scale: headingScale, transformOrigin: 'left center' }}
              className="space-y-1.5 will-change-transform"
            >
              <span className="text-xs font-mono-tech text-[#f6891f] uppercase tracking-widest block">
                STANDARDS //
              </span>
              <h3 className="text-2xl sm:text-3xl xl:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-[#ff9d3b] to-amber-200 uppercase tracking-tight leading-[0.95] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                PILLARS
              </h3>
              <div className="flex items-center gap-2 pt-1.5 text-xs font-mono-tech text-slate-400">
                <span>OF EXCELLENCE</span>
                <span className="w-2.5 h-0.5 bg-[#f6891f]" />
              </div>
            </motion.div>

            {/* Quality & Assurance Badges (fades in as heading settles on right flank) */}
            <motion.div 
              style={{ opacity: flankDetailsOpacity, y: flankDetailsY }}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 w-full text-xs font-mono-tech"
            >
              <div className="text-[10px] text-[#f6891f] uppercase tracking-widest font-bold">
                Quality Assurance
              </div>
              <div className="space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Bilateral NDA Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SOC2 & HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-300">
                  <Check className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Fault-Tolerant Distributed Runtimes</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Telemetry Bar: Nextnox Scrollytelling Indicator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-30">
          <div className="flex items-center justify-between gap-6 pt-3 border-t border-white/10">
            
            {/* Scroll Indicator */}
            <div className="flex items-center gap-3 text-xs font-mono-tech text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6891f] animate-ping" />
              <span className="uppercase tracking-widest text-slate-300">
                DRIVE SCROLL TO CROSS PILLARS [01 — 05]
              </span>
            </div>

            {/* Dynamic Progress Indicator: reaches 100% when 05 settles, 0% dead scroll */}
            <div className="flex items-center gap-4 w-44 sm:w-64">
              <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  style={{ scaleX: activeProgress, transformOrigin: 'left' }}
                  className="h-full w-full bg-gradient-to-r from-[#f6891f] via-amber-400 to-cyan-400"
                />
              </div>
              <span className="text-[11px] font-mono-tech text-[#f6891f] font-bold">
                PROCESS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
