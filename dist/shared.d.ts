import { AnchorHTMLAttributes } from 'react';
import { ButtonHTMLAttributes } from 'react';
import { Context } from 'react';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import { JSX } from 'react';
import { MouseEvent as MouseEvent_2 } from 'react';
import { MouseEventHandler } from 'react';
import { ReactElement } from 'react';
import { ReactNode } from 'react';
import { ReactPortal } from 'react';
import { Ref } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { SelectHTMLAttributes } from 'react';
import { SVGProps } from 'react';
import { TdHTMLAttributes } from 'react';
import { TextareaHTMLAttributes } from 'react';
import { ThHTMLAttributes } from 'react';

export declare const activeNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-primary bg-surface-hover text-text-primary no-underline cursor-pointer";

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

export declare function ActivityFeed({ items, visibleCount, rotateMs, staggerMs, kindColors, className, }: ActivityFeedProps): JSX.Element;

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
}

/** A lightning bolt: activity, "things are happening". */
export declare function ActivityIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare type ActivityKind = 'task' | 'pr' | 'decision' | 'comment' | 'status' | string;

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

/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
export declare type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';

/** An arrow pointing right: "go on" — a link action, "Prepare run →". Since 2.385.0. */
export declare function ArrowRightIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** An arrow pointing up: "send" on a round prompt button. Since 2.390.0. */
export declare function ArrowUpIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function ArtifactTile({ name, type, url }: {
    name: string;
    type?: string;
    url?: string | null;
}): JSX.Element;

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
     * `callout` only: `md` (default) is the 14px title over a 13px body; `lg`
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

/** A bell with a slash through it: "notify me quietly". */
export declare function BellMutedIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

/** A trunk with a branch leaving it: a flow that splits — a pipeline, a branch. */
export declare function BranchIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare interface BreadcrumbItem {
    label: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void;
}

export declare type BreadcrumbOverflow = 'ellipsis' | 'menu';

export declare function Breadcrumbs({ items, separator, maxItems, overflow, minItems, lastIsCurrent, className, 'data-testid': testId, }: BreadcrumbsProps): JSX.Element | null;

export declare interface BreadcrumbsProps {
    items: BreadcrumbItem[];
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
    className?: string;
    'data-testid'?: string;
}

/** Three dotted lines: "bulleted list". Since 2.386.5. */
export declare function BulletListIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function Button({ variant, size, tone, disabled, fullWidth, children, type, className, ref, ...rest }: ButtonProps): JSX.Element;

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

export declare function Card({ children, padding, className, ref, ...rest }: CardProps): JSX.Element;

export declare function CardHeader({ title, subtitle, meta, action, inset, className }: CardHeaderProps): default_2.JSX.Element;

