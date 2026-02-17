import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="bg-brand-beige p-4 rounded-lg shadow border border-brand-taupe/20 flex items-start space-x-4 hover:bg-brand-ivory transition-colors">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-sand/30 flex items-center justify-center text-brand-dark font-bold text-xl">
                    {service.category_name ? service.category_name[0] : 'S'}
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-brand-dark">{service.name}</h4>
                <p className="text-brand-taupe text-sm">{service.category_name}</p>
                <div className="mt-2 text-sm">
                    {service.phone_number && (
                        <p className="text-gray-700">📞 {service.phone_number}</p>
                    )}
                    {service.website && (
                        <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-brand-sand hover:underline">
                            🌐 Website
                        </a>
                    )}
                </div>
            </div>
            {service.is_emergency && (
                <div className="flex-shrink-0">
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold animate-pulse">Emergency</span>
                </div>
            )}
        </div>
    );
};

export default ServiceCard;
