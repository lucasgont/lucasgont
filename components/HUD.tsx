"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { HUDItem, Section, sections, navSections } from "@/data/navigation"

export default function HUD({ activeSection, onNavigate, showHUD = false }: {
    activeSection: Section
    onNavigate: (section: string) => void
    showHUD?: boolean
}) {
    const [scrollProgress, setScrollProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(total > 0 ? window.scrollY / total : 0)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (!showHUD) return null

    const hudSection: HUDItem = sections[activeSection]

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* === TOP BAR === */}
            <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-4 sm:px-8">
                {/* Center: Section indicator */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden sm:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] select-none"
                        >
                            <span className="text-nx-cyan">{hudSection.number}</span>
                            <div className="w-6 h-px bg-nx-border-bright" />
                            <span className="text-nx-text-muted">{hudSection.name}</span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* === LEFT SIDE NAV === */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto">
                {navSections.map((section, i) => (
                    <button
                        key={section}
                        onClick={() => onNavigate(section)}
                        className="group relative flex items-center cursor-pointer transition-transform duration-300 w-25 h-5"
                        aria-label={`Navigate to ${hudSection.name}`}
                    >
                        {/* Line connector */}
                        {i < navSections.length - 1 && (
                            <div className="absolute top-full left-1 -translate-x-1/2 w-px h-6 bg-nx-border transition-colors duration-300 group-hover:bg-nx-cyan/40" />
                        )}
                        {/* Dot */}
                        <div className="relative">
                            <div
                                className={`w-2 h-2 transition-all duration-300 ${activeSection === section
                                    ? "bg-nx-cyan scale-125 shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                                    : "bg-nx-text-muted/50 group-hover:bg-nx-cyan group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(0,212,255,0.7)]"
                                    }`}
                                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                            />
                            {activeSection === section && (
                                <div className="absolute inset-0 w-2 h-2 bg-nx-cyan/30 pulse-ring"
                                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                            )}
                        </div>
                        {/* Label */}
                        <span className={`absolute left-6 font-mono text-[9px] tracking-[0.15em] whitespace-nowrap transition-all duration-300 select-none ${activeSection === section
                            ? "text-nx-cyan opacity-100 translate-x-0"
                            : "text-nx-text-muted opacity-0 -translate-x-2 group-hover:text-nx-cyan group-hover:opacity-100 group-hover:translate-x-0"
                            }`}>
                            {hudSection.name}
                        </span>
                    </button>
                ))}
            </div>

            {/* === BOTTOM BAR === */}
            <div className="absolute bottom-6 left-0 right-0 h-10 flex items-center justify-between px-4 sm:px-8">
                {/* Scroll progress bar */}
                <div className="absolute top-0 left-0 right-0 h-px bg-nx-border/50 hidden sm:block">
                    <motion.div
                        className="h-full bg-linear-to-r from-nx-cyan/0 via-nx-cyan to-nx-cyan/0"
                        style={{
                            width: "20%",
                            transform: `translateX(${scrollProgress * 400}%)`
                        }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </div>

            {/* === CORNER DECORATIONS === */}
            { /* Top-left */}
            <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 w-18 h-18 text-nx-cyan/25" viewBox="0 0 32 32">
                <path d="M0 8V0h8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            {/* Top-right */}
            <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 w-18 h-18 text-nx-cyan/25" viewBox="0 0 32 32">
                <path d="M32 8V0h-8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            {/* Bottom-left */}
            <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-18 h-18 text-nx-cyan/25" viewBox="0 0 32 32">
                <path d="M0 24v8h8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
            {/* Bottom-right */}
            <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-18 h-18 text-nx-cyan/25" viewBox="0 0 32 32">
                <path d="M32 24v8h-8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        </div>
    )
}
