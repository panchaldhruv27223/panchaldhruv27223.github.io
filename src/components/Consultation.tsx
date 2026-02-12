import React, { useEffect, useRef } from 'react';

const Consultation: React.FC = () => {
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

    const services = [
        {
            title: 'Priority DMs – AI/ML, DSA & Career',
            description: 'Get 3 FREE Priority DMs! Ask up to 2 questions on career, ML, DSA, or interview prep. Clear, actionable guidance within 24 hours.',
            duration: 'Async',
            price: 'FREE',
            link: 'https://topmate.io/panchal_dhruv/1694865/pay?utm_source=public_profile&utm_campaign=panchal_dhruv',
            highlight: true
        },
        {
            title: 'Priority DMs – Mentor Access',
            description: 'Direct mentorship in your inbox. Get guaranteed replies within 48 hrs for AI/ML guidance, career advice, and DSA doubt clearance.',
            duration: 'Async',
            price: '₹149',
            link: 'https://topmate.io/panchal_dhruv/1694883/pay?utm_source=public_profile&utm_campaign=panchal_dhruv'
        },
        {
            title: 'Career Guidance Call',
            description: 'Confused about AI/ML vs Software dev? Get clarity on your career path, roadmap planning, and placement strategy in a 1:1 call.',
            duration: '30 min',
            price: '₹499',
            link: 'https://topmate.io/panchal_dhruv/1694916?utm_source=public_profile&utm_campaign=panchal_dhruv'
        },
        {
            title: 'Resume & LinkedIn Review',
            description: 'Live CV review with ATS-friendly improvements, project highlighting tips, and actionable feedback to make it recruiter-ready.',
            duration: '30 min',
            price: '₹499',
            link: 'https://topmate.io/panchal_dhruv/1694980?utm_source=public_profile&utm_campaign=panchal_dhruv'
        },
        {
            title: 'Interview Prep Session',
            description: 'Mock interviews with DSA, SQL, ML/DL questions. Get live problem-solving practice, personalized feedback, and a targeted roadmap.',
            duration: '30 min',
            price: '₹999',
            link: 'https://topmate.io/panchal_dhruv/1694844?utm_source=public_profile&utm_campaign=panchal_dhruv'
        }
    ];

    const stats = [
        { number: '350+', label: 'Students Mentored' },
        { number: '4.9', label: 'Average Rating' },
        { number: '100%', label: 'Response Rate' },
    ];

    return (
        <section ref={sectionRef} id="consultation" className="py-32 md:py-48 px-6 md:px-12 lg:px-24 relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-gold/5 blur-[150px] rounded-full"></div>

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                        08 — 1:1 Sessions
                    </h2>
                    <h3 className="reveal text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-6">
                        CONSULTATION
                    </h3>
                    <p className="reveal text-zinc-500 max-w-2xl mx-auto text-base md:text-lg">
                        Struggling with your AI/ML career path? I've been where you are.
                        Let's work together to build your roadmap.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="reveal grid grid-cols-3 gap-4 md:gap-8 mb-16 md:mb-24 py-8 border-y border-white/5">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-5xl font-black text-brand-gold">{stat.number}</p>
                            <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
                    {services.map((service, idx) => (
                        <a
                            key={idx}
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`reveal group glass p-8 md:p-10 border transition-all duration-500 block relative ${service.highlight
                                ? 'border-brand-gold/50 bg-brand-gold/5 hover:border-brand-gold hover:bg-brand-gold/10'
                                : 'border-white/5 hover:border-brand-gold/30'
                                }`}
                        >
                            {/* Limited Offer Badge - Top Right */}
                            {service.highlight && (
                                <span className="absolute -top-3 -right-2 px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-brand-gold text-black rounded shadow-lg">
                                    ✨ Limited Offer
                                </span>
                            )}

                            <div className="flex justify-between items-start mb-6">
                                <h4 className="text-xl md:text-2xl font-bold group-hover:text-brand-gold transition-colors pr-4">
                                    {service.title}
                                </h4>
                                {service.highlight ? (
                                    <span className="shrink-0">
                                        <span className="relative inline-block">
                                            <span className="absolute inset-0 bg-brand-gold/30 blur-lg rounded"></span>
                                            <span className="relative px-4 py-1.5 border-2 border-brand-gold bg-black text-brand-gold font-black text-sm uppercase tracking-widest rounded shadow-[0_0_15px_rgba(201,162,39,0.4)]">
                                                Free
                                            </span>
                                        </span>
                                    </span>
                                ) : (
                                    <span className="font-black text-lg shrink-0 text-brand-gold">
                                        {service.price}
                                    </span>
                                )}
                            </div>
                            <p className="text-zinc-500 text-sm md:text-base mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">
                                    {service.duration}
                                </span>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest group-hover:text-brand-gold transition-colors">
                                    {service.highlight ? 'Get Started Free →' : 'Book Now →'}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {/* What People Say */}
                <div className="mb-16 md:mb-24">
                    <h4 className="reveal text-center text-xs font-bold tracking-[0.3em] text-brand-gold mb-8 uppercase">
                        What People Say
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {/* Testimonial 1 - Devyanish Koul */}
                        <div className="reveal glass-strong p-6 md:p-8 border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-500">
                            <div className="flex gap-4 items-start mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center text-xl font-bold text-brand-gold shrink-0">
                                    DK
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm md:text-base">Devyanish Koul</p>
                                    <p className="text-zinc-500 text-xs">Engineer | Ex Morgan Stanley | EY | DA-IICT</p>
                                </div>
                            </div>
                            <p className="text-sm md:text-base text-zinc-300 italic leading-relaxed mb-4">
                                "Dhruv is a dedicated professional with a great attitude and good technical skills. His curiosity and ability to solve complex challenges, combined with his helpful nature, make him an outstanding teammate."
                            </p>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">
                                January 2026 · Worked on the same team
                            </p>
                        </div>

                        {/* Testimonial 2 - Ritwik Agrawal */}
                        <div className="reveal glass-strong p-6 md:p-8 border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-500">
                            <div className="flex gap-4 items-start mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 flex items-center justify-center text-xl font-bold text-brand-gold shrink-0">
                                    RA
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm md:text-base">Ritwik Agrawal</p>
                                    <p className="text-zinc-500 text-xs">Teaching Assistant @ DA-IICT | Deep Learning, AI</p>
                                </div>
                            </div>
                            <p className="text-sm md:text-base text-zinc-300 italic leading-relaxed mb-4">
                                "Having collaborated with Dhruv Panchal on various projects over the past year, I can confidently say he is an exceptional talent in the Deep Learning space. He possesses a strong grasp of fundamentals and a 'can-do' attitude that makes him a joy to work with. He is punctual, professional, and consistently goes above and beyond to solve difficult technical challenges. Any team would be lucky to have him!"
                            </p>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-wider">
                                January 2026 · Worked on the same team
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main CTA */}
                <div className="reveal text-center">
                    <a
                        href="https://topmate.io/panchal_dhruv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="interactive inline-block relative group px-12 md:px-16 py-5 md:py-6 bg-brand-gold text-black font-black text-sm md:text-base uppercase tracking-widest hover:bg-white transition-colors duration-300 hover:shadow-[0_0_50px_rgba(201,162,39,0.3)]"
                        data-cursor="Book"
                    >
                        Book on Topmate
                    </a>
                    <p className="text-xs text-zinc-600 mt-6 uppercase tracking-widest">
                        Powered by Topmate.io
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Consultation;
