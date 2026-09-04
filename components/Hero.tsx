"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { contactIcons } from "@/lib/contact"
import { contactLinks } from "@/data/contact"

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

export default function Hero({ onInView, onLucasAppear }: {
    onInView: () => void
    onLucasAppear: () => void
}) {
    const ref = useRef(null)
    const isInView = useInView(ref, { amount: 0.5 })
    const [phase, setPhase] = useState(0)
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
            setTimeout(() => setPhase(3), 3500),   // Contact links
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
                        {/* Phase 2: Main title (tablet and up) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.95 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="hidden sm:block mb-12"
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
                                <span className="font-mono text-[10px] tracking-[0.3em] text-nx-cyan">SEVILLE, SPAIN</span>
                            </motion.div>

                            {/* Main name */}
                            <div className="relative mb-3">
                                <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-nx-text">
                                    {titleText.displayed}
                                    {!titleText.isDone && <span className="text-nx-cyan animate-blink">|</span>}
                                </h1>
                                {/* Glow behind text */}
                                <div className="absolute inset-0 text-8xl md:text-9xl font-bold tracking-tighter text-nx-cyan/5 blur-2xl select-none pointer-events-none" aria-hidden>
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
                                    className="h-px w-20 bg-linear-to-r from-nx-cyan to-transparent"
                                />
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 2.5, ease: "easeInOut" }}
                                    className="font-mono text-base tracking-[0.2em] text-nx-text-secondary whitespace-nowrap mx-4"
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

                            {/* Phase 3: Contact Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="flex gap-3 mt-6 items-center justify-end"
                                style={{ pointerEvents: phase >= 3 ? "auto" : "none" }}
                            >
                                {contactLinks.map((link, index) => {
                                    const Icon = contactIcons[link.label]
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: phase >= 3 ? 1 : 0, scale: phase >= 3 ? 1 : 0.8 }}
                                            transition={{ delay: 0.1 * index, duration: 0.2 }}
                                            whileHover={{ color: "#22D3EE" }}
                                            whileTap={{ scale: 0.95 }}
                                            className="text-nx-text-secondary p-1"
                                        >
                                            <Icon />
                                        </motion.a>
                                    )
                                })}
                            </motion.div>
                        </motion.div>

                        {/* Phase 2: Main title (phone only) — compact, centered stack */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.95 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="sm:hidden flex flex-col items-center gap-8 text-center w-full"
                            style={{ pointerEvents: phase >= 2 ? "auto" : "none" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: -15 }}
                                animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : -15 }}
                                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-nx-cyan/20 bg-nx-cyan/5"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-nx-cyan animate-pulse" />
                                <span className="font-mono text-[10px] tracking-[0.3em] text-nx-cyan">SEVILLE, SPAIN</span>
                            </motion.div>

                            <div className="flex flex-col items-center gap-3">
                                <div className="relative">
                                    <h1 className="text-7xl font-bold tracking-tighter text-nx-text">
                                        {titleText.displayed}
                                        {!titleText.isDone && <span className="text-nx-cyan animate-blink">|</span>}
                                    </h1>
                                    <div className="absolute inset-0 text-7xl font-bold tracking-tighter text-nx-cyan/5 blur-2xl select-none pointer-events-none" aria-hidden>
                                        LUCAS
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: phase >= 2 ? 1 : 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="flex items-center gap-3 w-full max-w-56"
                                >
                                    <span className="h-px flex-1 bg-linear-to-r from-transparent to-nx-cyan/70" />
                                    <span className="font-mono text-[11px] tracking-[0.3em] text-nx-cyan/80 whitespace-nowrap">FULLSTACK DEV</span>
                                    <span className="h-px flex-1 bg-linear-to-l from-transparent to-nx-cyan/70" />
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 10 }}
                                    transition={{ delay: 1, duration: 0.9, ease: "easeOut" }}
                                    className="max-w-72 font-mono text-xs text-nx-text-secondary/60 leading-relaxed"
                                >
                                    I turn complex requirements and business needs into practical, production-ready solutions. Building with curiosity and delivering with intention.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="flex flex-col gap-3 items-stretch w-full max-w-72"
                                style={{ pointerEvents: phase >= 3 ? "auto" : "none" }}
                            >
                                {contactLinks.map((link, index) => {
                                    const Icon = contactIcons[link.label]
                                    return (
                                        <motion.a
                                            key={link.label}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
                                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-nx-border/60 bg-nx-surface/40 text-left"
                                        >
                                            <span className="text-nx-cyan shrink-0">
                                                <Icon />
                                            </span>
                                            <span className="font-mono text-xs tracking-[0.15em] text-nx-text capitalize">{link.label}</span>
                                            <span className="ml-auto font-mono text-[10px] text-nx-text-secondary/60 truncate">{link.handle}</span>
                                        </motion.a>
                                    )
                                })}
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    )
}
