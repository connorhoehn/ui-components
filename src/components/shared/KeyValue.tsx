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
}

export type KeyValueLayout = 'stack' | 'row' | 'grid';

export interface KeyValueProps {
  items: KeyValueItem[];
  /**
   * `row` (default): label in a fixed column left of the value.
   * `stack`: label above value, one fact per line.
   * `grid`: stacked pairs in two columns.
   */
  layout?: KeyValueLayout;
  /** Row layout only: the label column's Tailwind width class. Default `w-28`. */
  labelWidth?: string;
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function KeyValue({
  items,
  layout = 'row',
  labelWidth = 'w-28',
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'key-value',
}: KeyValueProps) {
  if (items.length === 0) return null;
  const row = layout === 'row';
  return (
    <dl
      className={cn(
        'm-0 min-w-0',
        layout === 'grid' ? 'grid grid-cols-2 gap-x-6 gap-y-3' : row ? 'flex flex-col gap-1.5' : 'flex flex-col gap-3',
        className,
      )}
      data-layout={layout}
      data-testid={testId}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {items.map((item, i) => (
        <div
          key={`${item.label}-${i}`}
          className={cn('min-w-0', row ? 'flex items-baseline gap-3' : 'flex flex-col gap-0.5')}
          data-testid={`${testId}-item`}
        >
          <dt
            className={cn(
              'm-0 text-text-secondary',
              row ? cn('shrink-0 text-[13px]', labelWidth) : 'text-[12px]',
            )}
          >
            {item.label}
          </dt>
          <dd
            className={cn(
              'm-0 min-w-0 truncate text-[13px] text-text-primary',
              row && 'flex-1',
              item.mono && 'font-mono text-[12px]',
            )}
            {...(item.title ? { title: item.title } : {})}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default KeyValue;
