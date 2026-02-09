'use client';

import React, { useEffect } from 'react';
import { useBookingStore } from '@/store/booking';
import { TimeSlot, Service } from '@/lib/types/booking';
import { useAccessibilityStore } from '@/store/accessibility';

// --- Sub-components ---

const IntentStep = ({ onInitialize, plainLanguage }: { onInitialize: () => void; plainLanguage: boolean }) => (
    <div className="text-center space-y-8">
        <h2 className="text-5xl font-serif tracking-tight sm:text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white via-prg-accent to-prg-secondary leading-tight">
            {plainLanguage ? 'Book Luxury' : <>PRG <br /> <span className="text-4xl sm:text-5xl md:text-6xl font-light italic">Salon & Spa</span></>}
        </h2>
        <p className="mx-auto max-w-[600px] text-prg-accent/80 md:text-xl font-light tracking-wide">
            {plainLanguage ? 'Choose a service and time to visit us.' : 'Exclusive beauty, rooted in serenity. Experience the Parisian lounge vibe in the heart of Jos.'}
        </p>
        <button
            onClick={onInitialize}
            className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-prg-primary px-12 font-bold text-white shadow-[0_0_30px_rgba(45,11,90,0.5)] transition-all hover:scale-105 active:scale-95 focus:outline-none"
        >
            <span className="relative z-10 uppercase tracking-[0.2em] text-sm">Sparkle Now</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
    </div>
);

const ScanningStep = () => (
    <div className="flex flex-col items-center justify-center space-y-6" role="status">
        <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-2 border-prg-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-2 border-t-prg-secondary rounded-full animate-spin"></div>
        </div>
        <p className="text-sm font-sans text-prg-accent tracking-[0.5em] animate-pulse uppercase">Refining Space...</p>
    </div>
);

const ServiceSelectionStep = ({ services, onSelect }: { services: Service[]; onSelect: (service: Service) => void }) => (
    <div className="w-full max-w-2xl space-y-8 p-4">
        <h3 className="text-3xl font-serif text-center mb-8 text-white tracking-tight">Select Your Protocol</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
                <button
                    key={service.id}
                    onClick={() => onSelect(service)}
                    className="flex flex-col text-left p-6 soft-glass-emerald rounded-2xl hover:border-emerald/50 transition-all group relative overflow-hidden ring-1 ring-white/5"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] uppercase font-sans tracking-widest text-prg-secondary">{service.category}</span>
                    </div>
                    <span className="text-xl font-serif text-white group-hover:text-prg-secondary transition-colors">{service.name}</span>
                    <span className="text-xs text-prg-accent/60 mt-1 uppercase tracking-tighter">{service.duration_minutes} Minutes of Excellence</span>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm font-sans font-bold text-prg-accent">{service.price_range}</span>
                        <div className="w-8 h-[1px] bg-prg-accent/20 group-hover:w-full transition-all duration-500"></div>
                    </div>
                </button>
            ))}
        </div>
    </div>
);

const SlotStep = ({ slots, onSelect }: { slots: TimeSlot[]; onSelect: (slot: TimeSlot) => void }) => (
    <div className="w-full max-w-md space-y-8" role="group" aria-labelledby="slot-selection-heading">
        <h3 id="slot-selection-heading" className="text-3xl font-serif text-center mb-8 text-white tracking-tight">Available Windows</h3>
        <div className="grid gap-4" role="list">
            {slots.map((slot) => (
                <button
                    key={slot.id}
                    onClick={() => onSelect(slot)}
                    role="listitem"
                    className="flex items-center justify-between w-full p-5 soft-glass-emerald rounded-xl hover:border-emerald transition-all group ring-1 ring-white/5"
                >
                    <span className="text-xs uppercase tracking-[0.2em] text-prg-accent/60 group-hover:text-prg-secondary font-sans">
                        {new Date(slot.startTime).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-lg font-serif text-white">
                        {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </button>
            ))}
        </div>
    </div>
);

const ConfirmingStep = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>
        <p className="text-xl font-mono text-purple-400">SECURING SLOT...</p>
    </div>
);

const ConfirmedStep = ({ onReset, plainLanguage }: { onReset: () => void; plainLanguage: boolean }) => {
    useEffect(() => {
        if ('vibrate' in navigator) {
            navigator.vibrate([10, 50, 10]);
        }
    }, []);

    return (
        <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full soft-glass-emerald border border-emerald/30 shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-4">
                <svg className="w-12 h-12 text-prg-secondary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-4xl font-serif text-white tracking-tight">
                {plainLanguage ? 'Confirmed.' : 'Reservation Secured.'}
            </h2>
            <p className="text-prg-accent/60 font-light max-w-xs mx-auto">
                {plainLanguage ? 'Your visit is scheduled.' : 'Welcome to the inner circle. Your placement is official.'}
            </p>
            <button onClick={onReset} className="text-[10px] uppercase tracking-[0.3em] text-prg-accent/40 hover:text-white transition-colors duration-500">
                Reset Protocol
            </button>
        </div>
    );
};

// --- Main Wizard Component ---

export const BookingWizard = () => {
    const { status, services, initializeProtocol, selectService, selectSlot, confirmBooking, reset, availableSlots } = useBookingStore();
    const plainLanguage = useAccessibilityStore((state) => state.plainLanguage);

    const handleSlotSelect = (slot: TimeSlot) => {
        selectSlot(slot);
        confirmBooking();
    };

    return (
        <div className="w-full min-h-[500px] flex items-center justify-center p-12 soft-glass rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {status === 'idle' && <IntentStep onInitialize={initializeProtocol} plainLanguage={plainLanguage} />}
            {status === 'scanning' && <ScanningStep />}
            {status === 'service_selection' && <ServiceSelectionStep services={services} onSelect={selectService} />}
            {status === 'slot_selection' && <SlotStep slots={availableSlots} onSelect={handleSlotSelect} />}
            {status === 'confirming' && <ConfirmingStep />}
            {status === 'confirmed' && <ConfirmedStep onReset={reset} plainLanguage={plainLanguage} />}
        </div>
    );
};
