import React, { useState } from 'react';
import { generateItinerary, saveTripApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import TripPlanner from '../components/TripPlanner';
import RevealOnScroll from '../components/RevealOnScroll';
import LoginModal from '../components/LoginModal';

const PlannerPage = () => {
    const [formData, setFormData] = useState({ days: 3, budget: 'medium', interests: [] });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(0);

    const { user, accessToken } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);

    const handleInterestChange = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

    // ── Save logic — reads token internally, never from event args ──────────
    const executeSave = async () => {
        const token = accessToken || localStorage.getItem('nvh_access');
        if (!token) { setShowModal(true); return; }

        setSaveStatus('saving');
        const stops = itinerary ? itinerary.flatMap(d => d.activities).map(a => a.name) : [];
        try {
            await saveTripApi({ transport_mode: 'unknown', total_co2: 0, route_data: stops }, token);
            setSaveStatus('ok');
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (err) {
            console.error('[PlannerPage] save error:', err?.response?.data ?? err.message);
            setSaveStatus('error');
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    const openLoginModal = () => setShowModal(true);

    const handleLoginSuccess = () => {
        setShowModal(false);
        setTimeout(executeSave, 50);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await generateItinerary(formData);
            if (res.data.itinerary) {
                setItinerary(res.data.itinerary);
                setEstimatedCost(res.data.total_estimated_cost ?? 0);
            } else {
                setItinerary(res.data);
            }
        } catch (err) {
            console.error('Error generating plan', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#472825]">✨ AI Trip Planner</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left panel — form */}
                <div className="md:col-span-1 bg-[#FDE4BC] p-6 rounded-lg shadow-md h-fit">
                    <h3 className="text-xl font-bold mb-4">Your Preferences</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-[#472825] font-bold mb-2">Duration (Days)</label>
                            <input type="number" min="1" max="7" value={formData.days}
                                onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                className="w-full border border-[#96786F]/30 p-2 rounded focus:ring-2 focus:ring-[#D3AB80] text-[#472825]" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#472825] font-bold mb-2">Budget Level</label>
                            <select value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                className="w-full border border-[#96786F]/30 p-2 rounded focus:ring-2 focus:ring-[#D3AB80] text-[#472825]">
                                <option value="low">Budget (Low)</option>
                                <option value="medium">Standard (Medium)</option>
                                <option value="high">Luxury (High)</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-[#472825] font-bold mb-2">Interests</label>
                            <div className="space-y-2">
                                {['natural', 'historical', 'cultural'].map(type => (
                                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.interests.includes(type)}
                                            onChange={() => handleInterestChange(type)}
                                            className="form-checkbox text-[#D3AB80]" />
                                        <span className="capitalize">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" disabled={loading}
                            className="w-full bg-[#D3AB80] text-[#472825] font-bold py-3 rounded hover:bg-[#96786F] hover:text-white transition">
                            {loading ? 'Generating...' : 'Generate Plan ✨'}
                        </button>

                        {/* Save Trip — only visible after plan generates */}
                        {itinerary && (
                            <>
                                {/* ── OR divider ────────────────────────────────── */}
                                <div className="relative my-5 flex items-center gap-3">
                                    <div className="flex-1 h-px bg-[#96786F]/25" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#96786F]/70">or</span>
                                    <div className="flex-1 h-px bg-[#96786F]/25" />
                                </div>

                                {/* ── Save Trip button ───────────────────── */}
                                <button type="button"
                                    onClick={user ? executeSave : openLoginModal}
                                    disabled={saveStatus === 'saving'}
                                    className={`w-full flex items-center justify-center gap-2 font-bold py-3 rounded-full transition-all duration-300 disabled:opacity-60 ${user
                                            ? 'bg-gradient-to-r from-[#D3AB80] to-[#C49A6A] text-[#472825] shadow-lg hover:shadow-[#D3AB80]/40 hover:-translate-y-0.5 hover:from-[#C49A6A] hover:to-[#96786F] hover:text-white'
                                            : 'bg-white/40 backdrop-blur-sm border border-[#472825]/30 text-[#472825] hover:bg-white/70 hover:border-[#472825]/60 hover:shadow-md'
                                        }`}>
                                    {saveStatus === 'saving' ? (
                                        <><span className="animate-spin">⏳</span> Saving…</>
                                    ) : user ? (
                                        <><span>📍</span> Save This Trip ✨</>
                                    ) : (
                                        <><span>🔑</span> Sign In to Save</>
                                    )}
                                </button>
                                {saveStatus === 'ok' && <p className="mt-2 text-center text-xs text-green-700 font-semibold">✅ Trip saved!</p>}
                                {saveStatus === 'error' && <p className="mt-2 text-center text-xs text-red-600 font-semibold">❌ Couldn't save. Try again.</p>}
                                {!user && <p className="mt-1 text-center text-[10px] text-[#96786F]">Free account required to save trips</p>}
                            </>
                        )}
                    </form>
                </div>

                {/* Right panel — results */}
                <div className="md:col-span-2">
                    {itinerary ? (
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-4 text-[#D3AB80]">Your Recommended Itinerary</h3>
                            <div className="bg-gradient-to-r from-[#FDE4BC] to-[#FFF4E2] border border-[#D3AB80] rounded-lg p-5 mb-6 flex items-center justify-between shadow-sm">
                                <div>
                                    <h4 className="text-[#472825] font-bold text-lg">Estimated Total Cost</h4>
                                    <p className="text-xs text-[#96786F] mt-1">*Includes estimated accommodation, food, and entry tickets.</p>
                                </div>
                                <span className="block text-3xl font-extrabold text-[#D3AB80]">
                                    ≈ {estimatedCost.toLocaleString()} <span className="text-lg">EGP</span>
                                </span>
                            </div>
                            {itinerary.map((day) => (
                                <div key={day.day} className="bg-[#FDE4BC] p-6 rounded-lg shadow border-l-4 border-[#D3AB80]">
                                    <h4 className="text-xl font-bold mb-4">Day {day.day}</h4>
                                    <div className="space-y-4">
                                        {day.activities.map((act, idx) => (
                                            <div key={idx} className="flex items-start space-x-4 p-3 bg-[#FFF4E2] rounded">
                                                <div className="flex-shrink-0 w-16 h-16 bg-[#96786F]/20 rounded overflow-hidden">
                                                    {act.image && <img src={act.image} alt={act.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-bold uppercase bg-[#D3AB80]/30 text-[#472825] px-2 py-0.5 rounded">{act.time}</span>
                                                        <h5 className="font-bold text-lg text-[#472825]">{act.name}</h5>
                                                    </div>
                                                    <p className="text-[#96786F] text-sm mt-1">{act.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {day.activities.length === 0 && <p className="text-gray-500 italic">Relax and explore the local markets.</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-[#96786F] bg-[#FFF4E2] rounded-lg border-2 border-dashed border-[#D3AB80] p-10">
                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" />
                            </svg>
                            <p className="text-lg">Fill the form to generate your personal travel plan.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Eco Analyzer divider */}
            <div className="flex items-center gap-4 my-12">
                <div className="flex-1 h-px bg-[#D3AB80]/30" />
                <span className="text-[#96786F] text-sm font-semibold whitespace-nowrap">🌍 Eco-Analyzer</span>
                <div className="flex-1 h-px bg-[#D3AB80]/30" />
            </div>

            <RevealOnScroll width="100%">
                <TripPlanner addedAttractions={itinerary ? itinerary.flatMap(day => day.activities) : []} />
            </RevealOnScroll>

            <LoginModal open={showModal} onClose={() => setShowModal(false)} onSuccess={handleLoginSuccess} />
        </div>
    );
};

export default PlannerPage;
