import React, { useState } from 'react';

interface YouTubeBackgroundProps {
  youtubeId: string;
  title?: string;
  className?: string;
  overlayOpacity?: number;
  showOverlay?: boolean;
  blur?: boolean;
  startSeconds?: number;
}

export const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({
  youtubeId,
  title = 'Background Showcase Video',
  className = '',
  overlayOpacity = 0.55,
  showOverlay = true,
  blur = false,
  startSeconds = 0
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Construct privacy-enhanced clean embed URL with infinite loop & muted autoplay
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1${
    startSeconds > 0 ? `&start=${startSeconds}` : ''
  }`;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Scaled YouTube iFrame to completely hide borders and YouTube chrome */}
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        onLoad={() => setIsLoaded(true)}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] min-w-[177.77vh] min-h-[56.25vw] pointer-events-none transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${blur ? 'filter blur-sm scale-110' : 'filter contrast-[1.08] brightness-[0.92] saturate-[1.12]'}`}
      />

      {/* Signature Fantasy.co Dark Vignette & Cinema Grading Overlay */}
      {showOverlay && (
        <>
          <div
            className="absolute inset-0 bg-[#08090d] pointer-events-none transition-opacity duration-500"
            style={{ opacity: overlayOpacity }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090d] via-transparent to-[#08090d]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#08090d]/25 to-[#08090d]/85 pointer-events-none" />
        </>
      )}
    </div>
  );
};
