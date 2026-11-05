import { cn } from '../../lib/cn';

export interface QuickPrompt {
  label: string;
  hint?: string;
}

export interface QuickPromptGridProps {
  prompts: QuickPrompt[];
  onSelect: (label: string) => void;
  /** default auto-fit (responsive 220px min column width) */
  columns?: number;
  /** optional heading above, e.g. "Try asking:" */
  title?: string;
  className?: string;
}

/**
 * Empty-state grid of prompt suggestion cards. Each card is a button calling
 * `onSelect(label)`.
 */
export function QuickPromptGrid({
  prompts,
  onSelect,
  columns,
  title,
  className,
}: QuickPromptGridProps) {
  const gridTemplateColumns = columns
    ? `repeat(${columns}, minmax(0, 1fr))`
    : 'repeat(auto-fit, minmax(220px, 1fr))';

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {title && (
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)] text-center">
          {title}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns, gap: 10 }}>
        {prompts.map((p, i) => (
          <button
            data-ui-part=""
            key={i}
            type="button"
            onClick={() => onSelect(p.label)}
            className="flex flex-col gap-1 px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-border-emphasis,#cbd5e1)] text-left transition-colors"
          >
            <span className="text-sm font-medium text-[var(--color-text-primary)]">{p.label}</span>
            {p.hint && (
              <span className="text-xs text-[var(--color-text-tertiary)]">{p.hint}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
