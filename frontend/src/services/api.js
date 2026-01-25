import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAttractions = () => api.get('tourism/attractions/');
export const getArtifacts = () => api.get('tourism/artifacts/');
export const getServices = () => api.get('services/items/');
export const getServiceCategories = () => api.get('services/categories/');
export const getHotels = () => api.get('hospitality/hotels/');
export const generateItinerary = (data) => api.post('tourism/attractions/generate_plan/', data);
export const getProducts = () => api.get('marketplace/products/');

export default api;
