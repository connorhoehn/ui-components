// frontend/src/components/shared/EmptyState.tsx
//
// Centered empty-state card. Mirrors the IdlePanel style from
// DocumentTypesPage: 52px emoji, 17px/600 slate-600 headline, 13px/slate-400
// body capped at 340px, optional indigo primary CTA.
//
// API surface (additive — all three paths backwards-compat):
//   - `body` + `actionLabel` + `onAction`         — original simple API
//   - `description` + `action` (ReactNode)        — composable single-CTA API
//   - `actions` (EmptyStateAction[])              — multi-action "what to do
//                                                   next" API; each action may
//                                                   optionally carry a copy-
//                                                   to-clipboard code snippet
// Precedence when more than one is supplied:
//   actions[]  >  action (ReactNode)  >  actionLabel + onAction
//
// Multi-action API ships per blocker #54 → handoff #470 (operator picked
// Option A — extend EmptyState rather than ship a separate GuidedEmptyState
// composite). Replaces the bespoke portal `<SmartEmptyState>` (209 LOC) so
// every observability empty-state page can use the shared primitive.

import { useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useDensitySize } from './Density';
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the empty state paints in. */
export type EmptyStateTone = SurfaceTone;

/**
 * `md` is the page-body block (220px minimum, 52px glyph). `sm` is for a
 * lane or list group that is one of several on the page: no minimum height,
 * a 28px glyph and a 14px title, so three empty lanes fit above the fold.
 * Since 2.436.1 `sm` is the app's body step throughout: 14/600 title, 14/400
 * description (was 13px), a `Button size="sm"`-sized CTA (26px, 12/600 — was
 * a 38px padded button) and a 14/600 details heading (was 18px).
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

const TONE = {
  surface: {
    container: 'text-text-tertiary',
    title: 'text-neutral',
    description: 'text-text-tertiary',
    cta: 'bg-primary text-on-primary',
    actionPrimary: 'bg-primary text-on-primary border border-transparent hover:bg-primary/90',
    actionSecondary:
      'bg-transparent text-text-primary border border-border-emphasis hover:bg-surface-panel',
    code: 'bg-surface-inverse text-text-inverse',
    copy: 'border border-border-emphasis hover:bg-surface-inverse',
    copyIdle: 'text-text-inverse',
    copyDone: 'text-success-fg border-success/50',
  },
  code: {
    container: 'text-code-muted',
    title: 'text-code-text',
    description: 'text-code-muted',
    cta: 'bg-code-blue text-code-bg',
    actionPrimary: 'bg-code-blue text-code-bg border border-transparent hover:bg-code-blue/90',
    actionSecondary:
      'bg-transparent text-code-text border border-code-border hover:bg-code-surface',
    code: 'bg-code-bg text-code-text',
    copy: 'border border-code-border hover:bg-code-surface',
    copyIdle: 'text-code-subtle',
    copyDone: 'text-code-green border-code-green/50',
  },
} as const;

type Palette = (typeof TONE)[EmptyStateTone];

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

function EmptyState({
  icon, title, body, description, actionLabel, onAction, action, actions,
  testId = 'empty-state', actionTestId = 'empty-state-action',
  tone = 'surface', className, size: sizeProp, layout, density = 'default',
  align = 'center', actionsDirection = 'column', details,
}: EmptyStateProps) {
  const resolvedDescription = description ?? body;
  const palette: Palette = TONE[tone] ?? TONE.surface;
  const size = useDensitySize<EmptyStateSize>('EmptyState', sizeProp, { comfortable: 'md', compact: 'sm' });
  const small = size === 'sm';
  const large = size === 'lg';
  const compact = (layout ?? (density === 'compact' ? 'line' : 'block')) === 'line';
  const start = align === 'start' && !compact;
  return (
    <div
      data-testid={testId}
      // A semantic marker for the DOM audit (panel.empty-height): the test id
      // is overridable, so "this is an empty state" needs its own attribute.
      data-ui-empty=""
      data-align={align}
      data-size={size}
      className={cn(
        compact
          ? 'flex flex-row flex-wrap items-center gap-1.5 py-1 text-[13px] font-[inherit]'
          : start
            ? cn('flex flex-col items-start text-left font-[inherit]', small ? 'gap-1' : large ? 'gap-2' : 'gap-1.5')
            : cn(
                'flex flex-col items-center justify-center font-[inherit]',
                small ? 'gap-1 px-4 py-6' : 'min-h-[220px] gap-2 p-8',
              ),
        palette.container,
        className,
      )}
    >
      {icon && (
        compact
          ? <span className="leading-none" aria-hidden="true">{icon}</span>
          : typeof icon === 'string'
            ? <div className={cn(small ? 'text-[28px] mb-1 leading-none' : 'text-[52px] mb-2')} aria-hidden="true">{icon}</div>
            : <div className={small ? 'mb-1' : 'mb-2'}>{icon}</div>
      )}
      {/* Compact borrows the DESCRIPTION colour and a normal weight: at one
          line the title is the whole message, and a bold slate heading in a
          card that already has a heading reads as a second heading. It is a
          <span> so the line keeps flowing beside the icon and description. */}
      {compact ? (
        <span className={cn('font-normal', palette.description)}>{title}</span>
      ) : (
        <div
          className={cn(
            small ? 'text-[14px] font-semibold' : large ? 'text-[24px] font-bold leading-8 tracking-[-0.01em]' : start ? 'text-lg font-semibold leading-7' : 'text-lg font-semibold',
            // A page-scale or start-aligned message is a heading in body ink,
            // not the muted slate of a placeholder.
            large || start ? 'text-text-primary' : palette.title,
          )}
        >
          {title}
        </div>
      )}
      {resolvedDescription && (
        compact ? (
          <span className={palette.description}>{resolvedDescription}</span>
        ) : (
          <div
            className={cn(
              start ? 'text-left' : 'text-center max-w-[340px]',
              large ? 'text-base leading-[25px] text-text-secondary' : start && !small ? 'text-base leading-6 text-text-secondary'
                : cn(small ? 'text-sm leading-normal' : 'text-[13px] leading-normal', palette.description),
            )}
          >
            {resolvedDescription}
          </div>
        )
      )}
      {actions && actions.length > 0
        ? <GuidedActionList actions={actions} palette={palette} direction={actionsDirection} large={large} start={start} />
        : action
          ? <div className="mt-2.5">{action}</div>
          : actionLabel && onAction && (
              <button
                data-testid={actionTestId}
                onClick={onAction}
                className={cn(
                  small
                    ? 'mt-2 inline-flex h-6.5 items-center px-2.5 text-xs font-semibold rounded-md'
                    : 'mt-2.5 px-[22px] py-[9px] text-sm font-semibold rounded-lg',
                  'border-none cursor-pointer font-[inherit]',
                  palette.cta,
                )}
              >
                {actionLabel}
              </button>
            )}
      {details && !compact && (
        <div className={cn('flex w-full flex-col gap-1.5 border-t border-border', large ? 'mt-[22px] pt-8' : 'mt-5 pt-5', start ? 'items-start text-left' : 'items-center text-center')} data-testid={`${testId}-details`}>
          <div className={cn('font-semibold text-text-primary', large ? 'text-xl leading-7' : small ? 'text-sm leading-normal' : 'text-lg leading-7')}>{details.title}</div>
          {details.body != null && (
            <div className="text-sm leading-6 text-text-secondary">{details.body}</div>
          )}
          {details.action && (
            <div className="mt-3">
              <GuidedAction action={details.action} defaultVariant="link" palette={palette} large={large} start={start} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GuidedActionList({
  actions, palette, direction = 'column', large = false, start = false,
}: { actions: EmptyStateAction[]; palette: Palette; direction?: 'column' | 'row'; large?: boolean; start?: boolean }) {
  const row = direction === 'row';
  return (
    <ul
      data-testid="empty-state-actions"
      data-direction={direction}
      className={cn(
        'm-0 list-none p-0',
        row ? cn('flex flex-row flex-wrap items-center gap-4', start ? 'justify-start' : 'justify-center') : 'flex flex-col gap-3 w-full max-w-[420px]',
        // lg: 8px under the body (with the stack's own 8px gap, 16px) — the
        // Initiatives mockup's pitch from the second line to the buttons.
        large ? 'mt-2' : start ? 'mt-0' : 'mt-3',
      )}
    >
      {actions.map((a, i) => (
        <li key={`${a.label}-${i}`} className="flex flex-col gap-1.5">
          <GuidedAction
            action={a}
            defaultVariant={i === 0 ? 'primary' : 'secondary'}
            palette={palette}
            large={large}
            inline={row}
            start={start}
          />
          {a.code && <CopyableCode code={a.code} palette={palette} />}
        </li>
      ))}
    </ul>
  );
}

function GuidedAction({
  action,
  defaultVariant,
  palette,
  large = false,
  inline = false,
  start = false,
}: {
  action: EmptyStateAction;
  defaultVariant: 'primary' | 'secondary' | 'link';
  palette: Palette;
  large?: boolean;
  inline?: boolean;
  start?: boolean;
}) {
  const variant = action.variant ?? defaultVariant;
  const className = variant === 'link'
    ? cn(
        'inline-flex items-center gap-1 self-start border-0 bg-transparent p-0 font-medium text-primary no-underline',
        'cursor-pointer hover:underline [font-family:inherit]',
        large || start ? 'text-base' : 'text-sm',
      )
    : cn(
        'inline-flex items-center justify-center',
        inline ? 'self-start' : 'self-stretch',
        large ? 'px-[21px] py-[10px] text-base' : 'px-[18px] py-[8px] text-sm',
        'font-semibold rounded-lg cursor-pointer',
        // `[font-family:inherit]`, not `font-[inherit]`: tailwind-merge reads the
        // latter as a font WEIGHT and drops `font-semibold` (the buttons rendered
        // at 400). Since 2.390.0.
        'transition-colors [font-family:inherit]',
        variant === 'primary' ? palette.actionPrimary : palette.actionSecondary,
      );

  if (action.href) {
    const external = action.external === true;
    return (
      <a
        data-testid="empty-state-actions-link"
        href={action.href}
        onClick={action.onClick}
        className={className}
        {...(external
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          : null)}
      >
        {action.label}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  }

  return (
    <button
      type="button"
      data-testid="empty-state-actions-button"
      onClick={action.onClick}
      className={className}
    >
      {action.label}
    </button>
  );
}

function CopyableCode({ code, palette }: { code: string; palette: Palette }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API not available (insecure context, denied permission,
      // etc.) — swallow; the snippet is still visible for manual copy.
    }
  };

  return (
    <div
      data-testid="empty-state-action-code"
      className={cn(
        'relative flex items-start gap-2 rounded-md',
        'text-[12px] font-mono leading-snug',
        palette.code,
        'px-3 py-2',
      )}
    >
      <pre className="flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0">
        {code}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        data-testid="empty-state-action-code-copy"
        className={cn(
          'shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded',
          palette.copy,
          'cursor-pointer',
          copied ? palette.copyDone : palette.copyIdle,
        )}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default EmptyState;
