import type { ReactNode } from 'react';
export interface RailLayoutProps {
    /** The main column. */
    children: ReactNode;
    /** The context rail. Compose with <RailSection>. */
    rail: ReactNode;
    /** Rail width at lg+. Default 'md' (300px). */
    railWidth?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}
export declare function RailLayout({ children, rail, railWidth, className, 'data-testid': testId }: RailLayoutProps): import("react").JSX.Element;
export interface RailSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}
/** One titled block in the rail. Sections divide themselves. */
export declare function RailSection({ title, children, className }: RailSectionProps): import("react").JSX.Element;
export default RailLayout;
//# sourceMappingURL=RailLayout.d.ts.map