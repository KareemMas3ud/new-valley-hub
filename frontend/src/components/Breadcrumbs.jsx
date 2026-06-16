import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    
    // Don't show breadcrumbs on the home page
    if (location.pathname === '/') {
        return null;
    }

    const pathnames = location.pathname.split('/').filter((x) => x);

    const formatName = (name) => {
        // Map of specific pathnames to readable names
        const names = {
            'attractions': 'Attractions',
            'hotels': 'Hotels',
            'services': 'Services',
            'map': 'Interactive Map',
            'planner': 'Trip Planner',
            'museum': 'Virtual Museum',
            'souvenir': 'Souvenir Maker',
            'marketplace': 'Marketplace',
            'contact': 'Contact Us',
            'my-trips': 'My Trips',
        };
        return names[name] || name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
        <div className="w-full mx-auto px-5 md:px-16 py-3" style={{ maxWidth: '1280px' }}>
            <nav className="flex items-center text-sm font-medium" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                    <li className="inline-flex items-center">
                        <Link 
                            to="/" 
                            className="inline-flex items-center transition-colors hover:opacity-70"
                            style={{ color: 'var(--text-muted)' }}
                        >
                            <span className="material-symbols-outlined text-[18px] mr-1">home</span>
                            Home
                        </Link>
                    </li>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        
                        return (
                            <li key={name}>
                                <div className="flex items-center">
                                    <span className="material-symbols-outlined text-[16px] mx-1" style={{ color: 'var(--border-strong)' }}>
                                        chevron_right
                                    </span>
                                    {isLast ? (
                                        <span 
                                            className="ml-1 md:ml-2 font-bold"
                                            style={{ color: 'var(--accent)' }}
                                            aria-current="page"
                                        >
                                            {formatName(name)}
                                        </span>
                                    ) : (
                                        <Link 
                                            to={routeTo} 
                                            className="ml-1 md:ml-2 transition-colors hover:opacity-70"
                                            style={{ color: 'var(--text-muted)' }}
                                        >
                                            {formatName(name)}
                                        </Link>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
