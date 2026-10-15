import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Sparkles, Monitor } from 'lucide-react';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playerMode, setPlayerMode] = useState<'stream' | 'native'>('native');

  const chapters = [
    {
      title: 'Website Design Showcase Promo Video',
      shortLabel: 'Web Showcase',
      subtitle: '3D Isometric Web Mockups, Dark Mode Portfolios & Responsive UI',
      category: 'CUSTOM WEBSITE DEV',
      author: 'Indra Ibrahim',
      youtubeId: 'Fg5HYn5bkm8',
      refUrl: 'https://www.youtube.com/watch?v=Fg5HYn5bkm8',
      videoUrl: '/videos/hero-bg.mp4'
    },
    {
      title: 'Product Demo Video | SaaS Explainer (Infinity)',
      shortLabel: 'SaaS Explainer',
      subtitle: 'Modern Cloud Dashboards, Workflow Automations & Metrics',
      category: 'SOFTWARE ENGINEERING',
      author: 'What a Story - SaaS & AI',
      youtubeId: 'ZK-rNEhJIDs',
      refUrl: 'https://www.youtube.com/watch?v=ZK-rNEhJIDs',
      videoUrl: '/videos/capabilities-bg.mp4'
    },
    {
      title: 'Mobile App Development Promo Video',
      shortLabel: 'Mobile App Promo',
      subtitle: '3D Floating Smartphones, Gestures & High-Performance UI',
      category: 'MOBILE APP DEVELOPMENT',
      author: 'Indra Ibrahim',
      youtubeId: 'J4xNhYeaGkI',
      refUrl: 'https://www.youtube.com/watch?v=J4xNhYeaGkI',
      videoUrl: '/videos/work-bg.mp4'
    },
    {
      title: 'PureTech Master Innovations Showreel',
      shortLabel: 'Master Showreel',
      subtitle: 'Full-Spectrum Digital Product Atelier & Engineering Leadership',
      category: 'DIGITAL INNOVATION',
      author: 'PureTech Innovations Studio',
      youtubeId: 'Fg5HYn5bkm8',
      refUrl: 'https://www.youtube.com/watch?v=Fg5HYn5bkm8',
      videoUrl: '/videos/hero-onesided-reel.mp4'
    }
  ];

  const currentChapter = chapters[activeChapter];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Construct embed URL with dynamic mute and autoplay parameters
  const ytEmbedUrl = `https://www.youtube-nocookie.com/embed/${currentChapter.youtubeId}?autoplay=1&mute=${
    isMuted ? '1' : '0'
  }&controls=1&loop=1&playlist=${currentChapter.youtubeId}&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;

  return (
    <div
      id="fantasy-reel-modal"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-3 sm:p-6 lg:p-8 animate-in fade-in duration-300 select-none"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-xs sm:text-sm font-mono-tech tracking-widest text-white uppercase font-bold">
              PURETECH 4K SHOWCASE THEATER
            </span>
            <span className="hidden sm:inline text-slate-600">·</span>
            <span className="text-[10px] sm:text-xs font-mono-tech text-cyan-400">
              {currentChapter.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct Link to Reference Video */}
          <a
            href={currentChapter.refUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono-tech transition-colors cursor-pointer"
            title="Open original video reference on YouTube"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Open on YouTube</span>
          </a>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Showreel Theater"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main High-Definition Video Viewport */}
      <div className="relative w-full max-w-7xl mx-auto aspect-video max-h-[75vh] rounded-2xl overflow-hidden border border-white/20 bg-[#06070a] shadow-2xl flex items-center justify-center my-auto">
        {playerMode === 'stream' ? (
          <iframe
            key={`reel-yt-${currentChapter.youtubeId}-${isMuted ? 'muted' : 'unmuted'}`}
            src={ytEmbedUrl}
            title={currentChapter.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            key={`reel-native-${currentChapter.videoUrl}`}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
          >
            <source src={currentChapter.videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Chapter Overlay Badge (Top Left) */}
        <div className="absolute top-4 left-4 pointer-events-none z-10 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 max-w-md hidden sm:block">
          <div className="text-[10px] font-mono-tech text-cyan-400 uppercase tracking-widest">
            CHAPTER 0{activeChapter + 1} // {currentChapter.category}
          </div>
          <div className="text-sm font-display font-bold text-white tracking-tight line-clamp-1">
            {currentChapter.title}
          </div>
          <div className="text-[10px] text-slate-400">
            Source: {currentChapter.author}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Controls & Chapter Navigation */}
      <div className="w-full max-w-7xl mx-auto space-y-3 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tech text-slate-300">
          {/* Quick Player Options */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  <span>UNMUTE AUDIO</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>MUTE AUDIO</span>
                </>
              )}
            </button>

            {/* Stream vs Native Switch */}
            <button
              onClick={() => setPlayerMode(playerMode === 'stream' ? 'native' : 'stream')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-cyan-300 cursor-pointer transition-colors"
            >
              {playerMode === 'stream' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>4K STOCK STREAM</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-slate-400" />
                  <span>NATIVE MP4</span>
                </>
              )}
            </button>
          </div>

          {/* Chapters Jump Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-tech whitespace-nowrap transition-all cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-400/25'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                0{idx + 1} {ch.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
