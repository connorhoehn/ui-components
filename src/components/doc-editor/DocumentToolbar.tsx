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

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import LinkPopover from './LinkPopover';
import { LINE_SPACINGS, LINE_SPACING_LABELS, type LineSpacing } from './canvasLineSpacing';

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
  /**
   * Asks the host to put a picture on the page.
   *
   * The toolbar deliberately does not own the file picker. Getting bytes into
   * a document means an upload, and where those bytes go — which channel,
   * which storage, which auth — is knowledge only the app has. What the
   * library owns is the button, its place in the bar (beside the other insert
   * controls, where a word processor puts it) and the fact that it appears at
   * all only when the schema can hold an image: `setImage` absent means the
   * editor was built without the extension, and a button that inserts a node
   * the schema will reject is worse than no button.
   */
  onInsertImage?: () => void;
  'data-testid'?: string;
}

/**
 * Typefaces a document can set, and their real stacks.
 *
 * Deliberately short and web-safe: a font a reader does not have is a font the
 * document does not have, and a picker full of names that silently fall back
 * to the same face is worse than five that are honestly different. "Default"
 * is not a font — it clears the mark and lets the page's own typography
 * through, which is what a document should look like unless someone chose
 * otherwise.
 */
const FONT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'Arial, Helvetica, sans-serif', label: 'Arial' },
  { value: 'Georgia, "Times New Roman", serif', label: 'Georgia' },
  { value: '"Times New Roman", Times, serif', label: 'Times New Roman' },
  { value: '"Courier New", Courier, monospace', label: 'Courier New' },
  { value: 'Verdana, Geneva, sans-serif', label: 'Verdana' },
];

/** The sizes a word processor offers, in points. */
const SIZE_OPTIONS = [
  { value: '', label: 'Size' },
  ...[8, 9, 10, 11, 12, 14, 18, 24, 30, 36].map((pt) => ({ value: `${pt}pt`, label: String(pt) })),
];

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

/**
 * The handlers every control in this bar needs, and the reason there are two.
 *
 * `onMouseDown` + `preventDefault` is the load-bearing half: the editor loses
 * its selection the moment focus moves to a button, and every command here acts
 * on that selection. Suppressing the default before focus moves is what keeps
 * "select three words, press B" working.
 *
 * It is also, on its own, why NOTHING IN THIS TOOLBAR WORKED FROM A KEYBOARD.
 * A button activated with Enter or Space fires `click` and no `mousedown` at
 * all, so a person tabbing to Bold and pressing Enter got silence. Measured on
 * a live page-shaped document before this was added: `isActive('bold')` was
 * false after Enter, false after Space, and true after a mouse click — the same
 * for the align, colour and table menus, which never opened. Twenty-four of the
 * bar's twenty-seven focusable controls were dead; the three that worked were
 * the native `<select>`s.
 *
 * `ev.detail === 0` is what separates the two paths. A mouse click carries the
 * click count in `detail`; a click the browser synthesises from a keypress on a
 * focused button carries 0. So the `onClick` below runs for keyboard activation
 * only and never doubles a mouse click, which a naive `onClick` would.
 */
function activate(run: () => void): {
  onMouseDown: (ev: { preventDefault: () => void }) => void;
  onClick: (ev: { detail: number }) => void;
} {
  return {
    onMouseDown: (ev) => { ev.preventDefault(); run(); },
    onClick: (ev) => { if (ev.detail === 0) run(); },
  };
}

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
      {...activate(() => btn.run(editor))}
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
const ALIGNMENTS = ['left', 'center', 'right', 'justify'] as const;
type Alignment = (typeof ALIGNMENTS)[number];

/** "Justify" is what every word processor calls it — never "align justify". */
function alignLabel(align: Alignment): string {
  return align === 'justify' ? 'Justify' : `Align ${align}`;
}

/**
 * Alignment as ONE button with a caret, the way Word and Google Docs do it.
 *
 * Four always-visible toggles is not how a word processor spends toolbar
 * width. Alignment is one setting with four values — a person picks a value,
 * they do not toggle four independent switches — so the bar shows the value
 * currently in force and opens the choice on demand. It also buys back three
 * slots in a row that has to hold everything else a document needs.
 */
