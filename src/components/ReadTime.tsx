import React, { useEffect, useState } from 'react';

interface ReadTimeProps {
    /**
     * CSS selector for the element whose textContent should be word-counted.
     * Defaults to 'article'.
     */
    target?: string;
    /** Words per minute. 220 is the modern average for adult readers of online content. */
    wpm?: number;
}

/**
 * Calculates and displays an estimated reading time based on the actual rendered content.
 * Runs once on mount after the article is in the DOM.
 */
const ReadTime: React.FC<ReadTimeProps> = ({ target = 'article', wpm = 220 }) => {
    const [minutes, setMinutes] = useState<number | null>(null);

    useEffect(() => {
        // Defer one tick so the article has rendered. We don't expect it to mutate after mount,
        // so re-running on resize/scroll is unnecessary.
        const handle = window.setTimeout(() => {
            const el = document.querySelector(target);
            if (!el) return;
            const text = (el as HTMLElement).innerText || el.textContent || '';
            const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
            setMinutes(Math.max(1, Math.round(wordCount / wpm)));
        }, 0);

        return () => window.clearTimeout(handle);
    }, [target, wpm]);

    if (minutes === null) return <span aria-hidden="true">— min read</span>;
    return <span>{minutes} min read</span>;
};

export default ReadTime;
