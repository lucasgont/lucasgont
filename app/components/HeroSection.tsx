"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onInView: () => void;
}

const menuItems = [
  {
    label: "OPERATIONS",
    section: "projects",
    desc: "Active projects & deployments",
    icon: "◆",
  },
  {
    label: "DOSSIER",
    section: "about",
    desc: "Skills, background & clearance",
    icon: "◇",
  },
  {
    label: "UPLINK",
    section: "contact",
    desc: "Establish communication",
    icon: "◈",
  },
];

const bootLines = [
  { text: "Initializing NEXUS Core...", delay: 200 },
  { text: "Loading neural network modules...", delay: 600 },
  { text: "Establishing secure connection...", delay: 1000 },
  { text: "System integrity: VERIFIED", delay: 1400 },
  { text: "Access granted. Welcome back, Operator.", delay: 1800 },
];

function useTypewriter(text: string, speed: number = 30, delay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          setIsDone(true);
          clearInterval(intervalId);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay]);

  return { displayed, isDone };
}

export default function HeroSection({ onNavigate, onInView }: HeroSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [phase, setPhase] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [bootIndex, setBootIndex] = useState(0);

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  // Boot sequence phases
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Boot text starts
      setTimeout(() => setPhase(2), 2400),   // Title reveal
      setTimeout(() => setPhase(3), 3200),   // Menu items
      setTimeout(() => setPhase(4), 4000),   // Everything ready
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Boot line progression
  useEffect(() => {
    if (phase < 1 || bootIndex >= bootLines.length) return;
    const timer = setTimeout(() => {
      setBootIndex((prev) => prev + 1);
    }, bootLines[bootIndex]?.delay ?? 400);
    return () => clearTimeout(timer);
  }, [phase, bootIndex]);

  const titleText = useTypewriter("LUCAS", 80, 2400);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Hex grid decorative element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-150 h-150 opacity-[0.03]">
          <div className="absolute inset-0 border border-nx-cyan rounded-full animate-hex-rotate" />
          <div className="absolute inset-12 border border-nx-cyan/50 rounded-full animate-hex-rotate" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
          <div className="absolute inset-24 border border-nx-cyan/30 rounded-full animate-hex-rotate" style={{ animationDuration: "40s" }} />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Phase 1: Boot sequence terminal */}
        {phase >= 1 && phase < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel rounded-lg p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-nx-border">
              <div className="w-2 h-2 rounded-full bg-nx-red" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <div className="w-2 h-2 rounded-full bg-nx-green/60" />
              <span className="ml-3 font-mono text-[10px] text-nx-text-muted tracking-wider">NEXUS TERMINAL</span>
            </div>
            <div className="space-y-1.5">
              {bootLines.slice(0, bootIndex).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-xs"
                >
                  <span className="text-nx-cyan/60 mr-2">{">"}</span>
                  <span className={i === bootLines.length - 1 ? "text-nx-green" : "text-nx-text-secondary"}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              <span className="text-nx-cyan animate-blink font-mono text-xs">█</span>
            </div>
          </motion.div>
        )}

        {/* Phase 2: Main title */}
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Classification badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-nx-cyan/20 bg-nx-cyan/5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-nx-cyan animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.3em] text-nx-cyan">CLASSIFIED // LEVEL 5 CLEARANCE</span>
            </motion.div>

            {/* Main name */}
            <div className="relative mb-3">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-nx-text">
                {titleText.displayed}
                {!titleText.isDone && <span className="text-nx-cyan animate-blink">|</span>}
              </h1>
              {/* Glow behind text */}
              <div className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-nx-cyan/5 blur-2xl select-none pointer-events-none" aria-hidden>
                LUCAS
              </div>
            </div>

            {/* Subtitle with animated line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-12 sm:w-20 bg-linear-to-r from-nx-cyan to-transparent" />
              <span className="font-mono text-sm sm:text-base tracking-[0.2em] text-nx-text-secondary">
                FULLSTACK DEVELOPER
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-nx-border-bright to-transparent" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 font-mono text-xs text-nx-text-muted max-w-lg"
            >
              Engineering production-grade systems with clean architecture, AI-augmented workflows, and zero-compromise security.
            </motion.p>
          </motion.div>
        )}

        {/* Phase 3: Navigation cards */}
        {phase >= 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {menuItems.map((item, i) => (
              <motion.button
                key={item.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                onClick={() => onNavigate(item.section)}
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`group relative p-5 text-left transition-all duration-300 rounded-lg overflow-hidden
                  ${hoveredItem === i
                    ? "glass-panel-bright glow-cyan"
                    : "glass-panel hover:border-nx-cyan/20"
                  }`}
              >
                {/* Animated top border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-500 ${
                  hoveredItem === i
                    ? "bg-linear-to-r from-transparent via-nx-cyan to-transparent opacity-100"
                    : "opacity-0"
                }`} />

                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-lg transition-colors duration-300 ${
                    hoveredItem === i ? "text-nx-cyan" : "text-nx-text-muted"
                  }`}>
                    {item.icon}
                  </span>
                  <span className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 ${
                    hoveredItem === i ? "text-nx-text" : "text-nx-text-secondary"
                  }`}>
                    {item.label}
                  </span>
                </div>

                <p className="font-mono text-[10px] text-nx-text-muted leading-relaxed">
                  {item.desc}
                </p>

                {/* Arrow indicator */}
                <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                  hoveredItem === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}>
                  <span className="text-nx-cyan text-sm">→</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Phase 4: Scroll indicator */}
        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-16 flex flex-col items-center gap-3"
          >
            <span className="font-mono text-[10px] text-nx-text-muted/40 tracking-[0.2em]">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-linear-to-b from-nx-cyan/40 to-transparent"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
