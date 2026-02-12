import React from 'react';
import bgImg from '../../images/background_image/eagle_image_1.jpg';

const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* ... */}
            {/* Eagle image background - very subtle */}
            <div
                className="absolute inset-0 opacity-[0.06] sm:opacity-[0.08]"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'grayscale(100%)',
                }}
            />

            {/* Dark overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5) 0%, rgba(5, 5, 5, 0.85) 100%)'
                }}
            />

            {/* Vignette effect */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 5, 0.6) 100%)'
                }}
            />

            {/* Subtle gold accent glow - top right */}
            <div
                className="absolute top-0 right-0 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] rounded-full opacity-[0.03] sm:opacity-[0.04]"
                style={{
                    background: 'radial-gradient(circle, #C9A227 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    transform: 'translate(20%, -20%)',
                }}
            />
        </div>
    );
};

export default Background;
