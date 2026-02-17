import React from 'react';

const HotelCard = ({ hotel }) => {
    return (
        <div className="bg-brand-beige shadow-md rounded-lg overflow-hidden border border-brand-taupe/20 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative">
                {hotel.image ? (
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-brand-taupe/30 flex items-center justify-center text-brand-dark">No Image</div>
                )}
                <div className="absolute top-2 right-2 bg-brand-sand text-white px-2 py-1 rounded font-bold text-xs shadow">
                    {hotel.stars} ★
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-brand-dark mb-1">{hotel.name}</h3>
                    <p className="text-brand-taupe text-sm mb-3 line-clamp-2">{hotel.description}</p>
                    <div className="text-sm text-brand-taupe mb-2">Price Range: <span className="font-semibold text-brand-sand">{hotel.price_range}</span></div>
                </div>

                <div className="flex gap-2 mt-auto">
                    {hotel.google_map_url && (
                        <a
                            href={hotel.google_map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center bg-white border-2 border-brand-sand text-brand-sand hover:bg-brand-beige font-bold py-2 px-2 rounded transition-colors duration-200 flex items-center justify-center gap-2"
                            title="Get Directions"
                        >
                            <span>📍</span> Directions
                        </a>
                    )}
                    <a
                        href={hotel.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] text-center bg-brand-sand hover:bg-brand-taupe text-brand-dark font-bold py-2 px-4 rounded transition-colors duration-200"
                    >
                        Book Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