export declare interface CardHeaderProps {
    title: string;
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

export declare function CatalogGrid({ children, columns, dense, className, style, 'data-testid': testId, }: CatalogGridProps): JSX.Element;

export declare type CatalogGridColumns = 1 | 2 | 3 | 4 | 5;

export declare interface CatalogGridProps {
    /** Children — expected to be <ThumbnailCard> instances (any node accepted). */
    children: ReactNode;
    /** Target column count at >=640px. Default 3. Always collapses to 1 below. */
    columns?: CatalogGridColumns;
    /** Tighter gap (12px vs 20px). Default false. */
    dense?: boolean;
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
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

export declare function ChannelHeader({ name, onRename, memberCount, description, tabs, actions, avatarUrl, online, onMembersClick, size, as, className, 'data-testid': testId, }: ChannelHeaderProps): JSX.Element;

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
     * inline beside the name; pass a <Tabs variant="underline" size="sm">.
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
    size?: 'md' | 'sm' | 'xs';
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
     */
    outline?: boolean;
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

export declare function CommandPalette({ placeholder, emptyState, className, }?: CommandPaletteProps): JSX.Element;

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
    placeholder?: string;
    emptyState?: ReactNode;
    className?: string;
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

/** Two stacked pages: "make a copy". Since 2.390.3. */
export declare function CopyIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function DataTable<T>({ data: dataProp, columns: columnsProp, keyField, onRowClick, rowActions, searchable, searchPlaceholder, pageSize, emptyMessage, loading, loadingRows, frameless, striped, className, 'data-testid': testId, }: DataTableProps<T>): JSX.Element;

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
    className?: string;
}

export declare interface DataTableProps<T> {
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
     */
    striped?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare const DEFAULT_PIPELINE_ICONS: string[];

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
    /** Heading level, so a panel nested under a page h1 does not claim h1. */
    as?: 'h2' | 'h3';
    className?: string;
    'data-testid'?: string;
}

export declare function DetailSection({ title, hint, actions, first, variant, size, description, children, className, 'data-testid': testId, }: DetailSectionProps): JSX.Element;

export declare interface DetailSectionProps {
    title: string;
    /** Quiet qualifier beside the title — a count, a state, a caveat. */
    hint?: ReactNode;
    /** Right-aligned affordance for this section only. */
    actions?: ReactNode;
    /** Suppress the leading rule. Use on the first section of a surface. */
    first?: boolean;
    /**
     * `label` (default): a small uppercase caption under a hairline, for a
     * drawer or side panel. `heading` (since 2.386.15): a 16px sentence-case
     * heading with no rule, for a document-like body (a work item's Brief); its
     * `actions` stay quiet until the section is hovered or focused (always shown
     * where there is no hover).
     */
    variant?: 'label' | 'heading';
    /**
     * `heading` only. `md` (default) is the 16px heading. `lg` (since 2.390.0)
     * is a page's section heading — 19px semibold on a 28px row, sentence case
     * ("What needs attention", "Plan next", "Why this matters").
     */
    size?: 'md' | 'lg';
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

/** A page with a spark in its corner: "make something new from this". Since 2.390.3. */
export declare function DocumentAddIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** "just now", "15m ago", "2h ago", "Yesterday", "3d ago", "Sep 12". */
export declare function documentAgeLabel(value: string | number | Date | null | undefined, now?: number): string | null;

/** A page with a folded corner: a document, a file. */
export declare function DocumentIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare function DropdownMenu({ trigger, triggerLabel, triggerTitle, triggerClassName, triggerVariant, triggerTabIndex, triggerTestId, align, sections, className, 'data-testid': testId, }: DropdownMenuProps): JSX.Element;

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
    /** Test hook for the trigger itself; `data-testid` addresses the panel. */
    triggerTestId?: string;
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

export declare function EditableHeading({ value, onCommit, placeholder, size, readOnly, editLabel, className, 'data-testid': testId, }: EditableHeadingProps): JSX.Element;

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
    className?: string;
    'data-testid'?: string;
}

/** A pencil: "change this". */
export declare function EditIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, actions, testId, actionTestId, tone, className, size, density, align, actionsDirection, details, }: EmptyStateProps): JSX.Element;

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
    /** Block scale. Default `md`. See `EmptyStateSize`. */
    size?: EmptyStateSize;
    /** Layout density. Default `default`. See `EmptyStateDensity`. */
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

export declare function ErrorState({ icon, title, body, description, actionLabel, onAction, action, testId, actionTestId, }: ErrorStateProps): JSX.Element;

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
}

export declare interface EventGlyph {
    icon: string;
    color: string;
    severity: 'info' | 'success' | 'warning' | 'error' | 'neutral';
}

export declare const eventGlyphs: Record<string, EventGlyph>;

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

export declare function FilePickerButton({ onFiles, accept, multiple, variant, icon, disabled, children, className, 'aria-label': ariaLabel, 'data-testid': testId, }: FilePickerButtonProps): JSX.Element;

export declare interface FilePickerButtonProps {
    onFiles: (files: File[]) => void;
    /** The input's `accept`, e.g. ".md,.txt". */
    accept?: string;
    multiple?: boolean;
    /** `secondary` is a 36px bordered button, `primary` the brand one. */
    variant?: 'secondary' | 'primary';
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

export declare function FilterChip({ active, onClick, color, dot, size, children, className, disabled, 'data-testid': dataTestId, }: FilterChipProps): JSX.Element;

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
}

/** A funnel: "filter this list". Since 2.385.0. */
export declare function FilterIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function FilterPopover({ children, label, activeCount, onClear, clearLabel, open: controlledOpen, onOpenChange, placement, size, trigger, panelLabel, className, panelClassName, icon, 'data-testid': testId, }: FilterPopoverProps): JSX.Element;

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

/** Formats a list of typing user names. Trims to a max of 2 explicit names + "+N others". */
export declare function formatTypingBanner(names: string[]): string;

