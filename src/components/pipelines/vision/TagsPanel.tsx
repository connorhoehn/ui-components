import { cn } from '../../../lib/cn';
import Chip from '../../shared/Chip';

export interface TagsPanelProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

/**
 * Wrap-flow chip cloud for vision tags.
 */
export function TagsPanel({ tags, onTagClick, className }: TagsPanelProps) {
  if (!tags || tags.length === 0) return null;
  return (
    <section className={cn('flex flex-col gap-1.5', className)}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
        Tags
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) =>
          onTagClick ? (
            <button
              key={t}
              type="button"
              onClick={() => onTagClick(t)}
              title={`Filter by ${t}`}
              aria-label={`Filter by ${t}`}
              className="appearance-none border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded-full"
            >
              <Chip tone="info" size="sm">#{t}</Chip>
            </button>
          ) : (
            <Chip key={t} tone="info" size="sm">#{t}</Chip>
          ),
        )}
      </div>
    </section>
  );
}

export default TagsPanel;
