'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

export const SmoothScroll = () => {
    useEffect(() => {
        // Register GSAP Plugins
        gsap.registerPlugin(ScrollTrigger);

        // 1. Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.3, // Significantly increased for more direct scrolling
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: true,
            wheelMultiplier: 1, // Reverted to default
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        // Connect GSAP Ticker to Lenis RAF
        const raf = (time: number) => {
            lenis.raf(time);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        // 2. Global Reveal Animation Logic (Boutique Style)
        const ctx = gsap.context(() => {
            const revealElements = document.querySelectorAll(".reveal");

            revealElements.forEach((el) => {
                gsap.fromTo(el,
                    {
                        y: 100,      // Start 100px down
                        opacity: 0   // Start invisible
                    },
                    {
                        y: 0,        // Move to natural position
                        opacity: 1,  // Fade in
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 90%", // Trigger when top of element hits 90% of screen
                            toggleActions: "play none none none", // Only play once
                        }
                    }
                );
            });
        });

        // Cleanup function
        return () => {
            lenis.destroy();
            ctx.revert(); // Revert GSAP animations
            gsap.ticker.remove(raf);
        };
    }, []);

    return null;
};