/**
 * Labeled wrapper around an input control. Wires `<label htmlFor>` →
 * `<input id>`, plus `aria-describedby` for hints/errors and `aria-invalid`
 * for the error state. Use the render-prop API so we don't have to wrap
 * every kind of input the library ships.
 */
export declare function FormField({ label, hint, error, required, layout, children, className, labelClassName, style, hintTestId, 'data-testid': testId, }: FormFieldProps): JSX.Element;

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

/** A hooked arrow: forwarded — this came from somewhere else. */
export declare function ForwardIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

/** Star colours for the graphite sky: zinc greys, so no blue cast sits on a white page. */
export declare const GRAPHITE_PARTICLE_COLORS: readonly ["#f4f4f5", "#d4d4d8", "#a1a1aa"];

/** Six dots in two columns: a drag handle — "pick this up and move it". Since 2.385.0. */
export declare function GripIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function GroupedList({ groups, rows, onOpenRow, rowMenu, rowMenuLabel, openGroups, onToggleGroup, storageKey, currentId, hideEmptyGroups, onReorder, canReorder, reorderLabel, size, groupHeading, currentStyle, groupCountStyle, groupCountAlign, rowStyle, className, 'data-testid': testId, }: GroupedListProps): JSX.Element;

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
     * Work column: 15px group headers and titles, 13px meta, taller rows, a
     * current row that is a rounded tint with a 3px primary bar on its left
     * edge, and a larger drag handle that is always visible.
     */
    size?: 'sm' | 'md';
    /**
     * How a group header reads. `title` (default): a sentence-case heading
     * (14px, 15px at `md`) with its count in a neutral chip. `label`: a section
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
     * no rules — a title-only list whose rows are separated by space alone, a
     * 40px pitch at `md` (36px at `sm`) — the Initiatives v2 rail.
     */
    rowStyle?: 'ruled' | 'plain';
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
    /**
     * A second line inside the row's button, above `subline` — avatar, points,
     * owner. Non-interactive by contract (it is inside a button).
     */
    meta?: ReactNode;
}

/** A marker tip over a stroke: "highlight". Since 2.386.5. */
export declare function HighlighterIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A clock: history, "when". */
export declare function HistoryIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function IconButton({ 'aria-label': ariaLabel, icon, children, disabled, variant, tone, size, className, ...rest }: IconButtonProps): JSX.Element;

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
export declare const inactiveNavItemClassName = "block px-[14px] py-2 border-l-[3px] border-transparent text-text-secondary no-underline cursor-pointer";

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

export declare function InlinePopover({ trigger, open, onClose, placement, offset, className, zIndex, 'data-testid': testId, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, children, }: InlinePopoverProps): ReactPortal | null;

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
    /** Optional z-index (default 9500 — under modals at 10000). */
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

export declare function KeyValue({ items, layout, labelWidth, divided, className, 'aria-label': ariaLabel, 'data-testid': testId, }: KeyValueProps): JSX.Element | null;

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
    className?: string;
    'aria-label'?: string;
    'data-testid'?: string;
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

/** Alias kept for diagrams better described as a stack of horizontal layers. */
export declare const LayerStack: typeof StackDiagram;

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

/** Three dots and three lines: a bulleted list. Since 2.386.0. */
export declare function ListIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

/** A padlock: "private", "restricted to specific people". */
export declare function LockIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare function MasterDetail<T>({ items, keyOf, selectedKey, onSelect, renderRow, renderCompactRow, renderDetail, railTitle, railWidth, compactWidth, storageKey, emptyDetail, className, 'data-testid': testId, }: MasterDetailProps<T>): JSX.Element;

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
    className?: string;
    'data-testid'?: string;
}

export declare function matchHotkey(e: KeyboardEvent, spec: string): boolean;

/** Three stacked bars: "open the menu", or "unfold the rail this collapsed into". */
export declare function MenuIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare function Modal({ open, onClose, title, ariaLabel, maxWidth, children, footer, backdropTestId, backdropStyle, cardStyle, cardClassName, zIndex, rawChildren, }: ModalProps): ReactPortal | null;

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
}

/** A crescent: the dark theme — "switch to (or currently in) dark mode". */
export declare function MoonIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** Three dots in a row: "more". Since 2.386.5. */
export declare function MoreIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function nameToColor(name: string): string;

