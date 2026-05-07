// frontend/src/components/doc-editor/EditorToolbar.tsx
//
// Extracted toolbar with formatting buttons for the Tiptap editor.

import type { Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarButton {
  label: string;
  action: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

const buttons: ToolbarButton[] = [
  {
    label: 'B',
    action: (e) => { e.chain().focus().toggleBold().run(); },
    isActive: (e) => e.isActive('bold'),
  },
  {
    label: 'I',
    action: (e) => { e.chain().focus().toggleItalic().run(); },
    isActive: (e) => e.isActive('italic'),
  },
  {
    label: 'S',
    action: (e) => { e.chain().focus().toggleStrike().run(); },
    isActive: (e) => e.isActive('strike'),
  },
  {
    label: '</>',
    action: (e) => { e.chain().focus().toggleCode().run(); },
    isActive: (e) => e.isActive('code'),
  },
  {
    label: 'H1',
    action: (e) => { e.chain().focus().toggleHeading({ level: 1 }).run(); },
    isActive: (e) => e.isActive('heading', { level: 1 }),
  },
  {
    label: 'H2',
    action: (e) => { e.chain().focus().toggleHeading({ level: 2 }).run(); },
    isActive: (e) => e.isActive('heading', { level: 2 }),
  },
  {
    label: 'H3',
    action: (e) => { e.chain().focus().toggleHeading({ level: 3 }).run(); },
    isActive: (e) => e.isActive('heading', { level: 3 }),
  },
  {
    label: 'Bullet',
    action: (e) => { e.chain().focus().toggleBulletList().run(); },
    isActive: (e) => e.isActive('bulletList'),
  },
  {
    label: 'Ordered',
    action: (e) => { e.chain().focus().toggleOrderedList().run(); },
    isActive: (e) => e.isActive('orderedList'),
  },
  {
    label: 'Task',
    action: (e) => { e.chain().focus().toggleTaskList().run(); },
    isActive: (e) => e.isActive('taskList'),
  },
  {
    label: 'Quote',
    action: (e) => { e.chain().focus().toggleBlockquote().run(); },
    isActive: (e) => e.isActive('blockquote'),
  },
  {
    label: 'Code Block',
    action: (e) => { e.chain().focus().toggleCodeBlock().run(); },
    isActive: (e) => e.isActive('codeBlock'),
  },
  {
    label: 'HR',
    action: (e) => { e.chain().focus().setHorizontalRule().run(); },
    isActive: () => false,
  },
];

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  return (
    <div className={cn('flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-[#f8fafc] rounded-t-lg')}>
      {buttons.map((btn) => {
        const active = btn.isActive(editor);
        return (
          <button
            key={btn.label}
            type="button"
            onClick={() => btn.action(editor)}
            className={cn(
              'px-2 py-1 text-xs font-[inherit] border border-[#cbd5e1] rounded cursor-pointer leading-snug',
              active ? 'bg-[#3b82f6] text-white' : 'bg-white text-[#334155]',
            )}
            title={btn.label}
          >
            {btn.label}
          </button>
        );
      })}
    </div>
  );
}
