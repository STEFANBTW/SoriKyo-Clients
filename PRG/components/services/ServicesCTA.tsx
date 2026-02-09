'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const ServicesCTA = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-prg-primary text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="cta-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#cta-pattern)" />
                </svg>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                    Ready to Experience Excellence?
                </h2>
                <p className="font-sans text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Book your appointment today and discover why Purple Rain Galore is the premier destination for beauty services. Your transformation awaits.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        href="#booking-wizard-trigger"
                        className="bg-prg-accent text-prg-primary font-bold px-8 py-4 rounded-full hover:bg-white transition-colors duration-300 shadow-lg text-lg uppercase tracking-widest"
                    >
                        Book Your Service Now
                    </Link>
                    <a
                        href="tel:+2348000000000"
                        className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-prg-primary transition-colors duration-300 text-lg uppercase tracking-widest"
                    >
                        Call Us: (555) 123-4567
                    </a>
                </div>

                {/* Availability Indicator */}
                <div className="mt-16 max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <p className="font-sans font-bold text-white uppercase tracking-wider text-sm">Available Today</p>
                    </div>
                    <p className="font-sans text-white/80 text-sm">
                        Next available appointment: Today at 2:30 PM
                    </p>
                </div>
            </div>
        </section>
    );
};
