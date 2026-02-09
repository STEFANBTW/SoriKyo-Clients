'use client';

import React from 'react';
import Image from 'next/image';

export const TransformationGallery = () => {
    const interactions = [
        {
            title: "Purple Balayage Magic",
            desc: "Complete color transformation",
            before: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600&auto=format&fit=crop",
            after: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "Platinum Perfection",
            desc: "Lightening and toning",
            before: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop",
            after: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Textured Layers",
            desc: "Modern cut with movement",
            before: "https://images.unsplash.com/photo-1562004760-acb5a1c3e1c7?q=80&w=600&auto=format&fit=crop",
            after: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=600&auto=format&fit=crop"
        }
    ];

    return (
        <div className="w-full">
            <h3 className="font-serif text-3xl font-bold text-center mb-12 text-foreground">Transformation Gallery</h3>
            <div className="grid md:grid-cols-3 gap-8">
                {interactions.map((item, index) => (
                    <div key={index} className="group cursor-pointer">
                        <div className="relative h-80 rounded-xl overflow-hidden shadow-lg mb-4">
                            {/* Before Image (Hidden on hover) */}
                            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-10">
                                <Image
                                    src={item.before}
                                    alt={`Before ${item.title}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded">Before</div>
                            </div>

                            {/* After Image (Revealed on hover) */}
                            <div className="absolute inset-0">
                                <Image
                                    src={item.after}
                                    alt={`After ${item.title}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-prg-primary/80 text-white text-xs px-2 py-1 rounded">After</div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="font-serif font-bold text-lg text-foreground">{item.title}</h4>
                            <p className="font-sans text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
