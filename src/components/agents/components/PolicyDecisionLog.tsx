import { cn } from '../../../lib/cn';

export interface PolicyDecision {
  id: string;
  action: string;
  resource: string;
  principal: string;
  decision: 'allow' | 'deny';
  policyId: string;
  timestamp: string;
  reason?: string;
}

interface PolicyDecisionLogProps {
  decisions: PolicyDecision[];
  className?: string;
  maxItems?: number;
}

export function PolicyDecisionLog({ decisions, className, maxItems = 50 }: PolicyDecisionLogProps) {
  const visible = decisions.slice(0, maxItems);

  return (
    <div className={cn('border border-slate-200 rounded-lg overflow-hidden bg-white', className)}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 bg-slate-50">
        <span className="text-xs font-medium text-slate-700">Policy Decisions</span>
        <span className="text-[10px] text-slate-400">{decisions.length} total</span>
      </div>

      {visible.length === 0 ? (
        <div className="px-3 py-6 text-center text-xs text-slate-400">No decisions recorded</div>
      ) : (
        <div className="max-h-[250px] overflow-y-auto divide-y divide-slate-100">
          {visible.map((d) => (
            <div key={d.id} className="flex items-center gap-2 px-3 py-2">
              <span
                className={cn(
                  'shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold',
                  d.decision === 'allow' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700',
                )}
              >
                {d.decision === 'allow' ? '✓' : '✗'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-slate-700 truncate">
                    {d.action}
                  </span>
                  <span className="text-[10px] text-slate-400">on</span>
                  <span className="text-[11px] font-mono text-slate-600 truncate">
                    {d.resource}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <span>by {d.principal}</span>
                  <span>·</span>
                  <span className="font-mono">{d.policyId}</span>
                  {d.reason && (
                    <>
                      <span>·</span>
                      <span className="italic">{d.reason}</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">
                {formatTime(d.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
}
