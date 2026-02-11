'use client';

import React from 'react';
import Link from 'next/link';

export const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* DESIGNER CONTROL: Decorative center glow - Emerald
               Change bg-brand-primary/10 (opacity) or w/h to change glow size. 
               Effect: Adds a soft, serene atmosphere behind main text. */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* DESIGNER CONTROL: Secondary Glow
               Adjust bg-brand-accent/5 (opacity) for intensity. */}
            <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Light/Dark mode background overlays */}
            <div className="absolute bottom-0 left-0 right-0 h-[100%] bg-white/75 dark:bg-background/30"></div>


            <div className="z-10 max-w-4xl space-y-8">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-elegant tracking-tight text-header leading-[1.1] drop-shadow-sm">
                        Where Royalty<br />
                        <span className="italic gradient-text drop-shadow-[0_0_20px_rgba(157,45,125,0.3)]">Meets Radiance.</span>
                    </h1>
                    {/* DESIGNER CONTROL: Content Separator Line
                       Adjust via-brand-accent/50 for line color intensity. */}
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>

                </div>

                <p className="text-lg md:text-xl font-medium text-muted-foreground max-w-2xl mx-auto leading-relaxed">
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
                        className="text-foreground hover:text-brand-primary text-sm tracking-widest uppercase transition-colors flex items-center gap-2 group"
                    >
                        Explore Services <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </div>

            </div>

            {/* Floating indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Discover More</span>
                {/* DESIGNER CONTROL: Scroll Indicator Line
                   Change h-12 to change length, from-brand-accent for color. */}
                <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
            </div>

            {/* Parallax Transition Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[20%] z-10 bg-gradient-to-t from-background to-transparent"></div>
        </section>
    );
};
