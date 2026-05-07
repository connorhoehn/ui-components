import { useEffect, useRef, useState } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface PipelineEvent {
  id: number;
  timestamp: string;
  action: string;
  nodeId?: string;
  status?: string;
  detail?: string;
}

export function PipelineEventLog({ compact }: { compact?: boolean } = {}) {
  const { onMessage } = useWebSocketContext();
  const [events, setEvents] = useState<PipelineEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'pipeline') return;

      counterRef.current += 1;
      const event: PipelineEvent = {
        id: counterRef.current,
        timestamp: new Date().toLocaleTimeString(),
        action: (msg.action as string) ?? 'unknown',
        nodeId: msg.nodeId as string | undefined,
        status: msg.status as string | undefined,
        detail: msg.output
          ? JSON.stringify(msg.output)
          : msg.token
            ? `"${msg.token}"`
            : msg.duration
              ? `${msg.duration}ms`
              : undefined,
      };

      setEvents((prev) => [...prev, event]);
    });
    return unsubscribe;
  }, [onMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events]);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'running': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'failed': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('started')) return '▶';
    if (action.includes('completed')) return '✔';
    if (action.includes('failed')) return '✘';
    if (action.includes('stream')) return '…';
    if (action.includes('run.started')) return '⚡';
    return '•';
  };

  return (
    <div style={{
      background: '#0f172a',
      borderRadius: 8,
      border: '1px solid #1e293b',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      <div style={{
        padding: '10px 14px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ color: '#10b981', fontSize: 8 }}>{'●'}</span>
        <span style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600 }}>Event Stream</span>
        <span style={{ color: '#64748b', fontSize: 11, marginLeft: 'auto' }}>
          {events.length} events
        </span>
      </div>
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
          fontSize: 11,
        }}
      >
        {events.length === 0 && (
          <div style={{ color: '#475569', textAlign: 'center', padding: 24, fontSize: 12 }}>
            Waiting for pipeline events...
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: '4px 14px',
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              animation: 'fadeIn 0.2s ease-in',
            }}
          >
            <span style={{ color: '#475569', flexShrink: 0 }}>{event.timestamp}</span>
            <span style={{ color: getStatusColor(event.status), flexShrink: 0 }}>
              {getActionIcon(event.action)}
            </span>
            <span style={{ color: '#cbd5e1' }}>{event.action}</span>
            {event.nodeId && (
              <span style={{
                color: '#7dd3fc',
                background: '#0c4a6e',
                padding: '1px 6px',
                borderRadius: 3,
                fontSize: 10,
              }}>
                {event.nodeId}
              </span>
            )}
            {event.detail && (
              <span style={{ color: '#94a3b8', marginLeft: 'auto', fontSize: 10 }}>
                {event.detail}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
