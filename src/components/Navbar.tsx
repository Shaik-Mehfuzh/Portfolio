import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onConnectClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onConnectClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnect = () => {
    setMobileMenuOpen(false);
    if (onConnectClick) {
      onConnectClick();
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-5 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Wordmark */}
          <a
            href="#"
            className="pointer-events-auto font-serif-display italic text-2xl sm:text-3xl font-normal tracking-tight text-white hover:text-amber-200 transition-colors duration-300 drop-shadow-sm flex items-center gap-1.5"
            aria-label="Shaik Mehfuzh Homepage"
          >
            <span>Shaik Mehfuzh.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block shadow-[0_0_8px_#f59e0b]"></span>
          </a>

          {/* Desktop Navigation Pill */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex pointer-events-auto items-center gap-1.5 py-1.5 px-2 rounded-full liquid-glass"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="px-4 py-2 text-sm text-white/90 hover:text-white rounded-full transition-colors duration-200 cursor-pointer font-sans-ui"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={handleConnect}
              className="ml-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-100 transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] font-sans-ui flex items-center gap-1.5"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden pointer-events-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 rounded-full liquid-glass flex items-center justify-center text-white relative focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-8 md:hidden animate-fade-in"
        >
          <div className="flex justify-between items-center">
            <span className="font-serif-display italic text-2xl text-white">
              {PERSONAL_INFO.preferredName}.
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, index) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                style={{
                  transitionDelay: `${100 + index * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                className="text-left font-serif-display text-4xl text-white hover:text-blue-300 transition-all duration-500 transform translate-y-0 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={handleConnect}
              className="w-full py-4 rounded-full bg-white text-black font-semibold text-center hover:bg-neutral-100 transition-all cursor-pointer font-sans-ui flex items-center justify-center gap-2"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-white/60 text-xs text-center font-sans-ui">
              {PERSONAL_INFO.education} · CBIT
            </p>
          </div>
        </div>
      )}
    </>
  );
};
