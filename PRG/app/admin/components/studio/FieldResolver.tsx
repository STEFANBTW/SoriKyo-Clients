"use client";

import React from 'react';
import { FieldDefinition } from '@/app/admin/lib/schema/types';

interface FieldResolverProps {
    field: FieldDefinition;
    control: unknown; // Simplified for the master template
}

export default function FieldResolver({ field }: FieldResolverProps) {
    // Logic to resolve component based on field.type
    switch (field.type) {
        case 'string':
            return <StringInput field={field} />;
        case 'slug':
            return <SlugInput field={field} />;
        case 'image':
            return <ImageInput field={field} />;
        case 'block':
            return <TiptapInput field={field} />;
        case 'object':
            return (
                <div className="space-y-4 p-4 border border-white/5 rounded-lg bg-white/5 mt-2">
                    <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{field.title}</label>
                    <div className="space-y-4">
                        {field.fields?.map((f) => (
                            <FieldResolver key={f.name} field={f} control={null} />
                        ))}
                    </div>
                </div>
            );
        default:
            return <div className="text-red-500 text-xs">Unsupported field type: {field.type}</div>;
    }
}

/**
 * Atomic Input Components
 */

function StringInput({ field }: { field: FieldDefinition }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <input
                type="text"
                className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors"
                placeholder={field.description || `Enter ${field.title}...`}
            />
        </div>
    );
}

function SlugInput({ field }: { field: FieldDefinition }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-white/70">{field.title}</label>
                <span className="text-[10px] font-mono text-white/20 uppercase">Auto-Gen Active</span>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="w-full bg-gray-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors font-mono italic"
                    placeholder="my-cool-slug"
                />
                <div className="absolute right-3 top-2.5 w-1 h-3 bg-cyan-400/50 animate-pulse" />
            </div>
        </div>
    );
}

function ImageInput({ field }: { field: FieldDefinition }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <div className="border-2 border-dashed border-white/5 rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-cyan-400/30 transition-colors cursor-pointer bg-gray-800/10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    +
                </div>
                <div className="text-xs text-white/40">Drop image here or click to upload</div>
            </div>
        </div>
    );
}

function TiptapInput({ field }: { field: FieldDefinition }) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <div className="min-h-[200px] border border-white/10 rounded-lg bg-gray-900 p-4 text-sm text-gray-400">
                [Rich Text Editor Placeholder - Real-time JSON storage enabled]
            </div>
        </div>
    );
}
