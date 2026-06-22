import { CSSProperties } from 'react';
import { PlayerPhase } from './VideoPlayer';
export interface StatusStripProps {
    phase: PlayerPhase | 'live' | 'reconnecting';
    bitrateBps?: number;
    viewerCount?: number;
    duration?: number;
    style?: CSSProperties;
}
export declare function StatusStrip({ phase, bitrateBps, viewerCount, duration, style }: StatusStripProps): import("react").JSX.Element;
//# sourceMappingURL=StatusStrip.d.ts.map