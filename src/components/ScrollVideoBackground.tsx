import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Film, Play, Pause, Sparkles, Monitor } from 'lucide-react';

interface Scene {
  id: string;
  name: string;
  tag: string;
  section: string;
  videoUrl: string;
  author: string;
  poster: string;
}

const SCENES: Scene[] = [
  {
    id: 'scene-hero',
    name: '01 // WEBSITES & DIGITAL PLATFORMS SHOWCASE',
    tag: 'DESKTOP PLATFORMS & RESPONSIVE UI',
    section: 'hero',
    videoUrl: '/videos/bg-web-platforms.mp4',
    author: 'PureTech Platform Studio',
    poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 'scene-work',
    name: '02 // MOBILE APPS & TOUCH INTERFACES SHOWCASE',
    tag: 'IOS & ANDROID TOUCH GESTURES',
    section: 'work',
    videoUrl: '/videos/fantasy-mobile-app.mp4',
    author: 'PureTech Mobile Studio',
    poster: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 'scene-capabilities',
    name: '03 // CUSTOM SOFTWARE & ENTERPRISE ARCHITECTURE',
    tag: 'SOFTWARE PLATFORMS & SAAS',
    section: 'capabilities',
    videoUrl: '/videos/fantasy-software-build.mp4',
    author: 'PureTech Engineering Lab',
    poster: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 'scene-what-if',
    name: '04 // ENTERPRISE WEB & SALESFORCE ARCHITECTURE',
    tag: 'ENTERPRISE CLOUD ECOSYSTEMS',
    section: 'what-if',
    videoUrl: '/videos/fantasy-web-salesforce.mp4',
    author: 'PureTech Enterprise Labs',
    poster: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80'
  },
  {
    id: 'scene-contact',
    name: '05 // DIGITAL PRODUCT INNOVATIONS MASTER REEL',
    tag: 'AGENCY SHOWCASE FINALE',
    section: 'contact',
    videoUrl: '/videos/fantasy-master-sizzle.mp4',
    author: 'PureTech Innovations Atelier',
    poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80'
  }
];

export const ScrollVideoBackground: React.FC = () => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const { scrollYProgress } = useScroll();

  // Smooth spring physics for scroll-driven parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 28,
    restDelta: 0.001
  });

  // Scale subtly expands and breathes with scroll
  const videoScale = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [1.02, 1.08, 1.04, 1.09, 1.04]);
  // Vertical parallax drift
  const videoY = useTransform(smoothProgress, [0, 1], ['0%', '-3%']);
  
  // Tuned cinematic overlay so website & app details are clearly visible in slow motion
  const overlayDarkness = useTransform(
    smoothProgress,
    [0, 0.2, 0.45, 0.7, 0.9, 1],
    [0.18, 0.28, 0.36, 0.32, 0.38, 0.42]
  );

  // Monitor scroll to switch background video scenes dynamically
  useEffect(() => {
    const handleScrollSceneDetection = () => {
      const docHeight = document.documentElement.scrollHeight;
      const progress = window.scrollY / Math.max(1, docHeight - window.innerHeight);

      if (progress < 0.18) {
        setActiveSceneIndex(0); // Hero: Websites & Platforms
      } else if (progress < 0.38) {
        setActiveSceneIndex(1); // Work: Mobile Apps Showcase
      } else if (progress < 0.62) {
        setActiveSceneIndex(2); // Capabilities: Slow-Mo Interfaces
      } else if (progress < 0.82) {
        setActiveSceneIndex(3); // What If: Enterprise Web Platform
      } else {
        setActiveSceneIndex(4); // Contact & Finale: Master Showcase Reel
      }
    };

    window.addEventListener('scroll', handleScrollSceneDetection, { passive: true });
    handleScrollSceneDetection();
    return () => window.removeEventListener('scroll', handleScrollSceneDetection);
  }, []);

  // Enforce slow, smooth playback rate (0.75x) for luxury cinematic feeling
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video instanceof HTMLVideoElement) {
        video.playbackRate = 0.75; // Smooth slow motion showcase
      }
    });

    const activeScene = SCENES[activeSceneIndex];
    const currentVideo = videoRefs.current[activeScene.id];
    if (currentVideo) {
      currentVideo.playbackRate = 0.75;
      if (isVideoPlaying) {
        currentVideo.play().catch(() => {});
      } else {
        currentVideo.pause();
      }
    }
  }, [activeSceneIndex, isVideoPlaying]);

  const activeScene = SCENES[activeSceneIndex];

  // Fade in background video container only after scrolling past main hero banner
  const containerOpacity = useTransform(smoothProgress, [0, 0.07, 0.15], [0, 0.3, 1]);

  return (
    <div 
      aria-hidden="true" 
      className="fixed inset-0 w-full h-full pointer-events-none -z-20 overflow-hidden bg-[#07080c]"
    >
      {/* Scroll-Driven Video Viewport Container */}
      <motion.div
        style={{
          scale: videoScale,
          y: videoY,
          opacity: containerOpacity
        }}
        className="absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        {SCENES.map((scene, idx) => {
          const isActive = activeSceneIndex === idx;
          return (
            <motion.div
              key={`bg-${scene.id}`}
              initial={false}
              animate={{
                opacity: isActive && isVideoPlaying ? 1 : 0,
                scale: isActive ? 1 : 1.03
              }}
              transition={{
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute inset-0 w-full h-full bg-[#05070f] bg-cover bg-center"
              style={{ backgroundImage: `url(${scene.poster})` }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[scene.id] = el;
                  if (el) {
                    el.defaultMuted = true;
                    el.muted = true;
                    el.playbackRate = 0.75;
                  }
                }}
                onLoadedMetadata={(e) => {
                  const target = e.currentTarget;
                  target.defaultMuted = true;
                  target.muted = true;
                  target.playbackRate = 0.75;
                  if (isVideoPlaying && isActive) {
                    target.play().catch(() => {});
                  }
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={scene.poster}
                className="w-full h-full object-cover filter contrast-[1.06] brightness-[0.98] saturate-[1.12]"
              >
                <source src={scene.videoUrl} type="video/mp4" />
              </video>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Dynamic Scroll-responsive Vignette & Darkness Layer */}
      <motion.div
        style={{ opacity: overlayDarkness }}
        className="absolute inset-0 bg-[#07080c] z-10 pointer-events-none"
      />

      {/* Subtle edge blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07080c]/80 via-transparent to-[#07080c]/80 z-10 pointer-events-none" />
    </div>
  );
};
