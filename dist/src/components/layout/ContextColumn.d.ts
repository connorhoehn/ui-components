import { type ReactNode } from 'react';
export type ContextColumnState = 'collapsed' | 'open' | 'wide';
/** One of a tabbed panel's parts, as the collapsed strip shows it. Since 2.384.1. */
export interface ContextColumnEntry {
    id: string;
    /** The strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Pending count for this entry alone — unresolved comments, a running task. */
    badge?: number;
}
export interface ContextColumnPanel {
    id: string;
    /** The tab's text and the strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Unread or pending count, shown on the tab and the strip icon. */
    badge?: number;
    /**
     * The panel's own parts, for the collapsed strip: one icon per entry in
     * place of the panel's icon. Pressing one opens the column to this panel
     * and reports the entry (`onActivate(panel.id, entry.id)`). The open tab
     * row is unchanged — the panel's content owns its own tabs. An EMPTY array
     * (2.386.0) puts nothing on the strip for this panel — its parts all live
     * elsewhere right now (a page's comments on its own tab) and the host opens
     * it another way; omit `entries` for the panel's one icon.
     */
    entries?: readonly ContextColumnEntry[];
    /** What the panel shows while it is the active one. */
    content: ReactNode;
    /**
     * `tabs` (default): the column's header row — tabs, width and collapse
     * controls — sits above the panel. `bare`: while this panel is the active
     * one the header row is not drawn and the panel fills the column, bringing
     * its own header and close (a call drawer: "Start a call ×"). Since 2.391.0.
     */
    chrome?: 'tabs' | 'bare';
    /**
     * The open column's width while this panel is active. `default` is the
     * column's own (320px, or `roomy`). The call drawers are wider, and narrow
     * one step below a 1440px viewport so the page keeps its width:
     *   `drawer`       340px → 380px at ≥1440 (call settings, the call panel)
     *   `drawer-wide`  360px → 400px at ≥1440 (start a call)
     * Applies in `open` and `wide` alike. Since 2.391.0.
     */
    width?: 'default' | 'drawer' | 'drawer-wide';
}
export interface ContextColumnProps {
    state: ContextColumnState;
    onStateChange: (next: ContextColumnState) => void;
    /** In tab order. Empty renders nothing at all. */
    panels: ContextColumnPanel[];
    /** Which panel is showing. Unknown or absent falls back to the first. */
    activeId?: string | null;
    /** A tab or a strip icon was pressed; `entryId` when the icon was one of the panel's `entries`. */
    onActivate: (id: string, entryId?: string) => void;
    /** Accessible name of the column. Default "Side column". */
    label?: string;
    /**
     * Open at 384px instead of 320px on a 2xl viewport (≥1536px) — a pane with
     * rows of label + value (a run draft) that the Work mockup draws wider.
     * Narrower viewports keep 320px so the page beside it keeps its width.
     * Since 2.386.13.
     */
    roomy?: boolean;
    /**
     * While open, publish the column's width as `--uic-context-column-inset` on
     * <html>, so the fixed bottom/top-right overlays (ToastProvider,
     * ChatBubbleStack) move left of it instead of covering a drawer's footer.
     * Default true. Since 2.395.0.
     */
    reserveOverlayInset?: boolean;
    className?: string;
    'data-testid'?: string;
}
/** The CSS variable fixed overlays read to stay clear of an open ContextColumn. */
export declare const CONTEXT_COLUMN_INSET_VAR = "--uic-context-column-inset";
export declare function ContextColumn({ state, onStateChange, panels, activeId, onActivate, label, roomy, reserveOverlayInset, className, 'data-testid': testId, }: ContextColumnProps): import("react").JSX.Element | null;
export default ContextColumn;
//# sourceMappingURL=ContextColumn.d.ts.map