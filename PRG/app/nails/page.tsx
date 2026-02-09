'use client';

import React from 'react';
import { Footer } from "@/components/layout/Footer";
import Image from 'next/image';

const NAIL_SERVICES = [
    {
        title: "Signature Gel Manicure",
        subtitle: "DURABLE FINISH",
        description: "Signature Gel Manicure offers shaping and gel application. Ideal for short to medium-length nails.",
        duration: "1h 30min",
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
        icon: "💅" // Placeholder for icon
    },
    {
        title: "Builder/Hard Gel Manicure",
        subtitle: "CHIP-RESISTANT DURABILITY",
        description: "Includes shaping and hard gel application that is resistant to chipping and breaking for up to 4 weeks. Perfect for long nails.",
        duration: "1h 40min",
        label: "Maintenance", // "Duration" vs "Maintenance"
        image: "https://images.unsplash.com/photo-1632922267756-9b712429a54f?q=80&w=800&auto=format&fit=crop",
        icon: "🛡️"
    },
    {
        title: "Pedicure Gel",
        subtitle: "DURABLE FINISH",
        description: "Signature Gel Pedicure offers shaping and gel application. Ideal for toes that need long-lasting color.",
        duration: "1h 00min",
        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?q=80&w=800&auto=format&fit=crop",
        icon: "🦶"
    }
];

export default function NailsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Spacer for fixed Navbar */}
            <div className="h-32"></div>

            <main className="container mx-auto px-6 pb-24">
                <header className="text-center mb-24">
                    <span className="text-prg-secondary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Touch of Elegance
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground">
                        Nail Artistry
                    </h1>
                </header>

                <div className="space-y-32">
                    {NAIL_SERVICES.map((service, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image Side */}
                            <div className="relative w-full md:w-1/2 max-w-md mx-auto">
                                <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 group">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Glass Overlay/Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                                </div>

                                {/* Floating Duration Badge */}
                                <div className={`absolute top-12 ${index % 2 === 1 ? 'left-[-2rem]' : 'right-[-2rem]'} glass-noir py-4 px-6 rounded-2xl border border-white/10 shadow-xl backdrop-blur-md`}>
                                    <div className="text-2xl font-serif font-light text-foreground">
                                        {service.duration}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground text-center">
                                        {service.label || 'Duration'}
                                    </div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <div className={`flex items-center gap-3 mb-6 justify-center md:justify-start text-prg-secondary`}>
                                    <span className="text-lg">{service.icon}</span>
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase">
                                        {service.subtitle}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                                    {service.title.split(' ').map((word, i) => (
                                        <span key={i} className={i % 2 === 0 ? "font-light opacity-90" : "font-bold text-foreground"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h2>

                                <p className="text-text-secondary text-lg leading-relaxed mb-10 max-w-md mx-auto md:mx-0">
                                    {service.description}
                                </p>

                                <button className="px-8 py-3 bg-[#2D0B5A] hover:bg-[#3D1B6A] text-white text-xs font-bold tracking-widest uppercase rounded-full transition-all shadow-lg hover:shadow-prg-primary/20 hover:scale-105">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
