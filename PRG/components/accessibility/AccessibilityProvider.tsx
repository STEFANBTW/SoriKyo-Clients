'use client';

import React, { useEffect, useState } from 'react';
import { useAccessibilityStore } from '@/store/accessibility';

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
    const { theme, reducedMotion, highContrast } = useAccessibilityStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        // Theme classes
        if (theme === 'light') {
            root.classList.add('light-mode');
            root.classList.remove('dark');
            root.classList.remove('dark-mode');
        } else {
            root.classList.add('dark');
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
        }

        // Accessibility classes
        if (reducedMotion) {
            root.classList.add('reduced-motion');
        } else {
            root.classList.remove('reduced-motion');
        }

        if (highContrast) {
            root.classList.add('high-contrast');
        } else {
            root.classList.remove('high-contrast');
        }

        if (useAccessibilityStore.getState().plainLanguage) {
            root.classList.add('cognitive-ease');
        } else {
            root.classList.remove('cognitive-ease');
        }

        // Subscribe to changes since plainLanguage wasn't in the dependency array initially or we want direct access
        const unsubscribe = useAccessibilityStore.subscribe((state) => {
            if (state.plainLanguage) {
                root.classList.add('cognitive-ease');
            } else {
                root.classList.remove('cognitive-ease');
            }
        });

        return () => unsubscribe();

    }, [theme, reducedMotion, highContrast]); // kept dep array simple as we subscribe explicitly for the new one or can add it

    if (!mounted) {
        return <div className="contents">{children}</div>;
    }

    return (
        <div className={`contents ${reducedMotion ? 'reduced-motion' : ''} ${highContrast ? 'high-contrast' : ''}`}>
            {children}
        </div>
    );
};
