"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

import { Section, navSections } from "@/data/navigation"

export default function HUD({ activeSection, onNavigate, showHUD = false }: {
    activeSection: Section
    onNavigate: (section: Section) => void
    showHUD?: boolean
}) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isHudInitialMount, setIsHudInitialMount] = useState(true)

    useEffect(() => {
        if (showHUD && isHudInitialMount) {
            setIsHudInitialMount(false)
        }
    }, [showHUD, isHudInitialMount])

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(total > 0 ? window.scrollY / total : 0)
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    if (!showHUD) return null

    return (
        <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* === NAVBAR CONTAINER === */}
            <div className="absolute top-0 left-0 right-0 z-50">
                {/* Glass panel navbar - backdrop */}
                <div className={`absolute inset-x-0 top-0 h-16 bg-linear-to-b from-nx-cyan/5 via-nx-bg/10 to-nx-bg/5 backdrop-blur-md`} />

                {/* TOP NAV - Navigation buttons */}
                <div className={`absolute z-55 top-0 left-0 right-0 flex items-center justify-center px-4 sm:px-8 h-16 pointer-events-auto`}>
                    <div className="flex items-center gap-1">
                        {/* Home Button */}
                        <button
                            onClick={() => onNavigate("hero")}
                            className="group relative px-4 py-2 cursor-pointer transition-all duration-300"
                            aria-label="Navigate to home"
                            title="Home"
                        >
                            {/* Animated background on hover/active */}
                            <motion.div
                                animate={{
                                    opacity: activeSection === "hero" ? 1 : 0,
                                    scale: activeSection === "hero" ? 1 : 0.95
                                }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-linear-to-r from-nx-cyan/5 via-nx-cyan/10 to-nx-cyan/5 rounded-2xl border border-nx-cyan/10"
                            />

                            {/* Home Icon */}
                            <span className={`relative font-mono font-semibold transition-colors duration-300 select-none ${activeSection === "hero"
                                ? "text-nx-cyan"
                                : "text-nx-text-secondary group-hover:text-nx-cyan"
                                }`}>
                                ⌂
                            </span>
                        </button>

                        {/* Navigation Sections */}
                        {navSections.filter(s => s !== "hero").map((section) => (
                            <button
                                key={section}
                                onClick={() => onNavigate(section)}
                                className="group relative px-4 py-1.5 cursor-pointer transition-all duration-300"
                                aria-label={`Navigate to ${section.toUpperCase()} section`}
                            >
                                {/* Animated background on hover/active */}
                                <motion.div
                                    animate={{
                                        opacity: activeSection === section ? 1 : 0,
                                        scale: activeSection === section ? 1 : 0.95
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-linear-to-r from-nx-cyan/5 via-nx-cyan/10 to-nx-cyan/5 rounded-2xl border border-nx-cyan/10"
                                />

                                {/* Text */}
                                <span className={`relative font-mono text-xs font-semibold tracking-[0.15em] transition-colors duration-300 select-none ${activeSection === section
                                    ? "text-nx-cyan"
                                    : "text-nx-text-secondary group-hover:text-nx-cyan"
                                    }`}>
                                    {section.toUpperCase()}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Progress top line - Scroll indicator */}
                <div className={`absolute z-55 top-16 left-0 right-0 h-8 flex items-center justify-between px-4 sm:px-8 pointer-events-auto`}>
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
        </motion.div>
    )
}
