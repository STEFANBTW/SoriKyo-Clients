-- Migration: Add pgvector Extension and Embeddings Tables
-- Features 17 & 18: 1,536-Dimensional Vector Embeddings + pgvector Integration

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Service embeddings table for semantic search
CREATE TABLE IF NOT EXISTS service_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id TEXT UNIQUE NOT NULL,
    service_name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    price INTEGER,
    embedding vector(1536),  -- OpenAI/Gemini embedding dimension
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business knowledge embeddings for RAG
CREATE TABLE IF NOT EXISTS knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL,  -- 'faq', 'policy', 'service_info', 'hours', 'promo'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User embeddings for personalization (future use)
CREATE TABLE IF NOT EXISTS user_preference_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    preference_type TEXT NOT NULL,
    embedding vector(1536),
    context JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS idx_service_embeddings_vector 
ON service_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_knowledge_embeddings_vector 
ON knowledge_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Function for semantic service search
CREATE OR REPLACE FUNCTION search_services(
    query_embedding vector(1536),
    match_threshold FLOAT DEFAULT 0.7,
    match_count INT DEFAULT 5
)
RETURNS TABLE (
    service_id TEXT,
    service_name TEXT,
    category TEXT,
    description TEXT,
    price INTEGER,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        se.service_id,
        se.service_name,
        se.category,
        se.description,
        se.price,
        1 - (se.embedding <=> query_embedding) AS similarity
    FROM service_embeddings se
    WHERE 1 - (se.embedding <=> query_embedding) > match_threshold
    ORDER BY se.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Function for RAG context retrieval
CREATE OR REPLACE FUNCTION search_knowledge(
    query_embedding vector(1536),
    content_types TEXT[] DEFAULT NULL,
    match_threshold FLOAT DEFAULT 0.6,
    match_count INT DEFAULT 3
)
RETURNS TABLE (
    id UUID,
    content_type TEXT,
    title TEXT,
    content TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ke.id,
        ke.content_type,
        ke.title,
        ke.content,
        1 - (ke.embedding <=> query_embedding) AS similarity
    FROM knowledge_embeddings ke
    WHERE (content_types IS NULL OR ke.content_type = ANY(content_types))
      AND 1 - (ke.embedding <=> query_embedding) > match_threshold
    ORDER BY ke.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- Enable RLS
ALTER TABLE service_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preference_embeddings ENABLE ROW LEVEL SECURITY;

-- Public read access for service and knowledge embeddings
CREATE POLICY "Public read access for service embeddings"
ON service_embeddings FOR SELECT
USING (true);

CREATE POLICY "Public read access for knowledge embeddings"
ON knowledge_embeddings FOR SELECT
USING (true);

-- Users can only read their own preference embeddings
CREATE POLICY "Users can read own preference embeddings"
ON user_preference_embeddings FOR SELECT
USING (auth.uid() = user_id);
