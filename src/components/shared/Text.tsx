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

export interface TextProps {
  /** Element to render as. Default `'span'`. */
  as?: 'span' | 'div' | 'p' | 'li';
  className?: string;
  title?: string;
  /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
   *  `false` — a single line of text, matching a plain inline element. */
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
  ...rest
}: TextProps) {
  return (
    <Inline as={as} gap="none" wrap={wrap} className={className} title={title} {...rest}>
      {children}
    </Inline>
  );
}

/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export const T = Text;

export default Text;
