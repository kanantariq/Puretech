import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'play' | 'text'>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics for smooth follower ring
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 28, mass: 0.2 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 28, mass: 0.2 });

  // Spring physics for inner precision dot
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.05 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.05 });

  const activeMagneticTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Detect mobile or touch device to avoid rendering cursor on mobile / tablet
    const checkIsTouchOrMobile = () => {
      const isMobileTouch = (
        typeof window !== 'undefined' && (
          window.innerWidth < 1024 ||
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches
        )
      );
      setIsTouchDevice(isMobileTouch);
      return isMobileTouch;
    };

    if (checkIsTouchOrMobile()) {
      const handleResize = () => {
        checkIsTouchOrMobile();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Find if we are hovering over an interactive or magnetic element
      const interactiveEl = target?.closest(
        'button, a, input, textarea, select, [role="button"], [data-cursor], [data-magnetic], .cursor-pointer'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);

        // Check custom cursor intent
        const customCursorAttr = interactiveEl.getAttribute('data-cursor');
        if (customCursorAttr === 'view' || interactiveEl.id?.includes('project-card')) {
          setCursorType('view');
          setCursorText('VIEW');
        } else if (customCursorAttr === 'play' || interactiveEl.id?.includes('reel') || interactiveEl.id?.includes('play')) {
          setCursorType('play');
          setCursorText('PLAY');
        } else if (interactiveEl.tagName === 'INPUT' || interactiveEl.tagName === 'TEXTAREA') {
          setCursorType('text');
          setCursorText('');
        } else {
          setCursorType('pointer');
          setCursorText('');
        }

        // Magnetic Pull calculation: attract cursor smoothly toward center of smaller buttons
        const isMagnetic = interactiveEl.hasAttribute('data-magnetic') || 
          interactiveEl.tagName === 'BUTTON' || 
          interactiveEl.tagName === 'A';

        if (isMagnetic) {
          activeMagneticTargetRef.current = interactiveEl;
          const rect = interactiveEl.getBoundingClientRect();
          // Only apply strong magnetic attraction to buttons of reasonable size (<260px)
          if (rect.width < 280 && rect.height < 120) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            // Magnetic pull interpolation (35% snap towards center)
            targetX = e.clientX - distanceX * 0.35;
            targetY = e.clientY - distanceY * 0.35;
          }
        } else {
          activeMagneticTargetRef.current = null;
        }
      } else {
        setIsHovered(false);
        setCursorType('default');
        setCursorText('');
        activeMagneticTargetRef.current = null;
      }

      mouseX.set(targetX);
      mouseY.set(targetY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice) return null;

  // Determine size & styling based on cursorType and interaction state
  let ringSize = 34;
  let ringBorder = 'border-cyan-400/50 bg-cyan-400/[0.04]';
  let showDot = true;

  if (cursorType === 'view' || cursorType === 'play') {
    ringSize = 72;
    ringBorder = 'border-cyan-400 bg-cyan-950/80 backdrop-blur-md shadow-lg shadow-cyan-500/20';
    showDot = false;
  } else if (cursorType === 'pointer') {
    ringSize = 52;
    ringBorder = 'border-cyan-400/80 bg-cyan-400/10 backdrop-blur-[2px]';
    showDot = true;
  } else if (cursorType === 'text') {
    ringSize = 24;
    ringBorder = 'border-white/60 bg-white/5';
    showDot = false;
  }

  const scaleMultiplier = isClicking ? 0.82 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden lg:block"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      {/* Outer Magnetic Follower Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          scale: scaleMultiplier,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        className={`fixed top-0 left-0 rounded-full border flex items-center justify-center transition-colors duration-200 will-change-transform ${ringBorder}`}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-cyan-300"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      {showDot && (
        <motion.div
          style={{
            x: dotX,
            y: dotY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: isHovered ? 1.5 : 1,
            backgroundColor: isHovered ? '#22d3ee' : '#38bdf8',
          }}
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 30,
          }}
          className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)] will-change-transform"
        />
      )}
    </div>
  );
};
