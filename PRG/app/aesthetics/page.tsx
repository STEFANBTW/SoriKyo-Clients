'use client';

import React from 'react';
import { Footer } from "@/components/layout/Footer";
import Image from 'next/image';

const AESTHETIC_SERVICES = [
    {
        title: "Signature Facials",
        description: "Customized treatments to cleanse, exfoliate, and hydrate your skin for a radiant glow.",
        items: ["Hydrafacial", "Anti-Aging Gold Facial", "Deep Pore Cleansing"],
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Professional Makeup",
        description: "Flawless application for your most special moments, enhancing your natural beauty.",
        items: ["Bridal Makeup", "Editorial / Photoshoot", "Special Event Glam"],
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Lash & Brow Artistry",
        description: "Frame your face with precision-sculpted brows and voluminous lashes.",
        items: ["Microblading", "Lash Lift & Tint", "Brow Lamination"],
        image: "https://images.unsplash.com/photo-1588665567554-15c4d0526012?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "advanced Skin Treatments",
        description: "Clinical-grade procedures for targeted results and skin rejuvenation.",
        items: ["Chemical Peels", "Dermaplaning", "Microneedling"],
        image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format&fit=crop"
    }
];

const HeroSection = () => (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1920&auto=format&fit=crop"
                alt="Aesthetics Hero"
                fill
                className="object-cover opacity-40"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 animate-slide-up">
                Reveal Your <span className="text-prg-secondary italic">Radiance</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up delay-100">
                Where science meets artistry to enhance your natural beauty.
            </p>
            <button className="btn-primary px-8 py-4 text-sm tracking-widest uppercase animate-slide-up delay-200">
                Book Consultation
            </button>
        </div>
    </section>
);

const PhilosophySection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-prg-secondary">Our Philosophy</span>
                <h2 className="text-4xl md:text-5xl font-serif leading-tight">
                    Enhancing Beauty,<br />Preserving <span className="text-prg-primary">Individuality</span>
                </h2>
                <p className="text-text-secondary leading-relaxed">
                    We believe that aesthetic treatments should empower you to feel confident in your own skin. Our approach combines medical expertise with an artistic eye to deliver subtle, natural-looking results that harmonize with your unique features.
                </p>
                <div className="grid grid-cols-2 gap-8 pt-6">
                    <div>
                        <h4 className="font-serif text-2xl mb-2">Clinical</h4>
                        <p className="text-sm text-text-secondary">FDA-approved technologies and premium products.</p>
                    </div>
                    <div>
                        <h4 className="font-serif text-2xl mb-2">Curated</h4>
                        <p className="text-sm text-text-secondary">Personalized treatment plans for every client.</p>
                    </div>
                </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                <Image
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
                    alt="Philosophy"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    </section>
);

const ServicesGrid = () => (
    <section className="py-24 bg-prg-primary/5">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Curated Treatments</h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    From rejuvenating facials to transformative enhancements, explore our comprehensive menu of aesthetic services.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {AESTHETIC_SERVICES.map((service, index) => (
                    <div key={index} className="group glass-noir p-8 rounded-2xl border border-white/5 hover:border-prg-secondary/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative w-full md:w-1/3 aspect-[3/4] rounded-lg overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex-1 space-y-4">
                                <h3 className="text-2xl font-serif group-hover:text-prg-secondary transition-colors">{service.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 pt-2">
                                    {service.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-sm text-text-muted">
                                            <span className="w-1.5 h-1.5 rounded-full bg-prg-secondary mr-2"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="text-xs uppercase tracking-widest text-prg-secondary hover:text-white transition-colors mt-4 inline-block border-b border-prg-secondary pb-1">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = () => (
    <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="max-w-3xl mx-auto glass-noir p-12 rounded-3xl border border-white/10 shadow-2xl">
                <h2 className="text-4xl font-serif mb-6">Begin Your Transformation</h2>
                <p className="text-text-secondary mb-8 text-lg">
                    Schedule a complimentary consultation with our aesthetic experts to design your personalized beauty journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary px-8 py-4">Book Appointment</button>
                    <button className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full transition-colors uppercase tracking-widest text-xs font-bold">
                        View Price List
                    </button>
                </div>
            </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-prg-secondary/5 to-transparent z-0 pointer-events-none"></div>
    </section>
);

export default function AestheticsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main>
                <HeroSection />
                <PhilosophySection />
                <ServicesGrid />
                <CTASection />
            </main>
            <Footer />
        </div>
    );
}
