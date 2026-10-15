import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowUpRight, Activity, ArrowDown, Shield, Zap, Cpu, CheckCircle2, Terminal } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';
import { WhatIfConcept } from '../types';

interface WhatIfProps {
  onPartnerOnConcept: (conceptTitle: string) => void;
}

const WhatIfParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = 80;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      glowColor: string;
      alpha: number;
    }[] = [];

    const colors = [
      { color: 'rgba(6, 182, 212, ', glow: 'rgba(6, 182, 212, 0.8)' }, // cyan
      { color: 'rgba(246, 137, 31, ', glow: 'rgba(246, 137, 31, 0.8)' }, // amber/orange
      { color: 'rgba(129, 140, 248, ', glow: 'rgba(129, 140, 248, 0.8)' }, // indigo/purple
      { color: 'rgba(52, 211, 153, ', glow: 'rgba(52, 211, 153, 0.8)' } // emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colors[i % colors.length];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.2,
        color: col.color,
        glowColor: col.glow,
        alpha: Math.random() * 0.5 + 0.45
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connection mesh
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Interactive mouse drift
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const force = (1 - mdist / 150) * 0.8;
          p.x += (mdx / (mdist || 1)) * force;
          p.y += (mdy / (mdist || 1)) * force;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.glowColor;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};

