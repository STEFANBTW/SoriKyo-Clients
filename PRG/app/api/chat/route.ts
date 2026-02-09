import { NextRequest, NextResponse } from 'next/server';
import { geminiModel, embeddingModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        // 1. Generate Embedding for the user's message
        let embedding = [];
        try {
            const embeddingResult = await embeddingModel.embedContent(message);
            embedding = embeddingResult.embedding.values;
        } catch (embedError: any) {
            console.warn('Embedding Error:', embedError);
            // If embedding fails, we can't search, but we might still chat.
        }

        // 2. Retrieve relevant context from Knowledge Base
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
                    contextText = documents.map((doc: any) => `${doc.source}: ${doc.content}`).join('\n\n');
                }
            } catch (dbError) {
                console.warn('Vector Search Error (skipping context):', dbError);
            }
        }

        // 3. Construct the Prompt
        const systemPrompt = `You are the AI Receptionist for "Purple Rain Galore" (PRG), a luxury unisex salon and spa in Jos, Nigeria.
    Your tone is polite, professional, warm, and helpful.
    
    Use the following CONTEXT from our business documents to answer the user's question.
    If the answer is not in the context, politely say you don't have that information and suggest they call or book a consultation.
    Do NOT make up facts.
    
    CONTEXT:
    ${contextText}
    
    USER QUESTION: ${message}
    `;

        // 4. Generate Response
        const result = await geminiModel.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        // Return the actual error for debugging
        return NextResponse.json({ reply: `System Error: ${error.message || error}` });
    }
}
