import { cn } from '../../lib/cn';
import { useAgentsContext } from './context/AgentsContext';
import { GuardrailBadge } from './components/GuardrailBadge';
import { TraceTimeline } from './components/TraceTimeline';
import type { TraceTimeline as TraceTimelineType } from '../../types/agents';

interface AgentDetailPageProps {
  agentId: string;
  trace?: TraceTimelineType;
  onBack?: () => void;
  className?: string;
}

export function AgentDetailPage({ agentId, trace, onBack, className }: AgentDetailPageProps) {
  const { getAgent, getMetrics } = useAgentsContext();
  const agent = getAgent(agentId);
  const metrics = getMetrics(agentId);

  if (!agent) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="text-slate-400 text-sm">Agent not found: {agentId}</div>
        {onBack && (
          <button className="mt-2 text-xs text-info-fg hover:underline" onClick={onBack}>
            Back to dashboard
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          {onBack && (
            <button className="text-xs text-info-fg hover:underline mb-2 block" onClick={onBack}>
              ← Back
            </button>
          )}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{agent.name}</h2>
              <div className="text-xs text-slate-500 font-mono">{agent.id}</div>
            </div>
          </div>
          {agent.description && (
            <p className="text-sm text-slate-600 mt-2">{agent.description}</p>
          )}
        </div>
        <StatusBadge status={agent.status} />
      </div>

      {/* Config grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Configuration">
          <Row label="Protocol" value={agent.protocol.toUpperCase()} />
          <Row label="Model" value={agent.model} />
          <Row label="Endpoint" value={agent.endpoint} mono />
        </Section>

        <Section title="Tools">
          <div className="flex flex-wrap gap-1">
            {agent.tools.map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 bg-slate-100 rounded font-mono text-slate-700">
                {t}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Guardrails">
          <GuardrailBadge guardrails={agent.guardrails} />
        </Section>

        {metrics && (
          <Section title="Metrics (24h)">
            <Row label="Invocations" value={String(metrics.invocationsLast24h)} />
            <Row label="Errors" value={String(metrics.errorsLast24h)} />
            <Row label="Avg Latency" value={`${metrics.avgLatencyMs}ms`} />
            <Row label="P99 Latency" value={`${metrics.p99LatencyMs}ms`} />
            <Row label="Tokens In" value={metrics.tokensInLast24h.toLocaleString()} />
            <Row label="Tokens Out" value={metrics.tokensOutLast24h.toLocaleString()} />
            <Row label="Guardrail Blocks" value={String(metrics.guardrailBlocksLast24h)} />
          </Section>
        )}
      </div>

      {/* Trace */}
      {trace && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">Recent Trace</h3>
          <TraceTimeline trace={trace} />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    healthy: 'bg-success-bg text-success-fg',
    degraded: 'bg-warning-bg text-warning-fg',
    offline: 'bg-danger-bg text-danger-fg',
    deploying: 'bg-info-bg text-info-fg',
  };
  return (
    <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', styles[status] ?? 'bg-slate-100 text-slate-700')}>
      {status}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white">
      <h4 className="text-xs font-medium text-slate-500 uppercase mb-3">{title}</h4>
      {children}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between py-1 text-[12px]">
      <span className="text-slate-500">{label}</span>
      <span className={cn('text-slate-800', mono && 'font-mono text-[11px] break-all text-right max-w-[60%]')}>
        {value}
      </span>
    </div>
  );
}
