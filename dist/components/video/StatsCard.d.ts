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
    style?: CSSProperties;
}
export declare function StatsCard({ metrics, style }: StatsCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StatsCard.d.ts.map