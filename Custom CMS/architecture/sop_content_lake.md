# SOP: Content Lake Query Engine

## Objective
To query the `documents` table (JSONB) as if it were a document store.

## Storage Strategy
- All documents exist in the `documents` table.
- Distinguish types via the `_type` column.
- All dynamic data lives in the `content` JSONB column.

## Query Patterns (Postgres JSONB)
### 1. Simple Filter
```sql
SELECT * FROM documents WHERE _type = 'product' AND content->>'category' = 'Electronics';
```
### 2. Full Text Search
```sql
SELECT * FROM documents WHERE fts @@ to_tsquery('english', 'search_term');
```
### 3. Fetching References
When a field is a `reference` (`{ _type: 'reference', _ref: 'ID' }`), the engine must perform a join or a second query to the same table.

## Content Update Protocol
- Use `JSONB_SET` or partial patches to update specific keys without overwriting the entire document.
- Track revisions via `_rev` for concurrency control.
