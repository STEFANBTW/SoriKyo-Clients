'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar: string;
    beforeImage: string;
    afterImage: string;
    service: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Alex Thompson",
        role: "Hair Artistry Studio Client",
        quote: "Marcus transformed my hair beyond my wildest dreams. The color is absolutely stunning and the cut is perfect. I've never felt more confident!",
        avatar: "/images/hair1.jpg",
        beforeImage: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop", // Maintain Unsplash
        afterImage: "/images/Gemini_Generated_Image_4il1iw4il1iw4il1.png",
        service: "Creative Color & Cut"
    },
    {
        id: 2,
        name: "Jordan Lee",
        role: "Barbing Excellence Client",
        quote: "Sophia's attention to detail is incredible. Best fade I've ever had. The atmosphere is welcoming and professional. Highly recommend!",
        avatar: "/images/hair2.jpg",
        beforeImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        afterImage: "/images/Gemini_Generated_Image_e9dqkfe9dqkfe9dq.png",
        service: "Precision Fade"
    },
    {
        id: 3,
        name: "Sam Rivera",
        role: "Nail Studio Luxury Client",
        quote: "Jordan's nail artistry is phenomenal! The designs are intricate and beautiful. The spa experience was so relaxing. I'm a client for life!",
        avatar: "/images/hair3.jpg",
        beforeImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
        afterImage: "/images/AIEnhancer_image.png",
        service: "Luxury Nail Art"
    }
];

export const TestimonialsGrid = () => {
    const [activeComparison, setActiveComparison] = useState<number | null>(null);

    const toggleComparison = (id: number) => {
        setActiveComparison(activeComparison === id ? null : id);
    };

    return (
        <section id="testimonials" className="py-24 bg-prg-primary/5 relative overflow-hidden transition-colors duration-500 .dark:bg-[#0A0510]">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-prg-primary/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground .dark:text-white">
                        Client Love Stories
                    </h2>
                    <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                        Hear from our satisfied clients about their transformation experiences
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((testimonial) => (
                        <div key={testimonial.id} className="glass-noir rounded-2xl p-8 border border-white/5 hover:border-prg-secondary/30 transition-all duration-300 flex flex-col h-full group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-prg-secondary/20">
                                    <img
                                        src={testimonial.avatar}
                                        alt={`Portrait of ${testimonial.name}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-serif font-semibold text-lg text-foreground .dark:text-white">{testimonial.name}</h4>
                                    <div className="flex gap-1 text-prg-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="font-sans text-muted-foreground italic mb-6 flex-grow leading-relaxed">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>

                            <p className="text-xs text-prg-secondary uppercase tracking-widest font-bold mb-6">
                                {testimonial.role}
                            </p>

                            {/* Before/After Toggle Section */}
                            <div className="mt-auto pt-6 border-t border-white/10">
                                <button
                                    onClick={() => toggleComparison(testimonial.id)}
                                    className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-prg-secondary/20 border border-white/5 hover:border-prg-secondary/50 transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-white/10"
                                >
                                    {activeComparison === testimonial.id ? 'Hide Transformation' : 'See Transformation'}
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${activeComparison === testimonial.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Expandable Comparison View */}
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeComparison === testimonial.id ? 'max-h-64 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}`}>
                                    <div className="grid grid-cols-2 gap-2 h-32 md:h-40">
                                        <div className="relative rounded-lg overflow-hidden group/img">
                                            <img src={testimonial.beforeImage} alt="Before" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="text-xs font-bold text-white uppercase tracking-widest bg-black/50 px-2 py-1 rounded">Before</span>
                                            </div>
                                        </div>
                                        <div className="relative rounded-lg overflow-hidden group/img">
                                            <img src={testimonial.afterImage} alt="After" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-prg-secondary/20 flex items-center justify-center">
                                                <span className="text-xs font-bold text-white uppercase tracking-widest bg-prg-secondary/80 px-2 py-1 rounded">After</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-center text-muted-foreground mt-2 uppercase tracking-wider">
                                        Service: {testimonial.service}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
