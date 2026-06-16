import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE } from '../services/api';
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
        : `${BASE}${member.final_photo}`;

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -15, boxShadow: '0 32px 60px var(--shadow-strong)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative flex flex-col items-center w-80 xl:w-96 rounded-3xl shadow-lg px-8 pt-12 pb-10 overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
            {/* ── Decorative top accent bar ── */}
            <div className="absolute top-0 inset-x-0 h-1 rounded-t-3xl" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-hover), var(--accent))' }} />

            {/* ── Avatar ── */}
            <div className="relative w-52 h-52 mb-7 rounded-full overflow-hidden shadow-xl" style={{ boxShadow: '0 8px 30px var(--shadow-strong)', outline: '4px solid var(--accent)' }}>
                <img
                    src={photoSrc}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=FDE4BC&color=472825&size=200'; }}
                />
            </div>

            {/* ── Name & role ── */}
            <h3 className="text-3xl font-extrabold text-center leading-tight mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {member.name}
            </h3>
            <p className="text-sm font-semibold text-center uppercase tracking-widest mb-8" style={{ color: 'var(--text-muted)' }}>
                {member.role}
            </p>

            {/* ── Thin divider ── */}
            <div className="w-16 h-0.5 rounded-full mb-8" style={{ backgroundColor: 'var(--accent)', opacity: 0.5 }} />

            {/* ── CTA button ── */}
            {linkProps && member.profile_url && (
                <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-2.5 text-sm font-bold tracking-wide rounded-full bg-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    style={{ color: 'var(--text-primary)', border: '2px solid var(--accent)' }}
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
        axios.get(`${BASE}/api/tourism/team/`)
            .then(r => setTeamMembers(r.data))
            .catch(e => console.error('Error fetching team:', e))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <section className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="flex justify-center gap-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-80 h-96 rounded-3xl animate-pulse" style={{ backgroundColor: 'var(--bg-secondary)', opacity: 0.6 }} />
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
                className="py-12 px-4 text-center"
                style={{ backgroundColor: '#3B1F1A' }}
            >
                <p className="text-xs font-bold tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                    SandScript Team
                </p>
                <h2 className="text-5xl md:text-6xl font-extrabold leading-tight" style={{ color: '#FEF7EC' }}>
                    Meet the Makers
                </h2>
                <div className="mx-auto mt-5 w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-hover))' }} />
                <p className="mt-5 text-lg max-w-xl mx-auto font-medium" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                    The passionate engineers &amp; designers who built New Valley Hub.
                </p>
            </motion.div>

            {/* ── Cards Area ── */}
            <div className="py-14 px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
