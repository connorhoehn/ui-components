import type { ReactNode } from 'react';
export interface DockedAsideProps {
    children: ReactNode;
    /** Width in px. Default 420. */
    width?: number;
    /** Start this many px below the row's top — level with the section it belongs to. */
    offsetTop?: number;
    /** Height cap. Default `calc(100vh - 180px)`: below the app chrome and the document header. */
    maxHeight?: string;
    /** With a title, the aside draws its own header row (and a close, when `onClose` is given). */
    title?: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
    /** Padding around the body. Default `md`; `none` when the content brings its own. */
    bodyPadding?: 'none' | 'md';
    className?: string;
    'data-testid'?: string;
}
export declare function DockedAside({ children, width, offsetTop, maxHeight, title, onClose, closeLabel, bodyPadding, className, 'data-testid': testId, }: DockedAsideProps): import("react").JSX.Element;
export interface FloatingCardProps {
    children: ReactNode;
    /** Which corner of the viewport it sits in. Default bottom-right. */
    corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Width in px. Default 160. */
    width?: number;
    /** Height cap in px; the card scrolls past it. Default 280. */
    maxHeight?: number;
    className?: string;
    'data-testid'?: string;
}
/** A small card pinned to a corner of the viewport — a table of contents, a mini-map. */
export declare function FloatingCard({ children, corner, width, maxHeight, className, 'data-testid': testId, }: FloatingCardProps): import("react").JSX.Element;
export interface PinnedSlotProps {
    /** The slot's width, reserved in the flow whether or not it is pinned. */
    width: number;
    /** Pinned: the inner slot leaves the flow and sits fixed at `top`/`left`; the spacer keeps the width. */
    pinned: boolean;
    top?: number;
    left?: number;
    /** The inner slot's id — for content that portals itself in. */
    slotId?: string;
    /** The spacer, so a host can measure where the slot sits in the flow. */
    spacerRef?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    'data-testid'?: string;
}
/**
 * A column that scrolls with the page until the page scrolls past it, then
 * stays put — a video panel beside the text. The host decides WHEN (it
 * watches the scroll); this owns HOW, so the fixed geometry is not a page's
 * inline style.
 */
export declare function PinnedSlot({ width, pinned, top, left, slotId, spacerRef, children, 'data-testid': testId }: PinnedSlotProps): import("react").JSX.Element;
export default DockedAside;
//# sourceMappingURL=DockedAside.d.ts.map