import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAttractionById } from '../services/api';

const AttractionDetailPage = () => {
    const { id } = useParams();
    const [attraction, setAttraction] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAttractionById(id)
            .then(res => {
                setAttraction(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching attraction detail:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="min-h-screen pt-28 px-5 md:px-16 mx-auto" style={{ backgroundColor: 'var(--bg-primary)', maxWidth: '1280px' }}>
            <div className="h-10 w-48 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded mb-4"></div>
            <div className="h-[40vh] w-full bg-gray-200 dark:bg-[#3A352F] animate-pulse rounded-2xl mb-8"></div>
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-[#2A2621] animate-pulse rounded"></div>
        </div>
    );

    if (!attraction) return (
        <div className="min-h-screen flex items-center justify-center text-center p-5" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div>
                <h1 className="text-display-md mb-4" style={{ color: 'var(--text-primary)' }}>Attraction Not Found</h1>
                <Link to="/attractions" className="px-6 py-3 rounded-full text-label-sm uppercase tracking-widest transition-colors inline-block" style={{ backgroundColor: 'var(--accent)', color: 'var(--text-on-dark)' }}>
                    Return to Attractions
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pb-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Hero Banner */}
            <div className="relative w-full h-[50vh] min-h-[400px]">
                {attraction.image ? (
                    <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                        <span className="material-symbols-outlined text-5xl opacity-30">image</span>
                    </div>
                )}
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-transparent to-transparent opacity-80"></div>
                
                {/* Hero Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-16">
                    <div className="mx-auto" style={{ maxWidth: '1280px' }}>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase tracking-widest shadow-md mb-4" style={{ backgroundColor: 'var(--teal)', color: 'white' }}>
                            {attraction.attraction_type}
                        </span>
                        <h1 className="text-display-lg-mobile md:text-display-lg text-white mb-2 text-shadow-lg">
                            {attraction.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base">
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[20px]">location_on</span>
                                {attraction.location || 'New Valley Governorate'}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[20px]">schedule</span>
                                {attraction.visit_duration_minutes} mins
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                                {parseFloat(attraction.ticket_price) === 0 ? 'Free Entry' : `EGP ${attraction.ticket_price}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto px-5 md:px-16 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12" style={{ maxWidth: '1280px' }}>
                {/* Left Column (Description & Details) */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-headline-md mb-4" style={{ color: 'var(--text-primary)' }}>About this place</h2>
                        <p className="text-body-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {attraction.description}
                        </p>
                    </section>

                    {attraction.history && (
                        <section>
                            <h2 className="text-headline-md mb-4" style={{ color: 'var(--text-primary)' }}>Historical Context</h2>
                            <p className="text-body-md leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {attraction.history}
                            </p>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar Actions) */}
                <div className="space-y-6">
                    {/* Action Card */}
                    <div className="p-6 rounded-2xl sticky top-24" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <h3 className="text-title-lg mb-6" style={{ color: 'var(--text-primary)' }}>Plan Your Visit</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                <span>Entry Fee</span>
                                <span className="font-bold">{parseFloat(attraction.ticket_price) === 0 ? 'Free' : `EGP ${attraction.ticket_price}`}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                <span>Recommended Time</span>
                                <span className="font-bold">{attraction.visit_duration_minutes} mins</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link to="/planner" className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-label-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--accent)', color: 'var(--text-on-dark)' }}>
                                <span className="material-symbols-outlined text-[20px]">add_task</span>
                                Add to Trip Plan
                            </Link>
                            <Link to="/map" className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full text-label-sm uppercase tracking-widest transition-all duration-300 hover:opacity-80" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                                <span className="material-symbols-outlined text-[20px]">map</span>
                                View on Map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttractionDetailPage;
