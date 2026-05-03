import React, { useEffect, useRef, useState } from 'react';

interface ReadingProgressProps {
    /**
     * Selector for the article element to track. The progress bar measures progress
     * from when the top of the article enters the viewport to when its bottom leaves.
     * Defaults to 'article' which matches the markup in every blog post.
     */
    target?: string;
}

/**
 * Top-of-page scroll progress bar specific to a long-form article.
 * Distinct from RouteProgress — this one tracks scroll position through content,
 * not navigation timing.
 */
const ReadingProgress: React.FC<ReadingProgressProps> = ({ target = 'article' }) => {
    const [progress, setProgress] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const el = document.querySelector(target) as HTMLElement | null;
        if (!el) return;

        const update = () => {
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;
            // Distance from the article's natural starting line to the bottom that still needs to scroll past the viewport.
            const total = rect.height - winH;
            if (total <= 0) {
                setProgress(rect.bottom <= winH ? 100 : 0);
                return;
            }
            const scrolled = -rect.top;
            const pct = Math.max(0, Math.min(100, (scrolled / total) * 100));
            setProgress(pct);
        };

        const onScroll = () => {
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = null;
                update();
            });
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [target]);

    return (
        <div
            role="progressbar"
            aria-label="Reading progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="fixed top-0 left-0 right-0 z-[150] h-[2px] pointer-events-none bg-white/[0.04]"
        >
            <div
                className="h-full bg-brand-gold"
                style={{
                    width: `${progress}%`,
                    boxShadow: progress > 0 ? '0 0 10px rgba(201,162,39,0.5)' : 'none',
                }}
            />
        </div>
    );
};

export default ReadingProgress;
