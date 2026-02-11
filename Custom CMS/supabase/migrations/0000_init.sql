-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the documents table (The Content Lake)
-- This single table stores ALL content types as JSONB documents.
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  _type VARCHAR(255) NOT NULL, -- e.g., 'product', 'author', 'post'
  _createdAt TIMESTAMPTZ DEFAULT NOW(),
  _updatedAt TIMESTAMPTZ DEFAULT NOW(),
  _rev VARCHAR(255), -- Revision hash for conflict resolution (Y.js)
  content JSONB NOT NULL, -- The Data Payload: Stores all fields
  fts tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED -- Full Text Search
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(_type);
CREATE INDEX IF NOT EXISTS idx_documents_gin ON documents USING gin (content);
