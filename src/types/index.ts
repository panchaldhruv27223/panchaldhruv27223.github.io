export interface Project {
    id: string;
    title: string;
    category: string;
    problem: string;
    approach: string;
    impact: string;
    /** Headline metric pulled from `impact`. Optional — when present it's rendered as a hero number. */
    metric?: { value: string; label: string };
    /** Tech stack tags rendered as small chips below the title. */
    tech?: string[];
    link: string;
    image: string;
}

export interface Skill {
    name: string;
    /** Years of experience (rounded). Used for the inline "·Ny" hint. */
    years?: number;
    /** Marks foundational tools the user uses daily — bolder visual treatment. */
    primary?: boolean;
}

export interface SkillCategory {
    name: string;
    /** Either plain strings (legacy) or rich Skill objects. */
    skills: Array<string | Skill>;
}

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    details: string[];
}

export interface BlogPost {
    title: string;
    excerpt: string;
    link: string;
    date: string;
}

export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    description: string;
    link: string;
    image: string;
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}
