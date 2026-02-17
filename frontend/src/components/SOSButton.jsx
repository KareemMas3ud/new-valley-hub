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
                            className="flex items-center justify-between bg-[#FDE4BC] text-[#472825] px-4 py-2 rounded-lg shadow-lg hover:bg-[#FFF4E2] transition-colors w-48 border-l-4 border-[#D3AB80]"
                        >
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">{contact.icon}</span>
                                <span className="font-bold text-sm">{contact.name}</span>
                            </div>
                            <span className="text-[#D3AB80] font-bold">{contact.number}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Main Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform hover:scale-110
                    ${isOpen ? 'bg-[#96786F] rotate-45' : 'bg-[#472825] animate-pulse'}
                `}
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
