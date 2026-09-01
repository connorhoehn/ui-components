// src/components/doc-editor/DocumentToolbar.tsx
//
// The document toolbar — Confluence-shaped, for a whole-page canvas.
//
// Separate from EditorToolbar rather than replacing it: that one is a flat row
// of one-letter buttons (B / I / S / </> / H1 / H2 …) sized for the small
// inline section editors, and several pages still use it. This one is grouped
// the way a writing tool is:
//
//   [ block type ▾ ] │ B I S code │ • list  1. list  ☑ task │ " code — │ + insert
//
// The block-type SELECT is the important half. A writer thinks "this is a
// heading", one choice out of a named set — not "press the H2 button and
// hope". It is also the only control that can show what the cursor is
// currently in, which a row of toggles cannot.
//
// Markdown is the native input path and stays that way: `# `, `- `, `> `,
// ``` and `**bold**` are Tiptap input rules and keep working while you type.
// The toolbar is the discoverable surface over the same commands, not a
// replacement for them — which is why every entry names its markdown
// equivalent in the tooltip.

import { useCallback, type ReactNode } from 'react';
import type { Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';

export interface DocumentToolbarProps {
  editor: Editor | null;
  /** Rendered at the end of the bar — insert-macro menus, share, etc. */
  actions?: ReactNode;
  'data-testid'?: string;
}

/** Block types, in the order a document uses them. */
const BLOCK_OPTIONS = [
  { value: 'paragraph', label: 'Normal text' },
  { value: 'heading1', label: 'Heading 1' },
  { value: 'heading2', label: 'Heading 2' },
  { value: 'heading3', label: 'Heading 3' },
  { value: 'blockquote', label: 'Quote' },
  { value: 'codeBlock', label: 'Code block' },
];

/** What the cursor is sitting in, as a BLOCK_OPTIONS value. */
function currentBlock(editor: Editor): string {
  if (editor.isActive('heading', { level: 1 })) return 'heading1';
  if (editor.isActive('heading', { level: 2 })) return 'heading2';
  if (editor.isActive('heading', { level: 3 })) return 'heading3';
  if (editor.isActive('blockquote')) return 'blockquote';
  if (editor.isActive('codeBlock')) return 'codeBlock';
  return 'paragraph';
}

interface MarkButton {
  key: string;
  label: string;
  /** Shown in the tooltip so the markdown shortcut stays discoverable. */
  hint: string;
  run: (e: Editor) => void;
  active: (e: Editor) => boolean;
}

// Underline and Link need no extra dependency — StarterKit v3 already bundles
// both. Highlight, text-align and image do NOT ship with it, so the three
// controls Liveblocks shows for those are deliberately absent rather than
// stubbed: a button that does nothing is worse than a missing one.
const MARKS: MarkButton[] = [
  { key: 'bold', label: 'B', hint: 'Bold  **text**', run: (e) => { e.chain().focus().toggleBold().run(); }, active: (e) => e.isActive('bold') },
  { key: 'italic', label: 'I', hint: 'Italic  *text*', run: (e) => { e.chain().focus().toggleItalic().run(); }, active: (e) => e.isActive('italic') },
  { key: 'underline', label: 'U', hint: 'Underline', run: (e) => { e.chain().focus().toggleUnderline().run(); }, active: (e) => e.isActive('underline') },
  { key: 'strike', label: 'S', hint: 'Strikethrough  ~~text~~', run: (e) => { e.chain().focus().toggleStrike().run(); }, active: (e) => e.isActive('strike') },
  { key: 'code', label: '</>', hint: 'Inline code  `text`', run: (e) => { e.chain().focus().toggleCode().run(); }, active: (e) => e.isActive('code') },
];

const LISTS: MarkButton[] = [
  { key: 'bulletList', label: '•', hint: 'Bulleted list  - item', run: (e) => { e.chain().focus().toggleBulletList().run(); }, active: (e) => e.isActive('bulletList') },
  { key: 'orderedList', label: '1.', hint: 'Numbered list  1. item', run: (e) => { e.chain().focus().toggleOrderedList().run(); }, active: (e) => e.isActive('orderedList') },
  { key: 'taskList', label: '☑', hint: 'Task list  - [ ] item', run: (e) => { e.chain().focus().toggleTaskList().run(); }, active: (e) => e.isActive('taskList') },
];

function ToolButton({
  btn, editor, testId,
}: { btn: MarkButton; editor: Editor; testId: string }) {
  const active = btn.active(editor);
  return (
    <button
      type="button"
      data-testid={testId}
      title={btn.hint}
      aria-label={btn.hint}
      // Toggles, so the state is announced rather than left to colour alone.
      aria-pressed={active}
      onMouseDown={(ev) => { ev.preventDefault(); btn.run(editor); }}
      className={cn(
        'min-w-7 h-7 px-1.5 rounded text-xs font-semibold cursor-pointer border-none',
        active ? 'bg-primary text-white' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
      )}
    >
      {btn.label}
    </button>
  );
}

function Divider() {
  return <span aria-hidden className="mx-1 h-5 w-px self-center bg-border" />;
}

export default function DocumentToolbar({
  editor,
  actions,
  'data-testid': testId = 'document-toolbar',
}: DocumentToolbarProps) {
  const setBlock = useCallback((value: string) => {
    if (!editor) return;
    const chain = editor.chain().focus();
    switch (value) {
      case 'heading1': chain.setNode('heading', { level: 1 }).run(); break;
      case 'heading2': chain.setNode('heading', { level: 2 }).run(); break;
      case 'heading3': chain.setNode('heading', { level: 3 }).run(); break;
      // Wrap, not setNode: a quote CONTAINS blocks rather than being one, so
      // setNode would replace the paragraph instead of putting it inside.
      case 'blockquote': chain.toggleBlockquote().run(); break;
      case 'codeBlock': chain.setNode('codeBlock').run(); break;
      default: chain.setParagraph().run(); break;
    }
  }, [editor]);

  // Rendering nothing while the editor boots keeps every handler below able to
  // assume a live editor, instead of guarding each one.
  if (!editor) return null;

  return (
    <div
      data-testid={testId}
      role="toolbar"
      aria-label="Document formatting"
      className="flex flex-wrap items-center gap-0.5 px-2 py-1.5"
    >
      {/* Undo/redo live leftmost, as in every writing tool. With Collaboration
          bound these are the Y.js UndoManager's, not ProseMirror's history —
          which is the correct behaviour on a shared document: undo takes back
          YOUR edit, not whatever a collaborator typed most recently. */}
      <ToolButton
        btn={{
          key: 'undo', label: '↶', hint: 'Undo',
          run: (e) => { e.chain().focus().undo().run(); }, active: () => false,
        }}
        editor={editor}
        testId={`${testId}-undo`}
      />
      <ToolButton
        btn={{
          key: 'redo', label: '↷', hint: 'Redo',
          run: (e) => { e.chain().focus().redo().run(); }, active: () => false,
        }}
        editor={editor}
        testId={`${testId}-redo`}
      />
      <Divider />

      <Select
        size="sm"
        data-testid={`${testId}-block`}
        aria-label="Text style"
        value={currentBlock(editor)}
        options={BLOCK_OPTIONS}
        onChange={(e) => setBlock(e.target.value)}
        className="w-[140px]"
      />

      <Divider />
      {MARKS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} testId={`${testId}-${b.key}`} />
      ))}

      <Divider />
      {LISTS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} testId={`${testId}-${b.key}`} />
      ))}

      <Divider />
      <ToolButton
        btn={{
          key: 'link', label: '🔗', hint: 'Link  [text](url)',
          run: (e) => {
            // Toggling off is unconditional; adding one needs a target, and
            // prompting is the caller's job in a real app. Reusing the current
            // href as the default makes editing an existing link possible
            // rather than only replacing it.
            if (e.isActive('link')) { e.chain().focus().unsetLink().run(); return; }
            const prev = (e.getAttributes('link')?.['href'] as string | undefined) ?? '';
            const url = typeof window === 'undefined' ? null : window.prompt('Link URL', prev);
            if (url === null) return;            // cancelled — change nothing
            if (url === '') { e.chain().focus().unsetLink().run(); return; }
            e.chain().focus().setLink({ href: url }).run();
          },
          active: (e) => e.isActive('link'),
        }}
        editor={editor}
        testId={`${testId}-link`}
      />
      <ToolButton
        btn={{
          key: 'hr', label: '—', hint: 'Divider  ---',
          run: (e) => { e.chain().focus().setHorizontalRule().run(); },
          active: () => false,
        }}
        editor={editor}
        testId={`${testId}-hr`}
      />

      {actions && <span className="ml-auto flex items-center gap-1">{actions}</span>}
    </div>
  );
}
