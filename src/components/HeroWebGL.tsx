import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const HeroWebGL: React.FC<{ vivid?: boolean }> = ({ vivid = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = (canvas.width = canvas.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.clientHeight || window.innerHeight);

    // Mouse coordinates and smooth follower
    const mouse = {
      x: width * 0.7,
      y: height * 0.4,
      targetX: width * 0.7,
      targetY: height * 0.4,
      radius: 180,
      active: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = mouse.targetX >= 0 && mouse.targetX <= width && mouse.targetY >= 0 && mouse.targetY <= height;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = canvas.clientWidth || window.innerWidth;
      height = canvas.height = canvas.clientHeight || window.innerHeight;
      initParticles();
      if (reducedMotion.matches) render();
    };

    window.addEventListener('resize', handleResize);

    // Brand color palette for particles (cyan, warm orange #f6891f, amber, white)
    const colors = [
      'rgba(6, 182, 212, ',   // Cyan #06b6d4
      'rgba(246, 137, 31, ',  // PureTech Orange #f6891f
      'rgba(251, 191, 36, ',  // Amber #fbbf24
      'rgba(255, 255, 255, ', // White
      'rgba(99, 102, 241, '   // Indigo #6366f1
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / (vivid ? 11000 : 14000)), vivid ? 125 : 110);
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * (vivid ? 0.8 : 0.4),
          vy: (Math.random() - 0.5) * (vivid ? 0.8 : 0.4),
          size: Math.random() * 2.2 + 1.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.01
        });
      }
    };

    initParticles();

    let frame = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const render = () => {
      if (!reducedMotion.matches) animId = requestAnimationFrame(render);
      if (!isVisible) return;

      frame++;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient cursor glow spot
      if (mouse.active || frame < 200) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        glow.addColorStop(0, 'rgba(246, 137, 31, 0.09)');
        glow.addColorStop(0.4, 'rgba(6, 182, 212, 0.05)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Gentle floating motion
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction: Elastic deflection / attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 3;
          const angle = Math.atan2(dy, dx);
          // Push gently away from mouse
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }

        // Draw connections between neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

          const connectionRadius = vivid ? 165 : 130;
          if (cdist < connectionRadius) {
            const lineAlpha = (1 - cdist / connectionRadius) * (vivid ? 0.23 : 0.16);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw connection to mouse if within range
        if (mouse.active && dist < mouse.radius * 1.1) {
          const mouseLineAlpha = (1 - dist / (mouse.radius * 1.1)) * 0.28;
          ctx.strokeStyle = `rgba(246, 137, 31, ${mouseLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw glowing particle node
        const currentAlpha = p.alpha + Math.sin(frame * p.pulseSpeed) * 0.15;
        ctx.fillStyle = `${p.color}${Math.max(0.1, currentAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft glow for larger particles
        if (p.size > 2) {
          ctx.fillStyle = `${p.color}${Math.max(0.04, currentAlpha * 0.25)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    render();
    const handleMotionChange = () => {
      cancelAnimationFrame(animId);
      render();
    };
    reducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      reducedMotion.removeEventListener('change', handleMotionChange);
      observer.disconnect();
    };
  }, [vivid]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.85 }}
    />
  );
};
