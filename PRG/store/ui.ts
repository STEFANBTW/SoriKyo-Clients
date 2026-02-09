import { create } from 'zustand';

type ActiveWidget = 'none' | 'gemini' | 'whatsapp' | 'sensory';

interface UIState {
    activeWidget: ActiveWidget;
    openWidget: (widget: ActiveWidget) => void;
    closeWidget: () => void;
    toggleWidget: (widget: ActiveWidget) => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeWidget: 'none',
    openWidget: (widget) => set({ activeWidget: widget }),
    closeWidget: () => set({ activeWidget: 'none' }),
    toggleWidget: (widget) => set((state) => ({
        activeWidget: state.activeWidget === widget ? 'none' : widget
    })),
}));
