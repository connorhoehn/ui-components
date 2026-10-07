// PageHeader — page-level title + description + actions header.
//
// Replaces the ad-hoc `<h1>Title</h1><p>Description</p><button>Action</button>`
// pattern repeated across every portal page. Supports an optional back link
// rendered above the title and an optional badge to the right of it.

import React from 'react';
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { Tabs } from './Tabs';
import { useDensity, type Density } from './Density';
import {
  HeaderCollapseToggle, HeaderDescriptionInfo, HeaderPeople, HeaderTrailFold, visibleHeaderPeople,
  type HeaderPeopleGroup,
} from './headerDensity';

export interface PageHeaderBack {
  label: string;
  to: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/** A view tab under the header (since 2.437.0). */
export interface PageHeaderTab {
  id: string;
  label: string;
  /** Drawn after the label ("Work 11"). */
  count?: number;
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Right-aligned action area (buttons, menus). */
  actions?: React.ReactNode;
  /** Optional back link rendered above the title. */
  back?: PageHeaderBack;
  /** Badge or status pill rendered to the right of the title. */
  badge?: React.ReactNode;
  /**
   * Title size. `md` (default) is the 20px heading every page has had;
   * `lg` is a 28px directory title — a page that IS the list, not a page
   * about one thing. Comfortable density only.
   */
  size?: 'md' | 'lg';
  /**
   * Since 2.437.0 — the trail as the header's first row ("Plan › Initiatives
   * › Observability Platform"). Owned here so a collapsed header can fold the
   * title into it. With a trail the header draws its own top padding (12px
   * comfortable, 8px compact/collapsed); the host keeps the side gutter.
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * Since 2.437.0 — the library `Density` (default: the nearest
   * `DensityProvider`, else comfortable). Comfortable: trail, the title row,
   * the description, the people row, the tabs. Compact: trail, ONE 28px row
   * — the title at 14/600, `badge`, `info`, the people as a 24px avatar
   * cluster (names in tooltips), the collapse chevron, `actions` — and the
   * tabs; the description moves into `info` or, without one, the built-in
   * info `HoverCard`. Usually `useHeaderDensity().headerProps`.
   */
  density?: Density;
  /**
   * Since 2.437.0 — a STATE, not a density: the trail row only, the title
   * folded into its last crumb with `badge` and the expand chevron, `actions`
   * on the right, then the tabs. No trail given: the title alone is the row.
   */
  collapsed?: boolean;
  /** Draws the chevron: "Collapse header" on the title row, "Expand header" when collapsed. Since 2.437.0. */
  onToggleCollapsed?: () => void;
  /**
   * Labelled people — `[{ label: 'Owner', people, action }]`. Comfortable:
   * their own row under the description (32px avatar + name). Compact: the
   * avatar cluster on the title row. Since 2.437.0.
   */
  people?: HeaderPeopleGroup[];
  /**
   * The title's info trigger (a details `HoverCard`), after the badge. A host
   * `info` is trusted to show the description, so in compact density the
   * built-in description card is not drawn. Since 2.437.0.
   */
  info?: React.ReactNode;
  /**
   * The header's summary under the people (a stat strip, a certification
   * line). Comfortable only: compact moves it into the built-in description
   * card with the description; collapsed drops it. Since 2.437.0.
   */
  meta?: React.ReactNode;
  /** View tabs under the header, in every density and state. Since 2.437.0. */
  tabs?: PageHeaderTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  className?: string;
  'data-testid'?: string;
}

function PageHeader({
  title,
  description,
  actions,
  back,
  badge,
  size = 'md',
  breadcrumbs,
  density: densityProp,
  collapsed = false,
  onToggleCollapsed,
  people,
  info,
  meta,
  tabs,
  activeTab,
  onTabChange,
  className,
  'data-testid': testId = 'page-header',
}: PageHeaderProps) {
  const density = useDensity(densityProp);
  const groups = visibleHeaderPeople(people);
  const hasTrail = !!breadcrumbs && breadcrumbs.length > 0;
  const hasTabs = !!tabs && tabs.length > 0;
  const tabStrip = hasTabs ? (
    <Tabs
      items={tabs!.map((tab) => ({
        id: tab.id, label: tab.label, ...(tab.count != null ? { badge: tab.count } : {}), ...(tab.disabled ? { disabled: true } : {}),
        testId: `${testId}-tab-${tab.id}`,
      }))}
      value={activeTab && tabs!.some((t) => t.id === activeTab) ? activeTab : tabs![0]!.id}
      onValueChange={(id) => onTabChange?.(id)}
      variant="underline" size="md" badgeStyle="plain" indicator="bar" indicatorWeight={3}
      aria-label={`${title} views`}
      className={cn('gap-0', collapsed || density === 'compact' ? 'mt-1' : 'mt-3')}
      data-testid={`${testId}-tabs`}
    />
  ) : null;
  const trail = hasTrail ? <Breadcrumbs items={breadcrumbs!} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} /> : null;
  const chevron = onToggleCollapsed
    ? <HeaderCollapseToggle collapsed={collapsed} onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} />
    : null;

  if (collapsed) {
    return (
      <div className={cn('flex min-w-0 flex-col', hasTrail && 'pt-2', className)} data-testid={testId} data-density={density} data-collapsed="true">
        <HeaderTrailFold breadcrumbs={breadcrumbs} title={title} badge={badge} actions={actions} data-testid={`${testId}-fold`}
          {...(onToggleCollapsed ? { onExpand: onToggleCollapsed } : {})} />
        {tabStrip}
      </div>
    );
  }

  if (density === 'compact') {
    return (
      <div className={cn('flex min-w-0 flex-col gap-1', hasTrail && 'pt-2', className)} data-testid={testId} data-density="compact" data-collapsed="false">
        {trail}
        <div className="flex h-7 min-w-0 items-center gap-3" data-testid={`${testId}-row`}>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h1 className="m-0 min-w-0 truncate text-sm font-semibold leading-5 text-[var(--color-text-primary)]" title={title}>
              {title}
            </h1>
            {badge}
            {info ?? (description || meta ? <HeaderDescriptionInfo title={title} description={<>{description}{meta && <div className="mt-2 whitespace-normal">{meta}</div>}</>} data-testid={`${testId}-description`} /> : null)}
            {groups.length > 0 && <HeaderPeople groups={groups} density="compact" data-testid={`${testId}-people`} />}
            {chevron}
          </div>
          {actions && <div className="flex flex-shrink-0 items-center gap-2">{actions}</div>}
        </div>
        {tabStrip}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1.5', hasTrail && 'pt-3', className)} data-testid={testId} data-density="comfortable" data-collapsed="false">
      {trail && <div className="mb-2.5">{trail}</div>}
      {back && (
        <a
          href={back.to}
          onClick={back.onClick}
          className="inline-flex items-center gap-1 text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] mb-1 w-fit"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7 2L3 6l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {back.label}
        </a>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="min-w-0 flex items-center gap-2.5">
          <h1
            className={cn(
              'font-semibold text-[var(--color-text-primary)] leading-tight',
              size === 'lg' ? 'text-[28px] font-bold tracking-[-0.01em]' : 'text-xl',
            )}
          >
            {title}
          </h1>
          {badge}
          {info}
          {chevron}
        </div>
        {actions && (
          <div className="flex-shrink-0 flex items-center gap-2">{actions}</div>
        )}
      </div>
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>
      )}
      {groups.length > 0 && <div className="mt-1"><HeaderPeople groups={groups} density="comfortable" data-testid={`${testId}-people`} /></div>}
      {meta && <div className="mt-2 min-w-0" data-testid={`${testId}-meta`}>{meta}</div>}
      {tabStrip}
    </div>
  );
}

export { PageHeader };
export default PageHeader;
