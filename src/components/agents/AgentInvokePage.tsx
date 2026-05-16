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
      <div className="w-[240px] border-r border-[#e2e8f0] bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="py-3 px-4 border-b border-[#e2e8f0] font-semibold text-[13px] text-[#64748b] uppercase tracking-[0.05em]">
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
                  ? 'bg-[#f1f5f9] border-l-[#6366f1]'
                  : 'bg-transparent border-l-transparent',
              )}
            >
              <div className="min-w-0">
                <div className="text-[14px] text-[#1a1a2e] truncate">
                  {agent.name}
                </div>
                <div className="text-[11px] text-[#94a3b8]">
                  {agent.protocol.toUpperCase()} · {agent.model}
                </div>
              </div>
              <span
                className={cn(
                  'w-2 h-2 rounded-full shrink-0',
                  agent.status === 'healthy'
                    ? 'bg-[#10b981]'
                    : agent.status === 'degraded'
                      ? 'bg-[#f59e0b]'
                      : 'bg-[#ef4444]',
                )}
              />
            </div>
          ))}
        </div>

        {/* Agent details */}
        {selectedAgent && (
          <div className="py-3 px-4 border-t border-[#e2e8f0] text-[11px]">
            <div className="text-[#64748b] mb-1.5">Tools:</div>
            <div className="flex flex-wrap gap-1">
              {selectedAgent.tools.map((t) => (
                <span
                  key={t}
                  className="py-0.5 px-1.5 bg-[#f1f5f9] rounded text-[10px] text-[#475569] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
            {selectedAgent.guardrails.length > 0 && (
              <div className="mt-2">
                <div className="text-[#64748b] mb-1">Guardrails:</div>
                {selectedAgent.guardrails.map((g) => (
                  <div key={g} className="text-[10px] text-[#d97706] font-mono">
                    🛡️ {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="py-2 px-4 border-t border-[#e2e8f0]">
          <button
            onClick={() => { reset(); setEvents([]); }}
            className="w-full py-1.5 text-[12px] text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] rounded-md cursor-pointer"
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
          <details className="border-t border-[#e2e8f0] bg-[#f8fafc]">
            <summary className="py-2 px-4 text-[12px] text-[#64748b] cursor-pointer font-medium">
              Event Log ({events.length} events)
            </summary>
            <div className="max-h-[150px] overflow-y-auto pt-1 px-4 pb-2 font-mono text-[10px]">
              {events.map((ev, i) => (
                <div key={i} className="flex gap-2 text-[#475569] py-px">
                  <span className="text-[#94a3b8] w-5 text-right shrink-0">{i + 1}</span>
                  <span className="text-[#1e293b] w-[150px] shrink-0 font-medium">{ev.type}</span>
                  <span className="text-[#64748b] overflow-hidden text-ellipsis whitespace-nowrap">
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
