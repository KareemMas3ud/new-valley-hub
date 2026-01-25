import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Interactive Map</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore the New Valley geographically. Find attractions, services, and hotels near you.
            </p>
            <MapComponent />
        </div>
    );
};

export default MapPage;
