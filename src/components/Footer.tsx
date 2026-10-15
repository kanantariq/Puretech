import React, { useState } from 'react';
import { 
  ArrowUp, 
  ArrowUpRight, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Terminal,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Check,
  Copy,
  Send
} from 'lucide-react';
import { useHomepageContent } from './HomepageContentContext';

const SHOWCASE_GALLERY = [
  {
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    title: 'OmniHealth AI',
    category: 'Biomedical Platform'
  },
  {
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
    title: 'AeroLogix Global',
    category: 'Autonomous Logistics'
  },
  {
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    title: 'Veloce Capital',
    category: 'Algorithmic Trading'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    title: 'Solaris OS',
    category: 'Enterprise Cloud'
  },
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
    title: 'Nexus Luxury',
    category: 'E-Commerce Platform'
  },
  {
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    title: 'Spectra Robotics',
    category: 'Computer Vision'
  }
];

export const Footer: React.FC<{ homePath?: string }> = ({ homePath = '' }) => {
  const { companyFacts: COMPANY_FACTS } = useHomepageContent();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [quickEmail, setQuickEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickEmail) return;
    setIsSent(true);
    setTimeout(() => {
      setQuickEmail('');
      setIsSent(false);
    }, 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070d] text-slate-300 relative overflow-hidden border-t border-white/[0.08]">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-cyan-500/[0.04] blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-blue-600/[0.04] blur-[160px] pointer-events-none -z-10" />

      {/* 1. TOP VISUAL SHOWCASE STRIP (Nextnox nxr-ftr-insta style) */}
      <div className="relative w-full border-b border-white/[0.08] overflow-hidden bg-black/40">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 group/gallery">
          {SHOWCASE_GALLERY.map((item, idx) => (
            <a
              key={idx}
              href={`${homePath}#work`}
              className="relative aspect-[4/3] sm:aspect-square overflow-hidden block group/item border-r border-b sm:border-b-0 border-white/[0.06] last:border-r-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover/item:grayscale-0 group-hover/item:scale-110 group-hover/item:brightness-105 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover/item:opacity-85 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end transform translate-y-2 opacity-0 group-hover/item:translate-y-0 group-hover/item:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-white tracking-tight flex items-center justify-between">
                  {item.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Floating Center Badge / Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <a
            href={`${homePath}#work`}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#080d1a]/95 backdrop-blur-xl border border-cyan-400/40 text-white shadow-[0_10px_35px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:bg-[#0c1428] hover:scale-105 transition-all duration-300 text-[11px] sm:text-xs font-mono-tech tracking-wider uppercase group whitespace-nowrap"
          >
            <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform shrink-0" />
            <span>PureTech Project Showcase</span>
            <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. FOOTER TOP: Impactful Callout & Action CTA (Nextnox nxr-footer-top style) */}
        <div className="py-16 sm:py-20 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm">
                <span className="text-slate-200 font-medium">SPRINT DISCUSSIONS // GET IN TOUCH</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.1]">
                Have a project in mind?{' '}
                <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white">
                  Let’s talk.
                </span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                From high-performance mobile apps to enterprise web architectures and AI copilots, we build digital products that dominate markets.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={`${homePath}#contact`}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#f6891f] to-[#ff9d3b] text-white font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(246,137,31,0.35)] hover:shadow-[0_15px_40px_rgba(246,137,31,0.5)] hover:scale-105 transition-all duration-300 group"
              >
                <span>Initiate Sprint Discussion</span>
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>

              <a
                href={`${homePath}#estimator`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-slate-200 text-sm font-semibold transition-colors duration-200"
              >
                <span>Scope Estimator</span>
              </a>
            </div>
          </div>

          {/* Quick Anchor Navigation Strip */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs font-mono-tech uppercase tracking-wider text-slate-400">
            <a href={`${homePath}#hero`} className="hover:text-[#f6891f] transition-colors">01 // Home</a>
            <a href={`${homePath}#capabilities`} className="hover:text-[#f6891f] transition-colors">02 // Services</a>
            <a href={`${homePath}#work`} className="hover:text-[#f6891f] transition-colors">03 // Work</a>
            <a href={`${homePath}#what-if`} className="hover:text-[#f6891f] transition-colors">04 // R&amp;D Labs</a>
            <a href={`${homePath}#pillars`} className="hover:text-[#f6891f] transition-colors">05 // Process</a>
            <a href={`${homePath}#about`} className="hover:text-[#f6891f] transition-colors">06 // About</a>
            <a href={`${homePath}#team`} className="hover:text-[#f6891f] transition-colors">07 // Team</a>
            <a href={`${homePath}#testimonials`} className="hover:text-[#f6891f] transition-colors">08 // Reviews</a>
            <a href={`${homePath}#estimator`} className="hover:text-[#f6891f] transition-colors">09 // Estimator</a>
            <a href={`${homePath}#faq`} className="hover:text-[#f6891f] transition-colors">10 // FAQs</a>
            <a href={`${homePath}#contact`} className="hover:text-[#f6891f] transition-colors">11 // Contact</a>
          </div>
        </div>

        {/* 3. FOOTER MIDDLE: Split Brand Node & 3 High-End Agency Action Cards */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/[0.08]">
          {/* Left Column: Brand Emblem, Fast RFP Dispatch & Live Clocks (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/puretech-logo.svg"
                  alt="PureTech Innovations"
                  className="h-8 sm:h-9 w-auto object-contain"
                />
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                  EST. 2020
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Premier digital engineering and product studio. We partner with ambitious startups and Fortune 500 enterprises to deliver fault-tolerant web platforms, native mobile applications, and intelligent systems.
              </p>
            </div>

            {/* Nextnox Quick RFP Dispatch Form */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 max-w-md">
              <div className="flex items-center justify-between text-[11px] font-mono-tech text-cyan-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Fast Project Dispatch</span>
                </span>
                <span className="text-slate-400 text-[10px]">Same-Day Estimate</span>
              </div>
              <form onSubmit={handleQuickSubmit} className="flex items-center gap-2">
                <input 
                  type="email" 
                  value={quickEmail}
                  onChange={(e) => setQuickEmail(e.target.value)}
                  placeholder="Enter your business email..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-cyan-400/60 focus:outline-none text-xs text-white placeholder-slate-500 font-mono-tech transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono-tech font-bold flex items-center gap-1.5 transition-all hover:scale-105 shrink-0"
                >
                  {isSent ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Received</span>
                    </>
                  ) : (
                    <>
                      <span>Send</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
              {isSent && (
                <p className="text-[11px] text-emerald-400 font-mono-tech animate-fade-in">
                  ✓ Request logged. Our partner team will reach out within 4 hours.
                </p>
              )}
            </div>

            {/* Distributed Studio Nodes */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono-tech uppercase tracking-widest text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-2 text-cyan-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Distributed Studio Nodes</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono-tech flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Pods Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {COMPANY_FACTS.deliveryHubs.map((hub, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.06] transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base leading-none">{hub.flag}</span>
                        <span className="text-xs font-display font-bold text-white tracking-tight">
                          {hub.country}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
                        {hub.code}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono-tech text-slate-300 truncate">
                      {hub.city}
                    </div>
                    <div className="text-[10px] text-slate-400 font-light truncate">
                      {hub.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Bilateral NDA Guaranteed</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/10">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOC2 Type II Aligned</span>
              </span>
            </div>
          </div>

          {/* Right Column: Nextnox-Style 3 Action Cards (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-slate-400">
              Direct Agency Channels
            </div>

            {/* Card 1: Direct Hotline */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-300 group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono-tech text-cyan-400 uppercase tracking-widest block">
                      Direct Hotlines // Voice &amp; SMS
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base font-bold text-white font-mono-tech mt-1">
                      <a href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-cyan-400 transition-colors">
                        {COMPANY_FACTS.phone}
                      </a>
                      <span className="text-slate-600 font-normal">·</span>
                      <a href={`tel:${COMPANY_FACTS.secondaryPhone.replace(/[^0-9+]/g, '')}`} className="hover:text-cyan-400 transition-colors text-slate-300">
                        {COMPANY_FACTS.secondaryPhone}
                      </a>
                      <button
                        onClick={() => copyToClipboard(COMPANY_FACTS.phone, 'phone')}
                        className="text-slate-500 hover:text-cyan-300 text-xs ml-1 transition-colors"
                        title="Copy phone"
                      >
                        {copiedKey === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400 inline" /> : <Copy className="w-3.5 h-3.5 inline" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Mon – Fri: 09:00 AM – 06:00 PM EST · Urgent engineering escalations routed 24/7
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${COMPANY_FACTS.phone.replace(/[^0-9+]/g, '')}`}
                  className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/50 transition-colors"
                  aria-label="Call PureTech"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 2: Official Inquiries */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-teal-400/40 hover:bg-white/[0.05] transition-all duration-300 group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono-tech text-teal-400 uppercase tracking-widest block">
                      Official Inquiries // Proposals &amp; RFPs
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base font-bold text-white font-mono-tech mt-1">
                      <a href={`mailto:${COMPANY_FACTS.email}`} className="hover:text-teal-400 transition-colors">
                        {COMPANY_FACTS.email}
                      </a>
                      <span className="text-slate-600 font-normal">·</span>
                      <a href="mailto:sprints@puretechinnovations.com" className="hover:text-teal-400 transition-colors text-slate-300">
                        sprints@puretechinnovations.com
                      </a>
                      <button
                        onClick={() => copyToClipboard(COMPANY_FACTS.email, 'email')}
                        className="text-slate-500 hover:text-teal-300 text-xs ml-1 transition-colors"
                        title="Copy email"
                      >
                        {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400 inline" /> : <Copy className="w-3.5 h-3.5 inline" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Target response time: &lt; 4 business hours · Pitch deck &amp; mutual NDA reviews
                    </p>
                  </div>
                </div>
                <a
                  href={`mailto:${COMPANY_FACTS.email}`}
                  className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-teal-400 group-hover:border-teal-400/50 transition-colors"
                  aria-label="Email PureTech"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 3: Global Headquarters */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-sky-400/40 hover:bg-white/[0.05] transition-all duration-300 group">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-mono-tech text-sky-400 uppercase tracking-widest block">
                      Studio Headquarters // North America
                    </span>
                    <div className="text-sm sm:text-base font-bold text-white mt-1">
                      {COMPANY_FACTS.headquarters}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Dallas Design District · Dallas Metropolitan Area, TX, USA
                    </p>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY_FACTS.headquarters)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-sky-400 group-hover:border-sky-400/50 transition-colors"
                  aria-label="Open in Google Maps"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FOOTER BOTTOM: Copyright, Social Channels & Smooth Back to Top (Nextnox nxr-ftr-copyright) */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech">
              © {new Date().getFullYear()} PureTech Innovations LLC. All Rights Reserved.
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:inline-block text-slate-500">
              Next-Gen Digital Product &amp; Technology Agency
            </span>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Back to Top Circular Button */}
            <div className="ml-3 pl-3 border-l border-white/10">
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-500 text-cyan-400 hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] group cursor-pointer"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
