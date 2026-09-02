// StatStrip — a row of small stats in one card: the compact density variant
// of a KPIGrid of StatCards, for pages where the numbers are context rather
// than the content. Four StatCards spend ~110px of height on four numbers;
// this says the same in ~52px.
//
// Router-agnostic like the rest of the library: a cluster becomes clickable
// via `onSelect` (the host wires its router's navigate) or a plain `href`.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface StatStripItem {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'default' | 'accent' | 'danger';
  onSelect?: () => void;
  href?: string;
}

export interface StatStripProps {
  items: StatStripItem[];
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

const VALUE_TONE: Record<NonNullable<StatStripItem['tone']>, string> = {
  default: 'text-text-primary',
  accent: 'text-primary',
  danger: 'text-danger',
};

function Cluster({ item }: { item: StatStripItem }) {
  return (
    <div className="min-w-0 px-4 py-2.5">
      <div className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary">
        {item.label}
      </div>
      <div className="mt-0.5 flex min-w-0 items-baseline gap-2">
        <span className={cn('text-[17px] font-bold leading-none tabular-nums', VALUE_TONE[item.tone ?? 'default'])}>
          {item.value}
        </span>
        {item.hint != null && (
          <span className="min-w-0 truncate text-[11px] text-text-tertiary">{item.hint}</span>
        )}
      </div>
    </div>
  );
}

export function StatStrip({ items, className, 'aria-label': ariaLabel, 'data-testid': testId }: StatStripProps) {
  return (
    <div
      role="group"
      className={cn('flex divide-x divide-border overflow-x-auto rounded-lg border border-border bg-surface', className)}
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
      {...(testId ? { 'data-testid': testId } : {})}
    >
      {items.map((item) => {
        if (item.href) {
          return (
            <a key={item.label} href={item.href} className="min-w-0 flex-1 no-underline transition-colors hover:bg-surface-hover">
              <Cluster item={item} />
            </a>
          );
        }
        if (item.onSelect) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.onSelect}
              className="min-w-0 flex-1 cursor-pointer border-none bg-transparent p-0 text-left transition-colors hover:bg-surface-hover"
            >
              <Cluster item={item} />
            </button>
          );
        }
        return (
          <div key={item.label} className="min-w-0 flex-1">
            <Cluster item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default StatStrip;
