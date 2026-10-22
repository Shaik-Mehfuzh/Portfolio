/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomPointer } from './components/CustomPointer';
import { AsteroidScrollIndicator } from './components/AsteroidScrollIndicator';
import { Spatial3DCanvas } from './components/Spatial3DCanvas';

export default function App() {
  const handleConnectClick = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0717] text-white overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Premium Custom Pointer System (Desktop & Laptops) */}
      <CustomPointer />

      {/* Asteroid-Style Flashing Scroll Indicator (Pink-Orange-Purple Sunset Trail) */}
      <AsteroidScrollIndicator />

      {/* Global Navigation Header (Preserved) */}
      <Navbar onConnectClick={handleConnectClick} />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Fullscreen Cinematic Hero Section (Preserved Exactly) */}
        <div id="hero" className="relative z-10">
          <HeroSection />
        </div>

        {/* Global Three.js Spatial 3D Motion Universe behind content sections */}
        <div className="relative">
          <Spatial3DCanvas />

          {/* Section Two: About Me — Layered Typography & Parallax */}
          <div className="relative z-10">
            <AboutSection />
          </div>

          {/* Section Three: Dimensional Education and Achievement Timeline */}
          <div className="relative z-10">
            <TimelineSection />
          </div>

          {/* Section Four: Projects — Cinematic 3D Worlds & Lab Workbench */}
          <div className="relative z-10">
            <ProjectsSection />
          </div>

          {/* Section Five: Interactive AI Skill Constellation */}
          <div className="relative z-10">
            <SkillsSection />
          </div>

          {/* Section Six: Experience and Editorial Credentials */}
          <div className="relative z-10">
            <ExperienceSection />
          </div>

          {/* Section Seven: Cinematic Contact Finale */}
          <div className="relative z-10">
            <ContactSection />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
