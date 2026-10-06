import { type ReactNode } from 'react';
import type { SurfaceTone } from './tones';
/** @see SurfaceTone — which colour family the empty state paints in. */
export type EmptyStateTone = SurfaceTone;
/**
 * `md` is the page-body block (220px minimum, 52px glyph). `sm` is for a
 * lane or list group that is one of several on the page: no minimum height,
 * a 28px glyph and a 14px title, so three empty lanes fit above the fold.
 */
export type EmptyStateSize = 'md' | 'sm' | 'lg';
/**
 * A "how this works" block under the main message, past a rule — a heading,
 * a few lines of explanation, and one quiet action ("Refresh this view").
 * Since 2.390.0.
 */
export interface EmptyStateDetails {
    title: string;
    body?: ReactNode;
    action?: EmptyStateAction;
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
export type EmptyStateDensity = 'default' | 'compact';
export interface EmptyStateAction {
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
export interface EmptyStateProps {
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
declare function EmptyState({ icon, title, body, description, actionLabel, onAction, action, actions, testId, actionTestId, tone, className, size, density, align, actionsDirection, details, }: EmptyStateProps): import("react").JSX.Element;
export default EmptyState;
//# sourceMappingURL=EmptyState.d.ts.map