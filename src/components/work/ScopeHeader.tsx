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

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Breadcrumbs, type BreadcrumbItem } from '../shared/Breadcrumbs';
import { RAIL_ITEM_TEXT } from '../shared/railType';
import { StatusPill, type StatusPillTone } from '../shared/StatusPill';
import { MetaLine } from '../shared/MetaLine';
import { Avatar } from '../shared/Avatar';
import { PresenceAvatars, type PresenceUser } from '../shared/PresenceAvatars';
import { Tabs, type TabItem } from '../shared/Tabs';
import { DropdownMenu, type DropdownMenuSection } from '../shared/DropdownMenu';
import { InlinePopover } from '../shared/InlinePopover';
import { Stack } from '../ui/Stack';
import { ExternalLinkIcon, LinkIcon } from '../ui/Icons';
import { TONE_SOLID_BG } from '../shared/tones';
import { HeaderCollapseToggle, HeaderDescriptionInfo, foldTitleIntoTrail } from '../shared/headerDensity';
import { useDensityForm, type Density } from '../shared/Density';

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
   * The title's hover text (`inline` variant, since 2.407.15): the h1's
   * `title` attribute, default `title`. A host that shows a cut-down title (a
   * prompt's first sentence) passes the whole text here so hovering the title
   * reads all of it.
   */
  titleHint?: string;
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
   *
   * `inline` (since 2.405.2): ONE row, at most 48px tall — the crumbs, then
   * the title as the trail's emphasised last segment ("Org › Search ›
   * **People & connections**", 20px semibold, or 20px bold at
   * `titleSize="lg"`), then, right-aligned on the same row, the `tabs`
   * (honouring `activeTab`, `onTabChange`, `tabSize`, counts and dots) and
   * after them `controls`, `link` and `menu`. For a workspace whose body (a
   * graph, a result list) wants every pixel of height. `description`,
   * `status`, `progress`, `spentUsd`, `stats` and `people` are NOT drawn in
   * this variant — put a compact summary in `controls` if the row needs one.
   * The selected tab's bar sits on the row's bottom edge; give the header
   * the host rule (`className="border-b border-border"`) as with `default`.
   *
   * Squeeze order (2.407.2) — when the row is over-full it gives up space in
   * this order: (a) the `controls` cluster first: it is `min-w-0
   * overflow-hidden` and shrinks ahead of the trail (`shrink-[100]` against
   * the trail's 1); its items never shrink or wrap (2.407.4 — a chip keeps
   * one line); once its content overflows — or the right cluster does, the
   * row's content at its wanted width (`inlineRowWanted`) exceeds the row,
   * or the trail would drop under its minimum — by more than 2px (2.407.6:
   * the same margin the way back needs), or the row is under
   * `controlsCollapseAt`, the controls leave the row: into the ⋯ menu as a
   * "Filters" section when `controlsMenu` is given, else into a popover behind one "Filters ▾"
   * button. (b) Then the crumbs: each truncates inside its cap and the
   * middle collapses to "…". (c) The title is at most half the row
   * (2.407.15: gives up width first, `min-w-[12rem]`) and truncates, with the full text (`titleHint`) in its
   * `title`; it never paints over the crumbs. The first crumb never goes
   * below its own width
   * (`shrink-0`). The tabs never shrink — they are the navigation.
   */
  variant?: 'default' | 'crumbs' | 'inline';
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
  /**
   * `variant="inline"` only (since 2.407.2): the same controls as menu rows
   * — the same `onSelect` callbacks the controls call. When the row is too
   * narrow for `controls`, these join the ⋯ menu as a "Filters" section (the
   * first section's `label` defaults to `controlsLabel`) and the controls
   * leave the row. Without it the controls move into a popover behind one
   * "Filters ▾" button instead. See `variant`'s squeeze order.
   */
  controlsMenu?: DropdownMenuSection[] | null;
  /**
   * `variant="inline"` only (since 2.407.2): the row width, px, below which
   * the controls leave the row (into the ⋯ menu or the Filters popover).
   * Absent: measured — they leave when their content no longer fits their
   * shrunken box, or when the trail would drop under its minimum (the first
   * crumb whole, "…", a readable last crumb, and the title at 12rem).
   */
  controlsCollapseAt?: number;
  /** The collapsed controls' name — the popover button and the menu section. Default "Filters". Since 2.407.2. */
  controlsLabel?: string;
  /** The ⋯ menu. Omitted or empty — no button. */
  menu?: DropdownMenuSection[] | null;
  menuLabel?: string;
  tabs?: ScopeHeaderTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /**
   * The h1's size. `md` (default) is the 20px band title; `lg` is the 28px
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
   * The tab row's size. Every step draws 14px labels since 2.441.3 (a tab
   * is a control; `md` and `titleSize="lg"` were 15px). `md` (since 2.392.0): the wider tab spacing at any title size, the count
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
  /**
   * Since 2.437.0 — the header density contract shared with `PageHeader`
   * (`headerDensity.tsx`; usually `useHeaderDensity().headerProps`). The
   * library `Density`; default: the nearest `DensityProvider`, else
   * comfortable.
   *
   * `default` variant: `compact` is one title row — the title at 14/600,
   * the status, the description in an info `HoverCard`, `people` as avatars
   * on the right whatever `peopleStyle` says, stats inline — then the tabs.
   * `inline` variant: `compact` draws the title at 14/600 on a 40px row.
   * `crumbs` variant: density changes nothing (it has no title row).
   */
  density?: Density;
  /**
   * Since 2.437.0 — a STATE, not a density. `default`: the trail row only,
   * the title folded into its last crumb with the status and the expand
   * chevron, the right-hand group kept; the tabs stay under it. `crumbs`:
   * `title` folds into the trail with the expand chevron. `inline`: the
   * controls move into the menu/Filters popover.
   */
  collapsed?: boolean;
  /** Draws the chevron: "Collapse header" on the title row, "Expand header" when collapsed. Since 2.437.0. */
  onToggleCollapsed?: () => void;
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
  if (props.variant === 'inline') return <ScopeHeaderInline {...props} />;
  return <ScopeHeaderFull {...props} />;
}

