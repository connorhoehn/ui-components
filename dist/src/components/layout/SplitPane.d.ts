import { type ReactNode } from 'react';
export interface SplitPaneProps {
    primary: ReactNode;
    /** The second pane. `null` renders only the primary, no divider. */
    secondary: ReactNode | null;
    /** Primary pane width as a fraction of the whole, 0–1. Default 0.55. */
    defaultRatio?: number;
    /** Controlled ratio; when given, `onRatioChange` must move it. */
    ratio?: number;
    onRatioChange?: (ratio: number) => void;
    /** Smallest each pane may get, in px. Defaults 280 / 360. */
    minPrimaryPx?: number;
    minSecondaryPx?: number;
    /** Names the divider for assistive tech, e.g. "Resize conversation and document". */
    dividerLabel?: string;
    className?: string;
    'data-testid'?: string;
}
export declare function SplitPane({ primary, secondary, defaultRatio, ratio: controlled, onRatioChange, minPrimaryPx, minSecondaryPx, dividerLabel, className, 'data-testid': testId, }: SplitPaneProps): import("react").JSX.Element;
export default SplitPane;
//# sourceMappingURL=SplitPane.d.ts.map