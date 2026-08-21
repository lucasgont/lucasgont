"use client";

import { motion } from "framer-motion";
import s from "@/app/sections.module.css";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const experience = [
  { year: "2023–",    title: "Senior Developer",        org: "Tech Company Inc." },
  { year: "2021–23",  title: "Full Stack Developer",     org: "Startup Studio" },
  { year: "2019–21",  title: "Junior Developer",         org: "Web Agency" },
];

const education = [
  { year: "2018–19",  title: "BSc Computer Science",    org: "University Name" },
];

export default function CVPage() {
  return (
    <div className={s.page}>
      <motion.p {...item(0)} className={s.label}>CV</motion.p>
      <motion.h1 {...item(0.07)} className={s.title}>Résumé</motion.h1>

      <motion.a
        {...item(0.14)}
        href="/resume.pdf"
        download
        className={s.btn}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        ↓ Download PDF
      </motion.a>

      <motion.div {...item(0.21)} className={s.divider} />

      <motion.p {...item(0.28)} className={s.label}>Experience</motion.p>
      <motion.div {...item(0.35)} className={s.timeline}>
        {experience.map((e) => (
          <div key={e.title} className={s.timeEntry}>
            <span className={s.entryYear}>{e.year}</span>
            <div>
              <p className={s.entryTitle}>{e.title}</p>
              <p className={s.entryOrg}>{e.org}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div {...item(0.42)} className={s.divider} />

      <motion.p {...item(0.49)} className={s.label}>Education</motion.p>
      <motion.div {...item(0.56)} className={s.timeline}>
        {education.map((e) => (
          <div key={e.title} className={s.timeEntry}>
            <span className={s.entryYear}>{e.year}</span>
            <div>
              <p className={s.entryTitle}>{e.title}</p>
              <p className={s.entryOrg}>{e.org}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
