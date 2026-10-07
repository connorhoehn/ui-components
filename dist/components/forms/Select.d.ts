import { type SelectHTMLAttributes } from 'react';
import { type ToneOrAlias } from '../shared/tones';
export type SelectSize = 'sm' | 'md';
/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change.
 *
 * It exists because that shape kept getting hand-rolled: a task row's
 * priority/status pickers are visually chips, and the only way to get one was
 * a bare `<select>` with `appearance-none rounded-full` plus a background-image
 * data-URI arrow and a hand-written `border-*-border bg-*-bg text-*-fg` triple
 * per state. Native `<select>` semantics (keyboard, mobile pickers, form
 * submission) are worth keeping, so this is the real element restyled, not a
 * button-and-menu impostor.
 */
/**
 * `ghost` (2.385.0) is the value side of a label/value row — no box, the
 * value right-aligned with the native chevron after it, a hover tint to say it
 * can be changed ("Model   Haiku ▾" in a run panel).
 */
export type SelectVariant = 'default' | 'pill' | 'ghost';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    options: SelectOption[];
    /** Optional labelled option groups, rendered after the flat `options`. */
    groups?: SelectOptionGroup[];
    /** Shown as a disabled placeholder option when no value is selected. */
    placeholder?: string;
    size?: SelectSize;
    /** Shape. See `SelectVariant`. Default `default`. */
    variant?: SelectVariant;
    /**
     * Semantic tone for `variant="pill"` — the capsule paints in that tone's
     * soft surface (`-bg` / `-fg` / `-border`). Ignored by `variant="default"`,
     * whose chrome is the neutral field border. Default `neutral`.
     */
    tone?: ToneOrAlias;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /**
     * Classes for the `variant="pill"` wrapper `<span>` (the positioning context
     * for the chevron). `className` still lands on the `<select>` itself, so a
     * caller can restyle the capsule without losing the layout hook.
     */
    wrapperClassName?: string;
    /**
     * `native` (default): the browser's own arrow. `custom` (2.391.1): the
     * default field with `appearance-none` and the library's chevron drawn over
     * its right edge, so the field looks the same in every browser and theme
     * (the call-settings selects). The select is then wrapped in a relative
     * `<span>` that takes `wrapperClassName`.
     */
    chevron?: 'native' | 'custom';
    'data-testid'?: string;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
export default Select;
//# sourceMappingURL=Select.d.ts.map