import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const MEDIUM_URL = 'https://dhruv-panchal.medium.com/scikit-learn-essentials-why-to-use-scikit-learn-and-how-to-use-e03e1aca258d';

const SklearnEssentialsBlog: React.FC = () => {
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
                        <span>Python</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>Machine Learning</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>5 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        Scikit-learn Essentials: <span className="text-brand-violet">Why</span> & <span className="text-brand-gold">How</span>
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
                        When you start with Machine Learning in Python, you quickly notice a problem: NumPy is great for arrays, Pandas for tabular data, Matplotlib for plotting... but what about training models? That's where <strong>Scikit-learn</strong> comes in.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">What is Scikit-learn?</h2>
                    <p className="mb-8">
                        Scikit-learn (also known as <code className="text-brand-gold px-2 py-1 bg-white/5 rounded">sklearn</code>) is an open-source machine learning library for Python. It provides ready-to-use ML algorithms, tools for data preprocessing, functions for model evaluation, and utilities to build pipelines.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">The Consistent API</h2>
                    <p className="mb-6">
                        Scikit-learn treats everything — whether it's a model (estimator), a data transformer, or a pipeline — in a unified way. Once you learn the key methods, you can use any algorithm in the library:
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {[
                            { method: '.fit()', desc: 'Learning from Data' },
                            { method: '.predict()', desc: 'Making Predictions' },
                            { method: '.score()', desc: 'Evaluating Performance' },
                            { method: '.transform()', desc: 'Transforming Data' },
                        ].map((item) => (
                            <div key={item.method} className="p-4 bg-white/5 border border-white/5 rounded text-center">
                                <code className="text-brand-gold font-mono">{item.method}</code>
                                <p className="text-xs text-zinc-500 mt-2">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Features of Scikit-learn</h2>
                    <ul className="list-disc pl-6 space-y-2 mb-8 text-zinc-400 marker:text-brand-gold">
                        <li><strong className="text-white">Preprocessing:</strong> Handle missing values, scale features, encode categories</li>
                        <li><strong className="text-white">Supervised Learning:</strong> Logistic regression, SVM, Random Forest, Gradient Boosting</li>
                        <li><strong className="text-white">Unsupervised Learning:</strong> Clustering (KMeans, DBSCAN), Dimensionality Reduction (PCA)</li>
                        <li><strong className="text-white">Model Selection:</strong> Cross-validation, hyperparameter tuning</li>
                    </ul>

                    {/* Fade Out Effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none"></div>
                        <div className="opacity-50">
                            <h2 className="text-2xl font-bold text-white mb-4">Data Preprocessing with Scikit-learn</h2>
                            <p className="text-zinc-400">
                                The full article covers handling missing values, encoding categorical variables (Label, One-Hot, Ordinal), feature scaling, train-test splits, and building preprocessing pipelines...
                            </p>
                        </div>
                    </div>

                    {/* Continue Reading CTA */}
                    <div className="mt-16 p-8 md:p-12 glass-strong border border-brand-gold/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
                        <h3 className="text-2xl font-black text-white mb-4">Continue Reading on Medium</h3>
                        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                            The full article covers complete preprocessing workflows: handling missing values, encoding, scaling, and building end-to-end pipelines with ColumnTransformer.
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
                            "The beauty of Scikit-learn lies in its simplicity. By standardizing the API across models, transformers, and pipelines, it allows us to focus more on ideas and less on syntax."
                        </p>
                        <p className="mt-4 text-sm font-bold text-brand-gold uppercase tracking-widest">— Dhruv Panchal</p>
                    </div>

                </article>
            </main>

            <Footer />
        </div>
    );
};

export default SklearnEssentialsBlog;
