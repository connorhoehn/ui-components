// src/components/change-review/ChangeDiff.tsx
//
// WHAT happened to the text at that location: the before and the after.
//
// Two labelled rows with `-` / `+` gutters rather than an inline
// red/green strikethrough. Three reasons, in order of how often they bite:
//
//   1. These values are frequently one-word titles. An inline word-diff of
//      "Acme MSA 2026" → "Acme Master Services Agreement" has almost nothing in
//      common to align, so it degrades into exactly this two-row form anyway.
//   2. Red/green alone fails for anyone who cannot separate them. The gutter
//      marker and the "Now"/"Proposed" labels are the real signal; the tint is
//      reinforcement.
//   3. An empty side is meaningful — "(empty)" and "(removed)" are different
//      facts, and an inline diff renders both as nothing at all.

import { cn } from '../../lib/cn';

export interface ChangeDiffPair {
  before: string;
  after: string;
}

export interface ChangeDiffProps {
  pairs: readonly ChangeDiffPair[];
  /** Label for the current value. */
  beforeLabel?: string;
  /** Label for the value being proposed. */
  afterLabel?: string;
  className?: string;
  'data-testid'?: string;
}

function Side({
  marker,
  label,
  value,
  emptyText,
  tone,
  testId,
}: {
  marker: string;
  label: string;
  value: string;
  emptyText: string;
  tone: 'danger' | 'success';
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className={cn(
        'flex min-w-0 gap-2 rounded border px-2 py-1',
        tone === 'danger'
          ? 'border-danger-border bg-danger-bg'
          : 'border-success-border bg-success-bg',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'shrink-0 select-none font-mono text-xs leading-5',
          tone === 'danger' ? 'text-danger-fg/70' : 'text-success-fg/70',
        )}
      >
        {marker}
      </span>
      <div className="min-w-0 flex-1">
        <div
          className={cn(
            'text-xs uppercase tracking-wide',
            tone === 'danger' ? 'text-danger-fg/70' : 'text-success-fg/70',
          )}
        >
          {label}
        </div>
        <div
          className={cn(
            'break-words text-xs',
            tone === 'danger'
              ? 'text-danger-fg line-through decoration-danger-fg/40'
              : 'text-success-fg',
          )}
        >
          {value || <span className="italic no-underline opacity-60">{emptyText}</span>}
        </div>
      </div>
    </div>
  );
}

export function ChangeDiff({
  pairs,
  beforeLabel = 'Now',
  afterLabel = 'Proposed',
  className,
  'data-testid': testId = 'change-diff',
}: ChangeDiffProps) {
  if (pairs.length === 0) return null;

  return (
    <div data-testid={testId} className={cn('flex flex-col gap-2', className)}>
      {pairs.map((pair, i) => (
        <div key={i} className="flex flex-col gap-1">
          <Side
            marker="-"
            label={beforeLabel}
            value={pair.before}
            emptyText="(empty)"
            tone="danger"
            testId={`${testId}-before-${i}`}
          />
          <Side
            marker="+"
            label={afterLabel}
            value={pair.after}
            emptyText="(removed)"
            tone="success"
            testId={`${testId}-after-${i}`}
          />
        </div>
      ))}
    </div>
  );
}

export default ChangeDiff;
