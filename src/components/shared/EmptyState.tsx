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
}

function EmptyState({
  icon, title, body, description, actionLabel, onAction, action, actions,
  testId = 'empty-state', actionTestId = 'empty-state-action',
}: EmptyStateProps) {
  const resolvedDescription = description ?? body;
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex flex-col items-center justify-center min-h-[220px]',
        'text-text-tertiary gap-2 p-8 font-[inherit]',
      )}
    >
      {icon && (
        typeof icon === 'string'
          ? <div className="text-[52px] mb-2">{icon}</div>
          : <div className="mb-2">{icon}</div>
      )}
      <div className="text-[17px] font-semibold text-neutral">{title}</div>
      {resolvedDescription && (
        <div className="text-[13px] text-center max-w-[340px] text-text-tertiary leading-normal">
          {resolvedDescription}
        </div>
      )}
      {actions && actions.length > 0
        ? <GuidedActionList actions={actions} />
        : action
          ? <div className="mt-2.5">{action}</div>
          : actionLabel && onAction && (
              <button
                data-testid={actionTestId}
                onClick={onAction}
                className={cn(
                  'mt-2.5 px-[22px] py-[9px] text-sm font-semibold',
                  'bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]',
                )}
              >
                {actionLabel}
              </button>
            )}
    </div>
  );
}

function GuidedActionList({ actions }: { actions: EmptyStateAction[] }) {
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
          />
          {a.code && <CopyableCode code={a.code} />}
        </li>
      ))}
    </ul>
  );
}

function GuidedAction({
  action,
  defaultVariant,
}: {
  action: EmptyStateAction;
  defaultVariant: 'primary' | 'secondary';
}) {
  const variant = action.variant ?? defaultVariant;
  const className = cn(
    'inline-flex items-center justify-center self-stretch',
    'px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer',
    'transition-colors font-[inherit]',
    variant === 'primary'
      ? 'bg-primary text-white border border-transparent hover:bg-primary/90'
      : 'bg-transparent text-text-primary border border-border-emphasis hover:bg-surface-panel',
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

function CopyableCode({ code }: { code: string }) {
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
        'bg-surface-inverse text-text-inverse text-[12px] font-mono leading-snug',
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
          'border border-border-emphasis hover:bg-surface-inverse cursor-pointer',
          copied ? 'text-success-fg border-success/50' : 'text-text-inverse',
        )}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default EmptyState;
