'use client';

import { useState, useCallback, useEffect } from 'react';
import { dbPut, dbGetAll, dbDelete } from './useIndexedDB';

/**
 * Feature 10: LRU Recency Tracking
 * Tracks user actions with timestamp for personalization
 * Uses LRU (Least Recently Used) eviction when capacity is exceeded
 */

const MAX_RECENCY_ITEMS = 50; // Maximum items to track

export interface RecencyItem {
    id: string;
    type: 'service_view' | 'stylist_view' | 'search' | 'booking_start' | 'category_view';
    value: string; // service id, search query, etc.
    metadata?: Record<string, unknown>;
    timestamp: number;
}

export function useLRURecency() {
    const [recency, setRecency] = useState<RecencyItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadRecency = useCallback(async () => {
        try {
            const items = await dbGetAll<RecencyItem>('recency');
            // Sort by timestamp descending (most recent first)
            const sorted = items.sort((a, b) => b.timestamp - a.timestamp);
            setRecency(sorted);
        } catch (error) {
            console.error('Error loading recency:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadRecency();
    }, [loadRecency]);

    /**
     * Track a user action
     * If action already exists, update timestamp (move to front)
     * If at capacity, remove oldest item
     */
    const track = useCallback(
        async (
            type: RecencyItem['type'],
            value: string,
            metadata?: Record<string, unknown>
        ) => {
            const id = `${type}:${value}`;
            const newItem: RecencyItem = {
                id,
                type,
                value,
                metadata,
                timestamp: Date.now(),
            };

            setRecency((prev) => {
                // Remove existing entry if present
                let updated = prev.filter((item) => item.id !== id);

                // Add new item at the front
                updated = [newItem, ...updated];

                // Evict oldest if over capacity
                if (updated.length > MAX_RECENCY_ITEMS) {
                    const evicted = updated.pop();
                    if (evicted) {
                        // Async delete from IndexedDB
                        dbDelete('recency', evicted.id).catch(console.error);
                    }
                }

                return updated;
            });

            // Persist to IndexedDB
            await dbPut('recency', newItem);
        },
        []
    );

    /**
     * Get recent items of a specific type
     */
    const getRecentByType = useCallback(
        (type: RecencyItem['type'], limit = 10): RecencyItem[] => {
            return recency.filter((item) => item.type === type).slice(0, limit);
        },
        [recency]
    );

    /**
     * Get the most recently viewed services
     */
    const getRecentServices = useCallback(
        (limit = 5): string[] => {
            return getRecentByType('service_view', limit).map((item) => item.value);
        },
        [getRecentByType]
    );

    /**
     * Get recent search queries
     */
    const getRecentSearches = useCallback(
        (limit = 10): string[] => {
            return getRecentByType('search', limit).map((item) => item.value);
        },
        [getRecentByType]
    );

    /**
     * Check if a service was recently viewed
     */
    const wasRecentlyViewed = useCallback(
        (serviceId: string): boolean => {
            return recency.some(
                (item) => item.type === 'service_view' && item.value === serviceId
            );
        },
        [recency]
    );

    /**
     * Clear all recency data
     */
    const clearRecency = useCallback(async () => {
        try {
            const items = await dbGetAll<RecencyItem>('recency');
            await Promise.all(items.map((item) => dbDelete('recency', item.id)));
            setRecency([]);
        } catch (error) {
            console.error('Error clearing recency:', error);
        }
    }, []);

    return {
        recency,
        isLoading,
        track,
        getRecentByType,
        getRecentServices,
        getRecentSearches,
        wasRecentlyViewed,
        clearRecency,
    };
}

/**
 * Simple hook for tracking service views
 * Use this in service detail pages
 */
export function useTrackServiceView(serviceId: string, serviceName?: string) {
    const { track } = useLRURecency();

    useEffect(() => {
        if (serviceId) {
            track('service_view', serviceId, { name: serviceName });
        }
    }, [serviceId, serviceName, track]);
}
