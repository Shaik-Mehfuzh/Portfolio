import React, { useRef, useEffect, useState } from 'react';
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Award,
  CheckCircle,
  ExternalLink,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';
import { TIMELINE, PERSONAL_INFO } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';

export const ExperienceSection: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setMouseOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 18,
          y: (e.clientY / window.innerHeight - 0.5) * 18,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(10, 16, 32, 0.96) 0%, rgba(24, 14, 38, 0.94) 50%, rgba(12, 8, 26, 0.96) 100%)',
      }}
    >
      {/* Volumetric Aurora Spheres */}
      <div
        className="absolute top-1/4 right-1/4 w-[650px] h-[650px] bg-rose-600/15 blur-[170px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-amber-500/15 blur-[170px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Editorial Credentials &amp; Experience</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal mb-4">
            Verified <span className="italic text-rose-300">Distinctions.</span>
          </h2>
          <p className="font-sans-ui text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Horizontally layered credential panels distinguishing academic distinctions, industrial internship deliverables,
            and hackathon engineering.
          </p>
        </div>

        {/* Editorial Layered Cards with 3D Physics */}
        <div className="space-y-8">
          {TIMELINE.map((item, index) => {
            const isEducation = item.type === 'education';
            const isInternship = item.type === 'internship';
            const isHackathon = item.type === 'hackathon';

            return (
              <Interactive3DCard
                key={item.id}
                depth={28}
                maxTilt={10}
                dataCursorLabel="EXPLORE"
                className="rounded-3xl"
              >
                <div
                  className={`rounded-3xl p-8 sm:p-10 border transition-all duration-300 group shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(251,146,60,0.12)] ${
                    isEducation
                      ? 'liquid-glass-twilight border-rose-500/25 hover:border-rose-400/50'
                      : isInternship
                      ? 'liquid-glass-sunset border-amber-500/25 hover:border-amber-400/50'
                      : isHackathon
                      ? 'liquid-glass-alpine border-sky-500/25 hover:border-sky-400/50'
                      : 'liquid-glass-twilight border-purple-500/25 hover:border-purple-400/50'
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Metadata & Organization (4 cols) */}
                    <div className="lg:col-span-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-white/90">
                          {item.year}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-sans-ui border ${
                            isInternship
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : isEducation
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                              : isHackathon
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {item.typeLabel}
                        </span>
                      </div>

                      <h3 className="font-serif-display text-2xl sm:text-3xl text-white font-normal mb-2 group-hover:text-amber-200 transition-colors">
                        {item.title}
                      </h3>

                      <div className="text-sm font-sans-ui text-amber-300 font-medium mb-3">
                        {item.organization}
                      </div>

                      {item.location && (
                        <div className="text-xs text-white/50 font-sans-ui flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-white/40" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Achievements & Tags (8 cols) */}
                    <div className="lg:col-span-8">
                      <p className="text-sm sm:text-base text-white/85 font-sans-ui leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        {item.keyPoints.map((point, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-white/75 font-sans-ui"
                          >
                            <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 text-white/70 border border-white/5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Interactive3DCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