export declare function nameToInitials(name: string): string;

export declare function NavRail({ title, items, activeHref, match, titleAction, header, footer, width, storageKey, renderLink, tone, size, 'aria-label': ariaLabel, className, 'data-testid': testId, }: NavRailProps): JSX.Element;

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
    /** Render links with a router's Link/NavLink. Defaults to a plain `<a>`. */
    renderLink?: (item: NavRailItem, props: AnchorHTMLAttributes<HTMLAnchorElement>) => ReactNode;
    tone?: NavRailTone;
    /**
     * `sm` (default) is the 13px rail. `md` is the Documents surface's
     * Workspace rail (the All documents mockup): 15px labels on 36px rows, a
     * heading row with no rule under it, and a hairline between groups.
     * Since 2.389.2.
     */
    size?: 'sm' | 'md';
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

export declare function NotificationCenter({ items, onItemClick, onMarkAllRead, onClearAll, className, 'data-testid': testId, }: NotificationCenterProps): JSX.Element;

export declare interface NotificationCenterProps {
    items: NotificationItem[];
    onItemClick?: (item: NotificationItem) => void;
    onMarkAllRead?: () => void;
    onClearAll?: () => void;
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

export declare function PageHeader({ title, description, actions, back, badge, size, className, }: PageHeaderProps): default_2.JSX.Element;

export declare interface PageHeaderBack {
    label: string;
    to: string;
    onClick?: (e: default_2.MouseEvent<HTMLAnchorElement>) => void;
}

export declare interface PageHeaderProps {
    title: string;
    description?: string;
    /** Right-aligned action area (buttons, menus). */
    actions?: default_2.ReactNode;
    /** Optional back link rendered above the title. */
    back?: PageHeaderBack;
    /** Badge or status pill rendered to the right of the title. */
    badge?: default_2.ReactNode;
    /**
     * Title size. `md` (default) is the 20px heading every page has had;
     * `lg` is a 28px directory title — a page that IS the list, not a page
     * about one thing.
     */
    size?: 'md' | 'lg';
    className?: string;
}

export declare function PageSection({ title, description, actions, children, count, size, className, 'data-testid': testId, }: PageSectionProps): JSX.Element;

export declare interface PageSectionProps {
    title: string;
    description?: string;
    actions?: ReactNode;
    children: ReactNode;
    /**
     * A count beside the title in a neutral chip — "Needs attention 1". Absent
     * draws none; zero shows "0" (an empty section is a fact). Since 2.392.0.
     */
    count?: number;
    /**
     * `lg` (default): the page's own 20px h1 with 24px to its content. `md`
     * (since 2.392.0): a 16px semibold h2 over a section of a page — "Needs
     * attention", "Up next" — with 8px to its content, the actions vertically
     * centred on the title.
     */
    size?: 'lg' | 'md';
    className?: string;
    'data-testid'?: string;
}

/** A paperclip: a file came along with this. */
export declare function PaperclipIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

/** A play button in a ring: "run". Since 2.390.3. */
export declare function PlayCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A plus in a ring: "add this". Since 2.389.6. */
export declare function PlusCircleIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A plus: "make a new one". */
export declare function PlusIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A box with an arrow leaving its corner: "open this in its own view". */
export declare function PopOutIcon({ size, ...rest }: GlyphProps): JSX.Element;

/**
 * The attribute a pinned surface — a composer dock at the foot of an editor —
 * puts on itself so popovers never cover it. A popover anchored ABOVE such a
 * surface treats its top edge as the bottom of the screen: it flips up, or
 * slides up, rather than opening over it. A popover opened from INSIDE it
 * (its own menus) is unaffected.
 */
export declare const POPOVER_KEEPOUT_ATTR = "data-uic-keepout";

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
    /** Optional editing mode — renders a small mode badge on the
     *  upper-right of the avatar (pencil / check / eye). */
    mode?: PresenceMode;
    /** One status line for the hover card — "editing", "away · 3m". Free text
     *  because the library does not know the host's vocabulary. */
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

/** A printer: "print". Since 2.390.3. */
export declare function PrinterIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare function RailLayout({ children, rail, railWidth, className, 'data-testid': testId }: RailLayoutProps): JSX.Element;

export declare interface RailLayoutProps {
    /** The main column. */
    children: ReactNode;
    /** The context rail. Compose with <RailSection>. */
    rail: ReactNode;
    /** Rail width at lg+. Default 'md' (300px). */
    railWidth?: 'sm' | 'md' | 'lg';
    className?: string;
    'data-testid'?: string;
}

export declare function RailNavList({ items, 'aria-label': ariaLabel, className, 'data-testid': testId, }: RailNavListProps): JSX.Element | null;

export declare interface RailNavListItem {
    id: string;
    label: string;
    /** A link target. Without it the item is a button calling `onSelect`. */
    href?: string;
    /** Called on activation — also for `href` items (the host's router). */
    onSelect?: () => void;
    /** The view on screen. Marked `aria-current="page"` and drawn semibold. */
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
    /** The nav landmark's name. Default "Views". */
    'aria-label'?: string;
    className?: string;
    'data-testid'?: string;
}

/** One titled block in the rail. Sections divide themselves. */
export declare function RailSection({ title, children, className }: RailSectionProps): JSX.Element;

export declare interface RailSectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

/**
 * The text colour that reads on `background`, or `null` when the background
 * can't be parsed. The 0.6 cut is where white-on-fill stops clearing 4.5:1
 * for the palette's own colours; above it, dark text wins.
 */
export declare function readableAvatarForeground(background: string): string | null;

/** A curved arrow forward: "redo". Since 2.386.5. */
export declare function RedoIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare const REVIEW_KIND_LABELS: Record<string, string>;

export declare const REVIEW_KIND_TONES: Record<string, ToneOrAlias>;

export declare type ReviewAuthorKind = 'agent' | 'human';

export declare interface ReviewPostData {
    id: string;
    authorKind: ReviewAuthorKind;
    authorName: string;
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

export declare function ReviewThread({ posts, onAnswer, answerBusy, answerPlaceholder, answerLabel, kindLabels, kindTones, emptyLabel, className, 'data-testid': testId, }: ReviewThreadProps): JSX.Element;

export declare interface ReviewThreadProps {
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

export declare function SearchInput({ value, onChange, placeholder, onClear, tone, className, inputClassName, size, onKeyDown, style, autoFocus, 'aria-label': ariaLabel, 'data-testid': testId, }: SearchInputProps): default_2.JSX.Element;

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
    /** Class for the wrapper. Sizing and positioning; not the field's colours. */
    className?: string;
    /**
     * `sm` (default) is the 13px field. `md` (2.386.3) is the Documents
     * explorer's: a 36px field, 15px text and an 18px glass. `lg` (2.389.6) is
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
}

/** @see SurfaceTone — which colour family the field paints in. */
export declare type SearchInputTone = SurfaceTone;

export declare function SectionLabel({ children, as: As, case: textCase, className, 'data-testid': testId, }: SectionLabelProps): JSX.Element;

/**
 * `upper` — the 10px bold uppercase panel caption (default, unchanged).
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

export declare function SegmentedControl({ options, value, onChange, size, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, disabled, fullWidth, tone, className, 'data-testid': testId, }: SegmentedControlProps): JSX.Element;

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
    className?: string;
    'data-testid'?: string;
}

export declare interface SegmentOption {
    label: string;
    value: string;
    icon?: ReactNode;
}

export declare const Select: ForwardRefExoticComponent<SelectProps & RefAttributes<HTMLSelectElement>>;

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

export declare interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export declare interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}

export declare interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    options: SelectOption[];
    /** Optional labelled option groups, rendered after the flat `options`. */
    groups?: SelectOptionGroup[];
    /** Shown as a disabled placeholder option when no value is selected. */
    placeholder?: string;
    size?: SelectSize;
    /** Shape. See `SelectVariant`. Default `default`. */
    variant?: SelectVariant;
    /**
     * Semantic tone for `variant="pill"` — the capsule paints in that tone's
     * soft surface (`-bg` / `-fg` / `-border`). Ignored by `variant="default"`,
     * whose chrome is the neutral field border. Default `neutral`.
     */
    tone?: ToneOrAlias;
    /** When true, applies a danger-colored border. */
    invalid?: boolean;
    /**
     * Classes for the `variant="pill"` wrapper `<span>` (the positioning context
     * for the chevron). `className` still lands on the `<select>` itself, so a
     * caller can restyle the capsule without losing the layout hook.
     */
    wrapperClassName?: string;
    /**
     * `native` (default): the browser's own arrow. `custom` (2.391.1): the
     * default field with `appearance-none` and the library's chevron drawn over
     * its right edge, so the field looks the same in every browser and theme
     * (the call-settings selects). The select is then wrapped in a relative
     * `<span>` that takes `wrapperClassName`.
     */
    chevron?: 'native' | 'custom';
    'data-testid'?: string;
}

export declare type SelectSize = 'sm' | 'md';

/**
 * `default` is the boxed field. `pill` is the compact, tone-coloured capsule
 * that status and priority pickers want — a chip you can change.
 *
 * It exists because that shape kept getting hand-rolled: a task row's
 * priority/status pickers are visually chips, and the only way to get one was
 * a bare `<select>` with `appearance-none rounded-full` plus a background-image
 * data-URI arrow and a hand-written `border-*-border bg-*-bg text-*-fg` triple
 * per state. Native `<select>` semantics (keyboard, mobile pickers, form
 * submission) are worth keeping, so this is the real element restyled, not a
 * button-and-menu impostor.
 */
/**
 * `ghost` (2.385.0) is the value side of a label/value row — no box, the
 * value right-aligned with the native chevron after it, a hover tint to say it
 * can be changed ("Model   Haiku ▾" in a run panel).
 */
declare type SelectVariant = 'default' | 'pill' | 'ghost';

/** A paper plane: "send" — the light prompt box's Send ("✈ Send"). Since 2.390.0. */
export declare function SendIcon({ size, ...rest }: GlyphProps): JSX.Element;

/** A tray with an arrow out of it: "share", "post this somewhere". */
export declare function ShareIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare interface SignoffEntry {
    name: string;
    /** e.g. 'owner', 'sme', 'org-leader' — shown as the chip's title. */
    role?: string;
    decision: 'approve' | 'reject';
    timeLabel?: string;
}

export declare function SignoffPanel({ signoffs, required, actions, emptyHint, className, 'data-testid': testId, }: SignoffPanelProps): JSX.Element;

export declare interface SignoffPanelProps {
    signoffs: SignoffEntry[];
    /** Approvals needed to ratify. Default 2. */
    required?: number;
    /** Approve/Reject buttons etc. — render only for viewers who may act. */
    actions?: ReactNode;
    emptyHint?: string;
    className?: string;
    'data-testid'?: string;
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

export declare function StackedAreaChart({ series, height, }: {
    series: LineSeries[];
    height?: number;
}): JSX.Element;

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

export declare function StatCard({ label, value, accent, danger, hint, title, delta, sparklineData, to, as: As, onClick, mono, className, style, 'data-testid': testId, }: StatCardProps): JSX.Element;

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
    className?: string;
    style?: CSSProperties;
    'data-testid'?: string;
}

export declare function StatStrip({ items, frameless, connectors, variant, className, 'aria-label': ariaLabel, 'data-testid': testId, }: StatStripProps): JSX.Element;

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

export declare function StatusPill({ state: stateProp, tone, label, icon, meta, size, variant, className, 'data-testid': testId, }: StatusPillProps): JSX.Element;

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

export declare interface SubNavItem {
    /** Path relative to the section root, e.g. "summary" or "crawl". For action
     *  items (onClick set), this is just used as a React key — provide something
     *  unique like "halt" or "manual". */
    path: string;
    label: string;
    /** Optional small badge (e.g. live count) shown right-aligned. */
    count?: number | string;
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

export declare function SubNavLayout({ title, items, titleAction, railHeader, railWidth, storageKey, secondaryTitle, secondaryItems, secondaryStorageKey, secondaryRailWidth, renderNavItem, railLabel, contentAs, contentLabel, children, }: SubNavLayoutProps): JSX.Element;

export declare interface SubNavLayoutProps {
    /** Section title shown at top of the rail. */
    title: string;
    items: SubNavItem[];
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

export declare interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
    badge?: ReactNode;
    disabled?: boolean;
    /** data-testid rendered on this tab's trigger button. Overrides Tabs' `getItemTestId` for this item. */
    testId?: string;
}

export declare function Table({ children, className, ...rest }: TableProps): JSX.Element;

export declare function TableBody({ children, className, ...rest }: TableBodyProps): JSX.Element;

export declare interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare function TableHead({ children, className, ...rest }: TableHeadProps): JSX.Element;

export declare interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

export declare interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
}

export declare function TableRow({ children, clickable, className, ...rest }: TableRowProps): JSX.Element;

export declare interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    clickable?: boolean;
}

export declare function TableTd({ children, className, ...rest }: TableTdProps): JSX.Element;

export declare interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
}

