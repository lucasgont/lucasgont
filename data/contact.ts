export type ContactType = "github" | "linkedin" | "email"

export interface ContactLink {
    label: ContactType
    handle: string
    href: string
}

export const contactLinks: ContactLink[] = [
    {
        label: "github",
        handle: "@lucasgont",
        href: "https://github.com/lucasgont",
    },
    {
        label: "linkedin",
        handle: "/in/lucasgont",
        href: "https://www.linkedin.com/in/lucasgont/",
    },
    {
        label: "email",
        handle: "gontijoguimaraeslucas@gmail.com",
        href: "mailto:gontijoguimaraeslucas@gmail.com",
    },
]
