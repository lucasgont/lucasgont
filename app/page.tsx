"use client"

import { useState, useRef, useCallback } from "react"
import { Section } from "@/data/navigation"

import AnimatedBackground from "@/components/AnimatedBackground"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import About from "@/components/About"
import Work from "@/components/Work"
import Hero from "@/components/Hero"
import HUD from "@/components/HUD"
import CV from "@/components/CV"

export default function Home() {
    const [activeSection, setActiveSection] = useState<Section>("hero")
    const [showHUD, setShowHUD] = useState(false)
    const sectionsRef = useRef<Partial<Record<Section, HTMLDivElement | null>>>({})

    const scrollTo = useCallback((section: Section) => {
        sectionsRef.current[section]?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const handleLucasAppear = useCallback(() => setShowHUD(true), [])

    // Handle Section InView
    const handleInView = (section: Section) => useCallback(() => setActiveSection(section), [])

    return (
        <>
            <AnimatedBackground />
            <HUD activeSection={activeSection} onNavigate={scrollTo} showHUD={showHUD} />

            <main className="relative z-10">
                <div ref={(el) => { sectionsRef.current.hero = el }}>
                    <Hero onInView={handleInView("hero")} onLucasAppear={handleLucasAppear} />
                </div>

                <div ref={(el) => { sectionsRef.current.work = el }}>
                    <Work onInView={handleInView("work")} />
                </div>

                <div ref={(el) => { sectionsRef.current.about = el }}>
                    <About onInView={handleInView("about")} />
                </div>

                <div ref={(el) => { sectionsRef.current.cv = el }}>
                    <CV onInView={handleInView("cv")} onNavigate={scrollTo} />
                </div>

                <div ref={(el) => { sectionsRef.current.contact = el }}>
                    <Contact onInView={handleInView("contact")} />
                </div>

                <Footer />
            </main>
        </>
    )
}