export declare function TableTh({ children, sortable, sortDirection, className, ...rest }: TableThProps): JSX.Element;

export declare interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    sortable?: boolean;
    sortDirection?: 'asc' | 'desc' | null;
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

export declare function Tabs({ items, value, onValueChange, variant, size, badgeStyle, className, style, 'aria-label': ariaLabel, idPrefix: idPrefixProp, getItemTestId, stretch, itemClassName, 'data-testid': testId, }: TabsProps): JSX.Element;

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

/** Alias kept for clarity in contexts where "terminal log" reads better. */
export declare const TerminalLog: typeof LogStream;

declare function Text_2({ as, className, title, children, wrap, ...rest }: TextProps): JSX.Element;
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

export declare interface TextProps {
    /** Element to render as. Default `'span'`. */
    as?: 'span' | 'div' | 'p' | 'li';
    className?: string;
    title?: string;
    /** Forwarded to `Inline`'s own `wrap` (`flex-wrap` vs not). Default
     *  `false` — a single line of text, matching a plain inline element. */
    wrap?: boolean;
    role?: string;
    'aria-label'?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
    onClick?: MouseEventHandler<HTMLElement>;
    'data-testid'?: string;
    id?: string;
    children?: ReactNode;
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

export declare const TONES: readonly ["neutral", "success", "warning", "danger", "info", "caution", "accent"];

/**
 * The raw CSS variable for a tone's solid swatch, for the rare caller that
 * needs a colour value rather than a class (canvas/SVG fills, chart series).
 * Prefer the class maps above wherever a class will do.
 */
export declare function toneVar(tone: ToneOrAlias): string;

export declare function Toolbar({ children, end, tone, size, sticky, bordered, wrap, className, 'aria-label': ariaLabel, 'data-testid': testId, }: ToolbarProps): JSX.Element;

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
     */
    size?: TreeViewSize;
    className?: string;
    'data-testid'?: string;
}

