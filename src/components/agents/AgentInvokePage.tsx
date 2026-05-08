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
  const { messages, isStreaming, currentToolCall, error, sendMessage, cancelStream, reset } =
    useAgUiStream({
      url: invokeUrl,
      onEvent: (event) => setEvents((prev) => [...prev, event]),
    });

  const selectedAgent = agents.find((a) => a.id === selectedId);

  return (
    <div className={cn('flex h-full', className)} style={{ minHeight: 500 }}>
      {/* Left panel — agent selector & info */}
      <div style={{
        width: 240,
        borderRight: '1px solid #e2e8f0',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: 13,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          Agents
        </div>

        {/* Agent list */}
        <div style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
          {agents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => { setSelectedId(agent.id); reset(); setEvents([]); }}
              style={{
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: agent.status === 'offline' ? 'not-allowed' : 'pointer',
                opacity: agent.status === 'offline' ? 0.5 : 1,
                background: selectedId === agent.id ? '#f1f5f9' : 'transparent',
                borderLeft: selectedId === agent.id ? '3px solid #6366f1' : '3px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {agent.name}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>
                  {agent.protocol.toUpperCase()} · {agent.model}
                </div>
              </div>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: agent.status === 'healthy' ? '#10b981' : agent.status === 'degraded' ? '#f59e0b' : '#ef4444',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>

        {/* Agent details */}
        {selectedAgent && (
          <div style={{ padding: '12px 16px', borderTop: '1px solid #e2e8f0', fontSize: 11 }}>
            <div style={{ color: '#64748b', marginBottom: 6 }}>Tools:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {selectedAgent.tools.map((t) => (
                <span key={t} style={{
                  padding: '2px 6px',
                  background: '#f1f5f9',
                  borderRadius: 4,
                  fontSize: 10,
                  color: '#475569',
                  fontFamily: 'monospace',
                }}>
                  {t}
                </span>
              ))}
            </div>
            {selectedAgent.guardrails.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: '#64748b', marginBottom: 4 }}>Guardrails:</div>
                {selectedAgent.guardrails.map((g) => (
                  <div key={g} style={{ fontSize: 10, color: '#d97706', fontFamily: 'monospace' }}>
                    🛡️ {g}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={() => { reset(); setEvents([]); }}
            style={{
              width: '100%',
              padding: '6px 0',
              fontSize: 12,
              color: '#64748b',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              cursor: 'pointer',
            }}
          >
            Reset Session
          </button>
        </div>
      </div>

      {/* Main chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <StreamingChatPanel
          messages={messages}
          isStreaming={isStreaming}
          currentToolCall={currentToolCall}
          error={error}
          onSend={sendMessage}
          onCancel={cancelStream}
          className="flex-1 border-0 rounded-none"
        />

        {/* Event log footer */}
        {events.length > 0 && (
          <details style={{ borderTop: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <summary style={{ padding: '8px 16px', fontSize: 12, color: '#64748b', cursor: 'pointer', fontWeight: 500 }}>
              Event Log ({events.length} events)
            </summary>
            <div style={{ maxHeight: 150, overflowY: 'auto', padding: '4px 16px 8px', fontFamily: 'monospace', fontSize: 10 }}>
              {events.map((ev, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, color: '#475569', padding: '1px 0' }}>
                  <span style={{ color: '#94a3b8', width: 20, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#1e293b', width: 150, flexShrink: 0, fontWeight: 500 }}>{ev.type}</span>
                  <span style={{ color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {ev.delta ? `"${ev.delta.slice(0, 60)}"` : ev.toolName ?? ev.error ?? ''}
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
