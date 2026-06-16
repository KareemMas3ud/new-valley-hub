import React, { useState, useEffect } from 'react';
import { BASE } from '../services/api';

const GovernorSection = () => {
    const [profile, setProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${BASE}/api/tourism/governor/`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setProfile(data[0]);
                }
            } catch (error) {
                console.error("Error fetching governor profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return null;

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background with Islamic Pattern */}
            <div className="absolute inset-0 z-0" style={{ backgroundColor: 'var(--bg-primary)' }}>
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b8860b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-16">

                    {/* Left Side: Content (RTL) */}
                    <div className="w-full md:w-1/2 text-right order-2 md:order-1" dir="rtl">
                        <div className="relative inline-block mb-8">
                            <h2
                                className="text-4xl font-extrabold leading-tight font-serif tracking-wide"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {profile.welcome_heading}
                            </h2>
                            <div className="h-1.5 w-32 mt-3 ml-auto rounded-full" style={{ backgroundColor: 'var(--accent)' }}></div>
                        </div>

                        <div className="prose prose-xl leading-loose font-arabic mb-10">
                            <p className="text-xl md:text-2xl leading-10 font-medium" style={{ color: 'var(--text-secondary)' }}>
                                "{profile.welcome_message}"
                            </p>
                        </div>

                        <div
                            className="mb-10 pl-6 pr-6 py-4 rounded-l-lg backdrop-blur-sm"
                            style={{ borderRight: '4px solid var(--accent)', backgroundColor: 'var(--bg-secondary)' }}
                        >
                            <h3 className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{profile.name}</h3>
                            <p className="font-bold text-xl uppercase tracking-wider" style={{ color: 'var(--accent)' }}>{profile.title}</p>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="group inline-flex items-center px-8 py-4 text-white rounded-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 duration-300 font-bold text-lg"
                            style={{ backgroundColor: '#1a365d' }}
                        >
                            <span>قراءة السيرة الذاتية</span>
                            <svg className="w-6 h-6 mr-3 -ml-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end order-1 md:order-2">
                        <div className="relative group">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 rounded-2xl transform rotate-3 group-hover:rotate-2 transition-transform duration-500" style={{ border: '2px solid var(--accent)', opacity: 0.3 }}></div>
                            <div className="absolute -inset-4 rounded-2xl transform -rotate-2 group-hover:-rotate-1 transition-transform duration-500" style={{ border: '2px solid var(--text-muted)', opacity: 0.2 }}></div>

                            {profile.photo ? (
                                <img
                                    src={profile.photo.startsWith('http') ? profile.photo : `${BASE}${profile.photo}`}
                                    alt={profile.name}
                                    className="relative rounded-xl shadow-2xl w-full max-w-md object-cover"
                                    style={{ maxHeight: '550px', border: '6px solid var(--bg-secondary)' }}
                                />
                            ) : (
                                <div
                                    className="w-80 h-96 rounded-xl flex items-center justify-center shadow-xl"
                                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '6px solid var(--bg-secondary)' }}
                                >
                                    No Image Available
                                </div>
                            )}

                            {/* Emblem/Decoration */}
                            <div className="absolute -bottom-6 -left-6 text-white p-4 rounded-full shadow-lg" style={{ backgroundColor: 'var(--accent)', border: '4px solid var(--bg-primary)' }}>
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bio Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ backgroundColor: 'var(--overlay)' }} onClick={() => setShowModal(false)}>
                    <div
                        className="rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        style={{ backgroundColor: 'var(--bg-card)' }}
                        onClick={e => e.stopPropagation()}
                        dir="rtl"
                    >
                        <div className="p-6 flex justify-between items-center rounded-t-2xl" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>سيرة ذاتية</h3>
                            <button onClick={() => setShowModal(false)} className="transition-colors" style={{ color: 'var(--text-muted)' }}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-8">
                            <h4 className="text-xl font-bold mb-4" style={{ color: 'var(--accent)' }}>{profile.name}</h4>
                            <div className="whitespace-pre-line leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {profile.career_highlights}
                            </div>
                        </div>
                        <div className="p-6 rounded-b-2xl text-left" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-2 rounded-lg font-bold transition-colors"
                                style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)' }}
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GovernorSection;
