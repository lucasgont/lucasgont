"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ContactSectionProps {
    onInView: () => void;
}

export default function ContactSection({ onInView }: ContactSectionProps) {
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
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of. Let's connect!
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 glass-panel rounded-xl p-6 sm:p-8"
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-nx-border">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-nx-red" />
                                <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                                <div className="w-2 h-2 rounded-full bg-nx-green/60" />
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isTransmitting ? "bg-yellow-500 animate-pulse" : "bg-nx-green"
                                    }`} />
                                <span className="font-mono text-[10px] text-nx-text-muted tracking-wider">
                                    {isTransmitting ? "TRANSMITTING..." : "CHANNEL OPEN"}
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="font-mono text-[10px] text-nx-text-muted tracking-wider block mb-2">
                                    CALLSIGN
                                </label>
                                <input
                                    type="text"
                                    value={formState.name}
                                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                                    required
                                    className={inputClasses}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="font-mono text-[10px] text-nx-text-muted tracking-wider block mb-2">
                                    FREQUENCY
                                </label>
                                <input
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                                    required
                                    className={inputClasses}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="font-mono text-[10px] text-nx-text-muted tracking-wider block mb-2">
                                    TRANSMISSION
                                </label>
                                <textarea
                                    value={formState.message}
                                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                                    required
                                    rows={5}
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Your message..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isTransmitting}
                                className="w-full py-3.5 rounded-lg font-mono text-sm tracking-[0.15em]
                  bg-nx-cyan/10 border border-nx-cyan/30 text-nx-cyan
                  hover:bg-nx-cyan/20 hover:shadow-[0_0_25px_rgba(0,212,255,0.15)]
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                  relative overflow-hidden group"
                            >
                                {isTransmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="animate-pulse">◉</span> TRANSMITTING...
                                    </span>
                                ) : transmitted ? (
                                    <span className="text-nx-green flex items-center justify-center gap-2">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        TRANSMISSION RECEIVED
                                    </span>
                                ) : (
                                    <>
                                        <span className="relative z-10">TRANSMIT →</span>
                                        <div className="absolute inset-0 bg-nx-cyan/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-2 space-y-5"
                    >
                        {/* Direct links */}
                        <div className="glass-panel rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-nx-border">
                                <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                                <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">DIRECT LINKS</span>
                            </div>

                            <div className="space-y-2">
                                {[
                                    { label: "GITHUB", handle: "@lucas-dev", href: "https://github.com", icon: "⬡" },
                                    { label: "LINKEDIN", handle: "/in/lucas", href: "https://linkedin.com", icon: "◈" },
                                    { label: "EMAIL", handle: "hello@lucas.dev", href: "mailto:hello@lucas.dev", icon: "◇" },
                                ].map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between py-3 px-4 rounded-lg border border-nx-border
                      hover:border-nx-cyan/30 hover:bg-nx-cyan/5 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-nx-text-muted group-hover:text-nx-cyan transition-colors text-sm">{link.icon}</span>
                                            <span className="font-mono text-[10px] text-nx-text-muted tracking-wider">{link.label}</span>
                                        </div>
                                        <span className="font-mono text-xs text-nx-text-secondary group-hover:text-nx-cyan transition-colors">
                                            {link.handle}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Signal status */}
                        <div className="glass-panel rounded-xl p-6">
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-nx-border">
                                <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                                <span className="font-mono text-[10px] text-nx-text-muted tracking-[0.2em]">SIGNAL STATUS</span>
                            </div>
                            <div className="space-y-3 font-mono text-xs">
                                {[
                                    { label: "Response time", value: "< 24h", color: "text-nx-green" },
                                    { label: "Availability", value: "OPEN", color: "text-nx-green" },
                                    { label: "Location", value: "SPAIN", color: "text-nx-text-secondary" },
                                    { label: "Remote", value: "YES", color: "text-nx-green" },
                                ].map((item) => (
                                    <div key={item.label} className="flex justify-between items-center">
                                        <span className="text-nx-text-muted">{item.label}</span>
                                        <span className={item.color}>{item.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Signal strength visual */}
                            <div className="mt-5 pt-4 border-t border-nx-border">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-mono text-[10px] text-nx-text-muted">SIGNAL STRENGTH</span>
                                </div>
                                <div className="flex items-end gap-1 h-6">
                                    {[0.3, 0.5, 0.65, 0.8, 0.95].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className="flex-1 bg-nx-cyan rounded-sm"
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h * 100}%` }}
                                            transition={{ delay: i * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            style={{ opacity: 0.4 + i * 0.15 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
