// ScopeHeader — the band over a work surface's columns that says what they are
// all looking at: where it sits (a crumb trail), what it is (title + status),
// how it is going (a line of stats), who owns it (labelled avatar groups), and
// which view of it you are on (tabs with counts).
//
// It goes in `ExplorerLayout.header`, so it spans the Work list, the detail
// pane and the aside together — the Documents redesign's
// "Plan › Initiatives › Observability / Observability Platform  In progress /
// 18 / 52 points delivered · $1.46 spent / OWNER (ND)(LH) / Work · Decisions 2".
//
// ## Nothing on it is a placeholder
//
// Every stat is optional and a missing one is simply not drawn — no "—", no
// "$0.00" standing in for "we do not know". Progress needs a real total above
// zero; spend needs a real number. Money is typed (`spentUsd: number`) so a
// host cannot pass a pre-formatted string it made up. A people group with no
// people is dropped rather than drawn as an empty label.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from '../shared/Breadcrumbs';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { MetaLine } from '../shared/MetaLine';
import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';
import { Tabs } from '../shared/Tabs';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { LinkIcon } from '../ui/Icons';

export interface ScopeHeaderPeopleGroup {
  /** "Owner". Rendered small and uppercase before the avatars. */
  label: string;
  people: PresenceUser[];
}

export interface ScopeHeaderTab {
  id: string;
  label: string;
  /** Shown muted after the label. Absent or `undefined` shows none; `0` shows "0". */
  count?: number;
  disabled?: boolean;
}

export interface ScopeHeaderProgress {
  done: number;
  total: number;
  /** The noun after the numbers. Default "points". */
  unit?: string;
  /** The verb. Default "delivered". */
  verb?: string;
}

export interface ScopeHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  /** The scope's own status — "In progress". */
  status?: { label: string; tone?: StatusPillTone } | null;
  /** "18 / 52 points delivered". Not drawn when `total` is not above zero. */
  progress?: ScopeHeaderProgress | null;
  /** "$1.46 spent". Not drawn when absent or not a finite number. */
  spentUsd?: number | null;
  /** Further stats, already worded by the host. Falsy entries are skipped. */
  stats?: Array<ReactNode | null | undefined | false>;
  /** Labelled avatar groups — `[{ label: 'Owner', people }]`. Empty groups are dropped. */
  people?: ScopeHeaderPeopleGroup[];
  /** One link after the people ("the repository"). */
  link?: { label: string; href: string; icon?: ReactNode } | null;
  /** The ⋯ menu. Omitted or empty — no button. */
  menu?: DropdownMenuSection[] | null;
  menuLabel?: string;
  tabs?: ScopeHeaderTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  className?: string;
  'data-testid'?: string;
}

/** "$1.46", "<$0.01", "$1,204". Exported for tests and hosts that echo it. */
export function formatSpend(usd: number): string {
  if (usd > 0 && usd < 0.01) return '<$0.01';
  const digits = usd >= 1000 ? 0 : 2;
  return `$${usd.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function ScopeHeader({
  breadcrumbs,
  title,
  status,
  progress,
  spentUsd,
  stats,
  people,
  link,
  menu,
  menuLabel,
  tabs,
  activeTab,
  onTabChange,
  className,
  'data-testid': testId = 'scope-header',
}: ScopeHeaderProps) {
  const statItems: ReactNode[] = [];
  if (progress && progress.total > 0 && Number.isFinite(progress.done)) {
    statItems.push(
      <span key="progress" data-testid={`${testId}-progress`}>
        {progress.done} / {progress.total} {progress.unit ?? 'points'} {progress.verb ?? 'delivered'}
      </span>,
    );
  }
  if (typeof spentUsd === 'number' && Number.isFinite(spentUsd)) {
    statItems.push(
      <span key="spent" data-testid={`${testId}-spent`}>
        {formatSpend(spentUsd)} spent
      </span>,
    );
  }
  (stats ?? []).forEach((s, i) => {
    if (s) statItems.push(<span key={`stat-${i}`}>{s}</span>);
  });

  const groups = (people ?? []).filter((g) => g.people.length > 0);
  const hasMenu = !!menu && menu.some((s) => s.items.length > 0);
  const hasTabs = !!tabs && tabs.length > 0;
  const currentTab = hasTabs ? (tabs!.some((t) => t.id === activeTab) ? activeTab! : tabs![0]!.id) : undefined;

  return (
    <div data-testid={testId} className={cn('flex min-w-0 flex-col gap-1.5 px-6 pt-3', !hasTabs && 'pb-3', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />
      )}
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="m-0 min-w-0 truncate text-[22px] font-semibold leading-8 text-text-primary" title={title} data-testid={`${testId}-title`}>
            {title}
          </h1>
          {status && (
            <StatusPill label={status.label} state={status.tone ?? 'info'} className="shrink-0" data-testid={`${testId}-status`} />
          )}
        </div>
        {statItems.length > 0 && (
          <MetaLine items={statItems} size="sm" tone="secondary" className="min-w-0 text-[13px]" data-testid={`${testId}-stats`} />
        )}
        <div className="ml-auto flex shrink-0 items-center gap-5">
          {groups.map((g) => (
            <div key={g.label} className="flex items-center gap-2" data-testid={`${testId}-people-${g.label.toLowerCase()}`}>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{g.label}</span>
              <PresenceAvatars users={g.people} size={26} maxVisible={4} />
            </div>
          ))}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-testid={`${testId}-link`}
              className="flex min-w-0 items-center gap-1.5 border-l border-border pl-4 text-[13px] font-medium text-primary no-underline hover:underline"
            >
              {link.icon ?? <LinkIcon size={14} />}
              <span className="max-w-[16rem] truncate">{link.label}</span>
            </a>
          )}
          {hasMenu && (
            <DropdownMenu
              trigger={<span aria-hidden="true" className="text-base leading-none">⋯</span>}
              triggerLabel={menuLabel ?? `Actions for ${title}`}
              triggerTestId={`${testId}-menu`}
              align="end"
              sections={menu!}
              triggerClassName="h-8 w-8 border-transparent px-0 py-0 text-text-secondary hover:border-border"
            />
          )}
        </div>
      </div>
      {hasTabs && (
        <Tabs
          items={tabs!.map((t) => ({
            id: t.id,
            label: t.label,
            ...(t.disabled ? { disabled: true } : {}),
            ...(typeof t.count === 'number'
              ? { badge: <span className="text-[13px] font-medium tabular-nums text-text-tertiary" aria-label={`${t.count} in ${t.label}`}>{t.count}</span> }
              : {}),
            testId: `${testId}-tab-${t.id}`,
          }))}
          value={currentTab!}
          onValueChange={(id) => onTabChange?.(id)}
          variant="underline"
          size="md"
          aria-label={`${title} views`}
          className="-mb-px mt-1 border-b-0"
        />
      )}
    </div>
  );
}

export default ScopeHeader;
