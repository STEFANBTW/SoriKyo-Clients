'use client';

import React from 'react';

export const TrustBadges = () => {
    return (
        <section id="trust-badges" className="py-12 bg-prg-primary/5 border-y border-prg-primary/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {/* Award Winning */}
                    <div className="text-center group">
                        <div className="w-16 h-16 mx-auto mb-3 bg-prg-primary/10 rounded-full flex items-center justify-center group-hover:bg-prg-primary/20 transition-colors duration-300">
                            <svg className="w-8 h-8 text-prg-primary" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <p className="font-serif font-semibold text-foreground text-lg">Award Winning</p>
                        <p className="text-sm text-muted-foreground">2025 Excellence</p>
                    </div>

                    {/* Certified Experts */}
                    <div className="text-center group">
                        <div className="w-16 h-16 mx-auto mb-3 bg-prg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-prg-secondary/20 transition-colors duration-300">
                            <svg className="w-8 h-8 text-prg-secondary" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="font-serif font-semibold text-foreground text-lg">Certified Experts</p>
                        <p className="text-sm text-muted-foreground">Licensed Professionals</p>
                    </div>

                    {/* 10,000+ Clients */}
                    <div className="text-center group">
                        <div className="w-16 h-16 mx-auto mb-3 bg-prg-accent/10 rounded-full flex items-center justify-center group-hover:bg-prg-accent/20 transition-colors duration-300">
                            <svg className="w-8 h-8 text-prg-accent" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                        </div>
                        <p className="font-serif font-semibold text-foreground text-lg">10,000+ Clients</p>
                        <p className="text-sm text-muted-foreground">Trusted Transformations</p>
                    </div>

                    {/* 100% Satisfaction */}
                    <div className="text-center group">
                        <div className="w-16 h-16 mx-auto mb-3 bg-emerald-500/10 rounded-full flex items-center justify-center group-hover:bg-emerald/20 transition-colors duration-300">
                            <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="font-serif font-semibold text-foreground text-lg">100% Satisfaction</p>
                        <p className="text-sm text-muted-foreground">Guaranteed Results</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
