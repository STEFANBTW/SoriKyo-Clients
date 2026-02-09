'use client';

import React from 'react';
import Link from 'next/link';

export const ServicesHero = () => {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-prg-primary/20 z-0"></div>
            <div
                className="absolute inset-0 bg-cover bg-center z-[-1]"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1920')",
                    backgroundAttachment: "fixed"
                }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-0"></div>

            <div className="relative z-10 container mx-auto px-4 py-16 text-center">
                <div className="max-w-4xl mx-auto animate-fade-in">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 drop-shadow-lg">
                        Our Signature Services
                    </h1>
                    <p className="font-sans text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        Discover comprehensive beauty services designed to bring out your best self. From precision cuts to artistic transformations, we offer excellence in every detail.
                    </p>

                    {/* Quick Links */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {[
                            { label: 'Hair', href: '#hair' },
                            { label: 'Aesthetics', href: '#aesthetics' },
                            { label: 'Nails', href: '#nails' },
                            { label: 'Spa', href: '#spa' },
                            { label: 'Academy', href: '#academy' },
                        ].map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="glass-noir px-8 py-4 rounded-full text-foreground font-sans font-bold tracking-widest uppercase text-sm hover:bg-prg-secondary hover:text-white transition-all duration-300 hover:scale-105 border border-white/10"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
