import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const MEDIUM_URL = 'https://dhruv-panchal.medium.com/supervised-learning-with-scikit-learn-282ef3a28350';

const SupervisedLearningBlog: React.FC = () => {
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
                        <span>Machine Learning</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>Aug 31, 2025</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>4 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        Supervised Learning with <span className="text-brand-violet">Scikit-learn</span>
                    </h1>

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
                        Machine learning is often divided into two big families: Supervised and Unsupervised learning. In this blog, we'll focus on <strong>Supervised Learning (Regression)</strong>, the foundation for most practical machine learning tasks.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">What is Supervised Learning?</h2>
                    <p className="mb-6">
                        In supervised learning, we teach a model using <strong>labeled data</strong>. The dataset contains input features (X) and target labels (y). The model learns the mapping <code className="text-brand-gold">X → y</code>, and then predicts labels for unseen data.
                    </p>

                    <p className="mb-4 text-zinc-300">Examples in real life:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-8 text-zinc-400 marker:text-brand-gold">
                        <li><strong className="text-white">Predicting house prices</strong> (Regression)</li>
                        <li><strong className="text-white">Classifying emails</strong> as spam or not (Classification)</li>
                        <li><strong className="text-white">Predicting loan defaults</strong> (Classification)</li>
                    </ul>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Types of Supervised Learning</h2>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 bg-white/5 border border-white/5 rounded-lg">
                            <h3 className="text-2xl font-bold text-brand-gold mb-4">1. Classification</h3>
                            <p className="text-zinc-300 mb-4"><strong>Output:</strong> Discrete categories.</p>
                            <p className="text-sm text-zinc-500"><strong>Example:</strong> Will a tumor be benign or malignant?</p>
                        </div>
                        <div className="p-8 bg-white/5 border border-white/5 rounded-lg">
                            <h3 className="text-2xl font-bold text-brand-gold mb-4">2. Regression</h3>
                            <p className="text-zinc-300 mb-4"><strong>Output:</strong> Continuous values.</p>
                            <p className="text-sm text-zinc-500"><strong>Example:</strong> Predicting house price in dollars.</p>
                        </div>
                    </div>

                    {/* Fade Out Effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none"></div>
                        <div className="opacity-50">
                            <h2 className="text-2xl font-bold text-white mb-4">Types of Regression in Scikit-learn</h2>
                            <p className="text-zinc-400">
                                The full article covers 6 regression methods: Linear Regression, Ridge, Lasso, Polynomial, SVR, and Tree-Based methods with complete code examples...
                            </p>
                        </div>
                    </div>

                    {/* Continue Reading CTA */}
                    <div className="mt-16 p-8 md:p-12 glass-strong border border-brand-gold/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
                        <h3 className="text-2xl font-black text-white mb-4">Continue Reading on Medium</h3>
                        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                            The full article covers all regression types, evaluation metrics (MAE, MSE, RMSE, R²), and includes a hands-on Colab notebook.
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

                    <div className="mt-16 text-center">
                        <p className="text-xl md:text-2xl font-serif italic text-zinc-400">
                            "Every great model starts with a single line of code, and every skill with a single step of practice."
                        </p>
                        <p className="mt-4 text-sm font-bold text-brand-gold uppercase tracking-widest">— Dhruv Panchal</p>
                    </div>

                </article>
            </main>

            <Footer />
        </div>
    );
};

export default SupervisedLearningBlog;