export declare type TreeViewSize = 'sm' | 'md';

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

/** A tray with an arrow leaving it: "upload". Since 2.389.6. */
export declare function UploadIcon({ size, ...rest }: GlyphProps): JSX.Element;

export declare function useCommandPalette(): CommandPaletteController;

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

export declare function useToast(): ToastContextValue;

/**
 * Non-throwing variant, for components that WANT to toast but must still
 * mount where no provider exists — a widget reused inside a panel or
 * rendered bare in a component test. Callers use `toast?.(…)`; the
 * notification is simply skipped rather than crashing the subtree.
 */
export declare function useToastOptional(): ToastContextValue | null;

/** A camera body: start a video call. Distinct from video/MediaIcons' VideoIcon, which is a call CONTROL. */
export declare function VideoCallIcon({ size, ...rest }: GlyphProps): JSX.Element;

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

export declare function WorkArea({ breadcrumbs, toolbar, children, status, padded, tone, className, bodyClassName, 'data-testid': testId, }: WorkAreaProps): JSX.Element;

export declare interface WorkAreaProps {
    /** The trail row. Usually a `<Breadcrumbs>`; renders nothing when omitted. */
    breadcrumbs?: ReactNode;
    /** The action row. Usually a `<Toolbar>`. Sits below the trail. */
    toolbar?: ReactNode;
    /** Scrolling page content. */
    children: ReactNode;
    /** Pinned bottom row — counts, freshness, a connection pill. */
    status?: ReactNode;
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

export declare interface WorkflowStep {
    step: number;
    label: string;
    done: boolean;
    active: boolean;
}

export declare function WorkflowStepper({ steps, size, className, 'data-testid': testId }: WorkflowStepperProps): JSX.Element;

export declare interface WorkflowStepperProps {
    steps: WorkflowStep[];
    size?: 'sm' | 'md';
    className?: string;
    'data-testid'?: string;
}

export { }


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
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}
