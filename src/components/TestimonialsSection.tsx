import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';

// High-resolution client portraits matching Nextnox testimonial avatars
const CLIENT_PORTRAITS: Record<string, string> = {
  'test-1': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  'test-2': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  'test-3': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  'test-4': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  'test-5': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
};

export const TestimonialsSection: React.FC = () => {
  const { testimonials: TESTIMONIALS, clientLogos: CLIENT_LOGOS } = useHomepageContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];
  const currentAvatar = CLIENT_PORTRAITS[current.id] || CLIENT_PORTRAITS['test-1'];

  return (
    <section 
      id="testimonials" 
      className="py-20 sm:py-28 relative overflow-hidden bg-[#060810] select-none w-full max-w-full"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Ambience & Radial Glow in PureTech orange & deep indigo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-[#f6891f]/10 via-amber-500/10 to-indigo-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05060b] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05060b] to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ========================================================================= */}
        {/* 1. NEXTNOX HEADER: Centered Subtitle + Dual-tone Heading                  */}
        {/* ========================================================================= */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          {/* Nextnox Subtitle Indicator */}
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-1">
            <span className="text-slate-200 font-medium">CLIENT REVIEWS // TESTIMONIALS</span>
          </div>

          {/* Nextnox Headline with Italic Serif Accent */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.1]">
            What Our Clients{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
              Say About Us.
            </span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2. NEXTNOX MAIN TESTIMONIAL CARD (Centered Quote, Author & Flank Arrows)   */}
        {/* ========================================================================= */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Left Navigation Arrow */}
          <button
            onClick={prevTestimonial}
            className="hidden sm:flex absolute -left-5 lg:-left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/20 hover:border-[#f6891f] bg-[#0c101c]/90 hover:bg-[#f6891f]/15 text-white hover:text-[#f6891f] items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xl group"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={nextTestimonial}
            className="hidden sm:flex absolute -right-5 lg:-right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-white/20 hover:border-[#f6891f] bg-[#0c101c]/90 hover:bg-[#f6891f]/15 text-white hover:text-[#f6891f] items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xl group"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Card Container (Nextnox nxr-testimonial-item) */}
          <div className="relative rounded-[28px] sm:rounded-[40px] bg-[#0c101c]/95 border border-white/15 p-6 sm:p-14 lg:p-16 text-center shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-xl overflow-hidden group">
            
            {/* Concentric Geometric Orbit Ring (Nextnox tm-circle) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-dashed border-white/[0.04] pointer-events-none" />
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#f6891f]/15 blur-3xl pointer-events-none group-hover:bg-[#f6891f]/25 transition-all duration-700" />

            {/* Top Center: Nextnox Quotation Emblem */}
            <div className="relative z-10 flex flex-col items-center justify-center mb-6 sm:mb-8">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f6891f]/10 border border-[#f6891f]/30 flex items-center justify-center text-[#f6891f] shadow-lg shadow-[#f6891f]/20">
                <Quote className="w-7 h-7 fill-current text-[#f6891f]" />
                <div className="absolute -inset-1 rounded-2xl bg-[#f6891f]/20 blur-md pointer-events-none" />
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1.5 mt-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Centered Animated Quote Content */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 space-y-6"
              >
                {/* Large Nextnox Quote Typography */}
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-white leading-relaxed tracking-tight max-w-2xl mx-auto">
                  “{current.quote}”
                </blockquote>

                {/* Author Info */}
                <div className="space-y-1.5 pt-4">
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                    {current.author}
                  </h3>
                  <div className="text-xs sm:text-sm font-mono-tech text-[#f6891f] font-semibold uppercase tracking-wider">
                    {current.role} <span className="text-slate-500">at</span> {current.company}
                  </div>
                  <div className="text-[11px] font-mono-tech text-slate-400">
                    {current.location}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================================================= */}
          {/* 3. NEXTNOX CIRCULAR AVATARS SELECTOR ROW (nxr-testimonial-thumb)          */}
          {/* ========================================================================= */}
          <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
              {TESTIMONIALS.map((t, idx) => {
                const isSelected = idx === activeIndex;
                const avatarImg = CLIENT_PORTRAITS[t.id] || CLIENT_PORTRAITS['test-1'];

                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setIsAutoPlay(false);
                      setActiveIndex(idx);
                    }}
                    className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-none`}
                    title={`${t.author} - ${t.company}`}
                  >
                    {/* Nextnox .nxr-testi-img with Active Glowing Ring */}
                    <div className={`relative w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#f6891f] ring-4 ring-[#f6891f]/40 scale-115 shadow-[0_0_25px_rgba(246,137,31,0.6)]'
                        : 'border-white/20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:scale-105'
                    }`}>
                      <img 
                        src={avatarImg} 
                        alt={t.author} 
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isSelected ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Slide Count Indicator & Mobile Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                onClick={prevTestimonial}
                className="sm:hidden w-8 h-8 rounded-full border border-white/20 bg-white/[0.05] text-white flex items-center justify-center active:scale-95 cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono-tech text-slate-400 flex items-center gap-1.5">
                <span className="text-[#f6891f] font-bold">0{activeIndex + 1}</span>
                <span>/</span>
                <span>0{TESTIMONIALS.length}</span>
              </div>

              <button
                onClick={nextTestimonial}
                className="sm:hidden w-8 h-8 rounded-full border border-white/20 bg-white/[0.05] text-white flex items-center justify-center active:scale-95 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. NEXTNOX CLIENT LOGOS MARQUEE (nxr-wc-sponsor)                           */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 space-y-4 w-full max-w-full overflow-hidden">
          <div className="text-center text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-400">
            TRUSTED BY VISIONARY FOUNDERS & ENTERPRISE TEAMS GLOBALLY
          </div>

          <div className="relative overflow-hidden py-2 w-full max-w-full">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060810] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060810] to-transparent z-10 pointer-events-none" />

            <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                <div 
                  key={idx}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#f6891f]/40 transition-all text-xs font-mono-tech text-slate-400 hover:text-white"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f6891f]/60" />
                  <span className="font-bold tracking-wider">{logo.name}</span>
                  <span className="text-[10px] text-slate-400">({logo.category})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
