import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import SEO from '../components/SEO';
const ContactPage: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, idx * 100);
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

    type IconKey = 'mail' | 'linkedin' | 'github' | 'medium';

    const contactMethods: Array<{
        icon: IconKey;
        label: string;
        value: string;
        link: string;
        description: string;
    }> = [
        {
            icon: 'mail',
            label: 'Email',
            value: 'dhruv.panchal27223@gmail.com',
            link: 'mailto:dhruv.panchal27223@gmail.com',
            description: 'Best for detailed inquiries'
        },
        {
            icon: 'linkedin',
            label: 'LinkedIn',
            value: 'linkedin.com/in/dhruv-panchal-ab7135217',
            link: 'https://linkedin.com/in/dhruv-panchal-ab7135217',
            description: 'Professional networking'
        },
        {
            icon: 'github',
            label: 'GitHub',
            value: 'github.com/panchaldhruv27223',
            link: 'https://github.com/panchaldhruv27223',
            description: 'Open source contributions'
        },
        {
            icon: 'medium',
            label: 'Medium',
            value: 'dhruv-panchal.medium.com',
            link: 'https://dhruv-panchal.medium.com',
            description: 'Technical writing'
        }
    ];

    const renderIcon = (icon: IconKey) => {
        const props = { className: 'w-7 h-7 md:w-8 md:h-8 text-brand-gold', 'aria-hidden': true } as const;
        switch (icon) {
            case 'mail':
                return (
                    <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                );
            case 'linkedin':
                return (
                    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.356V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.555V9h3.559v11.452z" />
                    </svg>
                );
            case 'github':
                return (
                    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                );
            case 'medium':
                return (
                    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                );
        }
    };

    const services = [
        { name: 'AI/ML Consultation', availability: 'Open' },
        { name: 'Research Collaboration', availability: 'Selective' },
        { name: '1:1 Mentorship', availability: 'Open' },
        { name: 'Technical Writing', availability: 'Limited' },
    ];

    return (
        <div className="min-h-screen">
            <SEO
                title="Contact"
                description="Get in touch for collaborations, research opportunities, or just to say hi."
            />
            <CustomCursor />
            <Background />
            <Navbar />

            <main id="main-content" ref={sectionRef} className="pt-32 md:pt-40 pb-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="reveal inline-flex items-center gap-2 text-zinc-300 hover:text-brand-gold transition-colors mb-12 interactive"
                        data-cursor="Back"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
                    </Link>

                    {/* Header */}
                    <div className="mb-16 md:mb-24">
                        <h1 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                            Get in Touch
                        </h1>
                        <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
                            Let's{' '}
                            <span
                                className="text-brand-gold lowercase"
                                style={{
                                    fontFamily: "'Caveat', cursive",
                                    fontSize: '1.1em',
                                    fontWeight: 700,
                                }}
                            >
                                collaborate
                            </span>
                        </h2>
                        <p className="reveal text-xl md:text-2xl text-zinc-500 mt-6 max-w-2xl">
                            Open to research collaborations, mentorship opportunities, and innovative AI/ML projects.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                        {/* Contact Methods */}
                        <div className="space-y-6">
                            <h3 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold uppercase mb-8">
                                Connect With Me
                            </h3>

                            {contactMethods.map((method, idx) => (
                                <a
                                    key={method.label}
                                    href={method.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="reveal group block glass p-6 md:p-8 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 interactive"
                                    data-cursor={method.label}
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="flex items-start gap-4 md:gap-6">
                                        <span className="shrink-0 mt-1">{renderIcon(method.icon)}</span>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
                                                {method.label}
                                            </p>
                                            <p className="text-lg md:text-xl font-bold text-white group-hover:text-brand-gold transition-colors">
                                                {method.value}
                                            </p>
                                            <p className="text-xs text-zinc-600 mt-2">{method.description}</p>
                                        </div>
                                        <svg className="w-5 h-5 text-zinc-600 group-hover:text-brand-gold group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Availability & Quick Info */}
                        <div className="space-y-8">
                            {/* Availability Status */}
                            <div className="reveal glass-strong p-8 md:p-10 border border-brand-gold/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-xs font-black uppercase tracking-widest text-green-400">
                                        Available for Projects
                                    </span>
                                </div>
                                <h4 className="text-2xl md:text-3xl font-bold mb-6">
                                    Current{' '}
                                    <span
                                        className="text-brand-gold"
                                        style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2em' }}
                                    >
                                        availability
                                    </span>
                                </h4>

                                <div className="space-y-4">
                                    {services.map((service) => (
                                        <div key={service.name} className="flex items-center justify-between py-3 border-b border-white/5">
                                            <span className="text-sm text-zinc-400">{service.name}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${service.availability === 'Open' ? 'text-green-400' :
                                                service.availability === 'Selective' ? 'text-brand-gold' : 'text-orange-400'
                                                }`}>
                                                {service.availability}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Response */}
                            <div className="reveal glass p-8 border border-white/5">
                                <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-4">
                                    Response Time
                                </h4>
                                <p className="text-3xl md:text-4xl font-black text-white mb-2">
                                    24-48 hrs
                                </p>
                                <p className="text-sm text-zinc-500">
                                    I typically respond to professional inquiries within 1-2 business days.
                                </p>
                            </div>

                            {/* Location */}
                            <div className="reveal glass p-8 border border-white/5">
                                <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-4">
                                    Based In
                                </h4>
                                <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    Gujarat, India 🇮🇳
                                </p>
                                <p className="text-sm text-zinc-500">
                                    IST (UTC+5:30) · Open to remote collaboration worldwide
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="reveal mt-20 md:mt-32 text-center">
                        <div className="glass-strong p-12 md:p-16 border border-brand-gold/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-gold/5 blur-[100px] rounded-full"></div>

                            <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10">
                                Ready to{' '}
                                <span
                                    className="text-brand-gold"
                                    style={{ fontFamily: "'Caveat', cursive", fontSize: '1.2em' }}
                                >
                                    build
                                </span>{' '}
                                something amazing?
                            </h3>
                            <p className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto relative z-10">
                                Whether it's cutting-edge AI research or a transformative ML product, I'm excited to explore new possibilities.
                            </p>
                            <a
                                href="mailto:dhruv.panchal27223@gmail.com?subject=Let's%20Collaborate"
                                className="inline-block px-12 md:px-16 py-5 md:py-6 bg-brand-gold text-black font-black text-sm md:text-base uppercase tracking-widest hover:bg-white transition-colors duration-300 hover:shadow-[0_0_50px_rgba(201,162,39,0.3)] interactive relative z-10"
                                data-cursor="Send"
                            >
                                Send Me an Email
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
