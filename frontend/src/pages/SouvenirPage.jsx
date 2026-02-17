import React from 'react';
import SouvenirMaker from '../components/SouvenirMaker';

const SouvenirPage = () => {
    return (
        <div className="container mx-auto px-4 py-8 bg-[#FFF4E2] min-h-screen">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-[#472825] mb-4">Digital Souvenir Maker 📸</h2>
                <p className="text-[#96786F] max-w-2xl mx-auto">
                    Create a personalized memory of your virtual visit to the New Valley.
                    Choose a background, write your message using our ancient local fonts, and download your keepsake!
                </p>
            </div>

            <SouvenirMaker />
        </div>
    );
};

export default SouvenirPage;
