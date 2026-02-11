'use client';

import React from 'react';
import Image from 'next/image';
import { Footer } from "@/components/layout/Footer";

// Section Components (Internal for now, can extract later)

const HairHero = () => (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-background via-background to-prg-primary/10 overflow-hidden pt-20">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up z-10">
                <h1 className="text-6xl md:text-8xl font-serif leading-tight">
                    Fall in <span className="text-prg-secondary">Love</span><br />
                    With Your <span className="italic font-light">Hair</span>
                </h1>
                <p className="text-text-secondary text-lg max-w-lg leading-relaxed">
                    Discover our premium quality hair extensions and treatments designed for the modern royal who values luxury and versatility.
                </p>
                <div className="flex gap-8 items-center pt-4">
                    <button className="btn-primary px-8 py-4 text-sm tracking-widest uppercase">
                        View Styling &rarr;
                    </button>
                    <div className="flex gap-8 text-center">
                        <div><span className="block text-2xl font-bold font-serif">30+</span><span className="text-[10px] uppercase tracking-widest text-text-muted">Awards</span></div>
                        <div><span className="block text-2xl font-bold font-serif">75+</span><span className="text-[10px] uppercase tracking-widest text-text-muted">Stylists</span></div>
                        <div><span className="block text-2xl font-bold font-serif">5k+</span><span className="text-[10px] uppercase tracking-widest text-text-muted">Clients</span></div>
                    </div>
                </div>
            </div>
            {/* Right Image */}
            <div className="relative h-[600px] w-full lg:w-[500px] lg:ml-auto">
                {/* Decorative Circle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-prg-secondary/20 to-prg-primary/20 rounded-full blur-3xl transform scale-90"></div>
                <img
                    src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1920"
                    alt="Luxury Hair Model"
                    className="relative w-full h-full object-cover rounded-t-[10rem] rounded-b-[2rem] shadow-2xl z-10 border border-white/10"
                />
            </div>
        </div>
        {/* Abstract Shapes */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-prg-primary/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/3 translate-x-1/3"></div>

        {/* Floating Image Grid */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 hidden md:block">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-5 gap-4">
                    {[0, 1, 2, 3, 4].map((item) => (
                        <div key={item} className="h-40 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <img
                                src={`https://images.pexels.com/photos/${3065170 + item}/pexels-photo-${3065170 + item}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                                alt={`Style ${item}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const ExperienceSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-serif mb-6">A Royal Hair<br />Experience Like No Other</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <p className="text-text-secondary leading-relaxed">
                    At PRG, we believe hair is your crowning glory. Our master stylists bring you a range of high-quality treatments made from 100% passion. For more than 10 years, the beauty world has recognized us for helping you find the look that truly represents you.
                </p>
                <p className="text-text-secondary leading-relaxed">
                    Whether you want silky straight, voluminous curls, or a bold new color, our expert tips and system will help you make the right choice. Our experts are licensed cosmetologists, professional hairstylists, and lovers of all things beauty.
                </p>
            </div>
        </div>
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 h-[400px]">
            {[0, 1, 2, 3, 4].map((item) => (
                <div key={item} className="relative h-full overflow-hidden group">
                    {/* Overlay */}
                    <div className={`absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity duration-300 ${['bg-orange-500', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'][item]}`}></div>
                    <img
                        src={`https://images.pexels.com/photos/${3065170 + item}/pexels-photo-${3065170 + item}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                        alt={`Style ${item}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            ))}
        </div>
    </section>
);

const KnownForSection = () => (
    <section className="py-32 bg-prg-primary/5 relative">
        <div className="container mx-auto px-6 text-center mb-16">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-prg-secondary">Our Standards</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4">What We&apos;re Known For</h2>
        </div>

        <div className="container mx-auto px-6 relative flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Center Image */}
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-8 border-background shadow-2xl z-10">
                <img src="https://images.pexels.com/photos/3065173/pexels-photo-3065173.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Center" className="w-full h-full object-cover" />
            </div>

            {/* Floating Items - Simplified Layout for Flex */}
            <div className="absolute inset-0 pointer-events-none hidden md:block">
                {/* Top Left */}
                <div className="absolute top-10 left-[20%] max-w-xs text-right">
                    <h3 className="font-serif text-xl mb-2">Be Who You Want</h3>
                    <p className="text-xs text-text-secondary">Express your inner self with our customizable styling options.</p>
                </div>
                {/* Top Right */}
                <div className="absolute top-10 right-[20%] max-w-xs text-left">
                    <h3 className="font-serif text-xl mb-2">Modern Royal Values</h3>
                    <p className="text-xs text-text-secondary">We treat every client with the respect and dignity of royalty.</p>
                </div>
                {/* Bottom Left */}
                <div className="absolute bottom-10 left-[20%] max-w-xs text-right">
                    <h3 className="font-serif text-xl mb-2">Audacious Satisfaction</h3>
                    <p className="text-xs text-text-secondary">We guarantee you won&apos;t just like your look, you&apos;ll be obsessed.</p>
                </div>
                {/* Bottom Right */}
                <div className="absolute bottom-10 right-[20%] max-w-xs text-left">
                    <h3 className="font-serif text-xl mb-2">Wellness Ecstasy</h3>
                    <p className="text-xs text-text-secondary">Relaxation is part of the process. Enjoy our scalp massages.</p>
                </div>
            </div>
        </div>
    </section>
);

const ChooseStyleSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-8">
                    <h2 className="text-4xl font-serif leading-tight">Choose Your<br />Style By<br /><span className="text-prg-secondary">Category</span></h2>
                    <ul className="space-y-4 text-sm tracking-widest uppercase">
                        {['Natural', 'Weaves', 'Extensions', 'Wigs', 'Braiding'].map((cat, i) => (
                            <li key={cat} className={`cursor-pointer hover:text-prg-secondary transition-colors ${i === 0 ? 'text-prg-secondary font-bold' : 'text-text-muted'}`}>{cat}</li>
                        ))}
                    </ul>
                    <button className="btn-primary w-full py-3">View All &rarr;</button>
                </div>

                {/* Grid */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Placeholder Products */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-900">
                                <img src="https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Style" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <h3 className="font-serif text-lg">Royal Silk Press</h3>
                            <p className="text-text-secondary text-sm">$120.00</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const ColorShadeSection = () => (
    <section className="py-24 bg-gradient-to-r from-background to-prg-primary/5">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                {/* Left Image */}
                <div className="w-full lg:w-1/3">
                    <h2 className="text-5xl font-serif mb-8 leading-tight">Find Your<br />Perfect <span className="text-prg-secondary">Shade</span></h2>
                    <div className="rounded-t-full overflow-hidden h-[400px] w-[300px] mx-auto border-4 border-prg-secondary/20">
                        <img src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Back of hair" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Right Swatches */}
                <div className="w-full lg:w-2/3">
                    <div className="flex gap-8 mb-8 border-b border-white/10 pb-4">
                        {['Natural', 'Vivids', 'Pastels', 'Extensions'].map((tab, i) => (
                            <button key={tab} className={`text-sm tracking-widest uppercase pb-2 ${i === 1 ? 'text-prg-secondary border-b-2 border-prg-secondary' : 'text-text-muted hover:text-foreground'}`}>{tab}</button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Honey Blonde', color: '#FCD34D' },
                            { name: 'Emerald', color: '#10B981' },
                            { name: 'Sapphire', color: '#3B82F6' },
                            { name: 'Amethyst', color: '#8B5CF6' },
                            { name: 'Onyx', color: '#111827' },
                            { name: 'Ruby', color: '#EF4444' },
                            { name: 'Rose Gold', color: '#FB7185' },
                            { name: 'Platinum', color: '#E5E7EB' },
                        ].map((swatch) => (
                            <div key={swatch.name} className="aspect-square rounded-xl p-4 flex flex-col justify-end transition-transform hover:scale-105 cursor-pointer" style={{ backgroundColor: swatch.color }}>
                                <span className={`text-xs font-bold uppercase tracking-widest ${['Platinum', 'Honey Blonde', 'Rose Gold'].includes(swatch.name) ? 'text-black' : 'text-white'}`}>{swatch.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const BookingFormSection = () => (
    <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
            <h2 className="text-center text-4xl font-serif mb-16">Schedule your In-Haus presence</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Form */}
                <div className="glass-noir p-8 rounded-2xl border border-white/5">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-text-secondary">First Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-prg-secondary outline-none" placeholder="Jane" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-text-secondary">Last Name</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-prg-secondary outline-none" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-text-secondary">Email</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-prg-secondary outline-none" placeholder="jane@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-text-secondary">Phone</label>
                            <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-prg-secondary outline-none" placeholder="(555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-text-secondary">Message</label>
                            <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-prg-secondary outline-none h-32" placeholder="Tell us about your hair goals..."></textarea>
                        </div>
                        <button className="btn-primary w-full py-4 text-sm tracking-widest uppercase">Request Appointment</button>
                    </form>
                </div>

                {/* Right Image with Arch */}
                <div className="relative h-[600px] flex justify-center items-end">
                    <div className="absolute bottom-0 w-[80%] h-[90%] bg-gradient-to-t from-prg-secondary/20 to-transparent rounded-t-full"></div>
                    <img src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Booking Model" className="relative z-10 w-[80%] object-cover drop-shadow-2xl" />
                </div>
            </div>
        </div>
    </section>
);


export default function HairPage() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main>
                <HairHero />
                <ExperienceSection />
                <KnownForSection />
                <ChooseStyleSection />
                <ColorShadeSection />
                <BookingFormSection />
            </main>
            <Footer />
        </div>
    );
}
