'use client';

import React from 'react';
import Link from 'next/link';

const SERVICES = [
    {
        id: 1,
        name: 'Hair Care',
        icon: '✂️',
        description: 'Expert styling for all genders. Haircuts, female hairdos, relaxers, cleansing & specialized treatments.',
        category: 'Styling',
        featured: true,
    },
    {
        id: 2,
        name: 'Aesthetics',
        icon: '✨',
        description: 'Lash & brow artistry, professional microblading, and microshading for flawless definition.',
        category: 'Beauty',
        featured: true,
    },
    {
        id: 3,
        name: 'Nail Artistry',
        icon: '💅',
        description: 'Professional manicure, pedicure, cleaning, polishing, and custom nail art designs.',
        category: 'Nails',
        featured: false,
    },
    {
        id: 4,
        name: 'Body & Wellness',
        icon: '🧖',
        description: 'Comprehensive SPA treatments designed to restore body and mind in a serene atmosphere.',
        category: 'Spa',
        featured: true,
    },
    {
        id: 5,
        name: 'PRG Academy',
        icon: '🎓',
        description: 'Professional beauty training and certification programs. Launch your career in beauty.',
        category: 'Education',
        featured: false,
    },
];

export const ServicesGrid = () => {
    return (
        <section id="services" className="w-full py-32 px-6 max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-4">
                    <span className="text-prg-secondary dark:text-prg-secondary text-xs font-bold tracking-[0.3em] uppercase">Our Expertise</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground dark:text-white">Royal Treatment Awaits</h2>
                    <p className="text-text-secondary dark:text-gray-300 max-w-md font-light leading-relaxed">
                        From precision haircuts to transformative microblading, experience beauty services fit for royalty.
                    </p>
                </div>
                <Link
                    href="/services"
                    className="text-nowrap text-xs font-bold tracking-widest text-prg-secondary dark:text-prg-secondary uppercase border-b border-prg-secondary/30 pb-2 hover:border-prg-secondary transition-colors"
                >
                    View All Services
                </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {SERVICES.map((service) => (
                    <div
                        key={service.id}
                        className={`glass-noir rounded-2xl p-8 space-y-6 group hover:-translate-y-2 transition-all duration-500 cursor-pointer border w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] ${service.featured ? 'border-prg-secondary/30' : 'border-transparent'}`}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-3xl">{service.icon}</span>
                            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-prg-accent/60">
                                {service.category}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-serif text-foreground group-hover:text-prg-secondary transition-colors">
                                {service.name}
                            </h3>
                            <p className="text-sm font-light text-text-secondary leading-relaxed">
                                {service.description}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-border-light flex justify-between items-center">
                            <Link
                                href={`/services#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-[10px] tracking-[0.2em] font-bold uppercase text-prg-secondary hover:text-prg-accent transition-colors"
                            >
                                Learn More &rarr;
                            </Link>
                            {service.featured && (
                                <span className="text-[8px] tracking-widest uppercase bg-prg-secondary/20 text-prg-secondary px-2 py-1 rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