/**
 * The open/closed half of a toolbar menu: shut on a click elsewhere or on Esc.
 *
 * Listeners are bound only while open, so a toolbar full of closed menus costs
 * nothing. Extracted the moment there was a second menu — this is the part
 * that gets forgotten when a control is copied, and a menu that will not close
 * is worse than one that never opened.
 */
function useToolMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (ev: MouseEvent) => {
      if (!wrapRef.current?.contains(ev.target as Node)) setOpen(false);
    };
    const onKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  return { open, setOpen, wrapRef };
}

/**
 * The colours a document offers, and nothing more.
 *
 * A full picker is a colour-management feature; a document needs a legible
 * palette. Greys first because most real use is "make this quieter", then the
 * hues, each dark enough to read as ink on white paper — the page is always
 * white (that invariant is why a light palette here is safe in both themes).
 */
const SWATCHES = [
  { value: '#202124', label: 'Black' },
  { value: '#5f6368', label: 'Grey' },
  { value: '#c5221f', label: 'Red' },
  { value: '#e8710a', label: 'Orange' },
  { value: '#188038', label: 'Green' },
  { value: '#1967d2', label: 'Blue' },
  { value: '#8430ce', label: 'Purple' },
];

/** Highlights are backgrounds, so they have to stay pale enough to read on. */
const HIGHLIGHTS = [
  { value: '#fff475', label: 'Yellow' },
  { value: '#ccff90', label: 'Green' },
  { value: '#a7ffeb', label: 'Teal' },
  { value: '#cbf0f8', label: 'Blue' },
  { value: '#fdcfe8', label: 'Pink' },
  { value: '#e6c9a8', label: 'Brown' },
];

/**
 * A swatch button that opens a palette — text colour and highlight are the
 * same control with different paint and different commands.
 */
