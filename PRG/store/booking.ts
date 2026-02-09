import { create } from 'zustand';
import { BookingState, TimeSlot, Service } from '@/lib/types/booking';
import { bookingService } from '@/lib/services/bookingService';
import { getServices } from '@/lib/cms';

interface BookingStore extends BookingState {
    // Actions
    initializeProtocol: () => Promise<void>;
    selectService: (service: Service) => void;
    selectSlot: (slot: TimeSlot) => void;
    confirmBooking: () => Promise<void>;
    reset: () => void;
    // Data
    availableSlots: TimeSlot[];
    loadSlots: () => Promise<void>;
    loadServices: () => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
    status: 'idle',
    selectedService: null,
    selectedSlot: null,
    error: null,
    availableSlots: [],
    services: [],

    loadServices: async () => {
        const services = await getServices();
        set({ services: services as Service[] });
    },

    loadSlots: async () => {
        const slots = await bookingService.getAvailableSlots();
        set({ availableSlots: slots });
    },

    initializeProtocol: async () => {
        set({ status: 'scanning' });
        await get().loadServices();
        setTimeout(() => {
            set({ status: 'service_selection' });
        }, 1500);
    },

    selectService: (service) => {
        set({ selectedService: service, status: 'scanning' });
        get().loadSlots().then(() => {
            setTimeout(() => {
                set({ status: 'slot_selection' });
            }, 1000);
        });
    },

    selectSlot: (slot) => {
        set({ selectedSlot: slot });
    },

    confirmBooking: async () => {
        const { selectedSlot, selectedService } = get();
        if (!selectedSlot) {
            set({ error: 'No slot selected.' });
            return;
        }

        set({ status: 'confirming' });

        try {
            // Updated to handle PRG Service object
            const booking = await bookingService.createBooking(
                selectedService?.slug || 'generic',
                selectedSlot
            );

            if (booking) {
                set({ status: 'confirmed', error: null });
            } else {
                set({ status: 'idle', error: 'Booking failed. Please try again.' });
            }
        } catch (err) {
            console.error('[BookingStore] Confirmation error:', err);
            set({ status: 'idle', error: 'Network error. Please try again.' });
        }
    },

    reset: () => {
        set({ status: 'idle', selectedService: null, selectedSlot: null, error: null, availableSlots: [] });
    },
}));

// Legacy export for backwards compatibility
export const getMockSlots = () => {
    const state = useBookingStore.getState();
    return state.availableSlots.length > 0 ? state.availableSlots : [
        { id: '1', startTime: new Date(Date.now() + 86400000).toISOString(), endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(), available: true },
        { id: '2', startTime: new Date(Date.now() + 172800000).toISOString(), endTime: new Date(Date.now() + 172800000 + 3600000).toISOString(), available: true },
        { id: '3', startTime: new Date(Date.now() + 259200000).toISOString(), endTime: new Date(Date.now() + 259200000 + 3600000).toISOString(), available: true },
    ];
};
