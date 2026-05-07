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
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 8,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: 280,
      }}
    >
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: 13,
          color: '#1a1a2e',
        }}
      >
        Activity Log
      </div>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
        }}
      >
        {entries.length === 0 && (
          <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
            Events will appear here as the simulation runs...
          </div>
        )}
        {entries.map((entry) => (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '6px 0',
              borderBottom: '1px solid #f8f9fa',
            }}
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
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  color: '#334155',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                }}
              >
                {entry.description}
              </div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>
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
