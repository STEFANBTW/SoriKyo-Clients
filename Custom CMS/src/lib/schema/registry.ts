import { SchemaType, DocumentSchema } from './types';

class SchemaRegistry {
    private schemas: Map<string, SchemaType> = new Map();

    register(schema: SchemaType) {
        this.schemas.set(schema.name, schema);
    }

    get(name: string): SchemaType | undefined {
        return this.schemas.get(name);
    }

    getAll(): SchemaType[] {
        return Array.from(this.schemas.values());
    }

    getDocuments(): DocumentSchema[] {
        return this.getAll().filter((s): s is DocumentSchema => s.type === 'document');
    }
}

export const registry = new SchemaRegistry();
