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

    const contactMethods = [
        {
            icon: '✉️',
            label: 'Email',
            value: 'dhruv.panchal27223@gmail.com',
            link: 'mailto:dhruv.panchal27223@gmail.com',
            description: 'Best for detailed inquiries'
        },
        {
            icon: '💼',
            label: 'LinkedIn',
            value: 'linkedin.com/in/dhruv-panchal-ab7135217',
            link: 'https://linkedin.com/in/dhruv-panchal-ab7135217',
            description: 'Professional networking'
        },
        {
            icon: '🐙',
            label: 'GitHub',
            value: 'github.com/panchaldhruv27223',
            link: 'https://github.com/panchaldhruv27223',
            description: 'Open source contributions'
        },
        {
            icon: '📝',
            label: 'Medium',
            value: 'dhruv-panchal.medium.com',
            link: 'https://dhruv-panchal.medium.com',
            description: 'Technical writing'
        }
    ];

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

            <main ref={sectionRef} className="pt-32 md:pt-40 pb-20 px-6 md:px-12 lg:px-24">
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
                                        <span className="text-2xl md:text-3xl">{method.icon}</span>
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
