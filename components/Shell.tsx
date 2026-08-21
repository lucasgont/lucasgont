"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "./Menu";
import styles from "./Shell.module.css";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Home: full-screen start menu (children not rendered — Menu is the content)
  if (isHome) {
    return (
      <div className={styles.root}>
        <div className={styles.homeScreen}>
          <Menu isHome />
        </div>
      </div>
    );
  }

  // Section: sidebar + content
  // motion.aside animates in once on home→section transition.
  // Between sections it stays mounted so it never re-animates.
  return (
    <div className={styles.root}>
      <div className={styles.appShell}>
        <motion.aside
          className={styles.sidebar}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Menu pathname={pathname} />
        </motion.aside>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
