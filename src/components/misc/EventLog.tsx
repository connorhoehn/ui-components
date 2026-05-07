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
    <div className="border-t border-[#e5e7eb] pt-4 mt-4">
      <h3 className="m-0 mb-2 text-sm">
        Event Log{' '}
        <span className="text-[#9ca3af] font-normal">({entries.length})</span>
      </h3>

      {entries.length === 0 ? (
        <p className="text-[#9ca3af]">No events yet.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-[#f9fafb] rounded mb-1 px-2 py-1 font-mono"
            >
              {/* Direction badge + timestamp */}
              <div className="flex items-center gap-2 mb-1">
                {entry.direction === 'sent' ? (
                  <span className="bg-[#dbeafe] text-[#1d4ed8] rounded-[3px] px-1.5 text-[0.7rem] font-semibold">
                    [SENT]
                  </span>
                ) : (
                  <span className="bg-[#dcfce7] text-[#15803d] rounded-[3px] px-1.5 text-[0.7rem] font-semibold">
                    [RECV]
                  </span>
                )}
                <span className="text-[#9ca3af] text-[0.7rem]">
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
