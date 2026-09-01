import { type ReactNode } from 'react';
export interface ConfigSectionProps {
    title: string;
    defaultCollapsed?: boolean;
    children: ReactNode;
    className?: string;
}
export default function ConfigSection({ title, defaultCollapsed, children, className }: ConfigSectionProps): import("react").JSX.Element;
//# sourceMappingURL=ConfigSection.d.ts.map