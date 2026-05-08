import { useState } from 'react';
import { cn } from '../../lib/cn';
import { useAgentsContext } from './context/AgentsContext';
import { useAgUiStream } from './hooks/useAgUiStream';
import { StreamingChatPanel } from './components/StreamingChatPanel';
import { TraceTimeline } from './components/TraceTimeline';
import type { AgUiEvent, TraceTimeline as TraceTimelineType } from '../../types/agents';
import { fixtureTrace } from './fixtures/agentsFixture';

interface AgentInvokePageProps {
  defaultAgentId?: string;
  baseUrl?: string;
  className?: string;
}

export function AgentInvokePage({ defaultAgentId, baseUrl = '/api/agents', className }: AgentInvokePageProps) {
  const { agents } = useAgentsContext();
  const [selectedId, setSelectedId] = useState(defaultAgentId ?? agents[0]?.id ?? '');
  const [events, setEvents] = useState<AgUiEvent[]>([]);
  const [showTrace, setShowTrace] = useState(false);

  const invokeUrl = `${baseUrl}/${selectedId}/invoke`;
  const { messages, isStreaming, currentToolCall, error, sendMessage, cancelStream, reset } =
    useAgUiStream({
      url: invokeUrl,
      onEvent: (event) => setEvents((prev) => [...prev, event]),
    });

  const selectedAgent = agents.find((a) => a.id === selectedId);
  const trace: TraceTimelineType | null = showTrace ? fixtureTrace : null;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Invoke Agent</h2>
          <p className="text-xs text-slate-500">Interactive streaming invocation via AG-UI protocol</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTrace(!showTrace)}
            className={cn(
              'text-xs px-2 py-1 rounded border transition-colors',
              showTrace ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-slate-200 text-slate-500 hover:bg-slate-50',
            )}
          >
            {showTrace ? 'Hide Trace' : 'Show Trace'}
          </button>
          <button
            onClick={() => { reset(); setEvents([]); }}
            className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-500 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Agent selector */}
      <div className="flex items-center gap-3">
        <label className="text-xs text-slate-500">Agent:</label>
        <select
          value={selectedId}
          onChange={(e) => { setSelectedId(e.target.value); reset(); setEvents([]); }}
          className="text-sm border border-slate-200 rounded px-2 py-1 bg-white"
        >
          {agents.map((a) => (
            <option key={a.id} value={a.id} disabled={a.status === 'offline'}>
              {a.name} ({a.status})
            </option>
          ))}
        </select>
        {selectedAgent && (
          <span className="text-xs text-slate-400">
            {selectedAgent.protocol.toUpperCase()} · {selectedAgent.model}
          </span>
        )}
      </div>

      {/* Chat */}
      <StreamingChatPanel
        messages={messages}
        isStreaming={isStreaming}
        currentToolCall={currentToolCall}
        error={error}
        onSend={sendMessage}
        onCancel={cancelStream}
        className="h-[400px]"
      />

      {/* Event log */}
      {events.length > 0 && (
        <details className="border border-slate-200 rounded-lg overflow-hidden">
          <summary className="px-3 py-2 bg-slate-50 text-xs font-medium text-slate-600 cursor-pointer">
            Event Log ({events.length} events)
          </summary>
          <div className="max-h-[200px] overflow-y-auto p-2 space-y-0.5 font-mono text-[10px]">
            {events.map((ev, i) => (
              <div key={i} className="flex gap-2 text-slate-600">
                <span className="text-slate-400 shrink-0 w-6 text-right">{i + 1}</span>
                <span className="font-medium text-slate-700 shrink-0 w-[160px]">{ev.type}</span>
                <span className="truncate text-slate-500">
                  {ev.delta ? `"${ev.delta.slice(0, 60)}"` : ev.toolName ?? ev.error ?? ''}
                </span>
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Trace */}
      {trace && <TraceTimeline trace={trace} />}
    </div>
  );
}
