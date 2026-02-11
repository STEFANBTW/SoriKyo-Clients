/**
 * LRU Cache for User-Action Recency Tracking
 * Feature 10: Stores last 5 high-intent interactions
 */

export interface LRUItem<T> {
    key: string;
    data: T;
    timestamp: number;
}

export class LRUCache<T> {
    private capacity: number;
    private cache: Map<string, LRUItem<T>>;

    constructor(capacity: number = 5) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: string): T | undefined {
        const item = this.cache.get(key);
        if (!item) return undefined;

        // Move to end (most recent)
        this.cache.delete(key);
        this.cache.set(key, { ...item, timestamp: Date.now() });
        return item.data;
    }

    put(key: string, data: T): void {
        // If exists, delete first to update position
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // If at capacity, remove oldest (first item)
        if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey) this.cache.delete(firstKey);
        }

        // Add new item
        this.cache.set(key, { key, data, timestamp: Date.now() });
    }

    getAll(): LRUItem<T>[] {
        return Array.from(this.cache.values()).reverse(); // Most recent first
    }

    remove(key: string): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    size(): number {
        return this.cache.size;
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }
}

// Service-specific LRU for recently viewed services
export interface RecentService {
    id: string;
    name: string;
    category: string;
    price?: number;
    image?: string;
}

// Singleton instance for services
let recentServicesCache: LRUCache<RecentService> | null = null;

export function getRecentServicesCache(): LRUCache<RecentService> {
    if (!recentServicesCache) {
        recentServicesCache = new LRUCache<RecentService>(5);
    }
    return recentServicesCache;
}

export function trackServiceView(service: RecentService): void {
    const cache = getRecentServicesCache();
    cache.put(service.id, service);

    // Sync to IndexedDB for persistence across sessions
    if (typeof window !== 'undefined') {
        import('./indexeddb').then(({ setItem }) => {
            setItem('recentServices', {
                id: service.id,
                name: service.name,
                category: service.category,
                viewedAt: Date.now(),
            });
        });
    }
}

export function getRecentServices(): RecentService[] {
    const cache = getRecentServicesCache();
    return cache.getAll().map(item => item.data);
}

export default LRUCache;
