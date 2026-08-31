"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface CVSectionProps {
    onInView: () => void;
    onNavigate?: (section: string) => void;
}

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    achievements: string[];
}

interface Education {
    degree: string;
    institution: string;
    year: string;
    details: string;
}

const experiences: Experience[] = [
    {
        title: "Senior Full-Stack Developer",
        company: "TechCorp Solutions",
        period: "2023 - Present",
        description: "Leading development of cloud-native microservices architecture",
        achievements: [
            "Architected and deployed 5+ production microservices using Node.js and Next.js",
            "Implemented CI/CD pipelines reducing deployment time by 70%",
            "Mentored team of 4 junior developers",
        ],
    },
    {
        title: "Full-Stack Developer",
        company: "Startup Ventures",
        period: "2021 - 2023",
        description: "Built scalable web applications and backend systems",
        achievements: [
            "Developed RESTful APIs handling 100K+ daily requests",
            "Implemented real-time features using WebSockets",
            "Optimized database queries improving performance by 45%",
        ],
    },
    {
        title: "Junior Developer",
        company: "Digital Innovations",
        period: "2020 - 2021",
        description: "Frontend development and bug fixes",
        achievements: [
            "Built 10+ responsive web components using React",
            "Improved code coverage from 40% to 85%",
            "Participated in agile development workflows",
        ],
    },
];

const education: Education[] = [
    {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Technology",
        year: "2020",
        details: "GPA: 3.8/4.0 | Honors: Cum Laude",
    },
    {
        degree: "AWS Certified Solutions Architect",
        institution: "Amazon Web Services",
        year: "2022",
        details: "Professional Level Certification",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function CV({ onInView, onNavigate }: CVSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2 });

    useEffect(() => {
        if (isInView) {
            onInView();
        }
    }, [isInView, onInView]);

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
                        <span className="font-mono text-[10px] sm:text-xs text-nx-cyan tracking-[0.4em]">
                            CURRICULUM VITAE
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
                        MY JOURNEY
                    </h2>
                    <p className="font-mono text-sm text-nx-text-secondary mt-3 max-w-lg">
                        Professional experience, education, and key achievements that showcase my journey as a developer.
                    </p>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Experience */}
                    <div className="lg:col-span-2">
                        <motion.div variants={containerVariants} initial="hidden" whileInView="visible">
                            <h3 className="text-lg font-semibold text-nx-cyan mb-8 flex items-center gap-2">
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
                                        <h4 className="text-lg font-semibold text-nx-text">{exp.title}</h4>
                                        <p className="text-sm text-nx-cyan/80 font-mono">{exp.company}</p>
                                        <p className="text-xs text-nx-text-muted font-mono tracking-wide mt-1">
                                            {exp.period}
                                        </p>
                                        <p className="text-sm text-nx-text-muted mt-3">{exp.description}</p>

                                        <ul className="mt-3 space-y-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="text-sm text-nx-text-muted flex gap-2"
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
                                <h3 className="text-lg font-semibold text-nx-cyan mb-6 flex items-center gap-2">
                                    <span className="text-nx-cyan/60">▸▸</span>
                                    EDUCATION
                                </h3>

                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary hover:bg-nx-bg/50 transition-colors"
                                        >
                                            <h4 className="font-semibold text-nx-text text-sm mb-1">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-xs text-nx-cyan/80 font-mono">{edu.institution}</p>
                                            <p className="text-xs text-nx-text-muted mt-1">{edu.year}</p>
                                            <p className="text-xs text-nx-text-muted mt-2 border-t border-nx-border pt-2">
                                                {edu.details}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div>
                                <h3 className="text-lg font-semibold text-nx-cyan mb-6 flex items-center gap-2">
                                    <span className="text-nx-cyan/60">▸▸</span>
                                    STATS
                                </h3>

                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary">
                                        <p className="text-xs text-nx-text-muted uppercase tracking-wider">
                                            Years Experience
                                        </p>
                                        <p className="text-2xl font-bold text-nx-cyan mt-1">6+</p>
                                    </div>
                                    <div className="p-3 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary">
                                        <p className="text-xs text-nx-text-muted uppercase tracking-wider">
                                            Projects Completed
                                        </p>
                                        <p className="text-2xl font-bold text-nx-cyan mt-1">50+</p>
                                    </div>
                                    <div className="p-3 rounded-lg border border-nx-cyan/20 bg-nx-bg-secondary">
                                        <p className="text-xs text-nx-text-muted uppercase tracking-wider">
                                            Certifications
                                        </p>
                                        <p className="text-2xl font-bold text-nx-cyan mt-1">5</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onNavigate?.("contact")}
                                className="w-full py-3 px-4 rounded-lg bg-nx-cyan/10 hover:bg-nx-cyan/20 border border-nx-cyan/40 hover:border-nx-cyan text-nx-cyan font-mono text-sm transition-all"
                            >
                                GET IN TOUCH
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
