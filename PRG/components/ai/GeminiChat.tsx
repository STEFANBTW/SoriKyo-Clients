'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAccessibilityStore } from '@/store/accessibility';
import { useUIStore } from '@/store/ui';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const GeminiChat = () => {
    const { activeWidget, closeWidget } = useUIStore();
    const isOpen = activeWidget === 'gemini';

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am PRG\'s AI Assistant. Ask me anything about our services or prices.' }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { reducedMotion } = useAccessibilityStore();

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.content }),
            });

            if (!res.ok) throw new Error('Failed to fetch');

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setMessages(prev => [...prev, { role: 'assistant', content: `I apologize, but I encountered an error: ${errorMessage}` }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        /* DESIGNER CONTROL: Chat Background & Blur
           - bg-white/95: Light Mode opacity (Pearl).
           - .dark:glass-noir: Uses global glassmorphism tokens from globals.css.
           - backdrop-blur-md: Inline backup blur (Optional, glass-noir handles main logic). */
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-white/60 glass-noir .dark:glass-noir backdrop-blur-md rounded-2xl flex flex-col shadow-2xl border border-prg-primary/10 .dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="p-4 bg-prg-primary/10 .dark:bg-prg-primary/20 flex justify-between items-center border-b border-prg-primary/5 .dark:border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-bold text-sm text-header-color .dark:text-white">PRG Assistant (Beta)</h3>
                </div>
                <button
                    onClick={closeWidget}
                    className="text-prg-primary/60 .dark:text-gray-400 hover:text-prg-primary .dark:hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-prg-primary/20 .dark:scrollbar-thumb-gray-700">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                ? 'bg-prg-primary text-white rounded-br-none shadow-md'
                                : 'bg-prg-primary/5 .dark:bg-white/10 text-foreground .dark:text-gray-200 rounded-bl-none border border-prg-primary/10 .dark:border-transparent'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-prg-primary/5 .dark:bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-1 border border-prg-primary/10 .dark:border-transparent">
                            <div className="w-2 h-2 bg-prg-secondary/40 .dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-prg-secondary/40 .dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-prg-secondary/40 .dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-prg-primary/10 .dark:border-white/10 bg-prg-primary/5 .dark:bg-black/20">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-white/10 .dark:bg-white/5 border border-prg-primary/20 .dark:border-white/10 rounded-full px-4 py-2 text-sm text-foreground .dark:text-white focus:outline-none focus:border-prg-primary transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="bg-prg-primary text-white p-2 rounded-full hover:bg-prg-secondary disabled:opacity-50 transition-all shadow-lg active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};
