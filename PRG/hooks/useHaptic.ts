'use client';

import { useCallback } from 'react';
import { useAccessibilityStore } from '@/store/accessibility';

type HapticPattern =
    | 'success'   // Heavy click
    | 'error'     // Double buzz
    | 'selection' // Micro-tick
    | 'notification';

const PATTERNS: Record<HapticPattern, number | number[]> = {
    success: 20,
    error: [50, 30, 50],
    selection: 5,
    notification: [10, 50, 10]
};

export const useHaptic = () => {
    const { reducedMotion } = useAccessibilityStore();

    const trigger = useCallback((type: HapticPattern = 'selection') => {
        // Accessibility check: Do not vibrate if reduced motion is requested
        if (reducedMotion) return;

        // Browser support check
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try {
                navigator.vibrate(PATTERNS[type]);
            } catch (e) {
                // Ignore errors on unsupported devices
            }
        }
    }, [reducedMotion]);

    return { trigger };
};
