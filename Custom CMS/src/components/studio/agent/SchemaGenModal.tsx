import React, { useState } from 'react';
import { Bot, X, Check } from 'lucide-react';

interface SchemaGenModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SchemaGenModal: React.FC<SchemaGenModalProps> = ({ isOpen, onClose }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    if (!isOpen) return null;

    const handleGenerate = () => {
        setIsGenerating(true);
        // Mock Agentic Delay
        setTimeout(() => {
            setIsGenerating(false);
            setGeneratedCode(`// Generated Schema for: ${prompt}
export const newSchema = defineType({
  name: 'generated',
  title: 'Generated Type',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'features', type: 'array', of: [{type: 'string'}] })
  ]
})`);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-900/30 rounded-lg">
                            <Bot className="text-purple-400" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">AI Schema Generator</h3>
                            <p className="text-xs text-gray-400">Describe your content model, and I'll code it.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {!generatedCode ? (
                        <div className="space-y-4">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., I need a schema for a luxury hotel room with amenities, a 3D tour link, and a gallery..."
                                className="w-full h-32 bg-gray-950 border border-gray-800 rounded-lg p-4 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleGenerate}
                                    disabled={!prompt || isGenerating}
                                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2"
                                >
                                    {isGenerating ? 'Vibe Coding...' : 'Generate Schema'}
                                    {!isGenerating && <Bot size={16} />}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="bg-black/50 border border-gray-800 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
                                <pre>{generatedCode}</pre>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setGeneratedCode('')}
                                    className="text-gray-400 hover:text-white text-sm"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={onClose}
                                    className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
                                >
                                    <Check size={16} /> Apply to Project
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
