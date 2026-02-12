import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BLOGS } from '../data/constants';

import SEO from '../components/SEO';

const BlogPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
                            setTimeout(() => el.classList.add('visible'), idx * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (pageRef.current) observer.observe(pageRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-brand-dark relative">
            <SEO
                title="Blog"
                description="Insights and thoughts on Artificial Intelligence, Machine Learning, Computer Vision, and the future of technology."
            />
            <CustomCursor />
            <Navbar />
            <Background />

            <main ref={pageRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="reveal inline-flex items-center gap-2 text-zinc-500 hover:text-brand-gold transition-colors mb-12 interactive"
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
                            Knowledge Archive
                        </h1>
                        <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
                            BLOG
                        </h2>
                        <p className="reveal text-zinc-500 max-w-xl text-lg">
                            Thoughts on AI, machine learning, computer vision, and the future of intelligence.
                        </p>
                    </div>

                    {/* Featured Post */}
                    {BLOGS[0] && (() => {
                        const isInternal = BLOGS[0].link.startsWith('/');
                        const FeaturedContent = () => (
                            <div className="glass p-8 md:p-12 border border-white/5 hover:border-brand-gold/30 transition-all duration-500">
                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                                    Featured · {BLOGS[0].date}
                                </span>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 group-hover:text-brand-gold transition-colors">
                                    {BLOGS[0].title}
                                </h3>
                                <p className="text-zinc-400 text-lg mb-8 max-w-3xl">
                                    {BLOGS[0].excerpt}
                                </p>
                                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
                                    <span>Read Full Article</span>
                                    <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                            </div>
                        );

                        return isInternal ? (
                            <Link
                                to={BLOGS[0].link}
                                className="reveal group block mb-16 md:mb-24 interactive"
                                data-cursor="Read"
                            >
                                <FeaturedContent />
                            </Link>
                        ) : (
                            <a
                                href={BLOGS[0].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="reveal group block mb-16 md:mb-24 interactive"
                                data-cursor="Read"
                            >
                                <FeaturedContent />
                            </a>
                        );
                    })()}

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {BLOGS.slice(1).map((blog, idx) => {
                            const isInternal = blog.link.startsWith('/');
                            const CardContent = () => (
                                <>
                                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                                        {blog.date}
                                    </span>
                                    <h4 className="text-xl md:text-2xl font-bold mt-4 mb-4 group-hover:text-brand-gold transition-colors leading-tight">
                                        {blog.title}
                                    </h4>
                                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-3 mb-6">
                                        {blog.excerpt}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                                        <span>Read</span>
                                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </>
                            );

                            return isInternal ? (
                                <Link
                                    key={idx}
                                    to={blog.link}
                                    className="reveal group block glass p-6 md:p-8 border border-white/5 hover:border-brand-gold/30 transition-all duration-500 interactive"
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

                    {/* Medium CTA */}
                    <div className="reveal mt-16 md:mt-24 text-center">
                        <a
                            href="https://dhruv-panchal.medium.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-all duration-300 interactive"
                            data-cursor="Medium"
                        >
                            View All on Medium
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;
