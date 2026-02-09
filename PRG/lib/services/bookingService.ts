import { supabase } from '@/lib/supabase';
import { TimeSlot } from '@/lib/types/booking';

export interface Booking {
    id: string;
    user_id: string;
    service_id: string | null;
    slot_start: string;
    slot_end: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    created_at: string;
}

export const bookingService = {
    /**
     * Fetch available slots from the database (or generate mock if no real data).
     */
    async getAvailableSlots(): Promise<TimeSlot[]> {
        // For now, return mock slots. When backend is ready, query from DB.
        const slots: TimeSlot[] = [
            { id: '1', startTime: new Date(Date.now() + 86400000).toISOString(), endTime: new Date(Date.now() + 86400000 + 3600000).toISOString(), available: true },
            { id: '2', startTime: new Date(Date.now() + 172800000).toISOString(), endTime: new Date(Date.now() + 172800000 + 3600000).toISOString(), available: true },
            { id: '3', startTime: new Date(Date.now() + 259200000).toISOString(), endTime: new Date(Date.now() + 259200000 + 3600000).toISOString(), available: true },
        ];
        return slots;
    },

    /**
     * Create a new booking in the database.
     */
    async createBooking(serviceId: string | null, slot: TimeSlot): Promise<Booking | null> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            console.warn('[BookingService] No authenticated user. Using mock flow.');
            // Return a mock booking for unauthenticated users
            return {
                id: 'mock-' + Date.now(),
                user_id: 'anonymous',
                service_id: serviceId,
                slot_start: slot.startTime,
                slot_end: slot.endTime,
                status: 'confirmed',
                created_at: new Date().toISOString(),
            };
        }

        const { data, error } = await supabase
            .from('bookings')
            .insert({
                user_id: user.id,
                service_slug: serviceId, // Use the slug passed in
                slot_start: slot.startTime,
                slot_end: slot.endTime,
                status: 'confirmed',
            })
            .select()
            .single();

        if (error) {
            console.error('[BookingService] Error creating booking:', error);
            return null;
        }

        return data as Booking;
    },

    /**
     * Get user's bookings.
     */
    async getUserBookings(): Promise<Booking[]> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return [];
        }

        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', user.id)
            .order('slot_start', { ascending: true });

        if (error) {
            console.error('[BookingService] Error fetching bookings:', error);
            return [];
        }

        return data as Booking[];
    },
};
