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

    const interestOptions = [
        { key: 'natural', label: 'Eco-Tours', icon: 'park' },
        { key: 'historical', label: 'Heritage', icon: 'account_balance' },
        { key: 'cultural', label: 'Culture', icon: 'palette' },
    ];

    const handleInterestChange = (interest) => {
        setFormData(prev => {
            const newInterests = prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest];
            return { ...prev, interests: newInterests };
        });
    };

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
        <main className="flex-grow pt-24 pb-16 md:pt-32 md:pb-24 px-5 md:px-16 mx-auto w-full" style={{ maxWidth: '1280px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 w-2/3 h-[600px] rounded-full blur-3xl opacity-50 -z-10 translate-x-1/4 -translate-y-1/4"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}></div>

                {/* ═══════════════════════════════════
                    LEFT PANEL — Glassmorphism Form
                    ═══════════════════════════════════ */}
                <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-32 self-start">
                    {/* Title */}
                    <div className="space-y-4">
                        <h1 className="text-display-lg-mobile md:text-display-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
                            Design Your Serenity
                        </h1>
                        <p className="text-body-md" style={{ color: 'var(--text-secondary)' }}>
                            Let our AI craft a journey tailored to your pace, balancing luxury with the raw beauty of the Egyptian desert.
                        </p>
                    </div>

                    {/* Glass Form Card */}
                    <div
                        className="rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden bg-[#FDF9F4]/40 dark:bg-[#2A2621] backdrop-blur-xl"
                        style={{ border: '1px solid var(--bg-muted)' }}
                    >
                        {/* Subtle top highlight for glass effect */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                            {/* Duration */}
                            <div className="space-y-3">
                                <label className="text-label-sm uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="material-symbols-outlined text-[16px]">calendar_month</span> Duration
                                </label>
                                <input
                                    type="number" min="1" max="7" value={formData.days}
                                    onChange={e => setFormData({ ...formData, days: parseInt(e.target.value) })}
                                    className="w-full bg-transparent border-0 border-b py-2 px-0 text-body-md focus:ring-0 transition-colors"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                    placeholder="Number of days"
                                />
                            </div>

                            {/* Budget */}
                            <div className="space-y-3">
                                <label className="text-label-sm uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span> Pace & Budget
                                </label>
                                <select
                                    value={formData.budget}
                                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                                    className="w-full bg-transparent border-0 border-b py-2 px-0 text-body-md focus:ring-0 appearance-none cursor-pointer"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                                >
                                    <option value="high">Exclusive Reserve (High-End)</option>
                                    <option value="medium">Balanced Explorer</option>
                                    <option value="low">Minimalist Nomad</option>
                                </select>
                            </div>

                            {/* Interests — Pills */}
                            <div className="space-y-3">
                                <label className="text-label-sm uppercase tracking-widest flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                                    <span className="material-symbols-outlined text-[16px]">explore</span> Core Interests
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {interestOptions.map(opt => (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => handleInterestChange(opt.key)}
                                            className="px-4 py-1.5 rounded-full border text-sm transition-all flex items-center gap-1.5"
                                            style={formData.interests.includes(opt.key)
                                                ? { backgroundColor: 'var(--accent)', borderColor: 'var(--accent)', color: 'var(--text-on-dark)' }
                                                : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)', backgroundColor: 'transparent' }
                                            }
                                        >
                                            <span className="material-symbols-outlined text-[14px]">{opt.icon}</span>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4 shadow-sm disabled:opacity-60 bg-[var(--accent)] text-[var(--text-on-dark)] dark:bg-[#d4af37] dark:text-gray-900 font-semibold"
                            >
                                <span className="material-symbols-outlined">auto_awesome</span>
                                {loading ? 'Generating...' : 'Generate Itinerary'}
                            </button>
                        </form>

                        {/* Save Trip — only visible after plan generates */}
                        {itinerary && (
                            <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                                <button
                                    type="button"
                                    onClick={user ? executeSave : openLoginModal}
                                    disabled={saveStatus === 'saving'}
                                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-full transition-all duration-300 disabled:opacity-60 text-body-md font-semibold ${
                                        user 
                                        ? 'bg-[var(--accent-hover)] text-[var(--accent-dark)] dark:bg-[#d4af37] dark:text-gray-900 shadow-lg' 
                                        : 'bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] dark:bg-[#211E18] dark:text-gray-200'
                                    }`}
                                >
                                    {saveStatus === 'saving' ? (
                                        <><span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span> Saving…</>
                                    ) : user ? (
                                        <><span className="material-symbols-outlined text-[18px]">bookmark_add</span> Save This Trip</>
                                    ) : (
                                        <><span className="material-symbols-outlined text-[18px]">person</span> Sign In to Save</>
                                    )}
                                </button>
                                {saveStatus === 'ok' && <p className="mt-2 text-center text-xs font-semibold" style={{ color: 'var(--teal)' }}>✅ Trip saved!</p>}
                                {saveStatus === 'error' && <p className="mt-2 text-center text-xs font-semibold" style={{ color: 'var(--terracotta)' }}>❌ Couldn't save. Try again.</p>}
                            </div>
                        )}
                    </div>

                    {/* Eco-Analyzer Widget */}
                    <div className="rounded-xl p-5 flex items-start gap-4 bg-white dark:bg-[#211E18] dark:text-gray-200" style={{ border: '1px solid rgba(45,102,111,0.2)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(45,102,111,0.1)' }}>
                            <span className="material-symbols-outlined fill-icon" style={{ color: 'var(--teal)' }}>eco</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold leading-tight mb-1" style={{ color: 'var(--teal)' }}>Eco-Analyzer</h4>
                            <p className="text-sm leading-snug dark:text-gray-300" style={{ color: 'var(--text-secondary)' }}>
                                Your selected interests reflect a <strong className="dark:text-white">High Sustainability Impact</strong>. You're supporting local conservation initiatives.
                            </p>
                            <div className="w-full h-1.5 rounded-full mt-3 overflow-hidden bg-gray-200 dark:bg-gray-700">
                                <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--teal)' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════
                    RIGHT PANEL — AI Timeline
                    ═══════════════════════════════════ */}
                <div className="lg:col-span-8">
                    {itinerary ? (
                        <>
                            {/* Header */}
                            <div className="mb-10 flex items-center justify-between pb-4" style={{ borderBottom: '1px solid var(--bg-muted)' }}>
                                <h2 className="text-headline-lg" style={{ color: 'var(--text-primary)' }}>Your Curated Journey</h2>
                                <span className="text-label-sm uppercase tracking-widest px-3 py-1 rounded-full"
                                    style={{ color: 'var(--accent)', backgroundColor: 'rgba(212,175,55,0.15)' }}>
                                    AI Generated
                                </span>
                            </div>

                            {/* Cost Banner */}
                            <div className="rounded-xl p-5 mb-8 flex items-center justify-between shadow-sm"
                                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                                <div>
                                    <h4 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Estimated Total Cost</h4>
                                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>*Includes accommodation, food, and entry tickets.</p>
                                </div>
                                <span className="text-3xl font-extrabold" style={{ color: 'var(--accent-hover)' }}>
                                    ≈ {estimatedCost.toLocaleString()} <span className="text-lg">EGP</span>
                                </span>
                            </div>

                            {/* Timeline */}
                            <div className="relative ml-4 md:ml-6 pl-8 md:pl-12 space-y-16 pb-12"
                                style={{ borderLeft: '1px solid var(--border-color)' }}>
                                {itinerary.map((day) => (
                                    <div key={day.day} className="relative group">
                                        {/* Timeline Dot */}
                                        <div
                                            className="absolute top-1 w-5 h-5 rounded-full group-hover:scale-110 transition-transform duration-300 z-10"
                                            style={{
                                                left: '-41px',
                                                backgroundColor: 'var(--bg-primary)',
                                                border: '3px solid var(--accent)',
                                            }}
                                        ></div>

                                        <div className="space-y-4">
                                            <div className="flex items-baseline gap-4">
                                                <h3 className="text-headline-md" style={{ color: 'var(--text-primary)' }}>Day {day.day}</h3>
                                            </div>

                                            {day.activities.map((act, idx) => (
                                                <div key={idx}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 rounded-xl border transition-colors shadow-sm"
                                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--bg-secondary)' }}
                                                >
                                                    {act.image && (
                                                        <div className="h-48 md:h-full rounded-lg overflow-hidden relative">
                                                            <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                                                            <div className="absolute top-3 left-3 px-2 py-1 rounded text-xs uppercase tracking-wide"
                                                                style={{ backgroundColor: 'rgba(253,249,244,0.8)', backdropFilter: 'blur(4px)', color: 'var(--text-primary)' }}>
                                                                {act.time}
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className={`p-4 md:p-6 flex flex-col justify-center ${!act.image ? 'md:col-span-2' : 'md:pl-2'}`}>
                                                        <h4 className="text-xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                                                            {act.name}
                                                        </h4>
                                                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                                                            {act.description}
                                                        </p>
                                                        {!act.image && (
                                                            <span className="text-label-sm uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                                                {act.time}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {day.activities.length === 0 && (
                                                <p className="italic text-body-md" style={{ color: 'var(--text-muted)' }}>
                                                    Relax and explore the local markets.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="h-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-16 text-center"
                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)', backgroundColor: 'var(--bg-card)' }}>
                            <span className="material-symbols-outlined text-[64px] mb-6 opacity-40">map</span>
                            <h3 className="text-headline-md mb-3" style={{ color: 'var(--text-primary)' }}>Your Journey Awaits</h3>
                            <p className="text-body-md max-w-md" style={{ color: 'var(--text-secondary)' }}>
                                Fill in your preferences and let our AI craft a personalized travel experience through the ancient landscapes of the New Valley.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Eco Analyzer divider */}
            <div className="flex items-center gap-4 my-12">
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
                <span className="text-label-sm uppercase tracking-widest whitespace-nowrap flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="material-symbols-outlined text-[16px]">eco</span> Eco-Analyzer
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            <RevealOnScroll width="100%">
                <TripPlanner addedAttractions={itinerary ? itinerary.flatMap(day => day.activities) : []} />
            </RevealOnScroll>

            <LoginModal open={showModal} onClose={() => setShowModal(false)} onSuccess={handleLoginSuccess} />
        </main>
    );
};

export default PlannerPage;
