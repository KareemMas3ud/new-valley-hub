import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyTrips, deleteTrip, getMySouvenirs, deleteSouvenir } from '../services/api';

// ─────────────────────────────────────────────────────────────────────────────
//  MyTrips — user dashboard: saved eco-trips and saved souvenirs
// ─────────────────────────────────────────────────────────────────────────────

function TripCard({ trip, index, token, onDeleted }) {
    const [deleting, setDeleting] = useState(false);
    const stops = Array.isArray(trip.route_data) ? trip.route_data : [];
    const date = new Date(trip.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const handleDelete = async () => {
        if (!window.confirm('Delete this trip?')) return;
        setDeleting(true);
        try {
            await deleteTrip(trip.id, token);
            onDeleted(trip.id);
        } catch (err) {
            console.error('[TripCard] delete error:', err?.response?.data ?? err.message);
            setDeleting(false);
        }
    };

    return (
        <div className="relative rounded-2xl border border-white/40 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ background: 'rgba(255,244,226,0.80)', backdropFilter: 'blur(16px)' }}>
            <div className="h-1.5 w-full bg-gradient-to-r from-[#D3AB80] to-[#96786F]" />
            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#96786F] mb-0.5">Trip #{index + 1}</p>
                        <h3 className="text-base font-extrabold text-[#472825] leading-tight">
                            {stops.length > 0
                                ? stops.slice(0, 2).join(' → ') + (stops.length > 2 ? ` +${stops.length - 2}` : '')
                                : 'New Valley Journey'}
                        </h3>
                    </div>
                    <span className="text-2xl">🗺️</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                    {[['Stops', stops.length], ['CO₂ kg', Number(trip.total_co2).toFixed(1)], ['Saved', date]].map(([label, val]) => (
                        <div key={label} className="bg-white/50 border border-[#D3AB80]/20 rounded-xl p-2 text-center">
                            <p className="text-[9px] text-[#96786F] uppercase tracking-wide mb-0.5">{label}</p>
                            <p className="text-sm font-extrabold text-[#472825] leading-tight">{val}</p>
                        </div>
                    ))}
                </div>

                {stops.slice(0, 3).map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#96786F] mb-1">
                        <span className="w-4 h-4 rounded-full bg-[#D3AB80]/40 flex items-center justify-center text-[9px] font-bold text-[#472825]">{i + 1}</span>
                        <span className="truncate">{s}</span>
                    </div>
                ))}
                {stops.length > 3 && <p className="text-[10px] text-[#96786F] italic pl-6">+{stops.length - 3} more</p>}

                <button onClick={handleDelete} disabled={deleting}
                    className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-400 disabled:opacity-50 py-2 rounded-xl transition-all duration-200">
                    {deleting ? '⏳ Deleting…' : '🗑️ Delete Trip'}
                </button>
            </div>
        </div>
    );
}

