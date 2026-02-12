import React, { useEffect, useRef } from 'react';

const Gallery: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, idx * 150);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Placeholder items for gallery - user will add real content later
    const placeholderItems = [
        { id: 1, type: 'coming', label: 'Memories Coming Soon' },
        { id: 2, type: 'coming', label: 'Research Moments' },
        { id: 3, type: 'coming', label: 'Academic Journey' },
        { id: 4, type: 'coming', label: 'Team & Collaborations' },
    ];

    return (
        <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-zinc-950/40">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12 md:mb-16">
                    <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                        06 — Memories
                    </h2>
                    <h3 className="reveal text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                        GALLERY
                    </h3>
                    <p className="reveal text-zinc-500 mt-4 max-w-md text-sm">
                        A visual journey through research, learning, and memorable moments.
                    </p>
                </div>

                {/* Gallery Grid - Masonry Style Placeholder */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {placeholderItems.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`reveal group relative overflow-hidden border border-white/5 ${idx === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
                                }`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-brand-gold/20 flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6 text-brand-gold/40"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold">
                                        {item.label}
                                    </p>
                                </div>
                            </div>

                            {/* Hover effect border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/20 transition-colors duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* Note */}
                <p className="reveal text-center mt-12 text-xs text-zinc-600 uppercase tracking-widest">
                    More memories coming soon
                </p>
            </div>
        </section>
    );
};

export default Gallery;
