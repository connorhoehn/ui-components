import type { ReactNode } from 'react';
import type { RMUseCursorReturn } from './types';
import type { CursorCoordinates } from '../../components/collaboration/CursorOverlay';
export interface WrappedCursorOverlayProps {
    /** Return value of useCursor(channel) from realtime-modules. */
    cursor: RMUseCursorReturn;
    /**
     * `'fraction'` (default) publishes and reads 0..1 positions so pointers line
     * up across different viewport sizes. `'pixels'` uses raw offsets.
     */
    coordinates?: CursorCoordinates;
    /** Publish the local pointer. Default true; false renders others only. */
    publish?: boolean;
    /** Your own client id; a cursor carrying it is hidden. */
    selfClientId?: string;
    children?: ReactNode;
    className?: string;
}
export declare function WrappedCursorOverlay({ cursor, coordinates, publish, selfClientId, children, className, }: WrappedCursorOverlayProps): import("react").JSX.Element;
//# sourceMappingURL=WrappedCursorOverlay.d.ts.map