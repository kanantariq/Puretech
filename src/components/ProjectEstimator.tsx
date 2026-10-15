import React, { useState } from 'react';
import { Sparkles, Check, Clock, Users, ArrowRight, ShieldCheck, Mail, Send, X, CheckCircle2, Building, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, fadeInScale } from './MotionWrappers';

interface EstimatorProps {
  onSubmitEstimate?: (summary: string) => void;
}

export const ProjectEstimator: React.FC<EstimatorProps> = ({ onSubmitEstimate }) => {
  const [platform, setPlatform] = useState<'ui-ux' | 'web' | 'mobile' | 'ai' | 'growth'>('web');
  const [scope, setScope] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [aiTier, setAiTier] = useState<'none' | 'rag' | 'edge-agents'>('rag');
  const [qaLevel, setQaLevel] = useState<'standard' | 'rigorous'>('rigorous');
  const [velocity, setVelocity] = useState<'expedited' | 'standard'>('expedited');

  // In-place Request Dispatch States (Prevents jarring jump to contact form)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientTimeline, setClientTimeline] = useState('Immediate (Next 2 Weeks)');
  const [clientNote, setClientNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Dynamic calculations based on 5 Core Capabilities
  let estimatedWeeks = 10;
  let squadSize = 4;
  let keyStack = ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'];

  if (platform === 'ui-ux') {
    estimatedWeeks = scope === 'mvp' ? 4 : scope === 'growth' ? 8 : 14;
    squadSize = scope === 'mvp' ? 2 : 4;
    keyStack = ['Figma', 'Design Systems', 'Spline 3D', 'After Effects', 'Tailwind CSS', 'Storybook'];
  } else if (platform === 'web') {
    estimatedWeeks = scope === 'mvp' ? 6 : scope === 'growth' ? 12 : 20;
    squadSize = scope === 'mvp' ? 3 : 5;
    keyStack = ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS EKS'];
  } else if (platform === 'mobile') {
    estimatedWeeks = scope === 'mvp' ? 8 : scope === 'growth' ? 14 : 22;
    squadSize = scope === 'mvp' ? 3 : 5;
    keyStack = ['SwiftUI', 'Kotlin Compose', 'Flutter', 'React Native', 'Fastlane', 'Appium'];
  } else if (platform === 'ai') {
    estimatedWeeks = scope === 'mvp' ? 8 : scope === 'growth' ? 16 : 24;
    squadSize = scope === 'mvp' ? 4 : 6;
    keyStack = ['Python', 'FastAPI', 'Gemini API', 'LangChain', 'Pinecone', 'Make.com', 'Docker'];
  } else if (platform === 'growth') {
    estimatedWeeks = scope === 'mvp' ? 4 : scope === 'growth' ? 8 : 16;
    squadSize = scope === 'mvp' ? 2 : 4;
    keyStack = ['Meta Ads Manager', 'Google Ads', 'GA4 / GTM', 'Ahrefs', 'Klaviyo', 'Looker Studio'];
  }

  if (aiTier === 'edge-agents') estimatedWeeks += 2;
  if (qaLevel === 'rigorous') squadSize += 1;
  if (velocity === 'expedited') {
    estimatedWeeks = Math.max(6, Math.round(estimatedWeeks * 0.75));
    squadSize += 1;
  }

  const blueprintSummary = `Platform: ${platform.toUpperCase()} | Scope: ${scope.toUpperCase()} | AI: ${aiTier.toUpperCase()} | QA: ${qaLevel.toUpperCase()} | Duration: ${estimatedWeeks} Wks | Squad: ${squadSize} Senior Engineers`;

  const handleOpenDispatch = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `PT-${Math.floor(1000 + Math.random() * 9000)}-X${Math.floor(10 + Math.random() * 89)}`;
      setTicketId(generatedId);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Also trigger optional callback without jumping page
      if (onSubmitEstimate) {
        // Just record it silently if needed
      }
    }, 850);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setIsModalOpen(false);
    setClientName('');
    setClientEmail('');
    setClientNote('');
  };

  return (
    <section id="estimator" className="py-20 sm:py-32 relative bg-[#070913] overflow-hidden w-full max-w-full">
      {/* Ambient background glow in PureTech orange & deep indigo */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#f6891f]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
            <span className="text-slate-200 font-medium">SCOPE &amp; VELOCITY CALCULATOR</span>
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight mb-4">
            Configure your{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
              Technical Blueprint.
            </span>
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Get instantaneous clarity on engineering sprints, squad composition, and architectural frameworks tailored to your business objectives.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Configurator (Left 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-7 bg-[#0c0f1d]/90 backdrop-blur-xl p-5 sm:p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            {/* 1. Platform Target */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold block">
                1. Target Discipline &amp; Service Track
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'ui-ux', label: 'UI/UX Design' },
                  { id: 'web', label: 'Web Platform' },
                  { id: 'mobile', label: 'Mobile App' },
                  { id: 'ai', label: 'AI & Automation' },
                  { id: 'growth', label: 'Growth & SEO' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`est-platform-${item.id}`}
                    onClick={() => setPlatform(item.id as any)}
                    className={`py-3 px-2 rounded-xl text-[11px] sm:text-xs font-mono-tech uppercase tracking-wider text-center border transition-all cursor-pointer whitespace-nowrap ${
                      platform === item.id
                        ? 'bg-[#f6891f]/15 border-[#f6891f] text-white font-bold shadow-[0_0_15px_rgba(246,137,31,0.25)]'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Product Maturity & Scope */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold block">
                2. Scope & Maturity Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'mvp', label: 'Validated MVP', desc: 'Core features, rapid deployment' },
                  { id: 'growth', label: 'Scale Flagship', desc: 'Full custom UX, heavy traffic' },
                  { id: 'enterprise', label: 'Enterprise Suite', desc: 'SOC2/HIPAA, multi-tenant' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`est-scope-${item.id}`}
                    onClick={() => setScope(item.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      scope === item.id
                        ? 'bg-[#f6891f]/15 border-[#f6891f] text-white shadow-[0_0_15px_rgba(246,137,31,0.25)]'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-mono-tech uppercase tracking-wider font-bold text-white mb-1">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AI & Automation Depth */}
            <div className="space-y-3">
              <label className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold block">
                3. Artificial Intelligence Depth
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'none', label: 'Standard Stack', desc: 'Robust business logic, no AI' },
                  { id: 'rag', label: 'Vector RAG & LLMs', desc: 'Intelligent search, copilots' },
                  { id: 'edge-agents', label: 'Autonomous Agents', desc: 'Multi-agent pods, edge vision' }
                ].map((item) => (
                  <button
                    key={item.id}
                    id={`est-ai-${item.id}`}
                    onClick={() => setAiTier(item.id as any)}
                    className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      aiTier === item.id
                        ? 'bg-[#f6891f]/15 border-[#f6891f] text-white shadow-[0_0_15px_rgba(246,137,31,0.25)]'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="text-xs font-mono-tech uppercase tracking-wider font-bold text-white mb-1">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. QA Rigor & Velocity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-xs font-mono-tech uppercase tracking-widest text-slate-300 block">
                  4. Automated QA Matrix
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'standard', label: 'Standard CI/CD', desc: 'Unit & integration coverage' },
                    { id: 'rigorous', label: 'Zero-Defect Matrix', desc: 'Real device multi-os automation' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setQaLevel(item.id as any)}
                      className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        qaLevel === item.id
                          ? 'bg-emerald-500/15 border-emerald-400 text-white'
                          : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-mono-tech uppercase tracking-wider font-semibold text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-mono-tech uppercase tracking-widest text-slate-300 block">
                  5. Delivery Velocity
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'standard', label: 'Measured Sprints', desc: 'Structured bi-weekly milestones' },
                    { id: 'expedited', label: 'Expedited Pod', desc: 'Expanded parallel senior pods' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setVelocity(item.id as any)}
                      className={`w-full p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        velocity === item.id
                          ? 'bg-purple-500/15 border-purple-400 text-white'
                          : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-mono-tech uppercase tracking-wider font-semibold text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Blueprint Estimation Summary Card (Right 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-gradient-to-b from-[#111628]/95 to-[#0b0e1b]/95 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl lg:sticky lg:top-28"
          >
            <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold block mb-1">
                  PROJECTED SPRINT CADENCE
                </span>
                <h3 className="text-xl font-display font-bold text-white">
                  Engineered Delivery Pod
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#f6891f]/10 border border-[#f6891f]/30 flex items-center justify-center text-[#f6891f]">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono-tech">
                  <Clock className="w-3.5 h-3.5 text-[#f6891f]" />
                  <span>EST. TIMELINE</span>
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-white">
                  {estimatedWeeks} <span className="text-xs font-light text-slate-400">Weeks</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {velocity === 'expedited' ? 'Parallelized agile sprints' : 'Standard milestone cadences'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono-tech">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>DEDICATED SQUAD</span>
                </div>
                <div className="text-3xl sm:text-4xl font-display font-black text-white">
                  {squadSize} <span className="text-xs font-light text-slate-400">Engineers</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Senior architects & QA
                </div>
              </div>
            </div>

            {/* Recommended Architecture Stack */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400 block">
                RECOMMENDED ARCHITECTURE
              </span>
              <div className="flex flex-wrap gap-1.5">
                {keyStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs font-mono-tech text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Guaranteed Inclusions */}
            <div className="space-y-2 border-t border-white/[0.08] pt-4">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-slate-400 block">
                GUARANTEED INCLUSIONS
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% IP ownership & bilateral NDA pre-signed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Automated CI/CD test harness & code audit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Weekly video demos & sprint retrospective syncs</span>
                </li>
              </ul>
            </div>

            {/* Direct In-Place Action Button */}
            <button
              id="estimator-submit-btn"
              onClick={handleOpenDispatch}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#f6891f] via-[#ff9d3b] to-[#e07310] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer shadow-xl shadow-[#f6891f]/25 active:scale-95"
            >
              <span>Request Verified Proposal & NDA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* IN-PLACE ESTIMATE DISPATCH MODAL (Zero jarring redirects to contact form) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-3xl bg-[#0c101e] border border-white/20 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div className="space-y-6">
                  {/* Modal Header */}
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#f6891f]">
                      <span className="w-2 h-2 rounded-full bg-[#f6891f] animate-pulse" />
                      <span>DIRECT ARCHITECTURE DISPATCH</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-white tracking-tight">
                      Receive Formal Scope & NDA
                    </h3>
                    <p className="text-xs text-slate-300 font-light">
                      Send your configured sprint parameters directly to our Principal Architecture Pod in Alpharetta, GA.
                    </p>
                  </div>

                  {/* Configured Summary Pill */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-[#f6891f]/30 space-y-1 text-xs font-mono-tech">
                    <span className="text-[#f6891f] font-bold block uppercase tracking-wider text-[10px]">
                      CONFIGURED BLUEPRINT SCOPE:
                    </span>
                    <div className="text-slate-200 font-medium">
                      {blueprintSummary}
                    </div>
                  </div>

                  {/* Direct Dispatch Form */}
                  <form onSubmit={handleDirectSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 block mb-1">
                          Your Name / Company *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g., Sarah Chen, Founder"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-[#f6891f] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 block mb-1">
                          Business Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-[#f6891f] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 block mb-1">
                        Target Kickoff Cadence
                      </label>
                      <select
                        value={clientTimeline}
                        onChange={(e) => setClientTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/15 text-white text-xs focus:outline-none focus:border-[#f6891f] transition-colors"
                      >
                        <option value="Immediate (Next 2 Weeks)">Immediate (Next 2 Weeks)</option>
                        <option value="Next Month (Q3 Launch)">Next Month (Q3 Launch)</option>
                        <option value="Exploring & Budgeting for Q4">Exploring & Budgeting for Q4</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-300 block mb-1">
                        Optional Project Notes or Existing Repos
                      </label>
                      <textarea
                        rows={2}
                        value={clientNote}
                        onChange={(e) => setClientNote(e.target.value)}
                        placeholder="Brief summary of your vision, target users, or integrations..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-[#f6891f] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#f6891f] via-[#ff9d3b] to-[#e07310] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-lg shadow-[#f6891f]/25 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>TRANSMITTING SCOPE...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>DISPATCH BLUEPRINT & MUTUAL NDA</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono-tech text-slate-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Protected by 100% Bilateral Non-Disclosure Agreement</span>
                    </div>
                  </form>
                </div>
              ) : (
                /* Instant Success State in-place */
                <div className="py-6 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold block">
                      TICKET {ticketId} GENERATED
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                      Scope Blueprint Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                      Our Principal Technical Architect in Alpharetta, GA has received your squad parameters. A formal sprint breakdown and signed bilateral NDA will be emailed to <span className="text-white font-semibold">{clientEmail}</span> within 4 hours.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-left space-y-1.5 text-xs font-mono-tech text-slate-400">
                    <div className="text-white font-bold">Next Steps:</div>
                    <div>1. Architecture review against your stack: <span className="text-cyan-400">{keyStack.join(', ')}</span></div>
                    <div>2. Team pod matching: <span className="text-indigo-400">{squadSize} Senior Engineers</span></div>
                    <div>3. Kickoff timeline: <span className="text-emerald-400">{clientTimeline}</span></div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Configure Another Estimate
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#f6891f] hover:bg-[#e07310] text-white font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
