"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface ProjectsSectionProps {
  onInView: () => void;
}

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  impact: string;
  tech: string[];
  stats: { label: string; value: number }[];
  status: string;
  statusColor: string;
  features: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: "vaultsync",
    name: "VAULTSYNC",
    tagline: "Zero-knowledge encrypted file synchronization",
    description:
      "End-to-end encrypted file sync platform with real-time collaboration. Zero-knowledge architecture ensures even server administrators cannot access user data. Features conflict resolution, version history, and cross-platform support.",
    impact: "50K+ files synced with <100ms latency",
    tech: ["Next.js", "Node.js", "PostgreSQL", "WebSockets", "AWS S3", "Redis"],
    stats: [
      { label: "COMPLEXITY", value: 90 },
      { label: "SCALE", value: 80 },
      { label: "SECURITY", value: 95 },
    ],
    status: "DEPLOYED",
    statusColor: "text-nx-green",
    features: [
      "Zero-knowledge encryption architecture",
      "Real-time multi-device sync engine",
      "Automatic conflict resolution system",
      "RESTful API with 40+ endpoints",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
  },
  {
    id: "commandflow",
    name: "COMMANDFLOW",
    tagline: "AI-powered workflow automation engine",
    description:
      "Visual workflow builder enabling teams to automate repetitive tasks with AI-powered suggestions. Integrates with 30+ services via REST APIs. Features drag-and-drop editor, real-time execution monitoring, and intelligent error recovery.",
    impact: "200+ workflows automated, ~15hrs/week saved per team",
    tech: ["React", "Python", "FastAPI", "Redis", "Docker", "OpenAI API"],
    stats: [
      { label: "COMPLEXITY", value: 95 },
      { label: "SCALE", value: 75 },
      { label: "AI INTEGRATION", value: 100 },
    ],
    status: "ACTIVE",
    statusColor: "text-nx-cyan",
    features: [
      "Drag-and-drop visual workflow editor",
      "AI-powered task suggestions via OpenAI",
      "30+ third-party service integrations",
      "Real-time execution monitoring dashboard",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
];

function StatBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between font-mono text-[10px]">
        <span className="text-nx-text-muted tracking-wider">{label}</span>
        <span className="text-nx-cyan">{value}%</span>
      </div>
      <div className="h-1 bg-nx-elevated rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-nx-cyan/60 to-nx-cyan"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
}

export default function ProjectsSection({ onInView }: ProjectsSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.15 });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (isInView) onInView();
  }, [isInView, onInView]);

  const project = projects[selected];

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
              SECTION 01
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
            OPERATIONS
          </h2>
          <p className="font-mono text-sm text-nx-text-secondary mt-3 max-w-lg">
            Active deployments and classified projects. Select to view full specifications.
          </p>
        </motion.div>

        {/* Project selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-8"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setSelected(i)}
              className={`relative px-5 py-3 font-mono text-xs tracking-wider transition-all duration-300 rounded-t-lg ${
                selected === i
                  ? "text-nx-text bg-nx-surface border border-nx-border-bright border-b-transparent"
                  : "text-nx-text-muted hover:text-nx-text-secondary border border-transparent hover:border-nx-border"
              }`}
            >
              <span className={`mr-2 ${selected === i ? "text-nx-cyan" : "text-nx-text-muted/50"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {p.name}
              {selected === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 right-0 h-0.5 bg-nx-cyan rounded-full"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-6"
          >
            {/* Left: Visual + Description (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Image/Preview card */}
              <div className="relative glass-panel rounded-xl overflow-hidden group">
                {/* Decorative image placeholder */}
                <div className="relative h-56 sm:h-72 bg-linear-to-br from-nx-surface to-nx-elevated overflow-hidden">
                  {/* Grid overlay on image area */}
                  <div className="absolute inset-0 opacity-[0.08]" style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "30px 30px",
                  }} />

                  {/* Central hex icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <svg width="80" height="80" viewBox="0 0 80 80" className="text-nx-cyan/10">
                        <polygon points="40,4 74,22 74,58 40,76 6,58 6,22" fill="none" stroke="currentColor" strokeWidth="1" />
                        <polygon points="40,14 64,27 64,53 40,66 16,53 16,27" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-lg text-nx-cyan/30 font-bold">{String(selected + 1).padStart(2, "0")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-nx-surface via-transparent to-transparent" />

                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel ${project.statusColor}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span className="font-mono text-[10px] tracking-wider">{project.status}</span>
                    </div>
                  </div>

                  {/* Project name overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl sm:text-3xl font-bold text-nx-text tracking-tight mb-1">
                      {project.name}
                    </h3>
                    <p className="font-mono text-xs text-nx-text-secondary">{project.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                  <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">MISSION BRIEF</span>
                </div>
                <p className="text-sm text-nx-text-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Feature list */}
                <div className="space-y-2">
                  {project.features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-xs text-nx-text-secondary"
                    >
                      <span className="text-nx-cyan mt-0.5 shrink-0">▹</span>
                      {f}
                    </motion.div>
                  ))}
                </div>

                {/* Impact */}
                <div className="mt-6 p-4 rounded-lg bg-nx-cyan/5 border border-nx-cyan/10">
                  <div className="font-mono text-[10px] text-nx-cyan mb-1 tracking-wider">◈ IMPACT METRICS</div>
                  <div className="font-mono text-sm text-nx-text">{project.impact}</div>
                </div>
              </div>
            </div>

            {/* Right: Stats + Tech (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance stats */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                  <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">PERFORMANCE METRICS</span>
                </div>
                <div className="space-y-5">
                  {project.stats.map((stat, i) => (
                    <StatBar key={stat.label} label={stat.label} value={stat.value} delay={i * 0.15} />
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div className="glass-panel rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                  <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">TECH STACK</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="px-3 py-1.5 text-xs font-mono text-nx-text-secondary border border-nx-border rounded-md
                        hover:border-nx-cyan/30 hover:text-nx-cyan hover:bg-nx-cyan/5 transition-all duration-300 cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-lg font-mono text-xs tracking-wider
                  bg-nx-cyan/10 border border-nx-cyan/30 text-nx-cyan
                  hover:bg-nx-cyan/20 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-300">
                  VIEW DEMO
                </button>
                <button className="flex-1 py-3 rounded-lg font-mono text-xs tracking-wider
                  glass-panel text-nx-text-secondary
                  hover:text-nx-text hover:border-nx-border-bright transition-all duration-300">
                  SOURCE CODE
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
