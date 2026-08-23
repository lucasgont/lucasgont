"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Menu.module.css";

const NAV = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/cv", label: "CV" },
    { href: "/contact", label: "Contact" },
];

interface MenuProps {
    isHome?: boolean;
    pathname?: string;
}

export default function Menu({ isHome = false, pathname = "" }: MenuProps) {
    return (
        <div className={`${styles.menu} ${isHome ? styles.home : styles.sidebar}`}>

            {/* Brand */}
            <motion.div
                className={styles.brand}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/" className={styles.brandLink}>
                    <span className={styles.brandName}>Lucas Gontijo</span>
                </Link>
                {isHome && (
                    <motion.p
                        className={styles.brandRole}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                    >
                        Software Engineer | Full-Stack Developer
                    </motion.p>
                )}
            </motion.div>

            {/* Nav */}
            <nav className={styles.nav}>
                {NAV.map((item, i) => {
                    const active = pathname === item.href;
                    return (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: 0.15 + i * 0.07,
                                duration: 0.4,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <Link
                                href={item.href}
                                className={`${styles.item} ${active ? styles.active : ""}`}
                            >
                                {active && !isHome && (
                                    <motion.span
                                        layoutId="indicator"
                                        className={styles.indicator}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />
                                )}
                                <motion.span
                                    className={styles.label}
                                    whileHover={{ x: isHome ? 5 : 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {item.label}
                                </motion.span>
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Footer */}
            {isHome && (
                <motion.p
                    className={styles.hint}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    Built with curiosity, shipped with intention.
                </motion.p>
            )}
        </div>
    );
}
