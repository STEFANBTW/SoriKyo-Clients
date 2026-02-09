'use client';

import React from 'react';
import { Footer } from "@/components/layout/Footer";
import Image from 'next/image';

const SPA_TREATMENTS = [
    {
        title: "Massage Therapy",
        description: "Relieve tension and restore balance with our therapeutic massage techniques.",
        items: [
            { name: "Swedish Massage", duration: "60/90 min", price: "$100/$140" },
            { name: "Deep Tissue", duration: "60/90 min", price: "$120/$170" },
            { name: "Hot Stone", duration: "75 min", price: "$150" }
        ],
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
    },
    {
        title: "Body Rituals",
        description: "Exfoliate, hydrate, and nourish your skin with our luxurious body treatments.",
        items: [
            { name: "Himalayan Salt Scrub", duration: "45 min", price: "$85" },
            { name: "Detoxifying Mud Wrap", duration: "60 min", price: "$110" },
            { name: "Gold Body Polish", duration: "60 min", price: "$130" }
        ],
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
    }
];

const PACKAGES = [
    {
        name: "The Escape",
        items: ["60min Massage", "Custom Facial", "Glass of Champagne"],
        duration: "2.5 Hours",
        price: "$250"
    },
    {
        name: "Royal Indulgence",
        items: ["Body Scrub & Wrap", "90min Massage", "Spa Lunch"],
        duration: "4 Hours",
        price: "$380"
    },
    {
        name: "Couples Retreat",
        items: ["Couples Massage", "Private Sauna", "Aromatherapy"],
        duration: "2 Hours",
        price: "$300"
    }
];

const SpaHero = () => (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1920&auto=format&fit=crop"
                alt="Spa Sanctuary"
                fill
                className="object-cover opacity-50"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
            <span className="text-sm font-bold tracking-[0.4em] uppercase mb-4 block animate-fade-in">Sanctuary of Peace</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 animate-slide-up drop-shadow-2xl">
                Refresh Your <span className="italic font-light">Soul</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 animate-slide-up delay-100 drop-shadow-md">
                Step into a world of tranquility where stress melts away and wellness begins.
            </p>
            <button className="btn-primary px-10 py-4 text-sm tracking-widest uppercase animate-slide-up delay-200">
                Explore Treatments
            </button>
        </div>
    </section>
);

const TreatmentsSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Holistic Therapies</h2>
                <div className="w-24 h-1 bg-prg-secondary mx-auto"></div>
            </div>

            <div className="space-y-24">
                {SPA_TREATMENTS.map((treatment, idx) => (
                    <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src={treatment.image}
                                alt={treatment.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <h3 className="text-3xl font-serif text-prg-primary">{treatment.title}</h3>
                            <p className="text-text-secondary text-lg leading-relaxed">{treatment.description}</p>
                            <div className="pt-6">
                                {treatment.items.map((item, i) => (
                                    <div key={i} className="flexjustify-between items-center py-4 border-b border-white/10 hover:bg-white/5 px-4 -mx-4 rounded-lg transition-colors">
                                        <span className="font-serif text-lg">{item.name}</span>
                                        <div className="text-right">
                                            <span className="block text-xs uppercase tracking-widest text-text-muted">{item.duration}</span>
                                            <span className="block font-bold text-prg-secondary">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const PackagesSection = () => (
    <section className="py-24 bg-prg-primary/5 relative">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-prg-secondary">Curated Experiences</span>
                    <h2 className="text-4xl md:text-5xl font-serif mt-4">Spa Packages</h2>
                </div>
                <p className="text-text-secondary max-w-md text-sm md:text-base">
                    Enjoy a full day of pampering or a quick escape. Our packages are designed to provide complete relaxation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PACKAGES.map((pkg, i) => (
                    <div key={i} className="glass-noir p-8 rounded-2xl border border-white/5 hover:border-prg-secondary/30 transition-all duration-300 flex flex-col hover:-translate-y-2 shadow-xl">
                        <div className="mb-6">
                            <h3 className="text-2xl font-serif mb-2">{pkg.name}</h3>
                            <span className="text-xs font-bold tracking-widest text-prg-secondary uppercase">{pkg.duration}</span>
                        </div>
                        <ul className="space-y-4 mb-8 flex-1">
                            {pkg.items.map((item, j) => (
                                <li key={j} className="flex items-center text-sm text-text-secondary">
                                    <span className="w-1.5 h-1.5 bg-white/50 rounded-full mr-3"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                            <span className="text-2xl font-serif">{pkg.price}</span>
                            <button className="text-xs uppercase tracking-widest font-bold hover:text-prg-secondary transition-colors">Book Now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const AmenitiesSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif mb-12">Complimentary Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { icon: "🍵", name: "Herbal Tea Bar" },
                    { icon: "🧖‍♀️", name: "Steam Room" },
                    { icon: "🛋️", name: "Relaxation Lounge" },
                    { icon: "🚿", name: "Rain Showers" }
                ].map((amenity, i) => (
                    <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-white/5 transition-colors">
                        <span className="text-4xl mb-2 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">{amenity.icon}</span>
                        <span className="text-sm uppercase tracking-widest font-bold">{amenity.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default function SpaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main>
                <SpaHero />
                <TreatmentsSection />
                <PackagesSection />
                <AmenitiesSection />
            </main>
            <Footer />
        </div>
    );
}
