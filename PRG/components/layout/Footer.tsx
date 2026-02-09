'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="w-full bg-slate-950 border-t border-prg-primary/20 py-16 px-6 mt-24 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-prg-secondary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-prg-primary/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {/* Brand Column */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm ring-2 ring-prg-primary/20">
                            PRG
                        </div>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-[#E0AAFF] tracking-wide">Purple Rain Galore</h3>
                            <p className="text-xs text-white/70 uppercase tracking-widest">Beauty Without Boundaries</p>
                        </div>
                    </div>
                    <p className="text-white/60 max-w-sm font-light leading-relaxed text-sm">
                        Where artistry meets expertise. Experience luxury beauty services in an inclusive sanctuary where your transformation is our passion.
                    </p>
                    {/* Socials hardcoded for visual appeal */}
                    <div className="flex gap-4">
                        {[1, 2, 3].map(i => (
                            <Link key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-prg-secondary hover:border-prg-secondary transition-all duration-300 group">
                                <div className="w-4 h-4 rounded-sm bg-white/40 group-hover:bg-white transition-colors"></div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                    <h4 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-[#E0AAFF]">Quick Links</h4>
                    <ul className="space-y-3 text-sm font-light text-white/60">
                        <li><Link href="/" className="hover:text-prg-accent transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-prg-accent transition-colors">Services</Link></li>
                        <li><Link href="/gallery" className="hover:text-prg-accent transition-colors">Gallery</Link></li>
                        <li><Link href="/about" className="hover:text-prg-accent transition-colors">About Us</Link></li>
                    </ul>
                </div>

                {/* Services & Contact Combined (for space efficiency) */}
                <div className="space-y-6">
                    <h4 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-[#E0AAFF]">Contact Us</h4>
                    <ul className="space-y-4 text-sm font-light text-white/60">
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-prg-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>123 Beauty Boulevard,<br />Style City, SC 12345</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-prg-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>(555) 123-4567</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-prg-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>hello@purpleraingalore.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-white/30 font-sans">
                <p>&copy; 2026 PURPLE RAIN GALORE. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};
