import React, { useRef, useEffect, useState } from 'react';
import { CERTIFICATES } from '../data/constants';

const Certificates: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for section visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, idx * 150);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Auto-rotate certificates
    useEffect(() => {
        if (!isVisible) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % CERTIFICATES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isVisible]);

    const icons = ['🎓', '🏆', '📜', '🎯', '💡', '⚡'];

    return (
        <section
            ref={sectionRef}
            className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-brand-gold/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${4 + Math.random() * 4}s`,
                        }}
                    />
                ))}
                {/* Gradient orbs */}
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-violet/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="max-w-7xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                        07 — Credentials
                    </h2>
                    <h3 className="reveal text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">
                        My{' '}
                        <span
                            className="text-brand-gold italic"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            Certifications
                        </span>
                    </h3>
                    <p className="reveal text-zinc-500 mt-6 max-w-xl mx-auto">
                        Industry-recognized credentials that validate my expertise
                    </p>
                </div>

                {/* Main Cards Display - 3D Carousel Effect */}
                <div className="relative h-[450px] md:h-[500px] perspective-1000">
                    {CERTIFICATES.map((cert, idx) => {
                        const offset = idx - activeIndex;
                        const absOffset = Math.abs(offset);
                        const isActive = idx === activeIndex;

                        // Calculate 3D transform values
                        const translateX = offset * 60;
                        const translateZ = isActive ? 0 : -150 - absOffset * 50;
                        const rotateY = offset * -15;
                        const scale = isActive ? 1 : 0.85 - absOffset * 0.05;
                        const opacity = isActive ? 1 : Math.max(0.3, 0.7 - absOffset * 0.2);
                        const zIndex = CERTIFICATES.length - absOffset;

                        return (
                            <a
                                key={idx}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    if (!isActive) {
                                        e.preventDefault();
                                        setActiveIndex(idx);
                                    }
                                }}
                                className={`reveal absolute left-1/2 top-1/2 w-[90vw] md:w-[600px] h-[350px] md:h-[400px] 
                                    rounded-2xl overflow-hidden cursor-pointer
                                    border-2 transition-all duration-700 ease-out
                                    ${isActive
                                        ? 'border-brand-gold/50 shadow-[0_0_60px_rgba(201,162,39,0.2)]'
                                        : 'border-white/10 hover:border-white/30'
                                    }`}
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                                    opacity,
                                    zIndex,
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                {/* Glassmorphism Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl" />

                                {/* Certificate Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className={`w-full h-full object-cover transition-all duration-700
                                            ${isActive ? 'opacity-25 scale-105' : 'opacity-10 scale-100'}`}
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
                                </div>

                                {/* Animated Border Glow for Active */}
                                {isActive && (
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                        <div className="absolute inset-0 animate-spin-slow opacity-50" style={{ animationDuration: '8s' }}>
                                            <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                                        </div>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full p-8 md:p-10">
                                    {/* Top Row */}
                                    <div className="flex justify-between items-start mb-auto">
                                        <div
                                            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-brand-gold/10 border border-brand-gold/30 
                                                flex items-center justify-center text-3xl md:text-4xl
                                                transition-all duration-500 ${isActive ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}
                                        >
                                            {icons[idx % icons.length]}
                                        </div>
                                        <div className="text-right">
                                            <span className={`block text-brand-gold text-sm font-bold tracking-widest uppercase mb-1
                                                transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                                                {cert.date}
                                            </span>
                                            <span className="block text-white/40 text-xs uppercase tracking-wider">
                                                {cert.issuer}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title with animated underline */}
                                    <div className="mt-auto">
                                        <h4 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight
                                            transition-all duration-500 ${isActive ? 'text-white' : 'text-white/70'}`}>
                                            {cert.title}
                                            {isActive && (
                                                <div className="h-0.5 bg-gradient-to-r from-brand-gold to-transparent mt-2 animate-expand-width" />
                                            )}
                                        </h4>

                                        <p className={`text-sm md:text-base text-zinc-400 line-clamp-2 mb-6 transition-opacity duration-500
                                            ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                            {cert.description}
                                        </p>

                                        {/* CTA Button - Only visible on active */}
                                        <div className={`flex items-center gap-3 transition-all duration-500 
                                            ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                            <span className="text-sm font-bold uppercase tracking-widest text-brand-gold">
                                                View Certificate
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-brand-gold animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {CERTIFICATES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`relative w-3 h-3 rounded-full transition-all duration-500 
                                ${idx === activeIndex
                                    ? 'bg-brand-gold scale-125'
                                    : 'bg-white/20 hover:bg-white/40'
                                }`}
                            aria-label={`Go to certificate ${idx + 1}`}
                        >
                            {idx === activeIndex && (
                                <span className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-50" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Certificate Counter */}
                <div className="reveal text-center mt-8">
                    <span className="text-5xl md:text-6xl font-black text-brand-gold">
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl text-zinc-600 mx-2">/</span>
                    <span className="text-xl text-zinc-600">
                        {String(CERTIFICATES.length).padStart(2, '0')}
                    </span>
                </div>
            </div>

            {/* Custom Animations */}
            <style>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                @keyframes expand-width {
                    from { width: 0; }
                    to { width: 60%; }
                }
                .animate-expand-width {
                    animation: expand-width 0.5s ease-out forwards;
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1s ease-in-out infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Certificates;
