/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand': {
                    // REFINED DARK PALETTE - Pure & Powerful
                    dark: '#0A0A0A',          // Near Black
                    deeper: '#050505',        // Absolute Black
                    charcoal: '#1A1A1A',      // Charcoal
                    steel: '#2A2A2A',         // Steel
                    slate: '#3A3A3A',         // Slate

                    // Primary Accent - Rich Gold
                    gold: '#C9A227',          // Rich Gold
                    amber: '#D4AF37',         // Classic Gold
                    bronze: '#B8860B',        // Dark Gold

                    // Secondary Accent - Violet (for keywords)
                    violet: '#8B5CF6',        // Bright Violet
                    purple: '#7C3AED',        // Deep Purple

                    // Tertiary Accent - Emerald (for success)
                    emerald: '#10B981',       // Emerald Green

                    // Text - Clean Hierarchy
                    white: '#FFFFFF',         // Pure White
                    silver: '#E0E0E0',        // Light Silver
                    muted: '#888888',         // Muted Gray
                    dim: '#555555',           // Dim Gray
                },
            },
            fontFamily: {
                'heading': ['Outfit', 'sans-serif'],
                'body': ['Inter', 'sans-serif'],
                'script': ['Caveat', 'cursive'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(201, 162, 39, 0.1)' },
                    '100%': { boxShadow: '0 0 40px rgba(201, 162, 39, 0.2)' },
                }
            },
            screens: {
                'xs': '375px',
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
        },
    },
    plugins: [],
}
