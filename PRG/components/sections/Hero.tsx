'use client';

import React from 'react';
import Link from 'next/link';

export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Decorative center glow - Purple */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-prg-primary/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-prg-secondary/8 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="z-10 max-w-4xl space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-foreground dark:text-white leading-[1.1] drop-shadow-sm">
                        Where Royalty<br />
                        <span className="italic gradient-text drop-shadow-[0_0_20px_rgba(157,45,125,0.3)]">Meets Radiance.</span>
                    </h1>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-prg-secondary/50 to-transparent"></div>
                </div>

                <p className="text-lg md:text-xl font-medium text-foreground/80 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Elite, gender-inclusive beauty and wellness services. Experience professional skill with a tranquil, royal atmosphere.
                </p>

                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="#booking-wizard-trigger"
                        className="btn-primary px-10 py-4 text-sm tracking-[0.2em] uppercase hover:scale-105 active:scale-95"
                    >
                        Book Your Experience
                    </Link>
                    <Link
                        href="/services"
                        className="text-text-secondary hover:text-prg-secondary text-sm tracking-widest uppercase transition-colors flex items-center gap-2 group"
                    >
                        Explore Services <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>

            {/* Floating indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
                <span className="text-[10px] tracking-[0.3em] uppercase text-text-tertiary">Discover More</span>
                <div className="w-px h-12 bg-gradient-to-b from-prg-secondary to-transparent"></div>
            </div>
        </section>
    );
};
