import type { ReactNode } from 'react';
export interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    size?: 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}
export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, }: FilterChipProps): import("react/jsx-runtime").JSX.Element;
export default FilterChip;
//# sourceMappingURL=FilterChip.d.ts.map