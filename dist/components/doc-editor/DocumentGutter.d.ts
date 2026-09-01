import { type ReactNode } from 'react';
/** A thread plus where it wants to sit, in pixels from the page top. */
export interface GutterItem {
    id: string;
    /** Desired vertical offset. Ties and near-ties are resolved by stacking. */
    top: number;
    /** True when the anchor is inside the current selection or hovered. */
    active?: boolean;
    /** Rendered inside the card — usually a CommentThread. */
    content: ReactNode;
}
export interface DocumentGutterProps {
    items: readonly GutterItem[];
    /** Minimum vertical gap between two cards. */
    gap?: number;
    /** Approximate rendered height of a card, used for collision spacing. */
    estimatedHeight?: number;
    onFocusItem?: (id: string) => void;
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
export default function DocumentGutter({ items, gap, estimatedHeight, onFocusItem, emptyLabel, 'data-testid': testId, }: DocumentGutterProps): import("react").JSX.Element;
//# sourceMappingURL=DocumentGutter.d.ts.map