export interface Project {
    id: string;
    title: string;
    category: string;
    problem: string;
    approach: string;
    impact: string;
    link: string;
    image: string;
}

export interface SkillCategory {
    name: string;
    skills: string[];
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
