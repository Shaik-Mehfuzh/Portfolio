import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-8 bg-[#0a0618] border-t border-rose-500/20 text-white font-sans-ui text-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-serif-display italic text-xl text-white">
            {PERSONAL_INFO.preferredName}.
          </span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="text-white/60">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Computer Science &amp; Engineering (AI &amp; ML).
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/70">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-white transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-white/20 mx-1" />

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full liquid-glass hover:bg-white/15 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/10 flex items-center gap-1.5"
            title="Back to Top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
