import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'

interface TiptapEditorProps {
    value: any
    onChange: (value: any) => void
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex gap-2 p-2 border-b border-gray-700 bg-gray-900 mb-2 overflow-x-auto">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('bold') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Bold
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('italic') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Italic
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('strike') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Strike
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('code') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Code
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
                className="px-2 py-1 rounded text-xs text-gray-400 hover:bg-gray-800"
            >
                Clear marks
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().clearNodes().run()}
                className="px-2 py-1 rounded text-xs text-gray-400 hover:bg-gray-800"
            >
                Clear nodes
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('paragraph') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                P
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('heading', { level: 1 }) ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('heading', { level: 2 }) ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                H2
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('bulletList') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Bullet list
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('orderedList') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Ordered list
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`px-2 py-1 rounded text-xs ${editor.isActive('blockquote') ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                Blockquote
            </button>
        </div>
    )
}

export const TiptapEditor = ({ value, onChange }: TiptapEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[150px]',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getJSON())
        },
    })

    // Sync content if value changes externally (and editor is not focused? handled by Tiptap mostly)
    // Simple effect to load initial content
    //   useEffect(() => {
    //     if (editor && value && editor.isEmpty) {
    //         editor.commands.setContent(value);
    //     }
    //   }, [editor, value]);

    return (
        <div className="border border-gray-700 rounded-md bg-gray-800 overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
