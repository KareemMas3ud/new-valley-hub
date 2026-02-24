import axios from 'axios';

const BASE = 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: `${BASE}/api/`,
    headers: { 'Content-Type': 'application/json' },
});

export const getAttractions = () => api.get('tourism/attractions/');
export const getArtifacts = () => api.get('tourism/artifacts/');
export const getServices = () => api.get('services/items/');
export const getServiceCategories = () => api.get('services/categories/');
export const getHotels = () => api.get('hospitality/hotels/');
export const generateItinerary = (data) => api.post('tourism/attractions/generate_plan/', data);
export const getProducts = () => api.get('marketplace/products/');

// ── Auth helpers ───────────────────────────────────────────────────────────
export const loginUser = (email, password) =>
    axios.post(`${BASE}/api/auth/token/`, { username: email, password });

export const registerUser = (email, password) =>
    axios.post(`${BASE}/api/auth/register/`, { email, password });

// ── Trips ──────────────────────────────────────────────────────────────────
const authHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
});

export const saveTripApi = async (tripData, token) => {
    if (!token) throw new Error('No access token.');
    const payload = {
        transport_mode: tripData.transport_mode ?? 'unknown',
        total_co2: Number(tripData.total_co2 ?? 0),
        route_data: Array.isArray(tripData.route_data) ? tripData.route_data : [],
    };
    console.log('[saveTripApi] POST', payload);
    try {
        const res = await axios.post(`${BASE}/api/auth/save-trip/`, payload, authHeaders(token));
        console.log('[saveTripApi] ✅', res.data);
        return res;
    } catch (err) {
        console.error('[saveTripApi] ❌', err?.response?.status, err?.response?.data ?? err.message);
        throw err;
    }
};

export const getMyTrips = (token) => axios.get(`${BASE}/api/auth/save-trip/`, authHeaders(token));
export const deleteTrip = (id, token) => axios.delete(`${BASE}/api/auth/save-trip/${id}/`, authHeaders(token));

// ── Souvenirs ──────────────────────────────────────────────────────────────
export const saveSouvenir = (imageData, caption, token) =>
    axios.post(`${BASE}/api/auth/souvenirs/`, { image_data: imageData, caption }, authHeaders(token));

export const getMySouvenirs = (token) => axios.get(`${BASE}/api/auth/souvenirs/`, authHeaders(token));
export const deleteSouvenir = (id, token) => axios.delete(`${BASE}/api/auth/souvenirs/${id}/`, authHeaders(token));

export default api;
