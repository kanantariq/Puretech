import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { fadeInUp, fadeInScale } from './MotionWrappers';

export const InsightsNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid work email address');
      return;
    }
    setErrorMsg('');
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 600);
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden border-t border-white/[0.08]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12 }
            }
          }}
          className="max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeInUp} className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-1">
            <span className="text-slate-200 font-medium">PURETECH PERSPECTIVES // TECH RADAR</span>
          </motion.div>

          {/* Heading & Subtitle */}
          <div className="space-y-4">
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tighter leading-none">
              Join our{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                Insights.
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base sm:text-lg lg:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
              Quarterly architectural debriefs, generative AI benchmarks, and engineering blueprints delivered directly to 24,000+ technology leaders.
            </motion.p>
          </div>

          {/* Minimalist Form Container with Subtle Entry Animation */}
          <motion.div
            variants={fadeInScale}
            className="max-w-xl mx-auto pt-2"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 rounded-2xl bg-white/[0.04] border border-emerald-500/30 flex items-center justify-center gap-3.5 text-slate-200"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-display font-bold text-white">
                    You're subscribed to PureTech Insights
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    Sent to <span className="text-cyan-400">{email}</span> · Check your inbox for our latest Q1 AI Systems Whitepaper.
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-white/[0.03] hover:bg-white/[0.05] focus-within:bg-white/[0.06] border border-white/15 focus-within:border-cyan-400/80 rounded-2xl sm:rounded-full p-2 transition-all duration-300 shadow-2xl backdrop-blur-xl group">
                  <div className="flex items-center pl-4 pr-2 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="newsletter-email-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter your work email address..."
                    required
                    className="flex-1 bg-transparent px-3 py-3 sm:py-2.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
                  />
                  <button
                    type="submit"
                    id="newsletter-submit-btn"
                    disabled={status === 'loading'}
                    className="mt-2 sm:mt-0 px-6 py-3 rounded-xl sm:rounded-full bg-white hover:bg-slate-200 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 whitespace-nowrap shrink-0 group/btn"
                  >
                    <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>

                {errorMsg && (
                  <p className="text-xs text-rose-400 font-mono-tech text-left pl-4">
                    {errorMsg}
                  </p>
                )}
              </form>
            )}

            {/* Privacy & Cadence Badges */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 text-[11px] font-mono-tech text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>24,000+ TECH READERS</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NO MARKETING NOISE</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span>QUARTERLY CADENCE</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
