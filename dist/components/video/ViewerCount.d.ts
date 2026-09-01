import type { CSSProperties } from 'react';
export interface ViewerCountProps {
    count: number;
    /**
     * Positioning / spacing classes from the caller. Prefer this over `style`:
     * callers overlaying the badge on a player had no className seam, so they
     * were forced into an inline style.
     */
    className?: string;
    /** @deprecated Use `className`. Kept so existing callers keep compiling. */
    style?: CSSProperties;
}
export declare function ViewerCount({ count, className, style }: ViewerCountProps): import("react").JSX.Element;
//# sourceMappingURL=ViewerCount.d.ts.map