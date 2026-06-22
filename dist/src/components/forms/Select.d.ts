import { SelectHTMLAttributes } from 'react';
export type SelectSize = 'sm' | 'md';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    options: SelectOption[];
    /** Shown as a disabled placeholder option when no value is selected. */
    placeholder?: string;
    size?: SelectSize;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    'data-testid'?: string;
}
export declare const Select: import('react').ForwardRefExoticComponent<SelectProps & import('react').RefAttributes<HTMLSelectElement>>;
export default Select;
//# sourceMappingURL=Select.d.ts.map