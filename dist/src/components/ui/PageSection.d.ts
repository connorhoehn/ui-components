import { ReactNode } from 'react';
export interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    className?: string;
}
export declare function PageSection({ title, description, actions, children, className, }: PageSectionProps): import("react").JSX.Element;
//# sourceMappingURL=PageSection.d.ts.map