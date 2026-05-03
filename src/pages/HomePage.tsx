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
    // BreadcrumbList helps Google show breadcrumb-rich snippets and gives LLMs a clean entity hierarchy.
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://panchaldhruv27223.github.io/',
            },
        ],
    };

    return (
        <div className="relative selection:bg-brand-gold/30">
            <SEO
                title="Dhruv Panchal | AI/ML Researcher & Engineer | DA-IICT"
                description="Dhruv Panchal — AI/ML Researcher and ML Engineer. M.Tech @ DA-IICT (CGPA 9.58). Gold Medalist B.E. Specializing in Computer Vision, Vision-Language Models, and Quantum ML."
                keywords="Dhruv Panchal, Dhruv Panchal AI, Dhruv Panchal ML, Dhruv Panchal portfolio, Dhruv Panchal DA-IICT, Dhruv Panchal researcher, AI Researcher India, ML Engineer India, Computer Vision, Vision Language Model, Quantum ML"
                type="profile"
                jsonLd={breadcrumbLd}
            />
            {/* Custom Cursor - Desktop Only */}
            <CustomCursor />

            {/* Navbar */}
            <Navbar />

            {/* Background */}
            <Background />

            {/* Main Content */}
            <main id="main-content">
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
