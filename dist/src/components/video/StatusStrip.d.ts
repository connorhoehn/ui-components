import type { CSSProperties } from 'react';
import type { PlayerPhase } from './VideoPlayer';
export interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * overlaying the strip on a player or widening it previously needed a
     * wrapper `<div>`, because inline styles are banned in demos and stories.
     * Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, className, style }: StatusStripProps): import("react").JSX.Element;
//# sourceMappingURL=StatusStrip.d.ts.map