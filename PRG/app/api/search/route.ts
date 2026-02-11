import { NextRequest, NextResponse } from 'next/server';
import { searchServicesSemanticRPC } from '@/lib/embeddings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Semantic Search API Route
 * Feature 28: "Vibe" Search - Find services by mood/description
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query, threshold = 0.6, limit = 5 } = body;

        if (!query) {
            return NextResponse.json(
                { error: 'Missing query parameter' },
                { status: 400 }
            );
        }

        const results = await searchServicesSemanticRPC(query, { threshold, limit });

        return NextResponse.json({
            success: true,
            query,
            results: results || [],
            count: results?.length || 0,
        });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Search failed' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const threshold = parseFloat(searchParams.get('threshold') || '0.6');
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!query) {
        return NextResponse.json({
            message: 'Semantic Search API (Feature 28: Vibe Search)',
            usage: {
                GET: '/api/search?q=relaxing+massage&threshold=0.6&limit=5',
                POST: { query: 'string', threshold: 0.6, limit: 5 },
            },
            examples: [
                'something relaxing and luxurious',
                'I want to feel pampered',
                'quick nail fix before event',
                'deep cleansing for acne',
            ],
        });
    }

    try {
        const results = await searchServicesSemanticRPC(query, { threshold, limit });

        return NextResponse.json({
            success: true,
            query,
            results: results || [],
            count: results?.length || 0,
        });
    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Search failed' },
            { status: 500 }
        );
    }
}
