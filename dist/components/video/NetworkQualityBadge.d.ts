import type { CSSProperties } from 'react';
export type NetworkQuality = 'good' | 'medium' | 'poor' | 'dead';
export interface NetworkQualityBadgeProps {
    quality: NetworkQuality;
    style?: CSSProperties;
}
export declare function NetworkQualityBadge({ quality, style }: NetworkQualityBadgeProps): import("react").JSX.Element;
//# sourceMappingURL=NetworkQualityBadge.d.ts.map