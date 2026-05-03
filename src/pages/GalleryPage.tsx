import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background';
import CustomCursor from '../components/CustomCursor';
import Navbar from '../components/Navbar';

import SEO from '../components/SEO';

// Dynamically import all images from the gallery folder
const galleryModules = import.meta.glob('../../images/gallery_images/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const galleryImages = Object.values(galleryModules) as string[];

// Define Interface for clarity
interface GalleryItem {
    id: number;
    category: string;
    title: string;
    description: string;
    size: string;
    image: string;
}

const GalleryPage: React.FC = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

    // Lock body scroll while the lightbox is open. Without this, the page scrolls behind the dark overlay.
    useEffect(() => {
        if (selectedImage === null) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previous; };
    }, [selectedImage]);

    // Keyboard navigation in the lightbox: Esc closes, arrow keys move between images.
    useEffect(() => {
        if (selectedImage === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedImage(null);
            } else if (e.key === 'ArrowRight') {
                setSelectedImage((i) => (i === null ? null : (i + 1) % galleryImages.length));
            } else if (e.key === 'ArrowLeft') {
                setSelectedImage((i) => (i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length));
            }
        };
        window.addEventListener('keydown', onKey);
        // Move focus into the lightbox so screen readers announce the new context.
        closeButtonRef.current?.focus();
        return () => window.removeEventListener('keydown', onKey);
    }, [selectedImage]);

    // Generate gallery items from imported images
    const galleryItems: GalleryItem[] = galleryImages.map((img: string, idx: number) => ({
        id: idx,
        category: 'Gallery',
        title: `Memory ${idx + 1}`,
        description: '',
        size: idx % 6 === 0 || idx % 6 === 3 ? 'large' : 'normal', // varied pattern
        image: img
    }));

    return (
        <div className="min-h-screen bg-brand-dark relative">
            <SEO
                title="Visual Gallery"
                description="A visual journey through research conferences, workshops, and memorable moments from my career."
            />
            <CustomCursor />
            <Navbar />
            <Background />

            <main id="main-content" ref={pageRef} className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="reveal inline-flex items-center gap-2 text-zinc-300 hover:text-brand-gold transition-colors mb-12 interactive"
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
                            Visual Archive
                        </h1>
                        <h2 className="reveal text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase">
                            Memory{' '}
                            <span
                                className="text-brand-gold lowercase"
                                style={{ fontFamily: "'Caveat', cursive", fontSize: '1.1em' }}
                            >
                                gallery
                            </span>
                        </h2>
                        <p className="reveal text-zinc-500 max-w-xl text-lg">
                            A visual journey through research, learning, and memorable moments.
                        </p>
                    </div>

                    {/* Gallery Grid */}
                    {galleryItems.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {galleryItems.map((item, idx) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSelectedImage(idx)}
                                    aria-label={`Open image ${idx + 1} in fullscreen`}
                                    className={`reveal group relative overflow-hidden cursor-pointer interactive text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark ${item.size === 'large' ? 'col-span-2 row-span-2' : ''}`}
                                    data-cursor="View"
                                >
                                    <div className={`relative ${item.size === 'large' ? 'aspect-square' : 'aspect-[4/5]'} bg-brand-obsidian border border-white/20 group-hover:border-brand-gold/50 transition-all duration-500`}>

                                        {/* Actual Image */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                            decoding="async"
                                        />

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                                            <span className="text-[9px] text-brand-gold uppercase tracking-widest font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                View image
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-lg">
                            <p className="text-zinc-500">No images found in gallery.</p>
                        </div>
                    )}

                    {/* Footer Note */}
                    <div className="reveal mt-16 md:mt-24 text-center py-12 border-t border-white/5">
                        <p className="text-zinc-600 text-sm uppercase tracking-widest font-bold">
                            Total {galleryItems.length} Captured Moments
                        </p>
                    </div>
                </div>
            </main>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Image ${selectedImage + 1} of ${galleryItems.length}`}
                    className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close */}
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                        className="absolute top-6 right-6 md:top-8 md:right-8 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors z-[310] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label="Close lightbox (Esc)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((i) => (i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length));
                        }}
                        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors z-[310] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label="Previous image (Left arrow)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage((i) => (i === null ? null : (i + 1) % galleryItems.length));
                        }}
                        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white hover:bg-brand-gold hover:text-black hover:border-brand-gold transition-colors z-[310] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                        aria-label="Next image (Right arrow)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 border border-white/10 rounded-full text-[10px] font-bold tracking-widest text-white uppercase z-[310] pointer-events-none">
                        {selectedImage + 1} / {galleryItems.length}
                    </div>

                    <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={galleryItems[selectedImage].image}
                            alt={galleryItems[selectedImage].title}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
