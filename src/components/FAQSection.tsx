import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  Phone, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2,
  Lock,
  Layers,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp } from './MotionWrappers';
import { useHomepageContent } from './HomepageContentContext';

interface FAQItem {
  id: string;
  category: 'general' | 'engineering' | 'pricing';
  question: string;
  answer: string;
  highlight?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What core engineering disciplines does PureTech Innovations specialize in?',
    answer: 'PureTech provides end-to-end digital product engineering across six flagship disciplines: Native Mobile Development (SwiftUI & Kotlin Compose), Modern Web Platforms (React 19 & Next.js), Applied Artificial Intelligence (Agentic Workflows, Vector RAG, LLM Tooling), Enterprise Cloud Architecture (AWS, GCP, Kubernetes), and Automated Zero-Defect QA Testing (Appium, Selenium, k6).',
    highlight: 'Turnkey pods & architectural consulting'
  },
  {
    id: 'faq-2',
    category: 'general',
    question: 'How do you protect intellectual property, trade secrets, and source code?',
    answer: 'Every collaboration begins with a fully executed bilateral non-disclosure agreement (NDA) before any architectural discussions or repository access. All developed source code, patentable algorithms, designs, and database models belong 100% to your organization from the first commit. Code is stored in encrypted, zero-trust private environments.',
    highlight: '100% Client IP Ownership & Bilateral NDA'
  },
  {
    id: 'faq-3',
    category: 'engineering',
    question: 'What does your automated Zero-Defect QA verification process look like?',
    answer: 'Rather than relying on manual checks alone, we construct continuous multi-device test harnesses. Every pull request triggers automated end-to-end user journey tests across physical iOS, Android, and browser matrices via Appium and Selenium, coupled with k6 concurrency stress tests and SonarQube static code security audits.',
    highlight: 'Continuous multi-device CI/CD matrix'
  },
  {
    id: 'faq-4',
    category: 'engineering',
    question: 'Can PureTech integrate with or augment our existing in-house engineering team?',
    answer: 'Yes. We frequently embed specialized senior pods alongside internal CTOs and VPs of Engineering. We adapt to your sprint cadence, participate in daily standups, adhere to your branch conventions, and collaborate directly within your Slack/Teams and Jira/GitHub toolchains.',
    highlight: 'Seamless workflow integration'
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'How are sprint timelines, milestones, and deliverables structured?',
    answer: 'We operate in high-velocity two-week agile sprint cycles. Every sprint commences with clear backlog estimation and concludes with a live video demonstration of functional software, automated test passes, and tangible repository commits. You receive transparent weekly retrospectives and burn-down reporting.',
    highlight: 'Two-week iterative sprint cadences'
  },
  {
    id: 'faq-6',
    category: 'pricing',
    question: 'What are your engagement models and project pricing structures?',
    answer: 'We provide three tailored engagement frameworks: (1) Fixed-Scope Milestone Delivery for validated MVPs, (2) Dedicated Sprint Pods with senior architect allocations for scaling platforms, and (3) Enterprise Retainers with guaranteed SLAs for continuous modernization and AI innovation.',
    highlight: 'Predictable sprint budgeting'
  }
];

export const FAQSection: React.FC = () => {
  const { companyFacts: COMPANY_FACTS } = useHomepageContent();
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'engineering' | 'pricing'>('all');
  const [openId, setOpenId] = useState<string>('faq-1');

  const filteredItems = activeCategory === 'all' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(item => item.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? '' : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-36 relative bg-[#060810] select-none overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#f6891f]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER (Nextnox Agency Style: Subtitle { 09 } + Split Heading)   */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-1">
              <span className="text-slate-200 font-medium">FREQUENTLY ASKED QUESTIONS // ARCHITECTURAL CLARITY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.08]">
              Answers to{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                Common Engineering
              </span>{' '}
              Questions.
            </h2>
          </div>

          {/* Category Filter Pills (Nextnox Nav Tabs) */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General & IP' },
              { id: 'engineering', label: 'Engineering & QA' },
              { id: 'pricing', label: 'Sprints & Pricing' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#f6891f] text-white font-bold shadow-lg shadow-[#f6891f]/25'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN SPLIT STAGE: Left CTA Card + Right Accordion Matrix (Nextnox Layout)   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Talk With Our Team CTA Box (Nextnox .item-cta) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#0c101d]/90 border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#f6891f]/20 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f6891f]/15 border border-[#f6891f]/30 flex items-center justify-center text-[#f6891f]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                Have a unique challenge?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Connect directly with our Principal Architects in Alpharetta, GA to review technical viability, architectures, and sprint estimates.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono-tech">
              <a 
                href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-slate-200 transition-colors group/link"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#f6891f]" />
                  <span>{COMPANY_FACTS.phone}</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-transform" />
              </a>

              <a 
                href="mailto:info@puretechinnovations.com"
                className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-slate-200 transition-colors group/link"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f6891f]" />
                  <span className="truncate">info@puretechinnovations.com</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/link:text-white group-hover/link:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Inclusions & Guarantees */}
            <div className="space-y-2 pt-2 text-[11px] font-mono-tech text-slate-400">
              <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>Bilateral NDA signed prior to discussion</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Guaranteed architect response &lt; 4 hours</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <a
              href="#contact"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f6891f] to-[#ff9d3b] hover:from-[#e07310] hover:to-[#f6891f] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#f6891f]/20 hover:scale-[1.02] active:scale-95"
            >
              <span>Schedule Architecture Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* RIGHT COLUMN: Interactive Accordion Matrix */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            {filteredItems.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#0d1222]/95 border-[#f6891f]/50 shadow-[0_10px_30px_rgba(246,137,31,0.12)]'
                      : 'bg-[#0a0d18]/70 border-white/10 hover:border-white/20 hover:bg-[#0c1020]'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono-tech font-bold transition-colors ${
                        isOpen ? 'text-[#f6891f]' : 'text-slate-400'
                      }`}>
                        0{index + 1}
                      </span>
                      <span className={`text-base sm:text-lg font-display font-bold transition-colors ${
                        isOpen ? 'text-white' : 'text-slate-200 hover:text-white'
                      }`}>
                        {item.question}
                      </span>
                    </div>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#f6891f] border-[#f6891f] text-white rotate-180'
                        : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Body with Smooth AnimatePresence */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 font-light leading-relaxed space-y-4 border-t border-white/[0.06]">
                          <p>{item.answer}</p>
                          
                          {item.highlight && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6891f]/10 border border-[#f6891f]/30 text-xs font-mono-tech text-[#f6891f] font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#f6891f]" />
                              <span>{item.highlight}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
