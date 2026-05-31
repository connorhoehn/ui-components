// CatalogGrid — thin grid wrapper for <ThumbnailCard>-based catalog pages.
//
// Standardises the responsive 1/2/3/4-column tile layout used by component
// galleries, demo catalogs, app launchers, and integration grids. Always
// collapses to a single column below 640px; bumps to the configured count at
// the `sm` breakpoint.

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type CatalogGridColumns = 1 | 2 | 3 | 4 | 5;

export interface CatalogGridProps {
  /** Children — expected to be <ThumbnailCard> instances (any node accepted). */
  children: ReactNode;
  /** Target column count at >=640px. Default 3. Always collapses to 1 below. */
  columns?: CatalogGridColumns;
  /** Tighter gap (12px vs 20px). Default false. */
  dense?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const COLUMN_CLASS: Record<CatalogGridColumns, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
};

export function CatalogGrid({
  children,
  columns = 3,
  dense = false,
  className,
  style,
  'data-testid': testId = 'catalog-grid',
}: CatalogGridProps) {
  return (
    <div
      data-testid={testId}
      data-columns={columns}
      className={cn(
        'grid grid-cols-1',
        COLUMN_CLASS[columns],
        dense ? 'gap-3' : 'gap-5',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export default CatalogGrid;
