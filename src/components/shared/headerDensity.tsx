// Header density (2.437.0) — how every page header reads at each density,
// and when it collapses. `PageHeader` and `ScopeHeader` share this contract.
//
// Density comes from the library's one vocabulary (`Density`, Density.tsx):
//
//   comfortable  the full stack: trail, the title at 20px with its status
//                and info, the description, the labelled people row, the
//                actions, the tabs.
//   compact      trail, then ONE 28px row — the title at 14/600, status,
//                info, the people as a 24px avatar cluster (each name in a
//                tooltip), the collapse chevron, the actions — then the tabs
//                at 14px. The description moves into the title's info
//                `HoverCard`.
//
// Collapsed is a STATE, not a density (`collapsed: boolean`): the trail row
// only, the title folded into its last crumb, the status and an expand
// chevron after it, the actions kept on the right; the tabs stay under it
// (they are navigation, not header chrome). It is set by the reader's
// chevron, by scrolling rich content, or by a very short container — see
// `useHeaderDensity`, which picks both values for a page.
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Avatar } from './Avatar';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import { HoverCard, type HoverCardWidth } from './HoverCard';
import { Tooltip } from './Tooltip';
import { Text } from './Text';
import type { Density } from './Density';
import { IconButton } from '../ui/IconButton';
import { ChevronIcon, InfoIcon } from '../ui/Icons';

/** What the page's body holds. Rich kinds ask for a compact header. */
export type HeaderContentKind = 'canvas' | 'graph' | 'conversation' | 'document' | 'list' | 'detail';

export const RICH_HEADER_CONTENT: readonly HeaderContentKind[] = ['canvas', 'graph', 'conversation', 'document'];

export function isRichHeaderContent(kind: HeaderContentKind | undefined): boolean {
  return !!kind && RICH_HEADER_CONTENT.includes(kind);
}

/** Where the chevron is remembered: `uic:header-density:<headerId>:<rich|plain>`. */
export const HEADER_DENSITY_STORAGE_PREFIX = 'uic:header-density:';

export function headerDensityStorageKey(headerId: string, kind: HeaderContentKind | undefined): string {
  return `${HEADER_DENSITY_STORAGE_PREFIX}${headerId}:${isRichHeaderContent(kind) ? 'rich' : 'plain'}`;
}

/** Below this container height a plain page drops to compact. */
export const HEADER_COMPACT_BELOW_PX = 640;
/** Below this container height a rich page starts collapsed. */
export const HEADER_COLLAPSE_BELOW_PX = 480;

/**
 * A page's header before any scroll or chevron. Density: the host's
 * `preference` when given; else rich content → compact, plain → comfortable,
 * and a plain page under `HEADER_COMPACT_BELOW_PX` → compact. Collapsed: a
 * rich page under `HEADER_COLLAPSE_BELOW_PX`. A height of 0 or less (not
 * measured yet) is ignored.
 */
export function headerDefaults({ contentKind, containerHeight, preference }: {
  contentKind?: HeaderContentKind;
  containerHeight?: number | null;
  preference?: Density | null;
}): { density: Density; collapsed: boolean } {
  const h = containerHeight != null && containerHeight > 0 ? containerHeight : null;
  const rich = isRichHeaderContent(contentKind);
  const density: Density = preference ?? (rich || (h != null && h < HEADER_COMPACT_BELOW_PX) ? 'compact' : 'comfortable');
  return { density, collapsed: rich && h != null && h < HEADER_COLLAPSE_BELOW_PX };
}

/**
 * The trail with the title folded in as its last crumb. A trail that already
 * ends with the title (the initiative trail ends "… › Observability
 * Platform") is returned as is; an empty trail becomes the title alone.
 */
export function foldTitleIntoTrail(crumbs: readonly BreadcrumbItem[] | undefined, title: string | undefined): BreadcrumbItem[] {
  const trail = [...(crumbs ?? [])];
  if (!title) return trail;
  const last = trail[trail.length - 1];
  if (last && last.label.trim() === title.trim()) return trail;
  return [...trail, { label: title }];
}

export interface HeaderCollapseToggleProps {
  /** True when the header is collapsed: the chevron points down and expands it. */
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  'data-testid'?: string;
}

/**
 * The header's chevron. Collapsed: "Expand header" (points down). Otherwise:
 * "Collapse header" (points up). `aria-expanded` says which.
 */
export function HeaderCollapseToggle({ collapsed, onToggle, className, 'data-testid': testId = 'header-collapse-toggle' }: HeaderCollapseToggleProps) {
  const label = collapsed ? 'Expand header' : 'Collapse header';
  return (
    <Tooltip content={label} data-testid={`${testId}-tooltip`}>
      <IconButton
        aria-label={label}
        aria-expanded={!collapsed}
        variant="ghost"
        size="sm"
        icon={<ChevronIcon size={14} dir={collapsed ? 'down' : 'up'} />}
        onClick={onToggle}
        className={cn('shrink-0 text-text-secondary', className)}
        data-testid={testId}
        data-collapsed={collapsed ? 'true' : 'false'}
      />
    </Tooltip>
  );
}

export interface HeaderTrailFoldProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  /** After the folded title — a status, kept small. */
  badge?: ReactNode;
  /** The expand chevron's handler. Absent: no chevron. */
  onExpand?: () => void;
  /** Right of the trail — the header's actions stay reachable when collapsed. */
  actions?: ReactNode;
  className?: string;
  'data-testid'?: string;
}

