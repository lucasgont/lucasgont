"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AboutSectionProps {
  onInView: () => void;
}

const skills = [
  { name: "React / Next.js", level: 85, category: "frontend" },
  { name: "Node.js / Express", level: 90, category: "backend" },
  { name: "TypeScript", level: 85, category: "language" },
  { name: "Python / FastAPI", level: 75, category: "backend" },
  { name: "PostgreSQL / Redis", level: 80, category: "data" },
  { name: "Docker / CI-CD", level: 70, category: "devops" },
  { name: "AI Integration", level: 90, category: "special" },
  { name: "System Design", level: 80, category: "special" },
];

const techGrid = [
  "React", "Next.js", "Node.js", "TypeScript",
  "Python", "PostgreSQL", "Redis", "Docker",
  "AWS", "Git", "FastAPI", "OpenAI",
];

export default function AboutSection({ onInView }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-nx-cyan" />
            <span className="font-mono text-[10px] sm:text-xs text-nx-cyan tracking-[0.4em]">
              SECTION 02
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
            DOSSIER
          </h2>
          <p className="font-mono text-sm text-nx-text-secondary mt-3">
            Operative profile and technical capabilities.
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-nx-border">
              <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
              <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">OPERATIVE STATUS</span>
            </div>

            {/* Avatar area */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-nx-cyan/20" />
              <div className="absolute inset-1 rounded-full border border-nx-cyan/10" />
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-nx-cyan/10 to-nx-surface flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" className="text-nx-cyan/40">
                  <circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border border-nx-cyan/20 pulse-ring" />
              <div className="absolute inset-0 rounded-full border border-nx-cyan/10 pulse-ring-delay" />
            </div>

            <div className="space-y-3">
              {[
                { label: "NAME", value: "LUCAS", accent: false },
                { label: "CLASS", value: "FULLSTACK DEV", accent: false },
                { label: "FORMATION", value: "DAW", accent: false },
                { label: "FOCUS", value: "BACKEND & AI", accent: true },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-nx-text-muted tracking-wider">{item.label}</span>
                  <span className={`font-mono text-xs ${item.accent ? "text-nx-cyan" : "text-nx-text"}`}>{item.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] text-nx-text-muted tracking-wider">STATUS</span>
                <span className="font-mono text-xs text-nx-green flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-nx-green rounded-full animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6 pt-4 border-t border-nx-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-nx-green tracking-wider">AVAILABILITY</span>
                <span className="font-mono text-[9px] text-nx-text-muted">OPEN TO WORK</span>
              </div>
              <div className="h-1.5 bg-nx-elevated rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-linear-to-r from-nx-green/60 to-nx-green rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>

          {/* Background / Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-nx-border">
              <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
              <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">BACKGROUND</span>
            </div>

            <div className="space-y-4 text-sm text-nx-text-secondary leading-relaxed">
              <p>
                Developer trained in{" "}
                <span className="text-nx-text">Web Application Development (DAW)</span>{" "}
                with hands-on experience building{" "}
                <span className="text-nx-text">complete, production-ready applications</span>.
              </p>
              <p>
                My focus is on{" "}
                <span className="text-nx-cyan">solid backend architecture</span>,
                clean code practices, and leveraging{" "}
                <span className="text-nx-cyan">AI tools to maximize development velocity</span>.
              </p>
              <p>
                I don&apos;t just write code &mdash; I{" "}
                <span className="text-nx-text">engineer solutions</span>. Every project is
                built with scalability, security, and maintainability as first-class priorities.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-6 p-4 rounded-lg bg-nx-cyan/5 border-l-2 border-nx-cyan/30">
              <p className="font-mono text-xs text-nx-text-muted italic">
                &ldquo;This developer could ship production code tomorrow.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Equipment grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-xl p-6 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-nx-border">
              <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
              <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">EQUIPMENT</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {techGrid.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.04 }}
                  className="group relative aspect-square rounded-lg border border-nx-border bg-nx-surface/30
                    flex items-center justify-center p-2 hover:border-nx-cyan/30 hover:bg-nx-cyan/5
                    transition-all duration-300 cursor-default"
                >
                  <span className="font-mono text-[10px] text-nx-text-secondary text-center
                    group-hover:text-nx-cyan transition-colors duration-300">
                    {item}
                  </span>
                  {/* Corner accent on hover */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-transparent
                    group-hover:w-3 group-hover:h-3 group-hover:border-nx-cyan/40 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skill bars — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-5 glass-panel rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-nx-border">
            <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
            <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">SKILL MATRIX</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {skills.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs text-nx-text-secondary">{skill.name}</span>
                  <span className="font-mono text-[10px] text-nx-cyan">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-nx-elevated rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: skill.category === "special"
                        ? "linear-gradient(90deg, rgba(0,212,255,0.5), rgba(0,212,255,0.9))"
                        : skill.level >= 85
                          ? "linear-gradient(90deg, rgba(0,212,255,0.4), rgba(0,255,136,0.7))"
                          : "linear-gradient(90deg, rgba(0,212,255,0.3), rgba(0,212,255,0.6))",
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
