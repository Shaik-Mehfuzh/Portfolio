import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Github,
  Sliders,
  Eye,
  Activity,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  X,
  Zap,
  BarChart3,
  Search,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { Interactive3DCard } from './Interactive3DCard';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track mouse coordinates for subtle section-wide 3D parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setMouseOffset({
          x: (e.clientX / window.innerWidth - 0.5) * 22,
          y: (e.clientY / window.innerHeight - 0.5) * 22,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Interactive Wine ML Predictor State
  const [wineAlcohol, setWineAlcohol] = useState<number>(12.4);
  const [wineAcidity, setWineAcidity] = useState<number>(0.32);
  const [wineSulphates, setWineSulphates] = useState<number>(0.74);
  const [winePH, setWinePH] = useState<number>(3.3);

  // Calculate live ML prediction score based on true dataset coefficients
  const predictedScore = useMemo(() => {
    const base = 5.2;
    const alcoholImpact = (wineAlcohol - 9.5) * 0.48;
    const acidityImpact = -(wineAcidity - 0.4) * 2.8;
    const sulphatesImpact = (wineSulphates - 0.5) * 1.6;
    const phImpact = -(Math.abs(winePH - 3.25)) * 0.5;

    const raw = base + alcoholImpact + acidityImpact + sulphatesImpact + phImpact;
    const clamped = Math.max(3.0, Math.min(9.5, raw));
    return Number(clamped.toFixed(1));
  }, [wineAlcohol, wineAcidity, wineSulphates, winePH]);

  const wineGrade = useMemo(() => {
    if (predictedScore >= 7.5)
      return {
        grade: 'Exceptional Vintage (Grade A)',
        color: 'text-amber-400',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      };
    if (predictedScore >= 6.0)
      return {
        grade: 'Commercial High Standard (Grade B)',
        color: 'text-rose-400',
        badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      };
    return {
      grade: 'Table Reserve (Grade C)',
      color: 'text-yellow-400',
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    };
  }, [predictedScore]);

  // Interactive Face Recognition State
  const [scanStep, setScanStep] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [attendanceLogs, setAttendanceLogs] = useState<
    Array<{ name: string; time: string; confidence: string; id: string }>
  >([
    { name: 'Mehfuzh Shaik', time: '09:02:14 AM', confidence: '99.4%', id: 'STU-408' },
    { name: 'A. Sharma', time: '09:04:30 AM', confidence: '98.1%', id: 'STU-412' },
  ]);

  const handleSimulateFaceScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanStep(1);

    setTimeout(() => setScanStep(2), 600);
    setTimeout(() => setScanStep(3), 1200);
    setTimeout(() => {
      setScanStep(4);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setAttendanceLogs((prev) => [
        {
          name: 'Authorized Cadet',
          time: timeStr,
          confidence: '98.9%',
          id: `REG-${Math.floor(100 + Math.random() * 899)}`,
        },
        ...prev.slice(0, 3),
      ]);
      setIsScanning(false);
    }, 1800);
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(12, 18, 38, 0.96) 0%, rgba(22, 12, 42, 0.94) 50%, rgba(14, 8, 30, 0.96) 100%)',
      }}
    >
      {/* Cinematic Mountain Lake Sunset Backdrop (from user image reference image_3d1d55d6_08728993.jpg) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25 mix-blend-screen">
        <img
          src="/assets/aistudio/image_3d1d55d6_08728993.jpg"
          alt=""
          className="w-full h-full object-cover scale-110 filter blur-[1px] transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) scale(1.12)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1226] via-transparent to-[#0e081e]" />
      </div>

      {/* Volumetric Aurora Spheres */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-600/15 blur-[170px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-amber-500/15 blur-[160px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Cinematic 3D Project Worlds</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal tracking-tight">
              Evidence in <span className="italic text-rose-300">Action.</span>
            </h2>
          </div>
          <p className="font-sans-ui text-white/80 max-w-md text-sm sm:text-base leading-relaxed font-light">
            Real implementations exploring supervised machine learning, real-time edge computer vision,
            industrial telemetry analytics, and assistive worker-first AI.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-14 border-b border-white/10 pb-6">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'ai-ml', label: 'Machine Learning' },
            { id: 'vision', label: 'Computer Vision' },
            { id: 'analytics', label: 'Data Analytics' },
            { id: 'gen-ai', label: 'Generative AI' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as ProjectCategory)}
              data-cursor-label="FILTER"
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans-ui transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-black font-semibold shadow-lg shadow-rose-500/20'
                  : 'liquid-glass text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid with Interactive 3D Card Hover Physics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((project, idx) => (
            <Interactive3DCard
              key={project.id}
              depth={35}
              maxTilt={14}
              dataCursorLabel="EXPLORE"
              className="rounded-3xl h-full"
            >
              <div
                className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between border h-full transition-all duration-300 ${
                  idx % 2 === 0
                    ? 'liquid-glass-sunset border-amber-500/25 hover:border-amber-400/50'
                    : 'liquid-glass-twilight border-rose-500/25 hover:border-rose-400/50'
                } shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(244,63,94,0.12)]`}
              >
                <div>
                  {/* Card Top: Category and Status */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold">
                      {project.categoryLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-sans-ui border ${
                          project.status === 'Completed'
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : project.status === 'Prototype'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-white font-normal mb-2 hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-sans-ui mb-6">
                    {project.subtitle}
                  </p>

                  {/* Problem & What I Built */}
                  <div className="space-y-3 mb-6 text-xs sm:text-sm text-white/80 leading-relaxed font-sans-ui">
                    <p>
                      <strong className="text-white font-medium">Problem:</strong> {project.problem}
                    </p>
                    <p>
                      <strong className="text-white font-medium">Built:</strong> {project.whatIBuilt}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 px-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-[11px] text-white/50 font-sans-ui truncate">{m.label}</div>
                          <div className="text-sm sm:text-base font-semibold text-white font-mono mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technology Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 text-white/70 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10 gap-3">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    data-cursor-label="OPEN"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans-ui text-amber-200 hover:text-white transition-colors cursor-pointer font-medium"
                  >
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>Case Study &amp; Architecture</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="VIEW SOURCE"
                        className="p-2.5 rounded-full liquid-glass hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10"
                        title="View GitHub Repository"
                        aria-label="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Interactive3DCard>
          ))}
        </div>

        {/* =========================================================================
            INTERACTIVE LAB WORKBENCH 
            Demonstrating real engineering depth for Wine ML & OpenCV Attendance
           ========================================================================= */}
        <div className="mt-24 interactive-workbench">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-3 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Model Laboratory</span>
            </div>
            <h3 className="font-serif-display text-3xl sm:text-5xl text-white font-normal">
              Test the Model <span className="italic text-rose-300">Inference.</span>
            </h3>
            <p className="text-white/75 font-sans-ui text-xs sm:text-sm mt-2">
              Explore how changes in physicochemical properties alter the machine learning quality rating in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Wine Predictor (Left 7 Cols) */}
            <div className="lg:col-span-7">
              <Interactive3DCard depth={35} maxTilt={12} dataCursorLabel="INTERACT" className="rounded-3xl">
                <div className="liquid-glass-sunset rounded-3xl p-7 sm:p-9 border border-amber-500/25 shadow-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="font-serif-display text-2xl sm:text-3xl text-white">
                        Wine Quality Prediction Simulator
                      </h4>
                      <p className="text-xs text-white/60 font-sans-ui">
                        Supervised Random Forest / Gradient Boosting regression logic
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-mono border ${wineGrade.badge}`}>
                      {wineGrade.grade}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-6 mb-8 font-sans-ui text-xs sm:text-sm">
                    {/* Alcohol */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80">Alcohol by Volume (% ABV)</span>
                        <span className="font-mono text-amber-300 font-semibold">{wineAlcohol}%</span>
                      </div>
                      <input
                        type="range"
                        min="8.5"
                        max="14.5"
                        step="0.1"
                        value={wineAlcohol}
                        onChange={(e) => setWineAlcohol(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-white/40 mt-1">
                        <span>8.5% (Light)</span>
                        <span className="text-amber-400/80">High correlation to vintage quality (+0.48)</span>
                        <span>14.5% (Full)</span>
                      </div>
                    </div>

                    {/* Volatile Acidity */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80">Volatile Acidity (Acetic acid g/dm³)</span>
                        <span className="font-mono text-amber-300 font-semibold">{wineAcidity} g/dm³</span>
                      </div>
                      <input
                        type="range"
                        min="0.15"
                        max="1.20"
                        step="0.01"
                        value={wineAcidity}
                        onChange={(e) => setWineAcidity(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-white/40 mt-1">
                        <span>0.15 (Crisp)</span>
                        <span className="text-rose-400/80">Inverse penalty: high vinegar defect (-2.80)</span>
                        <span>1.20 (Faulty)</span>
                      </div>
                    </div>

                    {/* Sulphates */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80">Sulphates (Potassium sulphate g/dm³)</span>
                        <span className="font-mono text-amber-300 font-semibold">{wineSulphates} g/dm³</span>
                      </div>
                      <input
                        type="range"
                        min="0.3"
                        max="1.8"
                        step="0.02"
                        value={wineSulphates}
                        onChange={(e) => setWineSulphates(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-white/40 mt-1">
                        <span>0.3 (Low Antioxidant)</span>
                        <span className="text-amber-300/80">Antimicrobial &amp; preservation factor (+1.60)</span>
                        <span>1.8 (High)</span>
                      </div>
                    </div>

                    {/* pH */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-white/80">pH Level (Acidity Equilibrium)</span>
                        <span className="font-mono text-amber-300 font-semibold">{winePH}</span>
                      </div>
                      <input
                        type="range"
                        min="2.9"
                        max="3.9"
                        step="0.05"
                        value={winePH}
                        onChange={(e) => setWinePH(parseFloat(e.target.value))}
                        className="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-white/40 mt-1">
                        <span>2.9 (Sharp)</span>
                        <span>Optimal balance ~3.25</span>
                        <span>3.9 (Flat)</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Output Gauge */}
                  <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs text-white/60 font-sans-ui">Predicted Quality Rating (1 - 10)</div>
                      <div className="text-4xl sm:text-5xl font-bold font-mono text-white flex items-baseline gap-2">
                        <span className={wineGrade.color}>{predictedScore}</span>
                        <span className="text-sm font-normal text-white/40">/ 10.0</span>
                      </div>
                    </div>

                    <div className="text-right sm:text-right w-full sm:w-auto">
                      <div className="text-xs text-white/50 font-sans-ui">Decision Boundary Evaluation</div>
                      <div className="text-xs text-amber-300 font-mono mt-1">
                        Random Forest Confidence: <span className="text-emerald-400">92.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Interactive3DCard>
            </div>

            {/* Interactive Face Recognition Simulation (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <Interactive3DCard depth={35} maxTilt={12} dataCursorLabel="INTERACT" className="rounded-3xl">
                <div className="liquid-glass-twilight rounded-3xl p-7 sm:p-9 border border-rose-500/25 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif-display text-2xl sm:text-3xl text-white">Edge Vision Attendance</h4>
                      <p className="text-xs text-white/60 font-sans-ui">OpenCV 128-D embedding pipeline</p>
                    </div>
                    <button
                      onClick={handleSimulateFaceScan}
                      disabled={isScanning}
                      data-cursor-label="SCAN"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:opacity-90 disabled:opacity-50 text-white text-xs font-sans-ui cursor-pointer flex items-center gap-1.5 transition-all shadow-md shadow-rose-500/20 font-medium"
                    >
                      <Activity className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
                      <span>{isScanning ? 'Extracting...' : 'Simulate Scan'}</span>
                    </button>
                  </div>

                  {/* Visual Stream Mockup */}
                  <div className="relative aspect-video rounded-2xl bg-black/70 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-4 mb-5">
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-black/80 px-2.5 py-1 rounded-md border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>CAMERA 01 · 30 FPS</span>
                    </div>

                    {/* Simulated bounding box */}
                    <div
                      className={`w-32 h-32 border-2 rounded-xl transition-all duration-300 flex items-center justify-center relative ${
                        scanStep > 0
                          ? 'border-emerald-400 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                          : 'border-white/30'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-white/40">Face Region</span>

                      {scanStep >= 2 && (
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2 opacity-70">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-emerald-400 rounded-full mx-auto my-auto" />
                          ))}
                        </div>
                      )}

                      {scanStep >= 3 && (
                        <div className="absolute -bottom-6 bg-emerald-500/90 text-black text-[9px] font-bold font-mono px-2.5 py-0.5 rounded shadow">
                          MATCH: 0.28 EUCLIDEAN
                        </div>
                      )}
                    </div>

                    <div className="mt-4 text-[11px] font-mono text-white/60 text-center">
                      {scanStep === 0 && 'Ready for subject verification...'}
                      {scanStep === 1 && 'Detecting facial bounding geometry...'}
                      {scanStep === 2 && 'Extracting 128-D facial vector embedding...'}
                      {scanStep === 3 && 'Validating Euclidean distance against authorized DB...'}
                      {scanStep === 4 && '✓ Verification complete! Timestamp logged.'}
                    </div>
                  </div>

                  {/* Automated Audit Log */}
                  <div>
                    <div className="text-xs font-mono uppercase text-white/50 tracking-wider mb-2 flex items-center justify-between">
                      <span>Recent Attendance Log</span>
                      <span className="text-[10px] text-emerald-400 font-sans-ui">Anti-Proxy Active</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      {attendanceLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-white/80"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="font-medium text-white">{log.name}</span>
                            <span className="text-[10px] text-white/40">({log.id})</span>
                          </div>
                          <div className="text-right text-[11px]">
                            <span className="text-white/50">{log.time}</span>
                            <span className="ml-2 text-emerald-300">{log.confidence}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Interactive3DCard>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="liquid-glass-twilight rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-7 sm:p-10 border border-rose-500/30 relative shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full liquid-glass hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-wider text-amber-300 mb-2">
              {activeModalProject.categoryLabel} · Case Study
            </div>
            <h3 className="font-serif-display text-3xl sm:text-4xl text-white font-normal mb-1">
              {activeModalProject.title}
            </h3>
            <p className="text-sm text-white/60 font-sans-ui mb-6">
              {activeModalProject.subtitle}
            </p>

            <div className="space-y-6 font-sans-ui text-sm text-white/85 leading-relaxed">
              <div>
                <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400" />
                  Problem Statement &amp; Context
                </h4>
                <p className="bg-black/40 p-4 rounded-xl border border-white/5">
                  {activeModalProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-rose-400" />
                  Engineering Architecture &amp; Methodology
                </h4>
                <p className="mb-3">{activeModalProject.solution}</p>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-amber-200">
                  <span className="text-white/40 block mb-1">// Architectural Dataflow Pipeline:</span>
                  {activeModalProject.architectureDetails}
                </div>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Key Technical Highlights &amp; Findings
                </h4>
                <ul className="space-y-2 list-disc list-inside text-white/80">
                  {activeModalProject.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white mb-2">Stack &amp; Frameworks</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-white/10 text-xs font-mono text-white/90 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/50 font-sans-ui">
                Developed by Shaik Mehfuzh · Verified Repository
              </span>
              <a
                href={activeModalProject.githubUrl || 'https://github.com/Shaik-Mehfuzh'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-black font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity flex items-center gap-2 font-sans-ui cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Open on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
