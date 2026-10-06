import { type ReactNode } from 'react';
export interface ConfigFieldProps {
    label: string;
    required?: boolean;
    help?: string;
    error?: string;
    /**
     * Id of the control this field labels. Set the same value as the control's
     * `id` and the `<label htmlFor>` association becomes explicit.
     */
    controlId?: string;
    /**
     * Render-prop escape hatch: receives the id of the help/error text so the
     * control can point `aria-describedby` at it. Use INSTEAD of `children`.
     */
    render?: (wiring: {
        describedById?: string;
        controlId?: string;
        /** Id of the rendered `<label>`, for `aria-labelledby` on a `role="group"`. */
        labelId: string;
    }) => ReactNode;
    children?: ReactNode;
    className?: string;
}
export default function ConfigField({ label, required, help, error, controlId, render, children, className, }: ConfigFieldProps): import("react").JSX.Element;
//# sourceMappingURL=ConfigField.d.ts.map