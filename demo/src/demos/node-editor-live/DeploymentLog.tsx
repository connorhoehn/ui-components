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

const STATUS_DOT_COLOR: Record<string, string> = {
  stream: 'text-accent-fg',
  running: 'text-warning-fg',
  completed: 'text-success-fg',
  failed: 'text-danger-fg',
};

function statusDotColor(action: string, status?: string) {
  if (action === 'stream') return STATUS_DOT_COLOR.stream;
  if (status && STATUS_DOT_COLOR[status]) return STATUS_DOT_COLOR[status];
  return 'text-text-tertiary';
}

function actionIcon(action: string) {
  if (action === 'run.started') return '⚡';
  if (action === 'run.completed') return '✔';
  if (action === 'step.started') return '▶';
  if (action === 'step.completed') return '✔';
  if (action === 'stream') return '»';
  return '•';
}

function formatNodeId(nodeId: string) {
  return nodeId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
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

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="px-3.5 py-2.5 border-b border-slate-800 flex items-center gap-2">
        <span className="text-primary-fg text-[8px]">●</span>
        <span className="text-slate-200 text-xs font-semibold">Deployment Log</span>
        <span className="text-neutral text-[11px] ml-auto">{events.length} events</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2 font-mono text-[11px]">
        {events.length === 0 && (
          <div className="text-text-secondary text-center py-6 text-xs">
            Waiting for deployment events...
          </div>
        )}
        {events.map((event) => (
          <div key={event.id} className="px-3.5 py-0.5 flex items-baseline gap-2">
            <span className="text-text-secondary shrink-0 text-[10px]">{event.timestamp}</span>
            <span className={`shrink-0 w-3.5 text-center ${statusDotColor(event.action, event.status)}`}>
              {actionIcon(event.action)}
            </span>
            {event.action === 'stream' ? (
              <span className="text-accent-fg italic">{event.detail}</span>
            ) : (
              <>
                <span className="text-text-disabled">{event.action}</span>
                {event.nodeId && (
                  <span className="text-info-fg bg-info px-1.5 py-px rounded-sm text-[10px]">
                    {formatNodeId(event.nodeId)}
                  </span>
                )}
                {event.detail && (
                  <span className="text-text-tertiary ml-auto text-[10px] shrink-0">
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