function SouvenirCard({ souvenir, token, onDeleted }) {
    const [deleting, setDeleting] = useState(false);
    const date = new Date(souvenir.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    const handleDelete = async () => {
        if (!window.confirm('Delete this souvenir?')) return;
        setDeleting(true);
        try {
            await deleteSouvenir(souvenir.id, token);
            onDeleted(souvenir.id);
        } catch (err) {
            console.error('[SouvenirCard] delete error:', err?.response?.data ?? err.message);
            setDeleting(false);
        }
    };

    return (
        <div className="rounded-2xl border border-white/40 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            style={{ background: 'rgba(255,244,226,0.80)', backdropFilter: 'blur(16px)' }}>
            <img src={souvenir.image_data} alt={souvenir.caption || 'Souvenir'} className="w-full aspect-video object-cover" />
            <div className="p-4">
                {souvenir.caption && <p className="text-sm font-semibold text-[#472825] mb-1 truncate">{souvenir.caption}</p>}
                <p className="text-[10px] text-[#96786F] mb-3">{date}</p>
                <div className="flex gap-2">
                    <a href={souvenir.image_data} download={`souvenir-${souvenir.id}.png`}
                        className="flex-1 text-center text-xs font-bold text-[#472825] border border-[#D3AB80]/50 hover:bg-[#FDE4BC] py-2 rounded-xl transition-all">
                        ⬇️ Download
                    </a>
                    <button onClick={handleDelete} disabled={deleting}
                        className="flex-1 text-xs font-bold text-red-600 border border-red-200 hover:bg-red-50 disabled:opacity-50 py-2 rounded-xl transition-all">
                        {deleting ? '⏳' : '🗑️ Delete'}
                    </button>
                </div>
            </div>
        </div>
    );
}

const MyTrips = () => {
    const { user, accessToken } = useAuth();
    const [trips, setTrips] = useState([]);
    const [souvenirs, setSouvenirs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = accessToken || localStorage.getItem('nvh_access');

    useEffect(() => {
        if (!token) { setLoading(false); return; }
        Promise.all([getMyTrips(token), getMySouvenirs(token)])
            .then(([tripsRes, souvsRes]) => {
                setTrips(tripsRes.data);
                setSouvenirs(souvsRes.data);
            })
            .catch(err => {
                console.error('[MyTrips] fetch error:', err?.response?.data ?? err.message);
                setError('Could not load your dashboard. Please try again.');
            })
            .finally(() => setLoading(false));
    }, [token]);

    if (!user) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <span className="text-6xl mb-4">🔒</span>
            <h2 className="text-2xl font-extrabold text-[#472825] mb-2">Sign In Required</h2>
            <p className="text-[#96786F] mb-6">You need to be logged in to view your dashboard.</p>
            <Link to="/planner" className="bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white font-bold px-8 py-3 rounded-full transition-all shadow-md">
                Go to Trip Planner ✨
            </Link>
        </div>
    );

    if (loading) return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#D3AB80] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#96786F] font-semibold">Loading your dashboard…</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <div className="text-center"><span className="text-5xl mb-4 block">⚠️</span><p className="text-red-600 font-semibold">{error}</p></div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-10 max-w-5xl">
            {/* Header */}
            <div className="text-center mb-10">
                <span className="inline-block bg-[#FDE4BC] text-[#472825] text-xs font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide uppercase border border-[#D3AB80]/40">
                    🗺️ My Dashboard
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#472825] mb-2">
                    Welcome back, <span className="text-[#D3AB80]">{user.email.split('@')[0]}</span> 👋
                </h1>
                <p className="text-[#96786F] text-sm max-w-lg mx-auto">Your saved eco-trips and digital souvenirs from New Valley.</p>
            </div>

            {/* ── Saved Trips ─────────────────────────────────────────────────── */}
            <h2 className="text-xl font-extrabold text-[#472825] mb-4">🌿 Saved Eco-Trips <span className="text-sm font-normal text-[#96786F]">({trips.length})</span></h2>
            {trips.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-[#D3AB80]/40 p-12 text-center mb-10"
                    style={{ background: 'rgba(255,244,226,0.6)' }}>
                    <span className="text-5xl block mb-3">🏺</span>
                    <p className="text-[#472825] font-bold mb-1">No trips saved yet</p>
                    <p className="text-[#96786F] text-sm mb-4">Generate an itinerary and save it to see it here.</p>
                    <Link to="/planner" className="inline-block bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md">
                        Plan a Trip ✨
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {trips.map((trip, i) => (
                        <TripCard key={trip.id} trip={trip} index={i} token={token}
                            onDeleted={(id) => setTrips(prev => prev.filter(t => t.id !== id))} />
                    ))}
                </div>
            )}

            {/* ── Saved Souvenirs ──────────────────────────────────────────────── */}
            <h2 className="text-xl font-extrabold text-[#472825] mb-4">📸 My Saved Souvenirs <span className="text-sm font-normal text-[#96786F]">({souvenirs.length})</span></h2>
            {souvenirs.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-[#D3AB80]/40 p-12 text-center"
                    style={{ background: 'rgba(255,244,226,0.6)' }}>
                    <span className="text-5xl block mb-3">📷</span>
                    <p className="text-[#472825] font-bold mb-1">No souvenirs saved yet</p>
                    <p className="text-[#96786F] text-sm mb-4">Create a digital souvenir and save it to your profile.</p>
                    <Link to="/souvenir" className="inline-block bg-[#D3AB80] hover:bg-[#96786F] text-[#472825] hover:text-white font-bold px-6 py-2.5 rounded-full transition-all shadow-md">
                        Make a Souvenir 📸
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {souvenirs.map(s => (
                        <SouvenirCard key={s.id} souvenir={s} token={token}
                            onDeleted={(id) => setSouvenirs(prev => prev.filter(x => x.id !== id))} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTrips;
