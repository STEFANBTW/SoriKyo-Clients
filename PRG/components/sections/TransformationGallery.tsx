'use client';

import React from 'react';
import Link from 'next/link';

export const TransformationGallery = () => {
    return (
        <section id="gallery-preview" className="py-24 bg-transparent relative transition-colors duration-500 .dark:bg-[#0D0816]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-prg-secondary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground .dark:text-white">
                        Transformation Gallery
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                        Witness the artistry and expertise that goes into every client transformation
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Gallery Item 1 */}
                    <Link href="/gallery" className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl h-96 border border-white/10 shadow-2xl">
                            <img
                                src="/images/Gemini_Generated_Image_4il1iw4il1iw4il1.png"
                                alt="Before and after hair transformation showing dramatic color change from dark to vibrant purple balayage"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-prg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="font-serif text-xl font-semibold mb-2">Purple Balayage Magic</h4>
                                    <p className="font-sans text-sm text-gray-200 mb-4 tracking-wide">Complete color transformation</p>
                                    <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Gallery Item 2 */}
                    <Link href="/gallery" className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl h-96 border border-white/10 shadow-2xl">
                            <img
                                src="/images/Gemini_Generated_Image_e9dqkfe9dqkfe9dq.png"
                                alt="Professional fade haircut transformation showcasing precision barbering technique"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-prg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="font-serif text-xl font-semibold mb-2">Precision Fade Artistry</h4>
                                    <p className="font-sans text-sm text-gray-200 mb-4 tracking-wide">Modern barbering excellence</p>
                                    <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Gallery Item 3 */}
                    <Link href="/gallery" className="group cursor-pointer">
                        <div className="relative overflow-hidden rounded-xl h-96 border border-white/10 shadow-2xl">
                            <img
                                src="/images/AIEnhancer_image.png"
                                alt="Luxury nail art transformation featuring intricate purple and gold design patterns"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-prg-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                <div className="text-center text-white p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h4 className="font-serif text-xl font-semibold mb-2">Luxury Nail Artistry</h4>
                                    <p className="font-sans text-sm text-gray-200 mb-4 tracking-wide">Intricate design perfection</p>
                                    <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                                        View Details
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="text-center mt-12">
                    <Link href="/gallery" className="btn-primary inline-flex items-center gap-2 group">
                        Explore Full Gallery
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};
