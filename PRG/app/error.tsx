'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Next.js Error Boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h2 className="text-3xl font-serif">Something shifted in the serenity.</h2>
            <p className="text-foreground/50 max-w-md font-light">
                The bioluminescent intelligence encountered a synchronization error. <br />
                <span className="text-xs opacity-50 block mt-2 font-mono">[{error.digest || error.message}]</span>
            </p>
            <button
                onClick={() => reset()}
                className="px-8 py-3 bg-emerald text-slate-900 rounded-full text-xs font-bold tracking-widest uppercase hover:scale-105 transition-transform"
            >
                Attempt Recalibration
            </button>
        </div>
    );
}
