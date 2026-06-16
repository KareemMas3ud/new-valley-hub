import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE } from '../services/api';
import { FaMapMarkerAlt, FaHotel, FaShoppingBag, FaStar, FaSpinner } from 'react-icons/fa';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                console.log('Fetching search results for query:', query);
                const response = await axios.get(`${BASE}/api/tourism/search/?q=${encodeURIComponent(query)}`);
                console.log('Search API Response:', response.data);
                setResults(response.data.results);
                setError(null);
            } catch (err) {
                console.error('Search error:', err);
                console.error('Error response:', err.response);
                console.error('Error message:', err.message);
                setError('Failed to fetch search results. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'attraction':
                return <FaMapMarkerAlt style={{ color: 'var(--teal)' }} />;
            case 'hotel':
                return <FaHotel style={{ color: 'var(--accent)' }} />;
            case 'product':
                return <FaShoppingBag style={{ color: 'var(--warning)' }} />;
            default:
                return null;
        }
    };

    const getTypeBadge = (type) => {
        const badges = {
            attraction: { backgroundColor: 'rgba(42, 123, 111, 0.15)', color: 'var(--teal)' },
            hotel: { backgroundColor: 'rgba(211, 171, 128, 0.2)', color: 'var(--accent)' },
            product: { backgroundColor: 'rgba(192, 139, 45, 0.15)', color: 'var(--warning)' },
        };
        return badges[type] || { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="text-center">
                    <FaSpinner className="animate-spin text-5xl mx-auto mb-4" style={{ color: 'var(--teal)' }} />
                    <p className="text-lg" style={{ color: 'var(--text-muted)' }}>Searching for "{query}"...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Search Results for "{query}"
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: 'rgba(196, 87, 58, 0.1)', border: '1px solid var(--terracotta)', color: 'var(--terracotta)' }}>
                        <p>{error}</p>
                    </div>
                )}

                {/* No Results */}
                {!loading && !error && results.length === 0 && (
                    <div className="rounded-lg shadow-md p-12 text-center" style={{ backgroundColor: 'var(--bg-card)' }}>
                        <div className="text-6xl mb-4" style={{ color: 'var(--text-muted)' }}>🔍</div>
                        <h2 className="text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>No results found</h2>
                        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
                            We couldn't find anything matching "{query}". Try different keywords.
                        </p>
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 rounded-lg transition-colors font-bold"
                            style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }}
                        >
                            Back to Home
                        </Link>
                    </div>
                )}

                {/* Results Grid */}
                {results.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((result, index) => (
                            <div
                                key={`${result.type}-${result.id}-${index}`}
                                className="rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
                            >
                                {/* Image */}
                                {result.image && (
                                    <div className="h-48 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                                        <img
                                            src={result.image}
                                            alt={result.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-5">
                                    {/* Type Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        {getTypeIcon(result.type)}
                                        <span
                                            className="text-xs font-semibold px-3 py-1 rounded-full"
                                            style={getTypeBadge(result.type)}
                                        >
                                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                                        {result.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm mb-4 line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                                        {result.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between">
                                        {result.type === 'hotel' && result.rating && (
                                            <div className="flex items-center gap-1" style={{ color: 'var(--warning)' }}>
                                                <FaStar />
                                                <span className="text-sm font-semibold">{result.rating}</span>
                                            </div>
                                        )}
                                        {result.type === 'product' && result.price && (
                                            <div className="font-bold text-lg" style={{ color: 'var(--teal)' }}>
                                                ${result.price}
                                            </div>
                                        )}
                                        {result.type === 'attraction' && result.category && (
                                            <div className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
                                                {result.category}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
