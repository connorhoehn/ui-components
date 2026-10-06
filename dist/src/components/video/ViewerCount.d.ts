import type { CSSProperties } from 'react';
export interface ViewerCountProps {
    /**
     * Watchers, when the number is KNOWN. Pass `null` (or omit) when it is not —
     * the badge then renders nothing rather than claiming an audience of zero.
     */
    count?: number | null;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * callers overlaying the badge on a player had no className seam, so they
     * were forced into an inline style.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
    'data-testid'?: string;
}
/**
 * `null`/`undefined` mean nobody measured; a numeric 0 means somebody did and
 * the answer was nobody. Negative is nonsense from a broken source, and is
 * treated as unmeasured rather than shown.
 */
export declare function isKnownViewerCount(count: number | null | undefined): count is number;
export declare function ViewerCount({ count, className, style, 'data-testid': testId, }: ViewerCountProps): import("react").JSX.Element | null;
//# sourceMappingURL=ViewerCount.d.ts.map