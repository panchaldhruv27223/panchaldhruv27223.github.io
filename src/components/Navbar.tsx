import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Home', href: '/', isRoute: true },
        { name: 'About', href: isHomePage ? '#about' : '/#about', isRoute: false },
        { name: 'Projects', href: isHomePage ? '#projects' : '/#projects', isRoute: false },
        { name: 'Experience', href: isHomePage ? '#experience' : '/#experience', isRoute: false },
        { name: 'Blog', href: '/blog', isRoute: true },
        { name: 'Gallery', href: '/gallery', isRoute: true },
        { name: 'Consultation', href: '/consultation', isRoute: true },
        { name: 'Contact', href: '/contact', isRoute: true },
    ];

    const handleLinkClick = (link: typeof navLinks[0]) => {
        setIsMenuOpen(false);
        if (link.name === 'Home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (!link.isRoute && !isHomePage) {
            window.location.href = link.href;
        }
    };

    return (
        <>
            {/* Main Navbar */}
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 transition-all duration-500 ${scrolled ? 'bg-brand-dark/50 backdrop-blur-xl supports-[backdrop-filter]:bg-brand-dark/30' : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="interactive group flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/30 hover:border-brand-gold/50 bg-white/10 hover:bg-brand-gold/5 transition-all duration-300"
                        data-cursor="Open"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="block w-4 h-[2px] bg-white transition-all group-hover:w-5 group-hover:bg-brand-gold"></span>
                            <span className="block w-3 h-[2px] bg-white transition-all group-hover:w-5 group-hover:bg-brand-gold"></span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-white">Menu</span>
                    </button>

                    {/* Center Logo/Text - Links to Home */}
                    <Link
                        to="/"
                        className="flex items-center gap-1 sm:gap-2 interactive"
                        data-cursor="Home"
                    >
                        <span className="text-xs sm:text-sm md:text-base font-black tracking-[0.15em] uppercase text-white/70">Dhruv</span>
                        <span
                            className="text-lg sm:text-xl md:text-2xl text-brand-gold italic"
                            style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
                        >
                            Panchal
                        </span>
                    </Link>

                    {/* CTA Button */}
                    <a
                        href="mailto:dhruv.panchal27223@gmail.com"
                        className="interactive group relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#C9A227] text-black font-black text-[10px] sm:text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)] whitespace-nowrap"
                        data-cursor="Email"
                    >
                        <span className="relative z-10">Let's Talk</span>
                    </a>
                </div>
            </nav>

            {/* Full Screen Menu Overlay */}
            <div
                className={`fixed inset-0 z-[200] transition-all duration-500 ${isMenuOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Background - Pure Black with Blur */}
                <div
                    className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md supports-[backdrop-filter]:bg-brand-dark/60"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Content - Scrollable */}
                <div className="relative h-full flex flex-col px-4 sm:px-8 md:px-16 py-6 sm:py-8 md:py-10 overflow-y-auto">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="self-start interactive flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 hover:border-brand-gold/50 bg-white/[0.02] hover:bg-brand-gold/5 transition-all duration-300 mb-8"
                        data-cursor="Close"
                    >
                        <div className="relative w-4 h-4">
                            <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white rotate-45"></span>
                            <span className="absolute top-1/2 left-0 w-full h-[2px] bg-white -rotate-45"></span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-white">Close</span>
                    </button>

                    {/* Navigation Links - Scrollable Container */}
                    <div className="flex-1 flex flex-col justify-start gap-3 sm:gap-4 md:gap-6 py-4">
                        {navLinks.map((link, idx) => (
                            link.isRoute ? (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => handleLinkClick(link)}
                                    className="interactive group block"
                                    data-cursor="Go"
                                    style={{
                                        transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
                                        opacity: isMenuOpen ? 1 : 0,
                                        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s`
                                    }}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                                        <span className="text-[10px] sm:text-xs text-brand-gold/60 font-mono">0{idx + 1}</span>
                                        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white group-hover:text-brand-gold transition-colors">
                                            {link.name}
                                        </span>
                                    </div>
                                </Link>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => handleLinkClick(link)}
                                    className="interactive group block"
                                    data-cursor="Go"
                                    style={{
                                        transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
                                        opacity: isMenuOpen ? 1 : 0,
                                        transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s`
                                    }}
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                                        <span className="text-[10px] sm:text-xs text-brand-gold/60 font-mono">0{idx + 1}</span>
                                        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white group-hover:text-brand-gold transition-colors">
                                            {link.name}
                                        </span>
                                    </div>
                                </a>
                            )
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10 mt-auto">
                        <div>
                            <p className="text-[10px] sm:text-xs text-brand-muted uppercase tracking-widest mb-1">Email</p>
                            <a href="mailto:dhruv.panchal27223@gmail.com" className="text-sm sm:text-base text-white hover:text-brand-gold transition-colors interactive" data-cursor="Copy">
                                dhruv.panchal27223@gmail.com
                            </a>
                        </div>
                        <div className="flex gap-4 sm:gap-6 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                            <a href="https://github.com/panchaldhruv27223" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold transition-colors interactive" data-cursor="GitHub">GitHub</a>
                            <a href="https://linkedin.com/in/dhruv-panchal-ab7135217" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold transition-colors interactive" data-cursor="LinkedIn">LinkedIn</a>
                            <a href="https://dhruv-panchal.medium.com" target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold transition-colors interactive" data-cursor="Medium">Medium</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
