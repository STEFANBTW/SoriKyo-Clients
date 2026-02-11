"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldResolver } from '@/components/studio/FieldResolver';
import { defineType, defineField, DocumentSchema } from '@/lib/schema/types';
import { MagicWand } from '@/components/studio/agent/MagicWand';
import { SchemaGenModal } from '@/components/studio/agent/SchemaGenModal';
import { GhostCursors } from '@/components/studio/agent/GhostCursors';

// --- 1. DEFINE A SCHEMA (The "Code" part) ---
const productSchema = defineType({
    type: 'document',
    name: 'product',
    title: 'Product',
    fields: [
        defineField({
            name: 'title',
            title: 'Product Title',
            type: 'string',
            description: 'The name of the product',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'string', // Should be 'slug' type eventually
            description: 'URL friendly ID',
        }),
        defineField({ // NEW FIELD FOR IMAGE UPLOAD DEMO
            name: 'mainImage',
            title: 'Product Image',
            type: 'image',
            description: 'Upload the main product shot.'
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'inStock',
            title: 'In Stock',
            type: 'boolean',
        }),
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text',
            rows: 4
        }),
        defineField({
            name: 'features',
            title: 'Key Features (Array List)',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'details',
            title: 'Detailed Specs',
            type: 'object',
            fields: [
                defineField({ name: 'width', type: 'number', title: 'Width (cm)' }),
                defineField({ name: 'height', type: 'number', title: 'Height (cm)' }),
                defineField({ name: 'material', type: 'string', title: 'Material' }),
            ]
        }),
        defineField({
            name: 'body',
            title: 'Content Body (Rich Text)',
            type: 'block'
        }),
    ]
} as any);


export default function StudioPage() {
    const [activeSchema, setActiveSchema] = useState<DocumentSchema>(productSchema);
    const [formData, setFormData] = useState<any>(null);
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const { control, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: {
            title: 'SoriKyo Quantum Processor',
            price: 999,
            inStock: true,
            features: ['Zero Latency', 'Infinite Scale'],
            details: {
                material: 'Graphene'
            },
            body: {
                type: 'doc',
                content: [
                    { type: 'paragraph', content: [{ type: 'text', text: 'Welcome to the future of content.' }] }
                ]
            }
        }
    });

    const onSubmit = (data: any) => {
        console.log("FORM SUBMITTED:", data);
        setFormData(data);
    };

    // Mock AI Generator
    const handleMagicWand = () => {
        setValue('description', "Automatically generated high-performance description by Omni-AI.");
        setValue('slug', 'sorikyo-quantum-processor-v1');
        setValue('features', ['AI Optimized', ' Quantum Core', 'Self-Healing']);
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white relative overflow-hidden">
            {/* Ghost Cursors Layer */}
            <GhostCursors />

            {/* AI Modal */}
            <SchemaGenModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

            {/* Sidebar (Navigation) */}
            <aside className="w-64 border-r border-gray-800 p-4 flex flex-col z-10 bg-gray-950">
                <h1 className="text-xl font-bold tracking-tight mb-8 text-purple-400">OMNI-CMS</h1>

                <div className="mb-8">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Content Types</h3>
                    <button className="w-full text-left px-3 py-2 bg-gray-900 rounded-md text-sm font-medium border border-purple-500/30 text-purple-200">
                        {activeSchema.title}
                    </button>
                </div>

                <div className="mt-auto">
                    <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
                        <label className="text-xs text-blue-400 font-bold mb-2 block">✨ AI Schema Gen</label>
                        <div
                            onClick={() => setIsAiModalOpen(true)}
                            className="w-full bg-black border border-gray-700 rounded px-2 py-2 text-xs text-gray-400 cursor-pointer hover:border-purple-500 transition-colors"
                        >
                            Describe a new content type...
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content (Editor) */}
            <main className="flex-1 overflow-y-auto no-scrollbar z-10">
                <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-medium text-gray-200">Editing: {activeSchema.title}</h2>
                        <span className="px-2 py-0.5 rounded-full bg-green-900/50 text-green-400 text-xs border border-green-800">Published</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <MagicWand onMagic={handleMagicWand} />

                        <button
                            onClick={handleSubmit(onSubmit)}
                            className="px-4 py-1.5 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20"
                        >
                            Publish
                        </button>
                    </div>
                </header>

                <div className="max-w-4xl mx-auto py-10 px-8 pb-32">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* THE ENGINE */}
                        {activeSchema.fields.map((field) => (
                            <FieldResolver
                                key={field.name}
                                field={field}
                                control={control}
                                name={field.name}
                            />
                        ))}
                    </form>

                    {formData && (
                        <div className="mt-12 p-6 bg-black rounded-lg border border-gray-800">
                            <h3 className="text-green-400 font-mono text-sm mb-2">JSON OUTPUT (The Lake):</h3>
                            <pre className="text-xs text-gray-400 font-mono overflow-auto max-h-96">
                                {JSON.stringify(formData, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </main>

            {/* Right Sidebar (Collaboration/History) */}
            <aside className="w-72 border-l border-gray-800 bg-gray-900/30 p-4 z-10 hidden xl:block">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Live Presence</h3>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 border-2 border-gray-900"></div>
                    <div>
                        <p className="text-sm font-medium">You (Editor)</p>
                        <p className="text-xs text-green-500">Connected</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-4 opacity-70">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 border-2 border-gray-900"></div>
                    <div>
                        <p className="text-sm font-medium">Sarah (Product)</p>
                        <p className="text-xs text-blue-400">Viewing...</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
