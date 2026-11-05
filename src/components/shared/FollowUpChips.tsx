import { cn } from '../../lib/cn';

export interface FollowUpChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  /** if provided, shows a ↻ refresh button */
  onRefresh?: () => void;
  /** optional label before chips, e.g. "Follow up:" */
  label?: string;
  className?: string;
}

/**
 * A strip of clickable follow-up suggestion chips, with optional refresh button.
 */
export function FollowUpChips({
  suggestions,
  onSelect,
  onRefresh,
  label,
  className,
}: FollowUpChipsProps) {
  return (
    <div className={cn('flex items-center flex-wrap gap-1.5 py-2', className)}>
      {label && (
        <span className="text-xs text-[var(--color-text-tertiary)] mr-1">{label}</span>
      )}
      {suggestions.map((s, i) => (
        <button
          data-ui-part=""
          key={i}
          type="button"
          onClick={() => onSelect(s)}
          className="inline-flex items-center px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
        >
          {s}
        </button>
      ))}
      {onRefresh && (
        <button
          data-ui-part=""
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-colors text-base"
          title="Refresh suggestions"
        >
          ↻
        </button>
      )}
    </div>
  );
}
