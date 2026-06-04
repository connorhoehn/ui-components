import type { CSSProperties, ReactNode } from 'react';
import { type StatusDotSize } from './StatusDot';
export type PresenceState = 'online' | 'away' | 'busy' | 'offline' | 'unknown';
export interface PresenceDotProps {
    state: PresenceState;
    /** Override the auto-computed accessible label. */
    ariaLabel?: string;
    /** Visible text label after the dot. */
    label?: ReactNode;
    /** Pulse animation. Defaults to true when state === 'online'. */
    pulse?: boolean;
    size?: StatusDotSize;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
}
export declare function PresenceDot({ state, ariaLabel, label, pulse, size, className, style, title, 'data-testid': testId, }: PresenceDotProps): import("react/jsx-runtime").JSX.Element;
export default PresenceDot;
//# sourceMappingURL=PresenceDot.d.ts.map