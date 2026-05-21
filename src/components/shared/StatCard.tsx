// StatCard — metric display card.
//
// Renders a labeled value tile (e.g. "Active Users · 1,284"). Variants:
//   - accent: tinted primary background + left accent border.
//   - danger: tinted danger background + left danger border.
//   - hint:   tiny italic helper text below the value.
//   - to:     wraps the card in a link. Defaults to <a href>; pass `as={Link}`
//             (e.g. React Router's Link) for client-side navigation — the `to`
//             string is forwarded as-is so the router's prop name matches.
//   - mono:   renders the value in a monospace font (good for counts/IDs).
//   - onClick: clickable card without a URL (uses <button>).

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface StatCardProps {
  label: ReactNode;
  value: ReactNode;
  accent?: boolean;
  danger?: boolean;
  hint?: ReactNode;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: ElementType<any>;
  /** Click handler — renders a <button> wrapper if no `to` is given. */
  onClick?: () => void;
  mono?: boolean;
  className?: string;
  style?: CSSProperties;
  'data-testid'?: string;
}

export function StatCard({
  label,
  value,
  accent = false,
  danger = false,
  hint,
  to,
  as: As,
  onClick,
  mono = false,
  className,
  style,
  'data-testid': testId,
}: StatCardProps) {
  const baseClasses = cn(
    'block rounded-lg border p-3 no-underline transition-colors',
    !accent && !danger && 'bg-[var(--color-surface)] border-[var(--color-border)]',
    accent && 'bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]',
    danger && 'bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]',
    (to || onClick) && 'hover:bg-[var(--color-surface-hover)] cursor-pointer',
    className,
  );

  const content = (
    <>
      <div className="text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </div>
      <div
        className={cn(
          'mt-1 text-[24px] font-bold leading-tight text-[var(--color-text-primary)]',
          mono && 'font-mono',
        )}
      >
        {value}
      </div>
      {hint != null && (
        <div className="mt-1 text-[11px] italic text-[var(--color-text-tertiary)]">
          {hint}
        </div>
      )}
    </>
  );

  if (to) {
    // Custom component (e.g. React Router Link) — pass `to` directly so the
    // router's prop name matches. Plain <a> gets `href` instead.
    if (As) {
      return (
        <As to={to} data-testid={testId} className={baseClasses} style={style}>
          {content}
        </As>
      );
    }
    return (
      <a href={to} data-testid={testId} className={baseClasses} style={style}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-testid={testId}
        className={cn(baseClasses, 'w-full text-left')}
        style={style}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-testid={testId} className={baseClasses} style={style}>
      {content}
    </div>
  );
}

export default StatCard;
