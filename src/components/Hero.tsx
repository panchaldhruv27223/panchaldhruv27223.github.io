import React, { useEffect, useState, useMemo } from 'react';
import { TAGLINES } from '../data/constants';

const Hero: React.FC = () => {
    const [taglineIndex, setTaglineIndex] = useState(0);
    const [isAssembled, setIsAssembled] = useState(false);
    const lastName = "PANCHAL";

    // Pre-calculate letter offsets for flying animation
    const letterOffsets = useMemo(() =>
        lastName.split('').map(() => {
            const side = Math.floor(Math.random() * 4);
            let x = 0, y = 0;
            const distance = 1500;

            if (side === 0) { x = -distance; y = (Math.random() - 0.5) * distance; }
            else if (side === 1) { x = distance; y = (Math.random() - 0.5) * distance; }
            else if (side === 2) { y = -distance; x = (Math.random() - 0.5) * distance; }
            else { y = distance; x = (Math.random() - 0.5) * distance; }

            return {
                x,
                y,
                rotate: (Math.random() - 0.5) * 360,
                delay: Math.random() * 0.8
            };
        }), []);

    useEffect(() => {
        // Trigger letter assembly after delay
        const assemblyTimer = setTimeout(() => setIsAssembled(true), 600);

        // Rotate taglines
        const interval = setInterval(() => {
            setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        }, 2500);

        return () => {
            clearInterval(interval);
            clearTimeout(assemblyTimer);
        };
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-start justify-end px-6 md:px-12 lg:px-24 pb-12 md:pb-24 relative overflow-hidden">
            <div className="z-10 max-w-7xl w-full">
                {/* Subtitle */}
                <div className="overflow-hidden mb-6 md:mb-8">
                    <span
                        className="block text-brand-gold font-bold tracking-[0.4em] md:tracking-[0.8em] uppercase text-[10px] md:text-[11px] opacity-0 translate-y-10 animate-reveal-up"
                        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                    >
                        AI/ML Researcher · Machine Learning Engineer
                    </span>
                </div>

                {/* Name - DHRUV */}
                <div className="hero-heading relative">
                    <h1
                        className="text-[15vw] md:text-[14vw] lg:text-[11vw] leading-[0.75] font-black tracking-tight mb-0 opacity-0 translate-y-20"
                        style={{
                            animation: 'reveal-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards'
                        }}
                    >
                        DHRUV
                    </h1>

                    {/* Name - PANCHAL with flying letters */}
                    <div className="flex text-[15vw] md:text-[14vw] lg:text-[11vw] leading-[0.75] font-black tracking-tight overflow-visible h-[1.1em]">
                        {lastName.split('').map((char, i) => (
                            <span
                                key={i}
                                className="inline-block"
                                style={{
                                    WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.8)',
                                    color: 'transparent',
                                    transition: 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                    transitionDelay: `${letterOffsets[i].delay}s`,
                                    transform: isAssembled
                                        ? 'translate(0, 0) rotate(0deg) scale(1)'
                                        : `translate(${letterOffsets[i].x}px, ${letterOffsets[i].y}px) rotate(${letterOffsets[i].rotate}deg) scale(0.5)`,
                                    opacity: isAssembled ? 1 : 0,
                                    filter: isAssembled ? 'blur(0px)' : 'blur(20px)',
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Tagline row */}
                <div
                    className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 mt-8 md:mt-16 opacity-0"
                    style={{ animation: 'fade-in 1s ease-out 1.5s forwards' }}
                >
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="h-px w-12 md:w-24 bg-brand-gold/30"></div>
                        <p className="text-xl md:text-2xl lg:text-4xl font-bold text-white tracking-tight uppercase">
                            Building{' '}
                            <span
                                className="text-brand-gold not-italic lowercase"
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: '1.3em',
                                    fontWeight: 700,
                                }}
                            >
                                {TAGLINES[taglineIndex]}
                            </span>
                        </p>
                    </div>

                    <div className="hidden lg:block h-px flex-grow bg-white/5"></div>

                    <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600">
                        <span>001 / DA-IICT</span>
                        <span>002 / Researcher</span>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div
                className="absolute right-6 md:right-12 bottom-8 md:bottom-12 flex flex-col items-center gap-4 md:gap-6 opacity-0"
                style={{ animation: 'fade-in 1s ease-out 2s forwards' }}
            >
                <span className="rotate-90 text-[8px] md:text-[9px] tracking-[0.5em] font-black text-zinc-700 uppercase whitespace-nowrap">
                    Explore Below
                </span>
                <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-brand-gold to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;
