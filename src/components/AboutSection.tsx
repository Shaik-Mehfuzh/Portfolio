import React, { useEffect, useState, useRef } from 'react';
import {
  Brain,
  Cpu,
  Database,
  Eye,
  GraduationCap,
  Award,
  Compass,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';

export const AboutSection: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollY(window.innerHeight - rect.top);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setMouseOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 24,
          y: (e.clientY / window.innerHeight - 0.5) * 24,
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.08;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(14, 8, 28, 0.95) 0%, rgba(26, 14, 46, 0.92) 50%, rgba(18, 10, 36, 0.95) 100%)',
      }}
    >
      {/* Cinematic Twilight Atmosphere Backdrop (From User Image Reference) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25 mix-blend-screen">
        <img
          src="/assets/aistudio/imm_0bfa7d54.jpg"
          alt=""
          className="w-full h-full object-cover scale-110 filter blur-sm transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.4}px, ${-parallaxOffset * 0.5}px, 0) scale(1.12)`,
          }}
        />
        {/* Soft dusk-rose & amber atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0717] via-transparent to-[#0e0a22]" />
      </div>

      {/* Volumetric Sunset & Twilight Aurora Spheres */}
      <div
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-rose-600/15 blur-[160px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-1/4 -right-20 w-[650px] h-[650px] bg-amber-500/15 blur-[170px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      {/* Oversized Parallax Background Typography */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-[0.045] whitespace-nowrap font-serif-display font-light text-[12vw] tracking-tighter transition-transform duration-100 ease-out text-rose-200"
        style={{
          transform: `translate3d(-50%, ${parallaxOffset}px, 0)`,
        }}
        aria-hidden="true"
      >
        INTELLIGENCE · CODE · HORIZON
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading with Line-by-Line Masked Reveal */}
        <div className="max-w-4xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Philosophy &amp; Cognitive Architecture</span>
          </div>

          <div className="clip-reveal-container">
            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.04] tracking-tight">
              Curiosity Into <span className="italic font-light text-rose-300">Code.</span>
            </h2>
          </div>
          <div className="clip-reveal-container mb-8">
            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.04] tracking-tight">
              Ideas Into <span className="italic text-amber-300 font-light">Impact.</span>
            </h2>
          </div>

          <p className="font-sans-ui text-white/85 text-base sm:text-xl leading-relaxed max-w-2xl font-light">
            I am a Computer Science &amp; Engineering undergraduate specializing in Artificial Intelligence
            and Machine Learning at Chaitanya Bharathi Institute of Technology (CBIT). I treat machine learning
            not as an abstract novelty, but as a discipline of understanding empirical distributions, minimizing
            operational error, and creating software that humans can trust.
          </p>
        </div>

        {/* 3 Pillars / Interactive 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-20">
          <Interactive3DCard
            depth={35}
            maxTilt={16}
            dataCursorLabel="EXPLORE"
            className="rounded-3xl"
          >
            <div className="liquid-glass-sunset p-8 rounded-3xl border border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-6 border border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mb-3">
                  Machine Learning &amp; Math
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-white/75 leading-relaxed">
                  Grounding predictive algorithms in statistical validation, feature importance, and cross-validation.
                  Experienced in Scikit-learn, ensemble trees, classification metrics, and feature selection.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-amber-400/20 text-[11px] font-mono text-amber-300 flex items-center justify-between">
                <span>Supervised Predictive Pipelines</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard
            depth={35}
            maxTilt={16}
            dataCursorLabel="EXPLORE"
            className="rounded-3xl"
          >
            <div className="liquid-glass-twilight p-8 rounded-3xl border border-rose-500/20 hover:border-rose-400/50 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-6 border border-rose-400/40 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mb-3">
                  Computer Vision &amp; Edge
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-white/75 leading-relaxed">
                  Translating real-time pixel streams into actionable geometry. Working with OpenCV, facial embeddings,
                  lighting normalization, and anti-proxy verification pipelines with low frame latency.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-rose-400/20 text-[11px] font-mono text-rose-300 flex items-center justify-between">
                <span>128-D Euclidean Vector Matching</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Interactive3DCard>

          <Interactive3DCard
            depth={35}
            maxTilt={16}
            dataCursorLabel="EXPLORE"
            className="rounded-3xl"
          >
            <div className="liquid-glass-alpine p-8 rounded-3xl border border-sky-500/20 hover:border-sky-400/50 transition-all duration-300 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center mb-6 border border-sky-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mb-3">
                  Data Analytics &amp; Visuals
                </h3>
                <p className="font-sans-ui text-xs sm:text-sm text-white/75 leading-relaxed">
                  Turning opaque manufacturing and sensor logs into transparent business decisions using Tableau,
                  Python data wrangling (Pandas/NumPy), Pareto distributions, and statistical process control.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-sky-400/20 text-[11px] font-mono text-sky-300 flex items-center justify-between">
                <span>Industrial OEE &amp; Downtime Insights</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Interactive3DCard>
        </div>

        {/* Academic Card & Core Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Academic Snapshot (5 cols) */}
          <div className="lg:col-span-5">
            <Interactive3DCard depth={30} maxTilt={12} className="h-full rounded-3xl">
              <div className="liquid-glass-twilight rounded-3xl p-8 sm:p-9 border border-rose-500/20 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-300 uppercase tracking-wider mb-4">
                    <GraduationCap className="w-4 h-4" />
                    <span>Academic Distinction</span>
                  </div>
                  <h3 className="font-serif-display text-3xl sm:text-4xl text-white mb-1">
                    Chaitanya Bharathi Institute of Technology
                  </h3>
                  <p className="text-xs text-white/60 font-sans-ui mb-6">
                    Proddatur, Andhra Pradesh · B.Tech CSE (AI &amp; ML) · Third Year
                  </p>

                  <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 mb-6 shadow-inner">
                    <div className="text-xs text-amber-200/80 font-sans-ui">Cumulative Grade Point Average</div>
                    <div className="text-4xl sm:text-5xl font-mono font-bold text-white mt-1 flex items-baseline gap-2">
                      <span className="text-amber-400">{PERSONAL_INFO.cgpa}</span>
                      <span className="text-xs text-white/40 font-sans-ui font-normal">(Top Tier)</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-white/80 font-sans-ui">
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-400 mt-0.5">✦</span>
                      <span>Specialized focus in Artificial Intelligence &amp; Machine Learning curricula.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-400 mt-0.5">✦</span>
                      <span>Hands-on implementations in algorithms, computer vision, and predictive models.</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-rose-400 mt-0.5">✦</span>
                      <span>Collaborative innovation in Smart India Hackathon &amp; MSME technical sprints.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
                  <span>Class of 2026 / 2027</span>
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                    Verified Student
                  </span>
                </div>
              </div>
            </Interactive3DCard>
          </div>

          {/* Guiding Principles (7 cols) */}
          <div className="lg:col-span-7">
            <Interactive3DCard depth={30} maxTilt={12} className="h-full rounded-3xl">
              <div className="liquid-glass-sunset rounded-3xl p-8 sm:p-9 border border-amber-500/20 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-4">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Engineering Principles</span>
                  </div>
                  <h3 className="font-serif-display text-3xl sm:text-4xl text-white mb-6">
                    How I Think About Technology
                  </h3>

                  <div className="space-y-4 font-sans-ui">
                    {PERSONAL_INFO.coreValues.map((val, idx) => (
                      <div
                        key={val.title}
                        className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-400/30 transition-all"
                      >
                        <div className="flex items-center gap-2 font-medium text-white text-sm sm:text-base mb-1.5">
                          <span className="font-mono text-xs text-amber-400">0{idx + 1}.</span>
                          <span>{val.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/60 font-sans-ui">
                  <span>Open to collaboration with engineering teams and AI labs.</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-300 hover:text-white transition-colors underline underline-offset-4 font-medium"
                  >
                    Connect on LinkedIn →
                  </a>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </div>

        {/* Animated Filament Line Leading to Timeline */}
        <div className="flex flex-col items-center justify-center pt-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-rose-300/60 mb-3 flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Traverse into the Timeline</span>
          </div>
          <svg width="2" height="60" viewBox="0 0 2 60" className="overflow-visible">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="60"
              stroke="url(#filament-gradient-sunset)"
              strokeWidth="2"
              className="animate-dash-pulse"
            />
            <defs>
              <linearGradient id="filament-gradient-sunset" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#fb923c" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
