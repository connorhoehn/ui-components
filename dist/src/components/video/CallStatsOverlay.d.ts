import type { CSSProperties } from 'react';
import { type NetworkQuality } from './NetworkQualityBadge';
export interface CallStatsOverlayStats {
    networkQuality?: NetworkQuality;
    bitrateKbps?: number;
    latencyMs?: number;
    packetLossPct?: number;
}
export type CallStatsOverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export interface CallStatsOverlayProps {
    /** When undefined or empty (no fields set), the overlay renders nothing. */
    stats?: CallStatsOverlayStats;
    /** Corner to dock the overlay against its positioned parent. */
    position?: CallStatsOverlayPosition;
    /** Stable data-testid (e2e hook). Defaults to `call-stats-overlay`. */
    testId?: string;
    /**
     * Extra positioning / sizing classes. Prefer this over `style` — it is
     * composed after the `position` classes through `cn()`, so a caller class
     * wins (e.g. `top-8` overriding `top-2`), and inline styles are banned in
     * demos and stories.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function CallStatsOverlay({ stats, position, testId, className, style, }: CallStatsOverlayProps): import("react").JSX.Element | null;
//# sourceMappingURL=CallStatsOverlay.d.ts.map