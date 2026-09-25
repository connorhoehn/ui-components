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
import { TONE_SOLID_BG } from '../shared/tones';

/**
 * A tab's attention dot. `true` is the brand dot ("something new"); a tone
 * says what kind of attention — "Activity •" when a tier is behind.
 */
export type ScopeHeaderTabDot = 'warning' | 'danger' | 'info' | true;

const DOT_CLASS: Record<'warning' | 'danger' | 'info', string> = {
  warning: TONE_SOLID_BG.warning,
  danger: TONE_SOLID_BG.danger,
  info: TONE_SOLID_BG.info,
};

const DOT_WORD: Record<'warning' | 'danger' | 'info', string> = {
  warning: 'needs attention',
  danger: 'has a problem',
  info: 'has updates',
};

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
  /** Since 2.388.0: a small dot after the label (and count). Absent or `false`-y draws none. */
  dot?: ScopeHeaderTabDot;
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
  /**
   * The scope's name, drawn as the h1. Required in practice for the default
   * variant; optional (and not drawn) for `variant="crumbs"` since 2.389.0.
   */
  title?: string;
  /**
   * `default`: the full band — crumbs, an h1 title with status and stats, the
   * right-hand group, tabs.
   *
   * `crumbs` (since 2.389.0): a crumb line ONLY, for the top of a pane whose
   * record draws its own headline (an `EditorShell titleSize="lg"` below it,
   * in `ExplorerLayout.paneHeader`). Crumbs on the left; `controls`, `link`
   * and `menu` on the right, hung a little below the crumb line so they sit
   * between the crumb and the headline that follows. No h1 — title, status,
   * stats, people and tabs are not drawn.
   *
   * The controls overhang the band by 10px (since 2.389.4; 14px before), so
   * the band must sit over a pane whose own head starts with at least that
   * much top padding (an `EditorShell` header has 12px). `ExplorerLayout.paneHeader` spans only the pane since 2.389.4, so
   * the hang can never reach the aside.
   */
  variant?: 'default' | 'crumbs';
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
  /**
   * Since 2.388.0: controls the host owns (a repository selector), drawn in
   * the right-hand group just before the link.
   */
  controls?: ReactNode;
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

export function ScopeHeader(props: ScopeHeaderProps) {
  if (props.variant === 'crumbs') return <ScopeCrumbs {...props} />;
  return <ScopeHeaderFull {...props} />;
}

/** The right-hand group both variants share: controls · link · ⋯. */
function RightGroup({
  controls, link, menu, menuLabel, title, testId,
}: Pick<ScopeHeaderProps, 'controls' | 'link' | 'menu' | 'menuLabel'> & { title: string; testId: string }) {
  const hasMenu = !!menu && menu.some((s) => s.items.length > 0);
  return (
    <>
      {controls != null && controls !== false && (
        <div className="flex shrink-0 items-center gap-2" data-testid={`${testId}-controls`}>
          {controls}
        </div>
      )}
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
    </>
  );
}

function ScopeCrumbs({
  breadcrumbs, title, controls, link, menu, menuLabel, className, 'data-testid': testId = 'scope-header',
}: ScopeHeaderProps) {
  const last = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1]!.label : undefined;
  const name = title ?? (typeof last === 'string' ? last : 'this scope');
  const hasRight = (controls != null && controls !== false) || !!link || (!!menu && menu.some((s) => s.items.length > 0));
  return (
    <div data-testid={testId} data-variant="crumbs" className={cn('flex min-w-0 items-start gap-4 px-6 pb-1 pt-2', className)}>
      <div className="flex h-5 min-w-0 flex-1 items-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />
        )}
      </div>
      {hasRight && (
        // Hung below the crumb line (mt-3) with a negative bottom margin, so it
        // sits between the crumb and the headline that follows. The overhang
        // past the band is (mb − pb) = 14 − 4 = 10px whatever the controls'
        // height — inside the 12px top padding of an EditorShell head, so it
        // never reaches the title row (2.389.4; it was 18 − 4 = 14px, which
        // bit 2px into a long title). `relative z-10` keeps it above the next
        // row's background where it overhangs.
        <div className="relative z-10 -mb-[14px] ml-auto mt-3 flex shrink-0 items-center gap-4" data-hang="10" data-testid={`${testId}-right`}>
          <RightGroup controls={controls} link={link} menu={menu} menuLabel={menuLabel} title={name} testId={testId} />
        </div>
      )}
    </div>
  );
}

function ScopeHeaderFull({
  breadcrumbs,
  title = '',
  status,
  progress,
  spentUsd,
  stats,
  people,
  link,
  controls,
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
            <StatusPill label={status.label} state={status.tone ?? 'info'} variant="label" className="shrink-0" data-testid={`${testId}-status`} />
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
          <RightGroup controls={controls} link={link} menu={menu} menuLabel={menuLabel} title={title} testId={testId} />
        </div>
      </div>
      {hasTabs && (
        <Tabs
          items={tabs!.map((t) => ({
            id: t.id,
            label: t.label,
            ...(t.disabled ? { disabled: true } : {}),
            ...(typeof t.count === 'number' || t.dot
              ? {
                  badge: (
                    <span className="inline-flex items-center gap-1.5">
                      {typeof t.count === 'number' && <span aria-label={`${t.count} in ${t.label}`}>{t.count}</span>}
                      {t.dot && (
                        <span
                          role="img"
                          aria-label={`${t.label} ${t.dot === true ? 'has updates' : DOT_WORD[t.dot]}`}
                          data-testid={`${testId}-tab-${t.id}-dot`}
                          data-dot={t.dot === true ? 'brand' : t.dot}
                          className={cn('inline-block h-2 w-2 shrink-0 rounded-full', t.dot === true ? 'bg-primary' : DOT_CLASS[t.dot])}
                        />
                      )}
                    </span>
                  ),
                }
              : {}),
            testId: `${testId}-tab-${t.id}`,
          }))}
          value={currentTab!}
          onValueChange={(id) => onTabChange?.(id)}
          variant="underline"
          size="md"
          badgeStyle="plain"
          aria-label={`${title} views`}
          className="-mb-px mt-1 border-b-0"
        />
      )}
    </div>
  );
}

export default ScopeHeader;
