import { useState, useEffect, useRef } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface LogEntry {
  id: string;
  action: string;
  description: string;
  timestamp: number;
  color: string;
  icon: string;
}

function getEventStyle(action: string): { color: string; icon: string } {
  switch (action) {
    case 'sync.started':
      return { color: '#6366f1', icon: '▶' };
    case 'sync.progress':
      return { color: '#10b981', icon: '↑' };
    case 'conflict.detected':
      return { color: '#f59e0b', icon: '⚠' };
    case 'dlq.item.added':
      return { color: '#ef4444', icon: '✗' };
    case 'sync.completed':
      return { color: '#10b981', icon: '✓' };
    default:
      return { color: '#64748b', icon: '•' };
  }
}

function formatDescription(msg: GatewayMessage): string {
  const action = msg.action as string;
  switch (action) {
    case 'sync.started':
      return `Sync started: ${msg.sourceName} (${msg.totalItems} items)`;
    case 'sync.progress':
      return `Progress: ${msg.processedItems}/${msg.totalItems} items — ${msg.currentFile}`;
    case 'conflict.detected':
      return `Conflict: ${msg.itemPath} — ${msg.reason}`;
    case 'dlq.item.added':
      return `DLQ: ${msg.itemPath} — ${msg.error}`;
    case 'sync.completed':
      return `Completed: ${msg.processedItems}/${msg.totalItems} items (${msg.failedItems} failed)`;
    default:
      return `Event: ${action}`;
  }
}

export function IngestActivityLog() {
  const { onMessage } = useWebSocketContext();
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'ingest') return;

      const action = msg.action as string;
      const style = getEventStyle(action);
      const entry: LogEntry = {
        id: `log-${idCounter.current++}`,
        action,
        description: formatDescription(msg),
        timestamp: (msg.timestamp as number) || Date.now(),
        color: style.color,
        icon: style.icon,
      };

      setEntries((prev) => [...prev, entry]);
    });

    return unsubscribe;
  }, [onMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden flex flex-col h-70"
    >
      <div className="py-[10px] px-4 border-b border-border font-semibold text-[13px] text-text-primary"
      >
        Activity Log
      </div>
      <div className="flex-[1] overflow-y-auto py-2 px-4"
        ref={scrollRef}
      >
        {entries.length === 0 && (
          <div className="text-text-tertiary text-[13px] text-center mt-6">
            Events will appear here as the simulation runs...
          </div>
        )}
        {entries.map((entry) => (
          <div className="flex items-start gap-[10px] py-[6px] px-0 border-b border-surface-panel"
            key={entry.id}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: `${entry.color}15`,
                color: entry.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {entry.icon}
            </span>
            <div className="flex-[1] min-w-0">
              <div className="text-[13px] text-text-primary leading-[1.4] break-words"
              >
                {entry.description}
              </div>
              <div className="text-[11px] text-text-tertiary mt-[2px]">
                {new Date(entry.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
