'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    title: string;
    description: string;
    price: string;
    image: string;
    reversed?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
    title,
    description,
    price,
    image,
    reversed = false
}) => {
    return (
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-8 lg:gap-16 py-12`}>
            {/* Image Side */}
            <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-prg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {/* Floating Price Tag */}
                    <div className={`absolute top-6 ${reversed ? 'right-6' : 'left-6'} z-20 glass-noir px-6 py-3 rounded-full border border-white/20 backdrop-blur-md`}>
                        <span className="font-serif text-xl font-bold text-foreground">{price}</span>
                    </div>
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground relative inline-block">
                    {title}
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-prg-secondary to-transparent rounded-full hidden lg:block"></span>
                </h3>
                <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                    {description}
                </p>

                <div className="pt-4 flex justify-center lg:justify-start">
                    <Link
                        href="#booking-wizard-trigger"
                        className="btn-primary"
                    >
                        <span>Book Now</span>
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};