export const WhatIfSection: React.FC<WhatIfProps> = ({ onPartnerOnConcept }) => {
  const { concepts: WHAT_IF_CONCEPTS } = useHomepageContent();
  const [activeConcept, setActiveConcept] = useState<WhatIfConcept>(WHAT_IF_CONCEPTS[0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll position through the scrollytelling container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Sharp, clean, non-overlapping transitions between phases
  // Phase 1: 0.00 -> 0.28 (fully visible until 0.22, fades out cleanly by 0.28)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const phase1Scale = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0.95]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.20, 0.28], ['0px', '0px', '-30px']);
  const phase1PointerEvents = useTransform(scrollYProgress, (p) => (p < 0.26 ? 'auto' : 'none'));
  const phase1Display = useTransform(scrollYProgress, (p) => (p < 0.30 ? 'flex' : 'none'));

  // Phase 2: 0.32 -> 0.65 (fades in at 0.32, visible until 0.58, fades out by 0.65)
  const phase2Opacity = useTransform(scrollYProgress, [0.30, 0.38, 0.56, 0.64], [0, 1, 1, 0]);
  const phase2Scale = useTransform(scrollYProgress, [0.30, 0.38, 0.56, 0.64], [0.95, 1, 1, 0.95]);
  const phase2Y = useTransform(scrollYProgress, [0.30, 0.38, 0.56, 0.64], ['30px', '0px', '0px', '-30px']);
  const phase2PointerEvents = useTransform(scrollYProgress, (p) => (p >= 0.30 && p <= 0.62 ? 'auto' : 'none'));
  const phase2Display = useTransform(scrollYProgress, (p) => (p >= 0.28 && p <= 0.66 ? 'flex' : 'none'));

  // Phase 3: 0.68 -> 1.00 (fades in at 0.68, stays fully visible through end)
  const phase3Opacity = useTransform(scrollYProgress, [0.66, 0.74, 1], [0, 1, 1]);
  const phase3Scale = useTransform(scrollYProgress, [0.66, 0.74, 1], [0.95, 1, 1]);
  const phase3Y = useTransform(scrollYProgress, [0.66, 0.74, 1], ['30px', '0px', '0px']);
  const phase3PointerEvents = useTransform(scrollYProgress, (p) => (p > 0.64 ? 'auto' : 'none'));
  const phase3Display = useTransform(scrollYProgress, (p) => (p > 0.64 ? 'flex' : 'none'));

  return (
    <section
      id="what-if"
      ref={sectionRef}
      className="relative bg-[#05070d] min-h-[300vh] sm:min-h-[360vh] select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-[#f6891f]/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ========================================================================= */}
      {/* STICKY FULL-SCREEN SCROLLYTELLING STAGE                                    */}
      {/* ========================================================================= */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Interactive Cybernetic Particles Mesh pinned in sticky stage */}
        <WhatIfParticlesCanvas />

        {/* ----------------------------------------------------------------------- */}
        {/* PHASE 1: OPEN EDITORIAL VISIONARY STAGE (NON-BOXED LUXURY AESTHETIC)   */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          style={{ 
            opacity: phase1Opacity, 
            scale: phase1Scale, 
            y: phase1Y,
            display: phase1Display as any,
            pointerEvents: phase1PointerEvents as any
          }}
          className="absolute inset-0 z-20 items-center justify-center px-4 sm:px-6 lg:px-12"
        >
          <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-10 text-center">
            
            {/* Top Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono-tech text-cyan-300 font-bold uppercase tracking-widest mx-auto backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>PURETECH R&amp;D LABS // VISIONARY PROTOTYPING</span>
            </div>

            {/* Headline Block */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-black text-white tracking-tighter leading-snug py-2 overflow-visible">
                What{' '}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white inline-block pr-6 pl-1 pt-1 pb-3 overflow-visible">
                  if?
                </span>
              </h2>
              
              <p className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-snug max-w-3xl mx-auto py-1">
                Launching the next generation of{' '}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white inline-block pr-4 pl-1 pb-1 overflow-visible">
                  Intelligent Experiences.
                </span>
              </p>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
                We don’t wait for tech standards to be defined. In our Alpharetta R&amp;D labs, we prototype tomorrow’s hardest software, spatial AI, and high-concurrency systems.
              </p>
            </div>

            {/* Editorial Laser-Divided Feature Indicators (Open Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10 max-w-4xl mx-auto">
              <div className="text-left pl-4 border-l-2 border-cyan-400/80 space-y-1">
                <div className="text-xs font-mono-tech text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>R&amp;D Acceleration</span>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">4.5x Rapid Sprints</div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">From hypothesis to live interactive production demo</p>
              </div>

              <div className="text-left pl-4 border-l-2 border-indigo-400/80 space-y-1">
                <div className="text-xs font-mono-tech text-indigo-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Edge Intelligence</span>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">Sub-8ms Latency</div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">Quantized on-device neural inference runtimes</p>
              </div>

              <div className="text-left pl-4 border-l-2 border-emerald-400/80 space-y-1">
                <div className="text-xs font-mono-tech text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Zero-Defect QA</span>
                </div>
                <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">100% Verified</div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">Automated multi-device stress and security suites</p>
              </div>
            </div>

            {/* Scroll Down Cue */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono-tech text-cyan-400 uppercase tracking-widest animate-bounce">
              <span>Scroll To Explore R&amp;D Vision</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </div>

          </div>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHASE 2: ASYMMETRIC EDITORIAL MANIFESTO (ADAPT & ACCELERATE)            */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          style={{ 
            opacity: phase2Opacity, 
            scale: phase2Scale, 
            y: phase2Y,
            display: phase2Display as any,
            pointerEvents: phase2PointerEvents as any
          }}
          className="absolute inset-0 z-20 items-center justify-center px-4 sm:px-6 lg:px-12"
        >
          <div className="w-full max-w-5xl mx-auto space-y-8">
            
            {/* Top Bar Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 gap-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono-tech uppercase tracking-[0.2em] text-emerald-400 px-3.5 py-1.5 rounded-full bg-black/60 border border-emerald-500/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ADAPT &amp; ACCELERATE // VISION 2026</span>
              </div>
              <span className="text-xs font-mono-tech text-slate-400 hidden sm:inline-block">
                Next-Gen Platform Engineering
              </span>
            </div>

            {/* Big Editorial Quote */}
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.15]">
              As technology radically changes our world, we help our clients adapt and accelerate—transforming their platforms, systems, and intelligence to lead.
            </h3>

            {/* 3 Asymmetric Specs with Left Neon Laser Accents */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-cyan-400/40 transition-all space-y-2.5 backdrop-blur-xl">
                <div className="p-2 w-fit rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="text-base font-display font-bold text-white">Autonomous AI Swarms</div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Multi-agent architectures capable of autonomous workflow execution and self-healing telemetry across data stacks.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-indigo-400/40 transition-all space-y-2.5 backdrop-blur-xl">
                <div className="p-2 w-fit rounded-lg bg-indigo-500/10 border border-indigo-400/20 text-indigo-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-base font-display font-bold text-white">Spatial &amp; Mobile Runtimes</div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Ultra-fluid 60 FPS mobile flagships and spatial computing interfaces designed for frictionless operational efficiency.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-white/10 hover:border-emerald-400/40 transition-all space-y-2.5 backdrop-blur-xl">
                <div className="p-2 w-fit rounded-lg bg-emerald-500/10 border border-emerald-400/20 text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-base font-display font-bold text-white">Zero-Defect Reliability</div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  End-to-end automated testing pipelines ensuring fault-tolerant deployments across distributed global nodes.
                </p>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal className="w-3.5 h-3.5" />
                <span>PURETECH R&amp;D SYSTEM ARCHITECTURE</span>
              </span>
              <span className="text-slate-300">SCROLL DOWN TO PROTOTYPES ↓</span>
            </div>

          </div>
        </motion.div>

        {/* ----------------------------------------------------------------------- */}
        {/* PHASE 3: INTERACTIVE R&D CONCEPT PROTOTYPES SPOTLIGHT                   */}
        {/* ----------------------------------------------------------------------- */}
        <motion.div
          style={{ 
            opacity: phase3Opacity, 
            scale: phase3Scale, 
            y: phase3Y,
            display: phase3Display as any,
            pointerEvents: phase3PointerEvents as any
          }}
          className="absolute inset-0 z-20 items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <div className="w-full max-w-5xl mx-auto pointer-events-auto">
            
            {/* Header & Concept Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
              <div>
                <span className="text-xs font-mono-tech uppercase tracking-widest text-cyan-400 block font-bold mb-1">
                  PROTOTYPE SPOTLIGHT // ALPHA-09
                </span>
                <h4 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                  Visionary R&amp;D Blueprints
                </h4>
              </div>

              {/* Concept Tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-xl overflow-x-auto max-w-full">
                {WHAT_IF_CONCEPTS.map((concept, idx) => (
                  <button
                    key={concept.id}
                    onClick={() => setActiveConcept(concept)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                      activeConcept.id === concept.id
                        ? 'bg-white text-slate-950 font-bold shadow-lg'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Concept 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Spotlight Concept Card */}
            <div className="relative rounded-2xl sm:rounded-[32px] overflow-hidden border border-white/20 bg-slate-950/85 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-4 sm:p-7 lg:p-9 space-y-4 sm:space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeConcept.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono-tech uppercase tracking-wider">
                        {activeConcept.tag}
                      </span>
                      <span className="text-xs font-mono-tech text-slate-400">
                        {activeConcept.category}
                      </span>
                    </div>

                    <span className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      FEASIBILITY: 100% PROVEN
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight leading-snug">
                      {activeConcept.question}
                    </h5>
                    <p className="text-xs sm:text-sm font-mono-tech text-cyan-300">
                      → Solution Architecture: {activeConcept.solutionTitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 backdrop-blur-md">
                      <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block font-bold">
                        ARCHITECTURAL HYPOTHESIS
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                        {activeConcept.hypothesis}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 backdrop-blur-md">
                      <span className="text-[11px] font-mono-tech text-indigo-400 uppercase tracking-wider block font-bold">
                        PROJECTED ENTERPRISE VALUE
                      </span>
                      <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                        {activeConcept.impactPotential}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    <div className="text-xs font-mono-tech text-slate-400">
                      PROPRIETARY R&amp;D UNDER BILATERAL NDA
                    </div>

                    <button
                      onClick={() => onPartnerOnConcept(activeConcept.solutionTitle)}
                      className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow-xl active:scale-95"
                    >
                      <span>Build This Concept</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
