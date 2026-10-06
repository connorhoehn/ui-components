import type { ReactNode } from 'react';
/** The tinted band above the graph canvas: a path, a department focus, etc. */
export declare function ContextStrip({ children, 'aria-label': ariaLabel, 'data-testid': testId, }: {
    children: ReactNode;
    'aria-label'?: string;
    'data-testid'?: string;
}): import("react").JSX.Element;
/** The small uppercase caption that labels a group inside a strip or panel. */
export declare function OverlineLabel({ children, tone, className, }: {
    children: ReactNode;
    /** `warning` keeps the amber tone a caption like "rare skills" needs. */
    tone?: 'default' | 'warning';
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=graphOverlay.d.ts.map