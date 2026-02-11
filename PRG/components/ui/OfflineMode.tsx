'use client';

import { useNetworkStatus } from '@/hooks/useNetworkStatus';

/**
 * Feature 4: Offline Ghost Mode
 * Shows a subtle, non-intrusive banner when offline
 * Indicates which features are available/unavailable
 */

export function OfflineBanner() {
    const { status } = useNetworkStatus();

    if (status === 'online') return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-900/90 backdrop-blur-lg border border-white/10 shadow-xl">
                {/* Ghost Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                    <span className="text-xl opacity-80">👻</span>
                </div>

                {/* Message */}
                <div>
                    <p className="text-sm font-medium text-white">Ghost Mode Active</p>
                    <p className="text-xs text-white/60">
                        Limited features &bull; Browse cached content
                    </p>
                </div>

                {/* Pulse indicator */}
                <div className="relative ml-2">
                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-amber-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-500" />
                </div>
            </div>
        </div>
    );
}

/**
 * Wrapper component that shows offline placeholder for features
 * that require network connectivity
 */
interface OfflineGateProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    featureName?: string;
}

export function OfflineGate({ children, fallback, featureName = 'This feature' }: OfflineGateProps) {
    const { status } = useNetworkStatus();

    if (status === 'offline') {
        return (
            fallback || (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <span className="text-3xl opacity-60">📡</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                        You&apos;re Offline
                    </h3>
                    <p className="text-sm text-white/60 max-w-xs">
                        {featureName} requires an internet connection.
                        Please reconnect to continue.
                    </p>
                </div>
            )
        );
    }

    return <>{children}</>;
}

/**
 * Slow connection warning component
 */
export function SlowConnectionBanner() {
    const { quality, saveData } = useNetworkStatus();

    if (quality !== 'slow' && !saveData) return null;

    return (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 backdrop-blur-lg border border-amber-500/30">
                <span className="text-sm">🐢</span>
                <p className="text-xs font-medium text-amber-300">
                    {saveData ? 'Data Saver enabled' : 'Slow connection'} &bull; Reduced quality
                </p>
            </div>
        </div>
    );
}

/**
 * CSS for animations (add to globals.css or use Tailwind config)
 * 
 * @keyframes slide-up {
 *   from { transform: translateX(-50%) translateY(100%); opacity: 0; }
 *   to { transform: translateX(-50%) translateY(0); opacity: 1; }
 * }
 * .animate-slide-up { animation: slide-up 0.3s ease-out; }
 */
