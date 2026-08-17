import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';
import type { VisionPerson } from './types';

export interface PeoplePanelProps {
  people: VisionPerson[];
  /** Highlight a specific person (from a click on the image overlay). */
  highlightedIndex?: number;
  onSelect?: (person: VisionPerson) => void;
  className?: string;
}

/**
 * Per-person detail rows.
 */
export function PeoplePanel({ people, highlightedIndex, onSelect, className }: PeoplePanelProps) {
  if (!people || people.length === 0) return null;
  return (
    <section className={cn('flex flex-col gap-1.5', className)}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        People ({people.length})
      </h4>
      <ul className="flex flex-col gap-1.5">
        {people.map((p) => {
          const isHighlighted = highlightedIndex === p.index;
          const activity = p.activity?.replace(/^::\s*/, '');
          const rowClasses = cn(
            'group flex w-full flex-col gap-1 rounded-lg border px-2.5 py-2 text-left text-sm transition-colors',
            isHighlighted
              ? 'border-primary bg-primary-bg/70 ring-1 ring-primary'
              : 'border-border bg-surface hover:bg-surface-hover',
          );

          const content = (
            <>
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold leading-none text-white"
                >
                  {p.index}
                </span>
                {p.ageBucket ? <Chip tone="neutral" size="sm">{p.ageBucket.replace('_', ' ')}</Chip> : null}
                {p.gender ? <Chip tone="neutral" size="sm">{p.gender}</Chip> : null}
                {p.faceOrientation ? (
                  <Chip tone="neutral" size="sm" title="Face orientation">{p.faceOrientation}</Chip>
                ) : null}
                {p.expression ? <Chip tone="info" size="sm">{p.expression}</Chip> : null}
              </div>
              {activity ? (
                <div className="text-[13px] text-text-primary">
                  <span className="text-text-tertiary">activity:</span> {activity}
                </div>
              ) : null}
              {p.clothing ? (
                <div className="text-[12px] text-text-secondary">
                  <span className="text-text-tertiary">wearing:</span> {p.clothing}
                </div>
              ) : null}
            </>
          );

          if (onSelect) {
            return (
              <li key={p.index}>
                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  className={cn(
                    rowClasses,
                    'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                  aria-pressed={isHighlighted}
                >
                  {content}
                </button>
              </li>
            );
          }
          return (
            <li key={p.index} className={rowClasses}>
              {content}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default PeoplePanel;
