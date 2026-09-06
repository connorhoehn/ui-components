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

import { useCallback, useRef, useState, type ReactNode } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import LinkPopover from './LinkPopover';

export interface DocumentToolbarProps {
  editor: Editor | null;
  /** Rendered at the end of the bar — insert-macro menus, share, etc. */
  actions?: ReactNode;
  /**
   * How many comment threads the margin gutter holds.
   *
   * A first-class prop rather than something the page shoves into `actions`,
   * because `actions` is the HOST's slot: whatever the app passes (presence,
   * share) lands there, and merging a library-owned control into it means the
   * toolbar can no longer decide where its own control sits, nor keep a host
   * that fills the slot from displacing it.
   */
  commentCount?: number;
  /** Whether the gutter is currently showing. Drives `aria-pressed`. */
  gutterVisible?: boolean;
  /**
   * Toggles the gutter. Its absence — or a zero count — means no control at
   * all: a toggle for a gutter with nothing in it is a button that does
   * nothing visible, which reads as broken rather than as empty.
   */
  onToggleGutter?: () => void;
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
  /** ReactNode so a control can carry a drawn icon rather than a character. */
  label: ReactNode;
  /** Shown in the tooltip so the markdown shortcut stays discoverable. */
  hint: string;
  run: (e: Editor) => void;
  active: (e: Editor) => boolean;
}

/**
 * True when the editor actually has a command — i.e. the extension providing
 * it is registered.
 *
 * Highlight and text-align do not ship with StarterKit, and adding them as
 * dependencies HERE would push two packages onto every consumer of this
 * library for two buttons most pages do not want. So they are detected
 * instead: register `@tiptap/extension-highlight` or
 * `@tiptap/extension-text-align` in the `extensions` you pass to the canvas
 * and the controls appear; leave them out and they do not.
 *
 * The alternative — always rendering them — is the thing worth avoiding: a
 * button that silently does nothing is worse than a missing one, because the
 * user cannot tell the difference between "unsupported" and "broken".
 */
function has(editor: Editor, command: string): boolean {
  return typeof (editor.commands as unknown as Record<string, unknown>)[command] === 'function';
}

