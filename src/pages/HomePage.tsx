import React from 'react';
import Background from '../components/Background';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Certificates from '../components/Certificates';
import Footer from '../components/Footer';

import SEO from '../components/SEO';

const HomePage: React.FC = () => {
    return (
        <div className="relative selection:bg-brand-gold/30">
            <SEO
                title="Dhruv Panchal | AI/ML Researcher & Engineer"
                description="AI/ML Researcher specializing in Computer Vision, Multimodal AI, and Quantum Machine Learning. Building sentient-like vision systems."
                keywords="AI, Machine Learning, Computer Vision, Deep Learning, Dhruv Panchal, Portfolio"
            />
            {/* Custom Cursor - Desktop Only */}
            <CustomCursor />

            {/* Navbar */}
            <Navbar />

            {/* Background */}
            <Background />

            {/* Main Content */}
            <main>
                {/* Hero Section - Cinematic Introduction */}
                <Hero />

                {/* About / Mission Section */}
                <About />

                {/* Projects / Research Archive */}
                <Projects />

                {/* Experience Timeline */}
                <Experience />

                {/* Skills / Tech Stack */}
                <Skills />

                {/* Certificates */}
                <Certificates />

                {/* Footer with Contact */}
                <Footer />
            </main>
        </div>
    );
};

export default HomePage;
