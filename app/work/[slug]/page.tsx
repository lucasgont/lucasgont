"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import styles from "../work.module.css";
import s from "@/app/sections.module.css";

const projectsData: Record<string, any> = {
    "vivage-clinique": {
        title: "Vivage Clinique",
        role: "Freelance Full-Stack Developer",
        duration: "Dec 2025 – Apr 2026",
        href: "https://vivage.pt",
        github: "https://github.com/yourusername/vivage-clinique",
        image: "/images/1.jpg",
        tags: ["Next.js", "React", "TypeScript", "PostgreSQL", "Render", "i18n", "SEO"],
        intro: "Led the complete development lifecycle of the company's web platform, from requirements analysis and Figma prototyping to backend architecture, cloud infrastructure and production deployment.",
        sections: [
            {
                title: "Platform Development",
                content: "Built and deployed a multilingual corporate platform using Next.js, React, TypeScript and PostgreSQL, including 30+ pages and dynamic treatment catalog architecture.",
            },
            {
                title: "Internationalization & SEO",
                content: "Implemented bilingual internationalization (PT/EN), dynamic routing and SEO-focused architecture to improve discoverability and scalability.",
            },
            {
                title: "Cloud Infrastructure",
                content: "Managed cloud infrastructure and production deployments using Render, optimizing application performance, scalability and operational costs.",
            },
            {
                title: "Development Workflow",
                content: "Structured the project using Git workflows and phased delivery methodology to ensure maintainability and scalable growth.",
            },
        ],
    },
    "ecommerce-platform": {
        title: "E-Commerce Platform",
        role: "Full-Stack Developer",
        duration: "TBD",
        href: "#",
        github: "https://github.com/yourusername/ecommerce-platform",
        image: "/images/1.jpg",
        tags: ["Next.js", "PostgreSQL", "Stripe"],
        intro: "A comprehensive full-stack storefront with shopping cart, user authentication, and Stripe payment integration.",
        sections: [
            {
                title: "Coming Soon",
                content: "This project page is under construction. Check back soon for detailed information.",
            },
        ],
    },
    "task-manager": {
        title: "Task Manager",
        role: "Full-Stack Developer",
        duration: "TBD",
        href: "#",
        github: "https://github.com/yourusername/task-manager",
        image: "/images/1.jpg",
        tags: ["React", "WebSocket", "Redis"],
        intro: "Real-time collaborative project management tool with drag-and-drop support.",
        sections: [
            {
                title: "Coming Soon",
                content: "This project page is under construction. Check back soon for detailed information.",
            },
        ],
    },
    "analytics-dashboard": {
        title: "Analytics Dashboard",
        role: "Full-Stack Developer",
        duration: "TBD",
        href: "#",
        github: "https://github.com/yourusername/analytics-dashboard",
        image: "/images/1.jpg",
        tags: ["React", "D3.js", "Node.js"],
        intro: "Advanced data visualization tool for processing and analyzing large event datasets.",
        sections: [
            {
                title: "Coming Soon",
                content: "This project page is under construction. Check back soon for detailed information.",
            },
        ],
    },
};

const item = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function ProjectPage() {
    const params = useParams();
    const slug = params.slug as string;
    const project = projectsData[slug];

    if (!project) {
        return (
            <div className={styles.container}>
                <motion.h1 {...item(0)}>Project not found</motion.h1>
                <motion.p {...item(0.1)}>Sorry, we couldn't find the project you're looking for.</motion.p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <motion.div {...item(0)} className={styles.header}>
                <div className={styles.breadcrumb}>
                    <a href="/#work">← Back to work</a>
                </div>
                <h1 className={styles.pageTitle}>{project.title}</h1>
                <div className={styles.meta}>
                    <div className={styles.metaItem}>
                        <span className={styles.label}>Role</span>
                        <p>{project.role}</p>
                    </div>
                    <div className={styles.metaItem}>
                        <span className={styles.label}>Duration</span>
                        <p>{project.duration}</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    {project.href !== "#" && (
                        <a href={project.href} target="_blank" rel="noopener noreferrer" className={s.btn}>
                            Visit Live
                        </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={s.btn}>
                        View on GitHub
                    </a>
                </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div {...item(0.1)} className={styles.heroImage}>
                <img src={project.image} alt={project.title} />
            </motion.div>

            {/* Intro */}
            <motion.div {...item(0.15)} className={styles.intro}>
                <p>{project.intro}</p>
            </motion.div>

            {/* Content Sections */}
            <motion.div {...item(0.2)} className={styles.content}>
                {project.sections.map((section: any, idx: number) => (
                    <section key={idx} className={styles.section}>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </section>
                ))}
            </motion.div>

            {/* Tags */}
            <motion.div {...item(0.25)} className={styles.tagsSection}>
                <h3>Tech Stack</h3>
                <div className={s.tags}>
                    {project.tags.map((tag: string) => (
                        <span key={tag} className={s.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
