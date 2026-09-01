"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"

import { menuItems, Section } from "@/data/navigation"

const bootLines = [
    { text: "Connecting to the server...", delay: 200 },
    { text: "Establishing secure connection...", delay: 300 },
    { text: "Fetching project data and experience...", delay: 200 },
    { text: "Rendering portfolio...", delay: 300 },
    { text: "Ready to explore", delay: 400 },
]

function useTypewriter(text: string, speed: number = 30, delay: number = 0) {
    const [displayed, setDisplayed] = useState("")
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>
        const timeoutId = setTimeout(() => {
            let i = 0
            intervalId = setInterval(() => {
                if (i <= text.length) {
                    setDisplayed(text.slice(0, i))
                    i++
                } else {
                    setIsDone(true)
                    clearInterval(intervalId)
                }
            }, speed)
        }, delay)
        return () => {
            clearTimeout(timeoutId)
            if (intervalId) clearInterval(intervalId)
        }
    }, [text, speed, delay])

    return { displayed, isDone }
}

export default function Hero({ onNavigate, onInView, onLucasAppear }: {
    onNavigate: (section: Section) => void
    onInView: () => void
    onLucasAppear: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.5 })
    const [phase, setPhase] = useState(0)
    const [hoveredItem, setHoveredItem] = useState<number | null>(null)
    const [bootIndex, setBootIndex] = useState(0)

    useEffect(() => {
        if (isInView) onInView()
    }, [isInView, onInView])

    useEffect(() => {
        if (phase >= 2) {
            onLucasAppear?.()
        }
    }, [phase, onLucasAppear])

    // Boot sequence phases
    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 300),   // Boot text starts
            setTimeout(() => setPhase(2), 2400),   // Title reveal
            setTimeout(() => setPhase(3), 3200),   // Menu items
            setTimeout(() => setPhase(4), 4000),   // Everything ready
        ]
        return () => timers.forEach(clearTimeout)
    }, [])

    // Boot line progression
    useEffect(() => {
        if (phase < 1 || bootIndex >= bootLines.length) return
        const timer = setTimeout(() => {
            setBootIndex((prev) => prev + 1)
        }, bootLines[bootIndex]?.delay ?? 400)
        return () => clearTimeout(timer)
    }, [phase, bootIndex])

    const titleText = useTypewriter("LUCAS", 80, 2400)
    const isBootPhase = phase >= 1 && phase < 2

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex flex-col items-center justify-center px-6"
        >
            {/* Hex grid decorative element */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="relative w-150 h-150 opacity-[0.03]">
                    <div className="absolute inset-0 border border-nx-cyan rounded-full animate-hex-rotate" />
                    <div className="absolute inset-12 border border-nx-cyan/50 rounded-full animate-hex-rotate" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
                    <div className="absolute inset-24 border border-nx-cyan/30 rounded-full animate-hex-rotate" style={{ animationDuration: "40s" }} />
                </div>
            </div>

            <div className="relative z-10 max-w-3xl w-full">
                {isBootPhase ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-panel rounded-lg p-6 mb-8"
                    >
                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-nx-border">
                            <div className="w-2 h-2 rounded-full bg-nx-red" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                            <div className="w-2 h-2 rounded-full bg-nx-green/60" />
                            <span className="ml-3 font-mono text-[10px] text-nx-text-muted tracking-wider">TERMINAL</span>
                        </div>
                        <div className="space-y-1.5">
                            {bootLines.slice(0, bootIndex).map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-mono text-xs"
                                >
                                    <span className="text-nx-cyan/60 mr-2">{">"}</span>
                                    <span className={i === bootLines.length - 1 ? "text-nx-green" : "text-nx-text-secondary"}>
                                        {line.text}
                                    </span>
                                </motion.div>
                            ))}
                            <span className="text-nx-cyan animate-blink font-mono text-xs">█</span>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        {/* Phase 2: Main title */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.95 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="mb-12"
                            style={{ pointerEvents: phase >= 2 ? "auto" : "none" }}
                        >
                            {/* Classification badge */}
                            <motion.div
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="inline-flex items-center gap-3 mb-4 px-4 py-2 rounded-full border border-nx-cyan/20 bg-nx-cyan/5"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-nx-cyan animate-pulse" />
                                <span className="font-mono text-[10px] tracking-[0.3em] text-nx-cyan">SEVILLE, SPAIN ─ REMOTE</span>
                            </motion.div>

                            {/* Main name */}
                            <div className="relative mb-3">
                                <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-nx-text">
                                    {titleText.displayed}
                                    {!titleText.isDone && <span className="text-nx-cyan animate-blink">|</span>}
                                </h1>
                                {/* Glow behind text */}
                                <div className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-nx-cyan/5 blur-2xl select-none pointer-events-none" aria-hidden>
                                    LUCAS
                                </div>
                            </div>

                            {/* Subtitle with animated line */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
                                className="flex items-center"
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.6, duration: 2, ease: "easeOut" }}
                                    style={{ originX: 0 }}
                                    className="h-px w-12 sm:w-20 bg-linear-to-r from-nx-cyan to-transparent"
                                />
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 2.5, ease: "easeInOut" }}
                                    className="font-mono text-sm sm:text-base tracking-[0.2em] text-nx-text-secondary whitespace-nowrap mx-4"
                                >
                                    FULLSTACK DEVELOPER
                                </motion.span>
                                <motion.div
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 2, ease: "easeInOut" }}
                                    style={{ originX: 1 }}
                                    className="h-px flex-1 bg-linear-to-r from-transparent via-nx-cyan to-transparent"
                                />
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
                                className="mt-4 font-mono text-xs text-nx-text-secondary/60"
                            >
                                I turn complex requirements and business needs into practical, production-ready solutions.
                                <br />
                                Building with curiosity and delivering with intention.
                            </motion.p>
                        </motion.div>

                        {/* Phase 3: Navigation cards */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 3 ? 1 : 0 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-16"
                            style={{ pointerEvents: phase >= 3 ? "auto" : "none" }}
                        >
                            {menuItems.map((item, i) => (
                                <motion.button
                                    key={item.section}
                                    initial={{ opacity: 0, y: 25 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.8 + i * 0.15, duration: 0.7, ease: "easeOut" }}
                                    onClick={() => onNavigate(item.section)}
                                    onMouseEnter={() => setHoveredItem(i)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`group relative p-5 text-left transition-all duration-300 rounded-lg overflow-hidden cursor-pointer select-none
                                        ${hoveredItem === i
                                            ? "glass-panel-bright glow-cyan"
                                            : "glass-panel hover:border-nx-cyan/20"
                                        }`}
                                >
                                    {/* Animated top border on hover */}
                                    <div className={`absolute top-0 left-0 right-0 h-px transition-all duration-700 ${hoveredItem === i
                                        ? "bg-linear-to-r from-transparent via-nx-cyan to-transparent opacity-100"
                                        : "opacity-0"
                                        }`} />

                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-lg transition-colors duration-300 ${hoveredItem === i ? "text-nx-cyan" : "text-nx-text-muted"
                                            }`}>
                                            {item.icon}
                                        </span>
                                        <span className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 ${hoveredItem === i ? "text-nx-text" : "text-nx-text-secondary"
                                            }`}>
                                            {item.label}
                                        </span>
                                    </div>

                                    <p className="font-mono text-[10px] text-nx-text-secondary/50 leading-relaxed">
                                        {item.desc}
                                    </p>

                                    {/* Arrow indicator */}
                                    <div className={`absolute bottom-4 right-4 transition-all duration-300 ${hoveredItem === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                        }`}>
                                        <span className="text-nx-cyan text-sm">→</span>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Phase 4: Scroll indicator */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase >= 4 ? 1 : 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="flex flex-col items-center gap-3"
                            style={{ pointerEvents: phase >= 4 ? "auto" : "none" }}
                        >
                            <span className="font-mono text-[10px] text-nx-text-muted/70 tracking-[0.2em] select-none">SCROLL TO EXPLORE</span>
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-px h-8 bg-linear-to-b from-nx-cyan/40 to-transparent"
                            />
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
