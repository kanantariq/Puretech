import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';
import { fadeInUp, fadeInScale } from './MotionWrappers';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = '' }) => {
  const { companyFacts: COMPANY_FACTS } = useHomepageContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'AI & Autonomous Systems',
    budget: '$100k - $250k',
    details: initialSubject ? `Inquiry regarding: ${initialSubject}` : '',
    ndaRequired: true
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 sm:py-36 relative overflow-hidden">
      {/* Ambient Looping Contact Background Video */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80)' }}
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
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
          className="w-full h-full object-cover opacity-25 filter contrast-125 brightness-80 saturate-120"
        >
          <source src="/videos/contact-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-[#06070a]/70 to-[#06070a]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Direct Pitch & Studio Information - Fantasy.co style */}
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
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-3">
                <span className="text-slate-200 font-medium">INITIATE COLLABORATION // REQUEST A QUOTE</span>
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.05]">
                Have a vision? <br />
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                  Let’s talk.
                </span>
              </motion.h2>
              <motion.p variants={fadeInUp} className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                Providing you the perfect solution for your business needs. Let’s work together and unlock doors to success.
              </motion.p>
              <motion.p variants={fadeInUp} className="mt-2 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Whether you’re prototyping a breakthrough mobile flagship or modernizing enterprise software, our senior engineering directors respond within 2 hours under mutual NDA.
              </motion.p>
            </div>

            {/* Direct Studio Details */}
            <motion.div variants={fadeInUp} className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-400 uppercase">
                    ALPHARETTA HEADQUARTERS
                  </div>
                  <div className="text-sm font-display font-semibold text-white">
                    {COMPANY_FACTS.headquarters}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-400 uppercase">
                    DIRECT INQUIRY DESK
                  </div>
                  <div className="text-sm font-display font-semibold text-white">
                    {COMPANY_FACTS.phone} · {COMPANY_FACTS.secondaryPhone}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-mono-tech text-slate-400 uppercase">
                    OFFICIAL INQUIRY & LEGAL
                  </div>
                  <div className="text-sm font-display font-semibold text-white">
                    {COMPANY_FACTS.email}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bilateral NDA Assurance Card */}
            <motion.div variants={fadeInScale} className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech uppercase font-bold tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>100% BILATERAL NDA COMMITMENT</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                All early-stage diagrams, repositories, and specifications remain your strictly guarded intellectual property.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#0c0e15]/95 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  Inquiry Dispatched Under NDA
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. A PureTech Principal Engineering Director will review your architecture requirements and reach out within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-mono-tech uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block">
                      WORK EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block">
                      COMPANY / ORG
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block">
                      PROJECT DISCIPLINE
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141724] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Mobile App Development">Mobile App Development (iOS & Android)</option>
                      <option value="Custom Website Development">Custom Website Development</option>
                      <option value="Corporate Branding & Software Engineering">Corporate Branding & Software Engineering</option>
                      <option value="Web Application & Desktop Software">Web Application & Desktop Software</option>
                      <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
                      <option value="UI/UX Design">UI/UX Design & Prototyping</option>
                      <option value="Quality Assurance & Testing">Quality Assurance & Automated Testing</option>
                      <option value="Emerging Technologies & AI">Emerging Technologies & AI</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono-tech text-slate-300 uppercase tracking-wider block">
                    PROJECT OBJECTIVE OR BRIEF
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the architecture challenge, timeline, or product vision..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="nda-checkbox"
                    checked={formData.ndaRequired}
                    onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-white/[0.05] border-white/20"
                  />
                  <label htmlFor="nda-checkbox" className="text-xs font-mono-tech text-slate-300 cursor-pointer">
                    Request bilateral mutual NDA prior to exchanging architecture documents
                  </label>
                </div>

                <button
                  type="submit"
                  id="submit-inquiry-btn"
                  className="w-full py-4 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-white/10 active:scale-95"
                >
                  <span>Submit Inquiry Under NDA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
