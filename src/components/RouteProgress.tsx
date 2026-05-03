import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Lightweight top-of-page progress bar that animates briefly on every route change.
 * Gives users visual feedback that navigation registered without pulling in NProgress as a dep.
 */
const RouteProgress: React.FC = () => {
    const location = useLocation();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let raf = 0;
        const timeouts: number[] = [];

        setVisible(true);
        setProgress(15);
        timeouts.push(window.setTimeout(() => setProgress(55), 80));
        timeouts.push(window.setTimeout(() => setProgress(85), 200));
        timeouts.push(
            window.setTimeout(() => {
                setProgress(100);
                timeouts.push(
                    window.setTimeout(() => {
                        setVisible(false);
                        // Reset progress after the bar has faded out.
                        timeouts.push(window.setTimeout(() => setProgress(0), 250));
                    }, 200)
                );
            }, 380)
        );

        return () => {
            cancelAnimationFrame(raf);
            timeouts.forEach((id) => window.clearTimeout(id));
        };
    }, [location.pathname]);

    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-[300] h-[2px] pointer-events-none"
            style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 200ms ease-out',
            }}
        >
            <div
                className="h-full bg-brand-gold"
                style={{
                    width: `${progress}%`,
                    transition: 'width 200ms ease-out',
                    boxShadow: '0 0 12px rgba(201,162,39,0.6)',
                }}
            />
        </div>
    );
};

export default RouteProgress;
