'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Feature 5: Network-Aware Dynamic UI
 * Detects network status and connection quality
 * Enables graceful degradation for slow/offline connections
 */

export type NetworkStatus = 'online' | 'offline';
export type ConnectionQuality = 'fast' | 'slow' | 'unknown';

interface NetworkState {
    status: NetworkStatus;
    quality: ConnectionQuality;
    effectiveType?: string; // 4g, 3g, 2g, slow-2g
    downlink?: number; // Mbps
    rtt?: number; // Round-trip time in ms
    saveData?: boolean; // User has data saver enabled
}

interface NetworkConnection extends EventTarget {
    effectiveType?: '4g' | '3g' | '2g' | 'slow-2g';
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
    addEventListener(type: 'change', listener: () => void): void;
    removeEventListener(type: 'change', listener: () => void): void;
}

declare global {
    interface Navigator {
        connection?: NetworkConnection;
        mozConnection?: NetworkConnection;
        webkitConnection?: NetworkConnection;
    }
}

function getConnection(): NetworkConnection | undefined {
    if (typeof navigator === 'undefined') return undefined;
    return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
}

function determineQuality(connection?: NetworkConnection): ConnectionQuality {
    if (!connection) return 'unknown';

    const { effectiveType, rtt } = connection;

    // Fast: 4g or low RTT
    if (effectiveType === '4g' || (rtt && rtt < 100)) {
        return 'fast';
    }

    // Slow: 2g, slow-2g, or high RTT
    if (
        effectiveType === '2g' ||
        effectiveType === 'slow-2g' ||
        (rtt && rtt > 500)
    ) {
        return 'slow';
    }

    // 3g or unknown
    return effectiveType === '3g' ? 'slow' : 'unknown';
}

export function useNetworkStatus(): NetworkState {
    const [state, setState] = useState<NetworkState>(() => {
        const connection = getConnection();
        return {
            status: typeof navigator !== 'undefined' && navigator.onLine ? 'online' : 'offline',
            quality: determineQuality(connection),
            effectiveType: connection?.effectiveType,
            downlink: connection?.downlink,
            rtt: connection?.rtt,
            saveData: connection?.saveData,
        };
    });

    const updateNetworkInfo = useCallback(() => {
        const connection = getConnection();
        setState({
            status: navigator.onLine ? 'online' : 'offline',
            quality: determineQuality(connection),
            effectiveType: connection?.effectiveType,
            downlink: connection?.downlink,
            rtt: connection?.rtt,
            saveData: connection?.saveData,
        });
    }, []);

    useEffect(() => {
        // Online/offline events
        window.addEventListener('online', updateNetworkInfo);
        window.addEventListener('offline', updateNetworkInfo);

        // Connection change events
        const connection = getConnection();
        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
        }

        return () => {
            window.removeEventListener('online', updateNetworkInfo);
            window.removeEventListener('offline', updateNetworkInfo);
            if (connection) {
                connection.removeEventListener('change', updateNetworkInfo);
            }
        };
    }, [updateNetworkInfo]);

    return state;
}

/**
 * Hook for conditional rendering based on network
 */
export function useNetworkAwareValue<T>(options: {
    fast: T;
    slow: T;
    offline: T;
}): T {
    const { status, quality } = useNetworkStatus();

    if (status === 'offline') return options.offline;
    if (quality === 'slow') return options.slow;
    return options.fast;
}

/**
 * Returns true if the user is offline or on a slow connection
 */
export function useShouldReduceData(): boolean {
    const { status, quality, saveData } = useNetworkStatus();
    return status === 'offline' || quality === 'slow' || !!saveData;
}
