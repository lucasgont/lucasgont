"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface Experience {
    title: string
    company: string
    period: string
    description: string
    achievements: string[]
}

interface Education {
    degree: string
    institution: string
    year: string
    details: string
}

interface Language {
    name: string
    level: string
}

const experiences: Experience[] = [
    {
        title: "Freelance Full-Stack Developer",
        company: "Vivage Clinique",
        period: "Dec 2025 - Apr 2026",
        description: "Led the complete development lifecycle of the company's web platform, from requirements analysis and Figma prototyping to backend architecture, cloud infrastructure and production deployment.",
        achievements: [
            "Built and deployed a multilingual corporate platform using Next.js, React, TypeScript and PostgreSQL, including 30+ pages and dynamic treatment catalog architecture",
            "Implemented bilingual internationalization (PT/EN), dynamic routing and SEO-focused architecture to improve discoverability and scalability",
            "Managed cloud infrastructure and production deployments using Render, optimizing performance, scalability and operational costs",
        ],
    },
    {
        title: "Full-Stack Developer Intern",
        company: "Filmer",
        period: "Dec 2025 - Apr 2026",
        description: "Developed and implemented full-stack features for a SaaS marketing platform using React, TypeScript, Node.js and PostgreSQL.",
        achievements: [
            "Designed and implemented a complete new user system (\"influencers\"), including frontend flows, backend logic and relational database updates",
            "Built key business features including Stripe subscriptions, metrics paywall systems and real-time chat/file management using Socket.io",
            "Expanded platform capabilities through third-party API integrations with Instagram and TikTok, supporting a 2x increase in users",
            "Led technical coordination across the development team, including code reviews, task definition, feature planning and onboarding documentation in YouTrack",
        ],
    },
    {
        title: "Web Development Intern",
        company: "Beehackers",
        period: "Jan 2025 - Jun 2025",
        description: "Learned cybersecurity fundamentals including vulnerability assessment, Linux virtualized environments and secure web development practices.",
        achievements: [
            "Explored practical applications of AI-assisted workflows in security and development environments",
        ],
    },
]

const education: Education[] = [
    {
        degree: "Microsoft Certified: Azure Fundamentals (AZ-900)",
        institution: "Microsoft",
        year: "Issued May 2026",
        details: "",
    },
    {
        degree: "Higher Technician in Web Application Development (DAW)",
        institution: "FESAC, Seville, Spain",
        year: "Sep 2024 - Apr 2026",
        details: "",
    },
]

const languages: Language[] = [
    { name: "English", level: "Professional working proficiency" },
    { name: "Spanish", level: "Native" },
    { name: "Portuguese", level: "Native" },
]

interface Stat {
    label: string
    value: string
}

const stats: Stat[] = [
    { label: "Years Experience", value: "5+" },
    { label: "Companies", value: "3" },
    { label: "Certifications", value: "2" },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
}

export default function CV({ onInView }: {
    onInView: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.2 })

    useEffect(() => {
        if (isInView) {
            onInView()
        }
    }, [isInView, onInView])

    return (
        <section ref={ref} className="relative py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-px bg-nx-cyan" />
                        <span className="font-mono text-[9px] sm:text-[10px] md:text-xs text-nx-cyan tracking-[0.4em]">
                            CURRICULUM VITAE
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
                        MY JOURNEY
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-nx-text-secondary mt-3 max-w-lg">
                        Professional experience, education, and key achievements that showcase my journey as a developer.
                    </p>
                    <motion.a
                        href="/cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block mt-6 py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-nx-cyan/10 hover:bg-nx-cyan/20 border border-nx-cyan/40 hover:border-nx-cyan text-nx-cyan font-mono text-xs sm:text-sm transition-all"
                    >
                        DOWNLOAD CV
                    </motion.a>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Experience */}
                    <div className="lg:col-span-2">
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
                            <h3 className="text-base sm:text-lg font-semibold text-nx-cyan mb-8 flex items-center gap-2">
                                <span className="text-nx-cyan/60">▸▸</span>
                                PROFESSIONAL EXPERIENCE
                            </h3>

                            <div className="space-y-8">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className="border-l-2 border-nx-cyan/30 pl-6 hover:border-nx-cyan/60 transition-colors"
                                    >
                                        <h4 className="text-base sm:text-lg font-semibold text-nx-text">{exp.title}</h4>
                                        <p className="text-xs sm:text-sm text-nx-cyan/80 font-mono">{exp.company}</p>
                                        <p className="text-[11px] sm:text-xs text-nx-text-secondary/70 font-mono tracking-wide mt-1">
                                            {exp.period}
                                        </p>
                                        <p className="text-xs sm:text-sm text-nx-text-secondary/70 mt-3">{exp.description}</p>

                                        <ul className="mt-3 space-y-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-xs sm:text-sm text-nx-text-secondary/70 flex gap-2"
                                                >
                                                    <span className="text-nx-cyan/60 shrink-0">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Education & Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="space-y-8">
                            {/* Education */}
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-nx-cyan mb-6 flex items-center gap-2">
                                    <span className="text-nx-cyan/60">▸▸</span>
                                    EDUCATION
                                </h3>

                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary hover:bg-nx-bg/50 transition-colors"
                                        >
                                            <h4 className="font-semibold text-nx-text text-xs sm:text-sm mb-1">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-[11px] sm:text-xs text-nx-cyan/80 font-mono">{edu.institution}</p>
                                            <p className="text-[11px] sm:text-xs text-nx-text-secondary/70 mt-1">{edu.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-nx-cyan mb-6 flex items-center gap-2">
                                    <span className="text-nx-cyan/60">▸▸</span>
                                    LANGUAGES
                                </h3>

                                <div className="space-y-3">
                                    {languages.map((lang, index) => (
                                        <div
                                            key={index}
                                            className="p-3 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary flex items-center justify-between gap-2"
                                        >
                                            <p className="text-xs sm:text-sm font-semibold text-nx-text">{lang.name}</p>
                                            <p className="text-[11px] sm:text-xs text-nx-text-secondary/70 font-mono">{lang.level}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-nx-cyan mb-6 flex items-center gap-2">
                                    <span className="text-nx-cyan/60">▸▸</span>
                                    STATS
                                </h3>

                                <div className="grid grid-cols-3 gap-3 sm:space-y-3 sm:grid-cols-1">
                                    {stats.map((stat, index) => (
                                        <div key={index} className="p-3 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary">
                                            <p className="text-center sm:text-left text-[10px] sm:text-xs text-nx-text-secondary/70 uppercase tracking-wider">
                                                {stat.label}
                                            </p>
                                            <p className="text-center sm:text-left text-xl sm:text-2xl font-bold text-nx-cyan mt-1">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
