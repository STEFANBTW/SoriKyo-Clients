export type BookingStatus = 'idle' | 'scanning' | 'service_selection' | 'slot_selection' | 'confirming' | 'confirmed' | 'error';

export interface Service {
    id: string;
    slug: string;
    name: string;
    category: string;
    price_range: string;
    duration_minutes: number;
    is_bookable: boolean;
}

export interface TimeSlot {
    id: string;
    startTime: string; // ISO 8601
    endTime: string;   // ISO 8601
    available: boolean;
}

export interface BookingState {
    status: BookingStatus;
    selectedService: Service | null;
    selectedSlot: TimeSlot | null;
    error: string | null;
    services: Service[];
}
