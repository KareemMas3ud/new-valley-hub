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
            style={{ backgroundColor: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
            <div
                className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-strong)', backdropFilter: 'blur(20px)' }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-2xl leading-none transition-colors" style={{ color: 'var(--text-muted)' }}>✕</button>

                <div className="pt-8 pb-4 px-8 text-center">
                    <span className="text-4xl">🏺</span>
                    <h2 className="mt-2 text-2xl font-extrabold" style={{ color: 'var(--text-primary)' }}>
                        {tab === 'signin' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                        {tab === 'signin' ? 'Sign in to save your eco-trips' : 'Join the New Valley community'}
                    </p>
                </div>

                <div className="flex mx-8 mb-5 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                    {['signin', 'register'].map((t) => (
                        <button key={t} onClick={() => switchTab(t)}
                            className="flex-1 py-2.5 text-sm font-bold transition-all duration-200"
                            style={tab === t
                                ? { backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }
                                : { backgroundColor: 'transparent', color: 'var(--text-muted)' }
                            }>
                            {t === 'signin' ? '🔑 Sign In' : '✨ Create Account'}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
                    <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Email</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', outlineColor: 'var(--accent)' }} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Password</label>
                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', outlineColor: 'var(--accent)' }} />
                    </div>
                    {tab === 'register' && (
                        <div>
                            <label className="block text-xs font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Confirm Password</label>
                            <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                                placeholder="Repeat your password"
                                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2"
                                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)', outlineColor: 'var(--accent)' }} />
                        </div>
                    )}
                    {error && <div className="text-xs rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(196, 87, 58, 0.1)', border: '1px solid var(--terracotta)', color: 'var(--terracotta)' }}>⚠️ {error}</div>}
                    <button type="submit" disabled={loading}
                        className="w-full disabled:opacity-60 font-extrabold py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] mt-2"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--text-primary)' }}>
                        {loading ? '⏳ Please wait…' : tab === 'signin' ? '🔑 Sign In' : '✨ Create Account'}
                    </button>
                    <p className="text-center text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
                        {tab === 'signin'
                            ? <>No account? <button type="button" onClick={() => switchTab('register')} className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>Create one free</button></>
                            : <>Already have an account? <button type="button" onClick={() => switchTab('signin')} className="font-bold hover:underline" style={{ color: 'var(--accent)' }}>Sign in</button></>
                        }
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
