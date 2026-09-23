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

import {
  createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useRef, useState,
  type KeyboardEvent as ReactKeyboardEvent, type MutableRefObject, type ReactNode, type RefObject,
} from 'react';
import { useEditorState, type Editor } from '@tiptap/react';
import { cn } from '../../lib/cn';
import { Select } from '../forms/Select';
import { useRovingToolbar } from '../shared/RovingToolbar';
import LinkPopover from './LinkPopover';
import { LINE_SPACINGS, LINE_SPACING_LABELS, type LineSpacing } from './canvasLineSpacing';
import { useMeasuredWidth } from './useMeasuredWidth';
import {
  BULLET_STYLES, NUMBER_STYLES, MULTILEVEL_STYLES, LIST_STYLE_LABELS, parseListStyle, type ListStyle,
} from './canvasListStyle';
import type { DocumentZoomControl } from './DocumentStatusBar';
import {
  BulletListIcon, ChecklistIcon, ChevronIcon, CodeIcon, HighlighterIcon, ImageIcon, LinkIcon, ListStyleIcon,
  MoreIcon, NumberedListIcon, RedoIcon, UndoIcon,
} from '../ui/Icons';

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
  /**
   * How many PROPOSED EDITS sit in the same margin, which is a different
   * thing and has to be counted separately.
   *
   * The gutter holds both, and the toggle used to be handed the total under
   * the name `commentCount` — so a document whose margin held one suggestion
   * and no discussion at all read "Comments 1", and the reader went looking
   * for a thread that did not exist. The count was never the wrong part; the
   * noun was. Splitting the two inputs is what lets the control pick a noun
   * that is true of what it is actually hiding.
   */
  suggestionCount?: number;
  /** Whether the gutter is currently showing. Drives `aria-pressed`. */
  gutterVisible?: boolean;
  /**
   * Toggles the gutter. Its absence — or an empty margin — means no control at
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
  /**
   * `compact` is the toolbar for a document shown INSIDE something else — a
   * chat's side pane, a card. Undo/redo, the inline marks, lists and link;
   * no typefaces, colours, alignment, tables or images. Those still exist
   * (the full page has them), they are just not what a reading pane is for.
   */
  density?: 'full' | 'compact';
  /**
   * How much of the bar fits on ONE row. `auto` (the default) measures the
   * bar's own box and picks `wide` / `medium` / `narrow` — see
   * `DOCUMENT_TOOLBAR_BREAKPOINTS`. A fixed value is for tests and stories.
   *
   * The bar never wraps. It used to (`flex-wrap`), and at a 1280px window the
   * page editor's toolbar took THREE rows — B and I on the first, the rest on
   * the second, and the host's Comment button alone on a third — leaving
   * about 200px of paper. A toolbar is one line of controls in every word
   * processor; what does not fit goes behind ⋯, the way Docs and Word do it.
   */
  size?: DocumentToolbarSize | 'auto';
  /**
   * The page's zoom, passed when the page has no status bar to carry it
   * (`CanvasDocumentView showStatusBar={false}`). The ⋯ overflow offers it as
   * a Zoom group — 100%, the other `steps`, and Fit width when `onFitWidth`
   * is present. Absent, no zoom item renders.
   */
  zoomControl?: DocumentZoomControl;
  /**
   * Where the occasional controls live (since 2.386.5). `inline` (default) is
   * the classic bar: alignment, spacing, indent, rule, table and clear
   * formatting sit on the row until the width folds them. `overflow` is the
   * word-processor row a page editor draws — undo · styles · marks · link and
   * image · lists (with style menus) · colour · highlight · ⋯ — and those
   * occasional controls always live behind ⋯.
   */
  extras?: 'inline' | 'overflow';
  'data-testid'?: string;
}

/** One-row layouts, widest first. */
export type DocumentToolbarSize = 'wide' | 'medium' | 'narrow';

/**
 * Content-box widths (px) of the bar itself, not the window: the same toolbar
 * sits in a full-width page, beside a workbench, and inside a chat pane.
 *
 * - wide (≥ 1240): everything inline — this is the old bar.
 * - medium (≥ 840): the style selects, bold/italic/underline, bullet and
 *   numbered lists and link stay; strike, inline code, the task list, the
 *   colour palettes, alignment, spacing, inserts and clear-formatting move
 *   behind ⋯. The host's actions read `useDocumentToolbarSize()` and shrink
 *   too (the page's Comment button becomes an icon beside the presence
 *   avatars).
 * - narrow: the three style selects fold into one `Style ▾` panel.
 *
 * Measured, not guessed (every extension registered, the page's avatars and
 * Comment in `actions`): the wide bar's natural width is ~1200px, medium's
 * ~820px, narrow's ~520px. The page editor's bar is 892px wide at a 1640px
 * window and 532px at 1280px.
 */
export const DOCUMENT_TOOLBAR_BREAKPOINTS = { narrow: 840, wide: 1240 } as const;

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export function documentToolbarSize(width: number | null): DocumentToolbarSize {
  if (width == null) return 'wide';
  if (width < DOCUMENT_TOOLBAR_BREAKPOINTS.narrow) return 'narrow';
  if (width < DOCUMENT_TOOLBAR_BREAKPOINTS.wide) return 'medium';
  return 'wide';
}

const SizeContext = createContext<DocumentToolbarSize>('wide');

/**
 * A full bar draws 36px controls with 18px glyphs (2.386.5) — the size a page
 * editor's toolbar reads at. The compact bar in a chat pane keeps 28px.
 */
const RoomyContext = createContext(false);
const BTN_ROOMY = 'h-9 min-w-8 px-1.5 rounded-md text-[15px]';
const BTN_COMPACT = 'h-7 min-w-7 px-1.5 rounded text-xs';
/** Glyph size for a drawn icon in the bar. */
const useGlyph = () => (useContext(RoomyContext) ? 18 : 14);

/**
 * The bar's current layout, for whatever a host renders into `actions`.
 *
 * The slot sits inside the bar, so the host's controls are on the same row
 * and subject to the same width — a labelled "Comment" button that stays
 * labelled at `medium` is the control that pushed the bar onto a third row.
 * Outside a `DocumentToolbar` this reads `wide`.
 */
export function useDocumentToolbarSize(): DocumentToolbarSize {
  return useContext(SizeContext);
}

/**
 * The groups a width can take off the bar. `selects` off means the `Style ▾`
 * panel is on; everything else off means it sits in the ⋯ group. Undo/redo,
 * bold/italic/underline, bullet/numbered and link never leave the bar.
 */
type ToolbarGroup = 'selects' | 'marksExtra' | 'listsExtra' | 'indent' | 'colour' | 'shape' | 'insert' | 'image' | 'clear';
const EVERY_GROUP: readonly ToolbarGroup[] = ['selects', 'marksExtra', 'listsExtra', 'indent', 'colour', 'shape', 'insert', 'image', 'clear'];

/**
 * `size="auto"`: the order groups leave the bar in when it runs out of room,
 * first to go first. The bar MEASURES what it needs rather than guessing from
 * a breakpoint (2.385.6): at a 1672px window the page editor's bar is ~1230px
 * wide, just under the 1240 `wide` breakpoint, and it used to fold strike,
 * code, the task list, colour, highlight and the image behind ⋯ with 400px of
 * the row standing empty. Now each group stays until it genuinely does not
 * fit. The least-used go first — clear formatting, alignment/spacing, rule and
 * table — and the style selects last, since they are what a writer reads.
 */