/** The right-hand group both variants share: controls · link · ⋯. */
function RightGroup({
  controls, link, menu, menuLabel, title, testId, linkStyle = 'inline',
  controlsMode = 'fixed', controlsMenu, controlsLabel = 'Filters', ghost = false,
}: Pick<ScopeHeaderProps, 'controls' | 'link' | 'menu' | 'menuLabel' | 'linkStyle' | 'controlsMenu' | 'controlsLabel'> & {
  title: string;
  testId: string;
  /**
   * Collapsed only (2.407.5): also draw an invisible, inert, zero-size
   * clipped copy of the controls at their natural width, so the inline row
   * can measure what they would need. Drawn for one layout pass, when no
   * inline measurement exists yet.
   */
  ghost?: boolean;
  /**
   * `fixed`: the controls keep their width (default, crumbs variants).
   * `shrink`: the inline row's first give (2.407.2) — the cluster may shrink
   * to nothing, clipping. Since 2.407.4 its items do NOT shrink or wrap
   * (`flex-nowrap`, `whitespace-nowrap`, items and a wrapper's items
   * `shrink-0`): a chip, a menu trigger or a link keeps one line at its
   * natural width, so an over-full cluster overflows (`scrollWidth >
   * clientWidth`) and the row collapses it — before 2.407.4 the chips
   * shrank by wrapping to two lines, nothing overflowed and the collapse
   * never fired. `collapsed`: the controls left the row — into the menu
   * (`controlsMenu`) or a popover.
   */
  controlsMode?: 'fixed' | 'shrink' | 'collapsed';
}) {
  const hasControls = controls != null && controls !== false;
  const menuControls = controlsMode === 'collapsed' && !!controlsMenu && controlsMenu.some((s) => s.items.length > 0);
  const sections: DropdownMenuSection[] = [
    ...(menuControls
      ? controlsMenu!.filter((s) => s.items.length > 0).map((s, i) => (i === 0 && !s.label ? { ...s, label: controlsLabel } : s))
      : []),
    ...(menu ?? []),
  ];
  const hasMenu = sections.some((s) => s.items.length > 0);
  return (
    <>
      {hasControls && controlsMode !== 'collapsed' && (
        <div
          className={cn(
            'flex items-center gap-2',
            controlsMode === 'shrink'
              ? 'min-w-0 shrink flex-nowrap overflow-hidden whitespace-nowrap [&_*]:whitespace-nowrap [&>*]:shrink-0 [&>*]:flex-nowrap [&>*>*]:shrink-0'
              : 'shrink-0',
          )}
          data-scope-controls=""
          data-testid={`${testId}-controls`}
        >
          {controls}
        </div>
      )}
      {hasControls && controlsMode === 'collapsed' && !menuControls && (
        <ControlsPopover label={controlsLabel} testId={testId}>{controls}</ControlsPopover>
      )}
      {hasControls && controlsMode === 'collapsed' && ghost && (
        <div aria-hidden="true" inert data-scope-controls-ghost="" className="pointer-events-none invisible absolute right-0 top-0 h-0 w-0 overflow-hidden">
          <div className="flex w-max flex-nowrap items-center gap-2 whitespace-nowrap [&_*]:whitespace-nowrap [&>*]:shrink-0 [&>*]:flex-nowrap [&>*>*]:shrink-0">
            {controls}
          </div>
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
          className="flex min-w-0 items-center gap-1.5 border-l border-border pl-4 text-[14px] font-medium text-primary no-underline hover:underline"
        >
          {link.icon ?? <LinkIcon size={14} />}
          <span className="max-w-[16rem] truncate">{link.label}</span>
        </a>
      )}
      {hasMenu && (
        <DropdownMenu
          trigger={<span aria-hidden="true" className="text-sm leading-none">⋯</span>}
          triggerLabel={menuLabel ?? `Actions for ${title}`}
          triggerTestId={`${testId}-menu`}
          align="end"
          sections={sections}
          triggerClassName="h-8 w-8 shrink-0 border-transparent px-0 py-0 text-text-secondary hover:border-transparent hover:bg-surface-hover"
        />
      )}
    </>
  );
}

/**
 * The collapsed controls (2.407.2): one "Filters ▾" button, the host's
 * controls — unchanged, the same callbacks — in a popover under it.
 *
 * Since 2.407.4 the popover is a vertical `Stack` of full-width rows, at
 * least 16rem wide, nothing in it wrapping: a chip keeps one line. A host
 * that wraps its controls in one layout `<div>` (an `Inline` of chips) has
 * that wrapper flattened (`display: contents`) so each control is a row.
 */
