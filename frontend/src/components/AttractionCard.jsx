import React from 'react';

const AttractionCard = ({ attraction }) => {
    return (
        <div className="bg-brand-beige shadow-md rounded-lg overflow-hidden border border-brand-taupe/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="h-48 overflow-hidden">
                {attraction.image ? (
                    <img src={attraction.image} alt={attraction.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-brand-taupe/30 flex items-center justify-center text-brand-dark">No Image</div>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-brand-dark mb-2">{attraction.name}</h3>
                    <span className="bg-brand-sand/20 text-brand-dark text-xs px-2 py-1 rounded-full uppercase font-semibold">
                        {attraction.attraction_type}
                    </span>
                </div>
                <p className="text-brand-taupe text-sm mb-4 line-clamp-3">{attraction.description}</p>

                <div className="flex justify-between items-center text-sm text-brand-taupe mt-2">
                    <span>⏱ {attraction.visit_duration_minutes} mins</span>
                    <span className="font-semibold text-brand-sand">💰 {parseFloat(attraction.ticket_price) === 0 ? 'Free' : `EGP ${attraction.ticket_price}`}</span>
                </div>
            </div>
        </div>
    );
};

export default AttractionCard;
