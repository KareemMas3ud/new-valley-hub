import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE } from '../services/api';

const ServicesPage = () => {
    const [hierarchy, setHierarchy] = useState([]);
    const [services, setServices] = useState([]);
    const [totalServicesCount, setTotalServicesCount] = useState(0);
    const [selectedParent, setSelectedParent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch hierarchical categories
        axios.get(`${BASE}/api/services/categories/hierarchy/`)
            .then(res => {
                setHierarchy(res.data);
            })
            .catch(err => console.error("Error fetching hierarchy:", err));

        // Fetch all services
        axios.get(`${BASE}/api/services/items/`)
            .then(res => {
                setServices(res.data);
                setTotalServicesCount(res.data.length);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching services:", err);
                setLoading(false);
            });
    }, []);

    const filterByParent = (parentSlug) => {
        setSelectedParent(parentSlug);
        if (parentSlug) {
            axios.get(`${BASE}/api/services/items/by_parent_category/?parent=${parentSlug}`)
                .then(res => setServices(res.data))
                .catch(err => console.error(err));
        } else {
            axios.get(`${BASE}/api/services/items/`)
                .then(res => setServices(res.data))
                .catch(err => console.error(err));
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 mx-auto mb-4" style={{ borderBottom: '2px solid var(--accent)' }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Loading Services...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))' }}>
            {/* Hero Section */}
            <div className="text-white py-16 px-4" style={{ background: 'linear-gradient(135deg, #6B4430, #8C6E60)' }}>
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">⚙️ Essential Services</h1>
                    <p className="text-xl max-w-2xl mx-auto opacity-90">
                        Discover restaurants, medical facilities, emergency services, and more across New Valley
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Category Filter Tabs */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => filterByParent(null)}
                            className="p-6 rounded-xl shadow-lg transition-all duration-300"
                            style={selectedParent === null
                                ? { backgroundColor: 'var(--accent)', color: 'var(--text-primary)', transform: 'scale(1.05)' }
                                : { backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
                            }
                        >
                            <div className="text-3xl mb-2">🌍</div>
                            <div className="font-bold">All Services</div>
                            <div className="text-sm opacity-75">{totalServicesCount} total</div>
                        </button>

                        {hierarchy.map(parent => (
                            <button
                                key={parent.id}
                                onClick={() => filterByParent(parent.slug)}
                                className="p-6 rounded-xl shadow-lg transition-all duration-300"
                                style={selectedParent === parent.slug
                                    ? { backgroundColor: 'var(--accent)', color: 'var(--text-primary)', transform: 'scale(1.05)' }
                                    : { backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }
                                }
                            >
                                <div className="text-3xl mb-2">
                                    {parent.slug === 'dining-restaurants' && '🍽️'}
                                    {parent.slug === 'medical' && '🏥'}
                                    {parent.slug === 'emergency' && '🚨'}
                                    {parent.slug === 'general-services' && '🏢'}
                                </div>
                                <div className="font-bold">{parent.name}</div>
                                <div className="text-sm opacity-75">{parent.total_services} services</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map(service => (
                        <div
                            key={service.id}
                            className="rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                        >
                            <div className="p-6">
                                {/* Category Badge */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs px-3 py-1 rounded-full font-semibold uppercase" style={{ backgroundColor: 'rgba(211,171,128,0.2)', color: 'var(--accent)' }}>
                                        {service.category_name}
                                    </span>
                                    {service.is_emergency && (
                                        <span className="text-white text-xs px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: 'var(--terracotta)' }}>
                                            🚨 EMERGENCY
                                        </span>
                                    )}
                                    {service.is_24_hours && (
                                        <span className="text-white text-xs px-2 py-1 rounded-full font-semibold" style={{ backgroundColor: 'var(--teal)' }}>
                                            24/7
                                        </span>
                                    )}
                                </div>

                                {/* Service Name */}
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{service.name}</h3>

                                {/* Description */}
                                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{service.description}</p>

                                {/* Contact Info */}
                                <div className="space-y-2 text-sm">
                                    {service.phone_number && (
                                        <div className="flex items-center" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="mr-2">📞</span>
                                            <a href={`tel:${service.phone_number}`} className="hover:opacity-70">
                                                {service.phone_number}
                                            </a>
                                        </div>
                                    )}
                                    {service.address && (
                                        <div className="flex items-start" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="mr-2">📍</span>
                                            <span className="flex-1">{service.address}</span>
                                        </div>
                                    )}
                                    {service.website && (
                                        <div className="flex items-center" style={{ color: 'var(--text-secondary)' }}>
                                            <span className="mr-2">🌐</span>
                                            <a href={service.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 truncate" style={{ color: 'var(--accent)' }}>
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Opening Hours */}
                                {service.opening_time && service.closing_time && (
                                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                                        <div className="flex items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                                            <span className="mr-2">🕐</span>
                                            <span>{service.opening_time} - {service.closing_time}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {services.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Services Found</h3>
                        <p style={{ color: 'var(--text-muted)' }}>Try selecting a different category</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServicesPage;
