'use client';

import { useState, useCallback } from 'react';
import { useAccessibilityStore } from '@/store/accessibility';

/**
 * Vibe Search Component
 * Feature 28: Semantic search by mood/feeling
 */

interface SearchResult {
    service_id: string;
    service_name: string;
    category: string;
    description: string;
    price: number;
    similarity: number;
}

export function VibeSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const { reducedMotion, plainLanguage } = useAccessibilityStore();

    const vibeExamples = [
        'something relaxing and luxurious',
        'I want to feel pampered',
        'quick fix before an event',
        'deep cleansing treatment',
        'bold and dramatic look',
    ];

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return;

        setIsSearching(true);
        setHasSearched(true);

        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, threshold: 0.5, limit: 6 }),
            });

            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    }, [query]);

    const handleExampleClick = (example: string) => {
        setQuery(example);
        // Trigger search after setting query
        setTimeout(() => {
            handleSearch();
        }, 100);
    };

    const categoryColors: Record<string, string> = {
        hair: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        spa: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        nails: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        aesthetics: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Search input */}
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder={plainLanguage ? 'What mood are you in?' : 'Describe how you want to feel...'}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-lg"
                />
                <button
                    onClick={handleSearch}
                    disabled={isSearching || !query.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium disabled:opacity-50 ${reducedMotion ? '' : 'transition-all hover:scale-105'
                        }`}
                >
                    {isSearching ? (
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Example vibes */}
            {!hasSearched && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <span className="text-white/60 text-sm">Try:</span>
                    {vibeExamples.map((example) => (
                        <button
                            key={example}
                            onClick={() => handleExampleClick(example)}
                            className={`px-3 py-1 rounded-full text-sm bg-white/5 text-white/70 border border-white/10 ${reducedMotion ? '' : 'hover:bg-white/10 hover:text-white transition-colors'
                                }`}
                        >
                            {example}
                        </button>
                    ))}
                </div>
            )}

            {/* Results */}
            {hasSearched && (
                <div className="mt-6">
                    {results.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2">
                            {results.map((result, index) => (
                                <div
                                    key={result.service_id}
                                    className={`p-4 rounded-xl glass-noir border border-white/10 ${reducedMotion ? '' : 'transition-all hover:scale-[1.02] hover:border-white/20'
                                        }`}
                                    style={{ animationDelay: reducedMotion ? '0ms' : `${index * 100}ms` }}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-semibold text-white">{result.service_name}</h3>
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs border ${categoryColors[result.category] || 'bg-gray-500/20 text-gray-300'
                                                }`}
                                        >
                                            {result.category}
                                        </span>
                                    </div>
                                    {result.description && (
                                        <p className="text-sm text-white/70 mb-3 line-clamp-2">{result.description}</p>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-white">
                                            ₦{result.price?.toLocaleString() || 'TBD'}
                                        </span>
                                        <span className="text-xs text-white/50">
                                            {Math.round(result.similarity * 100)}% match
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-white/60">
                                {plainLanguage
                                    ? 'No services found. Try different words.'
                                    : 'No matching vibes found. Try describing your mood differently.'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VibeSearch;
