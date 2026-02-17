import React, { useEffect, useState } from 'react';
import { getAttractions } from '../services/api';
import AttractionCard from '../components/AttractionCard';

const AttractionsPage = () => {
    const [attractions, setAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getAttractions()
            .then(res => {
                setAttractions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching attractions:", err);
                setLoading(false);
            });
    }, []);

    const filteredAttractions = filter === 'all'
        ? attractions
        : attractions.filter(attr => attr.attraction_type === filter);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-sand mx-auto mb-4"></div>
                <p className="text-brand-taupe">Loading amazing attractions...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-r from-brand-sand to-brand-beige text-white py-16 px-4 mb-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Explore New Valley</h1>
                    <p className="text-xl text-brand-taupe max-w-2xl mx-auto">
                        Discover {attractions.length} breathtaking destinations across the New Valley Governorate
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {['all', 'natural', 'historical', 'cultural'].map(type => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${filter === type
                                ? 'bg-brand-sand text-brand-dark shadow-lg scale-105'
                                : 'bg-brand-beige text-brand-dark hover:bg-brand-ivory shadow-md'
                                }`}
                        >
                            {type === 'all' ? '🌍 All' : type === 'natural' ? '🏜️ Natural' : type === 'historical' ? '🏛️ Historical' : '🎨 Cultural'}
                            <span className="ml-2 text-sm">
                                ({type === 'all' ? attractions.length : attractions.filter(a => a.attraction_type === type).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Attractions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAttractions.map(attr => (
                        <AttractionCard key={attr.id} attraction={attr} />
                    ))}
                </div>

                {filteredAttractions.length === 0 && (
                    <div className="text-center text-brand-taupe mt-16 p-12 bg-brand-beige rounded-xl">
                        <p className="text-2xl mb-2">No {filter} attractions found</p>
                        <button
                            onClick={() => setFilter('all')}
                            className="mt-4 text-brand-sand hover:text-brand-dark font-semibold"
                        >
                            ← View all attractions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttractionsPage;
