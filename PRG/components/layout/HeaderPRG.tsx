'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAccessibilityStore } from '@/store/accessibility';

export const HeaderPRG = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useAccessibilityStore();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4">
            {/* Centered Container - max-width controlled for compact look */}
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
                <div className="hidden lg:flex items-center gap-8 text-sm font-light tracking-widest uppercase text-muted-foreground">
                    <Link href="/" className="hover:text-prg-secondary transition-colors">Home</Link>
                    <Link href="/services" className="hover:text-prg-secondary transition-colors text-prg-secondary">Services</Link>
                    <Link href="/gallery" className="hover:text-prg-secondary transition-colors">Gallery</Link>
                    <Link href="/academy" className="hover:text-prg-secondary transition-colors">Academy</Link>
                    <Link href="/contact" className="hover:text-prg-secondary transition-colors">Contact</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-prg-secondary hover:bg-prg-secondary/10 transition-all"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    {/* Book Now CTA */}
                    <Link
                        href="#booking"
                        className="hidden sm:flex btn-primary text-xs tracking-widest uppercase"
                    >
                        Book Now
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-prg-secondary hover:bg-prg-secondary/10 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-full left-4 right-4 mt-2 glass-noir rounded-2xl p-6 flex flex-col gap-4 lg:hidden">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-prg-secondary">Home</Link>
                        <Link href="/services" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest uppercase text-prg-secondary">Services</Link>
                        <Link href="/gallery" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-prg-secondary">Gallery</Link>
                        <Link href="/academy" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-prg-secondary">Academy</Link>
                        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm tracking-widest uppercase text-muted-foreground hover:text-prg-secondary">Contact</Link>
                        <Link href="#booking" className="btn-primary w-full text-center text-xs tracking-widest uppercase mt-2">Book Now</Link>
                    </div>
                )}
            </nav>
        </header>
    );
};
