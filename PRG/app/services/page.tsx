'use client';

import React from 'react';
import { ServicesHero } from '@/components/services/ServicesHero';
import { ServiceSection } from '@/components/services/ServiceSection';
import { TransformationGallery } from '@/components/services/TransformationGallery';
import { NailArtShowcase } from '@/components/services/NailArtShowcase';
import { ServicesCTA } from '@/components/services/ServicesCTA';
import { Footer } from '@/components/layout/Footer';

export default function ServicesPage() {
    return (
        <main className="bg-background min-h-screen">
            <ServicesHero />

            <ServiceSection
                id="hair"
                title="Hair Artistry"
                description="Experience the art of precision barbering and creative styling. Where classic techniques meet contemporary flair."
                icon={
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L3 3m5.758 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                    </svg>
                }
                services={[
                    {
                        title: "Barbing Excellence",
                        description: "Precision cuts, fades, and beard grooming using premium tools and hot towel treatments.",
                        price: "From $45",
                        image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Creative Color",
                        description: "Balayage, ombré, and vivid color transformations tailored to your style and complexion.",
                        price: "From $150",
                        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Styling & Texture",
                        description: "Blowouts, silk presses, and texture services to enhance your hair's natural beauty.",
                        price: "From $75",
                        image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=800&auto=format&fit=crop"
                    }
                ]}
                gallery={<TransformationGallery />}
                testimonial={{
                    quote: "Sophia's attention to detail is incredible. Best fade I've ever had. I've been coming here for two years and wouldn't trust anyone else.",
                    author: "Jordan Lee",
                    role: "Regular Client",
                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                }}
            />

            <ServiceSection
                id="aesthetics"
                title="Aesthetics"
                description="Reveal your radiance with our premium aesthetic treatments, from rejuvenating facials to professional makeup artistry."
                bgClass="bg-prg-primary/5"
                icon={
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                }
                services={[
                    {
                        title: "Signature Facials",
                        description: "Deep cleansing and hydration treatments customized for your unique skin type.",
                        price: "From $85",
                        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Professional Makeup",
                        description: "Flawless application for weddings, events, or photoshoots by certified artists.",
                        price: "From $95",
                        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Lash & Brow",
                        description: "Extensions, lifts, and tints to frame your eyes and enhance your natural features.",
                        price: "From $45",
                        image: "https://images.unsplash.com/photo-1588665567554-15c4d0526012?q=80&w=800&auto=format&fit=crop"
                    }
                ]}
                testimonial={{
                    quote: "The facial was absolutely transformative. My skin has never looked so glowing and healthy. Truly a luxury experience.",
                    author: "Elena Rodriguez",
                    role: "Bridal Client",
                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                }}
            />

            <ServiceSection
                id="nails"
                title="Nail Studio"
                description="Experience exquisite nail artistry and pampering treatments. Classic elegance meets bold creativity."
                icon={
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                }
                services={[
                    {
                        title: "Luxury Manicures",
                        description: "Gel, acrylic, or natural nail care with premium products and meticulous cuticle work.",
                        price: "From $40",
                        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Spa Pedicures",
                        description: "Relaxing foot soak, exfoliation, and massage followed by perfect polish application.",
                        price: "From $60",
                        image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Custom Nail Art",
                        description: "Intricate designs, crystals, and hand-painted art to express your personal style.",
                        price: "Add-on from $15",
                        image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800&auto=format&fit=crop"
                    }
                ]}
                gallery={<NailArtShowcase />}
                testimonial={{
                    quote: "Jordan's nail artistry is phenomenal! The designs are intricate and last for weeks. I always get compliments on my nails.",
                    author: "Sam Rivera",
                    role: "Nail Art Enthusiast",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                }}
            />

            <ServiceSection
                id="spa"
                title="Spa Sanctuary"
                description="Indulge in rejuvenating treatments designed to restore health, shine, and vitality to your body and mind."
                bgClass="bg-prg-primary/5"
                icon={
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                }
                services={[
                    {
                        title: "Massage Therapy",
                        description: "Swedish, Deep Tissue, and Aromatherapy massages to melt away stress and tension.",
                        price: "From $80",
                        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Body Treatments",
                        description: "Body scrubs, wraps, and glowing treatments for silky smooth skin.",
                        price: "From $100",
                        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Hair Spa",
                        description: "Deep conditioning and scalp treatments for hair health and relaxation.",
                        price: "From $65",
                        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
                    }
                ]}
                testimonial={{
                    quote: "The spa treatment was pure bliss! The atmosphere is so serene and the staff are incredibly professional. A true escape.",
                    author: "Maya Patel",
                    role: "Monthly Member",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                }}
            />

            <ServiceSection
                id="academy"
                title="Beauty Academy"
                description="Start your journey in the beauty industry with expert-led training courses and certifications."
                icon={
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                }
                services={[
                    {
                        title: "Barbering Course",
                        description: "Master the art of precision cutting, fading, and grooming with our comprehensive program.",
                        price: "Enroll Now",
                        image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Makeup Masterclass",
                        description: "Learn professional techniques for bridal, editorial, and special effects makeup.",
                        price: "Enroll Now",
                        image: "https://images.unsplash.com/photo-1455686950540-8f054f5a8685?q=80&w=800&auto=format&fit=crop"
                    },
                    {
                        title: "Nail Technology",
                        description: "Become a certified nail technician covering manicures, pedicures, and nail art.",
                        price: "Enroll Now",
                        image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop"
                    }
                ]}
                testimonial={{
                    quote: "The training at PRG Academy gave me the confidence and skills to start my own business. The instructors are world-class.",
                    author: "David Okon",
                    role: "Academy Graduate",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                }}
            />

            <ServicesCTA />

            <div className="relative z-10 bg-background">
                <Footer />
            </div>
        </main>
    );
}
