import React from 'react';
import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-[#FFF4E2]">
            <div className="bg-[#472825] text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-xl text-[#FDE4BC]">Get in touch with the team building the future of tourism in New Valley</p>
            </div>

            <TeamSection />
        </div>
    );
};

export default ContactPage;
