import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const MEDIUM_URL = 'https://dhruv-panchal.medium.com/progan-is-what-you-are-looking-for-460d63bba480';

const ProGANBlog: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

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

    return (
        <div className="min-h-screen bg-brand-dark text-zinc-300 selection:bg-brand-gold/30 selection:text-white">
            <CustomCursor />
            <Background />
            <Navbar />

            <main ref={sectionRef} className="pt-32 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/blog"
                    className="reveal inline-flex items-center gap-2 text-zinc-300 hover:text-brand-gold transition-colors mb-12 interactive"
                    data-cursor="Back"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Archive</span>
                </Link>

                {/* Article Header */}
                <header className="reveal mb-16 md:mb-24 border-b border-white/10 pb-16">
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-[#C9A227] uppercase mb-6">
                        <span>Deep Learning</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>Computer Vision</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>6 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        <span className="text-brand-violet">ProGAN</span> is What You're Looking For
                    </h1>

                    <p className="text-lg text-zinc-400 mb-8">
                        Generating high resolution images from low resolution — Progressive Growing of GANs explained.
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
                            <img src="/images/personal_images/profile.jpg" alt="Dhruv Panchal" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Dhruv Panchal</p>
                            <p className="text-xs text-zinc-500">AI/ML Researcher</p>
                        </div>
                    </div>
                </header>

                {/* Article Preview */}
                <article className="reveal prose prose-invert prose-lg max-w-none">
                    <p className="lead text-xl md:text-2xl text-zinc-200 font-light leading-relaxed mb-12">
                        I'm excited to share about my latest project where I'm using <strong>ProGAN</strong> (Progressive Growing of GANs) to enhance low-resolution images into stunning high-resolution versions. If you're new to AI and machine learning, don't worry — I'll break it down step by step.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">What Are GANs?</h2>
                    <p className="mb-6">
                        GANs (Generative Adversarial Networks) are a type of AI model invented by Ian Goodfellow in 2014. They're like two artists competing in a contest:
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 bg-white/5 border border-brand-violet/30 rounded-lg">
                            <h3 className="text-2xl font-bold text-brand-violet mb-4">🎨 Generator</h3>
                            <p className="text-zinc-300">The 'forger' that creates fake images from random noise, trying to make them look as real as possible.</p>
                        </div>
                        <div className="p-8 bg-white/5 border border-brand-gold/30 rounded-lg">
                            <h3 className="text-2xl font-bold text-brand-gold mb-4">🔍 Discriminator</h3>
                            <p className="text-zinc-300">The 'critic' that looks at images and decides if they're real (from the dataset) or fake.</p>
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Enter ProGAN: Progressive Growing</h2>
                    <p className="mb-8">
                        ProGAN, developed by NVIDIA researchers in 2017, is a smart upgrade to regular GANs. Instead of starting with high resolution immediately, it <strong>grows progressively</strong>:
                    </p>

                    <div className="space-y-4 mb-12">
                        {[
                            { step: '1', title: 'Start Low-Res', desc: 'Training begins with tiny 4×4 pixel images focusing on basic shapes and colors' },
                            { step: '2', title: 'Add Layers Progressively', desc: 'New layers are added to double resolution: 4×4 → 8×8 → 16×16 → ... → 1024×1024' },
                            { step: '3', title: 'Smooth Fade-in', desc: 'New layers blend in gradually using alpha blending to avoid training shocks' },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-black text-sm">{item.step}</span>
                                <div>
                                    <h4 className="font-bold text-white">{item.title}</h4>
                                    <p className="text-sm text-zinc-400">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Fade Out Effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none"></div>
                        <div className="opacity-50">
                            <h2 className="text-2xl font-bold text-white mb-4">ProGAN in Action: Super-Resolution</h2>
                            <p className="text-zinc-400">
                                The full article covers how ProGAN techniques are adapted for super-resolution, generating ultra-realistic faces, and my implementation with code on GitHub...
                            </p>
                        </div>
                    </div>

                    {/* Continue Reading CTA */}
                    <div className="mt-16 p-8 md:p-12 glass-strong border border-brand-gold/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
                        <h3 className="text-2xl font-black text-white mb-4">Continue Reading on Medium</h3>
                        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                            The full article covers architecture diagrams, super-resolution applications, and links to my GitHub implementation.
                        </p>
                        <a
                            href={MEDIUM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A227] text-black font-black text-sm uppercase tracking-widest hover:bg-white transition-colors hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] interactive"
                            data-cursor="Medium"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                            </svg>
                            Read Full Article
                        </a>
                    </div>

                    {/* GitHub Link */}
                    <div className="mt-8 text-center">
                        <a
                            href="https://github.com/panchaldhruv27223/ProGANS_cv"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-brand-gold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Code on GitHub
                        </a>
                    </div>

                </article>
            </main>

            <Footer />
        </div>
    );
};

export default ProGANBlog;
