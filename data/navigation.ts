export type Section = "hero" | "work" | "about" | "cv" | "contact"

export const navSections: Section[] = ["hero", "work", "about", "cv", "contact"]

type SectionName = "HERO" | "WORK" | "ABOUT" | "CV" | "CONTACT"

export const menuItems: {
    label: SectionName
    section: Section
    desc: string
    icon: string
}[] = [
        {
            label: "WORK",
            section: "work",
            desc: "Active projects & deployments",
            icon: "◇",
        },
        {
            label: "ABOUT",
            section: "about",
            desc: "Skills, background & interests",
            icon: "◈",
        },
        {
            label: "CV",
            section: "cv",
            desc: "Professional experience & education",
            icon: "◆",
        },
        {
            label: "CONTACT",
            section: "contact",
            desc: "Communication channels & social links",
            icon: "✦",
        },
    ]

export interface HUDItem {
    name: SectionName,
    number: string
}

export const sections: Record<Section, HUDItem> = {
    hero: {
        name: "HERO",
        number: "00",
    },
    work: {
        name: "WORK",
        number: "01",
    },
    about: {
        name: "ABOUT",
        number: "02",
    },
    cv: {
        name: "CV",
        number: "03",
    },
    contact: {
        name: "CONTACT",
        number: "04",
    },
}