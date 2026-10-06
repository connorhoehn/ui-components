import type { CSSProperties } from 'react';
export interface StreamMetrics {
    bitrateBps: number;
    fps: number;
    resolution: {
        width: number;
        height: number;
    };
    packetsLost: number;
    jitter?: number;
}
export interface StatsCardProps {
    metrics: StreamMetrics | null;
    /**
     * Sizing / positioning classes from the caller. Prefer this over `style`:
     * the card has no intrinsic width, so every consumer was wrapping it in a
     * `<div>` purely to size it — inline styles are banned in demos and
     * stories. Applied to BOTH the empty and populated states, and composed
     * through `cn()` so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function StatsCard({ metrics, className, style }: StatsCardProps): import("react").JSX.Element;
//# sourceMappingURL=StatsCard.d.ts.map