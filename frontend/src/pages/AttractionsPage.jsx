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

    const filterOptions = [
        { key: 'all', label: 'All', icon: 'public' },
        { key: 'natural', label: 'Natural', icon: 'park' },
        { key: 'historical', label: 'Historical', icon: 'account_balance' },
        { key: 'cultural', label: 'Cultural', icon: 'palette' },
    ];

    if (loading) return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Header Skeleton */}
            <div className="pt-28 md:pt-36 pb-12 px-5 md:px-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="mx-auto" style={{ maxWidth: '1280px' }}>
                    <div className="h-10 w-48 md:w-64 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded mb-4"></div>
                    <div className="h-6 w-3/4 md:w-96 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded"></div>
                </div>
            </div>

            <div className="mx-auto px-5 md:px-16 py-12" style={{ maxWidth: '1280px' }}>
                {/* Filter Tabs Skeleton */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-10 w-28 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded-full"></div>
                    ))}
                </div>

                {/* Cards Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-white dark:bg-[#2A2621] rounded-2xl h-[420px] animate-pulse overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                            {/* Image skeleton */}
                            <div className="h-48 bg-gray-200 dark:bg-[#3A352F] w-full"></div>
                            {/* Content skeleton */}
                            <div className="p-5">
                                <div className="h-6 bg-gray-200 dark:bg-[#3A352F] w-3/4 rounded mb-3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-[#3A352F] w-full rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-[#3A352F] w-5/6 rounded mb-6"></div>
                                {/* Footer skeleton */}
                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="h-4 bg-gray-200 dark:bg-[#3A352F] w-20 rounded"></div>
                                    <div className="h-8 bg-gray-200 dark:bg-[#3A352F] w-8 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Page Header */}
            <div className="pt-28 md:pt-36 pb-12 px-5 md:px-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="mx-auto" style={{ maxWidth: '1280px' }}>
                    <h1 className="text-display-lg-mobile md:text-headline-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                        Top Attractions
                    </h1>
                    <p className="text-body-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                        Discover {attractions.length} breathtaking destinations across the New Valley Governorate.
                    </p>
                </div>
            </div>

            <div className="mx-auto px-5 md:px-16 py-12" style={{ maxWidth: '1280px' }}>
                {/* Filter Tabs — MD3 pill style */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {filterOptions.map(opt => (
                        <button
                            key={opt.key}
                            onClick={() => setFilter(opt.key)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-label-sm uppercase tracking-widest transition-all duration-300"
                            style={filter === opt.key
                                ? { backgroundColor: 'var(--accent)', color: 'var(--text-on-dark)', boxShadow: '0 2px 8px var(--shadow-strong)' }
                                : { backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }
                            }
                        >
                            <span className="material-symbols-outlined text-[16px]">{opt.icon}</span>
                            {opt.label}
                            <span className="opacity-60">
                                ({opt.key === 'all' ? attractions.length : attractions.filter(a => a.attraction_type === opt.key).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Attractions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAttractions.map(attr => (
                        <AttractionCard key={attr.id} attraction={attr} />
                    ))}
                </div>

                {filteredAttractions.length === 0 && (
                    <div className="text-center mt-16 p-12 rounded-xl" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: 'var(--text-muted)' }}>search_off</span>
                        <p className="text-headline-md mb-2" style={{ color: 'var(--text-primary)' }}>No {filter} attractions found</p>
                        <button
                            onClick={() => setFilter('all')}
                            className="mt-4 text-label-sm uppercase tracking-widest inline-flex items-center gap-2"
                            style={{ color: 'var(--accent)' }}
                        >
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            View all attractions
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttractionsPage;
