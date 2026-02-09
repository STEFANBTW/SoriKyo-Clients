'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center space-y-6 font-sans">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4 animate-pulse">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-4xl font-serif tracking-tight">System-Wide Dissolution</h1>
                <p className="text-foreground/50 max-w-lg font-light leading-relaxed">
                    A critical failure occurred in the root architecture. The spa's structural integrity has been compromised.
                    <span className="block mt-4 p-4 bg-white/5 rounded-xl font-mono text-[10px] text-red-400/80 border border-white/5">
                        {error.digest || error.message || 'Unknown Protocol Violation'}
                    </span>
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => reset()}
                        className="px-8 py-4 bg-emerald text-slate-900 rounded-full text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                        Re-Initialize Root
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all"
                    >
                        Force Refresh
                    </button>
                </div>
            </body>
        </html>
    );
}
