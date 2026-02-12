import React, { useEffect, useRef } from 'react';
import { SOCIAL_LINKS, CONTACT } from '../data/constants';

const Footer: React.FC = () => {
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
        <footer ref={sectionRef} className="pt-24 md:pt-64 lg:pt-80 pb-16 md:pb-24 lg:pb-32 px-6 md:px-12 lg:px-24 relative overflow-hidden bg-white text-black">
            <div className="max-w-7xl mx-auto">
                {/* Main CTA */}
                <div className="text-center mb-16 md:mb-48 lg:mb-64">
                    <h2 className="reveal text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.8] tracking-tighter mb-12 md:mb-16 text-black">
                        Let's Build <br />
                        <span
                            className="text-transparent"
                            style={{ WebkitTextStroke: '2px black' }}
                        >
                            INTELLIGENCE.
                        </span>
                    </h2>

                    {/* Contact Button */}
                    <a
                        href={`mailto:${CONTACT.email}`}
                        className="reveal inline-block relative group interactive px-12 md:px-16 lg:px-20 py-5 md:py-6 lg:py-8 border border-black/10 overflow-hidden"
                        data-cursor="Connect"
                    >
                        <span className="relative z-10 text-base md:text-lg lg:text-xl font-black tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-white">
                            INITIATE_CONTACT
                        </span>
                        <div className="absolute inset-0 bg-black scale-x-0 origin-right transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-hover:origin-left"></div>
                    </a>
                </div>

                {/* Footer Grid */}
                <div className="grid md:grid-cols-3 gap-12 md:gap-16 pt-16 md:pt-24 border-t border-black/10 items-start">
                    {/* Location */}
                    <div className="reveal">
                        <span className="text-[9px] font-black tracking-[0.5em] text-zinc-400 uppercase block mb-4">
                            Coordinates
                        </span>
                        <p className="text-xs md:text-sm font-black">{CONTACT.location}</p>
                    </div>

                    {/* Social Links */}
                    <div className="reveal flex flex-col gap-4">
                        <span className="text-[9px] font-black tracking-[0.5em] text-zinc-400 uppercase block">
                            Connect
                        </span>
                        <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 text-xs font-black uppercase">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-brand-gold transition-colors interactive"
                                    data-cursor={link.name}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="reveal md:text-right">
                        <span className="text-[9px] font-black tracking-[0.5em] text-zinc-400 uppercase block mb-4">
                            System Status
                        </span>
                        <div className="flex md:justify-end items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-[9px] font-black uppercase">Open for Collaboration</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="reveal mt-16 md:mt-24 pt-8 border-t border-black/5 text-center">
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        © {new Date().getFullYear()} Dhruv Panchal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
