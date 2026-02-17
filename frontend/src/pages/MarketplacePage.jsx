import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const MarketplacePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-sand mx-auto mb-4"></div>
                <p className="text-brand-taupe">Loading Marketplace...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mx-auto px-4 py-16">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-red-800 font-bold mb-2">⚠️ Error Loading Marketplace</h3>
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-red-500 mt-2">Please try refreshing the page or contact support.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-brand-ivory to-brand-beige">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-brand-sand to-brand-taupe text-white py-20 px-4 mb-12">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">🛍️ Local Marketplace</h1>
                    <p className="text-xl text-brand-ivory max-w-2xl mx-auto">
                        Support local artisans by purchasing authentic handcrafted products from the New Valley
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                {products.length > 0 ? (
                    <>
                        {/* Products Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    className="bg-brand-beige rounded-2xl shadow-lg overflow-hidden border border-brand-taupe/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                >
                                    {/* Product Image */}
                                    <div className="h-64 relative overflow-hidden bg-gradient-to-br from-brand-ivory to-brand-beige">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl">🌾</span>
                                            </div>
                                        )}
                                        {/* Badge */}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-brand-sand shadow-lg">
                                            Authentic
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-6">
                                        <h3 className="font-bold text-xl text-brand-dark mb-2">{product.name}</h3>
                                        <p className="text-brand-taupe text-sm mb-4 line-clamp-2">{product.description}</p>

                                        {/* Price and Action */}
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-2xl font-bold text-brand-sand">
                                                EGP {product.price}
                                            </div>
                                            <button className="bg-brand-sand hover:bg-brand-taupe text-brand-dark px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105">
                                                Buy Now
                                            </button>
                                        </div>

                                        {/* Seller Info */}
                                        <div className="border-t border-brand-taupe/20 pt-3 mt-3">
                                            <div className="flex items-center text-sm text-brand-taupe">
                                                <span className="mr-2">👤</span>
                                                <span className="font-medium text-brand-dark">{product.seller_name}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-brand-taupe mt-1">
                                                <span className="mr-2">📱</span>
                                                <span>{product.seller_contact}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Banner */}
                        <div className="mt-16 bg-gradient-to-r from-brand-beige to-brand-ivory border-l-4 border-brand-sand p-6 rounded-lg">
                            <h3 className="font-bold text-lg text-brand-dark mb-2">💙 Support Local Communities</h3>
                            <p className="text-brand-taupe">
                                Every purchase directly supports local families and helps preserve traditional crafts. All products are handmade with care using sustainable practices.
                            </p>
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="bg-brand-beige rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                            <div className="text-6xl mb-4">🏪</div>
                            <h3 className="text-2xl font-bold text-brand-dark mb-3">Marketplace Coming Soon!</h3>
                            <p className="text-brand-taupe mb-6">
                                We're currently adding amazing local products. Check back soon for dates, handicrafts, pottery, and more!
                            </p>
                            <button className="bg-brand-sand hover:bg-brand-taupe text-brand-dark px-8 py-3 rounded-full font-bold transition-colors">
                                Notify Me
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarketplacePage;
