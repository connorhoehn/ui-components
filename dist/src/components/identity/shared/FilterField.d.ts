import type { ReactNode } from 'react';
export interface FilterFieldProps {
    label: string;
    /** Helper text under the control; reachable via aria-describedby. */
    hint?: string;
    /**
     * Receives the wiring to spread onto the control. `labelId` is dropped here
     * — a filter always holds a single labelable control, so `htmlFor` is enough
     * and spreading `labelId` onto a DOM node would emit an unknown attribute.
     */
    children: (wiring: {
        id: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        'aria-required'?: boolean;
    }) => ReactNode;
    /** `inline` puts the caption beside the control instead of above it. */
    layout?: 'stacked' | 'inline';
    className?: string;
}
export declare function FilterField({ label, hint, children, layout, className }: FilterFieldProps): import("react").JSX.Element;
export default FilterField;
//# sourceMappingURL=FilterField.d.ts.map