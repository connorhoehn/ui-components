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
 * Per-person detail rows: bbox indicator (badge), demographics chips,
 * activity verb, clothing description. Tight rows so 4-8 people fit
 * without scrolling, expands gracefully for larger groups.
 */
export function PeoplePanel({ people, highlightedIndex, onSelect, className }: PeoplePanelProps) {
  if (!people || people.length === 0) return null;
  return (
    <section className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#64748b)]">
        People ({people.length})
      </h4>
      <ul className="flex flex-col gap-1.5">
        {people.map((p) => {
          const isHighlighted = highlightedIndex === p.index;
          const activity = p.activity?.replace(/^::\s*/, '');
          return (
            <li
              key={p.index}
              className={[
                'group flex flex-col gap-1 rounded-md border px-2.5 py-2 text-sm transition-colors',
                isHighlighted
                  ? 'border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-300'
                  : 'border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] hover:bg-[var(--color-surface-hover,#f8fafc)]',
                onSelect ? 'cursor-pointer' : '',
              ].join(' ')}
              onClick={onSelect ? () => onSelect(p) : undefined}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold leading-none text-white"
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
                <div className="text-[13px] text-[var(--color-text,#0f172a)]">
                  <span className="text-[var(--color-text-muted,#64748b)]">activity:</span> {activity}
                </div>
              ) : null}
              {p.clothing ? (
                <div className="text-[12px] text-[var(--color-text-muted,#475569)]">
                  <span className="text-[var(--color-text-muted,#94a3b8)]">wearing:</span> {p.clothing}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default PeoplePanel;
