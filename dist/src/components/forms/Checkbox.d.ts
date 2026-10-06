import { type ToneOrAlias } from '../shared/tones';
/**
 * `square` is the native `accent-primary` box (default, unchanged). `round` is
 * the tone-coloured ring that fills solid and shows a tick when checked —
 * the "status toggle" shape a task list uses, where the colour carries the
 * state (amber pending, blue acknowledged, green done) and the control is
 * round so it reads as a status rather than a form field.
 *
 * This is still a real `<input type="checkbox">`: the native control is
 * transparent and stretched over the painted ring, so focus, space-to-toggle,
 * label association and form submission all behave exactly as they do for the
 * square shape. Hosts that hand-rolled this shape used a `<button>` and lost
 * every one of those.
 */
export type CheckboxShape = 'square' | 'round';
/** Modifier keys held during the click that toggled a checkbox. */
export interface CheckboxModifiers {
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
}
export interface CheckboxProps {
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    checked: boolean;
    /**
     * The new checked state, and the modifier keys held while it changed.
     *
     * `shiftKey` is the reason for the second argument: "tick this one" and
     * "tick everything from the last one to this one" are the same control with
     * shift held, and a callback carrying only the boolean cannot express the
     * second. Callers with a shift-select list therefore hand-rolled a native
     * <input type="checkbox"> — which is how a pipelines table ended up styling
     * itself with `accent-[var(--color-accent-solid)]`, a token that does not
     * exist. Existing callers taking one parameter are unaffected.
     *
     * The modifiers come from the CLICK, not the change event: a change event
     * carries no modifier state at all. Keyboard activation (space) also emits a
     * click, so it arrives here with every modifier false, which is correct —
     * there is no shift-space range-select convention on a checkbox.
     */
    onChange: (checked: boolean, modifiers: CheckboxModifiers) => void;
    /**
     * Mixed state — "some but not all selected". Rendered natively (the dash),
     * exposed to AT via aria-checked="mixed". Clicking a mixed checkbox
     * reports `true`, matching the native select-all convention.
     */
    indeterminate?: boolean;
    disabled?: boolean;
    /** Accessible name. Required when no visible <label> wraps this. */
    'aria-label'?: string;
    /**
     * Id of the element naming this checkbox. Prefer this over `aria-label` when
     * a visible label exists but cannot wrap the control (e.g. a generated form
     * that renders the label above a row of widgets) — a hand-written
     * `aria-label` is a copy that drifts from the words on screen.
     */
    'aria-labelledby'?: string;
    /** Id(s) of the help / error text describing this checkbox. */
    'aria-describedby'?: string;
    /**
     * Click pass-through. Row-selection checkboxes live inside clickable
     * rows/cards and need `e.stopPropagation()` so ticking the box doesn't
     * also open the row.
     */
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    /** Key pass-through, for shift-range selection handling. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Control shape. See `CheckboxShape`. Default `square`.
     *
     * With `round`, `className` lands on the wrapper (the thing with a size and
     * a position) rather than on the hidden input, since the input no longer has
     * any paint of its own — which is also how the control is resized, e.g.
     * `className="h-[22px] w-[22px]"`.
     */
    shape?: CheckboxShape;
    /**
     * Semantic tone for `shape="round"` — the ring's border and its checked
     * fill. Ignored by `shape="square"`, which is the browser's own
     * `accent-primary` box. Default `info`.
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
export default Checkbox;
//# sourceMappingURL=Checkbox.d.ts.map