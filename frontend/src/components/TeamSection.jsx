import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaGlobe, FaInstagram } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';

/* ─── Icon & label resolver ─────────────────────────────── */
const getLinkProps = (url) => {
    if (!url) return null;
    if (url.includes('github.com')) return { icon: <FaGithub className="w-4 h-4" />, text: 'View Code' };
    if (url.includes('linkedin.com')) return { icon: <FaLinkedin className="w-4 h-4" />, text: 'Connect' };
    if (url.includes('instagram.com')) return { icon: <FaInstagram className="w-4 h-4" />, text: 'Follow' };
    if (url.includes('linktr.ee')) return { icon: <SiLinktree className="w-4 h-4" />, text: 'All Links' };
    return { icon: <FaGlobe className="w-4 h-4" />, text: 'Visit Profile' };
};

/* ─── Stagger container ─────────────────────────────────── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Individual luxury card ─────────────────────────────── */
const TeamCard = ({ member }) => {
    const linkProps = getLinkProps(member.profile_url);
    const photoSrc = member.final_photo?.startsWith('http')
        ? member.final_photo
        : `http://127.0.0.1:8000${member.final_photo}`;

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -15, boxShadow: '0 32px 60px rgba(71,40,37,0.18)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="
                relative flex flex-col items-center
                w-80 xl:w-96
                bg-[#FFF4E2]
                border border-[#D3AB80]/30
                rounded-3xl
                shadow-lg shadow-[#472825]/8
                px-8 pt-12 pb-10
                overflow-hidden
            "
        >
            {/* ── Decorative top accent bar ── */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D3AB80] via-[#C49A6A] to-[#D3AB80] rounded-t-3xl" />

            {/* ── Avatar ── */}
            <div className="
                relative w-52 h-52 mb-7
                rounded-full overflow-hidden
                ring-4 ring-[#D3AB80]
                shadow-xl shadow-[#D3AB80]/30
            ">
                <img
                    src={photoSrc}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=FDE4BC&color=472825&size=200'; }}
                />
            </div>

            {/* ── Name & role ── */}
            <h3 className="text-3xl font-extrabold text-[#472825] text-center leading-tight mb-2 tracking-tight">
                {member.name}
            </h3>
            <p className="text-sm font-semibold text-[#96786F] text-center uppercase tracking-widest mb-8">
                {member.role}
            </p>

            {/* ── Thin divider ── */}
            <div className="w-16 h-0.5 bg-[#D3AB80]/50 rounded-full mb-8" />

            {/* ── CTA button ── */}
            {linkProps && member.profile_url && (
                <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center gap-2
                        px-7 py-2.5
                        text-sm font-bold tracking-wide
                        rounded-full
                        text-[#472825]
                        border-2 border-[#D3AB80]
                        bg-transparent
                        hover:bg-[#472825] hover:text-[#D3AB80] hover:border-[#472825]
                        transition-all duration-300
                        shadow-sm hover:shadow-md
                    "
                >
                    {linkProps.icon}
                    {linkProps.text}
                </a>
            )}
        </motion.div>
    );
};

/* ─── Main section ───────────────────────────────────────── */
const TeamSection = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tourism/team/')
            .then(r => setTeamMembers(r.data))
            .catch(e => console.error('Error fetching team:', e))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <section className="py-20 bg-[#FFF4E2]">
            <div className="flex justify-center gap-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-80 h-96 bg-[#FDE4BC]/60 rounded-3xl animate-pulse" />
                ))}
            </div>
        </section>
    );

    if (teamMembers.length === 0) return null;

    return (
        <section className="overflow-hidden">

            {/* ── Dark Chocolate Hero Header Band ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className="bg-[#472825] py-12 px-4 text-center"
            >
                {/* Eyebrow label */}
                <p className="text-xs font-bold tracking-[0.35em] text-[#D3AB80] uppercase mb-4">
                    SandScript Team
                </p>

                {/* Main title */}
                <h2 className="text-5xl md:text-6xl font-extrabold text-[#FFF4E2] leading-tight">
                    Meet the Makers
                </h2>

                {/* Golden divider */}
                <div className="mx-auto mt-5 w-20 h-1 bg-gradient-to-r from-[#D3AB80] to-[#C49A6A] rounded-full" />

                {/* Sub-headline */}
                <p className="mt-5 text-[#D3AB80]/80 text-lg max-w-xl mx-auto font-medium">
                    The passionate engineers &amp; designers who built New Valley Hub.
                </p>
            </motion.div>

            {/* ── Ivory Cards Area ── */}
            <div className="bg-[#FFF4E2] py-14 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="flex flex-wrap justify-center gap-16"
                >
                    {teamMembers.map(member => (
                        <TeamCard key={member.id} member={member} />
                    ))}
                </motion.div>
            </div>

        </section>
    );
};

export default TeamSection;
