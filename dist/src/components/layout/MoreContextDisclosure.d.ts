import type { ReactNode } from 'react';
export interface MoreContextItem {
    id: string;
    label: string;
    icon?: ReactNode;
    /** Shown after the label — "Sources · 2". */
    count?: number;
    onSelect?: () => void;
}
export interface MoreContextDisclosureProps {
    items: readonly MoreContextItem[];
    /** Summary text. Default "More context". */
    label?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onToggle?: (open: boolean) => void;
    /** Extra content under the rows. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}
export declare function MoreContextDisclosure({ items, label, defaultOpen, open, onToggle, children, className, 'data-testid': testId, }: MoreContextDisclosureProps): import("react").JSX.Element;
export default MoreContextDisclosure;
//# sourceMappingURL=MoreContextDisclosure.d.ts.map