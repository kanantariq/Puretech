import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Globe, Smartphone, Calendar, Clock, Layers, Sparkles } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onInquire
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (caseStudy) {
      setSelectedImage(caseStudy.heroImage || '');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [caseStudy]);

  if (!caseStudy) return null;

  const allImages = [
    caseStudy.heroImage,
    ...(caseStudy.galleryImages || [])
  ].filter(Boolean);

  const keyDeliverables = caseStudy.architecture || (caseStudy as any).deliverables || [];

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/92 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl bg-[#0b0c13] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top header bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10 bg-[#0e101a]/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-cyan-400">
              {caseStudy.categoryLabel || 'Case Study'}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono-tech text-white font-semibold">
              {caseStudy.client || ''}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-tech uppercase tracking-wider border border-white/10 transition-all"
              >
                <span>Visit Live</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            )}

            <button
              id="close-case-study-modal-btn"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Header titles */}
          <div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight mb-3">
              {caseStudy.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {caseStudy.tagline}
            </p>
          </div>

          {/* Key verified metrics strip */}
          {caseStudy.metrics && caseStudy.metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              {caseStudy.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-display font-black text-white">
                    {m.value}
                  </div>
                  <div className="text-xs font-mono-tech text-cyan-400 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {m.description}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Main Visual Display (Gallery Screenshots) */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
              <img
                src={selectedImage || caseStudy.heroImage}
                alt={caseStudy.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail switcher for gallery */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 sm:w-28 h-16 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-400/20'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            {/* Left 8 Cols: Challenge, Solution, Outcomes */}
            <div className="md:col-span-8 space-y-6">
              {caseStudy.challenge && (
                <div>
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold mb-2">
                    THE CHALLENGE &amp; CONTEXT
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>
              )}

              {caseStudy.solution && (
                <div>
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-cyan-400 font-bold mb-2">
                    PURETECH ENGINEERING SOLUTION
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              )}

              {keyDeliverables.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono-tech uppercase tracking-widest text-emerald-400 font-bold mb-3">
                    KEY DELIVERABLES &amp; ARCHITECTURE
                  </h3>
                  <div className="space-y-2">
                    {keyDeliverables.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseStudy.testimonial && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                    <div>
                      <div className="text-sm font-bold text-white">
                        {caseStudy.testimonial.author}
                      </div>
                      <div className="text-xs font-mono-tech text-slate-400">
                        {caseStudy.testimonial.role}, {caseStudy.client}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Meta, Tech Stack, Links */}
            <div className="md:col-span-4 space-y-6">
              {/* Meta Card */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                    CLIENT / INDUSTRY
                  </span>
                  <span className="text-sm font-display font-bold text-white">
                    {caseStudy.client}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                    TIMELINE &amp; YEAR
                  </span>
                  <span className="text-sm font-mono-tech text-slate-200">
                    {caseStudy.duration} · {caseStudy.year}
                  </span>
                </div>

                {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                      TECHNOLOGY STACK
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {caseStudy.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono-tech text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct External Links */}
                {(caseStudy.liveUrl || caseStudy.appStoreUrl || caseStudy.playStoreUrl) && (
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest text-slate-400 block">
                      LIVE PLATFORMS
                    </span>
                    <div className="flex flex-col gap-2">
                      {caseStudy.liveUrl && (
                        <a
                          href={caseStudy.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono-tech uppercase tracking-wider flex items-center justify-between transition-all"
                        >
                          <span>Visit Live Website</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                        </a>
                      )}
                      {caseStudy.appStoreUrl && (
                        <a
                          href={caseStudy.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-cyan-300 text-xs font-mono-tech uppercase tracking-wider flex items-center justify-between transition-all"
                        >
                          <span>Download iOS App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {caseStudy.playStoreUrl && (
                        <a
                          href={caseStudy.playStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-emerald-300 text-xs font-mono-tech uppercase tracking-wider flex items-center justify-between transition-all"
                        >
                          <span>Download Android App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Inquire Button */}
              <button
                onClick={() => {
                  onClose();
                  onInquire(caseStudy.title);
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#f6891f] to-amber-500 text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#f6891f]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>INQUIRE ABOUT THIS BUILD</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
