import React, { useState, useEffect } from 'react';
import ARViewer from '../components/ARViewer';
import axios from 'axios';
import { BASE } from '../services/api';

const VirtualMuseumPage = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch ONLY Museum Artifacts from the new API
        const fetchMuseumArtifacts = async () => {
            try {
                const response = await axios.get(`${BASE}/api/tourism/museum-artifacts/`);
                setArtifacts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching museum artifacts:', err);
                setError('Failed to load museum artifacts');
                setLoading(false);
            }
        };

        fetchMuseumArtifacts();
    }, []);

    return (
        <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="container mx-auto px-4">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold mb-4 flex items-center justify-center gap-4" style={{ color: 'var(--text-primary)' }}>
                        <span>🏛️</span>
                        The Virtual Museum
                        <span>🏺</span>
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        Experience Ancient Egyptian History in Your Space
                    </p>
                    <div className="mt-4 inline-block px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] dark:bg-[#2A2621]">
                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                            📱 View artifacts in 3D and place them in your real environment using AR
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 mx-auto" style={{ borderBottom: '4px solid var(--accent)' }}></div>
                        <p className="mt-4 font-semibold" style={{ color: 'var(--text-primary)' }}>Loading Museum Artifacts...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="font-semibold" style={{ color: 'var(--terracotta)' }}>{error}</p>
                        <p className="mt-2" style={{ color: 'var(--text-muted)' }}>Please check your backend server is running</p>
                    </div>
                )}

                {/* Museum Artifacts Gallery */}
                {!loading && !error && artifacts.length > 0 && (
                    <div className="space-y-16">
                        {artifacts.map((artifact) => {
                            // Use display_image from backend (URL takes priority)
                            const posterImage = artifact.display_image;

                            return (
                                <div key={artifact.id} className="max-w-6xl mx-auto">
                                    <ARViewer
                                        modelSrc={artifact.model_3d_file}
                                        posterSrc={posterImage}
                                        alt={artifact.name}
                                        title={artifact.name}
                                        description={artifact.description}
                                        showQROnDesktop={true}
                                    />

                                    {/* Artifact Details */}
                                    {artifact.related_attraction && (
                                        <div className="mt-6 rounded-xl p-4 text-center bg-[var(--bg-secondary)] border border-[var(--border)] dark:bg-[#2A2621]">
                                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                                📍 Found at: <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{artifact.related_attraction.name || 'New Valley'}</span>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && artifacts.length === 0 && (
                    <div className="max-w-4xl mx-auto text-center py-12">
                        <div className="text-8xl mb-6">🏺</div>
                        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                            No Artifacts Yet
                        </h2>
                        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
                            The museum collection is being prepared. Check back soon!
                        </p>
                        <div className="rounded-xl p-6 inline-block" style={{ backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--border)' }}>
                            <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                💡 For Administrators:
                            </p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                Upload 3D artifacts via Django Admin at <code className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--bg-card)' }}>/admin/tourism/museumartifact/</code>
                            </p>
                        </div>
                    </div>
                )}

                {/* Educational Section (shown when artifacts exist) */}
                {!loading && artifacts.length > 0 && (
                    <div className="mt-16 max-w-4xl mx-auto rounded-2xl p-8 shadow-xl" style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', border: '2px solid var(--border)' }}>
                        <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: 'var(--text-primary)' }}>
                            About Ancient Egyptian Artifacts
                        </h2>
                        <div className="leading-relaxed space-y-4" style={{ color: 'var(--text-muted)' }}>
                            <p>
                                The <strong style={{ color: 'var(--text-primary)' }}>New Valley Governorate</strong> is home to numerous archaeological treasures
                                dating back thousands of years. These artifacts provide invaluable insights into ancient Egyptian civilization.
                            </p>
                            <p>
                                The oasis regions of <strong style={{ color: 'var(--accent)' }}>Kharga, Dakhla, Farafra, and Bahariya</strong> have yielded
                                remarkable finds, including statues, pottery, and religious artifacts that tell the story of life in ancient times.
                            </p>
                            <p>
                                Through AR technology, you can now bring these priceless artifacts into your own space and experience
                                history like never before.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VirtualMuseumPage;
