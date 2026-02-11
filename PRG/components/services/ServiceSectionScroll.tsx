'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



interface ServiceItem {
    title: string;
    description: string;
    price: string;
    image: string;
}

interface ServiceSectionScrollProps {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
    bgClass?: string;
    services: ServiceItem[];
    gallery?: React.ReactNode;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
        image: string;
    };
    image?: string; // Main section hero image
}

export const ServiceSectionScroll: React.FC<ServiceSectionScrollProps> = ({
    id,
    title,
    description,
    icon,
    bgClass = "",
    services,
    gallery,
    testimonial,
    image = "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1920&auto=format&fit=crop" // Default fallback
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const zigzagRef = useRef<HTMLDivElement>(null);
    const firstServiceRef = useRef<HTMLDivElement>(null);
    const firstServiceImageRef = useRef<HTMLDivElement>(null);
    const firstServiceTitleRef = useRef<HTMLHeadingElement>(null);
    const firstServiceDescRef = useRef<HTMLParagraphElement>(null);
    const firstServicePriceRef = useRef<HTMLSpanElement>(null);
    const firstServiceBtnRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {

        const ctx = gsap.context(() => {

            // 1. Image Expansion Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom", // Start when section hits bottom of viewport
                    end: "center center", // End when section is centered
                    scrub: 1,
                }
            });

            // Curve Reveal (Border Radius Animation)
            tl.fromTo(sectionRef.current,
                { borderTopLeftRadius: "0px", borderTopRightRadius: "0px" },
                { borderTopLeftRadius: "80px", borderTopRightRadius: "80px", duration: 1, ease: "power2.out" }
            );


            // 2. Full Screen Image & Content Reveal Pinned Section
            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top top",
                    end: "+=150%", // Pin for 1.5 screen heights
                    scrub: true,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Expand Image
            pinTl.to(imageContainerRef.current, {
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                duration: 1,
                ease: "power2.inOut"
            })
                // Reveal Content Staggered
                .from([iconRef.current, titleRef.current, descRef.current], {
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 0.8,
                                    ease: "power3.out"
                                }, "-=0.5");
                    
                                // 4. First Service Pinned Animation
                                if (firstServiceRef.current) {
                                    const firstServiceTl = gsap.timeline({
                                        scrollTrigger: {
                                            trigger: firstServiceRef.current,
                                            start: "top top",
                                            end: "bottom bottom",
                                            scrub: true,
                                            pin: true,
                                        }
                                    });
                    
                                                    firstServiceTl
                                                        .from(firstServiceImageRef.current, { scale: 1.2 })
                                                        .to(firstServiceTitleRef.current, { opacity: 1, y: 0, stagger: 0.2 })
                                                        .to(firstServiceDescRef.current, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.1")
                                                        .to(firstServicePriceRef.current, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.1")
                                                        .to(firstServiceBtnRef.current, { opacity: 1, y: 0, stagger: 0.2 }, "-=0.1")
                                                        .to([firstServiceTitleRef.current, firstServiceDescRef.current, firstServicePriceRef.current, firstServiceBtnRef.current], { opacity: 0, y: 50, stagger: 0.1 })
                                                        .to(firstServiceImageRef.current, { scale: 1 });
                                                }                    
                                            // 5. Zigzag Reveal (remaining services)
                                            if (zigzagRef.current) {
                                                const remainingServiceCards = Array.from(zigzagRef.current.children).slice(0, 2);
                                                gsap.from(remainingServiceCards, {
                                                    scrollTrigger: {
                                                        trigger: zigzagRef.current,
                                                        start: "top 80%",
                                                        toggleActions: "play none none reverse"
                                                    },
                                                    y: 100,
                                                    opacity: 0,
                                                    stagger: 0.2,
                                                    duration: 1,
                                                    ease: "power3.out"
                                                });
                                            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id={id} className={`relative pt-20 pb-32 overflow-hidden ${bgClass}`}>

            {/* 1. Main Hero Image Section */}
            <div ref={imageContainerRef} className="relative w-[90%] h-[80vh] mx-auto rounded-3xl overflow-hidden shadow-2xl z-10">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
                    {icon && <div ref={iconRef} className="text-white mb-6 opacity-0">{icon}</div>}
                    <h2 ref={titleRef} className="font-serif text-6xl md:text-8xl text-white font-bold mb-6 drop-shadow-xl">{title}</h2>
                    <p ref={descRef} className="font-sans text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md">{description}</p>
                </div>
            </div>


            {/* 2. First Service Pinned Animation */}
            {services.length > 0 && (
                <div ref={firstServiceRef} className="h-[300vh] relative">
                    <div className="sticky top-0 h-screen w-full overflow-hidden">
                        <div ref={firstServiceImageRef} className="absolute inset-0">
                            <Image
                                src={services[0].image}
                                alt={services[0].title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center text-white z-10 w-full max-w-2xl px-4">
                            <h3 ref={firstServiceTitleRef} className="font-serif text-4xl md:text-5xl font-bold opacity-0">{services[0].title}</h3>
                            <p ref={firstServiceDescRef} className="font-sans text-lg text-muted-foreground leading-relaxed mt-4 opacity-0">{services[0].description}</p>
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <span ref={firstServicePriceRef} className="font-mono text-xl text-prg-primary font-bold opacity-0">{services[0].price}</span>
                                <button ref={firstServiceBtnRef} className="px-8 py-3 rounded-full bg-foreground text-background font-sans font-bold uppercase tracking-wider hover:bg-prg-primary hover:text-white transition-all duration-300 opacity-0">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* 3. Zigzag Service List (Remaining services) */}
            <div ref={zigzagRef} className="container mx-auto px-4 py-24 space-y-32 relative z-20">
                {services.slice(1).map((service, index) => (
                    <div key={index} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        {/* Image */}
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute -inset-4 bg-prg-primary/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                            <h3 className="font-serif text-4xl md:text-5xl text-foreground font-bold">{service.title}</h3>
                            <p className="font-sans text-lg text-muted-foreground leading-relaxed">{service.description}</p>
                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <span className="font-mono text-xl text-prg-primary font-bold">{service.price}</span>
                                <button className="px-8 py-3 rounded-full bg-foreground text-background font-sans font-bold uppercase tracking-wider hover:bg-prg-primary hover:text-white transition-all duration-300">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Gallery & Testimonials (Preserved) */}
            <div className="container mx-auto px-4 relative z-20">
                {gallery && (
                    <div ref={galleryRef} className="mb-24">
                        {gallery}
                    </div>
                )}

                {testimonial && (
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-prg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:bg-prg-primary/30 transition-colors"></div>

                        <div className="relative z-10">
                            <svg className="w-12 h-12 text-prg-primary mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 16.6346 9.14159 17.261 9.4141 17.8344C9.68661 18.4078 10.0831 18.9142 10.5746 19.3197C11.0661 19.7252 11.6406 20.0197 12.2575 20.1829C12.8744 20.346 13.5186 20.3739 14.1448 20.2647C14.103 20.5054 14.017 20.7629 14.017 21ZM4.01697 21L4.01697 18C4.01697 16.8954 3.12154 16 2.01697 16H1.5C0.671573 16 0 15.3284 0 14.5V1.5C0 0.671573 0.671573 0 1.5 0H12.017C12.8454 0 13.517 0.671573 13.517 1.5V14.5C13.517 15.3284 12.8454 16 12.017 16H12.017C12.017 17.1046 12.9124 18 14.017 18V21H4.01697Z" opacity="0.5" />
                            </svg>
                            <p className="font-serif text-2xl md:text-4xl text-foreground italic mb-8 leading-snug">"{testimonial.quote}"</p>
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-prg-primary p-1">
                                    <Image src={testimonial.image} alt={testimonial.author} width={64} height={64} className="rounded-full object-cover w-full h-full" />
                                </div>
                                <div>
                                    <h4 className="font-sans font-bold text-lg">{testimonial.author}</h4>
                                    <span className="text-sm text-prg-primary uppercase tracking-widest">{testimonial.role}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
