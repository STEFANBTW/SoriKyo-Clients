'use client';

import { useState, useEffect, useCallback } from 'react';
import { getRecentServices, trackServiceView, type RecentService } from '@/lib/lru-cache';
import { getAllItems } from '@/lib/indexeddb';

/**
 * Hook for User-Action Recency Tracking
 * Feature 10: Provides access to last 5 viewed services
 */

export function useRecentServices() {
    const [recentServices, setRecentServices] = useState<RecentService[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load from memory cache and IndexedDB on mount
    useEffect(() => {
        const loadRecent = async () => {
            try {
                // First get from memory cache
                const memoryRecent = getRecentServices();

                if (memoryRecent.length > 0) {
                    setRecentServices(memoryRecent);
                } else {
                    // Fall back to IndexedDB for persistence across sessions
                    const stored = await getAllItems('recentServices');
                    const sorted = stored
                        .sort((a, b) => b.viewedAt - a.viewedAt)
                        .slice(0, 5)
                        .map(item => ({
                            id: item.id,
                            name: item.name,
                            category: item.category,
                        }));
                    setRecentServices(sorted);
                }
            } catch (error) {
                console.error('Failed to load recent services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadRecent();
    }, []);

    // Track a new service view
    const trackView = useCallback((service: RecentService) => {
        trackServiceView(service);
        setRecentServices(getRecentServices());
    }, []);

    // Clear all recent services
    const clearRecent = useCallback(async () => {
        const { clearStore } = await import('@/lib/indexeddb');
        await clearStore('recentServices');
        setRecentServices([]);
    }, []);

    return {
        recentServices,
        isLoading,
        trackView,
        clearRecent,
        hasRecent: recentServices.length > 0,
    };
}

export default useRecentServices;
