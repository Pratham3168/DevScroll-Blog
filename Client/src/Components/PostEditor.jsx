import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'

import {
  FiBold,
  FiItalic,
  FiUnderline,
  FiList,
  FiLink,
  FiCode,
  FiRotateCcw,
  FiRotateCw,
} from 'react-icons/fi'

export default function PostEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
  openOnClick: false,
  HTMLAttributes: {
    class: 'text-blue-600 underline cursor-pointer',
  },
}),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your blog post...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: content || '',
    editorProps: {
      attributes: {
       class:
  'min-h-[40vh] p-6 outline-none text-gray-800 ' +
  'prose prose-lg max-w-none',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  React.useEffect(() => {
    if (!editor) return
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  if (!editor) return null

  const buttonStyle = (isActive) =>
    `p-2 rounded-md transition ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'hover:bg-gray-200 text-gray-700'
    }`

  const addLink = () => {
    const url = prompt('Enter URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div
      className="w-full max-w-3xl mx-auto border rounded-xl bg-white shadow-sm cursor-text"
      onClick={() => editor.chain().focus().run()}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50 rounded-t-xl">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonStyle(editor.isActive('bold'))}
        >
          <FiBold />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonStyle(editor.isActive('italic'))}
        >
          <FiItalic />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonStyle(editor.isActive('underline'))}
        >
          <FiUnderline />
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonStyle(editor.isActive('heading', { level: 1 }))}
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonStyle(editor.isActive('heading', { level: 2 }))}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonStyle(editor.isActive('bulletList'))}
        >
          <FiList />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonStyle(editor.isActive('blockquote'))}
        >
          "
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={buttonStyle(editor.isActive('codeBlock'))}
        >
          <FiCode />
        </button>

        <button
          type="button"
          onClick={addLink}
          className={buttonStyle(editor.isActive('link'))}
        >
          <FiLink />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded-md hover:bg-gray-200 text-gray-700"
        >
          <FiRotateCcw />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded-md hover:bg-gray-200 text-gray-700"
        >
          <FiRotateCw />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Placeholder Styling */}
      <style>
        {`
          .is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: #9ca3af;
            pointer-events: none;
            height: 0;
          }
        `}
      </style>
    </div>
  )
}
