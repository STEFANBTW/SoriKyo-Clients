'use client';

import React from 'react';
import Link from 'next/link';

export const FooterPRG = () => {
    return (
        <footer className="bg-text-primary text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="18" fill="url(#footer-logo-gradient)" opacity="0.2" />
                                <path d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 28C15.589 28 12 24.411 12 20C12 15.589 15.589 12 20 12C24.411 12 28 15.589 28 20C28 24.411 24.411 28 20 28Z" fill="url(#footer-logo-gradient)" />
                                <path d="M20 14C17.794 14 16 15.794 16 18C16 20.206 17.794 22 20 22C22.206 22 24 20.206 24 18C24 15.794 22.206 14 20 14Z" fill="url(#footer-logo-gradient)" />
                                <defs>
                                    <linearGradient id="footer-logo-gradient" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stop-color="#A78BFA" />
                                        <stop offset="100%" stop-color="#F59E0B" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div>
                                <h3 className="font-headline text-xl font-bold">Purple Rain Galore</h3>
                                <p className="text-sm text-white/70">Beauty Without Boundaries</p>
                            </div>
                        </div>
                        <p className="font-body text-white/70 text-sm">
                            Where artistry meets expertise. Your transformation, our passion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-cta font-semibold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="font-body text-white/70 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/services" className="font-body text-white/70 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/gallery" className="font-body text-white/70 hover:text-white transition-colors">Gallery</Link></li>
                            <li><Link href="/#about" className="font-body text-white/70 hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-cta font-semibold text-lg mb-4">Our Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="/services#barbing" className="font-body text-white/70 hover:text-white transition-colors">Barbing Excellence</Link></li>
                            <li><Link href="/services#hair-artistry" className="font-body text-white/70 hover:text-white transition-colors">Hair Artistry Studio</Link></li>
                            <li><Link href="/services#hair-spa" className="font-body text-white/70 hover:text-white transition-colors">Hair Spa Sanctuary</Link></li>
                            <li><Link href="/services#nail-studio" className="font-body text-white/70 hover:text-white transition-colors">Nail Studio Luxury</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-cta font-semibold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="font-body text-white/70 text-sm">123 Beauty Boulevard, Style City, SC 12345</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="font-body text-white/70 text-sm">(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="font-body text-white/70 text-sm">hello@purpleraingalore.com</span>
                            </li>
                        </ul>
                        <div className="flex gap-3 mt-4">
                            {/* Social Icons would go here, simplified for now */}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center">
                    <p className="font-body text-white/70 text-sm">
                        © 2026 Purple Rain Galore. All Rights Reserved. |
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link> |
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};
