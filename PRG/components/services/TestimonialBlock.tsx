'use client';

import React from 'react';
import Image from 'next/image';

interface TestimonialBlockProps {
    quote: string;
    author: string;
    role: string;
    image: string;
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
    quote,
    author,
    role,
    image
}) => {
    return (
        <div className="card-elevated max-w-4xl mx-auto my-16 bg-white dark:bg-white/5 border border-prg-primary/10 p-8 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                        src={image}
                        alt={author}
                        fill
                        className="rounded-full object-cover border-2 border-prg-secondary"
                    />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex gap-1 justify-center md:justify-start mb-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} className="w-5 h-5 text-prg-accent fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <p className="font-serif text-lg italic text-foreground/80 mb-4 leading-relaxed">
                        &quot;{quote}&quot;
                    </p>
                    <div>
                        <p className="font-sans font-bold text-foreground">{author}</p>
                        <p className="font-sans text-sm text-prg-secondary">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
