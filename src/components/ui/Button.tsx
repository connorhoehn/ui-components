// frontend/src/components/ui/Button.tsx
//
// Shared button component with consistent variants.

import { type ButtonHTMLAttributes, type ReactNode, type Ref } from 'react';
import { useDensity } from '../shared/Density';
import { CONTROL_HEIGHT } from '../shared/controlMetrics';
import { cn } from '../../lib/cn';
import type { SurfaceTone } from '../shared/tones';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'danger-solid'
  | 'success'
  | 'info'
  | 'link';
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

// Token-mapped, not hex-literal: consumers rebrand by overriding the
// --color-* variables, so a hex here would be the one button that never
// re-tones. (Until v2.61.0 `primary` was hardcoded blue-600 — visibly a
// different colour from the brand --color-primary.)
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-on-primary border-none hover:bg-primary-hover',
  secondary: 'bg-primary/5 text-text-primary border border-primary/20 enabled:hover:bg-primary/12 enabled:hover:border-primary/30 aria-pressed:bg-primary/12 aria-pressed:text-primary',
  ghost: 'bg-transparent text-text-primary border border-transparent enabled:hover:bg-primary/10 enabled:hover:text-primary aria-pressed:bg-primary/12 aria-pressed:text-primary',
  danger: 'bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg',
  'danger-solid': 'bg-danger text-white border-none hover:bg-danger/90',
  success: 'bg-transparent text-success-fg border border-success-border hover:bg-success-bg',
  info: 'bg-info text-white border-none hover:bg-info/90',
  link: 'bg-transparent text-primary border-none p-0 no-underline hover:underline',
};

// The code family's accents are pastels, so solid fills take `code-bg` text
// rather than white — white on Catppuccin blue is unreadable.
const codeVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-code-blue text-code-bg border-none hover:bg-code-blue/90',
  secondary: 'bg-code-surface text-code-text border border-code-border hover:bg-code-raised',
  ghost: 'bg-transparent text-code-text border border-code-border hover:bg-code-surface',
  danger: 'bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface',
  'danger-solid': 'bg-code-red text-code-bg border-none hover:bg-code-red/90',
  success: 'bg-transparent text-code-green border border-code-green/40 hover:bg-code-surface',
  info: 'bg-code-blue text-code-bg border-none hover:bg-code-blue/90',
  link: 'bg-transparent text-code-blue border-none p-0 no-underline hover:underline',
};

const TONE: Record<ButtonTone, Record<ButtonVariant, string>> = {
  surface: variantClasses,
  code: codeVariantClasses,
};

// One box per size. The height is fixed rather than grown from padding +
// content, because a grown box is not one size: a bordered button came out
// 2px taller than a borderless one (26 vs 24 at `sm`), and an icon beside the
// label pushed its button to 30px next to a 26px neighbour in the same header
// (measured by realtime-examples' type audit, 2.407.14). The label and any
// icon centre inside the box instead.
/**
 * The one weight every button-like control in the library renders at —
 * `Button` of every variant and size, and the hand-rolled controls that
 * cannot be a `Button` (a split Send, a menu trigger). Import this instead of
 * writing `font-medium`/`font-semibold` so the app has one button weight.
 */
export const BUTTON_WEIGHT = 'font-semibold';

const sizeClasses: Record<ButtonSize, string> = {
  sm: `${CONTROL_HEIGHT.sm} gap-1.5 px-2.5 text-xs`,
  md: `${CONTROL_HEIGHT.md} gap-2 px-3 text-sm`,
  lg: `${CONTROL_HEIGHT.lg} gap-2 px-4 text-sm`,
};

export function Button({
  variant = 'primary',
  size: requestedSize,
  tone = 'surface',
  disabled = false,
  fullWidth = false,
  children,
  type = 'button',
  className,
  ref,
  ...rest
}: ButtonProps) {
  const density = useDensity();
  const size = requestedSize ?? (density === 'compact' ? 'sm' : 'md');
  // `link` is inline text, not a boxed control: it skips the shared box
  // (and `sizeClasses`'s fixed padding/text-size) so it sits in prose at the
  // inherited font size, underlining only on hover. It keeps the one button
  // weight, like every other variant.
  const isLink = variant === 'link';
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      // Which step of the button scale this is — for audits and for hosts
      // that need to find "every small ghost button" without parsing classes.
      data-variant={variant}
      data-size={isLink ? undefined : size}
      className={cn(
        isLink
          ? 'font-[inherit] transition-colors duration-150 ease-in-out'
          : // A caption never breaks mid-word: a narrow flex parent turned
            // "Remove" into "Rem / ove" (measured, in a 430px document pane).
            'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-[inherit] transition-colors duration-150 ease-in-out',
        // After the family reset: `font-[inherit]` is a font-FAMILY class
        // (see lib/cn), and the weight is the one button weight.
        BUTTON_WEIGHT,
        tone === 'code' ? 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-code-blue' : 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        (TONE[tone] ?? variantClasses)[variant],
        !isLink && sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
