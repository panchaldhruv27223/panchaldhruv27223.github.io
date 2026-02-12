import React, { useEffect, useRef } from 'react';
import profileImg from '../../images/personal_images/profile.jpg';

const About: React.FC = () => {
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

    const highlights = [
        { icon: '🎓', label: 'M.Tech in ML', sub: 'DA-IICT' },
        { icon: '🥇', label: 'Gold Medalist', sub: 'B.E. Degree' },
        { icon: '👨‍🏫', label: '350+ Students', sub: 'Mentored' },
    ];

    const expertise = [
        { area: 'Computer Vision', detail: 'YOLOS, SAM, DETR architectures' },
        { area: 'Multimodal AI', detail: 'SigLIP + Gemma integration' },
        { area: 'Quantum ML', detail: 'Hybrid QNN achieving 81% on CIFAR-10' },
    ];

    return (
        <section id="about" ref={sectionRef} className="py-20 md:py-48 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="grid md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-10">
                        <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-12 md:mb-16 uppercase">
                            01 — About Me
                        </h2>
                        <p className="reveal text-4xl md:text-5xl lg:text-7xl font-black leading-[0.95] tracking-tight uppercase">
                            Machine Learning{' '}
                            <span
                                className="text-brand-gold lowercase"
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: '1.1em',
                                    fontWeight: 700,
                                }}
                            >
                                researcher
                            </span>{' '}
                            <br className="hidden md:block" />& Practitioner
                        </p>
                        <p className="reveal text-xl md:text-2xl lg:text-3xl font-light text-zinc-500 mt-6 tracking-tight">
                            Translating cutting-edge research into real-world impact
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-10 md:gap-24 lg:gap-32 mt-16 md:mt-32 items-start">
                    {/* Left Column - Text */}
                    <div className="space-y-8 md:space-y-10">
                        {/* Introduction */}
                        <p className="reveal text-lg md:text-xl text-zinc-400 leading-relaxed">
                            I am a passionate Machine Learning researcher currently pursuing my{' '}
                            <span className="text-white font-semibold">M.Tech in Machine Learning</span> at{' '}
                            <span className="text-brand-gold">DA-IICT</span>. My academic journey is distinguished by excellence,
                            having been awarded the <span className="text-white font-semibold">Gold Medal</span> for my Bachelor's degree.
                        </p>

                        {/* Expertise Areas */}
                        <div className="reveal space-y-3">
                            <p className="text-xs text-brand-gold font-black tracking-widest uppercase mb-4">Areas of Expertise</p>
                            {expertise.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded group hover:border-brand-gold/30 transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-brand-gold flex-shrink-0"></div>
                                    <div>
                                        <span className="text-white font-bold">{item.area}</span>
                                        <span className="text-zinc-500 text-sm ml-2">— {item.detail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Research Highlight */}
                        <div className="reveal glass p-8 md:p-10 border-l-2 border-brand-gold/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl"></div>
                            <p className="text-xs text-brand-gold font-black tracking-widest uppercase mb-4">Research Highlight</p>
                            <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                                Developed a novel hybrid pipeline combining <span className="text-white font-semibold">YOLOS + SAM</span> architectures
                                for satellite image analysis, achieving a <span className="text-brand-gold font-bold">+23% improvement in IoU</span> over baseline models.
                            </p>
                        </div>

                        {/* Mentoring Section */}
                        <div className="reveal">
                            <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
                                Beyond research, I am deeply committed to <span className="text-white font-semibold">knowledge dissemination</span>.
                                As a Teaching Assistant at DA-IICT, I guide over 350 students through complex ML concepts,
                                fostering the next generation of AI practitioners.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="reveal grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                            {highlights.map((item, i) => (
                                <div key={i} className="text-center md:text-left">
                                    <p className="text-2xl md:text-3xl mb-1">{item.icon}</p>
                                    <p className="text-sm md:text-base font-bold text-white">{item.label}</p>
                                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Image & Quote */}
                    <div className="reveal space-y-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="absolute -inset-2 border border-white/5 -z-10 translate-x-4 translate-y-4"></div>
                            <div className="aspect-[3/4] bg-zinc-900 overflow-hidden relative group interactive" data-cursor="Profile">
                                <img
                                    src={profileImg}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
                                    alt="Dhruv Panchal"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 right-6">
                                    <div className="flex items-center gap-3 md:gap-4 mb-2">
                                        <div className="w-8 md:w-10 h-[1px] bg-brand-gold"></div>
                                        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-brand-gold uppercase">Currently</span>
                                    </div>
                                    <p className="text-lg md:text-xl font-bold">M.Tech Researcher @ DA-IICT</p>
                                    <p className="text-[10px] md:text-xs text-zinc-500 mt-2 uppercase tracking-widest">Vision • Multimodal AI • Quantum ML</p>
                                </div>
                            </div>
                        </div>

                        {/* Philosophy Quote */}
                        <div className="glass p-6 md:p-8 border border-white/5 relative overflow-hidden">
                            <div className="absolute -top-4 -left-4 text-6xl text-brand-gold/10 font-serif">"</div>
                            <p className="text-base md:text-lg text-zinc-300 italic leading-relaxed relative z-10">
                                The goal isn't just to see patterns, but to understand the logic behind them and
                                translate cutting-edge research into solutions that make a real-world impact.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="w-8 h-[1px] bg-brand-gold/50"></div>
                                <span className="text-xs text-brand-gold font-bold uppercase tracking-widest">Research Philosophy</span>
                            </div>
                        </div>

                        {/* Medium Link */}
                        <a
                            href="https://dhruv-panchal.medium.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 hover:border-brand-gold/30 transition-all group interactive"
                            data-cursor="Medium"
                        >
                            <div>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Technical Writing</p>
                                <p className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">Read my blog on Medium</p>
                            </div>
                            <svg className="w-5 h-5 text-zinc-500 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
