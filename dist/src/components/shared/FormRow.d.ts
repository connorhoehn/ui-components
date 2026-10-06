import { type ReactNode } from 'react';
export interface FormRowProps {
    /** The fields. Usually `<FormField>`s; anything is accepted. */
    children: ReactNode;
    /**
     * Below this width the row stacks. `sm` (default, 640px) suits a modal;
     * `md` (768px) suits a full-width form where three fields share the row.
     */
    stackBelow?: 'sm' | 'md';
    /** Gap between fields. Default 12px, matching Stack's `md`. */
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}
export declare function FormRow({ children, stackBelow, gap, className, 'data-testid': testId, }: FormRowProps): import("react").JSX.Element;
export default FormRow;
//# sourceMappingURL=FormRow.d.ts.map