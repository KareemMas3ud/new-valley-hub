import React, { useState, useEffect } from 'react';
import ARViewer from '../components/ARViewer';
import axios from 'axios';

const VirtualMuseumPage = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch ONLY Museum Artifacts from the new API
        const fetchMuseumArtifacts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tourism/museum-artifacts/');
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
        <div className="min-h-screen bg-[#FFF4E2] py-12">
            <div className="container mx-auto px-4">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold text-[#472825] mb-4 flex items-center justify-center gap-4">
                        <span>🏛️</span>
                        The Virtual Museum
                        <span>🏺</span>
                    </h1>
                    <p className="text-xl text-[#96786F] max-w-2xl mx-auto leading-relaxed">
                        Experience Ancient Egyptian History in Your Space
                    </p>
                    <div className="mt-4 inline-block bg-[#FDE4BC] px-6 py-3 rounded-full border border-[#D3AB80]/30">
                        <p className="text-[#472825] font-semibold">
                            📱 View artifacts in 3D and place them in your real environment using AR
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#D3AB80] mx-auto"></div>
                        <p className="mt-4 text-[#472825] font-semibold">Loading Museum Artifacts...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-600 font-semibold">{error}</p>
                        <p className="text-[#96786F] mt-2">Please check your backend server is running</p>
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
                                        <div className="mt-6 bg-[#FDE4BC] rounded-xl p-4 border border-[#D3AB80]/30 text-center">
                                            <p className="text-[#96786F] text-sm">
                                                📍 Found at: <span className="font-bold text-[#472825]">{artifact.related_attraction.name || 'New Valley'}</span>
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
                        <h2 className="text-3xl font-bold text-[#472825] mb-4">
                            No Artifacts Yet
                        </h2>
                        <p className="text-[#96786F] mb-6">
                            The museum collection is being prepared. Check back soon!
                        </p>
                        <div className="bg-[#FDE4BC] rounded-xl p-6 border-2 border-[#D3AB80]/30 inline-block">
                            <p className="text-[#472825] font-semibold mb-2">
                                💡 For Administrators:
                            </p>
                            <p className="text-[#96786F] text-sm">
                                Upload 3D artifacts via Django Admin at <code className="bg-white px-2 py-1 rounded">/admin/tourism/museumartifact/</code>
                            </p>
                        </div>
                    </div>
                )}

                {/* Educational Section (shown when artifacts exist) */}
                {!loading && artifacts.length > 0 && (
                    <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-[#FDE4BC] to-[#FFF4E2] rounded-2xl p-8 border-2 border-[#D3AB80]/40 shadow-xl">
                        <h2 className="text-3xl font-bold text-[#472825] mb-4 text-center">
                            About Ancient Egyptian Artifacts
                        </h2>
                        <div className="text-[#96786F] leading-relaxed space-y-4">
                            <p>
                                The <strong className="text-[#472825]">New Valley Governorate</strong> is home to numerous archaeological treasures
                                dating back thousands of years. These artifacts provide invaluable insights into ancient Egyptian civilization.
                            </p>
                            <p>
                                The oasis regions of <strong className="text-[#D3AB80]">Kharga, Dakhla, Farafra, and Bahariya</strong> have yielded
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
