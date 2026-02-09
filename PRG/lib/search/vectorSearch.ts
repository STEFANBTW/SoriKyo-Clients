import { embeddingModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export interface SearchResult {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    similarity: number;
}

export async function vectorSearch(query: string, matchThreshold = 0.6, limit = 5): Promise<SearchResult[]> {
    try {
        // 1. Generate Query Embedding
        const embeddingResult = await embeddingModel.embedContent(query);
        const embedding = embeddingResult.embedding.values;

        // 2. Search Database
        const { data, error } = await supabase.rpc('match_products', {
            query_embedding: embedding,
            match_threshold: matchThreshold,
            match_count: limit,
        });

        if (error) {
            console.error('Vector Search Error:', error);
            throw error;
        }

        return data as SearchResult[];
    } catch (error) {
        console.error('Vibe Search Failed:', error);
        return [];
    }
}
