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
  /**
   * `lanes` (since 2.443.1): a board's columns — `columns` lanes in ONE row
   * that never wrap; below the width they need (13rem each) the row scrolls
   * sideways inside itself instead of stacking lanes into a second row, where
   * "In review" would sit under "Open". Children stretch to the row height,
   * so `BoardColumn` lanes run the full board height. Emits `data-ui-board`
   * for the DOM audit. Default `tiles`.
   */
  variant?: 'tiles' | 'lanes';
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

const LANE_CLASS: Record<CatalogGridColumns, string> = {
  1: 'grid-cols-[minmax(13rem,1fr)]',
  2: 'grid-cols-[repeat(2,minmax(13rem,1fr))]',
  3: 'grid-cols-[repeat(3,minmax(13rem,1fr))]',
  4: 'grid-cols-[repeat(4,minmax(13rem,1fr))]',
  5: 'grid-cols-[repeat(5,minmax(13rem,1fr))]',
};

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
  variant = 'tiles',
  className,
  style,
  'data-testid': testId = 'catalog-grid',
}: CatalogGridProps) {
  return (
    <div
      data-testid={testId}
      data-columns={columns}
      {...(variant === 'lanes' ? { 'data-ui-board': '' } : {})}
      className={cn(
        variant === 'lanes'
          ? cn('grid items-stretch overflow-x-auto', LANE_CLASS[columns])
          : cn('grid grid-cols-1', COLUMN_CLASS[columns]),
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
