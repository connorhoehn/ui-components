import type { ReactNode } from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the work area paints in. */
export type WorkAreaTone = SurfaceTone;
export interface WorkAreaProps {
    /** The trail row. Usually a `<Breadcrumbs>`; renders nothing when omitted. */
    breadcrumbs?: ReactNode;
    /** The action row. Usually a `<Toolbar>`. Sits below the trail. */
    toolbar?: ReactNode;
    /** Scrolling page content. */
    children: ReactNode;
    /** Pinned bottom row — counts, freshness, a connection pill. */
    status?: ReactNode;
    /** Comfortable padding around `children`. Off for canvases and nested rails. */
    padded?: boolean;
    tone?: WorkAreaTone;
    className?: string;
    /** Applied to the scrolling body, not the column. */
    bodyClassName?: string;
    'data-testid'?: string;
}
export declare function WorkArea({ breadcrumbs, toolbar, children, status, padded, tone, className, bodyClassName, 'data-testid': testId, }: WorkAreaProps): import("react").JSX.Element;
export default WorkArea;
//# sourceMappingURL=WorkArea.d.ts.map