const TUCK_ORDER: readonly ToolbarGroup[] = ['clear', 'shape', 'insert', 'indent', 'colour', 'image', 'listsExtra', 'marksExtra', 'selects'];
/** `extras="overflow"`: these live behind ⋯ at every width. */
const ALWAYS_OVERFLOW: ReadonlySet<ToolbarGroup> = new Set(['indent', 'shape', 'insert', 'clear']);
/** `extras="overflow"`: what folds as the row narrows, first to go first. */
const OVERFLOW_TUCK_ORDER: readonly ToolbarGroup[] = ['image', 'colour', 'listsExtra', 'marksExtra', 'selects'];
const INLINE_GROUPS: Record<DocumentToolbarSize, ReadonlySet<ToolbarGroup>> = {
  wide: new Set(EVERY_GROUP),
  medium: new Set(['selects']),
  narrow: new Set([]),
};
/** The marks and lists that leave the bar first. */
const EXTRA_MARKS: ReadonlySet<string> = new Set(['strike', 'code']);
const EXTRA_LISTS: ReadonlySet<string> = new Set(['taskList']);

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
  // A DESTROYED editor still satisfies `Editor | null`, and Tiptap's
  // `commands` getter dereferences a command manager that is gone by then —
  // "Cannot read properties of null (reading 'commands')", thrown from inside
  // Tiptap while the toolbar was only asking whether a button exists. It
  // happens when a document changes shape while its page is mounted (a
  // sections document seeded into a canvas), which tears one editor down while
  // the toolbar still holds it for a render.
  if (editor.isDestroyed) return false;
  try {
    return typeof (editor.commands as unknown as Record<string, unknown>)[command] === 'function';
  } catch {
    return false;
  }
}

/** A drawn icon at the bar's glyph size. */
function Glyph({ icon: Icon }: { icon: (p: { size?: number }) => ReactNode }) {
  const size = useGlyph();
  return <Icon size={size} />;
}

// Underline and Link need no extra dependency — StarterKit v3 already bundles
// both.
const MARKS: MarkButton[] = [
  { key: 'bold', label: <span className="font-bold">B</span>, hint: 'Bold  **text**', run: (e) => { e.chain().focus().toggleBold().run(); }, active: (e) => e.isActive('bold') },
  { key: 'italic', label: <span className="font-serif italic">I</span>, hint: 'Italic  *text*', run: (e) => { e.chain().focus().toggleItalic().run(); }, active: (e) => e.isActive('italic') },
  { key: 'underline', label: <span className="underline underline-offset-2">U</span>, hint: 'Underline', run: (e) => { e.chain().focus().toggleUnderline().run(); }, active: (e) => e.isActive('underline') },
  { key: 'strike', label: <span className="line-through">S</span>, hint: 'Strikethrough  ~~text~~', run: (e) => { e.chain().focus().toggleStrike().run(); }, active: (e) => e.isActive('strike') },
  { key: 'code', label: <Glyph icon={CodeIcon} />, hint: 'Inline code  `text`', run: (e) => { e.chain().focus().toggleCode().run(); }, active: (e) => e.isActive('code') },
];

