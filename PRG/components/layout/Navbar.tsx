'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccessibilityStore } from '@/store/accessibility';
import { useUIStore } from '@/store/ui';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { theme, toggleTheme } = useAccessibilityStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Creative hover effect: Gradient text clip on hover + scale
    const linkClass = "relative text-sm font-bold tracking-widest uppercase text-prg-primary dark:text-white/90 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-prg-secondary hover:to-prg-accent hover:scale-105 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-prg-secondary after:to-prg-accent after:transition-all after:duration-300 hover:after:w-full";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
            <nav
                className={`max-w-5xl mx-auto transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between border ${scrolled
                    ? 'glass-noir border-border shadow-lg'
                    : 'bg-transparent border-transparent'
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm ring-2 ring-prg-primary/20 group-hover:ring-prg-secondary/30 transition-all">
                        PRG
                    </div>
                    <div className="hidden sm:block">
                        <span className="font-serif text-lg tracking-wider text-foreground">
                            PURPLE RAIN
                        </span>
                        <span className="font-sans text-[10px] font-light tracking-[0.25em] ml-2 text-prg-secondary">
                            GALORE
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className={linkClass}>Home</Link>

                    {/* Services Dropdown */}
                    <div className="relative group">
                        <Link href="/services" className={`flex items-center gap-1 py-4 ${linkClass}`}>
                            Services
                            <svg className="w-3 h-3 text-foreground/80 dark:text-white group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                        {/* Dropdown Content */}
                        <div className="absolute left-0 top-[calc(100%-10px)] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 w-48 z-50">
                            <div className="glass-noir border border-prg-secondary/20 rounded-xl overflow-hidden shadow-xl flex flex-col p-2">
                                {['Hair', 'Aesthetics', 'Nails', 'Spa', 'Academy'].map((item) => (
                                    <Link key={item} href={`/${item.toLowerCase()}`} className="px-4 py-3 text-sm tracking-widest uppercase text-muted-foreground hover:bg-prg-secondary/10 hover:text-prg-secondary transition-colors text-left rounded-lg">
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link href="/gallery" className={linkClass}>
                        Gallery
                    </Link>

                    <Link href="/contact" className={linkClass}>
                        Contact
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Book Now Button - Pill Shape */}
                    <Link
                        href="#booking-wizard-trigger"
                        className="hidden sm:flex bg-prg-primary hover:bg-prg-secondary text-white text-xs font-bold tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(209,45,146,0.5)] hover:scale-105 active:scale-95"
                    >
                        Book Now
                    </Link>

                    {/* AI Assistant Button - Circular with Sine Wave */}
                    <button
                        onClick={() => useUIStore.getState().openWidget('gemini')}
                        className="w-12 h-12 rounded-full bg-prg-primary hover:bg-prg-secondary text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(209,45,146,0.5)] hover:rotate-12 group"
                        aria-label="Ask AI Assistant"
                    >
                        {/* Sinusoidal Wave Icon */}
                        <svg className="w-6 h-6 group-hover:animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12c.6 0 1.2-.4 1.6-.8l.8-1.6c.8-1.6 2.4-1.6 3.2 0l.8 1.6c.4.4 1 .8 1.6.8s1.2-.4 1.6-.8l.8-1.6c.8-1.6 2.4-1.6 3.2 0l.8 1.6c.4.4 1 .8 1.6.8s1.2-.4 1.6-.8l.8-1.6c.8-1.6 2.4-1.6 3.2 0l.8 1.6c.4.4 1 .8 1.6.8" />
                        </svg>
                    </button>

                    <button
                        className="md:hidden p-2 text-prg-secondary hover:bg-prg-secondary/10 rounded-lg transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {mobileOpen && (
                    <div className="absolute top-full left-4 right-4 mt-2 glass-noir rounded-2xl p-6 flex flex-col gap-4 md:hidden border border-white/10 shadow-2xl z-50">
                        <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm tracking-widest uppercase text-foreground hover:text-prg-secondary">Home</Link>
                        <div className="space-y-2">
                            <Link href="/services" onClick={() => setMobileOpen(false)} className="block text-sm tracking-widest uppercase text-foreground hover:text-prg-secondary mb-2">Services</Link>
                            <div className="pl-4 border-l border-white/10 space-y-2">
                                {['Hair', 'Aesthetics', 'Nails', 'Spa', 'Academy'].map((item) => (
                                    <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block text-xs uppercase tracking-widest text-muted-foreground hover:text-prg-secondary">{item}</Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/gallery" onClick={() => setMobileOpen(false)} className="text-sm tracking-widest uppercase text-foreground hover:text-prg-secondary">Gallery</Link>
                        <Link href="/contact" onClick={() => setMobileOpen(false)} className="text-sm tracking-widest uppercase text-foreground hover:text-prg-secondary">Contact</Link>
                        <Link href="#booking-wizard-trigger" className="btn-primary w-full text-center text-xs tracking-widest uppercase mt-2">Book Now</Link>
                    </div>
                )}
            </nav>
        </header >
    );
};
