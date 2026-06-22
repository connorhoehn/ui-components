import { CSSProperties } from 'react';
import { NetworkQuality } from './NetworkQualityBadge';
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
    className?: string;
    style?: CSSProperties;
}
export declare function CallStatsOverlay({ stats, position, testId, className, style, }: CallStatsOverlayProps): import("react").JSX.Element | null;
//# sourceMappingURL=CallStatsOverlay.d.ts.map