function ControlsPopover({ label, testId, children }: { label: string; testId: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button
        data-ui-part=""
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        data-testid={`${testId}-controls-toggle`}
        data-scope-controls-toggle=""
        className={cn(
          // 2.407.15: the same family as the crumbs and a host's 28px
          // menu triggers — 28px tall, 13px/500 — not a bare 14px text button.
          // 2.407.19: bordered like a `DropdownMenu` default trigger (1px
          // border, md radius, transparent) — it stands in for those.
          'inline-flex h-7 shrink-0 cursor-pointer items-center gap-1 whitespace-nowrap rounded-md border border-border bg-transparent px-2.5 text-text-secondary transition-colors duration-100 hover:bg-surface-hover hover:text-text-primary',
          RAIL_ITEM_TEXT,
          open && 'text-text-primary',
        )}
      >
        {label}
        <span aria-hidden="true">▾</span>
      </button>
      <InlinePopover
        trigger={triggerRef}
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom-end"
        aria-label={label}
        className="p-2"
        data-testid={`${testId}-controls-popover`}
      >
        <Stack
          gap="sm"
          align="stretch"
          data-testid={`${testId}-controls-stack`}
          className={cn(
            'min-w-[16rem] whitespace-nowrap [&_*]:whitespace-nowrap',
            // One wrapper div (the host's Inline) → its children are the rows.
            '[&>div:only-child:has(>*+*)]:contents',
            '[&>*]:shrink-0 [&>*]:justify-start [&>div:only-child>*]:shrink-0 [&>div:only-child>*]:justify-start',
          )}
        >
          {children}
        </Stack>
      </InlinePopover>
    </>
  );
}

/**
 * The title's width in the collapse arithmetic: 12rem — and, since 2.407.15,
 * its CSS floor again (`min-w-[12rem]`; 2.407.10–13 had `min-w-0
 * max-w-[50%]`). The header keeps its controls inline only while the title
 * can have 12rem.
 */
const TITLE_MIN_PX = 192;

/** The title's wanted width in the collapse arithmetic: 12rem. */
function titleWanted(title: HTMLElement): number {
  return parseFloat(getComputedStyle(title).minWidth) || TITLE_MIN_PX;
}
/** A collapsed trail's joiners: three "›" and the "…", with their gaps. */
const TRAIL_JOINERS_PX = 64;
/** The last crumb's readable minimum ("Desi…"). */
const LAST_CRUMB_MIN_PX = 48;

/**
 * The narrowest the inline trail may be before the controls leave the row:
 * the first crumb whole (inside its cap), "…", a readable last crumb and
 * the title at its 12rem floor. Exported for tests.
 */
export function inlineTrailMinimum(trail: HTMLElement): number {
  const crumbEls = Array.from(trail.querySelectorAll<HTMLElement>('[data-crumb]'));
  const natural = (el: HTMLElement) => {
    const cap = parseFloat(getComputedStyle(el).maxWidth);
    return Math.min(el.scrollWidth, Number.isFinite(cap) ? cap : Infinity);
  };
  const title = trail.querySelector<HTMLElement>('h1');
  const titleMin = title ? titleWanted(title) : 0;
  const first = crumbEls[0] ? natural(crumbEls[0]) : 0;
  const last = crumbEls.length > 1 ? Math.min(natural(crumbEls[crumbEls.length - 1]!), LAST_CRUMB_MIN_PX) : 0;
  return titleMin + first + last + (crumbEls.length > 0 ? TRAIL_JOINERS_PX : 0);
}

/** A crumb's natural width (inside its cap) less what it is given, sub-pixel. */
function crumbShortfall(el: HTMLElement): number {
  const cap = parseFloat(getComputedStyle(el).maxWidth);
  const natural = Math.min(el.scrollWidth, Number.isFinite(cap) ? cap : Infinity);
  const rect = el.getBoundingClientRect().width;
  const given = rect > 0 ? rect : el.clientWidth;
  return Math.max(0, natural - given);
}

/**
 * How far the inline row's content, at its wanted width, is over the row
 * (≤ 0: it fits). Since 2.407.6 this is `inlineRowWanted` (the controls at
 * their natural width when they are in the row) less the row's width — the
 * same sum the re-expand reads, so a collapse and an expand can never
 * disagree about what the row wants. Before, it counted the trail by its
 * box (`clientWidth`), which is `flex-auto` and carries the row's slack, so
 * a fitting row "wanted" its own width plus any noise. Exported for tests
 * (2.407.4).
 */
export function inlineRowDeficit(row: HTMLElement, trail: HTMLElement | null): number {
  const box = row.querySelector<HTMLElement>('[data-scope-controls]');
  return inlineRowWanted(row, trail, box ? naturalWidth(box) : 0) - row.clientWidth;
}

/** An element's laid-out width, not less than its content (overflow hidden or not). */
function naturalWidth(el: HTMLElement): number {
  return Math.max(el.scrollWidth, el.offsetWidth || 0);
}

/** Out of the flow (the Filters popover's panel, the measuring copy): not part of the row. */
function outOfFlow(el: HTMLElement): boolean {
  const pos = getComputedStyle(el).position;
  return pos === 'absolute' || pos === 'fixed' || el.hasAttribute('data-scope-controls-ghost');
}

/**
 * The inline trail's wanted width from its content, not its box (2.407.5):
 * the crumb list at its natural width (every crumb whole inside its cap —
 * the nav's width plus any crumb's shortfall), the joiners, and the title at
 * 12rem (`titleWanted`, its `min-w-[12rem]`). The trail is `flex-1`, so its own `clientWidth`
 * carries the row's slack — useless as a wanted width when the row has room.
 * A trail folded to "…" counts at least the width it needed unfolded
 * (`data-full-width`, recorded by the trail when it folded).
 */
function inlineTrailWanted(trail: HTMLElement): number {
  const px = (v: string) => parseFloat(v) || 0;
  const kids = (Array.from(trail.children) as HTMLElement[]).filter((k) => !outOfFlow(k));
  let need = 0;
  for (const kid of kids) {
    if (kid.tagName === 'H1') {
      need += titleWanted(kid);
    } else if (kid.tagName === 'NAV') {
      need += naturalWidth(kid);
      kid.querySelectorAll<HTMLElement>('[data-crumb]').forEach((el) => { need += crumbShortfall(el); });
    } else {
      need += naturalWidth(kid);
    }
  }
  need += px(getComputedStyle(trail).columnGap) * Math.max(0, kids.length - 1);
  // Folded to "…", the hidden crumbs are not in the DOM: the trail recorded
  // the width its whole crumb list needed when it folded.
  const full = parseFloat(trail.dataset.fullWidth ?? '');
  return Number.isFinite(full) ? Math.max(need, full) : need;
}

