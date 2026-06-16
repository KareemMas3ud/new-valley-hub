import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            className="w-full mt-auto theme-transition"
            style={{ backgroundColor: 'var(--bg-muted)', borderTop: '1px solid var(--border)' }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-16 py-12 mx-auto" style={{ maxWidth: '1280px' }}>
                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <span className="text-headline-md font-bold" style={{ color: 'var(--tertiary)' }}>
                        New Valley Hub
                    </span>
                    <p className="text-label-sm" style={{ color: 'var(--tertiary)', opacity: 0.7 }}>
                        © 2026 New Valley Hub. All rights reserved.
                    </p>
                    <p className="text-label-sm" style={{ color: 'var(--tertiary)', opacity: 0.5 }}>
                        Built by <span className="font-bold" style={{ color: 'var(--accent)' }}>SandScript Team</span>
                    </p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-3 text-label-sm">
                    <span className="uppercase tracking-widest mb-1 font-bold" style={{ color: 'var(--accent)' }}>Explore</span>
                    <Link to="/attractions" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Attractions</Link>
                    <Link to="/map" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Interactive Map</Link>
                    <Link to="/hotels" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Hotels & Eco-Lodges</Link>
                    <Link to="/planner" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Trip Planner</Link>
                </div>

                {/* Social & Connect */}
                <div className="flex flex-col gap-3 text-label-sm md:items-end">
                    <span className="uppercase tracking-widest mb-1 font-bold" style={{ color: 'var(--accent)' }}>Connect</span>
                    <Link to="/contact" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Contact Us</Link>
                    <Link to="/services" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Local Services</Link>
                    <Link to="/museum" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Virtual Museum</Link>
                    <Link to="/souvenir" className="transition-colors hover:opacity-80" style={{ color: 'var(--tertiary)' }}>Digital Souvenir</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
