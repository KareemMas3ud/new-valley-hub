import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ open, onClose, onSuccess }) => {
    const { login, register } = useAuth();
    const [tab, setTab] = useState('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const reset = () => { setEmail(''); setPassword(''); setConfirm(''); setError(''); };
    const switchTab = (t) => { setTab(t); reset(); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (tab === 'register' && password !== confirm) { setError('Passwords do not match.'); return; }
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }

        setLoading(true);
        try {
            const authResult = tab === 'signin'
                ? await login(email, password)
                : await register(email, password);
            reset();
            onSuccess?.(authResult);
            onClose?.();
        } catch (err) {
            setError(
                err?.response?.data?.error ||
                err?.response?.data?.detail ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(71,40,37,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            <div
                className="relative w-full max-w-md rounded-3xl border border-white/30 shadow-2xl overflow-hidden"
                style={{ background: 'rgba(255,244,226,0.90)', backdropFilter: 'blur(20px)' }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-[#96786F] hover:text-[#472825] text-2xl leading-none transition-colors">✕</button>

                <div className="pt-8 pb-4 px-8 text-center">
                    <span className="text-4xl">🏺</span>
                    <h2 className="mt-2 text-2xl font-extrabold text-[#472825]">
                        {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm text-[#96786F] mt-1">
                        {tab === 'signin' ? 'Sign in to save your eco-trips' : 'Join the New Valley community'}
                    </p>
                </div>

                <div className="flex mx-8 mb-5 border border-[#D3AB80]/40 rounded-xl overflow-hidden">
                    {['signin', 'register'].map((t) => (
                        <button key={t} onClick={() => switchTab(t)}
                            className={`flex-1 py-2.5 text-sm font-bold transition-all duration-200 ${tab === t ? 'bg-[#D3AB80] text-[#472825]' : 'bg-transparent text-[#96786F] hover:bg-[#D3AB80]/20'}`}>
                            {t === 'signin' ? '🔑 Sign In' : '✨ Create Account'}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-[#472825] mb-1">Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-[#D3AB80]/50 bg-white/60 text-[#472825] placeholder-[#96786F]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AB80]" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#472825] mb-1">Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full px-4 py-3 rounded-xl border border-[#D3AB80]/50 bg-white/60 text-[#472825] placeholder-[#96786F]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AB80]" />
                    </div>
                    {tab === 'register' && (
                        <div>
                            <label className="block text-xs font-bold text-[#472825] mb-1">Confirm Password</label>
                            <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Repeat your password"
                                className="w-full px-4 py-3 rounded-xl border border-[#D3AB80]/50 bg-white/60 text-[#472825] placeholder-[#96786F]/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D3AB80]" />
                        </div>
                    )}
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">⚠️ {error}</div>}
                    <button type="submit" disabled={loading}
                        className="w-full bg-[#D3AB80] hover:bg-[#C49A6A] disabled:opacity-60 text-[#472825] font-extrabold py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] mt-2">
                        {loading ? '⏳ Please wait…' : tab === 'signin' ? '🔑 Sign In' : '✨ Create Account'}
                    </button>
                    <p className="text-center text-xs text-[#96786F] pt-1">
                        {tab === 'signin'
                            ? <><>No account? </><button type="button" onClick={() => switchTab('register')} className="text-[#D3AB80] font-bold hover:underline">Create one free</button></>
                            : <><>Already have an account? </><button type="button" onClick={() => switchTab('signin')} className="text-[#D3AB80] font-bold hover:underline">Sign in</button></>
                        }
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
