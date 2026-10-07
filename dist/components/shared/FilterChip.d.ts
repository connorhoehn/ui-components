import type { ReactNode } from 'react';
export interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    /**
     * `md` is the comfortable default for a filter bar people actually click.
     * `sm`/`xs` are for chips packed into a dense row or a table cell — at xs a
     * filter reads as a caption rather than a control.
     */
    size?: 'md' | 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    /** Forwarded to the underlying <button> for test selectors. */
    'data-testid'?: string;
    /**
     * Since 2.406.4: the button's accessible name when the visible label is not
     * the whole story ("In: Design System API. Search entire workspace").
     */
    'aria-label'?: string;
    /** Since 2.406.4: forwarded to the button — the hover tooltip. */
    title?: string;
}
export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, 'data-testid': dataTestId, 'aria-label': ariaLabel, title, }: FilterChipProps): import("react").JSX.Element;
export default FilterChip;
//# sourceMappingURL=FilterChip.d.ts.map