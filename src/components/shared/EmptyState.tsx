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
import type { SurfaceTone } from './tones';

/** @see SurfaceTone — which colour family the empty state paints in. */
export type EmptyStateTone = SurfaceTone;

/**
 * `md` is the page-body block (220px minimum, 52px glyph). `sm` is for a
 * lane or list group that is one of several on the page: no minimum height,
 * a 28px glyph and a 14px title, so three empty lanes fit above the fold.
 */
export type EmptyStateSize = 'md' | 'sm';

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
    cta: 'bg-primary text-white',
    actionPrimary: 'bg-primary text-white border border-transparent hover:bg-primary/90',
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
   * Defaults to `primary` for the first action, `secondary` for the rest.
   */
  variant?: 'primary' | 'secondary';
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
}

function EmptyState({
  icon, title, body, description, actionLabel, onAction, action, actions,
  testId = 'empty-state', actionTestId = 'empty-state-action',
  tone = 'surface', className, size = 'md', density = 'default',
}: EmptyStateProps) {
  const resolvedDescription = description ?? body;
  const palette: Palette = TONE[tone] ?? TONE.surface;
  const small = size === 'sm';
  const compact = density === 'compact';
  return (
    <div
      data-testid={testId}
      className={cn(
        compact
          ? 'flex flex-row flex-wrap items-center gap-1.5 py-1 text-[13px] font-[inherit]'
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
        <div className={cn(small ? 'text-[14px] font-semibold' : 'text-[17px] font-semibold', palette.title)}>{title}</div>
      )}
      {resolvedDescription && (
        compact ? (
          <span className={palette.description}>{resolvedDescription}</span>
        ) : (
          <div className={cn('text-[13px] text-center max-w-[340px] leading-normal', palette.description)}>
            {resolvedDescription}
          </div>
        )
      )}
      {actions && actions.length > 0
        ? <GuidedActionList actions={actions} palette={palette} />
        : action
          ? <div className="mt-2.5">{action}</div>
          : actionLabel && onAction && (
              <button
                data-testid={actionTestId}
                onClick={onAction}
                className={cn(
                  'mt-2.5 px-[22px] py-[9px] text-sm font-semibold',
                  'border-none rounded-lg cursor-pointer font-[inherit]',
                  palette.cta,
                )}
              >
                {actionLabel}
              </button>
            )}
    </div>
  );
}

function GuidedActionList({ actions, palette }: { actions: EmptyStateAction[]; palette: Palette }) {
  return (
    <ul
      data-testid="empty-state-actions"
      className="mt-3 flex flex-col gap-3 w-full max-w-[420px]"
    >
      {actions.map((a, i) => (
        <li key={`${a.label}-${i}`} className="flex flex-col gap-1.5">
          <GuidedAction
            action={a}
            defaultVariant={i === 0 ? 'primary' : 'secondary'}
            palette={palette}
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
}: {
  action: EmptyStateAction;
  defaultVariant: 'primary' | 'secondary';
  palette: Palette;
}) {
  const variant = action.variant ?? defaultVariant;
  const className = cn(
    'inline-flex items-center justify-center self-stretch',
    'px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer',
    'transition-colors font-[inherit]',
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
