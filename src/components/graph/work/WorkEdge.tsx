import { cn } from '../../../lib/cn';
import { WorkStatus } from './WorkStatus';
import type { WorkEdgeProps, WorkGraphRelation } from './types';

const RELATION_LABEL: Record<WorkGraphRelation, string> = {
  'works-on': 'Works on',
  'runs-in': 'Runs in',
  'operates-on': 'Operates on',
  produced: 'Produced',
  edited: 'Edited',
  attended: 'Attended',
  discussed: 'Discussed',
  'derived-from': 'Derived from',
};

/**
 * Presentation-only selectable edge. All labels and disclosure decisions must
 * already be viewer-safe when they reach this component.
 */
export function WorkEdge({
  edge,
  selected = false,
  reducedMotion = false,
  fromLabel,
  toLabel,
  onSelect,
}: WorkEdgeProps) {
  const relationLabel = RELATION_LABEL[edge.relation];
  const existenceOnly = edge.disclosure === 'existence';
  const displayLabel = existenceOnly
    ? 'Shared connection'
    : edge.label?.trim() || relationLabel;

  return (
    <button
      data-ui-part=""
      type="button"
      aria-label={`${fromLabel}: ${relationLabel.toLowerCase()} ${toLabel}${existenceOnly ? ', details restricted' : ''}`}
      aria-pressed={selected}
      data-testid={`work-edge-${edge.id}`}
      data-relation={edge.relation}
      data-status={edge.status}
      data-disclosure={edge.disclosure}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      onClick={() => onSelect?.(edge.id)}
      className={cn(
        'group flex w-full min-w-0 items-center gap-2 rounded-md border bg-surface px-3 py-2 text-left',
        !reducedMotion && 'transition-colors duration-150',
        selected
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50 hover:bg-surface-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-px min-w-4 flex-1 bg-border',
          selected ? 'bg-primary' : 'group-hover:bg-primary/50',
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-text-primary">
          {displayLabel}
        </span>
        <span className="block truncate text-[11px] text-text-tertiary">
          {fromLabel} → {toLabel}
        </span>
      </span>
      <WorkStatus status={edge.status} />
      <span
        aria-hidden="true"
        className={cn(
          'h-px min-w-4 flex-1 bg-border',
          selected ? 'bg-primary' : 'group-hover:bg-primary/50',
        )}
      />
      {selected && <span className="sr-only">Selected</span>}
    </button>
  );
}

export default WorkEdge;
