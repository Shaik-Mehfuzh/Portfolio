import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const TRAIN_VIDEO_URL = '/assets/aistudio/Woman_welcoming_on_train_20261022183441_22fe0dd0.mp4';
const TRAIN_POSTER_URL = '/assets/aistudio/Sunset_Journey_Portfolio_Hero_19f38e58.png';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Keep audio on and unmute video with browser policy fallback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // If browser restricts autoplay with unmuted audio before user interaction,
          // temporarily mute to ensure video plays, and immediately unmute on first gesture!
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const handleUserInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1.0;
              setIsMuted(false);
            }
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('keydown', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
          };

          window.addEventListener('click', handleUserInteraction, { once: true });
          window.addEventListener('keydown', handleUserInteraction, { once: true });
          window.addEventListener('touchstart', handleUserInteraction, { once: true });
        });
    }
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const scrollToProjects = () => {
    const el = document.querySelector('#projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0c0817] flex flex-col justify-between selection:bg-rose-500/25">
      {/* 1. Cinematic Luxury Train Sunset Video Background (Primary Visual Focus) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src={TRAIN_VIDEO_URL}
          poster={TRAIN_POSTER_URL}
          autoPlay
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-[center_center] sm:object-[28%_center] transition-transform duration-1000 ease-out"
        />

        {/* Subtle localized soft sunset vignette on the right to guarantee text contrast without darkening the seated character */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              'radial-gradient(ellipse 65% 85% at 75% 50%, rgba(18, 10, 32, 0.45) 0%, rgba(18, 10, 32, 0.15) 55%, transparent 100%)',
          }}
        />

        {/* Mobile gentle scrim to keep text legible on small screens */}
        <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-t from-[#0e081e]/90 via-black/35 to-transparent" />
      </div>

      {/* 2. Top Nav Space Buffer */}
      <div className="h-20 sm:h-24 pointer-events-none" />

      {/* 3. Hero Content Container: Composed over the Right-Side Sunset View */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 my-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6">
          {/* Left Side: Intentionally Clear for Seated Train Character */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6 pointer-events-none" />

          {/* Right Side: Concise, Personal & Professional Portfolio Introduction */}
          <div className="md:col-span-7 lg:col-span-6 md:pl-4 lg:pl-6 text-left flex flex-col items-start">
            {/* Top row with Introductory Label & Audio Status Button */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass text-xs sm:text-[13px] font-sans-ui text-amber-200 border border-amber-300/30 shadow-[0_0_20px_rgba(251,191,36,0.18)] backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>CSE (AI&amp;ML) · AI/ML Developer · Systems Builder</span>
              </div>

              {/* Audio Control Pill */}
              <button
                onClick={toggleAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98]"
                title={isMuted ? 'Click to Unmute Audio' : 'Mute Audio'}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                    <span className="text-[11px] text-rose-200">Audio: Muted (Click to Unmute)</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-emerald-300 font-medium">Audio: On</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display font-normal text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.08] tracking-tight text-white mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              Building Intelligence.
              <br />
              <span className="italic font-light text-rose-200/95">Shaping What's Next.</span>
            </h1>

            {/* Short Personal Description — Guaranteed Fully Visible & Uncut */}
            <p className="font-sans-ui text-sm sm:text-base md:text-lg text-white/95 max-w-xl sm:max-w-2xl leading-relaxed mb-6 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] whitespace-normal break-words overflow-visible">
              I’m Shaik Mehfuzh, a CSE (AI&amp;ML) student exploring intelligent systems, machine learning,
              and practical AI solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5 w-full sm:w-auto">
              <button
                onClick={scrollToProjects}
                data-magnetic="true"
                data-cursor-label="EXPLORE"
                className="px-7 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-white/25 hover:scale-[1.02] active:scale-[0.98] font-sans-ui flex items-center justify-center gap-2"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={scrollToContact}
                data-magnetic="true"
                data-cursor-label="CONNECT"
                className="px-7 py-3 rounded-full liquid-glass text-white font-medium text-xs sm:text-sm hover:bg-white/15 transition-all duration-200 cursor-pointer font-sans-ui flex items-center justify-center gap-2 border border-white/25 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>

            {/* Small Supporting Line */}
            <div className="flex items-center gap-2 text-xs font-mono text-amber-200/80 tracking-wide drop-shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_#fbbf24]" />
              <span>Turning ideas into intelligent projects.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Information Bar: Clean & Minimal */}
      <div className="relative z-10 w-full pt-4 pb-6 px-5 sm:px-8 max-w-7xl mx-auto border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/80 text-xs font-sans-ui">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3.5 gap-y-1">
          <span className="font-semibold text-white">Shaik Mehfuzh</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span>8.7 CGPA · CBIT Proddatur</span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span>Computer Vision &amp; Machine Learning</span>
        </div>

        <div className="flex items-center gap-2 text-amber-300/90 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
          <span>Open for AI/ML Opportunities</span>
        </div>
      </div>
    </section>
  );
};
