import { defineType, defineField } from './types';

export const postSchema = defineType({
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'block',
        }),
    ],
});

export const authorSchema = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'avatar',
            title: 'Avatar',
            type: 'image',
        }),
    ],
});

export const schemaRegistry = [postSchema, authorSchema];
