import React, { useEffect, useRef } from 'react';

const Mentorship: React.FC = () => {
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
        'Structuring your learning path in AI/CV/NLP',
        'Resume and portfolio reviews for AI/ML roles',
        'Interview prep - technical + behavioral',
        'Research paper implementation and project guidance'
    ];

    return (
        <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-brand-dark to-zinc-950">
            <div className="max-w-4xl mx-auto">
                <div className="reveal glass-strong p-8 md:p-12 lg:p-16 border border-brand-gold/10 relative overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-gold/5 blur-[100px] rounded-full"></div>

                    {/* Header */}
                    <div className="relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-2xl md:text-3xl font-black">AI/ML Mentorship</h3>
                                <p className="text-brand-gold text-sm font-bold uppercase tracking-wider">1:1 Career Coaching</p>
                            </div>
                        </div>

                        <p className="reveal text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                            Over the past year, I've mentored <span className="text-white font-bold">350+ students</span> as a Teaching Assistant at DA-IICT while working on AI research. The most common struggle? People know <em>what</em> to learn, but not <em>how</em> to learn it.
                        </p>

                        {/* Services List */}
                        <div className="reveal mb-8">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-4">I can help you with:</h4>
                            <ul className="space-y-3">
                                {services.map((service, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm">
                                        <svg className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quote */}
                        <div className="reveal glass p-6 border-l-2 border-brand-gold/50 mb-8">
                            <p className="text-sm text-zinc-400 italic">
                                "I've been where you are - confused about which framework to use, whether my project is 'good enough'. I'm here to give you honest feedback and a clear path forward."
                            </p>
                        </div>

                        {/* CTA */}
                        <a
                            href="https://topmate.io/panchal_dhruv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reveal inline-block relative group interactive px-8 py-4 bg-brand-gold text-black font-black text-sm uppercase tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]"
                            data-cursor="Book"
                        >
                            <span className="relative z-10">Book a Session on Topmate</span>
                            <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mentorship;
