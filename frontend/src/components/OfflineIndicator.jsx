import React, { useState, useEffect } from 'react';

const OfflineIndicator = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[100] px-4 py-3 shadow-md animate-slide-up"
            style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '4px solid var(--warning)', color: 'var(--text-primary)' }}
        >
            <div className="flex items-center justify-center">
                <div className="py-1">
                    <svg className="fill-current h-6 w-6 mr-4" style={{ color: 'var(--warning)' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                </div>
                <div>
                    <p className="font-bold">📡 You are offline. Browsing in Oasis Mode.</p>
                </div>
            </div>
        </div>
    );
};

export default OfflineIndicator;
