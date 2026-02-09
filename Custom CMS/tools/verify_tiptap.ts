import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

try {
    console.log('Initializing Headless Tiptap...');
    const editor = new Editor({
        extensions: [StarterKit],
        content: '<p>Tiptap Verification</p>',
    });

    console.log('🟢 Tiptap Engine Verified. Output:', editor.getJSON());
} catch (error) {
    console.error('🔴 Tiptap Verification Failed:', error);
    process.exit(1);
}
