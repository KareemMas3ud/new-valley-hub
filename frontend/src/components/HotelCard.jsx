import React from 'react';

const HotelCard = ({ hotel }) => {
    return (
        <div
            className="shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col theme-transition"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
            }}
        >
            <div className="h-48 overflow-hidden relative">
                {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>No Image</div>
                )}
                <div
                    className="absolute top-2 right-2 px-2 py-1 rounded font-bold text-xs shadow"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }}
                >
                    {hotel.stars} ★
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-1 font-display" style={{ color: 'var(--text-primary)' }}>{hotel.name}</h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{hotel.description}</p>
                    <div className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                        Price Range: <span className="font-semibold" style={{ color: 'var(--accent)' }}>{hotel.price_range}</span>
                    </div>
                </div>

                <div className="flex gap-2 mt-auto">
                    {hotel.google_map_url && (
                        <a
                            href={hotel.google_map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center border-2 font-bold py-2 px-2 rounded transition-colors duration-200 flex items-center justify-center gap-2 hover:opacity-80"
                            style={{ borderColor: 'var(--teal)', color: 'var(--teal)' }}
                            title="Get Directions"
                        >
                            <span>📍</span> Directions
                        </a>
                    )}
                    <a
                        href={hotel.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] text-center font-bold py-2 px-4 rounded transition-all duration-200 hover:opacity-90"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }}
                    >
                        Book Now ↗
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
