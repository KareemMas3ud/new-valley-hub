import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getAttractions, getServices, getHotels } from '../services/api';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attractionsRes, servicesRes, hotelsRes] = await Promise.all([
                    getAttractions(),
                    getServices(),
                    getHotels()
                ]);

                const combinedLocations = [
                    ...attractionsRes.data.map(item => ({ ...item, type: 'Attraction', color: 'blue' })),
                    ...servicesRes.data.map(item => ({ ...item, type: 'Service', color: 'green' })),
                    ...hotelsRes.data.map(item => ({ ...item, type: 'Hotel', color: 'orange' }))
                ];

                setLocations(combinedLocations);
            } catch (error) {
                console.error("Error loading map data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center p-10">Loading Map...</div>;

    // Default center: Kharga Oasis (roughly)
    const center = [25.4390, 30.5586];

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0">
            <MapContainer center={center} zoom={8} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {locations.map(loc => (
                    <Marker key={`${loc.type}-${loc.id}`} position={[loc.latitude, loc.longitude]}>
                        <Popup>
                            <div className="p-1">
                                <h3 className="font-bold text-gray-900">{loc.name}</h3>
                                <div className="badge badge-sm mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                    {loc.type}
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 my-1">{loc.description}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
