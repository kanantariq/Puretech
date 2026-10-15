import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Linkedin, 
  Twitter, 
  Github, 
  Mail, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  pedigree: string;
  domain: string;
  skills: string[];
  image: string;
  imagePosition?: string;
  accentColor: string;
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Chief AI & Neural Systems Architect',
    pedigree: 'Ex-OpenAI Fellow · Stanford AI Lab',
    domain: 'Generative Intelligence & Transformer Runtimes',
    skills: ['Local LLMs', 'Quantization', 'Agent Swarms', 'PyTorch'],
    image: '/images/team/elena.jpg',
    imagePosition: 'center 22%',
    accentColor: '#22d3ee', // Cyan
    bio: 'Pioneers high-throughput edge agent orchestration and private enterprise neural models with sub-10ms response latencies.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      email: 'elena@puretech.co'
    }
  },
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Principal Distributed Systems Architect',
    pedigree: 'Ex-Google Cloud Infra · 14+ Yrs Architecture',
    domain: 'Event-Driven Microservices & Cloud Scale',
    skills: ['Kafka', 'Kubernetes', 'Zero-Trust Mesh', 'Go/Rust'],
    image: '/images/team/marcus.jpg',
    imagePosition: 'center 35%',
    accentColor: '#818cf8', // Indigo
    bio: 'Architect of mission-critical streaming backbones processing 200,000+ operations/sec for global logistics and fintech conglomerates.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'marcus@puretech.co'
    }
  },
  {
    id: 'sora-takahashi',
    name: 'Sora Takahashi',
    role: 'Creative Technologist & Head of 3D',
    pedigree: 'Awwwards Judge · Tokyo Digital Arts Guild',
    domain: 'Spatial Interfaces, WebGL & Kinetic UI',
    skills: ['Three.js', 'Custom GLSL Shaders', 'WebGPU', 'Motion UX'],
    image: '/images/team/sora.jpg',
    imagePosition: 'center 35%',
    accentColor: '#f43f5e', // Rose
    bio: 'Fuses tactile graphic design with 60 FPS GPU-accelerated web experiences, giving digital products the physical soul of a luxury timepiece.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      email: 'sora@puretech.co'
    }
  },
  {
    id: 'aris-thorne',
    name: 'Dr. Aris Thorne',
    role: 'VP of Engineering & Delivery Velocity',
    pedigree: 'MIT CS Doctorate · Alpharetta Pods Director',
    domain: 'Follow-the-Sun Pod Governance & QA Auditing',
    skills: ['CI/CD Orchestration', 'Automated QA', 'k6 Stress', 'DevSecOps'],
    image: '/images/team/aris.jpg',
    imagePosition: 'center 38%',
    accentColor: '#10b981', // Emerald
    bio: 'Steers PureTech’s distributed 24/7 delivery velocity. Ensures zero-regression code quality from prototype to global multi-region deployments.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'aris@puretech.co'
    }
  },
  {
    id: 'maya-lin',
    name: 'Maya Lin-Sterling',
    role: 'Director of Product Strategy & Experience',
    pedigree: 'Ex-IDEO Design Lead · Stanford d.school',
    domain: 'Cognitive Architecture & Enterprise Systems',
    skills: ['User Research', 'Design Systems', 'Figma Prototyping', 'Accessibility'],
    image: '/images/team/maya.jpg',
    imagePosition: 'center 48%',
    accentColor: '#fbbf24', // Amber
    bio: 'Translates volatile corporate software workflows into elegant, intuitive customer journeys that consistently yield +40% conversion uplifts.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      email: 'maya@puretech.co'
    }
  },
  {
    id: 'devon-chen',
    name: 'Devon Chen',
    role: 'Head of Reliability & Security Engineering',
    pedigree: 'DEF CON Speaker · Certified Kubernetes Lead',
    domain: 'Zero-Day Hardening & Multi-Cloud Resilience',
    skills: ['Penetration Testing', 'Chaos Engineering', 'AWS/GCP', 'eBPF'],
    image: '/images/team/devon.jpg',
    imagePosition: 'center 22%',
    accentColor: '#c084fc', // Purple
    bio: 'Guards PureTech client IP with defense-in-depth protocols, real-time threat telemetry, and automated self-healing cloud clusters.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'devon@puretech.co'
    }
  }
];

