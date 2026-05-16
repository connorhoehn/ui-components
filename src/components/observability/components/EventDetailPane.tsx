// frontend/src/components/observability/components/EventDetailPane.tsx
//
// Right-side detail pane for /observability/events. Pretty-prints the selected
// event payload as JSON and exposes copy / download buttons. Null state is a
// gentle prompt to pick a row.

import { cn } from '../../../lib/cn';
import type { EventItem } from './EventTimeline';

export interface EventDetailPaneProps {
  event: EventItem | null;
}

function prettyJSON(value: unknown): string {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

function EventDetailPane({ event }: EventDetailPaneProps) {
  if (!event) {
    return (
      <div
        data-testid="event-detail-empty"
        className={cn(
          'flex items-center justify-center h-full text-[13px] text-text-tertiary',
          'p-6 text-center font-[inherit]'
        )}
      >
        Select an event to see details
      </div>
    );
  }

  const body = prettyJSON(event.payload ?? event);

  const onCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(body).catch(() => {
        // eslint-disable-next-line no-console
        console.warn('[EventDetailPane] clipboard copy failed');
      });
    }
  };

  const onDownload = () => {
    if (typeof window === 'undefined') return;
    const blob = new Blob([body], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.type}-${event.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      data-testid="event-detail-pane"
      className="flex flex-col h-full font-[inherit] bg-surface"
    >
      <div className="px-3.5 py-3 border-b border-border flex flex-col gap-1">
        <div className="text-[13px] font-semibold text-text-primary">
          {event.type}
        </div>
        <div className="text-[11px] text-text-tertiary">{event.timestamp}</div>
      </div>

      <div className="px-3.5 py-2.5 flex gap-2 border-b border-border">
        <button
          data-testid="event-detail-copy"
          onClick={onCopy}
          className={cn(
            'px-2.5 py-[5px] text-xs font-semibold',
            'bg-surface-hover text-text-secondary',
            'border border-border rounded-md',
            'cursor-pointer font-[inherit]'
          )}
        >
          Copy
        </button>
        <button
          data-testid="event-detail-download"
          onClick={onDownload}
          className={cn(
            'px-2.5 py-[5px] text-xs font-semibold',
            'bg-surface-hover text-text-secondary',
            'border border-border rounded-md',
            'cursor-pointer font-[inherit]'
          )}
        >
          Download
        </button>
      </div>

      <pre
        className={cn(
          'm-0 px-3.5 py-3 flex-1 overflow-auto',
          'bg-surface-inset font-mono text-xs text-text-primary',
          'leading-normal whitespace-pre [tab-size:2]'
        )}
      >
        {body}
      </pre>
    </div>
  );
}

export default EventDetailPane;
