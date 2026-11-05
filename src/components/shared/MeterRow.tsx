// MeterRow — a dense, clickable list row that lays a label against a trailing
// meter: "this name, this strong". Since 2.400.0.
//
// ScoreBarGauge draws the meter; nothing paired it with a label in a
// selectable row, so consumers hand-rolled a raw <button>. The row is a real
// button (keyboard reachable), the label truncates, and the meter keeps a
// fixed width so a column of rows lines their meters up.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface MeterRowProps {
  onClick: () => void;
  /** Tooltip — what the click does ("Add Nora to selection"). */
  title?: string;
  label: ReactNode;
  /** Muted trailing note after the label: "mentors". */
  note?: ReactNode;
  /** The meter — usually `<ScoreBarGauge size="sm" showLabel={false} />`. */
  meter: ReactNode;
  /** Meter slot width. Default `sm` (44px); `md` is 72px. */
  meterWidth?: 'sm' | 'md';
  className?: string;
  'aria-label'?: string;
  'data-testid'?: string;
}

export function MeterRow({
  onClick,
  title,
  label,
  note,
  meter,
  meterWidth = 'sm',
  className,
  'aria-label': ariaLabel,
  'data-testid': testId,
}: MeterRowProps) {
  return (
    <button
      data-ui-part=""
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      data-testid={testId}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 rounded-md border-none bg-transparent px-1.5 py-1 text-left text-[12px] text-text-primary hover:bg-surface-hover',
        'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">
        <span className="font-semibold">{label}</span>
        {note != null && <span className="text-[11px] text-text-tertiary">{' · '}{note}</span>}
      </span>
      <span className={cn('shrink-0', meterWidth === 'md' ? 'w-18' : 'w-11')}>{meter}</span>
    </button>
  );
}

export default MeterRow;
