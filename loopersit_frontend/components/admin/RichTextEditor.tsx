'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 min-h-[300px] focus:outline-none',
            },
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex gap-2 p-2 bg-gray-50 border-b border-gray-300">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-300' : ''
                        }`}
                    title="Bold"
                >
                    <Bold size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-300' : ''
                        }`}
                    title="Italic"
                >
                    <Italic size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-300' : ''
                        }`}
                    title="Bullet List"
                >
                    <List size={18} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-300' : ''
                        }`}
                    title="Numbered List"
                >
                    <ListOrdered size={18} />
                </button>
                <button
                    type="button"
                    onClick={addLink}
                    className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-300' : ''
                        }`}
                    title="Add Link"
                >
                    <LinkIcon size={18} />
                </button>
                <button
                    type="button"
                    onClick={addImage}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Add Image"
                >
                    <ImageIcon size={18} />
                </button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
