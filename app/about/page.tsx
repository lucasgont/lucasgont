"use client";

import { motion } from "framer-motion";
import s from "@/app/sections.module.css";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const skills = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "REST APIs", "Docker", "Git",
];

export default function AboutPage() {
  return (
    <div className={s.page}>
      <motion.p {...item(0)} className={s.label}>About</motion.p>
      <motion.h1 {...item(0.07)} className={s.title}>
        Building things<br />for the web.
      </motion.h1>
      <motion.p {...item(0.14)} className={s.body}>
        I'm a full stack developer based in [City]. I design and build web applications
        with a focus on clean code, good UX, and measurable performance.
        Currently open to new opportunities.
      </motion.p>

      <motion.div {...item(0.21)} className={s.divider} />

      <motion.div {...item(0.28)} className={s.tags}>
        {skills.map((sk) => (
          <span key={sk} className={s.tag}>{sk}</span>
        ))}
      </motion.div>
    </div>
  );
}
