// src/components/change-review/ChangeLocation.tsx
//
// WHERE in the document a change lands.
//
// Shaped like a diff hunk header on purpose. Reviewers already know how to read
// `@@ … @@` as "here is the coordinate, what follows is the edit", and a
// document has the same need a source file does: a change you cannot locate is
// a change you cannot evaluate. The breadcrumb is the document's equivalent of
// a file path, and `hint` its equivalent of a line number.

import { cn } from '../../lib/cn';

export interface ChangeLocationProps {
  /**
   * Breadcrumb from the document root, outermost first —
   * e.g. `['Section 4', 'Payment terms']`. An empty array renders the
   * document-level case rather than an empty strip.
   */
  path: readonly string[];
  /** Position within the target, e.g. `paragraph 3`. Optional. */
  hint?: string | undefined;
  /** Shown when `path` is empty. */
  rootLabel?: string;
  className?: string;
  'data-testid'?: string;
}

export function ChangeLocation({
  path,
  hint,
  rootLabel = 'Document level',
  className,
  'data-testid': testId = 'change-location',
}: ChangeLocationProps) {
  const crumbs = path.filter((p) => p && p.trim().length > 0);

  return (
    <div
      data-testid={testId}
      data-ui-change-location=""
      className={cn(
        'flex min-w-0 items-center gap-1 overflow-x-auto rounded border border-border',
        'bg-surface-inset px-2 py-1 font-mono text-xs text-text-tertiary',
        className,
      )}
    >
      <span aria-hidden className="select-none shrink-0">@@</span>
      {crumbs.length === 0 ? (
        <span className="shrink-0 text-text-secondary">{rootLabel}</span>
      ) : (
        crumbs.map((crumb, i) => (
          <span key={`${crumb}-${i}`} className="flex shrink-0 items-center gap-1">
            {i > 0 && <span aria-hidden className="select-none opacity-60">›</span>}
            <span className={cn(i === crumbs.length - 1 && 'text-text-secondary')}>{crumb}</span>
          </span>
        ))
      )}
      {hint && (
        <>
          <span aria-hidden className="select-none opacity-60">·</span>
          <span className="shrink-0 whitespace-nowrap">{hint}</span>
        </>
      )}
      <span aria-hidden className="select-none shrink-0">@@</span>
    </div>
  );
}

export default ChangeLocation;
