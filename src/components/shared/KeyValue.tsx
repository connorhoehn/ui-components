// KeyValue — a short list of labelled facts: "Input 13 run notes / Output 4
// patterns / Duration 2 min / Cost $0.0039" in a run inspector, "Model
// nova-pro" on an agent page.
//
// Pages had grown their own copy of this (a `Kv`, a `MetaRow`, a `Field`),
// each with its own label size, case and column width, so the same fact read
// three different ways. DetailSection is a titled block and DataTable is rows;
// neither states one labelled fact.
//
//   row (default)          stack             grid
//   Input    13 notes      Input             Input      Output
//   Output   4 patterns    13 notes          13 notes   4 patterns
//
//   inline (2.515.12): every pair on one line, pairs side by side
//   Input 13 notes   Output 4 patterns   Duration 2 min
//
// Semantics are a real description list (`<dl>` / `<dt>` / `<dd>`), so a
// screen reader announces each value with its label.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface KeyValueItem {
  label: string;
  value: ReactNode;
  /** Monospace value — ids, shas, model ids. */
  mono?: boolean;
  /**
   * Native tooltip on the value — the full text of a value the layout
   * truncates (a long id, a path).
   */
  title?: string;
  /**
   * The value in tertiary ink — a fact that is really an absence ("Not
   * defined yet", "No links added"). Since 2.390.0.
   */
  muted?: boolean;
  /**
   * A control at the row's end, after the value — "Draft with agent", "Add a
   * note". Row layout only. Since 2.390.0.
   */
  action?: ReactNode;
}

export type KeyValueLayout = 'stack' | 'row' | 'grid' | 'inline' | 'stacked-row';

export interface KeyValueProps {
  items: KeyValueItem[];
  /**
   * `row` (default): label in a fixed column left of the value.
   * `stack`: label above value, one fact per line.
   * `grid`: stacked pairs in two columns.
   * `inline` (since 2.515.12): one row of pairs, each label beside its value
   * (12px label, 14px value, 4px apart, 16px between pairs), wrapping onto a
   * further line when the row is full; a header's facts line.
   * `stacked-row` (since 2.516.2): one row of pairs, each a 12px label above
   * its 14px value (4px apart), pairs 24px apart, wrapping lines 12px apart;
   * a card's facts strip (the Storymaker Overview job facts).
   */
  layout?: KeyValueLayout;
  /** Row layout only: the label column's Tailwind width class. Default `w-28`. */
  labelWidth?: string;
  /**
   * Row layout only: each fact on its own ruled row (a rule above the first
   * and under every row), at 15px, with any `action` right-aligned — a small
   * checklist table ("Complete the brief"). Default `false`. Since 2.390.0.
   */
  divided?: boolean;
  /** Let ruled rows put labels above their values when the column is narrow. */
  responsive?: boolean;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function KeyValue({
  items,
  layout = 'row',
  labelWidth = 'w-28',
  divided = false,
  responsive = false,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'key-value',
}: KeyValueProps) {
  if (items.length === 0) return null;
  const row = layout === 'row';
  const inline = layout === 'inline';
  const stackedRow = layout === 'stacked-row';
  const ruled = row && divided;
  return (
    <dl
      className={cn(
        'm-0 min-w-0', responsive && '@container/key-value',
        layout === 'grid' ? 'grid grid-cols-2 gap-x-6 gap-y-3' : stackedRow ? 'flex flex-wrap items-start gap-x-6 gap-y-3' : inline ? 'flex flex-wrap items-baseline gap-x-4 gap-y-1' : ruled ? 'flex flex-col border-t border-border' : row ? 'flex flex-col gap-2' : 'flex flex-col gap-3',
        className,
      )}
      data-layout={layout}
      data-divided={ruled || undefined}
      data-testid={testId}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={cn(
            'min-w-0', responsive && ruled && 'flex-wrap @lg/key-value:flex-nowrap',
            ruled ? 'flex min-h-[38px] items-center gap-3 border-b border-border px-3 py-1.5' : row ? 'flex items-baseline gap-3' : inline ? 'flex items-baseline gap-1' : 'flex flex-col gap-1',
          )}
          data-testid={`${testId}-item`}
          data-key-value-row=""
        >
          <dt
            className={cn(
              'm-0', responsive && ruled && 'basis-full @lg/key-value:basis-auto',
              ruled ? cn('shrink-0 text-sm text-text-primary', labelWidth) : 'text-text-secondary',
              !ruled && (row ? cn('shrink-0 text-xs', labelWidth) : inline ? 'shrink-0 text-xs' : 'text-[12px]'),
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              'm-0 min-w-0 truncate',
              'text-sm',
              item.muted ? 'text-text-tertiary' : 'text-text-primary',
              row && 'flex-1',
              item.mono && 'font-mono text-[12px]',
            )}
            {...(item.title ? { title: item.title } : {})}
          >
            {item.value}
          </dd>
          {row && item.action != null && item.action !== false && (
            <dd className="m-0 flex shrink-0 items-center" data-testid={`${testId}-action`}>{item.action}</dd>
          )}
        </div>
      ))}
    </dl>
  );
}

export default KeyValue;
