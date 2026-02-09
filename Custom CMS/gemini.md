# 📂 PROJECT SOURCE OF TRUTH (gemini.md)
**Status:** 🟢 INITIALIZATION
**Project:** Omni-CMS (The Content Operating System)
**Protocol:** BLAST

## 1. THE NORTH STAR
**"Build a sophisticated, industrial-grade Master Template for a Schema-Driven, AI-First Content Operating System. This template will serve as the engine for 100+ websites, where the Admin UI is generated dynamically from TypeScript schemas, backed by a persistent Supabase JSONB Content Lake."**

## 2. THE PAYLOAD DEFINITION (Features)

### **A. The Core Engine (Sanity Parity)**
* **The Content Lake:** A single SQL table (`documents`) storing all data as JSONB.
* **Schema-Driven UI:** A recursive "Field Resolver" that renders forms based on a `schema.ts` config.
* **Portable Text 2.0:** A Tiptap-based block editor that saves as JSON (not HTML).
* **Vision Tool:** A raw SQL/JSON query playground.

### **B. The Futuristic Layer (Agentic)**
* **AI Schema Generator:** LLM generates `schema.ts` from text prompts.
* **Ghost Mode:** Real-time collaboration (Y.js) showing live user cursors.
* **Generative Filling:** "Magic Wand" button to auto-fill form fields via AI.

## 3. THE DATA SCHEMAS (The Physics)

### **A. Database Schema (The Lake)**
*Constraint: This is the ONLY table for content.*
```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  _type VARCHAR(255) NOT NULL, -- e.g., 'product', 'author'
  _createdAt TIMESTAMPTZ DEFAULT NOW(),
  _updatedAt TIMESTAMPTZ DEFAULT NOW(),
  _rev VARCHAR(255), -- Revision hash for Y.js
  content JSONB NOT NULL, -- The Data Payload
  fts tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED
);
CREATE INDEX idx_documents_type ON documents(_type);
CREATE INDEX idx_documents_gin ON documents USING gin (content);
```

### **B. Meta-Schema (The Config)**

*Constraint: The UI must be generated from this structure.*

```typescript
type SchemaDefinition = {
  name: string;
  title: string;
  type: 'document' | 'object';
  fields: Array<{
    name: string;
    title: string;
    type: 'string' | 'number' | 'image' | 'array' | 'reference' | 'slug';
    validation?: (Rule: any) => any;
  }>;
};
```
