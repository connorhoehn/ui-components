import type { ReactNode } from 'react';
export interface MeterRowProps {
    onClick: () => void;
    /** Tooltip — what the click does ("Add Nora to selection"). */
    title?: string;
    label: ReactNode;
    /** Muted trailing note after the label: "mentors". */
    note?: ReactNode;
    /** The meter — usually `<ScoreBarGauge size="sm" showLabel={false} />`. */
    meter: ReactNode;
    /** Meter slot width. Default `sm` (44px); `md` is 72px. */
    meterWidth?: 'sm' | 'md';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}
export declare function MeterRow({ onClick, title, label, note, meter, meterWidth, className, 'aria-label': ariaLabel, 'data-testid': testId, }: MeterRowProps): import("react").JSX.Element;
export default MeterRow;
//# sourceMappingURL=MeterRow.d.ts.map