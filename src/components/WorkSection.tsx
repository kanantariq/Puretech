import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';
import { CaseStudy, ProjectCategory } from '../types';
import { fadeInUp, fadeInScale } from './MotionWrappers';

interface WorkSectionProps {
  onSelectCaseStudy: (study: CaseStudy) => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectCaseStudy }) => {
  const { caseStudies: CASE_STUDIES } = useHomepageContent();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeStickyIndex, setActiveStickyIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const filteredProjects = selectedCategory === 'all'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(p => p.category === selectedCategory);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remainingCount = filteredProjects.length - visibleCount;

  // Scroll listener for the Fantasy.co Sticky Split-Screen mode:
  // Detects which project story is currently centered in viewport and updates the pinned video
  useEffect(() => {
    const handleScroll = () => {
      const storyElements = visibleProjects.map((p) =>
        document.getElementById(`sticky-story-${p.id}`)
      );

      const targetY = window.innerHeight * 0.42;
      let closestIdx = 0;
      let minDistance = Infinity;

      storyElements.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - targetY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });

      setActiveStickyIndex(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleProjects]);

  const activeStickyProject = visibleProjects[activeStickyIndex] || visibleProjects[0] || filteredProjects[0];

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: `All Work (${CASE_STUDIES.length})` },
    { id: 'web', label: 'Websites & Portals' },
    { id: 'mobile', label: 'Apps & Platforms' },
    { id: 'ai', label: 'AI & Automation' },
    { id: 'enterprise', label: 'SaaS & Enterprise' },
    { id: 'growth', label: 'Growth & Marketing' }
  ];

  return (
    <section id="work" className="relative bg-[#06080d]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* 1. FULL-WIDTH EDGE-TO-EDGE STICKY BACKGROUND VIDEO (FANTASY.CO STYLE)     */}
      {/* ========================================================================= */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-0">
        {/* Preloaded simultaneous cross-fading background videos (Instant zero-delay switch) */}
        {visibleProjects.map((p, idx) => {
          const isActive = activeStickyIndex === idx;
          return (
            <div
              key={p.id}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-500 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${p.heroImage})` }}
            >
              {p.videoUrl ? (
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
                  src={p.videoUrl}
                  autoPlay={isActive}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={p.heroImage}
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-[0.68] saturate-[1.1]"
                />
              ) : (
                <img
                  src={p.heroImage}
                  alt={p.title}
                  className="w-full h-full object-cover filter brightness-[0.6]"
                />
              )}
            </div>
          );
        })}

        {/* Ambient cinema fades */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06080d] to-transparent pointer-events-none z-20" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#06080d] to-transparent pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[#06080d]/25 pointer-events-none z-20" />

        {/* Minimalist floating project indicator at bottom right */}
        <div className="absolute bottom-8 right-8 z-30 pointer-events-auto hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 text-xs font-mono-tech shadow-2xl">
          <span 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: activeStickyProject.accentColor }}
          />
          <span className="text-white font-bold">
            0{activeStickyIndex + 1} <span className="text-slate-500">/</span> 0{visibleProjects.length}
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-semibold">{activeStickyProject.client}</span>
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
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6"
          >
            <div>
              <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-3">
                <span className="text-slate-200 font-medium">SELECTED WORK // CLIENT IMPACT</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-7xl font-display font-black text-white tracking-tighter leading-tight">
                Intelligent products. <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                  Measurable impact.
                </span>
              </motion.h2>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <motion.p variants={fadeInUp} className="text-sm sm:text-base text-slate-300 max-w-md font-light leading-relaxed">
                Every case study represents an end-to-end partnership from discovery and technical design to deployment, automated QA, and high-concurrency scale.
              </motion.p>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.06 }
              }
            }}
            className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-14 sm:mb-20 scrollbar-none"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                variants={fadeInScale}
                id={`filter-work-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveStickyIndex(0);
                  setVisibleCount(4);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono-tech uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-950 font-bold shadow-lg shadow-white/10'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* ========================================================================= */}
          {/* INTERACTIVE STICKY VIEW WITH DYNAMIC FULL-WIDTH BG VIDEO SYNC            */}
          {/* ========================================================================= */}
          <div className="space-y-28 sm:space-y-44 lg:space-y-64 py-8 sm:py-16 lg:py-20">
            {visibleProjects.map((project, idx) => {
              const isRight = idx % 2 === 1; // 0 = Left, 1 = Right, 2 = Left, 3 = Right, etc.
              const isActive = activeStickyIndex === idx;
              const formattedIndex = `0${idx + 1}`;

              return (
                <div
                  key={project.id}
                  id={`sticky-story-${project.id}`}
                  onClick={() => setActiveStickyIndex(idx)}
                  className={`w-full flex ${isRight ? 'lg:justify-end' : 'lg:justify-start'} transition-all duration-700`}
                >
                  <div
                    className={`w-full lg:max-w-[560px] xl:max-w-[620px] rounded-2xl sm:rounded-[32px] p-5 sm:p-8 lg:p-10 transition-all duration-500 cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'opacity-100 bg-slate-950/50 border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] backdrop-blur-md scale-[1.01] sm:scale-[1.02]'
                        : 'opacity-40 hover:opacity-75 bg-slate-950/30 border border-white/10 backdrop-blur-sm scale-100'
                    }`}
                  >
                    {/* Dynamic Backlight Halo when active */}
                    {isActive && (
                      <div
                        className="absolute -inset-1 rounded-[34px] blur-2xl opacity-40 pointer-events-none -z-10 transition-opacity duration-500"
                        style={{
                          background: `radial-gradient(circle at ${isRight ? '85%' : '15%'} 30%, ${project.accentColor}60, transparent 70%)`
                        }}
                      />
                    )}

                    {/* Top Eyebrow Header */}
                    <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
                      <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <span
                          className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: isActive ? project.accentColor : '#94a3b8'
                          }}
                        />
                        <span
                          className={`text-[11px] sm:text-xs font-mono-tech font-bold tracking-wider uppercase truncate ${
                            isActive ? 'text-cyan-400' : 'text-slate-400'
                          }`}
                        >
                          {formattedIndex} // {project.categoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono-tech text-slate-400 shrink-0">
                        <span>{project.year}</span>
                        <span>·</span>
                        <span>{project.duration}</span>
                      </div>
                    </div>

                    {/* Client Name & Project Headline */}
                    <div className="text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider text-slate-400 mb-1 sm:mb-1.5 truncate">
                      {project.client}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-white tracking-tight leading-tight mb-3 sm:mb-4">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed mb-5 sm:mb-6">
                      {project.tagline}
                    </p>

                    {/* Key Impact Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mb-5 sm:mb-6">
                      {project.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
                        >
                          <div className="text-base sm:text-lg lg:text-xl font-display font-bold text-cyan-300">
                            {m.value}
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-mono-tech text-slate-400 truncate mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-6 sm:mb-8">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] sm:text-[11px] font-mono-tech text-slate-300 bg-white/[0.04] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA Action Bar with Direct Live Links */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCaseStudy(project);
                          }}
                          className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/10 cursor-pointer active:scale-95 group"
                        >
                          <span>Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                          >
                            <span>Visit Live</span>
                            <ArrowRight className="w-3 h-3 -rotate-45" />
                          </a>
                        )}

                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-cyan-300 border border-cyan-400/20 text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <span>App Store</span>
                            <ArrowRight className="w-3 h-3 -rotate-45" />
                          </a>
                        )}

                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-emerald-300 border border-emerald-400/20 text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer"
                          >
                            <span>Google Play</span>
                            <ArrowRight className="w-3 h-3 -rotate-45" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Load More Button */}
          {hasMore && (
            <div className="flex flex-col items-center justify-center pt-8 sm:pt-14">
              <button
                id="load-more-work-btn"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 4, filteredProjects.length))}
                className="group relative px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-white/20 hover:border-cyan-400/60 text-white font-mono-tech text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_10px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex items-center gap-3.5 cursor-pointer active:scale-95 hover:shadow-cyan-500/10"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform shadow-[0_0_12px_#22d3ee]" />
                <span className="font-bold text-slate-100 tracking-widest">Load More Projects</span>
                <ChevronDown className="w-4 h-4 text-slate-300 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
