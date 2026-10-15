import { ArrowUpRight } from 'lucide-react';
import { LANDING_PAGES } from '../data/landingPages';

export function LandingDirectory({ compact = false }: { compact?: boolean }) {
  return (
    <section id="solutions" aria-label="Explore our development solutions" className={`relative z-20 border-t border-white/10 bg-[#08090d] text-slate-100 ${compact ? 'py-16' : 'py-24 sm:py-32'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#f6891f]">Explore / Development solutions</p>
        <div className="mt-4 mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl font-display font-semibold max-w-xl">Different ambitions.<br /><span className="text-slate-400">A purposeful approach.</span></h2>
          <p className="max-w-sm text-sm leading-7 text-slate-400">Explore our approach to your technology, your industry, and the next chapter of your business.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {LANDING_PAGES.map((page, index) => (
            <a key={page.slug} href={`/${page.slug}`} className="group bg-[#0c0e14] hover:bg-[#151923] p-7 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f6891f] focus-visible:-outline-offset-4">
              <div className="flex justify-between items-center mb-8"><span className="font-mono-tech text-xs text-slate-500">0{index + 1} / {page.category}</span><ArrowUpRight size={20} className="text-[#f6891f] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
              <h3 className="font-display text-xl font-medium">{page.shortTitle}</h3>
              <p className="text-sm text-slate-400 mt-3 leading-6">{page.headline}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
