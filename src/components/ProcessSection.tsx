import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, Sparkles, ChevronRight, Layers, Compass, BarChart, Code2, ShieldAlert, Rocket } from 'lucide-react';
import { PROCESS_STEPS } from '../data/content';
import { fadeInUp, fadeInScale } from './MotionWrappers';

interface ProcessSectionProps {
  onStartDiscovery: () => void;
}

const STEP_ICONS: Record<string, React.ReactNode> = {
  '01': <Compass className="w-5 h-5 text-cyan-400" />,
  '02': <BarChart className="w-5 h-5 text-emerald-400" />,
  '03': <Code2 className="w-5 h-5 text-indigo-400" />,
  '04': <ShieldAlert className="w-5 h-5 text-purple-400" />,
  '05': <Rocket className="w-5 h-5 text-[#f6891f]" />
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartDiscovery }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background architectural grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

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
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-3">
            <span className="text-slate-200 font-medium">METHODOLOGY &amp; EXECUTION // PROCESS</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight mb-4">
            Our structured{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
              5-Step Development
            </span>{' '}
            journey.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            From initial consultation to post-launch optimization, our systematic process ensures complete transparency, architectural rigor, and reliable delivery.
          </motion.p>
        </motion.div>

        {/* Step Numbers Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                id={`process-step-tab-${step.number}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'bg-white/[0.12] border-cyan-400/50 shadow-lg'
                    : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono-tech text-xs font-bold ${
                    isActive ? 'text-cyan-400' : 'text-slate-500'
                  }`}>
                    STEP {step.number}
                  </span>
                  <div className="shrink-0">
                    {STEP_ICONS[step.number]}
                  </div>
                </div>
                <div className={`font-display text-xs sm:text-sm font-bold line-clamp-1 ${
                  isActive ? 'text-white' : 'text-slate-400'
                }`}>
                  {step.title}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-step-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Stage */}
        <div className="bg-[#0e1018]/95 border border-white/10 rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Ambient Video Glow */}
          <div 
            className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80)' }}
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
              poster="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80"
              className="w-full h-full object-cover opacity-15 filter contrast-125"
            >
              <source src="/videos/capabilities-bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e1018]/90 via-[#0e1018]/95 to-[#0e1018]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-cyan-400 uppercase tracking-widest">
                  <span>STAGE {activeStep.number} OF 05</span>
                  <span>·</span>
                  <span>PURETECH EXECUTION CYCLE</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                    {activeStep.title}
                  </h3>
                  <p className="text-base font-medium text-cyan-300 mt-1">
                    {activeStep.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                  {activeStep.description}
                </p>

                {/* Key Deliverables & Highlights */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400 block">
                    STAGE HIGHLIGHTS & DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/[0.04] p-3 rounded-xl border border-white/[0.06]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    id={`step-cta-${activeStep.number}`}
                    onClick={onStartDiscovery}
                    className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md active:scale-95"
                  >
                    <span>Initiate Project Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-xs font-mono-tech text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Free architectural review & feasibility roadmap</span>
                  </div>
                </div>
              </div>

              {/* Right Visual / Metric Card */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs font-mono-tech uppercase tracking-wider text-slate-400">
                    PROCESS RIGOR
                  </span>
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    {STEP_ICONS[activeStep.number]}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-tech">
                    <span className="text-slate-400">Stakeholder Sync Frequency</span>
                    <span className="text-white font-bold">Bi-Weekly Sprints</span>
                  </div>
                  <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${(activeStepIndex + 1) * 20}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] space-y-2">
                  <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider block">
                    PURETECH GUARANTEE
                  </span>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Zero guesswork. We align architecture, coding standards, and test suites with your team before writing a single line of production code.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs font-mono-tech text-slate-400">
                  <span>100% IP Transfer</span>
                  <span>Full Code Review</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
