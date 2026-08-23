"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
        title: "Vivage Clinique",
        subtitle: "Freelance Full-Stack Developer · Dec 2025 – Apr 2026",
        desc: "Led the complete development lifecycle of a multilingual corporate platform using Next.js, React, TypeScript and PostgreSQL, featuring 30+ pages and a dynamic treatment catalog. Implemented PT/EN internationalization, dynamic routing, SEO-focused architecture, and managed cloud infrastructure on Render.",
        tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Render", "i18n", "SEO"],
        images: ["/images/1.jpg", "/images/1.jpg"],
        live: "https://vivage.pt",
        github: "https://github.com/yourusername/vivage-clinique",
    },
    {
        title: "E-Commerce Platform",
        desc: "Full-stack storefront with cart, auth, and Stripe payments.",
        tags: ["Next.js", "PostgreSQL", "Stripe"],
        images: ["/images/1.jpg", "/images/1.jpg"],
        live: "#",
        github: "https://github.com/yourusername/ecommerce-platform",
    },
    {
        title: "Task Manager",
        desc: "Real-time collaborative boards with drag-and-drop support.",
        tags: ["React", "WebSocket", "Redis"],
        images: ["/images/1.jpg", "/images/1.jpg"],
        live: "#",
        github: "https://github.com/yourusername/task-manager",
    },
    {
        title: "Analytics Dashboard",
        desc: "Data visualisation tool for processing large event datasets.",
        tags: ["React", "D3.js", "Node.js"],
        images: ["/images/1.jpg", "/images/1.jpg"],
        live: "#",
        github: "https://github.com/yourusername/analytics-dashboard",
    },
];

function WorkPage() {
    return (
        <div className={s.page}>
            <motion.p {...item(0)} className={s.label}>Work</motion.p>
            <motion.h1 {...item(0.07)} className={s.title}>Selected work</motion.h1>

            <motion.div {...item(0.14)} className={`${s.grid} ${s.grid1}`}>
                {projects.map((p) => (
                    <motion.div
                        key={p.title}
                        className={s.card}
                    >
                        <div className={s.cardImages}>
                            {p.images.map((img, idx) => (
                                <div key={idx} className={s.cardImage}>
                                    <img src={img} alt={`${p.title} screenshot ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                        <div className={s.cardContent}>
                            <p className={s.cardTitle}>{p.title}</p>
                            <p className={s.cardText}>{p.desc}</p>
                            <div className={s.tags}>
                                {p.tags.map((t) => (
                                    <span key={t} className={s.tag}>{t}</span>
                                ))}
                            </div>
                            <div className={s.cardActions}>
                                {p.live && p.live !== "#" && (
                                    <a
                                        href={p.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={s.btn}
                                    >
                                        Live Project
                                    </a>
                                )}
                                {p.github && (
                                    <a
                                        href={p.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={s.btn}
                                    >
                                        GitHub
                                    </a>
                                )}
                                <Link
                                    href={`/work/${p.title.toLowerCase().replace(/\s+/g, "-")}`}
                                    className={s.btn}
                                >
                                    See Project
                                </Link>
                            </div>
                        </div>
                    </motion.div>
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
