// AttachToggle — "⊕ Add" / "✓ Added": puts a thing into (or takes it out of)
// a working set, such as the documents a prompt will use. A real toggle
// (`aria-pressed`), so a screen reader hears "Add, toggle button, not
// pressed" rather than two different buttons. Since 2.389.6.

import { cn } from '../../lib/cn';
import { CheckIcon, PlusCircleIcon } from '../ui/Icons';

export interface AttachToggleProps {
  attached: boolean;
  onToggle: () => void;
  labels?: { add: string; added: string };
  size?: 'sm' | 'md';
  /** Names the thing, e.g. "Add Release plan to the prompt". */
  'aria-label'?: string;
  /** -1 inside a roving list, where only the current row's controls are tab stops. */
  tabIndex?: number;
  className?: string;
  'data-testid'?: string;
}

export function AttachToggle({
  attached,
  onToggle,
  labels = { add: 'Add', added: 'Added' },
  size = 'md',
  tabIndex,
  className,
  'aria-label': ariaLabel,
  'data-testid': testId = 'attach-toggle',
}: AttachToggleProps) {
  return (
    <button
      data-ui-part=""
      type="button"
      aria-pressed={attached}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      data-testid={testId}
      data-attached={attached || undefined}
      onClick={(event) => { event.stopPropagation(); onToggle(); }}
      onKeyDown={(event) => event.stopPropagation()}
      className={cn(
        'inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg font-medium transition-colors duration-100',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        size === 'sm' ? 'h-7 px-2.5 text-[13px]' : 'h-9 px-3.5 text-sm',
        attached
          ? 'border border-transparent bg-primary-bg text-primary-fg hover:border-primary-border'
          : 'border border-border bg-surface text-text-primary hover:bg-surface-hover',
        className,
      )}
    >
      {attached ? <CheckIcon size={size === 'sm' ? 14 : 16} /> : <PlusCircleIcon size={size === 'sm' ? 14 : 18} />}
      {attached ? labels.added : labels.add}
    </button>
  );
}

export default AttachToggle;