// Underline and Link need no extra dependency — StarterKit v3 already bundles
// both.
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
  btn, editor, testId, active,
}: { btn: MarkButton; editor: Editor; testId: string; active: boolean }) {
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

/**
 * Alignment, drawn the way every word processor draws it: four lines whose
 * ragged edge IS the alignment.
 *
 * The previous labels were `⯇`, `≡` and `⯈` — two triangles and an
 * "identical to" sign. A triangle pointing left does not mean left-aligned
 * anywhere; it means play-in-reverse. Nothing in that row read as alignment.
 */
function AlignIcon({ align }: { align: 'left' | 'center' | 'right' | 'justify' }) {
  // Long lines are full width; the short ones are the ragged edge, placed
  // opposite the side the text is anchored to. Justify has no ragged edge at
  // all — that is the whole point of it.
  const short = align === 'justify' ? 12 : 7;
  const shortX = align === 'right' ? 6 : align === 'center' ? 3.5 : 1;
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      {[2, 5, 8, 11].map((y, i) => {
        const isShort = i % 2 === 1;
        return (
          <rect
            key={y}
            x={isShort ? shortX : 1}
            y={y}
            width={isShort ? short : 12}
            height="1.4"
            rx="0.7"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

function Divider() {
  return <span aria-hidden className="mx-1 h-5 w-px self-center bg-border" />;
}

/**
 * The gutter switch.
 *
 * It carries the COUNT, and that is the whole design. Hiding the margin is a
 * reading-room preference, but a preference that erases the fact that three
 * people questioned a paragraph is a trap: the next reader opens the document,
 * sees clean prose, and never learns there was an argument about it. So the
 * control is never a bare eye icon — the number stays on screen whether the
 * threads are showing or not, and "hidden" is stated rather than implied by
 * the absence of a column the reader cannot know used to be there.
 */
function GutterToggle({
  count, visible, onToggle, testId,
}: { count: number; visible: boolean; onToggle: () => void; testId: string }) {
  const label = `${visible ? 'Hide' : 'Show'} comments (${count})`;
  return (
    <button
      type="button"
      data-testid={testId}
      title={label}
      // The accessible name carries the count too — a screen-reader user gets
      // the same "there are three of these" signal the badge gives visually.
      aria-label={label}
      aria-pressed={visible}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-1.5 h-7 px-2 rounded border text-xs font-semibold cursor-pointer',
        // Chrome, not paper: the toolbar is themed, so both states use surface
        // and primary tokens and go dark with the rest of the app.
        visible
          ? 'bg-primary text-white border-primary'
          // Off is TINTED, not greyed out. A disabled-looking control would
          // say "no comments"; this says "comments, currently put away".
          : 'bg-primary-bg text-primary-fg border-primary-border hover:bg-surface-hover',
      )}
    >
      <span>Comments</span>
      <span
        className={cn(
          'rounded-full px-1.5 leading-4 tabular-nums',
          visible ? 'bg-white/25 text-white' : 'bg-primary text-white',
        )}
      >
        {count}
      </span>
      {!visible && (
        <span className="text-[10px] font-normal uppercase tracking-wide">hidden</span>
      )}
    </button>
  );
}

export default function DocumentToolbar({
  editor,
  actions,
  commentCount = 0,
  gutterVisible = true,
  onToggleGutter,
  'data-testid': testId = 'document-toolbar',
}: DocumentToolbarProps) {
  // Subscribes to the editor so the controls track the CURSOR, not just the
  // last render. Reading `editor.isActive()` inline during render looks like
  // it works and does not: nothing re-renders when the selection moves, so B
  // never lit up on entering bold text and the block dropdown never followed
  // the caret.
  //
  // `useEditorState` rather than a plain `editor.on('transaction')` re-render
  // because it shallow-compares this slice: a transaction that does not change
  // any of these flags — which is most of them, every keystroke inside one
  // paragraph — re-renders nothing.
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null;
      const flags: Record<string, boolean> = {};
      for (const b of [...MARKS, ...LISTS]) flags[b.key] = b.active(e);
      flags['link'] = e.isActive('link');
      // Optional extensions — isActive on an unregistered mark is simply
      // false, so this is safe whether or not they are present.
      flags['highlight'] = e.isActive('highlight');
      for (const a of ['left', 'center', 'right']) flags[`align-${a}`] = e.isActive({ textAlign: a });
      return { block: currentBlock(e), flags };
    },
  });

  const linkAnchor = useRef<HTMLSpanElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);

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
        active={false}
        testId={`${testId}-undo`}
      />
      <ToolButton
        btn={{
          key: 'redo', label: '↷', hint: 'Redo',
          run: (e) => { e.chain().focus().redo().run(); }, active: () => false,
        }}
        editor={editor}
        active={false}
        testId={`${testId}-redo`}
      />
      <Divider />

      <Select
        size="sm"
        data-testid={`${testId}-block`}
        aria-label="Text style"
        value={state?.block ?? 'paragraph'}
        options={BLOCK_OPTIONS}
        onChange={(e) => setBlock(e.target.value)}
        className="w-[140px]"
      />

      <Divider />
      {MARKS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} active={state?.flags[b.key] ?? false} testId={`${testId}-${b.key}`} />
      ))}

      <Divider />
      {LISTS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} active={state?.flags[b.key] ?? false} testId={`${testId}-${b.key}`} />
      ))}

      {has(editor, 'toggleHighlight') && (
        <>
          <Divider />
          <ToolButton
            btn={{
              key: 'highlight', label: '🖍', hint: 'Highlight',
              run: (e) => { (e.chain().focus() as never as Record<string, () => { run: () => void }>)['toggleHighlight']!().run(); },
              active: (e) => e.isActive('highlight'),
            }}
            editor={editor}
            active={state?.flags['highlight'] ?? false}
            testId={`${testId}-highlight`}
          />
        </>
      )}

      {has(editor, 'setTextAlign') && (
        <>
          <Divider />
          {(['left', 'center', 'right', 'justify'] as const).map((align) => (
            <ToolButton
              key={align}
              btn={{
                key: `align-${align}`,
                label: <AlignIcon align={align} />,
                // Justify is not "align justify" in any word processor's
                // wording, and it is the one of the four people hunt for.
                hint: align === 'justify' ? 'Justify' : `Align ${align}`,
                run: (e) => {
                  const chain = e.chain().focus() as never as Record<string, (a: string) => { run: () => void }>;
                  chain['setTextAlign']!(align).run();
                },
                active: (e) => e.isActive({ textAlign: align }),
              }}
              editor={editor}
              active={state?.flags[`align-${align}`] ?? false}
              testId={`${testId}-align-${align}`}
            />
          ))}
        </>
      )}

      <Divider />
      <span ref={linkAnchor} className="inline-flex">
        <ToolButton
          btn={{
            key: 'link', label: '🔗', hint: 'Link  [text](url)',
            // Opening a panel, not prompting. Toggling OFF is immediate
            // because it needs no input; adding or editing needs a URL, and a
            // native prompt for that was a browser-chrome modal that blocked
            // the page and could not be themed or validated.
            run: (e) => {
              if (e.isActive('link')) { e.chain().focus().unsetLink().run(); return; }
              setLinkOpen(true);
            },
            active: (e) => e.isActive('link'),
          }}
          editor={editor}
          active={state?.flags['link'] ?? false}
          testId={`${testId}-link`}
        />
      </span>
      <ToolButton
        btn={{
          key: 'hr', label: '—', hint: 'Divider  ---',
          run: (e) => { e.chain().focus().setHorizontalRule().run(); },
          active: () => false,
        }}
        editor={editor}
        active={false}
        testId={`${testId}-hr`}
      />

      {(onToggleGutter && commentCount > 0) || actions ? (
        <span className="ml-auto flex items-center gap-1">
          {/* Left of the host's actions so presence avatars stay pinned to the
              far edge where every collaborative tool puts them. */}
          {onToggleGutter && commentCount > 0 && (
            <GutterToggle
              count={commentCount}
              visible={gutterVisible}
              onToggle={onToggleGutter}
              testId={`${testId}-gutter-toggle`}
            />
          )}
          {actions}
        </span>
      ) : null}

      <LinkPopover
        trigger={linkAnchor}
        open={linkOpen}
        onClose={() => setLinkOpen(false)}
        initialHref={(editor.getAttributes('link')?.['href'] as string | undefined) ?? ''}
        onSubmit={(href) => { editor.chain().focus().setLink({ href }).run(); }}
        {...(editor.isActive('link')
          ? { onRemove: () => { editor.chain().focus().unsetLink().run(); } }
          : {})}
        data-testid={`${testId}-link-popover`}
      />
    </div>
  );
}
