import React, { useEffect, useRef, useState } from 'react';
import { YouTubeBackground } from './YouTubeBackground';

interface VideoBackgroundProps {
  src?: string;
  youtubeId?: string;
  poster?: string;
  overlayOpacity?: number;
  className?: string;
  speed?: number;
  blur?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  youtubeId,
  poster,
  overlayOpacity = 0.65,
  className = '',
  speed = 1,
  blur = false
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted in some browsers
      });
    }
  }, [speed, src]);

  // Procedural futuristic particle canvas fallback
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gradient wash
      const grad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 100,
        height * 0.4 + Math.cos(time * 0.8) * 80,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.7
      );
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.04)');
      grad.addColorStop(1, 'rgba(8, 9, 13, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle connecting lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(125, 211, 252, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Fallback procedural canvas always running subtly */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover -z-30 opacity-80"
      />

      {/* YouTube Stock Video Stream if youtubeId is present */}
      {youtubeId ? (
        <YouTubeBackground
          youtubeId={youtubeId}
          overlayOpacity={overlayOpacity}
          blur={blur}
        />
      ) : (
        <>
          {/* HTML5 Video Element */}
          {src && !videoError && (
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              poster={poster}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className={`absolute inset-0 w-full h-full object-cover -z-20 transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              } ${blur ? 'filter blur-sm scale-105' : ''}`}
            >
              <source src={src} type="video/mp4" />
            </video>
          )}

          {/* Poster fallback if video fails */}
          {poster && (videoError || !videoLoaded) && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center -z-20 filter brightness-60"
              style={{ backgroundImage: `url(${poster})` }}
            />
          )}

          {/* Fantasy.co signature dark vignette and film grain overlay */}
          <div
            className="absolute inset-0 bg-[#08090d] -z-10"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-[#08090d]/60 -z-10" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#08090d]/30 to-[#08090d]/90 -z-10" />
        </>
      )}
    </div>
  );
};
