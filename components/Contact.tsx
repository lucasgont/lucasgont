"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ContactSectionProps {
    onInView: () => void;
}

const GitHubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const EmailIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
);

export default function Contact({ onInView }: ContactSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.2 });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [transmitted, setTransmitted] = useState(false);

    useEffect(() => {
        if (isInView) onInView();
    }, [isInView, onInView]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsTransmitting(true);
        setTimeout(() => {
            setIsTransmitting(false);
            setTransmitted(true);
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setTransmitted(false), 3000);
        }, 2000);
    };

    const inputClasses =
        "w-full bg-nx-surface/50 border border-nx-border rounded-lg px-4 py-3 font-mono text-sm text-nx-text focus:outline-none focus:border-nx-cyan/40 focus:shadow-[0_0_15px_rgba(0,212,255,0.08)] transition-all duration-300 placeholder:text-nx-text-muted/30";

    const socialLinks = [
        {
            label: "GITHUB",
            handle: "@lucasgont",
            href: "https://github.com/lucasgont",
            icon: GitHubIcon,
            color: "from-slate-400 to-slate-300",
        },
        {
            label: "LINKEDIN",
            handle: "/in/lucasgont",
            href: "https://www.linkedin.com/in/lucasgont/",
            icon: LinkedInIcon,
            color: "from-blue-400 to-blue-300",
        },
        {
            label: "EMAIL",
            handle: "gontijoguimaraeslucas@gmail.com",
            href: "mailto:gontijoguimaraeslucas@gmail.com",
            icon: EmailIcon,
            color: "from-cyan-400 to-cyan-300",
        },
    ];

    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col justify-center px-4 sm:px-6 py-24 sm:py-32"
        >
            <div className="max-w-4xl mx-auto w-full">
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
                            CONTACT ME
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
                        GET IN TOUCH
                    </h2>
                    <p className="font-mono text-sm text-nx-text-secondary mt-3">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1">
                    {/* Direct links */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-5"
                    >
                        <div className="glass-panel rounded-xl p-8">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-nx-border">
                                <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                                <span className="font-mono text-[10px] text-nx-cyan tracking-[0.2em] font-semibold">DIRECT LINKS</span>
                            </div>

                            <div className="space-y-3">
                                {socialLinks.map((link) => {
                                    const IconComponent = link.icon;
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-between py-4 px-5 rounded-lg border border-nx-border/60
                      hover:border-nx-cyan/50 hover:bg-nx-cyan/10 transition-all duration-300 group
                      relative overflow-hidden"
                                        >
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-nx-cyan/0 to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-opacity duration-300" />

                                            <div className="flex items-center gap-4 relative z-10">
                                                <div className="p-2 rounded-lg">
                                                    <div className="text-nx-cyan">
                                                        <IconComponent />
                                                    </div>
                                                </div>
                                                <span className="font-mono text-[11px] font-semibold text-nx-text-secondary group-hover:text-nx-cyan transition-colors duration-300 tracking-wider">
                                                    {link.label}
                                                </span>
                                            </div>
                                            <span className="font-mono text-xs text-nx-text-secondary group-hover:text-nx-cyan transition-colors duration-300 relative z-10">
                                                {link.handle}
                                            </span>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
