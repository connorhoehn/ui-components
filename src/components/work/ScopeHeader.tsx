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
import { Avatar } from '../shared/Avatar';
import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';
import { Tabs } from '../shared/Tabs';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { ExternalLinkIcon, LinkIcon } from '../ui/Icons';
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
  /**
   * The h1's size. `md` (default) is the 22px band title; `lg` is the 28px
   * bold page title of a header that IS the page's heading (the Initiatives
   * overview). Since 2.390.0.
   */
  titleSize?: 'md' | 'lg';
  /**
   * A sentence under the title row — the scope's summary ("Collect
   * telemetry, reduce alert noise, and control retention costs."). Absent,
   * nothing is drawn. Since 2.390.0.
   */
  description?: ReactNode;
  /**
   * How `people` reads. `avatars` (default): labelled avatar groups in the
   * right-hand group. `names`: one line under the description, names then
   * the label — "Nora DaSilva · Owner   Layla Hassan, Eli Garcia · SMEs".
   * Since 2.390.0.
   *
   * `inline` (since 2.392.0): its own row under the description — the muted
   * label, then a 32px avatar and the name for each person, groups ruled
   * apart — "Owner (ND) Nora DaSilva │ SMEs (LH) Layla Hassan (EG) Eli
   * Garcia". A person's `avatarUrl` is used when present, else initials.
   */
  peopleStyle?: 'avatars' | 'names' | 'inline';
  /**
   * The tab row's size. Absent: 14px tabs, or 15px at `titleSize="lg"` (as
   * before). `md` (since 2.392.0): 15px tabs at any title size, the count
   * 10px after its label, 8px side padding with 28px gaps between tabs
   * and the first label aligned under the title — the Initiatives v2 header.
   * `sm`: 14px tabs at any title size.
   *
   * Since 2.396.0 `md` marks the selected tab with a 3px bar drawn inside
   * the header's own box (`Tabs indicator="bar"`) instead of a 2px border
   * hung 1px below it — the bottom half of that border was painted over by
   * whatever followed (the scrolling pane body under an
   * `ExplorerLayout.paneHeader`), so it read as 1px. The bar starts at the
   * content's left edge with the label 4px in (`pl-1 pr-3`, was `px-2` with
   * the row pulled 4px left), and the tabs are 10px taller below the label, 4px further under the people row.
   */
  tabSize?: 'sm' | 'md';
  /**
   * Who draws the rule under the tabs. `host` (default): the host's own
   * bottom border (`className="border-b border-border"`) — the tab row sits
   * on it, full width of the header. `inset` (since 2.396.0): the tab row
   * draws its own rule, spanning the header's content width inside its
   * 24px gutter — the Initiatives v2 header, where the rule starts under the
   * title rather than at the pane's edge. Drop the host border with `inset`.
   */
  tabsRule?: 'host' | 'inset';
  /**
   * The description's type. `md` (default): 16px on 24px lines. `sm` (since
   * 2.392.0): 15px on 22px lines — the Initiatives v2 two-line summary.
   */
  descriptionSize?: 'sm' | 'md';
  /**
   * How `link` reads. `inline` (default): a primary text link with a leading
   * glyph, ruled off from the people. `button`: an outlined button — label
   * then ↗ (`ExternalLinkIcon`, or `link.icon`) — "Repository ↗". Since 2.390.0.
   */
  linkStyle?: 'inline' | 'button';
  /**
   * Where the stats line goes. `inline` (default): beside the title.
   * `below`: its own line under the title row, at 15px — the condensed
   * header over a work item ("18 / 52 points delivered · $1.73 spent").
   * Since 2.390.0.
   */
  statsPlacement?: 'inline' | 'below';
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
  controls, link, menu, menuLabel, title, testId, linkStyle = 'inline',
}: Pick<ScopeHeaderProps, 'controls' | 'link' | 'menu' | 'menuLabel' | 'linkStyle'> & { title: string; testId: string }) {
  const hasMenu = !!menu && menu.some((s) => s.items.length > 0);
  return (
    <>
      {controls != null && controls !== false && (
        <div className="flex shrink-0 items-center gap-2" data-testid={`${testId}-controls`}>
          {controls}
        </div>
      )}
      {link && linkStyle === 'button' && (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer"
          data-testid={`${testId}-link`}
          data-link-style="button"
          className="inline-flex h-9 min-w-0 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-surface px-3.5 text-sm font-medium text-text-primary no-underline transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="max-w-[16rem] truncate">{link.label}</span>
          {link.icon ?? <ExternalLinkIcon size={14} />}
        </a>
      )}
      {link && linkStyle !== 'button' && (
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
  breadcrumbs, title, controls, link, menu, menuLabel, linkStyle, className, 'data-testid': testId = 'scope-header',
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
          <RightGroup controls={controls} link={link} menu={menu} menuLabel={menuLabel} title={name} testId={testId} linkStyle={linkStyle} />
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
  titleSize = 'md',
  description,
  peopleStyle = 'avatars',
  linkStyle = 'inline',
  statsPlacement = 'inline',
  tabSize,
  tabsRule = 'host',
  descriptionSize = 'md',
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
  const namesLine = peopleStyle === 'names' && groups.length > 0;
  const inlinePeople = peopleStyle === 'inline' && groups.length > 0;
  const peopleInRight = !namesLine && !inlinePeople;
  const lg = titleSize === 'lg';
  const statsBelow = statsPlacement === 'below';
  const hasDescription = description != null && description !== false;
  const statsNode = statItems.length > 0 ? (
    <MetaLine
      items={statItems}
      size="sm"
      tone="secondary"
      className={cn('min-w-0', statsBelow ? 'text-[15px]' : 'text-[13px]')}
      data-testid={`${testId}-stats`}
    />
  ) : null;
  const hasTabs = !!tabs && tabs.length > 0;
  const currentTab = hasTabs ? (tabs!.some((t) => t.id === activeTab) ? activeTab! : tabs![0]!.id) : undefined;

  return (
    <div data-testid={testId} data-title-size={titleSize} {...(tabSize ? { 'data-tab-size': tabSize } : {})} {...(hasTabs && tabsRule === 'inset' ? { 'data-tabs-rule': 'inset' } : {})} className={cn('flex min-w-0 flex-col gap-1.5 px-6 pt-3', lg && 'gap-0 pt-4', !hasTabs && (lg ? 'pb-4' : 'pb-3'), className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />
      )}
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex min-w-0 items-center gap-3">
          <h1
            className={cn(
              'm-0 min-w-0 truncate text-text-primary',
              lg ? 'text-[28px] font-bold leading-9 tracking-[-0.01em]' : 'text-[22px] font-semibold leading-8',
            )}
            title={title}
            data-testid={`${testId}-title`}
          >
            {title}
          </h1>
          {status && (
            <StatusPill label={status.label} state={status.tone ?? 'info'} variant="label" className="shrink-0" data-testid={`${testId}-status`} />
          )}
        </div>
        {!statsBelow && statsNode}
        <div className={cn('ml-auto flex shrink-0 items-center', linkStyle === 'button' ? 'gap-3' : 'gap-5')}>
          {peopleInRight && groups.map((g) => (
            <div key={g.label} className="flex items-center gap-2" data-testid={`${testId}-people-${g.label.toLowerCase()}`}>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{g.label}</span>
              <PresenceAvatars users={g.people} size={26} maxVisible={4} />
            </div>
          ))}
          <RightGroup controls={controls} link={link} menu={menu} menuLabel={menuLabel} title={title} testId={testId} linkStyle={linkStyle} />
        </div>
      </div>
      {statsBelow && statsNode}
      {hasDescription && (
        // pre-line (2.392.0): a "\n" in the text is a line break — a summary
        // then a "Focus: …" line — without the host building markup.
        <p className={cn('m-0 min-w-0 whitespace-pre-line text-text-secondary', descriptionSize === 'sm' ? 'text-[15px] leading-[22px]' : 'text-base leading-6')} data-testid={`${testId}-description`} data-size={descriptionSize === 'sm' ? 'sm' : undefined}>{description}</p>
      )}
      {namesLine && (
        <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1 text-sm leading-6 text-text-secondary" data-testid={`${testId}-people`}>
          {groups.map((g) => (
            <span key={g.label} className="min-w-0" data-testid={`${testId}-people-${g.label.toLowerCase()}`}>
              {g.people.map((p) => p.name).join(', ')}
              <span aria-hidden="true"> · </span>
              {g.label}
            </span>
          ))}
        </div>
      )}
      {inlinePeople && (
        <div className={cn('flex min-w-0 flex-wrap items-center gap-x-7 gap-y-2', hasDescription ? 'mt-5' : 'mt-3')} data-testid={`${testId}-people`} data-people-style="inline">
          {groups.map((g, gi) => (
            <div key={g.label} className="flex min-w-0 items-center gap-7" data-testid={`${testId}-people-${g.label.toLowerCase()}`}>
              {gi > 0 && <span aria-hidden="true" className="h-6 w-px shrink-0 bg-border" data-testid={`${testId}-people-rule`} />}
              <div className="flex min-w-0 items-center gap-4" role="group" aria-label={g.label}>
                <span className="shrink-0 text-[15px] leading-6 text-text-secondary">{g.label}</span>
                <span className="flex min-w-0 flex-wrap items-center gap-x-7 gap-y-2">
                  {g.people.map((p) => (
                    <span key={p.id} className="flex min-w-0 items-center gap-3" data-testid={`${testId}-person-${p.id}`}>
                      <Avatar name={p.name} size={32} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} {...(p.color ? { color: p.color } : {})} />
                      <span className="truncate text-[15px] font-medium leading-6 text-text-primary">{p.name}</span>
                    </span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
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
          {...(tabSize === 'md' ? { indicator: 'bar' as const, indicatorWeight: 3 as const } : {})}
          // lg: the count sits 10px after its label ("Work 11"), as the
          // Initiatives mockup draws it — the button's own 6px gap is dropped
          // and only the badge's margin remains. tabSize="md" (2.392.0) is
          // the same 15px/10px at any title size, with 8px side padding,
          // 28px between tabs and the first label 4px in from the title.
          {...(tabSize === 'md'
            ? { itemClassName: 'gap-0 pb-4 pl-1 pr-3 pt-2 text-[15px]' }
            : tabSize === 'sm'
              ? {}
              : lg ? { itemClassName: 'gap-0 text-[15px]' } : {})}
          aria-label={`${title} views`}
          className={cn(
            // host: the row sits on the host's rule (-mb-px) and draws none of
            // its own. inset: the row's own rule, inside the header's gutter.
            tabsRule === 'inset' ? '' : tabSize === 'md' ? '-mb-px after:hidden' : '-mb-px border-b-0',
            tabSize === 'md' && 'gap-7',
            inlinePeople
              ? (tabSize === 'md' ? 'mt-5' : 'mt-4')
              : lg ? (hasDescription || namesLine ? 'mt-5' : 'mt-2') : hasDescription || namesLine ? 'mt-3' : 'mt-1',
          )}
        />
      )}
    </div>
  );
}

export default ScopeHeader;
