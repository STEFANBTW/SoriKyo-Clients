'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ServicesHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const archWrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {


        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=100%", // Scroll distance to complete animation
                    scrub: true,
                    pin: true,
                }
            });

            // 1. Fade out Content & Stats
            tl.to([contentRef.current, statsRef.current], {
                opacity: 0,
                y: -50,
                duration: 0.5
            }, 0);

            // 2. Expand Hero Image and Fade Out Window
            tl.to(imageRef.current, {
                scale: 1.2,
                duration: 1
            }, 0)
            .to(archWrapperRef.current, {
                width: "120vw",
                height: "120vh",
                opacity: 0,
                duration: 1
            }, "+=0.2"); // Start after image starts scaling

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen bg-black text-white overflow-hidden py-8 px-6 md:px-12 flex flex-col">

            {/* Top Stats */}
            <div ref={statsRef} className="flex justify-between md:justify-center gap-12 md:gap-32 w-full max-w-5xl mx-auto mb-8 md:mb-16 z-20 relative pt-20">
                <div className="text-center">
                    <h3 className="font-sans text-4xl md:text-5xl font-bold">5K</h3>
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mt-2">Customers</p>
                </div>
                <div className="text-center">
                    <h3 className="font-sans text-4xl md:text-5xl font-bold">4.5K</h3>
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mt-2">Repeat</p>
                </div>
                <div className="text-center">
                    <h3 className="font-sans text-4xl md:text-5xl font-bold">99%</h3>
                    <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mt-2">Satisfaction</p>
                </div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row items-center relative z-10 w-full flex-grow">

                {/* Left Content */}
                <div ref={contentRef} className="w-full md:w-1/2 mb-12 md:mb-0 relative z-20 md:pr-12">
                    <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Book Now</p>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8 leading-none">
                        Services
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mb-8 md:mb-10">
                        Discover a full range of expert beauty care services at Purple Rain Galore, your destination for precision and luxury in the heart of the city. From our signature <strong>Hair Styling</strong> to revitalizing <strong>Spa Treatments</strong>, we deliver top-tier results tailored to express your unique style.
                    </p>
                    <Link
                        href="#hair"
                        className="inline-block px-8 py-3 md:py-4 bg-prg-primary text-white font-bold text-xs tracking-widest uppercase rounded-full hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Read More
                    </Link>
                </div>

                {/* Right Image (Arch) */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-[600px] relative flex justify-center md:justify-end items-center pointer-events-none"> {/* pointer-events-none to let scroll pass through if needed, but wrapper handles expand */}

                    {/* Decorative Stars */}
                    <div className="absolute top-0 right-10 w-8 h-8 text-white/50 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                    </div>
                    <div className="absolute bottom-10 left-10 w-6 h-6 text-white/50 animate-pulse delay-700">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                    </div>

                    {/* The Arch that expands */}
                    <div
                        ref={archWrapperRef}
                        className="absolute md:right-0 w-[280px] md:w-[400px] h-[350px] md:h-[550px] overflow-hidden border border-white/20 z-10 bg-black"
                        style={{
                            borderRadius: "200px 200px 0 0", // Arch shape
                        }}
                    >
                        <div
                            ref={imageRef}
                            className="w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: "url('https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1200&auto=format&fit=crop')",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
