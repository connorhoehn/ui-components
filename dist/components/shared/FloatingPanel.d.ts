import { type ReactNode } from 'react';
/** Named viewport docking positions a panel can snap to. */
export type FloatingPanelAnchor = 'top-left' | 'top-right' | 'left-center' | 'right-center' | 'bottom-left' | 'bottom-right';
export declare const FLOATING_PANEL_ANCHORS: readonly FloatingPanelAnchor[];
export interface FloatingPanelProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    /** Viewport-relative initial anchor when no persisted position exists.
     *  Accepts any of the six named anchors or an explicit point. */
    defaultPosition?: FloatingPanelAnchor | {
        x: number;
        y: number;
    };
    /** localStorage key persisting the resolved anchor + offset across
     *  sessions. */
    persistKey?: string;
    /** Snap to a nearby anchor on drag release. Default true. */
    snapEnabled?: boolean;
    /** Proximity (px) at which an anchor arms. Default 24. */
    snapThreshold?: number;
    /** Restrict which anchors participate. Default: all six. */
    snapAnchors?: readonly FloatingPanelAnchor[];
    /** Fires when a drag settles into an anchor. */
    onSnap?: (anchor: FloatingPanelAnchor) => void;
    /** Floor for the shared focus-to-front z-order. Default 9999 — matches
     *  `zIndexClassName`. Pass alongside a custom `zIndexClassName` so a
     *  raise doesn't jump the panel out of its intended layer. */
    baseZIndex?: number;
    widthClassName?: string;
    heightClassName?: string;
    tone?: 'light' | 'dark';
    zIndexClassName?: string;
    className?: string;
    'data-testid'?: string;
}
/** Top-left corner a panel of `width`×`height` occupies at `anchor`. */
export declare function resolveAnchorPosition(anchor: FloatingPanelAnchor, width: number, height: number): {
    x: number;
    y: number;
};
export declare function FloatingPanel({ open, onClose, title, children, defaultPosition, persistKey, snapEnabled, snapThreshold, snapAnchors, onSnap, baseZIndex, widthClassName, heightClassName, tone, zIndexClassName, className, 'data-testid': testId, }: FloatingPanelProps): import("react").ReactPortal | null;
export default FloatingPanel;
//# sourceMappingURL=FloatingPanel.d.ts.map