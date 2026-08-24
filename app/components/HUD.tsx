"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HUDProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const sectionNames: Record<string, string> = {
  hero: "HOME BASE",
  projects: "OPERATIONS",
  about: "DOSSIER",
  contact: "UPLINK",
};

const sectionNumbers: Record<string, string> = {
  hero: "00",
  projects: "01",
  about: "02",
  contact: "03",
};

const navSections = ["hero", "projects", "about", "contact"];

function useSystemTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function HUD({ activeSection, onNavigate }: HUDProps) {
  const time = useSystemTime();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* === TOP BAR === */}
      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-4 sm:px-8">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-3 pointer-events-auto">
          {/* Hex icon */}
          <div className="relative w-7 h-7 flex items-center justify-center">
            <div className="absolute inset-0 hex-shape bg-nx-cyan/10" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="relative z-10">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="rgba(0,212,255,0.6)" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="3" fill="rgba(0,212,255,0.4)" />
            </svg>
          </div>
          <div className="font-mono text-[10px] tracking-[0.25em] text-nx-text-muted">
            NEXUS<span className="text-nx-cyan">.DEV</span>
          </div>
        </div>

        {/* Center: Section indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em]"
            >
              <span className="text-nx-cyan">{sectionNumbers[activeSection]}</span>
              <div className="w-6 h-px bg-nx-border-bright" />
              <span className="text-nx-text-muted">{sectionNames[activeSection]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Time / Status */}
        <div className="flex items-center gap-4 font-mono text-[10px] text-nx-text-muted">
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-nx-green animate-pulse" />
            <span className="tracking-wider">ONLINE</span>
          </div>
          <span className="text-nx-cyan/60 tracking-widest">{time}</span>
        </div>
      </div>

      {/* === LEFT SIDE NAV === */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto">
        {navSections.map((section, i) => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className="group relative flex items-center"
            aria-label={`Navigate to ${sectionNames[section]}`}
          >
            {/* Line connector */}
            {i < navSections.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-nx-border" />
            )}
            {/* Dot */}
            <div className="relative">
              <div
                className={`w-2 h-2 transition-all duration-500 ${
                  activeSection === section
                    ? "bg-nx-cyan scale-125 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                    : "bg-nx-text-muted/30 group-hover:bg-nx-text-muted/60"
                }`}
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
              />
              {activeSection === section && (
                <div className="absolute inset-0 w-2 h-2 bg-nx-cyan/30 pulse-ring"
                  style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
              )}
            </div>
            {/* Label */}
            <span className={`absolute left-6 font-mono text-[9px] tracking-[0.15em] whitespace-nowrap transition-all duration-300 ${
              activeSection === section
                ? "text-nx-cyan opacity-100 translate-x-0"
                : "text-nx-text-muted opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
            }`}>
              {sectionNames[section]}
            </span>
          </button>
        ))}
      </div>

      {/* === BOTTOM BAR === */}
      <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-between px-4 sm:px-8">
        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-nx-border">
          <motion.div
            className="h-full bg-linear-to-r from-nx-cyan/0 via-nx-cyan to-nx-cyan/0"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex items-center gap-4 font-mono text-[9px] text-nx-text-muted/40 tracking-wider">
          <span>NEXUS v2.0.26</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">CLEARANCE: LEVEL 5</span>
        </div>

        {/* Scrolling data stream */}
        <div className="hidden sm:block overflow-hidden max-w-xs">
          <div className="font-mono text-[9px] text-nx-text-muted/20 whitespace-nowrap animate-slide-data">
            SYSTEM NOMINAL • ENCRYPTION: AES-256 • UPTIME: 99.97% • LATENCY: 12ms • BANDWIDTH: OPTIMAL • THREAT LEVEL: MINIMAL • FIREWALL: ACTIVE • SYSTEM NOMINAL • ENCRYPTION: AES-256 • UPTIME: 99.97% • LATENCY: 12ms • BANDWIDTH: OPTIMAL • THREAT LEVEL: MINIMAL • FIREWALL: ACTIVE
          </div>
        </div>
      </div>

      {/* === CORNER DECORATIONS === */}
      {/* Top-left */}
      <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 text-nx-cyan/15" viewBox="0 0 32 32">
        <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Top-right */}
      <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 text-nx-cyan/15" viewBox="0 0 32 32">
        <path d="M32 8V0h-8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Bottom-left */}
      <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 text-nx-cyan/15" viewBox="0 0 32 32">
        <path d="M0 24v8h8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {/* Bottom-right */}
      <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 text-nx-cyan/15" viewBox="0 0 32 32">
        <path d="M32 24v8h-8" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
