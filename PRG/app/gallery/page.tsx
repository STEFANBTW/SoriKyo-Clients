'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

type GalleryItemSize = 'small' | 'tall' | 'wide' | 'large';

interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    artist: string;
    size: GalleryItemSize;
}

// 35 Gallery Items Configuration
const GALLERY_ITEMS: GalleryItem[] = [
    // --- HAIR (10 Items) ---
    {
        id: 1,
        title: 'Precision Fade Mastery',
        category: 'barbing',
        image: '/images/hair1.jpg',
        description: 'A sharp, clean fade transformation demonstrating classic barbering techniques.',
        artist: 'Sophia Rodriguez',
        size: 'tall'
    },
    {
        id: 2,
        title: 'Vibrant Sunset Balayage',
        category: 'hair-artistry',
        image: '/images/Gemini_Generated_Image_4il1iw4il1iw4il1.png',
        description: 'Multi-dimensional color melt featuring warm autumnal tones.',
        artist: 'Marcus Chen',
        size: 'large'
    },
    {
        id: 3,
        title: 'Sculpted Beard Design',
        category: 'barbing',
        image: '/images/hair2.jpg',
        description: 'Complete beard reshape and grooming for a refined, modern look.',
        artist: 'Sophia Rodriguez',
        size: 'small'
    },
    {
        id: 4,
        title: 'Silk Press & Treatment',
        category: 'hair-spa',
        image: '/images/Gemini_Generated_Image_e9dqkfe9dqkfe9dq.png',
        description: 'Hydrating hair spa treatment followed by a sleek silk press finish.',
        artist: 'Elara Vance',
        size: 'wide'
    },
    {
        id: 5,
        title: 'Textured Crop Mastery',
        category: 'barbing',
        image: '/images/hair3.jpg',
        description: 'Contemporary textured crop with sharp edges and modern styling.',
        artist: 'Marcus Chen',
        size: 'small'
    },
    {
        id: 6,
        title: 'Noir Fade & Line-Up',
        category: 'barbing',
        image: '/images/hair_men_cut_3.png', // To Generate
        description: 'Edgy textured crop with dramatic fading and precise line-up.',
        artist: 'Emeka Obi',
        size: 'tall'
    },
    {
        id: 7,
        title: 'Opulent Silk Press',
        category: 'hair-artistry',
        image: '/images/hair_women_style_1.png', // To Generate
        description: 'Glass-hair finish silk press reflecting pure luxury.',
        artist: 'Nneka Adeyemi',
        size: 'wide'
    },
    {
        id: 8,
        title: 'Royal Purple Balayage',
        category: 'hair-artistry',
        image: '/images/hair_women_style_2.png', // To Generate
        description: 'Signature PRG purple balayage with velvet waves.',
        artist: 'Nneka Adeyemi',
        size: 'large'
    },
    {
        id: 9,
        title: 'Classic Gentleman Cut',
        category: 'barbing',
        image: '/images/hair_men_fade_2.png', // To Generate
        description: 'Timeless side profile cut with a modern twist.',
        artist: 'Emeka Obi',
        size: 'small'
    },
    {
        id: 10,
        title: 'Avante-Garde Updo',
        category: 'hair-artistry',
        image: '/images/hair_women_style_3.png', // To Generate
        description: 'Creative structural updo for high-fashion events.',
        artist: 'Nneka Adeyemi',
        size: 'tall'
    },

    // --- AESTHETICS (7 Items) ---
    {
        id: 11,
        title: 'Luxe Lash Extensions',
        category: 'aesthetics',
        image: '/images/aesthetic_lashes_1.png', // To Generate
        description: 'Hyper-realistic volume lashes, individually applied.',
        artist: 'Blessing Uche',
        size: 'wide'
    },
    {
        id: 12,
        title: 'Microblading Perfection',
        category: 'aesthetics',
        image: '/images/aesthetic_microblading_1.png', // To Generate
        description: 'Natural hair-stroke brows for a flawless frame.',
        artist: 'Blessing Uche',
        size: 'small'
    },
    {
        id: 13,
        title: 'Bridal Glamour',
        category: 'makeup',
        image: '/images/aesthetic_makeup_1.png', // To Generate
        description: 'Radiant bridal makeup with soft contouring.',
        artist: 'Jessica Lee',
        size: 'large'
    },
    {
        id: 14,
        title: 'Gold Leaf Editorial',
        category: 'makeup',
        image: '/images/aesthetic_makeup_2.png', // To Generate
        description: 'Artistic makeup featuring genuine gold leaf accents.',
        artist: 'Jessica Lee',
        size: 'tall'
    },
    {
        id: 15,
        title: 'Hydra-Glow Facial',
        category: 'aesthetics',
        image: '/images/aesthetic_facial_1.png', // To Generate
        description: 'Deep hydration facial for that signature PRG glow.',
        artist: 'Sarah Jenkins',
        size: 'wide'
    },
    {
        id: 16,
        title: 'Microlashing Process',
        category: 'aesthetics',
        image: '/images/aesthetic_microlashing_process.png', // To Generate
        description: 'Precision application technique showcase.',
        artist: 'Blessing Uche',
        size: 'small'
    },
    {
        id: 17,
        title: 'Backstage Beauty',
        category: 'makeup',
        image: '/images/aesthetic_makeup_action.png', // To Generate
        description: 'Dynamic action shot of professional makeup application.',
        artist: 'Jessica Lee',
        size: 'small'
    },

    // --- NAILS (10 Items) ---
    {
        id: 18,
        title: 'Diamond Gel Sculpture',
        category: 'nail-studio',
        image: '/images/nails_luxury_1.png', // To Generate
        description: 'Encapsulated glitter and crystal gel sculpture.',
        artist: 'Elena Rossi',
        size: 'tall'
    },
    {
        id: 19,
        title: 'Matte Black Stiletto',
        category: 'nail-studio',
        image: '/images/nails_luxury_2.png', // To Generate
        description: 'Fierce matte black stiletto nails with gold tips.',
        artist: 'Elena Rossi',
        size: 'small'
    },
    {
        id: 20,
        title: 'Royal Purple Chrome',
        category: 'nail-studio',
        image: '/images/nails_luxury_3.png', // To Generate
        description: 'Mirror-finish purple chrome powder application.',
        artist: 'Elena Rossi',
        size: 'small'
    },
    {
        id: 21,
        title: 'Marble Ink Art',
        category: 'nail-studio',
        image: '/images/nails_luxury_4.png', // To Generate
        description: 'Fluid marble design using alcohol inks.',
        artist: 'Elena Rossi',
        size: 'wide'
    },
    {
        id: 22,
        title: 'Swarovski Encrusted',
        category: 'nail-studio',
        image: '/images/nails_luxury_5.png', // To Generate
        description: 'Full nail pavé setting with genuine Swarovski crystals.',
        artist: 'Elena Rossi',
        size: 'large'
    },
    {
        id: 23,
        title: 'Minimalist Line Art',
        category: 'nail-studio',
        image: '/images/nails_luxury_6.png', // To Generate
        description: 'Chic negative space design with fine line work.',
        artist: 'Elena Rossi',
        size: 'small'
    },
    {
        id: 24,
        title: 'Ombre French',
        category: 'nail-studio',
        image: '/images/nails_luxury_7.png', // To Generate
        description: 'Seamless baby boomer pink and white fade.',
        artist: 'Elena Rossi',
        size: 'small'
    },
    {
        id: 25,
        title: 'Cat Eye Galaxy',
        category: 'nail-studio',
        image: '/images/nails_luxury_8.png', // To Generate
        description: 'Magnetic cat-eye polish resembling a nebula.',
        artist: 'Elena Rossi',
        size: 'tall'
    },
    {
        id: 26,
        title: 'Gold Foil Abstract',
        category: 'nail-studio',
        image: '/images/nails_luxury_9.png', // To Generate
        description: 'Abstract nude base with scattered gold foil.',
        artist: 'Elena Rossi',
        size: 'wide'
    },
    {
        id: 27,
        title: 'Textured Knit Sweater',
        category: 'nail-studio',
        image: '/images/nails_luxury_10.png', // To Generate
        description: '3D textured knit design for cozy vibes.',
        artist: 'Elena Rossi',
        size: 'small'
    },

    // --- SPA (4 Items) ---
    {
        id: 28,
        title: 'Hot Stone Therapy',
        category: 'hair-spa',
        image: '/images/spa_relax_1.png', // To Generate
        description: 'Therapeutic hot stone massage for deep relaxation.',
        artist: 'Sarah Jenkins',
        size: 'tall'
    },
    {
        id: 29,
        title: 'Aromatherapy Bliss',
        category: 'hair-spa',
        image: '/images/spa_relax_2.png', // To Generate
        description: 'Essential oil diffusion in our tranquility lounge.',
        artist: 'Sarah Jenkins',
        size: 'wide'
    },
    {
        id: 30,
        title: 'Deep Tissue Relief',
        category: 'hair-spa',
        image: '/images/spa_relax_3.png', // To Generate
        description: 'Targeted pressure to release chronic tension.',
        artist: 'Sarah Jenkins',
        size: 'small'
    },
    {
        id: 31,
        title: 'Zen Garden Retreat',
        category: 'hair-spa',
        image: '/images/spa_relax_4.png', // To Generate
        description: 'Our private outdoor relaxation area.',
        artist: 'Sarah Jenkins',
        size: 'large'
    },

    // --- TRAINING (4 Items) ---
    {
        id: 32,
        title: 'Masterclass Demo',
        category: 'academy',
        image: '/images/training_academy_1.png', // To Generate
        description: 'Live demonstration by our lead stylist.',
        artist: 'PRG Academy',
        size: 'wide'
    },
    {
        id: 33,
        title: 'Student Practice',
        category: 'academy',
        image: '/images/training_academy_2.png', // To Generate
        description: 'Hands-on practice session for hair styling students.',
        artist: 'PRG Academy',
        size: 'small'
    },
    {
        id: 34,
        title: 'Certification Day',
        category: 'academy',
        image: '/images/training_academy_3.png', // To Generate
        description: 'Celebrating our graduates with their certificates.',
        artist: 'PRG Academy',
        size: 'tall'
    },
    {
        id: 35,
        title: 'Theory Session',
        category: 'academy',
        image: '/images/training_academy_4.png', // To Generate
        description: 'Interactive classroom theory learning.',
        artist: 'PRG Academy',
        size: 'small'
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
                            Transformation Gallery
                        </h1>
                        <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
                            Witness the artistry and expertise of our team. Every transformation is a testament to our commitment to excellence.
                        </p>
                    </motion.div>
                </section>

                {/* Filters */}
                <section className="container mx-auto px-4 mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {['all', 'barbing', 'hair-artistry', 'hair-spa', 'nail-studio', 'aesthetics', 'makeup', 'academy'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`filter-btn capitalize ${filter === category ? 'active' : ''}`}
                            >
                                {category.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Bento Grid Gallery */}
                <section className="container mx-auto px-4">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[300px] gap-4"
                    >
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4 }}
                                    key={item.id}
                                    className={`relative group overflow-hidden rounded-2xl cursor-pointer
                                        ${item.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                                        ${item.size === 'wide' ? 'md:col-span-2' : ''}
                                        ${item.size === 'tall' ? 'md:row-span-2' : ''}
                                        ${item.size === 'small' ? '' : ''}
                                    `}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10" />

                                    <motion.img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        onError={(e) => {
                                            const fallbacks = [
                                                '/images/hair1.jpg',
                                                '/images/hair2.jpg',
                                                '/images/hair3.jpg',
                                                '/images/Gemini_Generated_Image_4il1iw4il1iw4il1.png',
                                                '/images/Gemini_Generated_Image_e9dqkfe9dqkfe9dq.png'
                                            ];
                                            const index = (item.id % fallbacks.length);
                                            (e.target as HTMLImageElement).src = fallbacks[index];
                                        }}
                                    />

                                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-white bg-prg-primary/80 backdrop-blur-sm rounded-full">
                                                {item.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </span>
                                            <h3 className="text-2xl font-serif font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/90 font-sans text-sm mb-4 line-clamp-2">{item.description}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold text-white">
                                                        {item.artist.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <span className="text-sm font-sans text-white/90">{item.artist}</span>
                                                </div>
                                                <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors text-white">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
