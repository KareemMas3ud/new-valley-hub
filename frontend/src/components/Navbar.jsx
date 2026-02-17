import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [isFloating, setIsFloating] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsFloating(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setShowInstallBtn(true);
        };

        const handleAppInstalled = () => {
            // Hide the app-provided install promotion
            setShowInstallBtn(false);
            setDeferredPrompt(null);
            console.log('PWA was installed');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, discard it
        setDeferredPrompt(null);
        setShowInstallBtn(false);
    };

    return (
        <nav
            className={`
                fixed z-50 transition-all duration-500 ease-in-out
                ${isFloating
                    ? 'top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] rounded-full bg-[#FFF4E2]/95 border border-[#D3AB80]/40 shadow-xl shadow-[#472825]/10 py-3'
                    : 'top-0 left-0 w-full bg-[#FFF4E2] border-b border-[#D3AB80]/20 rounded-none shadow-none py-5'
                }
            `}
        >
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
                        <img
                            src={logo}
                            alt="New Valley Hub Logo"
                            className={`w-auto object-contain transition-all duration-500 ${isFloating ? 'h-10' : 'h-12'}`}
                        />
                    </Link>

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {[
                            { path: "/", label: "Home" },
                            { path: "/attractions", label: "Attractions" },
                            { path: "/services", label: "Services" },
                            { path: "/hotels", label: "Hotels" },
                            { path: "/map", label: "Map" },
                            { path: "/marketplace", label: "Market" },
                            { path: "/souvenir", label: "Souvenir 📸" },
                            { path: "/contact", label: "Contact" },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="text-[#472825] font-semibold text-base hover:text-[#D3AB80] transition-colors duration-300 relative group"
                            >
                                {link.label}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D3AB80] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            </Link>
                        ))}

                        {/* Install App Button */}
                        {showInstallBtn && (
                            <button
                                onClick={handleInstallClick}
                                className="flex items-center gap-2 border-2 border-[#D3AB80] text-[#D3AB80] hover:bg-[#FDE4BC] font-bold px-4 py-2 rounded-full transition-colors animate-pulse"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Install
                            </button>
                        )}

                        <Link
                            to="/planner"
                            className="bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-[#D3AB80]/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Trip Planner ✨
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#472825] hover:text-[#D3AB80] p-2 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`
                        md:hidden overflow-hidden transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <div className="px-4 py-3 space-y-2 bg-[#FFF4E2] border-t border-[#D3AB80]/20 mt-4">
                        {[
                            { path: "/", label: "Home" },
                            { path: "/attractions", label: "Attractions" },
                            { path: "/services", label: "Services" },
                            { path: "/hotels", label: "Hotels" },
                            { path: "/map", label: "Map" },
                            { path: "/marketplace", label: "Market" },
                            { path: "/souvenir", label: "Souvenir Maker 📸" },
                            { path: "/contact", label: "Contact Us" },
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-[#472825] font-semibold text-lg hover:text-[#D3AB80] hover:bg-[#FDE4BC] px-4 py-3 rounded-lg transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            to="/planner"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white px-6 py-3 rounded-full font-bold text-center shadow-lg hover:shadow-[#D3AB80]/30 transition-all duration-300"
                        >
                            Trip Planner ✨
                        </Link>

                        {/* Mobile Install Button */}
                        {showInstallBtn && (
                            <button
                                onClick={() => {
                                    handleInstallClick();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-center gap-2 border-2 border-[#D3AB80] text-[#D3AB80] hover:bg-[#FDE4BC] font-bold px-5 py-3 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Install App
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
