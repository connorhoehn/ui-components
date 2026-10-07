import type { ReactNode } from 'react';
export type CursorCoordinates = 'pixels' | 'fraction';
export interface CursorOverlayEntry {
    clientId: string;
    /** Horizontal position in `coordinates` units. */
    x: number;
    y: number;
    /** Name shown beside the pointer. Falls back to the id. */
    label?: string;
    /** Literal user colour (data, not a token). Falls back to a hash of the id. */
    color?: string;
}
export interface CursorOverlayProps {
    cursors: readonly CursorOverlayEntry[];
    /**
     * `'pixels'` (default): x/y are offsets from the container's top-left.
     * `'fraction'`: 0..1 of its width/height, so collaborators with different
     * viewport sizes see the pointer over the same content.
     */
    coordinates?: CursorCoordinates;
    /** Local pointer movement, in the same units as `cursors`. */
    onMove?: (x: number, y: number) => void;
    children?: ReactNode;
    className?: string;
}
export declare function CursorOverlay({ cursors, coordinates, onMove, children, className, }: CursorOverlayProps): import("react").JSX.Element;
//# sourceMappingURL=CursorOverlay.d.ts.map