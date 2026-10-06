import { type ReactNode } from 'react';
/**
 * What kind of annotation a card holds.
 *
 * This component does not read it — stacking is the same arithmetic whatever
 * the card contains. It exists because the CONTROL that hides this column has
 * to name what it is hiding, and only the host knows: `content` is an opaque
 * ReactNode, so counting cards is the most the library can do on its own, and
 * counting is how a margin holding one proposed edit and no discussion came to
 * announce itself as "Comments 1".
 */
export type GutterItemKind = 'comment' | 'suggestion';
/** A thread plus where it wants to sit, in pixels from the page top. */
export interface GutterItem {
    id: string;
    /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
    top: number;
    /** True when the anchor is inside the current selection or hovered. */
    active?: boolean;
    /** Rendered inside the card — usually a CommentThread. */
    content: ReactNode;
    /**
     * Defaults to `'comment'` — every caller that predates this field was
     * passing comment threads, so the unlabelled case keeps saying exactly what
     * it says today rather than degrading a true noun into a hedge. The cost is
     * that a NEW producer which forgets to label itself is counted as
     * discussion; labelling every producer is therefore part of adding one.
     */
    kind?: GutterItemKind;
}
export interface DocumentGutterProps {
    items: readonly GutterItem[];
    /**
     * Pinned to the TOP of the gutter, above the threads — a docked call, say.
     *
     * In normal flow rather than anchored, because it belongs to the document
     * as a whole and not to a line of it. That does push the thread cards down
     * by its height, which is the honest tradeoff: a call and a comment cannot
     * both own the same strip of margin, and Google Docs resolves it the same
     * way — and it does cost real precision now that the offsets ARE real
     * positions, because every card below the lead sits that much lower than the
     * line it annotates.
     */
    lead?: ReactNode;
    /** Minimum vertical gap between two cards. */
    gap?: number;
    /** Approximate rendered height of a card, used for collision spacing. */
    estimatedHeight?: number;
    onFocusItem?: (id: string) => void;
    /**
     * The pointer entered (`id`) or left (`null`) a card — the host paints that
     * card's anchored range stronger, so reader sees WHERE it points before
     * clicking.
     */
    onHoverItem?: (id: string | null) => void;
    emptyLabel?: string;
    'data-testid'?: string;
}
/**
 * Pushes overlapping cards down so each keeps `gap` clearance.
 *
 * Sorted first: input order is whatever the comment API returned, and
 * resolving collisions in that order would let an early thread anchored far
 * down the page push everything above it. Exported because the stacking rule
 * is the part worth testing directly.
 */
export declare function stackOffsets(items: readonly {
    id: string;
    top: number;
}[], 
/**
 * Per-card height. A flat number is a fallback for the first paint only —
 * real thread cards differ by hundreds of pixels once replies exist, and a
 * single estimate makes tall cards overlap the one below.
 */
height: number | ((id: string) => number), gap: number): Map<string, number>;
export default function DocumentGutter({ items, lead, gap, estimatedHeight, onFocusItem, onHoverItem, emptyLabel, 'data-testid': testId, }: DocumentGutterProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentGutter.d.ts.map