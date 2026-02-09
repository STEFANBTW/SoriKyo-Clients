'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

interface WhatsAppButtonProps {
    phoneNumber?: string; // e.g. "15551234567"
    productName?: string;
    context?: string;
    message?: string; // Custom message override
    label?: string;
    className?: string;
}

export const WhatsAppButton = ({
    phoneNumber = "2349163911869", // PRG Business WhatsApp
    productName,
    context,
    message: customMessage,
    label = "Chat on WhatsApp",
    className = "btn-primary flex items-center gap-2"
}: WhatsAppButtonProps) => {
    const pathname = usePathname();

    // Dynamic Message Generation Logic
    const generateMessage = () => {
        if (customMessage) return customMessage;

        if (productName) {
            return `Hi PRG, I am looking at the *${productName}*. Can I see a video of the texture or know more about availability?`;
        }

        if (pathname?.includes('/booking')) {
            return `Hello PRG, I am currently viewing the *Booking Page*. I would like to check availability for a date.`;
        }

        if (context === '404') {
            return `Hi, I think a link on your website is broken. I was trying to find...`;
        }

        return `Hello PRG, I have a question about your services.`;
    };

    const message = encodeURIComponent(generateMessage());
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
            aria-label="Contact us on WhatsApp"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-9.672-.272-.989-.471-1.492-.471-1.989 0-.496.149-.992.347-1.364.198-.372.434-.372.781-.371.347 0 .694.004 1.042.004.347 0 .892.148 1.363 1.238.471 1.091 1.611 3.966 1.76 4.239.149.272.248.595.049.992-.198.397-.298.595-.595.893-.298.297-.694.743-1.041.446-.347-.297-.793-.743-1.289-1.189-1.611-1.488-2.678-2.678-2.428-2.924.248-.248 1.239.694 2.132 1.833 2.181.595 1.14 2.876 1.139 3.322 1.138.446.001 1.388.149 1.934-.074.545-.224 1.685-1.14 2.379-2.378.148-.272.397-.595.272-.843-.124-.248-.446-.198-.942-.545-.496-.347-1.14-.545-1.933-.545s-1.488.198-1.934.545c-.446.347-1.288 1.488-1.635 1.934z" />
            </svg>
            {label}
        </a>
    );
};
