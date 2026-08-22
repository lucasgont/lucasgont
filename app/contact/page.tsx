"use client";

import { motion } from "framer-motion";
import s from "@/app/sections.module.css";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const links = [
  { icon: "✉",  title: "Email",       sub: "your@email.com",              href: "mailto:your@email.com" },
  { icon: "in", title: "LinkedIn",     sub: "linkedin.com/in/yourprofile", href: "https://linkedin.com/in/yourprofile" },
  { icon: "gh", title: "GitHub",       sub: "github.com/yourprofile",      href: "https://github.com/yourprofile" },
  { icon: "𝕏",  title: "Twitter / X", sub: "@yourhandle",                 href: "https://x.com/yourhandle" },
];

export default function ContactPage() {
  return (
    <div className={s.page}>
      <motion.p {...item(0)} className={s.label}>Contact</motion.p>
      <motion.h1 {...item(0.07)} className={s.title}>Let's work together</motion.h1>
      <motion.p {...item(0.14)} className={s.body}>
        Open to freelance work, full-time roles, and interesting collaborations.
        Reach out through any of the channels below.
      </motion.p>

      <motion.div {...item(0.21)} className={s.rows}>
        {links.map((l) => (
          <motion.a
            key={l.title}
            href={l.href}
            target={l.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={s.rowLink}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span className={s.rowIcon}>{l.icon}</span>
            <span className={s.rowMeta}>
              <span className={s.rowTitle}>{l.title}</span>
              <span className={s.rowSub} style={{ display: "block" }}>{l.sub}</span>
            </span>
            <span className={s.rowArrow}>→</span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
