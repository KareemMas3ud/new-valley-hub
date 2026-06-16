import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LoginModal from './LoginModal';
import logo from '../assets/Logo.png';

const navCategories = [
    {
        title: "Explore",
        links: [
            { path: "/attractions", label: "Attractions" },
            { path: "/map", label: "Interactive Map" },
            { path: "/hotels", label: "Hotels" },
        ]
    },
    {
        title: "Discover",
        links: [
            { path: "/museum", label: "Museum 🏛️" },
            { path: "/souvenir", label: "Souvenir 📸" },
            { path: "/marketplace", label: "Marketplace" },
        ]
    },
    {
        title: "More",
        links: [
            { path: "/services", label: "Services" },
            { path: "/contact", label: "Contact Us" },
        ]
    },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallBtn, setShowInstallBtn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenCategory(null);
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallBtn(true);
        };

        const handleAppInstalled = () => {
            setShowInstallBtn(false);
            setDeferredPrompt(null);
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
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        setDeferredPrompt(null);
        setShowInstallBtn(false);
    };

    return (
        <nav
            className={`
                fixed top-0 left-0 right-0 z-50 transition-all duration-500
                ${isScrolled
                    ? 'glass-nav shadow-md'
                    : 'border-b border-white/10'
                }
            `}
            style={{
                backgroundColor: isScrolled
                    ? (theme === 'dark' ? 'rgba(17,14,12,0.92)' : 'rgba(253,249,244,0.92)')
                    : (theme === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'),
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            <div className="flex justify-between items-center w-full px-5 md:px-16 py-4 mx-auto" style={{ maxWidth: '1280px' }}>
                {/* Logo */}
                <Link to="/" className="hover:opacity-90 transition-opacity flex-shrink-0">
                    <img
                        src={logo}
                        alt="New Valley Hub Logo"
                        className={`w-auto object-contain transition-all duration-500 ${isScrolled ? 'h-12' : 'h-14'}`}
                    />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-6 flex-1 justify-end min-w-0">
                    {/* Home link */}
                    <Link
                        to="/"
                        className={`text-body-md transition-colors duration-300 relative group whitespace-nowrap ${
                            location.pathname === '/'
                                ? 'border-b-2 pb-1 opacity-80'
                                : 'hover:opacity-80'
                        }`}
                        style={{
                            color: location.pathname === '/' ? 'var(--accent)' : 'var(--text-secondary)',
                            borderColor: location.pathname === '/' ? 'var(--accent)' : 'transparent',
                        }}
                    >
                        Home
                    </Link>

                    {/* Category Dropdowns */}
                    {navCategories.map((category) => (
                        <div key={category.title} className="relative group">
                            <button
                                className="text-body-md transition-colors py-4 whitespace-nowrap flex items-center gap-1"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {category.title}
                                <svg className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className="absolute top-full left-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 pt-2 min-w-[180px] z-50"
                            >
                                <div
                                    className="rounded-xl py-2 shadow-xl backdrop-blur-md"
                                    style={{
                                        backgroundColor: 'var(--bg-card)',
                                        border: '1px solid var(--border)',
                                        boxShadow: '0 12px 40px var(--shadow-strong)',
                                    }}
                                >
                                    {category.links.map(link => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="block px-4 py-2.5 text-body-md transition-colors hover:opacity-80"
                                            style={{
                                                color: 'var(--text-secondary)',
                                                backgroundColor: 'transparent',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                        style={{
                            backgroundColor: 'var(--bg-elevated)',
                            color: 'var(--accent)',
                            border: '1px solid var(--border)',
                        }}
                        aria-label="Toggle theme"
                        title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {theme === 'light' ? 'dark_mode' : 'light_mode'}
                        </span>
                    </button>

                    {/* Install App Button */}
                    {showInstallBtn && (
                        <button
                            onClick={handleInstallClick}
                            className="flex-shrink-0 flex items-center gap-2 border font-bold px-4 py-2 rounded-full transition-colors text-label-sm uppercase tracking-widest"
                            style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                        >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            Install
                        </button>
                    )}

                    {/* Login Button */}
                    {!user && (
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg whitespace-nowrap"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--accent)',
                                border: '1px solid var(--border-color)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = 'var(--accent)';
                                e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span className="material-symbols-outlined text-[20px]">person</span>
                            <span className="text-body-md font-semibold">Sign In</span>
                        </button>
                    )}

                    {/* Trip Planner CTA */}
                    <Link to="/planner"
                        className="flex-shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md whitespace-nowrap bg-[var(--accent-hover)] text-[var(--accent-dark)] hover:bg-[var(--accent)] hover:text-[var(--text-on-dark)] dark:bg-[#d4af37] dark:hover:bg-[#e9c349] dark:text-gray-900 dark:hover:text-black font-semibold"
                    >
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        <span className="text-label-sm uppercase tracking-widest">Trip Planner</span>
                    </Link>

                    {/* Auth pill + Logout */}
                    {user && (
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <Link to="/my-trips"
                                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap max-w-[120px] overflow-hidden text-ellipsis"
                                style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border)' }}
                                title={`${user.email} — My Trips`}>
                                <span className="material-symbols-outlined text-[16px]">person</span>
                                {user.email.split('@')[0]}
                            </Link>
                            <button onClick={logout}
                                className="flex-shrink-0 text-xs font-extrabold px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap shadow-sm hover:-translate-y-0.5"
                                style={{ backgroundColor: 'var(--terracotta)', color: 'var(--text-on-dark)' }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile: Theme Toggle + Menu Button */}
                <div className="lg:hidden flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                        style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--accent)', border: '1px solid var(--border)' }}
                        aria-label="Toggle theme"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {theme === 'light' ? 'dark_mode' : 'light_mode'}
                        </span>
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 focus:outline-none"
                        style={{ color: 'var(--text-primary)' }}
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-[28px]">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`
                    lg:hidden overflow-hidden transition-all duration-300 ease-in-out
                    ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="px-5 py-3 space-y-3 mt-2 overflow-y-auto max-h-[70vh]" style={{ borderTop: '1px solid var(--border)' }}>
                    {/* Home */}
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-body-md font-semibold px-4 py-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Home
                    </Link>

                    {/* Grouped Categories */}
                    {navCategories.map((category) => (
                        <div key={category.title}>
                            <button
                                onClick={() => setOpenCategory(openCategory === category.title ? null : category.title)}
                                className="w-full flex items-center justify-between px-4 py-2 text-label-sm uppercase tracking-widest"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                {category.title}
                                <span className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${openCategory === category.title ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-200 ${openCategory === category.title ? 'max-h-48' : 'max-h-0'}`}>
                                <div className="pl-6 space-y-1 pb-2" style={{ borderLeft: '2px solid var(--border)' }}>
                                    {category.links.map(link => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block text-body-md font-medium py-2 px-2 rounded-lg"
                                            style={{ color: 'var(--text-secondary)' }}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA Buttons */}
                    <div className="pt-3 space-y-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <Link to="/planner" onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full text-label-sm uppercase tracking-widest font-bold text-center shadow-sm transition-all duration-300"
                            style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}>
                            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                            Trip Planner
                        </Link>

                        {!user && (
                            <button
                                onClick={() => { setShowLoginModal(true); setIsMobileMenuOpen(false); }}
                                className="w-full flex items-center justify-center gap-2 border px-6 py-3 rounded-full text-body-md font-semibold text-center transition-all duration-300"
                                style={{ borderColor: 'var(--border-color)', color: 'var(--accent)' }}
                            >
                                <span className="material-symbols-outlined text-[20px]">person</span>
                                Sign In / Register
                            </button>
                        )}

                        {user && (
                            <div className="pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                                <Link to="/my-trips" onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-2 text-xs px-4 pb-2 font-semibold"
                                    style={{ color: 'var(--text-muted)' }}>
                                    <span className="material-symbols-outlined text-[16px]">person</span>
                                    {user.email} · My Trips →
                                </Link>
                                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                    className="w-full text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200"
                                    style={{ color: 'var(--text-on-dark)', backgroundColor: 'var(--terracotta)' }}>
                                    Logout
                                </button>
                            </div>
                        )}

                        {showInstallBtn && (
                            <button
                                onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
                                className="w-full flex items-center justify-center gap-2 border font-bold px-5 py-3 rounded-full text-label-sm uppercase tracking-widest transition-colors"
                                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                            >
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                Install App
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onSuccess={() => setShowLoginModal(false)}
            />
        </nav>
    );
};

export default Navbar;
