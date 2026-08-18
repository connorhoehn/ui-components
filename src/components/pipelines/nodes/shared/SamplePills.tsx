// src/components/pipelines/nodes/shared/SamplePills.tsx
//
// One-click suggestions under a path input — the upstream image refs or context
// paths that are actually available at this node, so an author can pick one
// instead of typing a JSONPath from memory and getting it subtly wrong.
//
// This existed as a private copy in seventeen different config panels. They
// were byte-identical apart from where the formatter broke the signature,
// which is the failure mode the component library exists to prevent: seventeen
// chances for one of them to drift, and no single place to fix a bug in.

import { cn } from '../../../../lib/cn';

export interface SamplePillsProps {
  /** Suggestions to offer. Renders nothing when empty. */
  samples: readonly string[];
  onSelect: (value: string) => void;
  /** Accessible name for the group, e.g. "Upstream image refs". */
  'aria-label'?: string;
  className?: string;
}

export default function SamplePills({
  samples,
  onSelect,
  'aria-label': ariaLabel = 'Suggestions',
  className,
}: SamplePillsProps) {
  // An empty wrapper still contributes margin, which shows up as a stray gap
  // under inputs that happen to have no upstream suggestions.
  if (samples.length === 0) return null;

  return (
    <div
      className={cn('mt-1.5 flex flex-wrap gap-1', className)}
      role="group"
      aria-label={ariaLabel}
      data-testid="sample-pills"
    >
      {samples.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onSelect(s)}
          className="text-[10px] font-mono bg-surface-inset border border-border text-text-secondary rounded px-1.5 py-0.5 cursor-pointer hover:bg-surface-hover"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
