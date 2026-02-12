import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

const MEDIUM_URL = 'https://dhruv-panchal.medium.com/fine-tuning-u-net-for-satellite-image-segmentation-5073146deb23';

const UNetFineTuningBlog: React.FC = () => {
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
                        <span>Satellite Imagery</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                        <span>3 min read</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-8">
                        Fine-Tuning <span className="text-brand-violet">U-Net</span> for Satellite Segmentation
                    </h1>

                    <p className="text-lg text-zinc-400 mb-8">
                        A practical follow-up on the theoretical foundations of U-Net, applying it to real-world satellite imagery tasks.
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
                        In the last blog, we covered the theoretical foundations of U-Net. Now, let's dive into the practical aspect: <strong>fine-tuning U-Net for a specific task</strong> — segmenting rooftops from satellite imagery.
                    </p>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Dataset Preparation</h2>
                    <p className="mb-6">
                        Fine-tuning a U-Net model starts with proper dataset preparation. The dataset consists of satellite images and corresponding segmentation masks:
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-12">
                        {[
                            { step: 'Resizing', desc: 'Uniform size (256×256 pixels)' },
                            { step: 'Normalization', desc: 'Pixel values scaled to [0, 1]' },
                            { step: 'Splitting', desc: 'Train, validation, and test sets' },
                        ].map((item) => (
                            <div key={item.step} className="p-4 bg-white/5 border border-white/5 rounded text-center">
                                <h4 className="font-bold text-brand-gold">{item.step}</h4>
                                <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Data Augmentation</h2>
                    <p className="mb-6">To improve model generalization, data augmentation techniques are applied:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-8 text-zinc-400 marker:text-brand-gold">
                        <li><strong className="text-white">Horizontal flips</strong></li>
                        <li><strong className="text-white">Rotations</strong> (up to 30°)</li>
                        <li><strong className="text-white">Brightness & contrast</strong> adjustments</li>
                    </ul>

                    <h2 className="text-3xl font-black text-white mt-16 mb-8">Model Customization</h2>
                    <p className="mb-8">
                        We use U-Net with a pre-trained <strong>ResNet34 encoder</strong>. Pre-trained models offer excellent feature extraction, especially when data is limited. The sigmoid activation is ideal for binary segmentation.
                    </p>

                    {/* Fade Out Effect */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none"></div>
                        <div className="opacity-50">
                            <h2 className="text-2xl font-bold text-white mb-4">Training Process & Results</h2>
                            <p className="text-zinc-400">
                                The full article covers Dice Loss, IoU metrics, callbacks, training code, and visual comparison of ground truth vs predicted masks...
                            </p>
                        </div>
                    </div>

                    {/* Continue Reading CTA */}
                    <div className="mt-16 p-8 md:p-12 glass-strong border border-brand-gold/30 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent"></div>
                        <h3 className="text-2xl font-black text-white mb-4">Continue Reading on Medium</h3>
                        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                            The full article includes complete training code, Dice Loss implementation, callbacks, and visual comparisons of segmentation results.
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

                </article>
            </main>

            <Footer />
        </div>
    );
};

export default UNetFineTuningBlog;
