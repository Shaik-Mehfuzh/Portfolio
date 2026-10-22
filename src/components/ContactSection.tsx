import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Interactive3DCard } from './Interactive3DCard';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [inquiryType, setInquiryType] = useState<string>('Internship / Hiring');
  const [senderName, setSenderName] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunchMailto = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${inquiryType}] Connecting with Shaik Mehfuzh${senderName ? ` - from ${senderName}` : ''}`
    );
    const body = encodeURIComponent(
      `Hi Shaik Mehfuzh,\n\n${
        messageText ||
        'I came across your AI/ML portfolio and would like to discuss opportunities or collaborate.'
      }\n\nBest regards,\n${senderName || 'A collaborator'}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-36 px-4 sm:px-8 overflow-hidden perspective-1400"
      style={{
        background: 'linear-gradient(180deg, rgba(12, 8, 26, 0.96) 0%, rgba(28, 12, 40, 0.94) 50%, rgba(10, 6, 22, 0.98) 100%)',
      }}
    >
      {/* Volumetric Twilight Sunset Glow and Light Pass */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-600/15 blur-[190px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        }}
      />
      <div
        className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-rose-600/15 blur-[180px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Links & Persona (6 cols) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs font-sans-ui text-amber-300 border border-amber-400/30 mb-6 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Initiate Collaboration</span>
            </div>

            <div className="clip-reveal-container">
              <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.05] tracking-tight mb-2">
                Have an Interesting Problem?
              </h2>
            </div>
            <div className="clip-reveal-container mb-6">
              <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-white font-normal leading-[1.05] tracking-tight">
                <span className="italic text-amber-300 font-light">Let’s Build Something Meaningful.</span>
              </h2>
            </div>

            <p className="font-sans-ui text-white/80 text-base sm:text-lg leading-relaxed mb-10 max-w-lg font-light">
              Whether you are looking for an AI/ML intern for 2026, exploring industrial computer vision concepts,
              or discussing data architectures, my inbox is always open.
            </p>

            {/* Quick Email Card with 3D Tilt */}
            <Interactive3DCard depth={30} maxTilt={10} className="rounded-3xl mb-8">
              <div className="liquid-glass-sunset rounded-3xl p-7 border border-amber-500/25 shadow-xl">
                <div className="text-xs font-mono text-amber-300/80 uppercase tracking-wider mb-2">
                  Direct Email Address
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="font-mono text-base sm:text-lg text-white font-medium select-all">
                    {PERSONAL_INFO.email}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyEmail}
                      data-magnetic="true"
                      data-cursor-label="COPY"
                      className="px-4 py-2 rounded-full liquid-glass hover:bg-white/15 text-xs text-white font-sans-ui flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      data-magnetic="true"
                      data-cursor-label="MAIL"
                      className="px-5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-black font-semibold text-xs hover:opacity-95 transition-opacity cursor-pointer font-sans-ui flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Mail</span>
                    </a>
                  </div>
                </div>
              </div>
            </Interactive3DCard>

            {/* Verified Social Profiles */}
            <div className="space-y-3.5 font-sans-ui">
              <Interactive3DCard depth={20} maxTilt={8} className="rounded-2xl">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="LINKEDIN"
                  className="liquid-glass-twilight p-5 rounded-2xl flex items-center justify-between text-white/90 hover:text-white border border-rose-500/20 hover:border-rose-400/40 transition-all group cursor-pointer block"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/30 group-hover:scale-105 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">LinkedIn Profile</div>
                      <div className="text-xs text-white/50">linkedin.com/in/mehfuzh-shaik-a88b53348</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-rose-300 group-hover:text-white transition-colors" />
                </a>
              </Interactive3DCard>

              <Interactive3DCard depth={20} maxTilt={8} className="rounded-2xl">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="GITHUB"
                  className="liquid-glass-sunset p-5 rounded-2xl flex items-center justify-between text-white/90 hover:text-white border border-amber-500/20 hover:border-amber-400/40 transition-all group cursor-pointer block"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">GitHub Repositories</div>
                      <div className="text-xs text-white/50">github.com/Shaik-Mehfuzh</div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-amber-300 group-hover:text-white transition-colors" />
                </a>
              </Interactive3DCard>
            </div>
          </div>

          {/* Right Column: Direct Mail Composer (6 cols) */}
          <div className="lg:col-span-6">
            <Interactive3DCard depth={30} maxTilt={10} dataCursorLabel="WRITE" className="rounded-3xl">
              <div className="liquid-glass-twilight rounded-3xl p-8 sm:p-10 border border-rose-500/25 shadow-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 uppercase tracking-wider mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct Mail Composer</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mb-2">
                  Draft a Message
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-sans-ui mb-6">
                  This drafts your note and opens your email client directly with all fields prepared (no lost messages).
                </p>

                <form onSubmit={handleLaunchMailto} className="space-y-4 font-sans-ui text-sm">
                  {/* Inquiry Type Radio / Pills */}
                  <div>
                    <label className="block text-xs text-white/70 mb-2 font-medium">Inquiry Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Internship / Hiring', 'Project Collaboration', 'Technical Chat'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setInquiryType(type)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-sans-ui transition-all cursor-pointer border truncate ${
                            inquiryType === type
                              ? 'bg-amber-500/25 text-amber-200 border-amber-400 font-medium'
                              : 'bg-black/30 text-white/60 border-white/10 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sender Name */}
                  <div>
                    <label htmlFor="name-input" className="block text-xs text-white/70 mb-1.5 font-medium">
                      Your Name / Organization
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      placeholder="e.g. Dr. Aris Thorne / Acme AI Labs"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message-input" className="block text-xs text-white/70 mb-1.5 font-medium">
                      Message / Context
                    </label>
                    <textarea
                      id="message-input"
                      rows={4}
                      placeholder="Tell me about the role, dataset, or problem statement you'd like to explore..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    data-magnetic="true"
                    data-cursor-label="SEND"
                    className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-semibold text-sm hover:opacity-95 transition-opacity cursor-pointer font-sans-ui flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4 text-white" />
                    <span>Compose &amp; Send to {PERSONAL_INFO.preferredName}</span>
                  </button>

                  <p className="text-[11px] text-white/40 text-center font-mono">
                    Opens directly in your mail application (Gmail, Apple Mail, Outlook).
                  </p>
                </form>
              </div>
            </Interactive3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