function ColorMenu({
  editor, current, swatches, setCmd, unsetCmd, glyph, title, testId,
}: {
  editor: Editor;
  current: string;
  swatches: { value: string; label: string }[];
  setCmd: string;
  unsetCmd: string;
  glyph: string;
  title: string;
  testId: string;
}) {
  const { open, setOpen, wrapRef } = useToolMenu();

  const apply = (value: string | null) => {
    const chain = editor.chain().focus() as never as Record<string, (v?: string) => { run: () => void }>;
    // No colour is a STATE, not a colour: "None" unsets so the text goes back
    // to the page's own ink rather than to some other explicit black.
    if (value) chain[setCmd]!(value).run();
    else chain[unsetCmd]!().run();
    setOpen(false);
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={title}
        aria-label={title}
        aria-haspopup="menu"
        aria-expanded={open}
        {...activate(() => setOpen((v) => !v))}
        className={cn(
          'inline-flex h-7 flex-col items-center justify-center gap-px px-1.5 rounded text-xs cursor-pointer border-none leading-none',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
      >
        <span aria-hidden>{glyph}</span>
        {/* The bar under the glyph is the colour currently in force — the same
            way every word processor shows it, and the only way the button can
            answer "what will this do" before you open it. */}
        <span
          aria-hidden
          data-testid={`${testId}-current`}
          className="h-[3px] w-3.5 rounded-sm border border-border"
          style={{ background: current || 'transparent' }}
        />
      </button>

      {open && (
        <span
          role="menu"
          data-testid={`${testId}-menu`}
          aria-label={title}
          className="absolute left-0 top-full z-20 mt-1 grid w-[136px] grid-cols-4 gap-1 rounded-md border border-border bg-surface-panel p-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            data-testid={`${testId}-none`}
            title="None"
            aria-label="None"
            {...activate(() => apply(null))}
            className="col-span-4 rounded px-1 py-0.5 text-left text-[11px] text-text-secondary hover:bg-surface-hover cursor-pointer border-none bg-transparent"
          >
            None
          </button>
          {swatches.map((c) => (
            <button
              key={c.value}
              type="button"
              role="menuitemradio"
              aria-checked={c.value === current}
              data-testid={`${testId}-${c.label.toLowerCase()}`}
              title={c.label}
              aria-label={c.label}
              {...activate(() => apply(c.value))}
              className={cn(
                'h-6 w-6 rounded cursor-pointer border',
                c.value === current ? 'border-primary ring-1 ring-primary' : 'border-border',
              )}
              style={{ background: c.value }}
            />
          ))}
        </span>
      )}
    </span>
  );
}

/**
 * The table control: one button that inserts, and — once the cursor is inside
 * a table — the handful of edits a document actually needs.
 *
 * Google Docs puts these on a right-click menu, which is undiscoverable in a
 * web app that already has a toolbar, and Confluence puts them on a floating
 * bar that fights the comment gutter for the same margin. A menu on the bar is
 * neither, and it can say plainly whether it will insert or edit.
 *
 * Every entry is a schema command that the extension registers. Nothing here
 * is host knowledge, which is why — unlike the image button — this control
 * needs no prop: `has(editor, 'insertTable')` is the whole gate.
 */
const TABLE_EDITS: { key: string; label: string; cmd: string }[] = [
  { key: 'row-before', label: 'Insert row above', cmd: 'addRowBefore' },
  { key: 'row-after', label: 'Insert row below', cmd: 'addRowAfter' },
  { key: 'col-before', label: 'Insert column left', cmd: 'addColumnBefore' },
  { key: 'col-after', label: 'Insert column right', cmd: 'addColumnAfter' },
  { key: 'header-row', label: 'Toggle header row', cmd: 'toggleHeaderRow' },
  { key: 'merge', label: 'Merge or split cells', cmd: 'mergeOrSplit' },
  { key: 'del-row', label: 'Delete row', cmd: 'deleteRow' },
  { key: 'del-col', label: 'Delete column', cmd: 'deleteColumn' },
  { key: 'del-table', label: 'Delete table', cmd: 'deleteTable' },
];

function TableMenu({
  editor, inTable, testId,
}: { editor: Editor; inTable: boolean; testId: string }) {
  const { open, setOpen, wrapRef } = useToolMenu();

  const run = (cmd: string) => {
    const chain = editor.chain().focus() as never as Record<string, () => { run: () => void }>;
    chain[cmd]?.().run();
    setOpen(false);
  };

  const insert = () => {
    const chain = editor.chain().focus() as never as Record<
      string,
      (opts: { rows: number; cols: number; withHeaderRow: boolean }) => { run: () => void }
    >;
    // Three columns and a header row plus two body rows — the shape a person
    // draws when asked for "a table", and the one that needs the fewest
    // follow-up edits.
    chain['insertTable']!({ rows: 3, cols: 3, withHeaderRow: true }).run();
    setOpen(false);
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={inTable ? 'Table' : 'Insert table'}
        aria-label={inTable ? 'Table options' : 'Insert a table'}
        aria-haspopup="menu"
        aria-expanded={open}
        {...activate(() => setOpen((v) => !v))}
        className={cn(
          'inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
      >
        <span aria-hidden>▦</span>
        <span aria-hidden className="text-[8px] leading-none">▾</span>
      </button>

      {open && (
        <span
          role="menu"
          data-testid={`${testId}-menu`}
          aria-label="Table"
          className="absolute left-0 top-full z-20 mt-1 flex min-w-[180px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            data-testid={`${testId}-insert`}
            {...activate(insert)}
            className="cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover"
          >
            Insert table
          </button>
          {/* The edits appear only inside a table. Rendering them greyed out
              would fill the menu with nine dead rows for the case that is
              overwhelmingly common — no table under the cursor. */}
          {inTable && (
            <>
              <span aria-hidden className="my-1 h-px bg-border" />
              {TABLE_EDITS.map((e) => (
                <button
                  key={e.key}
                  type="button"
                  role="menuitem"
                  data-testid={`${testId}-${e.key}`}
                  {...activate(() => run(e.cmd))}
                  className="cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover"
                >
                  {e.label}
                </button>
              ))}
            </>
          )}
        </span>
      )}
    </span>
  );
}

function AlignMenu({
  editor, current, testId,
}: { editor: Editor; current: Alignment; testId: string }) {
  const { open, setOpen, wrapRef } = useToolMenu();

  const apply = (align: Alignment) => {
    const chain = editor.chain().focus() as never as Record<string, (a: string) => { run: () => void }>;
    chain['setTextAlign']!(align).run();
    setOpen(false);
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={alignLabel(current)}
        aria-label="Text alignment"
        aria-haspopup="menu"
        aria-expanded={open}
        {...activate(() => setOpen((v) => !v))}
        className={cn(
          'inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
      >
        <AlignIcon align={current} />
        <span aria-hidden className="text-[8px] leading-none">▾</span>
      </button>

      {open && (
        <span
          role="menu"
          data-testid={`${testId}-menu`}
          aria-label="Text alignment"
          className="absolute left-0 top-full z-20 mt-1 inline-flex gap-0.5 rounded-md border border-border bg-surface-panel p-1 shadow-lg"
        >
          {ALIGNMENTS.map((align) => (
            <button
              key={align}
              type="button"
              role="menuitemradio"
              aria-checked={align === current}
              data-testid={`${testId}-${align}`}
              title={alignLabel(align)}
              aria-label={alignLabel(align)}
              {...activate(() => apply(align))}
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded cursor-pointer border-none',
                align === current
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-text-secondary hover:bg-surface-hover',
              )}
            >
              <AlignIcon align={align} />
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

/**
 * Line spacing, beside alignment — the two paragraph-shape controls, together,
 * as in every word processor.
 *
 * The values are multiples of the paper's GRID ROW rather than of the font
 * size, and 1.15 is deliberately absent; both decisions, and what they cost the
 * baseline grid, are argued in `canvasLineSpacing.ts`. The short version is
 * that Tiptap's own `setLineHeight` is an inline mark measured in em, so on
 * this paper "Double" would render at 1.21x the paper's leading and knock the
 * page grid out by 5.6px a line.
 */
function LineSpacingMenu({
  editor, current, testId,
}: { editor: Editor; current: LineSpacing; testId: string }) {
  const { open, setOpen, wrapRef } = useToolMenu();

  const apply = (spacing: LineSpacing) => {
    const chain = editor.chain().focus() as never as Record<string, (v: string) => { run: () => void }>;
    chain['setLineSpacing']!(spacing).run();
    setOpen(false);
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={`Line spacing: ${LINE_SPACING_LABELS[current]}`}
        aria-label="Line spacing"
        aria-haspopup="menu"
        aria-expanded={open}
        {...activate(() => setOpen((v) => !v))}
        className={cn(
          'inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
      >
        <LineSpacingIcon />
        <span aria-hidden className="text-[8px] leading-none">▾</span>
      </button>

      {open && (
        <span
          role="menu"
          data-testid={`${testId}-menu`}
          aria-label="Line spacing"
          className="absolute left-0 top-full z-20 mt-1 flex min-w-[110px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg"
        >
          {LINE_SPACINGS.map((spacing) => (
            <button
              key={spacing}
              type="button"
              role="menuitemradio"
              aria-checked={spacing === current}
              data-testid={`${testId}-${spacing.replace('.', '-')}`}
              title={LINE_SPACING_LABELS[spacing]}
              aria-label={LINE_SPACING_LABELS[spacing]}
              {...activate(() => apply(spacing))}
              className={cn(
                'cursor-pointer rounded border-none px-2 py-1 text-left text-xs',
                spacing === current
                  ? 'bg-primary text-white'
                  : 'bg-transparent text-text-secondary hover:bg-surface-hover',
              )}
            >
              {LINE_SPACING_LABELS[spacing]}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

/**
 * Three lines with a double-headed arrow beside them — the glyph Word and Docs
 * both use, and the only one that says "the gap between the lines" rather than
 * "the lines".
 */
function LineSpacingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      {[2.5, 7, 11.5].map((y) => (
        <rect key={y} x="5.5" y={y} width="8" height="1.4" rx="0.7" fill="currentColor" />
      ))}
      {/* The arrow: a stem down the left with a head at each end. */}
      <rect x="2.2" y="2.5" width="1.2" height="10.4" rx="0.6" fill="currentColor" />
      <path d="M2.8 1.4 L4.6 4 L1 4 Z" fill="currentColor" />
      <path d="M2.8 14 L4.6 11.4 L1 11.4 Z" fill="currentColor" />
    </svg>
  );
}

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

/**
 * A group boundary.
 *
 * `bg-border-emphasis`, not `bg-border`, and this is the whole fix: the bar
 * sits on `--color-surface-panel` (#f8fafc) and `--color-border` is #e2e8f0 —
 * a four-percent luminance step that is not visible on a screen. Seven of
 * these were already in the row and the toolbar still read as one
 * undifferentiated run of thirty controls, because a divider nobody can see is
 * not a divider. #cbd5e1 on #f8fafc reads; in dark mode the pair is #475569 on
 * #0f172a, which reads too.
 *
 * `mx-1.5` against the row's own `gap-0.5`: 2px between siblings inside a
 * group, 14px across a boundary. The RATIO is what makes the groups legible —
 * a visible line with the same spacing either side of it still reads as one
 * long row with decoration in it.
 *
 * `data-divider` so a test can count the groups without depending on how the
 * line is painted.
 */
function Divider() {
  return (
    <span
      aria-hidden
      data-divider="true"
      className="mx-1.5 h-5 w-px shrink-0 self-center bg-border-emphasis"
    />
  );
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
  onInsertImage,
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
      flags['table'] = e.isActive('table');
      // Which list item type the caret sits in, if any. Indent and outdent
      // act on a LIST ITEM, and a task item is a different node from an
      // ordinary one — sinking the wrong type is a no-op that looks like a
      // dead button.
      flags['inListItem'] = e.isActive('listItem') || e.isActive('taskItem');
      flags['inTaskItem'] = e.isActive('taskItem');
      for (const a of ALIGNMENTS) flags[`align-${a}`] = e.isActive({ textAlign: a });
      // The caret's paragraph spacing. `getAttributes` on a node the schema
      // does not have returns {}, so an editor without the extension reads as
      // the default rather than throwing.
      const spacing = (e.getAttributes('paragraph') as { lineSpacing?: string }).lineSpacing;
      // What the cursor is actually in, so the pickers show the truth rather
      // than resetting to their first option after every click. `getAttributes`
      // on an unregistered mark returns {}, so this is safe either way.
      const style = e.getAttributes('textStyle') as {
        fontFamily?: string; fontSize?: string; color?: string; backgroundColor?: string;
      };
      return {
        block: currentBlock(e),
        flags,
        fontFamily: style.fontFamily ?? '',
        fontSize: style.fontSize ?? '',
        color: style.color ?? '',
        backgroundColor: style.backgroundColor ?? '',
        lineSpacing: (LINE_SPACINGS as readonly string[]).includes(spacing ?? '')
          ? (spacing as LineSpacing)
          : ('1' as LineSpacing),
      };
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

      {/* Typeface and size, where a word processor puts them: between the
          block-type picker and the character marks. Rendered only when the
          editor has the commands — this toolbar is shared with pages that
          register a smaller extension set, and a control that cannot act is
          worse than an absent one. */}
      {has(editor, 'setFontFamily') && (
        <>
          <Divider />
          <Select
            size="sm"
            data-testid={`${testId}-font-family`}
            aria-label="Font"
            value={state?.fontFamily ?? ''}
            options={FONT_OPTIONS}
            onChange={(e) => {
              const chain = editor.chain().focus() as never as Record<string, (v?: string) => { run: () => void }>;
              // "Default" is the ABSENCE of a choice, so it unsets rather than
              // setting some other family — otherwise a document could never
              // get back to its own typography.
              if (e.target.value) chain['setFontFamily']!(e.target.value).run();
              else chain['unsetFontFamily']!().run();
            }}
            className="w-[130px]"
          />
        </>
      )}
      {has(editor, 'setFontSize') && (
        <Select
          size="sm"
          data-testid={`${testId}-font-size`}
          aria-label="Font size"
          value={state?.fontSize ?? ''}
          options={SIZE_OPTIONS}
          onChange={(e) => {
            const chain = editor.chain().focus() as never as Record<string, (v?: string) => { run: () => void }>;
            if (e.target.value) chain['setFontSize']!(e.target.value).run();
            else chain['unsetFontSize']!().run();
          }}
          className="w-[72px]"
        />
      )}

      <Divider />
      {MARKS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} active={state?.flags[b.key] ?? false} testId={`${testId}-${b.key}`} />
      ))}

      <Divider />
      {LISTS.map((b) => (
        <ToolButton key={b.key} btn={b} editor={editor} active={state?.flags[b.key] ?? false} testId={`${testId}-${b.key}`} />
      ))}

      {/* Indent and outdent, and ONLY inside a list.
          A word processor offers these for paragraphs too, but this schema has
          no paragraph indent — offering them everywhere would give two buttons
          that quietly do nothing everywhere except a list, which is worse than
          not offering them. They appear where they work, the way the table
          edits do. */}
      {has(editor, 'sinkListItem') && (state?.flags['inListItem'] ?? false) && (
        <>
          <ToolButton
            btn={{
              key: 'outdent', label: '⇤', hint: 'Outdent  Shift-Tab',
              run: (e) => {
                const item = state?.flags['inTaskItem'] ? 'taskItem' : 'listItem';
                (e.chain().focus() as never as Record<string, (n: string) => { run: () => void }>)['liftListItem']!(item).run();
              },
              active: () => false,
            }}
            editor={editor}
            active={false}
            testId={`${testId}-outdent`}
          />
          <ToolButton
            btn={{
              key: 'indent', label: '⇥', hint: 'Indent  Tab',
              run: (e) => {
                const item = state?.flags['inTaskItem'] ? 'taskItem' : 'listItem';
                (e.chain().focus() as never as Record<string, (n: string) => { run: () => void }>)['sinkListItem']!(item).run();
              },
              active: () => false,
            }}
            editor={editor}
            active={false}
            testId={`${testId}-indent`}
          />
        </>
      )}

      {/* One COLOUR group: ink, highlight paint, and the highlight toggle.
          The toggle used to carry its own divider and stand alone, which put a
          boundary between two controls that do the same job to the same text
          and none between the lists and the palettes. The condition is the
          union of the three so the boundary appears with whichever of them the
          host's extension set actually registers, and never leaves a dangling
          line in front of nothing. */}
      {(has(editor, 'setColor') ||
        has(editor, 'setBackgroundColor') ||
        has(editor, 'toggleHighlight')) && <Divider />}

      {has(editor, 'setColor') && (
        <ColorMenu
          editor={editor}
          current={state?.color ?? ''}
          swatches={SWATCHES}
          setCmd="setColor"
          unsetCmd="unsetColor"
          glyph="A"
          title="Text colour"
          testId={`${testId}-color`}
        />
      )}
      {has(editor, 'setBackgroundColor') && (
        <ColorMenu
          editor={editor}
          current={state?.backgroundColor ?? ''}
          swatches={HIGHLIGHTS}
          setCmd="setBackgroundColor"
          unsetCmd="unsetBackgroundColor"
          glyph={'\u270E'}
          title="Highlight colour"
          testId={`${testId}-highlight-color`}
        />
      )}

      {has(editor, 'toggleHighlight') && (
        <>
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

      {(has(editor, 'setTextAlign') || has(editor, 'setLineSpacing')) && <Divider />}
      {has(editor, 'setTextAlign') && (
        <AlignMenu
          editor={editor}
          current={ALIGNMENTS.find((a) => state?.flags[`align-${a}`]) ?? 'left'}
          testId={`${testId}-align`}
        />
      )}
      {/* Line spacing sits with alignment rather than with the character
          marks: both change the SHAPE of a paragraph, and neither changes the
          letters. It is the last main-bar control Google Docs had and this one
          did not. */}
      {has(editor, 'setLineSpacing') && (
        <LineSpacingMenu
          editor={editor}
          current={state?.lineSpacing ?? '1'}
          testId={`${testId}-line-spacing`}
        />
      )}

      {/* INSERT: link, rule, table, image — the things that put something new
          on the page, as opposed to everything left of here, which restyles
          what is already there. */}
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
      {has(editor, 'insertTable') && (
        <TableMenu
          editor={editor}
          inTable={state?.flags['table'] ?? false}
          testId={`${testId}-table`}
        />
      )}
      {onInsertImage && has(editor, 'setImage') && (
        <ToolButton
          btn={{
            key: 'image', label: '🖼', hint: 'Insert image',
            run: () => { onInsertImage(); },
            active: () => false,
          }}
          editor={editor}
          active={false}
          testId={`${testId}-image`}
        />
      )}

      {/* Clear formatting sits LAST, alone behind its own boundary, which is
          where Word and Google Docs both put it. It used to be wedged between
          the link and the horizontal rule, in the middle of the insert group —
          a destructive command inside a run of additive ones, one slip away
          from stripping a paragraph you meant to add a table to. */}
      {has(editor, 'unsetAllMarks') && (
        <>
          <Divider />
          <ToolButton
            btn={{
              key: 'clear-formatting', label: '⌫', hint: 'Clear formatting',
              // Marks AND block type, which is what "clear formatting" means in
              // every word processor: a bolded heading becomes normal text, not
              // an unbolded heading. `clearNodes` unwraps a list too — also
              // correct, and also what people expect.
              run: (e) => { e.chain().focus().unsetAllMarks().clearNodes().run(); },
              active: () => false,
            }}
            editor={editor}
            active={false}
            testId={`${testId}-clear-formatting`}
          />
        </>
      )}

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
