import type { ReactNode } from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the placeholder paints in. */
export type InlinePlaceholderTone = SurfaceTone;
export interface InlinePlaceholderProps {
    /** The message. One short line — "nothing here", "no runs yet". */
    children: ReactNode;
    /**
     * Optional control beside the message, e.g. a `<Button size="sm">` that
     * creates the missing thing. Sits after the text, not below it.
     */
    action?: ReactNode;
    /**
     * `xs` (default) is the list/rail scale; `sm` is for a pane-sized region
     * where the line is the only thing on screen.
     */
    size?: 'xs' | 'sm';
    /**
     * `start` (default) reads as a list row, which is what a rail section or a
     * filtered result list wants. `center` is for a region the placeholder owns
     * outright — an empty pane.
     */
    align?: 'start' | 'center';
    tone?: InlinePlaceholderTone;
    className?: string;
    'data-testid'?: string;
}
export declare function InlinePlaceholder({ children, action, size, align, tone, className, 'data-testid': testId, }: InlinePlaceholderProps): import("react").JSX.Element;
export default InlinePlaceholder;
//# sourceMappingURL=InlinePlaceholder.d.ts.map