import React from 'react';
import { 
  ArrowDown, 
  Sparkles, 
  Shield, 
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { staggerContainer, fadeInUp, fadeInScale } from './MotionWrappers';
import { HeroWebGL } from './HeroWebGL';
import { useHomepageContent } from './HomepageContentContext';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onExploreWork: () => void;
  onOpenReel: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenEstimator,
  onOpenContact,
  onExploreWork,
  onOpenReel
}) => {
  const { hero } = useHomepageContent();
  return (
    <section id="hero" className="relative min-h-[96vh] sm:min-h-screen pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden w-full max-w-full">
      {/* Interactive Three.js WebGL kinetic element in background */}
      <HeroWebGL />

      {/* Subtle architectural grid texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* ======================================================== */}
          {/* 60% WIDTH TEXT AREA (FANTASY.CO CLEAN MINIMALIST RATIO)  */}
          {/* ======================================================== */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[60%] lg:max-w-[60%] flex flex-col justify-center"
          >
            {/* Short, Iconic Display Headline (Low Word Count, Sleek Size) */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-[3.5rem] font-display font-black tracking-[-0.035em] text-white leading-[1.08] mb-5"
            >
              {hero.lead}{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                {hero.highlight}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base sm:text-lg lg:text-xl text-slate-300 font-light max-w-xl leading-relaxed mb-8 sm:mb-10"
            >
              {hero.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 w-full sm:w-auto"
            >
              <motion.button
                variants={fadeInScale}
                id="hero-explore-work-btn"
                onClick={onExploreWork}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4.5 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_20px_50px_rgba(255,255,255,0.25)] cursor-pointer active:scale-95"
              >
                <span>{hero.primaryCta}</span>
                <ArrowDown className="w-4 h-4 text-slate-950" />
              </motion.button>

              <motion.button
                variants={fadeInScale}
                id="hero-estimator-btn"
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-display font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 border border-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{hero.secondaryCta}</span>
              </motion.button>
            </motion.div>

            {/* Credibility Micro-Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-y-2.5 gap-x-8 text-[11px] font-mono-tech text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>{hero.trustOne}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>{hero.trustTwo}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right 40% open space allowing the kinetic 3D WebGL background to breathe */}
          <div className="hidden lg:block w-[35%]" />

        </div>
      </div>

      {/* Bottom Scroll Indicator - Fantasy.co signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-8 flex items-center justify-between text-xs font-mono-tech text-slate-400"
      >
        <button
          onClick={onExploreWork}
          className="hover:text-white flex items-center gap-2 cursor-pointer transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
          <span>SCROLL TO EXPLORE WORK</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <div className="hidden sm:flex items-center gap-4">
          <span>{hero.location}</span>
          <span>•</span>
          <span>{hero.descriptor}</span>
        </div>
      </motion.div>
    </section>
  );
};
