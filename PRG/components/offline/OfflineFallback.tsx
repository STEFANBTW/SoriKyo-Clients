'use client';

import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useAccessibilityStore } from '@/store/accessibility';

/**
 * Offline Fallback Component
 * Feature 4: L3 Offline Resilience - "Ghost Mode"
 */

interface OfflineFallbackProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    showBanner?: boolean;
}

export function OfflineFallback({
    children,
    fallback,
    showBanner = true
}: OfflineFallbackProps) {
    const { isOnline, wasOffline } = useOnlineStatus();
    const { reducedMotion } = useAccessibilityStore();

    // Show reconnection message when back online
    if (wasOffline && isOnline) {
        return (
            <>
                <div
                    className={`fixed top-0 left-0 right-0 z-50 bg-emerald-600 text-white text-center py-2 px-4 ${reducedMotion ? '' : 'animate-slideDown'
                        }`}
                >
                    ✓ Connection restored
                </div>
                {children}
            </>
        );
    }

    // Show offline banner if configured
    if (!isOnline && showBanner) {
        return (
            <>
                <div className="fixed top-0 left-0 right-0 z-50 bg-amber-600 text-white text-center py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L9 9" />
                        </svg>
                        <span>{"You're offline - Some features may be limited"}</span>
                    </div>
                </div>
                <div className="pt-12">
                    {fallback || children}
                </div>
            </>
        );
    }

    return <>{children}</>;
}

/**
 * Offline-aware booking button
 * Shows "Call to Book" when offline instead of online booking
 */
interface OfflineBookingButtonProps {
    phoneNumber?: string;
    className?: string;
    onlineLabel?: string;
    offlineLabel?: string;
}

export function OfflineBookingButton({
    phoneNumber = '+2348001234567',
    className = '',
    onlineLabel = 'Book Now',
    offlineLabel = 'Call to Book',
}: OfflineBookingButtonProps) {
    const { isOnline } = useOnlineStatus();
    const { reducedMotion } = useAccessibilityStore();

    if (!isOnline) {
        return (
            <a
                href={`tel:${phoneNumber}`}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg font-medium transition-all ${reducedMotion ? '' : 'hover:bg-amber-700 hover:scale-105'
                    } ${className}`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {offlineLabel}
            </a>
        );
    }

    return (
        <button
            className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium transition-all ${reducedMotion ? '' : 'hover:from-purple-700 hover:to-pink-700 hover:scale-105'
                } ${className}`}
        >
            {onlineLabel}
        </button>
    );
}

/**
 * Offline indicator icon for status displays
 */
export function OfflineIndicator() {
    const { isOnline } = useOnlineStatus();

    if (isOnline) return null;

    return (
        <div className="inline-flex items-center gap-1 text-amber-600 text-sm">
            <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>Offline</span>
        </div>
    );
}

export default OfflineFallback;
