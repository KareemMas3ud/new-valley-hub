import React from 'react';
import SouvenirMaker from '../components/SouvenirMaker';

const SouvenirPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 bg-[#FFF4E2] min-h-screen">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-[#472825] mb-4 flex items-center justify-center gap-3">
                    <span>📸</span>
                    Digital Souvenir Maker
                    <span>🎨</span>
                </h1>
                <p className="text-[#96786F] max-w-3xl mx-auto text-lg leading-relaxed">
                    Create personalized memories of your virtual visit to New Valley.
                    Design custom souvenirs with our ancient Egyptian fonts and beautiful backgrounds.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <div className="bg-[#FDE4BC] px-5 py-2 rounded-full border border-[#D3AB80]/30">
                        <p className="text-[#472825] font-semibold text-sm">✨ Custom Backgrounds</p>
                    </div>
                    <div className="bg-[#FDE4BC] px-5 py-2 rounded-full border border-[#D3AB80]/30">
                        <p className="text-[#472825] font-semibold text-sm">🖋️ Ancient Fonts</p>
                    </div>
                    <div className="bg-[#FDE4BC] px-5 py-2 rounded-full border border-[#D3AB80]/30">
                        <p className="text-[#472825] font-semibold text-sm">💾 Instant Download</p>
                    </div>
                </div>
            </div>

            {/* Canvas Editor */}
            <SouvenirMaker />

            {/* Tips Section */}
            <div className="mt-12 max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-[#FDE4BC] to-[#FFF4E2] rounded-2xl p-8 border-2 border-[#D3AB80]/40 shadow-lg">
                    <h2 className="text-2xl font-bold text-[#472825] mb-6 text-center">
                        💡 Design Tips
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#96786F]">
                        <div className="flex gap-3">
                            <span className="text-2xl flex-shrink-0">🎨</span>
                            <div>
                                <h3 className="font-bold text-[#472825] mb-1">Choose Your Background</h3>
                                <p className="text-sm leading-relaxed">
                                    Select from our collection of authentic New Valley landscapes and artifacts,
                                    or upload your own image URL.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl flex-shrink-0">✍️</span>
                            <div>
                                <h3 className="font-bold text-[#472825] mb-1">Add Custom Text</h3>
                                <p className="text-sm leading-relaxed">
                                    Use our special ancient Egyptian fonts to add personalized messages,
                                    names, or dates to your souvenir.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl flex-shrink-0">🎭</span>
                            <div>
                                <h3 className="font-bold text-[#472825] mb-1">Position Elements</h3>
                                <p className="text-sm leading-relaxed">
                                    Drag and drop text anywhere on the canvas. Adjust colors, sizes,
                                    and fonts to create the perfect composition.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-2xl flex-shrink-0">💾</span>
                            <div>
                                <h3 className="font-bold text-[#472825] mb-1">Download & Share</h3>
                                <p className="text-sm leading-relaxed">
                                    Save your creation as a high-quality PNG image. Share it on social media
                                    or print it as a keepsake!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <div className="inline-block bg-gradient-to-r from-[#D3AB80] to-[#96786F] p-1 rounded-2xl">
                    <div className="bg-[#FFF4E2] rounded-2xl px-8 py-6">
                        <p className="text-[#472825] font-bold text-lg mb-2">
                            🏛️ Want to explore 3D artifacts in AR?
                        </p>
                        <p className="text-[#96786F] mb-4">
                            Visit our Virtual Museum to experience ancient Egyptian artifacts in stunning 3D
                        </p>
                        <a
                            href="/museum"
                            className="inline-flex items-center gap-2 bg-[#D3AB80] hover:bg-[#96786F] 
                                     text-[#472825] hover:text-white font-bold px-6 py-3 rounded-full
                                     transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                        >
                            <span>🏺</span>
                            <span>Visit Virtual Museum</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SouvenirPage;
