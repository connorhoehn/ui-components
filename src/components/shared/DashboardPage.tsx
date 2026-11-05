// DashboardPage — a stat row, then a grid of titled panels, on one screen.
//
// Designed for 1280×800 without a page scroll: the header and stat row are
// `shrink-0`, the panel grid takes the rest and splits it into equal rows
// (two rows of panels fit at that size), and each panel's body scrolls
// inside its frame. Below `lg` the grid stacks and scrolls as a whole.
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { StatStrip, type StatStripItem } from './StatStrip';
import { TitledFrame } from './TitledFrame';
import { PAGE_GUTTER_B, PAGE_GUTTER_X, TemplateHeader, type PageGutter, type PageTemplateHeaderProps } from './pageTemplate';

/** One panel of the grid. */
export interface DashboardPanel {
  id: string;
  /** The frame's title, in its top border. */
  title: string;
  /** A control in the title row (a range menu, "View all"). */
  action?: ReactNode;
  /** Columns this panel spans at `lg`. Default 1. */
  span?: 1 | 2 | 3;
  /** The panel body. It scrolls inside the frame. */
  content: ReactNode;
}

export type DashboardColumns = 2 | 3 | 4;

export interface DashboardPageProps extends PageTemplateHeaderProps {
  /** The stat row as data — drawn as a `StatStrip`. */
  stats?: StatStripItem[];
  /** The stat row as a node (a `KPIGrid` of `StatCard`s). Wins over `stats`. */
  kpis?: ReactNode;
  /** The panel grid. */
  panels?: DashboardPanel[];
  /** Columns at `lg` (≥1024px). Default 3; `md` is always 2, below it 1. */
  columns?: DashboardColumns;
  /** Instead of `panels`: any grid children (`TitledFrame`s). */
  children?: ReactNode;
  /** Default `page` — `--ui-page-gutter` around header, stats and grid. */
  gutter?: PageGutter;
  className?: string;
  'data-testid'?: string;
}

const LG_COLUMNS: Record<DashboardColumns, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

const LG_SPAN: Record<1 | 2 | 3, string> = {
  1: '',
  2: 'md:col-span-2',
  3: 'md:col-span-2 lg:col-span-3',
};

/**
 * Use this when a page is an at-a-glance overview: a `StatStrip`/`KPIGrid` row on top, then a responsive grid of `TitledFrame` panels that fits 1280×800 without page scroll.
 *
 * Fills its parent (`h-full min-h-0`); each panel body scrolls inside its frame.
 *
 * @example
 * <DashboardPage title="Observability" breadcrumbs={trail}
 *   stats={[{ label: 'Invocations', value: '12.4k' }, { label: 'Error rate', value: '0.8%', tone: 'danger' }]}
 *   panels={[
 *     { id: 'latency', title: 'Latency p95', span: 2, content: <Chart … /> },
 *     { id: 'errors', title: 'Recent errors', content: <EventList … /> },
 *   ]} />
 */
export function DashboardPage({
  title, description, breadcrumbs, actions, badge, back, density,
  stats, kpis, panels, columns = 3, children, gutter = 'page', className, 'data-testid': testId,
}: DashboardPageProps) {
  const gx = gutter === 'page' && PAGE_GUTTER_X;
  const statRow = kpis ?? (stats && stats.length > 0 ? <StatStrip items={stats} size="sm" aria-label={`${title} summary`} /> : null);
  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-col gap-[var(--ui-section-gap,0.75rem)]', className)} data-page-template="dashboard" data-testid={testId}>
      <TemplateHeader {...{ title, description, breadcrumbs, actions, badge, back, density, gutter }} />
      {statRow != null && <div className={cn('shrink-0 min-w-0', gx)} data-dashboard-stats="">{statRow}</div>}
      <div
        className={cn(
          'grid min-h-0 min-w-0 flex-1 grid-cols-1 gap-4 overflow-auto pt-2 md:grid-cols-2',
          'auto-rows-[minmax(12rem,1fr)]',
          LG_COLUMNS[columns],
          gx, gutter === 'page' && PAGE_GUTTER_B,
        )}
        data-dashboard-grid=""
      >
        {panels
          ? panels.map((panel) => (
            <TitledFrame
              key={panel.id}
              title={panel.title}
              tone="surface"
              {...(panel.action != null ? { titleAction: panel.action } : {})}
              className={cn('min-w-0', LG_SPAN[panel.span ?? 1])}
              bodyClassName="overflow-auto p-3"
              data-testid={`dashboard-panel-${panel.id}`}
            >
              {panel.content}
            </TitledFrame>
          ))
          : children}
      </div>
    </div>
  );
}

export default DashboardPage;
