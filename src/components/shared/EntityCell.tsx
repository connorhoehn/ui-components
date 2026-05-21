import { cn } from '../../lib/cn';

export interface EntityCellProps {
  label: string;
  /** Secondary monospace subline (e.g. ID or slug). */
  id?: string;
  /** Makes the label a link. */
  href?: string;
  /** Extra monospace styling on the ID subline (already monospace by default; this is reserved for callers needing emphasis). */
  mono?: boolean;
  className?: string;
  labelClassName?: string;
}

export function EntityCell({
  label,
  id,
  href,
  mono = false,
  className,
  labelClassName,
}: EntityCellProps) {
  const labelInner = (
    <span className="truncate">{label}</span>
  );

  return (
    <div className={cn('flex flex-col min-w-0', className)}>
      <div
        className={cn(
          'font-medium text-[var(--color-text-primary)] truncate text-sm',
          labelClassName,
        )}
      >
        {href ? (
          <a
            href={href}
            className="hover:text-[var(--color-primary)] hover:underline"
          >
            {labelInner}
          </a>
        ) : (
          labelInner
        )}
      </div>
      {id && (
        <div
          className={cn(
            'text-[10px] font-mono text-[var(--color-text-tertiary)] truncate mt-0.5',
            mono && 'tracking-tight',
          )}
        >
          {id}
        </div>
      )}
    </div>
  );
}

export default EntityCell;
