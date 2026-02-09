'use client';

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
            <div className="relative w-24 h-24">
                {/* Serenity Spa Loading Motif */}
                <div className="absolute inset-0 border-t-2 border-emerald rounded-full animate-spin"></div>
                <div className="absolute inset-4 border-b-2 border-gold rounded-full animate-spin-slow opacity-50"></div>
            </div>
            <p className="mt-8 text-[10px] font-bold tracking-[0.5em] uppercase text-emerald animate-pulse">Synchronizing Serenity...</p>
        </div>
    );
}
