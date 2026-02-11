import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding, storeServiceEmbedding, storeKnowledgeEmbedding } from '@/lib/embeddings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Embeddings API Route
 * Features 17 & 18: Generate and store vector embeddings
 */

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing type or data' },
                { status: 400 }
            );
        }

        switch (type) {
            case 'service': {
                await storeServiceEmbedding({
                    id: data.id,
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    price: data.price,
                });
                return NextResponse.json({ success: true, type: 'service' });
            }

            case 'knowledge': {
                await storeKnowledgeEmbedding({
                    contentType: data.contentType,
                    title: data.title,
                    content: data.content,
                    metadata: data.metadata,
                });
                return NextResponse.json({ success: true, type: 'knowledge' });
            }

            case 'generate': {
                // Just generate embedding without storing
                const embedding = await generateEmbedding(data.text);
                return NextResponse.json({
                    success: true,
                    embedding,
                    dimensions: embedding.length
                });
            }

            case 'batch_services': {
                // Batch process multiple services
                const results = [];
                for (const service of data.services) {
                    await storeServiceEmbedding(service);
                    results.push({ id: service.id, success: true });
                }
                return NextResponse.json({ success: true, results });
            }

            case 'batch_knowledge': {
                // Batch process multiple knowledge items
                const results = [];
                for (const item of data.items) {
                    await storeKnowledgeEmbedding(item);
                    results.push({ title: item.title, success: true });
                }
                return NextResponse.json({ success: true, results });
            }

            default:
                return NextResponse.json(
                    { error: `Unknown type: ${type}` },
                    { status: 400 }
                );
        }
    } catch (error) {
        console.error('Embeddings API error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'Embeddings API',
        endpoints: {
            POST: {
                types: ['service', 'knowledge', 'generate', 'batch_services', 'batch_knowledge'],
                description: 'Generate and store vector embeddings',
            },
        },
    });
}
