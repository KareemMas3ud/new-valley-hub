import React from 'react';
import SouvenirMaker from '../components/SouvenirMaker';

const SouvenirPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <span>📸</span>
                    Digital Souvenir Maker
                    <span>🎨</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    Create personalized memories of your virtual visit to New Valley.
                    Design custom souvenirs with our ancient Egyptian fonts and beautiful backgrounds.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {['✨ Custom Backgrounds', '🖋️ Ancient Fonts', '💾 Instant Download'].map((label) => (
                        <div key={label} className="px-5 py-2 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Canvas Editor */}
            <SouvenirMaker />

            {/* Tips Section */}
            <div className="mt-12 max-w-4xl mx-auto">
                <div className="rounded-2xl p-8 shadow-lg" style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', border: '2px solid var(--border)' }}>
                    <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                        💡 Design Tips
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ color: 'var(--text-muted)' }}>
                        {[
                            { icon: '🎨', title: 'Choose Your Background', desc: 'Select from our collection of authentic New Valley landscapes and artifacts, or upload your own image URL.' },
                            { icon: '✍️', title: 'Add Custom Text', desc: 'Use our special ancient Egyptian fonts to add personalized messages, names, or dates to your souvenir.' },
                            { icon: '🎭', title: 'Position Elements', desc: 'Drag and drop text anywhere on the canvas. Adjust colors, sizes, and fonts to create the perfect composition.' },
                            { icon: '💾', title: 'Download & Share', desc: 'Save your creation as a high-quality PNG image. Share it on social media or print it as a keepsake!' },
                        ].map((tip) => (
                            <div key={tip.title} className="flex gap-3">
                                <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                                <div>
                                    <h3 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{tip.title}</h3>
                                    <p className="text-sm leading-relaxed">{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <div className="inline-block p-1 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--accent), var(--text-muted))' }}>
                    <div className="rounded-2xl px-8 py-6" style={{ backgroundColor: 'var(--bg-card)' }}>
                        <p className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
                            🏛️ Want to explore 3D artifacts in AR?
                        </p>
                        <p className="mb-4" style={{ color: 'var(--text-muted)' }}>
                            Visit our Virtual Museum to experience ancient Egyptian artifacts in stunning 3D
                        </p>
                        <a
                            href="/museum"
                            className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }}
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
