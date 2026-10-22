import React, { useState, useEffect, useRef } from 'react';
import { Layers, Network, CheckCircle, ArrowRight, Sparkles, Terminal, Code2, Brain } from 'lucide-react';
import { SKILLS, PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { SkillItem } from '../types/portfolio';
import { Interactive3DCard } from './Interactive3DCard';

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(SKILLS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setMouseOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    'All',
    'AI & Machine Learning',
    'Computer Vision',
    'Data Analytics & Visualization',
    'Programming Languages',
    'Software Engineering',
    'Generative AI & Tools',
  ];

  const filteredSkills =
    activeCategory === 'All' ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  const relatedProjectData = selectedSkill.relatedProject
    ? PROJECTS.find((p) => p.id === selectedSkill.relatedProject)
    : null;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(14, 8, 30, 0.96) 0%, rgba(26, 12, 44, 0.94) 50%, rgba(10, 16, 32, 0.96) 100%)',
      }}
    >
      {/* Volumetric Aurora Spheres */}
      <div
        className="absolute top-1/3 left-10 w-[700px] h-[700px] bg-amber-500/15 blur-[180px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-rose-600/15 blur-[170px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <Network className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive AI Skill Constellation</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal mb-4">
            Verified Stack &amp; <span className="italic text-amber-300">Evidence.</span>
          </h2>
          <p className="font-sans-ui text-white/80 text-sm sm:text-base leading-relaxed font-light">
            Rather than speculative percentages, every competency is grounded in tangible repositories,
            internship tasks, or academic engineering implementations.
          </p>
        </div>

        {/* Central Hub Badge */}
        <div className="mb-12 inline-flex items-center gap-3.5 p-4 px-6 rounded-2xl liquid-glass-sunset border border-amber-400/40 shadow-[0_0_30px_rgba(251,146,60,0.2)]">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
              Central Synaptic Nucleus: AI &amp; Machine Learning
            </div>
            <div className="text-[11px] text-white/70 font-sans-ui">
              Connecting Computer Vision, Data Science, and Production Codebases
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-white/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor-label="FILTER"
              className={`px-4 py-2 rounded-full text-xs font-sans-ui transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-black font-semibold shadow-md shadow-amber-500/20'
                  : 'liquid-glass text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Constellation / Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Skill Nodes Matrix (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {filteredSkills.map((skill) => {
                const isSelected = selectedSkill.id === skill.id;
                return (
                  <Interactive3DCard
                    key={skill.id}
                    depth={20}
                    maxTilt={12}
                    dataCursorLabel="INTERACT"
                    onClick={() => setSelectedSkill(skill)}
                    className="rounded-2xl"
                  >
                    <div
                      className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer relative group border ${
                        isSelected
                          ? 'bg-gradient-to-b from-amber-500/20 to-rose-600/25 border-amber-400/70 shadow-[0_0_25px_rgba(251,191,36,0.25)]'
                          : 'liquid-glass-twilight border-white/10 hover:border-amber-400/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider truncate">
                          {skill.category.split(' ')[0]}
                        </span>
                        {skill.highlight && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] group-hover:scale-125 transition-transform" />
                        )}
                      </div>

                      <div className="font-sans-ui font-medium text-sm text-white group-hover:text-amber-200 transition-colors">
                        {skill.name}
                      </div>

                      <div className="text-[11px] text-white/60 font-sans-ui mt-1 line-clamp-1">
                        {skill.evidence}
                      </div>
                    </div>
                  </Interactive3DCard>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Skill Evidence Inspector (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28">
            <Interactive3DCard depth={30} maxTilt={10} dataCursorLabel="EXPLORE" className="rounded-3xl">
              <div className="liquid-glass-sunset rounded-3xl p-8 border border-amber-500/30 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    {selectedSkill.category}
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-sans-ui">
                    Verified Skill
                  </span>
                </div>

                <h3 className="font-serif-display text-3xl sm:text-4xl text-white mb-2">
                  {selectedSkill.name}
                </h3>

                <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 mb-6">
                  <div className="text-xs text-amber-200/80 font-sans-ui mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Concrete Implementation Evidence:</span>
                  </div>
                  <p className="text-sm font-sans-ui text-white/90 leading-relaxed">
                    {selectedSkill.evidence}
                  </p>
                </div>

                {relatedProjectData && (
                  <div className="p-5 rounded-2xl liquid-glass border border-white/15 mb-6">
                    <div className="text-xs font-mono uppercase text-amber-300 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Directly Featured In:</span>
                    </div>
                    <div className="font-serif-display text-xl text-white font-normal mb-1">
                      {relatedProjectData.title}
                    </div>
                    <p className="text-xs text-white/70 font-sans-ui mb-3">
                      {relatedProjectData.subtitle}
                    </p>
                    <a
                      href="#projects"
                      data-cursor-label="EXPLORE"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-sans-ui transition-colors font-medium"
                    >
                      <span>View Project Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-sans-ui">
                  <span>Practiced via coursework &amp; repositories</span>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="VIEW SOURCE"
                    className="text-white hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>GitHub Code</span>
                  </a>
                </div>
              </div>
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
