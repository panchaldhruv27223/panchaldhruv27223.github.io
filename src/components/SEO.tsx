import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    /** Use 'article' for blog posts, 'profile' for the home page, 'website' for everything else. */
    type?: 'website' | 'article' | 'profile';
    /** ISO date string for blog posts. */
    publishedTime?: string;
    /** Optional JSON-LD object to inject under #seo-jsonld. Replaced (not merged) on each render. */
    jsonLd?: object;
}

import profileImg from '../../images/personal_images/profile.webp';

const SITE_DOMAIN = 'https://panchaldhruv27223.github.io';
const SITE_TITLE = 'Dhruv Panchal | AI/ML Researcher';

const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement('meta');
        const matchAttr = selector.includes('property') ? 'property' : 'name';
        const matchName = selector.match(/="([^"]+)"/)?.[1];
        if (matchName) el.setAttribute(matchAttr, matchName);
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
};

const setLink = (rel: string, href: string) => {
    let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
};

const PAGE_LD_ID = 'page-jsonld';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = profileImg,
    url,
    type = 'website',
    publishedTime,
    jsonLd,
}) => {
    const location = useLocation();
    // Always derive canonical from the current route so that nested pages don't accidentally claim the homepage URL.
    const resolvedUrl = url ?? `${SITE_DOMAIN}${location.pathname}`;
    const fullTitle =
        title.includes(SITE_TITLE) || title.includes('Dhruv Panchal')
            ? title
            : `${title} | ${SITE_TITLE}`;
    const absoluteImage = image.startsWith('http') ? image : `${SITE_DOMAIN}${image}`;

    useEffect(() => {
        document.title = fullTitle;
        setMeta('meta[name="description"]', 'content', description);
        if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);

        // Canonical URL always points to the GitHub Pages domain (the indexed mirror).
        // Mirrors served from other domains (e.g. Vercel) thus tell Google "the real one is github.io".
        const canonicalUrl = resolvedUrl.replace(
            /^https?:\/\/[^/]+/,
            SITE_DOMAIN
        );
        setLink('canonical', canonicalUrl);

        // If we're on a non-canonical mirror (Vercel preview, custom subdomain, etc.), add noindex
        // so search engines only index the canonical. The check runs in-browser, never affecting SSR/static HTML.
        const isCanonicalHost =
            typeof window === 'undefined' ||
            window.location.origin === SITE_DOMAIN;
        setMeta(
            'meta[name="robots"]',
            'content',
            isCanonicalHost
                ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
                : 'noindex, follow'
        );

        // Open Graph
        setMeta('meta[property="og:type"]', 'content', type);
        setMeta('meta[property="og:url"]', 'content', resolvedUrl);
        setMeta('meta[property="og:title"]', 'content', fullTitle);
        setMeta('meta[property="og:description"]', 'content', description);
        setMeta('meta[property="og:image"]', 'content', absoluteImage);
        setMeta('meta[property="og:site_name"]', 'content', 'Dhruv Panchal');

        // Twitter
        setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMeta('meta[name="twitter:url"]', 'content', resolvedUrl);
        setMeta('meta[name="twitter:title"]', 'content', fullTitle);
        setMeta('meta[name="twitter:description"]', 'content', description);
        setMeta('meta[name="twitter:image"]', 'content', absoluteImage);

        // Article-specific tags for blog posts
        if (type === 'article' && publishedTime) {
            setMeta('meta[property="article:author"]', 'content', 'Dhruv Panchal');
            setMeta('meta[property="article:published_time"]', 'content', publishedTime);
        }

        // Per-page JSON-LD: inject (or replace) a script tag keyed by id
        const existing = document.getElementById(PAGE_LD_ID);
        if (existing) existing.remove();
        if (jsonLd) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = PAGE_LD_ID;
            script.textContent = JSON.stringify(jsonLd);
            document.head.appendChild(script);
        }
    }, [fullTitle, description, keywords, absoluteImage, resolvedUrl, type, publishedTime, jsonLd]);

    return null;
};

export default SEO;
