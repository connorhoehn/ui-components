// src/components/ui/Disclosure.tsx
//
// A native `<details>/<summary>` collapsible: expand/collapse and the
// arrow-key / Enter / Space handling come from the browser for free, and a
// screen reader announces "button, collapsed/expanded" without any ARIA
// wiring here. `ThinkingBlock` (components/shared) hand-rolled this same
// element for one call site; this is the general-purpose version — summary
// as a `ReactNode` (not just a string), a real controlled/uncontrolled
// `open` contract, and an optional semantic `tone` for the summary row.

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronIcon } from './Icons';
import { TONE_BORDER, TONE_SOFT, toneKey, type ToneOrAlias } from '../shared/tones';

export interface DisclosureProps {
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

export function Disclosure({
  summary,
  children,
  open,
  defaultOpen = false,
  onToggle,
  tone,
  density = 'default',
  variant = 'default',
  hint,
  size = 'md',
  className,
  summaryClassName,
  bodyClassName,
  'data-testid': testId = 'disclosure',
}: DisclosureProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const resolvedOpen = isControlled ? open : uncontrolledOpen;

  const detailsRef = useRef<HTMLDetailsElement>(null);

  // Native `<details>` mutates its own `open` attribute on click before
  // React re-renders. In the controlled case the source of truth is the
  // `open` prop, not that attribute, so force the DOM back in sync whenever
  // the resolved value changes from outside a click (e.g. a parent flips
  // `open` from elsewhere in the app) — React's prop diffing alone won't
  // catch this because the native toggle already moved the attribute out
  // from under it without going through a React-tracked change.
  useEffect(() => {
    const el = detailsRef.current;
    if (el && el.open !== resolvedOpen) el.open = resolvedOpen;
  }, [resolvedOpen]);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const next = e.currentTarget.open;
    if (!isControlled) setUncontrolledOpen(next);
    onToggle?.(next);
  };

  const key = tone !== undefined ? toneKey(tone) : undefined;
  const compact = density === 'compact';
  const plain = variant === 'plain';
  const lg = size === 'lg' && !compact;
  const hasHint = hint != null && hint !== false;

  return (
    <details
      ref={detailsRef}
      open={resolvedOpen}
      onToggle={handleToggle}
      data-testid={testId}
      data-size={lg ? 'lg' : undefined}
      className={cn(
        'group',
        !plain && 'rounded-md border overflow-hidden',
        compact ? 'text-xs' : 'text-sm',
        !plain && (key ? TONE_BORDER[key] : 'border-border'),
        className,
      )}
    >
      <summary
        data-testid={`${testId}-summary`}
        className={cn(
          'flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden',
          compact ? 'px-3 py-1' : lg ? (plain ? 'gap-3 px-0 py-0.5' : 'gap-3 px-3 py-2.5') : 'px-3 py-2',
          plain
            ? cn('text-text-primary', !lg && 'hover:bg-surface-hover')
            : (key ? TONE_SOFT[key] : 'bg-surface text-text-primary hover:bg-surface-hover'),
          summaryClassName,
        )}
      >
        <ChevronIcon
          size={compact ? 11 : lg ? 16 : 14}
          dir="right"
          className={cn('shrink-0 transition-transform duration-150 group-open:rotate-90', lg && 'text-text-secondary')}
        />
        {hasHint ? (
          <span className="flex min-w-0 flex-1 items-baseline gap-x-6">
            <span className={cn('min-w-0 shrink-0', lg && 'text-[19px] font-semibold leading-7')}>{summary}</span>
            <span className={cn('min-w-0 truncate text-text-tertiary', lg ? 'text-sm' : 'text-xs')} data-testid={`${testId}-hint`}>{hint}</span>
          </span>
        ) : (
          <span className={cn('min-w-0 flex-1', lg && 'text-[19px] font-semibold leading-7')}>{summary}</span>
        )}
      </summary>
      <div
        data-testid={`${testId}-body`}
        className={cn(
          !plain && 'border-t',
          compact ? 'px-3 py-1' : 'px-3 py-2',
          !plain && (key ? TONE_BORDER[key] : 'border-border'),
          bodyClassName,
        )}
      >
        {children}
      </div>
    </details>
  );
}
