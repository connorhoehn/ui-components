import { type ReactNode } from 'react';
export interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    /**
     * A count beside the title in a neutral chip — "Needs attention 1". Absent
     * draws none; zero shows "0" (an empty section is a fact). Since 2.392.0.
     */
    count?: number;
    /**
     * The count pill's colour. `neutral` (default): the grey chip. `primary`
     * (since 2.396.0): a pale indigo pill (`primary-bg`) with indigo
     * (`primary-fg`) numerals at 13px — the Initiatives v2 "Needs attention 1".
     */
    countTone?: 'neutral' | 'primary';
    /**
     * `lg` (default): the page's own 20px h1 with 24px to its content. `md`
     * (since 2.392.0): a 16px semibold h2 over a section of a page — "Needs
     * attention", "Up next" — with 8px to its content, the actions vertically
     * centred on the title.
     */
    size?: 'lg' | 'md';
    className?: string;
    'data-testid'?: string;
}
export declare function PageSection({ title, description, actions, children, count, countTone, size, className, 'data-testid': testId, }: PageSectionProps): import("react").JSX.Element;
//# sourceMappingURL=PageSection.d.ts.map