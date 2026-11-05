// StatCard — metric display card.
//
// Renders a labeled value tile (e.g. "Active Users · 1,284"). Variants:
//   - accent:        tinted primary background + left accent border.
//   - danger:        tinted danger background + left danger border.
//   - hint:          tiny italic helper text below the value.
//   - to:            wraps the card in a link. Defaults to <a href>; pass
//                    `as={Link}` (e.g. React Router's Link) for client-side
//                    navigation — the `to` string is forwarded as-is so the
//                    router's prop name matches.
//   - mono:          renders the value in a monospace font (good for counts/IDs).
//   - onClick:       clickable card without a URL (uses <button>).
//   - delta:         trend indicator (▲/▼ + percent) shown below the value.
//   - sparklineData: small inline trend line rendered next to the value.

import type { CSSProperties, ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import Sparkline from './Sparkline';
import { useDensitySize } from './Density';

export interface StatCardDelta {
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

export interface StatCardProps {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const DELTA_TONE_CLASS: Record<NonNullable<StatCardDelta['tone']>, string> = {
  positive: 'text-[var(--color-success)]',
  negative: 'text-[var(--color-danger)]',
  neutral: 'text-[var(--color-text-secondary)]',
};

function resolveDeltaTone(delta: StatCardDelta): NonNullable<StatCardDelta['tone']> {
  return delta.tone ?? (delta.direction === 'up' ? 'positive' : 'negative');
}

export function StatCard({
  label,
  value,
  accent = false,
  danger = false,
  hint,
  title,
  delta,
  sparklineData,
  to,
  as: As,
  onClick,
  mono = false,
  size: sizeProp,
  className,
  style,
  'data-testid': testId,
}: StatCardProps) {
  const size = useDensitySize('StatCard', sizeProp, { comfortable: 'md', compact: 'sm' });
  const baseClasses = cn(
    'block rounded-lg border p-3 no-underline transition-colors',
    !accent && !danger && 'bg-[var(--color-surface)] border-[var(--color-border)]',
    accent && 'bg-[var(--color-primary-soft)] border-l-[3px] border-l-[var(--color-primary)] border-[var(--color-border)]',
    danger && 'bg-[var(--color-danger-bg)] border-l-[3px] border-l-[var(--color-danger)] border-[var(--color-border)]',
    (to || onClick) && 'hover:bg-[var(--color-surface-hover)] cursor-pointer',
    className,
  );

  const sparkline = sparklineData && sparklineData.length > 0 ? sparklineData : null;

  let deltaNode: ReactNode = null;
  if (delta) {
    const tone = resolveDeltaTone(delta);
    const arrow = delta.direction === 'up' ? '▲' : '▼';
    const sign = delta.direction === 'up' ? '+' : '-';
    const suffix = delta.suffix ?? '%';
    const magnitude = Math.abs(delta.value);
    const deltaAriaLabel = delta['aria-label'] ?? `${delta.direction} ${magnitude}${suffix}`;
    deltaNode = (
      <div
        data-testid="stat-card-delta"
        data-direction={delta.direction}
        data-tone={tone}
        aria-label={deltaAriaLabel}
        className={cn('mt-1 text-[12px] font-medium leading-tight', DELTA_TONE_CLASS[tone])}
      >
        <span aria-hidden="true">{arrow} </span>
        {sign}
        {magnitude}
        {suffix}
      </div>
    );
  }

  const content = (
    <>
      <div className="text-[12px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </div>
      <div className="mt-1 flex items-center gap-2">
        <div
          className={cn(
            size === 'sm' ? 'text-sm font-semibold leading-5 text-[var(--color-text-primary)]' : 'text-[24px] font-bold leading-tight text-[var(--color-text-primary)]',
            mono && 'font-mono',
          )}
        >
          {value}
        </div>
        {sparkline && <Sparkline data={sparkline} width={80} height={20} />}
      </div>
      {deltaNode}
      {hint != null && (
        <div className={cn('mt-1 italic text-[var(--color-text-tertiary)]', size === 'sm' ? 'text-xs' : 'text-[11px]')}>
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
        <As to={to} title={title} data-testid={testId} className={baseClasses} style={style}>
          {content}
        </As>
      );
    }
    return (
      <a href={to} title={title} data-testid={testId} className={baseClasses} style={style}>
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        data-ui-part=""
        type="button"
        onClick={onClick}
        title={title}
        data-testid={testId}
        className={cn(baseClasses, 'w-full text-left')}
        style={style}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-testid={testId} title={title} className={baseClasses} style={style}>
      {content}
    </div>
  );
}

export default StatCard;
