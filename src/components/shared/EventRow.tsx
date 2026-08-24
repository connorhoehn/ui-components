// frontend/src/components/shared/EventRow.tsx
//
// Stub. Dense row used by /observability/events and BigBrotherPanel.
// Real implementation will wire in icon/color via getEventGlyph().

import { cn } from '../../lib/cn';
import { getEventGlyph } from './eventGlyphs';

export interface EventRowProps {
  timestamp: string;
  type: string;
  summary: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  onClick?: () => void;
  selected?: boolean;
}

const severityClass: Record<NonNullable<EventRowProps['severity']>, string> = {
  info: 'text-neutral',
  warning: 'text-warning-fg',
  error: 'text-danger-fg',
  success: 'text-success-fg',
};

function EventRow({ timestamp, type, summary, severity = 'info', onClick, selected }: EventRowProps) {
  const glyph = getEventGlyph(type);

  const className = cn(
    'flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-text-primary',
    selected ? 'bg-accent-bg' : 'bg-transparent',
    onClick ? 'cursor-pointer' : 'cursor-default',
  );

  const content = (
    <>
      <span className="text-sm shrink-0" style={{ color: glyph.color }}>{glyph.icon}</span>
      <span className="text-[11px] text-text-tertiary shrink-0 w-[70px]">{timestamp}</span>
      <span className={cn('text-xs font-semibold shrink-0', severityClass[severity])}>
        {type}
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {summary}
      </span>
    </>
  );

  // Keyboard-activatable when it is interactive: a real <button> gets Enter and
  // Space from the browser. Non-interactive rows stay a plain <div> so they do
  // not appear in the tab order.
  if (onClick) {
    return (
      <button
        data-testid="event-row"
        type="button"
        onClick={onClick}
        aria-pressed={selected ?? false}
        className={cn(className, 'text-left w-full border-none')}
      >
        {content}
      </button>
    );
  }

  return (
    <div data-testid="event-row" className={className}>
      {content}
    </div>
  );
}

export default EventRow;
