"use client";

import { useState, useRef, useCallback } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import HUD from "./components/HUD";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

type Section = "hero" | "projects" | "about" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollTo = useCallback((section: string) => {
    sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleHeroInView = useCallback(() => setActiveSection("hero"), []);
  const handleProjectsInView = useCallback(
    () => setActiveSection("projects"),
    [],
  );
  const handleAboutInView = useCallback(() => setActiveSection("about"), []);
  const handleContactInView = useCallback(
    () => setActiveSection("contact"),
    [],
  );

  return (
    <>
      <AnimatedBackground />
      <HUD activeSection={activeSection} onNavigate={scrollTo} />

      <main className="relative z-10">
        <div
          ref={(el) => {
            sectionsRef.current.hero = el;
          }}
        >
          <HeroSection onNavigate={scrollTo} onInView={handleHeroInView} />
        </div>

        <div
          ref={(el) => {
            sectionsRef.current.projects = el;
          }}
        >
          <ProjectsSection onInView={handleProjectsInView} />
        </div>

        <div
          ref={(el) => {
            sectionsRef.current.about = el;
          }}
        >
          <AboutSection onInView={handleAboutInView} />
        </div>

        <div
          ref={(el) => {
            sectionsRef.current.contact = el;
          }}
        >
          <ContactSection onInView={handleContactInView} />
        </div>

        {/* Footer */}
        <footer className="relative border-t border-nx-border py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" className="text-nx-cyan/40">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">
                &copy; 2026 LUCAS — NEXUS DIVISION
              </span>
            </div>
            <span className="font-mono text-[10px] text-nx-text-muted/40 tracking-wider">
              BUILT WITH NEXT.JS + FRAMER MOTION
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}