/**
 * The inline row's wanted width, px, padding included (2.407.5), with the
 * controls inline at `controlsWidth`: the trail at its content's width
 * (`inlineTrailWanted`), the tabs, the right cluster's other items at their
 * natural widths — the ⋯ once, the collapsed "Filters ▾" never — and every
 * gap. Measurable in either state, so the collapse can be undone: while
 * collapsed the controls are not in the row, and their width comes from the
 * last inline measurement or a hidden copy. Exported for tests.
 */
export function inlineRowWanted(row: HTMLElement, trail: HTMLElement | null, controlsWidth: number): number {
  const style = getComputedStyle(row);
  const px = (v: string) => parseFloat(v) || 0;
  const kids = (Array.from(row.children) as HTMLElement[]).filter((k) => !outOfFlow(k));
  let need = px(style.paddingLeft) + px(style.paddingRight);
  for (const kid of kids) {
    if (kid === trail) {
      need += inlineTrailWanted(trail);
    } else if (kid.getAttribute('data-testid')?.endsWith('-right')) {
      // The controls' slot: the inline box, or the Filters ▾ standing in for it.
      const others = (Array.from(kid.children) as HTMLElement[]).filter((el) =>
        !outOfFlow(el) && !el.hasAttribute('data-scope-controls') && !el.hasAttribute('data-scope-controls-toggle'));
      const count = others.length + (controlsWidth > 0 ? 1 : 0);
      need += others.reduce((sum, el) => sum + naturalWidth(el), 0) + Math.max(0, controlsWidth)
        + px(getComputedStyle(kid).columnGap) * Math.max(0, count - 1);
    } else {
      need += naturalWidth(kid);
    }
  }
  return need + px(style.columnGap) * Math.max(0, kids.length - 1);
}

/**
 * The hysteresis margin, both ways (2.407.6): inline comes back only with
 * 2px to spare, and goes only when 2px or more short. A sub-2px deficit is
 * layout noise (sub-pixel crumbs against integer `scrollWidth`s, a first
 * frame after the controls are re-inserted), never a collapse.
 */
const FIT_MARGIN_PX = 2;

function ScopeCrumbs({
  breadcrumbs, title, controls, link, menu, menuLabel, linkStyle, collapsed = false, onToggleCollapsed, className, 'data-testid': testId = 'scope-header',
}: ScopeHeaderProps) {
  const last = breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1]!.label : undefined;
  const name = title ?? (typeof last === 'string' ? last : 'this scope');
  const hasRight = (controls != null && controls !== false) || !!link || (!!menu && menu.some((s) => s.items.length > 0));
  const folded = collapsed;
  const trail = folded ? foldTitleIntoTrail(breadcrumbs, title) : breadcrumbs ?? [];
  return (
    <div data-testid={testId} data-variant="crumbs" data-collapsed={folded ? 'true' : 'false'} className={cn('flex min-w-0 items-start gap-4 px-[var(--ui-page-gutter,1.5rem)] pb-1 pt-2', className)}>
      <div className="flex h-5 min-w-0 flex-1 items-center gap-2">
        {trail.length > 0 && (
          <Breadcrumbs aria-label={`${title ?? "Scope"} location`} items={trail} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />
        )}
        {folded && onToggleCollapsed && <HeaderCollapseToggle collapsed onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} />}
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

/** `ScopeHeaderTab[]` → `Tabs` items: the count and the attention dot as a plain badge. */
function scopeTabItems(tabs: ScopeHeaderTab[], testId: string): TabItem[] {
  return tabs.map((t) => ({
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
  }));
}

/**
 * A crumb's own classes: never wraps, capped, truncates with "…". Since
 * 2.407.10 the crumbs (and the collapsed "…") draw the rails' item type —
 * `RAIL_ITEM_TEXT`, 13px/500 — in secondary ink (hover → primary), so the
 * trail reads as one scale with the app's rails instead of 14px/400 tertiary
 * beside 14px/500 tabs.
 */
const CRUMB_CLASS = cn('block min-w-0 truncate whitespace-nowrap text-text-secondary transition-colors duration-100', RAIL_ITEM_TEXT);
/** A "›" between crumbs, and before the title: tertiary, at the crumbs' 13px. */
const CRUMB_SEP_CLASS = 'shrink-0 select-none text-[14px] leading-5 text-text-tertiary';

function InlineCrumb({ item, last, testId }: { item: BreadcrumbItem; last: boolean; testId: string }) {
  // The last crumb is the scope the title sits in ("Design System API"), so
  // it gets more room than the levels above it — 15rem since 2.407.4 (was
  // 14rem), so a label near the old cap keeps room for its whole text.
  const cls = cn(CRUMB_CLASS, last ? 'max-w-[15rem]' : 'max-w-[10rem]');
  const common = { title: item.label, 'data-crumb': '', 'data-testid': `${testId}-crumb` } as const;
  if (item.href) {
    return (
      <a href={item.href} onClick={item.onClick} className={cn(cls, 'no-underline hover:text-text-primary')} {...common}>
        {item.label}
      </a>
    );
  }
  if (item.onClick) {
    return (
      <button data-ui-part="" type="button" onClick={item.onClick} className={cn(cls, 'cursor-pointer border-none bg-transparent p-0 text-left [font-family:inherit] hover:text-text-primary')} {...common}>
        {item.label}
      </button>
    );
  }
  return <span className={cls} {...common}>{item.label}</span>;
}

