'use client';

import Link from 'next/link';
import { useRecentServices } from '@/hooks/useRecentServices';
import { useAccessibilityStore } from '@/store/accessibility';

/**
 * Recently Viewed Services Section
 * Feature 10: Displays last 5 viewed services using LRU cache
 */

export function RecentlyViewed() {
    const { recentServices, isLoading, hasRecent, clearRecent } = useRecentServices();
    const { reducedMotion } = useAccessibilityStore();

    if (isLoading || !hasRecent) return null;

    const categoryColors: Record<string, string> = {
        hair: 'from-purple-500 to-pink-500',
        spa: 'from-teal-500 to-emerald-500',
        nails: 'from-rose-500 to-red-500',
        aesthetics: 'from-blue-500 to-indigo-500',
    };

    return (
        <section className="py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-white">Recently Viewed</h2>
                    <button
                        onClick={clearRecent}
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Clear
                    </button>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {recentServices.map((service, index) => (
                        <Link
                            key={service.id}
                            href={`/services/${service.category}/${service.id}`}
                            className={`flex-shrink-0 group ${reducedMotion ? '' : 'transition-transform hover:scale-105'
                                }`}
                            style={{
                                animationDelay: reducedMotion ? '0ms' : `${index * 100}ms`
                            }}
                        >
                            <div className="w-48 h-28 rounded-xl overflow-hidden relative glass-noir">
                                {/* Gradient background based on category */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${categoryColors[service.category] || 'from-gray-600 to-gray-800'
                                        } opacity-80`}
                                />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-end p-3">
                                    <span className="text-xs text-white/70 uppercase tracking-wide">
                                        {service.category}
                                    </span>
                                    <h3 className="text-sm font-medium text-white line-clamp-2">
                                        {service.name}
                                    </h3>
                                    {service.price && (
                                        <span className="text-xs text-white/80 mt-1">
                                            ₦{service.price.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* Hover overlay */}
                                <div className={`absolute inset-0 bg-white/10 opacity-0 ${reducedMotion ? '' : 'group-hover:opacity-100 transition-opacity'
                                    }`} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RecentlyViewed;
