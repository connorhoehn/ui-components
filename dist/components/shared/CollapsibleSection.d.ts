import React from 'react';
export interface CollapsibleSectionProps {
    title: string;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
}
declare function CollapsibleSection({ title, defaultOpen, badge, children, className, storageKey, }: CollapsibleSectionProps): import("react/jsx-runtime").JSX.Element;
export { CollapsibleSection };
export default CollapsibleSection;
//# sourceMappingURL=CollapsibleSection.d.ts.map