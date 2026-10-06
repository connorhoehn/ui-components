import type { CSSProperties } from 'react';
export type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';
export interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * the badge is normally docked into a corner of the video stage, and with
     * no className seam callers had to reach for an inline style (banned in
     * demos and stories). Composed through `cn()`, so a caller class wins.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function NetworkQualityBadge({ quality, className, style }: NetworkQualityBadgeProps): import("react").JSX.Element;
//# sourceMappingURL=NetworkQualityBadge.d.ts.map