import type { VisionObject } from './types';

export interface ObjectsPanelProps {
  objects: VisionObject[];
  onSelect?: (object: VisionObject) => void;
  className?: string;
}

/**
 * Compact 2-column list of detected objects with bbox preview chips. Each
 * row shows label + coordinates so you can correlate to the image overlay
 * without hovering.
 */
export function ObjectsPanel({ objects, onSelect, className }: ObjectsPanelProps) {
  if (!objects || objects.length === 0) return null;
  return (
    <section className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#64748b)]">
        Objects ({objects.length})
      </h4>
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {objects.map((o, i) => (
          <li
            key={`${o.label}-${i}`}
            className={[
              'flex items-center justify-between gap-2 rounded-md border border-[var(--color-border,#e2e8f0)] bg-[var(--color-surface,#fff)] px-2 py-1.5 text-[13px]',
              onSelect ? 'cursor-pointer hover:bg-[var(--color-surface-hover,#f8fafc)]' : '',
            ].join(' ')}
            onClick={onSelect ? () => onSelect(o) : undefined}
          >
            <span className="truncate font-medium text-[var(--color-text,#0f172a)]">{o.label}</span>
            <span className="shrink-0 font-mono text-[10px] text-[var(--color-text-muted,#94a3b8)]">
              [{o.bbox.x1},{o.bbox.y1},{o.bbox.x2},{o.bbox.y2}]
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ObjectsPanel;
