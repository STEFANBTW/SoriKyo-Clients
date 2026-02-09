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

    if (!isOpen) {
        return (
            <button
                onClick={() => toggleWidget('whatsapp')}
                className="fixed bottom-6 right-24 z-50 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-white/20"
                aria-label="Open WhatsApp Concierge"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </button>
        );
    }

    return (
        <div className="fixed bottom-24 right-6 z-50 w-80 glass-noir rounded-2xl flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
            {/* Header */}
            <div className="p-4 bg-green-600/20 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <h3 className="font-bold text-sm text-white">WhatsApp Concierge</h3>
                </div>
                <button
                    onClick={() => toggleWidget('whatsapp')}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                <p className="text-xs text-gray-400 mb-4">
                    This is a message generator. Fill out the details below to start a structured chat with us on WhatsApp.
                </p>

                {/* Name */}
                <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-bold uppercase tracking-wider">Your Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jones"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>

                {/* Service Interest */}
                <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-bold uppercase tracking-wider">Service Interest</label>
                    <select
                        value={serviceInterest}
                        onChange={(e) => setServiceInterest(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors appearance-none"
                    >
                        <option value="Hair" className="text-black">Hair Styling</option>
                        <option value="Nails" className="text-black">Nails & Manicure</option>
                        <option value="Spa" className="text-black">Spa Treatment</option>
                        <option value="Aesthetics" className="text-black">Aesthetics</option>
                        <option value="Academy" className="text-black">Beauty Academy</option>
                        <option value="Other" className="text-black">Other Inquiry</option>
                    </select>
                </div>

                {/* Details */}
                <div className="space-y-1">
                    <label className="text-xs text-gray-300 font-bold uppercase tracking-wider">Details / Requests</label>
                    <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. Any availability for this Saturday afternoon?"
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                    />
                </div>

                {/* Send Button */}
                <button
                    onClick={handleSend}
                    disabled={!name || !details}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2"
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
