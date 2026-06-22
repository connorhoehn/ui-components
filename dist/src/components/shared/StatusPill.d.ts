import { ReactNode } from 'react';
export type StatusPillState = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending';
export type StatusPillSize = 'sm' | 'md';
export interface StatusPillProps {
    state: StatusPillState;
    label: string;
    /** Optional icon placed to the left of the label. */
    icon?: ReactNode;
    size?: StatusPillSize;
    className?: string;
    'data-testid'?: string;
}
export declare function StatusPill({ state, label, icon, size, className, 'data-testid': testId, }: StatusPillProps): import("react").JSX.Element;
export default StatusPill;
//# sourceMappingURL=StatusPill.d.ts.map