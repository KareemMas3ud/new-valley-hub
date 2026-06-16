import React, { useState } from 'react';

const SOSButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const emergencyContacts = [
        { name: 'Ambulance', number: '123', icon: '🚑' },
        { name: 'Police', number: '122', icon: '🚓' },
        { name: 'Tourist Police', number: '126', icon: '👮' },
    ];

    const handleCall = (number) => {
        window.location.href = `tel:${number}`;
    };

    return (
        <div className="fixed bottom-24 right-4 md:bottom-6 md:left-6 md:right-auto z-50 flex flex-col items-end md:items-start space-y-4">
            {/* Menu */}
            {isOpen && (
                <div className="flex flex-col space-y-2 mb-2 animate-fade-in-up">
                    {emergencyContacts.map((contact) => (
                        <button
                            key={contact.name}
                            onClick={() => handleCall(contact.number)}
                            className="flex items-center justify-between px-4 py-3 rounded-lg shadow-lg transition-all duration-200 w-52 hover:scale-[1.02]"
                            style={{
                                backgroundColor: 'var(--bg-card)',
                                color: 'var(--text-primary)',
                                borderLeft: '4px solid var(--terracotta)',
                                boxShadow: '0 4px 16px var(--shadow-strong)',
                            }}
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">{contact.icon}</span>
                                <span className="font-bold text-sm">{contact.name}</span>
                            </div>
                            <span className="font-bold" style={{ color: 'var(--terracotta)' }}>{contact.number}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110
                    ${isOpen ? 'rotate-45 bg-[var(--text-muted)]' : 'animate-pulse bg-[var(--terracotta)]'}
                `}
                style={{
                    boxShadow: isOpen ? 'none' : '0 4px 20px rgba(196, 87, 58, 0.4)',
                }}
                aria-label="SOS Emergency"
            >
                {isOpen ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-2xl">🆘</span>
                        <span className="text-[10px] font-bold text-white uppercase mt-[-2px]">SOS</span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default SOSButton;
