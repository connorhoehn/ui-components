import { AnchorHTMLAttributes } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { Component } from 'react';
import { ComponentType } from 'react';
import { Context } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { DragEvent as DragEvent_2 } from 'react';
import { DragEventHandler } from 'react';
import { ElementType } from 'react';
import { ErrorInfo } from 'react';
import { FocusEvent as FocusEvent_2 } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX } from 'react';
import { JSXElementConstructor } from 'react';
import { KeyboardEvent as KeyboardEvent_2 } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { MouseEventHandler } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { Ref } from 'react';
import { RefAttributes } from 'react';
import { RefCallback } from 'react';
import { RefObject } from 'react';
import { SelectHTMLAttributes } from 'react';
import { SVGProps } from 'react';
import { TdHTMLAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';

/** The full-height coloured edge of a card (`<Card className="flex overflow-hidden">`). */
export declare function AccentStripe({ accent, className, 'data-testid': testId }: AccentStripeProps): JSX.Element;

export declare interface AccentStripeProps {
    accent?: DataAccent;
    /** Stripe thickness in px class terms; default the 5px card edge. */
    className?: string;
    'data-testid'?: string;
}

export declare function AccessNotice({ tone, title, body, action, className, 'data-testid': testId, }: AccessNoticeProps): JSX.Element;

export declare interface AccessNoticeAction {
    label: string;
    onClick?: () => void;
    /** Renders a real link instead of a button. */
    href?: string;
}

export declare interface AccessNoticeProps {
    tone?: AccessNoticeTone;
    title: string;
    body?: ReactNode;
    action?: AccessNoticeAction | null;
    className?: string;
    'data-testid'?: string;
}

export declare type AccessNoticeTone = 'warning' | 'info' | 'danger';

/**
 * A fact column at the row's right. Widths come from a fixed scale so cells
 * line up across rows: xs 64, sm 88, md 120, lg 152, xl 184 (px).
 */
export declare interface ActionRowColumn {
    id: string;
    width: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Where the cell's content sits inside its width. Default `start`. */
    align?: 'start' | 'end';
    /** A 1px rule before this column. Default: every column after the first. */
    divider?: boolean;
    /** Screen-reader name for the column's cells, e.g. "Assignee". */
    label?: string;
}

export declare interface ActionRowItem {
    id: string;
    title: string;
    /** One line under the title. Truncates; absent, no second line. */
    description?: ReactNode;
    /** Right-aligned facts, already worded — "Layla Hassan · 5 points". */
    meta?: ReactNode;
    /** A link target. Without it the row is a button calling `onOpen`. */
    href?: string;
    disabled?: boolean;
    /** Tooltip on a disabled row: why it cannot be opened. */
    disabledReason?: string;
    /** Content per `ActionRowListProps.columns` id. Since 2.392.0. */
    cells?: Record<string, ReactNode>;
    /** Before the title — a toned `Chip` ("Blocked"). Since 2.392.0. */
    leading?: ReactNode;
    /** This row's tint; overrides the list's `tone`. Since 2.392.0. */
    tone?: ActionRowTone;
    /** This row's edge accent; overrides the list's `accent`. Since 2.392.0. */
    accent?: 'none' | 'bar';
    /**
     * A worded target in place of the chevron — "Open" draws "Open →" in the
     * primary colour. Not a separate control: the whole row is still the
     * target. Overrides the list's `action`. Since 2.392.0.
     */
    action?: string;
    /**
     * The row's own controls — quick-action buttons — after the row's button,
     * outside it: their own tab stops (row, then these) and their presses never
     * open the row. Wrap under the title below a 35rem row. Since 2.509.0.
     */
    trailing?: ReactNode;
}

export declare function ActionRowList({ items, onOpen, footer, emptyLabel, columns, tone, accent, striped, action, size: sizeProp, 'aria-label': ariaLabel, className, 'data-testid': testId, }: ActionRowListProps): JSX.Element | null;

export declare interface ActionRowListProps {
    items: ActionRowItem[];
    /** A row was activated (click, Enter, Space). Also called for `href` rows. */
    onOpen?: (item: ActionRowItem) => void;
    /** Under the list — normally a link, "See all 11 work items →". */
    footer?: ReactNode;
    /** Shown instead of the rows when `items` is empty. Absent, nothing renders. */
    emptyLabel?: ReactNode;
    /**
     * Fact columns at every row's right, declared once so their edges line up
     * down the list; each item fills `cells`. Since 2.392.0.
     */
    columns?: ActionRowColumn[];
    /**
     * Tints every row — `warning` for "Needs attention". A toned list drops the
     * grey rules (the tint separates the rows) and rounds the rows' right
     * corners. Default `neutral`: no tint, ruled. Since 2.392.0.
     */
    tone?: ActionRowTone;
    /** `bar`: a 3px bar in the row's tone on its left edge. Default `none`. Since 2.392.0. */
    accent?: 'none' | 'bar';
    /**
     * Zebra rows: every second neutral row (the 2nd, 4th, …) sits on
     * `surface-inset`, the tint `DataTable striped` uses, so a striped list and a
     * striped table beside it read as one system. The first row stays on the
     * page's own surface, so the list opens flush rather than on a band.
     *
     * Hover (`surface-hover`) is darker than the stripe, so the row under the
     * pointer stays unambiguous on a striped row too; a disabled row keeps the
     * stripe and its muted text, with no hover fill. A toned row keeps its tone
     * (semantic tones always win over the stripe). The keyboard focus ring is
     * unchanged. Works with and without `columns`. Emits `data-striped` on the
     * list and `data-stripe` on each striped row. Since 2.502.0 the stripe is
     * `surface-inset` (it was `surface-panel` on odd rows and an opaque
     * `surface` on even ones, which painted white over a tinted host).
     *
     * Default `true` since 2.504.0 (was `false`); pass `striped={false}` for a
     * ruled-only list.
     */
    striped?: boolean;
    /** Every row's worded target in place of the chevron ("Open"). Since 2.392.0. */
    action?: string;
    /**
     * Type step. `md` (default): the Initiatives v2 mockup's 15px rows; with `columns`, the house 14/12 scale (14px title and cells, 12px description and meta; 2.515.0, was 15/13). `sm`
     * (since 2.429.0): the app's body step — 14px medium titles and cells,
     * 12px descriptions and meta, a 14px semibold action (`T size="sm"` /
     * `T size="xs"`) — so a list in a tabbed pane reads like the rails and
     * lists beside it.
     */
    size?: 'md' | 'sm';
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/**
 * The person cell of an `ActionRowList` column — a 28px avatar then the name,
 * truncating inside the column's width. Since 2.392.0.
 */
export declare function ActionRowPerson({ name, avatarUrl, size }: ActionRowPersonProps): JSX.Element;

export declare interface ActionRowPersonProps {
    name: string;
    /** A photo; initials when absent (or when it fails to load). */
    avatarUrl?: string;
    /** Avatar diameter in px. Default 28. */
    size?: number;
}

/** `ActionRowList`: a short ruled list of things to open next. */
export declare interface ActionRowsLeaf extends Omit<ActionRowListProps, 'className' | 'footer'> {
    kind: 'list';
    variant: 'action-rows';
    /** "See all 11 work items →". */
    footer?: ButtonLeaf;
}

/** Row tint. `neutral` (and absent) draws none. */
export declare type ActionRowTone = Exclude<Tone, 'neutral'> | 'neutral';

export declare function ActiveCallBanner({ open, onJoin, onDismiss, lobbyLabel, elapsedMs, participants, participantCount, loading, }: ActiveCallBannerProps): JSX.Element | null;

/** Thin participant shape — same contract as ResumeCallParticipant:
 *  caller MUST pass safeDisplayName output, never a raw UUID. */
export declare interface ActiveCallBannerParticipant {
    userId: string;
    name: string;
    avatarUrl?: string;
}

export declare interface ActiveCallBannerProps {
    /** Visibility — when false nothing renders. */
    open: boolean;
    /** Join button → consumer starts its join flow (may be async; flip
     *  `loading` while pending). */
    onJoin: () => void | Promise<void>;
    /** Dismiss (X / "Not now") → consumer hides and typically remembers
     *  the dismissal for this callId so the banner doesn't re-appear. */
    onDismiss: () => void;
    /** Human-readable lobby label shown in the banner title. */
    lobbyLabel: string;
    /** Elapsed ms at mount — live display advances on a local 1s tick,
     *  so the parent never re-renders to move the clock. 0/absent hides
     *  the duration chip (status replies without startedAt). */
    elapsedMs?: number;
    /** Participants currently in the call. Names pre-resolved. */
    participants: ActiveCallBannerParticipant[];
    /** Overrides the "N in call" count when the caller knows a truer
     *  number than participants.length (e.g. server participantCount
     *  when some names couldn't be resolved). */
    participantCount?: number;
    /** True while the join attempt is in flight. */
    loading?: boolean;
}

export declare const activeNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-primary bg-primary/8 text-text-primary no-underline cursor-pointer";

export declare const activeNavItemStyle: CSSProperties;

/**
 * The preset the work-activity canvas wears: grey lines on the near-white
 * surface the nodes already sit on, rippling slowly, never competing with them.
 * Exported so a host can match it on a surface of its own.
 *
 * `edgeFade` is low because this grid is the SURFACE of the section, not a
 * picture in it: it has to reach the sides of a panel that is usually much
 * wider than it is tall. What is left is a soft dimming toward the corners
 * (about a third of the way to white), enough that the box still has a
 * centre without the grid ending before the box does.
 */
export declare const ACTIVITY_RIPPLE_GRID: RippleGridBackgroundProps;

/**
 * The same grid for a DARK surface. `lightMode` paints an opaque white ground
 * — on a dark page that is a white box with a grid in it — so this variant
 * uses the additive branch instead: dim grey lines on a transparent ground,
 * and the surface underneath stays whatever the theme made it. Same cell
 * size, same ripple, same edge fade, so switching theme changes the ink and
 * nothing else.
 */
export declare const ACTIVITY_RIPPLE_GRID_DARK: RippleGridBackgroundProps;

/** "just now", "5m ago", "3h ago", "2d ago", else the date. */
export declare function activityAge(at: string | number | Date, now?: number): string;

declare interface ActivityEvent {
    id: string;
    eventType: string;
    detail: Record<string, unknown>;
    timestamp: string;
    userId?: string;
    displayName?: string;
    color?: string;
    source: 'local' | 'remote';
}

export declare function ActivityFeed({ items, visibleCount, rotateMs, staggerMs, kindColors, className, 'data-testid': testId, 'data-activity-mode': mode, }: ActivityFeedProps): JSX.Element;

export declare interface ActivityFeedItem {
    id: string;
    /** Display name of the person who performed the action, e.g. "Alex Chen". */
    actor: string;
    /** Verb phrase, e.g. "completed". */
    action: string;
    /** Jira-style ticket ID badge, e.g. "K8S-182". */
    ticketId?: string;
    /** Short description/title of the work item. */
    subject: string;
    /** Human-readable relative timestamp, e.g. "2m ago". */
    timeLabel?: string;
    /** Controls the type-dot color. */
    kind?: ActivityKind;
}

export declare interface ActivityFeedProps {
    items: ActivityFeedItem[];
    /** Number of items visible at once (default: 3). */
    visibleCount?: number;
    /** Auto-rotation interval in ms (default: 4200). Set 0 to disable. */
    rotateMs?: number;
    /** Delay before the first rotation fires, for stagger between sibling feeds (ms). */
    staggerMs?: number;
    /** Override dot colors per kind. Merged over the built-in palette. */
    kindColors?: Record<string, string>;
    className?: string;
    /** On the feed's root (since 2.515.9), which also carries `data-activity-feed`. */
    'data-testid'?: string;
    /** Set by `WrappedActivityPanel`: `ticker` or `history` (`data-activity-mode`). */
    'data-activity-mode'?: string;
}

/** A lightning bolt: activity, "things are happening". */
export declare function ActivityIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

/** `WorkActivityList`: history, newest first. */
export declare interface ActivityLeaf extends Omit<WorkActivityListProps, 'className'> {
    kind: 'activity';
}

export declare function ActivityResumeChip({ label, status, tone, at, now, onResume, 'aria-label': ariaLabel, className, 'data-testid': testId }: ActivityResumeChipProps): JSX.Element;

export declare interface ActivityResumeChipProps {
    /** What ran ("Create artwork"). */
    label: string;
    /** Where it stands ("Completed", "Waiting for review"). */
    status: string;
    /** Colour of the status dot. Default `neutral`. */
    tone?: ToneOrAlias;
    /** When it last changed (ISO string, epoch ms or Date): drawn as "2m ago". */
    at?: string | number | Date;
    /** Clock for the relative time; tests pin it. Default `Date.now()`. */
    now?: number;
    /** Re-populate the page's deck with this activity's next step. */
    onResume: () => void;
    /** Accessible name. Default "Resume <label> · <status>". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** Data and authority belong to the host; this component only presents supplied items. */
export declare function ActivityTicker(props: ActivityTickerProps): JSX.Element;

export declare interface ActivityTickerItem {
    category: string;
    label: string;
    summary: string;
    detail: ReactNode;
    icon?: ReactNode;
}

export declare interface ActivityTickerPreferences {
    hidden: boolean;
    dimmed: boolean;
    paused: boolean;
    quiet: boolean;
    speed: 'slow' | 'fast';
    categories: string[];
}

export declare interface ActivityTickerProps {
    items: readonly ActivityTickerItem[];
    categories: readonly {
        id: string;
        label: string;
    }[];
    /** Explicitly label host-supplied demonstration data. */
    sample?: boolean;
    /** The host owns the two dock locations; the grip also moves by keyboard click. */
    placement?: 'header' | 'footer';
    onPlacementChange?: (placement: 'header' | 'footer') => void;
    onMoveStart?: () => void;
    onMoveEnd?: () => void;
    activeCall?: boolean;
    /** Scope this key to the current identity/context; null never reads shared storage. */
    preferencesKey?: string | null;
    preferences?: ActivityTickerPreferences;
    onPreferencesChange?: (preferences: ActivityTickerPreferences) => void;
    preferencesHint?: ReactNode;
    renderActions?: (item: ActivityTickerItem | undefined, close: () => void) => ReactNode;
    'data-testid'?: string;
}

/**
 * The agent surfaces' sky: white through the two indigos `--color-primary`
 * wears at night. One constant, used by the lab shell, the compute pane and the
 * chat console, so a loop looks like itself wherever it is showing.
 */
export declare const AGENT_PARTICLE_COLORS: readonly ["#ffffff", "#c7d2fe", "#a5b4fc"];

/** Dot colour per status. `running` pulses unless the reader asked for less motion. */
export declare const AGENT_TASK_STATUS_DOT: Record<AgentTaskStatus, string>;

/** The words for each status, as the strip and the card print them. */
export declare const AGENT_TASK_STATUS_LABELS: Record<AgentTaskStatus, string>;

export declare function AgentTaskCard({ title, status, statusLabel, description, phase, percent, startedLabel, actions, className, 'data-testid': testId, }: AgentTaskCardProps): JSX.Element;

export declare interface AgentTaskCardProps {
    /** "Build risk outlook slide". */
    title: string;
    status: AgentTaskStatus;
    /** Overrides the status pill's word ("Editing slide 4" stays in `phase`). */
    statusLabel?: string;
    /** The request, or what the agent is working from. */
    description?: ReactNode;
    /** What it is doing now — "Editing slide 4". */
    phase?: string;
    /** A REAL percentage, 0–100. Omit when the run reports none: no bar is drawn. */
    percent?: number;
    /** "Started 2m ago" — the host formats it, since it owns the clock. */
    startedLabel?: string;
    /** Buttons under the card body — Open run, Pause, Stop. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
export declare type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';

export declare function ApiDegradedBanner({ health }: ApiDegradedBannerProps): JSX.Element | null;

declare interface ApiDegradedBannerProps {
    health: ApiHealthSnapshot;
}

declare interface ApiHealthCheck {
    /** 'degraded': the check passed but reports reduced service (the pod stays up). */
    status: 'ok' | 'error' | 'degraded' | string;
    latencyMs?: number;
    error?: string;
    /** The check's own words, when it gave a string (`details` on the wire). */
    detail?: string;
}

declare interface ApiHealthSnapshot {
    status: ApiHealthStatus;
    checks: Record<string, ApiHealthCheck>;
    /** Names of failing dependencies (status !== 'ok'). Empty when healthy or unknown. */
    failing: string[];
}

declare type ApiHealthStatus = 'ok' | 'degraded' | 'unknown';

/** The folded primary rail's width: the 44px strip every folding rail draws. */
export declare const APP_SHELL_FOLDED_RAIL_WIDTH = 44;

/** The product mark and name at the left of the app header; a link home when `href` is given. */
export declare function AppBrand({ mark, name, secondary, href, onClick, size, 'aria-label': ariaLabel, className, 'data-testid': testId, }: AppBrandProps): JSX.Element;

export declare interface AppBrandProps {
    /** The mark: an `<img>`, an svg, or a glyph. Drawn in a fixed square (28px at md, 24px at sm). */
    mark?: ReactNode;
    /** Product name. */
    name: ReactNode;
    /** A second, quieter label after the name ("Studio", a workspace). */
    secondary?: ReactNode;
    /** Link home. Without it the brand is not interactive. */
    href?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    /** `md` (default) matches the 53px app header; `sm` a compact header. */
    size?: AppBrandSize;
    /** Accessible name of the home link. Default: "<name> home" when name is a string. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

export declare type AppBrandSize = 'sm' | 'md';

/**
 * Show one texture map flat on the mesh, or (`lit`) put the model back.
 *
 * Every material's original textures and factors are stashed once; a channel
 * then sets `baseColorTexture` to the channel's map (an external URL through
 * `el.createTexture`, else the material's own embedded map), base colour
 * factor white, metallic 0, roughness 1, and clears the normal,
 * metallic-roughness and emissive maps so nothing else shades it. A material
 * without that map shows the channel's constant (its factor) instead. `lit`
 * restores the stash. Safe to call repeatedly in any order.
 */
export declare function applyModelChannel(el: ModelViewerElementLike | null | undefined, channel: ModelChannelView, channels?: ModelChannels): Promise<void>;

/**
 * AppShell wraps its children in a ToastProvider by default.
 * Pass `toastRegion={null}` to opt out (e.g. parent already has one).
 */
export declare function AppShell({ sidebar, header, subheader, children, toastRegion, loading, apiDegraded, commandPalette, className, sidebarWidth, headerHeight, subheaderHeight, subheaderInset, contentPadding, sidebarClassName, sidebarLabel, sidebarTestId, subheaderTestId, sidebarFullHeight, layout, sidebarFold, }: AppShellProps): JSX.Element;

export declare interface AppShellProps {
    /** Slot: full-height left sidebar (CollapsibleSidebar etc.) */
    sidebar?: ReactNode;
    /**
     * Slot: the header row's content. The shell draws the row itself — a
     * flex row of `headerHeight`, padded, bordered, sticky — so its height is
     * pinned rather than derived from the tallest control in it. Every offset
     * below (the sidebar's top, the body's minimum height) reads that one
     * number, so a taller control can never move the anchors.
     */
    header: ReactNode;
    /**
     * Slot: a second row of chrome under the header — a section band. Sticky
     * with the header, full window width, and the sidebar hangs beneath both.
     * Rendered only when present; its height counts only then.
     */
    subheader?: ReactNode;
    /** Page content */
    children: ReactNode;
    /** Slot: override default ToastProvider region (pass null to suppress) */
    toastRegion?: ReactNode | null;
    /** When truthy, renders a full-screen loading overlay */
    loading?: boolean | ReactNode;
    /** When truthy, renders an API-degraded banner below the header */
    apiDegraded?: ReactNode;
    /**
     * Slot: a global command palette (e.g. `<CommandPalette />`). Rendered
     * once at the shell level so any page can open it via `useCommandPalette`.
     * Wrap the AppShell in `<CommandPaletteProvider>` so the palette and the
     * pages inside share the same registry.
     */
    commandPalette?: ReactNode;
    className?: string;
    /** Width of the sidebar slot in px (default 260) */
    sidebarWidth?: number;
    /** The header row's height in px (default 53). Also published as `--app-shell-header-h`. */
    headerHeight?: number;
    /** The subheader row's height in px (default 36), counted only when `subheader` is present. */
    subheaderHeight?: number;
    /**
     * Left inset of the subheader's content in px, so its tabs can share a
     * left edge with the header's own nav rather than with whatever the
     * sidebar's width happens to be. Default: the header's padding.
     */
    subheaderInset?: number;
    /** Padding around the routed page. `none` for a full-bleed surface. Default `md`. */
    contentPadding?: 'none' | 'md';
    /** Classes for the sidebar column — its padding when open vs folded, say. */
    sidebarClassName?: string;
    /** Accessible name of the sidebar landmark. Default "App sidebar". */
    sidebarLabel?: string;
    sidebarTestId?: string;
    subheaderTestId?: string;
    /**
     * The sidebar runs the full window height and the header row starts beside
     * it (2.386.0) — the collapsed icon strip's layout, where the strip's first
     * button sits in the header row. Default false: the header spans the window
     * and the sidebar hangs below the chrome.
     */
    sidebarFullHeight?: boolean;
    /**
     * How the shell sizes against the window (since 2.504.0).
     *
     * - `document` (default, back-compat): the shell is at least the window's
     *   height and the document scrolls; the chrome is sticky. Stacked pages
     *   scroll like a web page.
     * - `fill` (**recommended for portal apps**): the shell is exactly `100dvh`
     *   and the document never scrolls. The main region is `min-h-0
     *   overflow-hidden`, so a child layout (`ExplorerLayout`, `SplitPane`,
     *   `MasterDetail`, `SubNavLayout`, `WorkArea`) gets a definite height and
     *   overflow lives inside its panes. Give the page's root `flex-1 min-h-0`
     *   (the layouts above already do).
     */
    layout?: 'document' | 'fill';
    /**
     * The primary rail folds (2.515.0). Pass `useRailFold(...)` (or any
     * `{ folded, toggle }`): the sidebar then sits IN FLOW as the body's first
     * column instead of `fixed` — `sidebarWidth` wide when open, a 44px strip
     * when folded — and the main column takes the rest, so the shell measures
     * as two in-flow columns. A `NavRail` in `sidebar` reads the fold from the
     * shell (it draws its icon strip and the fold toggle itself). Omitted: the
     * fixed sidebar, unchanged.
     */
    sidebarFold?: ShellRailFold;
}

/** An arrow pointing right: "go on" — a link action, "Prepare run →". Since 2.385.0. */
export declare function ArrowRightIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** An arrow pointing up: "send" on a round prompt button. Since 2.390.0. */
export declare function ArrowUpIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ArtifactTile({ name, type, url }: {
    name: string;
    type?: string;
    url?: string | null;
}): JSX.Element;

/** Borderless collection: fixed thumbnail ratio, concise captions, shared
 * Avatar identity. Full source metadata belongs in the host's inspection view. */
export declare function AssetGallery({ items, variant, label, onOpen, actions, actionsVisibility, tileActions, menuOnSelect, onDragStart, minTileWidth, fit, className }: AssetGalleryProps): JSX.Element;

export declare interface AssetGalleryProps {
    items: readonly GalleryAsset[];
    variant?: 'avatars' | 'images';
    label: string;
    onOpen: (item: GalleryAsset) => void;
    actions?: (item: GalleryAsset) => ReactNode;
    /**
     * When the `actions` row is visible. `'hover'` (default, the pre-2.503
     * behaviour) reveals it on pointer hover or keyboard focus within the card,
     * and always on touch screens. `'always'` shows it at rest — use it when an
     * action is the main thing a person does with the card (approve, use,
     * regenerate): an action nobody can see is an action nobody finds.
     */
    actionsVisibility?: 'hover' | 'always';
    /**
     * Icon actions for a tile (since 2.504.0): a compact toolbar over the
     * thumbnail's top-right corner, revealed on hover or keyboard focus (always
     * shown on touch), with the chat message bar's roving keys. The same
     * actions are the tile's context menu (right-click, the Menu key or
     * Shift+F10).
     */
    tileActions?: (item: GalleryAsset) => readonly GalleryTileAction[];
    /**
     * With `tileActions`: selecting a tile opens its action menu — "Open"
     * (`onOpen`) first, then the tile's actions — instead of opening it
     * directly. Since 2.504.0.
     */
    menuOnSelect?: boolean;
    /**
     * Minimum tile width in px (2.515.0). Given, the grid is `auto-fill`
     * columns of at least this width (never wider than the gallery) instead
     * of the fixed 2/4/8 (avatars) or 2/3/4 (images) columns, and an avatar
     * is drawn at 80% of it, so the tile and its picture scale together. Use
     * it whenever tiles carry `actions`: eight fixed columns left a 120px tile
     * for "Approve for mesh · uses credits".
     */
    minTileWidth?: number;
    /**
     * How an image tile fits its picture (2.515.0). `cover` (default,
     * unchanged) fills the tile and may crop; `contain` letterboxes so the
     * subject is shown whole, as a record's picture must be (audit
     * `subject.frame`). The thumbnail carries `data-gallery-fit`.
     */
    fit?: 'cover' | 'contain';
    /** Host-owned typed drag payload; never infer identity from an image URL. */
    onDragStart?: (item: GalleryAsset, event: DragEvent_2<HTMLButtonElement>) => void;
    className?: string;
}

/** An @ sign: mentions, "someone named you". */
export declare function AtIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function AttachToggle({ attached, onToggle, labels, size, tabIndex, className, 'aria-label': ariaLabel, 'data-testid': testId, }: AttachToggleProps): JSX.Element;

export declare interface AttachToggleProps {
    attached: boolean;
    onToggle: () => void;
    labels?: {
        add: string;
        added: string;
    };
    size?: 'sm' | 'md';
    /** Names the thing, e.g. "Add Release plan to the prompt". */
    'aria-label'?: string;
    /** -1 inside a roving list, where only the current row's controls are tab stops. */
    tabIndex?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function Avatar({ name, size, initials: initialsProp, color, src, icon, glyph, foreground, tone, autoContrast, className, style, title, showTitle, }: AvatarProps): JSX.Element;

/**
 * Fills for name-derived avatars. Each one carries the white initials at
 * ≥4.5:1 (WCAG AA for normal text), so the 9–16px initials read at every
 * size. The fill and the text are both literal, so the ratio is the same in
 * light and dark themes. Before 2.503.0 these were the 400/500 shades, and
 * white on orange measured 2.8:1. Pinned by `Avatar.contrast.test.tsx`.
 */
export declare const AVATAR_PALETTE: readonly string[];

export declare function AvatarGroup({ names, items, maxVisible, size, className, total, }: AvatarGroupProps): JSX.Element;

/** One person in an AvatarGroup, when a bare name isn't enough. */
export declare interface AvatarGroupItem {
    name: string;
    initials?: string;
    color?: string;
    src?: string;
}

export declare interface AvatarGroupProps {
    /** Convenience form — colors and initials are derived from the name. */
    names?: string[];
    /**
     * Richer form, for callers that already know each person's brand color,
     * canonical initials, or photo. Takes precedence over `names`. Without this,
     * callers with per-user colors had to hand-roll the whole stack.
     */
    items?: AvatarGroupItem[];
    maxVisible?: number;
    size?: number;
    className?: string;
    /**
     * Total people, when it exceeds what was passed in. Lets a caller render
     * "+3" without materialising three more entries.
     */
    total?: number;
}

export declare interface AvatarProps {
    name: string;
    size?: number;
    /**
     * Override the derived initials. Use when the caller already has canonical
     * initials (e.g. from a presence payload) and shouldn't re-derive them from
     * a display name — deriving would turn "AS" into "As".
     */
    initials?: string;
    /** Override the auto-computed color. */
    color?: string;
    /** Optional profile image URL. Falls back to initials if absent or load fails. */
    src?: string;
    /**
     * An arbitrary node in the circle instead of initials — an icon, usually.
     *
     * Exists because not every avatar-shaped thing is a person. A channel row
     * wants a `#` in the same coloured circle at the same size with the same
     * overlap rules, and without this the only way to get one was a hand-rolled
     * `<span className="rounded-full …">` beside a real `Avatar`, which is two
     * components to keep in step and one of them outside the design system.
     *
     * Wins over `src` only when there is no image to show; loses to a loaded
     * image, because a photo is more specific than a glyph.
     */
    icon?: ReactNode;
    /**
     * A single character or emoji in the circle — `#` for a channel, `🔒` for a
     * private one. The string form of `icon`, sized a little larger than initials
     * because one character at initials size reads as a speck.
     */
    glyph?: string;
    /**
     * Explicit text colour for the initials/glyph. Overrides everything else.
     *
     * The default is white, which is right for the saturated palette above and
     * wrong for a pale fill — a task row's assignee badge is dark indigo on a
     * light indigo tint, and white on that fails contrast, which is exactly why
     * such badges were being hand-rolled as bare `<span>`s beside real Avatars.
     */
    foreground?: string;
    /**
     * Paint the circle in a semantic tone's soft surface (`-bg` background,
     * `-fg` text) instead of a derived or caller-supplied colour. Wins over
     * `color` / `foreground` / `autoContrast`, because a tone already declares
     * both halves of the pair.
     */
    tone?: ToneOrAlias;
    /**
     * Pick the foreground from the resolved background's luminance rather than
     * always using white. Opt-in, not the default: flipping existing avatars to
     * dark text on the lighter half of the palette would change every presence
     * row in every consumer at once.
     */
    autoContrast?: boolean;
    className?: string;
    style?: CSSProperties;
    /**
     * Tooltip text. Defaults to `name`. Pass `null` (or `showTitle={false}`) to
     * render no `title` at all — a wrapping button or link with its own `title`
     * otherwise gets two tooltips fighting, and `title=""` is not the same thing
     * as no attribute.
     */
    title?: string | null;
    /** `false` suppresses the `title` attribute entirely. See `title`. */
    showTitle?: boolean;
}

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
export declare type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';

export declare function Badge({ variant, value, color, 'aria-label': ariaLabel, className, 'data-testid': testId, }: BadgeProps): JSX.Element;

export declare type BadgeColor = 'accent' | 'success' | 'danger' | 'muted';

/** `Badge` (count, dot, pulse). */
export declare interface BadgeLeaf extends Omit<BadgeProps, 'className'> {
    kind: 'badge';
}

export declare interface BadgeProps {
    variant: BadgeVariant;
    /** Required for variant="count". Ignored otherwise. */
    value?: number;
    color?: BadgeColor;
    /** Optional override label for screen readers. */
    'aria-label'?: string;
    className?: string;
    /** Optional testid. */
    'data-testid'?: string;
}

export declare type BadgeVariant = 'count' | 'dot' | 'pulse';

export declare function Banner({ variant, title, layout, icon, onDismiss, action, accent, meta, size, children, className, style, 'data-testid': testId, }: BannerProps): JSX.Element;

/** `Banner`. */
export declare interface BannerLeaf extends Omit<BannerProps, 'children' | 'className' | 'style' | 'action' | 'icon' | 'meta'> {
    kind: 'banner';
    message?: string;
    action?: ButtonLeaf;
}

export declare interface BannerProps {
    variant?: BannerVariant;
    /** Bold prefix label shown before children. */
    title?: string;
    /**
     * How the title sits against the body.
     *
     * `inline` (default) is right across a page: a short title and a short
     * message read as one line. It is wrong in a narrow column — in a 280px
     * comment gutter the two children split the width and the body was left
     * with 68px, about six characters per line, wrapping into a ragged tower.
     * `stacked` puts the title above the body and gives each the full width.
     *
     * `callout` (since 2.389.0) is a full-width notice in a document body:
     * icon · title over body · trailing action, all vertically centred. The
     * surface is the tone's pale `--color-{tone}-callout` fill and
     * `-callout-border` (since 2.389.4; the soft `-bg` before), the title reads in
     * primary ink and the body in secondary ink so a paragraph of advice stays
     * legible — only the icon carries the tone colour.
     */
    layout?: 'inline' | 'stacked' | 'callout';
    /**
     * A leading glyph. `true` draws the tone's default (a warning triangle for
     * `warning`/`error`, an info circle for `info`, a check for `success`); a
     * node is drawn as given. Omitted (default) draws none — existing banners
     * are unchanged. Since 2.389.0.
     */
    icon?: ReactNode | true;
    onDismiss?: () => void;
    /**
     * A control that resolves what the banner is about — "Convert to page" on a
     * deprecation notice, "Retry" on a failure. Sits at the trailing edge,
     * before the dismiss button, and never shrinks under a long message.
     */
    action?: ReactNode;
    /**
     * `callout` only: a 3px solid tone bar down the left edge — the notice
     * reads as a pull-quote in a document body ("What needs attention").
     * Default `none`. Since 2.390.0.
     */
    accent?: 'none' | 'bar';
    /**
     * `callout` only: a third line under the body — facts about the thing the
     * notice is about ("Blocked · Eli Garcia · 2 points"), already worded and
     * toned by the host. Since 2.390.0.
     */
    meta?: ReactNode;
    /**
     * `callout` only: `md` (default) is the 14px title over a 14px body; `lg`
     * is a 17px title over a 15px body with roomier padding — a callout that is
     * a section's content, not a note beside it — and its `action` sits level
     * with the title rather than centred on the block. Since 2.390.0.
     */
    size?: 'md' | 'lg';
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type BannerVariant = 'error' | 'warning' | 'info' | 'success';

export declare function BarChart({ data, height, xKey, yKey, color, yFormat, variant, showValues, }: {
    data: BarChartDatum[];
    /** Defaults to 180 for `'default'`, 80 for `'compact'`. */
    height?: number;
    xKey: string;
    yKey: string;
    /** Fallback fill for a bar with no per-row `tone` (compact) or the single
     *  series fill (default). Default: `var(--color-primary)`. */
    color?: string;
    yFormat?: (v: number) => string;
    /**
     * `'compact'` drops the grid, axes and legend and paints each bar from its
     * own `tone` (see `BarChartDatum`) — a metrics tile's small multi-category
     * bar (token in/out, run status counts), not a full chart card. Default:
     * unchanged — grid + axes + legend, single `color` fill.
     */
    variant?: 'default' | 'compact';
    /** `'compact'` only: print each bar's value above it (through `yFormat`
     *  when given). Default: off. */
    showValues?: boolean;
}): JSX.Element;

export declare interface BarChartDatum extends Record<string, unknown> {
    /**
     * `variant="compact"` only: paints this bar with the tone's solid fill
     * from the shared Tone scale (`../shared/tones`), overriding `color` for
     * this one bar. A row with no `tone` falls back to `color` / primary, same
     * as the default variant.
     */
    tone?: Tone;
}

declare interface BaseProps {
    options: readonly ComboboxOption[];
    placeholder?: string;
    'aria-label'?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
    /** Commit typed text that matches no option on Enter. */
    allowCustom?: boolean;
    /** Cap on rendered suggestions (default 8). */
    maxOptions?: number;
    emptyMessage?: string;
    /** Custom matcher; default is a case-insensitive substring on label. */
    filter?: (option: ComboboxOption, query: string) => boolean;
    /** Called as the query changes (for hosts that fetch suggestions). */
    onQueryChange?: (query: string) => void;
    className?: string;
    'data-testid'?: string;
    /** The input's id — FormField's `id`, so its `<label htmlFor>` names the field. */
    id?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    /** Danger border (FormField's error state). `aria-invalid` alone also sets it. */
    invalid?: boolean;
    /** Draw the chevron that opens the full list on click. Default true in single mode. */
    showToggle?: boolean;
    /** Single mode: drawn before the input while the chosen option's label is shown (not while typing). */
    leading?: ReactNode;
}

/** A bell: "notifications", "activity" — the header's inbox trigger. Since 2.407.37. */
export declare function BellIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A bell with a slash through it: "notify me quietly". */
export declare function BellMutedIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function BigBrotherPanel({ rooms, presenceUsers, activityEvents, activityIsLive: isLive, }: BigBrotherPanelProps): JSX.Element;

declare interface BigBrotherPanelProps {
    rooms: RoomItem[];
    presenceUsers: PresenceUser_2[];
    activityEvents: ActivityEvent[];
    activityIsLive: boolean;
}

export declare function BoardColumn({ label, count, children, emptyLabel, action, className, 'data-testid': testId, }: BoardColumnProps): JSX.Element;

export declare interface BoardColumnProps {
    /** The lane's name — "In progress", "Blocked". */
    label: ReactNode;
    /**
     * Count shown at the end of the header. Pass it explicitly rather than
     * counting children: a lane that paginates or virtualises still knows its
     * real total.
     */
    count?: number;
    /** Cards in the lane. When absent, `emptyLabel` is shown instead. */
    children?: ReactNode;
    /** Shown when the lane holds nothing. Default "Nothing here". */
    emptyLabel?: string;
    /** Right-aligned control in the header, e.g. a per-lane "add" button. */
    action?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** A robot head: an agent at work on a computer. Since 2.411.0. */
export declare function BotIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** The ratio that keeps a width-bounded pane inside its bounds at this split width; the ratio otherwise. */
export declare function boundedSidePaneRatio(ratio: number, splitWidthPx: number | null, widthPx?: {
    min: number;
    max: number;
} | null): number;

/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export declare function BranchIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export declare type BreadcrumbOverflow = 'ellipsis' | 'menu';

export declare function Breadcrumbs({ items, 'aria-label': label, separator, maxItems, overflow, minItems, lastIsCurrent, size, className, 'data-testid': testId, }: BreadcrumbsProps): JSX.Element | null;

export declare type BreadcrumbSize = 'sm' | 'md';

export declare interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    /** Distinguish this trail from other navigation landmarks on the page. */
    'aria-label'?: string;
    /** Custom separator rendered between items (default: "/") */
    separator?: ReactNode;
    /**
     * When set, truncate the middle of the list to fit this many visible items.
     * The first and last are always shown; middle items collapse per `overflow`.
     */
    maxItems?: number;
    /**
     * How the collapsed middle behaves. `ellipsis` (default) is inert text;
     * `menu` opens the hidden crumbs as a list of real links.
     */
    overflow?: BreadcrumbOverflow;
    /**
     * Render nothing below this many crumbs. A two-level trail usually repeats
     * what the nav rail already highlights, so shells that show breadcrumbs on
     * every route can set `minItems={3}` and let shallow pages keep the row.
     */
    minItems?: number;
    /**
     * `true` (default): the last crumb is the page you are on — primary ink,
     * `aria-current="page"`, not a link. `false`: every crumb is a place to go,
     * for a PATH that ends at the folder a file lives in, not at the file.
     * Since 2.385.0.
     */
    lastIsCurrent?: boolean;
    /**
     * Type step. `md` (default) is 14px. `sm` (2.407.13) is the 13px meta step —
     * the size of a document header's "Saved …" line and status pill, for a
     * trail that sits in that row (EditorShell's folder path). The size is on
     * every crumb, separator and ellipsis; a `className` on the nav cannot
     * reach them.
     */
    size?: BreadcrumbSize;
    className?: string;
    'data-testid'?: string;
}

export declare type BuiltinLeafKind = BuiltinLeafSpec['kind'];

export declare type BuiltinLeafSpec = ButtonLeaf | ButtonGroupLeaf | MenuLeaf | TableLeaf | StatsLeaf | StatStripLeaf | KeyValuesLeaf | StatusLeaf | BadgeLeaf | TextLeaf | MetaLeaf | EmptyLeaf | BannerLeaf | ListLeaf | FormLeaf | TabsLeaf | ChartLeaf | ActivityLeaf | SearchLeaf | CustomLeaf;

/** Three dotted lines: "bulleted list". Since 2.386.5. */
export declare function BulletListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Button({ variant, size: requestedSize, tone, disabled, fullWidth, children, type, className, ref, ...rest }: ButtonProps): JSX.Element;

/**
 * The one weight every button-like control in the library renders at —
 * `Button` of every variant and size, and the hand-rolled controls that
 * cannot be a `Button` (a split Send, a menu trigger). Import this instead of
 * writing `font-medium`/`font-semibold` so the app has one button weight.
 */
export declare const BUTTON_WEIGHT = "font-semibold";

/** `ToolbarGroup` of buttons and menus: related actions side by side. */
export declare interface ButtonGroupLeaf {
    kind: 'button-group';
    /** Names the group for screen readers. */
    label?: string;
    items: ReadonlyArray<ButtonLeaf | MenuLeaf>;
}

/** `Button`. `variant` is required: one primary action per region, never the default by accident. */
export declare interface ButtonLeaf extends Omit<ButtonProps, 'children' | 'variant' | 'ref' | 'style' | 'className'> {
    kind: 'button';
    label: string;
    variant: ButtonVariant;
}

export declare interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    /**
     * The underlying `<button>`.
     *
     * Same shape and same reason as `StackProps.ref` (2.233.0): a plain prop, not
     * `forwardRef`, because React 19 — our only supported peer — passes `ref`
     * through as an ordinary prop.
     *
     * A menu trigger has to be re-focusable when its panel closes, and a consumer
     * with no way to hold that node keeps a raw `<button>` instead of using this
     * component. That is exactly what the aws-agentcore portal's masquerade menu
     * did.
     */
    ref?: Ref<HTMLButtonElement>;
    /**
     * `'success'` paints with the success tokens — a confirm/apply action next
     * to a `danger` one (`danger` already lives here as a variant, not a
     * `tone` value, for the same reason: `tone` is spoken for below).
     *
     * `'info'` paints solid with the info tokens — same shape as
     * `danger-solid`, not `success`'s soft/bordered fill — for a primary-ish
     * action that isn't the page's main call to action (e.g. a secondary
     * "Learn more" next to a solid `primary` "Continue").
     *
     * `'link'` drops the border, background and fixed padding entirely and
     * renders as inline text that underlines on hover, inheriting the
     * surrounding font size — for a Cancel/Change action sitting next to
     * prose or another control, not a boxed button.
     */
    variant?: ButtonVariant;
    size?: ButtonSize;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette. Every bare `<button>` in a
     * terminal or log surface is there because this prop did not exist.
     *
     * Semantic colour (success/danger/…) is a `variant` value, not a `tone`
     * value — `tone` already names the surface-vs-code family axis, and
     * reusing it for semantics would make `tone="success"` and `tone="code"`
     * look like the same kind of choice when they answer different questions.
     */
    tone?: ButtonTone;
    fullWidth?: boolean;
    children: ReactNode;
}

export declare type ButtonSize = 'sm' | 'md' | 'lg';

/** @see SurfaceTone — which colour family the button paints in. */
export declare type ButtonTone = SurfaceTone;

export declare type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-solid' | 'success' | 'info' | 'link';

export declare function CallPresenceIndicator({ participants, count, onClick, label, maxVisible, }: CallPresenceIndicatorProps): JSX.Element | null;

export declare interface CallPresenceIndicatorProps {
    /** People currently on the call. Names must be pre-resolved. */
    participants: Array<{
        userId: string;
        name: string;
        avatarUrl?: string;
    }>;
    /** Overrides the rendered count when the caller knows a truer number
     *  than it has names for (e.g. the server's participantCount while
     *  some display names are still resolving). */
    count?: number;
    /** Click target — typically "open/expand the call". */
    onClick?: () => void;
    /** Live-region label prefix, e.g. the lobby name. */
    label?: string;
    maxVisible?: number;
}

/** Width of the folded rail. */
export declare const CANVAS_PANE_RAIL_PX = 36;

export declare interface CanvasPaneGeometry {
    placement: Exclude<CanvasPanePlacement, 'none' | 'collapsed'>;
    paneWidth: number;
    /** Canvas width left visible beside (column) or beside-and-under (overlay) the pane. */
    canvasWidth: number;
}

/** Pure: where the pane goes, and how wide, in a layout this wide. */
export declare function canvasPaneGeometry(width: number, options?: CanvasPaneGeometryOptions): CanvasPaneGeometry;

export declare interface CanvasPaneGeometryOptions {
    /** Narrowest the pane gets. Default 280. */
    paneMinPx?: number;
    /** Widest the pane gets. Default 380. */
    paneMaxPx?: number;
    /** The pane's share of the layout between those bounds. Default 0.3. */
    paneFraction?: number;
    /** The canvas keeps at least this beside a column pane; below it the pane overlays. Default 480. */
    canvasMinPx?: number;
}

export declare interface CanvasPaneInset {
    /** Pixels of the canvas's right edge that the pane lies over. */
    right: number;
}

export declare const CanvasPaneInsetContext: Context<CanvasPaneInset>;

export declare function CanvasPaneLayout({ children, pane, collapsed: collapsedProp, onCollapsedChange, expandKey, paneLabel, width: fixedWidth, className, 'data-testid': testId, ...geometryOptions }: CanvasPaneLayoutProps): JSX.Element;

export declare interface CanvasPaneLayoutProps extends CanvasPaneGeometryOptions {
    /** The canvas. It gets the remaining width and never less than zero. */
    children: ReactNode;
    /** The details pane, or null/undefined when nothing is open. It fills its box (`h-full w-full`) and draws its own left edge and background. */
    pane?: ReactNode | null;
    /** Controlled fold state. Omit to let the layout keep its own. */
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** When this changes (a different item opened), a folded pane unfolds. */
    expandKey?: unknown;
    /** What the pane holds, for the fold/unfold buttons: "Hide details" / "Show details". Default "details". */
    paneLabel?: string;
    /** Fixed width for tests/stories (jsdom never measures). */
    width?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type CanvasPanePlacement = 'none' | 'column' | 'overlay' | 'collapsed';

declare type CanvasTool = 'brush' | 'pen' | 'eraser' | 'select';

export declare function CapabilityDeniedFallback({ capabilityName, title, description, actionLabel, onAction, actions, icon, testId, }: CapabilityDeniedFallbackProps): JSX.Element;

export declare interface CapabilityDeniedFallbackProps {
    /**
     * Capability name as the user would recognize it (e.g. "Chat",
     * "Recording", "AI Assistant"). Used in the default title.
     */
    capabilityName?: string;
    /** Override the default title entirely. */
    title?: string;
    /** Body copy explaining why the feature is unavailable / how to enable it. */
    description?: ReactNode;
    /**
     * Optional CTA — typically a "Request access" or "Upgrade plan" link.
     * For multiple CTAs use `actions` instead.
     */
    actionLabel?: string;
    onAction?: () => void;
    /** Multi-action variant. Takes precedence over actionLabel/onAction. */
    actions?: EmptyStateAction[];
    /** Override the default lock icon. Pass `null` to remove the icon. */
    icon?: ReactNode | null;
    /** Test id (defaults to `capability-denied-fallback`). */
    testId?: string;
}

export declare function CaptionedAvatar({ name, role, src, size, meta, onClick, href, selected, className, 'data-testid': testId, }: CaptionedAvatarProps): JSX.Element;

export declare interface CaptionedAvatarProps {
    name: string;
    /** The caption under the name: "Lead", "Candidate". */
    role?: ReactNode;
    /** The picture. Falls back to initials. */
    src?: string;
    /** The avatar's diameter in px. Default 56. The card is a little wider than it so names wrap once at most. */
    size?: number;
    /** Something next to the caption, usually a small `StatusPill` ("Approved"). */
    meta?: ReactNode;
    /** Opens the subject. The card becomes one button. */
    onClick?: () => void;
    /** Opens the subject by link. Wins over `onClick`. */
    href?: string;
    /** Draw it as the chosen one. */
    selected?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function Card({ children, padding, className, ref, ...rest }: CardProps): JSX.Element;

export declare function CardHeader({ title, as: Heading, subtitle, meta, action, inset, className }: CardHeaderProps): default_2.JSX.Element;

export declare interface CardHeaderProps {
    title: string;
    /** Semantic heading level, independent of visual size. Use h2 directly under a page title. */
    as?: 'h2' | 'h3' | 'h4';
    /** Small text below the title. */
    subtitle?: string;
    /** Extra content rendered immediately to the right of the title (badges/chips). */
    meta?: default_2.ReactNode;
    /** Right-aligned action area (buttons, menus). */
    action?: default_2.ReactNode;
    /**
     * The header owns its own gutter and bottom rule. For a `Card padding="none"`
     * host — one with a full-bleed footer or edge-to-edge rows — where the card
     * is not padding the header for it; without this the title hangs on the
     * card's top-left edge.
     */
    inset?: boolean;
    className?: string;
}

export declare type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export declare interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    padding?: CardPadding;
    /**
     * The underlying `<div>`. A plain prop, not `forwardRef` — see the note on
     * `StackProps.ref`; React 19 passes `ref` through as an ordinary prop and
     * this card is not polymorphic, so the type is exact.
     */
    ref?: Ref<HTMLDivElement>;
}

export declare function CatalogGrid({ children, columns, dense, variant, className, style, 'data-testid': testId, }: CatalogGridProps): JSX.Element;

export declare type CatalogGridColumns = 1 | 2 | 3 | 4 | 5;

export declare interface CatalogGridProps {
    /** Children — expected to be <ThumbnailCard> instances (any node accepted). */
    children: ReactNode;
    /** Target column count at >=640px. Default 3. Always collapses to 1 below. */
    columns?: CatalogGridColumns;
    /** Tighter gap (12px vs 20px). Default false. */
    dense?: boolean;
    /**
     * `lanes` (since 2.446.1): a board's columns — `columns` lanes in ONE row
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

/** What the host reports back after trying to apply. */
export declare interface ChangeApplyOutcome {
    ok: boolean;
    /** Shown verbatim when `ok` is false. Say what happened, not "error". */
    message?: string;
    /** Set when the refusal was specifically a compare-and-set mismatch. */
    stale?: {
        expected: unknown;
        actual: unknown;
    };
}

/** Who is asking for the change. */
export declare interface ChangeAuthor {
    name: string;
    /**
     * `agent` renders the machine label. This is not decoration: an unreviewed
     * machine edit and a colleague's edit carry very different weight, and the
     * only thing separating them on screen is this.
     */
    kind?: 'human' | 'agent';
    avatarUrl?: string;
}

export declare function ChangeDiff({ pairs, beforeLabel, afterLabel, className, 'data-testid': testId, }: ChangeDiffProps): JSX.Element | null;

export declare interface ChangeDiffPair {
    before: string;
    after: string;
}

export declare interface ChangeDiffProps {
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. */
    beforeLabel?: string;
    /** Label for the value being proposed. */
    afterLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function ChangeLocation({ path, hint, rootLabel, className, 'data-testid': testId, }: ChangeLocationProps): JSX.Element;

export declare interface ChangeLocationProps {
    /**
     * Breadcrumb from the document root, outermost first —
     * e.g. `['Section 4', 'Payment terms']`. An empty array renders the
     * document-level case rather than an empty strip.
     */
    path: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. Optional. */
    hint?: string | undefined;
    /** Shown when `path` is empty. */
    rootLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function ChangeReviewCard({ category, author, path, locationHint, pairs, beforeLabel, afterLabel, utterance, rationale, verdict, verdictStatus, verdictError, revision, status, draftError, badges, onAccept, onReject, onRereview, actions, className, 'data-testid': testId, }: ChangeReviewCardProps): JSX.Element;

export declare interface ChangeReviewCardProps {
    /**
     * What KIND of change this is, in the reviewer's words — "Title", "Payment
     * terms", "Body text". Rendered first and most prominent.
     */
    category: string;
    /**
     * Who made / is asking for the change.
     *
     * Optional, and its absence is RENDERED — as "Unattributed", not as a blank.
     * Plenty of real sources cannot name an editor (an S3 object has no author),
     * and the wrong fix is to fill the gap with the system that delivered the
     * change. "Contracts (Google Drive)" is a provenance, not a person; showing
     * it where a person belongs is what made the queue it replaces unreadable.
     */
    author?: ChangeAuthor;
    /** Breadcrumb to the change site. See `ChangeLocation`. */
    path?: readonly string[];
    /** Position within the target, e.g. `paragraph 3`. */
    locationHint?: string;
    /** The before/after pairs. One for a field, several for prose edits. */
    pairs: readonly ChangeDiffPair[];
    /** Label for the current value. Defaults to "Now". */
    beforeLabel?: string;
    /** Label for the proposed value. Defaults to "Proposed". */
    afterLabel?: string;
    /** Verbatim request that raised this, if there was one. Never paraphrase it. */
    utterance?: string;
    /** The author's one-line justification for the change itself. */
    rationale?: string;
    verdict?: ChangeReviewVerdict | undefined;
    verdictStatus?: ChangeReviewStatus | undefined;
    verdictError?: string | undefined;
    /**
     * The change's CURRENT revision. Pass it, or a verdict computed against an
     * older revision renders as though it still applies.
     */
    revision?: string | undefined;
    status?: ChangeReviewCardStatus;
    /** When set, rendered instead of the diff — the change could not be drafted. */
    draftError?: string;
    /** Extra chips for the header line (attachment state, confidence, …). */
    badges?: ReactNode;
    /**
     * Apply the change. MUST perform the mutation and report what happened —
     * returning `{ ok: true }` without changing the document is the exact bug
     * this component is shaped to prevent.
     */
    onAccept?: () => Promise<ChangeApplyOutcome> | ChangeApplyOutcome;
    onReject?: (reason: string) => void;
    /** Ask for a fresh review of the current revision. Offered on stale/failed. */
    onRereview?: () => void;
    /** Extra actions, rendered after the built-in ones. */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type ChangeReviewCardStatus = 'pending' | 'applied' | 'rejected';

export declare function ChangeReviewList({ documentTitle, changeCount, documentMeta, headerActions, pageSize, emptyState, notices, footer, children, className, 'data-testid': testId, }: ChangeReviewListProps): JSX.Element;

export declare interface ChangeReviewListProps {
    /** The document being changed. This is the heading — not the queue's name. */
    documentTitle: string;
    /**
     * Total number of changes awaiting review. Defaults to the number of
     * children. Pass it explicitly when some children are not cards, or when the
     * host is paging server-side and the children are only part of the total.
     */
    changeCount?: number;
    /** Document type, owner, last-edited — whatever orients the reviewer. */
    documentMeta?: ReactNode;
    /** Rendered on the right of the heading, e.g. a Refresh button. */
    headerActions?: ReactNode;
    /** How many cards to show before the "show more" control. Default 3. */
    pageSize?: number;
    /** Rendered in place of the queue when there is nothing to review. */
    emptyState?: ReactNode;
    /** Banners — load errors, stale-data notices — above the queue. */
    notices?: ReactNode;
    /**
     * Rendered after the queue and OUTSIDE the `pageSize` window.
     *
     * Commit controls belong here, not in `children`: a "Apply to document"
     * button passed as a child is one of the paged items, so on a queue longer
     * than `pageSize` it disappears behind "show more" and the surface becomes
     * unsubmittable.
     */
    footer?: ReactNode;
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/**
 * How the review itself is going, independent of what it concluded.
 *
 * Separate from `ChangeReviewVerdict` because "we have not asked yet", "we are
 * asking" and "asking failed" are three different things to a reviewer, and
 * none of them is a verdict. Folding them into an optional verdict field would
 * make the absent case ambiguous.
 */
export declare type ChangeReviewStatus = 'idle' | 'pending' | 'failed';

export declare interface ChangeReviewVerdict {
    verdict: ChangeVerdict;
    /** One line, always shown beside the chip. */
    headline: string;
    /** Expandable detail. Absent when the model gave none — render nothing, not "no reasoning". */
    reasoning?: string;
    producedAt: string;
    /** The change revision this verdict was computed against. */
    forRevision: string;
}

/** An agent's judgement on a single proposed change. */
export declare type ChangeVerdict = 'pass' | 'concern' | 'fail';

export declare function ChannelHeader({ name, onRename, memberCount, description, tabs, actions, avatarUrl, online, onMembersClick, size, headingLevel, as, className, 'data-testid': testId, }: ChannelHeaderProps): JSX.Element;

export declare interface ChannelHeaderProps {
    /** Display name of the channel or user */
    name: string;
    /**
     * Rename the conversation from its own title: double-click it and the
     * heading becomes an input in place. Enter commits, Escape abandons, and
     * blurring commits too — the same bargain every rename-in-place makes.
     *
     * IN PLACE rather than in a dialog. The thing being renamed is right there
     * and it is one field; a centred modal makes you look away from the title
     * to type its new value and then look back to see whether it took. Omit
     * for a viewer who may not rename this — the affordance should not exist
     * where the action would be refused.
     */
    onRename?: (next: string) => void;
    /** Number of members in the channel */
    memberCount?: number;
    /** Short description shown below the name */
    description?: string;
    /**
     * Views of this channel — files, documents, recordings, pinned. Rendered
     * inline beside the name; pass a <Tabs variant="underline" size="md"> (14px, the app's one tab-row step).
     * The header owns no tab state: which one is active is the caller's.
     */
    tabs?: ReactNode;
    /** Right-aligned action area */
    actions?: ReactNode;
    /** Avatar URL; falls back to name initials */
    avatarUrl?: string;
    /** Show green online indicator */
    online?: boolean;
    /** Called when member-count area is clicked */
    onMembersClick?: () => void;
    /**
     * `sm` for a narrow column (a conversation beside a document): one row that
     * never wraps, a 28px avatar, the description dropped. The default `md` is
     * the full-width bar over a chat pane.
     */
    size?: 'md' | 'sm';
    /** Use 1 when this is the page's title; embedded conversation panels default to 2. */
    headingLevel?: 1 | 2;
    /**
     * Element the bar renders as. Defaults to `'div'`. Pass `'header'` when a
     * host uses this as the page's own site header, so it lands as a `banner`
     * landmark instead of an anonymous `div`.
     */
    as?: 'div' | 'header';
    className?: string;
    'data-testid'?: string;
}

/** Bars on a baseline: measurements, "how much of this over time". */
export declare function ChartIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `TrendSparkline`: the library's light (inline SVG, no chart peer) chart. */
export declare interface ChartLeaf {
    kind: 'chart';
    type: 'sparkline';
    points: number[];
    /** What the line shows, for screen readers. */
    label: string;
    yMin?: number;
    yMax?: number;
    width?: number;
    height?: number;
    showFill?: boolean;
    showLastPoint?: boolean;
}

declare interface ChatAttachment {
    /** Correlation id shared with the sender's in-flight transfer. */
    id: string;
    /** Original filename. User content — never used as a path, never trusted. */
    name: string;
    /** Byte length of the stored object. */
    size: number;
    /** Declared MIME type. Advisory: used to pick a layout, never to trust. */
    contentType: string;
    /**
     * Authenticated download URL. Because the download route requires a bearer
     * token, an `<img src>` pointed straight at this will 401 — a resolved
     * object URL should be handed in as `src` by the integration layer.
     */
    url: string;
    /** Intrinsic dimensions when known, so the row reserves space before load. */
    width?: number;
    height?: number;
    /**
     * Tiny inline data-URI placeholder captured by the sender before upload.
     * Lets a recipient see what the image IS while the bytes are still moving.
     */
    preview?: string;
}

/**
 * Chat input with send button. Stateless — value/onChange controlled by parent.
 *
 * - Enter submits (Shift+Enter inserts newline in multiline mode).
 * - Submit disabled when `disabled` or value is empty/whitespace.
 */
export declare function ChatComposer({ value, onChange, onSubmit, disabled, multiline, placeholder, submitLabel, className, style, autoFocus, maxRows, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, submitAriaLabel, }: ChatComposerProps): JSX.Element;

export declare interface ChatComposerProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    /** false: single-line input, true: textarea (default false) */
    multiline?: boolean;
    placeholder?: string;
    /** default '→' */
    submitLabel?: string | ReactNode;
    className?: string;
    style?: CSSProperties;
    autoFocus?: boolean;
    /** for multiline, max rows before scroll (default 4) */
    maxRows?: number;
    /**
     * Accessible name for the message field (default "Message").
     *
     * The field is rendered internally, so a host has no way to wrap it in its
     * own `<label>`; without this it had no accessible name at all and announced
     * as a bare "edit text". A `placeholder` is not a substitute — browsers only
     * fall back to it, and it is gone the moment the user types.
     */
    'aria-label'?: string;
    /** Id of an existing visible element naming the field; wins over `aria-label`. */
    'aria-labelledby'?: string;
    /**
     * Accessible name for the send button. Only applied when `submitLabel` has
     * no readable text of its own — the default `'→'` and any icon node. When
     * `submitLabel` IS words ("Send", "Post"), that visible text is the name and
     * this is ignored, so the spoken name can never contradict what is on screen.
     */
    submitAriaLabel?: string;
}

/** A speech bubble: a conversation, a comment. */
export declare function ChatIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface ChatMessage {
    id?: string;
    clientId: string;
    /**
     * Authenticated sender, stamped server-side. Distinct from `clientId`,
     * which identifies a CONNECTION and changes on every reconnect — which is
     * why "is this mine" keys on this and never on clientId: otherwise your own
     * messages stop being yours partway up the thread.
     */
    userId?: string;
    content: string;
    timestamp: string;
    displayName?: string;
    avatarUrl?: string;
    /**
     * Files shared alongside (or instead of) the text.
     *
     * An attachment rides ON a message rather than being its own message kind
     * so that ordering is free: the file lands exactly where the sender put it
     * in the conversation, interleaved correctly with the text around it. A
     * separate "file event" stream would have to be merged back against the
     * message stream at render time, and the merge would be wrong at exactly
     * the moment it matters — when someone is typing while a file uploads.
     *
     * `content` may be empty when a message is nothing but attachments.
     */
    attachments?: ChatAttachment[];
    /**
     * Server-stamped facts about what this message IS, beyond its text.
     *
     * The thread renders some messages as objects rather than sentences — a
     * document that was created, a call that is happening — and this is where
     * the facts for those live: `{ kind: 'document', documentId, title }`,
     * `{ kind: 'call', callId, participants, endedAt }`. The sentence stays in
     * `content` for everywhere that renders plain text (notification previews,
     * the conversation list preview), so a host that does nothing with metadata
     * still shows something true.
     *
     * Deliberately open: the gateway adds event kinds without the library
     * needing a release, and `documentRefFromMetadata` / `callRefFromMetadata`
     * are the readers that turn this back into something typed.
     */
    metadata?: Record<string, unknown>;
    /** ISO: the author changed the text after sending. Rendered as "(edited)". */
    editedAt?: string;
    /** ISO: the author (or a moderator) removed it. The row keeps its place and says so. */
    deletedAt?: string;
}

export declare const Checkbox: ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>>;

/** Modifier keys held during the click that toggled a checkbox. */
declare interface CheckboxModifiers {
    shiftKey: boolean;
    metaKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
}

export declare interface CheckboxProps {
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    checked: boolean;
    /**
     * The new checked state, and the modifier keys held while it changed.
     *
     * `shiftKey` is the reason for the second argument: "tick this one" and
     * "tick everything from the last one to this one" are the same control with
     * shift held, and a callback carrying only the boolean cannot express the
     * second. Callers with a shift-select list therefore hand-rolled a native
     * <input type="checkbox"> — which is how a pipelines table ended up styling
     * itself with `accent-[var(--color-accent-solid)]`, a token that does not
     * exist. Existing callers taking one parameter are unaffected.
     *
     * The modifiers come from the CLICK, not the change event: a change event
     * carries no modifier state at all. Keyboard activation (space) also emits a
     * click, so it arrives here with every modifier false, which is correct —
     * there is no shift-space range-select convention on a checkbox.
     */
    onChange: (checked: boolean, modifiers: CheckboxModifiers) => void;
    /**
     * Mixed state — "some but not all selected". Rendered natively (the dash),
     * exposed to AT via aria-checked="mixed". Clicking a mixed checkbox
     * reports `true`, matching the native select-all convention.
     */
    indeterminate?: boolean;
    disabled?: boolean;
    /** Accessible name. Required when no visible <label> wraps this. */
    'aria-label'?: string;
    /**
     * Id of the element naming this checkbox. Prefer this over `aria-label` when
     * a visible label exists but cannot wrap the control (e.g. a generated form
     * that renders the label above a row of widgets) — a hand-written
     * `aria-label` is a copy that drifts from the words on screen.
     */
    'aria-labelledby'?: string;
    /** Id(s) of the help / error text describing this checkbox. */
    'aria-describedby'?: string;
    /**
     * Click pass-through. Row-selection checkboxes live inside clickable
     * rows/cards and need `e.stopPropagation()` so ticking the box doesn't
     * also open the row.
     */
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    /** Key pass-through, for shift-range selection handling. */
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    /**
     * Control shape. See `CheckboxShape`. Default `square`.
     *
     * With `round`, `className` lands on the wrapper (the thing with a size and
     * a position) rather than on the hidden input, since the input no longer has
     * any paint of its own — which is also how the control is resized, e.g.
     * `className="h-[22px] w-[22px]"`.
     */
    shape?: CheckboxShape;
    /**
     * Semantic tone for `shape="round"` — the ring's border and its checked
     * fill. Ignored by `shape="square"`, which is the browser's own
     * `accent-primary` box. Default `info`.
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}

/**
 * `square` is the native `accent-primary` box (default, unchanged). `round` is
 * the tone-coloured ring that fills solid and shows a tick when checked —
 * the "status toggle" shape a task list uses, where the colour carries the
 * state (amber pending, blue acknowledged, green done) and the control is
 * round so it reads as a status rather than a form field.
 *
 * This is still a real `<input type="checkbox">`: the native control is
 * transparent and stretched over the painted ring, so focus, space-to-toggle,
 * label association and form submission all behave exactly as they do for the
 * square shape. Hosts that hand-rolled this shape used a `<button>` and lost
 * every one of those.
 */
declare type CheckboxShape = 'square' | 'round';

/** A tick: "done", "added". Since 2.389.6. */
export declare function CheckIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A ticked box: "checklist". Since 2.386.5. */
export declare function ChecklistIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface ChecklistItem {
    id: string;
    text: string;
    done: boolean;
    pending?: boolean;
}

export declare function ChecklistSection({ title, items, onToggle, onAdd, onEdit, onRemove, onMove, readOnlyReason, emptyLabel, addPlaceholder, first, as, variant, className, 'data-testid': testId, }: ChecklistSectionProps): JSX.Element;

export declare interface ChecklistSectionProps {
    title?: string;
    /** Semantic heading level; use h2 for a section directly under the page title. */
    as?: 'h2' | 'h3' | 'h4';
    items: ChecklistItem[];
    onToggle?: (id: string, done: boolean) => void;
    onAdd?: (text: string) => void;
    onEdit?: (id: string, text: string) => void;
    onRemove?: (id: string) => void;
    onMove?: (id: string, toIndex: number) => void;
    readOnlyReason?: string;
    emptyLabel?: string;
    addPlaceholder?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * rows, no tally, and "Add a criterion" as a quiet control that opens the
     * field only when asked — a work item's Brief. `label`: the small uppercase
     * caption with the tally and an always-open add field, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

/** A chevron. `dir` is where it points. */
export declare function ChevronIcon({ size, dir, ...rest }: GlyphProps & {
    dir?: 'up' | 'down' | 'left' | 'right';
}): JSX.Element;

export declare function Chip({ tone, palette, size, solid, translucent, outline, mono, dot, uppercase, icon, children, title, className, style, 'data-testid': testId, 'aria-label': ariaLabel, href, external, onRemove, removeLabel, removeTestId, removeIcon, }: ChipProps): JSX.Element;

/**
 * `tone` was already spoken for by the semantic scale, so the surface-family
 * axis is `palette` here. Same idea as `TitledFrame`'s `tone`, different word
 * only because renaming the seven-year-old `tone` prop would break every one
 * of Chip's several hundred call sites.
 */
export declare type ChipPalette = SurfaceTone;

export declare interface ChipProps {
    tone?: ChipTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for chips inside a log console,
     * debugger or terminal pane.
     */
    palette?: ChipPalette;
    /** `lg` since 2.396.0: 14px regular text, 10px × 4px padding, 6px corners. */
    size?: 'lg' | 'md' | 'sm' | 'xs';
    /** Solid fill (dark bg + white text) instead of soft tint. */
    solid?: boolean;
    /**
     * Translucent fill — the tone colour at 15% opacity behind text in that
     * same colour, rather than the soft variant's opaque `-bg` token. Matches
     * the pipeline debugger's status badges, which sit directly on
     * `code-bg`/other tinted chrome and don't want their own opaque card.
     * Takes precedence over `solid` if both are set.
     */
    translucent?: boolean;
    /**
     * Outlined: a 1px border in the tone's `-border`, the tone's text colour,
     * and a faint surface wash instead of the soft `-bg` fill — a tag that sits
     * on an already-tinted row (the "Blocked" chip on `ActionRowList
     * tone="warning"`) without stacking a second tint on it. `surface` palette
     * only; ignored with `solid`/`translucent`. Since 2.393.1.
     *
     * `'soft'` (since 2.396.0): the same tone border and text over the tone's
     * pale `-bg` fill rather than the surface wash — a tag that should still
     * read as tinted on a tinted row (the Initiatives v2 "Blocked": pale red
     * fill, soft red border, red text).
     */
    outline?: boolean | 'soft';
    /** Monospace font — for count badges. */
    mono?: boolean;
    /** Indicator dot. 'static' = filled circle, 'pulse' = filled circle
     *  with an animated outer ping (matches Badge variant="pulse"). */
    dot?: 'static' | 'pulse';
    /** Uppercase the label with letter-spacing — the "REC" / "LIVE"
     *  pattern common to status pills. */
    uppercase?: boolean;
    /** Optional leading icon (SVG element). Sized by the chip's `size`. */
    icon?: ReactNode;
    children: ReactNode;
    title?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
    /** When set, the chip renders as an `<a href>` instead of a `<span>`,
     *  carrying the same classes. `rel="noopener noreferrer"` is always
     *  applied — see `external` for `target="_blank"`. */
    href?: string;
    /** Only meaningful with `href`. Opens in a new tab (`target="_blank"`),
     *  matching `Link`'s `external` prop. */
    external?: boolean;
    /**
     * Renders a dismiss control inside the chip. A removable chip is a token in
     * a multi-select (approvers, tags, filters), and every host that needed one
     * hand-rolled the same borderless `<button>` — `Button`'s boxed variants
     * were too heavy for a 12px glyph in a pill and `IconButton`'s smallest size
     * is a 24px square. This uses `Button variant="link"`, which is exactly the
     * inline, unpadded, font-size-inheriting control that shape wants.
     */
    onRemove?: () => void;
    /**
     * Accessible name for the remove control. Defaults to `Remove`, which is
     * fine for a lone chip and useless in a row of eight — pass
     * `removeLabel={`Remove ${name}`}` whenever the chip is one of several.
     */
    removeLabel?: string;
    /** `data-testid` on the remove control. */
    removeTestId?: string;
    /** Glyph inside the remove control. Defaults to a multiplication sign. */
    removeIcon?: ReactNode;
}

/** @see Tone — the library-wide semantic tone scale. */
export declare type ChipTone = ToneOrAlias;

/** The list. Rows divide themselves; the list draws the outer rule. */
export declare function ChoiceList({ children, className, 'data-testid': testId }: ChoiceListProps): JSX.Element;

export declare interface ChoiceListProps {
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** One target inside an open disclosure: indented under the row's glyph. */
export declare function ChoiceOption({ icon, label, onSelect, disabled, 'data-testid': testId }: ChoiceOptionProps): JSX.Element;

export declare interface ChoiceOptionProps {
    icon?: ReactNode;
    label: string;
    onSelect: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}

export declare function ChoiceRow({ icon, title, description, onSelect, children, open: openProp, onOpenChange, disabled, disabledReason, busy, selected, 'data-testid': testId, }: ChoiceRowProps): JSX.Element;

export declare interface ChoiceRowProps {
    icon?: ReactNode;
    title: string;
    /** One line: what choosing this does. */
    description?: string;
    /** An action row: pressing it does the thing. */
    onSelect?: () => void;
    /**
     * A disclosure row: pressing it opens `children` beneath. Controlled when
     * `open` is given, otherwise the row keeps its own state.
     */
    children?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    /** Why it is disabled, as the row's tooltip. */
    disabledReason?: string;
    /** The row is doing what it was asked; it reads as pressed and takes no more presses. */
    busy?: boolean;
    /**
     * One of several: the row is a radio (`role="radio"`, `aria-checked`) and a
     * selection mark leads it in place of the icon tile. Undefined for an action row.
     */
    selected?: boolean;
    'data-testid'?: string;
}

/** An X: "close", "dismiss". */
export declare function CloseIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A cloud: a hosted / cloud computer, beside `MonitorIcon` (a local one) in a fleet indicator. */
export declare function CloudIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * `TONE_SOFT` in the code family. One background for all tones — the code
 * palette carries meaning in the foreground, the way syntax highlighting
 * does; tinted backgrounds behind text this dark read as noise.
 */
export declare const CODE_TONE_SOFT: Record<Tone, string>;

/**
 * `TONE_SOLID` in the code family. Text is `code-bg` rather than white:
 * these accents are pastels, and white on a pastel fails contrast.
 */
export declare const CODE_TONE_SOLID: Record<Tone, string>;

/** `TONE_SOLID_BG` in the code family — swatches, dots, legend keys. */
export declare const CODE_TONE_SOLID_BG: Record<Tone, string>;

/** `TONE_TEXT` in the code family — labels and icons on an untinted surface. */
export declare const CODE_TONE_TEXT: Record<Tone, string>;

export declare function CodeBlock({ code, language, theme, copyButton, showLineNumbers, className, style, 'data-testid': testId, ariaLabel, }: CodeBlockProps): JSX.Element;

export declare type CodeBlockLanguage = 'tsx' | 'ts' | 'jsx' | 'js' | 'json' | 'bash' | 'sh' | 'text';

export declare interface CodeBlockProps {
    code: string;
    language?: CodeBlockLanguage;
    theme?: CodeBlockTheme;
    copyButton?: boolean;
    showLineNumbers?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    ariaLabel?: string;
}

/**
 * `light` / `dark` follow the app theme (`dark` is the INVERSE surface, so it
 * flips to a light box in dark mode). `console` is the theme-invariant code
 * family (`--color-code-*`): use it for a block sitting inside a log console,
 * terminal or other permanently-dark panel, where an inverse box would read
 * as a light slab on the dark panel in dark mode.
 */
export declare type CodeBlockTheme = 'dark' | 'light' | 'console';

export declare function CodeEditor({ value, onChange, language: _language, // Phase 1: accepted but not applied yet
    placeholder, minLines, maxLines, readOnly, variables, 'aria-label': ariaLabel, }: CodeEditorProps): JSX.Element;

export declare interface CodeEditorProps {
    value: string;
    onChange: (next: string) => void;
    /** Hint for future syntax highlighting. Phase 1: purely cosmetic / no-op. */
    language?: 'jsonpath' | 'javascript' | 'template' | 'plain';
    placeholder?: string;
    /** Minimum visible lines. Default 4. */
    minLines?: number;
    /** Maximum visible lines before the editor starts scrolling. Default 20. */
    maxLines?: number;
    readOnly?: boolean;
    /** Available context variables — rendered as clickable insert pills. */
    variables?: string[];
    'aria-label'?: string;
}

/** Angle brackets around a slash: source, "the developer-facing thing". */
export declare function CodeIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function CollapsedIconStrip({ connectionState, onExpand, onDocuments, onPipelines, onObservability, active, headerHeight, className, 'data-testid': testId, }: CollapsedIconStripProps): JSX.Element;

export declare interface CollapsedIconStripProps {
    connectionState: ConnectionState_3;
    /**
     * Opens the full sidebar. Omit when the surface has no expanded sidebar to
     * show: the strip keeps its header row but drops the expand button, so it
     * never offers a column that would open empty.
     */
    onExpand?: () => void;
    onDocuments?: () => void;
    onPipelines?: () => void;
    onObservability?: () => void;
    /** The section the window is in. */
    active?: CollapsedIconStripSection | null;
    /**
     * The app header's height, when the strip starts at the top of the window
     * beside it (AppShell `sidebarFullHeight`): the expand button is centred in
     * that row, and the sections start below it. Omit when the strip hangs
     * below the header.
     */
    headerHeight?: number;
    className?: string;
    'data-testid'?: string;
}

export declare type CollapsedIconStripSection = 'documents' | 'pipelines' | 'observability';

export declare function CollapsibleSection({ title, defaultOpen, badge, actions, children, className, storageKey, density, 'data-testid': testId, }: CollapsibleSectionProps): default_2.JSX.Element;

export declare interface CollapsibleSectionProps {
    /**
     * The header label. A node, not a string: real section headers pair a name
     * with something that qualifies it — an id slug, a status dot, a count —
     * and a `string` prop forces every such caller to either drop the qualifier
     * or hand-roll its own accordion, which is what this component exists to
     * stop. It is only ever rendered, never measured or compared.
     */
    title: default_2.ReactNode;
    defaultOpen?: boolean;
    /** Optional element rendered on the right side of the header (e.g. a count chip). */
    badge?: default_2.ReactNode;
    /**
     * Interactive controls for the header row — a Terminate button, a menu.
     * Rendered BESIDE the header button, never inside it: the header is a
     * `<button>`, and a button inside a button is invalid HTML that React
     * warns about on every render. `badge` stays for inert content.
     */
    actions?: default_2.ReactNode;
    children: default_2.ReactNode;
    className?: string;
    /** If provided, the open state is persisted to localStorage under this key. */
    storageKey?: string;
    /**
     * `'compact'` tightens the header's padding, drops it to `text-xs`, and
     * shrinks the chevron — for a section nested inside an already-dense
     * panel where the default's `text-sm` / `px-4 py-3` header reads
     * oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /** Lands on the header button — the thing tests and contrast probes read. */
    'data-testid'?: string;
}

export declare function CollapsibleSidebar({ connectionState, onDisconnect, onReconnect, onCollapse, presenceUsers, currentClientId, currentChannel, activityEvents, userId, documents, onOpenDocument, pipelines, onOpenPipeline, onSeeAllPipelines, videoSlot, }: CollapsibleSidebarProps): JSX.Element;

declare interface CollapsibleSidebarProps {
    connectionState: ConnectionState_2;
    onDisconnect: () => void;
    onReconnect: () => void;
    onCollapse?: () => void;
    presenceUsers: PresenceUser_3[];
    currentClientId: string;
    currentChannel: string;
    activityEvents: ActivityEvent[];
    userId: string;
    documents: DocumentInfo[];
    onOpenDocument: (id: string) => void;
    pipelines?: PipelineSidebarEntry[];
    onOpenPipeline?: (id: string) => void;
    onSeeAllPipelines?: () => void;
    videoSlot?: React.ReactNode;
}

export declare interface CollectionAction {
    id: string;
    label: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}

/** What an empty collection says. A plain node renders as given. */
export declare interface CollectionEmpty {
    title: string;
    description?: ReactNode;
    /** A button ("New connector"). */
    action?: ReactNode;
}

export declare interface CollectionFilter {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    /** Value meaning no restriction. Defaults to the empty string. */
    emptyValue?: string;
}

/**
 * Use this when a page IS a list of records: header, `CollectionToolbar`, a striped `DataTable` (or any body), built-in loading/empty/error states, and the selected row in a `SidePane`.
 *
 * Fills its parent (`h-full min-h-0`); the body scrolls, the header and toolbar do not.
 * Collection layout policy belongs here: a page supplies content and state, it does not
 * reproduce Stack/PageHeader/Toolbar spacing at each route.
 *
 * @example
 * <CollectionPage gutter="page" title="Connectors" breadcrumbs={trail}
 *   toolbar={{ label: 'Connector filters', search: { value: q, onChange: setQ } }}
 *   table={{ data: rows, columns, keyField: (r) => r.id, onRowClick: (r) => setSelected(r.id) }}
 *   loading={isLoading} error={error?.message} onRetry={refetch}
 *   empty={{ title: 'No connectors yet', action: <Button>New connector</Button> }}
 *   detail={selected ? { title: selected.name, onClose: () => setSelected(null), content: <ConnectorSummary c={selected} /> } : null} />
 */
export declare function CollectionPage<T>({ title, description, headerActions, toolbar, toolbarPlacement, back, children, breadcrumbs, badge, density, titleAs, table, loading, error, onRetry, empty, isEmpty, detail, gutter, className, ...rest }: CollectionPageProps<T>): JSX.Element;

/** The selected row's pane: a `SidePane` registration plus its body. */
export declare type CollectionPageDetail = Omit<SidePaneProps, 'children'> & {
    content: ReactNode;
};

export declare interface CollectionPageProps<T = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    title: string;
    description?: string;
    headerActions?: ReactNode;
    toolbar?: CollectionToolbarProps;
    /**
     * Where the toolbar draws (since 2.504.0). `auto` (default) puts its
     * search, filters and count in the header's actions row — before
     * `headerActions` — whenever nothing in it needs a full row (no active
     * `selection` prop, no `children`), so a collection page has no separate
     * search band. `band` keeps the toolbar's own row under the header;
     * `header` forces the header row.
     */
    toolbarPlacement?: 'auto' | 'header' | 'band';
    /** Any body. Optional since the template gained `table`; one of the two is expected. */
    children?: ReactNode;
    back?: PageHeaderProps['back'];
    /** The trail as the header's first row. */
    breadcrumbs?: BreadcrumbItem[];
    badge?: ReactNode;
    /** Header density; default `compact`. */
    density?: Density;
    /** The title's heading level (since 2.504.0); default `h1`. */
    titleAs?: 'h1' | 'h2' | 'h3';
    /**
     * The body as a striped `DataTable` (striping on unless the props say otherwise).
     * Wins over `children`. Its `data.length === 0` is the empty state.
     */
    table?: DataTableProps<T>;
    /** Loading: the table's skeleton rows, or a `LoadingState` for a children body. */
    loading?: boolean;
    /** A failed load. A string renders as an `ErrorState` (with Retry when `onRetry`); a node renders as given. */
    error?: ReactNode;
    onRetry?: () => void;
    /** The empty state. Shown when `table.data` is empty, or when `isEmpty` for a children body. */
    empty?: CollectionEmpty | ReactNode;
    /** A children body has no rows (a table body works this out from `table.data`). */
    isEmpty?: boolean;
    /**
     * The selected row, in a `SidePane` beside the collection. `null`: no row selected
     * (pass `null` rather than omitting it, so a page without a shell host keeps its split).
     */
    detail?: CollectionPageDetail | null;
    /**
     * `none` (default, the original contract): the host owns the gutter. `page`:
     * header, toolbar and body sit at `--ui-page-gutter`. New pages want `page`.
     */
    gutter?: PageGutter;
}

/** `CollectionPage`. */
export declare interface CollectionPageSpec extends SpecHeader {
    template: 'collection';
    toolbar?: Omit<CollectionToolbarProps, 'children' | 'filterPanel' | 'placement'> & {
        filterPanel?: {
            content: LeafList;
            activeCount?: number;
            onClear?: () => void;
        };
    };
    toolbarPlacement?: 'auto' | 'header' | 'band';
    /** The body as a striped `DataTable`; wins over `sections`. */
    table?: Omit<TableLeaf, 'kind'>;
    /** Any other body. */
    sections?: SectionList;
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    empty?: {
        title: string;
        description?: string;
        action?: ButtonLeaf;
    };
    /** A sections body has no rows. */
    isEmpty?: boolean;
    /** The selected row in a `SidePane`; `null` while nothing is selected. */
    detail?: (Omit<CollectionPageDetail, 'content' | 'footer' | 'trailing'> & {
        content: SectionList;
    }) | null;
}

/**
 * The toolbar's search. Collapsed to a search icon by default (since
 * 2.504.0): it expands on click or `/` and folds away again while empty, so a
 * collection never carries a full-width search band. `collapsible: false`
 * keeps the open field.
 */
export declare type CollectionSearch = Pick<SearchInputProps, 'value' | 'onChange' | 'placeholder' | 'aria-label' | 'data-testid' | 'shortcut'> & {
    collapsible?: boolean;
};

/**
 * A row selection, drawn IN PLACE of the resting controls (search, filters,
 * count) on the same toolbar row, so selecting a row never inserts a band
 * above the table and the table's top edge never moves. Since 2.442.0.
 */
export declare interface CollectionSelection {
    /** Selected row count. `0` restores the resting controls. */
    count: number;
    /** Override the "N selected" label. */
    label?: ReactNode;
    /** Bulk actions for the selection — `Button size="sm"`s, drawn at the row's end. */
    actions?: ReactNode;
    /** Clears the selection (the row's × control). */
    onClear: () => void;
}

/** One collection control row: filters, count, notices and named icon actions.
 * Hosts supply state and commands, never control geometry or presentation. */
export declare function CollectionToolbar({ label, layout, search, filters, filterPanel, summary, resultCount, placement, notices, actions, onRefresh, refreshing, selection, children }: CollectionToolbarProps): JSX.Element;

/**
 * Whether a toolbar can live in a page header's actions row instead of its
 * own band: nothing in it needs the full row. A selection replaces the row's
 * controls, and `children` are host content of unknown width. Since 2.504.0.
 */
export declare function collectionToolbarFitsHeader(toolbar: CollectionToolbarProps): boolean;

export declare interface CollectionToolbarProps {
    label: string;
    /** Tables add a cell inset; cards and standalone collections align to their content edge. */
    layout?: 'table' | 'cards';
    search?: CollectionSearch;
    filters?: CollectionFilter[];
    /**
     * Host-built content for the same Filters popover, for filters that are not
     * single selects (multi-select facets such as `WorkListFilters`). Drawn
     * after any `filters`; `activeCount` joins the trigger's count and
     * `onClear` runs with the panel's Clear. Since 2.504.0.
     */
    filterPanel?: {
        content: ReactNode;
        activeCount?: number;
        onClear?: () => void;
    };
    /** A count line ("12 of 40 runs"). Hidden while `resultCount` is 0 — the empty state says it instead. */
    summary?: ReactNode;
    /**
     * How many items the collection is showing right now (since 2.504.0). At
     * `0` the toolbar draws no count: "0 of 0 artworks" above an empty state is
     * chrome describing nothing. Leave it undefined to always draw `summary`.
     */
    resultCount?: number;
    /**
     * `band` (default) is the toolbar's own row above the collection. `header`
     * (since 2.504.0) is the same controls with no row of their own, for a
     * page header's actions row — `CollectionPage` uses it automatically.
     */
    placement?: 'band' | 'header';
    /** Explanations belong behind an info control, never in the filter row. */
    notices?: ReactNode[];
    actions?: CollectionAction[];
    onRefresh?: () => void;
    refreshing?: boolean;
    /** While `selection.count > 0` the row shows the selection and its bulk actions instead of search/filters/count. */
    selection?: CollectionSelection;
    children?: ReactNode;
}

declare interface ColorLike {
    set(value: string): unknown;
}

/** Render `children` in the nearest DockedColumn's dock (in place when there is none). */
export declare function ColumnDock({ children }: ColumnDockProps): JSX.Element | null;

export declare interface ColumnDockProps {
    children: ReactNode;
}

export declare function Combobox(props: ComboboxProps): JSX.Element;

export declare interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    /** A short right-aligned tag on the option's title line (a workspace, a team). */
    meta?: string;
    /** A small visual drawn before the title (an avatar). Never matched by the filter. */
    leading?: ReactNode;
    disabled?: boolean;
}

export declare type ComboboxProps = SingleComboboxProps | MultiComboboxProps;

export declare interface Command {
    id: string;
    label: string;
    group?: string;
    hint?: string;
    keywords?: string[];
    icon?: ReactNode;
    /** Display-only shortcut glyphs rendered right-aligned in the item. */
    shortcut?: string[];
    /**
     * Active global hotkey that invokes `run()` without opening the palette.
     * Format: `[mod+|cmd+|meta+|ctrl+|shift+|alt+]<key>`. `mod` resolves to
     * cmd on macOS and ctrl elsewhere. The key portion is matched against
     * `KeyboardEvent.key` lowercased — so `?`, `/`, `k`, `arrowdown` all
     * work; multi-key chords are not supported in v1.
     */
    hotkey?: string;
    /** Visibility predicate — when returns false, the command is filtered out. */
    when?: () => boolean;
    /** Action invoked when the item is selected. */
    run: () => void | Promise<void>;
}

export declare function CommandPalette({ placeholder, emptyState, className, searchRecords, onOpenRecord, recordDebounceMs, minRecordQueryLength, }?: CommandPaletteProps): JSX.Element;

export declare interface CommandPaletteController {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
    query: string;
}

export declare function CommandPaletteHint({ className, label, size }?: CommandPaletteHintProps): JSX.Element;

export declare interface CommandPaletteHintProps {
    className?: string;
    /** The word after the shortcut. Default "Search". Since 2.385.0. */
    label?: string;
    /**
     * `sm` (default) is the quiet 24px chip; `md` is a 36px top-bar button that
     * sits level with the bar's other controls (the Documents redesign's
     * "⌘K Search"). Since 2.385.0.
     */
    size?: 'sm' | 'md';
}

export declare interface CommandPaletteProps {
    /**
     * Input placeholder. Hosts must only promise what `searchRecords` can find
     * (not "a person" unless people are indexed).
     */
    placeholder?: string;
    /** Replaces the default "No matches for “query”" empty row. */
    emptyState?: ReactNode;
    className?: string;
    /**
     * Async record search. When set, a record section follows the commands
     * once the query reaches `minRecordQueryLength`; commands never wait on it.
     * Since 2.457.0.
     */
    searchRecords?: SearchPaletteRecords;
    /** Called with the record on Enter/click. Defaults to `location.assign(href)`. */
    onOpenRecord?: (record: PaletteRecord) => void;
    /** Quiet period before `searchRecords` fires. Default 200ms. */
    recordDebounceMs?: number;
    /** Shortest trimmed query sent to `searchRecords`. Default 2. */
    minRecordQueryLength?: number;
}

export declare function CommandPaletteProvider({ commands, getDynamicCommands, recentsKey, recentsLimit, children, }: CommandPaletteProviderProps): JSX.Element;

export declare interface CommandPaletteProviderProps {
    /**
     * Static command list. Optional: pure-registry consumers can pass
     * nothing and have pages contribute commands via `useRegisterCommand`.
     */
    commands?: Command[];
    /**
     * Synchronous derivation hook for query-dependent commands (URL paste,
     * UUID detection, etc.). Results are merged with the static `commands`
     * list before cmdk runs its own filter.
     */
    getDynamicCommands?: (query: string) => Command[];
    /**
     * Future hook — currently the keybinding is always cmd/ctrl + K. Accepted
     * for API forward-compat; ignored in v1.
     */
    toggleShortcut?: string[];
    /**
     * localStorage key for the most-recently-used command id list. Pass
     * `null` to disable persistence (useful for tests and SSR). Defaults
     * to `'cui:command-palette:recents'`.
     */
    recentsKey?: string | null;
    /** Maximum number of recent command ids to remember. Default: 5. */
    recentsLimit?: number;
    children: ReactNode;
}

/**
 * A speech bubble with two lines of text: comments ON something — a thread
 * anchored to a page or a slide — as opposed to `ChatIcon`'s conversation.
 * The two sit side by side on the documents rail (the workbench's Comments
 * entry beside the Conversation panel), so they must not be the same glyph;
 * `QuoteIcon` was tried there and read as "55" at 14px. Since 2.384.2.
 */
export declare function CommentIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function CommentList({ title, comments, total, onViewAll, now, emptyLabel, max, first, variant, className, 'data-testid': testId, }: CommentListProps): JSX.Element;

export declare interface CommentListItem {
    id: string;
    author: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    role?: string | null;
    createdAt: string | number | Date;
    text: string;
}

export declare interface CommentListProps {
    title?: string;
    comments: CommentListItem[];
    /** Total in the full discussion, when larger than what is passed. */
    total?: number;
    onViewAll?: () => void;
    /** Clock for relative times (ms since epoch). Default Date.now(). */
    now?: number;
    emptyLabel?: string;
    /** Show at most this many comments. */
    max?: number;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 32px avatars, 14px
     * text, "View all" quiet until hover — a work item's Brief. `label`: the
     * small caption and 28px avatars, for a side panel.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

export declare interface ComposerSuggestion {
    id: string;
    /** Why this is being offered — shown above the title on the card. */
    reason: string;
    title: string;
    /** Fills the prompt field when chosen. */
    prompt: string;
    /** Fills the title field. Defaults to the suggestion's own title. */
    fillTitle?: string;
    label?: string;
    tone?: Tone;
    meta?: ReactNode;
    context?: string;
}

/** The full-width composer shelf. Owns backdrop, insets and readable width.
 * Nested composers reuse their containing shelf rather than painting twice.
 * `compact` pads 8px above and below, 4px while its composer is folded
 * (`[data-composer-fold]`: the idle row or the explicit collapse). */
export declare function ComposerSurface({ children, className, compact, ...rest }: HTMLAttributes<HTMLDivElement> & {
    compact?: boolean;
}): JSX.Element;

/** "No prior runs" for n = 0, else "Low confidence · Based on 2 runs". */
export declare function confidenceNote(sampleSize: number): string;

/** Sample size → confidence: 0 none, 1–2 low, 3–5 medium, more than 5 high. */
export declare function confidenceOf(sampleSize: number): RunEstimateConfidenceLevel;

/** The kinds of decision the `confirm.inline` audit rule watches. */
export declare type ConfirmActionKind = 'approve' | 'reject' | 'spend' | 'delete' | 'cancel';

export declare function ConfirmButton({ label, question, confirmLabel, cancelLabel, tone, variant, size, disabled, busy, onConfirm, actionKind, className, 'data-testid': testId, }: ConfirmButtonProps): JSX.Element;

export declare interface ConfirmButtonProps {
    /** The idle button's label — "Cancel run", "Delete". */
    label: ReactNode;
    /** What the reader is asked; short, ends with "?" — "Cancel this run?". Also the group's accessible name. */
    question: string;
    /** The confirming button's label. Default "Confirm". */
    confirmLabel?: string;
    /** The button that backs out. Default "Cancel". */
    cancelLabel?: string;
    /** `destructive` paints the confirming button `danger-solid`; `default` (default) paints it `primary`. */
    tone?: 'default' | 'destructive';
    /** The idle button's variant. Default `secondary` (`danger` when `tone="destructive"`). */
    variant?: ButtonVariant;
    /** Every button's size, idle and asking. Default `sm`. */
    size?: ButtonSize;
    disabled?: boolean;
    /** The host's own pending state: the button shows disabled and `aria-busy`. */
    busy?: boolean;
    /** Fired on Confirm. A returned promise keeps the control busy until it settles. */
    onConfirm: () => void | Promise<unknown>;
    /**
     * What the decision is, for the audit (`confirm.inline`): emitted as
     * `data-action-kind` on the button and on the question group, so an approve,
     * a reject or a credit spend is known to confirm in place. Since 2.515.0.
     */
    actionKind?: ConfirmActionKind;
    className?: string;
    'data-testid'?: string;
}

export declare function ConfirmDialog({ open, onConfirm, onCancel, title, body, confirmLabel, cancelLabel, confirmDisabled, tone, children, }: ConfirmDialogProps): JSX.Element;

export declare interface ConfirmDialogProps {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
    body?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDisabled?: boolean;
    /** Visual tone for the confirm button. Defaults to 'info' (primary blue). */
    tone?: 'destructive' | 'caution' | 'info';
    /** Preview slot — extra content rendered between body and footer. */
    children?: React.ReactNode;
}

export declare function ConnectionPill({ state, tone, compact, withLabel, labels, action, className, 'data-testid': testId, }: ConnectionPillProps): JSX.Element;

export declare interface ConnectionPillProps {
    state: ConnectionState;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * A wrapper `className` cannot substitute: the label and dot colours come
     * from the per-state map below, on children the caller never sees.
     */
    tone?: ConnectionPillTone;
    /** Dot-only rendering — no label text. Default false. */
    compact?: boolean;
    /** Render the text label next to the dot. Default true. Set false for dot-only. */
    withLabel?: boolean;
    /** Override label text per state (e.g. localized strings). */
    labels?: Partial<Record<ConnectionState, string>>;
    /**
     * Optional action rendered inside the pill — "Reconnect" when the socket is
     * down, a host-defined control otherwise.
     *
     * A status pill is where people look when the connection misbehaves, so it
     * is also where they reach for the fix. Without this the recovery control
     * has to live somewhere else in the chrome, and in practice it ends up
     * nowhere: the host keeps threading an `onReconnect` down to a component
     * that no longer renders it.
     *
     * The host decides the label and whether there is an action at all, because
     * the sensible control is state-dependent and that policy belongs to the
     * product, not to the pill. Ignored when `compact` — a dot has no room for
     * a verb.
     */
    action?: {
        label: string;
        onClick: () => void;
        disabled?: boolean;
        'data-testid'?: string;
    };
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the pill paints in. */
export declare type ConnectionPillTone = SurfaceTone;

/** Connection lifecycle states */
declare type ConnectionState = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare type ConnectionState_2 = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

declare type ConnectionState_3 = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
export declare function ConnectionStatus(props: ConnectionStatusProps): JSX.Element;

/** @deprecated Use `ConnectionPill` from `/shared`. Alias retained for one minor. */
declare type ConnectionStatusProps = Pick<ConnectionPillProps, 'state'>;

export declare const ConsoleSurfaceContext: Context<ConsoleSurfaceState | null>;

/**
 * What an enclosing console surface (a `ChatColumnBackdrop` in Agent/Terminal)
 * is already painting. A composer inside one reads this and does NOT start a
 * second star field in the same region: it keeps its tint and border and lets
 * the column's field show through. `working` is the column's "a loop is
 * mid-turn" cue, so a composer can follow it without the host passing it twice.
 */
export declare interface ConsoleSurfaceState {
    /** True while the enclosing surface is painting its sky. */
    painting: boolean;
    /** True while the enclosing surface shows its working density. */
    working: boolean;
}

export declare function ConsultCard({ question, context, origin, askedAt, status, answer, answeredBy, onAnswer, answerPlaceholder, busy, footer, flush, className, 'data-testid': testId, }: ConsultCardProps): JSX.Element;

export declare interface ConsultCardProps {
    /** The agent's question. */
    question: string;
    /** What the agent was doing when it asked. */
    context?: string;
    /** Where it came from — repo, box, session. Rendered as quiet chips. */
    origin?: readonly string[];
    /** ISO timestamp or preformatted "asked 4m ago" string. */
    askedAt?: string;
    status: 'pending' | 'answered' | 'expired' | 'withdrawn';
    answer?: string;
    answeredBy?: string;
    /** Submit an answer. Only rendered while status is 'pending'. */
    onAnswer?: (answer: string) => void;
    answerPlaceholder?: string;
    busy?: boolean;
    /**
     * Extra footer content, e.g. a link to the session. Rendered in EVERY
     * state: beside the send button while answerable, on its own row when the
     * card is pending but has no `onAnswer` — the one state where this is the
     * card's only affordance, and the one state where it used to be dropped.
     */
    footer?: ReactNode;
    /**
     * Draw no frame of its own — no border, radius, padding or background — for
     * a card sitting inside a list group that already supplies them. The
     * pending signal stays on the "agent waiting" chip.
     */
    flush?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** The library's container thresholds, in one place (px). */
export declare const CONTAINER_COMPACT_BELOW: {
    /** A composer's `wide` breakpoint: below it `responsive="pane"` is one row. */
    readonly pane: 600;
    /** A plain page's header drops to compact below this container height. */
    readonly header: 640;
};

/** THE rule: `size` under `compactBelow` is compact; unmeasured (null / ≤ 0) or no threshold is comfortable. */
export declare function containerDensity(size: number | null | undefined, compactBelow: number | null | undefined): Density;

export declare interface ContainerDensityOptions<T extends HTMLElement> {
    /** The threshold for `density`. Omitted: `density` is always `comfortable` (the size is still measured). */
    compactBelow?: number | null;
    /** Measure the element itself (default) or its parent — the room it is given. */
    of?: 'self' | 'parent';
    /** Default `width`. */
    axis?: 'width' | 'height';
    /** `content` (default, the observer's content rect) or `border` (`getBoundingClientRect`). */
    box?: 'content' | 'border';
    /** Turn the observer off (nothing is measured; `size` holds its last value). Default true. */
    enabled?: boolean;
    /** Another ref that needs the same element (a roving-toolbar hook's, a forwarded ref). */
    forward?: Ref<T>;
}

export declare interface ContainerDensityState<T extends HTMLElement> {
    /** Attach to the element. Also fills `forward`. */
    ref: (el: T | null) => void;
    /** The measured size in px; `null` before the first measurement. */
    size: number | null;
    /** `containerDensity(size, compactBelow)`. */
    density: Density;
}

/** The CSS variable fixed overlays read to stay clear of an open ContextColumn. */
export declare const CONTEXT_COLUMN_INSET_VAR = "--uic-context-column-inset";

export declare function ContextColumn({ state, onStateChange, panels, activeId, onActivate, label, roomy, reserveOverlayInset, className, 'data-testid': testId, }: ContextColumnProps): JSX.Element | null;

/** One of a tabbed panel's parts, as the collapsed strip shows it. Since 2.384.1. */
export declare interface ContextColumnEntry {
    id: string;
    /** The strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Pending count for this entry alone — unresolved comments, a running task. */
    badge?: number;
}

export declare interface ContextColumnPanel {
    id: string;
    /** The tab's text and the strip icon's accessible name. */
    label: string;
    icon: ReactNode;
    /** Unread or pending count, shown on the tab and the strip icon. */
    badge?: number;
    /**
     * The panel's own parts, for the collapsed strip: one icon per entry in
     * place of the panel's icon. Pressing one opens the column to this panel
     * and reports the entry (`onActivate(panel.id, entry.id)`). The open tab
     * row is unchanged — the panel's content owns its own tabs. An EMPTY array
     * (2.386.0) puts nothing on the strip for this panel — its parts all live
     * elsewhere right now (a page's comments on its own tab) and the host opens
     * it another way; omit `entries` for the panel's one icon.
     */
    entries?: readonly ContextColumnEntry[];
    /** What the panel shows while it is the active one. */
    content: ReactNode;
    /**
     * `tabs` (default): the column's header row — tabs, width and collapse
     * controls — sits above the panel. `bare`: while this panel is the active
     * one the header row is not drawn and the panel fills the column, bringing
     * its own header and close (a call drawer: "Start a call ×"). Since 2.391.0.
     */
    chrome?: 'tabs' | 'bare';
    /**
     * The open column's width while this panel is active. `default` is the
     * column's own (320px, or `roomy`). The call drawers are wider, and narrow
     * one step below a 1440px viewport so the page keeps its width:
     *   `drawer`       340px → 380px at ≥1440 (call settings, the call panel)
     *   `drawer-wide`  360px → 400px at ≥1440 (start a call)
     * Applies in `open` and `wide` alike. Since 2.391.0.
     */
    width?: 'default' | 'drawer' | 'drawer-wide';
}

export declare interface ContextColumnProps {
    state: ContextColumnState;
    onStateChange: (next: ContextColumnState) => void;
    /** In tab order. Empty renders nothing at all. */
    panels: ContextColumnPanel[];
    /** Which panel is showing. Unknown or absent falls back to the first. */
    activeId?: string | null;
    /** A tab or a strip icon was pressed; `entryId` when the icon was one of the panel's `entries`. */
    onActivate: (id: string, entryId?: string) => void;
    /** Accessible name of the column. Default "Side column". */
    label?: string;
    /**
     * Open at 384px instead of 320px on a 2xl viewport (≥1536px) — a pane with
     * rows of label + value (a run draft) that the Work mockup draws wider.
     * Narrower viewports keep 320px so the page beside it keeps its width.
     * Since 2.386.13.
     */
    roomy?: boolean;
    /**
     * While open, publish the column's width as `--uic-context-column-inset` on
     * <html>, so the fixed bottom/top-right overlays (ToastProvider,
     * ChatBubbleStack) move left of it instead of covering a drawer's footer.
     * Default true. Since 2.395.0.
     */
    reserveOverlayInset?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare type ContextColumnState = 'collapsed' | 'open' | 'wide';

/** Two stacked pages: "make a copy". Since 2.390.3. */
export declare function CopyIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * Use this when a record is named in words and its id must stay one action
 * away: `<Inline>{bot.name}<CopyIdButton value={bot.id} label="Copy the bot's id" /></Inline>`.
 */
export declare function CopyIdButton({ value, label, className, 'data-testid': testId }: CopyIdButtonProps): JSX.Element;

export declare interface CopyIdButtonProps {
    /** The id to copy. Shown in the tooltip, never in the page's text. */
    value: string;
    /** What the id is, for the accessible name: "Copy the bot's id". Default "Copy id". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}

declare type CursorMode = 'freeform' | 'table' | 'text' | 'canvas';

/**
 * The audited escape hatch: anything a spec cannot express. Renders inside a
 * `data-page-spec-custom="<reason>"` marker so the audit can count and list
 * every one. Prefer registering a leaf kind.
 */
export declare interface CustomLeaf {
    kind: 'custom';
    render: () => ReactNode;
    /** Why no library leaf fits ("canvas editor", "third-party map"). Required. */
    reason: string;
}

export declare type DashboardColumns = 2 | 3 | 4;

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
export declare function DashboardPage({ title, description, breadcrumbs, actions, badge, back, density, titleAs, stats, kpis, panels, columns, children, gutter, className, 'data-testid': testId, 'data-page-spec': spec, }: DashboardPageProps): JSX.Element;

export declare interface DashboardPageProps extends PageTemplateHeaderProps {
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
    /** Set by `PageFromSpec`: the spec template this page was built from. */
    'data-page-spec'?: string;
}

/** `DashboardPage`: a stat row, then a grid of titled panels. */
export declare interface DashboardPageSpec extends SpecHeader {
    template: 'dashboard';
    stats?: StatStripItem[];
    panels?: ReadonlyArray<{
        id: string;
        title: string;
        action?: LeafList;
        span?: 1 | 2 | 3;
        content: LeafList;
    }>;
    columns?: DashboardColumns;
}

/** One panel of the grid. */
export declare interface DashboardPanel {
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

export declare const DATA_ACCENT_SLOTS: readonly DataAccentSlot[];

/** A slot number, or any CSS colour value (`var(--color-x)`, `#2563eb`, `teal`). */
export declare type DataAccent = DataAccentSlot | (string & {});

/** Spread onto an element; children paint with `bg-[var(--data-accent)]` etc. */
export declare function dataAccentProps(accent: DataAccent | undefined): {
    'data-accent'?: string;
    style?: CSSProperties;
};

export declare type DataAccentSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export declare function DataTable<T>({ rowHeight, data: dataProp, columns: columnsProp, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, frameless, size, striped, narrow, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, selectedKey, isRowSelected, className, 'data-testid': testId, staticRows, }: DataTableProps<T>): JSX.Element;

export declare interface DataTableColumn<T> {
    /** Stable id for the column. When `accessor` is omitted, used as the data key on T. */
    key: string;
    /** Header label. */
    header: ReactNode;
    /** Optional cell renderer. If absent, the value at `key` is rendered as a string. */
    render?: (row: T, rowIndex: number) => ReactNode;
    /**
     * Optional sort comparator. If absent but `sortable=true`, the default
     * comparator compares numbers/bigints/Dates/booleans by VALUE and everything
     * else by `String(...)`. (It used to stringify unconditionally, which sorted a
     * numeric column lexicographically — 1, 10, 100, 2, 9 — and a Date column by
     * weekday name.)
     */
    compare?: (a: T, b: T) => number;
    /** Optional filter accessor. If absent but `filterable=true`, filters by `String(row[key])`. */
    getFilterText?: (row: T) => string;
    sortable?: boolean;
    /** Include this column's text in the global search box. Default: true if a search box is shown. */
    filterable?: boolean;
    width?: string;
    align?: 'left' | 'right' | 'center';
    /** A number column: right-aligned header and cells, tabular figures. Since 2.434.0. */
    numeric?: boolean;
    /** The label a stacked card (`narrow`) puts before this column's value. Default: `header` when it is a string, else `key`. Since 2.515.3. */
    label?: string;
    className?: string;
}

export declare interface DataTableProps<T> {
    /** Document tables may wrap prose; ordinary collection rows retain their fixed rhythm. */
    rowHeight?: 'fixed' | 'content';
    data: T[];
    columns: DataTableColumn<T>[];
    /** Stable id for each row. Used as React key. */
    keyField: (row: T) => string;
    onRowClick?: (row: T) => void;
    /** Per-row trailing action cell (buttons, menu, etc.). */
    rowActions?: (row: T) => ReactNode;
    /** Show a global search input. Default: false. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Page size. Pagination is shown when data.length > pageSize. */
    pageSize?: number;
    emptyMessage?: ReactNode;
    loading?: boolean;
    loadingRows?: number;
    /**
     * Drop the table's own border/rounding so a composite (e.g. a Card-framed
     * table like identity's EntityTable) can provide the frame instead.
     */
    frameless?: boolean;
    /**
     * Tint alternate rows so the eye can track one row across a wide table.
     *
     * `surface-inset` is the tint, at full strength — about 2% off `surface`,
     * which is a reading aid you feel rather than see. Half that (the first
     * attempt) measured ~1% and was simply invisible: a stripe nobody can
     * perceive is not a subtle stripe, it is a no-op with a prop attached.
     *
     * It stays lighter than `surface-panel`, the hover fill, so hover still
     * reads as the darker row — a stripe that fights the hover state is worse
     * than no stripe, because it makes the row under the pointer ambiguous.
     * Both are tokens, so the relationship holds in dark mode too.
     *
     * Default `true` since 2.504.0 (was `false`): an unstriped wide table is
     * the default nobody should get by accident. Pass `striped={false}` to opt
     * out, e.g. for a two-row summary table.
     */
    striped?: boolean;
    /**
     * Row density, forwarded to `Table`. `sm` (since 2.434.0): every row 44px
     * on one line, a 12px semibold caps header — the app's list step.
     */
    size?: TableSize;
    /**
     * Declares that this table's rows open nothing, and why ("Revisions are
     * read-only snapshots of this submission"). Ignored when `onRowClick` is
     * set. Emitted as `data-collection-rows="static"` +
     * `data-collection-rows-reason` so a rendered-UI audit can require every
     * other collection's rows to be activatable. Since 2.442.0.
     */
    staticRows?: string;
    /**
     * The narrow form (since 2.515.3): under 40rem of the table's own width
     * (a container query, like `ListRailLayout narrow`) each row becomes a
     * stacked card of label/value pairs, the label being the column's `label`
     * (else its string `header`, else `key`). Chosen over a sticky-column
     * scroller because a table's first column rarely identifies a row by
     * itself, and a card reads at 390px without a horizontal gesture. The header
     * row is visually hidden there (sorting is unavailable in the card form);
     * the DOM is the same table, so tests, row clicks and keyboard are unchanged.
     * Default `false`: the table keeps scrolling inside its own box.
     */
    narrow?: boolean;
    /**
     * The table's accessible name (since 2.515.9), on the `<table>` element.
     * A page with two tables (Jobs and Workers) needs each named for a screen
     * reader and for `getByRole('table', { name })`.
     */
    'aria-label'?: string;
    /** The id of the visible heading that names the table (since 2.515.9), on the `<table>`. Wins over `aria-label` for assistive tech, as ARIA says. */
    'aria-labelledby'?: string;
    /**
     * The selected row's key (`keyField(row)`) (since 2.515.9): the row the
     * page's inspector shows. It is tinted with the selection token
     * (`bg-primary-bg`, over the stripe), carries `aria-selected="true"` and
     * `data-selected`; while a selection is in use (this or `isRowSelected`
     * given) every other row carries `aria-selected="false"`. `null`: nothing
     * selected. Display only: the host still owns the selection
     * (`onRowClick`).
     */
    selectedKey?: string | null;
    /** The predicate form of `selectedKey`, for more than one selected row (since 2.515.9). `selectedKey` wins when both are given. */
    isRowSelected?: (row: T) => boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function DecisionPath({ steps, current, className, 'aria-label': ariaLabel, 'data-testid': testId }: DecisionPathProps): JSX.Element;

export declare interface DecisionPathProps extends DecisionPathState {
    /** Names the list for assistive tech. Default "Decision path". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** Where a path stands: its labels and the 0-based current step. */
export declare interface DecisionPathState {
    steps: readonly string[];
    /** 0-based; steps before it are complete. Past the end: every step is complete. */
    current: number;
}

export declare const DEFAULT_LINK_RELATIONS: LinkRelationOption[];

export declare const DEFAULT_PIPELINE_ICONS: string[];

/** Typed identity for authoring a spec: `const page = definePage({ template: 'collection', … })`. */
export declare function definePage<S extends PageSpec>(spec: S): S;

export declare const DENSITIES: readonly Density[];

export declare type Density = 'comfortable' | 'compact';

/** Sets the density for everything under it. See the module comment. */
export declare function DensityProvider({ density, value, children }: DensityProviderProps): JSX.Element;

export declare interface DensityProviderProps {
    /**
     * The scale for everything under it (since 2.440.0): the type step, row and
     * control heights. What an app shell sets once. Leaves the form inherited.
     */
    density?: Density;
    /**
     * The scale AND the form (2.437.0): a region whose chrome folds — a side
     * pane, a canvas column. Wins over `density` when both are given.
     */
    value?: Density;
    children: ReactNode;
}

/** A monitor on a stand: a computer — a provisioned box. Since 2.411.0. */
export declare function DesktopIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function DetailHeader({ title, badge, description, meta, aside, asideWidth, as: Heading, className, 'data-testid': testId, }: DetailHeaderProps): JSX.Element;

export declare interface DetailHeaderProps {
    title: ReactNode;
    /** Sits inline after the title — a status chip, a badge, a count. */
    badge?: ReactNode;
    /** One line of prose. Capped at a readable measure, not the panel width. */
    description?: ReactNode;
    /** The metadata line. Pass a `<MetaLine>`; anything is accepted. */
    meta?: ReactNode;
    /** Right-hand region — progress bars, a gauge, a small action cluster. */
    aside?: ReactNode;
    /** Width of the aside in px. Default 260. */
    asideWidth?: number;
    /** Heading level, so a panel nested under a page h1 does not claim h1. `h1` (since 2.504.0) when the header is the page's (`DetailPage`). */
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
    'data-testid'?: string;
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
export declare function DetailPage({ title, badge, description, meta, actions, breadcrumbs, titleAs, tabs, tabsLabel, tabsOverflow, activeTab, onTabChange, children, aside, gutter, className, 'data-testid': testId, 'data-page-spec': spec, }: DetailPageProps): JSX.Element;

export declare interface DetailPageProps {
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
     * The tab row in a column too narrow for it (since 2.515.9). `scroll`
     * (default, unchanged): one row that scrolls sideways, the current tab
     * kept in view. `menu`: under 360px of the row's width the first and the
     * current tab stay and the rest fold into `More ▾`.
     */
    tabsOverflow?: 'scroll' | 'menu';
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

/** `DetailPage`: header, then tabs for the record's facets. */
export declare interface DetailPageSpec {
    template: 'detail';
    title: string;
    badge?: LeafSpec;
    description?: string;
    /** The metadata line — a `meta` leaf. */
    meta?: LeafSpec;
    actions?: LeafList;
    breadcrumbs?: BreadcrumbItem[];
    titleAs?: 'h1' | 'h2' | 'h3';
    tabs?: ReadonlyArray<{
        id: string;
        label: string;
        badge?: number | string;
        disabled?: boolean;
        content: SectionList;
    }>;
    activeTab?: string;
    onTabChange?: (id: string) => void;
    /** The body when there are no tabs. */
    sections?: SectionList;
    aside?: LeafList;
    gutter?: PageGutter;
    'data-testid'?: string;
}

/** One section of the record, drawn as a tab. */
export declare interface DetailPageTab {
    id: string;
    label: ReactNode;
    /** A count or chip after the label. */
    badge?: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    /** `data-testid` on this tab's trigger (since 2.515.9). */
    testId?: string;
    /** The same as `testId`, in attribute form (since 2.515.9); `testId` wins when both are given. */
    'data-testid'?: string;
    /** The section body. Only the active tab's body is mounted. */
    content: ReactNode;
}

export declare function DetailSection({ title, as: Heading, hint, actions, first, variant, size: sizeProp, description, children, className, 'data-testid': testId, }: DetailSectionProps): JSX.Element;

export declare interface DetailSectionProps {
    title: string;
    /** Semantic heading level, independent of visual size. Default h3 preserves nested detail sections; use h2 directly under a page title. */
    as?: 'h2' | 'h3' | 'h4';
    /** Quiet qualifier beside the title — a count, a state, a caveat. */
    hint?: ReactNode;
    /** Right-aligned affordance for this section only. */
    actions?: ReactNode;
    /** Suppress the leading rule. Use on the first section of a surface. */
    first?: boolean;
    /**
     * `label` (default): a small uppercase caption under a hairline, for a
     * drawer or side panel. `heading` (since 2.386.15): a 16px sentence-case
     * heading for a document-like body (a work item's Brief); its `actions`
     * stay quiet until the section is hovered or focused (always shown where
     * there is no hover). Since 2.504.0 the `heading` variant draws the same
     * leading hairline as `label` (suppressed by `first`): stacked heading
     * sections with no rule read as one long section.
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only. `md` (default) is the 16px heading. `lg` (since 2.390.0)
     * is a page's section heading — 19px semibold on a 28px row, sentence case
     * ("What needs attention", "Plan next", "Why this matters"). `sm` (since
     * 2.429.0) is the body step — a 14px semibold heading over a 12px
     * description (`T size="sm"` / `T size="xs"`) — for a section inside a
     * tabbed pane beside `PageSection size="sm"`.
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * `heading` only: one line under the heading, before the content — what
     * the section is for ("Add enough detail for an engineer or agent to know
     * what success looks like."). Since 2.390.0.
     */
    description?: ReactNode;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface DiffAnnotation {
    /** Path as it appears in the diff (new side). */
    file: string;
    /** New-side line number. Omit for a file-level note. */
    line?: number;
    severity?: 'critical' | 'warning' | 'info';
    note: string;
    /** Who said it — a reviewer model, a person. */
    author?: string;
}

export declare interface DiffFile {
    path: string;
    oldPath: string | null;
    status: 'added' | 'deleted' | 'renamed' | 'modified';
    adds: number;
    dels: number;
    lines: DiffLine[];
    binary: boolean;
}

export declare interface DiffLine {
    kind: 'add' | 'del' | 'ctx' | 'hunk';
    text: string;
    oldNo: number | null;
    newNo: number | null;
}

export declare function DiffViewer({ diff, annotations, defaultCollapsed, maxLinesPerFile, truncatedNote, className, 'data-testid': testId, }: DiffViewerProps): JSX.Element;

export declare interface DiffViewerProps {
    /** Unified diff — real `git diff` output. */
    diff: string;
    annotations?: readonly DiffAnnotation[];
    /** Start with every file collapsed (big changes). Default false. */
    defaultCollapsed?: boolean;
    /** Hard cap on rendered lines per file, beyond which the file truncates. */
    maxLinesPerFile?: number;
    /** Note rendered when the caller knows the diff itself was truncated upstream. */
    truncatedNote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function Disclosure({ summary, children, open, defaultOpen, onToggle, tone, density, variant, hint, size, className, summaryClassName, bodyClassName, 'data-testid': testId, }: DisclosureProps): JSX.Element;

export declare interface DisclosureProps {
    /** Always-visible trigger row. Any node — not just text. */
    summary: ReactNode;
    /** Shown when open. */
    children: ReactNode;
    /**
     * Controlled open state. Omit to let the component own it (see
     * `defaultOpen`); pass it and update it from `onToggle` to control it, the
     * same contract as a controlled `<input>`.
     */
    open?: boolean;
    /** Uncontrolled initial state. Default false. Ignored once `open` is passed. */
    defaultOpen?: boolean;
    /** Fires after every toggle, either direction, with the new open state. */
    onToggle?: (open: boolean) => void;
    /**
     * Semantic tint for the summary row (and its left rule) — an admonition
     * inside a longer document, a warning the reader can collapse once read.
     * Default: no tint, matches surrounding chrome.
     */
    tone?: ToneOrAlias;
    /**
     * `'compact'` tightens padding, drops to `text-xs`, and shrinks the
     * chevron — a disclosure nested inside an already-dense panel (a
     * debugger side rail, a node inspector) where the default's `text-sm` /
     * `px-3 py-2` reads oversized next to its neighbours. Default: unchanged.
     */
    density?: 'default' | 'compact';
    /**
     * `'plain'` drops the outer border and the summary row's background tint
     * (including `tone`'s) entirely — just the summary row and body, for a
     * borderless toggle inside a list where every row already has its own
     * separator and a bordered/tinted card would double up. Composable with
     * `density="compact"`. Default: unchanged (bordered card, tinted summary).
     */
    variant?: 'default' | 'plain';
    /**
     * Muted text after the summary, on the same row — what is inside, or why
     * it is closed ("SME or release manager required to dispatch"). Since 2.390.0.
     */
    hint?: ReactNode;
    /**
     * `md` (default): the summary at the body size. `lg` (since 2.390.0): the
     * summary is a section heading — 19px semibold with a 16px chevron — so a
     * collapsed section ("› Run setup") reads like its open neighbours.
     * Composable with `variant="plain"`; ignored with `density="compact"`.
     */
    size?: 'md' | 'lg';
    className?: string;
    summaryClassName?: string;
    bodyClassName?: string;
    'data-testid'?: string;
}

export declare function DisconnectReconnect({ connectionState, onDisconnect, onReconnect }: Props_5): JSX.Element;

export declare function Divider({ label, spacing, className, 'data-testid': testId }: DividerProps): JSX.Element;

export declare interface DividerProps {
    /** Optional caption sitting on the rule. */
    label?: ReactNode;
    /** Vertical margin around the rule. Default `md`. */
    spacing?: DividerSpacing;
    className?: string;
    'data-testid'?: string;
}

export declare type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export declare function DockedAside({ children, width, offsetTop, maxHeight, title, onClose, closeLabel, bodyPadding, className, 'data-testid': testId, }: DockedAsideProps): JSX.Element;

export declare interface DockedAsideProps {
    children: ReactNode;
    /** Width in px. Default 420. */
    width?: number;
    /** Start this many px below the row's top — level with the section it belongs to. */
    offsetTop?: number;
    /** Height cap. Default `calc(100vh - 180px)`: below the app chrome and the document header. */
    maxHeight?: string;
    /** With a title, the aside draws its own header row (and a close, when `onClose` is given). */
    title?: ReactNode;
    onClose?: () => void;
    closeLabel?: string;
    /** Padding around the body. Default `md`; `none` when the content brings its own. */
    bodyPadding?: 'none' | 'md';
    className?: string;
    'data-testid'?: string;
}

export declare function DockedColumn({ children, className, bodyClassName, body, bodyProps, ...rest }: DockedColumnProps): JSX.Element;

export declare interface DockedColumnProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    children: ReactNode;
    /** Classes for the scrolling body (its gutter and padding live here, never on the dock). */
    bodyClassName?: string;
    /** `scroll` (default): the body scrolls above the dock. `fill`: the body is a fixed frame whose panes scroll on their own. */
    body?: 'scroll' | 'fill';
    /** Attributes for the scrolling body (a test id, a semantic marker such as `data-section-body`). */
    bodyProps?: HTMLAttributes<HTMLDivElement> & {
        [marker: `data-${string}`]: string | undefined;
    };
}

export declare interface DockedPanelContextValue {
    /** The dock's own header already names the region — bodies should not
     *  repeat it. */
    hasHeader: boolean;
    /** The dock gives its body a definite height; bodies should fill it and
     *  let their own scrollable region absorb the slack. */
    fillsHeight: boolean;
}

/** Wraps a dock's body slot. Docks render this; consumers rarely do. */
export declare function DockedPanelProvider({ hasHeader, fillsHeight, children, }: DockedPanelProviderProps): JSX.Element;

export declare interface DockedPanelProviderProps extends Partial<DockedPanelContextValue> {
    children: ReactNode;
}

export declare function DocsShell({ topNav, sidebar, rightRail, children, fullBleed, preContent, className, style, scrollResetKey, }: DocsShellProps): JSX.Element;

export declare interface DocsShellProps {
    /** Sticky top navigation. Typically <DocsTopNav>. */
    topNav: ReactNode;
    /** Left sidebar. Typically <DocsSidebar>. */
    sidebar: ReactNode;
    /**
     * Changing this scrolls the content pane back to the top — pass the current
     * pathname. <main> is the scroll container, not the window, so the browser's
     * scroll restoration does not apply.
     */
    scrollResetKey?: string;
    /** Optional right rail. Typically <TableOfContents>. */
    rightRail?: ReactNode;
    /** Main content. */
    children: ReactNode;
    /**
     * Full-bleed mode skips the centered content padding so a hosted
     * application demo (e.g. a chat panel filling the viewport) can
     * occupy the entire content rectangle.
     */
    fullBleed?: boolean;
    /** Pre-content slot (breadcrumbs, page header). Skipped when fullBleed. */
    preContent?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export declare function DocsSidebar({ sections, activeHref, defaultCollapsedSections, renderLink, className, style, 'aria-label': ariaLabel, }: DocsSidebarProps): JSX.Element;

export declare interface DocsSidebarGroup {
    id: string;
    label?: ReactNode;
    /** When set, the group label itself is rendered as a direct link instead of a section. */
    to?: string;
    items: DocsSidebarItem[];
}

export declare interface DocsSidebarItem {
    id: string;
    label: ReactNode;
    to: string;
    badge?: ReactNode;
}

export declare interface DocsSidebarProps {
    sections: DocsSidebarSection[];
    /** Current pathname — drives the active-item highlight. */
    activeHref?: string;
    /** Section ids that should start collapsed. */
    defaultCollapsedSections?: string[];
    /** Plug a routing library's Link. Defaults to <a href>. */
    renderLink?: LinkRenderer;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}

export declare interface DocsSidebarSection {
    id: string;
    label: ReactNode;
    /** Used to detect "section active" highlighting in section header. */
    basePath?: string;
    groups: DocsSidebarGroup[];
}

export declare function DocsTopNav({ items, activeHref, brand, brandTo, search, showSearchPlaceholder, rightSlot, renderLink, className, style, }: DocsTopNavProps): JSX.Element;

export declare interface DocsTopNavProps {
    items: TopNavItem[];
    activeHref?: string;
    /** Brand/logo. A string renders as a bold title; ReactNode is rendered as-is. */
    brand?: ReactNode;
    /** Optional href for the brand to link to. Default "/". Pass null to render brand as a static span. */
    brandTo?: string | null;
    /**
     * Search affordance. Convention: a button that opens a CommandPalette.
     * Falls back to a styled "Search… ⌘K" placeholder when omitted but
     * `showSearchPlaceholder` is true.
     */
    search?: ReactNode;
    /** Renders a static "Search… ⌘K" pill when `search` is omitted. Default true. */
    showSearchPlaceholder?: boolean;
    /** Right-side slot for auxiliary links (GitHub, version, theme switcher). */
    rightSlot?: ReactNode;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
}

/** A page with a spark in its corner: "make something new from this". Since 2.390.3. */
export declare function DocumentAddIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** "just now", "15m ago", "2h ago", "Yesterday", "3d ago", "Sep 12". */
export declare function documentAgeLabel(value: string | number | Date | null | undefined, now?: number): string | null;

/** A page with a folded corner: a document, a file. */
export declare function DocumentIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface DocumentInfo {
    id: string;
    title: string;
    type: string;
    status: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    icon: string;
    description?: string;
    activeCallSessionId?: string;
}

export declare interface DocumentResultItem {
    id: string;
    title: string;
    /** One line: the document's opening sentence or description. */
    summary?: string | null;
    kind: FileKind;
    /** The folder's name; absent = no folder line segment. */
    folder?: string | null;
    updatedAt?: string | number | Date | null;
    /** In the working set (the toggle reads "Added"). */
    attached?: boolean;
    /**
     * Always-visible content at the row's right, before Add and ⋯ — a live
     * badge such as `CallPresenceIndicator` ("● 3" for a document with an
     * active call). Outside the row's open target, so clicking it never opens
     * the document. Keep it one line (≤ the row's text height); the row height
     * does not change. Since 2.394.0.
     */
    trailing?: ReactNode;
}

export declare function DocumentResultList({ items, currentId, onCurrentChange, onOpen, onToggleAttach, draggable, onDragStartItem, rowMenu, rowTrailing, emptyState, now, toggleLabels, 'aria-label': ariaLabel, className, 'data-testid': testId, }: DocumentResultListProps): JSX.Element;

export declare interface DocumentResultListProps {
    items: readonly DocumentResultItem[];
    currentId?: string | null;
    /** Keyboard focus moved to a row. */
    onCurrentChange?: (id: string) => void;
    onOpen: (item: DocumentResultItem) => void;
    /** Omit to draw no toggle. */
    onToggleAttach?: (item: DocumentResultItem) => void;
    /** Default true. */
    draggable?: boolean;
    /** Extra drag data (called after the prompt-context payload is written). */
    onDragStartItem?: (item: DocumentResultItem, dataTransfer: DataTransfer) => void;
    /** Per-row trailing content computed by the host (wins over `item.trailing` when it returns non-null). Since 2.394.0. */
    rowTrailing?: (item: DocumentResultItem) => ReactNode;
    /** The row's ⋯ menu; null or empty = no menu. */
    rowMenu?: (item: DocumentResultItem) => DropdownMenuSection[] | null;
    emptyState?: ReactNode;
    /** For the age labels; default Date.now(). */
    now?: number;
    toggleLabels?: {
        add: string;
        added: string;
    };
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

export declare function DotMeter({ label, value, segments, showPercent, note, warnAbove, tone, className, 'data-testid': testId, }: DotMeterProps): JSX.Element;

export declare interface DotMeterProps {
    /** Row label, e.g. `current` / `weekly`. Omit for a bare meter. */
    label?: string;
    /** 0–1. Values outside the range are clamped rather than overflowing. */
    value: number;
    /** Number of dots. Ten is the default because it reads as a percentage. */
    segments?: number;
    /** Show the value as a percentage after the dots. Default true. */
    showPercent?: boolean;
    /**
     * Trailing note, conventionally the reset time (`⟳ Sun 10:00pm`). This is
     * the field that makes a quota meter actionable — "89% used" is alarming
     * until you know it resets in nine minutes.
     */
    note?: string;
    /**
     * Fraction above which the meter reads as spent. Default 0.85. Below it the
     * meter is neutral: a half-used budget is not a warning.
     */
    warnAbove?: number;
    tone?: DotMeterTone;
    className?: string;
    'data-testid'?: string;
}

export declare type DotMeterTone = 'code' | 'surface';

/** An arrow into a tray: "download". Since 2.390.3. */
export declare function DownloadIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Drawer({ open, onClose, title, subtitle, width, children, footer, docked, actions, className, bodyClassName, headerClassName, titleClassName, footerClassName, closeTestId, 'aria-label': ariaLabel, 'data-testid': testId, closeLabel, modal, trapFocus, backdrop, }: DrawerProps): default_2.JSX.Element | null;

export declare interface DrawerProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    /**
     * Panel width in pixels. Defaults to 460 floating; docked it defaults to
     * filling its parent, because the column a docked panel sits in is normally
     * already sized by the layout.
     */
    width?: number;
    children: default_2.ReactNode;
    footer?: default_2.ReactNode;
    /**
     * Render inline in the layout instead of as an overlay: no portal, no
     * backdrop, no focus trap, no Escape handler. `open={false}` still renders
     * nothing, so the same flag drives both forms.
     *
     * A docked panel is not a dialog — it does not take focus and does not trap
     * it — so it is a `<complementary>` region rather than `role="dialog"`,
     * named by its title (or `aria-label`) the same way.
     */
    docked?: boolean;
    /**
     * Controls beside the close button in the header — a filter toggle, an
     * "open in full page" link. Rendered in both forms.
     */
    actions?: default_2.ReactNode;
    /** Classes on the panel element itself. */
    className?: string;
    /** Classes on the scrolling body. Overrides its default padding via tw-merge. */
    bodyClassName?: string;
    /** Classes on the header row (e.g. `border-b-0` for a header with no rule under it). Since 2.391.0. */
    headerClassName?: string;
    /** Classes on the title heading (e.g. `text-lg`). Since 2.391.0. */
    titleClassName?: string;
    /** Classes on the footer row. Since 2.391.0. */
    footerClassName?: string;
    /** `data-testid` on the built-in close button. Since 2.391.0. */
    closeTestId?: string;
    /**
     * Accessible name for the dialog when there is no visible `title` to point
     * at. When `title` IS set the heading labels the dialog via
     * `aria-labelledby` and this prop is unnecessary.
     */
    'aria-label'?: string;
    'data-testid'?: string;
    /**
     * Accessible name for the built-in close button. Defaults to `"Close"`.
     * Set this when a host's own tests (or design system) key on a specific
     * label — e.g. `aria-label="Close panel"` — instead of forking the whole
     * component the way a local `Panel.tsx` had to.
     */
    closeLabel?: string;
    /**
     * Dialog semantics for the floating form: `role="dialog"`, `aria-modal`,
     * and Escape closes it (when this is the top overlay layer). `false`
     * drops all three — the panel renders `role="complementary"`, the same
     * non-modal role a docked Drawer uses, and Escape no longer closes it.
     * Ignored when `docked` (already non-modal). Default `true`.
     */
    modal?: boolean;
    /**
     * Tab-trap the panel and move focus into it on open, restoring it on
     * close. `false` leaves focus wherever the host's own handling put it —
     * for a floating panel driven by direct DOM dispatch rather than real
     * keyboard navigation. Ignored when `docked` (never traps). Default
     * `true`.
     */
    trapFocus?: boolean;
    /**
     * Render the dimmed backdrop behind the floating panel, and close on a
     * click through it. `false` renders the panel with nothing behind it —
     * what a local `Panel.tsx` did before Drawer replaced it — and, because
     * there is then no backdrop that should be catching clicks, makes the
     * full-viewport wrapper `pointer-events-none` so the page behind the panel
     * stays usable. Ignored when `docked` (never has one). Default `true`.
     */
    backdrop?: boolean;
}

/**
 * How many of `count` particles to draw on a `width`×`height` CSS-px surface
 * at `density` per 10,000 px². Exported for the tests.
 */
export declare function drawnParticles(count: number, density: number | undefined, width: number, height: number): number;

export declare function DropdownMenu({ trigger, triggerLabel, triggerTitle, triggerClassName, triggerVariant, triggerTabIndex, disabled, triggerTestId, triggerAttributes, align, sections, className, 'data-testid': testId, }: DropdownMenuProps): JSX.Element;

export declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /**
     * Shown but not actionable: muted, `aria-disabled="true"` yet still
     * focusable (WAI-ARIA menu practice, so a screen reader can reach it and
     * hear why), and click / Enter / Space never run `onSelect` — the menu
     * stays open. A disabled row with a `submenu` does not open it. Since 2.390.3.
     */
    disabled?: boolean;
    /**
     * Why it is disabled — shown as the row's secondary line (in place of
     * `description`), its hover tooltip, and its `aria-describedby`.
     * Since 2.390.3; the visible line since 2.390.4.
     */
    disabledReason?: string;
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

export declare interface DropdownMenuProps {
    /** Content of the built-in trigger button (icon, glyph, text…). */
    trigger: ReactNode;
    /** Accessible label for the trigger button. Default 'Open menu'. */
    triggerLabel?: string;
    /** Optional title attribute (hover tooltip) for the trigger button. */
    triggerTitle?: string;
    /** Optional className for the trigger button. */
    triggerClassName?: string;
    /**
     * The trigger's look. `default` is the small bordered menu button;
     * `primary` is a 36px brand button ("New ▾"), `secondary` a 36px bordered
     * one, `link` bare secondary text ("Relevance ▾"). Since 2.389.6.
     */
    triggerVariant?: 'default' | 'primary' | 'secondary' | 'link';
    /**
     * Tab order of the trigger. Default undefined (a normal tab stop).
     *
     * `-1` is for a menu that lives inside a ROVING-FOCUS list — one trigger per
     * row, forty rows: leaving them all tabbable puts forty stops back in front
     * of everything after the list, which is the cost the roving cursor exists
     * to avoid. The host makes only the cursor row's trigger tabbable.
     */
    triggerTabIndex?: number;
    /**
     * The trigger is off: a real `disabled` button in muted ink that never
     * opens the panel (a read-only composer's Workflow ⌄). Since 2.450.0.
     */
    disabled?: boolean;
    /** Test hook for the trigger itself; `data-testid` addresses the panel. */
    triggerTestId?: string;
    /**
     * `data-*` attributes for the trigger itself (since 2.479.0), e.g. a
     * read-only composer's mode menu declaring `data-composer-readonly-allow`
     * as the way out. Only data attributes: everything else has a prop.
     */
    triggerAttributes?: Readonly<Record<`data-${string}`, string>>;
    /**
     * Panel alignment relative to the trigger. 'start' (default) anchors the
     * panel's left edge to the trigger's left edge; 'end' anchors the panel's
     * RIGHT edge to the trigger's right edge.
     */
    align?: 'start' | 'end';
    sections: DropdownMenuSection[];
    /** Optional className for the dropdown panel. */
    className?: string;
    /** Optional testid for the panel. Default 'dropdown-menu'. */
    'data-testid'?: string;
}

export declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    /**
     * A quiet line under the group's rows — what the group does as a whole
     * ("Creates a new document."). Since 2.390.3.
     */
    caption?: string;
    'data-testid'?: string;
}

export declare function EditableHeading({ value, onCommit, placeholder, size, readOnly, editLabel, as: Tag, revealOnHover, className, 'data-testid': testId, }: EditableHeadingProps): JSX.Element;

export declare interface EditableHeadingProps {
    value: string;
    /** Called with the trimmed new value. Not called when it is empty or unchanged. */
    onCommit: (next: string) => void;
    /** Shown while editing an empty input. */
    placeholder?: string;
    /** `md` = 16px (drawer title), `lg` = 20px. Default `md`. */
    size?: 'md' | 'lg';
    /** Render as plain text with no pencil (someone who may not rename it). */
    readOnly?: boolean;
    /** Accessible name of the pencil button. Default `Rename`. */
    editLabel?: string;
    /**
     * The element the text renders as. Default `span`; a page title passes
     * `h1` so the page keeps its one heading while the title stays renameable.
     * Since 2.500.3.
     */
    as?: 'span' | 'h1' | 'h2' | 'h3';
    /**
     * Keep the pencil out of the way until the pointer is over the heading or
     * focus is inside it. A page title that is read far more often than it is
     * renamed wants the quiet form; a drawer title keeps the pencil standing.
     * Since 2.500.3.
     */
    revealOnHover?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A pencil: "change this". */
export declare function EditIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `EmptyState`. */
export declare interface EmptyLeaf extends Pick<EmptyStateProps, 'size' | 'layout' | 'align' | 'density' | 'tone' | 'actionsDirection'> {
    kind: 'empty';
    title: string;
    description?: string;
    /** The one action ("New connector"). */
    action?: ButtonLeaf;
    /** Several actions, as EmptyState data (links, copyable commands). */
    actions?: EmptyStateAction[];
    'data-testid'?: string;
}

export declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, actions, testId, actionTestId, tone, className, size: sizeProp, layout, density, align, actionsDirection, details, }: EmptyStateProps): JSX.Element;

export declare interface EmptyStateAction {
    /** Visible label on the action button or link. */
    label: string;
    /** Click handler — required when `href` is not set. */
    onClick?: () => void;
    /** External / internal link — required when `onClick` is not set. */
    href?: string;
    /**
     * Visual variant.
     * `primary`   — solid indigo, used for the first/most important step
     * `secondary` — outlined, used for additional steps
     * `link`      — primary-coloured text, no box ("Show everyone →"). Since 2.390.0.
     * Defaults to `primary` for the first action, `secondary` for the rest.
     */
    variant?: 'primary' | 'secondary' | 'link';
    /**
     * When true (and `href` is set), opens in a new tab with
     * `target=_blank rel=noopener noreferrer` and an sr-only
     * "(opens in new tab)" hint.
     */
    external?: boolean;
    /**
     * Optional copy-to-clipboard CLI snippet rendered in a monospaced
     * `<pre>` underneath the action button.
     */
    code?: string;
}

/**
 * `default` is the centred block (both sizes). `compact` is a single quiet
 * line: no minimum height, no centring, no glyph pedestal — the "No items."
 * that belongs INSIDE a section that already has a heading, where a block
 * placeholder would push the rest of the card down the page.
 *
 * It is a separate axis from `size` on purpose: `size="sm"` is still a block
 * (glyph over title over description), just a smaller one, and that is what
 * kept sending callers back to a hand-written `<div className="italic
 * text-text-tertiary">`. `compact` wins on layout when both are set.
 */
export declare type EmptyStateDensity = 'default' | 'compact';

/**
 * A "how this works" block under the main message, past a rule — a heading,
 * a few lines of explanation, and one quiet action ("Refresh this view").
 * Since 2.390.0.
 */
export declare interface EmptyStateDetails {
    title: string;
    body?: ReactNode;
    action?: EmptyStateAction;
}

export declare interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    /** Plain-text body (preferred when no markup is needed). */
    body?: string;
    /** Alias for `body` — accepts any ReactNode for richer copy. */
    description?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    /** Custom action node (overrides actionLabel/onAction when present). */
    action?: ReactNode;
    /**
     * Multi-action "what to do next" list. When provided, takes precedence
     * over `action` / `actionLabel`+`onAction`. Each entry renders a
     * button or link, with an optional copyable code snippet underneath.
     */
    actions?: EmptyStateAction[];
    /**
     * Optional testid for the container (defaults to "empty-state").
     * Callers with existing tests targeting a specific id can pass it here.
     */
    testId?: string;
    /**
     * Optional testid for the action button (defaults to "empty-state-action").
     */
    actionTestId?: string;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     */
    tone?: EmptyStateTone;
    /**
     * Class for the container. Until now EmptyState took no class at all, so a
     * caller could not even change its padding — which is why every dark or
     * cramped surface hand-rolled its own placeholder instead. For a region too
     * small for the 220px block, reach for `InlinePlaceholder`.
     */
    className?: string;
    /**
     * Block scale. Default: the density's — `sm` under the compact density
     * (`DensityProvider density="compact"`, since 2.440.0), else `md`. An
     * explicit `size="sm"` is a deprecated override; `md` and `lg` stay.
     * See `EmptyStateSize`.
     */
    size?: EmptyStateSize;
    /**
     * `block` (default): the glyph over the title over the description.
     * `line`: the single quiet line (see `EmptyStateDensity`). Since 2.440.0 —
     * the layout is not a density, so it no longer borrows the word.
     */
    layout?: 'block' | 'line';
    /** @deprecated since 2.440.0 — `layout="line"` (`compact`) / `layout="block"` (`default`). */
    density?: EmptyStateDensity;
    /**
     * `center` (default): the centred block. `start`: left-aligned, with no
     * minimum height and no centring — an empty state that is the top of a
     * page or a rail ("No initiatives are linked to you yet." under the page
     * title, "Nothing linked yet" at the top of a list column). Since 2.390.0.
     *
     * `size="lg"` (since 2.390.0) is the page-body message at a heading's
     * scale: a 24px bold title over a 16px description.
     */
    align?: 'center' | 'start';
    /**
     * How `actions` lay out. `column` (default): stacked, full width.
     * `row`: side by side at their own width ("Browse all initiatives"
     * beside "Check profile"). Since 2.390.0.
     */
    actionsDirection?: 'column' | 'row';
    /** A "how this works" block under a rule. See `EmptyStateDetails`. Since 2.390.0. */
    details?: EmptyStateDetails | null;
}

/**
 * `md` is the page-body block (220px minimum, 52px glyph). `sm` is for a
 * lane or list group that is one of several on the page: no minimum height,
 * a 28px glyph and a 14px title, so three empty lanes fit above the fold.
 * Since 2.436.1 `sm` is the app's body step throughout: 14/600 title, 14/400
 * description (was 13px), a `Button size="sm"`-sized CTA (26px, 12/600 — was
 * a 38px padded button) and a 14/600 details heading (was 18px).
 */
export declare type EmptyStateSize = 'md' | 'sm' | 'lg';

/** @see SurfaceTone — which colour family the empty state paints in. */
export declare type EmptyStateTone = SurfaceTone;

export declare function EntityCell({ label, id, href, mono, className, labelClassName, }: EntityCellProps): JSX.Element;

export declare interface EntityCellProps {
    label: string;
    /** Secondary monospace subline (e.g. ID or slug). */
    id?: string;
    /** Makes the label a link. */
    href?: string;
    /** Extra monospace styling on the ID subline (already monospace by default; this is reserved for callers needing emphasis). */
    mono?: boolean;
    className?: string;
    labelClassName?: string;
}

export declare const ERROR_CODE_DESCRIPTIONS: Record<string, string>;

export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, info: ErrorInfo): void;
    handleRetry: () => void;
    render(): string | number | bigint | boolean | JSX.Element | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined;
}

declare interface ErrorBoundaryProps {
    /** Identifier for which boundary caught the error (logged to console). */
    name: string;
    children: ReactNode;
}

declare interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export declare function ErrorDisplay({ error }: Props): JSX.Element | null;

export declare function ErrorPanel({ errors }: Props_2): JSX.Element;

export declare function ErrorState({ icon, title, body, description, actionLabel, onAction, action, testId, actionTestId, compact, }: ErrorStateProps): JSX.Element;

export declare interface ErrorStateProps {
    /** Override the default ⚠️ glyph. Pass a string emoji or a ReactNode. */
    icon?: ReactNode;
    title: string;
    /** Plain-text body (preferred when no markup is needed). */
    body?: string;
    /** Alias for `body` — accepts any ReactNode for richer copy (stack traces, links). */
    description?: ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    /** Custom action node (overrides actionLabel/onAction when present). */
    action?: ReactNode;
    testId?: string;
    actionTestId?: string;
    /**
     * Small padding and no 220px minimum height (since 2.511.0): for an error
     * drawn over a media frame or inside a card, where the card shape would
     * overflow the space it covers.
     */
    compact?: boolean;
}

export declare function EstimateRow({ label, estimate, className, 'data-testid': testId }: EstimateRowProps): JSX.Element;

export declare interface EstimateRowProps {
    label: string;
    estimate: RunEstimate;
    className?: string;
    'data-testid'?: string;
}

export declare interface EventGlyph {
    icon: string;
    color: string;
    severity: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export declare const eventGlyphs: Record<string, EventGlyph>;

export declare function EventLog({ entries }: Props_3): JSX.Element;

export declare function EventRow({ timestamp, type, summary, severity, onClick, selected }: EventRowProps): JSX.Element;

export declare interface EventRowProps {
    timestamp: string;
    type: string;
    summary: string;
    severity?: 'info' | 'warning' | 'error' | 'success';
    onClick?: () => void;
    selected?: boolean;
}

export declare function ExpertCard({ name, title, subtitle, imageUrl, matchedSkills, otherSkills, contexts, evidence, evidenceLabel, onAsk, askLabel, footerExtra, onOpen, className, 'data-testid': testId, }: ExpertCardProps): JSX.Element;

export declare interface ExpertCardProps {
    name: string;
    title?: string;
    /** Second context line, e.g. department or team. */
    subtitle?: string;
    imageUrl?: string;
    /** Skills that matched the query, strongest first. */
    matchedSkills: readonly ExpertSkillMatch[];
    /** The person's other skills, shown quieter. Keep short; the card truncates. */
    otherSkills?: readonly string[];
    /** Where this person spends their time — initiative/project names. */
    contexts?: readonly string[];
    /** The work the match was derived from. */
    evidence?: readonly ExpertEvidenceItem[];
    /** Heading over the evidence list. */
    evidenceLabel?: string;
    /** Primary action. Omit to render a card with no footer. */
    onAsk?: () => void;
    askLabel?: string;
    /** Secondary slot beside the action, e.g. a link into an org graph. */
    footerExtra?: ReactNode;
    /** Click anywhere that isn't a control — e.g. open a profile. */
    onOpen?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface ExpertEvidenceItem {
    id: string;
    /** e.g. a document title, an ADR, a postmortem. */
    title: string;
    /** Where it came from — "adr", "slack", "postmortem". Shown as a quiet tag. */
    source?: string;
    href?: string;
}

export declare interface ExpertSkillMatch {
    name: string;
    /**
     * 0..1 evidence strength for THIS skill on THIS person, when the domain
     * has one (e.g. a person→skill edge weight). Renders as chip emphasis,
     * never as a printed number — a number invites ranking people, which is
     * exactly the reading this card exists to avoid.
     */
    strength?: number;
}

export declare function ExplorerLayout({ rail, children, aside, railWidth, railResize, header, paneHeader, paneFooter, railCount, railCountStyle, railBack, railHeading, railCollapsed, onToggleRail, railLabel, railTitle, railActions, railHeader, railFooter, panePadding, asidePlacement, narrow: narrowProp, className, 'data-testid': testId, }: ExplorerLayoutProps): JSX.Element;

export declare interface ExplorerLayoutProps {
    /** Left rail — flush to the pane's left edge, its own border, scrolls independently. */
    rail: ReactNode;
    /** The main pane. */
    children: ReactNode;
    /** Optional right-hand context bar. Stacks below the pane under `2xl`, sits beside it at `2xl` and up. */
    aside?: ReactNode;
    /**
     * Rail width. `md` is the 300px agentcore measured against; `xs` is 220px,
     * the Org rail's own width (SubNavLayout's default), for a documents rail
     * that should sit at it (since 2.407.33); `sm` is 240px for
     * a shallower tree; `lg` is 368px for a two-line work list with its toolbar
     * (the Documents Work column, measured against the redesign's 370px); `ms`
     * is 264px for a one-line title list (the Initiatives v2 rail, since 2.392.0).
     */
    railWidth?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
    /** Opt-in adjustable rail. Width is remembered in pixels when a storage key is supplied. */
    railResize?: {
        minPx?: number;
        maxPx?: number;
        storageKey?: string;
    };
    /**
     * A band ABOVE all three columns — a scope header (breadcrumb, title, stats,
     * tabs) that names what the rail, the pane and the aside are all looking at.
     * It does not scroll; the columns below it keep their independent scrolling.
     * Since 2.385.0.
     */
    header?: ReactNode;
    /**
     * A band over the PANE only — a crumb trail with the scope's controls
     * ("Build › Distillation › Knowledge" · All repositories · Open Library).
     * Unlike `header` it spans neither the rail (so the rail's own title keeps
     * the top-left corner) nor the aside (so the aside's top row — a
     * `ContextColumn`'s tabs — keeps the top of its own column). It does not
     * scroll; the pane below it does. No border of its own: it reads as the top
     * of the pane. Since 2.389.0; spans only the pane since 2.389.4 (it spanned
     * pane + aside, and `ScopeHeader variant="crumbs"` controls, which hang
     * into the record head below the band, landed on the aside's top row).
     */
    paneHeader?: ReactNode;
    /**
     * A band UNDER the pane only — a docked composer that must stay put while
     * the pane scrolls. It does not scroll; the pane above it does. It spans
     * the pane's column, never the rail or the aside (the same rule as
     * `paneHeader`), and has no border of its own. Since 2.390.0.
     */
    paneFooter?: ReactNode;
    /** A count beside `railTitle` ("Work 11"). Since 2.385.0. */
    railCount?: number;
    /** How `railCount` reads — see `WorkspaceRail.countStyle`. Default `chip`. Since 2.390.0. */
    railCountStyle?: 'chip' | 'plain';
    /**
     * A back link over the rail's title — "‹ Initiatives" above "Work 11". See
     * `WorkspaceRail.back`. Since 2.390.0.
     */
    railBack?: WorkspaceRailBack | null;
    /** The rail's heading style — see `WorkspaceRail.heading`. Default `compact`. Since 2.385.0. */
    railHeading?: 'compact' | 'prominent' | 'label' | 'caption';
    /**
     * The rail folded to a strip with one control that brings it back. For a
     * surface that wants the width — a diagram, a wide table — the list of
     * documents is worth giving up for a while. Controlled: the host owns the
     * state (and typically remembers it).
     */
    railCollapsed?: boolean;
    /** Present, the rail gets a fold control and the strip an unfold control. */
    onToggleRail?: () => void;
    /** What the rail holds, for the controls' accessible names. Default "the list". */
    railLabel?: string;
    /**
     * The rail's name, in its header row — the same row the fold control sits
     * in, so the rail is titled the way a `ContextColumn` on the other side is
     * (its tabs live in the same h-9 row). Without it the row holds only the
     * fold control, which reads as a stray button over the first section.
     */
    railTitle?: string;
    /**
     * Controls that belong to the rail as a whole — "new item", a filter —
     * placed in the header row between the title and the fold control. The
     * rail's own actions are not page chrome; putting them in a band above the
     * frame left them at the window's inset while the rail sat flush below.
     */
    railActions?: ReactNode;
    railHeader?: ReactNode;
    railFooter?: ReactNode;
    /**
     * `stack` (default): the aside stacks below the pane under `2xl` and sits
     * beside it from `2xl`. `beside`: always beside, at every width — for a pane
     * whose bottom row must be the window's (an editor with a pinned composer);
     * the host keeps the aside narrow (a `ContextColumn` strip) when space is
     * short. Since 2.365.0.
     */
    asidePlacement?: 'stack' | 'beside';
    /** Padding inside the main pane. `none` when the pane hosts its own full-bleed surface (an editor). */
    panePadding?: 'none' | 'md';
    /**
     * The narrow form (since 2.515.1): under 40rem of the frame's own width one
     * of rail and pane fills it. See `ExplorerNarrow`. Omitted, the rail and the
     * pane sit side by side at every width (unchanged). Ignored with `railResize`.
     */
    narrow?: ExplorerNarrow;
    className?: string;
    'data-testid'?: string;
}

/** What `ExplorerLayout` (and `ListRailLayout`, `MasterDetailPage`) show under 40rem of their own width. Since 2.515.1. */
export declare interface ExplorerNarrow {
    /**
     * `list`: the pane header, then the rail at the full width (the pane body,
     * its footer and the aside are hidden). `record`: the rail is hidden; the
     * pane fills the width under a back control (the aside stacks under it).
     * The host derives it from its selection: a record open → `record`.
     */
    showing: 'list' | 'record';
    /** The back control's action in `record` (open the list: clear the selection, route to the list). */
    onBack: () => void;
    /** The back control's words. Default "Back to the list". */
    backLabel?: string;
}

/**
 * An arrow leaving to the upper right, with no box: "opens somewhere else" —
 * the ↗ after "Repository" on an outlined link button. `PopOutIcon` is the
 * boxed variant ("open in its own view"). Since 2.390.0.
 */
export declare function ExternalLinkIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** An eye: watching, "N people are seeing this". */
export declare function EyeIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `EyeIcon` with a slash through it: hidden — not visible to others. */
export declare function EyeOffIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** What each kind is called, for a caller building a "Page · Sprint planning" line. */
export declare const FILE_KIND_LABELS: Record<FileKind, string>;

export declare type FileKind = 'page' | 'presentation' | 'recording' | 'transcript' | 'diagram' | 'folder' | 'agent' | 'experiment' | 'call' | 'conversation' | 'media' | 'workflow';

export declare function FileKindMark({ kind, size, variant, label, className, 'data-testid': testId }: FileKindMarkProps): JSX.Element;

export declare interface FileKindMarkProps {
    kind: FileKind;
    /** `sm` 18px (tree rows), `md` 22px (default), `lg` 28px, `xl` 32px, `2xl` 40px (an editor head, beside the title and its save line). */
    size?: FileKindMarkSize;
    /** Accessible name. Omit when the file's name is already beside the mark. */
    label?: string;
    /**
     * `tinted` (default) is the glyph in a coloured box, one colour per kind.
     * `plain` is the glyph alone, secondary ink, same box size — for a list row
     * whose title is the thing to read.
     * `glyph` (2.386.0) is the file-tree mark: no box, a glyph that fills it
     * (18px at `sm`), neutral ink for pages and folders, and the two kinds a
     * reader scans for drawn in colour — a deck as a three-colour bar chart, a
     * diagram as two linked nodes in the brand colour. A selected tree row
     * turns the neutral ink to its own text colour (`currentColor`).
     */
    variant?: FileKindMarkVariant;
    className?: string;
    'data-testid'?: string;
}

export declare type FileKindMarkSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** `outline` (since 2.386.5): the glyph alone, in the kind's colour, no box fill — an editor's title mark. */
export declare type FileKindMarkVariant = 'tinted' | 'plain' | 'glyph' | 'outline' | 'app';

export declare function FilePickerButton({ onFiles, accept, multiple, variant, size, icon, disabled, children, className, 'aria-label': ariaLabel, 'data-testid': testId, }: FilePickerButtonProps): JSX.Element;

export declare interface FilePickerButtonProps {
    onFiles: (files: File[]) => void;
    /** The input's `accept`, e.g. ".md,.txt". */
    accept?: string;
    multiple?: boolean;
    /** `secondary` is a 36px bordered button, `primary` the brand one. */
    variant?: 'secondary' | 'primary';
    /** `md` (default) is 36px tall; `sm` (since 2.456.1) is the 32px header-action height. */
    size?: 'sm' | 'md';
    icon?: ReactNode;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare function FileUploadDrop({ accept, maxSize, multiple, onFiles, onError, disabled, label, className, 'data-testid': testId, inputTestId, inputProps, }: FileUploadDropProps): JSX.Element;

export declare interface FileUploadDropProps {
    /** Comma-separated MIME types or extensions, e.g. "image/*,.pdf" */
    accept?: string;
    /** Max individual file size in bytes */
    maxSize?: number;
    multiple?: boolean;
    onFiles: (files: File[]) => void;
    onError?: (message: string) => void;
    disabled?: boolean;
    /** Custom drop-zone label */
    label?: string;
    className?: string;
    'data-testid'?: string;
    /**
     * `data-testid` on the hidden `<input type="file">`.
     *
     * The zone's own testid lands on the wrapper, and the input is
     * `aria-hidden` with `tabIndex={-1}`, so a test had no way to reach the
     * element it must fire a `change` at — there is no cross-browser way to
     * drive a real file picker. That is a real adoption blocker, not a
     * nicety: a host whose spec selects the input by testid could not move
     * off its hand-rolled drop zone at all.
     */
    inputTestId?: string;
    /**
     * Extra attributes for the hidden input — `name`, `capture`, `form`, a
     * `webkitdirectory`. `type`, `accept`, `multiple`, `disabled`, `ref` and
     * `onChange` are owned here and cannot be overridden: they are the
     * component's contract, not decoration.
     */
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept' | 'multiple' | 'disabled' | 'onChange' | 'ref' | 'className'>;
}

/**
 * Height the region should take: everything from its own top edge down to
 * the bottom of the window, minus `bottomGap`, never below `minHeight`.
 * Exported for testing — the arithmetic is the whole component.
 */
export declare function fillHeight(offsetTop: number, viewportHeight: number, bottomGap: number, minHeight: number): number;

export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, 'data-testid': dataTestId, 'aria-label': ariaLabel, title, }: FilterChipProps): JSX.Element;

export declare interface FilterChipProps {
    active: boolean;
    onClick: () => void;
    /** Dot color (for colored department/status dots); also tints the active state. */
    color?: string;
    /** Show a colored dot before the label. */
    dot?: boolean;
    /**
     * `md` is the comfortable default for a filter bar people actually click.
     * `sm`/`xs` are for chips packed into a dense row or a table cell — at xs a
     * filter reads as a caption rather than a control.
     */
    size?: 'md' | 'sm' | 'xs';
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    /** Forwarded to the underlying <button> for test selectors. */
    'data-testid'?: string;
    /**
     * Since 2.406.4: the button's accessible name when the visible label is not
     * the whole story ("In: Design System API. Search entire workspace").
     */
    'aria-label'?: string;
    /** Since 2.406.4: forwarded to the button — the hover tooltip. */
    title?: string;
}

/** A funnel: "filter this list". Since 2.385.0. */
export declare function FilterIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function FilterPopover({ children, label, activeCount, onClear, clearLabel, open: controlledOpen, onOpenChange, placement, size: requestedSize, trigger, panelLabel, className, panelClassName, icon, 'data-testid': testId, }: FilterPopoverProps): JSX.Element;

export declare interface FilterPopoverProps {
    /** The filter controls. */
    children: ReactNode;
    /** Button text. Default "Filter". */
    label?: string;
    /** How many filters are narrowing the list; `> 0` shows the badge. */
    activeCount?: number;
    /** Renders a "Clear filters" row at the foot of the panel. */
    onClear?: () => void;
    /** Default "Clear filters". */
    clearLabel?: string;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * Which edge of the button the panel hangs from. The panel is
     * collision-aware — a `bottom-*` placement flips above the button on its
     * own when there is no room below — so the `top-*` values (kept for
     * callers written against the in-place panel) resolve to their `bottom-*`
     * counterpart and let the flip decide.
     */
    placement?: InlineMenuPlacement;
    size?: ButtonSize;
    /**
     * `icon`: a square button holding only the funnel (the label becomes its
     * accessible name); an active filter shows as a small primary dot on its
     * corner, the count in the accessible name. Default `label`.
     */
    trigger?: 'label' | 'icon';
    /** Accessible name of the panel. Default "Filters". */
    panelLabel?: string;
    className?: string;
    panelClassName?: string;
    /** Replaces the funnel glyph (e.g. `SlidersIcon`). Since 2.389.6. */
    icon?: ReactNode;
    'data-testid'?: string;
}

export declare const FLOATING_PANEL_ANCHORS: readonly FloatingPanelAnchor[];

/** A small card pinned to a corner of the viewport — a table of contents, a mini-map. */
export declare function FloatingCard({ children, corner, width, maxHeight, className, 'data-testid': testId, }: FloatingCardProps): JSX.Element;

export declare interface FloatingCardProps {
    children: ReactNode;
    /** Which corner of the viewport it sits in. Default bottom-right. */
    corner?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    /** Width in px. Default 160. */
    width?: number;
    /** Height cap in px; the card scrolls past it. Default 280. */
    maxHeight?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function FloatingPanel({ open, onClose, title, children, defaultPosition, persistKey, snapEnabled, snapThreshold, snapAnchors, onSnap, baseZIndex, widthClassName, heightClassName, tone, zIndexClassName, className, 'data-testid': testId, }: FloatingPanelProps): ReactPortal | null;

/** Named viewport docking positions a panel can snap to. */
export declare type FloatingPanelAnchor = 'top-left' | 'top-right' | 'left-center' | 'right-center' | 'bottom-left' | 'bottom-right';

export declare interface FloatingPanelProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    /** Viewport-relative initial anchor when no persisted position exists.
     *  Accepts any of the six named anchors or an explicit point. */
    defaultPosition?: FloatingPanelAnchor | {
        x: number;
        y: number;
    };
    /** localStorage key persisting the resolved anchor + offset across
     *  sessions. */
    persistKey?: string;
    /** Snap to a nearby anchor on drag release. Default true. */
    snapEnabled?: boolean;
    /** Proximity (px) at which an anchor arms. Default 24. */
    snapThreshold?: number;
    /** Restrict which anchors participate. Default: all six. */
    snapAnchors?: readonly FloatingPanelAnchor[];
    /** Fires when a drag settles into an anchor. */
    onSnap?: (anchor: FloatingPanelAnchor) => void;
    /** Floor for the shared focus-to-front z-order. Default 9999 — matches
     *  `zIndexClassName`. Pass alongside a custom `zIndexClassName` so a
     *  raise doesn't jump the panel out of its intended layer. */
    baseZIndex?: number;
    widthClassName?: string;
    heightClassName?: string;
    tone?: 'light' | 'dark';
    zIndexClassName?: string;
    className?: string;
    'data-testid'?: string;
}

/**
 * A folder: "file this under something of your own".
 *
 * The tab is drawn short and offset left so it reads as a folder rather than
 * as a rectangle with a bite out of it at 14px, which is the size the
 * conversation row menu uses it at.
 */
export declare function FolderIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The trail with the title folded in as its last crumb. A trail that already
 * ends with the title (the initiative trail ends "… › Observability
 * Platform") is returned as is; an empty trail becomes the title alone.
 */
export declare function foldTitleIntoTrail(crumbs: readonly BreadcrumbItem[] | undefined, title: string | undefined): BreadcrumbItem[];

export declare function FollowBanner({ name, onStop, autoStopOnInteract, autoStop, autoStopScope, location, appearance, className, 'data-testid': testId, }: FollowBannerProps): JSX.Element | null;

export declare interface FollowBannerProps {
    /** Who is being followed. Null renders nothing. */
    name: string | null;
    onStop: () => void;
    /**
     * End follow on the viewer's own mousedown / keydown / wheel. Default on;
     * turn off only where the host routes those interactions itself.
     */
    autoStopOnInteract?: boolean;
    /** Same switch as `autoStopOnInteract` (2.393.0 name); `false` turns the auto-unlock off. */
    autoStop?: boolean;
    /**
     * Listen on this element only, and only for scrolling or typing — the
     * editor, typically — instead of every mousedown/keydown/wheel in the
     * window. Clicks elsewhere (a call dock, a toolbar) keep following. 2.393.0.
     */
    autoStopScope?: RefObject<HTMLElement | null>;
    /**
     * Where the followed person is — a section title ("Session flow"). Rendered
     * after the name as ` · <location>` in the regular weight. Empty or unset
     * renders the name alone.
     */
    location?: string;
    /**
     * `banner` (default): the centred strip with a small "Stop" button.
     * `bar`: the in-call follow bar — a rounded row inside the page column,
     * "**Following Alice** · Session flow" on the left and a "Stop following"
     * button on the right.
     */
    appearance?: 'banner' | 'bar';
    className?: string;
    'data-testid'?: string;
}

/**
 * A strip of clickable follow-up suggestion chips, with optional refresh button.
 */
export declare function FollowUpChips({ suggestions, onSelect, onRefresh, label, className, }: FollowUpChipsProps): JSX.Element;

export declare interface FollowUpChipsProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
    /** if provided, shows a ↻ refresh button */
    onRefresh?: () => void;
    /** optional label before chips, e.g. "Follow up:" */
    label?: string;
    className?: string;
}

export declare function formatCompactAge(value: string | number | Date | null | undefined, now?: number): string | undefined;

/**
 * The display text for an estimate. Ranges read "$0.03 – $0.30" or
 * "1 – 6 min"; equal ends collapse to one value. A range whose numbers are
 * not finite or are negative is not an estimate — it reads "Unavailable"
 * rather than printing NaN.
 */
export declare function formatEstimate(estimate: RunEstimate): string;

/** "42s", "3m 42s", "1h 05m": the run-length format the progress panel and run cards use. */
export declare function formatRunDuration(ms: number | undefined): string;

/** "9h ago", "just now", "Sep 3" — `formatCompactAge` read as a sentence. */
export declare function formatSourceAge(value: string | number | Date | null | undefined, now?: number): string | undefined;

/** "$1.46", "<$0.01", "$1,204". Exported for tests and hosts that echo it. */
export declare function formatSpend(usd: number): string;

/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export declare function formatTypingBanner(names: string[]): string;

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export declare function FormField({ label, hint, error, required, layout, children, className, labelClassName, style, hintTestId, 'data-testid': testId, }: FormFieldProps): JSX.Element;

declare interface FormFieldBase {
    /** Stable key; defaults to the label. */
    id?: string;
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    'data-testid'?: string;
}

export declare type FormFieldLayout = 'stacked' | 'inline';

export declare interface FormFieldProps {
    label: string;
    /**
     * Helper text shown under the control. A plain string still works; also
     * accepts a `ReactNode` for a hint that needs a link or inline emphasis
     * (e.g. "See the docs" as an actual `<a>`) rather than plain text.
     */
    hint?: ReactNode;
    /** Error message; when present, replaces the hint and adds a danger border. */
    error?: string;
    /**
     * `data-testid` on the hint/error element. Omit to leave it untestable by
     * id, same as before this prop existed.
     */
    hintTestId?: string;
    /** Renders an asterisk after the label. Does NOT enforce validation. */
    required?: boolean;
    layout?: FormFieldLayout;
    /**
     * Pass-through render. The function receives an `id` and the wiring
     * (`aria-describedby` / `aria-invalid`) you should spread onto the input
     * so the label associates correctly:
     *
     *   <FormField label="Name">
     *     {(p) => <input {...p} value={...} onChange={...} />}
     *   </FormField>
     *
     * For controls that take an explicit `id` prop (Switch's `aria-labelledby`),
     * `wiring.labelId` exposes the label's id.
     */
    children: (wiring: {
        id: string;
        labelId: string;
        'aria-describedby'?: string;
        'aria-invalid'?: boolean;
        'aria-required'?: boolean;
    }) => ReactNode;
    className?: string;
    /**
     * Overrides the label's typography. Exists so surfaces with their own label
     * look — the uppercase filter-bar captions on the identity admin pages, for
     * instance — can adopt this component for its `htmlFor` / `aria-describedby`
     * wiring instead of hand-rolling a detached `<label>` that names nothing.
     * Merged over the defaults, so error colouring still applies unless you
     * override it.
     */
    labelClassName?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/** One field of a `form` leaf: `FormField` around a `forms/` control. */
export declare type FormFieldSpec = FormFieldBase & ({
    control: 'input';
    value: string;
    onChange: (value: string) => void;
    type?: InputType;
    placeholder?: string;
    name?: string;
} | {
    control: 'textarea';
    value: string;
    onChange: (value: string) => void;
    rows?: number;
    placeholder?: string;
    name?: string;
} | {
    control: 'select';
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    searchable?: boolean;
    name?: string;
} | {
    control: 'number';
    value: number | undefined;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    placeholder?: string;
    name?: string;
} | {
    control: 'checkbox';
    checked: boolean;
    onChange: (checked: boolean) => void;
} | {
    control: 'toggle';
    checked: boolean;
    onChange: (checked: boolean) => void;
});

/** A stack of `FormField`s, each wrapping an `Input`/`Select`/`Textarea`/`NumberInput`/`Checkbox`/`Switch`. */
export declare interface FormLeaf {
    kind: 'form';
    fields: ReadonlyArray<FormFieldSpec | false | null | undefined>;
}

export declare function FormRow({ children, stackBelow, gap, className, 'data-testid': testId, }: FormRowProps): JSX.Element;

export declare interface FormRowProps {
    /** The fields. Usually `<FormField>`s; anything is accepted. */
    children: ReactNode;
    /**
     * Below this width the row stacks. `sm` (default, 640px) suits a modal;
     * `md` (768px) suits a full-width form where three fields share the row.
     */
    stackBelow?: 'sm' | 'md';
    /** Gap between fields. Default 12px, matching Stack's `md`. */
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

export declare function FormWizard({ sections, mode, stepper, activeKey: activeKeyProp, onStepChange, summary, summaryTitle, aside, actionsPlacement, onSubmit, submitLabel, submittingLabel, submitting, submitDisabled, submitError, onDismissError, secondaryActions, backLabel, nextLabel, 'aria-label': ariaLabel, className, 'data-testid': testId, }: FormWizardProps): JSX.Element;

export declare type FormWizardMode = 'single' | 'stepped';

export declare interface FormWizardProps {
    sections: readonly FormWizardSection[];
    /** Default `single`. */
    mode?: FormWizardMode;
    /** Show the stepper. Default: on in stepped mode, off in single mode. */
    stepper?: boolean;
    /** Stepped mode, controlled: the visible section's key. */
    activeKey?: string;
    /** Stepped mode: called when the step changes (controlled or not). */
    onStepChange?: (key: string) => void;
    /** The live summary panel beside the form ("what you'll get"). */
    summary?: ReactNode;
    /** The summary panel's heading. Default "Summary". */
    summaryTitle?: string;
    /** Help under the summary (or alone in the side column). */
    aside?: ReactNode;
    /** Where Back/Next/Submit sit when there is a summary. Default `summary`; stepped mode always uses `form`. */
    actionsPlacement?: 'form' | 'summary';
    onSubmit: () => void | Promise<void>;
    submitLabel?: string;
    /** Shown on the Submit button while `submitting`. Default "Submitting…". */
    submittingLabel?: string;
    submitting?: boolean;
    /** Disable Submit (e.g. a server pre-check blocks it). The reason belongs in the summary. */
    submitDisabled?: boolean;
    /** A failed submit, shown above the actions. */
    submitError?: ReactNode;
    onDismissError?: () => void;
    /** Extra actions beside the primary (a Cancel link). */
    secondaryActions?: ReactNode;
    backLabel?: string;
    nextLabel?: string;
    /** Names the form for assistive tech. */
    'aria-label'?: string;
    className?: string;
    /** Default `form-wizard`; sections get `<id>-section-<key>`, actions `<id>-submit` / `-next` / `-back`. */
    'data-testid'?: string;
}

export declare interface FormWizardSection {
    key: string;
    /** The section heading (14/600) — and the step label unless `label` is given. */
    title: string;
    /** A short stepper label ("Who", "What") when the heading is a sentence. */
    label?: string;
    /** 12/400 line under the heading. */
    description?: ReactNode;
    content: ReactNode;
    /** Leave the section out entirely (no step, no heading). */
    hidden?: boolean;
    /** What blocks this section, or null/undefined when it is complete. */
    error?: string | null;
    'data-testid'?: string;
}

/** A hooked arrow: forwarded — this came from somewhere else. */
export declare function ForwardIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `PageFrame`: a form, an overview, anything no other template fits. */
export declare interface FramePageSpec extends SpecHeader {
    template: 'frame';
    sections: SectionList;
    trailControls?: LeafList;
    trailLink?: {
        label: string;
        href: string;
    } | null;
    collapsed?: boolean;
    onToggleCollapsed?: () => void;
    body?: 'scroll' | 'fill' | 'docked';
    dockedBody?: 'scroll' | 'fill';
    bodyGutter?: PageGutter;
    /** Docked under the body (a save bar). */
    footer?: LeafList;
}

export declare function FrameStrip({ frames, label, fps, index: indexProp, defaultIndex, onIndexChange, autoPlay, loop, contactSheet, aspect, thumbnails, className, 'data-testid': testId, }: FrameStripProps): JSX.Element | null;

export declare type FrameStripAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export declare interface FrameStripFrame {
    src: string;
    label?: string;
    alt?: string;
}

export declare interface FrameStripProps {
    frames: readonly FrameStripFrame[];
    /** Accessible name of the strip. Default "Frames". */
    label?: string;
    /** Playback rate. Default 12. */
    fps?: number;
    /** Controlled frame index (0-based). */
    index?: number;
    /** Initial frame when uncontrolled. Default 0. */
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** Start playing on mount. Default false; never under prefers-reduced-motion. */
    autoPlay?: boolean;
    /** Wrap from the last frame to the first while playing. Default true. */
    loop?: boolean;
    /** One image of every frame; adds a "Frames | Contact sheet" switch. */
    contactSheet?: {
        src: string;
        label?: string;
        alt?: string;
    };
    /** The frame's aspect — same classes as ImageCompare. Default `square`. */
    aspect?: FrameStripAspect;
    /** A scrolling row of frame buttons under the player. Default true. */
    thumbnails?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function FullscreenToggle({ target, label, exitLabel, onChange, size, variant, 'data-testid': testId, ...rest }: FullscreenToggleProps & {
    'data-testid'?: string;
}): JSX.Element | null;

export declare interface FullscreenToggleProps extends Omit<IconButtonProps, 'aria-label' | 'icon' | 'onClick' | 'onChange' | 'children'> {
    /** The element to present full screen. */
    target: RefObject<HTMLElement | null>;
    /** Accessible name while not in full screen. Default `Full screen`. */
    label?: string;
    /** Accessible name while in full screen. Default `Exit full screen`. */
    exitLabel?: string;
    /** After the browser accepted or refused the request. */
    onChange?: (active: boolean) => void;
}

export declare interface GalleryAsset {
    id: string;
    title: string;
    src?: string;
    subtitle?: string;
    /**
     * Shown on the card: StatusPill props (rendered at md, 12px: the sm size is
     * 10px, under the type floor) or any node. `images`: a pill over the
     * thumbnail's top-left corner. `avatars` (2.512.0): the caption's first
     * line under the tile — a tone dot and the full label, never truncated
     * (an 88px tile cut "Candidate" to "C."). The card's button is described
     * by it, so a screen reader hears "Inspect Cup, Needs review".
     */
    status?: GalleryAssetStatus | ReactNode;
    /**
     * With no `src` (2.512.0): the tile shows a library empty tile — the muted
     * surface, an image glyph and this text ("No picture yet") — instead of the
     * Avatar's initials or the "No image yet" line. Both variants.
     */
    placeholder?: string;
}

/**
 * A card's status as StatusPill props — `{ state: 'warning', label: 'Needs review' }`.
 * `tone` and `state` mean the same thing, as on StatusPill. `tone` also takes
 * any library tone (the 2.504–2.506 shape, `{ label, tone }`): `caution`
 * draws as `warning`, `accent` as `info`.
 */
export declare type GalleryAssetStatus = Pick<StatusPillProps, 'state' | 'tone' | 'label' | 'meta'> | {
    label: string;
    tone?: ToneOrAlias;
    meta?: string;
};

/** One icon action on a tile — the chat hover toolbar's action shape. Since 2.504.0. */
declare type GalleryTileAction = MessageAction;

/** Error received from the gateway (matches server error-codes.js format) */
declare interface GatewayError {
    /** Standardized error code (e.g. AUTH_TOKEN_EXPIRED, AUTHZ_CHANNEL_DENIED) */
    code: string;
    /** Human-readable description for display */
    message: string;
    timestamp: string;
}

/** A raw message received over the WebSocket */
declare interface GatewayMessage {
    type: string;
    action?: string;
    channel?: string;
    error?: GatewayError;
    [key: string]: unknown;
}

export declare function GenerativeImagePreview({ status, src, alt, startedAt, className, }: GenerativeImagePreviewProps): JSX.Element;

export declare interface GenerativeImagePreviewProps {
    status: GenerativeImagePreviewStatus;
    /** Produced-image URL; rendered when status is 'done'. */
    src?: string;
    alt?: string;
    /** Epoch ms when synthesis started — enables the elapsed-time chip. */
    startedAt?: number;
    /** Caller controls size (width/height/aspect), like ImageThumbnail. */
    className?: string;
}

export declare type GenerativeImagePreviewStatus = 'synthesizing' | 'done';

/**
 * Maps an event type prefix to a category for filter UIs.
 * Used by ExecutionLog + Observability EventsPage to group filters.
 */
export declare function getEventCategory(type: string): 'lifecycle' | 'step' | 'llm' | 'approval' | 'activity' | 'social' | 'other';

/**
 * Look up a glyph for an event type, falling back to a neutral bullet.
 */
export declare function getEventGlyph(type: string): EventGlyph;

export declare interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    /** Rendered size in px. Default 16 — sized for an `IconButton size="sm"`. */
    size?: number;
}

/** Three joined nodes: a graph of connections, "how these relate". */
export declare function GraphIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Star colours for the graphite sky: zinc greys, so no blue cast sits on a white page. */
export declare const GRAPHITE_PARTICLE_COLORS: readonly ["#f4f4f5", "#d4d4d8", "#a1a1aa"];

/** Six dots in two columns: a drag handle — "pick this up and move it". Since 2.385.0. */
export declare function GripIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function GroupedList({ groups, rows, onOpenRow, rowMenu, rowMenuLabel, openGroups, onToggleGroup, storageKey, currentId, hideEmptyGroups, onReorder, canReorder, reorderLabel, size, groupHeading, currentStyle, groupCountStyle, groupCountAlign, rowStyle, trailingLayout, className, 'data-testid': testId, }: GroupedListProps): JSX.Element;

export declare interface GroupedListGroup {
    id: string;
    title: string;
    /** Shown as a count chip after the title. Omit for no chip. */
    count?: number;
    /** Leading mark after the caret — normally a `FileKindMark kind="folder"`. */
    icon?: ReactNode;
    /** Open on first render. Default `true`. Ignored when `openGroups` is controlled. */
    defaultOpen?: boolean;
    /** What an open group with no rows says. Default "Nothing here". */
    emptyLabel?: string;
}

/** `GroupedList`: two-line rows under collapsible group headers. */
export declare interface GroupedListLeaf extends Omit<GroupedListProps, 'className'> {
    kind: 'list';
    variant: 'grouped';
}

export declare interface GroupedListProps {
    groups: GroupedListGroup[];
    rows: GroupedListRow[];
    /** A row was activated — click, Enter or Space on its primary button. */
    onOpenRow?: (row: GroupedListRow) => void;
    /**
     * The row's ⋯ menu. Return `null` or an empty array for a row without one.
     * Opens from the ⋯ button, a right-click, or Shift+F10 / the context-menu
     * key on the focused row.
     */
    rowMenu?: (row: GroupedListRow) => DropdownMenuSection[] | null | undefined;
    /** Accessible name of a row's menu button. Default `Actions for <title>`. */
    rowMenuLabel?: (row: GroupedListRow) => string;
    /** Controlled open groups. With this, `defaultOpen` and `storageKey` are ignored. */
    openGroups?: string[];
    /** Fires on every caret click / ArrowLeft / ArrowRight toggle, controlled or not. */
    onToggleGroup?: (groupId: string, open: boolean) => void;
    /** Persist collapsed group ids under this `localStorage` key. */
    storageKey?: string;
    /** Marks a row `current` by id — an alternative to setting it on the row. */
    currentId?: string | null;
    /** Hide a group whose row list is empty instead of showing its empty label. Default `false`. */
    hideEmptyGroups?: boolean;
    /**
     * Turns on reorder: a drag handle per row plus Alt+arrow keys. `index` is the
     * row's final position within `toGroupId`. The host applies the move.
     */
    onReorder?: (rowId: string, toGroupId: string, index: number) => void;
    /** Which rows can move. Default: every row that is not `disabled`. */
    canReorder?: (row: GroupedListRow) => boolean;
    /** Accessible name of a row's drag handle. Default `Reorder <title>`. */
    reorderLabel?: (row: GroupedListRow) => string;
    /**
     * `sm` (default): 14px titles, 12px meta, a tinted current row. `md` — the
     * Work column: 14px group headers (15px before 2.441.4), rail titles, 12px meta (13px before), taller rows, a
     * current row that is a rounded tint with a 3px primary bar on its left
     * edge, and a larger drag handle that is always visible.
     */
    size?: 'sm' | 'md';
    /**
     * How a group header reads. `title` (default): a sentence-case heading
     * (14px at both sizes since 2.441.4) with its count in a 12px neutral chip (10px before). `label`: a section
     * label — 11px uppercase semibold, letter-spaced, secondary ink — with the
     * count as plain muted text after it ("RECENTLY UPDATED 4"), for a list
     * whose groups are time bands rather than named things. Since 2.389.0.
     */
    groupHeading?: 'title' | 'label';
    /**
     * How the current row is marked. `tint` (default): a pale primary fill (at
     * `md`, also the 3px bar). `bar`: the fill plus a 2px inset primary bar on
     * the left edge at `sm` too. Since 2.389.0.
     */
    currentStyle?: 'tint' | 'bar';
    /**
     * How a `title` group header's count reads. `chip` (default): a neutral
     * count chip. `plain`: muted text after the title — "In progress 9". (A
     * `label` heading's count is always plain.) Since 2.390.0.
     */
    groupCountStyle?: 'chip' | 'plain';
    /**
     * Where a group header's count sits. `inline` (default): right after the
     * title. `end`: pushed to the header's right edge — "IN PROGRESS … 9", the
     * Initiatives v2 rail. Applies to every heading and count style. Since
     * 2.392.0.
     */
    groupCountAlign?: 'inline' | 'end';
    /**
     * `ruled` (default): a 1px rule above every row. `plain` (since 2.392.0):
     * no rules — a title-only list whose rows are separated by space alone —
     * the Initiatives v2 rail. Since 2.397.0 a plain row is a RAIL row: it
     * draws the shared rail scale (`railType`: 15px/500 titles on a 40px pitch,
     * the 3px-bar current row) at any `size`, the same scale as SubNavLayout.
     */
    rowStyle?: 'ruled' | 'plain';
    /**
     * Where rows put `actions` and `trailing`. `inline` (default): each row at
     * its own end, as before. `columns`: one grid for the whole list — every
     * row's actions and trailing sit in shared, right-aligned columns
     * (`[leading] [main] [actions] [trailing]`), so their edges line up down the
     * list whatever buttons each row has; action Buttons draw at `sm`. Since
     * 2.513.0.
     */
    trailingLayout?: 'inline' | 'columns';
    className?: string;
    'data-testid'?: string;
}

export declare interface GroupedListRow {
    id: string;
    groupId: string;
    /** Leading kind mark — normally a `FileKindMark`. */
    icon?: ReactNode;
    title: string;
    /** Beside the title on the first line — normally a `StatusPill`. */
    pill?: ReactNode;
    /** The second line at rest. */
    subline?: ReactNode;
    /** The second line while hovered, focused or `current`. Falls back to `subline`. */
    hoverSubline?: ReactNode;
    /** Trailing content that is always visible — a "View run" link. */
    trailing?: ReactNode;
    /** Trailing content revealed on hover / focus / `current` — an "Open" button. */
    hoverActions?: ReactNode;
    /**
     * The row's own controls — quick-action buttons. Always visible, outside
     * the row's button (tab order: row, then these), at the row's end when it
     * is wide and wrapped under the title below a 35rem row. Since 2.509.0.
     */
    actions?: ReactNode;
    /** The row the reader is "at": last opened, just created. Tinted; wears its hover line. */
    current?: boolean;
    /** Muted and inert; the menu still opens so a reader can see why. */
    disabled?: boolean;
    /** Optional accessible name override — default is the title. */
    ariaLabel?: string;
    /**
     * A control in the caret column — normally a `Checkbox`. Rendered OUTSIDE the
     * row's button, so pressing it never opens the row.
     */
    leading?: ReactNode;
    /** A decorative status mark needs only an 8px column; controls keep their full target. */
    leadingSize?: 'control' | 'indicator' | 'none';
    /**
     * A second line inside the row's button, above `subline` — avatar, points,
     * owner. Non-interactive by contract (it is inside a button).
     */
    meta?: ReactNode;
}

/** Below this container height a rich page starts collapsed. */
export declare const HEADER_COLLAPSE_BELOW_PX = 480;

/** Below this container height a plain page drops to compact. */
export declare const HEADER_COMPACT_BELOW_PX: 640;

/** Where the chevron is remembered: `uic:header-density:<headerId>:<rich|plain>`. */
export declare const HEADER_DENSITY_STORAGE_PREFIX = "uic:header-density:";

/** Scrolled this far down (px), a rich page's header collapses. */
export declare const HEADER_SCROLL_COLLAPSE_PX = 48;

/**
 * The header's chevron. Collapsed: "Expand header" (points down). Otherwise:
 * "Collapse header" (points up). `aria-expanded` says which.
 */
export declare function HeaderCollapseToggle({ collapsed, onToggle, className, 'data-testid': testId }: HeaderCollapseToggleProps): JSX.Element;

export declare interface HeaderCollapseToggleProps {
    /** True when the header is collapsed: the chevron points down and expands it. */
    collapsed: boolean;
    onToggle: () => void;
    className?: string;
    'data-testid'?: string;
}

/** What the page's body holds. Rich kinds ask for a compact header. */
export declare type HeaderContentKind = 'canvas' | 'graph' | 'conversation' | 'document' | 'list' | 'detail';

/**
 * A page's header before any scroll or chevron. Density: the host's
 * `preference` when given; else rich content → compact, plain → comfortable,
 * and a plain page under `HEADER_COMPACT_BELOW_PX` → compact. Collapsed: a
 * rich page under `HEADER_COLLAPSE_BELOW_PX`. A height of 0 or less (not
 * measured yet) is ignored.
 */
export declare function headerDefaults({ contentKind, containerHeight, preference }: {
    contentKind?: HeaderContentKind;
    containerHeight?: number | null;
    preference?: Density | null;
}): {
    density: Density;
    collapsed: boolean;
};

export declare interface HeaderDensityState {
    density: Density;
    collapsed: boolean;
    /** Collapsed → open (forgotten); open → collapsed (remembered). */
    toggleCollapsed: () => void;
    /** Callback ref for the content region whose scroll collapses the header. */
    contentRef: (node: HTMLElement | null) => void;
    /** Spread onto `PageHeader` / `ScopeHeader`. */
    headerProps: {
        density: Density;
        collapsed: boolean;
        onToggleCollapsed: () => void;
    };
}

export declare function headerDensityStorageKey(headerId: string, kind: HeaderContentKind | undefined): string;

/**
 * Compact density's home for the description: an info glyph after the title
 * opening the library `HoverCard` — hover or keyboard focus shows it, Enter
 * pins it, Escape closes it, focus never leaves the glyph.
 */
export declare function HeaderDescriptionInfo({ title, description, width, 'data-testid': testId }: HeaderDescriptionInfoProps): JSX.Element;

export declare interface HeaderDescriptionInfoProps {
    /** Who the description is about — the trigger reads "About <title>". */
    title: string;
    description: ReactNode;
    /** The card's width. Default `lg`; `xl` for a summary that carries a stat strip. Since 2.437.1. */
    width?: HoverCardWidth;
    'data-testid'?: string;
}

/**
 * The people in a header. Comfortable: the muted label, then a 32px avatar
 * and the name per person. Compact: 24px avatars only, each name and its
 * group in a tooltip ("Nora DaSilva · Owner"), groups ruled apart.
 */
export declare function HeaderPeople({ groups, density, 'data-testid': testId }: {
    groups: readonly HeaderPeopleGroup[];
    density: Density;
    'data-testid'?: string;
}): JSX.Element | null;

export declare interface HeaderPeopleGroup {
    /** "Owner", "SMEs". */
    label: string;
    people: HeaderPerson[];
    /** Beside the group — a "change owner" control. Keeps an empty group drawn. */
    action?: ReactNode;
}

export declare interface HeaderPerson {
    id: string;
    name: string;
    avatarUrl?: string;
    color?: string;
}

/**
 * The collapsed header: one trail row, the title as its last crumb, then the
 * badge and the expand chevron; actions on the right.
 */
export declare function HeaderTrailFold({ breadcrumbs, title, badge, onExpand, actions, className, 'data-testid': testId, }: HeaderTrailFoldProps): JSX.Element;

export declare interface HeaderTrailFoldProps {
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

declare function Highlight_2({ text, terms, className, markClassName, 'data-testid': testId }: HighlightProps): ReactNode;
export { Highlight_2 as Highlight }

/** A marker tip over a stroke: "highlight". Since 2.386.5. */
export declare function HighlighterIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * Highlight one part: every mesh whose name, or an ancestor's, is `node` gets a
 * clone of its material with `emissive` set to `color`. Any earlier highlight
 * is put back first; `node = null` only puts it back. Returns the number of
 * meshes highlighted, or -1 when the scene is unreachable.
 */
export declare function highlightModelPart(el: unknown, node: string | null, color?: string): number;

export declare interface HighlightProps {
    /** The text to render. */
    text: string;
    /** Terms or phrases to mark. Empty or blank terms are ignored. */
    terms: readonly string[];
    /** Classes for the outer span. */
    className?: string;
    /** Classes merged onto every <mark>. */
    markClassName?: string;
    'data-testid'?: string;
}

/**
 * Split `text` into alternating plain / matched segments. Exported so a host
 * that needs the match positions (a count, an aria description) reads the
 * same answer the component draws.
 */
export declare function highlightSegments(text: string, terms: readonly string[]): Array<{
    text: string;
    match: boolean;
}>;

export declare function Histogram({ buckets, labels, accent, height, className, 'aria-label': ariaLabel, 'data-testid': testId }: HistogramProps): JSX.Element;

export declare interface HistogramProps {
    /** Counts per bucket, left to right. */
    buckets: readonly number[];
    /** Per-bucket labels; used for the tooltip and the accessible description. */
    labels?: readonly string[];
    accent?: DataAccent;
    /** Plot height in px (default 48). */
    height?: number;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** A clock: history, "when". */
export declare function HistoryIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare const HOVER_CARD_CLOSE_MS = 250;

export declare const HOVER_CARD_OPEN_MS = 300;

export declare function HoverCard({ label, content, children, width, openOnFocus, pinOnKey, onOpenChange, className, 'data-testid': testId, }: HoverCardProps): JSX.Element;

export declare interface HoverCardProps {
    /** The card's accessible name. */
    label: string;
    /** What the card shows. Rendered only while open. */
    content: ReactNode;
    children: (trigger: HoverCardTriggerProps) => ReactNode;
    width?: HoverCardWidth;
    /** Open on keyboard focus. Default true. */
    openOnFocus?: boolean;
    /** Enter/Space on the trigger pins the card. Default true. */
    pinOnKey?: boolean;
    /** Told whenever the card opens or closes (lazy-load its content). */
    onOpenChange?: (open: boolean) => void;
    className?: string;
    'data-testid'?: string;
}

export declare interface HoverCardTriggerProps {
    ref: RefCallback<HTMLElement>;
    onMouseEnter: (e: MouseEvent_2<HTMLElement>) => void;
    onMouseLeave: (e: MouseEvent_2<HTMLElement>) => void;
    onFocus: (e: FocusEvent_2<HTMLElement>) => void;
    onBlur: (e: FocusEvent_2<HTMLElement>) => void;
    onKeyDown: (e: KeyboardEvent_2<HTMLElement>) => void;
    onClick: (e: MouseEvent_2<HTMLElement>) => void;
    'aria-expanded': boolean;
    'aria-controls': string | undefined;
    'aria-describedby': string | undefined;
}

export declare type HoverCardWidth = 'sm' | 'md' | 'lg' | 'xl';

export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, tone, size: requestedSize, className, ...rest }: IconButtonProps): JSX.Element;

export declare interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    'aria-label': string;
    icon?: ReactNode;
    children?: ReactNode;
    variant?: IconButtonVariant;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette — the close/split/kill controls
     * that live in terminal pane chrome.
     */
    tone?: IconButtonTone;
    size?: 'sm' | 'md' | 'lg';
    /** The button element (React 19 passes `ref` as a prop; 2.432.0 names it in the type). */
    ref?: Ref<HTMLButtonElement>;
}

/** @see SurfaceTone — which colour family the button paints in. */
export declare type IconButtonTone = SurfaceTone;

/** `outline` (since 2.386.5): a bordered square on the surface — an editor head's (i) and ⋯. */
export declare type IconButtonVariant = 'ghost' | 'primary' | 'danger' | 'outline';

export declare function IconPicker({ value, onChange, curated, }: IconPickerProps): JSX.Element;

export declare interface IconPickerProps {
    value: string;
    onChange: (emoji: string) => void;
    curated?: string[];
}

declare interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
    size?: number;
}

export declare function ImageCompare({ images, label, aspect, fit, zoomable, className, 'data-testid': testId, }: ImageCompareProps): JSX.Element | null;

export declare type ImageCompareAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export declare interface ImageCompareImage {
    /** The picture. Omit it (with `placeholder`) for a pane whose image does not exist yet. */
    src?: string;
    /**
     * Words for a pane with no `src` — "No picture yet". The pane keeps the
     * same frame and caption, with these centred in it; it is not zoomable.
     * Since 2.513.0.
     */
    placeholder?: string;
    /** Short name shown under the pane — "Reference", "Current", "Candidate". */
    label: string;
    /** Alt text. Defaults to `label`. */
    alt?: string;
    /** A quieter line under the label — "v3 · 2 days ago". */
    description?: string;
    /** A node beside the label, usually a StatusPill ("Approved"). */
    meta?: ReactNode;
}

export declare interface ImageCompareProps {
    /** Two or three images, in reading order. Extras past three are ignored. */
    images: readonly ImageCompareImage[];
    /** Accessible name for the group. Default "Image comparison". */
    label?: string;
    /**
     * The shared frame every pane uses, so heights match. `landscape` (4:3,
     * default), `square` (1:1), `portrait` (3:4), `wide` (16:9).
     */
    aspect?: ImageCompareAspect;
    /** `contain` (default) shows each whole image; `cover` fills the frame and crops. */
    fit?: 'contain' | 'cover';
    /** Open the lightbox on click/Enter. Default true. */
    zoomable?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function ImageFilmstrip({ items, value, defaultValue, onValueChange, caption, aspect, maxThumbs, onMore, label, className, 'data-testid': testId, }: ImageFilmstripProps): JSX.Element | null;

export declare interface ImageFilmstripItem {
    id: string;
    src: string;
    /** "Full", "Front", "Side". The thumbnail's name and the large frame's caption. */
    label: string;
    alt?: string;
    /** A quieter caption line in the large frame ("v2 · approved 9:05"). */
    description?: string;
}

export declare interface ImageFilmstripProps {
    items: readonly ImageFilmstripItem[];
    /** The view in the large frame (controlled). */
    value?: string;
    /** The first view shown (uncontrolled). Default: the first item. */
    defaultValue?: string;
    onValueChange?: (id: string) => void;
    /** A chip over the strip naming what this is: "Approved concept · v2". */
    caption?: ReactNode;
    /** The large frame's aspect. Default `landscape`. */
    aspect?: ImageCompareAspect;
    /** Thumbnails shown before "+N more". Default 6. */
    maxThumbs?: number;
    /** "+N more": open the full set (a versions tab, a lightbox). Without it the extra views are not reachable from the strip. */
    onMore?: () => void;
    /** Names the thumbnail group. Default "Views". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}

/** A framed picture with a sun and a hill: "image". Since 2.386.5. */
export declare function ImageIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ImageLightbox({ images, openIndex, onClose, onNavigate }: ImageLightboxProps): ReactPortal | null;

export declare interface ImageLightboxImage {
    src: string;
    alt?: string;
    caption?: string;
}

export declare interface ImageLightboxProps {
    images: ImageLightboxImage[];
    /** Index of the open image, or null when the lightbox is closed. */
    openIndex: number | null;
    onClose: () => void;
    /**
     * Controlled navigation callback. When provided, prev/next/arrow-keys
     * call this and the parent is expected to update `openIndex`. When
     * omitted, the lightbox navigates with internal fallback state.
     */
    onNavigate?: (index: number) => void;
}

export declare function ImageThumbnail({ src, alt, size, aspectRatio, rounded, fallback, loading, className, 'data-testid': testId, }: ImageThumbnailProps): JSX.Element;

export declare type ImageThumbnailAspect = 'square' | 'video' | 'auto';

export declare interface ImageThumbnailProps {
    src: string;
    alt: string;
    size?: ImageThumbnailSize;
    aspectRatio?: ImageThumbnailAspect;
    rounded?: boolean;
    /** Rendered when the image fails to load. Defaults to a broken-image icon. */
    fallback?: ReactNode;
    loading?: 'lazy' | 'eager';
    className?: string;
    'data-testid'?: string;
}

export declare type ImageThumbnailSize = 'sm' | 'md' | 'lg';

export declare function ImageUploader(props: ImageUploaderProps): JSX.Element;

export declare interface ImageUploaderProps {
    /** Current uploaded image (null until something has been uploaded). */
    value: ImageUploaderValue | null;
    onChange: (next: UploadedImage | null) => void;
    /** Max upload size in bytes. Default: 8 * 1024 * 1024 (8 MB). */
    maxSize?: number;
    /** Accepted mime types. Default: 'image/*'. */
    accept?: string;
    /** When true, hide the URL input and accept only drag-drop + file picker. */
    fileOnly?: boolean;
    /** When true, hide the file picker and accept only URL. */
    urlOnly?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface ImageUploaderValue {
    imageId: string;
    width?: number;
    height?: number;
    mimeType?: string;
}

/**
 * className-based equivalents of `baseStyle` (the item's default look, passed
 * as `renderNavItem`'s third argument) and `activeNavItemStyle` above — for a
 * router integration that wants `NavLink`'s `className={({ isActive }) => ...}`
 * form instead of its `style={({ isActive }) => ...}` form, so hooking up
 * real active-link routing needs no inline `style` prop at all:
 *
 * ```tsx
 * renderNavItem={(item, children) => (
 *   <NavLink
 *     to={item.path}
 *     className={({ isActive }) =>
 *       isActive ? activeNavItemClassName : inactiveNavItemClassName
 *     }
 *   >
 *     {children}
 *   </NavLink>
 * )}
 * ```
 */
export declare const inactiveNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-transparent text-text-primary no-underline cursor-pointer hover:bg-surface-hover";

export declare function InboxSection({ title, count, countTone, hint, action, empty, footer, headingLevel, children, className, 'data-testid': testId, }: InboxSectionProps): JSX.Element;

export declare interface InboxSectionEmpty {
    /** A small glyph above the title. An emoji string is fine. */
    icon?: ReactNode;
    /** One line: "No decisions waiting". */
    title: string;
    /** The hint under it: what would appear here, and when. */
    body?: string;
    /** Lands on the empty-state container. Default `<section testid>-empty`. */
    testId?: string;
}

export declare interface InboxSectionProps {
    title: string;
    /** How many rows the lane holds. Drawn in the header beside the title. */
    count: number;
    /** Tone of the count chip. `warning` for a lane whose rows block something. */
    countTone?: ChipTone;
    /** Quiet qualifier after the count — "newest blockage first". */
    hint?: ReactNode;
    /** Right-aligned control in the header. */
    action?: ReactNode;
    /** What the lane says instead of rows when `count` is 0. */
    empty?: InboxSectionEmpty;
    /** A note under the rows — a horizon, a caveat. Not drawn when empty. */
    footer?: ReactNode;
    /** Heading level of the title. Default `2`: one lane, one landmark heading. */
    headingLevel?: 2 | 3;
    /** The rows, as `InboxSectionRow`s. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** One row of an `InboxSection`. The group draws the frame and the rule. */
export declare function InboxSectionRow({ children, className, ...rest }: InboxSectionRowProps): JSX.Element;

export declare interface InboxSectionRowProps extends HTMLAttributes<HTMLLIElement> {
    children: ReactNode;
    'data-testid'?: string;
}

/** A circled "i": "more about this" — an estimate's confidence, a footnote. Since 2.385.0. */
export declare function InfoIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * Horizontal flex row with a scale gap. Wraps by default — an un-wrapping row
 * of chips is how a toolbar overflows its container on a narrow window, and
 * every consumer that hand-rolled this wrote `flexWrap: 'wrap'` anyway.
 */
export declare function Inline({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): JSX.Element;

export declare function InlineAlert({ tone, palette, children, onDismiss, className, 'data-testid': testId, }: InlineAlertProps): default_2.JSX.Element;

/**
 * `tone` already names the severity here, so the surface-family axis is
 * `palette` — same split as Chip. See `SurfaceTone` in tones.ts.
 */
export declare type InlineAlertPalette = SurfaceTone;

export declare interface InlineAlertProps {
    tone: InlineAlertTone;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette, for alerts inside a log console
     * or debugger panel.
     */
    palette?: InlineAlertPalette;
    children: default_2.ReactNode;
    onDismiss?: () => void;
    className?: string;
    /** Test hook, forwarded to the alert element itself — same as Chip. An
     *  alert is the thing a test most wants to assert on, and without this
     *  the caller had to wrap it in a div and assert on the wrapper. */
    'data-testid'?: string;
}

export declare type InlineAlertTone = 'error' | 'success' | 'info' | 'warning';

export declare function InlineMenu({ open, onClose, placement, trigger, role, className, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, }: InlineMenuProps): JSX.Element | null;

export declare type InlineMenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export declare interface InlineMenuProps {
    /** Whether the panel is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the panel should dismiss (outside click / Esc). */
    onClose: () => void;
    /**
     * Placement relative to the nearest `position: relative` ancestor —
     * normally a wrapper around the trigger this panel is anchored to.
     * Defaults to 'bottom-start'.
     */
    placement?: InlineMenuPlacement;
    /**
     * Ref to the trigger element, so a pointerdown on it doesn't count as an
     * "outside" click. Optional — omit it if the caller handles its own
     * open/close toggling some other way.
     */
    trigger?: RefObject<HTMLElement | null>;
    /**
     * ARIA role for the panel. Default `'group'` — a plain labelled
     * container, appropriate when the panel isn't a focus-trapping dialog
     * (this component doesn't trap focus) and may or may not hold menu items.
     * Pass `'menu'` when every child is a `menuitem`.
     */
    role?: string;
    /** Optional className for the panel. */
    className?: string;
    /** Optional testid for the panel. Default 'inline-menu'. */
    'data-testid'?: string;
    /** Accessible name for the panel. */
    'aria-label'?: string;
    /** Id of an element inside the panel that names it. */
    'aria-labelledby'?: string;
    children: ReactNode;
}

export declare function InlinePlaceholder({ children, action, size, align, tone, className, 'data-testid': testId, }: InlinePlaceholderProps): JSX.Element;

export declare interface InlinePlaceholderProps {
    /** The message. One short line — "nothing here", "no runs yet". */
    children: ReactNode;
    /**
     * Optional control beside the message, e.g. a `<Button size="sm">` that
     * creates the missing thing. Sits after the text, not below it.
     */
    action?: ReactNode;
    /**
     * `xs` (default) is the list/rail scale; `sm` is for a pane-sized region
     * where the line is the only thing on screen.
     */
    size?: 'xs' | 'sm';
    /**
     * `start` (default) reads as a list row, which is what a rail section or a
     * filtered result list wants. `center` is for a region the placeholder owns
     * outright — an empty pane.
     */
    align?: 'start' | 'center';
    tone?: InlinePlaceholderTone;
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the placeholder paints in. */
export declare type InlinePlaceholderTone = SurfaceTone;

export declare function InlinePopover({ trigger, open, onClose, placement, offset, className, zIndex, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, kind, children, }: InlinePopoverProps): ReactPortal | null;

export declare type InlinePopoverPlacement = 'bottom-start' | 'bottom-end' | 'right';

export declare interface InlinePopoverProps {
    /** Ref to the anchor element (the visible trigger). */
    trigger: RefObject<HTMLElement | null>;
    /** Whether the popover is currently open. Controlled by the caller. */
    open: boolean;
    /** Fires when the popover should dismiss (outside click / Esc / tab-out). */
    onClose: () => void;
    /** Placement relative to the trigger. Defaults to 'bottom-start'. */
    placement?: InlinePopoverPlacement;
    /** Pixel gap between trigger and panel. Default 6. */
    offset?: number;
    /** Optional className for the panel. */
    className?: string;
    /** Minimum z-index (default 9500); raised above the trigger's containing layers. */
    zIndex?: number;
    /** Optional testid for the panel. Default 'inline-popover'. */
    'data-testid'?: string;
    /**
     * Accessible name for the `role="dialog"` panel. A dialog with no name
     * announces as a bare "dialog", so callers that don't render their own
     * labelled surface inside should pass one.
     */
    'aria-label'?: string;
    /** Id of an element inside the panel that names it. */
    'aria-labelledby'?: string;
    /**
     * What this popover is, emitted as `data-ui-dialog` (default `popover`).
     * Name a purpose an audit should recognise, e.g. `command-help` for a
     * composer's supported-commands help. Since 2.442.0.
     */
    kind?: string;
    children: ReactNode;
}

export declare const Input: ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;

export declare interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix'> {
    type?: InputType;
    size?: InputSize;
    /** Node rendered inside the left edge of the input (icon, currency symbol, etc.) */
    prefix?: ReactNode;
    /** Node rendered inside the right edge of the input (unit, clear button, etc.) */
    suffix?: ReactNode;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /** When true, renders the input value in a monospace font (e.g. JSONPath, code). */
    mono?: boolean;
    'data-testid'?: string;
}

export declare type InputSize = 'sm' | 'md';

export declare type InputType = 'text' | 'number' | 'url' | 'password' | 'email' | 'search' | 'date' | 'datetime-local' | 'time';

declare const INTENSITY_SCALE: {
    readonly low: 0.35;
    readonly medium: 1;
    readonly high: 1.75;
};

/** A person who can be invited. Thin on purpose so callers can map a
 *  presence roster straight in without dragging in PresenceUser. */
export declare interface InviteCandidate {
    userId: string;
    /** Pre-resolved display name — callers MUST pass a human name, never
     *  a raw id/UUID (mirrors ResumeCallParticipant's contract). */
    name: string;
    avatarUrl?: string;
    /** True when this person is already on the call. Rendered as a
     *  non-selectable "In call" row so the list still reads as the full
     *  roster rather than mysteriously omitting people. */
    alreadyInCall?: boolean;
    /** True when they have been rung but have not answered yet. */
    pending?: boolean;
    /** Non-selectable for a reason that is NOT "already on this call" —
     *  e.g. an offline person a ring would never reach. Renders the same
     *  dimmed, non-clickable row without claiming "In call". Pair it with
     *  `statusLabel` so the row says WHY. */
    disabled?: boolean;
    /** Free-text right-hand annotation, e.g. "On a call" / "Offline".
     *  Purely informational — it does NOT affect selectability, so a
     *  caller can mark someone busy while still allowing a knock/join.
     *  `alreadyInCall` and `pending` keep their own fixed labels and win
     *  over this one. */
    statusLabel?: string;
    /** Presence: true → online dot, false → offline dot, undefined → no
     *  dot. Also drives which section a row lands in under `grouped`. */
    online?: boolean;
    /** Shown on offline rows when present, e.g. "Last seen 2h ago".
     *  Pre-formatted by the caller — this component never touches
     *  Date.now(). */
    lastSeenLabel?: string;
    /** Avatar brand color override (falls back to the name hash). */
    color?: string;
}

export declare function InviteCandidateList({ candidates, onInvite, loading, resetKey, children, tone, searchable, grouped, selectMode, onPick, confirmLabel, confirmLoadingLabel, confirmCountLabel, className, 'data-testid': testId, }: InviteCandidateListProps): JSX.Element;

/** The two extracted blocks handed to the `children` render prop. */
export declare interface InviteCandidateListParts {
    /** Empty states + the selectable candidate rows. */
    list: ReactNode;
    /** The "Invite N people" confirm button (testid `invite-to-call-confirm`).
     *  null when `selectMode='single'` — there is nothing to confirm. */
    confirm: ReactNode;
}

export declare interface InviteCandidateListProps {
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    loading?: boolean;
    /** Selection clears whenever this value changes — dialogs pass their
     *  `open` flag so a previous invite's choices never leak into the
     *  next one. */
    resetKey?: unknown;
    /** Custom layout: receives the list and confirm blocks and places
     *  them (InviteToCallDialog puts the confirm in its modal footer).
     *  Omit for the default stacked layout. */
    children?: (parts: InviteCandidateListParts) => ReactNode;
    /** Surface the list renders on. 'light' (default) uses the theme
     *  tokens the invite modal always used; 'dark' swaps to white/alpha
     *  classes for dark call chrome (CallSettingsDialog's People tab) —
     *  without it the names render dark-on-dark and disappear. */
    tone?: 'light' | 'dark';
    /** Renders a filter input (testid `people-search`) that narrows the
     *  rows by name or userId, case-insensitive. */
    searchable?: boolean;
    /** Renders "Online" then "Offline" section headers. Rows with
     *  `online: true` land under Online; everything else (including rows
     *  without presence data) lands under Offline. Offline rows show
     *  `lastSeenLabel` when present and are STILL selectable. */
    grouped?: boolean;
    /** 'multi' (default) keeps the checkbox + confirm flow. 'single'
     *  drops checkboxes and confirm — clicking a row fires `onPick`
     *  immediately. */
    selectMode?: 'multi' | 'single';
    /** Row click handler for `selectMode='single'`. */
    onPick?: (userId: string) => void;
    /** Verb on the confirm button. Defaults to "Invite" (so every existing
     *  host keeps "Invite 2 people"); a call picker passes "Call". The
     *  zero-selection state renders the bare verb. */
    confirmLabel?: string;
    /** Text while `loading`. Defaults to "Inviting…". */
    confirmLoadingLabel?: string;
    /**
     * The counted form of the confirm label, when `<verb> N people` is not
     * English for this verb.
     *
     * The default reads "Invite 2 people" and "Call 2 people", which is why it
     * was written that way — but it also produced "Start chat 2 people" the
     * moment a host used a verb that wants a preposition. The grammar belongs
     * to the caller's verb, and the caller is the only one that knows it.
     */
    confirmCountLabel?: (count: number) => string;
    /** Applied to the default stacked layout's root only. */
    className?: string;
    'data-testid'?: string;
}

export declare function InviteToCallDialog({ open, onClose, onInvite, candidates, lobbyLabel, loading, shareLink, }: InviteToCallDialogProps): JSX.Element;

export declare interface InviteToCallDialogProps {
    open: boolean;
    onClose: () => void;
    /** Confirm handler — receives every selected userId. May be async;
     *  the caller flips `loading` while the invites are in flight. */
    onInvite: (userIds: string[]) => void | Promise<void>;
    /** Everyone invitable, including people already on the call (they
     *  render disabled). */
    candidates: InviteCandidate[];
    /** Human label for the call being invited to, shown in the subtitle. */
    lobbyLabel?: string;
    loading?: boolean;
    /** Optional join URL. Rooms are link-shareable, so the picker is the
     *  natural home for that link — it is the one place the user goes
     *  when they want more people here. Previously this lived in a
     *  full-bleed overlay across the call tiles, which covered the video
     *  and read as a rendering bug. */
    shareLink?: string;
}

/** True for a kind the library renders itself. */
export declare function isBuiltinLeafKind(kind: string): kind is BuiltinLeafKind;

export declare function isRichHeaderContent(kind: HeaderContentKind | undefined): boolean;

/** Italic formatting, drawn as a glyph rather than changing the control font. */
export declare function ItalicIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare const JOB_TOAST_DISMISS_MS = 8000;

export declare function JobToast({ id, title, state, detail, progress, href, hrefLabel, onNavigate, exiting, onDismiss, onHoverChange, }: JobToastProps): JSX.Element;

/**
 * A background job tracked by one toast. `toastJob` with an `id` it has not
 * seen creates the toast; later calls with the same `id` update it in place.
 * Once a settled toast auto-dismisses the id is forgotten: a later call with the
 * same `id` creates a fresh toast and fires `onSettled` again, so stop sending
 * updates after the job is done.
 */
export declare interface JobToastOptions {
    /** Job id: the key. Same id, same toast. */
    id: string;
    title: string;
    state: JobToastState;
    detail?: string;
    /** 0-100, drawn as a bar while queued or running. */
    progress?: number;
    href?: string;
    /** Link text. Default "View". */
    hrefLabel?: string;
    /** Routes the link in a SPA: called with the href and the click event, which is default-prevented. Without it the link is a plain anchor. */
    onNavigate?: JobToastProps['onNavigate'];
    /** How long a done or failed toast stays after it settles. Default 8000. */
    dismissAfterMs?: number;
    /** Fires once when the job first reaches done or failed — mirror it into a notification center. */
    onSettled?: (job: JobToastSettled) => void;
}

export declare interface JobToastProps {
    /** The toast's own element id (not the job id). */
    id: string;
    title: string;
    state: JobToastState;
    detail?: string;
    /** 0-100. Shown as a bar while the job is queued or running. */
    progress?: number;
    href?: string;
    /** Link text. Default "View". */
    hrefLabel?: string;
    /**
     * Called when the link is activated (click or keyboard), with the href and the event.
     * The link then does not navigate itself (the event is default-prevented), so a SPA
     * host can route without a page reload. Without it the link is a plain anchor.
     */
    onNavigate?: (href: string, event: MouseEvent_2<HTMLAnchorElement>) => void;
    exiting?: boolean;
    onDismiss: (id: string) => void;
    onHoverChange?: (hovering: boolean) => void;
}

export declare type JobToastSettled = Pick<JobToastOptions, 'id' | 'title' | 'detail' | 'href' | 'hrefLabel'> & {
    state: 'done' | 'failed';
};

export declare type JobToastState = 'queued' | 'running' | 'done' | 'failed';

/** A keyboard: shortcuts. Since 2.411.0. */
export declare function KeyboardIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function KeyValue({ items, layout, labelWidth, divided, responsive, className, 'aria-label': ariaLabel, 'data-testid': testId, }: KeyValueProps): JSX.Element | null;

export declare interface KeyValueItem {
    label: string;
    value: ReactNode;
    /** Monospace value — ids, shas, model ids. */
    mono?: boolean;
    /**
     * Native tooltip on the value — the full text of a value the layout
     * truncates (a long id, a path).
     */
    title?: string;
    /**
     * The value in tertiary ink — a fact that is really an absence ("Not
     * defined yet", "No links added"). Since 2.390.0.
     */
    muted?: boolean;
    /**
     * A control at the row's end, after the value — "Draft with agent", "Add a
     * note". Row layout only. Since 2.390.0.
     */
    action?: ReactNode;
}

export declare type KeyValueLayout = 'stack' | 'row' | 'grid';

export declare interface KeyValueProps {
    items: KeyValueItem[];
    /**
     * `row` (default): label in a fixed column left of the value.
     * `stack`: label above value, one fact per line.
     * `grid`: stacked pairs in two columns.
     */
    layout?: KeyValueLayout;
    /** Row layout only: the label column's Tailwind width class. Default `w-28`. */
    labelWidth?: string;
    /**
     * Row layout only: each fact on its own ruled row (a rule above the first
     * and under every row), at 15px, with any `action` right-aligned — a small
     * checklist table ("Complete the brief"). Default `false`. Since 2.390.0.
     */
    divided?: boolean;
    /** Let ruled rows put labels above their values when the column is narrow. */
    responsive?: boolean;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** `KeyValue`: labelled facts. */
export declare interface KeyValuesLeaf extends Omit<KeyValueProps, 'className'> {
    kind: 'key-values';
}

export declare function KPIGrid({ children, columns, mdColumns, dense, className, style, 'data-testid': testId, }: KPIGridProps): JSX.Element;

export declare type KPIGridColumns = 1 | 2 | 3 | 4;

export declare interface KPIGridProps {
    /** Children — expected to be <StatCard> instances. */
    children: ReactNode;
    /** Number of columns at >=640px. Default 4. Always collapses to 1 below. */
    columns?: KPIGridColumns;
    /**
     * Column count for the 768–1023px (`md`) band. Undefined (the default)
     * emits no `md:` class, so `columns` applies starting at the `sm`
     * breakpoint (640px) exactly as it always has.
     *
     * Setting this steps the grid up in three stages instead: 1 column below
     * `sm`, `mdColumns` starting at `md` (768px), then `columns` starting at
     * `lg` (1024px) — no `sm:` class is emitted in this mode, since `sm` and
     * `md` would otherwise both apply at 768px+ and Tailwind's declaration
     * order (not specificity) makes the later one, `md`, win regardless of
     * which is visually "bigger". Set `mdColumns` lower than `columns` for a
     * grid that lives inside a nested rail (a laptop-width `md` view there is
     * far narrower than a full-width page at the same viewport size) so tiles
     * stay readable instead of cramming `columns` of them into the rail's
     * actual width.
     */
    mdColumns?: KPIGridColumns;
    /** Tighter gap (8px vs 16px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/** An open laptop: somebody's own machine rather than a provisioned box. Since 2.411.0. */
export declare function LaptopIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Alias kept for diagrams better described as a stack of horizontal layers. */
export declare const LayerStack: typeof StackDiagram;

export declare type LeafKind = LeafSpec['kind'];

/** A list of leaves. `false`/`null`/`undefined` entries are skipped, so `cond && { kind: … }` works. */
export declare type LeafList = ReadonlyArray<LeafSpec | false | null | undefined>;

/** One leaf: exactly one library (or registered) component, picked by `kind`. */
export declare type LeafSpec = BuiltinLeafSpec | RegisteredLeafSpec;

export declare function LineChart({ series, height, yFormat, xFormat, }: {
    series: LineSeries[];
    height?: number;
    yFormat?: (v: number) => string;
    xFormat?: (v: number | string) => string;
}): JSX.Element;

export declare interface LineSeries {
    label: string;
    data: Array<{
        x: number | string;
        y: number;
    }>;
    color?: string;
}

export declare function Link({ href, children, external, unstyled, target, rel, className, ...rest }: LinkProps): JSX.Element;

export declare interface LinkableDocument {
    id: string;
    title: string;
    kind?: FileKind;
}

export declare interface LinkedItem {
    id: string;
    title: string;
    kind?: FileKind;
    /** e.g. 'Depends on' | 'Decided by'. */
    relation?: string;
    status?: {
        label: string;
        tone: StatusPillTone;
    } | null;
    onOpen?: () => void;
    href?: string;
    onRemove?: () => void;
}

export declare function LinkedItemsSection({ title, items, onSearchDocuments, onAdd, relations, emptyLabel, first, as, variant, className, 'data-testid': testId, }: LinkedItemsSectionProps): JSX.Element;

export declare interface LinkedItemsSectionProps {
    title?: string;
    /** Semantic heading level; use h2 for a section directly under the page title. */
    as?: 'h2' | 'h3' | 'h4';
    items: LinkedItem[];
    onSearchDocuments?: (q: string) => Promise<LinkableDocument[]> | LinkableDocument[];
    onAdd?: (doc: LinkableDocument, relation: string) => void;
    relations?: LinkRelationOption[];
    emptyLabel?: string;
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px heading, 14px rows, the status
     * as a soft tag, the relation read out (and on hover) rather than printed,
     * and "Add link" quiet until the section is hovered — a work item's Brief.
     * `label`: the small caption, printed relation and dotted pill.
     */
    variant?: 'label' | 'heading';
    className?: string;
    'data-testid'?: string;
}

/** Two chain links: a hyperlink — "point this at a URL", or "copy the URL". */
export declare function LinkIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    /** Required — a link with nowhere to go is a button. */
    href: string;
    children: ReactNode;
    /**
     * Open in a new tab. Sets `target="_blank"` and forces safe `rel`.
     * Prefer this over passing `target` yourself.
     */
    external?: boolean;
    /**
     * Drop the default `text-primary … hover:underline` styling, for a link that
     * wraps something already styled (a card, an avatar, a whole row).
     */
    unstyled?: boolean;
}

export declare interface LinkRelationOption {
    value: string;
    label: string;
}

declare type LinkRenderer = (item: {
    to: string;
    id: string;
}, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;

/** Three dots and three lines: a bulleted list. Since 2.386.0. */
export declare function ListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type ListLeaf = GroupedListLeaf | ActionRowsLeaf;

/** A list rail, as data: what `ListRailLayout` (and an `ExplorerLayout`) draws in its rail. */
export declare interface ListRail {
    /**
     * Caption title in the rail's head row ("All initiatives", "Pending"). Optional
     * since 2.442.4: a rail whose group headings already name and count its rows
     * omits it, so one rail carries one heading size.
     */
    title?: string;
    /**
     * The count after the title — the rows the host holds. Omit when unknown
     * or capped (a full page has no honest total; say "100+" in the footer).
     */
    count?: number;
    /** Head-row controls (a ⋯ sort/filter menu). */
    actions?: ReactNode;
    /** Under the head row: search, a filter popover, view links. */
    header?: ReactNode;
    /** The scrolling rows (a `GroupedList`, or the loading/empty/error state). */
    body: ReactNode;
    /** The fixed footer: "7 pending", "14 initiatives". */
    footer?: ReactNode;
    /** What the rail holds, for its accessible names ("initiatives"). */
    label: string;
    /** A parent link over the title ("‹ Initiatives"). */
    back?: WorkspaceRailBack | null;
}

export declare function ListRailLayout({ list, header, children, aside, footer, fold, railWidth, countStyle, narrow, className, 'data-testid': testId, }: ListRailLayoutProps): JSX.Element;

export declare interface ListRailLayoutProps {
    list: ListRail;
    /** The band over the pane: the trail and the title (the content column's first rows). */
    header?: ReactNode;
    /** The record. It scrolls; the header and footer do not. */
    children: ReactNode;
    /** Right of the record (a `ContextColumn`), always beside it. */
    aside?: ReactNode;
    /** Docked under the record — a composer. */
    footer?: ReactNode;
    /**
     * The reader's fold of the list (`useRailFold`). Given, the rail gets a «
     * control and folds to a strip with one » control.
     */
    fold?: {
        folded: boolean;
        onToggle: () => void;
    };
    /** Rail width; default `ms` (264px, one-line rows). `md` for a two-line work list. */
    railWidth?: ExplorerLayoutProps['railWidth'];
    /** How the count reads; default `chip`. */
    countStyle?: ExplorerLayoutProps['railCountStyle'];
    /**
     * The narrow form (since 2.515.1): under 40rem of the layout's own width the
     * list rail and the record stop sitting side by side. `showing: 'list'`: the
     * header (trail, title), then the rail as the page's list at the full width.
     * `showing: 'record'`: the record at the full width under a back control
     * that calls `onBack`. Omitted: side by side at every width (unchanged).
     */
    narrow?: ExplorerNarrow;
    className?: string;
    'data-testid'?: string;
}

/** Nested lines: "list style" / multilevel list. Since 2.386.5. */
export declare function ListStyleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function LiveRegion({ message, politeness, atomic, throttleMs, role, 'data-testid': testId, }: LiveRegionProps): JSX.Element;

export declare type LiveRegionPoliteness = 'polite' | 'assertive' | 'off';

export declare interface LiveRegionProps {
    /**
     * What to announce. Announced whenever the string changes; set it to `''`
     * to say nothing (an empty region is never spoken).
     */
    message: string;
    /** @default 'polite' */
    politeness?: LiveRegionPoliteness;
    /**
     * Announce the whole message rather than only the changed part.
     * @default true — a partial diff of a status line is rarely intelligible.
     */
    atomic?: boolean;
    /**
     * Minimum gap between announcements, in ms. Messages arriving inside the
     * window are coalesced and the latest one is announced when it closes.
     * `0` disables throttling.
     * @default 0
     */
    throttleMs?: number;
    /**
     * Landmark role. `status` (polite) and `alert` (assertive) carry their own
     * implicit live semantics and are what most callers want; `log` suits an
     * append-only feed. `none` renders the bare `aria-live` container — pick it
     * when the page already has a `status`/`alert` element and a second one
     * would make `getByRole` ambiguous.
     * @default 'status'
     */
    role?: 'status' | 'alert' | 'log' | 'none';
    'data-testid'?: string;
}

export declare function LoadingState({ label, description, spinnerSize, spinnerColor, testId, }: LoadingStateProps): JSX.Element;

export declare interface LoadingStateProps {
    /** Primary label. Defaults to "Loading…". */
    label?: string;
    /** Optional secondary copy below the label. */
    description?: ReactNode;
    spinnerSize?: SpinnerSize;
    spinnerColor?: string;
    testId?: string;
}

/** Loads `@google/model-viewer` (which defines `<model-viewer>`) once per page. */
export declare function loadModelViewerElement(): Promise<unknown>;

/** A padlock: "private", "restricted to specific people". */
export declare function LockIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface LogEntry {
    id: string;
    direction: 'sent' | 'received';
    message: GatewayMessage | Record<string, unknown>;
    timestamp: string;
}

export declare type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export declare interface LogLine {
    id: string;
    /** Pre-formatted timestamp string (e.g. "10:48:21.024"). Optional. */
    timestamp?: string;
    /** Severity. Drives glyph + color. */
    level?: LogLevel;
    /** Optional source/component prefix (e.g. "auth-svc", "pipeline-7"). */
    source?: string;
    /** The log message body. */
    message: ReactNode;
}

export declare function LogStream({ lines, follow, showTimestamp, showLevel, showSource, title, headerSlot, emptyMessage, maxHeight, tone, onClear, className, style, 'data-testid': testId, }: LogStreamProps): JSX.Element;

export declare interface LogStreamProps {
    lines: LogLine[];
    /** When true, autoscroll to the latest line as new lines arrive. Default true. */
    follow?: boolean;
    /** When true, render the small timestamp column. Default true. */
    showTimestamp?: boolean;
    /** When true, render the level glyph. Default true. */
    showLevel?: boolean;
    /** When true, render the source prefix column. Default true. */
    showSource?: boolean;
    /** Header title. Default: "Log stream". Set to null to hide the header. */
    title?: string | null;
    /** Optional right-side meta slot in the header (overrides default line count). */
    headerSlot?: ReactNode;
    /** Empty-state message when lines is empty. */
    emptyMessage?: ReactNode;
    /** Optional max-height for the scroll region. */
    maxHeight?: string;
    /**
     * Colour family for the scroll region. `'code'` (default) is today's
     * permanently-dark console — `--color-surface-subtle` with a `#0b1020`
     * fallback for hosts that don't define it, `--color-text-primary` with a
     * `#e5e7eb` fallback for the text. `'surface'` follows the host theme
     * instead (`bg-surface-inset text-text-primary`), for a log panel embedded
     * in an otherwise light-themed page rather than a terminal pane.
     * `'transparent'` keeps the light-on-dark text but paints no background at
     * all, for a log sitting over a surface that owns its own — the working-state
     * backdrop in `RisingParticles`, whose star field an opaque scroll region
     * would hide completely.
     */
    tone?: 'code' | 'surface' | 'transparent';
    /** When provided, renders a "Clear" button in the header. */
    onClear?: () => void;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function MarkdownView({ markdown, scale, className, 'data-testid': testId }: MarkdownViewProps): JSX.Element;

export declare interface MarkdownViewProps {
    markdown: string;
    /**
     * Type scale (since 2.388.0). `md` (default) is the long-standing rendering:
     * 14px body, h1 20px. `sm` steps headings down to 17/15/14/13px over a 13px
     * body, for prose inside a card (an assistant answer) whose `#` must not
     * compete with the page title. `lg` is a document read on its own page:
     * 15px body, h1 24px, h2 20px.
     */
    scale?: MarkdownViewScale;
    className?: string;
    'data-testid'?: string;
}

export declare type MarkdownViewScale = 'sm' | 'md' | 'lg';

export declare function MasterDetail<T>({ items, keyOf, selectedKey, onSelect, renderRow, renderCompactRow, renderDetail, railTitle, railWidth, compactWidth, storageKey, emptyDetail, paneFooter, className, 'data-testid': testId, }: MasterDetailProps<T>): JSX.Element;

/**
 * Use this when a page is a list you pick from and the picked record beside it: list rail on the left, header and record on the right, an empty-selection state.
 *
 * Fills its parent (`h-full min-h-0`); the rail rows and the record scroll independently.
 *
 * @example
 * <MasterDetailPage title={selected?.name ?? 'Requests'} breadcrumbs={trail}
 *   list={{ label: 'requests', title: 'Pending', count: rows.length, header: <SearchInput … />, body: <GroupedList … /> }}
 *   emptyDetail={<EmptyState title="Pick a request" />}>
 *   {selected && <RequestRecord request={selected} />}
 * </MasterDetailPage>
 *
 * @example
 * // A catalog: an overview when nothing is selected, its command composer docked at the column's bottom.
 * <MasterDetailPage title={selected?.name ?? 'Designs'} breadcrumbs={trail} list={rail} body="docked"
 *   emptyDetail={<><CatalogOverview /><ColumnDock><CollectionCommandHost inPlace … /></ColumnDock></>}>
 *   {selected && <DesignRecord design={selected} />}
 * </MasterDetailPage>
 */
export declare function MasterDetailPage({ title, description, breadcrumbs, actions, badge, back, density, titleAs, list, children, emptyDetail, aside, footer, body, dockedBody, fold, railWidth, narrow, gutter, className, 'data-testid': testId, 'data-page-spec': spec, }: MasterDetailPageProps): JSX.Element;

export declare interface MasterDetailPageProps extends PageTemplateHeaderProps {
    /** The rail, as data (`ListRail`): title, count, search header, rows body, footer, label. */
    list: ListRail;
    /** The selected record. `null`/`undefined`/`false`: nothing selected, `emptyDetail` shows. */
    children?: ReactNode;
    /** Shown when nothing is selected. Default: an EmptyState "Select an item from the list". */
    emptyDetail?: ReactNode;
    /** Right of the record (a `ContextColumn`). */
    aside?: ReactNode;
    /** Docked under the record (a composer). With `body="docked"` it goes into the column's dock. */
    footer?: ReactNode;
    /**
     * `scroll` (default): the record scrolls; `footer` is a fixed band under it.
     * `docked` (since 2.505.0): the record column is a `DockedColumn` — the record, or `emptyDetail` (an overview), scrolls
     * over a dock at the column's bottom, and `footer` and any `ColumnDock` inside the body render there, spanning the column.
     */
    body?: 'scroll' | 'docked';
    /** With `body="docked"`: `scroll` (default) the body scrolls over the dock; `fill` it is a fixed frame whose panes scroll (a conversation). Since 2.505.0. */
    dockedBody?: 'scroll' | 'fill';
    /** The reader's fold of the rail (`useRailFold`). */
    fold?: ListRailLayoutProps['fold'];
    /** Rail width; default `ms` (264px). */
    railWidth?: ListRailLayoutProps['railWidth'];
    /**
     * The narrow form (since 2.515.1): under 40rem of the page's own width the
     * rail and the record stop sitting side by side. Nothing selected, the
     * header and the rail fill the width (the rail is the list); a record
     * selected, the record fills it under a back control that calls `onBack`
     * (`backLabel`, default "Back to the list"). Omitted: side by side at every width.
     */
    narrow?: {
        onBack: () => void;
        backLabel?: string;
    };
    /** Default `page` — the record and header at `--ui-page-gutter`. */
    gutter?: PageGutter;
    className?: string;
    'data-testid'?: string;
    /** Set by `PageFromSpec`: the spec template this page was built from. */
    'data-page-spec'?: string;
}

/** `MasterDetailPage`. */
export declare interface MasterDetailPageSpec extends SpecHeader {
    template: 'master-detail';
    list: Omit<ListRail, 'actions' | 'header' | 'body' | 'footer'> & {
        actions?: LeafList;
        /** Under the rail head: a `search` leaf, a filter menu. */
        header?: LeafList;
        /** The rows: a `list` leaf, or an `empty` leaf. */
        body: LeafList;
        footer?: LeafList;
    };
    /** The selected record. `null`/omitted: `emptyDetail` shows. */
    detail?: SectionList | null;
    emptyDetail?: LeafList;
    aside?: LeafList;
    footer?: LeafList;
    body?: 'scroll' | 'docked';
    dockedBody?: 'scroll' | 'fill';
    fold?: ListRailLayoutProps['fold'];
    railWidth?: ListRailLayoutProps['railWidth'];
}

export declare interface MasterDetailProps<T> {
    items: T[];
    keyOf: (item: T) => string;
    selectedKey: string | null;
    onSelect: (key: string) => void;
    /** Expanded rail row. */
    renderRow: (item: T, index: number, selected: boolean) => ReactNode;
    /** Compact (72px) rail row. Falls back to an index badge when omitted. */
    renderCompactRow?: (item: T, index: number, selected: boolean) => ReactNode;
    renderDetail: (item: T, index: number) => ReactNode;
    railTitle?: ReactNode;
    /** Expanded rail width in px. Default 340. */
    railWidth?: number;
    /** Compact rail width in px. Default 72. */
    compactWidth?: number;
    /** Persists compact/expanded mode under this localStorage key. */
    storageKey?: string;
    /** Rendered in the detail pane when nothing resolves from `selectedKey`. */
    emptyDetail?: ReactNode;
    /** Docked under the detail pane (a composer, a call strip). It reserves its
     *  own height and stays put while the pane above it scrolls, whatever the
     *  selection — mirrors ExplorerLayout's `paneFooter`. The rail is unaffected. */
    paneFooter?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare function matchHotkey(e: KeyboardEvent, spec: string): boolean;

/**
 * Token match: every whitespace-separated token of the query must appear
 * somewhere in the haystack, in any order ("requests my open" finds "My open
 * requests"). Falls back to an in-order character match of the whole query so
 * short fuzzy habits ("cp" for "command palette") keep working.
 */
export declare function matchTokens(haystack: string, query: string): number;

declare interface MaterialLike3 {
    wireframe?: boolean;
    emissive?: ColorLike;
    emissiveMap?: unknown;
    emissiveIntensity?: number;
    needsUpdate?: boolean;
    clone(): MaterialLike3;
}

/** Four corners pushed outward: "expand to fill". Since 2.411.0. */
export declare function MaximizeIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface MeasuredWidth<T extends HTMLElement> {
    /** Attach to the element to measure. Also fills `forward`. */
    ref: (el: T | null) => void;
    /** Content-box width in px; `null` before the first measurement. */
    width: number | null;
}

/** One episode/collection, with its real preview versions inside a bounded
 * carousel. Hosts supply duration/provenance, never inferred by the card. */
export declare function MediaCollectionCard({ title, headingAs: Heading, status, previews, onOpen, onPlay, hideWhenEmpty, emptyLabel }: MediaCollectionCardProps): JSX.Element | null;

export declare interface MediaCollectionCardProps {
    title: string;
    /** Match the host document outline; visual title styling stays compact. */
    headingAs?: 'h2' | 'h3' | 'h4';
    status?: ReactNode;
    previews: readonly MediaCollectionPreview[];
    onOpen: () => void;
    onPlay: (preview: MediaCollectionPreview) => void;
    /**
     * With no previews, draw nothing (2.515.0). The card's 16:9 frame with
     * nothing to play was a 285px placeholder for a movie that does not exist.
     */
    hideWhenEmpty?: boolean;
    /**
     * With no previews, one quiet `EmptyState` line with this text instead of
     * the card ("No review movie yet"). `hideWhenEmpty` wins when both are set.
     */
    emptyLabel?: string;
}

export declare interface MediaCollectionPreview {
    id: string;
    image?: string;
    label: string;
    duration?: string;
}

/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export declare function MenuIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `DropdownMenu`. The trigger is a label, drawn by the menu's own trigger button. */
export declare interface MenuLeaf extends Omit<DropdownMenuProps, 'trigger' | 'className' | 'triggerClassName'> {
    kind: 'menu';
    trigger: string;
}

declare interface MessageAction {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick: (trigger: HTMLElement) => void;
    disabled?: boolean;
}

/**
 * A chat message bubble for user/assistant messages.
 *
 * Stateless — accepts content + tool calls as props. Renders a role label,
 * an optional tool-call strip, and the message body (markdown for assistants
 * when `renderMarkdown` is supplied, plain `whitespace-pre-wrap` otherwise).
 */
export declare function MessageBubble({ role, content, toolCalls, streaming, agentName, userName, renderMarkdown, className, }: MessageBubbleProps): JSX.Element;

export declare interface MessageBubbleProps {
    role: 'user' | 'assistant';
    content: string;
    toolCalls?: ToolCallItem[];
    /** shows ThinkingDots when content is empty */
    streaming?: boolean;
    /** label shown for assistant (default 'Assistant') */
    agentName?: string;
    /** label shown for user (default 'You') */
    userName?: string;
    /** inject markdown renderer */
    renderMarkdown?: (content: string) => ReactNode;
    className?: string;
}

/** `MetaLine`: the dot-separated secondary line under a title. */
export declare interface MetaLeaf extends Omit<MetaLineProps, 'className' | 'items' | 'separator'> {
    kind: 'meta';
    items: ReadonlyArray<string>;
}

export declare function MetaLine({ items, separator, size, tone, className, 'data-testid': testId, }: MetaLineProps): JSX.Element | null;

export declare interface MetaLineProps {
    /** The pieces, in order. Falsy entries are dropped with their separator. */
    items: ReactNode[];
    /** Separator woven between surviving items. Default `·`. */
    separator?: ReactNode;
    /** `xs` (11px, the default) is the card/list scale; `sm` (12px) is body meta. */
    size?: MetaLineSize;
    tone?: MetaLineTone;
    className?: string;
    'data-testid'?: string;
}

export declare type MetaLineSize = 'xs' | 'sm';

export declare type MetaLineTone = 'tertiary' | 'secondary';

export declare function MeterRow({ onClick, title, label, note, meter, meterWidth, className, 'aria-label': ariaLabel, 'data-testid': testId, }: MeterRowProps): JSX.Element;

export declare interface MeterRowProps {
    onClick: () => void;
    /** Tooltip — what the click does ("Add Nora to selection"). */
    title?: string;
    label: ReactNode;
    /** Muted trailing note after the label: "mentors". */
    note?: ReactNode;
    /** The meter — usually `<ScoreBarGauge size="sm" showLabel={false} />`. */
    meter: ReactNode;
    /** Meter slot width. Default `sm` (44px); `md` is 72px. */
    meterWidth?: 'sm' | 'md';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** Four corners pulled inward: "leave full screen". Since 2.500.3. */
export declare function MinimizeIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Modal({ open, onClose, title, ariaLabel, maxWidth, children, footer, backdropTestId, backdropStyle, cardStyle, cardClassName, zIndex, rawChildren, dialogKind, }: ModalProps): ReactPortal | null;

export declare interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    /**
     * Accessible name for the dialog when it renders its own heading (or none
     * at all) instead of using `title`. Without one of the two, screen readers
     * announce a bare "dialog" with no indication of what opened.
     */
    ariaLabel?: string;
    maxWidth?: number;
    children: React.ReactNode;
    footer?: React.ReactNode;
    /**
     * Optional overrides for the backdrop testid (defaults to "modal-backdrop").
     * Callers that need a specific testid on the backdrop — e.g. existing tests
     * that assert `getByTestId('delete-modal')` and click it to trigger
     * backdrop-close — can pass it through here.
     */
    backdropTestId?: string;
    /**
     * Optional override for the backdrop background. Defaults to the standard
     * rgba(0,0,0,0.45) overlay used across the app.
     */
    backdropStyle?: React.CSSProperties;
    /**
     * Optional override for the inner card container style. Spread over the
     * default 12px-radius, 28px/24px-padded, shadowed white card.
     */
    cardStyle?: React.CSSProperties;
    /**
     * Tailwind classes merged onto the card AFTER the defaults (cn/tw-merge,
     * so e.g. `bg-surface-inverse p-0` beats the default `bg-surface px-6 py-7`).
     * Lets dark-chrome dialogs (CallSettingsDialog) restyle the card without
     * reaching for inline styles.
     */
    cardClassName?: string;
    /**
     * Optional z-index for the backdrop. Defaults to 10000.
     */
    zIndex?: number;
    /**
     * When true, render children directly inside the card without the default
     * text-sm text-text-secondary wrapper div. Useful for modals that manage
     * their own full-layout and need the card to be a flex container.
     */
    rawChildren?: boolean;
    /**
     * What this dialog is, emitted as `data-ui-dialog` on the `role="dialog"`
     * card so a rendered-UI audit can tell a confirmation from a record popped
     * out of its page. Default `modal`; `ConfirmDialog` passes `confirm`.
     * Since 2.442.0.
     */
    dialogKind?: string;
}

export declare const MODEL_CHANNEL_LABEL: Record<ModelChannel, string>;

export declare const MODEL_CHANNEL_ORDER: readonly ModelChannel[];

export declare type ModelChannel = 'baseColor' | 'normal' | 'roughness' | 'metallic' | 'emissive';

export declare interface ModelChannelMap {
    src: string;
    label?: string;
}

/** One option of the channel toggle. */
export declare interface ModelChannelOption {
    value: ModelChannel;
    label: string;
    /** `external`: a URL from the `channels` prop. `embedded`: a map inside the model. */
    source: 'external' | 'embedded';
    /** The external map's URL. */
    src?: string;
}

export declare type ModelChannels = Partial<Record<ModelChannel, string | ModelChannelMap>>;

/**
 * The channels a model can show: every key of `channels` (external URLs) plus
 * every map embedded in the loaded model's materials (`el.model.materials`),
 * in a fixed order. The packed metallic-roughness texture counts for both
 * Roughness and Metallic. An external map wins over an embedded one.
 */
export declare function modelChannelsOf(el: ModelViewerElementLike | null | undefined, channels?: ModelChannels): ModelChannelOption[];

/** What the mesh shows: the lit model, or one texture map flat on it. */
export declare type ModelChannelView = 'lit' | ModelChannel;

export declare interface ModelMaterialLike {
    readonly name?: string;
    readonly pbrMetallicRoughness: {
        readonly baseColorFactor: ArrayLike<number>;
        readonly metallicFactor: number;
        readonly roughnessFactor: number;
        readonly baseColorTexture: ModelTextureInfoLike | null;
        readonly metallicRoughnessTexture: ModelTextureInfoLike | null;
        setBaseColorFactor(rgba: [number, number, number, number]): void;
        setMetallicFactor(value: number): void;
        setRoughnessFactor(value: number): void;
    };
    readonly normalTexture: ModelTextureInfoLike | null;
    readonly emissiveTexture: ModelTextureInfoLike | null;
    readonly emissiveFactor: ArrayLike<number>;
    setEmissiveFactor(rgb: [number, number, number]): void;
}

export declare interface ModelPart {
    id: string;
    label: string;
    /** Swatch and highlight colour — any CSS colour three.js can parse (hex, rgb(), a name). */
    color: string;
    /** Mesh/node name in the GLB. Default `id`. */
    node?: string;
}

export declare interface ModelSceneLike extends ObjectLike3 {
    /** The loaded glTF root (model-viewer 4.x `ModelScene.model`). */
    model?: ObjectLike3 | null;
    queueRender?(): void;
}

/**
 * The three.js scene inside a `<model-viewer>`: model-viewer 4.x keeps it on
 * an own symbol property whose description is `'scene'` (`$scene` in
 * model-viewer-base). Not public API — `null` when absent, and every caller
 * treats that as "leave the view unchanged".
 */
export declare function modelSceneOf(el: unknown): ModelSceneLike | null;

export declare interface ModelTextureInfoLike {
    readonly texture: unknown;
    setTexture(texture: unknown): void;
}

export declare interface ModelVersion {
    id: string;
    label: string;
    description?: string;
    current?: boolean;
}

export declare function ModelViewer({ src, poster, alt, label, reference, aspect, autoRotate, cameraControls, environment, channels, channel: channelProp, defaultChannel, onChannelChange, parts, selectedPart: selectedProp, onSelectPart, wireframe: wireframeProp, onWireframeChange, versions, onOpenVersion, onSnapshot, onLoad, onError, tone, frameless, className, 'data-testid': testId, }: ModelViewerProps): JSX.Element;

export declare type ModelViewerAspect = 'square' | 'landscape' | 'portrait' | 'wide';

export declare interface ModelViewerElementLike {
    model?: {
        readonly materials: readonly ModelMaterialLike[];
    } | null;
    createTexture?(uri: string): Promise<unknown>;
    toBlob?(options?: {
        mimeType?: string;
    }): Promise<Blob>;
}

export declare interface ModelViewerProps {
    /** GLB/glTF URL. */
    src: string;
    /** Shown while loading and as the fallback when the view cannot render. */
    poster?: string;
    /** Accessible name of the 3D view. Default "3D model". */
    alt?: string;
    /** Region label. Default "3D model". */
    label?: string;
    /**
     * An image drawn beside the model in the same frame (the concept art): two
     * up from a 28rem container, stacked below that. `label` default "Reference".
     */
    reference?: {
        src: string;
        label?: string;
        alt?: string;
    };
    /** The frame's aspect — same classes as ImageCompare. Default `square`. */
    aspect?: ModelViewerAspect;
    /** Turntable. Default true; always off under prefers-reduced-motion. */
    autoRotate?: boolean;
    /** Orbit with the pointer. Default true. */
    cameraControls?: boolean;
    /** model-viewer `environment-image`. Default `neutral`. */
    environment?: string;
    /** External texture maps (URLs) to view on the mesh. */
    channels?: ModelChannels;
    /** Controlled channel. */
    channel?: ModelChannelView;
    /** Initial channel when uncontrolled. Default `lit`. */
    defaultChannel?: ModelChannelView;
    onChannelChange?: (channel: ModelChannelView) => void;
    /** Named parts of the model, listed under the view; hover/focus highlights, click selects. */
    parts?: readonly ModelPart[];
    /** Controlled selected part (`null` = none). */
    selectedPart?: string | null;
    onSelectPart?: (id: string | null) => void;
    /** Wireframe. Controlled when `onWireframeChange` is passed, else the initial value. */
    wireframe?: boolean;
    onWireframeChange?: (on: boolean) => void;
    /** Two or more show a compact list under the view, the current one marked. */
    versions?: readonly ModelVersion[];
    onOpenVersion?: (id: string) => void;
    /** Shows a "Snapshot" button; receives a PNG of the current view. */
    onSnapshot?: (png: Blob) => void;
    onLoad?: () => void;
    onError?: (message: string) => void;
    /** The frame's surface: `default` (surface), `inset` (inset surface), `dark` (the media stage). */
    tone?: 'default' | 'inset' | 'dark';
    /** No border or rounded frame — for use inside a card. */
    frameless?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A monitor: "present this document" / someone is presenting. */
export declare function MonitorIcon({ size, ...rest }: IconProps): JSX.Element;

/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export declare function MoonIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function MoreContextDisclosure({ items, label, defaultOpen, open, onToggle, children, className, 'data-testid': testId, }: MoreContextDisclosureProps): JSX.Element;

export declare interface MoreContextDisclosureProps {
    items: readonly MoreContextItem[];
    /** Summary text. Default "More context". */
    label?: string;
    defaultOpen?: boolean;
    open?: boolean;
    onToggle?: (open: boolean) => void;
    /** Extra content under the rows. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface MoreContextItem {
    id: string;
    label: string;
    icon?: ReactNode;
    /** Shown after the label — "Sources · 2". */
    count?: number;
    onSelect?: () => void;
}

/** Three dots in a row: "more". Since 2.386.5. */
export declare function MoreIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface MultiComboboxProps extends BaseProps {
    multiple: true;
    value: readonly string[];
    onChange: (value: string[]) => void;
}

export declare function nameToColor(name: string): string;

export declare function nameToInitials(name: string): string;

export declare function NavRail({ title, items, activeHref, match, titleAction, header, footer, width, storageKey, renderLink, tone, size, defaultCollapsedGroups, collapsed: collapsedProp, onToggleCollapsed, 'aria-label': ariaLabel, className, 'data-testid': testId, }: NavRailProps): JSX.Element;

export declare interface NavRailItem {
    /** Target path. Also the React key unless `id` is given. */
    to?: string;
    /** Renders as a button instead of a link. For in-page verbs (Halt, Reset). */
    onClick?: () => void;
    /** Required when an item has neither `to` nor a unique label. */
    id?: string;
    label: ReactNode;
    /** Small right-aligned count — queue depth, unread, failures. */
    badge?: ReactNode;
    /** One dim line under the label. Say what the page is FOR, not what it is. */
    hint?: string;
    /** Leading glyph. */
    icon?: ReactNode;
    /** Section heading. Items sharing a group render under one collapsible head. */
    group?: string;
    disabled?: boolean;
}

/** How `activeHref` is matched against an item's `to`. */
export declare type NavRailMatch = 'exact' | 'prefix';

export declare interface NavRailProps {
    /** Rail heading. Omit for a rail that needs no name (a single leaf list). */
    title?: ReactNode;
    items: NavRailItem[];
    /** Current path. An item lights when it matches per `match`. */
    activeHref?: string;
    /**
     * `prefix` (default) keeps a rail lit while you are anywhere beneath it —
     * what an outer rail wants. `exact` is for the innermost rail, where two
     * items share a prefix and both would otherwise light.
     */
    match?: NavRailMatch;
    /** Element beside the title — a help "?" or a count. */
    titleAction?: ReactNode;
    /** Content above the items — a [+ New] button, a filter. */
    header?: ReactNode;
    /** Content pinned below the items — a status line, a collapse toggle. */
    footer?: ReactNode;
    /**
     * Discrete widths, not a pixel number: a `style={{ width }}` here is an
     * inline style on every rail in the app, and three sizes have covered every
     * rail we have shipped. Use `className` for the genuine exception.
     */
    width?: 'narrow' | 'default' | 'wide';
    /**
     * Persist per-group collapsed state under this key. Omit and groups still
     * collapse — they just forget on reload. Rails at different depths MUST use
     * different keys or they share collapse state.
     */
    storageKey?: string;
    /**
     * Groups (by their `group` name) that start folded (since 2.515.7). A
     * group holding the active item starts open anyway. A remembered state
     * (`storageKey`) wins over this, in both directions.
     */
    defaultCollapsedGroups?: string[];
    /** Render links with a router's Link/NavLink. Defaults to a plain `<a>`. */
    renderLink?: (item: NavRailItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    tone?: NavRailTone;
    /**
     * Layout only, since 2.397.0 — both sizes draw the one shared rail type
     * scale (`railType`: 13px/500 labels on 36px rows, 11px caps group labels,
     * plain counts), the same as SubNavLayout and the explorer rails. `sm`
     * (default) is flush with the rail's edges under a ruled title row; `md` is
     * the Documents surface's Workspace rail (the All documents mockup): items
     * inset under the group's caret, a heading row with no rule under it, and a
     * hairline between groups. Since 2.389.2. (Before 2.397.0 `sm` was a 13px
     * rail and `md` 15px/400 on 36px rows.)
     */
    size?: 'sm' | 'md';
    /**
     * The folded strip (2.515.0): a 44px column of icons, each item's label in
     * a `Tooltip` and its accessible name, group labels hidden (a hairline
     * between groups), the badge as a dot-sized count on the icon's corner.
     * Inside `AppShell sidebarFold` the rail reads the shell's fold when this
     * is omitted. Items without an `icon` show their label's first letter.
     */
    collapsed?: boolean;
    /**
     * Draw the fold toggle («/») in the title row, calling this. Inside
     * `AppShell sidebarFold` the shell's own toggle is used when omitted.
     */
    onToggleCollapsed?: () => void;
    /** Names the nav landmark. Falls back to the title, then 'Navigation'. */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** One level of the stack. `id` keys the rail and seeds its storage key. */
export declare interface NavRailSpec extends Omit<NavRailProps, 'storageKey'> {
    id: string;
}

export declare function NavRailStack({ rails, activeHref, renderLink, tone, storageKey, children, className, 'data-testid': testId, }: NavRailStackProps): JSX.Element;

export declare interface NavRailStackProps {
    /**
     * Outermost rail first. An empty array renders content full-bleed, which is
     * the right answer for a leaf page that wants the width back — a rail with
     * nothing in it is a dead 200px column, not a smaller rail.
     */
    rails: NavRailSpec[];
    /** Applied to every rail that does not set its own. */
    activeHref?: string;
    /** Applied to every rail that does not set its own. */
    renderLink?: NavRailProps['renderLink'];
    /** Applied to every rail that does not set its own. */
    tone?: NavRailTone;
    /** Prefix for each rail's group-collapse persistence, suffixed by rail id. */
    storageKey?: string;
    /** The content region beside the rails. Usually a `WorkArea` or an Outlet. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the rail paints in. */
export declare type NavRailTone = SurfaceTone;

/** Sub-section navigation: link-based underline tab strip (no state — consumer routes via activeHref). */
export declare function NavTabs({ items, activeHref, renderLink, className, style, 'aria-label': ariaLabel, variant, }: NavTabsProps): JSX.Element;

export declare interface NavTabsProps {
    items: TopNavItem[];
    activeHref?: string;
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** See NavTabsVariant. `pill` also drops the strip's bottom border, since
     *  there is no underline left for it to complete. */
    variant?: NavTabsVariant;
}

/**
 * How the active item is marked.
 *
 * The two variants are a HIERARCHY, not two interchangeable looks. Apps stack
 * them: a primary row in the header (`pill`) and a section row under it
 * (`underline`). Which one you pick says which row the reader is meant to read
 * first.
 *
 * `pill` is the PRIMARY form, for a nav sitting in a bar rather than on a
 * strip. Active is a filled tint (`--color-primary-bg` / `--color-primary-fg`)
 * plus semibold — a block of brand colour roughly 90x36, which is what makes
 * it the loudest thing in the row. It also carries no bottom border: a header
 * owns its own rule, lower down, so an underline indicator there hangs in
 * mid-air (measured at 12px above the header rule, attached to nothing), which
 * is exactly what "the nav is not aligned" looks like.
 *
 * `underline` is the SECONDARY form: a 2px rule under the active item, sitting
 * ON the strip's own bottom border. Indicator and rule are one continuous
 * line — the `-mb-px` below is what overlaps them — so it is only correct
 * where that border exists. Against a filled pill it reads as a hairline:
 * same brand colour, ~1/18th of the area.
 */
export declare type NavTabsVariant = 'underline' | 'pill';

/** "You don't have access to <resource> — ask <owner> to share it." */
export declare function noAccessMessage(resource: string, ownerName?: string | null): string;

export declare function NoAccessState({ resource, ownerName, actionLabel, onAction, size, className, testId }: NoAccessStateProps): JSX.Element;

export declare interface NoAccessStateProps {
    /** What they tried to open, as a noun phrase: "this presentation". */
    resource: string;
    /** Who can share it. Omitted → "its owner". */
    ownerName?: string | null;
    /** Optional way back ("Back to documents"). */
    actionLabel?: string;
    onAction?: () => void;
    size?: EmptyStateSize;
    className?: string;
    testId?: string;
}

export declare function NodeCard({ icon, label, subtitle, status, statusLabel, body, selected, accentClass, className, onClick, }: NodeCardProps): JSX.Element;

export declare interface NodeCardProps {
    /** Emoji or short string icon for the node type. */
    icon: string;
    label: string;
    subtitle?: string;
    /** Maps to StatusPill state — drives the pill and border accent. */
    status?: StatusPillState;
    /** Status label shown in the pill. Defaults to a capitalized form of status. */
    statusLabel?: string;
    /** Body content slot (preview text, stats, etc.). */
    body?: ReactNode;
    /** Whether the card appears selected (elevated shadow). */
    selected?: boolean;
    /** Accent color for the left border strip (Tailwind bg-* class). */
    accentClass?: string;
    className?: string;
    onClick?: () => void;
}

export declare function NotificationBell({ items, unreadCount, onItemClick, onMarkAllRead, onClearAll, label, placement, size, seeAll, className, 'data-testid': testId, }: NotificationBellProps): JSX.Element;

export declare interface NotificationBellProps {
    /** The feed, in `NotificationCenter`'s shape. */
    items: NotificationItem[];
    /** Unread count on the badge and in the name. Default: items whose `read` is not `true`. */
    unreadCount?: number;
    /** A row was activated. The popover closes after the call. */
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    /** Accessible name of the button and the popover. Default "Activity". */
    label?: string;
    /** Where the popover opens. Default `bottom-end` (a bell at a header's right edge). */
    placement?: InlinePopoverPlacement;
    /**
     * A link pinned under the feed to the app's full activity view ("See all
     * activity"). The popover closes before `onSelect` runs. Since 2.446.1.
     */
    seeAll?: {
        label?: string;
        onSelect: () => void;
    };
    /** `sm` = 28px, the header-control family; `md` = 32px. Default `md`. */
    size?: NotificationBellSize;
    className?: string;
    /** Root test id (default `notification-bell`); parts: `-button`, `-badge`, `-popover`, `-center`, `-empty`. */
    'data-testid'?: string;
}

export declare type NotificationBellSize = 'sm' | 'md';

export declare function NotificationCenter({ items, onItemClick, onMarkAllRead, onClearAll, footer, emptyTestId, className, 'data-testid': testId, }: NotificationCenterProps): JSX.Element;

export declare interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
    /**
     * Pinned under the feed, outside its scroll region — e.g. a "See all
     * activity" link. Since 2.446.1. The header (title, Mark all read, tabs) is
     * likewise outside the scroll region, so in a height-capped host both stay
     * in view while only the feed scrolls.
     */
    footer?: ReactNode;
    /** Test id of the empty state. Default `empty-state`. Since 2.448.0. */
    emptyTestId?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface NotificationItem {
    id: string;
    title: string;
    body?: string;
    timestamp?: string | number;
    read?: boolean;
    /** Optional icon / emoji / ReactNode prefix */
    icon?: string;
    /** Optional grouping / category label */
    category?: string;
}

/** Three numbered lines: "numbered list". Since 2.386.5. */
export declare function NumberedListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare const NumberInput: ForwardRefExoticComponent<NumberInputProps & RefAttributes<HTMLInputElement>>;

export declare interface NumberInputProps {
    /**
     * `undefined` renders an empty field, for a genuinely optional numeric
     * setting. Distinguishing "unset" from 0 matters: 0 is a real value for a
     * seed, a threshold or an offset.
     */
    value: number | undefined;
    onChange: (value: number) => void;
    /**
     * Called when the field is emptied. Supplying it is what makes the field
     * clearable — without it, deleting the text leaves the previous value in
     * place, because a half-typed "-" or "" cannot be parsed to a number.
     *
     * Kept separate from `onChange` so widening that callback's parameter to
     * `number | undefined` doesn't break every existing caller.
     */
    onClear?: () => void;
    min?: number;
    max?: number;
    step?: number;
    /** Rendered as a right-edge suffix: 'px' | '°' | '%' | … */
    unit?: string;
    placeholder?: string;
    invalid?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md';
    /**
     * Id of the rendered `<input>`, so an external `<label htmlFor>` can point
     * at it. Without this the prop was silently dropped and the label named
     * nothing.
     */
    id?: string;
    /** Form field name, for label association and form submission. */
    name?: string;
    /** Accessible name. Required when no visible `<label>` is wired up. */
    'aria-label'?: string;
    /** Id of the element that labels this control. */
    'aria-labelledby'?: string;
    /** Id(s) of hint / error text describing this control. */
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    required?: boolean;
    'data-testid'?: string;
}

declare interface ObjectLike3 {
    name?: string;
    parent?: ObjectLike3 | null;
    isMesh?: boolean;
    material?: MaterialLike3 | MaterialLike3[];
    traverse?(fn: (o: ObjectLike3) => void): void;
}

export declare function OutcomeSection({ title, value, onChange, placeholder, readOnlyReason, pending, first, as, variant, size, className, 'data-testid': testId, }: OutcomeSectionProps): JSX.Element;

export declare interface OutcomeSectionProps {
    title?: string;
    /** Semantic heading level; use h2 for a section directly under the page title. */
    as?: 'h2' | 'h3' | 'h4';
    value: string | null;
    onChange?: (v: string) => void;
    placeholder?: string;
    readOnlyReason?: string;
    pending?: boolean;
    /** Suppress DetailSection's leading rule. */
    first?: boolean;
    /**
     * `heading` (default since 2.386.15): a 16px sentence-case heading, 14px
     * body, affordances quiet until hover — a work item's Brief. `label`: the
     * small uppercase caption under a hairline, for a side panel.
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only: `lg` (since 2.390.0) is `DetailSection size="lg"` — a
     * 19px heading ("Why this matters") over a 15px body.
     */
    size?: 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

/**
 * Use this when a page is a form, an overview or any page no other template fits: trail, title/actions, and a body at the page gutter.
 *
 * Fills its parent (`h-full min-h-0`); only the body scrolls. Given `trailControls`, `trailLink`, `collapsed` or
 * `onToggleCollapsed`, the trail is its own row (controls on its right) with the title band under it, or folded into it.
 *
 * @example
 * <PageFrame title="New connector" breadcrumbs={[{ label: 'Connectors', href: '/connectors' }, { label: 'New' }]}
 *   actions={<Button>Save</Button>}>
 *   <FormField label="Name">{({ id }) => <Input id={id} value={name} onChange={(e) => setName(e.target.value)} />}</FormField>
 * </PageFrame>
 *
 * @example
 * // A section page: scope selector on the trail row, its command composer docked at the column's bottom.
 * <PageFrame title="Communication" breadcrumbs={trail} trailControls={<Select … />} body="docked"
 *   footer={<CollectionCommandHost inPlace … />}>
 *   <PageSection title="Channels">…</PageSection>
 * </PageFrame>
 */
export declare function PageFrame({ title, description, breadcrumbs, actions, badge, back, density, titleAs, trailControls, trailLink, collapsed, onToggleCollapsed, children, body, dockedBody, footer, gutter, bodyGutter, bodyClassName, className, ...rest }: PageFrameProps): JSX.Element;

export declare interface PageFrameProps extends PageTemplateHeaderProps, PageTemplateTrailProps, Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> {
    /** The page content, at the page gutter. */
    children: ReactNode;
    /**
     * `scroll` (default): the body scrolls. `fill`: the body is a fixed-height flex column whose children scroll themselves.
     * `docked` (since 2.504.0): the body scrolls over a dock at the column's bottom (`DockedColumn`): `footer`, and any
     * `ColumnDock` inside the body (a section's command composer), render there, spanning the column.
     */
    body?: 'scroll' | 'fill' | 'docked';
    /** With `body="docked"`: `scroll` (default) the body scrolls over the dock; `fill` it is a fixed frame whose panes scroll (a conversation). Since 2.504.0. */
    dockedBody?: 'scroll' | 'fill';
    /** Docked under the body, full width, never scrolls (a save bar, a composer). With `body="docked"` it goes into the column's dock. */
    footer?: ReactNode;
    /** Default `page` — the `--ui-page-gutter` inset on header and body. */
    gutter?: PageGutter;
    /** The body's inset when it differs from the header's (since 2.504.0): `none` for a conversation that owns its gutters. Default: `gutter`. */
    bodyGutter?: PageGutter;
    /** Extra classes for the body region. */
    bodyClassName?: string;
}

/**
 * Use this to build a page from data: a `PageSpec` (template → regions → sections → leaves) rendered through the matching page template, every leaf a library component.
 *
 * Emits `data-page-spec="<template>"` on the template root and `data-spec-leaf="<kind>"` on each leaf.
 *
 * @example
 * <PageFromSpec spec={definePage({
 *   template: 'collection', title: 'Runs',
 *   actions: [{ kind: 'button', variant: 'primary', label: 'New run', onClick: onNew }],
 *   toolbar: { label: 'Run controls', search: { value: q, onChange: setQ } },
 *   table: { data: runs, keyField: (r) => r.id, columns, onRowClick: open },
 *   empty: { title: 'No runs yet' },
 * })} />
 */
export declare function PageFromSpec({ spec }: PageFromSpecProps): JSX.Element;

export declare interface PageFromSpecProps {
    spec: PageSpec;
}

/** `page`: the template draws the `--ui-page-gutter` inset. `none`: the host already did. */
export declare type PageGutter = 'page' | 'none';

export declare function PageHeader({ title, as: Heading, description, actions, back, badge, size, breadcrumbs, density: densityProp, collapsed, onToggleCollapsed, people, info, meta, tabs, tabsOverflowBelow, activeTab, onTabChange, className, 'data-testid': testId, }: PageHeaderProps): default_2.JSX.Element;

export declare interface PageHeaderBack {
    label: string;
    to: string;
    onClick?: (e: default_2.MouseEvent<HTMLAnchorElement>) => void;
}

export declare interface PageHeaderProps {
    title: string;
    /** Semantic heading level for a header embedded under another page title; visual size is unchanged. */
    as?: 'h1' | 'h2' | 'h3' | 'h4';
    description?: string;
    /** Right-aligned action area (buttons, menus). */
    actions?: default_2.ReactNode;
    /** Optional back link rendered above the title. */
    back?: PageHeaderBack;
    /** Badge or status pill rendered to the right of the title. */
    badge?: default_2.ReactNode;
    /**
     * Title size. `md` (default) is the 20px heading every page has had, in
     * both forms; `lg` is a 28px directory title — a page that IS the list,
     * not a page about one thing (comfortable form only). `sm` (since
     * 2.441.8) is the 14/600 title — the compact form's title before 2.441.8,
     * now only on explicit request. Density is spacing: the compact form folds
     * the header onto one 28px row but keeps the 20/600 page title.
     */
    size?: 'sm' | 'md' | 'lg';
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
    info?: default_2.ReactNode;
    /**
     * The header's summary under the people (a stat strip, a certification
     * line). Comfortable only: compact moves it into the built-in description
     * card with the description; collapsed drops it. Since 2.437.0.
     */
    meta?: default_2.ReactNode;
    /** View tabs under the header, in every density and state. Since 2.437.0. */
    tabs?: PageHeaderTab[];
    /**
     * The tabs' fold (since 2.515.5; `Tabs overflowBelow`): while the header is
     * narrower than this many px, the first tab and the current one stay in
     * the row and the rest move into its `More ▾` menu, so a phone sees every
     * view's name instead of a row cut at the screen's edge. Omitted: the row
     * scrolls sideways (unchanged).
     */
    tabsOverflowBelow?: number;
    activeTab?: string;
    onTabChange?: (id: string) => void;
    className?: string;
    'data-testid'?: string;
}

/** A view tab under the header (since 2.437.0). */
export declare interface PageHeaderTab {
    id: string;
    label: string;
    /** Drawn after the label ("Work 11"). */
    count?: number;
    disabled?: boolean;
}

export declare function PageSection({ title, description, actions, children, count, countTone, empty, size: sizeProp, divided, className, 'data-testid': testId, }: PageSectionProps): JSX.Element;

export declare interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    /** The section's content. Not drawn when `empty` is set. */
    children?: ReactNode;
    /**
     * The section has nothing to show: one quiet line beside the title, on the
     * title's row — "Needs your attention · Nothing right now". The section
     * collapses to that one row (no description, no content block); `actions`
     * stay on the right. Emits `data-section-empty` and marks the line
     * `data-ui-empty`. A heading over a two-line "nothing here" paragraph took
     * two full rows of an inbox page for nothing. Since 2.449.0.
     */
    empty?: ReactNode;
    /**
     * A count beside the title in a neutral chip — "Needs attention 1". Absent
     * draws none, and so does zero (2.504.0): the empty state says it, a "0"
     * chip over it is chrome describing nothing. Since 2.392.0.
     */
    count?: number;
    /**
     * The count pill's colour. `neutral` (default): the grey chip. `primary`
     * (since 2.396.0): a pale indigo pill (`primary-bg`) with indigo
     * (`primary-fg`) numerals at 13px — the Initiatives v2 "Needs attention 1".
     */
    countTone?: 'neutral' | 'primary';
    /**
     * `lg` (default): the page's own 20px h1 with 24px to its content. `md`
     * (since 2.392.0): a 16px semibold h2 over a section of a page — "Needs
     * attention", "Up next" — with 8px to its content, the actions vertically
     * centred on the title. `sm` (since 2.429.0): the same h2 at the app's
     * body step — 14px semibold (`T size="sm" weight="semibold"`), a 12px count
     * pill and 14px actions — for a section inside a tabbed pane, where 16px
     * reads a size up from the 14px tabs and the 13–14px rails beside it.
     *
     * Unsized, it is `lg` at every density: under `<DensityProvider
     * density="compact">` it keeps the h1 and takes the compact 8px content
     * gap (2.441.5). An explicit size always wins, `lg` included.
     */
    size?: 'lg' | 'md' | 'sm';
    /**
     * Draw a token-coloured hairline (`border`) between the section's direct
     * child groups, with `--ui-section-gap` above and below each rule, so a
     * stack of groups reads as separate blocks rather than one long scroll.
     * Emits `data-section-divided`. Default false. Since 2.504.0.
     */
    divided?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A whole page as data, discriminated on `template`. */
export declare type PageSpec = CollectionPageSpec | MasterDetailPageSpec | DetailPageSpec | DashboardPageSpec | SettingsPageSpec | FramePageSpec;

/** The component a registered kind renders: its spec's props, plus the leaf marker to put on its root. */
export declare type PageSpecLeafComponent<K extends keyof PageSpecLeafKinds> = ComponentType<PageSpecLeafKinds[K] & {
    kind: K;
    'data-spec-leaf': K;
}>;

/**
 * App-defined leaf kinds. Augment it to add one, then register its component:
 *
 *   declare module '@connorhoehn/ui-components/shared' {
 *     interface PageSpecLeafKinds { 'cost-meter': { spent: number; budget: number } }
 *   }
 *   registerLeafKind('cost-meter', CostMeter);
 *
 * Each key becomes a `{ kind: key } & props` member of `LeafSpec`.
 */
export declare interface PageSpecLeafKinds {
}

/** A map of registered kinds to their components. */
export declare type PageSpecLeafMap = {
    [K in keyof PageSpecLeafKinds]?: PageSpecLeafComponent<K>;
};

/** Provides app-defined leaf kinds to every `PageFromSpec` / `renderLeaf` under it. */
export declare function PageSpecProvider({ leaves, children }: PageSpecProviderProps): JSX.Element;

export declare interface PageSpecProviderProps {
    /** Components for app-defined kinds, for this subtree. Wins over `registerLeafKind`. */
    leaves: PageSpecLeafMap;
    children?: ReactNode;
}

export declare type PageSpecTemplate = PageSpec['template'];

/** The header every page template draws: the trail, the title row, the actions. */
export declare interface PageTemplateHeaderProps {
    title: string;
    /** One line under the title (compact density folds it into the info card). */
    description?: string;
    /** The trail as the header's first row. */
    breadcrumbs?: BreadcrumbItem[];
    /** Right-aligned buttons and menus. */
    actions?: ReactNode;
    /** A status pill beside the title. */
    badge?: ReactNode;
    /** A back link above the title. */
    back?: PageHeaderBack;
    /** Header density; default `compact` (one 28px title row). */
    density?: Density;
    /**
     * The title's heading level (since 2.504.0). Default `h1`; `h2`/`h3` when a
     * host above the template already draws the page heading. Size is unchanged.
     */
    titleAs?: 'h1' | 'h2' | 'h3';
}

/**
 * The trail row as its own band (since 2.504.0): right-hand controls on the
 * crumb line, and the title that can fold into it. Given any of these, a
 * template draws `TrailHeader` instead of `TemplateHeader`.
 */
export declare interface PageTemplateTrailProps {
    /** Right of the trail, on the crumb row: a scope selector, a filter. */
    trailControls?: ReactNode;
    /** Right of the trail: an outbound link ("Agent library ↗"). */
    trailLink?: {
        label: string;
        href: string;
        icon?: ReactNode;
    } | null;
    /** The title folds into the trail's last crumb (a conversation view); no title band is drawn. */
    collapsed?: boolean;
    /** Draws the collapse/expand chevron. */
    onToggleCollapsed?: () => void;
}

/** One record a host's search returned (a person, an initiative, a request…). */
export declare interface PaletteRecord {
    id: string;
    title: string;
    subtitle?: string;
    /** Short type label shown as a chip, e.g. "Person", "Request". */
    kind: string;
    /** Where the record lives; handed to `onOpenRecord` on Enter/click. */
    href: string;
    icon?: ReactNode;
}

/** Records of one type, in the order the host wants them shown. */
export declare interface PaletteRecordGroup {
    group: string;
    items: PaletteRecord[];
}

/**
 * The pane's tab row: underline tabs whose first label starts on the pane's
 * 16px inset (the frame title's edge), a trailing slot that wraps beneath
 * the tabs when a narrow pane cannot fit both, and one rule under it.
 */
export declare function PaneHeader({ tabs, value, onValueChange, trailing, label, overflow, 'data-testid': testId }: PaneHeaderProps): JSX.Element;

export declare interface PaneHeaderProps {
    /** The pane's sections. One tab row — the only tablist in the pane. */
    tabs: readonly TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    /** Right end of the row (a view switcher); wraps below the tabs when needed. */
    trailing?: ReactNode;
    /** Names the tablist. Default "Pane sections". */
    label?: string;
    /**
     * What the tab row does when the pane is too narrow for it (since
     * 2.515.9). `menu` (default, unchanged): under 360px of the row's width
     * only the first and the current tab stay and the rest move into
     * `More ▾`. `scroll`: every tab stays in one row that scrolls sideways
     * (no scrollbar drawn; the current tab is kept in view), for a narrow
     * inspector or a phone column where three of four views behind a menu is
     * worse than a row the reader can swipe. Marker: the tablist's
     * `data-tabs-overflow`.
     */
    overflow?: 'scroll' | 'menu';
    'data-testid'?: string;
}

export declare function PanelsView({ connectionState, onReact, chatMessages, onChatSend, cursors, localCursor, activeMode, onModeChange, onFreeformMove, onTableClick, onTextChange, onCanvasMove, crdtContent, applyLocalEdit, hasConflict, onDismissConflict, onTyping, typingUsers, idToken, sendMessage, onMessage, }: PanelsViewProps): JSX.Element;

declare interface PanelsViewProps {
    connectionState: string;
    onReact: (emoji: string) => void;
    chatMessages: ChatMessage[];
    onChatSend: (content: string) => void;
    cursors: Map<string, RemoteCursor>;
    localCursor: RemoteCursor | null;
    activeMode: CursorMode;
    onModeChange: (mode: CursorMode) => void;
    onFreeformMove: (x: number, y: number) => void;
    onTableClick: (row: number, col: number) => void;
    onTextChange: (position: number, selectionData: TextSelectionData | null, hasSelection: boolean) => void;
    onCanvasMove: (x: number, y: number, tool: CanvasTool, color: string, size: number) => void;
    crdtContent: string;
    applyLocalEdit: (newText: string) => void;
    hasConflict?: boolean;
    onDismissConflict?: () => void;
    onTyping: (isTyping: boolean) => void;
    typingUsers: string[];
    idToken: string | null;
    sendMessage: (msg: Record<string, unknown>) => void;
    onMessage: (handler: (msg: GatewayMessage) => void) => () => void;
}

export declare interface PaneRecord {
    kind: string;
    id: string;
}

export declare function paneRecordKey(record: PaneRecord): string;

export declare interface PaneState {
    tab: string;
    record: PaneRecord | null;
}

export declare interface PaneStateControl extends PaneState {
    /** The tabs to list (`Tabs items`). */
    tabs: TabItem[];
    /** The URL names a tab or record (anything but the resting tab). */
    away: boolean;
    /**
     * Open a tab. A record tab shows `record`; a plain tab drops the record
     * unless `keepRecord` (then `record` replaces it when given, `null` drops it).
     */
    open(tab: string, record?: PaneRecord | null): void;
    /** The tab row's handler: a record tab keeps its record. */
    select(tab: string): void;
    /** Back to the resting tab. */
    clear(): void;
}

export declare interface PaneTabSpec {
    id: string;
    label: string;
    /** Restored per device on arrival (a resting choice: Details, Docs). */
    remember?: boolean;
    /** A record tab: the record kinds it shows. Listed only while one is named. */
    recordKinds?: readonly string[];
    badge?: TabItem['badge'];
}

export declare interface PaneUrlOptions {
    /** Default `pane`. */
    urlKey?: string;
    /** Default `paneRecord`. */
    recordKey?: string;
}

/** A paperclip: a file came along with this. */
export declare function PaperclipIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** `run:job-7` → `{kind:'run', id:'job-7'}`; null for anything malformed. */
export declare function parsePaneRecord(raw: string | null | undefined): PaneRecord | null;

/** Parse unified git diff output. Exported for tests and for hosts that need
 *  the file list without rendering. */
export declare function parseUnifiedDiff(diff: string): DiffFile[];

/**
 * Renders `children` over a drifting point cloud while `active`.
 *
 * The canvas is `pointer-events: none` and sits behind the children in an
 * isolated stacking context; nothing above it moves, resizes or changes
 * hit-testing when the state flips.
 */
export declare function ParticlesBackground({ active, particleCount, particleSpread, speed, particleColors, moveParticlesOnHover, particleHoverFactor, alphaParticles, particleBaseSize, sizeRandomness, cameraDistance, disableRotation, pixelRatio, seed, fallbackIntensity, tone, density, className, children, 'data-testid': testId, }: ParticlesBackgroundProps): JSX.Element;

export declare interface ParticlesBackgroundProps {
    /**
     * True while the thing behind this surface is working. False renders
     * `children` on the normal surface with no backdrop at all — a 250ms
     * crossfade, no layout change, so a surface that starts working and one that
     * stops are the same box.
     */
    active?: boolean;
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: readonly string[];
    moveParticlesOnHover?: boolean;
    particleHoverFactor?: number;
    /** Soft-edged points with gradient alpha instead of hard discs. */
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    disableRotation?: boolean;
    pixelRatio?: number;
    /** Seed for the CSS fallback's star field, so a fallback pane keeps its own sky. */
    seed?: number;
    fallbackIntensity?: RisingParticlesIntensity;
    /**
     * The sky behind the field. `night` (default) is the navy-to-black ground it
     * always had; `graphite` is a neutral dark grey with the field drawn at lower
     * contrast, for a console surface sitting on a LIGHT page. Resolve `auto`
     * with `useResolvedBackdropTone` before passing it here.
     */
    tone?: 'night' | 'graphite';
    /**
     * Upper bound on how many particles are DRAWN, per 10,000 CSS px² of the
     * surface. Unset draws all of `particleCount` (the old behaviour). The cloud
     * is uploaded once and its order is random, so drawing a prefix is a uniform
     * thinning that costs nothing to change — a surface that grows or shrinks
     * never rebuilds its GL context, and a small one never pays for a big sky.
     */
    density?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

/** Two upright bars in a ring: "pause" (the counterpart of PlayCircleIcon). Since 2.451.3. */
export declare function PauseCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Two people: "shared with me", a group. Since 2.385.0. */
export declare function PeopleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function PermissionDeniedCard({ kind, state, message, onRetry, retryLabel, icon, className, 'data-testid': testId, }: PermissionDeniedCardProps): JSX.Element;

export declare interface PermissionDeniedCardProps {
    /** Which underlying capability was denied. Drives the default copy + icon. */
    kind: PermissionKind;
    state: PermissionState_2;
    /** Optional verbatim error message (browser-specific text). When omitted
     *  the card renders default copy keyed on `state`. */
    message?: string | null;
    /** Optional retry action. Hidden when omitted. */
    onRetry?: () => void;
    /** Optional override label for the retry button (default: "Try again"). */
    retryLabel?: string;
    /** Optional override icon (replaces the default per-kind glyph). */
    icon?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare type PermissionKind = 'camera' | 'microphone' | 'screen';

declare type PermissionState_2 = 'denied' | 'blocked' | 'no-device' | 'unavailable';
export { PermissionState_2 as PermissionState }

export declare interface PersonCardData {
    userId?: string;
    displayName: string;
    /** Job title / role, e.g. "Staff Engineer". */
    title?: string;
    email?: string;
    /** Team or department. */
    department?: string;
    /** Local time where they are, already formatted, e.g. "3:42 PM". */
    localTime?: string;
    avatarUrl?: string;
    color?: string;
    /** true → online, false → offline, undefined → unknown (no dot). */
    online?: boolean;
    /** Free-text status, e.g. "In a meeting". */
    statusText?: string;
}

export declare function PersonHoverCard({ person, children, actions, details, interactiveChild, openDelay, closeDelay, className, 'data-testid': testId, }: PersonHoverCardProps): JSX.Element;

export declare interface PersonHoverCardProps {
    person: PersonCardData;
    /** The inline element that opens the card — usually the person's name. */
    children: ReactNode;
    /** Actions rendered at the foot of the card (Message, Call, …). */
    actions?: ReactNode;
    /**
     * Extra content between the identity block and the actions — skills,
     * a score, recent work. Domain-shaped detail the card itself should not
     * try to model, since every product means something different by it.
     */
    details?: ReactNode;
    /**
     * Set when `children` is ITSELF interactive — a link or a button.
     *
     * The trigger is normally a `role="button"` span so the card is reachable
     * without a pointer. But wrapping a link in that produces a link inside a
     * button: two nested activation targets with different destinations, which
     * assistive tech announces as one confused control and which swallows the
     * link's own Enter behaviour. With this set the wrapper keeps only the
     * pointer handlers and lets the child own focus and activation — hover
     * still opens the card, and focusing the link still opens it, because
     * React's onFocus is focusin and bubbles from the child.
     */
    interactiveChild?: boolean;
    /** ms before hover opens the card. */
    openDelay?: number;
    /** ms before leaving closes it. Must outlast the trigger→panel pointer trip. */
    closeDelay?: number;
    className?: string;
    'data-testid'?: string;
}

/** One head and shoulders: "a person" (a subject mask, one member). Since 2.390.0. */
export declare function PersonIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function PersonPicker({ people, value, onChange, placeholder, emptyMessage, maxOptions, size, loading, disabled, onQueryChange, className, ...wiring }: PersonPickerProps): JSX.Element;

export declare interface PersonPickerPerson {
    /** The value committed on choice (a user id). */
    id: string;
    name: string;
    /** A second line: a title, a team, what they hold. Matched by the filter. */
    detail?: string;
    /** A short right-aligned tag on the name line ("You", "Manager"). Matched by the filter. */
    tag?: string;
    avatarUrl?: string;
    /** Shown but not choosable (e.g. someone the rules exclude), with the reason in `detail`. */
    disabled?: boolean;
}

export declare interface PersonPickerProps {
    people: readonly PersonPickerPerson[];
    /** The chosen person's id, or '' for none. */
    value: string;
    onChange: (id: string) => void;
    placeholder?: string;
    /** Shown when the query matches nobody. */
    emptyMessage?: string;
    /** Cap on rendered suggestions (default 50: a person list is long and searched). */
    maxOptions?: number;
    size?: 'sm' | 'md';
    /** The list is still loading: the field is disabled and says so. */
    loading?: boolean;
    disabled?: boolean;
    /** Called as the query changes, for hosts that search a directory server-side. */
    onQueryChange?: (query: string) => void;
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean;
    'aria-required'?: boolean;
    invalid?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A handset: start a voice call. */
export declare function PhoneIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function PickerDialog({ open, title, body, options, confirmLabel, onPick, onCancel, searchPlaceholder, emptyText, loading, initialId, 'data-testid': testId, }: PickerDialogProps): JSX.Element;

export declare interface PickerDialogOption {
    id: string;
    label: string;
    /** A quieter second line. */
    description?: string;
    icon?: ReactNode;
    /** Indent level — a folder's depth in its tree. Default 0. */
    depth?: number;
    /** Shown, not choosable ("the folder it is already in"). */
    disabled?: boolean;
    /** Said beside a disabled row. */
    disabledReason?: string;
}

export declare interface PickerDialogProps {
    open: boolean;
    title: string;
    /** A sentence under the title. */
    body?: string;
    options: readonly PickerDialogOption[];
    /** The confirm button's words ("Move", "Run", "Create"). Default 'Choose'. */
    confirmLabel?: string;
    onPick: (id: string) => void;
    onCancel: () => void;
    /** Search placeholder; the box is shown when there are more than 6 options. */
    searchPlaceholder?: string;
    /** Said when there is nothing to choose (or nothing matches). */
    emptyText?: string;
    /** Said while the options are loading. */
    loading?: boolean;
    /** Preselected row. */
    initialId?: string;
    'data-testid'?: string;
}

/** A pushpin: "keep this at the top". */
export declare function PinIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * A column that scrolls with the page until the page scrolls past it, then
 * stays put — a video panel beside the text. The host decides WHEN (it
 * watches the scroll); this owns HOW, so the fixed geometry is not a page's
 * inline style.
 */
export declare function PinnedSlot({ width, pinned, top, left, slotId, spacerRef, children, 'data-testid': testId }: PinnedSlotProps): JSX.Element;

export declare interface PinnedSlotProps {
    /** The slot's width, reserved in the flow whether or not it is pinned. */
    width: number;
    /** Pinned: the inner slot leaves the flow and sits fixed at `top`/`left`; the spacer keeps the width. */
    pinned: boolean;
    top?: number;
    left?: number;
    /** The inner slot's id — for content that portals itself in. */
    slotId?: string;
    /** The spacer, so a host can measure where the slot sits in the flow. */
    spacerRef?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    'data-testid'?: string;
}

declare interface PipelineSidebarEntry {
    id: string;
    name: string;
    status: 'draft' | 'published' | 'archived';
    updatedAt: string;
    icon?: string;
}

/** A play button in a ring: "run". Since 2.390.3. */
export declare function PlayCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A plus in a ring: "add this". Since 2.389.6. */
export declare function PlusCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A plus: "make a new one". */
export declare function PlusIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A box with an arrow leaving its corner: "open this in its own view". */
export declare function PopOutIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The attribute a bounded surface — a conversation pane beside a page, a side
 * panel — puts on itself so a popover opened from INSIDE it stays inside it
 * horizontally (since 2.434.0). Without it a `bottom-end` menu from a control
 * near the pane's left edge hung its panel left over the page beside the pane
 * (the folded "More ▾" of a narrow pane's tab bar covered the content column).
 * The nearest such ancestor of the trigger wins; the viewport still applies.
 */
export declare const POPOVER_BOUNDARY_ATTR = "data-uic-popover-boundary";

/**
 * The attribute a pinned surface — a composer dock at the foot of an editor —
 * puts on itself so popovers never cover it. A popover anchored ABOVE such a
 * surface treats its top edge as the bottom of the screen: it flips up, or
 * slides up, rather than opening over it. A popover opened from INSIDE it
 * (its own menus) is unaffected.
 */
export declare const POPOVER_KEEPOUT_ATTR = "data-uic-keepout";

/** The horizontal span a popover anchored at `trigger` must stay within: its nearest boundary ancestor, else the viewport. */
export declare function popoverBounds(trigger: HTMLElement | null, viewportWidth: number): {
    left: number;
    right: number;
};

/** A field in a PopoverForm: a small label over its control, tightly. */
export declare function PopoverField({ label, hint, children, 'data-testid': testId, }: {
    label: string;
    hint?: string;
    children: ReactNode;
    'data-testid'?: string;
}): JSX.Element;

/** The lowest y a popover anchored at `anchor` may reach: the viewport, or a keep-out surface below the anchor. */
export declare function popoverFloor(anchor: DOMRect | null, viewportHeight: number, doc?: Document): number;

export declare function PopoverForm({ open, anchor, placement, title, subtitle, icon, submitLabel, submitSlot, submitTestId, submitDisabled, busy, error, onSubmit, onClose, width, children, 'data-testid': testId, }: PopoverFormProps): JSX.Element | null;

export declare interface PopoverFormProps {
    open: boolean;
    /** What it opens beside. Without one it centres, which is the fallback, not the intent. */
    anchor?: RefObject<HTMLElement | null> | null;
    placement?: InlinePopoverPlacement;
    /** A word or two. "Create a channel", not "Create a new channel in this team". */
    title: string;
    /** The context line under it — the team a channel is going into, say. */
    subtitle?: string;
    /** A small mark to the left of the title: a team avatar, a glyph. */
    icon?: ReactNode;
    /** Ignored when `submitSlot` is given. */
    submitLabel?: string;
    /**
     * A confirm control to render INSTEAD of the shell's own submit button.
     *
     * For the forms whose body already owns the decision — a people picker knows
     * how many are selected and says so ("Start chat with 2"), and the shell has
     * no way to learn that without the caller lifting the selection out of the
     * component that manages it. Cancel and the chrome stay; only the confirm is
     * the caller's. `submitLabel` is ignored when this is given.
     *
     * `false` means there is NO confirm to render: a destination picker's rows
     * are themselves the commit, and a footer button beside them would be a
     * second way to do the thing that has no state to act on. The footer keeps
     * Cancel, which is the way out a popover still owes anyone who opened it by
     * accident.
     */
    submitSlot?: ReactNode | false;
    /** Overrides the submit button's testid, for hosts whose suites name it. */
    submitTestId?: string;
    submitDisabled?: boolean;
    busy?: boolean;
    /** The server's refusal, shown in place. The footer does not move when it appears. */
    error?: string | null;
    onSubmit: () => void;
    onClose: () => void;
    /** How wide the panel sits. 'md' (320px) by default — a name fits, a paragraph does not. */
    width?: PopoverFormWidth;
    children: ReactNode;
    'data-testid'?: string;
}

export declare type PopoverFormWidth = 'sm' | 'md' | 'lg';

export declare function PresenceAvatars({ users, maxVisible, size, onMoreClick, onUserClick, onFollowUser, followingUserId, className, }: PresenceAvatarsProps): JSX.Element;

export declare interface PresenceAvatarsProps {
    users: PresenceAvatarUser[];
    /** Maximum avatars to render before "+N" chip (default 5) */
    maxVisible?: number;
    /** Avatar diameter in px (default 28) */
    size?: number;
    /** Called when the "+N" overflow chip is clicked */
    onMoreClick?: () => void;
    /** Called with the user's `id` when an avatar is clicked. When set,
     *  each avatar becomes a `<button>` for keyboard + screen-reader
     *  accessibility; when omitted, items render as `<div>` (back-compat
     *  with consumers that just want a static row). */
    onUserClick?: (id: string) => void;
    /**
     * Enables follow mode: each avatar grows a hover/focus card (name, detail,
     * location) with a Follow action. Click stays `onUserClick` — jump once —
     * and follow is the card's explicit verb, because a bubble that follows on
     * bare click turns every glance into a mode change.
     *
     * The card replaces the native `title` tooltip when set; two tooltips
     * fighting over one hover is worse than either.
     */
    onFollowUser?: (id: string) => void;
    /** The user currently being followed, so their card offers Stop instead. */
    followingUserId?: string | null;
    className?: string;
}

export declare interface PresenceAvatarUser {
    /** Unique identifier for the user. Passed back to `onUserClick`. */
    id: string;
    name: string;
    /** Optional avatar image URL. Wins over `color` when present. */
    avatarUrl?: string;
    /** Online flag. Drives the status dot when `idle` is not set:
     *  `undefined`/`true` → green; `false` → gray. */
    online?: boolean;
    /** Override the auto-computed avatar background. Useful when the
     *  user identity needs to match a CRDT cursor color elsewhere. */
    color?: string;
    /** Present but away. Dims the avatar (alpha-blends `color` when
     *  provided, otherwise drops opacity) and flips the status dot to
     *  amber. Wins over `online` for the dot color. */
    idle?: boolean;
    /** Present and working (since 2.515.9): a red status dot (`--color-danger`,
     *  as `PresenceDot` busy), the avatar NOT dimmed, "Busy" in its
     *  tooltip and `data-presence-busy`. Wins over `idle`. */
    busy?: boolean;
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
    /** One status line — "editing", "away · 3m", a status message. Free text
     *  because the library does not know the host's vocabulary. Shown in the
     *  hover card, and appended to the avatar's own tooltip ("Ada — Away: back
     *  at 3") when there is no card. */
    detail?: string;
    /** Where in the surface the user is — a section title, a pane name.
     *  Rendered under the detail line on the hover card. */
    location?: string;
}

export declare function PresenceDot({ state, ariaLabel, label, pulse, size, className, style, title, 'data-testid': testId, }: PresenceDotProps): JSX.Element;

export declare interface PresenceDotProps {
    state: PresenceState;
    /** Override the auto-computed accessible label. */
    ariaLabel?: string;
    /** Visible text label after the dot. */
    label?: ReactNode;
    /** Pulse animation. Defaults to true when state === 'online'. */
    pulse?: boolean;
    size?: StatusDotSize;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
}

export declare type PresenceMode = 'editor' | 'reviewer' | 'reader';

export declare type PresenceState = 'online' | 'away' | 'busy' | 'offline' | 'unknown';

/**
 * @deprecated Renamed to `PresenceAvatarUser` (the barrel-exported name for
 * the `PresenceAvatars` user shape). Import `PresenceAvatarUser` instead;
 * this back-compat alias will be removed in the next major.
 */
export declare type PresenceUser = PresenceAvatarUser;

declare interface PresenceUser_2 {
    clientId: string;
    status: string;
    metadata: Record<string, unknown>;
}

declare interface PresenceUser_3 {
    clientId: string;
    metadata: Record<string, unknown>;
}

/** A printer: "print". Since 2.390.3. */
export declare function PrinterIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** What each outcome marker says to a screen reader (and a host's legend). */
export declare const PROCEDURE_STEP_STATUS_LABELS: Record<ProcedureStepStatus, string>;

export declare interface ProcedureStep {
    id: string;
    title: ReactNode;
    /** Longer instruction under the title. */
    body?: ReactNode;
    /** The latest outcome for this step. Absent: no run has reached a verdict — the number is shown. */
    status?: ProcedureStepStatus;
    /** A quiet line under the step — "Not reached in this run.", the failure reason. */
    note?: ReactNode;
}

export declare function ProcedureSteps({ steps, numbered, size, onSelectStep, emptyLabel, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ProcedureStepsProps): JSX.Element;

export declare interface ProcedureStepsProps {
    steps: ProcedureStep[];
    /** Show step numbers. Default `true`. */
    numbered?: boolean;
    /** `sm` 13px text, 20px markers (an inspector); `md` (default) 14px, 24px markers (a record body). */
    size?: 'sm' | 'md';
    onSelectStep?: (id: string) => void;
    /** Shown when `steps` is empty. Default "No steps recorded". */
    emptyLabel?: string;
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type ProcedureStepStatus = 'done' | 'failed' | 'pending' | 'skipped';

export declare interface ProfileSummary {
    userId: string;
    displayName: string;
    email?: string;
    avatarUrl?: string;
}

export declare function ProgressBar({ value, max, color, size, completeTone, label, valueLabel, showRatio, labelClassName, className, style, 'data-testid': testId, 'aria-label': ariaLabel, }: ProgressBarProps): JSX.Element;

export declare interface ProgressBarProps {
    value: number;
    /** Maximum value. Defaults to 100. */
    max?: number;
    /** Fill color. Defaults to var(--color-primary). */
    color?: string;
    size?: ProgressBarSize;
    /**
     * Tone the fill (and the value readout) switches to once the bar is full.
     *
     * A completion bar that turns green at 100% is a different signal from one
     * that just reaches the right-hand edge, and reproducing it meant computing
     * the colour outside and passing `color`, then hand-writing a second
     * coloured `<span>` for the percentage — which is how the checklist reader
     * ended up with its own label row instead of using this one. Default
     * undefined: the bar keeps `color` at every value.
     */
    completeTone?: ToneOrAlias;
    label?: ReactNode;
    /**
     * Right-hand readout, replacing the computed ratio/percentage. Use it for a
     * caption the arithmetic here can't produce (a remaining count, an ETA).
     */
    valueLabel?: ReactNode;
    /** When true (default), shows "{value}/{max}". Otherwise shows percentage. */
    showRatio?: boolean;
    /** Extra classes on the label row, for a caller matching a nearby caption size. */
    labelClassName?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type ProgressBarSize = 'sm' | 'md';

export declare function ProjectCard({ name, id, status, statusColors, contributorNames, contributorCount, activityItems, presenceDotColor, activityLabel, cardIndex, onClick, className, style, minHeight, }: ProjectCardProps): JSX.Element;

export declare interface ProjectCardProps {
    /** Primary display name. */
    name: string;
    /** Optional monospace slug shown below the name (e.g. "proj-k8s"). */
    id?: string;
    /**
     * Status key used for accent color. Built-in keys: active, in_progress,
     * completed, archived, planning, paused. Supply `statusColors` to extend.
     */
    status?: string;
    /** Override or extend the built-in status → color map. */
    statusColors?: Record<string, StatusColors>;
    /** Names used for AvatarGroup in the footer. */
    contributorNames?: string[];
    /** Total contributor count — used to compute the "+N more" overflow label. */
    contributorCount?: number;
    /** Activity ticker items. */
    activityItems?: ActivityFeedItem[];
    /**
     * Color of the presence dot in the footer (e.g. 'var(--color-success)' for green).
     * Default: 'var(--color-border-field)' (grey = unknown).
     */
    presenceDotColor?: string;
    /** Human-readable "last active" label shown next to the presence dot. */
    activityLabel?: string;
    /** Index used to stagger the activity rotation offset. */
    cardIndex?: number;
    /** Click handler. */
    onClick?: () => void;
    className?: string;
    style?: CSSProperties;
    /** Minimum card height (default: 190). */
    minHeight?: number;
}

declare interface Props {
    error: GatewayError | null;
}

declare interface Props_2 {
    errors: GatewayError[];
}

declare interface Props_3 {
    entries: LogEntry[];
}

declare interface Props_4 {
    entries: LogEntry[];
}

declare interface Props_5 {
    connectionState: ConnectionState;
    onDisconnect: () => void;
    onReconnect: () => void;
}

export declare function Prose({ children, size, tone, className, 'data-testid': testId, }: ProseProps): JSX.Element;

export declare interface ProseProps {
    children: ReactNode;
    /**
     * `'sm'` for a dense side panel (a docs tab, inline help next to a form);
     * `'md'` for a standalone reading surface. Default `'md'`.
     */
    size?: ProseSize;
    /**
     * Tints headings and links with a semantic tone instead of the neutral
     * text tokens — a "what's new" callout, a deprecation notice. Body text
     * stays `text-text-primary` either way. Default: untinted (headings
     * `text-text-primary`, links `text-primary`).
     */
    tone?: ToneOrAlias;
    className?: string;
    'data-testid'?: string;
}

export declare type ProseSize = 'sm' | 'md';

/** A jigsaw piece: something that plugs in — a capability, an optional part. */
export declare function PuzzleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface QuickPrompt {
    label: string;
    hint?: string;
}

/**
 * Empty-state grid of prompt suggestion cards. Each card is a button calling
 * `onSelect(label)`.
 */
export declare function QuickPromptGrid({ prompts, onSelect, columns, title, className, }: QuickPromptGridProps): JSX.Element;

export declare interface QuickPromptGridProps {
    prompts: QuickPrompt[];
    onSelect: (label: string) => void;
    /** default auto-fit (responsive 220px min column width) */
    columns?: number;
    /** optional heading above, e.g. "Try asking:" */
    title?: string;
    className?: string;
}

/** A pair of quotation marks: a quoted passage — a blockquote. */
export declare function QuoteIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function RadioGroup<T extends string = string>({ name, value, onChange, options, disabled, orientation, 'data-testid': testId, }: RadioGroupProps<T>): JSX.Element;

export declare interface RadioGroupProps<T extends string = string> {
    /** Used as the HTML radio group name and as a stable ID base for labels. */
    name: string;
    value: T;
    onChange: (value: T) => void;
    options: RadioOption<T>[];
    disabled?: boolean;
    /** @default 'vertical' */
    orientation?: 'vertical' | 'horizontal';
    'data-testid'?: string;
}

export declare interface RadioOption<T extends string = string> {
    value: T;
    label: string;
    /** Short caption rendered below the label in muted text. */
    description?: string;
}

/** A rail's caption ("INITIATIVES 11"): 12px semibold uppercase, spaced. */
export declare const RAIL_CAPTION = "text-[12px] font-semibold uppercase tracking-[0.06em]";

/** The selected row's fill. The 3px primary edge bar goes with it. */
export declare const RAIL_CURRENT_FILL = "bg-primary/8";

/** Under this window width the primary rail folds at any depth (rail + section rail + content + an aside do not fit). */
export declare const RAIL_FOLD_PRIMARY_BELOW = 1180;

/** Under this width a section rail folds too — always after the primary rail. */
export declare const RAIL_FOLD_SECTION_BELOW = 768;

/**
 * A group heading's count ("IN PROGRESS … 9"): plain muted text at the label's
 * size, never a pill — the heading already says what it counts.
 */
export declare const RAIL_GROUP_COUNT = "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary";

/**
 * A group heading ("PLAN", "IN PROGRESS"): 12px semibold uppercase,
 * letter-spaced (the app meta step; 11px before 2.452.0). Ink is separate (`RAIL_GROUP_LABEL_INK`) so a dark rail can
 * swap it without fighting class order.
 */
export declare const RAIL_GROUP_LABEL = "text-[12px] font-semibold uppercase leading-4 tracking-wide";

/** The default ink of a group heading. */
export declare const RAIL_GROUP_LABEL_INK = "text-text-secondary";

/** Padding that puts a group heading (20px caret box) on the same 36px pitch. */
export declare const RAIL_GROUP_PAD_Y = "py-2";

/** A count at an item's right edge ("Initiatives 3"): muted, tabular. */
export declare const RAIL_ITEM_COUNT = "text-[12px] font-medium leading-4 tabular-nums text-text-secondary";

/** A rail item's label: 14px (the app body step), medium weight, 20px line. Was 13px before 2.452.0. */
export declare const RAIL_ITEM_TEXT = "text-[14px] font-medium leading-5";

/** Vertical padding that puts a one-line rail row on a 36px pitch (8 + 20 + 8). */
export declare const RAIL_ROW_PAD_Y = "py-2";

/** The one-line row pitch in px, for hosts that cap a list by row count. */
export declare const RAIL_ROW_PITCH = 36;

export declare type RailBand = 'shallow' | 'deep';

export declare function railBand(depth: number): RailBand;

/** The band every `useRailFold` under it remembers its fold in (the host computes it once from `railDepth`). */
export declare function RailBandProvider({ band, children }: {
    band: RailBand;
    children: ReactNode;
}): JSX.Element;

/** The disclosure caret every rail group heading wears: 14px, down when open. */
export declare function RailCaretIcon({ open, className }: {
    open: boolean;
    className?: string;
}): JSX.Element;

/**
 * How deep a route sits under its section: `/iq/projects` 1, `/iq/projects/p-x`
 * 2, `/iq/projects/p-x?item=wi` 3, a page with its side pane exploring a
 * selection +2.
 */
export declare function railDepth(location: {
    pathname: string;
    search?: string;
}, spec?: RailDepthSpec): number;

export declare interface RailDepthSpec {
    /** Leading path segments that name an app/tenant, not a level (`iq`, `admin`). */
    prefixes?: readonly string[];
    /** Query params whose presence opens a record beside the page's list (`item`, `run`): one level. */
    drillParams?: readonly string[];
    /** Routes that are always a record: depth 3 at least. */
    leafRoutes?: readonly RegExp[];
    /**
     * The side pane shows a selection of this page (a record tab, a detail):
     * two levels — the selection, then the pane beside it — unless a drill
     * param already counts the record.
     */
    explored?: boolean;
}

export declare interface RailFold {
    folded: boolean;
    /** Flip the fold and remember the choice in the current band. */
    toggle: () => void;
    /** The band the fold is read from. */
    band: RailBand;
    /** The reader chose this band's fold by hand (it overrides `defaultFolded`). */
    remembered: boolean;
}

/** The storage key a rail's fold is remembered under in a band. */
export declare function railFoldKey(storageKey: string, band: RailBand): string;

export declare function RailLayout({ children, rail, railWidth, variant, className, 'data-testid': testId }: RailLayoutProps): JSX.Element;

export declare interface RailLayoutProps {
    /** The main column. */
    children: ReactNode;
    /** The context rail. Compose with <RailSection>. */
    rail: ReactNode;
    /** Rail width at lg+. Default 'md' (300px). */
    railWidth?: 'sm' | 'md' | 'lg';
    /** Plain record sections, responsive to the available column rather than the viewport. */
    variant?: 'card' | 'plain';
    className?: string;
    'data-testid'?: string;
}

export declare function RailNavList({ items, currentStyle, 'aria-label': ariaLabel, className, 'data-testid': testId, }: RailNavListProps): JSX.Element | null;

export declare interface RailNavListItem {
    id: string;
    label: string;
    /** A link target. Without it the item is a button calling `onSelect`. */
    href?: string;
    /** Called on activation — also for `href` items (the host's router). */
    onSelect?: () => void;
    /** Router interception; keep modified clicks native by checking the event. */
    onNavigate?: (event: MouseEvent_2<HTMLAnchorElement>) => void;
    /** The view on screen. Marked `aria-current="page"`; semibold under `currentStyle="weight"`, tinted (at the rail item's 500 weight) under `"tint"`. */
    current?: boolean;
    /** Muted number at the item's right edge. Absent draws none; 0 shows "0". */
    count?: number;
    /** A glyph before the label. */
    icon?: ReactNode;
    disabled?: boolean;
    /** Tooltip on a disabled item: why it cannot be opened. */
    disabledReason?: string;
}

export declare interface RailNavListProps {
    items: RailNavListItem[];
    /**
     * A tinted current view for a rail that also contains selected records.
     * Since 2.441.0 `tint` marks the current view by its fill alone, like
     * StackedRail and GroupedList rail rows: the title keeps the rail item's
     * 500 weight (the `data-ui-text="rail-item"` profile).
     */
    currentStyle?: 'weight' | 'tint';
    /** The nav landmark's name. Default "Views". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** One titled block in the rail. Sections divide themselves. */
export declare function RailSection({ title, children, className, variant: variantProp }: RailSectionProps): JSX.Element;

export declare interface RailSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
    /** A section used directly in an information pane, without a RailLayout wrapper. */
    variant?: 'card' | 'plain';
}

/** Everything above, as one object — `railType.item`, `railType.groupLabel`… */
export declare const railType: {
    readonly item: "text-[14px] font-medium leading-5";
    readonly rowPadY: "py-2";
    readonly rowPitch: 36;
    readonly itemCount: "text-[12px] font-medium leading-4 tabular-nums text-text-secondary";
    readonly groupLabel: "text-[12px] font-semibold uppercase leading-4 tracking-wide";
    readonly groupLabelInk: "text-text-secondary";
    readonly groupCount: "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary";
    readonly groupPadY: "py-2";
    readonly caption: "text-[12px] font-semibold uppercase tracking-[0.06em]";
    readonly currentFill: "bg-primary/8";
};

/**
 * The text colour that reads on `background`, or `null` when the background
 * can't be parsed. The 0.6 cut is where white-on-fill stops clearing 4.5:1
 * for the palette's own colours; above it, dark text wins.
 */
export declare function readableAvatarForeground(background: string): string | null;

/** The tab and record the URL names, against the registry; the default tab for anything unknown. */
export declare function readPaneState(params: URLSearchParams, tabs: readonly PaneTabSpec[], defaultTab: string, opts?: PaneUrlOptions): PaneState;

/** A stored fold: `collapsed` / `open`, anything else nothing. */
export declare function readRailFold(raw: string | null | undefined): boolean | null;

/** The stored open choice ('1' / '0'), else the default. */
export declare function readSidePaneOpen(stored: string | null | undefined, defaultOpen?: boolean): boolean;

/** A stored ratio inside the bounds, else the default. */
export declare function readSidePaneRatio(stored: string | null | undefined, bounds?: SidePaneBounds): number;

/** A curved arrow forward: "redo". Since 2.386.5. */
export declare function RedoIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type RegisteredLeafSpec = {
    [K in keyof PageSpecLeafKinds]: {
        kind: K;
    } & PageSpecLeafKinds[K];
}[keyof PageSpecLeafKinds];

/**
 * Make an app-defined kind renderable everywhere. Returns an unregister function.
 * The kind must be declared on `PageSpecLeafKinds`, and must not be a built-in kind.
 */
export declare function registerLeafKind<K extends keyof PageSpecLeafKinds>(kind: K, component: PageSpecLeafComponent<K>): () => void;

declare interface RemoteCursor {
    clientId: string;
    position: Record<string, unknown>;
    metadata: Record<string, unknown>;
}

/** One leaf as an element, for composing a spec leaf into JSX. */
export declare function renderLeaf(leaf: LeafSpec, key?: string | number): ReactNode;

/** A leaf list as siblings; `null` when the list renders nothing (so a template's slot stays absent). */
export declare function renderLeaves(list: LeafList | null | undefined): ReactNode;

/** One section: a `PageSection` when titled, else its leaves in a `Stack` (a `SectionStack` when `divided`). */
export declare function renderSection(section: SectionSpec, options?: RenderSectionOptions, key?: string | number): ReactNode;

export declare interface RenderSectionOptions {
    /** The heading size for sections that do not set one. Default `md`. */
    size?: 'md' | 'sm';
}

/** Sections in a `SectionStack`, a hairline between each. `null` when there are none. */
export declare function renderSections(list: SectionList | null | undefined, options?: RenderSectionOptions): ReactNode;

/** Two arrows chasing each other: something that runs again — a loop, a re-run. */
export declare function RepeatIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A hooked arrow pointing back: reply. ForwardIcon's mirror, because the two
 *  are the same gesture pointed different ways. */
export declare function ReplyIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Top-left corner a panel of `width`×`height` occupies at `anchor`. */
export declare function resolveAnchorPosition(anchor: FloatingPanelAnchor, width: number, height: number): {
    x: number;
    y: number;
};

/**
 * Resolve `tone` for a surface mounted at `el`. Pure apart from the DOM read and
 * the media query, so it is the thing the tests pin.
 */
export declare function resolveBackdropTone(tone: BackdropTone, el: Element | null, prefersDark?: boolean): ResolvedBackdropTone;

/** A tone after `auto` has been decided. */
export declare type ResolvedBackdropTone = Exclude<BackdropTone, 'auto'>;

export declare interface ResolveVerdictInput {
    verdict?: ChangeReviewVerdict | undefined;
    status?: ChangeReviewStatus | undefined;
    /**
     * The revision of the change as it stands NOW. When this and the verdict's
     * `forRevision` disagree, the verdict describes a change that no longer
     * exists in that form.
     */
    revision?: string | undefined;
}

/**
 * Decide which of the five states to paint.
 *
 * The staleness rule is the reason this function exists. A cached "Pass"
 * computed against an earlier draft of a change is not a weaker Pass — it is a
 * statement about a different change, and showing it as a live Pass is how a
 * reviewer approves something no agent ever looked at. So the comparison is
 * exact-match on `forRevision`, and any disagreement demotes to `stale`.
 *
 * `pending` outranks `stale`: if a fresh review is already in flight, "checking
 * this now" is more useful than "the old answer is out of date", and the
 * pending state does not show the old verdict's colour either way.
 *
 * A missing `revision` means the host cannot tell us what the change's current
 * revision is. We do NOT silently treat that as fresh — but we also cannot call
 * it stale without evidence, so it renders `ready`. Hosts that care about
 * staleness must pass `revision`; that is documented on every consumer prop.
 */
export declare function resolveVerdictState({ verdict, status, revision, }: ResolveVerdictInput): VerdictState;

export declare function ResumeCallDialog({ open, onClose, onReconnect, callerName, lobbyName, elapsedMs, participants, loading, }: ResumeCallDialogProps): JSX.Element;

export declare interface ResumeCallDialogProps {
    /** Visibility — when false the modal is unmounted entirely. */
    open: boolean;
    /** Backdrop click / Esc / Dismiss button → caller decides whether to
     *  hide (typically yes) and whether to remember the dismissal. */
    onClose: () => void;
    /** Reconnect button. May be async; the dialog spins while pending
     *  IF `loading` is also true (the caller controls that state). */
    onReconnect: () => void | Promise<void>;
    /** Display name of the user who originally started the call. Pass
     *  safeDisplayName output — must never be a raw UUID. */
    callerName: string;
    /** Human-readable lobby name shown in the dialog subtitle. */
    lobbyName: string;
    /** Elapsed ms at MOUNT time. The dialog re-derives the displayed
     *  duration from a per-second tick so the parent never has to re-
     *  render to advance the clock. Pass `Date.now() - call.startedAtMs`
     *  (or just `call.durationMs` from the API). */
    elapsedMs: number;
    /** Other participants currently in the call (excludes self). When
     *  empty the dialog still renders — the prompt becomes
     *  "you were in a call" with no chip row — but the parent should
     *  generally not show the dialog with zero participants (see
     *  useActiveCallResume's filter). */
    participants: ResumeCallParticipant[];
    /** True while a reconnect attempt is in flight. Disables the buttons
     *  and replaces the Reconnect label with "Reconnecting…". */
    loading?: boolean;
}

/** Resume-dialog participant shape. Independent of any hangout-internal
 *  type so callers can pass thin {id,name} objects without dragging in
 *  PresenceUser / SfuParticipant. */
export declare interface ResumeCallParticipant {
    /** Stable identifier — used as React key + safeDisplayName fallback. */
    userId: string;
    /** Pre-resolved display name. Caller MUST pass safeDisplayName output
     *  so a raw UUID never reaches the dialog. */
    name: string;
    /** Optional avatar URL — Avatar falls back to initials when absent. */
    avatarUrl?: string;
}

export declare const REVIEW_KIND_LABELS: Record<string, string>;

export declare const REVIEW_KIND_TONES: Record<string, ToneOrAlias>;

export declare type ReviewAuthorKind = 'agent' | 'human';

export declare interface ReviewPostData {
    id: string;
    authorKind: ReviewAuthorKind;
    authorName: string;
    /** Profile image supplied by the authorized people data source. */
    avatarUrl?: string;
    /** Post kind slug — e.g. 'problem' | 'question' | 'decision'. */
    kind: string;
    body: string;
    /** For 'question' posts: true once answered. An unresolved question is the
     *  thread's live HITL gate and renders highlighted with a composer. */
    resolved?: boolean;
    /** What the author produced — a browser screenshot, diagram, document. */
    artifact?: {
        name: string;
        type?: string;
        url?: string | null;
    } | null;
    /** Preformatted timestamp, e.g. "4d ago". */
    timeLabel?: string;
}

export declare function ReviewThread({ variant, posts, onAnswer, answerBusy, answerPlaceholder, answerLabel, kindLabels, kindTones, emptyLabel, className, 'data-testid': testId, }: ReviewThreadProps): JSX.Element;

export declare interface ReviewThreadProps {
    /** Plain, divided posts inside a record; the default retains the standalone card. */
    variant?: 'card' | 'inline';
    posts: ReviewPostData[];
    /** Answer an open question. Omit to render read-only (terminal threads). */
    onAnswer?: (postId: string, body: string) => void;
    answerBusy?: boolean;
    answerPlaceholder?: string;
    /** The submit label — say what answering does, e.g. "Answer & continue". */
    answerLabel?: string;
    /** Merge/override the built-in kind vocabulary. */
    kindLabels?: Record<string, string>;
    kindTones?: Record<string, ToneOrAlias>;
    /** Shown when the thread has no posts yet. */
    emptyLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare const RICH_HEADER_CONTENT: readonly HeaderContentKind[];

export declare function RippleGridBackground({ active, enableRainbow, gridColor, rippleIntensity, gridSize, gridThickness, fadeDistance, vignetteStrength, glowIntensity, opacity, edgeFade, gridRotation, mouseInteraction, mouseInteractionRadius, lightMode, pixelRatio, className, 'data-testid': testId, }: RippleGridBackgroundProps): JSX.Element;

export declare interface RippleGridBackgroundProps {
    /** False parks the loop on a static frame without tearing the context down. */
    active?: boolean;
    enableRainbow?: boolean;
    gridColor?: string;
    rippleIntensity?: number;
    gridSize?: number;
    gridThickness?: number;
    fadeDistance?: number;
    vignetteStrength?: number;
    glowIntensity?: number;
    opacity?: number;
    /**
     * How much of the edge fade (`fadeDistance` + `vignetteStrength`) to apply,
     * 0..1. At 1 (default, ReactBits' look) the grid fades to nothing at the
     * section's corners; at 0 it is drawn edge to edge at full strength. The
     * fade is measured against the SECTION — its corners are always where it
     * ends — so a wide or tall box gets the same soft edge as a square one
     * rather than an oval in the middle.
     */
    edgeFade?: number;
    /** Degrees. */
    gridRotation?: number;
    mouseInteraction?: boolean;
    mouseInteractionRadius?: number;
    /** Grid lines in `gridColor` on a light ground, rather than glowing on dark. */
    lightMode?: boolean;
    pixelRatio?: number;
    className?: string;
    'data-testid'?: string;
}

/**
 * Renders `children` over a rising star field while `active`, and over nothing
 * at all when not.
 *
 * The backdrop is `pointer-events: none` and sits BEHIND the children in an
 * isolated stacking context, so nothing above it changes position, size or
 * hit-testing when the state flips — a working surface and an idle one have
 * identical layout, which is what makes the transition a crossfade rather than
 * a reflow.
 */
export declare function RisingParticles({ active, intensity, seed, className, children, 'data-testid': testId, }: RisingParticlesProps): JSX.Element;

export declare type RisingParticlesIntensity = keyof typeof INTENSITY_SCALE;

export declare interface RisingParticlesProps {
    /** True while the thing behind this surface is working. */
    active: boolean;
    /**
     * How dense the sky is. `low` for a small pane where a full field reads as
     * noise; `high` for a surface that IS the working state.
     */
    intensity?: RisingParticlesIntensity;
    /**
     * The sky. The same seed is always the same sky, so a pane keeps its own
     * stars across re-renders and two panes side by side do not look cloned.
     */
    seed?: number;
    className?: string;
    children?: ReactNode;
    'data-testid'?: string;
}

declare interface RoomItem {
    roomId: string;
    /** `room:<slug>` — a room's chat channel is its call lobby. */
    channelId: string;
    /** As sent by the API; `channelId` is derived from it when absent. */
    slug?: string;
    name: string;
    type: 'standalone' | 'group' | 'dm';
    ownerId: string;
    groupId?: string;
    dmPeerUserId?: string;
    createdAt: string;
}

export declare function RovingToolbar({ label, children, orientation, className, 'data-testid': testId, }: RovingToolbarProps): default_2.JSX.Element;

export declare interface RovingToolbarProps {
    /** Accessible name — a toolbar without one is an unlabelled group. */
    label: string;
    children: ReactNode;
    /** Arrow keys that move. Vertical leaves Left/Right alone, and vice versa. */
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    'data-testid'?: string;
}

/**
 * Header state labels. PLAN §1.6 names the draft states; the mockup's
 * "Not started" is not used because it is ambiguous between "no draft yet"
 * and "saved but not dispatched" — those are `no-draft` and `saved` here.
 */
export declare const RUN_DRAFT_STATUS_LABELS: Record<RunDraftStatus, string>;

export declare type RunDraftBudget = RunDraftTokenBudget | RunDraftUsdBudget;

export declare function RunDraftPanel({ status, collapsed: collapsedProp, defaultCollapsed, onCollapsedChange, target, sources, sourcesLabel, fields, cost, duration, confidence, budget, advanced, advancedLabel, access, onSave, saveDisabledReason, saving, onDispatch, dispatchDisabledReason, error, live, footnote, className, 'data-testid': testId, }: RunDraftPanelProps): JSX.Element;

export declare interface RunDraftPanelProps {
    status: RunDraftStatus;
    /** Controlled collapse. Omit to let the panel own it. */
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    /** The chosen workflow. `null` shows "No workflow chosen"; `undefined` shows nothing. */
    target?: RunDraftTarget | null;
    /** The documents the run will read. Empty, `null` or omitted → no section. Stays visible when `live` is shown. */
    sources?: readonly RunDraftSourceItem[] | null;
    /** Header for the sources list; default "Sources". */
    sourcesLabel?: string;
    fields?: RunDraftSelectField[];
    cost?: RunEstimate;
    duration?: RunEstimate;
    confidence?: RunEstimateConfidence | null;
    budget?: RunDraftBudget | null;
    advanced?: ReactNode;
    advancedLabel?: string;
    access?: AccessNoticeProps | null;
    onSave?: () => void;
    saveDisabledReason?: string;
    saving?: boolean;
    onDispatch?: () => void;
    dispatchDisabledReason?: string;
    /** Shown verbatim, e.g. the dispatch route's 403 message. */
    error?: string | null;
    /** After dispatch: the live run (an `AgentTaskCard`). Replaces the form body. */
    live?: ReactNode;
    /** Defaults to "Nothing runs until you authorize it."; pass `null` to hide. */
    footnote?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface RunDraftSelectField {
    id: string;
    label: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    /** Disables the select and says why (e.g. "This pipeline sets its own model"). */
    disabledReason?: string;
    placeholder?: string;
}

/** A document the run will read, shown as a chip under the target. */
export declare interface RunDraftSourceItem {
    id: string;
    /** What the viewer may see: the document title, or the host's "Restricted item" for one they cannot read. */
    title: string;
    /** A file-kind mark (e.g. <FileKindMark kind="page" size="sm" />); omit for a restricted item. */
    mark?: ReactNode;
    /** The viewer cannot read it: neutral styling, no link, no mark. */
    restricted?: boolean;
    /** Opens the source; absent (or restricted) → not interactive. */
    onOpen?: () => void;
}

export declare type RunDraftStatus = 'no-draft' | 'unsaved' | 'saved' | 'dispatching' | 'running' | 'completed' | 'failed' | 'stopped';

export declare interface RunDraftTarget {
    mark?: ReactNode;
    title: string;
    subtitle?: string;
}

export declare interface RunDraftTokenBudget {
    /** Omitted or `'tokens'`: a token budget. */
    unit?: 'tokens';
    /** The enforced token budget; `null` = none set. */
    tokens: number | null;
    onChange: (tokens: number | null) => void;
    /** Price used for the derived "≈ $x" line. Omit or `null` when unknown — the line is then not shown. */
    usdPerMillionTokens?: number | null;
    /** Names the price basis: "Haiku" → "at Haiku prices". */
    priceLabel?: string;
    disabledReason?: string;
}

/** A dollar cap the host enforces (e.g. "don't start the run if it is forecast over $x"). */
export declare interface RunDraftUsdBudget {
    unit: 'usd';
    /** The cap in dollars; `null` = none set. */
    usd: number | null;
    onChange: (usd: number | null) => void;
    /** What the cap does, in the host's words — "Not started if forecast above this". */
    hint?: string;
    disabledReason?: string;
}

export declare type RunEstimate = {
    kind: 'range';
    low: number;
    high: number;
    unit: RunEstimateUnit;
} | {
    kind: 'none';
    reason: string;
} | {
    kind: 'loading';
};

export declare interface RunEstimateConfidence {
    /** How many completed runs the estimate is based on. */
    sampleSize: number;
    /**
     * Where the range came from. `runs` (default) — measured history, so zero
     * runs means no estimate and the range is replaced by "No prior runs".
     * `prior` — a stated bracket the host stands behind without history (a
     * per-tier prior); the range is shown and marked low confidence.
     */
    basis?: 'runs' | 'prior';
}

export declare type RunEstimateConfidenceLevel = 'none' | 'low' | 'medium' | 'high';

export declare type RunEstimateUnit = 'usd' | 'ms';

export declare function RunProgressPanel({ title, description, state, progress, elapsedMs, startedAt, remainingMs, onRefresh, refreshLabel, onCancel, cancelLabel, cancelQuestion, nonBlocking, nonBlockingHint, facts, framed, now, className, 'data-testid': testId, }: RunProgressPanelProps): JSX.Element;

export declare interface RunProgressPanelProps {
    /** What is running, as a heading: "Generating 3D mesh". */
    title: ReactNode;
    /** One sentence: "Meshy is generating a stylized mesh from the approved concept. You can continue working while this runs." */
    description?: ReactNode;
    /** Default `running`. Cancel shows only while `queued` or `running`. */
    state?: RunProgressState;
    /** 0–100. Omit while the provider reports no percentage: the bar is then left out, not faked. */
    progress?: number;
    /** Elapsed time, when the host already knows it. Wins over `startedAt`. */
    elapsedMs?: number;
    /** When the job started (ISO string or epoch ms): elapsed is counted live from it while the job runs. */
    startedAt?: string | number;
    /** The host's estimate of the time left. Shown as "~1m 45s". */
    remainingMs?: number;
    /** "Refresh status": re-read the provider. Omit to leave the button out. */
    onRefresh?: () => void;
    /** Default "Refresh status". */
    refreshLabel?: string;
    /** "Cancel job": confirmed in place. A returned promise keeps it busy. Omit to leave it out. */
    onCancel?: () => void | Promise<unknown>;
    /** Default "Cancel job". */
    cancelLabel?: string;
    /** Default "Cancel this job?". */
    cancelQuestion?: string;
    /** Show the "Non-blocking" chip. Default true. */
    nonBlocking?: boolean;
    /** The chip's tooltip. Default "You can keep working while this runs." */
    nonBlockingHint?: string;
    /** More facts beside Elapsed and Est. remaining ("Attempt 2 of 3"). */
    facts?: KeyValueItem[];
    /** Draw the panel on its own card surface. Default true; false when it sits inside a card already. */
    framed?: boolean;
    /** Clock source for the live elapsed count; for tests. Default `Date.now`. */
    now?: () => number;
    className?: string;
    'data-testid'?: string;
}

export declare type RunProgressState = 'queued' | 'running' | 'done' | 'failed' | 'cancelled';

export declare function ScopeHeader(props: ScopeHeaderProps): JSX.Element;

export declare interface ScopeHeaderPeopleGroup {
    /** "Owner". Rendered small and uppercase before the avatars. */
    label: string;
    people: PresenceAvatarUser[];
}

export declare interface ScopeHeaderProgress {
    done: number;
    total: number;
    /** The noun after the numbers. Default "points". */
    unit?: string;
    /** The verb. Default "delivered". */
    verb?: string;
}

export declare interface ScopeHeaderProps {
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

export declare interface ScopeHeaderTab {
    id: string;
    label: string;
    /** Shown muted after the label. Absent or `undefined` shows none; `0` shows "0". */
    count?: number;
    disabled?: boolean;
    /** Since 2.388.0: a small dot after the label (and count). Absent or `false`-y draws none. */
    dot?: ScopeHeaderTabDot;
}

/**
 * A tab's attention dot. `true` is the brand dot ("something new"); a tone
 * says what kind of attention — "Activity •" when a tier is behind.
 */
export declare type ScopeHeaderTabDot = 'warning' | 'danger' | 'info' | true;

/**
 * Horizontal progress-bar gauge for 0..1 scores. Used by the judge
 * composites for per-criterion + overall scores, but generic enough to be
 * reused elsewhere (rate-limit budget, processing progress, etc.).
 *
 * a11y: rendered with `role="meter"`, `aria-valuenow / -valuemin / -valuemax`.
 */
export declare function ScoreBarGauge({ value, threshold, tone, size, showLabel, formatLabel, ariaLabel, className, }: ScoreBarGaugeProps): JSX.Element;

export declare interface ScoreBarGaugeProps {
    /** 0..1 value. Out-of-range inputs are clamped, NaN renders an empty gauge. */
    value: number;
    /** Threshold at which the gauge flips from "below threshold" tone to "above". 0..1, default 0.5. */
    threshold?: number;
    /** Override tone selection; otherwise derived from `value` vs `threshold`. */
    tone?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    /** Default 'md'. */
    size?: 'sm' | 'md' | 'lg';
    /** Render the percentage label inline (right-aligned). Default true. */
    showLabel?: boolean;
    /** Custom label formatter — receives the clamped 0..1 value. Default: percent. */
    formatLabel?: (value: number) => string;
    /**
     * aria-label override. When omitted, the component synthesizes a label
     * from value + threshold + pass state.
     */
    ariaLabel?: string;
    className?: string;
}

/**
 * A magnifier: "search", or "nothing matched what you typed".
 *
 * The same geometry `SearchInput` draws inline in its own gutter, lifted out
 * because the empty state that follows a fruitless search needs the mark too
 * and had been reaching for the 🔍 emoji — which ignores `currentColor` and so
 * stayed bright on muted chrome. Two copies of one circle-and-tail is a
 * drift the type system cannot see, so the field should adopt this next time
 * that file is opened.
 */
export declare function SearchIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function SearchInput({ value, onChange, placeholder, onClear, tone, className, inputClassName, size, onKeyDown, style, autoFocus, 'aria-label': ariaLabel, 'data-testid': testId, collapsible, defaultExpanded, shortcut, onExpandedChange, }: SearchInputProps): default_2.JSX.Element;

export declare interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    /** Called after the value is cleared via the clear button. */
    onClear?: () => void;
    /**
     * Colour family. `surface` (default) follows the host theme; `code` paints
     * in the permanently-dark terminal palette.
     *
     * This prop exists because `className` lands on the WRAPPER — the input is
     * a child, so no caller-supplied class could ever reach the field itself,
     * and a SearchInput dropped into a dark panel stayed a white box.
     */
    tone?: SearchInputTone;
    /** Class for the wrapper. Sizing and positioning; not the field's colours. A collapsed `collapsible` field (the icon) ignores it. */
    className?: string;
    /**
     * `sm` (default) is the 13px field. `md` (2.386.3) is the Documents
     * explorer's: a 36px field, 14px text (15px until 2.407.18 — off the type scale) and an 18px glass. `lg` (2.389.6) is
     * a page's primary search: a 44px field, 16px text, a 20px glass and a
     * larger clear ×.
     */
    size?: 'sm' | 'md' | 'lg';
    /** Keys on the field — e.g. ArrowDown into a result list. Since 2.389.6. */
    onKeyDown?: (event: default_2.KeyboardEvent<HTMLInputElement>) => void;
    /** Class for the `<input>` itself — the one `className` cannot reach. */
    inputClassName?: string;
    style?: default_2.CSSProperties;
    autoFocus?: boolean;
    'aria-label'?: string;
    /**
     * Addresses the `<input>` itself, not the wrapper.
     *
     * Without it a caller who needs to drive this field from a test had no way
     * to name it: `className` lands on the wrapper, and the accessible name is
     * the placeholder, which changes whenever the copy does. The app's document
     * list ended up wrapping SearchInput in a bare div purely to hang a testid
     * on it — a hand-rolled element around a library component, which is the
     * shape this library exists to remove.
     */
    'data-testid'?: string;
    /**
     * Since 2.504.0 — a toolbar search. While collapsed the field is a search
     * `IconButton` (named by `aria-label`/`placeholder`); a click, or the
     * `shortcut` key anywhere outside a text field, expands it and focuses the
     * input. It collapses again on Escape or blur while empty, and never while
     * it holds a value — a filtered list must always show what filters it.
     */
    collapsible?: boolean;
    /** Start expanded (collapsible only). The field still collapses on Escape/blur when empty. */
    defaultExpanded?: boolean;
    /** The key that expands a collapsed field. Default `/`; `false` disables it. */
    shortcut?: string | false;
    /** Told when a collapsible field expands or collapses. */
    onExpandedChange?: (expanded: boolean) => void;
}

/** @see SurfaceTone — which colour family the field paints in. */
export declare type SearchInputTone = SurfaceTone;

/** `SearchInput` (`collapsible` for a header search). */
export declare interface SearchLeaf extends Omit<SearchInputProps, 'className' | 'style' | 'inputClassName'> {
    kind: 'search';
}

/**
 * Host search. Must honour `signal` (the palette aborts it when the query
 * changes or the palette closes). Reject to show the palette's error row.
 */
export declare type SearchPaletteRecords = (query: string, options: {
    signal: AbortSignal;
}) => Promise<PaletteRecordGroup[]>;

export declare function SectionLabel({ children, as: As, case: textCase, className, 'data-testid': testId, }: SectionLabelProps): JSX.Element;

/**
 * `upper` — the 11px bold uppercase panel caption (default) — the same step
 * as a rail's group heading (`RAIL_GROUP_LABEL`), so every caps label on a
 * screen is one size (10px until 2.407.14).
 * `sentence` — a 12px medium sentence-case caption at normal tracking, sized
 * and weighted to match `FormField`'s own label so it sits level with the
 * other labels in a config form.
 */
declare type SectionLabelCase = 'upper' | 'sentence';

export declare interface SectionLabelProps {
    children: ReactNode;
    /** Letter case and weight. See `SectionLabelCase`. Default `upper`. */
    case?: SectionLabelCase;
    /**
     * The element to render. Defaults to `span` so it can sit inline beside a
     * count or a chip; pass `"div"` when the caption owns its own line.
     */
    as?: ElementType;
    className?: string;
    'data-testid'?: string;
}

/**
 * Use this when a page lives in a sectioned area: the section rail on the left, optionally the page's list as a second rail, and the content column (trail row, title band, a body whose command composer docks at the column's bottom), filling the viewport.
 *
 * Without `header`, the children are the column: pass a page template (`PageFrame`, `DetailPage`, `CollectionPage`).
 *
 * @example
 * <SectionLayout title="Observability" items={sectionItems} renderNavItem={navLink}
 *   railFold={{ folded: rail.folded, onToggle: rail.toggle }}
 *   list={{ label: 'runs', title: 'Runs', count: runs.length, body: <GroupedList … /> }}
 *   header={{ breadcrumbs: trail, title: 'Runs', trailControls: <Select … /> }}
 *   footer={<CollectionCommandHost inPlace … />}>
 *   <RunRecord run={run} />
 * </SectionLayout>
 */
export declare function SectionLayout({ title, items, renderNavItem, storageKey, railWidth, titleAction, railHeader, railContent, railLabel, railFold, secondary, list, listFold, listRailWidth, narrow, aside, header, body, gutter, footer, fill, bottomGap, contentLabel, bodyClassName, children, className, 'data-testid': testId, }: SectionLayoutProps): JSX.Element;

/** A rail's fold, as `useRailFold` returns it. */
export declare interface SectionLayoutFold {
    folded: boolean;
    onToggle: () => void;
}

/** The content column's header: the trail row, and the view's title band under it. */
export declare interface SectionLayoutHeader extends PageTemplateTrailProps {
    breadcrumbs?: BreadcrumbItem[];
    /** The view's title (rule: the view's name, not the record's). Omitted: the trail row alone. */
    title?: string;
    description?: string;
    badge?: ReactNode;
    actions?: ReactNode;
    /** Default `h1`. */
    titleAs?: 'h1' | 'h2' | 'h3';
    /** Default `compact`. */
    density?: Density;
}

/**
 * The narrow form of a sectioned page (since 2.515.5). Under 40rem of the
 * frame's own width the section rail gives the content the whole width and
 * its items become one row of links over it (`SubNavLayout narrow`); with
 * `list`, the list rail and the content column stop sitting side by side as
 * well (`ListRailLayout narrow`): `showing: 'list'` draws the list at the
 * full width, `showing: 'record'` the column under a back control.
 */
declare interface SectionLayoutNarrow {
    /** The list rail's narrow form; only with `list`. */
    list?: ExplorerNarrow;
}

export declare interface SectionLayoutProps {
    /** The section's name: the section rail's caption and the region names. */
    title: string;
    /** The section rail's items. */
    items: SubNavItem[];
    /** Router integration for the rail's links (a `NavLink`, `activeNavItemClassName`). */
    renderNavItem?: SubNavLayoutProps['renderNavItem'];
    /** Remembered group folds in the rail. */
    storageKey?: string;
    /** Section rail width, px. Default 220. */
    railWidth?: number;
    /** A control in the rail's caption row (kept on the folded strip). */
    titleAction?: ReactNode;
    /** Under the caption row: a scope selector. */
    railHeader?: ReactNode;
    /** Replaces the item list (a combined `RailNavList`, a tree). */
    railContent?: ReactNode;
    /** The rail's accessible name. Default "<title> navigation". */
    railLabel?: string;
    /** The section rail's fold (`useRailFold`): folds to a 44px strip holding its » control. */
    railFold?: SectionLayoutFold;
    /** A second section rail between the first and the content. */
    secondary?: {
        title?: string;
        items: SubNavItem[];
        storageKey?: string;
        railWidth?: number;
    };
    /** The section page's own list, as a flush list rail beside the section rail (`ListRailLayout`). */
    list?: ListRail;
    /** The narrow form (since 2.515.5): `{}` for the section rail's one-row form, `{ list }` for the list rail's too. Omitted: unchanged at every width. */
    narrow?: SectionLayoutNarrow;
    /** The list rail's fold («/» on the rail). */
    listFold?: SectionLayoutFold;
    /** List rail width; default `ms` (264px). */
    listRailWidth?: ListRailLayoutProps['railWidth'];
    /** Right of the content column (a `ContextColumn`); list layouts only. */
    aside?: ReactNode;
    /** Given, the layout draws the content column's trail row and title band. Omitted, the children draw their own (a page template). */
    header?: SectionLayoutHeader;
    /** `scroll` (default): the body scrolls over the dock. `fill`: a fixed frame whose panes scroll (a canvas + inspector). */
    body?: 'scroll' | 'fill';
    /** The body's inset. Default `page` (`--ui-page-gutter`); `none` for a canvas or conversation that owns its gutters. */
    gutter?: PageGutter;
    /** Docked at the content column's bottom, spanning it: the section's command composer. A `ColumnDock` in the body lands there too. */
    footer?: ReactNode;
    /** `viewport` (default): the frame fills from its top to the window's bottom (`ViewportFillRegion`). `parent`: `h-full` (an AppShell fill region). */
    fill?: 'viewport' | 'parent';
    /** `fill="viewport"`: space kept under the frame, px. Default 0. */
    bottomGap?: number;
    /** The content region's accessible name. Default "<title> workspace". */
    contentLabel?: string;
    /** Extra classes for the body region. */
    bodyClassName?: string;
    children: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** A list of sections. `false`/`null`/`undefined` entries are skipped. */
export declare type SectionList = ReadonlyArray<SectionSpec | false | null | undefined>;

/**
 * A titled block (`PageSection`); sections stack in a `SectionStack` with a
 * hairline between each. Untitled, the body renders as a plain `Stack`.
 */
export declare interface SectionSpec {
    id?: string;
    title?: string;
    description?: string;
    /** A count chip beside the title (hidden at zero). */
    count?: number;
    /** The section has nothing to show: one quiet line beside the title. */
    empty?: string;
    actions?: LeafList;
    body: LeafList;
    /** A hairline between the body's leaves. */
    divided?: boolean;
    /** Heading size. Default `md` (`sm` inside detail tabs). */
    size?: 'md' | 'sm';
}

export declare function SectionStack({ children, density: densityProp, divided, as, className, ref, ...rest }: SectionStackProps): JSX.Element;

export declare interface SectionStackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    /** The sections — typically `PageSection`s, or any block. Null/false children are skipped. */
    children?: ReactNode;
    /**
     * Vertical rhythm. `comfortable`: 24px either side of each rule. `compact`:
     * 16px. Unset, follows the nearest `DensityProvider` (comfortable without one).
     */
    density?: Density;
    /** Draw a rule between sections. `false` keeps the spacing, no rule. Default `true`. */
    divided?: boolean;
    /** Container element. Default `div`; `section` when the stack is itself a landmark region. */
    as?: 'div' | 'section';
    ref?: Ref<HTMLElement>;
    'data-testid'?: string;
}

export declare function SegmentedControl({ options, value, onChange, size: sizeProp, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, disabled, fullWidth, tone, iconOnly, className, 'data-testid': testId, }: SegmentedControlProps): JSX.Element;

export declare interface SegmentedControlProps {
    options: SegmentOption[];
    value: string;
    onChange: (value: string) => void;
    size?: 'sm' | 'md';
    /**
     * What the whole group is FOR.
     *
     * `role="group"` with no name announces as a bare "group", so a reader
     * arriving at Editing / Suggesting / Viewing is told three unrelated toggle
     * buttons rather than one setting with three values. Optional because every
     * existing caller sits under a heading that already says it; new callers on
     * a bare toolbar should pass it.
     */
    'aria-label'?: string;
    /**
     * The element that already says what the group is for — a `FormField`'s
     * label, typically, via the `labelId` it hands its render prop. Prefer this
     * over `aria-label` inside a form: it keeps ONE copy of the wording, so the
     * visible label and the announced one cannot drift apart. Same wiring
     * `Switch` takes.
     */
    'aria-labelledby'?: string;
    /** Every segment disabled — used while a form that owns it is saving. */
    disabled?: boolean;
    /** Stretch the group and share its width equally between the segments. */
    fullWidth?: boolean;
    /**
     * `neutral` (default): a raised white segment on an inset track.
     * `accent` (2.391.1): a flat track on the surface and the chosen segment in
     * the brand's soft fill and text — the start-a-call Video | Audio switch.
     */
    tone?: 'neutral' | 'accent';
    /**
     * Icon-only segments (since 2.434.0): each option shows its `icon`, its
     * `label` becomes the button's accessible name and a hover/focus tooltip.
     * For a compact view switcher on a pane's header row — Chat / Pinned /
     * Files / Calls beside a pane's own tabs — where a second labelled row
     * would stack two tab bars. Options without an icon fall back to the label.
     */
    iconOnly?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
    /**
     * A count or marker after the option (since 2.434.0) — "Pinned 3". With
     * `iconOnly` it sits as a small superscript count on the icon, and the
     * option's accessible name carries it ("Pinned, 3").
     */
    badge?: ReactNode;
    /** `data-testid` for this option's button; overrides `<data-testid>-<value>`. */
    testId?: string;
}

export declare const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLButtonElement>>;

export declare function SelectableCard({ children, selected, onSelect, padding, disabled, className, ...rest }: SelectableCardProps): JSX.Element;

export declare type SelectableCardPadding = 'sm' | 'md' | 'lg';

export declare interface SelectableCardProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect' | 'children' | 'type'> {
    children?: ReactNode;
    /** Draws the selected chrome and sets `aria-pressed`. */
    selected?: boolean;
    /** Fired on click. Named `onSelect` so callers read as pickers, not buttons. */
    onSelect?: () => void;
    /** Default `sm` (12px) — these sit in dense grids, unlike Card's 24px `md`. */
    padding?: SelectableCardPadding;
}

export declare function SelectionBar({ count, label, description, thumbnail, controls, onClear, clearLabel, reject, secondary, primary, 'aria-label': ariaLabel, className, 'data-testid': testId, }: SelectionBarProps): JSX.Element;

export declare interface SelectionBarAction {
    label: string;
    /** Fired on press, or on Confirm when `question` is given. A returned promise keeps it busy. */
    onAction: () => void | Promise<unknown>;
    /** Ask in place before acting ("Approve concept 03?"). Omit for an immediate action. */
    question?: string;
    /** The confirming button's label. Default: `label`. */
    confirmLabel?: string;
    /** What the decision is, for the audit: `approve` (default for the primary), `spend`, `reject`. */
    actionKind?: ConfirmActionKind;
    disabled?: boolean;
    busy?: boolean;
}

export declare interface SelectionBarProps {
    /** How many candidates are chosen. 0 shows "Nothing selected" and disables the primary. */
    count: number;
    /** The chosen candidate's name, for one pick: "Concept 03". The bar reads "Selected: Concept 03". */
    label?: ReactNode;
    /** A quieter line under it: "Toby · Main character · v1.0". */
    description?: ReactNode;
    /** The chosen candidate's picture (one pick). */
    thumbnail?: {
        src: string;
        alt?: string;
    };
    /** Controls that shape the pick: a slicing `Select`, `Switch`es. Library form controls only. */
    controls?: ReactNode;
    /** "Clear": drops the selection. Omit to leave it out. */
    onClear?: () => void;
    clearLabel?: string;
    /** "Reject": a destructive decision on the chosen candidates, confirmed in place when it has a `question`. */
    reject?: SelectionBarAction;
    /** One secondary ("Select character": keep the pick as a draft). */
    secondary?: SelectionBarAction;
    /** The one primary ("Approve"). */
    primary?: SelectionBarAction;
    /** The region's accessible name. Default "Selection". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** The platform `<select>`, opt-in, with the reason it is needed (the DOM audit reads it). */
declare interface SelectNative {
    reason: string;
}

export declare interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    /** A 12/400 second line under the label in the open list. */
    description?: string;
    /** A small leading glyph in the open list (and the closed field). */
    icon?: ReactNode;
}

export declare interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}

export declare interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'multiple'> {
    options: SelectOption[];
    /** Optional labelled option groups, rendered after the flat `options`. */
    groups?: SelectOptionGroup[];
    /** Shown in the field when no value is selected (never an option). */
    placeholder?: string;
    size?: SelectSize;
    /** Shape. See `SelectVariant`. Default `default`. */
    variant?: SelectVariant;
    /**
     * Semantic tone for `variant="pill"` — the capsule paints in that tone's
     * soft surface (`-bg` / `-fg` / `-border`). Ignored by the other variants.
     * Default `neutral`.
     */
    tone?: ToneOrAlias;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /** Extra classes for the trigger (kept for call sites that styled the old wrapper). */
    wrapperClassName?: string;
    /**
     * @deprecated since 2.445.0 — the field always draws the library chevron.
     * Accepted and ignored so existing call sites compile.
     */
    chevron?: 'native' | 'custom';
    /**
     * Custom content for the closed field (the trigger), e.g. "Priority: [chip]".
     * Receives the selected option (undefined when none). The open list still
     * draws the options themselves. Default: the selected option's icon + label.
     */
    renderValue?: (selected: SelectOption | undefined) => ReactNode;
    /** Render the library `Combobox`: a typed filter over the same options. */
    searchable?: boolean;
    /** Placeholder for the `searchable` filter. Default "Search". */
    searchPlaceholder?: string;
    /**
     * Render the platform `<select>` instead, with the reason it is needed.
     * Marked `data-ui-native-select` / `data-ui-native-reason`.
     */
    native?: SelectNative;
    'data-testid'?: string;
}

export declare type SelectSize = 'sm' | 'md';

/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change. `ghost`
 * (2.385.0) is the value side of a label/value row — no box, the value
 * right-aligned with the chevron after it, a hover tint to say it can be
 * changed ("Model   Haiku ▾" in a run panel).
 */
declare type SelectVariant = 'default' | 'pill' | 'ghost';

/** A paper plane: "send" — the light prompt box's Send ("✈ Send"). Since 2.390.0. */
export declare function SendIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Wireframe on (or off) for every mesh material of the model. Returns false when the scene is unreachable. */
export declare function setModelWireframe(el: unknown, on: boolean): boolean;

export declare function SettingsLayout({ title, subtitle, sections, activeSectionId, onSectionChange, dirty, saveLabel, cancelLabel, onSave, onCancel, saving, saveBarSlot, railWidth, narrow, className, style, 'data-testid': testId, }: SettingsLayoutProps): JSX.Element;

export declare interface SettingsLayoutProps {
    /** Page title shown above the rail. */
    title: ReactNode;
    /** Optional secondary line under the title. */
    subtitle?: ReactNode;
    /** Section list. The first section is selected by default. */
    sections: SettingsSection[];
    /** Currently active section id (controlled). When omitted, uncontrolled. */
    activeSectionId?: string;
    /** Notified when the user picks a section. */
    onSectionChange?: (id: string) => void;
    /**
     * When true (or non-null), shows the sticky save bar.
     * The bar exposes Save + Cancel buttons.
     */
    dirty?: boolean;
    /** Save button label. Default "Save changes". */
    saveLabel?: ReactNode;
    /** Cancel button label. Default "Cancel". */
    cancelLabel?: ReactNode;
    /** Save click handler. */
    onSave?: () => void;
    /** Cancel click handler. */
    onCancel?: () => void;
    /** When true, the save button shows a saving state. */
    saving?: boolean;
    /** Optional extra content for the save bar (e.g. dirty-field count). */
    saveBarSlot?: ReactNode;
    /** Width of the rail in px. Default 220. */
    railWidth?: number;
    /**
     * The narrow form (since 2.515.9, like `SubNavLayout narrow` in 2.515.5):
     * the layout is its own size container and under 40rem of its own width
     * the section rail gives the content the whole width. The title (and
     * subtitle) sit above one row of the sections that scrolls sideways
     * (`<nav data-settings-strip>`, "Settings sections (compact)"; items
     * `<testid>-strip-item` with `data-section-id`, the current one
     * `aria-current="page"` and underlined), then the section. A container
     * query, not the viewport, so a settings page inside a narrow column
     * folds too. Omitted: the rail sits beside the content at every width.
     */
    narrow?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/**
 * Use this when a page edits settings in sections: a section rail, one scrolling section body and a sticky save bar while dirty (`SettingsLayout`), under the page trail.
 *
 * Fills its parent (`h-full min-h-0`); only the section body scrolls.
 *
 * @example
 * <SettingsPage title="Workspace" breadcrumbs={trail} dirty={dirty} onSave={save} onCancel={reset}
 *   sections={[
 *     { id: 'general', label: 'General', content: <GeneralForm /> },
 *     { id: 'members', label: 'Members', content: <MembersForm /> },
 *   ]} />
 */
export declare function SettingsPage({ breadcrumbs, gutter, className, 'data-testid': testId, 'data-page-spec': spec, ...layout }: SettingsPageProps): JSX.Element;

export declare interface SettingsPageProps extends Omit<SettingsLayoutProps, 'style'> {
    /** The trail above the settings rail. */
    breadcrumbs?: BreadcrumbItem[];
    /** Default `page` — the trail at `--ui-page-gutter`. The rail stays flush. */
    gutter?: PageGutter;
    /** Set by `PageFromSpec`: the spec template this page was built from. */
    'data-page-spec'?: string;
}

/** `SettingsPage`: a section rail, one section body, a save bar while dirty. */
export declare interface SettingsPageSpec {
    template: 'settings';
    title: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    sections: ReadonlyArray<{
        id: string;
        label: string;
        description?: string;
        content: SectionList;
    }>;
    activeSectionId?: string;
    onSectionChange?: (id: string) => void;
    dirty?: boolean;
    saveLabel?: string;
    cancelLabel?: string;
    onSave?: () => void;
    onCancel?: () => void;
    saving?: boolean;
    railWidth?: number;
    gutter?: PageGutter;
    'data-testid'?: string;
}

export declare interface SettingsSection {
    id: string;
    /** Sidebar label. */
    label: ReactNode;
    /** Optional small description shown under the label in the rail. */
    description?: ReactNode;
    /** Optional icon glyph rendered next to the label. */
    icon?: ReactNode;
    /** Section content. */
    content: ReactNode;
}

/** A tray with an arrow out of it: "share", "post this somewhere". */
export declare function ShareIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The primary rail's fold as the shell hands it down (2.515.0): `AppShell
 * sidebarFold` provides it, and a `NavRail` in the shell's sidebar reads it,
 * so the rail draws its 44px strip and its fold toggle without the host
 * threading `collapsed` through by hand. Null outside a folding shell.
 */
export declare type ShellRailFold = Pick<RailFold, 'folded' | 'toggle'>;

export declare function ShellRailFoldProvider({ fold, children }: {
    fold: ShellRailFold | null;
    children: ReactNode;
}): JSX.Element;

export declare function ShortcutsHelp({ open, onClose, sections }: ShortcutsHelpProps): JSX.Element;

export declare interface ShortcutsHelpProps {
    open: boolean;
    onClose: () => void;
    /**
     * The bindings to document. Defaults to this library's own rows.
     *
     * It has to be a prop because the built-in list is a list of THIS
     * library's shortcuts, and a host's keys are not those keys. A consumer
     * whose bindings differed had no way to say so, so it kept a whole second
     * copy of this overlay rather than tell its users the wrong thing about
     * their own keyboard — which is the worse of the two failures, and the
     * reason the default is left exactly as it was.
     */
    sections?: ShortcutsHelpSection[];
}

/** One row: a key combination and what it does. */
export declare interface ShortcutsHelpRow {
    /**
     * The combination. A string is rendered as a single key cap exactly as
     * written (`'⌘/Ctrl + S'`); an array renders one cap per element
     * (`['⌘', 'S']`), which is what a host that stores its bindings
     * structurally already has in hand.
     */
    keys: string | string[];
    /** What the shortcut does. `label` is an accepted alias. */
    action?: string;
    /** Alias for `action`. */
    label?: string;
    /** Documented but not wired: rendered dimmed, struck through, tagged. */
    planned?: boolean;
}

export declare interface ShortcutsHelpSection {
    title: string;
    /** The rows. `shortcuts` is an accepted alias. */
    rows?: ShortcutsHelpRow[];
    /** Alias for `rows`. */
    shortcuts?: ShortcutsHelpRow[];
}

export declare const SIDE_PANE_BOUNDS: SidePaneBounds;

export declare function SidebarRow({ icon, label, trailing, active, onClick, onContextMenu, href, kebab, disabled, 'aria-label': ariaLabel, className, 'data-testid': testId, dataAttrs, }: SidebarRowProps): JSX.Element;

export declare interface SidebarRowProps {
    /** Leading icon. */
    icon?: ReactNode;
    /** Primary label (string or ReactNode). */
    label: ReactNode;
    /** Right-side slot for badges, avatar stacks, etc. */
    trailing?: ReactNode;
    /** Highlighted state. */
    active?: boolean;
    onClick?: () => void;
    onContextMenu?: (e: MouseEvent_2<HTMLElement>) => void;
    /** When set, the row renders as an <a href>. Click handling still fires. */
    href?: string;
    /** Optional kebab-menu trigger node (typically an IconButton). */
    kebab?: ReactNode;
    /** Disabled state — non-interactive, muted styling. */
    disabled?: boolean;
    /** Accessibility label override (when `label` isn't a string). */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
    /** Arbitrary `data-*` attributes spread onto the root element.
     *  Used by e2e tooling to expose row-level metadata (e.g.
     *  `data-room-slug`) without bespoke wrapper divs that interfere
     *  with the row layout. */
    dataAttrs?: Record<string, string | number | undefined>;
}

export declare function SidebarSection({ title, actions, collapsible, defaultCollapsed, storageKey, children, className, 'data-testid': testId, }: SidebarSectionProps): JSX.Element;

export declare interface SidebarSectionProps {
    /** Visible section label. Used to derive the localStorage key. */
    title: string;
    /** Right-aligned slot in the header (e.g. an IconButton). */
    actions?: ReactNode;
    /** When true (default), header click toggles collapse. */
    collapsible?: boolean;
    /** Initial collapsed state. Defaults to false (open). */
    defaultCollapsed?: boolean;
    /** Optional explicit localStorage key. Defaults to `sidebar-section:${title}`. */
    storageKey?: string;
    /** Section body. */
    children?: ReactNode;
    /** Extra classes for the outer wrapper. */
    className?: string;
    /** Test id (defaults to "sidebar-section"). */
    'data-testid'?: string;
}

/**
 * A page's pane, registered with the shell's `SidePaneProvider` and portaled
 * into its right column. Outside a host it renders nothing (the page's own
 * column is unchanged).
 */
export declare function SidePane({ title, subtitle, closeLabel, onClose, widthPx, paneId, explores, presentation, tabs, value, onValueChange, trailing, tabsOverflow, footer, density, children, 'data-testid': testId, }: SidePaneProps): ReactPortal | null;

export declare interface SidePaneBounds {
    /** The split's ratio (page share) when nothing is remembered. Default 0.72. */
    defaultRatio: number;
    /** The remembered ratio is kept inside [ratioMin, ratioMax]. Defaults 0.4 / 0.85. */
    ratioMin: number;
    ratioMax: number;
    /** The page's floor while dragging (px). Default 520. */
    minPrimaryPx: number;
    /** The pane's floor (px). Default 320. Its ceiling is `1 - ratioMin` of the split (60%). */
    minSecondaryPx: number;
    /**
     * The page needs this much beside an open pane (px) — a section rail and a
     * readable content column — or the pane waits for `reveal()`. Default 840 (with the 320px pane: a 1160px split).
     */
    fitPrimaryPx: number;
}

/** The split is wide enough for the page beside the pane. Unmeasured (first paint): it fits. */
export declare function sidePaneFits(splitWidthPx: number | null, bounds?: SidePaneBounds): boolean;

export declare interface SidePaneHostState {
    /** The measured split has room for the page and pane at the host's bounds. */
    fits: boolean;
    /** A page has registered a pane. */
    registered: boolean;
    /** The pane is asked for (registered and open, or page-owned) — on screen or waiting for room. */
    asked: boolean;
    /** On screen now. */
    shown: boolean;
    /** Asked for, and showing a selection of the page: two rail-depth levels (`railDepth` `explored`). */
    explored: boolean;
    /** Open (and remember open) and show it even in a narrow window. */
    reveal(): void;
    /** Close it (remembered); a page-owned pane's × is the page's. */
    collapse(): void;
    /** Folded to the 44px strip at the split's edge (remembered). */
    folded: boolean;
    /** Fold to the strip / restore from it. */
    toggleFolded(): void;
    /** The pane's drawn width in px (0 while folded or off screen, null unmeasured) — a canvas beside it re-fits when it changes. */
    paneWidthPx: number | null;
}

export declare interface SidePaneProps extends SidePaneRegistration {
    /** The pane's sections (`usePaneState().tabs`); none, no tab row. */
    tabs?: readonly TabItem[];
    value?: string;
    onValueChange?: (id: string) => void;
    /** Right end of the tab row. */
    trailing?: ReactNode;
    /** The tab row's narrow behaviour, `PaneHeader overflow` (since 2.515.9). Default `menu`. */
    tabsOverflow?: 'scroll' | 'menu';
    /** Docked under the body: the pane's one composer. */
    footer?: ReactNode;
    /** The pane's density; default `compact`. */
    density?: Density;
    children: ReactNode;
    /** The pane content's root; its tab row is `<id>-header-row`, its tabs `<id>-tab-<tab>`, its footer `<id>-footer`. */
    'data-testid'?: string;
}

export declare function SidePaneProvider({ storageKey, defaultOpen, bounds: boundsOverride, children }: SidePaneProviderProps): JSX.Element;

export declare interface SidePaneProviderProps {
    /**
     * Per-device memory: `<storageKey>.open` (`1|0`), `<storageKey>.folded`
     * (`1|0`, the 44px strip) and the width per pane, `<storageKey>.ratio`
     * (`paneId` `page`) or `<storageKey>.ratio.<paneId>`. Default `uic.side-pane`.
     */
    storageKey?: string;
    /** Open when nothing is remembered. Default true. */
    defaultOpen?: boolean;
    bounds?: Partial<SidePaneBounds>;
    children: ReactNode;
}

export declare interface SidePaneRegistration {
    /** Documents get a readable pane; below 1240px of split space they temporarily take the column. */
    presentation?: 'standard' | 'document';
    /** The frame's title ("Discussion", "Details"). */
    title: string;
    /** The second line: what the pane is about. */
    subtitle?: string;
    /** Names the frame's × ("Collapse discussion"); default `Collapse <title>`. */
    closeLabel?: string;
    /** The page owns the open state: the pane shows while registered and × calls this. */
    onClose?: () => void;
    /**
     * The pane's width (px) until the reader sizes it: Search opens at 320–380px
     * so its graph keeps the width. A drag (or the divider's arrow keys) is
     * remembered per `paneId` and then wins, within 320px–60% of the split.
     */
    widthPx?: {
        min: number;
        max: number;
    };
    /** Names the pane's remembered width (`<storageKey>.ratio.<paneId>`; `page` → `<storageKey>.ratio`). Default `page`. */
    paneId?: string;
    /** The pane shows a selection of the page (a record, a detail) — a rail-depth level of its own. */
    explores?: boolean;
}

/**
 * Where the page renders, with its pane on the right. Under a
 * `SidePaneProvider` it uses that host (the shell reads it); alone it hosts
 * itself.
 */
export declare function SidePaneSplit(props: SidePaneSplitProps): JSX.Element;

export declare interface SidePaneSplitProps {
    /** The page. */
    children: ReactNode;
    /** Stacked above the page's pane in the same column (a call's media grid). */
    before?: ReactNode;
    /** Stacked below it (a huddle's chat). Alone, it takes the column. */
    after?: ReactNode;
    /** The registered pane's frame test id (its title `-title`, subtitle `-subtitle`, × `-close`). */
    paneTestId?: string;
    dividerLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface SignoffEntry {
    name: string;
    avatarUrl?: string;
    /** e.g. 'owner', 'sme', 'org-leader' — shown as the chip's title. */
    role?: string;
    decision: 'approve' | 'reject';
    timeLabel?: string;
}

export declare function SignoffPanel({ variant, signoffs, required, actions, emptyHint, className, 'data-testid': testId, }: SignoffPanelProps): JSX.Element;

export declare interface SignoffPanelProps {
    variant?: 'card' | 'inline';
    signoffs: SignoffEntry[];
    /** Approvals needed to ratify. Default 2. */
    required?: number;
    /** Approve/Reject buttons etc. — render only for viewers who may act. */
    actions?: ReactNode;
    emptyHint?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface SingleComboboxProps extends BaseProps {
    multiple?: false;
    value: string;
    onChange: (value: string) => void;
}

export declare function SkeletonCard({ width, height, rounded }: SkeletonCardProps): JSX.Element;

export declare interface SkeletonCardProps {
    width?: number | string;
    height?: number | string;
    /**
     * Corner shape. 'full' makes a circle/pill — the avatar-placeholder case
     * that used to force pages to hand-roll their own skeleton rect.
     * @default 'lg'
     */
    rounded?: 'md' | 'lg' | 'full';
}

export declare function SkipLink({ targetId, children, className, onSkip, }: SkipLinkProps): JSX.Element;

export declare interface SkipLinkProps {
    /**
     * `id` of the element to jump to. That element needs `tabIndex={-1}` for
     * the jump to move focus (not just the viewport) in every browser.
     * @default 'main-content'
     */
    targetId?: string;
    children?: ReactNode;
    className?: string;
    /** Called after the jump — use it to focus the target explicitly. */
    onSkip?: () => void;
}

export declare const Slider: ForwardRefExoticComponent<SliderProps & RefAttributes<HTMLInputElement>>;

export declare interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Accessible name. Required when no visible label is wired up. */
    'aria-label'?: string;
    /**
     * Show the current value beside the track. Pass a formatter to control how
     * it reads (units, decimal places); `true` uses the raw number.
     * @default true
     */
    readout?: boolean | ((value: number) => string);
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** Two sliders: "refine these results". Since 2.389.6. */
export declare function SlidersIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A smiling face: pick an emoji. The button, not the emoji — a reaction a
 *  person actually left stays the character they chose. */
export declare function SmileyIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function SourceCard({ id, title, kind, timestamp, excerpt, onOpen, href, current, meta, layout, now, className, 'data-testid': testId, }: SourceCardProps): JSX.Element;

export declare interface SourceCardProps {
    id: string;
    title: string;
    /** The mark's kind. Default `page`. */
    kind?: FileKind;
    /** When the source was written. ISO string, epoch ms or Date. */
    timestamp?: string | number | Date | null;
    /** A line or two of what the source says. Clamped to two lines. */
    excerpt?: ReactNode;
    onOpen?: (id: string) => void;
    href?: string;
    /** This is the source being viewed. */
    current?: boolean;
    /**
     * A quiet line under the title that REPLACES the age — "Source pattern ·
     * auth-service". Since 2.389.0.
     */
    meta?: string;
    /**
     * `card` (default): the mark, a title that is the control, the age, the
     * excerpt. `row` (since 2.389.0): a "based on" row — the WHOLE row is one
     * control (a button with `onOpen`, a link with `href`), the mark in a 32px
     * bordered tile, a 13px medium title, a 12px tertiary meta line, and a
     * trailing chevron. No excerpt. The accessible name is the title.
     */
    layout?: 'card' | 'row';
    /** Clock for the age (tests, server-rendered snapshots). Default `Date.now()`. */
    now?: number;
    className?: string;
    'data-testid'?: string;
}

export declare function SourceList({ items, emptyLabel, onOpen, now, layout, className, 'aria-label': ariaLabel, 'data-testid': testId, }: SourceListProps): JSX.Element;

export declare type SourceListItem = Omit<SourceCardProps, 'now' | 'className' | 'data-testid' | 'layout'>;

export declare interface SourceListProps {
    items: SourceListItem[];
    /** Shown when `items` is empty. Default "No sources recorded". */
    emptyLabel?: string;
    /** Applied to every card that has no handler of its own. */
    onOpen?: (id: string) => void;
    now?: number;
    /** Forwarded to every card — `row` for a "Based on" list. Since 2.389.0. */
    layout?: 'card' | 'row';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** A four-point sparkle with a small companion: the agent. Since 2.386.0. */
export declare function SparkleIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Sparkline({ data, width, height, color, baseline, }: SparklineProps): JSX.Element;

export declare interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    /**
     * Where the bottom of the plot sits.
     *
     * - `'min'` (default) — the smallest sample is pinned to the bottom edge, so
     *   the line always fills the box. Best for shape-of-the-change questions
     *   ("is it wobbling?") where the absolute level doesn't matter.
     * - `'zero'` — the bottom edge is 0 (or the series minimum, if any sample is
     *   negative). Small variation around a large value then reads as the nearly
     *   flat line it actually is. Use this for rates, counts and anything else
     *   where magnitude carries meaning, otherwise [100, 101, 102] draws the same
     *   dramatic climb as [0, 50, 100].
     * - a number — pin the bottom edge to that value explicitly.
     */
    baseline?: 'min' | 'zero' | number;
}

declare interface SpecHeader {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    /** The header's action row. */
    actions?: LeafList;
    /** Beside the title — a `status` leaf, usually. */
    badge?: LeafSpec;
    back?: PageHeaderBack;
    density?: Density;
    titleAs?: 'h1' | 'h2' | 'h3';
    /** Default `page` for every template. */
    gutter?: PageGutter;
    'data-testid'?: string;
}

/** Renders one leaf as its library (or registered) component. */
export declare function SpecLeaf({ leaf }: {
    leaf: LeafSpec;
}): ReactNode;

export declare function Spinner({ size, color, className, style, decorative, 'aria-label': ariaLabel, 'data-testid': testId, }: SpinnerProps): JSX.Element;

export declare interface SpinnerProps {
    size?: SpinnerSize;
    /** Arc color. Defaults to var(--color-primary). */
    color?: string;
    className?: string;
    style?: CSSProperties;
    /**
     * Purely visual — no role, no label, hidden from assistive technology.
     * Set this whenever the spinner sits inside a container that already
     * announces the wait (LoadingState does), otherwise the two live regions
     * nest and the reader says "Loading" twice.
     */
    decorative?: boolean;
    'aria-label'?: string;
    'data-testid'?: string;
}

export declare type SpinnerSize = 'sm' | 'md' | 'lg';

export declare function SplitPane({ primary, secondary, defaultRatio, ratio: controlled, onRatioChange, minPrimaryPx, minSecondaryPx, dividerLabel, onDividerActivate, resizable, primaryHidden, className, 'data-testid': testId, }: SplitPaneProps): JSX.Element;

export declare interface SplitPaneProps {
    primary: ReactNode;
    /** The second pane. `null` renders only the primary, no divider. */
    secondary: ReactNode | null;
    /** Primary pane width as a fraction of the whole, 0–1. Default 0.55. */
    defaultRatio?: number;
    /** Controlled ratio; when given, `onRatioChange` must move it. */
    ratio?: number;
    onRatioChange?: (ratio: number) => void;
    /** Smallest each pane may get, in px. Defaults 280 / 360. */
    minPrimaryPx?: number;
    minSecondaryPx?: number;
    /** Names the divider for assistive tech, e.g. "Resize conversation and document". */
    dividerLabel?: string;
    /** Enter / Space on the focused divider (2.438.1): a host's fold of the secondary pane. */
    onDividerActivate?: () => void;
    /** Keep a controlled split without offering a resize handle (e.g. a folded rail). */
    resizable?: boolean;
    /** Keep the primary mounted but hide it while the secondary owns a narrow viewport. */
    primaryHidden?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A frame split into a main pane and two stacked ones: "split layout". Since 2.411.0. */
export declare function SplitViewIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Vertical flex column with a scale gap. */
export declare function Stack({ children, gap, align, justify, wrap, as: As, className, ref, ...rest }: StackProps): JSX.Element;

export declare type StackAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';

export declare function StackDiagram({ layers, orientation, connector, className, style, 'data-testid': testId, }: StackDiagramProps): JSX.Element;

export declare type StackDiagramConnector = 'arrow' | 'line' | 'none';

export declare type StackDiagramOrientation = 'vertical' | 'horizontal';

export declare interface StackDiagramProps {
    layers: StackLayerSpec[];
    /** Vertical stacks top-to-bottom (default); horizontal flows left-to-right. */
    orientation?: StackDiagramOrientation;
    /** Connector glyph between layers. Default 'arrow'. */
    connector?: StackDiagramConnector;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/**
 * A group heading's actions slot (2.407.36): visually hidden (`sr-only`, so
 * it takes no width yet stays a tab stop and in the accessibility tree) until
 * the heading strip (`group/head`) is hovered, holds a `:focus-visible`
 * element (the heading or an action, reached by Tab), a menu inside is open,
 * or the group is current (`data-current` on the strip); always out when the
 * primary pointer cannot hover (touch). Exported for the test.
 */
export declare const STACKED_RAIL_GROUP_ACTIONS_CLASS: string;

/**
 * The row control — the Org rail's (SubNavLayout) row: 13px/500 on a 36px
 * pitch (8px + a 20px line + 8px, `RAIL_ROW_PITCH`), no gap between rows, no
 * radius. Group headings and the caption sit at the same 36px.
 */
export declare const STACKED_RAIL_ROW_CLASS: string;

export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX.Element;

export declare function StackedRail({ title, count, actions, groups, selectedId, currentStyle, 'aria-label': ariaLabel, className, 'data-testid': testId, }: StackedRailProps): JSX.Element | null;

/** A group heading action: a 28px ghost icon button. */
export declare interface StackedRailAction {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    disabled?: boolean;
    'data-testid'?: string;
}

/** `data-*` attributes passed straight through to a row or group heading. */
export declare type StackedRailDataAttributes = Record<`data-${string}`, string | number | boolean | undefined>;

/** Drag pass-through: the host owns what a drag and a drop mean. */
export declare interface StackedRailDragProps {
    draggable?: boolean;
    onDragStart?: DragEventHandler<HTMLElement>;
    onDragOver?: DragEventHandler<HTMLElement>;
    onDragEnter?: DragEventHandler<HTMLElement>;
    onDragLeave?: DragEventHandler<HTMLElement>;
    onDrop?: DragEventHandler<HTMLElement>;
    onDragEnd?: DragEventHandler<HTMLElement>;
    /** Extra `data-*` attributes for the element that carries the testid. */
    data?: StackedRailDataAttributes;
}

export declare interface StackedRailGroup extends StackedRailDragProps {
    id: string;
    /** The heading's label; also its `title`, so a truncated one reads whole on hover. */
    title: string;
    /** Plain count after the heading ("KIND 6"). */
    count?: number;
    /** Default true. A non-collapsible group draws its heading as text. */
    collapsible?: boolean;
    /** Controlled open state (with `onToggle`), else the initial one. Default open. */
    open?: boolean;
    onToggle?: (open: boolean) => void;
    /** Right of the heading — presence avatars, a status. */
    trailing?: ReactNode;
    /**
     * 28px icon buttons at the heading's right edge, or the host's own nodes (a
     * ⋯ `DropdownMenu`). Revealed, not always drawn (2.407.36): they take no
     * width until the heading is hovered, holds keyboard focus (Tab onto the
     * heading or into the actions — `:focus-visible`, so a mouse click on the
     * heading does not pin them), has a menu open (`aria-expanded="true"`
     * inside), or the group is current; on a touch screen (`hover: none`)
     * they are always out. Hidden they stay in the tab order and the
     * accessibility tree (visually hidden, like `sr-only`), never `display:none`.
     * `trailing` and `count` are not part of this and always show.
     */
    actions?: StackedRailAction[] | ReactNode;
    /**
     * The group holds the view on screen: its actions stay out. Derived when
     * any row in it (at any depth) is current; set it to force either way.
     */
    current?: boolean;
    rows: StackedRailRow[];
    /** The line an empty open group shows. Default "Nothing here yet." */
    emptyLabel?: ReactNode;
    /** Busy (the whole source mid-pull): translucent and `aria-busy`. */
    pending?: boolean;
    /** The group section's testid. Default `${listTestId}-group-${id}`. */
    testId?: string;
}

export declare interface StackedRailProps {
    /** The rail's caption ("AGENT LIBRARY"). */
    title?: string;
    /** Plain count directly after the caption ("DOCUMENTS 187"), like a group's. */
    count?: number;
    /**
     * The caption's actions. A `ReactNode`, or a single `StackedRailAction`,
     * draws as-is at the right edge. Two or more `StackedRailAction`s draw as
     * 28px icon buttons while the rail is 240px or wider (`railWidth="sm"` and
     * up), and fold into one ⋯ menu (`${data-testid}-actions-menu`, one item
     * per action, disabled carried over) below that — at `xs` (220px) three
     * buttons would leave the caption "DOCUM… 187". A container query on the
     * caption row decides, so the rail needs no width prop. (2.407.36)
     */
    actions?: StackedRailAction[] | ReactNode;
    groups: StackedRailGroup[];
    /** The current row, in place of (or as well as) `row.current`. */
    selectedId?: string | null;
    /**
     * The current row always wears the 3px primary edge. `tint` (default, the
     * Org rail) adds the 8% primary fill; `weight` draws it semibold instead.
     */
    currentStyle?: 'tint' | 'weight';
    /** The nav landmark's name. Default "Navigation". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface StackedRailRow extends StackedRailDragProps {
    id: string;
    label: string;
    /** A link target. Without it the row is a button calling `onSelect`. */
    href?: string;
    /** Called on activation — also for `href` rows (the host's router). */
    onSelect?: () => void;
    /** Router interception; keep modified clicks native by checking the event. */
    onNavigate?: (event: MouseEvent_2<HTMLAnchorElement>) => void;
    /** The view on screen. Also set by `selectedId`. */
    current?: boolean;
    /** Right-aligned muted meta: a number is a count ("0" shows), a string an age ("3h"). */
    meta?: number | string;
    /**
     * After `meta`, at the row's right edge: a small presence stack (20px
     * avatars), a status dot. It never moves the text column or the 36px pitch.
     */
    trailing?: ReactNode;
    /** A small glyph before the label. None by default — the rail is words. */
    icon?: ReactNode;
    children?: StackedRailRow[];
    /** Controlled disclosure. With `onToggle`, the host owns it; alone, the initial state. */
    open?: boolean;
    onToggle?: (open: boolean) => void;
    disabled?: boolean;
    /** Tooltip on a disabled row: why it cannot be opened. */
    disabledReason?: string;
    /** Busy (a move or pull in flight): translucent and `aria-busy`. */
    pending?: boolean;
    /** The hover/focus-revealed row menu slot (a ⋯ `DropdownMenu`, usually). */
    menu?: ReactNode | ((row: StackedRailRow) => ReactNode);
    /** The row control's testid. Default `${listTestId}-row-${id}`. */
    testId?: string;
}

/** Spacing scale. Matches Tailwind's 4px base: xs=6, sm=8, md=12, lg=16, xl=24. */
export declare type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export declare type StackJustify = 'start' | 'center' | 'end' | 'between';

export declare interface StackLayerSpec {
    id: string;
    label: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    /** Color tone (matches <Chip> tones). Default 'neutral'. */
    tone?: ChipTone;
    /** Optional right-aligned meta slot (badge, version chip). */
    meta?: ReactNode;
}

export declare interface StackProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
    children?: ReactNode;
    /** Space between children. Default `md` (12px). */
    gap?: StackGap;
    /** Cross-axis alignment (`align-items`). */
    align?: StackAlign;
    /** Main-axis distribution (`justify-content`). */
    justify?: StackJustify;
    /** Allow children to wrap onto more lines. Default false for Stack, true for Inline. */
    wrap?: boolean;
    /** Render as something other than a `<div>` — `ul`, `section`, `label`, … */
    as?: ElementType;
    /**
     * The underlying DOM node.
     *
     * A plain prop rather than `forwardRef` deliberately. The forms primitives in
     * this library use `forwardRef` because they wrap one fixed element, but
     * these two are polymorphic: `forwardRef<T, P>` fixes the instance type at
     * the call site and would either pin every `Stack` to `HTMLDivElement` — a
     * lie the moment you pass `as="ul"` — or force consumers to cast. React 19
     * (our only supported peer, `^19.0.0`) passes `ref` through as an ordinary
     * prop, so the polymorphic typing survives.
     *
     * Typed as `HTMLElement` for the same reason. A consumer holding a
     * `useRef<HTMLDivElement>(null)` still assigns cleanly, and one that passed
     * `as="ul"` is not told it has a div.
     *
     * Anything that follows its own output needs this: reading and setting
     * `scrollTop` on a log tail, measuring a row, focusing a region. Without it a
     * consumer cannot use a layout primitive at all there and hand-rolls a
     * nine-line `forwardRef` wrapper around a bare `<div>` — which is exactly
     * what the aws-agentcore portal did in `components/ScrollRegion.tsx`.
     */
    ref?: Ref<HTMLElement>;
}

export declare function StatCard({ label, value, accent, danger, hint, title, delta, sparklineData, to, as: As, onClick, mono, size: sizeProp, className, style, 'data-testid': testId, }: StatCardProps): JSX.Element;

export declare interface StatCardDelta {
    /** Magnitude of the change. Rendered with a sign derived from `direction`. */
    value: number;
    /** Trend direction. Drives the arrow glyph (▲/▼) and default sign. */
    direction: 'up' | 'down';
    /**
     * Color tone for the delta line. Defaults:
     *   - up   → positive (success/green)
     *   - down → negative (danger/red)
     *
     * Pass explicitly to override — e.g. on a "Failed events" KPI, a
     * downward trend is actually positive, so `tone: 'positive'`.
     */
    tone?: 'positive' | 'negative' | 'neutral';
    /**
     * Suffix appended to the numeric value. Default `'%'`. Pass `''` for raw
     * counts (e.g. `+12` errors), or `' ms'` etc. for units.
     */
    suffix?: string;
    /** Optional aria-label override for the delta line. */
    'aria-label'?: string;
}

export declare interface StatCardProps {
    label: ReactNode;
    value: ReactNode;
    accent?: boolean;
    danger?: boolean;
    hint?: ReactNode;
    /**
     * Native tooltip on the whole card — for provenance a reader only needs on
     * demand ("unknown, not zero" behind a $0.00).
     *
     * `hint` is the visible slot and stays the default; this is for text that
     * would crowd the tile. Deliberately the native `title` rather than a new
     * Tooltip component: several shared components already use `title` this way,
     * and one hover mechanism that works everywhere beats two that disagree.
     *
     * It exists because ProjectDetailPage needed exactly this and had to smuggle a
     * bare `<span title>` inside the `label` ReactNode — which put the tooltip on
     * the caption rather than the card, so it only appeared over four words of
     * uppercase text.
     */
    title?: string;
    /**
     * Trend delta rendered below the value (▲ +12% / ▼ -4%, colored by tone).
     * Pass `null` or omit to hide.
     */
    delta?: StatCardDelta | null;
    /**
     * Inline sparkline drawn to the right of the value. Pass the raw number
     * series — the card sizes it at 80×20 by default. Omit to hide.
     */
    sparklineData?: number[];
    /** Destination URL / path. When provided the card renders as a link. */
    to?: string;
    /**
     * Override the link element. Defaults to a plain `<a>` (passes `href`).
     * Pass your router's Link component to get client-side navigation — the `to`
     * prop is forwarded directly so it matches React Router's `<Link to>` API.
     *
     * @example
     * import { Link } from 'react-router';
     * <StatCard to="/admin/capabilities" as={Link} label="…" value={0} />
     */
    as?: ElementType<any>;
    /** Click handler — renders a <button> wrapper if no `to` is given. */
    onClick?: () => void;
    mono?: boolean;
    /** `sm` (since 2.452.0, the compact-density default): 14px semibold value, the app type scale. `md`: the 24px bold KPI value. */
    size?: 'md' | 'sm';
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

/** `KPIGrid` of `StatCard`s. */
export declare interface StatsLeaf {
    kind: 'stats';
    items: ReadonlyArray<Omit<StatCardProps, 'as' | 'style' | 'className'>>;
    columns?: KPIGridColumns;
    mdColumns?: KPIGridColumns;
    dense?: boolean;
}

export declare function StatStrip({ items, frameless, connectors, variant, size: sizeProp, className, 'aria-label': ariaLabel, 'data-testid': testId, }: StatStripProps): JSX.Element;

/** A labelled arrow between two clusters — "Compact", "Publish". */
export declare interface StatStripConnector {
    label: string;
    /** Tints the arrow and its label. Default: tertiary ink. */
    tone?: Tone;
}

export declare interface StatStripItem {
    label: string;
    value: ReactNode;
    hint?: ReactNode;
    tone?: 'default' | 'accent' | 'danger';
    /** A line under the value — "● 50m behind". Since 2.388.0. */
    status?: StatStripStatus | null;
    /** Native tooltip on the cluster (the full hint, provenance). Since 2.388.0. */
    title?: string;
    onSelect?: () => void;
    href?: string;
    /**
     * A thin bar under the cluster — "18 / 52 points delivered" with its fill.
     * Drawn only when `max` is above zero and `value` is finite (nothing is
     * drawn for "we do not know"). Since 2.390.0.
     */
    progress?: {
        value: number;
        max: number;
    } | null;
    /**
     * `line` only (since 2.440.0): a small inline track drawn after the label
     * in place of the `progress` bar — a compact `WorkflowStepper` reading
     * "L1 ✓ — L2 ● — L3 ○" where a bar against a level ladder would be a
     * continuous reading of a stepped fact. Wins over `progress`.
     */
    track?: ReactNode;
}

/** `StatStrip`: a row of small stats in one card, where the numbers are context. */
export declare interface StatStripLeaf extends Omit<StatStripProps, 'className'> {
    kind: 'stat-strip';
}

export declare interface StatStripProps {
    items: StatStripItem[];
    /**
     * Drop the strip's own border, rounding and fill so a host frame can
     * provide them — the same escape hatch DataTable has.
     *
     * The strip is a card by default, which is right when it sits on the page.
     * Inside another Card it reads as a card in a card: two nested rounded
     * boxes a few pixels apart, which is visual noise standing in for a
     * hierarchy that isn't there. The dividers between clusters stay, since
     * those separate the numbers from each other, not the strip from the page.
     */
    frameless?: boolean;
    /**
     * Since 2.388.0: `connectors[i]` is drawn between `items[i]` and
     * `items[i + 1]` as a labelled arrow, replacing the divider there. A strip
     * with connectors reads left to right as a flow. Extra entries are ignored;
     * a missing one leaves a plain gap.
     */
    connectors?: StatStripConnector[];
    /**
     * `default`: the label over a 17px value (a KPI card, compressed).
     * `inline` (since 2.390.0): the value then its label on ONE line, sentence
     * case — "**18** / 52 points delivered · **2** agents running · **$1.73**
     * spent of $95 allocated" — with dividers between clusters, no card, and a
     * rule under the strip. The label is the words after the number, so write
     * it as the rest of the sentence.
     *
     * `line` (since 2.392.0): ONE unboxed line of prose-weight stats, clusters
     * separated by a muted "•" — "**18** / 52 points delivered ▬▬▭▭ • **2**
     * agents running • **$1.73** of $95 spent". No dividers, no rule, no card;
     * a cluster's `progress` is drawn as a 150px bar INLINE after its label
     * rather than under it. `hint` and `status` are not drawn (use `title`).
     * The line wraps between clusters, never inside one.
     */
    variant?: 'default' | 'inline' | 'line';
    /**
     * `line` only. `md` (default): 16px semibold values over 15px labels. `sm`
     * (since 2.429.0): the app's body step — 14px semibold values and 14px
     * labels (`T size="sm"`) — for a stats line under a tab strip, where 15–16px
     * reads a size up from the 14px tabs.
     */
    size?: 'md' | 'sm';
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
}

/** A cluster's health line: a tone dot and a short worded state. */
export declare interface StatStripStatus {
    label: string;
    /** Default `neutral` (secondary ink). */
    tone?: Tone;
}

export declare interface StatusColors {
    bg: string;
    border: string;
    text: string;
    accent: string;
}

export declare function StatusDot({ color, pulse, size, label, className, style, title, 'data-testid': testId, 'aria-label': ariaLabel, }: StatusDotProps): JSX.Element;

export declare interface StatusDotProps {
    /** Dot color. Defaults to var(--color-text-tertiary). */
    color?: string;
    pulse?: boolean;
    size?: StatusDotSize;
    label?: ReactNode;
    className?: string;
    style?: CSSProperties;
    title?: string;
    'data-testid'?: string;
    'aria-label'?: string;
}

export declare type StatusDotSize = 'xs' | 'sm' | 'md';

/** `StatusPill`. */
export declare interface StatusLeaf extends Omit<StatusPillProps, 'className' | 'icon'> {
    kind: 'status';
}

export declare function StatusPill({ state: stateProp, tone, label, icon, meta, size, variant, truncate, className, 'data-testid': testId, }: StatusPillProps): JSX.Element;

export declare interface StatusPillProps {
    /** The pill's tone. Either `state` or `tone`; `tone` wins when both are given. */
    state?: StatusPillTone;
    /**
     * The same thing as `state`, under the name the catalog helpers use —
     * `statusPillFor(summary)` returns `{ tone, label, meta }`, and
     * `<StatusPill variant="text" {...statusPillFor(summary)} />` just works.
     */
    tone?: StatusPillTone;
    label: string;
    /** Optional icon placed to the left of the label. */
    icon?: ReactNode;
    /**
     * A quieter clause after the label — "29m ago", "3 of 5". Rendered as
     * "· <meta>" in the tertiary ink and normal weight; the label keeps the
     * colour and the weight.
     */
    meta?: string;
    size?: StatusPillSize;
    variant?: StatusPillVariant;
    /**
     * Default true: the label ellipsizes when its row is narrower than it
     * (full text in `title`). `false` (2.512.0): the label is never cut — it
     * wraps between words instead, for a caption whose word must read whole
     * ("Candidate" under an 88px tile).
     */
    truncate?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare type StatusPillSize = 'sm' | 'md';

export declare type StatusPillState = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'pending';

/**
 * What `state` accepts: a `StatusPillState`, or `danger` — the same tokens as
 * `error`, in the library's tone spelling (success / warning / danger /
 * neutral). Kept out of `StatusPillState` so a `Record<StatusPillState, …>`
 * elsewhere does not have to grow a duplicate key.
 */
export declare type StatusPillTone = StatusPillState | 'danger';

/**
 * `pill` (default) is the bordered, tinted chip. `text` is dot + coloured label, no box.
 * `tag` (since 2.386.5) is a soft rounded-rectangle label with no dot and no
 * border — a document's "Draft" beside its title. `label` (since 2.386.15) is
 * the tag's soft rectangle WITH the dot — a scope's "● In progress".
 */
export declare type StatusPillVariant = 'pill' | 'text' | 'tag' | 'label';

/** The most facts the frame draws (concepts §5 draws eight). */
export declare const SUBJECT_FRAME_MAX_FACTS = 8;

export declare function SubjectFrame({ title, subtitle, badges, headerActions, tabs, hero, heroAspect, heroActions, facts, factsLabel, disclosures, children, className, 'data-testid': testId, }: SubjectFrameProps): JSX.Element;

export declare interface SubjectFrameDisclosure {
    id: string;
    /** "Description", "Links", "Request details". */
    title: string;
    /** Shown after the title: "Links (3)". */
    count?: number;
    /** A control in the summary row ("+ Add"). */
    action?: ReactNode;
    defaultOpen?: boolean;
    children: ReactNode;
}

export declare interface SubjectFrameProps {
    /** "Toby", "Asset · Generated sheet". */
    title: ReactNode;
    /** "Character · Lead", "Episode 01". */
    subtitle?: ReactNode;
    /** Chips beside the title (state, version). */
    badges?: ReactNode;
    /** The header's own buttons, at its right edge: open in new, next, close (`IconButton`s). */
    headerActions?: ReactNode;
    /** The record's tabs (Details · Versions · Activity). Omit for a frame without tabs. */
    tabs?: {
        items: readonly TabItem[];
        value: string;
        onValueChange: (id: string) => void;
        label?: string;
        /**
         * The tab row in a narrow frame (since 2.515.9; `PaneHeader overflow`).
         * `menu` (default): under 360px the row keeps the first and current tab
         * and folds the rest into `More ▾`. `scroll`: one row that scrolls
         * sideways, every view in it (a 380px inspector, a phone column).
         */
        overflow?: 'scroll' | 'menu';
    };
    /** The subject's picture. Omit only for a subject that has none (a text record). */
    hero?: SubjectHeroContent;
    heroAspect?: ImageCompareAspect;
    /** The hero's trailing actions. */
    heroActions?: ReactNode;
    /** The facts table: at most eight rows; more are dropped (and named in the console in development). */
    facts?: KeyValueItem[];
    /** The facts table's accessible name (since 2.515.9). Default `Facts`; name it for the subject ("Character facts") when a page holds more than one frame. */
    factsLabel?: string;
    /** The disclosures, in order. Put Request details last, collapsed. */
    disclosures?: SubjectFrameDisclosure[];
    /** The body of a tab other than the details: replaces the hero, facts and disclosures. */
    children?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

/** The hero part on its own: a subject's picture shown whole, the placeholder frame, or the running state. */
export declare function SubjectHero({ content, aspect, actions, className, 'data-testid': testId }: SubjectHeroProps): JSX.Element;

export declare type SubjectHeroContent = 
/** The picture, shown whole in an `ImageCompare` frame (`fit="contain"`). */
    {
    kind: 'image';
    src: string;
    alt?: string;
    label?: string;
    description?: string;
    meta?: ReactNode;
}
/** Nothing to show yet: the same frame with words in it ("No picture yet"). Never an EmptyState. */
| {
    kind: 'placeholder';
    text: string;
    label?: string;
}
/**
* A job is drawing it: the run's own content (a `RunProgressPanel`, or in a
* narrow inspector one line such as "Drawing Mina · step 2 of 3" with Cancel
* and Open run).
*/
| {
    kind: 'running';
    content: ReactNode;
}
/** A host node that shows the subject whole by itself, such as a `ModelViewer`. */
| {
    kind: 'custom';
    content: ReactNode;
};

export declare interface SubjectHeroProps {
    content: SubjectHeroContent;
    /** The frame's aspect. Default `landscape` (4:3). */
    aspect?: ImageCompareAspect;
    /** The hero's trailing actions, under the picture (Approve, Open run, Vary this one). */
    actions?: ReactNode;
    className?: string;
    'data-testid'?: string;
}

export declare interface SubNavItem {
    /** Path relative to the section root, e.g. "summary" or "crawl". For action
     *  items (onClick set), this is just used as a React key — provide something
     *  unique like "halt" or "manual". */
    path: string;
    label: string;
    /** Optional small badge (e.g. live count) shown right-aligned. */
    count?: number | string;
    /** Observed activity supplied by the host, never inferred from availability. */
    activity?: {
        label: string;
    };
    /** Optional dim subtitle below the label. */
    hint?: string;
    /** Optional group heading. When set on any item, the layout renders
     *  collapsible sections by group. Items without a group go into an
     *  un-headered first section. */
    group?: string;
    /** If set, the item renders as a button that calls onClick instead of a
     *  link that navigates. Use for in-page actions like Halt or toggle. */
    onClick?: () => void;
    /** Optional left-side accent color (action items often want danger/warning). */
    accent?: 'default' | 'danger' | 'warning' | 'success';
    /** If any item in a group specifies groupScrollAfter, cap the visible
     *  height at that many items and make the rest scrollable. */
    groupScrollAfter?: number;
}

export declare function SubNavLayout({ title, items, compactHeader, railContent, contentPadding, titleAction, railHeader, railWidth, storageKey, secondaryTitle, secondaryItems, secondaryStorageKey, secondaryRailWidth, renderNavItem, railLabel, contentAs, contentLabel, collapsed, narrow: narrowProp, children, }: SubNavLayoutProps): JSX.Element;

export declare interface SubNavLayoutProps {
    /** Section title shown at top of the rail. */
    title: string;
    items: SubNavItem[];
    /** Align with the compact primary NavRail heading. */
    compactHeader?: boolean;
    /** Explorer/tree content in place of navigation links. */
    railContent?: ReactNode;
    /** A child WorkArea can own its gutter without nesting padding. */
    contentPadding?: "default" | "none";
    /** Optional element rendered next to the title (e.g. a help "?" button). */
    titleAction?: ReactNode;
    /** Optional content rendered above the nav items (e.g. a [+ New] button). */
    railHeader?: ReactNode;
    /** Override the default rail width. */
    railWidth?: number;
    /** Storage key prefix for collapsed-section persistence (default 'subnav'). */
    storageKey?: string;
    /** Secondary rail — rendered between the primary rail and main content.
     *  Keeps section-specific items separate from the top-level nav. */
    secondaryTitle?: string;
    secondaryItems?: SubNavItem[];
    secondaryStorageKey?: string;
    secondaryRailWidth?: number;
    /**
     * Custom renderer for navigation link items (items without an onClick).
     * Receives the item, its pre-built body content (label + hint + count), and
     * the base inactive CSSProperties to apply to the link element.
     *
     * Use this to integrate with your router's NavLink (e.g. React Router v7):
     * ```tsx
     * renderNavItem={(item, children, baseStyle) => (
     *   <NavLink
     *     to={item.path}
     *     style={({ isActive }) =>
     *       isActive
     *         ? { ...baseStyle, borderLeft: '3px solid var(--color-primary)', background: 'var(--color-surface-hover)', color: 'var(--color-text-primary)' }
     *         : baseStyle
     *     }
     *   >
     *     {children}
     *   </NavLink>
     * )}
     * ```
     *
     * If not provided, a plain `<a href={item.path}>` is rendered with no
     * active-state detection.
     *
     * `activeNavItemClassName`/`inactiveNavItemClassName` (exported alongside
     * `activeNavItemStyle` below) are the className-based equivalent, for a
     * `NavLink` `className={({isActive}) => ...}` integration that wants no
     * inline `style` prop at all.
     */
    renderNavItem?: (item: SubNavItem, children: ReactNode, baseStyle: CSSProperties) => ReactNode;
    /**
     * `aria-label` for the primary rail's `<nav>`. Undefined (the default)
     * renders today's markup with no label — set it when a page carries more
     * than one nav landmark and a screen reader needs to tell them apart.
     */
    railLabel?: string;
    /**
     * Element for the content pane. Defaults to `'main'` — today's markup.
     * A page that already sits inside its shell's own `<main id="main-content">`
     * should pass `'section'` (with `contentLabel` set, so the region still has
     * a name) to avoid a second `<main>` landmark.
     */
    contentAs?: 'main' | 'section' | 'div';
    /** `aria-label` for the content pane. Only meaningful (and recommended)
     *  when `contentAs` is `'section'`, so the named region reads as one. */
    contentLabel?: string;
    /**
     * The primary rail folded to a 44px strip holding only `titleAction` — the
     * control that brings it back (2.438.0). Controlled: the host decides when
     * (`useRailFold`, docs: the rail model) and owns the toggle. The strip's
     * header row takes the height of the rail beside it, so a compact (36px)
     * section rail's header and the strip's control sit on one row.
     */
    collapsed?: boolean;
    /**
     * The narrow form (since 2.515.5): the layout is its own size container
     * and under 40rem of its width the rails (primary and secondary) give the
     * content the whole width. Their items become one row of links above the
     * content that scrolls sideways (`data-subnav-strip`), the current one
     * underlined, so a phone reaches every section without two 200px columns
     * taking the screen. `railContent` (a tree) has no strip form and keeps its
     * rail. Omitted: the rails sit beside the content at every width.
     */
    narrow?: boolean;
    /**
     * The main content area. When used with React Router, omit this and pass an
     * `<Outlet />` as children, or leave empty if the router renders children
     * directly. Defaults to rendering children.
     */
    children?: ReactNode;
}

export declare function SuggestionCard({ reason, title, label, tone, meta, context, onSelect, actionLabel, disabled, className, 'data-testid': testId, }: SuggestionCardProps): JSX.Element;

export declare interface SuggestionCardProps {
    /** Why this is being suggested. Shown above the title — see the note above. */
    reason: string;
    /** The thing itself. */
    title: string;
    /**
     * Short category shown as a pill beside the reason, e.g. "blocked".
     * Omit where every suggestion on screen is the same kind.
     */
    label?: string;
    /** Tone for the label pill. Defaults to neutral. */
    tone?: Tone;
    /** What acting costs — estimates, owner, target. Kept to one line. */
    meta?: ReactNode;
    /** Where it points, e.g. an initiative. Rendered as a quiet trailing note. */
    context?: string;
    /** Primary action. The whole card is the hit target. */
    onSelect: () => void;
    /** Verb for the action, shown on hover/focus. Default "Use this". */
    actionLabel?: string;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function SuggestionRow({ active, onHighlight, onPick, primary, secondary, leading, id, className, 'data-testid': testId, }: SuggestionRowProps): JSX.Element;

export declare interface SuggestionRowProps {
    /** Is this the row the keyboard cursor sits on (`aria-selected`)? */
    active: boolean;
    /** Pointer entered the row — move the host's cursor here. */
    onHighlight?: () => void;
    /** Click (the host handles Enter on its input). */
    onPick: () => void;
    primary: ReactNode;
    secondary?: ReactNode;
    /** Leading slot — an avatar or kind mark. */
    leading?: ReactNode;
    id?: string;
    className?: string;
    'data-testid'?: string;
}

/** A sun: the light theme — "switch to (or currently in) light mode". */
export declare function SunIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Which colour family a primitive paints in. See the block comment above. */
export declare type SurfaceTone = 'surface' | 'code';

/**
 * Accessible on/off toggle. Renders as a `role="switch"` button so screen
 * readers announce the state. Use inside `FormField` for a labeled row, or
 * pass `aria-label` directly for inline use.
 */
export declare function Switch({ checked, onChange, disabled, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, className, style, 'data-testid': testId, }: SwitchProps): JSX.Element;

export declare interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    size?: SwitchSize;
    /** Accessible label — required for screen readers when no visible label is wired. */
    'aria-label'?: string;
    /** When using <FormField label="..."><Switch ...></FormField>, set this to the label's id. */
    'aria-labelledby'?: string;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type SwitchSize = 'sm' | 'md';

/** Short alias — `<T>` reads better inline in dense JSX than `<Text>`. */
export declare const T: typeof Text_2;

export declare function TabbedEventLog({ entries }: Props_4): JSX.Element;

export declare interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
    testId?: string;
}

export declare function Table({ children, className, size: sizeProp, ...rest }: TableProps): JSX.Element;

export declare function TableBody({ children, className, striped, ...rest }: TableBodyProps): JSX.Element;

export declare interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
    /**
     * Tint every second row (the even DOM children, so the first row stays on
     * the plain surface) with the same `surface-inset` band `DataTable` uses.
     * Default `true` since 2.504.0: zebra rows are the reading aid a wide table
     * needs, and a hand-composed table should not have to opt in to it. A row
     * that sets its own `bg-*` class keeps it. Pass `false` when the body
     * stripes itself or holds non-data rows (group headers) that would shift
     * the band.
     */
    striped?: boolean;
}

export declare function TableHead({ children, className, ...rest }: TableHeadProps): JSX.Element;

export declare interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

/** `DataTable`, striped unless `striped: false`. Use `tableLeaf<T>()` to type the rows. */
export declare interface TableLeaf<T = any> extends Omit<DataTableProps<T>, 'className'> {
    kind: 'table';
}

/** Typed identity for a `table` leaf, so `columns` and `keyField` check against the row type. */
export declare function tableLeaf<T>(leaf: Omit<TableLeaf<T>, 'kind'>): TableLeaf<T>;

export declare interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
    /** Row density for every cell inside. Default `md`. Since 2.434.0. */
    size?: TableSize;
}

export declare function TableRow({ children, clickable, className, ...rest }: TableRowProps): JSX.Element;

export declare interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    clickable?: boolean;
}

/**
 * Row density. `md` (default) is the original 12px-padded cell. `sm` (since
 * 2.434.0) is the app's list step: every body row exactly 44px tall on one
 * line (cells do not wrap — truncate or move detail to a tooltip), 14px body
 * text, a 12px semibold uppercase header, and 12px side padding. A row that
 * stacks a caption or a bar under its value cannot fit 44px; put the bar
 * inline beside the value and the caption in a `title`.
 */
export declare type TableSize = 'md' | 'sm';

export declare function TableTd({ children, numeric, className, ...rest }: TableTdProps): JSX.Element;

export declare interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    /** A number cell: right-aligned tabular figures. Since 2.434.0. */
    numeric?: boolean;
}

export declare function TableTh({ children, sortable, sortDirection, numeric, className, ...rest }: TableThProps): JSX.Element;

export declare interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
    /** A number column: right-aligned, so header and figures share an edge. Since 2.434.0. */
    numeric?: boolean;
}

export declare function TabPanel({ id, when, idPrefix, className, style, children }: TabPanelProps): JSX.Element | null;

export declare interface TabPanelProps {
    /** The tab id this panel is associated with. */
    id: string;
    /** Currently-active tab id. Panel renders only when these match. */
    when: string;
    /** Must match the Tabs `idPrefix` for accessibility wiring. Auto-generated tabs without an idPrefix should pass it through. */
    idPrefix?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

export declare function Tabs({ items, value, onValueChange, variant, size, badgeStyle, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, getItemTestId, stretch, itemClassName, 'data-testid': testId, indicator, indicatorWeight, overflowBelow, }: TabsProps): JSX.Element;

/** `Tabs` + `TabPanel`: one viewport with tabs instead of stacked cards. */
export declare interface TabsLeaf {
    kind: 'tabs';
    /** Names the tab list. */
    label: string;
    items: ReadonlyArray<{
        id: string;
        label: string;
        badge?: number | string;
        disabled?: boolean;
        content: LeafList;
    }>;
    /** Controlled tab. Uncontrolled (first enabled) when omitted. */
    value?: string;
    onValueChange?: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
}

export declare interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    size?: 'sm' | 'md';
    /**
     * `chip` (default): a count sits in a small grey pill. `plain`: muted
     * numerals after the label, no box — "Decisions  2".
     */
    badgeStyle?: 'chip' | 'plain';
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
    /** Shared id used to wire <TabPanel> regions to their <tab> triggers. Auto-generated if omitted. */
    idPrefix?: string;
    /** Derives a data-testid per item when the item itself has no `testId`. */
    getItemTestId?: (item: TabItem) => string;
    /**
     * Every tab grows to fill equal width of the tablist (`flex-1`) instead of
     * sizing to its own label — a tab bar that spans a fixed-width container
     * (a modal header, a narrow side panel) where uneven tab widths leave a
     * ragged edge. Default: unchanged, each tab sized to its content.
     */
    stretch?: boolean;
    /** Extra classes merged onto every tab trigger `<button>`. */
    itemClassName?: string;
    /**
     * `data-testid` on the tablist container. The per-item hook (`getItemTestId`,
     * 2.350.0) covered the triggers but left the bar itself unaddressable, so a
     * spec that scopes its queries to the tab bar — or just asserts the bar
     * exists before any tab does — still had to hand-roll the whole `role=
     * "tablist"` element to hang one attribute on it.
     */
    'data-testid'?: string;
    /**
     * How the `underline` variant marks the selected tab. `border` (default):
     * the tab's own 2px bottom border, hung 1px (`-mb-px`) over the tablist's
     * rule — as before.
     *
     * `bar` (since 2.396.0): an absolutely positioned bar at the bottom of the
     * tab, on `z-[1]`, and the rule drawn as the tablist's own `after:` line.
     * Both sit INSIDE the tablist's box, so nothing hangs past it for the next
     * element (a scrolling pane body with its own background) to paint over —
     * the bug that left a 2px border reading as 1px under `ScopeHeader` in an
     * `ExplorerLayout.paneHeader`. Hide the rule with `after:hidden` when a
     * host draws its own. Other variants ignore this.
     */
    indicator?: 'border' | 'bar';
    /** The `bar` indicator's thickness in px. Default 2. Since 2.396.0. */
    indicatorWeight?: 2 | 3;
    /**
     * Container-driven fold (since 2.431.0): while the element the tab bar
     * sits in is narrower than this many px, only the first tab and the
     * selected one stay in the bar and the rest move into a `More ▾` menu at
     * its end (each row keeps the tab's `testId`; the trigger is
     * `<data-testid>-more`, or `tabs-more`). Measured on the PARENT, not the
     * viewport — a conversation pane beside a page folds while the window is
     * wide. Default: never folds.
     */
    overflowBelow?: number;
}

export declare type TabsVariant = 'underline' | 'pill' | 'segmented';

export declare function TagEditor({ 'aria-label': ariaLabel, value, onChange, placeholder, suggestions, lowercase, }: TagEditorProps): JSX.Element;

export declare interface TagEditorProps {
    /** Accessible name for the draft-tag box; defaults to the placeholder text. */
    'aria-label'?: string;
    value: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
    suggestions?: string[];
    /**
     * Lowercase tags before insertion. Defaults to true to preserve historical
     * behavior. Set false when you need case-sensitive identifiers (e.g. Cedar
     * action names like `ViewSalary`).
     */
    lowercase?: boolean;
}

export declare function TaskComposer({ title, description, titlePlaceholder, promptPlaceholder, suggestions, suggestionsTitle, suggestionsLoading, suggestionsEmpty, onSubmit, onChooseSuggestion, submitLabel, hint, busy, className, 'data-testid': testId, }: TaskComposerProps): JSX.Element;

export declare interface TaskComposerProps {
    /** Section heading, e.g. "Queue a job". */
    title: string;
    /** One line under the heading saying what happens on submit. */
    description?: string;
    titlePlaceholder?: string;
    promptPlaceholder?: string;
    /** Offered above the fields. Empty or omitted renders no strip at all. */
    suggestions?: readonly ComposerSuggestion[];
    /** Heading for the strip. */
    suggestionsTitle?: string;
    /** Shown in place of the strip while suggestions are still being fetched. */
    suggestionsLoading?: boolean;
    /**
     * Shown when there are no suggestions AND loading is done. Omit to render
     * nothing — an empty state for an optional nicety is itself noise.
     */
    suggestionsEmpty?: ReactNode;
    onSubmit: (task: {
        title: string;
        prompt: string;
        suggestionId?: string;
    }) => void;
    /** Fires when a suggestion is chosen, before the fields are filled. */
    onChooseSuggestion?: (suggestion: ComposerSuggestion) => void;
    submitLabel?: string;
    /** Quiet note beside the submit button, e.g. where it will run. */
    hint?: ReactNode;
    busy?: boolean;
    className?: string;
    'data-testid'?: string;
}

/** A percentage the strip is willing to print: finite, clamped, rounded. */
export declare function taskPercent(percent: number | undefined): number | null;

export declare function TaskStrip({ label, status, phase, percent, icon, onPause, onResume, onStop, onOpen, onDismiss, className, 'data-testid': testId, }: TaskStripProps): JSX.Element;

export declare interface TaskStripProps {
    /** What the task is — "Creating release-readiness deck". */
    label: string;
    status: AgentTaskStatus;
    /** What it is doing now — "Editing slide 4". Replaces the status word when given. */
    phase?: string;
    /**
     * A REAL completion percentage from the run, 0–100. Omit when the source
     * does not report one; the strip then shows no bar rather than a guess.
     */
    percent?: number;
    /** Leading glyph. Defaults to a status dot. */
    icon?: ReactNode;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    /** "Open run" — jump to the run's full view. */
    onOpen?: () => void;
    /** Hide the strip. The task keeps running. */
    onDismiss?: () => void;
    className?: string;
    'data-testid'?: string;
}

export declare function TechnicalDetails({ text, label, hideLabel, defaultOpen, className, testId, }: TechnicalDetailsProps): JSX.Element | null;

export declare interface TechnicalDetailsProps {
    /** The raw text. Rendered verbatim. Nothing renders when empty. */
    text?: string | null;
    /** Trigger copy, collapsed state. Default "Show technical details". */
    label?: string;
    /** Trigger copy, expanded state. Default "Hide technical details". */
    hideLabel?: string;
    /** Start expanded. Default false — the point is that it stays out of the way. */
    defaultOpen?: boolean;
    className?: string;
    testId?: string;
}

/** A page with a dashed block: "a template". Since 2.390.3. */
export declare function TemplateIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function TenantSwitcher({ label, size, healthy, motion, destinations, onSelect, live, showActivity, blockedReason, emptyMessage, resetKey, avatarColor, avatarForeground, triggerLabel, dialogLabel, errorFallback, className, 'data-testid': testId, }: TenantSwitcherProps): JSX.Element;

export declare interface TenantSwitcherDestination {
    /** Stable id handed back to `onSelect`; also written as `data-tenant`. */
    id: string;
    /** The workspace's name ("Assessment"). The button's accessible name. */
    label: string;
    /** Avatar initials. Default: the label's first two characters. */
    initials?: string;
    /** Unread notices for this workspace. Absent or 0 draws the info glyph. */
    unread?: number;
}

export declare interface TenantSwitcherProps {
    /** The current workspace's name, drawn beside the planet ("Work"). */
    label: string;
    /** Compact project context beside a separate application title. Default md. */
    size?: 'sm' | 'md';
    /** Draws the orbiting moon — the shell's "connected and healthy" hint. */
    healthy?: boolean;
    /**
     * Ambient motion. `false` keeps the moon still (no animation at all);
     * `prefers-reduced-motion` stills it regardless. Default true.
     */
    motion?: boolean;
    /** The workspaces the viewer may switch to, in display order. */
    destinations: readonly TenantSwitcherDestination[];
    /**
     * Switch. A rejected promise shows its message in the panel and re-enables
     * the destinations; a resolved one leaves them disabled (the host is
     * navigating) until `resetKey` changes.
     */
    onSelect: (id: string) => void | Promise<unknown>;
    /** Whether live notification updates are available. Shapes each activity hint. */
    live?: boolean;
    /** Omit inbox activity for project/file workspaces without a notification service. */
    showActivity?: boolean;
    /** When set, every destination is disabled and this explains why. */
    blockedReason?: ReactNode;
    /** Shown when `destinations` is empty. */
    emptyMessage?: ReactNode;
    /** Closes the panel and clears its error/busy state when it changes (e.g. user + tenant). */
    resetKey?: string | number;
    /** Destination avatar fill / ink. Default the primary tint tokens. */
    avatarColor?: string;
    avatarForeground?: string;
    /** Trigger's accessible name. Default `"<label>: switch tenant"`. */
    triggerLabel?: string;
    /** The dialog's accessible name. Default "Switch tenant". */
    dialogLabel?: string;
    /** Shown when `onSelect` rejects with something that is not an `Error`. */
    errorFallback?: string;
    className?: string;
    'data-testid'?: string;
}

/** Alias kept for clarity in contexts where "terminal log" reads better. */
export declare const TerminalLog: typeof LogStream;

declare function Text_2({ as, className, title, children, wrap, size, weight, tone, tabular, truncate, ...rest }: TextProps): JSX.Element;
export { Text_2 as Text }

export declare const Textarea: ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>>;

export declare interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
    /** Fixed row count. Mutually exclusive with autoResize. */
    rows?: number;
    /** Minimum visible rows (used with autoResize). Default: 2. */
    minRows?: number;
    /** Maximum rows before the box scrolls (used with autoResize). */
    maxRows?: number;
    /** Grow to fit content automatically. Default: false. */
    autoResize?: boolean;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    'data-testid'?: string;
}

/** `Text`. */
export declare interface TextLeaf extends Omit<TextProps, 'children' | 'className' | 'onClick' | 'role'> {
    kind: 'text';
    text: string;
}

export declare interface TextProps {
    /** Type scale step. Since 2.420.0; omitted: inherits. */
    size?: TextSize;
    /** Font weight. Since 2.420.0; omitted: inherits. */
    weight?: TextWeight;
    /** Text colour token. Since 2.420.0. */
    tone?: TextTone;
    /** Draw numerals at equal width (timers, counts). Since 2.420.0. */
    tabular?: boolean;
    /** Element to render as. Default `'span'`. */
    as?: 'span' | 'div' | 'p' | 'li';
    className?: string;
    title?: string;
    /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
     *  `false`. Wrapped prose keeps text and inline marks in one flow. */
    wrap?: boolean;
    /**
     * One line, cut with an ellipsis at the width it is given (since
     * 2.515.9): `truncate min-w-0` on the element (block-level, so the cut
     * happens inside a flex row as well), and the whole text as its `title`
     * when the children are a string or number and no `title` is given. Not
     * with `wrap`, which it overrides.
     */
    truncate?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    onClick?: MouseEventHandler<HTMLElement>;
    'data-testid'?: string;
    id?: string;
    children?: ReactNode;
}

declare interface TextSelectionData {
    start: number;
    end: number;
    text: string;
}

declare type TextSize = 'xs' | 'sm' | 'base' | 'lg';

/** `success` / `warning` / `danger` (since 2.515.1): a status line's outcome ("Saved.", "Could not save"). */
declare type TextTone = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'inherit';

declare type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export declare type ThemeMode = 'light' | 'dark';

/** The light/dark switch: an IconButton showing the current mode, aria-pressed when dark. */
export declare function ThemeModeToggle({ mode, onModeChange, size, disabled, className, 'data-testid': testId, }: ThemeModeToggleProps): JSX.Element;

export declare interface ThemeModeToggleProps {
    /** The current mode (controlled). */
    mode: ThemeMode;
    /** Called with the other mode when pressed. */
    onModeChange: (mode: ThemeMode) => void;
    /** Default `sm`, the header's control size. */
    size?: 'sm' | 'md';
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * Injects the theme as CSS custom properties on the document root.
 *
 * Writes BOTH namespaces:
 *   - `--ui-*`   for every ThemeTokens key (kept for `cssVar()` callers)
 *   - `--color-*` / `--radius-*` for keys with a real token counterpart, which
 *     is what Tailwind utilities compile against
 *
 * The second half is what makes this component do anything. Until v2.40.2 it
 * wrote only `--ui-*`, which no utility class reads, so
 * `<ThemeProvider theme={{ primary: 'red' }}>` was silently inert.
 *
 * Mounting with no overrides is a no-op: the light preset mirrors the @theme
 * defaults in src/styles.css.
 *
 * `preset="dark"` is PARTIAL — it re-tones text/surface/border and the semantic
 * colours, but the token set has no dark-specific palette, so surfaces that use
 * literal utilities won't follow. Treat it as a starting point.
 */
export declare function ThemeProvider({ children, preset, theme, tones }: ThemeProviderProps): JSX.Element;

export declare interface ThemeProviderProps {
    children?: ReactNode;
    /** Base preset to use. Defaults to 'light'. */
    preset?: 'light' | 'dark';
    /** Partial overrides merged on top of the preset. */
    theme?: Partial<ThemeTokens>;
    /**
     * Rebrand tones from the semantic scale — the recommended path, because it
     * maps 1:1 onto what every tinted surface in the library reads:
     *
     *   <ThemeProvider tones={{ accent: { base: '#0d9488', bg: '#f0fdfa' } }}>
     *
     * Equivalent to overriding `--color-accent` / `--color-accent-bg` in CSS.
     */
    tones?: Record<string, ToneOverride>;
}

/** The full set of design tokens exposed as CSS custom properties. */
export declare interface ThemeTokens {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    danger: string;
    dangerLight: string;
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    info: string;
    infoLight: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;
    background: string;
    surface: string;
    surfaceRaised: string;
    surfaceOverlay: string;
    border: string;
    borderLight: string;
    spaceXs: string;
    spaceSm: string;
    spaceMd: string;
    spaceLg: string;
    spaceXl: string;
    fontXs: string;
    fontSm: string;
    fontMd: string;
    fontLg: string;
    fontXl: string;
    radiusSm: string;
    radiusMd: string;
    radiusLg: string;
    radiusXl: string;
    radiusFull: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
}

/**
 * A collapsible `<details>` block for showing chain-of-thought reasoning.
 *
 * Pair with a parser that strips `<thinking>...</thinking>` from the assistant
 * message and feeds the extracted text into `content`.
 */
export declare function ThinkingBlock({ content, streaming, defaultOpen, className, }: ThinkingBlockProps): JSX.Element;

export declare interface ThinkingBlockProps {
    /** the thinking/reasoning text */
    content: string;
    /** if true, show "Thinking…" and ThinkingDots when content empty */
    streaming?: boolean;
    /** default false (collapsed) */
    defaultOpen?: boolean;
    className?: string;
}

/**
 * Three dots breathing in sequence — "still going".
 *
 * The dots take `currentColor`, so the caller sets them with a text colour the
 * way every other glyph in this library works. There is no `color` prop: it
 * existed, took an arbitrary CSS string, and could only ever be applied as an
 * inline style — which is banned here, and which nothing was using.
 *
 * The keyframes live in `styles.css` with the rest of them. They were an inline
 * `<style>` injected by the component, so every indicator on screen put another
 * copy of the same rule in the DOM, and the CSS text turned up inside the
 * element's own `textContent` — which is how this was found: a typing indicator
 * read as "@keyframes thinkDot { … } Bob Martinez is typing…".
 */
export declare function ThinkingDots({ size, className }: ThinkingDotsProps): JSX.Element;

export declare interface ThinkingDotsProps {
    /** sm: 4px dots, md: 6px dots (default md). */
    size?: 'sm' | 'md';
    className?: string;
}

export declare function ThumbnailCard({ title, description, category, categoryTone, thumbnail, icon, thumbnailHeight, href, onClick, badge, meta, className, style, 'data-testid': testId, }: ThumbnailCardProps): JSX.Element;

export declare interface ThumbnailCardProps {
    /** Card title (required). */
    title: ReactNode;
    /** Short description. */
    description?: ReactNode;
    /** Optional category label. Shows as a Chip in the content area. */
    category?: ReactNode;
    /** Tone for the category chip. Default 'neutral'. */
    categoryTone?: ChipTone;
    /**
     * Optional thumbnail image URL. When omitted, an icon/emoji placeholder is
     * rendered against a tonal gradient background.
     */
    thumbnail?: string;
    /** Fallback glyph rendered when no thumbnail is provided. */
    icon?: ReactNode;
    /** Pixel height of the thumbnail strip. Default 160. */
    thumbnailHeight?: number;
    /** When provided, renders as an <a> wrapping the card. */
    href?: string;
    /** Optional click handler (renders as a button if no href). */
    onClick?: () => void;
    /** When provided, renders a small badge in the top-right of the thumbnail. */
    badge?: ReactNode;
    /** Optional render function for a custom right-side meta in the content. */
    meta?: ReactNode;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function TitledFrame({ title, titleAction, titleText, active, tone, children, onActivate, className, bodyClassName, style, 'data-testid': testId, }: TitledFrameProps): JSX.Element;

export declare interface TitledFrameProps {
    /** Text sitting in the top border. Keep it short — it is a label, not a line. */
    title: ReactNode;
    /** Right-aligned content in the top border, e.g. a close control. It never
     *  shrinks: when the border is too short for both, the title truncates. */
    titleAction?: ReactNode;
    /** Plain text of the title, shown as its tooltip — the title truncates, so
     *  a long one is otherwise unreadable. Defaults to `title` when that is a
     *  string. */
    titleText?: string;
    /** Draw the focused border. In a pane grid, exactly one should be true. */
    active?: boolean;
    /**
     * Terminal chrome (`code`, the default) or the app's own surface tokens.
     * `code` is the right choice whenever the frame contains a terminal — a
     * pane that themes with the page but holds a fixed-palette PTY reads as
     * two different applications.
     */
    tone?: TitledFrameTone;
    children: ReactNode;
    /** Fires on mousedown anywhere in the frame — how a pane claims focus. */
    onActivate?: () => void;
    className?: string;
    /** Class for the content region, e.g. padding or `overflow-auto`. */
    bodyClassName?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare type TitledFrameTone = 'code' | 'surface';

export declare function Toast({ id, message, type, exiting, actionLabel, onAction, onDismiss }: ToastProps): JSX.Element;

export declare interface ToastContextValue {
    toast: (message: string, opts?: ToastOptions) => void;
    toastJob: (opts: JobToastOptions) => void;
    dismissJobToast: (id: string) => void;
}

export declare interface ToastOptions {
    type?: ToastType;
    durationMs?: number;
    actionLabel?: string;
    onAction?: () => void;
}

export declare interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    /** Exit state drives fade-out animation before removal from the DOM. */
    exiting?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onDismiss: (id: string) => void;
}

export declare function ToastProvider({ children }: {
    children: ReactNode;
}): JSX.Element;

export declare type ToastType = 'info' | 'success' | 'warning' | 'error';

export declare type Tone = (typeof TONES)[number];

/** Soft background only. */
export declare const TONE_BG: Record<Tone, string>;

/** Border for a soft surface. */
export declare const TONE_BORDER: Record<Tone, string>;

/** Soft tinted surface: background + readable foreground. */
export declare const TONE_SOFT: Record<Tone, string>;

/** Solid fill with inverse text. */
export declare const TONE_SOLID: Record<Tone, string>;

/** Solid swatch only — indicator dots, bars, legend keys. */
export declare const TONE_SOLID_BG: Record<Tone, string>;

/** Foreground only — labels, icons on an untinted surface. */
export declare const TONE_TEXT: Record<Tone, string>;

/** Normalise a caller-supplied tone (folds the deprecated 'purple'). */
export declare function toneKey(tone: ToneOrAlias): Tone;

/** Tone plus the historical alias kept for source compatibility. */
export declare type ToneOrAlias = Tone | 'purple';

/** Overrides for one tone in the semantic scale. Omitted roles keep their default. */
export declare interface ToneOverride {
    /** Solid fill / icon / indicator dot. */
    base?: string;
    /** Soft tinted background. */
    bg?: string;
    /** Readable text on the soft background. */
    fg?: string;
    /** Border for the soft surface. */
    border?: string;
}

export declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

/**
 * The raw CSS variable for a tone's solid swatch, for the rare caller that
 * needs a colour value rather than a class (canvas/SVG fills, chart series).
 * Prefer the class maps above wherever a class will do.
 */
export declare function toneVar(tone: ToneOrAlias): string;

export declare function Toolbar({ children, end, tone, variant, size, sticky, bordered, wrap, className, 'aria-label': ariaLabel, 'data-testid': testId, 'data-collection-selection': selectionState, 'data-collection-layout': collectionLayout, 'data-collection-placement': collectionPlacement, }: ToolbarProps): JSX.Element;

export declare function ToolbarGroup({ children, divided, tone, className, 'aria-label': ariaLabel, }: ToolbarGroupProps): JSX.Element;

export declare interface ToolbarGroupProps {
    children: ReactNode;
    /**
     * Draw a divider before the group. Cheaper than asking every caller to
     * interleave `<ToolbarSeparator>` by hand, and it cannot end up orphaned at
     * the start of a row when the group before it renders conditionally.
     */
    divided?: boolean;
    tone?: ToolbarTone;
    className?: string;
    /** Names the group for screen readers, e.g. "Zoom". */
    'aria-label'?: string;
}

/** Muted, non-interactive text in the row — "12 selected", "us-east-1". */
export declare function ToolbarLabel({ children, tone, className }: ToolbarLabelProps): JSX.Element;

export declare interface ToolbarLabelProps {
    children: ReactNode;
    tone?: ToolbarTone;
    className?: string;
}

export declare interface ToolbarProps {
    /** Start-aligned content. Wrap related controls in `<ToolbarGroup>`. */
    children?: ReactNode;
    /** Right-aligned content — the low-frequency verbs (refresh, overflow ⋯). */
    end?: ReactNode;
    tone?: ToolbarTone;
    /** Collection rows sit on the page surface with the same inset as table cells. */
    variant?: 'surface' | 'collection';
    /** `sm` (default) is the shell scale; `md` is for a toolbar that owns a pane. */
    size?: 'sm' | 'md';
    /**
     * Stick to the top of the scroll container. Off by default: a toolbar
     * inside `WorkArea` is already outside the scrolling region, and stacking
     * two sticky layers is how you get a row that hovers over its own header.
     */
    sticky?: boolean;
    /** Bottom hairline separating the row from content. Default true. */
    bordered?: boolean;
    /**
     * Let the row wrap onto a second line instead of scrolling horizontally.
     *
     * The default single row is right for a handful of verbs — run, stop,
     * refresh — where an overflowing control is rare and reachable. It is wrong
     * for a FILTER bar: six controls plus a view switch do not fit a narrow
     * pane, and `overflow-x-auto` then hides real filters behind a scrollbar
     * nobody looks for, which reads as "this toolbar has no status filter"
     * rather than "scroll right". A wrapping row shows every control it holds.
     */
    wrap?: boolean;
    className?: string;
    /**
     * Names the toolbar for screen readers. Default 'Toolbar' — override it
     * whenever a page shows more than one ("Canvas actions", "Run filters").
     */
    'aria-label'?: string;
    'data-testid'?: string;
    /** Set by `CollectionToolbar`: `active` while the row shows a selection in place of its controls. Since 2.442.0. */
    'data-collection-selection'?: 'idle' | 'active';
    'data-collection-layout'?: 'table' | 'cards';
    /** Set by `CollectionToolbar`: `header` when its controls sit in a page header's actions row. Since 2.504.0. */
    'data-collection-placement'?: 'band' | 'header';
}

export declare function ToolbarSeparator({ tone, className }: ToolbarSeparatorProps): JSX.Element;

export declare interface ToolbarSeparatorProps {
    tone?: ToolbarTone;
    className?: string;
}

/** @see SurfaceTone — which colour family the toolbar paints in. */
export declare type ToolbarTone = SurfaceTone;

export declare interface ToolCall {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

export declare interface ToolCallItem {
    id: string;
    name: string;
    done: boolean;
    args?: string;
}

/**
 * A single pill rendering one tool call's name + done/pending state.
 */
export declare function ToolCallPill({ name, done, title, className }: ToolCallPillProps): JSX.Element;

export declare interface ToolCallPillProps {
    name: string;
    done: boolean;
    /**
     * Tooltip text, rendered as the pill's `title` attribute — a place for the
     * raw tool id when `name` is a friendlier display label ("searched
     * knowledge base" vs. the tool's actual name) and the two need to differ.
     * Undefined (the default) renders no `title`, same as today.
     */
    title?: string;
    className?: string;
}

/**
 * A compact strip of tool call pills.
 */
export declare function ToolCallStrip({ toolCalls, className }: ToolCallStripProps): JSX.Element;

export declare interface ToolCallStripProps {
    toolCalls: ToolCall[];
    className?: string;
}

export declare function Tooltip({ content, children, placement, openDelay, closeDelay, disabled, className, 'data-testid': testId, }: TooltipProps): JSX.Element;

export declare type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export declare interface TooltipProps {
    content: ReactNode;
    children: ReactElement;
    placement?: TooltipPlacement;
    /** ms before hover opens the tooltip. Default 350. */
    openDelay?: number;
    /** ms before leaving closes it. Default 100. */
    closeDelay?: number;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare function TopNav({ items, activeHref, brand, rightSlot, renderLink, maxVisible, className, style, 'aria-label': ariaLabel, }: TopNavProps): JSX.Element;

export declare interface TopNavItem {
    label: ReactNode;
    to: string;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
}

export declare interface TopNavProps {
    items: TopNavItem[];
    /** Active href — typically the current pathname. An item is active when activeHref === item.to OR activeHref.startsWith(item.to + '/'). */
    activeHref?: string;
    /** Brand/logo slot rendered at the left. */
    brand?: ReactNode;
    /** Optional right-aligned slot (search, user menu, profile, etc.). */
    rightSlot?: ReactNode;
    /** Render function for link elements. Defaults to <a>. Use this to plug in react-router <Link>, next/link, etc. */
    renderLink?: (item: TopNavItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    /** Maximum number of items to render inline before collapsing the rest into a "More" menu. Default: render all. */
    maxVisible?: number;
    className?: string;
    style?: CSSProperties;
    'aria-label'?: string;
}

/** Items → `GroupedListRow`s: leading checkbox or signal dot, and the meta line. Exported for tests. */
export declare function toWorkListRows(items: WorkListItem[], { onToggleDone, testId, metaStyle, pointsLabel, signalDisplay, layout }?: ToWorkListRowsOptions): GroupedListRow[];

export declare interface ToWorkListRowsOptions {
    layout?: 'default' | 'rail';
    onToggleDone?: (item: WorkListItem, done: boolean) => void;
    testId?: string;
    /** Since 2.390.0. See `WorkListViewProps.metaStyle`. */
    metaStyle?: WorkListMetaStyle;
    /** Since 2.390.0. See `WorkListViewProps.pointsLabel`. */
    pointsLabel?: 'pts' | 'points';
    /** Since 2.390.0. See `WorkListViewProps.signalDisplay`. */
    signalDisplay?: 'dot' | 'meta';
}

/** A microphone on a stand: turn what is being said into text. Distinct from
 *  video/MediaIcons' MicIcon, which is a call's mute CONTROL. */
export declare function TranscribeIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A bin: "remove this". */
export declare function TrashIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type TreeDropPosition = 'before' | 'after' | 'into';

export declare interface TreeNode {
    id: string;
    title: string;
    parentId: string | null;
    isDir?: boolean;
    badge?: ReactNode;
    meta?: string;
    /**
     * Like `meta`, but hidden until the row is hovered or has focus — a
     * version ("v4"), a size. Still in the accessible name, so a screen-reader
     * user hears it without hovering.
     */
    hoverMeta?: string;
    /** Leading glyph after the caret slot — normally a `FileKindMark`. */
    icon?: ReactNode;
    disabled?: boolean;
    /**
     * What is happening to this row right now, for a move the host has sent and
     * not yet heard back about. `pending` draws the row translucent and inert
     * (`aria-busy`); `moved` flashes it as landed. The host clears both — the
     * tree has no idea when a server answered.
     */
    status?: 'pending' | 'moved';
}

export declare function TreeView({ nodes, selectedId, onSelect, defaultExpanded, expanded: controlledExpanded, onToggle, onReorder, canDragNode, canDropNode, renderTrailing, rowMenu, rowMenuLabel, size, className, 'data-testid': testId, }: TreeViewProps): JSX.Element | null;

export declare interface TreeViewProps {
    nodes: TreeNode[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    /** Node ids expanded on first render. Ancestors of `selectedId` auto-expand. */
    defaultExpanded?: string[];
    /**
     * Controlled expansion. When given, the tree renders exactly these ids open
     * and reports every caret click and ArrowLeft/ArrowRight through `onToggle`
     * instead of keeping its own set — for a host that persists expansion or
     * drives it from a URL. Ancestors of `selectedId` are still auto-opened,
     * reported through `onToggle` as well.
     */
    expanded?: string[];
    onToggle?: (id: string, expanded: boolean) => void;
    /** Enables HTML5 drag-and-drop reorder/reparent when provided. */
    onReorder?: (id: string, targetParentId: string | null, position: number) => void;
    /** Host policy for synthetic rows or source-owned roots that cannot move. */
    canDragNode?: (node: TreeNode) => boolean;
    /** Host policy for valid parent/sibling destinations; false removes the drop affordance. */
    canDropNode?: (dragged: TreeNode, target: TreeNode, position: TreeDropPosition) => boolean;
    /** Trailing slot per row — count chip, badge, menu button. */
    renderTrailing?: (node: TreeNode) => ReactNode;
    /**
     * The row's ⋯ menu — Version, Rename, Move, View details. Return `null` or
     * an empty array for a row that has none. Opens from the ⋯ button, a
     * right-click, or Shift+F10 / the context-menu key on the focused row.
     */
    rowMenu?: (node: TreeNode) => DropdownMenuSection[] | null | undefined;
    /** Accessible name of each row's menu button. Default `Actions for <title>`. */
    rowMenuLabel?: (node: TreeNode) => string;
    /**
     * Row scale. `sm` (default) is the 14px / 14px-indent rail. `md` (2.386.0)
     * is the Folders explorer's: 15px titles on 32px rows, an 18px indent step,
     * a selected row in the brand tint with brand ink (its icon follows through
     * `currentColor`), and the ⋯ laid OVER the row's meta on hover instead of
     * holding an empty 24px slot that pushed every time off the right edge.
     * `rail` (2.407.13) is `md` on the shared rail scale (./railType): 13px/500
     * titles on the 36px rail pitch and 12px `RAIL_ITEM_COUNT` meta — the
     * Documents explorer beside the Workspace `NavRail`, one type scale.
     */
    size?: TreeViewSize;
    className?: string;
    'data-testid'?: string;
}

export declare type TreeViewSize = 'sm' | 'md' | 'rail';

/**
 * Generic 0..N-point sparkline. Pure SVG, no canvas / chart library.
 * Used by the judge trend chart, but generic enough to be reused
 * elsewhere (request-rate strips, latency mini-charts, etc.).
 *
 * a11y: rendered with `role="img"` + aria-label. The actual SVG is
 * marked `aria-hidden` because polylines aren't screen-reader-meaningful.
 */
export declare function TrendSparkline({ points, yMin, yMax, width, height, stroke, strokeWidth, showLastPoint, showFill, ariaLabel, className, }: TrendSparklineProps): JSX.Element;

export declare interface TrendSparklineProps {
    /** Y-values, oldest → newest. Empty array renders an empty placeholder. */
    points: number[];
    /** Optional fixed Y-axis bounds. Defaults to data extent + 5% padding. */
    yMin?: number;
    yMax?: number;
    /** Pixel width / height for the SVG viewbox. Default 120x32. */
    width?: number;
    height?: number;
    /** Stroke color — default uses CSS var so tone can be tinted by parent. */
    stroke?: string;
    /** Stroke width in viewbox units. Default 1.5. */
    strokeWidth?: number;
    /** Render the last-point dot. Default true. */
    showLastPoint?: boolean;
    /** Render a fill under the line. Default true. */
    showFill?: boolean;
    /**
     * aria-label override. When omitted, the component synthesizes a label
     * from point count + first/last values.
     */
    ariaLabel?: string;
    className?: string;
}

export declare function TypingIndicator({ names, compact, size, className, 'data-testid': testId, }: TypingIndicatorProps): JSX.Element | null;

export declare interface TypingIndicatorProps {
    /**
     * Names currently typing. Empty array → renders nothing (component returns null
     * so callers don't have to wrap it in a conditional).
     */
    names: string[];
    /** Render only the animated dots, with no banner text. Default: false. */
    compact?: boolean;
    /** Dot size (passes through to ThinkingDots). Default 'sm'. */
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

/** A curved arrow back: "undo". Since 2.386.5. */
export declare function UndoIcon({ size, ...rest }: GlyphProps): JSX.Element;

declare interface UploadedImage {
    imageId: string;
    width: number;
    height: number;
    mimeType: string;
    sizeBytes: number;
}

/** A tray with an arrow leaving it: "upload". Since 2.389.6. */
export declare function UploadIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** The part of this canvas a surrounding pane covers; zero outside a CanvasPaneLayout. */
export declare function useCanvasPaneInset(): CanvasPaneInset;

export declare function useCommandPalette(): CommandPaletteController;

/** Measures an element (or its parent) and gives the density its room implies. */
export declare function useContainerDensity<T extends HTMLElement>(options?: ContainerDensityOptions<T>): ContainerDensityState<T>;

/** The scale to draw at: `override` when given, else the provider's, else `comfortable`. */
export declare function useDensity(override?: Density | null): Density;

/**
 * The form to draw at (since 2.440.0): `override` when given, else the
 * nearest `DensityProvider value`, else `comfortable`. Read by chrome that
 * folds (a header's one row, a composer's pane form) — never by the shell's
 * `density` alone.
 */
export declare function useDensityForm(override?: Density | null): Density;

/**
 * The size a composite draws at. An explicit `size` wins (an override); when
 * it is the size the compact density names, it is deprecated and warns once
 * in development. Otherwise the scale picks `sizes.compact` or
 * `sizes.comfortable`.
 */
export declare function useDensitySize<S extends string>(component: string, size: S | undefined, sizes: {
    comfortable: S;
    compact: S;
}): S;

/**
 * Read the surrounding dock, if any. `null` means "standalone" — the body
 * owns its own header and sizing.
 */
export declare function useDockedPanel(): DockedPanelContextValue | null;

/** The nearest enclosing console surface, or `null` outside one. */
export declare function useEnclosingConsoleSurface(): ConsoleSurfaceState | null;

/**
 * The follow lock's auto-unlock, shared by FollowBanner and FollowModeBar.
 *
 * Unscoped (the default, and the historical behaviour): the viewer's
 * mousedown / keydown / wheel ANYWHERE in the window ends follow. Scoped
 * (2.393.0): only scrolling (wheel, touchmove) or typing (keydown) INSIDE
 * `scope` ends it — a click on a call dock, a toolbar or a side panel does
 * not, because those are not the viewer taking the page back (SPEC §2.2 row
 * 13). Registration waits 500ms so the click that started following cannot
 * end it.
 */
export declare function useFollowAutoStop(active: boolean, onStop: () => void, { enabled, scope }?: {
    enabled?: boolean;
    scope?: RefObject<HTMLElement | null> | undefined;
}): void;

export declare function useHeaderDensity({ contentKind, containerHeight, preference, headerId, scrollCollapse, }?: UseHeaderDensityOptions): HeaderDensityState;

export declare interface UseHeaderDensityOptions {
    /** What the page's body holds. Default `detail`. */
    contentKind?: HeaderContentKind;
    /** The page's available height (px), when the host measures it. */
    containerHeight?: number | null;
    /** The host's own density; wins over the content kind. */
    preference?: Density | null;
    /** Names the header in the storage key ("initiative", "search"). Default "page". */
    headerId?: string;
    /** Collapse on scroll of the content region (rich content only). Default true. */
    scrollCollapse?: boolean;
}

/** Whether a DockedColumn is above this component (its ColumnDock will dock rather than render in place). */
export declare function useInDockedColumn(): boolean;

/**
 * Measures an element's content-box width. `forward` is another ref (a
 * roving-toolbar hook's, say) that needs the same element.
 */
export declare function useMeasuredWidth<T extends HTMLElement>(forward?: Ref<T>): MeasuredWidth<T>;

export declare function usePaneState({ tabs, defaultTab, params, setParams, rememberKey, restore, onOpen, keepRecord, ...url }: UsePaneStateOptions): PaneStateControl;

export declare interface UsePaneStateOptions extends PaneUrlOptions {
    tabs: readonly PaneTabSpec[];
    /** The resting tab — no params. */
    defaultTab: string;
    params: URLSearchParams;
    setParams: (next: URLSearchParams, options?: {
        replace?: boolean;
    }) => void;
    /** Per-device memory of the last `remember` tab. */
    rememberKey?: string;
    /**
     * When to restore the remembered tab (the pane is on screen), and for
     * what (the page's subject): restored once per subject, in place.
     */
    restore?: {
        when: boolean;
        subject: string | null;
    };
    /** Called whenever a tab is opened (bring the pane on screen). */
    onOpen?: () => void;
    /**
     * A named record stays while the reader moves to a plain tab (Search: the
     * person rides along as a tab beside the conversation). Default false: a
     * plain tab drops the record (an initiative's Log closes when the reader
     * goes back to Details).
     */
    keepRecord?: boolean;
}

/** The band set by the nearest `RailBandProvider`; `shallow` outside one. */
export declare function useRailBand(): RailBand;

/** A rail's fold in the current band: the reader's remembered choice, else the host's default. */
export declare function useRailFold({ storageKey, band: bandOverride, defaultFolded }: UseRailFoldOptions): RailFold;

export declare interface UseRailFoldOptions {
    /** Names the rail: the fold is stored under `<storageKey>.<band>`. */
    storageKey: string;
    /** The band to remember in; default the nearest `RailBandProvider`'s. */
    band?: RailBand;
    /** Folded when the reader has chosen nothing in this band (the host's rule: deep, narrow…). Default false. */
    defaultFolded?: boolean;
}

export declare function UserChip({ name, label, avatarSize, avatarColor, presence, onClick, className, style, title, labelClassName, 'data-testid': testId, }: UserChipProps): JSX.Element;

export declare interface UserChipProps {
    name: string;
    /** Optional display label (e.g. "@alice"); defaults to `name`. */
    label?: string;
    /** Avatar pixel size. Defaults to 20. */
    avatarSize?: number;
    /** Override the avatar background color. */
    avatarColor?: string;
    /** Show a presence indicator after the name. */
    presence?: PresenceState;
    /** Make the whole chip clickable. */
    onClick?: (e: MouseEvent_2<HTMLElement>) => void;
    className?: string;
    style?: CSSProperties;
    title?: string;
    /**
     * Classes on the name label alone — a host collapses the chip to its
     * avatar in a narrow column with `labelClassName="hidden @2xl:inline"`,
     * and the `title` (the name) still tells you who it is.
     */
    labelClassName?: string;
    'data-testid'?: string;
}

/**
 * Register a command into the active CommandPaletteProvider for the lifetime
 * of the calling component. Registers on mount, unregisters on unmount.
 *
 * Re-registers whenever the `command` reference changes — wrap in `useMemo`
 * (or define the command outside the component) to avoid churn.
 */
export declare function useRegisterCommand(command: Command): void;

/**
 * `resolveBackdropTone`, kept current. Re-resolves when any `data-theme` /
 * `data-backdrop-tone` in the document changes and when the OS scheme flips.
 * Listens only while `enabled` — an idle composer (Chat mode) subscribes to
 * nothing, and resolves synchronously before paint when it lights up.
 */
export declare function useResolvedBackdropTone(ref: RefObject<Element | null>, tone: BackdropTone, enabled?: boolean): ResolvedBackdropTone;

export declare function UserMenu({ user, items, className, 'data-testid': testId }: UserMenuProps): JSX.Element;

export declare interface UserMenuItem {
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    /** Render a divider above this item */
    separator?: boolean;
    /** Style this item as destructive */
    danger?: boolean;
}

export declare interface UserMenuProps {
    user: UserMenuUser;
    items: UserMenuItem[];
    className?: string;
    'data-testid'?: string;
}

export declare interface UserMenuUser {
    name: string;
    email: string;
    avatarUrl?: string;
}

/**
 * The behaviour on its own, for an element that already exists.
 *
 * `DocumentToolbar` is the case this is for: it had `role="toolbar"` and its
 * own classes, density attribute and layout long before it had the keyboard
 * contract — it was PROMISING the pattern to screen readers (22 tab stops,
 * arrow keys inert) rather than implementing it. Spreading this onto that div
 * adds the behaviour without a wrapper element and without teaching the
 * component about someone else's class names.
 *
 * Returns `ref`, `onKeyDown` and `onFocus` to spread. You still supply
 * `role="toolbar"` and a name.
 */
export declare function useRovingToolbar({ orientation }?: {
    orientation?: 'horizontal' | 'vertical';
}): {
    ref: default_2.RefObject<HTMLDivElement | null>;
    'aria-orientation': "horizontal" | "vertical";
    onFocus: (event: default_2.FocusEvent) => void;
    onKeyDown: (event: default_2.KeyboardEvent) => void;
};

export declare function UserPicker({ value, onChange, placeholder, maxSelect, presenceUsers: presenceUsersProp, idToken: idTokenProp, searchUsers, baseUrl, }: UserPickerProps): JSX.Element;

export declare interface UserPickerProps {
    value: string[];
    onChange: (userIds: string[]) => void;
    placeholder?: string;
    maxSelect?: number;
    /**
     * Presence-sourced candidates. Wins over this library's
     * `usePresenceContext()`, so a host running its own presence provider can
     * hand its list in directly instead of mounting this library's
     * `<PresenceProvider>` just for `UserPicker`. Defaults to the context's
     * `presenceUsers` (or `[]` when no provider is mounted).
     */
    presenceUsers?: PresenceUser_2[];
    /**
     * Bearer token for the default `GET /api/profiles` search request. Wins
     * over `useIdentityContext().idToken`. Pass `null` explicitly to disable
     * the default search request while still showing presence candidates.
     * Ignored when `searchUsers` is given. Defaults to the context's `idToken`
     * (or `null` when no provider is mounted).
     */
    idToken?: string | null;
    /**
     * Full replacement for the default profile-search request, for a host that
     * already owns an authorized client (signed requests, a proxy, a mock in
     * tests) or whose search endpoint isn't `GET {baseUrl}/api/profiles?q=`.
     * Wins over `baseUrl` and does not require `idToken`. Called (debounced
     * 250ms) with the trimmed query and an `AbortSignal` tied to the request's
     * lifetime — abort on unmount/requery the way the default `fetch` does.
     */
    searchUsers?: (query: string, signal: AbortSignal) => Promise<ProfileSummary[]>;
    /**
     * Origin for the default `GET /api/profiles` request. Wins over the
     * build-time `VITE_SOCIAL_API_URL`, which is baked into THIS library's own
     * build and cannot be influenced by a consumer's `.env` — see the note on
     * `VITE_SOCIAL_API_URL` above. Ignored when `searchUsers` is given.
     */
    baseUrl?: string;
}

/** The enclosing `AppShell sidebarFold`, or null. */
export declare function useShellRailFold(): ShellRailFold | null;

/** The page's view of its pane: on screen (focus waits for it), how to bring it back, and whether it is attached. */
export declare function useSidePane(): {
    visible: boolean;
    reveal(): void;
    attached(): boolean;
};

/** What the shell reads: whether a pane is asked for, shown, exploring a selection. */
export declare function useSidePaneHost(): SidePaneHostState;

/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the default light theme if no provider is present.
 */
export declare function useTheme(): ThemeTokens;

/**
 * Returns the current resolved theme tokens from the nearest ThemeProvider.
 * Falls back to the light theme if no provider is present.
 */
export declare function useThemeContext(): ThemeTokens;

export declare function useToast(): ToastContextValue;

/**
 * Non-throwing variant, for components that WANT to toast but must still
 * mount where no provider exists — a widget reused inside a panel or
 * rendered bare in a component test. Callers use `toast?.(…)`; the
 * notification is simply skipped rather than crashing the subtree.
 */
export declare function useToastOptional(): ToastContextValue | null;

/** The window's inner width, live. 1680 on the server. */
export declare function useViewportWidth(): number;

/**
 * Glyph per verdict, as a second non-colour channel.
 *
 * Check / bang / cross are distinguishable in monochrome and at small sizes,
 * which is the whole point: the accessibility requirement is not "add an icon",
 * it is "a reader who sees no colour still gets the verdict".
 */
export declare const VERDICT_GLYPH: Record<ChangeVerdict, string>;

/** Human label per verdict. Always rendered — the chip must never be colour-only. */
export declare const VERDICT_LABEL: Record<ChangeVerdict, string>;

/** Tone per verdict, resolved through the library-wide semantic scale. */
export declare const VERDICT_TONE: {
    readonly pass: "success";
    readonly concern: "caution";
    readonly fail: "danger";
};

export declare function VerdictChip({ verdict, status, error, revision, defaultExpanded, className, 'data-testid': testId, }: VerdictChipProps): JSX.Element;

export declare interface VerdictChipProps {
    verdict?: ChangeReviewVerdict | undefined;
    /** How the review itself is going. Defaults to `idle`. */
    status?: ChangeReviewStatus | undefined;
    /** Why the review failed. Shown verbatim when `status` is `failed`. */
    error?: string | undefined;
    /**
     * The change's CURRENT revision. Pass it, or staleness cannot be detected
     * and an out-of-date verdict will render as if it still applies.
     */
    revision?: string | undefined;
    /** Start with the reasoning open. Default false — see the note above. */
    defaultExpanded?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * What the UI actually renders. Derived — never passed in directly, so a host
 * cannot claim `ready` for a verdict that is out of date.
 */
export declare type VerdictState = 'absent' | 'pending' | 'failed' | 'stale' | 'ready';

/** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
export declare function VideoCallIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ViewportFillRegion({ bottomGap, minHeight, className, children, 'data-testid': testId, }: ViewportFillRegionProps): JSX.Element;

export declare interface ViewportFillRegionProps {
    /** Space to leave between the region's bottom edge and the window bottom. */
    bottomGap?: number;
    /** Floor for the computed height, so the region never collapses. */
    minHeight?: number;
    className?: string;
    children: React.ReactNode;
    'data-testid'?: string;
}

/** Groups worth drawing: people in them, or an action to add some. */
export declare function visibleHeaderPeople(groups: readonly HeaderPeopleGroup[] | undefined): HeaderPeopleGroup[];

/** The tabs to list: every plain tab, and a record tab while its record is named. */
export declare function visiblePaneTabs(tabs: readonly PaneTabSpec[], state: PaneState): TabItem[];

/**
 * The canonical visually-hidden clip. Not `display: none` and not
 * `visibility: hidden` — both remove the node from the accessibility tree.
 */
export declare const VISUALLY_HIDDEN_STYLE: CSSProperties;

/**
 * Renders `children` for screen readers only.
 *
 *   <VisuallyHidden>Sorted ascending</VisuallyHidden>
 */
export declare function VisuallyHidden({ as: Tag, children, className, id, 'data-testid': testId, }: VisuallyHiddenProps): JSX.Element;

export declare interface VisuallyHiddenProps {
    /** Element to render. Defaults to `span`; use `div` inside block content. */
    as?: ElementType;
    children: ReactNode;
    className?: string;
    id?: string;
    'data-testid'?: string;
}

/** A triangle with an exclamation mark: "warning", "check this first". Since 2.389.0. */
export declare function WarningIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * A board with a shape and a connector on it: a whiteboard.
 *
 * Deliberately not the document glyph with something added. A whiteboard is a
 * different authoring surface, not a document variant — the two sit next to
 * each other in the conversation's Documents tab and have to be told apart at
 * a glance.
 */
export declare function WhiteboardIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Wizard({ steps, activeKey, onStep, onFinish, finishLabel, className, 'data-testid': testId, }: WizardProps): JSX.Element;

export declare interface WizardProps {
    steps: WizardStep[];
    activeKey: string;
    onStep: (key: string) => void;
    onFinish?: () => void;
    finishLabel?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface WizardStep {
    key: string;
    label: string;
    content: ReactNode;
    /** Default true. false disables Next/Finish while this step is active. */
    canAdvance?: boolean;
}

export declare interface WorkActivityEvent {
    id: string;
    kind: WorkActivityKind;
    /** ISO time, epoch ms, or Date. */
    at: string | number | Date;
    /** "Status changed from Open to In progress". Already worded by the host. */
    text: string;
    /** Who did it; absent for machine events. */
    actor?: string | null;
    /** A short trailing fact — "$0.18", "failed", "PR #42". */
    detail?: ReactNode;
    /** Opens the thing the event is about (a run, a PR). */
    onOpen?: () => void;
    href?: string;
    openLabel?: string;
    /** Low-signal (a heartbeat, a progress ping): hidden until "Show all events". */
    lowSignal?: boolean;
}

export declare type WorkActivityKind = 'status' | 'run' | 'estimate' | 'comment' | 'system';

export declare function WorkActivityList({ title, events, now, emptyLabel, loading, error, first, className, 'data-testid': testId, group, isLowSignal, defaultShowAll, limit, repeatTimes, }: WorkActivityListProps): JSX.Element;

export declare interface WorkActivityListProps {
    title?: string;
    events: WorkActivityEvent[];
    /** Clock for relative times (ms since epoch). Default Date.now(). */
    now?: number;
    emptyLabel?: string;
    loading?: boolean;
    /** Shown instead of the list when the history could not be read. */
    error?: string | null;
    first?: boolean;
    className?: string;
    'data-testid'?: string;
    /**
     * Collapse consecutive events that share a key into one row with a count.
     * Default true; the key is kind + text + actor. Pass a function to choose
     * the key, or `false` to list every event.
     */
    group?: boolean | ((event: WorkActivityEvent) => string);
    /** Marks low-signal events in addition to each event's own `lowSignal` flag. */
    isLowSignal?: (event: WorkActivityEvent) => boolean;
    /** Start with low-signal events shown. Default false. */
    defaultShowAll?: boolean;
    /** Rows shown before "Show N more" (after grouping). Default 5; `null` shows every row. */
    limit?: number | null;
    /** Print a relative time even when it equals the row above. Default false. */
    repeatTimes?: boolean;
}

export declare function WorkArea({ breadcrumbs, toolbar, children, status, footer, padded, tone, className, bodyClassName, 'data-testid': testId, }: WorkAreaProps): JSX.Element;

export declare interface WorkAreaProps {
    /** The trail row. Usually a `<Breadcrumbs>`; renders nothing when omitted. */
    breadcrumbs?: ReactNode;
    /** The action row. Usually a `<Toolbar>`. Sits below the trail. */
    toolbar?: ReactNode;
    /** Scrolling page content. */
    children: ReactNode;
    /** Pinned bottom row — counts, freshness, a connection pill. */
    status?: ReactNode;
    /** Pinned full-width content, such as ComposerSurface. It owns its insets/background. */
    footer?: ReactNode;
    /** Comfortable padding around `children`. Off for canvases and nested rails. */
    padded?: boolean;
    tone?: WorkAreaTone;
    className?: string;
    /** Applied to the scrolling body, not the column. */
    bodyClassName?: string;
    'data-testid'?: string;
}

/** @see SurfaceTone — which colour family the work area paints in. */
export declare type WorkAreaTone = SurfaceTone;

export declare function Workbench({ title, subtitle, kind, onClose, task, taskLabel, tabs, activeTab, defaultTab, onTabChange, moreContext, footer, label, className, 'data-testid': testId, }: WorkbenchProps): JSX.Element;

export declare interface WorkbenchProps {
    /** The selected file or slide — "Sprint review". */
    title: ReactNode;
    /** A second line — "Presentation · Slide 4 of 5". */
    subtitle?: ReactNode;
    /** Draws a `FileKindMark` before the title. */
    kind?: FileKind;
    /** Renders a close button. Omit for a workbench that cannot be closed. */
    onClose?: () => void;
    /** The current agent task — normally an `AgentTaskCard`. Omit when there is none. */
    task?: ReactNode;
    /** Heading over `task`. Default "Current task". */
    taskLabel?: string;
    tabs: readonly WorkbenchTab[];
    /** Controlled active tab. */
    activeTab?: string;
    /** Uncontrolled initial tab. Defaults to the first. */
    defaultTab?: string;
    onTabChange?: (id: string) => void;
    /** Below the active panel — normally a `MoreContextDisclosure`. */
    moreContext?: ReactNode;
    /** Pinned to the bottom — "Open run", "More". */
    footer?: ReactNode;
    /** Accessible name of the column. Default "Workbench". */
    label?: string;
    className?: string;
    'data-testid'?: string;
}

export declare interface WorkbenchTab {
    id: string;
    label: string;
    /** A count on the tab — open comments. Zero or absent shows none. */
    count?: number;
    content: ReactNode;
}

export declare interface WorkflowStep {
    step: number;
    label: string;
    done: boolean;
    active: boolean;
    /**
     * Supporting timestamp or explanation, below the milestone label. In the
     * vertical orientation this is the step's one fact ("Mina (proposed)").
     */
    description?: ReactNode;
    /**
     * Vertical orientation only (2.512.0): the step's next move — a library
     * `Button` — drawn under its label while the step is `active`. Ignored on
     * other steps and in the horizontal strip.
     */
    action?: ReactNode;
    /** Terminal outcomes must not look like successful completion. */
    outcome?: 'failed' | 'cancelled';
}

export declare function WorkflowStepper({ steps, size: sizeProp, wrap, orientation, className, 'aria-label': ariaLabel, 'data-testid': testId }: WorkflowStepperProps): JSX.Element;

export declare interface WorkflowStepperProps {
    steps: WorkflowStep[];
    /**
     * Default: the density's — `compact` under `DensityProvider density="compact"`,
     * else `md`. `sm` (10px labels, off the app's scale) is deprecated since
     * 2.440.0; `compact` and `md` stay as explicit overrides.
     */
    size?: 'sm' | 'md' | 'compact';
    /** Names the track for assistive tech ("Level L1 of target L3"). */
    'aria-label'?: string;
    /**
     * Wrap onto further rows instead of scrolling when the steps don't fit, so
     * no step is ever hidden past the track's edge. Default false (scrolls).
     */
    wrap?: boolean;
    /**
     * `horizontal` (default): the strip. `vertical` (2.512.0): a timeline, one
     * row per step with its fact and, on the active step, its `action`.
     * `data-orientation` on the root.
     */
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    'data-testid'?: string;
}

export declare function WorkItemMetaBar({ status, points, owner, priority, appearance, flags, layout, priorityStyle, className, 'data-testid': testId, }: WorkItemMetaBarProps): JSX.Element | null;

export declare interface WorkItemMetaBarProps {
    status?: {
        value: string | null;
        options: WorkMetaOption[];
        onChange?: (v: string) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    points?: {
        value: number | null;
        onChange?: (v: number | null) => void;
        readOnlyReason?: string;
        pending?: boolean;
        max?: number;
    };
    owner?: {
        value: WorkPerson | null;
        onSearchPeople?: (q: string) => Promise<WorkPerson[]> | WorkPerson[];
        onChange?: (p: WorkPerson | null) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    priority?: {
        value: string | null;
        options: WorkMetaOption[];
        onChange?: (v: string) => void;
        readOnlyReason?: string;
        pending?: boolean;
    };
    /**
     * `inline` (default): borderless fields at 14px with a rule between each.
     * `boxed` (since 2.386.15): the Work mockup's row — status and priority are
     * 36px bordered select boxes ("● Open ⌄", "Priority: High ⌄"), points and
     * owner plain 14px text with one rule between them.
     */
    appearance?: 'inline' | 'boxed';
    /**
     * Toned facts drawn as tags right after the status — `{ label: 'Blocked',
     * tone: 'danger' }`. Read-only; the host decides what they mean. Empty or
     * absent draws none. Since 2.390.0.
     */
    flags?: WorkMetaFlag[];
    /**
     * `default`: the fields in their usual order (status, points, owner,
     * priority). `divided` (since 2.390.0): the read-first row under a work
     * item's large title — status · flags · owner · points · priority, a rule
     * between each, at 14px (the body step; 15px before 2.441.0) ("● Open | Blocked | (EG) Eli Garcia | 2 points |
     * High priority"). Ignored when `appearance="boxed"`.
     */
    layout?: 'default' | 'divided';
    /**
     * `label` (default): "Priority:" then the value. `tag` (since 2.390.0): one
     * toned tag that says it all — "High priority". An editable priority keeps
     * its select, without the "Priority:" word.
     */
    priorityStyle?: 'label' | 'tag';
    'data-testid'?: string;
    className?: string;
}

export declare interface WorkListChip {
    label: string;
    tone?: ChipTone;
}

/**
 * One filter dimension ("Kind", "Owner", "Status"), drawn as a labelled row of
 * toggle chips in the filter panel. `selected` empty = no narrowing on this
 * facet. The host does the filtering; this only draws and reports.
 */
export declare interface WorkListFilterFacet {
    id: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
        count?: number;
    }>;
    selected: readonly string[];
    onChange: (selected: string[]) => void;
}

/** The filter panel body for `facets`. Exported for hosts that compose their own toolbar. */
export declare function WorkListFilters({ facets, 'data-testid': testId }: {
    facets: WorkListFilterFacet[];
    'data-testid'?: string;
}): JSX.Element;

export declare interface WorkListGroup {
    id: string;
    title: string;
    /** What this group says when open and empty. Default "Nothing here". */
    emptyLabel?: string;
    defaultOpen?: boolean;
}

export declare interface WorkListItem {
    id: string;
    groupId: string;
    title: string;
    /** Human-readable item key, shown below the title rather than as a badge. */
    reference?: string;
    done?: boolean;
    /** A done toggle is in flight: the checkbox is disabled and busy. */
    donePending?: boolean;
    /** Story points. `null` / absent → no points part. */
    points?: number | null;
    /** `null` / absent → "Unassigned". */
    owner?: WorkListPerson | null;
    /** Type chips, e.g. `{ label: 'Bug', tone: 'danger' }`. */
    chips?: WorkListChip[];
    signal?: WorkListSignal | null;
    disabled?: boolean;
    /**
     * The item's kind as a word — "Bug", "Story". With `metaStyle="text"` it
     * leads the meta line ("Bug · Eli Garcia · 2 points") instead of a chip.
     * Since 2.390.0.
     */
    kindLabel?: string;
    /**
     * A toned tag at the row's end — "Blocked" (danger). Always visible; not
     * inside the row's button. Since 2.390.0.
     */
    tag?: WorkListChip | null;
}

/** How a work row's second line reads. See `WorkListViewProps.metaStyle`. */
export declare type WorkListMetaStyle = 'default' | 'text';

export declare interface WorkListPerson {
    id: string;
    name: string;
    avatarUrl?: string;
}

/**
 * Replaces the checkbox with a dot, and adds its label to the meta line:
 * `running` a filled primary dot ("Agent running"), `review` a hollow ring
 * ("Awaiting review"), `blocked` a danger dot. With `onClick` the dot is a
 * button (e.g. open the live run).
 */
export declare interface WorkListSignal {
    state: 'running' | 'review' | 'blocked';
    label: string;
    onClick?: () => void;
}

/** Search on its own row; sort and the filter button on the next. */
export declare function WorkListToolbar({ query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters: filtersProp, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, toolbarLayout, sortStyle, className, 'data-testid': testId, }: WorkListToolbarProps): JSX.Element;

export declare interface WorkListToolbarProps {
    query: string;
    onQueryChange: (query: string) => void;
    /** Default "Search work…". */
    searchPlaceholder?: string;
    sort?: string;
    sortOptions?: SelectOption[];
    onSortChange?: (value: string) => void;
    /** Accessible name of the sort select. Default "Sort work". */
    sortLabel?: string;
    /** Filter controls; omit for no filter button. */
    filters?: ReactNode;
    /**
     * Filter facets, drawn by `WorkListFilters` in the panel (and counted for
     * the button's dot) when `filters` is not given.
     */
    filterFacets?: WorkListFilterFacet[];
    /** Default: the number of facets with a selection, else 0. */
    activeFilterCount?: number;
    onClearFilters?: () => void;
    /**
     * `stacked` (default): search on its own row, sort and the filter button
     * on the next. `inline`: search and the filter button share the first
     * row; sort sits alone below. Since 2.390.0.
     */
    toolbarLayout?: 'stacked' | 'inline';
    /**
     * `select` (default): a full-width select. `menu`: a quiet text menu —
     * the current option's label and a chevron ("By priority ⌄"). Since 2.390.0.
     */
    sortStyle?: 'select' | 'menu';
    className?: string;
    'data-testid'?: string;
}

export declare function WorkListView({ layout, title, count, onCreate, createLabel, onCollapse, collapseLabel, chrome, query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, sortLabel, filters, filterFacets, activeFilterCount: activeFilterCountProp, onClearFilters, groups, items, currentId, onOpenItem, onToggleDone, onReorder, loading, error, onRetry, emptyLabel, storageKey, toolbarLayout, sortStyle, metaStyle, pointsLabel, signalDisplay, currentStyle, groupCountStyle, className, 'data-testid': testId, }: WorkListViewProps): JSX.Element;

export declare interface WorkListViewProps extends Omit<WorkListToolbarProps, 'className' | 'data-testid'> {
    /** A narrow navigation rail: small status marks, full-width titles and keys on the metadata line. */
    layout?: 'default' | 'rail';
    /** Default "Work". */
    title?: string;
    /** The header count. Defaults to `items.length`. */
    count?: number;
    /** Shows a + button in the title row. */
    onCreate?: () => void;
    /** Default "New work item". */
    createLabel?: string;
    /** Shows a ‹ button in the title row. */
    onCollapse?: () => void;
    /** Default "Collapse work list". */
    collapseLabel?: string;
    /** `embedded` omits the title row (the host shows it in a rail header). Default `full`. */
    chrome?: 'full' | 'embedded';
    groups: WorkListGroup[];
    items: WorkListItem[];
    currentId?: string | null;
    onOpenItem?: (item: WorkListItem) => void;
    /** Omit for read-only rows (no checkbox). */
    onToggleDone?: (item: WorkListItem, done: boolean) => void;
    /** `index` is the item's final position within `toGroupId`. Omit for no reorder. */
    onReorder?: (itemId: string, toGroupId: string, index: number) => void;
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
    /** No items at all. Default "No work yet". */
    emptyLabel?: string;
    /** Persists collapsed groups (GroupedList `storageKey`). */
    storageKey?: string;
    /**
     * `default`: owner avatar, type chips, then "signal · 5 pts · Owner".
     * `text` (since 2.390.0): one line of words, no avatar and no chips —
     * "Bug · Eli Garcia · 2 points" (`kindLabel`, owner, points).
     */
    metaStyle?: WorkListMetaStyle;
    /** The points unit: `pts` (default, "5 pts") or `points` ("5 points", "1 point"). Since 2.390.0. */
    pointsLabel?: 'pts' | 'points';
    /**
     * Where a `signal` shows. `dot` (default): a leading dot that replaces the
     * checkbox, and its label in the meta line. `meta`: the label in the meta
     * line only — no dot, so the row keeps its checkbox (or nothing). Since 2.390.0.
     */
    signalDisplay?: 'dot' | 'meta';
    /** Passed to `GroupedList.currentStyle`. Since 2.390.0. */
    currentStyle?: 'tint' | 'bar';
    /** Passed to `GroupedList.groupCountStyle`. Since 2.390.0. */
    groupCountStyle?: 'chip' | 'plain';
    className?: string;
    'data-testid'?: string;
}

/** A read-only toned tag on the meta row — "Blocked", in mono like the item key. Since 2.390.0. */
export declare interface WorkMetaFlag {
    label: string;
    tone?: ChipTone;
}

export declare interface WorkMetaOption {
    value: string;
    label: string;
    tone?: ChipTone;
}

/** A person as the meta bar and its picker see one. */
export declare interface WorkPerson {
    id: string;
    name: string;
    avatarUrl?: string;
}

export declare function WorkSearchPicker<T>({ trigger, open, onClose, label, placeholder, search, itemKey, renderItem, onPick, header, footer, 'data-testid': testId, }: WorkSearchPickerProps<T>): JSX.Element;

export declare interface WorkSearchPickerProps<T> {
    trigger: RefObject<HTMLElement | null>;
    open: boolean;
    onClose: () => void;
    /** Accessible name for the dialog and the search box. */
    label: string;
    placeholder?: string;
    /** Called on open (with '') and on every query change. */
    search?: (q: string) => Promise<T[]> | T[];
    itemKey: (item: T) => string;
    renderItem: (item: T) => ReactNode;
    onPick: (item: T) => void;
    /** Above the search box (e.g. a relation select). */
    header?: ReactNode;
    /** Below the results (e.g. "Unassign"). */
    footer?: ReactNode;
    'data-testid'?: string;
}

/** Shared document/chat rail: fixed header and footer, one scrollable body. */
export declare function WorkspaceRail({ title, label, actions, header, footer, children, width, count, heading, countStyle, back, collapsed, collapsedContent, onToggle, toggleLabel, toggleTestId, className, 'data-testid': testId, }: WorkspaceRailProps): JSX.Element;

export declare interface WorkspaceRailBack {
    label: string;
    href?: string;
    onClick?: () => void;
}

export declare interface WorkspaceRailProps {
    title?: string;
    label?: string;
    actions?: ReactNode;
    header?: ReactNode;
    footer?: ReactNode;
    children: ReactNode;
    /**
     * xs 220 (the Org rail's width — SubNavLayout's default — for a documents
     * rail beside it, since 2.407.33), sm 240, ms 264 (a one-line title list — the Initiatives v2 rail, since
     * 2.392.0), md 300, ml 320 (the Folders explorer, 2.386.0), lg 368 (a
     * two-line work list with a toolbar).
     */
    width?: 'xs' | 'sm' | 'ms' | 'md' | 'ml' | 'lg';
    /**
     * A count beside the title ("Work 11"). Omit for none; zero shows "0" —
     * an empty list is a fact, not a missing number.
     */
    count?: number;
    /**
     * `compact` (default) is the 36px, 12px-title strip a tree rail wears;
     * `prominent` is the column heading a work list wears — an 18px title and
     * count on a 56px row, no rule under it. `label` is the same 56px row with
     * the title as the rail group label — "DOCUMENTS 137", the All documents
     * mockup (since 2.389.2). Since 2.407.13 it draws the shared rail scale
     * (`RAIL_GROUP_LABEL`, 11px semibold caps, with its plain 11px
     * `RAIL_GROUP_COUNT`), so the rail matches the Workspace `NavRail` beside it
     * ("WORKSPACE"); it was a 15px label with a count chip. `caption` (since
     * 2.392.0) is the same row with a 12px letter-spaced uppercase label —
     * "INITIATIVES 11", the Initiatives v2 rail.
     */
    heading?: 'compact' | 'prominent' | 'label' | 'caption';
    /**
     * How `count` reads. `chip` (default): a neutral count chip. `plain`: muted
     * text after the title — "Initiatives 11". Since 2.390.0. A `label` heading
     * always draws its count plain (`RAIL_GROUP_COUNT`) — a rail group heading's
     * count is never a pill (railType).
     */
    countStyle?: 'chip' | 'plain';
    /**
     * A back link on its own row ABOVE the title — "‹ Initiatives" over "Work
     * 11", when the rail has drilled into one thing. `href` renders a link,
     * otherwise a button calling `onClick`. Since 2.390.0.
     */
    back?: WorkspaceRailBack | null;
    collapsed?: boolean;
    collapsedContent?: ReactNode;
    onToggle?: () => void;
    toggleLabel?: string;
    toggleTestId?: string;
    className?: string;
    'data-testid'?: string;
}

export declare type WorkTableGrouping = 'status' | 'owner' | 'type';

/** Full-width sibling of WorkListView. Hosts own reads, search/filter/sort,
 * navigation and writes; this owns table presentation and collapsible groups.
 * No router, API, initiative IDs or app-specific CSS is required. */
export declare function WorkTableView({ items, groups, count, title, currentId, onOpenItem, onToggleDone, loading, error, onRetry, emptyLabel, groupBy: controlledGrouping, onGroupByChange, groupColors, defaultKindLabel, query, onQueryChange, searchPlaceholder, sort, sortOptions, onSortChange, filters, filterFacets, activeFilterCount, onClearFilters, className, 'data-testid': testId, }: WorkTableViewProps): JSX.Element;

export declare interface WorkTableViewProps extends WorkListToolbarProps, Pick<WorkListViewProps, 'items' | 'groups' | 'count' | 'title' | 'currentId' | 'onOpenItem' | 'onToggleDone' | 'loading' | 'error' | 'onRetry' | 'emptyLabel'> {
    /** Optional controlled grouping; otherwise starts with status. */
    groupBy?: WorkTableGrouping;
    onGroupByChange?: (group: WorkTableGrouping) => void;
    /** Optional group dots, keyed by the host's status IDs. Use theme tokens. */
    groupColors?: Record<string, string>;
    /** Label for items with no kindLabel. Default "Work". */
    defaultKindLabel?: string;
}

/** The params for a pane state: the default tab with no record drops both. */
export declare function writePaneState(params: URLSearchParams, state: PaneState, defaultTab: string, opts?: PaneUrlOptions): URLSearchParams;

export { }


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}
