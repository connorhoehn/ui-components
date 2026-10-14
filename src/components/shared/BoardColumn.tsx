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
// Since 2.446.1 the lane is a tinted surface running the full board height,
// its header sits inside the lane, and an empty lane shows a dashed drop-zone
// style message rather than a one-line placeholder.
//
// Pair with `<CatalogGrid columns={n}>`: fixed columns keep an empty lane the
// same width as a full one. An `auto-fit` grid, which is what the hand-rolled
// versions used, stretches two empty lanes across half the screen the moment a
// board is lopsided.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

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
  // The lane is a surface of its own (since 2.446.1): a 4% tint of the text
  // colour over whatever the board sits on, so it reads as a column in light
  // and dark alike without a new token. Cards used to float on the page with
  // nothing marking which column they were in once the header scrolled away.
  // `h-full` lets a grid row stretch every lane to the tallest one, so the
  // stripes run the full board height. `data-ui-board-lane` is the DOM audit's
  // marker (board.lane-surface / board.lane-columns).
  return (
    <section
      className={cn(
        'flex h-full min-h-48 min-w-0 flex-col gap-2 rounded-lg p-2',
        'bg-[color-mix(in_srgb,var(--color-text-primary)_4%,transparent)]',
        className,
      )}
      data-ui-board-lane=""
      data-testid={testId}
    >
      <header className="flex h-6 shrink-0 items-center justify-between gap-2 px-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-text-secondary">
        <span className="truncate">{label}</span>
        {action ?? (count !== undefined ? <span className="tabular-nums text-text-tertiary">{count}</span> : null)}
      </header>
      {empty
        ? (
          <div
            data-board-lane-empty=""
            className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border px-2 py-6 text-center text-[12px] text-text-tertiary"
          >
            {emptyLabel}
          </div>
        )
        : <div className="flex flex-col gap-2">{children}</div>}
    </section>
  );
}

export default BoardColumn;
