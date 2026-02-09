'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAIL_SERVICES = [
    {
        name: "Gel Manicure",
        description: "Signature gel application for a flawless, long-lasting finish.",
        price: "from ₦8,000",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Acrylic Sculpting",
        description: "Custom nail extensions sculpted to perfection.",
        price: "from ₦10,000",
        image: "https://images.unsplash.com/photo-1632922267756-9b712429a54f?q=80&w=800&auto=format&fit=crop"
    },
    {
        name: "Pedicure Spa",
        description: "Rejuvenating foot treatment with premium polish.",
        price: "from ₦12,000",
        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800&auto=format&fit=crop"
    }
];

export const NailsPreviewSection = () => {
    return (
        <section className="py-24 space-y-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Nail Artistry</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Where precision meets creativity. Explore our full range of nail services.
                </p>
            </div>

            <div className="space-y-32">
                {NAIL_SERVICES.map((service, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                    >
                        {/* Image Side */}
                        <div className="relative w-full md:w-1/2 max-w-md mx-auto group">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                            </div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                            <h3 className="text-3xl font-serif font-bold text-foreground">
                                {service.name}
                            </h3>
                            <p className="text-text-secondary text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                {service.description}
                            </p>
                            <div className="text-2xl font-light text-prg-secondary">
                                {service.price}
                            </div>
                            <button className="px-8 py-3 bg-[#2D0B5A] hover:bg-[#3D1B6A] text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-lg hover:shadow-prg-primary/20 hover:scale-105">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-24">
                <Link
                    href="/nails"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-prg-secondary/50 text-prg-secondary hover:bg-prg-secondary hover:text-white rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                >
                    View All Nail Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};
