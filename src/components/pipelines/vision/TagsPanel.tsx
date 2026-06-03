import Chip from '../../shared/Chip';

export interface TagsPanelProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
  className?: string;
}

/**
 * Wrap-flow chip cloud for vision tags. Optional click handler enables
 * tag-filter navigation downstream (e.g. "find all images tagged 'beach'").
 */
export function TagsPanel({ tags, onTagClick, className }: TagsPanelProps) {
  if (!tags || tags.length === 0) return null;
  return (
    <section className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-muted,#64748b)]">
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
              className="appearance-none border-0 bg-transparent p-0"
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
