import { type ReactNode } from 'react';
export type FloatingComposerDockWidth = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export interface FloatingComposerDockProps {
    /** The composer — normally a `RichChatComposer` with `modeControl="compact"`. */
    composer: ReactNode;
    /** Above the composer — normally a `TaskStrip`. */
    strip?: ReactNode;
    /** Above the strip — a notice, a conversation preview. */
    above?: ReactNode;
    /**
     * Widest an OVERLAY dock grows. Default `3xl` (768px), the prototype's
     * measure. A pinned dock (inside `EditorShell`) ignores it and spans its
     * column's content width.
     */
    maxWidth?: FloatingComposerDockWidth;
    /** Accessible name of the region. Default "Composer". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}
/**
 * Where a dock sits. `overlay` (the default, outside a shell) floats over the
 * bottom of its positioned parent with a fade and writes `--dock-height` for
 * the content to pad by. `pinned` is a normal-flow last row: the content's
 * scroll box ENDS at the dock's top edge, so nothing in the content can scroll
 * under it or be drawn over it. `EditorShell` pins every dock it hosts
 * (2.365.0) — a host cannot opt a shell's composer back into overlapping.
 */
export type ComposerDockPlacement = 'overlay' | 'pinned';
export declare const ComposerDockPlacementContext: import("react").Context<ComposerDockPlacement>;
/** The custom property the dock writes on its parent. */
export declare const DOCK_HEIGHT_VAR = "--dock-height";
/**
 * The pinned dock's horizontal gutter, read from any ancestor. Default `1rem`
 * — match it to whatever the host wraps its toolbar and status bar in, and
 * the dock's edges line up with theirs.
 */
export declare const DOCK_INSET_VAR = "--dock-inset";
export declare function FloatingComposerDock({ composer, strip, above, maxWidth, label, className, 'data-testid': testId, }: FloatingComposerDockProps): import("react").JSX.Element;
export default FloatingComposerDock;
//# sourceMappingURL=FloatingComposerDock.d.ts.map