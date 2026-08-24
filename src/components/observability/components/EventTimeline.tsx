// frontend/src/components/observability/components/EventTimeline.tsx
//
// Center column of /observability/events. Scrollable list of event rows; when
// `live=true` autoscrolls to the bottom unless the user has scrolled up, in
// which case a "Jump to live ↓" pill appears.
//
// Phase 1 uses a plain mapped list. Phase 2+ swaps in react-window for
// virtualization per PIPELINES_PLAN.md §18.8.

import { useEffect, useRef, useState } from 'react';
import EventRow from '../../shared/EventRow';
import EmptyState from '../../shared/EmptyState';
import { cn } from '../../../lib/cn';

export interface EventItem {
  id: string;
  /** Display-only clock string (`HH:MM:SS.mmm`) — carries no date. */
  timestamp: string;
  /**
   * Epoch ms the event was received. `timestamp` is a formatted clock string
   * with no date, so it cannot be compared; this is what EventsPage's
   * time-range filter measures against.
   */
  receivedAt?: number;
  type: string;
  summary: string;
  severity?: 'info' | 'warning' | 'error' | 'success';
  payload?: unknown;
}

export interface EventTimelineProps {
  events: EventItem[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  live?: boolean;
}

function EventTimeline({ events, selectedId, onSelect, live = false }: EventTimelineProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [detached, setDetached] = useState(false);

  // Autoscroll to bottom when live and user hasn't scrolled up.
  useEffect(() => {
    if (!live) return;
    if (detached) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [events, live, detached]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    setDetached(!atBottom);
  };

  const jumpToLive = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setDetached(false);
  };

  if (events.length === 0) {
    return (
      <div className="flex-1 flex">
        <EmptyState
          icon="📡"
          title="No events yet"
          body="Trigger a pipeline to see activity here."
        />
      </div>
    );
  }

  return (
    <div
      data-testid="event-timeline"
      className="relative flex-1 min-h-0 flex"
    >
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto py-1.5 font-[inherit]"
      >
        {events.map((ev) => (
          <EventRow
            key={ev.id}
            timestamp={ev.timestamp}
            type={ev.type}
            summary={ev.summary}
            severity={ev.severity}
            selected={ev.id === selectedId}
            onClick={onSelect ? () => onSelect(ev.id) : undefined}
          />
        ))}
      </div>

      {live && detached && (
        <button
          data-testid="jump-to-live"
          onClick={jumpToLive}
          className={cn(
            'absolute bottom-3 left-1/2 -translate-x-1/2',
            'px-3.5 py-1.5 text-xs font-semibold',
            'bg-primary text-white',
            'border-none rounded-full cursor-pointer',
            'shadow-[0_2px_8px_rgba(0,0,0,0.15)] font-[inherit]'
          )}
        >
          Jump to live ↓
        </button>
      )}
    </div>
  );
}

export default EventTimeline;
