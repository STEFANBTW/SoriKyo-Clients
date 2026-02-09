"use client";

import React from 'react';
import { useForm, Control } from 'react-hook-form';
import { FieldDefinition } from '@/lib/schema/types';

interface FieldResolverProps {
    field: FieldDefinition;
    control: any; // Simplified for the master template
}

export default function FieldResolver({ field, control }: FieldResolverProps) {
    // Logic to resolve component based on field.type
    switch (field.type) {
        case 'string':
            return <StringInput field={field} control={control} />;
        case 'slug':
            return <SlugInput field={field} control={control} />;
        case 'image':
            return <ImageInput field={field} control={control} />;
        case 'block':
            return <TiptapInput field={field} control={control} />;
        case 'object':
            return (
                <div className="space-y-4 p-4 border border-white/5 rounded-custom bg-white/5 mt-2">
                    <label className="text-[10px] font-mono text-cyan uppercase tracking-widest">{field.title}</label>
                    <div className="space-y-4">
                        {field.fields?.map((f) => (
                            <FieldResolver key={f.name} field={f} control={control} />
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
 * These will be moved to separate files as the project grows
 */

function StringInput({ field }: FieldResolverProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <input
                type="text"
                className="w-full bg-eclipse border border-white/10 rounded-custom px-3 py-2 text-sm text-white focus:border-cyan outline-none transition-colors font-sans"
                placeholder={field.description || `Enter ${field.title}...`}
            />
        </div>
    );
}

function SlugInput({ field }: FieldResolverProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-white/70">{field.title}</label>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">Auto-Gen Active</span>
            </div>
            <div className="relative">
                <input
                    type="text"
                    className="w-full bg-eclipse border border-white/10 rounded-custom px-3 py-2 text-sm text-white focus:border-cyan outline-none transition-colors font-mono italic"
                    placeholder="my-cool-slug"
                />
                <div className="absolute right-3 top-2.5 w-1 h-3 bg-cyan/50 animate-pulse" />
            </div>
        </div>
    );
}

function ImageInput({ field }: FieldResolverProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <div className="border-2 border-dashed border-white/5 rounded-custom p-8 flex flex-col items-center justify-center gap-3 hover:border-cyan/30 transition-colors cursor-pointer bg-graphite/10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                    +
                </div>
                <div className="text-xs text-white/40">Drop image here or click to upload</div>
            </div>
        </div>
    );
}

function TiptapInput({ field }: FieldResolverProps) {
    return (
        <div className="space-y-2">
            <label className="text-xs font-medium text-white/70">{field.title}</label>
            <div className="min-h-[200px] border border-white/10 rounded-custom bg-eclipse p-4 text-sm text-steel font-sans">
                [Tiptap Editor Placeholder - Real-time JSON storage enabled]
            </div>
        </div>
    );
}
