import React, { useEffect, useState } from 'react';

interface SectionInfo {
  id: string;
  label: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'about', label: 'Philosophy' },
  { id: 'timeline', label: 'Milestones' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Constellation' },
  { id: 'experience', label: 'Credentials' },
  { id: 'contact', label: 'Connect' },
];

export const ScrollProgressIndicator: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, progress)));

      // Detect active section via scroll offsets
      const sectionElements = SECTIONS.map((sec) => {
        if (sec.id === 'hero') {
          return { id: sec.id, top: 0, bottom: window.innerHeight * 0.8 };
        }
        const el = document.getElementById(sec.id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          id: sec.id,
          top: scrollTop + rect.top,
          bottom: scrollTop + rect.bottom,
        };
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const currentScrollMid = scrollTop + window.innerHeight * 0.35;
      for (const sec of sectionElements) {
        if (currentScrollMid >= sec.top && currentScrollMid <= sec.bottom) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      aria-label="Page scroll progress and section navigator"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none pointer-events-auto"
    >
      {/* Percentage pill */}
      <div
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono liquid-glass text-blue-300 border border-blue-400/30 transition-all duration-300 mb-1 ${
          isHovered || scrollPercent > 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        {Math.round(scrollPercent)}%
      </div>

      {/* Progress track with luminous line */}
      <div className="relative py-2 flex flex-col items-center gap-3 liquid-glass px-1.5 py-3 rounded-full border border-white/10 shadow-lg">
        {/* Continuous scroll line background */}
        <div className="absolute top-3 bottom-3 w-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-b from-blue-400 to-indigo-500 transition-all duration-150 ease-out"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>

        {/* Section Dots */}
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="relative group flex items-center justify-center w-5 h-5 cursor-pointer focus:outline-none"
              aria-label={`Navigate to ${sec.label}`}
            >
              {/* Dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-blue-400 shadow-[0_0_10px_#60a5fa]'
                    : 'w-1.5 h-1.5 bg-white/30 group-hover:bg-white/70 group-hover:scale-125'
                }`}
              />

              {/* Tooltip on hover */}
              <div
                className={`absolute right-7 px-2.5 py-1 rounded-md text-[11px] font-sans-ui whitespace-nowrap pointer-events-none transition-all duration-200 liquid-glass border border-white/15 text-white shadow-xl ${
                  isHovered || isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 pointer-events-none'
                } ${isActive ? 'text-blue-200 border-blue-400/40 font-medium' : 'text-white/60'}`}
              >
                {sec.label}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
