import { useEffect, useRef, useState } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface DeploymentEvent {
  id: number;
  timestamp: string;
  action: string;
  nodeId?: string;
  status?: string;
  detail?: string;
}

export function DeploymentLog() {
  const { onMessage } = useWebSocketContext();
  const [events, setEvents] = useState<DeploymentEvent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(0);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type !== 'workflow') return;

      counterRef.current += 1;
      const event: DeploymentEvent = {
        id: counterRef.current,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        action: (msg.action as string) ?? 'unknown',
        nodeId: msg.nodeId as string | undefined,
        status: msg.status as string | undefined,
        detail: msg.token
          ? String(msg.token)
          : msg.output
            ? JSON.stringify(msg.output)
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

  const getStatusColor = (action: string, status?: string) => {
    if (action === 'stream') return '#a78bfa';
    switch (status) {
      case 'running': return '#f59e0b';
      case 'completed': return '#10b981';
      case 'failed': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const getActionIcon = (action: string) => {
    if (action === 'run.started') return '⚡';
    if (action === 'run.completed') return '✔';
    if (action === 'step.started') return '▶';
    if (action === 'step.completed') return '✔';
    if (action === 'stream') return '»';
    return '•';
  };

  const formatNodeId = (nodeId: string) => {
    return nodeId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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
        <span style={{ color: '#6366f1', fontSize: 8 }}>{'●'}</span>
        <span style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 600 }}>Deployment Log</span>
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
            Waiting for deployment events...
          </div>
        )}
        {events.map((event) => (
          <div
            key={event.id}
            style={{
              padding: '3px 14px',
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              animation: 'fadeIn 0.2s ease-in',
            }}
          >
            <span style={{ color: '#475569', flexShrink: 0, fontSize: 10 }}>
              {event.timestamp}
            </span>
            <span style={{
              color: getStatusColor(event.action, event.status),
              flexShrink: 0,
              width: 14,
              textAlign: 'center',
            }}>
              {getActionIcon(event.action)}
            </span>
            {event.action === 'stream' ? (
              <span style={{ color: '#c4b5fd', fontStyle: 'italic' }}>
                {event.detail}
              </span>
            ) : (
              <>
                <span style={{ color: '#cbd5e1' }}>
                  {event.action}
                </span>
                {event.nodeId && (
                  <span style={{
                    color: '#7dd3fc',
                    background: '#0c4a6e',
                    padding: '1px 6px',
                    borderRadius: 3,
                    fontSize: 10,
                  }}>
                    {formatNodeId(event.nodeId)}
                  </span>
                )}
                {event.detail && event.action !== 'stream' && (
                  <span style={{ color: '#94a3b8', marginLeft: 'auto', fontSize: 10, flexShrink: 0 }}>
                    {event.detail}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
