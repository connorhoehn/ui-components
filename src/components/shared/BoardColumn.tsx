// BoardColumn — one lane of a kanban/status board: a caption, the count in
// that lane, and the cards stacked under it.
//
// The library had DataTable for rows and CatalogGrid for tiles but nothing for
// the third way these apps show a work list. So every board hand-rolled the
// same header — `display:flex; justifyContent:space-between; fontSize:12;
// textTransform:uppercase; letterSpacing:0.04em` with the tertiary text token —
// and then rendered a bare `—` for an empty lane, which reads as a broken row
// rather than "nothing here yet".
//
// (That token name is described rather than written out because the
// darkSurfaceTokens guard scans comments too, and a `--color-*` split across a
// line wrap reads to it as a reference to an undefined token.)
//
// Pair with `<CatalogGrid columns={n}>`: fixed columns keep an empty lane the
// same width as a full one. An `auto-fit` grid, which is what the hand-rolled
// versions used, stretches two empty lanes across half the screen the moment a
// board is lopsided.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import InlinePlaceholder from './InlinePlaceholder';

export interface BoardColumnProps {
  /** The lane's name — "In progress", "Blocked". */
  label: ReactNode;
  /**
   * Count shown at the end of the header. Pass it explicitly rather than
   * counting children: a lane that paginates or virtualises still knows its
   * real total.
   */
  count?: number;
  /** Cards in the lane. When absent, `emptyLabel` is shown instead. */
  children?: ReactNode;
  /** Shown when the lane holds nothing. Default "Nothing here". */
  emptyLabel?: string;
  /** Right-aligned control in the header, e.g. a per-lane "add" button. */
  action?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

export function BoardColumn({
  label,
  count,
  children,
  emptyLabel = 'Nothing here',
  action,
  className,
  'data-testid': testId,
}: BoardColumnProps) {
  // `Children.count` would treat a `{items.map(...)}` array as one child, so
  // callers signal emptiness by passing nothing at all.
  const empty = children === undefined || children === null
    || children === false || (Array.isArray(children) && children.length === 0);
  return (
    <section className={cn('flex flex-col gap-1.5 min-w-0', className)} data-testid={testId}>
      <header className="flex items-baseline justify-between gap-2 text-[11px] uppercase tracking-[0.04em] text-text-tertiary">
        <span className="truncate">{label}</span>
        {action ?? (count !== undefined ? <span className="tabular-nums">{count}</span> : null)}
      </header>
      {empty
        ? <InlinePlaceholder>{emptyLabel}</InlinePlaceholder>
        : <div className="flex flex-col gap-1.5">{children}</div>}
    </section>
  );
}

export default BoardColumn;
