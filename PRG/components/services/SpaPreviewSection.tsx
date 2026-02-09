'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const SPA_SERVICES = [
    {
        name: "Immersive Relaxation",
        description: "Experience total tranquility in our exclusive spa suites.",
        price: "Contact for Pricing",
        image: "/images/AIEnhancer_image.png",
        isHero: true
    },
    {
        name: "Luxury Massage",
        description: "Therapeutic massage techniques tailored to your needs.",
        price: "from ₦18,000",
        image: "/images/Gemini_Generated_Image_e9dqkfe9dqkfe9dq.png"
    },
    {
        name: "Aromatherapy Session",
        description: "Soothing essential oils specifically blended for deep relaxation.",
        price: "from ₦20,000",
        image: "/images/Gemini_Generated_Image_4il1iw4il1iw4il1.png"
    }
];

export const SpaPreviewSection = () => {
    // Container for the scroll space (height = scroll duration)
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Animation Phases based on scroll progress (0 to 1)

    // Phase 1: Expansion (0.0 - 0.15)
    // Scale up from "Container Size" to "Full Viewport"
    const width = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["100%", "100%", "100%", "100%"]); // Always full width
    const height = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["100vh", "100vh", "100vh", "100vh"]); // Always full height
    const borderRadius = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], ["0rem", "0rem", "0rem", "0rem"]); // No border radius

    // Phase 2: Pan (0.15 - 0.85)
    // Pan the inner image to simulate rotation
    // Image is wider than viewport (e.g., 150vw). We move x from 0 to -33% (approx 1/3 of image)
    const panX = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "-25%"]);

    // Content Opacity (Fade out text when expanding, maybe fade in new text during pan?)
    const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const overlayOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.8, 0.85], [0, 1, 1, 0]);

    const heroService = SPA_SERVICES.find(s => s.isHero)!;
    const otherServices = SPA_SERVICES.filter(s => !s.isHero);

    return (
        <section className="relative">
            {/* Header Section (Before the sticky part) */}
            <div className="py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-serif text-prg-secondary mb-4">Spa & Wellness</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Recharge your body and soul with our curated spa experiences.
                </p>
            </div>

            {/* Immersive Scroll Container */}
            <div ref={containerRef} className="relative h-[300vh]">
                <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                    <motion.div
                        style={{
                            width,
                            height,
                            borderRadius
                        }}
                        className="relative overflow-hidden shadow-2xl z-10 bg-black"
                    >
                        {/* Panning Image Layer */}
                        <motion.div
                            style={{ x: panX }}
                            className="relative w-[180%] h-full flex-shrink-0" // 180% width to allow panning
                        >
                            <Image
                                src={heroService.image}
                                alt={heroService.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                            {/* Gradient Overlay for "Atmosphere" */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>
                        </motion.div>

                        {/* Initial Text (Fades out) */}
                        <motion.div
                            style={{ opacity: textOpacity }}
                            className="absolute bottom-12 left-0 right-0 text-center px-6 z-20 pointer-events-none"
                        >
                            <div className="bg-black/30 backdrop-blur-md inline-block px-8 py-4 rounded-full border border-white/10">
                                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-0 drop-shadow-lg">
                                    {heroService.name}
                                </h3>
                                <p className="text-white/80 text-sm tracking-widest uppercase mt-2">
                                    Scroll to Explore
                                </p>
                            </div>
                        </motion.div>

                        {/* Immersive Overlay Text (Appears during Pan) */}
                        <motion.div
                            style={{ opacity: overlayOpacity }}
                            className="absolute bottom-24 left-12 z-20 pointer-events-none"
                        >
                            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white/90 drop-shadow-lg tracking-tighter">
                                Serenity.<br />
                                <span className="italic font-light">Unfolded.</span>
                            </h2>
                        </motion.div>

                    </motion.div>
                </div>
            </div>

            {/* Remaining Services (Zigzag) */}
            <div className="relative z-20 bg-background py-32 -mt-24"> {/* Negative margin to overlap slightly or smooth transition */}
                <div className="container mx-auto px-6 space-y-32">
                    {otherServices.map((service, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image Side */}
                            <div className="relative w-full md:w-1/2 max-w-md mx-auto group">
                                {/* Changed aspect ratio to video 16:9 (aspect-[16/9]) from aspect-[4/5] */}
                                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
                                    <Image
                                        src={service.image}
                                        alt={service.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                                <h3 className="text-3xl font-serif font-bold text-foreground">
                                    {service.name}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                                    {service.description}
                                </p>
                                <div className="text-2xl font-light text-prg-secondary">
                                    {service.price}
                                </div>
                                <button className="btn-primary hover:scale-105 active:scale-95 text-xs tracking-widest uppercase">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="text-center mt-24">
                        <Link
                            href="/spa"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-prg-secondary/50 text-prg-secondary hover:bg-prg-secondary hover:text-white rounded-full transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                        >
                            View All Spa Packages
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
