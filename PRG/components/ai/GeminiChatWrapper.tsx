'use client';

import dynamic from 'next/dynamic';

const GeminiChatComponent = dynamic(() => import('@/components/ai/GeminiChat').then(mod => mod.GeminiChat), {
    ssr: false,
});

export function GeminiChatWrapper() {
    return <GeminiChatComponent />;
}
