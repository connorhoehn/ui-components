import { type ReactNode } from 'react';
import { type BreadcrumbItem } from '../shared/Breadcrumbs';
import { type StatusPillTone } from '../shared/StatusPill';
import { type PresenceUser } from '../shared/PresenceAvatars';
import { type DropdownMenuSection } from '../shared/DropdownMenu';
/**
 * A tab's attention dot. `true` is the brand dot ("something new"); a tone
 * says what kind of attention — "Activity •" when a tier is behind.
 */
export type ScopeHeaderTabDot = 'warning' | 'danger' | 'info' | true;
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
     * **People & connections**", 18px semibold, or 20px bold at
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
    status?: {
        label: string;
        tone?: StatusPillTone;
    } | null;
    /** "18 / 52 points delivered". Not drawn when `total` is not above zero. */
    progress?: ScopeHeaderProgress | null;
    /** "$1.46 spent". Not drawn when absent or not a finite number. */
    spentUsd?: number | null;
    /** Further stats, already worded by the host. Falsy entries are skipped. */
    stats?: Array<ReactNode | null | undefined | false>;
    /** Labelled avatar groups — `[{ label: 'Owner', people }]`. Empty groups are dropped. */
    people?: ScopeHeaderPeopleGroup[];
    /** One link after the people ("the repository"). */
    link?: {
        label: string;
        href: string;
        icon?: ReactNode;
    } | null;
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
export declare function formatSpend(usd: number): string;
export declare function ScopeHeader(props: ScopeHeaderProps): import("react").JSX.Element;
/**
 * The narrowest the inline trail may be before the controls leave the row:
 * the first crumb whole (inside its cap), "…", a readable last crumb and
 * the title at its 12rem floor. Exported for tests.
 */
export declare function inlineTrailMinimum(trail: HTMLElement): number;
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
export declare function inlineRowDeficit(row: HTMLElement, trail: HTMLElement | null): number;
/**
 * The inline row's wanted width, px, padding included (2.407.5), with the
 * controls inline at `controlsWidth`: the trail at its content's width
 * (`inlineTrailWanted`), the tabs, the right cluster's other items at their
 * natural widths — the ⋯ once, the collapsed "Filters ▾" never — and every
 * gap. Measurable in either state, so the collapse can be undone: while
 * collapsed the controls are not in the row, and their width comes from the
 * last inline measurement or a hidden copy. Exported for tests.
 */
export declare function inlineRowWanted(row: HTMLElement, trail: HTMLElement | null, controlsWidth: number): number;
export default ScopeHeader;
//# sourceMappingURL=ScopeHeader.d.ts.map