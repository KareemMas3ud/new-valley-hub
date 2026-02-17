import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaGlobe, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tourism/team/');
                setTeamMembers(response.data);
            } catch (error) {
                console.error("Error fetching team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const getLinkProps = (url) => {
        if (!url) return null;

        if (url.includes('github.com')) {
            return { icon: <FaGithub />, text: 'View Code' };
        } else if (url.includes('linkedin.com')) {
            return { icon: <FaLinkedin />, text: 'Connect' };
        } else if (url.includes('instagram.com')) {
            return { icon: <FaInstagram />, text: 'Follow' };
        } else if (url.includes('linktr.ee')) {
            return { icon: <SiLinktree />, text: 'All Links' };
        } else {
            return { icon: <FaGlobe />, text: 'Visit Profile' };
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading team...</div>;
    }

    if (teamMembers.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-[#FFF4E2]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-[#472825]">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member) => {
                        const linkProps = getLinkProps(member.profile_url);

                        return (
                            <div key={member.id} className="relative z-10 bg-[#FFF4E2] rounded-xl shadow-lg shadow-[#472825]/5 hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-[#D3AB80]/20 flex flex-col items-center p-6 transform hover:-translate-y-1 transition-transform">
                                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden ring-4 ring-[#D3AB80]/50 shadow-md">
                                    <img
                                        src={member.final_photo?.startsWith('http') ? member.final_photo : `http://127.0.0.1:8000${member.final_photo}`}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-[#472825] mb-1">{member.name}</h3>
                                <p className="text-[#96786F] font-medium mb-4">{member.role}</p>

                                {linkProps && member.profile_url && (
                                    <a
                                        href={member.profile_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-2 bg-[#472825] text-[#D3AB80] hover:bg-[#D3AB80] hover:text-[#472825] rounded-full transition-colors duration-200 flex items-center gap-2 font-medium"
                                    >
                                        <span>{linkProps.text}</span>
                                        {linkProps.icon}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
