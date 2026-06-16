import React from 'react';

const AttractionCard = ({ attraction }) => {
    return (
        <div
            className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative"
            style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
            }}
        >
            {/* Image with hover zoom */}
            <div className="aspect-[4/3] overflow-hidden relative">
                {attraction.image ? (
                    <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                        <span className="material-symbols-outlined text-5xl opacity-30">image</span>
                    </div>
                )}
                {/* Type Badge — overlaid on image */}
                <div className="absolute top-4 left-4">
                    <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-label-sm uppercase tracking-widest shadow-md"
                        style={{ backgroundColor: 'var(--teal)', color: 'white' }}
                    >
                        {attraction.attraction_type}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-headline-md mb-2" style={{ color: 'var(--text-primary)' }}>
                    {attraction.name}
                </h3>
                <p className="text-body-md mb-6 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {attraction.description}
                </p>

                {/* Meta Info */}
                <div className="flex justify-between items-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">schedule</span>
                        {attraction.visit_duration_minutes} mins
                    </span>
                    <span className="font-semibold text-label-sm" style={{ color: 'var(--accent)' }}>
                        {parseFloat(attraction.ticket_price) === 0 ? 'Free Entry' : `EGP ${attraction.ticket_price}`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AttractionCard;
