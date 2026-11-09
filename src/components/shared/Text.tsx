// Text (alias T) — a styled text primitive with zero raw elements.
//
// Every page eventually needs the occasional small styled caption, mono
// metric, or muted label, and a bare `<span style={{...}}>`/`<div>` is
// exactly what the component-discipline gate forbids. Several downstream
// consumers (aws-agentcore's `observability/Text.tsx`, `iq/Text.tsx`,
// `budgets/Text.tsx`, `designs/Text.tsx`, ...) hand-rolled the identical
// three-line shim around `Inline` for this reason — this ships that shim
// once, upstream, instead of once per page.
//
// It is `Inline` in `as="span"` mode: same flex-row primitive, `gap="none"`
// so it reads as plain text rather than a laid-out row.

import type { MouseEventHandler, ReactNode } from 'react';
import { Inline } from '../ui/Stack';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
/** `success` / `warning` / `danger` (since 2.515.1): a status line's outcome ("Saved.", "Could not save"). */
export type TextTone = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'inherit';

const SIZE: Record<TextSize, string> = { xs: 'text-xs', sm: 'text-sm', base: 'text-base', lg: 'text-lg' };
const WEIGHT: Record<TextWeight, string> = { normal: 'font-normal', medium: 'font-medium', semibold: 'font-semibold', bold: 'font-bold' };
const TONE: Record<TextTone, string> = {
  primary: 'text-text-primary', secondary: 'text-text-secondary', tertiary: 'text-text-tertiary',
  success: 'text-success', warning: 'text-warning', danger: 'text-danger', inherit: '',
};

export interface TextProps {
  /** Type scale step. Since 2.420.0; omitted: inherits. */
  size?: TextSize;
  /** Font weight. Since 2.420.0; omitted: inherits. */
  weight?: TextWeight;
  /** Text colour token. Since 2.420.0. */
  tone?: TextTone;
  /** Draw numerals at equal width (timers, counts). Since 2.420.0. */
  tabular?: boolean;
  /** Element to render as. Default `'span'`. */
  as?: 'span' | 'div' | 'p' | 'li';
  className?: string;
  title?: string;
  /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
   *  `false`. Wrapped prose keeps text and inline marks in one flow. */
  wrap?: boolean;
  role?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  onClick?: MouseEventHandler<HTMLElement>;
  'data-testid'?: string;
  id?: string;
  children?: ReactNode;
}

export function Text({
  as = 'span',
  className,
  title,
  children,
  wrap = false,
  size,
  weight,
  tone,
  tabular = false,
  ...rest
}: TextProps) {
  const classes = [size && SIZE[size], weight && WEIGHT[weight], tone && TONE[tone], tabular && 'tabular-nums', className]
    .filter(Boolean).join(' ') || undefined;
  return (
    <Inline as={as} gap="none" wrap={wrap} className={classes} title={title} {...rest}>
      {wrap ? <span className="min-w-0">{children}</span> : children}
    </Inline>
  );
}

/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export const T = Text;

export default Text;
