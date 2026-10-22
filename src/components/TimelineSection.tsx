import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  Zap,
  CheckCircle,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { TIMELINE, PERSONAL_INFO } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';

export const TimelineSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;
      const progress = Math.min(1, Math.max(0, currentDist / totalDist));
      setScrollProgress(progress);

      const step = Math.min(3, Math.floor(progress * 4.2));
      setActiveStep(step);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setMouseOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(18, 10, 36, 0.96) 0%, rgba(28, 14, 40, 0.94) 45%, rgba(12, 18, 38, 0.96) 100%)',
      }}
    >
      {/* Cinematic Golden Mist Backdrop (from user image reference rds_4e65f451.jpg) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20 mix-blend-screen">
        <img
          src="/assets/aistudio/rds_4e65f451.jpg"
          alt=""
          className="w-full h-full object-cover scale-110 filter blur-[2px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.5}px, ${-scrollProgress * 40}px, 0) scale(1.15)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120a24] via-transparent to-[#0c1226]" />
      </div>

      {/* Volumetric Sunset & Mist Auroras */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-amber-600/15 blur-[180px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-rose-600/15 blur-[180px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Dimensional Journey &amp; Milestones</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.08] mb-6">
            The Luminous <span className="italic text-amber-300">Trajectory.</span>
          </h2>
          <p className="font-sans-ui text-white/80 text-sm sm:text-base leading-relaxed font-light">
            A spatial progression of academic excellence, hands-on machine learning engineering,
            hackathons, and specialized AI credentials.
          </p>
        </div>

        {/* Milestone Steps with distinct choreography per milestone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          {/* Left Column: Interactive Milestone Navigation Path (4 Cols) */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            <Interactive3DCard depth={25} maxTilt={10} className="rounded-3xl">
              <div className="liquid-glass-sunset rounded-3xl p-7 border border-amber-500/25 shadow-xl">
                <div className="text-xs font-mono uppercase text-amber-300 tracking-wider mb-5 flex items-center justify-between">
                  <span>Milestone Navigator</span>
                  <span className="text-white/40 font-mono">0{activeStep + 1} / 04</span>
                </div>

                {/* Step pills */}
                <div className="space-y-2.5 font-sans-ui">
                  {TIMELINE.map((item, index) => {
                    const isCurrent = activeStep === index;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveStep(index);
                          const cardEl = document.getElementById(`milestone-card-${index}`);
                          if (cardEl) cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                          isCurrent
                            ? 'bg-amber-500/20 border-amber-400/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                            : 'bg-white/[0.03] border-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCurrent ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b]' : 'bg-white/20'
                            }`}
                          />
                          <span className="text-xs font-medium truncate max-w-[190px]">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/40">{item.year}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Progress gauge */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="flex justify-between text-[11px] text-white/60 mb-2 font-mono">
                    <span>Trajectory Progress</span>
                    <span className="text-amber-300 font-semibold">
                      {Math.round(scrollProgress * 100)}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-sky-400 transition-all duration-200 shadow-[0_0_10px_#f59e0b]"
                      style={{ width: `${scrollProgress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Interactive3DCard>
          </div>

          {/* Right Column: Dimensional Milestones Cards with Custom Choreography (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">
            {TIMELINE.map((item, index) => {
              const isEducation = item.type === 'education';
              const isInternship = item.type === 'internship';
              const isHackathon = item.type === 'hackathon';
              const isCert = item.type === 'certification';
              const isCurrent = activeStep === index;

              return (
                <div key={item.id} id={`milestone-card-${index}`}>
                  <Interactive3DCard
                    depth={40}
                    maxTilt={14}
                    dataCursorLabel="EXPLORE"
                    className="rounded-3xl"
                  >
                    <div
                      className={`relative rounded-3xl p-8 sm:p-10 transition-all duration-500 preserve-3d border ${
                        isEducation
                          ? 'liquid-glass-twilight border-rose-500/30'
                          : isInternship
                          ? 'liquid-glass-sunset border-amber-500/30'
                          : isHackathon
                          ? 'liquid-glass-alpine border-sky-500/30'
                          : 'liquid-glass-twilight border-purple-500/30'
                      } ${
                        isCurrent
                          ? 'shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(251,146,60,0.2)]'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      {/* Visual Effect A: Education -> Luminous particle beam header */}
                      {isEducation && (
                        <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
                              <GraduationCap className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-mono uppercase tracking-wider text-rose-300">
                                Academic Foundation · CBIT Proddatur
                              </span>
                              <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right hidden sm:block">
                            <span className="text-2xl font-mono font-bold text-amber-400">
                              {PERSONAL_INFO.cgpa}
                            </span>
                            <div className="text-[10px] text-white/50 font-sans-ui">Academic CGPA</div>
                          </div>
                        </div>
                      )}

                      {/* Visual Effect B: Internship -> Dimensional Rotated spring panel header */}
                      {isInternship && (
                        <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                                Applied Industry Experience
                              </span>
                              <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right hidden sm:block">
                            <span className="text-sm font-mono font-semibold text-amber-300">
                              {item.organization}
                            </span>
                            <div className="text-[10px] text-emerald-400 font-sans-ui">
                              Verified Internship
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual Effect C: Hackathons -> Connected network header */}
                      {isHackathon && (
                        <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                              <Zap className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-mono uppercase tracking-wider text-sky-300">
                                National Technical Sprints
                              </span>
                              <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right hidden sm:block">
                            <span className="text-sm font-mono font-semibold text-sky-300">
                              Operix AI
                            </span>
                            <div className="text-[10px] text-white/50 font-sans-ui">
                              Industrial Prototype
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Visual Effect D: Certifications -> Deep credential alignment header */}
                      {isCert && (
                        <div className="mb-6 pb-6 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                              <Award className="w-6 h-6" />
                            </div>
                            <div>
                              <span className="text-xs font-mono uppercase tracking-wider text-purple-300">
                                Verified Continuous Learning
                              </span>
                              <h3 className="font-serif-display text-2xl sm:text-3xl text-white">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right hidden sm:block">
                            <span className="text-sm font-mono font-semibold text-purple-300">
                              NPTEL &amp; Google
                            </span>
                            <div className="text-[10px] text-white/50 font-sans-ui">
                              Coursework Credentials
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Body Content */}
                      <p className="text-sm sm:text-base text-white/85 font-sans-ui leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Bullet achievements */}
                      <div className="space-y-3 mb-8">
                        {item.keyPoints.map((pt, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 text-xs sm:text-sm text-white/75 font-sans-ui"
                          >
                            <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tags & Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full bg-white/5 text-[11px] font-mono text-white/80 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="text-xs font-mono text-white/50">{item.year}</span>
                      </div>
                    </div>
                  </Interactive3DCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
