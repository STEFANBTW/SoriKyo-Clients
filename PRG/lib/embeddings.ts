/**
 * Embeddings Utility
 * Features 17 & 18: Vector embedding generation and management
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Admin client for embedding operations
// Safe initialization to prevent build failures if env vars are missing
const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

export interface EmbeddingResult {
    embedding: number[];
    model: string;
    usage?: {
        prompt_tokens: number;
        total_tokens: number;
    };
}

/**
 * Generate embedding using Gemini API
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY not configured');
    }

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'models/text-embedding-004',
                content: { parts: [{ text }] },
                taskType: 'SEMANTIC_SIMILARITY',
            }),
        }
    );

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Embedding API error: ${error}`);
    }

    const data = await response.json();
    return data.embedding.values;
}

/**
 * Store service embedding
 */
export async function storeServiceEmbedding(service: {
    id: string;
    name: string;
    category: string;
    description?: string;
    price?: number;
}) {
    // Create text for embedding - combine all relevant fields
    const textForEmbedding = [
        service.name,
        service.category,
        service.description || '',
        service.price ? `Price: ₦${service.price}` : '',
    ]
        .filter(Boolean)
        .join('. ');

    const embedding = await generateEmbedding(textForEmbedding);

    if (!supabaseAdmin) throw new Error('Supabase Admin client not initialized');

    const { error } = await supabaseAdmin.from('service_embeddings').upsert({
        service_id: service.id,
        service_name: service.name,
        category: service.category,
        description: service.description,
        price: service.price,
        embedding,
        updated_at: new Date().toISOString(),
    });

    if (error) throw error;
}

/**
 * Store knowledge embedding for RAG
 */
export async function storeKnowledgeEmbedding(knowledge: {
    contentType: string;
    title: string;
    content: string;
    metadata?: Record<string, unknown>;
}) {
    const textForEmbedding = `${knowledge.title}. ${knowledge.content}`;
    const embedding = await generateEmbedding(textForEmbedding);

    if (!supabaseAdmin) throw new Error('Supabase Admin client not initialized');

    const { error } = await supabaseAdmin.from('knowledge_embeddings').upsert({
        content_type: knowledge.contentType,
        title: knowledge.title,
        content: knowledge.content,
        embedding,
        metadata: knowledge.metadata || {},
        updated_at: new Date().toISOString(),
    });

    if (error) throw error;
}

/**
 * Semantic search for services (Feature 28: Vibe Search)
 */
export async function searchServicesSemanticRPC(
    queryText: string,
    options: { threshold?: number; limit?: number } = {}
) {
    const { threshold = 0.7, limit = 5 } = options;
    const queryEmbedding = await generateEmbedding(queryText);

    if (!supabaseAdmin) throw new Error('Supabase Admin client not initialized');

    const { data, error } = await supabaseAdmin.rpc('search_services', {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit,
    });

    if (error) throw error;
    return data;
}

/**
 * RAG context retrieval (Feature 23)
 */
export async function getRAGContext(
    query: string,
    options: { contentTypes?: string[]; threshold?: number; limit?: number } = {}
) {
    const { contentTypes = null, threshold = 0.6, limit = 3 } = options;
    const queryEmbedding = await generateEmbedding(query);

    if (!supabaseAdmin) throw new Error('Supabase Admin client not initialized');

    const { data, error } = await supabaseAdmin.rpc('search_knowledge', {
        query_embedding: queryEmbedding,
        content_types: contentTypes,
        match_threshold: threshold,
        match_count: limit,
    });

    if (error) throw error;

    // Format as context for AI
    if (!data || data.length === 0) return '';

    return data
        .map(
            (item: { title: string; content: string }) =>
                `[${item.title}]: ${item.content}`
        )
        .join('\n\n');
}

export default {
    generateEmbedding,
    storeServiceEmbedding,
    storeKnowledgeEmbedding,
    searchServicesSemanticRPC,
    getRAGContext,
};
