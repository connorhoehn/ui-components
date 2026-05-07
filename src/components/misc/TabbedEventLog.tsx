// frontend/src/components/TabbedEventLog.tsx
//
// TabbedEventLog — dev tool component that separates real-time WebSocket events
// by service type (Chat, Presence, Cursors, Reactions, System), allowing developers
// to inspect each service's traffic independently without noise from other services.
//
// Auto-scrolls to the bottom when new entries are added to the active tab.
// Entries are pre-capped at 200 by the parent (App.tsx).

import { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/cn';
import type { LogEntry } from './EventLog';

// ---------------------------------------------------------------------------
// Tab type
// ---------------------------------------------------------------------------

type Tab = 'Chat' | 'Presence' | 'Cursors' | 'Reactions' | 'System';

// ---------------------------------------------------------------------------
// Helper: Filter entries by tab service type
// ---------------------------------------------------------------------------

function getTabEntries(entries: LogEntry[], tab: Tab): LogEntry[] {
  return entries.filter((entry) => {
    const type = entry.message.type;

    if (!type) {
      // Messages without a type go to System
      return tab === 'System';
    }

    switch (tab) {
      case 'Chat':
        return typeof type === 'string' && type.startsWith('chat:');

      case 'Presence':
        return type === 'presence';

      case 'Cursors':
        return type === 'cursor';

      case 'Reactions':
        return typeof type === 'string' && type.startsWith('reactions:');

      case 'System':
        return (
          type === 'error' ||
          type === 'session' ||
          (typeof type === 'string' &&
            !type.startsWith('chat:') &&
            type !== 'presence' &&
            type !== 'cursor' &&
            !type.startsWith('reactions:'))
        );

      default:
        return false;
    }
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  entries: LogEntry[]; // capped at 200 by App.tsx before passing
}

export function TabbedEventLog({ entries }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Chat');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new entries arrive in the active tab
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries, activeTab]);

  const tabs: Tab[] = ['Chat', 'Presence', 'Cursors', 'Reactions', 'System'];

  // Get entries for the active tab
  const activeEntries = getTabEntries(entries, activeTab);

  return (
    <div className="border-t border-[#e5e7eb] pt-4 mt-4">
      <h3 className="m-0 mb-2 text-sm">
        Event Log{' '}
        <span className="text-[#9ca3af] font-normal">({entries.length})</span>
      </h3>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-4 border-b border-[#e5e7eb] pb-4 flex-wrap">
        {tabs.map((tab) => {
          const tabCount = getTabEntries(entries, tab).length;
          const isActive = tab === activeTab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'border-none rounded px-4 py-2 cursor-pointer text-sm',
                isActive
                  ? 'bg-[#3b82f6] text-white font-semibold'
                  : 'bg-[#e5e7eb] text-[#374151] font-normal'
              )}
            >
              {tab} ({tabCount})
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeEntries.length === 0 ? (
        <p className="text-[#9ca3af]">No events yet.</p>
      ) : (
        <div className="max-h-[300px] overflow-y-auto">
          {activeEntries.map((entry) => (
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
