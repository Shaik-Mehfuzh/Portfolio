import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

interface AsteroidScrollIndicatorProps {
  onNextSection?: () => void;
}

export const AsteroidScrollIndicator: React.FC<AsteroidScrollIndicatorProps> = ({ onNextSection }) => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let flashTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const clamped = Math.min(100, Math.max(0, progress));
      setScrollPercent(clamped);

      // Trigger a brief tasteful shimmer/flash when scrolling actively
      if (Math.abs(scrollTop - lastScrollY) > 8) {
        setIsFlashing(true);
        clearTimeout(flashTimeout);
        flashTimeout = setTimeout(() => setIsFlashing(false), 350);
      }
      lastScrollY = scrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(flashTimeout);
    };
  }, []);

  const handleClick = () => {
    if (onNextSection) {
      onNextSection();
      return;
    }
    // Scroll down by 80% of window height or to next section
    const currentScroll = window.scrollY;
    const sections = ['hero', 'about', 'timeline', 'projects', 'skills', 'experience', 'contact'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (top > currentScroll + 50) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Asteroid scroll progress indicator"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-label="SCROLL"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center select-none cursor-pointer group"
    >
      {/* Percentage or Label tooltip */}
      <div
        className={`text-[9px] font-mono tracking-widest text-amber-200/90 mb-2 transition-all duration-300 uppercase px-1.5 py-0.5 rounded liquid-glass border border-amber-400/20 ${
          isHovered || scrollPercent > 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {Math.round(scrollPercent)}%
      </div>

      {/* Slim vertical track matching sunset palette (Pink, Orange, Purple) */}
      <div className="relative w-7 h-64 flex items-center justify-center">
        {/* Background track line */}
        <div className="absolute top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-white/10 via-amber-400/20 to-purple-400/15 rounded-full" />

        {/* Lit progress trail from top to current asteroid position */}
        <div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-rose-400 via-amber-300 to-amber-200 rounded-full transition-all duration-75"
          style={{ height: `${scrollPercent}%` }}
        />

        {/* Animated Asteroid / Shooting Star Particle */}
        <div
          className="absolute left-1/2 -translate-x-1/2 transition-all duration-100 ease-out pointer-events-none"
          style={{
            top: `${scrollPercent}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Light Trail (Pink-Orange-Purple Tail pointing upwards) */}
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 w-3 rounded-full pointer-events-none transition-all duration-200 ${
              isFlashing
                ? 'h-10 bg-gradient-to-t from-amber-300 via-rose-400 to-transparent opacity-85'
                : 'h-6 bg-gradient-to-t from-amber-200 via-rose-400/60 to-transparent opacity-50'
            }`}
          />

          {/* Glowing Asteroid Outer Halo */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFlashing
                ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 shadow-[0_0_18px_#f59e0b,0_0_28px_#f43f5e] scale-125'
                : 'bg-gradient-to-r from-amber-400/70 via-rose-500/70 to-purple-500/60 shadow-[0_0_12px_#fb923c] scale-100 group-hover:scale-115'
            }`}
          >
            {/* Bright Celestial Core */}
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          </div>

          {/* Initial Sparkle / Pulse ring */}
          {scrollPercent <= 2 && (
            <div className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-60 pointer-events-none" />
          )}
        </div>
      </div>

      {/* Small "SCROLL TO EXPLORE" hint */}
      <div className="mt-3 flex flex-col items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
        <ArrowDown className="w-3 h-3 text-amber-300 animate-bounce" />
        <span
          className="text-[8px] font-mono tracking-widest uppercase text-amber-200/80 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl' }}
        >
          EXPLORE
        </span>
      </div>
    </aside>
  );
};
