'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';

/**
 * Accessibility State Store
 * Features 12, 13, 24: High Contrast, Reduced Motion, Cognitive Ease
 */
interface AccessibilityState {
    theme: Theme;
    reducedMotion: boolean;
    highContrast: boolean;
    plainLanguage: boolean;
    // Feature 24: Cognitive Ease Design settings
    cognitiveEase: {
        largerText: boolean;      // Increase base font size
        simplifiedNav: boolean;   // Show fewer nav items
        reducedChoices: boolean;  // Limit options per screen
        focusMode: boolean;       // Dim non-essential elements
    };
    toggleTheme: () => void;
    toggleReducedMotion: () => void;
    toggleHighContrast: () => void;
    togglePlainLanguage: () => void;
    toggleCognitiveEase: (key: keyof AccessibilityState['cognitiveEase']) => void;
    enableFullCognitiveEase: () => void;
    disableFullCognitiveEase: () => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
    persist(
        (set) => ({
            theme: 'light',
            reducedMotion: false,
            highContrast: false,
            plainLanguage: false,
            cognitiveEase: {
                largerText: false,
                simplifiedNav: false,
                reducedChoices: false,
                focusMode: false,
            },
            toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
            toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
            toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),
            togglePlainLanguage: () => set((state) => ({ plainLanguage: !state.plainLanguage })),
            toggleCognitiveEase: (key) => set((state) => ({
                cognitiveEase: {
                    ...state.cognitiveEase,
                    [key]: !state.cognitiveEase[key],
                },
            })),
            enableFullCognitiveEase: () => set({
                plainLanguage: true,
                reducedMotion: true,
                cognitiveEase: {
                    largerText: true,
                    simplifiedNav: true,
                    reducedChoices: true,
                    focusMode: true,
                },
            }),
            disableFullCognitiveEase: () => set({
                plainLanguage: false,
                cognitiveEase: {
                    largerText: false,
                    simplifiedNav: false,
                    reducedChoices: false,
                    focusMode: false,
                },
            }),
        }),
        {
            name: 'prg-accessibility-settings',
        }
    )
);