/**
 * The collapsed header: one trail row, the title as its last crumb, then the
 * badge and the expand chevron; actions on the right.
 */
export function HeaderTrailFold({
  breadcrumbs, title, badge, onExpand, actions, className, 'data-testid': testId = 'header-trail-fold',
}: HeaderTrailFoldProps) {
  const trail = foldTitleIntoTrail(breadcrumbs, title);
  return (
    <div className={cn('flex h-7 min-w-0 items-center gap-2', className)} data-testid={testId}>
      {/* One line: the crumbs never wrap; they clip before the badge and chevron do. */}
      {trail.length > 0 && <Breadcrumbs items={trail} separator="›" maxItems={5} className="min-w-0 shrink overflow-hidden whitespace-nowrap [&>ol]:flex-nowrap" data-testid={`${testId}-crumbs`} />}
      {badge && <div className="flex shrink-0 items-center">{badge}</div>}
      {onExpand && <HeaderCollapseToggle collapsed onToggle={onExpand} data-testid={`${testId}-toggle`} />}
      {actions && <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export interface HeaderDescriptionInfoProps {
  /** Who the description is about — the trigger reads "About <title>". */
  title: string;
  description: ReactNode;
  /** The card's width. Default `lg`; `xl` for a summary that carries a stat strip. Since 2.437.1. */
  width?: HoverCardWidth;
  'data-testid'?: string;
}

/**
 * Compact density's home for the description: an info glyph after the title
 * opening the library `HoverCard` — hover or keyboard focus shows it, Enter
 * pins it, Escape closes it, focus never leaves the glyph.
 */
export function HeaderDescriptionInfo({ title, description, width = 'lg', 'data-testid': testId = 'header-description' }: HeaderDescriptionInfoProps) {
  return (
    <HoverCard label={`About ${title}`} width={width} data-testid={`${testId}-card`}
      content={(
        <div className="flex flex-col gap-1">
          <Text as="p" size="sm" weight="semibold" tone="primary" wrap>{title}</Text>
          <div className="whitespace-pre-line text-xs text-text-secondary" data-testid={`${testId}-text`}>{description}</div>
        </div>
      )}>
      {(trigger) => (
        <IconButton {...trigger} aria-label={`About ${title}`} variant="ghost" size="sm" icon={<InfoIcon size={14} />}
          className="shrink-0 text-text-secondary" data-testid={`${testId}-trigger`} />
      )}
    </HoverCard>
  );
}

export interface HeaderPerson {
  id: string;
  name: string;
  avatarUrl?: string;
  color?: string;
}

export interface HeaderPeopleGroup {
  /** "Owner", "SMEs". */
  label: string;
  people: HeaderPerson[];
  /** Beside the group — a "change owner" control. Keeps an empty group drawn. */
  action?: ReactNode;
}

/** Groups worth drawing: people in them, or an action to add some. */
export function visibleHeaderPeople(groups: readonly HeaderPeopleGroup[] | undefined): HeaderPeopleGroup[] {
  return (groups ?? []).filter((g) => g.people.length > 0 || !!g.action);
}

/**
 * The people in a header. Comfortable: the muted label, then a 32px avatar
 * and the name per person. Compact: 24px avatars only, each name and its
 * group in a tooltip ("Nora DaSilva · Owner"), groups ruled apart.
 */
export function HeaderPeople({ groups, density, 'data-testid': testId = 'header-people' }: {
  groups: readonly HeaderPeopleGroup[];
  density: Density;
  'data-testid'?: string;
}) {
  const visible = visibleHeaderPeople(groups);
  if (visible.length === 0) return null;
  if (density === 'compact') {
    return (
      <div className="flex min-w-0 shrink-0 items-center gap-2" data-testid={testId}>
        {visible.map((g, gi) => (
          <div key={g.label} role="group" aria-label={g.label} className="flex items-center gap-1" data-testid={`${testId}-${g.label.toLowerCase()}`}>
            {gi > 0 && <span aria-hidden="true" className="mr-1 h-4 w-px shrink-0 bg-border" />}
            {g.people.map((p) => (
              <Tooltip key={p.id} content={`${p.name} · ${g.label}`} data-testid={`${testId}-tip-${p.id}`}>
                <span tabIndex={0} role="img" aria-label={`${p.name}, ${g.label}`} className="inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid={`${testId}-person-${p.id}`}>
                  <Avatar name={p.name} size={24} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} {...(p.color ? { color: p.color } : {})} />
                </span>
              </Tooltip>
            ))}
            {g.action}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-2" data-testid={testId}>
      {visible.map((g) => (
        <div key={g.label} role="group" aria-label={g.label} className="flex min-w-0 items-center gap-3" data-testid={`${testId}-${g.label.toLowerCase()}`}>
          <Text size="sm" tone="tertiary" className="shrink-0">{g.label}</Text>
          {g.people.map((p) => (
            <span key={p.id} className="flex min-w-0 items-center gap-2" data-testid={`${testId}-person-${p.id}`}>
              <Avatar name={p.name} size={32} {...(p.avatarUrl ? { src: p.avatarUrl } : {})} {...(p.color ? { color: p.color } : {})} />
              <Text size="sm" tone="primary" className="truncate">{p.name}</Text>
            </span>
          ))}
          {g.action}
        </div>
      ))}
    </div>
  );
}
