import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-orange-600 tracking-tighter hover:text-orange-700">
                        🌴 New Valley Hub
                    </Link>

                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Home</Link>
                        <Link to="/attractions" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Attractions</Link>
                        <Link to="/services" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Services</Link>
                        <Link to="/hotels" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Hotels</Link>
                        <Link to="/map" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Map</Link>
                        <Link to="/marketplace" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Market</Link>
                        <Link to="/planner" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-bold transition-colors">AI Planner ✨</Link>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button placeholder */}
                        <button className="text-gray-600 hover:text-orange-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
