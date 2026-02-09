'use client';

import React from 'react';
import Link from 'next/link';

export const MasterArtists = () => {
    return (
        <section id="artists" className="py-24 bg-transparent relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -left-20 top-40 w-64 h-64 bg-prg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -right-20 bottom-40 w-64 h-64 bg-prg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                        Meet Our Master Artists
                    </h2>
                    <p className="font-sans text-lg text-foreground/80 font-medium max-w-2xl mx-auto">
                        Our team of certified professionals brings years of expertise and passion to every transformation
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Artist 1 */}
                    <div className="text-center group glass-noir p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-prg-primary/20">
                        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-prg-primary/10 group-hover:border-prg-primary/40 transition-all duration-300 shadow-xl">
                            <img
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1e715e3e1-1763300331765.png"
                                alt="Portrait of Marcus Chen, senior hair stylist"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-prg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-white uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-prg-primary transition-colors cursor-pointer">
                                    View Portfolio
                                </span>
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">Marcus Chen</h3>
                        <p className="font-sans text-prg-secondary font-medium uppercase tracking-wider text-xs mb-3">Senior Stylist & Colorist</p>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                            12+ years of experience in creative coloring and precision cutting
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-prg-primary/5 text-prg-primary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-primary/10">Color Expert</span>
                            <span className="px-3 py-1 bg-prg-secondary/5 text-prg-secondary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-secondary/10">Balayage</span>
                        </div>
                    </div>

                    {/* Artist 2 */}
                    <div className="text-center group glass-noir p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-prg-secondary/20">
                        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-prg-secondary/10 group-hover:border-prg-secondary/40 transition-all duration-300 shadow-xl">
                            <img
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1220ca655-1763300331937.png"
                                alt="Portrait of Sophia Rodriguez, master barber"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-prg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-white uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-prg-secondary transition-colors cursor-pointer">
                                    View Portfolio
                                </span>
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">Sophia Rodriguez</h3>
                        <p className="font-sans text-prg-secondary font-medium uppercase tracking-wider text-xs mb-3">Master Barber</p>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                            Award-winning barber specializing in classic and contemporary cuts
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-prg-primary/5 text-prg-primary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-primary/10">Fade Specialist</span>
                            <span className="px-3 py-1 bg-prg-secondary/5 text-prg-secondary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-secondary/10">Beard Artist</span>
                        </div>
                    </div>

                    {/* Artist 3 */}
                    <div className="text-center group glass-noir p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-prg-accent/20">
                        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-prg-accent/10 group-hover:border-prg-accent/40 transition-all duration-300 shadow-xl">
                            <img
                                src="https://img.rocket.new/generatedImages/rocket_gen_img_1710d3222-1763298672152.png"
                                alt="Portrait of Jordan Kim, nail artist"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-prg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-xs font-bold text-white uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-prg-primary transition-colors cursor-pointer">
                                    View Portfolio
                                </span>
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">Jordan Kim</h3>
                        <p className="font-sans text-prg-secondary font-medium uppercase tracking-wider text-xs mb-3">Nail Artist & Therapist</p>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                            Certified nail technician with expertise in artistic designs and wellness
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <span className="px-3 py-1 bg-prg-primary/5 text-prg-primary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-primary/10">Nail Art</span>
                            <span className="px-3 py-1 bg-prg-secondary/5 text-prg-secondary text-[10px] uppercase font-bold tracking-wider rounded-full border border-prg-secondary/10">Spa Therapy</span>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link href="/about" className="btn-secondary inline-block text-prg-secondary hover:text-white dark:text-prg-secondary dark:hover:text-white border-prg-secondary hover:bg-prg-secondary transition-colors">Meet Our Full Team</Link>
                </div>
            </div>
        </section>
    );
};
