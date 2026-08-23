import { useState } from 'react';
import { cn } from '../../lib/cn';
import { useAgentsContext } from './context/AgentsContext';
import { useAgUiStream } from './hooks/useAgUiStream';
import { StreamingChatPanel } from './components/StreamingChatPanel';
import type { AgUiEvent } from '../../types/agents';

interface AgentInvokePageProps {
  defaultAgentId?: string;
  baseUrl?: string;
  className?: string;
}

export function AgentInvokePage({ defaultAgentId, baseUrl = '/api/agents', className }: AgentInvokePageProps) {
  const { agents } = useAgentsContext();
  const [selectedId, setSelectedId] = useState(defaultAgentId ?? agents[0]?.id ?? '');
  const [events, setEvents] = useState<AgUiEvent[]>([]);

  const invokeUrl = `${baseUrl}/${selectedId}/invoke`;
  const { messages, isStreaming, streamingText, activeToolCalls, error, sendMessage, cancelStream, reset } =
    useAgUiStream({
      url: invokeUrl,
      onEvent: (event) => setEvents((prev) => [...prev, event]),
    });

  const selectedAgent = agents.find((a) => a.id === selectedId);

  return (
    <div className={cn('flex h-full min-h-[500px]', className)}>
      {/* Left panel — agent selector & info */}
      <div className="w-[240px] border-r border-border bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="py-3 px-4 border-b border-border font-semibold text-[13px] text-neutral uppercase tracking-[0.05em]">
          Agents
        </div>

        {/* Agent list */}
        <div className="flex-1 py-2 overflow-y-auto">
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => { setSelectedId(agent.id); reset(); setEvents([]); }}
              className={cn(
                'py-2 px-4 flex items-center justify-between transition-all duration-150 ease-in-out border-l-[3px]',
                agent.status === 'offline' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                selectedId === agent.id
                  ? 'bg-surface-hover border-l-primary'
                  : 'bg-transparent border-l-transparent',
              )}
            >
              <div className="min-w-0">
                <div className="text-[14px] text-text-primary truncate">
                  {agent.name}
                </div>
                <div className="text-[11px] text-text-tertiary">
                  {agent.protocol.toUpperCase()} · {agent.model}
                </div>
              </div>
              <span
                className={cn(
                  'w-2 h-2 rounded-full shrink-0',
                  agent.status === 'healthy'
                    ? 'bg-success'
                    : agent.status === 'degraded'
                      ? 'bg-warning'
                      : 'bg-danger',
                )}
              />
            </div>
          ))}
        </div>

        {/* Agent details */}
        {selectedAgent && (
          <div className="py-3 px-4 border-t border-border text-[11px]">
            <div className="text-neutral mb-1.5">Tools:</div>
            <div className="flex flex-wrap gap-1">
              {selectedAgent.tools.map((t) => (
                <span
                  key={t}
                  className="py-0.5 px-1.5 bg-surface-hover rounded text-[10px] text-text-secondary font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
            {selectedAgent.guardrails.length > 0 && (
              <div className="mt-2">
                <div className="text-neutral mb-1">Guardrails:</div>
                {selectedAgent.guardrails.map((g) => (
                  <div key={g} className="text-[10px] text-warning-fg font-mono">
                    🛡️ {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="py-2 px-4 border-t border-border">
          <button
            onClick={() => { reset(); setEvents([]); }}
            className="w-full py-1.5 text-[12px] text-neutral bg-surface-panel border border-border rounded-md cursor-pointer"
          >
            Reset Session
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <StreamingChatPanel
          messages={messages}
          isStreaming={isStreaming}
          streamingText={streamingText}
          activeToolCalls={activeToolCalls}
          error={error}
          onSend={sendMessage}
          onCancel={cancelStream}
          className="flex-1 border-0 rounded-none"
        />

        {/* Event log footer */}
        {events.length > 0 && (
          <details className="border-t border-border bg-surface-panel">
            <summary className="py-2 px-4 text-[12px] text-neutral cursor-pointer font-medium">
              Event Log ({events.length} events)
            </summary>
            <div className="max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-2 text-text-secondary py-px">
                  <span className="text-text-tertiary w-5 text-right shrink-0">{i + 1}</span>
                  <span className="text-text-primary w-[150px] shrink-0 font-medium">{ev.type}</span>
                  <span className="text-neutral overflow-hidden text-ellipsis whitespace-nowrap">
                    {(() => {
                      if (ev.type === 'TEXT_MESSAGE_CONTENT' || ev.type === 'TOOL_CALL_ARGS') return `"${ev.delta.slice(0, 60)}"`;
                      if (ev.type === 'TEXT_MESSAGE_CHUNK' && ev.delta) return `"${ev.delta.slice(0, 60)}"`;
                      if (ev.type === 'TOOL_CALL_START') return ev.toolCallName;
                      if (ev.type === 'RUN_ERROR') return ev.message;
                      return '';
                    })()}
                  </span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
