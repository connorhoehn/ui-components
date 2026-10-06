import type { ReactNode } from 'react';
export interface DetailHeaderProps {
    title: ReactNode;
    /** Sits inline after the title — a status chip, a badge, a count. */
    badge?: ReactNode;
    /** One line of prose. Capped at a readable measure, not the panel width. */
    description?: ReactNode;
    /** The metadata line. Pass a `<MetaLine>`; anything is accepted. */
    meta?: ReactNode;
    /** Right-hand region — progress bars, a gauge, a small action cluster. */
    aside?: ReactNode;
    /** Width of the aside in px. Default 260. */
    asideWidth?: number;
    /** Heading level, so a panel nested under a page h1 does not claim h1. */
    as?: 'h2' | 'h3';
    className?: string;
    'data-testid'?: string;
}
export declare function DetailHeader({ title, badge, description, meta, aside, asideWidth, as: Heading, className, 'data-testid': testId, }: DetailHeaderProps): import("react").JSX.Element;
export default DetailHeader;
//# sourceMappingURL=DetailHeader.d.ts.map