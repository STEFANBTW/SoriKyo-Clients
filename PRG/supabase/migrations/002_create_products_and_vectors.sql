-- Enable pgvector extension
create extension if not exists vector;

-- Products Table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price decimal(10,2),
  category text,
  image_url text,
  model_url text, -- For 3D .glb files
  embedding vector(768), -- For Gemini embeddings (dimension 768)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- QR Code Campaigns Table
create table if not exists qr_campaigns (
  id uuid default gen_random_uuid() primary key,
  campaign_name text not null,
  slug text unique not null,
  destination_url text not null,
  active boolean default true,
  visits integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RAG Knowledge Base Table (for AI Receptionist)
create table if not exists knowledge_base (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  source text, -- e.g. "Price List 2024", "FAQ"
  embedding vector(768),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Function to match products by embedding
create or replace function match_products(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  name text,
  description text,
  price decimal,
  image_url text,
  similarity float
)
language plpgsql
as $$
begin
  return query(
    select
      products.id,
      products.name,
      products.description,
      products.price,
      products.image_url,
      1 - (products.embedding <=> query_embedding) as similarity
    from products
    where 1 - (products.embedding <=> query_embedding) > match_threshold
    order by products.embedding <=> query_embedding
    limit match_count
  );
end;
$$;
