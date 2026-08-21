// frontend/src/components/EventLog.tsx
//
// EventLog — dev tool component that renders a timestamped, scrollable list
// of WebSocket messages sent and received. Useful for inspecting gateway
// traffic in real time during development.
//
// Auto-scrolls to the bottom when new entries are added.
// Entries are pre-capped at 200 by the parent (App.tsx).

import { useRef, useEffect } from 'react';
import type { GatewayMessage } from '../../types/gateway';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface LogEntry {
  id: string;                                          // unique — Date.now() + Math.random()
  direction: 'sent' | 'received';
  message: GatewayMessage | Record<string, unknown>;
  timestamp: string;                                   // ISO string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  entries: LogEntry[];   // capped at 200 by App.tsx before passing
}

export function EventLog({ entries }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  return (
    <div className="border-t border-border pt-4 mt-4">
      <h3 className="m-0 mb-2 text-sm">
        Event Log{' '}
        <span className="text-text-tertiary font-normal">({entries.length})</span>
      </h3>

      {entries.length === 0 ? (
        <p className="text-text-tertiary">No events yet.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-surface-inset rounded mb-1 px-2 py-1 font-mono"
            >
              {/* Direction badge + timestamp */}
              <div className="flex items-center gap-2 mb-1">
                {entry.direction === 'sent' ? (
                  <span className="bg-info-bg text-info-fg rounded-[3px] px-1.5 text-[0.7rem] font-semibold">
                    [SENT]
                  </span>
                ) : (
                  <span className="bg-success-bg text-success-fg rounded-[3px] px-1.5 text-[0.7rem] font-semibold">
                    [RECV]
                  </span>
                )}
                <span className="text-text-tertiary text-[0.7rem]">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* JSON payload */}
              <pre className="m-0 text-[0.7rem] whitespace-pre-wrap break-all max-h-20 overflow-y-auto bg-transparent">
                {JSON.stringify(entry.message, null, 2)}
              </pre>
            </div>
          ))}

          {/* Sentinel for auto-scroll */}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
