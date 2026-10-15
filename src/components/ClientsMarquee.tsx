import React from 'react';
import { motion } from 'motion/react';
import { useHomepageContent } from './HomepageContentContext';

export const ClientsMarquee: React.FC = () => {
  const { clientLogos: CLIENT_LOGOS } = useHomepageContent();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-12 sm:py-16 bg-[#07080c]/80 backdrop-blur-md border-y border-white/[0.06] overflow-hidden relative z-10 w-full max-w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs uppercase font-mono-tech tracking-[0.2em] text-slate-400">
          ENGINEERING TRUSTED BY FORTUNE 500S, AI PIONEERS & HIGH-GROWTH PLATFORMS
        </p>
      </div>

      <div className="relative w-full max-w-full overflow-hidden">
        {/* Subtle edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#07080c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#07080c] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 sm:gap-16 py-2">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 shrink-0 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-colors group cursor-default"
            >
              <span className="font-display text-base sm:text-xl font-bold tracking-tight text-slate-300 group-hover:text-white transition-colors">
                {client.name}
              </span>
              <span className="text-[10px] font-mono-tech text-slate-400 px-2 py-0.5 rounded bg-white/[0.04] uppercase">
                {client.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
