import React, { useRef, useState, useEffect } from 'react';
import { useController, Control } from 'react-hook-form';
import { ImageField } from '@/lib/schema/types';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageInputProps {
    field: ImageField;
    control: Control<any>;
    name: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({ field, control, name }) => {
    const {
        field: { onChange, value },
    } = useController({
        name,
        control,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Sync preview with value (if value is a string URL or an object with url)
    useEffect(() => {
        if (typeof value === 'string') {
            setPreviewUrl(value);
        } else if (value && value.url) {
            setPreviewUrl(value.url);
        } else if (value instanceof File) {
            setPreviewUrl(URL.createObjectURL(value));
        } else {
            setPreviewUrl(null);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create local preview
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Pass file to form (In real app, we'd upload to Supabase here and pass the returned URL)
            // For now, we simulate the structure:
            onChange({
                _type: 'image',
                file: file, // Store raw file for now
                url: objectUrl, // Store preview URL for immediate display
                name: file.name
            });
        }
    };

    const handleRemove = () => {
        setPreviewUrl(null);
        onChange(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-bold text-gray-200 mb-2">
                {field.title || field.name}
            </label>

            {!previewUrl ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-lg p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-gray-900/50 group"
                >
                    <div className="p-3 bg-gray-800 rounded-full group-hover:bg-purple-900/30 transition-colors">
                        <Upload className="text-gray-400 group-hover:text-purple-400" size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-300">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
                    </div>
                </div>
            ) : (
                <div className="relative group rounded-lg overflow-hidden border border-gray-700 bg-black max-w-md">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-auto object-cover max-h-64"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors"
                        >
                            <Upload size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-2 bg-red-500/80 hover:bg-red-600 rounded-full text-white backdrop-blur-sm transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            {field.description && <p className="mt-2 text-xs text-gray-500">{field.description}</p>}
        </div>
    );
};
