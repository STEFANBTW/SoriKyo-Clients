import { z } from 'zod';

export type ValidationRule = {
    required: () => ValidationRule
    min: (min: number) => ValidationRule
    max: (max: number) => ValidationRule
    length: (length: number) => ValidationRule
    email: () => ValidationRule
    // Add more validation rules as needed
}

export type BaseField = {
    name: string
    title?: string
    description?: string
    hidden?: boolean
    readOnly?: boolean
    validation?: (rule: ValidationRule) => ValidationRule
}

export type StringField = BaseField & {
    type: 'string'
    options?: {
        list?: string[] | { title: string; value: string }[]
        layout?: 'radio' | 'dropdown'
    }
}

export type NumberField = BaseField & {
    type: 'number'
}

export type BooleanField = BaseField & {
    type: 'boolean'
}

export type ImageField = BaseField & {
    type: 'image'
    options?: {
        hotspot?: boolean
    }
}

export type DateTimeField = BaseField & {
    type: 'datetime'
}

export type ReferenceField = BaseField & {
    type: 'reference'
    to: { type: string }[]
}

export type ArrayField = BaseField & {
    type: 'array'
    of: FieldType[]
}

export type ObjectField = BaseField & {
    type: 'object'
    fields: FieldType[]
}

export type TextField = BaseField & {
    type: 'text' // For long text / textarea
    rows?: number
}

// Union of all field types
export type FieldType =
    | StringField
    | NumberField
    | BooleanField
    | ImageField
    | DateTimeField
    | ReferenceField
    | ArrayField
    | ObjectField
    | TextField

export type DocumentSchema = {
    type: 'document'
    name: string
    title?: string
    fields: FieldType[]
    preview?: {
        select?: Record<string, string>
        prepare?: (selection: Record<string, any>) => { title: string; subtitle?: string; media?: any }
    }
}

export type ObjectSchema = BaseField & {
    type: 'object'
    fields: FieldType[]
}

export type SchemaType = DocumentSchema | ObjectSchema

// Helper function for strict typing
export function defineType<T extends SchemaType>(schema: T): T {
    return schema
}

export function defineField<T extends FieldType>(field: T): T {
    return field
}
