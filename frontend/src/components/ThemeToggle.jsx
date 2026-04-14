import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.remove('light');
        } else {
            root.classList.add('light');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(prev => !prev)}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
                position: 'fixed',
                top: '1.25rem',
                right: '1.25rem',
                zIndex: 1000,
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                backdropFilter: 'var(--backdrop)',
                WebkitBackdropFilter: 'var(--backdrop)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow)',
                transition: 'var(--theme-transition), transform 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}
