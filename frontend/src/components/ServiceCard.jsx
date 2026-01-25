import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 flex items-start space-x-4 hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500 font-bold text-xl">
                    {service.category_name ? service.category_name[0] : 'S'}
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="text-lg font-bold text-gray-800">{service.name}</h4>
                <p className="text-gray-500 text-sm">{service.category_name}</p>
                <div className="mt-2 text-sm">
                    {service.phone_number && (
                        <p className="text-gray-700">📞 {service.phone_number}</p>
                    )}
                    {service.website && (
                        <a href={service.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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
