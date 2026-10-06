import { type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
import type { SurfaceTone } from '../shared/tones';
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'success' | 'info' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
/** @see SurfaceTone — which colour family the button paints in. */
export type ButtonTone = SurfaceTone;
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * The underlying `<button>`.
     *
     * Same shape and same reason as `StackProps.ref` (2.233.0): a plain prop, not
     * `forwardRef`, because React 19 — our only supported peer — passes `ref`
     * through as an ordinary prop.
     *
     * A menu trigger has to be re-focusable when its panel closes, and a consumer
     * with no way to hold that node keeps a raw `<button>` instead of using this
     * component. That is exactly what the aws-agentcore portal's masquerade menu
     * did.
     */
    ref?: Ref<HTMLButtonElement>;
    /**
     * `'success'` paints with the success tokens — a confirm/apply action next
     * to a `danger` one (`danger` already lives here as a variant, not a
     * `tone` value, for the same reason: `tone` is spoken for below).
     *
     * `'info'` paints solid with the info tokens — same shape as
     * `danger-solid`, not `success`'s soft/bordered fill — for a primary-ish
     * action that isn't the page's main call to action (e.g. a secondary
     * "Learn more" next to a solid `primary` "Continue").
     *
     * `'link'` drops the border, background and fixed padding entirely and
     * renders as inline text that underlines on hover, inheriting the
     * surrounding font size — for a Cancel/Change action sitting next to
     * prose or another control, not a boxed button.
     */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette. Every bare `<button>` in a
     * terminal or log surface is there because this prop did not exist.
     *
     * Semantic colour (success/danger/…) is a `variant` value, not a `tone`
     * value — `tone` already names the surface-vs-code family axis, and
     * reusing it for semantics would make `tone="success"` and `tone="code"`
     * look like the same kind of choice when they answer different questions.
     */
    tone?: ButtonTone;
    fullWidth?: boolean;
    children: ReactNode;
}
/**
 * The one weight every button-like control in the library renders at —
 * `Button` of every variant and size, and the hand-rolled controls that
 * cannot be a `Button` (a split Send, a menu trigger). Import this instead of
 * writing `font-medium`/`font-semibold` so the app has one button weight.
 */
export declare const BUTTON_WEIGHT = "font-semibold";
export declare function Button({ variant, size, tone, disabled, fullWidth, children, type, className, ref, ...rest }: ButtonProps): import("react").JSX.Element;
//# sourceMappingURL=Button.d.ts.map