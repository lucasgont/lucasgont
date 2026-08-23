"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Menu from "./Menu";
import styles from "./Content.module.css";
import s from "@/app/sections.module.css";
import CVPage from "@/app/cv/page";
import AboutPage from "@/app/about/page";
import ContactPage from "@/app/contact/page";

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

function WorkPage() {
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

export default function Content() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const [showSidebar, setShowSidebar] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            if (scrollContainerRef.current) {
                // Show sidebar when scrolled past the hero section (100vh)
                const scrolled = scrollContainerRef.current.scrollTop > window.innerHeight * 0.5;
                setShowSidebar(scrolled);
            }
        };

        const container = scrollContainerRef.current;
        container?.addEventListener("scroll", handleScroll);
        return () => container?.removeEventListener("scroll", handleScroll);
    }, [isHome]);

    if (isHome) {
        return (
            <div className={styles.root}>
                {/* Main content */}
                <div className={styles.scrollContainer} ref={scrollContainerRef}>
                    {/* Hero Section */}
                    <div className={styles.homeScreen} id="hero">
                        <Menu isHome />
                    </div>

                    {/* Sections */}
                    <div className={styles.sectionsWrapper}>
                        <section id="work">
                            <WorkPage />
                        </section>
                        <section id="about">
                            <AboutPage />
                        </section>
                        <section id="cv">
                            <CVPage />
                        </section>
                        <section id="contact">
                            <ContactPage />
                        </section>
                    </div>
                </div>
            </div>
        );
    }

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

                </main>
            </div>
        </div>
    );
}
