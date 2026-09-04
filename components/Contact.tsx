"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { contactIcons } from "@/lib/contact"
import { contactLinks } from "@/data/contact"

const info = {
    title: "GET IN TOUCH",
    subtitle: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of.",
    section: "CONTACT ME",
}

export default function Contact({ onInView }: {
    onInView: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.2 })

    useEffect(() => {
        if (isInView) onInView()
    }, [isInView, onInView])

    return (
        <section
            ref={ref}
            className="min-h-screen flex flex-col justify-center px-6 py-24"
        >
            <div className="max-w-6xl mx-auto w-full">
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
                            {info.section}
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-nx-text tracking-tight">
                        {info.title}
                    </h2>
                    <p className="font-mono text-sm text-nx-text-secondary mt-3">
                        {info.subtitle}
                    </p>
                </motion.div>

                <div className="w-full">
                    {/* Direct links */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2 sm:space-y-3"
                    >
                        <div className="glass-panel rounded-lg sm:rounded-xl p-4 sm:p-6">
                            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-nx-border">
                                <div className="w-1.5 h-1.5 bg-nx-cyan rounded-full" />
                                <span className="font-mono sm:text-[10px] text-[8px] text-nx-cyan tracking-[0.2em] font-semibold">DIRECT LINKS</span>
                            </div>

                            <div className="sm:space-y-3 space-y-2">
                                {contactLinks.map((link) => {
                                    const IconComponent = contactIcons[link.label]
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-3 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border border-nx-border/60 hover:border-nx-cyan/50 hover:bg-nx-cyan/10 transition-all duration-300 group relative overflow-hidden"
                                        >
                                            {/* Glow effect on hover */}
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-nx-cyan/0 to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse transition-opacity duration-300" />

                                            <div className="p-1.5 sm:p-2 rounded-lg shrink-0">
                                                <div className="text-nx-cyan text-sm sm:text-base">
                                                    {IconComponent && <IconComponent />}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-4">
                                                <span className="font-mono text-[12px] sm:text-[14px] font-semibold text-nx-text-secondary group-hover:text-nx-cyan transition-colors duration-300 tracking-wider block truncate">
                                                    {link.label}
                                                </span>
                                                <span className="font-mono text-[10px] sm:text-[12px] text-nx-text-secondary/70 group-hover:text-nx-cyan/70 transition-colors duration-300 block truncate">
                                                    {link.handle}
                                                </span>
                                            </div>
                                        </motion.a>
                                    )
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
