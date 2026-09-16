// KPIGrid — thin grid wrapper for <StatCard>-based KPI dashboards.
//
// Standardises the 1/2/3/4-column tile layout that several admin / dashboard
// surfaces (ingest, observability, agent ops) hand-roll today. Always
// collapses to a single column below 640px.
//
// Consumers should pass <StatCard> children. The grid does not opine on
// card content; it only owns column count + gap + responsive collapse.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type KPIGridColumns = 1 | 2 | 3 | 4;

export interface KPIGridProps {
  /** Children — expected to be <StatCard> instances. */
  children: ReactNode;
  /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
  columns?: KPIGridColumns;
  /**
   * Column count for the 768–1023px (`md`) band. Undefined (the default)
   * emits no `md:` class, so that band keeps showing `columns` — today's
   * behaviour, where the whole 640–1279px range renders identically. Set
   * this lower than `columns` for a grid that lives inside a nested rail
   * (a laptop-width `md` view there is far narrower than a full-width page
   * at the same viewport size) so tiles stay readable instead of cramming
   * `columns` of them into the rail's actual width.
   */
  mdColumns?: KPIGridColumns;
  /** Tighter gap (8px vs 16px). Default false. */
  dense?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const COLUMN_CLASS: Record<KPIGridColumns, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
};

const MD_COLUMN_CLASS: Record<KPIGridColumns, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

export function KPIGrid({
  children,
  columns = 4,
  mdColumns,
  dense = false,
  className,
  style,
  'data-testid': testId = 'kpi-grid',
}: KPIGridProps) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'grid grid-cols-1',
        COLUMN_CLASS[columns],
        mdColumns && MD_COLUMN_CLASS[mdColumns],
        dense ? 'gap-2' : 'gap-4',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default KPIGrid;
