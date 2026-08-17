import { cn } from '../../../lib/cn';
import type { VisionObject } from './types';

export interface ObjectsPanelProps {
  objects: VisionObject[];
  onSelect?: (object: VisionObject) => void;
  className?: string;
}

/**
 * Compact 2-column list of detected objects with bbox preview chips.
 */
export function ObjectsPanel({ objects, onSelect, className }: ObjectsPanelProps) {
  if (!objects || objects.length === 0) return null;
  return (
    <section className={cn('flex flex-col gap-1.5', className)}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        Objects ({objects.length})
      </h4>
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {objects.map((o, i) => {
          const rowClasses = cn(
            'flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface px-2 py-1.5 text-left text-[13px]',
          );
          const content = (
            <>
              <span className="truncate font-medium text-text-primary">{o.label}</span>
              <span className="shrink-0 font-mono text-[10px] text-text-tertiary">
                [{o.bbox.x1},{o.bbox.y1},{o.bbox.x2},{o.bbox.y2}]
              </span>
            </>
          );
          if (onSelect) {
            return (
              <li key={`${o.label}-${i}`}>
                <button
                  type="button"
                  onClick={() => onSelect(o)}
                  className={cn(
                    rowClasses,
                    'cursor-pointer hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  )}
                >
                  {content}
                </button>
              </li>
            );
          }
          return (
            <li key={`${o.label}-${i}`} className={rowClasses}>
              {content}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ObjectsPanel;
