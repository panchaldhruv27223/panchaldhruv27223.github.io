import React, { useEffect, useRef } from 'react';
import { SKILL_CATEGORIES } from '../data/constants';

const Skills: React.FC = () => {
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
        <section ref={sectionRef} className="py-32 md:py-48 lg:py-64 px-6 md:px-12 lg:px-24 bg-brand-dark border-y border-white/5">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center">
                {/* Left - Header */}
                <div>
                    <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-8 md:mb-10 uppercase">
                        04 — Core Stack
                    </h2>
                    <h3 className="reveal text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-8 md:mb-12 leading-none uppercase">
                        Technical{' '}
                        <span
                            className="text-brand-gold lowercase"
                            style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1em' }}
                        >
                            arsenal
                        </span>
                    </h3>
                    <p className="reveal text-zinc-500 max-w-sm mb-8 md:mb-12 text-sm md:text-base leading-relaxed">
                        Mastering the complete <span className="text-brand-violet font-medium">ML lifecycle</span> from research to production deployment.
                    </p>
                    <div className="reveal h-px w-full bg-gradient-to-r from-brand-gold/20 via-brand-violet/10 to-transparent"></div>
                </div>

                {/* Right - Skills */}
                <div className="space-y-12 md:space-y-16">
                    {SKILL_CATEGORIES.map((cat) => (
                        <div key={cat.name} className="reveal">
                            <h4 className="text-[9px] md:text-[10px] font-black text-zinc-700 mb-6 md:mb-8 uppercase tracking-[0.5em] border-l-2 border-brand-gold/20 pl-3 md:pl-4">
                                {cat.name}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 md:gap-x-6 lg:gap-x-8 gap-y-4 md:gap-y-6">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-zinc-300 hover:text-brand-gold transition-colors interactive cursor-pointer tracking-tighter"
                                        data-cursor="Stack"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