/**
 * The inline variant's crumbs + title (2.406.4). The row never wraps or
 * grows: every crumb truncates inside its cap, the crumbs give up width
 * before the title does (`shrink-[100]` against the title's `shrink`), and
 * when a crumb is squeezed below its cap anyway the middle collapses to "…"
 * — first and last crumb kept — before the title loses any more. The
 * first crumb keeps its own width (2.407.2); the header moves its controls
 * out of the row before the trail gets that tight. Since 2.407.15 the order
 * inside the trail is the reverse of 2.406.4's: the title gives up width
 * FIRST (`flex-1 min-w-[12rem]` since 2.407.17 — basis 0, no shrink phase for
 * the crumbs until the title's floor; 2.407.15's `shrink-[100]` left them a
 * sub-pixel share that rendered "Sear…") and the crumbs only
 * then — so "Org › Search › Auth Migration ›" stays whole ahead of a long
 * title, and the trail's basis is 0 (`flex-1`) so the title's length never
 * reaches the tabs or the controls. The crumb list clips inside its own box
 * (`overflow-hidden`), so a squeezed crumb is never drawn over.
 */
function InlineTrail({ crumbs, title, titleHint, lg, sm = false, after, testId }: { crumbs: BreadcrumbItem[]; title?: string; titleHint?: string; lg: boolean; sm?: boolean; after?: ReactNode; testId: string }) {
  const trailRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  // The trail width at which the full crumb list fits again.
  const expandAt = useRef<number>(Infinity);
  const canCollapse = crumbs.length > 2;
  const crumbKey = crumbs.map((c) => c.label).join('\u0000');

  const measure = useCallback(() => {
    const trail = trailRef.current;
    if (!trail) return;
    if (collapsed) {
      if (trail.clientWidth >= expandAt.current) {
        delete trail.dataset.fullWidth;
        setCollapsed(false);
      }
      return;
    }
    if (!canCollapse) return;
    let deficit = 0;
    trail.querySelectorAll<HTMLElement>('[data-crumb]').forEach((el) => {
      const cap = parseFloat(getComputedStyle(el).maxWidth);
      const natural = Math.min(el.scrollWidth, Number.isFinite(cap) ? cap : Infinity);
      if (el.clientWidth + 1 < natural) deficit += natural - el.clientWidth;
    });
    if (deficit > 0) {
      expandAt.current = trail.clientWidth + deficit;
      // 2.407.5: folded, the hidden crumbs are not in the DOM; the header's
      // wanted width reads their width from here (`inlineTrailWanted`).
      trail.dataset.fullWidth = String(Math.ceil(expandAt.current));
      setCollapsed(true);
    }
  }, [collapsed, canCollapse]);

  // A new trail starts expanded and is measured afresh.
  useLayoutEffect(() => {
    setCollapsed(false);
    expandAt.current = Infinity;
    if (trailRef.current) delete trailRef.current.dataset.fullWidth;
  }, [crumbKey]);

  useLayoutEffect(() => {
    measure();
    const trail = trailRef.current;
    if (!trail || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(trail);
    return () => ro.disconnect();
  }, [measure, crumbKey]);

  const hidden = collapsed && canCollapse ? crumbs.slice(1, -1) : [];
  const visible: Array<BreadcrumbItem | null> = hidden.length > 0 ? [crumbs[0]!, null, crumbs[crumbs.length - 1]!] : crumbs;

  return (
    // flex-1 (2.407.15; flex-auto 2.407.2–2.407.13): the trail's basis is 0,
    // so it takes the row's free space and its content can never push the
    // tabs or the controls — a paragraph-length title used to widen the
    // trail's basis and squeeze the controls out of the row with room to
    // spare. The controls still leave the row when the trail's share drops
    // under `inlineTrailMinimum` (the `short` guard).
    <div ref={trailRef} className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden" data-testid={`${testId}-trail`}>
      {crumbs.length > 0 && (
        // Every crumb is a place to go: the title after them is the page.
        // overflow-hidden (2.407.10): a squeezed crumb list clips inside its
        // own box — the first crumb (shrink-0) used to overflow the nav and
        // paint under the start of a long title.
        <nav aria-label={`${title ?? "Scope"} location`} data-testid={`${testId}-crumbs`} data-collapsed={hidden.length > 0 ? 'true' : undefined} className="flex min-w-0 shrink items-center overflow-hidden">
          <ol className="m-0 flex min-w-0 list-none flex-nowrap items-center gap-1 p-0">
            {visible.map((item, i) => (
              // The first crumb never goes below its own width (2.407.2).
              <li key={item ? `${i}-${item.label}` : 'collapsed'} className={cn('flex items-center gap-1', item && i > 0 ? 'min-w-0' : 'shrink-0')} data-crumb-item={i === 0 ? 'first' : undefined}>
                {item ? (
                  <InlineCrumb item={item} last={i === visible.length - 1} testId={testId} />
                ) : (
                  <span
                    className={cn('shrink-0 select-none whitespace-nowrap text-text-secondary', RAIL_ITEM_TEXT)}
                    title={hidden.map((h) => h.label).join(' › ')}
                    aria-label={`${hidden.length} hidden: ${hidden.map((h) => h.label).join(', ')}`}
                    data-testid={`${testId}-crumbs-more`}
                  >
                    &hellip;
                  </span>
                )}
                {i < visible.length - 1 && (
                  <span aria-hidden="true" className={CRUMB_SEP_CLASS}>›</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      {crumbs.length > 0 && title && (
        <span aria-hidden="true" className={CRUMB_SEP_CLASS}>›</span>
      )}
      {title && (
        <h1
          aria-current="page"
          title={titleHint ?? title}
          data-testid={`${testId}-title`}
          className={cn(
            // 2.407.15: the title gives up width first (shrink-[100] against
            // the crumbs' shrink), truncating down to its 12rem floor, so the
            // crumbs stay whole while a long title truncates and the crumbs
            // fold to "…" only once the title is at its floor. 2.407.10's
            // max-w-[50%] capped it at half the TRAIL — the trail carries the
            // row's slack, so a title was cut with empty space beside it.
            // The `title` attribute carries the full text (`titleHint`). The
            // header still moves its controls out before the trail drops
            // under its minimum (`TITLE_MIN_PX`, the collapse arithmetic).
            // 2.407.17: basis 0, grow 1 (flex-1) instead of shrink-[100] — a
            // shrink phase gives every item its proportional share, and 0.2px
            // off "Search" rendered as "Sear…" at DPR 2; with a zero basis the
            // crumbs are not in a shrink phase at all until the title is at
            // its 12rem floor.
            'm-0 min-w-[12rem] flex-1 truncate whitespace-nowrap text-text-primary',
            // 2.437.0: compact/collapsed density — the sm scale's 14/600 heading.
            sm ? 'text-sm font-semibold leading-5' : lg ? 'text-[20px] font-bold leading-7 tracking-[-0.01em]' : 'text-[20px] font-semibold leading-7',
          )}
        >
          {title}
        </h1>
      )}
      {after}
    </div>
  );
}

function ScopeHeaderInline({
  breadcrumbs,
  title,
  titleHint,
  controls,
  controlsMenu,
  controlsCollapseAt,
  controlsLabel,
  link,
  menu,
  menuLabel,
  linkStyle,
  tabs,
  activeTab,
  onTabChange,
  tabSize,
  titleSize = 'md',
  density: densityProp,
  collapsed = false,
  onToggleCollapsed,
  className,
  'data-testid': testId = 'scope-header',
}: ScopeHeaderProps) {
  const crumbs = breadcrumbs ?? [];
  const density = useDensityForm(densityProp);
  const dense = density === 'compact' || collapsed;
  const folded = collapsed;
  const last = crumbs.length > 0 ? crumbs[crumbs.length - 1]!.label : undefined;
  const name = title ?? last ?? 'this scope';
  const hasTabs = !!tabs && tabs.length > 0;
  const currentTab = hasTabs ? (tabs!.some((t) => t.id === activeTab) ? activeTab! : tabs![0]!.id) : undefined;
  const hasControls = controls != null && controls !== false;
  const hasRight = hasControls || !!link || (!!menu && menu.some((s) => s.items.length > 0));
  const lg = titleSize === 'lg';

  // Squeeze step (a) (2.407.2): the controls leave the row when they no
  // longer fit their shrunken box, the trail would drop under its minimum,
  // or the row is under `controlsCollapseAt`.
  //
  // 2.407.5 — the rule, in both directions, on load and on every row resize:
  // inline while the row's wanted width (`inlineRowWanted`) fits with 2px to
  // spare, collapsed otherwise. Before, the expand threshold was fixed at the
  // moment of collapse (width + the shortfall + the trail's shortfall below
  // its minimum, the last counted twice) and never re-derived: collapsed, the
  // controls are not in the row, so nothing re-measured them and one
  // over-estimate latched "Filters ▾" until a reload. Now the controls'
  // natural width is remembered from the last inline measurement (or taken
  // from a hidden copy when there is none — a first render already under
  // `controlsCollapseAt`) and the wanted width is re-derived from the
  // collapsed row on every resize.
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  // Collapsed with no inline measurement: draw an invisible copy to measure.
  const [ghost, setGhost] = useState(false);
  // From the last inline measurement: the controls' natural width and the
  // row's wanted width; and the row width that last collapsed them (never
  // expand at or under it, so the two states cannot alternate at one width).
  const fit = useRef<{ controls: number | null; wanted: number | null; collapsedAt: number }>({ controls: null, wanted: null, collapsedAt: 0 });
  // 2.407.6: the controls were just put back. Their first inline layout is
  // not judged — fonts and flex settle first — so the check waits for the
  // next animation frame (or the next row resize, whichever comes first).
  const settling = useRef(false);
  const settleFrame = useRef<number | null>(null);
  const measureRef = useRef<() => void>(() => {});
  const measure = useCallback(() => {
    const row = rowRef.current;
    if (!row || !hasControls) return;
    const width = row.clientWidth;
    if (width <= 0) return; // unmeasured (jsdom, display:none)
    const underFloor = typeof controlsCollapseAt === 'number' && width < controlsCollapseAt;
    const trail = row.querySelector<HTMLElement>(`[data-testid="${testId}-trail"]`);
    if (controlsCollapsed) {
      if (underFloor) return;
      let controlsWidth = fit.current.controls;
      if (controlsWidth == null) {
        const copy = row.querySelector<HTMLElement>('[data-scope-controls-ghost] > *');
        if (!copy) { setGhost(true); return; }
        controlsWidth = naturalWidth(copy);
        fit.current.controls = controlsWidth;
        setGhost(false);
      }
      // Re-derived from the collapsed row with the controls put back, and
      // never below what the last over-full inline row wanted (same sum).
      const wanted = Math.max(inlineRowWanted(row, trail, controlsWidth), fit.current.wanted ?? 0);
      if (width > fit.current.collapsedAt && width >= wanted + FIT_MARGIN_PX) {
        settling.current = true;
        setControlsCollapsed(false);
      }
      return;
    }
    if (underFloor) {
      fit.current.collapsedAt = width;
      setControlsCollapsed(true);
      return;
    }
    if (settling.current) {
      if (settleFrame.current == null && typeof requestAnimationFrame === 'function') {
        settleFrame.current = requestAnimationFrame(() => {
          settleFrame.current = null;
          settling.current = false;
          measureRef.current();
        });
      } else if (typeof requestAnimationFrame !== 'function') {
        settling.current = false;
      }
      if (settling.current) return;
    }
    const box = row.querySelector<HTMLElement>('[data-scope-controls]');
    const right = row.querySelector<HTMLElement>(`[data-testid="${testId}-right"]`);
    const controlsWidth = box ? naturalWidth(box) : 0;
    if (controlsWidth > 0) fit.current.controls = controlsWidth;
    // 2.407.6: one sum. The wanted width the collapse records is the one
    // the re-expand re-derives (`inlineRowWanted`); the deficit is it less
    // the row. The boxes' own overflows are kept as guards — each is a
    // part of that same shortfall a box already shows — at the same margin.
    const wanted = inlineRowWanted(row, trail, controlsWidth);
    const deficit = wanted - width;
    const overflow = box ? box.scrollWidth - box.clientWidth : 0;
    // 2.407.4: the whole right cluster too — a ⋯ or a link pushed past it.
    const rightOverflow = right ? right.scrollWidth - right.clientWidth : 0;
    const short = trail ? inlineTrailMinimum(trail) - trail.clientWidth : 0;
    if (Math.max(deficit, overflow, rightOverflow, short) > FIT_MARGIN_PX) {
      fit.current.wanted = wanted;
      fit.current.collapsedAt = width;
      setControlsCollapsed(true);
      return;
    }
    // Inline and fitting on a settled frame: stable, so the last collapse
    // no longer blocks a re-expand at its width.
    fit.current.wanted = null;
    fit.current.collapsedAt = 0;
  }, [hasControls, controlsCollapseAt, controlsCollapsed, testId]);

  useLayoutEffect(() => {
    measureRef.current = measure;
    measure();
  }, [measure, ghost]);

  // One observer for the row's life: re-subscribing on every state change
  // delivered an initial observation in the very frame the controls came
  // back, which is the transient 2.407.6 stops judging.
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      settling.current = false;
      measureRef.current();
    });
    ro.observe(row);
    return () => {
      ro.disconnect();
      if (settleFrame.current != null && typeof cancelAnimationFrame === 'function') cancelAnimationFrame(settleFrame.current);
      settleFrame.current = null;
    };
  }, []);

  return (
    <div
      ref={rowRef}
      data-testid={testId}
      data-variant="inline"
      {...(hasControls ? { 'data-controls': controlsCollapsed ? 'collapsed' : 'inline' } : {})}
      data-title-size={titleSize}
      data-density={density}
      data-collapsed={folded ? 'true' : 'false'}
      {...(tabSize ? { 'data-tab-size': tabSize } : {})}
      className={cn('flex min-w-0 flex-nowrap items-center gap-4 px-[var(--ui-page-gutter,1.5rem)]', dense ? 'h-10' : 'h-12', className)}
    >
      <InlineTrail crumbs={crumbs} title={title} titleHint={titleHint} lg={lg} sm={dense} testId={testId}
        after={onToggleCollapsed ? <HeaderCollapseToggle collapsed={folded} onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} /> : undefined} />
      {hasTabs && (
        <Tabs
          items={scopeTabItems(tabs!, testId)}
          value={currentTab!}
          onValueChange={(id) => onTabChange?.(id)}
          variant="underline"
          size="md"
          badgeStyle="plain"
          indicator="bar"
          {...(tabSize === 'md' ? { indicatorWeight: 3 as const } : {})}
          // The tabs fill the row's height so the selected tab's bar sits on
          // the row's bottom edge (the host's rule); no rule of their own.
          itemClassName={cn('h-full py-0', tabSize === 'md' ? 'gap-0 px-2 text-sm' : 'gap-0')}
          aria-label={`${name} views`}
          data-testid={`${testId}-tabs`}
          className="shrink-0 items-stretch self-stretch after:hidden"
        />
      )}
      {hasRight && (
        // min-w-0 + shrink-[100] (2.407.2): this cluster gives up width before
        // the trail (shrink 1); only the controls inside it shrink. Collapsed
        // (2.407.4) it is shrink-0: Filters ▾ and ⋯ are all that is left, and
        // they stay inside the row's padding.
        <div
          className={cn('relative flex flex-nowrap items-center gap-3', controlsCollapsed || folded ? 'shrink-0' : 'min-w-0 shrink-[100]')}
          data-testid={`${testId}-right`}
        >
          <RightGroup
            controls={controls}
            controlsMenu={controlsMenu}
            controlsLabel={controlsLabel}
            controlsMode={controlsCollapsed || folded ? 'collapsed' : 'shrink'}
            ghost={controlsCollapsed && !folded && ghost}
            link={link}
            menu={menu}
            menuLabel={menuLabel}
            title={name}
            testId={testId}
            linkStyle={linkStyle}
          />
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
  density: densityProp,
  collapsed = false,
  onToggleCollapsed,
  className,
  'data-testid': testId = 'scope-header',
}: ScopeHeaderProps) {
  const density = useDensityForm(densityProp);
  const dense = density === 'compact' || collapsed;
  const folded = collapsed;
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
  // Compact/collapsed (2.437.0): people are avatars on the right, stats
  // inline, the description in the title's info popover.
  const namesLine = !dense && peopleStyle === 'names' && groups.length > 0;
  const inlinePeople = !dense && peopleStyle === 'inline' && groups.length > 0;
  const peopleInRight = !namesLine && !inlinePeople;
  const lg = !dense && titleSize === 'lg';
  const statsBelow = !dense && statsPlacement === 'below';
  const describable = description != null && description !== false;
  const hasDescription = !dense && describable;
  const statsNode = statItems.length > 0 ? (
    <MetaLine
      items={statItems}
      size="sm"
      tone="secondary"
      className={cn('min-w-0', statsBelow ? 'text-[15px]' : 'text-[14px]')}
      data-testid={`${testId}-stats`}
    />
  ) : null;
  const hasTabs = !!tabs && tabs.length > 0;
  const currentTab = hasTabs ? (tabs!.some((t) => t.id === activeTab) ? activeTab! : tabs![0]!.id) : undefined;

  const statusNode = status ? (
    <StatusPill label={status.label} state={status.tone ?? 'info'} variant={dense ? 'text' : 'label'} className="shrink-0" data-testid={`${testId}-status`} />
  ) : null;
  const tabsNode = hasTabs ? (
    <Tabs
      items={scopeTabItems(tabs!, testId)}
      value={currentTab!}
      onValueChange={(id) => onTabChange?.(id)}
      variant="underline"
      size={dense ? 'sm' : 'md'}
      badgeStyle="plain"
      {...(tabSize === 'md' ? { indicator: 'bar' as const, indicatorWeight: 3 as const } : {})}
      // lg: the count sits 10px after its label ("Work 11"), as the
      // Initiatives mockup draws it — the button's own 6px gap is dropped
      // and only the badge's margin remains. tabSize="md" (2.392.0) is
      // the same 14px/10px at any title size (15px before 2.441.3: a tab is a control), with 8px side padding,
      // 28px between tabs and the first label 4px in from the title.
      {...(dense
        ? {}
        : tabSize === 'md'
          ? { itemClassName: 'gap-0 pb-4 pl-1 pr-3 pt-2 text-sm' }
          : tabSize === 'sm'
            ? {}
            : lg ? { itemClassName: 'gap-0 text-sm' } : {})}
      aria-label={`${title} views`}
      className={cn(
        // host: the row sits on the host's rule (-mb-px) and draws none of
        // its own. inset: the row's own rule, inside the header's gutter.
        tabsRule === 'inset' ? '' : tabSize === 'md' ? '-mb-px after:hidden' : '-mb-px border-b-0',
        tabSize === 'md' && !dense && 'gap-7',
        dense
          ? 'mt-1'
          : inlinePeople
            ? (tabSize === 'md' ? 'mt-5' : 'mt-4')
            : lg ? (hasDescription || namesLine ? 'mt-5' : 'mt-2') : hasDescription || namesLine ? 'mt-3' : 'mt-1',
      )}
    />
  ) : null;
  const rightGroup = <RightGroup controls={controls} link={link} menu={menu} menuLabel={menuLabel} title={title} testId={testId} linkStyle={linkStyle} />;

  // Collapsed (2.437.0): the trail row only, the title folded into it.
  if (folded) {
    const trail = foldTitleIntoTrail(breadcrumbs, title);
    return (
      <div data-testid={testId} data-title-size={titleSize} data-density={density} data-collapsed="true" className={cn('flex min-w-0 flex-col gap-1 px-[var(--ui-page-gutter,1.5rem)] pt-2', !hasTabs && 'pb-2', className)}>
        <div className="flex h-7 min-w-0 items-center gap-2">
          {trail.length > 0 && <Breadcrumbs aria-label={`${title ?? "Scope"} location`} items={trail} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />}
          {statusNode}
          {onToggleCollapsed && <HeaderCollapseToggle collapsed onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} />}
          <div className="ml-auto flex shrink-0 items-center gap-3">{rightGroup}</div>
        </div>
        {tabsNode}
      </div>
    );
  }

  return (
    <div data-testid={testId} data-title-size={titleSize} data-density={density} data-collapsed="false" {...(tabSize ? { 'data-tab-size': tabSize } : {})} {...(hasTabs && tabsRule === 'inset' ? { 'data-tabs-rule': 'inset' } : {})} className={cn('flex min-w-0 flex-col gap-1.5 px-[var(--ui-page-gutter,1.5rem)] pt-3', dense && 'gap-1 pt-2', lg && 'gap-0 pt-4', !hasTabs && (lg ? 'pb-4' : dense ? 'pb-2' : 'pb-3'), className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumbs aria-label={`${title ?? "Scope"} location`} items={breadcrumbs} separator="›" maxItems={5} className="min-w-0" data-testid={`${testId}-crumbs`} />
      )}
      <div className={cn('flex min-w-0 items-center gap-x-4 gap-y-2', dense ? 'h-7 flex-nowrap' : 'flex-wrap')}>
        <div className="flex min-w-0 items-center gap-3">
          <h1
            className={cn(
              'm-0 min-w-0 truncate text-text-primary',
              dense ? 'text-sm font-semibold leading-5' : lg ? 'text-[28px] font-bold leading-9 tracking-[-0.01em]' : 'text-[20px] font-semibold leading-7',
            )}
            title={title}
            data-testid={`${testId}-title`}
          >
            {title}
          </h1>
          {statusNode}
          {dense && describable && <HeaderDescriptionInfo title={title} description={description} data-testid={`${testId}-description`} />}
          {onToggleCollapsed && <HeaderCollapseToggle collapsed={false} onToggle={onToggleCollapsed} data-testid={`${testId}-collapse-toggle`} />}
        </div>
        {!statsBelow && statsNode}
        <div className={cn('ml-auto flex shrink-0 items-center', linkStyle === 'button' ? 'gap-3' : 'gap-5')}>
          {peopleInRight && groups.map((g) => (
            <div key={g.label} className="flex items-center gap-2" data-testid={`${testId}-people-${g.label.toLowerCase()}`}>
              <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">{g.label}</span>
              <PresenceAvatars users={g.people} size={dense ? 24 : 26} maxVisible={4} />
            </div>
          ))}
          {rightGroup}
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
      {tabsNode}
    </div>
  );
}

export default ScopeHeader;
