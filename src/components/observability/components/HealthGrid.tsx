// HealthGrid — node-health dashboard primitive.
//
// Wraps a list of <HealthCell> entries in a <Card> with an optional header.
// Cells animate status transitions automatically (HealthCell owns the
// transition); HealthGrid only owns column count + gap + responsive collapse.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../../lib/cn';
import { Card } from '../../ui/Card';
import CardHeader from '../../shared/CardHeader';
import HealthCell, { type HealthStatus } from './HealthCell';

export interface HealthGridEntry {
  id: string;
  label: ReactNode;
  status: HealthStatus;
  reason?: ReactNode;
}

export type HealthGridColumns = 1 | 2 | 3 | 4 | 6;

export interface HealthGridProps {
  items: HealthGridEntry[];
  /** Columns at >=640px. Default 3. Collapses to 1 below. */
  columns?: HealthGridColumns;
  /** Tighter padding/gap on cells + grid. Default false. */
  dense?: boolean;
  /** Optional header title — when present, wraps the grid in a Card with header. */
  title?: string;
  /** Right-aligned header meta slot (count chip, refresh button). */
  headerSlot?: ReactNode;
  /** Empty-state node when items.length === 0. */
  empty?: ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const COLUMN_CLASS: Record<HealthGridColumns, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  6: 'sm:grid-cols-6',
};

const DEFAULT_EMPTY = (
  <div className="text-center text-[12px] text-[var(--color-text-tertiary)] py-8">
    No nodes reporting.
  </div>
);

export function HealthGrid({
  items,
  columns = 3,
  dense = false,
  title,
  headerSlot,
  empty,
  className,
  style,
  'data-testid': testId = 'health-grid',
}: HealthGridProps) {
  const body =
    items.length === 0 ? (
      empty ?? DEFAULT_EMPTY
    ) : (
      <div
        role="list"
        className={cn(
          'grid grid-cols-1',
          COLUMN_CLASS[columns],
          dense ? 'gap-1.5' : 'gap-2',
        )}
      >
        {items.map((node) => (
          <div role="listitem" key={node.id}>
            <HealthCell
              status={node.status}
              label={node.label}
              reason={node.reason}
              dense={dense}
            />
          </div>
        ))}
      </div>
    );

  if (title) {
    return (
      <Card
        data-testid={testId}
        className={cn('flex flex-col', className)}
        style={style}
      >
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <CardHeader title={title} meta={headerSlot} />
        </div>
        <div className={cn(dense ? 'p-2' : 'p-3')}>{body}</div>
      </Card>
    );
  }

  return (
    <div
      data-testid={testId}
      className={cn(dense ? 'p-2' : 'p-3', className)}
      style={style}
    >
      {body}
    </div>
  );
}

export type { HealthStatus };
export { HealthCell };
export default HealthGrid;
