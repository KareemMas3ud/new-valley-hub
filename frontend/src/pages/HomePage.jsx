import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAttractions, BASE } from '../services/api';
import WeatherWidget from '../components/WeatherWidget';
import GovernorSection from '../components/GovernorSection';
import RevealOnScroll from '../components/RevealOnScroll';

const HomePage = () => {
    const [topAttractions, setTopAttractions] = useState([]);
    const [totalAttractions, setTotalAttractions] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Features data array
    const features = [
        {
            title: "AI Tour Guide",
            description: "Chat with our local expert '3m Sa3ed' for instant advice, hidden gems, and 24/7 support.",
            icon: "support_agent",
            link: null
        },
        {
            title: "Smart Trip Planner",
            description: "Get a personalized itinerary tailored to your budget and interests in seconds.",
            icon: "auto_awesome",
            link: '/planner'
        },
        {
            title: "Interactive Map",
            description: "Explore 28+ destinations, hotels, and services on a detailed digital map.",
            icon: "map",
            link: '/map'
        },
        {
            title: "Hotels & Eco-Lodges",
            description: "Find the perfect stay, from luxury resorts to authentic mud-brick houses.",
            icon: "hotel",
            link: '/hotels'
        },
        {
            title: "Local Marketplace",
            description: "Buy authentic handmade crafts and dates directly from local artisans.",
            icon: "storefront",
            link: '/marketplace'
        },
        {
            title: "Digital Souvenir",
            description: "Create personalized digital memories with custom filters and share your adventure.",
            icon: "photo_camera",
            link: '/souvenir'
        }
    ];

    useEffect(() => {
        document.title = 'New Valley Hub';
        getAttractions()
            .then(res => {
                setTopAttractions(res.data.slice(0, 4));
                setTotalAttractions(res.data.length);
            })
            .catch(err => console.error("Error fetching attractions:", err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="flex flex-col">
            {/* ════════════════════════════════════════
                HERO SECTION — Stitch Glass-Panel Design
                ════════════════════════════════════════ */}
            <section
                className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
                style={{
                    backgroundImage: `url('${BASE}/media/locations/white_desert.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Lighter overlay for Stitch aesthetic */}
                <div className="absolute inset-0 bg-black/25"></div>

                {/* Hero Content */}
                <div className="relative z-10 w-full mx-auto px-5 md:px-16 flex flex-col items-center text-center" style={{ maxWidth: '1280px' }}>
                    <RevealOnScroll width="100%">
                        {/* Weather Widget — Centered above heading */}
                        <div className="mb-8 w-full flex justify-center">
                            <WeatherWidget />
                        </div>

                        <h1 className="text-display-lg-mobile md:text-display-lg text-white mb-6 text-shadow-lg">
                            Discover the Silence
                        </h1>
                        <p className="text-body-lg text-white/90 max-w-2xl mx-auto mb-12 text-shadow-sm">
                            A sanctuary of raw beauty and ancient landscapes. Experience the untamed elegance of the New Valley.
                        </p>

                        {/* Glass Search Bar */}
                        <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto glass-panel rounded-full p-2 flex items-center shadow-lg transition-transform hover:scale-[1.02] duration-300">
                            <span className="material-symbols-outlined text-white ml-4 mr-2">search</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search oasis, tours, or experiences..."
                                className="w-full bg-transparent border-none text-white placeholder-white/70 focus:ring-0 text-body-md outline-none"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-full text-label-sm uppercase tracking-widest transition-colors"
                                style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}
                            >
                                Discover
                            </button>
                        </form>
                    </RevealOnScroll>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span className="material-symbols-outlined text-white text-3xl">expand_more</span>
                </div>
            </section>

            {/* ════════════════════════════════════════
                TOP ATTRACTIONS — Stitch Bento Grid
                ════════════════════════════════════════ */}
            <section className="py-16 md:py-24 px-5 md:px-16" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="mx-auto" style={{ maxWidth: '1280px' }}>
                    <RevealOnScroll width="100%">
                        <div className="mb-12 md:mb-16 text-center md:text-left">
                            <h2 className="text-display-lg-mobile md:text-headline-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                                Top Attractions
                            </h2>
                            <p className="text-body-lg max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                                Discover the raw beauty and ancient secrets of the New Valley. From boundless white deserts to enduring temples, find your tranquil adventure.
                            </p>
                        </div>
                    </RevealOnScroll>

                    {/* Bento Grid */}
                    <RevealOnScroll width="100%">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {topAttractions.length > 0 ? (
                                <>
                                    {/* Featured Large Card — 8 cols */}
                                    <Link
                                        to="/attractions"
                                        className="md:col-span-8 flex flex-col group relative rounded-xl overflow-hidden border"
                                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
                                    >
                                        <div className="aspect-[4/3] md:aspect-[16/9] w-full overflow-hidden relative">
                                            <img
                                                src={topAttractions[0]?.image}
                                                alt={topAttractions[0]?.name}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                            />
                                        </div>
                                        <div className="p-6 md:p-10 flex flex-col justify-between flex-1">
                                            <div>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase tracking-widest mb-4"
                                                    style={{ backgroundColor: 'var(--teal)', color: 'white' }}>
                                                    {topAttractions[0]?.attraction_type || 'Natural Wonder'}
                                                </span>
                                                <h3 className="text-headline-lg mb-2" style={{ color: 'var(--text-primary)' }}>{topAttractions[0]?.name}</h3>
                                                <p className="text-body-md mb-6 max-w-2xl hidden md:block line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                                    {topAttractions[0]?.description}
                                                </p>
                                            </div>
                                            <span
                                                className="self-start inline-block px-6 py-3 rounded text-label-sm uppercase tracking-widest transition-all duration-300 shadow-sm"
                                                style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}
                                            >
                                                Explore
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Side Card — 4 cols */}
                                    {topAttractions[1] && (
                                        <Link
                                            to="/attractions"
                                            className="md:col-span-4 flex flex-col rounded-xl overflow-hidden border"
                                            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
                                        >
                                            <div className="aspect-[4/3] md:flex-1 w-full overflow-hidden relative">
                                                <img
                                                    src={topAttractions[1]?.image}
                                                    alt={topAttractions[1]?.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6 md:p-8 flex flex-col justify-between md:min-h-[250px]">
                                                <div>
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase tracking-widest mb-4"
                                                        style={{ backgroundColor: 'var(--teal)', color: 'white' }}>
                                                        {topAttractions[1]?.attraction_type || 'Heritage'}
                                                    </span>
                                                    <h3 className="text-headline-md mb-2" style={{ color: 'var(--text-primary)' }}>
                                                        {topAttractions[1]?.name}
                                                    </h3>
                                                    <p className="text-body-md line-clamp-3 mb-6" style={{ color: 'var(--text-secondary)' }}>
                                                        {topAttractions[1]?.description}
                                                    </p>
                                                </div>
                                                <span
                                                    className="self-start px-6 py-2 rounded border text-label-sm uppercase tracking-widest transition-all duration-300"
                                                    style={{ borderColor: 'var(--text-muted)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}
                                                >
                                                    Explore
                                                </span>
                                            </div>
                                        </Link>
                                    )}

                                    {/* Standard Cards — 4 cols each */}
                                    {topAttractions.slice(2, 4).map((attraction) => (
                                        <Link
                                            key={attraction.id}
                                            to="/attractions"
                                            className="md:col-span-4 rounded-xl overflow-hidden border group relative"
                                            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
                                        >
                                            <div className="aspect-[4/3] overflow-hidden relative">
                                                <img
                                                    src={attraction.image}
                                                    alt={attraction.name}
                                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase tracking-widest shadow-md"
                                                        style={{ backgroundColor: 'var(--teal)', color: 'white' }}>
                                                        {attraction.attraction_type}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-headline-md mb-2" style={{ color: 'var(--text-primary)' }}>
                                                    {attraction.name}
                                                </h3>
                                                <p className="text-body-md mb-6 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                                    {attraction.description}
                                                </p>
                                                <span
                                                    className="block w-full text-center px-6 py-2.5 rounded text-label-sm uppercase tracking-widest transition-all duration-300"
                                                    style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}
                                                >
                                                    Explore
                                                </span>
                                            </div>
                                        </Link>
                                    ))}

                                    {/* "More Discoveries" CTA Card */}
                                    <Link
                                        to="/attractions"
                                        className="md:col-span-4 flex items-center justify-center p-8 border rounded-xl text-center"
                                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                                    >
                                        <div>
                                            <span className="material-symbols-outlined text-5xl mb-4 block" style={{ color: 'var(--text-muted)' }}>explore</span>
                                            <h3 className="text-headline-md mb-2" style={{ color: 'var(--text-primary)' }}>More Discoveries</h3>
                                            <p className="text-body-md mb-6" style={{ color: 'var(--text-secondary)' }}>
                                                Unearth hidden gems and exclusive eco-tours across the expansive New Valley territory.
                                            </p>
                                            <span className="text-label-sm uppercase tracking-widest inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                                                View All {totalAttractions} <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </span>
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                // Loading Skeletons
                                <>
                                    <div className="md:col-span-8 rounded-xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--bg-muted)' }}>
                                        <div className="aspect-[16/9]"></div>
                                    </div>
                                    <div className="md:col-span-4 rounded-xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--bg-muted)' }}>
                                        <div className="aspect-[4/3]"></div>
                                        <div className="p-8">
                                            <div className="h-6 rounded mb-3" style={{ backgroundColor: 'var(--bg-elevated)', width: '60%' }}></div>
                                            <div className="h-4 rounded mb-2" style={{ backgroundColor: 'var(--bg-elevated)' }}></div>
                                            <div className="h-4 rounded" style={{ backgroundColor: 'var(--bg-elevated)', width: '75%' }}></div>
                                        </div>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="md:col-span-4 rounded-xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--bg-muted)' }}>
                                            <div className="aspect-[4/3]"></div>
                                            <div className="p-6">
                                                <div className="h-6 rounded mb-3" style={{ backgroundColor: 'var(--bg-elevated)', width: '70%' }}></div>
                                                <div className="h-4 rounded" style={{ backgroundColor: 'var(--bg-elevated)' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* Governor Section */}
            <GovernorSection />

            {/* ════════════════════════════════════════
                FEATURES SECTION — MD3 Surface Cards
                ════════════════════════════════════════ */}
            <section className="py-20" style={{ backgroundColor: 'var(--bg-footer)' }}>
                <div className="mx-auto px-5 md:px-16" style={{ maxWidth: '1280px' }}>
                    <RevealOnScroll width="100%">
                        <div className="text-center mb-16">
                            <p className="text-label-sm uppercase tracking-widest mb-4" style={{ color: 'var(--accent-hover)' }}>
                                What We Offer
                            </p>
                            <h2 className="text-display-lg-mobile md:text-headline-lg text-white mb-4">
                                Platform Features
                            </h2>
                            <p className="text-body-lg max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                Everything you need to explore the New Valley like a local
                            </p>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll width="100%">
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => {
                                const CardContent = (
                                    <>
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: 'rgba(212,175,55,0.15)' }}>
                                            <span className="material-symbols-outlined text-[28px]" style={{ color: 'var(--accent-hover)' }}>
                                                {feature.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-headline-md text-white mb-3 group-hover:text-[var(--accent-hover)] transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-body-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
                                            {feature.description}
                                        </p>
                                        {feature.link && (
                                            <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ color: 'var(--accent-hover)' }}>
                                                <span className="text-label-sm uppercase tracking-widest">Explore</span>
                                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            </div>
                                        )}
                                    </>
                                );

                                const cardClasses = "group relative p-8 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.08] hover:border-white/[0.12] overflow-hidden";

                                return feature.link ? (
                                    <Link key={index} to={feature.link} className={`${cardClasses} block cursor-pointer`}>
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <div key={index} className={cardClasses}>
                                        {CardContent}
                                    </div>
                                );
                            })}
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            {/* ════════════════════════════════════════
                CALL TO ACTION BANNER
                ════════════════════════════════════════ */}
            <section className="relative py-24 px-5 md:px-16">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={`${BASE}/media/locations/farafra_oasis.jpg`}
                        alt="Farafra Oasis"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>
                <div className="relative z-10 text-center mx-auto text-white" style={{ maxWidth: '1280px' }}>
                    <p className="text-label-sm uppercase tracking-widest mb-4" style={{ color: 'var(--accent-hover)' }}>
                        Ready to Begin
                    </p>
                    <h2 className="text-display-lg-mobile md:text-headline-lg mb-6 text-shadow-sm">
                        Design Your Serenity
                    </h2>
                    <p className="text-body-lg text-white/80 max-w-xl mx-auto mb-10">
                        Let our AI craft a journey tailored to your pace, balancing luxury with the raw beauty of the Egyptian desert.
                    </p>
                    <Link
                        to="/planner"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-label-sm uppercase tracking-widest shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                        style={{ backgroundColor: 'var(--accent-hover)', color: 'var(--accent-dark)' }}
                    >
                        <span className="material-symbols-outlined">auto_awesome</span>
                        Generate Itinerary
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
