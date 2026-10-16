// src/components/shared/MetaLine.tsx
//
// The dot-separated secondary line that sits under almost every title in this
// design language: "Observability Platform · 18 Aug → 1 Sept · 3 days left".
//
// It was hand-rolled everywhere, and always the same three mistakes: the
// separators were baked into the JSX as `{' · '}` string literals, so a null
// field left a dangling dot ("Auth Migration ·  · 0d left"); the muted colour
// and 12px size were re-typed inline at every site and drifted; and the whole
// line was one `<div>` with no semantics.
//
// Passing the pieces as an array fixes the first: empty entries (null,
// undefined, false, '') are dropped BEFORE the separators are woven in, so a
// missing steward removes its own dot. `0` is kept — a zero is a value.

import { Children, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type MetaLineSize = 'xs' | 'sm';
export type MetaLineTone = 'tertiary' | 'secondary';

export interface MetaLineProps {
  /** The pieces, in order. Falsy entries are dropped with their separator. */
  items: ReactNode[];
  /** Separator woven between surviving items. Default `·`. */
  separator?: ReactNode;
  /** `xs` (11px, the default) is the card/list scale; `sm` (12px) is body meta. */
  size?: MetaLineSize;
  tone?: MetaLineTone;
  className?: string;
  'data-testid'?: string;
}

const SIZE: Record<MetaLineSize, string> = {
  xs: 'text-[12px]',
  sm: 'text-[12px]',
};

const TONE: Record<MetaLineTone, string> = {
  tertiary: 'text-text-tertiary',
  secondary: 'text-text-secondary',
};

/**
 * True for entries worth rendering. Deliberately keeps `0` and empty React
 * fragments-with-content, and drops `''` / `null` / `undefined` / `false` —
 * the four things a conditional expression collapses to when a field is
 * missing.
 */
function present(node: ReactNode): boolean {
  if (node === null || node === undefined || node === false || node === true) return false;
  if (typeof node === 'string') return node.trim() !== '';
  if (Array.isArray(node)) return Children.toArray(node).some(present);
  return true;
}

export function MetaLine({
  items,
  separator = '·',
  size = 'xs',
  tone = 'tertiary',
  className,
  'data-testid': testId,
}: MetaLineProps) {
  const kept = items.filter(present);
  if (kept.length === 0) return null;
  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-1.5 gap-y-0.5', SIZE[size], TONE[tone], className)}
      data-testid={testId}
    >
      {kept.map((item, i) => (
        // Index keys are correct here: the list is positional and static
        // within a render — there is no identity to preserve across reorders.
        // The separator trails the PREVIOUS item in the same nowrap unit, so a
        // wrapped line never starts with "·".
        <span key={i} className="flex items-center gap-1.5">
          {item}
          {i < kept.length - 1 ? <span aria-hidden="true">{separator}</span> : null}
        </span>
      ))}
    </div>
  );
}

export default MetaLine;
