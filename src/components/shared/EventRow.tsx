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
  info: 'text-slate-500',
  warning: 'text-warning-fg',
  error: 'text-danger-fg',
  success: 'text-success-fg',
};

function EventRow({ timestamp, type, summary, severity = 'info', onClick, selected }: EventRowProps) {
  const glyph = getEventGlyph(type);

  return (
    <div
      data-testid="event-row"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-2.5 py-1.5 text-[13px] font-[inherit] rounded-md text-slate-900',
        selected ? 'bg-accent-bg' : 'bg-transparent',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
    >
      <span className="text-sm shrink-0" style={{ color: glyph.color }}>{glyph.icon}</span>
      <span className="text-[11px] text-slate-400 shrink-0 w-[70px]">{timestamp}</span>
      <span className={cn('text-xs font-semibold shrink-0', severityClass[severity])}>
        {type}
      </span>
      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
        {summary}
      </span>
    </div>
  );
}

export default EventRow;
