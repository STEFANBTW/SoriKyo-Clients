import { NextRequest, NextResponse } from 'next/server';
import { geminiModel, embeddingModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * AI Chat API with RAG and Intent Navigation
 * Features 9 & 23: Intent recognition + Retrieval Augmented Generation
 */

// Navigation intent patterns
const navigationIntents: Record<string, { target: string; action: string }> = {
    'show me services': { target: '#services', action: 'scroll' },
    'services': { target: '#services', action: 'scroll' },
    'book appointment': { target: '#booking', action: 'scroll' },
    'book': { target: '#booking', action: 'scroll' },
    'booking': { target: '#booking', action: 'scroll' },
    'contact': { target: '#contact', action: 'scroll' },
    'call': { target: '#contact', action: 'scroll' },
    'location': { target: '#location', action: 'scroll' },
    'gallery': { target: '/gallery', action: 'navigate' },
    'photos': { target: '/gallery', action: 'navigate' },
    'reviews': { target: '#testimonials', action: 'scroll' },
    'testimonials': { target: '#testimonials', action: 'scroll' },
    'hair': { target: '/hair', action: 'navigate' },
    'hair services': { target: '/hair', action: 'navigate' },
    'spa': { target: '/spa', action: 'navigate' },
    'spa services': { target: '/spa', action: 'navigate' },
    'nails': { target: '/nails', action: 'navigate' },
    'nail services': { target: '/nails', action: 'navigate' },
    'aesthetics': { target: '/aesthetics', action: 'navigate' },
    'about': { target: '/about', action: 'navigate' },
    'team': { target: '#team', action: 'scroll' },
    'stylists': { target: '#team', action: 'scroll' },
    'artists': { target: '#team', action: 'scroll' },
    'prices': { target: '#pricing', action: 'scroll' },
    'pricing': { target: '#pricing', action: 'scroll' },
};

function detectIntent(message: string): { target: string; action: string } | null {
    const lowerMessage = message.toLowerCase().trim();

    // Check for exact or partial matches
    for (const [pattern, intent] of Object.entries(navigationIntents)) {
        if (lowerMessage.includes(pattern)) {
            return intent;
        }
    }

    return null;
}

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        // Feature 9: Check for navigation intent first
        const intent = detectIntent(message);

        // 1. Generate Embedding for the user's message
        let embedding: number[] = [];
        try {
            const embeddingResult = await embeddingModel.embedContent(message);
            embedding = embeddingResult.embedding.values;
        } catch (embedError: unknown) {
            console.warn('Embedding Error:', embedError);
        }

        // 2. Retrieve relevant context from Knowledge Base (Feature 23: RAG)
        let contextText = '';
        if (embedding.length > 0) {
            try {
                const { data: documents, error: rpcError } = await supabase.rpc('match_documents', {
                    query_embedding: embedding,
                    match_threshold: 0.5,
                    match_count: 3,
                });

                if (rpcError) {
                    console.warn('Supabase RPC Error:', rpcError);
                } else if (documents) {
                    contextText = documents.map((doc: { source: string; content: string }) =>
                        `${doc.source}: ${doc.content}`
                    ).join('\n\n');
                }
            } catch (dbError) {
                console.warn('Vector Search Error (skipping context):', dbError);
            }
        }

        // 3. Construct the Prompt with intent awareness
        const intentInstruction = intent
            ? `\n\nIMPORTANT: The user seems to want to navigate. After your response, they will be directed to ${intent.target}. Acknowledge this naturally.`
            : '';

        const systemPrompt = `You are the AI Receptionist for "Purple Rain Galore" (PRG), a luxury unisex salon and spa in Jos, Nigeria.
Your tone is polite, professional, warm, and helpful.

Use the following CONTEXT from our business documents to answer the user's question.
If the answer is not in the context, politely say you don't have that information and suggest they call or book a consultation.
Do NOT make up facts.${intentInstruction}

CONTEXT:
${contextText || 'No specific context available.'}

USER QUESTION: ${message}
`;

        // 4. Generate Response
        const result = await geminiModel.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        // Return with intent if detected
        return NextResponse.json({
            reply: text,
            intent: intent || undefined,
        });

    } catch (error: unknown) {
        console.error('AI Chat Error:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ reply: `System Error: ${errorMessage}` });
    }
}
