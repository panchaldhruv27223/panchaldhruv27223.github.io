import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import Consultation from '../components/Consultation';

const ConsultationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-dark relative">
            <SEO
                title="Consultation & Mentorship"
                description="Book 1:1 sessions for AI/ML career guidance, resume reviews, and research mentorship."
            />
            <CustomCursor />
            <Navbar />
            <Background />

            <main className="pt-20">
                {/* Back Link */}
                <div className="px-6 md:px-12 lg:px-24 pt-12">
                    <div className="max-w-6xl mx-auto">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-brand-gold transition-colors interactive"
                            data-cursor="Back"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
                        </Link>
                    </div>
                </div>

                {/* Use the shared Consultation component */}
                <Consultation />
            </main>

            <Footer />
        </div>
    );
};

export default ConsultationPage;
