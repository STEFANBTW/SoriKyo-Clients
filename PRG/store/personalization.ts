import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ViewedItem {
    id: string;
    name: string;
    url: string;
    image?: string;
    timestamp: number;
}

interface PersonalizationState {
    name: string | null;
    visitCount: number;
    recentlyViewed: ViewedItem[];
    setName: (name: string) => void;
    incrementVisitCount: () => void;
    addToHistory: (item: Omit<ViewedItem, 'timestamp'>) => void;
}

export const usePersonalizationStore = create<PersonalizationState>()(
    persist(
        (set) => ({
            name: null,
            visitCount: 0,
            recentlyViewed: [],
            setName: (name) => set({ name }),
            incrementVisitCount: () => set((state) => ({ visitCount: state.visitCount + 1 })),
            addToHistory: (item) => set((state) => {
                // Remove existing if present to move to top
                const filtered = state.recentlyViewed.filter(i => i.id !== item.id);
                // Keep max 5 items
                return {
                    recentlyViewed: [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 5)
                };
            }),
        }),
        {
            name: 'prg-personalization',
        }
    )
);
