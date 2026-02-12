import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [label, setLabel] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent flash

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return;

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const interactive = target.closest('.interactive, a, button');
            if (interactive) {
                setHovered(true);
                const attrLabel = interactive.getAttribute('data-cursor');
                setLabel(attrLabel || 'View');
            } else {
                setHovered(false);
                setLabel('');
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        // Smooth animation loop using requestAnimationFrame
        const animate = () => {
            // Smooth follow for main cursor
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            // Faster follow for dot
            const dotDx = mouseX - dotX;
            const dotDy = mouseY - dotY;
            dotX += dotDx * 0.35;
            dotY += dotDy * 0.35;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            }

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            }

            requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationId);
        };
    }, [isMobile]);

    // Hide cursor on mobile using state
    if (isMobile) {
        return null;
    }

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center rounded-full transition-[width,height,background,border] duration-300 ease-out mix-blend-difference ${hovered
                    ? 'w-20 h-20 bg-white border-2 border-white'
                    : 'w-10 h-10 bg-transparent border border-white'
                    }`}
                style={{
                    opacity: isVisible ? 1 : 0,
                    willChange: 'transform',
                }}
            >
                {hovered && label && (
                    <span className="text-[9px] font-bold text-black uppercase tracking-[0.15em]">
                        {label}
                    </span>
                )}
            </div>

            {/* Center dot */}
            <div
                ref={cursorDotRef}
                className={`fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block rounded-full transition-[width,height,background] duration-200 mix-blend-difference ${hovered
                    ? 'w-1.5 h-1.5 bg-white'
                    : 'w-2 h-2 bg-white'
                    }`}
                style={{
                    opacity: isVisible ? 1 : 0,
                    willChange: 'transform',
                }}
            />
        </>
    );
};

export default CustomCursor;
