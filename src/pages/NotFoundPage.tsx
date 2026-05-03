import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import SEO from '../components/SEO';

const NotFoundPage: React.FC = () => {
    return (
        <div className="relative min-h-screen selection:bg-brand-gold/30">
            <SEO
                title="Page Not Found"
                description="The page you're looking for doesn't exist on Dhruv Panchal's portfolio."
            />
            <CustomCursor />
            <Navbar />
            <Background />

            <main id="main-content" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
                <p className="text-[10px] font-bold tracking-[0.5em] text-brand-gold mb-6 uppercase">
                    Error · 404
                </p>
                <h1 className="text-[20vw] md:text-[16vw] lg:text-[14vw] leading-[0.8] font-black tracking-tighter uppercase mb-6">
                    Lost in{' '}
                    <span
                        className="text-brand-gold lowercase"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        the void
                    </span>
                </h1>
                <p className="max-w-md text-zinc-400 text-sm md:text-base mb-10">
                    The page you tried to reach doesn't exist — it may have moved, or never been here at all.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/"
                        className="px-8 py-3 bg-brand-gold text-black font-black text-xs tracking-widest uppercase hover:bg-brand-amber transition-colors interactive"
                        data-cursor="Home"
                    >
                        Take me home
                    </Link>
                    <Link
                        to="/blog"
                        className="px-8 py-3 border border-white/20 text-white font-black text-xs tracking-widest uppercase hover:border-brand-gold/50 hover:text-brand-gold transition-colors interactive"
                        data-cursor="Read"
                    >
                        Read the blog
                    </Link>
                </div>

                <div className="mt-16 text-[10px] text-zinc-600 uppercase tracking-[0.5em]">
                    Dhruv Panchal · AI/ML Researcher
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFoundPage;
