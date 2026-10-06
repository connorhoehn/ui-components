import { type ReactNode } from 'react';
import { type Editor } from '@tiptap/react';
import type { DocumentZoomControl } from './DocumentStatusBar';
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
export declare const DOCUMENT_TOOLBAR_BREAKPOINTS: {
    readonly narrow: 840;
    readonly wide: 1240;
};
/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function documentToolbarSize(width: number | null): DocumentToolbarSize;
/**
 * The bar's current layout, for whatever a host renders into `actions`.
 *
 * The slot sits inside the bar, so the host's controls are on the same row
 * and subject to the same width — a labelled "Comment" button that stays
 * labelled at `medium` is the control that pushed the bar onto a third row.
 * Outside a `DocumentToolbar` this reads `wide`.
 */
export declare function useDocumentToolbarSize(): DocumentToolbarSize;
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
export declare function gutterNoun(comments: number, suggestions: number): string;
export default function DocumentToolbar({ editor, actions, commentCount, suggestionCount, gutterVisible, onToggleGutter, onInsertImage, density, size: sizeProp, extras, zoomControl, 'data-testid': testId, }: DocumentToolbarProps): import("react").JSX.Element | null;
//# sourceMappingURL=DocumentToolbar.d.ts.map