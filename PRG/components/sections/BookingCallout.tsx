'use client';

import React from 'react';

export const BookingCallout = () => {
    return (
        <section className="w-full py-48 px-6 text-center relative overflow-hidden">
            {/* Background visual element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-gradient-to-b from-transparent via-emerald/5 to-transparent pointer-events-none"></div>

            <div className="max-w-2xl mx-auto space-y-12 relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight">
                    Ready to <br />
                    <span className="text-emerald">Rewrite Your Rhythm?</span>
                </h2>

                <p className="text-foreground/50 font-light leading-relaxed">
                    Our Agentic Host is ready to curate your bespoke protocol. Real-time availability, zero-friction initialization.
                </p>

                <div className="flex flex-col items-center gap-8">
                    <button
                        onClick={() => {
                            const wizard = document.getElementById('booking-wizard-trigger');
                            if (wizard) wizard.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-emerald hover:bg-emerald-600 text-slate-900 px-12 py-5 rounded-full text-sm font-bold tracking-[0.2em] uppercase transition-all shadow-[0_15px_45px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Initialize Protocol
                    </button>

                    <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] font-bold uppercase opacity-30">
                        <span className="w-2 h-2 rounded-full bg-emerald animate-pulse"></span>
                        Host Active &amp; Online
                    </div>
                </div>
            </div>
        </section>
    );
};
