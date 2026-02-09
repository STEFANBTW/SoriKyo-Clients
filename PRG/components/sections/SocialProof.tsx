'use client';

import React from 'react';

const TESTIMONIALS = [
    {
        id: 1,
        quote: "The intersection of bioluminescent design and clinical skill is unmatched. This isn't just a spa; it's a recalibration.",
        author: "Elena V.",
        role: "System Architect"
    },
    {
        id: 2,
        quote: "Finally, a sanctuary that understands the toll of the digital world. The Neural Reset protocol is life-changing.",
        author: "Markus S.",
        role: "Impact Lead"
    }
];

export const SocialProof = () => {
    return (
        <section id="testimonials" className="w-full py-32 px-6 max-w-5xl mx-auto text-center space-y-24">
            <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-[0.4em] uppercase text-gold opacity-60">Client Chronicles</h2>
                <div className="h-px w-24 bg-gold/20 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="space-y-8 relative">
                        {/* Elegant large quote mark */}
                        <span className="absolute -top-10 left-0 text-7xl font-serif text-emerald/10 select-none">&ldquo;</span>
                        <p className="text-2xl font-serif italic text-foreground/80 leading-relaxed relative z-10">
                            {t.quote}
                        </p>
                        <div className="space-y-1">
                            <h4 className="font-bold text-sm tracking-widest uppercase text-emerald">{t.author}</h4>
                            <p className="text-[10px] tracking-[0.2em] font-light opacity-40 uppercase">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-12">
                <blockquote className="text-xs font-light tracking-[0.2em] opacity-30 uppercase">
                    Verified by Decentralized Serenity Protocol
                </blockquote>
            </div>
        </section>
    );
};
