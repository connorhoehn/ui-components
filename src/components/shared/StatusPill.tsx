// src/components/shared/StatusPill.tsx
//
// Generic semantic-state pill. Unlike ConnectionPill (domain-specific) and
// Badge (count/dot only), StatusPill is a general label + color chip for any
// named state: success, error, warning, info, neutral, pending.
//
// pending state carries a pulse animation via animate-ping on the dot so the
// pill itself never needs a custom @keyframes block. Color tokens map to
// Tailwind semantic classes only — no hex.
//
// 2.380.0: `meta` — a quieter clause after the label, "· 29m ago", in the
// tertiary ink so the verdict stays the loud part; `variant="text"` — the dot
// and the coloured label with no box at all, for a list row where a bordered
// pill beside every title reads as twelve buttons; and `danger` as a spelling
// of `error`, so a caller that thinks in the library's tone names
// (success / warning / danger / neutral) does not have to translate.

import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type StatusPillState =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'neutral'
  | 'pending';

/**
 * What `state` accepts: a `StatusPillState`, or `danger` — the same tokens as
 * `error`, in the library's tone spelling (success / warning / danger /
 * neutral). Kept out of `StatusPillState` so a `Record<StatusPillState, …>`
 * elsewhere does not have to grow a duplicate key.
 */
export type StatusPillTone = StatusPillState | 'danger';

export type StatusPillSize = 'sm' | 'md';

/**
 * `pill` (default) is the bordered, tinted chip. `text` is dot + coloured label, no box.
 * `tag` (since 2.386.5) is a soft rounded-rectangle label with no dot and no
 * border — a document's "Draft" beside its title. `label` (since 2.386.15) is
 * the tag's soft rectangle WITH the dot — a scope's "● In progress".
 */
export type StatusPillVariant = 'pill' | 'text' | 'tag' | 'label';

export interface StatusPillProps {
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

interface PillTokens {
  pill: string;
  dot: string;
  text: string;
}

const STATE_TOKENS: Record<StatusPillTone, PillTokens> = {
  success: {
    pill: 'bg-success-bg border-success-border',
    dot:  'bg-success',
    text: 'text-success-fg',
  },
  error: {
    pill: 'bg-danger-bg border-danger-border',
    dot:  'bg-danger',
    text: 'text-danger-fg',
  },
  danger: {
    pill: 'bg-danger-bg border-danger-border',
    dot:  'bg-danger',
    text: 'text-danger-fg',
  },
  warning: {
    pill: 'bg-warning-bg border-warning-border',
    dot:  'bg-warning',
    text: 'text-warning-fg',
  },
  info: {
    pill: 'bg-info-bg border-info-border',
    dot:  'bg-info',
    text: 'text-info-fg',
  },
  neutral: {
    pill: 'bg-surface-hover border-border',
    dot:  'bg-surface-emphasis',
    text: 'text-text-primary',
  },
  pending: {
    pill: 'bg-accent-bg border-accent-border',
    dot:  'bg-accent',
    text: 'text-accent-fg',
  },
};

const SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'px-1.5 py-0.5 text-[10px] gap-1',
  md: 'px-2.5 py-1 text-[12px] gap-1', // dot gap 4px since 2.516.2 (was 6px)
};

/** The text variant keeps the type size and gap, drops the padding with the box. */
const TEXT_SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'text-[10px] gap-1',
  md: 'text-[12px] gap-1',
};

const TAG_SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'px-1.5 py-0.5 text-[11px] gap-1',
  md: 'px-2 py-[5px] text-[12px] gap-1', // 12px since 2.515.12 (was 13px); dot gap 4px since 2.516.2 (was 6px)
};

const DOT_SIZE_CLASSES: Record<StatusPillSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
};

export function StatusPill({
  state: stateProp,
  tone,
  label,
  icon,
  meta,
  size = 'md',
  variant = 'pill',
  truncate = true,
  className,
  'data-testid': testId,
}: StatusPillProps) {
  // A run state that arrived from a server the UI wasn't built against gives
  // `undefined` here, and the property reads below then threw — taking down
  // the whole table this pill sits in, not just the one cell. Degrade the
  // STYLING, never the value: `data-state` and the label keep the real state,
  // so an unrecognised status is still legible and still reportable.
  const state = tone ?? stateProp ?? 'neutral';
  const tokens = STATE_TOKENS[state] ?? STATE_TOKENS.neutral ?? Object.values(STATE_TOKENS)[0];
  const isPending = state === 'pending';

  return (
    <span
      role="status"
      data-testid={testId}
      data-state={state}
      data-variant={variant}
      className={cn(
        // One line, always: in a narrow pane "Completed" broke into
        // "Compl / eted". The pill may shrink with its row, ellipsizing the
        // label (full text in `title`), but never wraps.
        'inline-flex max-w-full min-w-0 items-center font-medium leading-none select-none',
        truncate ? 'whitespace-nowrap' : 'whitespace-normal',
        variant === 'pill' ? cn('rounded-full border', tokens.pill, SIZE_CLASSES[size])
          : variant === 'tag' || variant === 'label' ? cn('rounded-md border-0', tokens.pill, TAG_SIZE_CLASSES[size])
          : TEXT_SIZE_CLASSES[size],
        variant === 'tag' && state === 'neutral' ? 'text-text-primary' : tokens.text,
        className,
      )}
    >
      {variant === 'tag' ? null : icon ? (
        <span aria-hidden="true" className="shrink-0">{icon}</span>
      ) : (
        // Dot indicator — pending gets a relative container with an animate-ping halo.
        <span className={cn('relative inline-flex shrink-0', DOT_SIZE_CLASSES[size])}>
          {isPending && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 rounded-full animate-ping opacity-75',
                tokens.dot,
              )}
            />
          )}
          <span
            aria-hidden="true"
            className={cn('relative rounded-full', DOT_SIZE_CLASSES[size], tokens.dot)}
          />
        </span>
      )}
      <span className={truncate ? 'min-w-0 truncate' : 'min-w-0 leading-tight'} title={truncate ? label : undefined} data-status-pill-label="">{label}</span>
      {meta && (
        <span data-testid={testId ? `${testId}-meta` : undefined} className="shrink-0 font-normal text-text-tertiary">
          <span aria-hidden="true">· </span>
          {meta}
        </span>
      )}
    </span>
  );
}

export default StatusPill;