export const TeamSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Hook into vertical scroll to drive horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring physics for Nextnox-style momentum
  const headingScale = useTransform(scrollYProgress, [0, 0.15], [1.02, 1]);
  const headingY = useTransform(scrollYProgress, [0, 0.15], ['10px', '0px']);

  // Translates cards continuously from 0.02 to 0.90 so all 6 cards glide smoothly across the screen
  const rawX = useTransform(scrollYProgress, [0.02, 0.90], ['2%', '-48%']);
  const smoothX = useSpring(rawX, {
    stiffness: 90,
    damping: 24,
    mass: 0.35
  });

  // Progress bar calibrated to match card translation exactly - hits 100% when member 06 settles (0 dead scroll!)
  const activeProgress = useTransform(scrollYProgress, [0.02, 0.90], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      id="team" 
      className="relative h-[360vh] bg-[#06080f] select-none"
    >
      {/* Background Ambience & Gradient Fades */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05060a] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none z-10" />
      
      {/* Sticky Fullscreen Frame that stays locked in viewport while user scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 lg:py-8 z-20">
        
        {/* Subtle Ambient Studio Glow */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] pointer-events-none opacity-25 -z-10"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, #6366f1 50%, transparent 70%)' }}
        />

        {/* Top Header Block: Nextnox Agency Typographic Lockup (Proportional Scale with Clean Clearance) */}
        <motion.div 
          style={{ scale: headingScale, y: headingY }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full will-change-transform shrink-0 mb-2 sm:mb-4"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            
            {/* Left Typographic Lockup */}
            <div className="space-y-2">
              {/* Nextnox Subtitle Indicator */}
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-mono-tech uppercase tracking-[0.2em] shadow-sm mb-1">
                <span className="text-slate-200 font-medium">LEADERSHIP POD // EXPERT ENGINEERING</span>
              </div>

              {/* Nextnox Iconic Editorial Title with Embedded Avatars */}
              <div className="font-display uppercase tracking-tight text-white select-none">
                {/* Line 1 */}
                <div className="text-xl sm:text-4xl lg:text-5xl font-black flex items-center gap-2 sm:gap-3">
                  <span>OUR</span>
                  <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] via-amber-200 to-white normal-case">
                    creative
                  </span>
                  <span>ENGINEERING</span>
                </div>

                {/* Line 2 with Inline Bubble Avatars Stack */}
                <div className="text-xl sm:text-4xl lg:text-5xl font-black flex items-center gap-2 sm:gap-3 mt-1">
                  {/* Avatar Stack like Nextnox .img-wrapper */}
                  <div className="hidden sm:inline-flex items-center -space-x-3 pr-2">
                    {TEAM_MEMBERS.slice(0, 3).map((m, idx) => (
                      <div 
                        key={idx} 
                        className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border-2 border-[#0a0d14] ring-2 ring-[#f6891f]/30 shadow-lg"
                      >
                        <img 
                          src={m.image} 
                          alt={m.name} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f6891f] to-[#ff9d3b]">
                    EXPERT
                  </span>
                  <span>TEAM</span>
                </div>
              </div>
            </div>

            {/* Right Side: Guiding Telemetry & Nextnox-style Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono-tech text-slate-300 uppercase tracking-wider">
                  TOP 2% SENIOR ARCHITECTS ONLY
                </span>
              </div>
              <div className="hidden lg:flex items-center gap-2 text-xs font-mono-tech text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Scroll vertically to glide roster</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* HORIZONTAL CAROUSEL STREAM (Separated from header with proper clearance) */}
        {/* ========================================================================= */}
        <div 
          className="w-full relative my-auto py-2 overflow-visible"
        >
          <motion.div 
            style={{ x: smoothX }}
            className="flex items-center gap-5 sm:gap-8 px-4 sm:px-12 w-max will-change-transform"
          >
            {TEAM_MEMBERS.map((member, idx) => {
              const formattedIdx = `0${idx + 1}`;
              const isHovered = activeCard === member.id;

              return (
                <div
                  key={member.id}
                  onMouseEnter={() => setActiveCard(member.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  className="group relative w-[260px] sm:w-[330px] lg:w-[360px] rounded-[24px] sm:rounded-[26px] p-3.5 sm:p-5 bg-[#0c101c]/95 border border-white/15 backdrop-blur-md transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Nextnox Abstract Glowing Backdrop Shape */}
                  <div 
                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-25 pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                    style={{ background: member.accentColor }}
                  />

                  {/* Concentric Geometric Orbit Ring (Nextnox-style tm-circle) */}
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-dashed border-white/[0.06] pointer-events-none group-hover:border-white/[0.15] transition-colors duration-700"
                  />

                  {/* Top Card Meta: Index & Specialization Tag */}
                  <div className="relative z-10 flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" 
                        style={{ backgroundColor: member.accentColor, color: member.accentColor }}
                      />
                      <span className="text-[11px] font-mono-tech font-bold uppercase tracking-widest text-slate-300">
                        {formattedIdx} // {member.pedigree.split('·')[0].trim()}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-400/40 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                  {/* Member Editorial Portrait (Vibrant & High Visibility with Sleek Height) */}
                  <div className="relative z-10 w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-900 border border-white/15 mb-3 group-hover:border-cyan-400/40 transition-all duration-500">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{ objectPosition: member.imagePosition || 'center 25%' }}
                      className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />

                    {/* Subtle Gradient Vignette at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-transparent opacity-45" />

                    {/* Pedigree Pill Floating over Image (fades on hover as semi-circle emerges) */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono-tech text-cyan-300 font-semibold uppercase tracking-wider truncate">
                        {member.pedigree}
                      </span>
                    </div>

                    {/* Nextnox Semi-Circle Radial Social Icons Arc (Emerges on Hover) */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 pointer-events-auto">
                      <div className="relative w-48 h-24 rounded-t-full bg-[#07090e]/95 border-t-2 border-x-2 border-cyan-400/60 shadow-[0_-15px_45px_rgba(6,182,212,0.45)] backdrop-blur-xl flex items-end justify-center pb-2 px-3 overflow-hidden">
                        {/* Glowing Inner Arch Outline */}
                        <div className="absolute inset-1 rounded-t-full border-t border-x border-cyan-300/25 pointer-events-none" />
                        
                        {/* Accent Halo */}
                        <div 
                          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-28 h-12 rounded-full blur-md opacity-60 pointer-events-none"
                          style={{ backgroundColor: member.accentColor }}
                        />

                        {/* 4 Social Icons distributed along the semi-circle curved arch */}
                        <div className="relative z-10 flex items-center justify-between w-full px-1.5">
                          {member.socials.linkedin && (
                            <a 
                              href={member.socials.linkedin} 
                              target="_blank" 
                              rel="noreferrer"
                              aria-label={`${member.name} LinkedIn`}
                              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-cyan-400 hover:text-black border border-white/15 hover:border-cyan-400 text-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] translate-y-1.5"
                            >
                              <Linkedin className="w-3 h-3" />
                            </a>
                          )}
                          {member.socials.twitter && (
                            <a 
                              href={member.socials.twitter} 
                              target="_blank" 
                              rel="noreferrer"
                              aria-label={`${member.name} Twitter`}
                              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-cyan-400 hover:text-black border border-white/15 hover:border-cyan-400 text-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] -translate-y-2"
                            >
                              <Twitter className="w-3 h-3" />
                            </a>
                          )}
                          {member.socials.github && (
                            <a 
                              href={member.socials.github} 
                              target="_blank" 
                              rel="noreferrer"
                              aria-label={`${member.name} GitHub`}
                              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-cyan-400 hover:text-black border border-white/15 hover:border-cyan-400 text-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] -translate-y-2"
                            >
                              <Github className="w-3 h-3" />
                            </a>
                          )}
                          {member.socials.email && (
                            <a 
                              href={`mailto:${member.socials.email}`}
                              aria-label={`Email ${member.name}`}
                              className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-cyan-400 hover:text-black border border-white/15 hover:border-cyan-400 text-slate-200 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] translate-y-1.5"
                            >
                              <Mail className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Member Name & Role Information */}
                  <div className="relative z-10 space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors duration-300">
                      {member.name}
                    </h3>

                    <p className="text-xs sm:text-sm font-medium text-slate-300">
                      {member.role}
                    </p>

                    <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2 pt-0.5">
                      {member.bio}
                    </p>
                  </div>

                  {/* Skills Pills & Social Bar (Nextnox tx-social) */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                    {/* Skills Tag Preview */}
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {member.skills.slice(0, 2).map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono-tech text-slate-300 whitespace-nowrap"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links matching Nextnox item-social */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {member.socials.linkedin && (
                        <a 
                          href={member.socials.linkedin} 
                          target="_blank" 
                          rel="noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a 
                          href={member.socials.twitter} 
                          target="_blank" 
                          rel="noreferrer"
                          aria-label={`${member.name} Twitter`}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
                        >
                          <Twitter className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a 
                          href={member.socials.github} 
                          target="_blank" 
                          rel="noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.socials.email && (
                        <a 
                          href={`mailto:${member.socials.email}`}
                          aria-label={`Email ${member.name}`}
                          className="w-7 h-7 rounded-lg bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Telemetry & Scrollytelling Progress Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/10">
            
            {/* Scroll Instruction */}
            <div className="flex items-center gap-3 text-xs font-mono-tech text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="uppercase tracking-widest text-slate-300">
                DRIVE SCROLL TO CYCLE LEADERSHIP PODS [01 — 06]
              </span>
            </div>

            {/* Dynamic Progress Indicator */}
            <div className="flex items-center gap-4 w-44 sm:w-64">
              <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  style={{ scaleX: activeProgress, transformOrigin: 'left' }}
                  className="h-full w-full bg-gradient-to-r from-[#f6891f] via-amber-400 to-cyan-400"
                />
              </div>
              <span className="text-[11px] font-mono-tech text-[#f6891f] font-bold">
                ROSTER
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
