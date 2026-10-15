import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronDown,
  Sparkles, 
  Smartphone, 
  Globe, 
  Cpu, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  Code2, 
  Palette, 
  TrendingUp, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { useHomepageContent } from './HomepageContentContext';

interface HeaderProps {
  homePath?: string;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onOpenReel: () => void;
}

type MenuCategory = 'ui-ux-design' | 'web-app-dev' | 'ai-automation' | 'growth-marketing' | 'engineering-augmentation';

interface SubMenuItem {
  title: string;
  tagline: string;
  hash: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface MainMenuItem {
  id: MenuCategory;
  num: string;
  title: string;
  subtitle: string;
  hash: string;
  submenuHeader: string;
  submenuDesc: string;
  submenuItems: SubMenuItem[];
}

const MENU_DATA: MainMenuItem[] = [
  {
    id: 'ui-ux-design',
    num: '01',
    title: 'UI/UX & BRAND DESIGN',
    subtitle: 'Human-Centered Interfaces, Motion & Visual Identities',
    hash: '#capabilities',
    submenuHeader: 'UI/UX & BRAND DESIGN // CREATIVE SUITE',
    submenuDesc: 'Elevate your digital presence with engaging, user-centered design, interactive prototyping, and cohesive branding.',
    submenuItems: [
      {
        title: 'UI/UX Design',
        tagline: 'Wireframing, High-Fidelity UI, User Journey Mapping & Design Systems',
        hash: '#capabilities',
        badge: 'CORE',
        icon: <Layers className="w-5 h-5 text-rose-400" />
      },
      {
        title: 'Brand & Identity',
        tagline: 'Brand Strategy, Visual Identity, Brand Guidelines & Collaterals',
        hash: '#capabilities',
        badge: 'BRAND',
        icon: <Palette className="w-5 h-5 text-purple-400" />
      },
      {
        title: 'Video Editing & Motion',
        tagline: 'Promotional Videos, Motion Graphics, Social Media Reels & Explainers',
        hash: '#capabilities',
        badge: 'MOTION',
        icon: <Sparkles className="w-5 h-5 text-amber-400" />
      },
      {
        title: 'Social Media Design',
        tagline: 'Post & Ad Creatives, Carousel Visuals & Content Strategy',
        hash: '#capabilities',
        badge: 'CREATIVE',
        icon: <TrendingUp className="w-5 h-5 text-cyan-400" />
      }
    ]
  },
  {
    id: 'web-app-dev',
    num: '02',
    title: 'WEB & APP DEVELOPMENT',
    subtitle: 'Custom Websites, Mobile Apps & Enterprise Portals',
    hash: '#capabilities',
    submenuHeader: 'WEB & APP DEVELOPMENT // ENGINEERING SUITE',
    submenuDesc: 'Scalable, high-performance web, mobile, and custom portal solutions engineered for long-term growth and reliability.',
    submenuItems: [
      {
        title: 'Web Design & Development',
        tagline: 'Custom Responsive Websites, React & Next.js Platforms, CMS & Headless',
        hash: '#capabilities',
        badge: 'POPULAR',
        icon: <Globe className="w-5 h-5 text-sky-400" />
      },
      {
        title: 'Mobile App Development',
        tagline: 'Native iOS Swift, Android Kotlin, Cross-Platform React Native & Flutter',
        hash: '#capabilities',
        badge: 'FLAGSHIP',
        icon: <Smartphone className="w-5 h-5 text-indigo-400" />
      },
      {
        title: 'Custom Software Development',
        tagline: 'Tailored Business Software, Scalable Backend Systems & Cloud APIs',
        hash: '#capabilities',
        badge: 'CUSTOM',
        icon: <Code2 className="w-5 h-5 text-emerald-400" />
      },
      {
        title: 'Custom Portal Development',
        tagline: 'Client & Vendor Portals, Admin Dashboards & Role-Based Access',
        hash: '#capabilities',
        badge: 'ENTERPRISE',
        icon: <Building2 className="w-5 h-5 text-cyan-400" />
      }
    ]
  },
  {
    id: 'ai-automation',
    num: '03',
    title: 'AI & AUTOMATION',
    subtitle: 'Conversational AI, Workflow Bots & Smart CRM',
    hash: '#capabilities',
    submenuHeader: 'AI & AUTOMATION // INTELLIGENT SYSTEMS',
    submenuDesc: 'Streamline operations, enhance engagement, and unlock data-driven efficiency with autonomous AI solutions.',
    submenuItems: [
      {
        title: 'AI Chatbots & Conversational AI',
        tagline: 'Custom LLM Agents, Multi-Turn Bots & 24/7 Support Automation',
        hash: '#capabilities',
        badge: 'NEW',
        icon: <Cpu className="w-5 h-5 text-emerald-400" />
      },
      {
        title: 'Process & Workflow Automation',
        tagline: 'Zapier & Make.com Automation, Custom API Workflows & Lead Routing',
        hash: '#capabilities',
        badge: 'AUTOMATION',
        icon: <Sparkles className="w-5 h-5 text-cyan-400" />
      },
      {
        title: 'CRM Implementation & Maintenance',
        tagline: 'HubSpot, Salesforce & GoHighLevel Setup, Custom Pipelines & Sync',
        hash: '#capabilities',
        badge: 'CRM',
        icon: <CheckCircle2 className="w-5 h-5 text-indigo-400" />
      },
      {
        title: 'Intelligent Reporting & Dashboards',
        tagline: 'Real-Time KPI Dashboards, Predictive Analytics & Business Intelligence',
        hash: '#capabilities',
        badge: 'ANALYTICS',
        icon: <TrendingUp className="w-5 h-5 text-[#f6891f]" />
      }
    ]
  },
  {
    id: 'growth-marketing',
    num: '04',
    title: 'GROWTH & DIGITAL MARKETING',
    subtitle: 'Performance Ads, SEO/AEO/GEO & Lead Generation',
    hash: '#capabilities',
    submenuHeader: 'GROWTH & DIGITAL MARKETING // ACQUISITION',
    submenuDesc: 'Accelerate visibility, generate qualified leads, and scale revenue with data-driven multi-channel growth strategies.',
    submenuItems: [
      {
        title: 'Performance Marketing',
        tagline: 'Meta & Google Ads Management, Precision Targeting & High-Converting Funnels',
        hash: '#capabilities',
        badge: 'GROWTH',
        icon: <TrendingUp className="w-5 h-5 text-[#f6891f]" />
      },
      {
        title: 'SEO / AEO / GEO',
        tagline: 'Search Engine, AI Engine & Generative Engine Optimization',
        hash: '#capabilities',
        badge: 'ORGANIC',
        icon: <Globe className="w-5 h-5 text-emerald-400" />
      },
      {
        title: 'Live Events & Webinars',
        tagline: 'Virtual Event Production, Webinar Funnels & Audience Engagement Strategy',
        hash: '#capabilities',
        badge: 'EVENTS',
        icon: <Layers className="w-5 h-5 text-purple-400" />
      },
      {
        title: 'Email Marketing & Automation',
        tagline: 'Drip Campaigns, Newsletter Strategy, Audience Segmentation & Cold Outreach',
        hash: '#capabilities',
        badge: 'OUTREACH',
        icon: <Mail className="w-5 h-5 text-cyan-400" />
      },
      {
        title: 'Cold Calling & Lead Generation',
        tagline: 'B2B Lead Generation, Targeted Outreach Lists & Appointment Setting',
        hash: '#capabilities',
        badge: 'LEAD GEN',
        icon: <Phone className="w-5 h-5 text-sky-400" />
      },
      {
        title: 'Social Media Management',
        tagline: 'Organic Social Growth, Content Calendars & Community Engagement',
        hash: '#capabilities',
        badge: 'SOCIAL',
        icon: <Palette className="w-5 h-5 text-rose-400" />
      }
    ]
  },
  {
    id: 'engineering-augmentation',
    num: '05',
    title: 'ENGINEERING & AUGMENTATION',
    subtitle: 'Code Audits, Senior Squads & Zero-Defect QA',
    hash: '#capabilities',
    submenuHeader: 'ENGINEERING & TEAM AUGMENTATION // ARCHITECTURE',
    submenuDesc: 'Strengthen technical capabilities with expert code audits, senior architectural advisory, and dedicated sprint pods.',
    submenuItems: [
      {
        title: 'Code Audit & Go-Live Engineering',
        tagline: 'Codebase Architecture Review, Performance & Security Auditing',
        hash: '#capabilities',
        badge: 'AUDIT',
        icon: <ShieldCheck className="w-5 h-5 text-purple-400" />
      },
      {
        title: 'Dedicated Squad / Team Augmentation',
        tagline: 'Senior Engineers & Architects, Cross-Functional Agile Pods',
        hash: '#capabilities',
        badge: 'DEDICATED',
        icon: <Building2 className="w-5 h-5 text-indigo-400" />
      },
      {
        title: 'Zero-Defect QA & Testing',
        tagline: 'Automated Multi-Device CI/CD Test Harnesses (Appium & Selenium)',
        hash: '#capabilities',
        badge: 'QA 99.9%',
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      },
      {
        title: 'Cloud Infrastructure & DevOps',
        tagline: 'Docker, Kubernetes, AWS/GCP Reliability & CI/CD Pipelines',
        hash: '#capabilities',
        badge: 'DEVOPS',
        icon: <Cpu className="w-5 h-5 text-cyan-400" />
      }
    ]
  }
];

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  onOpenEstimator,
  onOpenContact,
  onOpenReel,
  homePath = ''
}) => {
  const { companyFacts: COMPANY_FACTS } = useHomepageContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(homePath ? '' : 'work');
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('ui-ux-design');
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['capabilities', 'work', 'pillars', 'about', 'team', 'testimonials', 'estimator', 'solutions', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const cleanId = id.replace('#', '');
    if (homePath) { window.location.href = `${homePath}#${cleanId}`; return; }
    const element = document.getElementById(cleanId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmenuClick = (hash: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    if (homePath && hash.startsWith('#')) { window.location.href = `${homePath}${hash}`; return; }
    if (hash.startsWith('#')) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.hash = hash;
  };

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const currentCategoryData = MENU_DATA.find((m) => m.id === activeCategory) || MENU_DATA[0];

  const NAV_ITEMS = [
    { id: 'capabilities', label: 'SERVICES', hasDropdown: true },
    { id: 'work', label: 'WORK' },
    { id: 'solutions', label: 'SOLUTIONS' },
    { id: 'pillars', label: 'PROCESS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'team', label: 'TEAM' },
    { id: 'testimonials', label: 'REVIEWS' },
    { id: 'estimator', label: 'ESTIMATOR' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#08090d]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'py-5 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Official PureTech Innovations Vector */}
            <a
              href={homePath || "#"}
              onClick={(e) => {
                if (homePath) return;
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-3 cursor-pointer"
              id="brand-logo"
            >
              <img
                src="/puretech-logo.svg"
                alt="PureTech Innovations"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Center Navigation Links with Interactive Services Mega Dropdown */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-mono-tech uppercase tracking-wider text-slate-300 relative">
              {NAV_ITEMS.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      className="relative py-2"
                      onMouseEnter={handleMouseEnterServices}
                      onMouseLeave={handleMouseLeaveServices}
                    >
                      {/* Clicking SERVICES toggles dropdown ONLY - no redirection */}
                      <button
                        id={`nav-link-${item.id}`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setServicesDropdownOpen((prev) => !prev);
                        }}
                        className={`transition-colors cursor-pointer py-1 flex items-center gap-1.5 relative select-none ${
                          activeSection === item.id || servicesDropdownOpen
                            ? 'text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#f6891f]' : 'text-slate-500'}`} />
                        {(activeSection === item.id || servicesDropdownOpen) && (
                          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f6891f]" />
                        )}
                      </button>

                      {/* Spacious Luxury Mega Dropdown Panel */}
                      {servicesDropdownOpen && (
                        <div 
                          className="absolute top-full -left-64 xl:-left-72 w-[1040px] xl:w-[1140px] pt-4 animate-in fade-in slide-in-from-top-3 duration-250 z-50 pointer-events-auto"
                          onMouseEnter={handleMouseEnterServices}
                          onMouseLeave={handleMouseLeaveServices}
                        >
                          <div className="rounded-[28px] bg-[#090b12]/98 border border-white/20 p-7 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl grid grid-cols-12 gap-8">
                            
                            {/* Left Categories List */}
                            <div className="col-span-5 space-y-2 border-r border-white/10 pr-6">
                              <div className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#f6891f] font-bold pb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#f6891f] animate-pulse" />
                                <span>SERVICES DIRECTORY // 05 DISCIPLINES</span>
                              </div>

                              {MENU_DATA.map((cat) => {
                                const isCatSelected = activeCategory === cat.id;
                                return (
                                  <div
                                    key={cat.id}
                                    onMouseEnter={() => setActiveCategory(cat.id)}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border ${
                                      isCatSelected
                                        ? 'bg-white/[0.08] border-[#f6891f]/60 shadow-[0_4px_20px_rgba(246,137,31,0.15)] translate-x-1'
                                        : 'bg-white/[0.01] border-transparent hover:bg-white/[0.04] hover:border-white/10'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <span className={`text-xs font-mono-tech font-bold ${isCatSelected ? 'text-[#f6891f]' : 'text-slate-500'}`}>
                                          {cat.num}
                                        </span>
                                        <span className={`text-sm font-display font-bold tracking-tight ${isCatSelected ? 'text-white' : 'text-slate-300'}`}>
                                          {cat.title}
                                        </span>
                                      </div>
                                      <ChevronRight className={`w-4 h-4 transition-transform ${isCatSelected ? 'text-[#f6891f] translate-x-1' : 'text-slate-600'}`} />
                                    </div>
                                    <p className="text-[11px] font-mono-tech text-slate-400 mt-1 line-clamp-1 pl-6">
                                      {cat.subtitle}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Right Sub-Services Grid */}
                            <div className="col-span-7 flex flex-col justify-between pl-2">
                              <div>
                                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                                  <div>
                                    <span className="text-xs font-mono-tech uppercase tracking-wider text-cyan-400 block font-bold">
                                      {currentCategoryData.submenuHeader}
                                    </span>
                                    <p className="text-xs text-slate-300 font-light mt-1 max-w-lg leading-relaxed">
                                      {currentCategoryData.submenuDesc}
                                    </p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3.5">
                                  {currentCategoryData.submenuItems.map((sub, sIdx) => (
                                    <div
                                      key={sIdx}
                                      onClick={() => handleSubmenuClick(sub.hash)}
                                      className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-cyan-400/50 cursor-pointer transition-all space-y-2 group/item shadow-sm hover:shadow-lg"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2.5">
                                          <div className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 group-hover/item:border-cyan-400/30">
                                            {sub.icon}
                                          </div>
                                          <span className="text-xs font-display font-bold text-white group-hover/item:text-cyan-300 transition-colors">
                                            {sub.title}
                                          </span>
                                        </div>
                                        {sub.badge && (
                                          <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-300 border border-white/10 font-bold">
                                            {sub.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] font-mono-tech text-slate-400 leading-relaxed line-clamp-2">
                                        {sub.tagline}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Footer Action Links inside Menu */}
                              <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-tech">
                                <button
                                  onClick={() => scrollToSection('capabilities')}
                                  className="text-[#f6891f] hover:text-amber-300 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
                                >
                                  <span>View All Services &amp; Disciplines</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={onOpenEstimator}
                                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer font-bold transition-colors"
                                >
                                  <span>Calculate Estimate</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`transition-colors cursor-pointer py-1 relative ${
                      activeSection === item.id
                        ? 'text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#f6891f]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side: High-End CTA Button & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="header-cta-btn"
                onClick={onOpenContact}
                className="px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#f6891f] via-amber-500 to-[#f6891f] text-white font-display font-bold text-[11px] sm:text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-[0_0_25px_rgba(246,137,31,0.4)] transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-lg shadow-[#f6891f]/20 active:scale-95"
              >
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 animate-pulse shrink-0" />
                <span className="hidden xs:inline">START A PROJECT</span>
                <span className="xs:hidden">START</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                id="mobile-nav-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors cursor-pointer shrink-0"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Only on small screens) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-0 z-40 bg-[#06070a]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200"
        >
          <div className="space-y-6">
            <div className="text-xs font-mono-tech uppercase tracking-widest text-[#f6891f] font-bold">
              NAVIGATION DIRECTORY
            </div>
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToSection(item.id);
                  }}
                  className={`text-left text-lg font-display font-bold transition-colors cursor-pointer py-1 ${
                    activeSection === item.id ? 'text-[#f6891f]' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="text-xs font-mono-tech uppercase tracking-widest text-cyan-400 font-bold">
                CORE SERVICES
              </div>
              <div className="grid grid-cols-1 gap-2">
                {MENU_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      scrollToSection('capabilities');
                    }}
                    className="text-left p-3 rounded-xl bg-white/[0.04] text-xs font-mono-tech text-slate-300 hover:text-white flex items-center justify-between"
                  >
                    <span>{cat.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 rounded-full bg-[#f6891f] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>START A PROJECT</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-3.5 rounded-full bg-white/[0.08] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>CALCULATE ESTIMATE</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
