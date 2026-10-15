import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-white/[0.05]">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 origin-left"
      />
    </div>
  );
};
