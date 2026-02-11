'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * Feature 3: IndexedDB Persistent Storage
 * Stores favorites, cart, and preferences locally for offline access
 */

const DB_NAME = 'prg-salon-db';
const DB_VERSION = 1;

interface StoreConfig {
    name: string;
    keyPath: string;
    indexes?: { name: string; keyPath: string; unique: boolean }[];
}

const STORES: StoreConfig[] = [
    {
        name: 'favorites',
        keyPath: 'id',
        indexes: [{ name: 'by_type', keyPath: 'type', unique: false }],
    },
    {
        name: 'cart',
        keyPath: 'id',
    },
    {
        name: 'preferences',
        keyPath: 'key',
    },
    {
        name: 'recency',
        keyPath: 'id',
        indexes: [{ name: 'by_timestamp', keyPath: 'timestamp', unique: false }],
    },
];

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            STORES.forEach((store) => {
                if (!db.objectStoreNames.contains(store.name)) {
                    const objectStore = db.createObjectStore(store.name, {
                        keyPath: store.keyPath,
                    });

                    store.indexes?.forEach((idx) => {
                        objectStore.createIndex(idx.name, idx.keyPath, {
                            unique: idx.unique,
                        });
                    });
                }
            });
        };
    });
}

// Generic IndexedDB operations
export async function dbGet<T>(storeName: string, key: string): Promise<T | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as T);
    });
}

export async function dbGetAll<T>(storeName: string): Promise<T[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result as T[]);
    });
}

export async function dbPut<T>(storeName: string, value: T): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(value);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function dbDelete(storeName: string, key: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function dbClear(storeName: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

// Favorites-specific interface
export interface FavoriteItem {
    id: string;
    type: 'service' | 'stylist';
    name: string;
    imageUrl?: string;
    addedAt: number;
}

// Hook for favorites management
export function useFavorites() {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadFavorites = useCallback(async () => {
        try {
            const items = await dbGetAll<FavoriteItem>('favorites');
            setFavorites(items);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'addedAt'>) => {
        const favorite: FavoriteItem = { ...item, addedAt: Date.now() };
        await dbPut('favorites', favorite);
        setFavorites((prev) => [...prev, favorite]);
    }, []);

    const removeFavorite = useCallback(async (id: string) => {
        await dbDelete('favorites', id);
        setFavorites((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const isFavorite = useCallback(
        (id: string) => favorites.some((f) => f.id === id),
        [favorites]
    );

    return {
        favorites,
        isLoading,
        addFavorite,
        removeFavorite,
        isFavorite,
        reload: loadFavorites,
    };
}

// Cart-specific interface
export interface CartItem {
    id: string;
    serviceId: string;
    name: string;
    price: number;
    stylistId?: string;
    date?: string;
    time?: string;
}

// Hook for cart management
export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadCart = useCallback(async () => {
        try {
            const items = await dbGetAll<CartItem>('cart');
            setCart(items);
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    const addToCart = useCallback(async (item: CartItem) => {
        await dbPut('cart', item);
        setCart((prev) => {
            const existing = prev.findIndex((c) => c.id === item.id);
            if (existing >= 0) {
                const updated = [...prev];
                updated[existing] = item;
                return updated;
            }
            return [...prev, item];
        });
    }, []);

    const removeFromCart = useCallback(async (id: string) => {
        await dbDelete('cart', id);
        setCart((prev) => prev.filter((c) => c.id !== id));
    }, []);

    const clearCart = useCallback(async () => {
        await dbClear('cart');
        setCart([]);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return {
        cart,
        isLoading,
        addToCart,
        removeFromCart,
        clearCart,
        total,
        itemCount: cart.length,
    };
}
