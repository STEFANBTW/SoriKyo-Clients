'use client';

import React from 'react';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">

            <main className="pt-32 pb-20 container mx-auto px-4">
                <section className="text-center mb-16">
                    <h1 className="font-headline text-5xl md:text-6xl font-bold text-text-primary mb-6">
                        About Purple Rain Galore
                    </h1>
                    <p className="font-body text-xl text-text-secondary max-w-2xl mx-auto">
                        A sanctuary of beauty and style where excellence is the standard.
                    </p>
                </section>

                <div className="card-elevated max-w-4xl mx-auto">
                    <h2 className="font-headline text-3xl font-bold text-text-primary mb-6">Our Mission</h2>
                    <p className="font-body text-lg text-text-secondary mb-8 leading-relaxed">
                        Purple Rain Galore was founded on the principle that everyone deserves to feel extraordinary. Our mission is to provide world-class beauty services in a luxurious, inclusive environment.
                    </p>

                    <h2 className="font-headline text-3xl font-bold text-text-primary mb-6">Our Vision</h2>
                    <p className="font-body text-lg text-text-secondary leading-relaxed">
                        To redefine the salon experience through artistry, innovation, and an unwavering commitment to our clients&apos; satisfaction.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