const LISTS: MarkButton[] = [
  { key: 'bulletList', label: <Glyph icon={BulletListIcon} />, hint: 'Bulleted list  - item', run: (e) => { e.chain().focus().toggleBulletList().run(); }, active: (e) => e.isActive('bulletList') },
  { key: 'orderedList', label: <Glyph icon={NumberedListIcon} />, hint: 'Numbered list  1. item', run: (e) => { e.chain().focus().toggleOrderedList().run(); }, active: (e) => e.isActive('orderedList') },
  { key: 'taskList', label: <Glyph icon={ChecklistIcon} />, hint: 'Task list  - [ ] item', run: (e) => { e.chain().focus().toggleTaskList().run(); }, active: (e) => e.isActive('taskList') },
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

/**
 * The focus ring every menu item wears.
 *
 * The UA default is an `outline: auto 1px` drawn on the element's own edge,
 * which is fine on a text row and invisible on a 24px square filled edge to
 * edge with the colour it names. A ring is drawn OUTSIDE the box, so it reads
 * on paint as well as on panel. `focus-visible`, not `focus`, so a mouse click
 * does not leave a ring behind — which is also why this cannot be an inline
 * style: `:focus-visible` has no inline form.
 */
const MENU_ITEM_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

function ToolButton({
  btn, editor, testId, active,
}: { btn: MarkButton; editor: Editor; testId: string; active: boolean }) {
  const roomy = useContext(RoomyContext);
  return (
    <button
      type="button"
      data-testid={testId}
      title={btn.hint}
      // The NAME, not the hint. A hint is written for the eye — "Bold  **text**"
      // — and a screen reader says it literally: "Bold star star text star
      // star". The markdown half belongs in the tooltip, where it teaches the
      // shortcut, and the accessible name is the plain verb. Split on the
      // double space the hints already use to separate the two.
      aria-label={btn.hint.split('  ')[0]}
      // Toggles, so the state is announced rather than left to colour alone.
      aria-pressed={active}
      {...activate(() => btn.run(editor))}
      className={cn(
        'inline-flex items-center justify-center font-semibold cursor-pointer border-none',
        roomy ? BTN_ROOMY : BTN_COMPACT,
        active ? 'bg-primary text-on-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
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
 * A toolbar menu, with the semantics a menu is supposed to have.
 *
 * The previous version of this hook was five lines: an `open` boolean, a
 * click-outside listener and an Escape listener. That was enough to make the
 * menus USABLE — Tab reached the items because they are ordinary buttons, and
 * Escape shut the panel — and not enough to make them a MENU. Measured on a
 * live page-shaped document, with the align menu open and the trigger focused:
 * ArrowDown, ArrowUp, ArrowRight, Home, End and a printable key all left
 * `document.activeElement` on `document-toolbar-align`. Nothing moved. The
 * same for colour, table and line spacing — `aria-activedescendant` was null
 * throughout and the trigger carried no `aria-controls`. A screen-reader user
 * told "menu, collapsed/expanded" got a menu they could only walk with Tab,
 * which is precisely the interaction a menu exists to replace.
 *
 * What this adds, and why each piece:
 *
 *   * **Roving focus over real DOM focus**, not a virtual cursor. It is what
 *     the APG menu-button pattern specifies, it needs no per-item wiring
 *     beyond an id, and it keeps the focus RING on the item the user is on —
 *     `aria-activedescendant` alone moves the announcement and leaves the
 *     highlight behind. `aria-activedescendant` is set on the menu as well, so
 *     the relationship is exposed either way an AT chooses to read it.
 *   * **Navigation reads the DOM, ids come from React.** The table menu grows
 *     nine rows when the caret enters a table, so an index-keyed registry
 *     would have to be rebuilt on every selection change. Querying
 *     `[role^="menuitem"]` inside the menu is always in document order and
 *     always current; React still owns the id and the tabindex, so nothing
 *     mutates attributes behind its back.
 *   * **Focus moves into the menu only on a KEYBOARD open.** A mouse open must
 *     not touch focus: every control here runs `preventDefault` on `mousedown`
 *     precisely so the editor keeps the selection the command acts on, and
 *     pulling focus into the panel would undo that on the way in. The
 *     discriminator is the same `ev.detail === 0` the buttons already use —
 *     see `activate` — and it is deliberately not duplicated by hand.
 *   * **Tab closes and moves on.** The trigger is focused first and the
 *     default is NOT prevented, so the browser continues from the trigger to
 *     the next toolbar control instead of dropping focus on `body` when the
 *     menu unmounts under it.
 *   * **A focus that lands outside closes the menu.** With roving tabindex
 *     every item is `tabIndex=-1` until the menu is entered from the keyboard,
 *     so Tab from a mouse-opened trigger skips the panel entirely — and a
 *     mousedown-only outside listener would have left it hanging open behind
 *     the control the user just moved to.
 */
interface ToolMenu {
  open: boolean;
  /**
   * Shut the menu after a choice.
   *
   * Focus goes back to the trigger only when it was inside the menu to begin
   * with — the keyboard path. On the mouse path focus is still in the EDITOR,
   * where `chain().focus()` just put it, and pulling it onto the trigger would
   * blur the document the command was run against.
   */
  close: () => void;
  wrapRef: RefObject<HTMLSpanElement | null>;
  /** Spread on the trigger button. Carries the `activate` handler pair. */
  triggerProps: {
    ref: RefObject<HTMLButtonElement | null>;
    'aria-haspopup': 'menu';
    'aria-expanded': boolean;
    'aria-controls'?: string;
    onMouseDown: (ev: { preventDefault: () => void }) => void;
    onClick: (ev: { detail: number }) => void;
    onKeyDown: (ev: ReactKeyboardEvent) => void;
  };
  /** Spread on the `role="menu"` container. */
  menuProps: {
    ref: (el: HTMLElement | null) => void;
    id: string;
    role: 'menu';
    tabIndex: -1;
    'aria-activedescendant'?: string;
    onKeyDown: (ev: ReactKeyboardEvent) => void;
  };
  /** Spread on each item. `key` must be unique within the menu. */
  itemProps: (key: string) => { id: string; tabIndex: 0 | -1 };
}

/** How long a typeahead buffer stays open. Word and Docs both sit near here. */
const TYPEAHEAD_MS = 700;

function useToolMenu(): ToolMenu {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const menuId = useId();
  // The item the roving cursor is on, by DOM id. Null means "the menu is open
  // but has not been entered" — the state a mouse open leaves it in.
  const [activeId, setActiveId] = useState<string | null>(null);
  // Set when a keyboard open asks for an entry point the menu has not rendered
  // yet; resolved against the real items in a layout effect below.
  const [entry, setEntry] = useState<'first' | 'last' | null>(null);
  const typed = useRef({ buf: '', at: 0 });

  const items = useCallback(
    () => (menuRef.current
      ? Array.from(menuRef.current.querySelectorAll<HTMLElement>('[role^="menuitem"]'))
      : []),
    [],
  );

  const shut = useCallback((focusTrigger: boolean) => {
    setOpen(false);
    setActiveId(null);
    setEntry(null);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const close = useCallback(() => {
    shut(!!(document.activeElement && wrapRef.current?.contains(document.activeElement)));
  }, [shut]);

  // Close on a click elsewhere, on Escape from anywhere, and on focus landing
  // outside. Bound only while open, so a bar full of closed menus costs
  // nothing. Escape lives here rather than on the menu because a mouse-opened
  // menu leaves focus in the EDITOR, and Escape has to shut it from there too.
  useEffect(() => {
    if (!open) return;
    const inside = (n: Node | null) => !!(n && wrapRef.current?.contains(n));
    const onDown = (ev: MouseEvent) => { if (!inside(ev.target as Node)) shut(false); };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== 'Escape') return;
      // Focus goes back to the trigger only if it was in the menu to begin
      // with. Yanking it out of the editor would be worse than leaving it.
      shut(inside(document.activeElement));
    };
    const onFocusIn = (ev: FocusEvent) => { if (!inside(ev.target as Node)) shut(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [open, shut]);

  // A keyboard open asked for the first or the last item; the menu has now
  // rendered, so resolve it. `aria-checked` wins over "first" — landing on the
  // value already in force is what every value menu does, and it is the only
  // entry point that tells you what the current setting IS.
  useLayoutEffect(() => {
    if (!open || entry === null) return;
    const list = items();
    if (list.length === 0) return;
    const checked = list.find((el) => el.getAttribute('aria-checked') === 'true');
    const target = entry === 'last' ? list[list.length - 1] : (checked ?? list[0]);
    setActiveId(target?.id ?? null);
    setEntry(null);
  }, [open, entry, items]);

  // React sets tabIndex in the same commit that this reads, so the item is
  // focusable by the time it is focused.
  useEffect(() => {
    if (!open || !activeId) return;
    document.getElementById(activeId)?.focus();
  }, [open, activeId]);

  const navigate = useCallback((ev: ReactKeyboardEvent): void => {
    const list = items();
    if (list.length === 0) return;
    const idx = list.findIndex((el) => el.id === activeId);
    const to = (next: number) => {
      ev.preventDefault();
      const el = list[(next + list.length) % list.length];
      if (el) setActiveId(el.id);
    };

    switch (ev.key) {
      // Both axes, both menus: this bar holds a 4x2 colour grid and three
      // vertical lists, and a person reaches for whichever arrow points along
      // the shape they can see.
      case 'ArrowDown': case 'ArrowRight': return to(idx < 0 ? 0 : idx + 1);
      case 'ArrowUp': case 'ArrowLeft': return to(idx < 0 ? list.length - 1 : idx - 1);
      case 'Home': return to(0);
      case 'End': return to(list.length - 1);
      // Focus the trigger BEFORE closing and let the default run: the browser
      // then continues from a live element instead of from one that unmounts.
      case 'Tab': triggerRef.current?.focus(); shut(false); return;
      // The button's own activation handles these — see `activate`.
      case 'Enter': case ' ': return;
      default: break;
    }

    if (ev.key.length !== 1 || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    const now = Date.now();
    const buf = (now - typed.current.at < TYPEAHEAD_MS ? typed.current.buf : '') + ev.key.toLowerCase();
    typed.current = { buf, at: now };
    // The accessible name, not the glyph: the align and spacing items draw an
    // icon or a number, and "Justify" is what a person types looking for it.
    const name = (el: HTMLElement) => (el.getAttribute('aria-label') || el.textContent || '').trim().toLowerCase();
    // From the item AFTER the cursor, wrapping — so repeating a letter walks
    // the matches rather than sticking on the first.
    const order = [...list.slice(idx + 1), ...list.slice(0, idx + 1)];
    const hit = order.find((el) => name(el).startsWith(buf));
    if (hit) { ev.preventDefault(); setActiveId(hit.id); }
  }, [activeId, items, shut]);

  const onTriggerKeyDown = useCallback((ev: ReactKeyboardEvent): void => {
    if (open) { navigate(ev); return; }
    if (ev.key === 'ArrowDown') { ev.preventDefault(); setOpen(true); setEntry('first'); return; }
    if (ev.key === 'ArrowUp') { ev.preventDefault(); setOpen(true); setEntry('last'); }
  }, [open, navigate]);

  return {
    open,
    close,
    wrapRef,
    triggerProps: {
      ref: triggerRef,
      'aria-haspopup': 'menu',
      'aria-expanded': open,
      // Only while the panel exists: pointing at an id that is not in the
      // document is an authoring error, not a hint.
      ...(open ? { 'aria-controls': menuId } : {}),
      // The same two-handler shape every control in this bar uses, and the
      // same `ev.detail === 0` discriminator — a mouse click carries the click
      // count, a click synthesised from Enter or Space carries 0. The keyboard
      // path additionally asks for the menu to be ENTERED; the mouse path must
      // not touch focus at all, or the selection the command acts on is gone.
      onMouseDown: (ev) => { ev.preventDefault(); setOpen((v) => !v); setActiveId(null); },
      onClick: (ev) => {
        if (ev.detail !== 0) return;
        setOpen((v) => {
          if (v) { setActiveId(null); return false; }
          setEntry('first');
          return true;
        });
      },
      onKeyDown: onTriggerKeyDown,
    },
    menuProps: {
      ref: (el) => { menuRef.current = el; },
      id: menuId,
      role: 'menu',
      tabIndex: -1,
      ...(activeId ? { 'aria-activedescendant': activeId } : {}),
      onKeyDown: navigate,
    },
    itemProps: (key: string) => {
      const id = `${menuId}${key}`;
      return { id, tabIndex: activeId === id ? 0 : -1 };
    },
  };
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
  glyph: ReactNode;
  title: string;
  testId: string;
}) {
  const { open, close, wrapRef, triggerProps, menuProps, itemProps } = useToolMenu();
  const roomy = useContext(RoomyContext);

  const apply = (value: string | null) => {
    const chain = editor.chain().focus() as never as Record<string, (v?: string) => { run: () => void }>;
    // No colour is a STATE, not a colour: "None" unsets so the text goes back
    // to the page's own ink rather than to some other explicit black.
    if (value) chain[setCmd]!(value).run();
    else chain[unsetCmd]!().run();
    close();
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={title}
        aria-label={title}
        {...triggerProps}
        className={cn(
          'inline-flex items-center justify-center gap-1 cursor-pointer border-none leading-none',
          roomy ? 'h-9 rounded-md px-1.5 text-[16px] font-semibold' : 'h-7 rounded px-1.5 text-xs',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
        )}
      >
        <span className="inline-flex flex-col items-center justify-center gap-px">
          <span aria-hidden>{glyph}</span>
          {/* The bar under the glyph is the colour currently in force — the same
              way every word processor shows it, and the only way the button can
              answer "what will this do" before you open it. */}
          <span
            aria-hidden
            data-testid={`${testId}-current`}
            className={cn('rounded-sm border border-border', roomy ? 'h-1 w-[18px]' : 'h-[3px] w-3.5')}
            style={{ background: current || (roomy && setCmd === 'setColor' ? 'var(--color-text-primary)' : 'transparent') }}
          />
        </span>
        {roomy && setCmd === 'setColor' && <ChevronIcon size={12} aria-hidden="true" />}
      </button>

      {open && (
        <span
          {...menuProps}
          data-testid={`${testId}-menu`}
          aria-label={title}
          className="absolute left-0 top-full z-20 mt-1 grid w-[136px] grid-cols-4 gap-1 rounded-md border border-border bg-surface-panel p-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            {...itemProps('none')}
            data-testid={`${testId}-none`}
            title="None"
            aria-label="None"
            {...activate(() => apply(null))}
            className={cn(
              'col-span-4 rounded px-1 py-0.5 text-left text-[11px] text-text-secondary hover:bg-surface-hover cursor-pointer border-none bg-transparent',
              MENU_ITEM_RING,
            )}
          >
            None
          </button>
          {swatches.map((c) => (
            <button
              key={c.value}
              type="button"
              role="menuitemradio"
              aria-checked={c.value === current}
              {...itemProps(c.value)}
              data-testid={`${testId}-${c.label.toLowerCase()}`}
              title={c.label}
              aria-label={c.label}
              {...activate(() => apply(c.value))}
              className={cn(
                'h-6 w-6 rounded cursor-pointer border',
                // The ring sits OUTSIDE the swatch, which is the whole reason
                // it is a ring and not an outline here: the square is filled
                // edge to edge with the colour it names, and a 1px UA outline
                // drawn on that edge is the one place a focus indicator cannot
                // be seen. `ring-offset-1` buys it a gap on the panel.
                MENU_ITEM_RING,
                'focus-visible:ring-offset-1',
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
  const { open, close, wrapRef, triggerProps, menuProps, itemProps } = useToolMenu();

  const run = (cmd: string) => {
    const chain = editor.chain().focus() as never as Record<string, () => { run: () => void }>;
    chain[cmd]?.().run();
    close();
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
    close();
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={inTable ? 'Table' : 'Insert table'}
        aria-label={inTable ? 'Table options' : 'Insert a table'}
        {...triggerProps}
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
          {...menuProps}
          data-testid={`${testId}-menu`}
          aria-label="Table"
          className="absolute left-0 top-full z-20 mt-1 flex min-w-[180px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            {...itemProps('insert')}
            data-testid={`${testId}-insert`}
            {...activate(insert)}
            className={cn(
              'cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover',
              MENU_ITEM_RING,
            )}
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
                  {...itemProps(e.key)}
                  data-testid={`${testId}-${e.key}`}
                  {...activate(() => run(e.cmd))}
                  className={cn(
                    'cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover',
                    MENU_ITEM_RING,
                  )}
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

/**
 * A list's marker menu (2.386.5): a caret beside the bullet or numbered
 * button, or — with no `btn` — a menu-only button for the multilevel presets.
 * Each choice makes the caret's block a list of that kind if it is not one,
 * and sets its marker (`canvasListStyle.ts`). Rendered only when the editor
 * has `setListStyle`, so a caret never opens a menu that cannot act.
 */
function ListStyleMenu({
  editor, btn, active, styles, current, label, icon, testId,
}: {
  editor: Editor;
  /** The list's own toggle, drawn left of the caret. Absent for the menu-only button. */
  btn?: MarkButton;
  active: boolean;
  styles: readonly ListStyle[];
  current: ListStyle | null;
  label: string;
  /** The menu-only button's glyph. */
  icon?: ReactNode;
  testId: string;
}) {
  const { open, close, wrapRef, triggerProps, menuProps, itemProps } = useToolMenu();
  const roomy = useContext(RoomyContext);
  const apply = (style: ListStyle) => {
    (editor.chain().focus() as never as Record<string, (v: string) => { run: () => void }>)['setListStyle']!(style).run();
    close();
  };
  return (
    <span ref={wrapRef} className="relative inline-flex items-center">
      {btn && <ToolButton btn={btn} editor={editor} active={active} testId={testId} />}
      <button
        type="button"
        data-testid={btn ? `${testId}-styles` : testId}
        title={label}
        aria-label={label}
        {...triggerProps}
        className={cn(
          'inline-flex items-center justify-center gap-0.5 cursor-pointer border-none',
          roomy ? 'h-9 rounded-md' : 'h-7 rounded',
          btn ? 'w-4 px-0' : roomy ? 'px-2' : 'px-1.5',
          open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
          !btn && !open && active && 'text-text-primary',
        )}
      >
        {icon}
        <ChevronIcon size={btn ? 10 : 12} aria-hidden="true" />
      </button>
      {open && (
        <span
          {...menuProps}
          data-testid={`${btn ? `${testId}-styles` : testId}-menu`}
          aria-label={label}
          className="absolute left-0 top-full z-20 mt-1 flex min-w-[180px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg"
        >
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              role="menuitemradio"
              aria-checked={style === current}
              {...itemProps(style)}
              data-testid={`${testId}-style-${style}`}
              {...activate(() => apply(style))}
              className={cn(
                'whitespace-pre rounded px-2 py-1.5 text-left text-[13px] cursor-pointer border-none',
                MENU_ITEM_RING,
                style === current ? 'bg-surface-hover font-semibold text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover',
              )}
            >
              {LIST_STYLE_LABELS[style]}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

/** Zoom, as a row inside ⋯ — for a page that has no bottom status bar (2.386.5). */
function ZoomRow({ control, testId }: { control: DocumentZoomControl; testId: string }) {
  const { zoom, fitActive, steps, onZoomChange, onFitWidth: onFit } = control;
  const FIT = 'fit';
  const options = [
    ...(onFit ? [{ value: FIT, label: 'Fit width' }] : []),
    ...steps.map((z) => ({ value: String(z), label: `${Math.round(z * 100)}%` })),
    // A remembered zoom off the presets still shows its own value.
    ...(!fitActive && !steps.includes(zoom) ? [{ value: String(zoom), label: `${Math.round(zoom * 100)}%` }] : []),
  ];
  return (
    <span className="flex w-full items-center justify-between gap-3 px-1.5 py-1 text-[13px] text-text-secondary" data-testid={`${testId}-zoom-row`}>
      <span>Zoom</span>
      <Select
        size="sm"
        aria-label="Zoom"
        data-testid={`${testId}-zoom`}
        value={fitActive && onFit ? FIT : String(zoom)}
        options={options}
        onChange={(e) => {
          if (e.target.value === FIT) onFit?.();
          else onZoomChange(Number(e.target.value));
        }}
        className="w-[110px]"
      />
    </span>
  );
}

function AlignMenu({
  editor, current, testId,
}: { editor: Editor; current: Alignment; testId: string }) {
  const { open, close, wrapRef, triggerProps, menuProps, itemProps } = useToolMenu();

  const apply = (align: Alignment) => {
    const chain = editor.chain().focus() as never as Record<string, (a: string) => { run: () => void }>;
    chain['setTextAlign']!(align).run();
    close();
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={alignLabel(current)}
        aria-label="Text alignment"
        {...triggerProps}
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
          {...menuProps}
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
              {...itemProps(align)}
              data-testid={`${testId}-${align}`}
              title={alignLabel(align)}
              aria-label={alignLabel(align)}
              {...activate(() => apply(align))}
              className={cn(
                'inline-flex h-7 w-7 items-center justify-center rounded cursor-pointer border-none',
                MENU_ITEM_RING,
                align === current
                  ? 'bg-primary text-on-primary'
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
  const { open, close, wrapRef, triggerProps, menuProps, itemProps } = useToolMenu();

  const apply = (spacing: LineSpacing) => {
    const chain = editor.chain().focus() as never as Record<string, (v: string) => { run: () => void }>;
    chain['setLineSpacing']!(spacing).run();
    close();
  };

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        data-testid={testId}
        title={`Line spacing: ${LINE_SPACING_LABELS[current]}`}
        aria-label="Line spacing"
        {...triggerProps}
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
          {...menuProps}
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
              {...itemProps(spacing)}
              data-testid={`${testId}-${spacing.replace('.', '-')}`}
              title={LINE_SPACING_LABELS[spacing]}
              aria-label={LINE_SPACING_LABELS[spacing]}
              {...activate(() => apply(spacing))}
              className={cn(
                'cursor-pointer rounded border-none px-2 py-1 text-left text-xs',
                MENU_ITEM_RING,
                spacing === current
                  ? 'bg-primary text-on-primary'
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
      className={cn('w-px shrink-0 self-center bg-border-emphasis', useContext(RoomyContext) ? 'mx-2 h-6' : 'mx-1.5 h-5')}
    />
  );
}

/**
 * What to call a margin holding `comments` threads and `suggestions` edits.
 *
 * Exported for the tests, because the wording is the contract here — the
 * button's paint is decoration and this is the part that can be wrong.
 *
 * The mixed case is the one that needed deciding, and "Markup" is Word's
 * answer to exactly this question: its Review tab hides and shows a margin of
 * comments AND tracked changes under Show Markup, with No Markup / All Markup
 * as the states. Google Docs has no word for it because it never has the
 * problem — suggestions there are a MODE, governed by the editing-mode picker
 * rather than by a margin switch — so it offers no vocabulary to borrow.
 * Rejected: "Margin" describes where the cards are rather than what they are,
 * and nobody asks to hide a margin; "Notes" would name a third concept this
 * product does not have, so a reader would reasonably go looking for it.
 *
 * Only the mixed case pays for that borrowed term. A margin of one kind says
 * which kind, because a specific true noun always beats a general one.
 */
export function gutterNoun(comments: number, suggestions: number): string {
  if (suggestions === 0) return 'Comments';
  if (comments === 0) return 'Suggestions';
  return 'Markup';
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
 *
 * The count is a total and stays one. Two numbers on a 7px-tall chip is a
 * legend, not a button, and "how much is in the margin" is the question the
 * control answers; which kinds those are is what the noun is for.
 */
function GutterToggle({
  comments, suggestions, visible, onToggle, testId,
}: { comments: number; suggestions: number; visible: boolean; onToggle: () => void; testId: string }) {
  const noun = gutterNoun(comments, suggestions);
  const count = comments + suggestions;
  // Lower-cased from the same noun rather than written out a second time: the
  // visible text and the accessible name are one sentence, and two sources for
  // it is how they drift apart.
  const label = `${visible ? 'Hide' : 'Show'} ${noun.toLowerCase()} (${count})`;
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
          ? 'bg-primary text-on-primary border-primary'
          // Off is TINTED, not greyed out. A disabled-looking control would
          // say the margin is empty; this says it is full and put away.
          : 'bg-primary-bg text-primary-fg border-primary-border hover:bg-surface-hover',
      )}
    >
      <span>{noun}</span>
      <span
        className={cn(
          'rounded-full px-1.5 leading-4 tabular-nums',
          visible ? 'bg-on-primary/25 text-on-primary' : 'bg-primary text-on-primary',
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

/**
 * A disclosure panel for the bar's grouped controls — the ⋯ group and the
 * narrow `Style ▾` panel.
 *
 * Not `useToolMenu`: that is a `role="menu"` of `menuitem`s with a roving
 * cursor, and what these panels hold are ordinary toolbar buttons, nested
 * menus and native selects that keep their own keyboard. So the panel is a
 * `role="group"` behind an `aria-expanded` trigger, and shares only the
 * closing rules: a click elsewhere, Escape from anywhere (focus may still be
 * in the editor after a mouse open), focus leaving. The trigger acts on
 * mousedown with the default prevented, like every control here, so the
 * selection a command will act on survives the click.
 */
function usePanel() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const id = useId();
  const shut = useCallback((focusTrigger: boolean) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);
  useEffect(() => {
    if (!open) return;
    const inside = (n: Node | null) => !!(n && wrapRef.current?.contains(n));
    const onDown = (ev: MouseEvent) => { if (!inside(ev.target as Node)) shut(false); };
    const onKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') shut(inside(document.activeElement)); };
    const onFocusIn = (ev: FocusEvent) => { if (!inside(ev.target as Node)) shut(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocusIn);
    };
  }, [open, shut]);
  return {
    open,
    close: () => shut(false),
    wrapRef,
    triggerProps: {
      ref: triggerRef,
      'aria-expanded': open,
      ...(open ? { 'aria-controls': id } : {}),
      onMouseDown: (ev: { preventDefault: () => void }) => { ev.preventDefault(); setOpen((v) => !v); },
      onClick: (ev: { detail: number }) => { if (ev.detail === 0) setOpen((v) => !v); },
    },
    panelProps: { id, role: 'group' as const },
  };
}

/** The trigger every panel shares: the ⋯ and `Style ▾` buttons. */
const PANEL_TRIGGER = 'inline-flex h-7 items-center gap-1 rounded px-1.5 text-xs font-semibold cursor-pointer border-none';
const PANEL_TRIGGER_STATE = (open: boolean) => (open ? 'bg-surface-hover text-text-primary' : 'bg-transparent text-text-secondary hover:bg-surface-hover');
const PANEL = 'absolute top-full z-20 mt-1 rounded-md border border-border bg-surface-panel shadow-lg';

export default function DocumentToolbar({
  editor,
  actions,
  commentCount = 0,
  suggestionCount = 0,
  gutterVisible = true,
  onToggleGutter,
  onInsertImage,
  density = 'full',
  size: sizeProp = 'auto',
  extras = 'inline',
  zoomControl,
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
      const listNode = e.isActive('bulletList') ? 'bulletList' : e.isActive('orderedList') ? 'orderedList' : null;
      return {
        listStyle: listNode ? parseListStyle((e.getAttributes(listNode) as { listStyle?: unknown }).listStyle) : null,
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

  // Whether the margin has anything in it at all — the condition for offering
  // the toggle. Both halves, because either alone would drop the control on a
  // document annotated entirely the other way.
  const gutterCount = commentCount + suggestionCount;

  const setBlock = useCallback((value: string) => {
    if (!editor || editor.isDestroyed) return;
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

  // Every hook above the boot guard, in one order on every render. The roving
  // hook used to sit BELOW `return null`, which React tolerates only while
  // `editor` never flips after mount.
  const roving = useRovingToolbar();
  const { ref: rovingRef, ...rovingProps } = roving;
  // The bar measures its OWN box (`useMeasuredWidth` says why an observer and
  // not a container query); the roving hook's ref rides along.
  const rootEl = useRef<HTMLDivElement | null>(null);
  const { ref: rootRef, width } = useMeasuredWidth<HTMLDivElement>(useCallback((el: HTMLDivElement | null) => {
    rootEl.current = el;
    (rovingRef as MutableRefObject<HTMLDivElement | null>).current = el;
  }, [rovingRef]));
  const more = usePanel();
  const stylePanel = usePanel();
  // `size` is still the breakpoint answer — it is what `data-size` reports and
  // what the host's `actions` read through `useDocumentToolbarSize()`. Only
  // WHICH GROUPS SHOW is measured in auto mode; keeping the two apart is what
  // stops a feedback loop (tuck a group -> host's actions shrink -> room to
  // restore it -> actions grow -> tuck it again).
  const size: DocumentToolbarSize = sizeProp === 'auto' ? documentToolbarSize(width) : sizeProp;
  const fitting = sizeProp === 'auto' && density === 'full';
  // `extras="overflow"`: the occasional groups never sit on the row, so the
  // fit only ever folds the rest, least-used first.
  const overflowLayout = extras === 'overflow' && density === 'full';
  const tuckOrder = overflowLayout ? OVERFLOW_TUCK_ORDER : TUCK_ORDER;
  // How many of TUCK_ORDER are off the bar, and what the row NEEDED at each
  // count (its content width with the spacer at zero), so a group comes back
  // only once the row has room for it — measured, never estimated.
  const [tuckCount, setTuckCount] = useState(0);
  const needAt = useRef<number[]>([]);
  const spacerRef = useRef<HTMLSpanElement | null>(null);
  // Every render, before paint: a tuck or restore re-renders synchronously
  // inside the same frame, so the bar never shows a clipped or half-empty row.
  // It converges — each level's need is recorded as it is visited, and a
  // group is restored only when the level above it is known to fit.
  useLayoutEffect(() => {
    if (!fitting) return;
    const root = rootEl.current;
    const spacer = spacerRef.current;
    if (!root || !spacer) return;
    const avail = root.clientWidth;
    // jsdom, or not laid out yet: everything stays on the bar.
    if (!(avail > 0)) return;
    const need = root.scrollWidth - spacer.getBoundingClientRect().width;
    needAt.current[tuckCount] = need;
    if (need > avail + 1 && tuckCount < tuckOrder.length) { setTuckCount(tuckCount + 1); return; }
    if (tuckCount > 0) {
      const above = needAt.current[tuckCount - 1];
      if (above == null || above <= avail + 1) setTuckCount(tuckCount - 1);
    }
  });

  // Rendering nothing while the editor boots keeps every handler below able to
  // assume a live editor, instead of guarding each one.
  // Destroyed counts as absent: see `has`.
  if (!editor || editor.isDestroyed) return null;

  const full = density === 'full';
  // Compact keeps every mark and list and nothing else — as it always did —
  // and never grows a ⋯; the width rules are for the full bar.
  const inline: ReadonlySet<ToolbarGroup> = !full
    ? new Set(['marksExtra', 'listsExtra'])
    : fitting
      ? new Set(EVERY_GROUP.filter((g) => !tuckOrder.slice(0, tuckCount).includes(g) && !(overflowLayout && ALWAYS_OVERFLOW.has(g))))
      : overflowLayout
        ? new Set([...INLINE_GROUPS[size]].filter((g) => !ALWAYS_OVERFLOW.has(g)))
        : INLINE_GROUPS[size];
  const on = (g: ToolbarGroup) => inline.has(g);
  const tucked = (g: ToolbarGroup) => full && !inline.has(g);

  const mark = (b: MarkButton) => (
    <ToolButton key={b.key} btn={b} editor={editor} active={state?.flags[b.key] ?? false} testId={`${testId}-${b.key}`} />
  );
  const marksCore = MARKS.filter((b) => !EXTRA_MARKS.has(b.key));
  const marksExtra = MARKS.filter((b) => EXTRA_MARKS.has(b.key));
  const listsCore = LISTS.filter((b) => !EXTRA_LISTS.has(b.key));
  const listsExtra = LISTS.filter((b) => EXTRA_LISTS.has(b.key));

  /** The three style selects, side by side on the bar or stacked in the `Style ▾` panel. */
  const selectControls = (stacked: boolean) => (
    <>
      <Select
        size={full ? 'md' : 'sm'}
        data-testid={`${testId}-block`}
        aria-label="Text style"
        value={state?.block ?? 'paragraph'}
        options={BLOCK_OPTIONS}
        onChange={(e) => setBlock(e.target.value)}
        className={stacked ? 'w-full' : full ? 'w-[140px] text-sm' : 'w-[140px]'}
      />

      {/* Typeface and size, where a word processor puts them: between the
          block-type picker and the character marks. Rendered only when the
          editor has the commands — this toolbar is shared with pages that
          register a smaller extension set, and a control that cannot act is
          worse than an absent one. */}
      {has(editor, 'setFontFamily') && (
        <>
          {!stacked && !overflowLayout && <Divider />}
          <Select
            size={full ? 'md' : 'sm'}
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
            className={stacked ? 'w-full' : overflowLayout ? 'ml-2 w-[128px] text-sm' : 'w-[130px]'}
          />
        </>
      )}
      {has(editor, 'setFontSize') && (
        <Select
          size={full ? 'md' : 'sm'}
          data-testid={`${testId}-font-size`}
          aria-label="Font size"
          value={state?.fontSize ?? ''}
          options={SIZE_OPTIONS}
          onChange={(e) => {
            const chain = editor.chain().focus() as never as Record<string, (v?: string) => { run: () => void }>;
            if (e.target.value) chain['setFontSize']!(e.target.value).run();
            else chain['unsetFontSize']!().run();
          }}
          className={stacked ? 'w-full' : overflowLayout ? 'ml-2 w-[76px] text-sm' : 'w-[72px]'}
        />
      )}
    </>
  );

  /* Indent and outdent, and ONLY inside a list.
     A word processor offers these for paragraphs too, but this schema has
     no paragraph indent — offering them everywhere would give two buttons
     that quietly do nothing everywhere except a list, which is worse than
     not offering them. They appear where they work, the way the table
     edits do. */
  const indentControls = has(editor, 'sinkListItem') && (state?.flags['inListItem'] ?? false) ? (
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
  ) : null;

  /* One COLOUR group: ink, highlight paint, and the highlight toggle.
     The toggle used to carry its own divider and stand alone, which put a
     boundary between two controls that do the same job to the same text
     and none between the lists and the palettes. The condition is the
     union of the three so the boundary appears with whichever of them the
     host's extension set actually registers, and never leaves a dangling
     line in front of nothing. */
  const colourControls = (has(editor, 'setColor') || has(editor, 'setBackgroundColor') || has(editor, 'toggleHighlight')) ? (
    <>
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
      {/* The word-processor row reads "A ▾ │ highlight": two groups. */}
      {overflowLayout && has(editor, 'setColor') && (has(editor, 'setBackgroundColor') || has(editor, 'toggleHighlight')) && <Divider />}
      {has(editor, 'setBackgroundColor') && (
        <ColorMenu
          editor={editor}
          current={state?.backgroundColor ?? ''}
          swatches={HIGHLIGHTS}
          setCmd="setBackgroundColor"
          unsetCmd="unsetBackgroundColor"
          glyph={full ? <HighlighterIcon size={18} /> : '✎'}
          title="Highlight colour"
          testId={`${testId}-highlight-color`}
        />
      )}
      {has(editor, 'toggleHighlight') && !(overflowLayout && has(editor, 'setBackgroundColor')) && (
        <ToolButton
          btn={{
            key: 'highlight', label: <Glyph icon={HighlighterIcon} />, hint: 'Highlight',
            run: (e) => { (e.chain().focus() as never as Record<string, () => { run: () => void }>)['toggleHighlight']!().run(); },
            active: (e) => e.isActive('highlight'),
          }}
          editor={editor}
          active={state?.flags['highlight'] ?? false}
          testId={`${testId}-highlight`}
        />
      )}
    </>
  ) : null;

  /* Alignment and line spacing sit together: both change the SHAPE of a
     paragraph, and neither changes the letters. */
  const shapeControls = (has(editor, 'setTextAlign') || has(editor, 'setLineSpacing')) ? (
    <>
      {has(editor, 'setTextAlign') && (
        <AlignMenu
          editor={editor}
          current={ALIGNMENTS.find((a) => state?.flags[`align-${a}`]) ?? 'left'}
          testId={`${testId}-align`}
        />
      )}
      {has(editor, 'setLineSpacing') && (
        <LineSpacingMenu
          editor={editor}
          current={state?.lineSpacing ?? '1'}
          testId={`${testId}-line-spacing`}
        />
      )}
    </>
  ) : null;

  /* INSERT: rule, table, image — the things that put something new on the
     page, as opposed to everything left of here, which restyles what is
     already there. The link stays on the bar at every width: it is the one
     insert a writer reaches for mid-sentence. */
  const insertControls = (
    <>
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
    </>
  );

  /* The picture, its own group so it can stay on the bar beside the link —
     where the mockup has it — after the rule and table have folded. */
  const imageControl = onInsertImage && has(editor, 'setImage') ? (
    <ToolButton
      btn={{
        key: 'image', label: <Glyph icon={ImageIcon} />, hint: 'Insert image',
        run: () => { onInsertImage(); },
        active: () => false,
      }}
      editor={editor}
      active={false}
      testId={`${testId}-image`}
    />
  ) : null;

  /* Clear formatting sits LAST, alone behind its own boundary, which is
     where Word and Google Docs both put it. It used to be wedged between
     the link and the horizontal rule, in the middle of the insert group —
     a destructive command inside a run of additive ones, one slip away
     from stripping a paragraph you meant to add a table to. */
  const clearControl = has(editor, 'unsetAllMarks') ? (
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
  ) : null;

  const linkControl = (
    <span ref={linkAnchor} className="inline-flex">
    <ToolButton
      btn={{
        key: 'link', label: <Glyph icon={LinkIcon} />, hint: 'Link  [text](url)',
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
  );

  /* The lists on the word-processor row: bullet ▾ and numbered ▾ carry their
     marker menus, then the multilevel presets ▾ and the checklist. Without
     `setListStyle` they are the plain toggles. */
  const styled = has(editor, 'setListStyle');
  const listFlag = (key: string) => state?.flags[key] ?? false;
  const listControls = (
    <>
      {listsCore.map((b) => (styled ? (
        <ListStyleMenu
          key={b.key}
          editor={editor}
          btn={b}
          active={listFlag(b.key)}
          styles={b.key === 'bulletList' ? BULLET_STYLES : NUMBER_STYLES}
          current={state?.listStyle ?? null}
          label={b.key === 'bulletList' ? 'Bullet style' : 'Numbering style'}
          testId={`${testId}-${b.key}`}
        />
      ) : mark(b)))}
      {on('listsExtra') && styled && (
        <ListStyleMenu
          editor={editor}
          active={listFlag('bulletList') || listFlag('orderedList')}
          styles={MULTILEVEL_STYLES}
          current={state?.listStyle ?? null}
          label="List style"
          icon={<Glyph icon={ListStyleIcon} />}
          testId={`${testId}-list-style`}
        />
      )}
      {on('listsExtra') && listsExtra.map(mark)}
    </>
  );

  // What ⋯ holds at this width, in bar order, dividers between the groups
  // that are present. Empty means no ⋯ at all.
  const overflowGroups: ReactNode[] = [];
  if (tucked('marksExtra')) overflowGroups.push(<span key="marksExtra" className="inline-flex gap-0.5">{marksExtra.map(mark)}</span>);
  if (tucked('listsExtra')) {
    overflowGroups.push(
      <span key="listsExtra" className="inline-flex gap-0.5">
        {overflowLayout && styled && (
          <ListStyleMenu
            editor={editor}
            active={listFlag('bulletList') || listFlag('orderedList')}
            styles={MULTILEVEL_STYLES}
            current={state?.listStyle ?? null}
            label="List style"
            icon={<Glyph icon={ListStyleIcon} />}
            testId={`${testId}-list-style`}
          />
        )}
        {listsExtra.map(mark)}
      </span>,
    );
  }
  if (tucked('indent') && indentControls) overflowGroups.push(<span key="indent" className="inline-flex gap-0.5">{indentControls}</span>);
  if (tucked('colour') && colourControls) overflowGroups.push(<span key="colour" className="inline-flex gap-0.5">{colourControls}</span>);
  if (tucked('shape') && shapeControls) overflowGroups.push(<span key="shape" className="inline-flex gap-0.5">{shapeControls}</span>);
  if (tucked('insert')) overflowGroups.push(<span key="insert" className="inline-flex gap-0.5">{insertControls}</span>);
  if (tucked('image') && imageControl) overflowGroups.push(<span key="image" className="inline-flex gap-0.5">{imageControl}</span>);
  // The word-processor row keeps one highlight control on the bar (the
  // paint menu); the plain toggle, when both are registered, is in here.
  if (overflowLayout && has(editor, 'setBackgroundColor') && has(editor, 'toggleHighlight')) {
    overflowGroups.push(
      <span key="highlight" className="inline-flex gap-0.5">
        <ToolButton
          btn={{
            key: 'highlight', label: <Glyph icon={HighlighterIcon} />, hint: 'Highlight',
            run: (e) => { (e.chain().focus() as never as Record<string, () => { run: () => void }>)['toggleHighlight']!().run(); },
            active: (e) => e.isActive('highlight'),
          }}
          editor={editor}
          active={state?.flags['highlight'] ?? false}
          testId={`${testId}-highlight`}
        />
      </span>,
    );
  }
  if (tucked('clear') && clearControl) overflowGroups.push(<span key="clear" className="inline-flex gap-0.5">{clearControl}</span>);

  // The word-processor row leaves the margin switch to ⋯: the editor's
  // Comments tab already carries the count, and the pill cost the row its
  // colour and image groups at 1672px (2.386.9).
  const gutterInMore = overflowLayout && !!onToggleGutter && gutterCount > 0;
  if (gutterInMore) {
    overflowGroups.push(
      <span key="gutter" className="inline-flex">
        <GutterToggle
          comments={commentCount}
          suggestions={suggestionCount}
          visible={gutterVisible}
          onToggle={onToggleGutter!}
          testId={`${testId}-gutter-toggle`}
        />
      </span>,
    );
  }
  // Zoom, for a page with no status bar: its own full-width row, last.
  if (zoomControl) {
    overflowGroups.push(<ZoomRow key="zoom" control={zoomControl} testId={testId} />);
  }

  const blockLabel = BLOCK_OPTIONS.find((o) => o.value === (state?.block ?? 'paragraph'))?.label ?? 'Normal text';

  return (
    <RoomyContext.Provider value={full}>
    <div
      // It has said `role="toolbar"` since it was written, and did not behave
      // like one: 22 tab stops inside it and arrow keys that did nothing. A
      // declared role is a promise about the keyboard — a reader is told
      // "toolbar" and reaches for the arrows. The hook keeps that promise
      // without a wrapper element. Native selects keep their own arrows.
      {...rovingProps}
      ref={rootRef}
      data-testid={testId}
      role="toolbar"
      aria-label="Document formatting"
      data-density={density}
      data-size={size}
      // `flex-nowrap` and `min-w-0`: one row, always. The width rules above
      // decide what fits; the row never folds. Nothing in the row shrinks
      // (`[&>*]:shrink-0`): a squeezed select would hide an overflow the fit
      // measurement needs to see, and the spacer below is the only give.
      className={cn('flex min-w-0 flex-nowrap items-center gap-0.5 [&>*]:shrink-0', overflowLayout ? 'px-3 py-2' : 'px-2 py-1.5')}
    >
      {/* Undo/redo live leftmost, as in every writing tool. With Collaboration
          bound these are the Y.js UndoManager's, not ProseMirror's history —
          which is the correct behaviour on a shared document: undo takes back
          YOUR edit, not whatever a collaborator typed most recently. */}
      <ToolButton
        btn={{
          key: 'undo', label: <Glyph icon={UndoIcon} />, hint: 'Undo',
          run: (e) => { e.chain().focus().undo().run(); }, active: () => false,
        }}
        editor={editor}
        active={false}
        testId={`${testId}-undo`}
      />
      <ToolButton
        btn={{
          key: 'redo', label: <Glyph icon={RedoIcon} />, hint: 'Redo',
          run: (e) => { e.chain().focus().redo().run(); }, active: () => false,
        }}
        editor={editor}
        active={false}
        testId={`${testId}-redo`}
      />

      {full && on('selects') && (<>
        <Divider />
        {selectControls(false)}
      </>)}
      {full && !on('selects') && (<>
        <Divider />
        {/* Narrow: one `Style ▾` in place of three selects. The panel holds
            the same three controls, stacked, under the same test ids. */}
        <span ref={stylePanel.wrapRef} className="relative inline-flex">
          <button
            type="button"
            data-testid={`${testId}-style`}
            title={`Text style: ${blockLabel}`}
            aria-label="Text style"
            {...stylePanel.triggerProps}
            className={cn(PANEL_TRIGGER, full ? 'h-9 px-2.5 text-sm' : 'px-2', PANEL_TRIGGER_STATE(stylePanel.open))}
          >
            Style
            <span aria-hidden className="text-[8px] leading-none">▾</span>
          </button>
          {stylePanel.open && (
            <span
              {...stylePanel.panelProps}
              aria-label="Text style"
              data-testid={`${testId}-style-panel`}
              className={cn(PANEL, 'left-0 flex w-56 flex-col gap-1.5 p-2')}
            >
              {selectControls(true)}
            </span>
          )}
        </span>
      </>)}

      {overflowLayout ? (<>
        {/* The word-processor row (extras="overflow"): marks │ link, image │
            lists with their style menus, checklist │ A ▾ │ highlight │ ⋯. */}
        <Divider />
        {marksCore.map(mark)}
        {on('marksExtra') && marksExtra.map(mark)}

        <Divider />
        {linkControl}
        {on('image') && imageControl}

        <Divider />
        {listControls}

        {on('colour') && colourControls && (<>
          <Divider />
          {colourControls}
        </>)}
      </>) : (<>
        <Divider />
        {marksCore.map(mark)}
        {on('marksExtra') && marksExtra.map(mark)}

        <Divider />
        {listsCore.map(mark)}
        {on('listsExtra') && listsExtra.map(mark)}
        {on('indent') && indentControls}

        {on('colour') && colourControls && (<>
          <Divider />
          {colourControls}
        </>)}

        {on('shape') && shapeControls && (<>
          <Divider />
          {shapeControls}
        </>)}

        <Divider />
        {linkControl}
        {on('image') && imageControl}
        {on('insert') && insertControls}

        {on('clear') && clearControl && (<>
          <Divider />
          {clearControl}
        </>)}
      </>)}

      {overflowGroups.length > 0 && (<>
        <Divider />
        <span ref={more.wrapRef} className="relative inline-flex">
          <button
            type="button"
            data-testid={`${testId}-more`}
            title="More formatting"
            aria-label="More formatting"
            {...more.triggerProps}
            className={cn(PANEL_TRIGGER, full ? 'h-9 min-w-9 rounded-md justify-center' : 'min-w-7 justify-center', PANEL_TRIGGER_STATE(more.open))}
          >
            {full ? <MoreIcon size={18} /> : '⋯'}
          </button>
          {more.open && (
            <span
              {...more.panelProps}
              aria-label="More formatting"
              data-testid={`${testId}-more-panel`}
              // Right-aligned under ⋯, which sits at the bar's right; wraps
              // into rows when the group is long, but stays a compact card.
              className={cn(PANEL, 'right-0 flex max-w-[22rem] flex-wrap items-center gap-0.5 p-1')}
            >
              {overflowGroups.map((g, i) => (i === 0 ? g : [
                (g as { key?: string | null }).key === 'zoom'
                  ? <span key={`d${i}`} aria-hidden className="my-1 h-px w-full bg-border" />
                  : <Divider key={`d${i}`} />,
                g,
              ]))}
            </span>
          )}
        </span>
      </>)}

      {/* The row's free space, and the thing auto mode measures: its width is
          what is left after every control, so the bar knows how much room a
          folded group would need to come back. Replaces the actions' `ml-auto`. */}
      <span ref={spacerRef} aria-hidden data-testid={`${testId}-spacer`} className="min-w-0 flex-1" />

      {(onToggleGutter && gutterCount > 0 && !gutterInMore) || actions ? (
        <span className="flex shrink-0 items-center gap-1">
          {/* Left of the host's actions so presence avatars stay pinned to the
              far edge where every collaborative tool puts them. */}
          {onToggleGutter && gutterCount > 0 && !gutterInMore && (
            <GutterToggle
              comments={commentCount}
              suggestions={suggestionCount}
              visible={gutterVisible}
              onToggle={onToggleGutter}
              testId={`${testId}-gutter-toggle`}
            />
          )}
          <SizeContext.Provider value={size}>{actions}</SizeContext.Provider>
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
    </RoomyContext.Provider>
  );
}
