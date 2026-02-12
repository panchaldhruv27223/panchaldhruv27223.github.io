import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BLOGS } from '../data/constants';

const Blog: React.FC = () => {
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
        <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <div>
                        <h2 className="reveal text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                            05 — Knowledge Base
                        </h2>
                        <h3 className="reveal text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase">
                            Blog{' '}
                            <span
                                className="text-brand-gold lowercase"
                                style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1em' }}
                            >
                                archive
                            </span>
                        </h3>
                    </div>
                    <a
                        href="https://dhruv-panchal.medium.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reveal text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-brand-gold transition-colors interactive"
                        data-cursor="Medium"
                    >
                        View All on Medium →
                    </a>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {BLOGS.map((blog, idx) => {
                        const isInternal = blog.link.startsWith('/');
                        const CardContent = () => (
                            <>
                                {/* Date */}
                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                                    {blog.date}
                                </span>

                                {/* Title */}
                                <h4 className="text-xl md:text-2xl font-bold mt-4 mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                                    {blog.title}
                                </h4>

                                {/* Excerpt */}
                                <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3">
                                    {blog.excerpt}
                                </p>

                                {/* Read More */}
                                <div className="mt-6 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-gold group-hover:text-white transition-colors">
                                    <span>Read Article</span>
                                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </>
                        );

                        return isInternal ? (
                            <Link
                                key={idx}
                                to={blog.link}
                                className="reveal group block glass p-6 md:p-8 border border-white/20 hover:border-brand-gold/50 transition-all duration-500 interactive"
                                data-cursor="Read"
                            >
                                <CardContent />
                            </Link>
                        ) : (
                            <a
                                key={idx}
                                href={blog.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal group block glass p-6 md:p-8 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 interactive"
                                data-cursor="Read"
                            >
                                <CardContent />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Blog;
