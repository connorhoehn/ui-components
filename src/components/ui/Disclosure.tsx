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

  return (
    <details
      ref={detailsRef}
      open={resolvedOpen}
      onToggle={handleToggle}
      data-testid={testId}
      className={cn(
        'group rounded-md border overflow-hidden',
        compact ? 'text-xs' : 'text-sm',
        key ? TONE_BORDER[key] : 'border-border',
        className,
      )}
    >
      <summary
        data-testid={`${testId}-summary`}
        className={cn(
          'flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden',
          compact ? 'px-2 py-1' : 'px-3 py-2',
          key ? TONE_SOFT[key] : 'bg-surface text-text-primary hover:bg-surface-hover',
          summaryClassName,
        )}
      >
        <ChevronIcon
          size={compact ? 11 : 14}
          dir="right"
          className="shrink-0 transition-transform duration-150 group-open:rotate-90"
        />
        <span className="min-w-0 flex-1">{summary}</span>
      </summary>
      <div
        data-testid={`${testId}-body`}
        className={cn(
          'border-t',
          compact ? 'px-2 py-1' : 'px-3 py-2',
          key ? TONE_BORDER[key] : 'border-border',
          bodyClassName,
        )}
      >
        {children}
      </div>
    </details>
  );
}
