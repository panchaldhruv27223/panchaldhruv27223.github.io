import React, { useEffect, useRef } from 'react';
import { EXPERIENCE } from '../data/constants';

const Experience: React.FC = () => {
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

    return (
        <section id="experience" ref={sectionRef} className="py-20 md:py-48 lg:py-64 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
                <div>
                    <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                        03 — Career Matrix
                    </h2>
                    <h3 className="reveal text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                        Work{' '}
                        <span
                            className="text-brand-gold lowercase"
                            style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1em' }}
                        >
                            experience
                        </span>
                    </h3>
                </div>
                <p className="reveal text-zinc-500 max-w-sm text-sm md:text-base">
                    Building <span className="text-brand-violet font-medium">AI solutions</span> and leading research initiatives at the intersection of academia and industry.
                </p>
            </div>

            <div className="space-y-0">
                {EXPERIENCE.map((exp, idx) => (
                    <div
                        key={idx}
                        className="reveal group border-t border-white/5 py-8 md:py-16 lg:py-24 hover:bg-white/[0.02] transition-colors px-4 md:px-6 lg:px-10 relative"
                    >
                        <div className="grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start">
                            {/* Period */}
                            <div className="md:col-span-2 text-zinc-600 text-[10px] md:text-[11px] font-black tracking-widest group-hover:text-brand-gold transition-colors">
                                {exp.period}
                            </div>

                            {/* Role & Company */}
                            <div className="md:col-span-5">
                                <h4 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-1 md:mb-2 group-hover:translate-x-2 md:group-hover:translate-x-4 transition-transform leading-tight">
                                    {exp.role}
                                </h4>
                                <p className="text-brand-gold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] font-black">
                                    {exp.company}
                                </p>
                            </div>

                            {/* Details */}
                            <div className="md:col-span-5 pt-2 md:pt-4">
                                <ul className="space-y-3 md:space-y-4">
                                    {exp.details.map((detail, i) => (
                                        <li key={i} className="text-zinc-500 text-xs md:text-sm font-light leading-snug flex gap-3 md:gap-4">
                                            <span className="text-white">//</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
