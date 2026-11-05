// SuggestionRow — one option in an inline autocomplete list: a primary line
// and a muted second line, as a full-width row. Since 2.400.0.
//
// It fills the gap between CommandPalette (a modal) and SelectableCard (a
// tile): nothing drew a dense combobox option, so consumers hand-rolled a
// raw <button role="option">. Highlight follows the host's keyboard cursor,
// not hover state, so arrow keys and the mouse cannot disagree about which
// row Enter would pick — `onHighlight` fires on pointer entry so the host
// moves its cursor there.

import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface SuggestionRowProps {
  /** Is this the row the keyboard cursor sits on (`aria-selected`)? */
  active: boolean;
  /** Pointer entered the row — move the host's cursor here. */
  onHighlight?: () => void;
  /** Click (the host handles Enter on its input). */
  onPick: () => void;
  primary: ReactNode;
  secondary?: ReactNode;
  /** Leading slot — an avatar or kind mark. */
  leading?: ReactNode;
  id?: string;
  className?: string;
  'data-testid'?: string;
}

export function SuggestionRow({
  active,
  onHighlight,
  onPick,
  primary,
  secondary,
  leading,
  id,
  className,
  'data-testid': testId,
}: SuggestionRowProps) {
  return (
    <button
      data-ui-part=""
      type="button"
      role="option"
      id={id}
      aria-selected={active}
      onMouseEnter={onHighlight}
      onClick={onPick}
      data-testid={testId}
      data-active={active ? 'true' : 'false'}
      className={cn(
        'flex w-full cursor-pointer items-center gap-2 border-none px-3 py-1.5 text-left text-[12px] text-text-primary',
        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
        active ? 'bg-primary-bg' : 'bg-transparent hover:bg-surface-hover',
        className,
      )}
    >
      {leading != null && <span className="inline-flex shrink-0">{leading}</span>}
      <span className="flex min-w-0 flex-1 flex-col items-start gap-px">
        <span className="w-full truncate font-semibold">{primary}</span>
        {secondary != null && <span className="w-full truncate text-[11px] text-text-tertiary">{secondary}</span>}
      </span>
    </button>
  );
}

export default SuggestionRow;
