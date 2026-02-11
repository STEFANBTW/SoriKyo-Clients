'use client';

import React, { useEffect, useRef } from 'react';
import { useAccessibilityStore } from '@/store/accessibility';
import { useUIStore } from '@/store/ui';

export const SensoryDashboard = () => {
    const {
        theme, reducedMotion, highContrast, plainLanguage,
        toggleTheme, toggleReducedMotion, toggleHighContrast, togglePlainLanguage
    } = useAccessibilityStore();

    const { activeWidget, closeWidget } = useUIStore();
    const isOpen = activeWidget === 'sensory';
    const panelRef = useRef<HTMLDivElement>(null);

    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Handle Click Outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closeWidget();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeWidget]);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[100]" ref={panelRef}>
            {/* Main Toggle Button - Now toggled via Navbar, but keeping here if needed as standalone fallback or relying on external triggers. 
                Actually, requirements say "Neuro inclusivity button" in Navbar toggles it. 
                We might not need a floating button here anymore if it's in the navbar. 
                But let's keep the panel logic. The prompt didn't explicitly say remove the floating button, 
                but "Replace [Book Now] with... Neuro inclusivity button". 
                I will hide the floating trigger here if it's meant to be controlled by Navbar only, 
                OR keep it if they want both. 
                Given "Neuro inclusivity button (placed beside login icon)" in Nav, I'll assume the floating one can go or stay invisible until open.
                However, to be safe and clean, I will NOT render the floating button trigger here, 
                as the Navbar one is the primary control now. 
                Wait, if I remove the trigger, how do they close it ? 
                "Clicking anywhere outside the modal should close it."
            */}

            {/* Expansible Panel */}
            {/* Note: I'm keeping the panel div logic but adjusting visibility based on 'isOpen'. 
                I will remove the trigger button to avoid duplication with Navbar.
            */}

            <div className={`absolute bottom-full right-0 mb-6 w-72 glass-noir rounded-3xl p-6 shadow-2xl transition-all duration-500 ring-1 ring-prg-secondary/20 backdrop-blur-md ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
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
                            <span className="text-xs uppercase tracking-widest text-text-primary">Dark Mode</span>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className={`w-12 h-6 rounded-full transition-all duration-500 relative ring-1 ring-white/10 ${theme === 'dark' ? 'bg-prg-secondary shadow-[0_0_15px_rgba(157,45,125,0.4)]' : 'bg-white/5'}`}
                            role="switch"
                            aria-checked={theme === 'dark'}
                        >
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-500 ${theme === 'dark' ? 'left-7' : 'left-1'}`} />
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
