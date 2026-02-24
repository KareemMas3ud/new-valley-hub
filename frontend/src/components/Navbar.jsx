import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Logo.png';

const Navbar = () => {
    const [isFloating, setIsFloating] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

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
                fixed z-50 transition-all duration-500
                left-0 right-0 mx-auto
                ${isFloating
                    ? 'top-4 w-[92%] lg:w-[88%] rounded-2xl bg-[#FFF4E2]/95 backdrop-blur-md border border-[#D3AB80]/40 shadow-xl shadow-[#472825]/10 py-2'
                    : 'top-0 w-full bg-[#FFF4E2] border-b border-[#D3AB80]/20 rounded-none shadow-none py-4'
                }
            `}
            style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
            <div className="w-full px-4 lg:px-6">
                <div className="flex items-center justify-between gap-3">
                    {/* Logo — never shrinks */}
                    <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
                        <img
                            src={logo}
                            alt="New Valley Hub Logo"
                            className={`w-auto object-contain transition-all duration-500 ${isFloating ? 'h-14' : 'h-16'}`}
                        />
                    </Link>

                    {/* Desktop nav — flex-1 so it fills space, auth group shrink-0 so it never overflows */}
                    <div className="hidden lg:flex items-center gap-[15px] flex-1 justify-end min-w-0">

                        {/* Nav links — wrapped in own div so they can truncate */}
                        <div className="flex items-center gap-2 xl:gap-4 min-w-0 overflow-hidden">
                            {[
                                { path: "/", label: "Home" },
                                { path: "/attractions", label: "Attractions" },
                                { path: "/services", label: "Services" },
                                { path: "/hotels", label: "Hotels" },
                                { path: "/map", label: "Map" },
                                { path: "/marketplace", label: "Market" },
                                { path: "/museum", label: "Museum 🏛️" },
                                { path: "/souvenir", label: "Souvenir 📸" },
                                { path: "/contact", label: "Contact Us" },
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="text-[#472825] font-semibold text-sm lg:text-base hover:text-[#D3AB80] transition-colors duration-300 relative group whitespace-nowrap"
                                >
                                    {link.label}
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D3AB80] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Install App Button */}
                        {showInstallBtn && (
                            <button
                                onClick={handleInstallClick}
                                className="flex-shrink-0 flex items-center gap-2 border-2 border-[#D3AB80] text-[#D3AB80] hover:bg-[#FDE4BC] font-bold px-4 py-2 rounded-full transition-colors animate-pulse"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Install
                            </button>
                        )}

                        {/* Trip Planner CTA */}
                        <Link to="/planner"
                            className="flex-shrink-0 font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-[#D3AB80]/40 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap text-[#472825] hover:text-white"
                            style={{ background: 'linear-gradient(135deg, #D3AB80 0%, #C49A6A 100%)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, #C49A6A 0%, #96786F 100%)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, #D3AB80 0%, #C49A6A 100%)'}
                        >
                            Trip Planner ✨
                        </Link>

                        {/* Auth pill + Logout — flex-shrink-0 keeps them always visible */}
                        {user && (
                            <div className="flex-shrink-0 flex items-center gap-[15px]">
                                <Link to="/my-trips"
                                    className="text-xs font-semibold text-[#96786F] bg-[#FDE4BC] hover:bg-[#D3AB80]/30 px-3 py-1.5 rounded-full border border-[#D3AB80]/40 transition-colors whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis block"
                                    title={`${user.email} — My Trips`}>
                                    👤 {user.email.split('@')[0]}
                                </Link>
                                <button onClick={logout}
                                    className="flex-shrink-0 text-xs font-extrabold text-[#FFF4E2] px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap shadow-md hover:shadow-[#BC4A3C]/50 hover:-translate-y-0.5"
                                    style={{ background: 'linear-gradient(135deg, #BC4A3C 0%, #8E352A 100%)' }}
                                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(188,74,60,0.45)'}
                                    onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
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
                        lg:hidden overflow-hidden transition-all duration-300 ease-in-out
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
                            { path: "/museum", label: "Museum 🏛️" },
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

                        <Link to="/planner" onClick={() => setIsMobileMenuOpen(false)}
                            className="block bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white px-6 py-3 rounded-full font-bold text-center shadow-lg transition-all duration-300">
                            Trip Planner ✨
                        </Link>

                        {/* Auth section — mobile */}
                        {user && (
                            <div className="pt-2 border-t border-[#D3AB80]/20">
                                <Link to="/my-trips" onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-xs text-[#96786F] hover:text-[#D3AB80] px-4 pb-2 font-semibold transition-colors">
                                    👤 {user.email} · My Trips →
                                </Link>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                    className="w-full text-sm font-bold text-[#472825] border border-[#472825]/30 hover:bg-[#472825] hover:text-[#FFF4E2] px-5 py-3 rounded-xl transition-all duration-200">
                                    🚪 Logout
                                </button>
                            </div>
                        )}

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
