"use client";

import { motion } from "framer-motion";
import s from "@/app/sections.module.css";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const projects = [
  {
    title: "E-Commerce Platform",
    desc: "Full-stack storefront with cart, auth, and Stripe payments.",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    href: "#",
  },
  {
    title: "Task Manager",
    desc: "Real-time collaborative boards with drag-and-drop support.",
    tags: ["React", "WebSocket", "Redis"],
    href: "#",
  },
  {
    title: "Dev Portfolio",
    desc: "This site — interactive game-style navigation with Framer Motion.",
    tags: ["Next.js", "Framer Motion", "TypeScript"],
    href: "#",
  },
  {
    title: "Analytics Dashboard",
    desc: "Data visualisation tool for processing large event datasets.",
    tags: ["React", "D3.js", "Node.js"],
    href: "#",
  },
];

export default function WorkPage() {
  return (
    <div className={s.page}>
      <motion.p {...item(0)} className={s.label}>Work</motion.p>
      <motion.h1 {...item(0.07)} className={s.title}>Selected work</motion.h1>

      <motion.div {...item(0.14)} className={`${s.grid} ${s.grid2}`}>
        {projects.map((p) => (
          <motion.a
            key={p.title}
            href={p.href}
            className={s.card}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <p className={s.cardTitle}>{p.title}</p>
            <p className={s.cardText}>{p.desc}</p>
            <div className={s.tags}>
              {p.tags.map((t) => (
                <span key={t} className={s.tag}>{t}</span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
