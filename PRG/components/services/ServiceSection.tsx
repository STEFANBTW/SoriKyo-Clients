'use client';

import React from 'react';
import Link from 'next/link';
import { ServiceCard } from './ServiceCard';
import { TestimonialBlock } from './TestimonialBlock';

interface Service {
    title: string;
    description: string;
    price: string;
    image: string;
}

interface ServiceSectionProps {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    services: Service[];
    gallery?: React.ReactNode;
    testimonial: {
        quote: string;
        author: string;
        role: string;
        image: string;
    };
    bgClass?: string;
}

export const ServiceSection: React.FC<ServiceSectionProps> = ({
    id,
    title,
    description,
    icon,
    services,
    gallery,
    testimonial,
    bgClass = "bg-background"
}) => {
    return (
        <section id={id} className={`py-24 ${bgClass} relative overflow-hidden`}>
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
                    <div className="w-20 h-20 bg-prg-primary/5 rounded-2xl flex items-center justify-center mb-6 text-prg-primary border border-prg-primary/10">
                        {icon}
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                        {title}
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Services List - Zigzag */}
                <div className="space-y-12">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            {...service}
                            reversed={index % 2 !== 0}
                        />
                    ))}
                </div>

                {/* Gallery Showcase (Optional) */}
                {gallery && (
                    <div className="mt-24 mb-16">
                        {gallery}
                    </div>
                )}

                {/* Testimonial */}
                <div className="mt-16">
                    <TestimonialBlock {...testimonial} />
                </div>

                {/* Explore More Button */}
                <div className="mt-16 text-center">
                    <Link
                        href={`/${id}`}
                        className="inline-flex items-center gap-2 text-prg-secondary hover:text-prg-primary transition-colors font-bold uppercase tracking-widest text-sm group"
                    >
                        <span>Explore {title}</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};
