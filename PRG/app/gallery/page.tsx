'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';

const GALLERY_ITEMS = [
    {
        id: 1,
        title: 'Precision Fade Mastery',
        category: 'barbing',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
        description: 'A sharp, clean fade transformation demonstrating classic barbering techniques.',
        artist: 'Sophia Rodriguez'
    },
    {
        id: 2,
        title: 'Vibrant Sunset Balayage',
        category: 'hair-artistry',
        image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop',
        description: 'Multi-dimensional color melt featuring warm autumnal tones.',
        artist: 'Marcus Chen'
    },
    {
        id: 3,
        title: 'Sculpted Beard Design',
        category: 'barbing',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop',
        description: 'Complete beard reshape and grooming for a refined, modern look.',
        artist: 'Sophia Rodriguez'
    },
    {
        id: 4,
        title: 'Silk Press & Treatment',
        category: 'hair-spa',
        image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop',
        description: 'Hydrating hair spa treatment followed by a sleek silk press finish.',
        artist: 'Elara Vance'
    },
    {
        id: 5,
        title: 'Textured Crop Mastery',
        category: 'barbing',
        image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop',
        description: 'Contemporary textured crop with sharp edges and modern styling.',
        artist: 'Marcus Chen'
    }
];

export default function GalleryPage() {
    const [filter, setFilter] = useState('all');

    const filteredItems = filter === 'all'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === filter);

    return (
        <div className="bg-background min-h-screen">

            <main className="pt-32 pb-20">
                {/* Hero Header */}
                <section className="container mx-auto px-4 mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                        Transformation Gallery
                    </h1>
                    <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
                        Witness the artistry and expertise of our team. Every transformation is a testament to our commitment to excellence.
                    </p>
                </section>

                {/* Filters */}
                <section className="container mx-auto px-4 mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        >
                            All Works
                        </button>
                        <button
                            onClick={() => setFilter('barbing')}
                            className={`filter-btn ${filter === 'barbing' ? 'active' : ''}`}
                        >
                            Barbing
                        </button>
                        <button
                            onClick={() => setFilter('hair-artistry')}
                            className={`filter-btn ${filter === 'hair-artistry' ? 'active' : ''}`}
                        >
                            Hair Artistry
                        </button>
                        <button
                            onClick={() => setFilter('hair-spa')}
                            className={`filter-btn ${filter === 'hair-spa' ? 'active' : ''}`}
                        >
                            Hair Spa
                        </button>
                        <button
                            onClick={() => setFilter('nail-studio')}
                            className={`filter-btn ${filter === 'nail-studio' ? 'active' : ''}`}
                        >
                            Nail Studio
                        </button>
                    </div>
                </section>

                {/* Gallery Grid */}
                <section className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map(item => (
                            <div key={item.id} className="card-hover group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl mb-4 h-80">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-prg-primary text-white px-3 py-1 rounded-full text-xs font-sans font-semibold">
                                        {item.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                    </div>
                                    <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                                        <button className="btn-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-serif text-xl font-semibold text-foreground">{item.title}</h3>
                                        <button className="p-2 hover:bg-prg-secondary/10 rounded-lg transition-colors">
                                            <svg className="w-5 h-5 text-prg-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="font-sans text-muted-foreground text-sm mb-4">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-border">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-prg-primary/20 flex items-center justify-center text-[10px] font-bold text-prg-primary">
                                                {item.artist.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-sm font-sans text-foreground">{item.artist}</span>
                                        </div>
                                        <button className="text-sm font-sans text-prg-secondary hover:underline transition-colors tracking-tight">Book Artist</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container mx-auto px-4 mt-20">
                    <div className="card-elevated gradient-primary text-white text-center p-12 overflow-hidden relative rounded-2xl">
                        <div className="relative z-10">
                            <h2 className="font-serif text-4xl font-bold mb-6">Ready for your transformation?</h2>
                            <p className="font-sans text-xl mb-8 max-w-2xl mx-auto opacity-90">
                                Join the hundreds of clients who have experienced the Purple Rain Galore difference.
                            </p>
                            <button className="btn-accent text-lg px-8 py-3">Book Your Appointment Now</button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
