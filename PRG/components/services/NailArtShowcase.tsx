'use client';

import React from 'react';
import Image from 'next/image';

export const NailArtShowcase = () => {
    const arts = [
        {
            img: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=400&auto=format&fit=crop",
            title: "Metallic Geometrics"
        },
        {
            img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop",
            title: "Lavender French"
        },
        {
            img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=400&auto=format&fit=crop",
            title: "Abstract Purple"
        },
        {
            img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=400&auto=format&fit=crop",
            title: "Minimalist Lines"
        }
    ];

    return (
        <div className="w-full">
            <h3 className="font-serif text-3xl font-bold text-center mb-12 text-foreground">Nail Art Showcase</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {arts.map((art, index) => (
                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-md group hover:shadow-xl transition-shadow duration-300">
                        <Image
                            src={art.img}
                            alt={art.title}
                            fill
                            className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                            <span className="text-white text-sm font-bold font-sans">{art.title}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
