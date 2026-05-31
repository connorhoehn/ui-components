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

const STATUS_TEXT_CLASSES: Record<string, string> = {
  running: 'text-amber-500',
  completed: 'text-emerald-500',
  failed: 'text-red-500',
};

function statusTextClass(status?: string) {
  return (status && STATUS_TEXT_CLASSES[status]) || 'text-slate-400';
}

function actionIcon(action: string) {
  if (action.includes('run.started')) return '⚡';
  if (action.includes('started')) return '▶';
  if (action.includes('completed')) return '✔';
  if (action.includes('failed')) return '✘';
  if (action.includes('stream')) return '…';
  return '•';
}

export function PipelineEventLog({ compact }: { compact?: boolean } = {}) {
  void compact;
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

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex flex-col h-full">
      <div className="px-3.5 py-2.5 border-b border-slate-800 flex items-center gap-2">
        <span className="text-emerald-500 text-[8px]">●</span>
        <span className="text-slate-200 text-xs font-semibold">Event Stream</span>
        <span className="text-slate-500 text-[11px] ml-auto">{events.length} events</span>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-2 font-mono text-[11px]">
        {events.length === 0 && (
          <div className="text-slate-600 text-center py-6 text-xs">
            Waiting for pipeline events...
          </div>
        )}
        {events.map((event) => (
          <div key={event.id} className="px-3.5 py-1 flex items-baseline gap-2">
            <span className="text-slate-600 shrink-0">{event.timestamp}</span>
            <span className={`shrink-0 ${statusTextClass(event.status)}`}>
              {actionIcon(event.action)}
            </span>
            <span className="text-slate-300">{event.action}</span>
            {event.nodeId && (
              <span className="text-sky-300 bg-sky-950 px-1.5 py-px rounded-sm text-[10px]">
                {event.nodeId}
              </span>
            )}
            {event.detail && (
              <span className="text-slate-400 ml-auto text-[10px]">{event.detail}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
