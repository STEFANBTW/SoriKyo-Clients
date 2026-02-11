'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/ui';

export const WhatsAppConcierge = () => {
    const { activeWidget, toggleWidget } = useUIStore();
    const isOpen = activeWidget === 'whatsapp';

    // Form State
    const [serviceInterest, setServiceInterest] = useState('Hair');
    const [details, setDetails] = useState('');
    const [name, setName] = useState('');

    const handleSend = () => {
        const phoneNumber = "2349163911869"; // PRG Business WhatsApp
        const message = `Hi, I am interested in *${serviceInterest}* services.\n\n*Name:* ${name}\n*Details:* ${details}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        toggleWidget('whatsapp'); // Close after sending
    };

    if (!isOpen) return null;

    return (
        /* DESIGNER CONTROL: Concierge Background & Blur
           - bg-white/55: Light Mode opacity (Experimental soft glass).
           - .dark:glass-noir: Uses global glassmorphism tokens from globals.css. */
        <div className="fixed bottom-50 right-6 z-50 w-80 bg-white/60 glass-noir .dark:glass-noir backdrop-blur-md rounded-2xl flex flex-col shadow-2xl border border-prg-primary/10 .dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="p-4 bg-green-500/10 .dark:bg-green-600/20 flex justify-between items-center border-b border-green-500/5 .dark:border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-bold text-sm text-green-700 .dark:text-white">WhatsApp Concierge</h3>
                </div>
                <button
                    onClick={() => toggleWidget('whatsapp')}
                    className="text-green-700/60 .dark:text-gray-400 hover:text-green-700 .dark:hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <p className="text-xs text-text-tertiary .dark:text-gray-400 mb-4">
                    This is a message generator. Fill out the details below to start a structured chat with us on WhatsApp.
                </p>

                {/* Name */}
                <div className="space-y-1">
                    <label className="text-xs text-prg-primary .dark:text-gray-300 font-bold uppercase tracking-wider">Your Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jones"
                        className="w-full bg-white/10 .dark:bg-white/5 border border-prg-primary/20 .dark:border-white/10 rounded-lg px-3 py-2 text-sm text-foreground .dark:text-white focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>

                {/* Service Interest */}
                <div className="space-y-1">
                    <label className="text-xs text-prg-primary .dark:text-gray-300 font-bold uppercase tracking-wider">Service Interest</label>
                    <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full bg-white/10 .dark:bg-white/5 border border-prg-primary/20 .dark:border-white/10 rounded-lg px-3 py-2 text-sm text-foreground .dark:text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                    >
                        <option value="Hair" className="text-black .dark:text-white .dark:bg-prg-primary">Hair Styling</option>
                        <option value="Nails" className="text-black .dark:text-white .dark:bg-prg-primary">Nails & Manicure</option>
                        <option value="Spa" className="text-black .dark:text-white .dark:bg-prg-primary">Spa Treatment</option>
                        <option value="Aesthetics" className="text-black .dark:text-white .dark:bg-prg-primary">Aesthetics</option>
                        <option value="Academy" className="text-black .dark:text-white .dark:bg-prg-primary">Beauty Academy</option>
                        <option value="Other" className="text-black .dark:text-white .dark:bg-prg-primary">Other Inquiry</option>
                    </select>
                </div>

                {/* Details */}
                <div className="space-y-1">
                    <label className="text-xs text-prg-primary .dark:text-gray-300 font-bold uppercase tracking-wider">Details / Requests</label>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. Any availability for this Saturday afternoon?"
                        rows={3}
                        className="w-full bg-white/10 .dark:bg-white/5 border border-prg-primary/20 .dark:border-white/10 rounded-lg px-3 py-2 text-sm text-foreground .dark:text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                    />
                </div>

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={!name || !details}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 shadow-green-500/20"
                >
                    <span>Open WhatsApp</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
