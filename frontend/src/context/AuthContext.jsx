import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE = 'http://127.0.0.1:8000';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);   // { email, user_id }
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore session from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('nvh_access');
        const userData = localStorage.getItem('nvh_user');
        if (token && userData) {
            setAccessToken(token);
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const persist = useCallback((token, userData) => {
        localStorage.setItem('nvh_access', token);
        localStorage.setItem('nvh_user', JSON.stringify(userData));
        setAccessToken(token);
        setUser(userData);
    }, []);

    const login = useCallback(async (email, password) => {
        const res = await axios.post(`${BASE}/api/auth/token/`, { username: email, password });
        const { access, refresh } = res.data;
        localStorage.setItem('nvh_refresh', refresh);
        const payload = JSON.parse(atob(access.split('.')[1]));
        const userData = { email, user_id: payload.user_id };
        persist(access, userData);
        return { user: userData, accessToken: access };
    }, [persist]);

    const register = useCallback(async (email, password) => {
        const res = await axios.post(`${BASE}/api/auth/register/`, { email, password });
        const { access, refresh, email: returnedEmail, user_id } = res.data;
        localStorage.setItem('nvh_refresh', refresh);
        const userData = { email: returnedEmail, user_id };
        persist(access, userData);
        return { user: userData, accessToken: access };
    }, [persist]);

    const logout = useCallback(() => {
        localStorage.removeItem('nvh_access');
        localStorage.removeItem('nvh_refresh');
        localStorage.removeItem('nvh_user');
        setAccessToken(null);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
};

export default AuthContext;
