import type { ReactNode } from 'react';
export interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}
export interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    /**
     * What the whole group is FOR.
     *
     * `role="group"` with no name announces as a bare "group", so a reader
     * arriving at Editing / Suggesting / Viewing is told three unrelated toggle
     * buttons rather than one setting with three values. Optional because every
     * existing caller sits under a heading that already says it; new callers on
     * a bare toolbar should pass it.
     */
    'aria-label'?: string;
    /**
     * The element that already says what the group is for — a `FormField`'s
     * label, typically, via the `labelId` it hands its render prop. Prefer this
     * over `aria-label` inside a form: it keeps ONE copy of the wording, so the
     * visible label and the announced one cannot drift apart. Same wiring
     * `Switch` takes.
     */
    'aria-labelledby'?: string;
    /** Every segment disabled — used while a form that owns it is saving. */
    disabled?: boolean;
    /** Stretch the group and share its width equally between the segments. */
    fullWidth?: boolean;
    /**
     * `neutral` (default): a raised white segment on an inset track.
     * `accent` (2.391.1): a flat track on the surface and the chosen segment in
     * the brand's soft fill and text — the start-a-call Video | Audio switch.
     */
    tone?: 'neutral' | 'accent';
    className?: string;
    'data-testid'?: string;
}
export declare function SegmentedControl({ options, value, onChange, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, disabled, fullWidth, tone, className, 'data-testid': testId, }: SegmentedControlProps): import("react").JSX.Element;
export default SegmentedControl;
//# sourceMappingURL=SegmentedControl.d.ts.map