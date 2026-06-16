import React, { useState, useEffect } from 'react';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 2 viewport heights
            setVisible(window.scrollY > window.innerHeight * 2);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`
                fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center
                shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1
                bg-[var(--accent)] text-[var(--text-on-dark)] dark:bg-[#d4af37] dark:text-gray-900
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
            style={{
                boxShadow: '0 4px 16px var(--shadow-strong)',
            }}
            aria-label="Back to top"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default BackToTop;
