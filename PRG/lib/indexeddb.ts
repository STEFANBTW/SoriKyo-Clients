/**
 * IndexedDB Utility for PRG
 * Provides persistent client-side storage for favorites, drafts, and user preferences
 * Feature 3: IndexedDB Persistent Storage
 */

const DB_NAME = 'prg-storage';
const DB_VERSION = 1;

interface DBSchema {
    favorites: {
        id: string;
        type: 'service' | 'stylist';
        data: Record<string, unknown>;
        addedAt: number;
    };
    bookingDrafts: {
        id: string;
        data: Record<string, unknown>;
        updatedAt: number;
    };
    recentServices: {
        id: string;
        name: string;
        category: string;
        viewedAt: number;
    };
}

type StoreName = keyof DBSchema;

let dbInstance: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
    if (dbInstance) return Promise.resolve(dbInstance);

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            dbInstance = request.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Favorites store
            if (!db.objectStoreNames.contains('favorites')) {
                const favStore = db.createObjectStore('favorites', { keyPath: 'id' });
                favStore.createIndex('type', 'type', { unique: false });
                favStore.createIndex('addedAt', 'addedAt', { unique: false });
            }

            // Booking drafts store
            if (!db.objectStoreNames.contains('bookingDrafts')) {
                db.createObjectStore('bookingDrafts', { keyPath: 'id' });
            }

            // Recent services store (for LRU tracking)
            if (!db.objectStoreNames.contains('recentServices')) {
                const recentStore = db.createObjectStore('recentServices', { keyPath: 'id' });
                recentStore.createIndex('viewedAt', 'viewedAt', { unique: false });
            }
        };
    });
}

export async function getItem<T extends StoreName>(
    storeName: T,
    id: string
): Promise<DBSchema[T] | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(id);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function setItem<T extends StoreName>(
    storeName: T,
    item: DBSchema[T]
): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.put(item);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function deleteItem<T extends StoreName>(
    storeName: T,
    id: string
): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.delete(id);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

export async function getAllItems<T extends StoreName>(
    storeName: T
): Promise<DBSchema[T][]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

export async function clearStore<T extends StoreName>(storeName: T): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.clear();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
}

// Favorites helpers
export async function addFavorite(
    id: string,
    type: 'service' | 'stylist',
    data: Record<string, unknown>
): Promise<void> {
    await setItem('favorites', { id, type, data, addedAt: Date.now() });
}

export async function removeFavorite(id: string): Promise<void> {
    await deleteItem('favorites', id);
}

export async function getFavorites(type?: 'service' | 'stylist') {
    const all = await getAllItems('favorites');
    if (!type) return all;
    return all.filter(f => f.type === type);
}

export async function isFavorite(id: string): Promise<boolean> {
    const item = await getItem('favorites', id);
    return !!item;
}

// Booking draft helpers
export async function saveBookingDraft(id: string, data: Record<string, unknown>): Promise<void> {
    await setItem('bookingDrafts', { id, data, updatedAt: Date.now() });
}

export async function getBookingDraft(id: string) {
    return getItem('bookingDrafts', id);
}

export async function clearBookingDraft(id: string): Promise<void> {
    await deleteItem('bookingDrafts', id);
}

export default {
    getItem,
    setItem,
    deleteItem,
    getAllItems,
    clearStore,
    addFavorite,
    removeFavorite,
    getFavorites,
    isFavorite,
    saveBookingDraft,
    getBookingDraft,
    clearBookingDraft,
};
