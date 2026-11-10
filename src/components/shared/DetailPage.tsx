// DetailPage — one record: a header that names it, tabs for its sections, an
// optional context column on the right.
//
// The shape detail pages kept rebuilding as eight Cards stacked down one long
// scroll (summary, inputs, outputs, trace, logs, cost…). Tabs keep each
// section one click away at full height instead: the header and the tab row
// stay put, the active tab's body scrolls on its own.
import { useId, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { DetailHeader } from './DetailHeader';
import { TabPanel, Tabs } from './Tabs';
import { PAGE_GUTTER_B, PAGE_GUTTER_X, type PageGutter } from './pageTemplate';

/** One section of the record, drawn as a tab. */
export interface DetailPageTab {
  id: string;
  label: ReactNode;
  /** A count or chip after the label. */
  badge?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** `data-testid` on this tab's trigger (since 2.515.10). */
  testId?: string;
  /** The same as `testId`, in attribute form (since 2.515.10); `testId` wins when both are given. */
  'data-testid'?: string;
  /** The section body. Only the active tab's body is mounted. */
  content: ReactNode;
}

export interface DetailPageProps {
  /** What the record is. */
  title: ReactNode;
  /** Beside the title — a status pill. */
  badge?: ReactNode;
  /** One line of prose under the title. */
  description?: ReactNode;
  /** The metadata line (a `MetaLine`). */
  meta?: ReactNode;
  /** Right of the header: buttons, a menu. */
  actions?: ReactNode;
  /** The trail above the header. */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * The title's heading level (since 2.504.0). Default `h1`: a routed record
   * page's title is the page heading. `h2`/`h3` when the record sits under a
   * host that already draws the page's `h1`. The visual size is unchanged.
   */
  titleAs?: 'h1' | 'h2' | 'h3';
  /** The record's sections. With none, `children` is the one body. */
  tabs?: DetailPageTab[];
  /**
   * The tab list's accessible name (since 2.515.7). Default `Sections`; name
   * it for the record ("Episode sections") when a page holds more than one
   * tab list, so a screen reader can tell them apart.
   */
  tabsLabel?: string;
  /**
   * The tab row in a column too narrow for it (since 2.515.10). `scroll`
   * (default, unchanged): one row that scrolls sideways, the current tab
   * kept in view. `menu`: under 360px of the row's width the first and the
   * current tab stay and the rest fold into `More ▾`.
   */
  tabsOverflow?: 'scroll' | 'menu';
  /**
   * The tab row's size (since 2.515.12). `md` (default): 14px labels, as
   * `Tabs` and `PaneHeader` draw. `sm`: 12px, the size every DetailPage tab
   * row had before 2.515.12.
   */
  tabsSize?: 'sm' | 'md';
  /** Controlled active tab. Uncontrolled (first enabled tab) when omitted. */
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** The body when there are no tabs. */
  children?: ReactNode;
  /** Right context column (a `ContextColumn`), full height beside header and body. */
  aside?: ReactNode;
  /** Default `page` — header, tabs and bodies at `--ui-page-gutter`. */
  gutter?: PageGutter;
  className?: string;
  'data-testid'?: string;
  /** Set by `PageFromSpec`: the spec template this page was built from. */
  'data-page-spec'?: string;
}

/**
 * Use this when a page shows one record: `DetailHeader` (title, badge, meta, actions, trail), `Tabs` for its sections instead of a stack of Cards, and an optional `ContextColumn` on the right.
 *
 * Fills its parent (`h-full min-h-0`); each tab body scrolls internally.
 *
 * @example
 * <DetailPage title={run.name} badge={<StatusPill status={run.status} />} breadcrumbs={trail}
 *   meta={<MetaLine items={[run.agent, run.startedAt]} />} actions={<Button>Re-run</Button>}
 *   tabs={[
 *     { id: 'summary', label: 'Summary', content: <RunSummary run={run} /> },
 *     { id: 'trace', label: 'Trace', badge: run.spans.length, content: <TraceView spans={run.spans} /> },
 *   ]}
 *   aside={<ContextColumn … />} />
 */
export function DetailPage({
  title, badge, description, meta, actions, breadcrumbs, titleAs = 'h1', tabs, tabsLabel = 'Sections', tabsOverflow = 'scroll', tabsSize = 'md', activeTab, onTabChange, children, aside,
  gutter = 'page', className, 'data-testid': testId, 'data-page-spec': spec,
}: DetailPageProps) {
  const idPrefix = useId();
  const firstEnabled = tabs?.find((t) => !t.disabled)?.id ?? tabs?.[0]?.id ?? '';
  const [internal, setInternal] = useState(firstEnabled);
  const requested = activeTab ?? internal;
  const current = tabs?.some((t) => t.id === requested) ? requested : firstEnabled;
  const select = (id: string) => {
    if (activeTab == null) setInternal(id);
    onTabChange?.(id);
  };
  const gx = gutter === 'page' && PAGE_GUTTER_X;
  const bodyClass = cn('min-h-0 min-w-0 flex-1 overflow-auto pt-3', gx, gutter === 'page' && PAGE_GUTTER_B);
  const hasTabs = !!tabs && tabs.length > 0;
  const trail = !!breadcrumbs && breadcrumbs.length > 0;

  return (
    <div className={cn('flex h-full min-h-0 min-w-0 flex-row', className)} data-page-template="detail" data-page-spec={spec} data-testid={testId}>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col" data-page-column="">
        {/* The top inset is the page gutter's: with gutter="none" the host's
            frame owns it, so none is drawn (since 2.515.12). */}
        <div className={cn('flex shrink-0 min-w-0 flex-col gap-2', gx, gutter === 'page' && (trail ? 'pt-2' : 'pt-3'))} data-detail-page-header="" data-page-trail="">
          {trail && <Breadcrumbs items={breadcrumbs!} separator="›" maxItems={5} className="min-w-0" />}
          {/* Wraps like PageHeader's compact row (since 2.515.7): when the
              header's 8rem basis and the actions do not fit, the actions take
              their own row under it instead of squeezing the title away. */}
          <div className="flex min-w-0 flex-wrap items-start gap-x-3 gap-y-2" data-detail-page-row="">
            <DetailHeader title={title} as={titleAs} titleSize="page" className="min-w-0 flex-1 basis-32"
              {...(badge != null ? { badge } : {})} {...(description != null ? { description } : {})} {...(meta != null ? { meta } : {})} />
            {actions != null && <div className="flex max-w-full shrink-0 flex-wrap items-center gap-2" data-detail-page-actions="">{actions}</div>}
          </div>
        </div>
        {hasTabs ? (
          <>
            <div className={cn('shrink-0 min-w-0 border-b border-border', gx)} data-detail-page-tabs={tabsSize}>
              <Tabs
                items={tabs!.map(({ id, label, badge: b, icon, disabled, testId: tid, 'data-testid': dtid }) => ({
                  id, label, ...(b != null ? { badge: b } : {}), ...(icon != null ? { icon } : {}), ...(disabled ? { disabled } : {}),
                  ...((tid ?? dtid) ? { testId: tid ?? dtid } : {}),
                }))}
                value={current}
                onValueChange={select}
                idPrefix={idPrefix}
                variant="underline"
                size={tabsSize}
                badgeStyle="plain"
                aria-label={tabsLabel}
                {...(tabsOverflow === 'menu' ? { overflowBelow: 360 } : {})}
              />
            </div>
            {tabs!.map((tab) => (
              <TabPanel key={tab.id} id={tab.id} when={current} idPrefix={idPrefix} className={bodyClass}>
                {tab.content}
              </TabPanel>
            ))}
          </>
        ) : (
          <div className={bodyClass} data-detail-page-body="">{children}</div>
        )}
      </div>
      {aside != null && <div className="flex h-full min-h-0 shrink-0" data-detail-page-aside="">{aside}</div>}
    </div>
  );
}

export default DetailPage;
