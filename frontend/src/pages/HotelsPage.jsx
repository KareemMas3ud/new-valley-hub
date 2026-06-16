import React, { useEffect, useState } from 'react';
import { getHotels } from '../services/api';
import HotelCard from '../components/HotelCard';

const HotelsPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHotels()
            .then(res => {
                setHotels(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching hotels:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-10">Loading Hotels...</div>;

    return (
        <div className="container mx-auto px-4 py-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <h2 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>Stay in Comfort</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map(hotel => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                ))}
            </div>
            {hotels.length === 0 && (
                <div className="text-center mt-10" style={{ color: 'var(--text-muted)' }}>No hotels found.</div>
            )}
        </div>
    );
};

export default HotelsPage;
