'use client';

import React from 'react';
import { useAccessibilityStore } from '@/store/accessibility';

export const SensoryDashboard = () => {
    const {
        theme, reducedMotion, highContrast, plainLanguage,
        toggleTheme, toggleReducedMotion, toggleHighContrast, togglePlainLanguage
    } = useAccessibilityStore();

    const [mounted, setMounted] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Theme Toggle Button - Always Visible */}

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-prg-primary text-white shadow-[0_0_20px_rgba(45,11,90,0.4)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/10"
                aria-label="Open Sensory Dashboard"
            >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            </button>

            {/* Expansible Panel */}
            <div className={`absolute bottom-full right-0 mb-6 w-72 glass-noir rounded-3xl p-6 shadow-2xl transition-all duration-500 ring-1 ring-prg-secondary/20 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <h4 className="text-[10px] font-sans font-bold text-prg-secondary uppercase tracking-[0.3em] mb-6">Sensory Architecture</h4>

                <div className="space-y-5">
                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {theme === 'dark' ? (
                                <svg className="w-4 h-4 text-prg-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                            <span className="text-xs uppercase tracking-widest text-text-primary">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`w-12 h-6 rounded-full transition-all duration-500 relative ring-1 ring-white/10 ${theme === 'light' ? 'bg-prg-secondary shadow-[0_0_15px_rgba(157,45,125,0.4)]' : 'bg-white/5'}`}
                            role="switch"
                            aria-checked={theme === 'light'}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-500 ${theme === 'light' ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    <div className="h-px bg-border-light" />

                    {/* Reduced Motion */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-text-primary">Reduced Motion</span>
                        <button
                            onClick={toggleReducedMotion}
                            className={`w-12 h-6 rounded-full transition-all duration-500 relative ring-1 ring-white/10 ${reducedMotion ? 'bg-prg-secondary shadow-[0_0_15px_rgba(157,45,125,0.4)]' : 'bg-white/5'}`}
                            role="switch"
                            aria-checked={reducedMotion}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-500 ${reducedMotion ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-text-primary">High Contrast</span>
                        <button
                            onClick={toggleHighContrast}
                            className={`w-12 h-6 rounded-full transition-all duration-500 relative ring-1 ring-white/10 ${highContrast ? 'bg-prg-secondary shadow-[0_0_15px_rgba(157,45,125,0.4)]' : 'bg-white/5'}`}
                            role="switch"
                            aria-checked={highContrast}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-500 ${highContrast ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>

                    {/* Plain Language */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-text-primary">Plain Language</span>
                        <button
                            onClick={togglePlainLanguage}
                            className={`w-12 h-6 rounded-full transition-all duration-500 relative ring-1 ring-white/10 ${plainLanguage ? 'bg-prg-secondary shadow-[0_0_15px_rgba(157,45,125,0.4)]' : 'bg-white/5'}`}
                            role="switch"
                            aria-checked={plainLanguage}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-500 ${plainLanguage ? 'left-7' : 'left-1'}`} />
                        </button>
                    </div>
                </div>

                <p className="mt-5 text-[10px] text-text-tertiary leading-tight">
                    Settings are persisted automatically.
                </p>
            </div>
        </div>
    );
};
