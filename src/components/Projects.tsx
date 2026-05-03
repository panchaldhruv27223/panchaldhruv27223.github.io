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
        <section id="projects" ref={sectionRef} className="py-20 md:py-32 lg:py-40 bg-zinc-950/60 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 lg:mb-20 gap-8 md:gap-12">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-16 md:gap-y-20 lg:gap-y-24">
                    {PROJECTS.map((project, idx) => {
                        const isLastOdd = idx === PROJECTS.length - 1 && PROJECTS.length % 2 === 1;
                        const projectNumber = String(idx + 1).padStart(2, '0');
                        return (
                        <a
                            key={project.id}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — ${project.impact} (opens in new tab)`}
                            className={`reveal block ${idx % 2 === 0 ? '' : 'md:mt-12 lg:mt-16'} ${isLastOdd ? 'md:col-span-2 md:max-w-[calc(50%-1.5rem)] lg:max-w-[calc(50%-2.5rem)] md:mx-auto' : ''} group interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-4 focus-visible:ring-offset-brand-dark`}
                            data-cursor="Explore"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[16/11] mb-6 md:mb-8 overflow-hidden bg-black border border-white/5 group-hover:border-brand-gold/30 transition-colors duration-500">
                                <img
                                    src={project.image}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-60 group-hover:scale-105 transition-all duration-[1.5s]"
                                    alt={project.title}
                                    loading="lazy"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                                    <span className="px-4 md:px-6 py-2 md:py-3 bg-white text-black text-[9px] md:text-[10px] font-black tracking-widest group-hover:bg-brand-gold transition-colors">
                                        VIEW PROJECT →
                                    </span>
                                </div>
                                {/* Category Badge — single emphasis */}
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur px-3 py-1 text-[9px] font-bold text-brand-gold tracking-tighter border border-white/10 uppercase">
                                    {project.category}
                                </div>
                            </div>

                            {/* Header row: project number + title */}
                            <div className="flex items-baseline gap-4 md:gap-6 mb-5">
                                <span className="text-[10px] md:text-xs font-black text-zinc-700 group-hover:text-brand-gold transition-colors tracking-[0.3em] shrink-0">
                                    /{projectNumber}
                                </span>
                                <h4 className="text-2xl md:text-3xl lg:text-4xl font-black group-hover:text-brand-gold transition-colors uppercase tracking-tight leading-none">
                                    {project.title}
                                </h4>
                            </div>

                            {/* Problem — concise, neutral */}
                            <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6 md:mb-8 ml-0 md:ml-12">
                                {project.problem}
                            </p>

                            {/* Tech stack chips */}
                            {project.tech && project.tech.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6 md:mb-8 ml-0 md:ml-12">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-white/[0.03] border border-white/10 text-zinc-300"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Impact metric — hero number */}
                            {project.metric && (
                                <div className="flex items-baseline gap-4 ml-0 md:ml-12 pt-6 border-t border-white/5">
                                    <span className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-gold tracking-tight leading-none">
                                        {project.metric.value}
                                    </span>
                                    <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-zinc-500">
                                        {project.metric.label}
                                    </span>
                                </div>
                            )}
                        </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
