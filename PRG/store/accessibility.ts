'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

interface AccessibilityState {
    theme: Theme;
    reducedMotion: boolean;
    highContrast: boolean;
    plainLanguage: boolean;
    toggleTheme: () => void;
    toggleReducedMotion: () => void;
    toggleHighContrast: () => void;
    togglePlainLanguage: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
    persist(
        (set) => ({
            theme: 'dark',
            reducedMotion: false,
            highContrast: false,
            plainLanguage: false,
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
            toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
            toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
            togglePlainLanguage: () => set((state) => ({ plainLanguage: !state.plainLanguage })),
        }),
        {
            name: 'prg-accessibility-settings',
        }
    )
);
