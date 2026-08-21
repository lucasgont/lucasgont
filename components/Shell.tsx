"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Menu from "./Menu";
import styles from "./Shell.module.css";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={styles.root}>

      {/* ── Persistent HUD bar ── */}
      <div className={styles.hud}>
        <div className={styles.hudLeft}>
          <span className={styles.hudDot} />
          <span>SYS::ONLINE</span>
          <span className={styles.sep}>//</span>
          <span>PORTFOLIO_v2</span>
        </div>
        <div className={styles.hudCenter}>LUCAS GONT</div>
        <div className={styles.hudRight}>
          <span>ENC::ACTIVE</span>
          <span className={styles.sep}>//</span>
          <span>2026</span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        {isHome ? (
          <div className={styles.homeScreen}>
            <Menu isHome />
          </div>
        ) : (
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
        )}
      </div>

    </div>
  );
}
