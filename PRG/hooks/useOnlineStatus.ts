'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for Network-Aware Dynamic UI Morphing
 * Feature 5: Monitors navigator.onLine status and triggers state changes
 */

interface OnlineStatus {
    isOnline: boolean;
    wasOffline: boolean; // True if connection was recently restored
    lastOnline: number | null;
    lastOffline: number | null;
}

export function useOnlineStatus(): OnlineStatus {
    const [status, setStatus] = useState<OnlineStatus>({
        isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
        wasOffline: false,
        lastOnline: null,
        lastOffline: null,
    });

    const handleOnline = useCallback(() => {
        setStatus(prev => ({
            isOnline: true,
            wasOffline: !prev.isOnline, // Was previously offline
            lastOnline: Date.now(),
            lastOffline: prev.lastOffline,
        }));

        // Clear wasOffline flag after 5 seconds
        setTimeout(() => {
            setStatus(prev => ({ ...prev, wasOffline: false }));
        }, 5000);
    }, []);

    const handleOffline = useCallback(() => {
        setStatus(prev => ({
            isOnline: false,
            wasOffline: false,
            lastOnline: prev.lastOnline,
            lastOffline: Date.now(),
        }));
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [handleOnline, handleOffline]);

    return status;
}

/**
 * Network-aware action handler
 * Executes online action if connected, otherwise falls back to offline action
 */
export function useNetworkAwareAction<T>(
    onlineAction: () => Promise<T> | T,
    offlineAction: () => void,
    deps: React.DependencyList = []
) {
    const { isOnline } = useOnlineStatus();

    const execute = useCallback(async () => {
        if (isOnline) {
            return onlineAction();
        } else {
            offlineAction();
            return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline, ...deps]);

    return { execute, isOnline };
}

export default useOnlineStatus;
