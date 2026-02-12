import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/constants';

const Projects: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, idx * 200);
                        });
                    }
                });
            },
            { threshold: 0.05 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="py-20 md:py-48 lg:py-64 bg-zinc-950/60 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 lg:mb-32 gap-8 md:gap-12">
                    <div className="max-w-2xl">
                        <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 md:mb-8 uppercase">
                            02 — Selected Outputs
                        </h2>
                        <h3 className="reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
                            Featured{' '}
                            <span
                                className="text-brand-gold lowercase"
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: '1.1em',
                                    fontWeight: 700,
                                }}
                            >
                                works
                            </span>
                        </h3>
                    </div>
                    <div className="reveal md:text-right max-w-sm">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] mb-2">Research Focus</p>
                        <p className="text-zinc-400 text-sm">Technical innovations across Computer Vision, NLP, and Quantum Architectures.</p>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-16 md:gap-y-32 lg:gap-y-40">
                    {PROJECTS.map((project, idx) => (
                        <a
                            key={project.id}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`reveal block ${idx % 2 === 0 ? '' : 'md:mt-32 lg:mt-64'} group interactive`}
                            data-cursor="Explore"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/11] mb-8 md:mb-12 overflow-hidden bg-black border border-white/5">
                                <img
                                    src={project.image}
                                    className="w-full h-full object-cover opacity-30 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]"
                                    alt={project.title}
                                    loading="lazy"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-brand-gold/5 backdrop-blur-sm">
                                    <span className="px-4 md:px-6 py-2 md:py-3 bg-white text-black text-[9px] md:text-[10px] font-black tracking-widest hover:bg-brand-gold transition-colors">
                                        VIEW PROJECT
                                    </span>
                                </div>
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 text-[9px] font-bold text-brand-gold tracking-tighter border border-white/10 uppercase">
                                    {project.category}
                                </div>
                                {/* Status Dot */}
                                <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex items-start gap-4 md:gap-6">
                                <span className="text-[9px] md:text-[10px] font-black text-zinc-800 shrink-0 mt-2 tracking-widest">
                                    REF:00{idx + 1}
                                </span>
                                <div className="flex-1">
                                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 group-hover:text-brand-gold transition-colors uppercase tracking-tight">
                                        {project.title}
                                    </h4>
                                    <div className="grid gap-4 md:gap-6">
                                        <div className="flex gap-3 md:gap-4">
                                            <span className="text-[9px] md:text-[10px] text-brand-gold font-black shrink-0 uppercase tracking-widest">Issue</span>
                                            <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">{project.problem}</p>
                                        </div>
                                        <div className="flex gap-3 md:gap-4">
                                            <span className="text-[9px] md:text-[10px] text-white font-black shrink-0 uppercase tracking-widest">Impact</span>
                                            <p className="text-xs md:text-sm text-zinc-100 font-medium tracking-wide uppercase italic">{project.impact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
