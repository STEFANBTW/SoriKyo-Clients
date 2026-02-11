import { z } from 'zod';

export const FieldTypeSchema = z.enum([
    'string',
    'number',
    'boolean',
    'date',
    'image',
    'file',
    'array',
    'object',
    'reference',
    'slug',
    'block', // Portable Text
]);

export type FieldType = z.infer<typeof FieldTypeSchema>;

export interface FieldDefinition {
    name: string;
    title: string;
    type: FieldType;
    description?: string;
    hidden?: boolean;
    readOnly?: boolean;
    validation?: (Rule: any) => any;
    options?: Record<string, any>;
    fields?: FieldDefinition[]; // For 'object' and 'array'
    of?: { type: FieldType }[]; // For 'array'
    to?: { type: string }[]; // For 'reference'
}

export interface TypeDefinition {
    name: string;
    title: string;
    type: 'document' | 'object';
    fields: FieldDefinition[];
}

/**
 * Functional helpers to provide a Sanity-like DX
 */
export function defineType(schema: TypeDefinition): TypeDefinition {
    return schema;
}

export function defineField(field: FieldDefinition): FieldDefinition {
    return field;
}
