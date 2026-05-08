import { cn } from '../../../lib/cn';

interface GuardrailBadgeProps {
  guardrails: string[];
  className?: string;
  compact?: boolean;
}

export function GuardrailBadge({ guardrails, className, compact }: GuardrailBadgeProps) {
  if (guardrails.length === 0) {
    return (
      <span className={cn('text-[10px] text-slate-400 italic', className)}>
        No guardrails
      </span>
    );
  }

  if (compact) {
    return (
      <span className={cn('inline-flex items-center gap-1 text-[10px]', className)}>
        <span className="text-amber-500">🛡️</span>
        <span className="text-slate-600">{guardrails.length}</span>
      </span>
    );
  }

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {guardrails.map((g) => (
        <span
          key={g}
          className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded font-mono"
        >
          🛡️ {g}
        </span>
      ))}
    </div>
  );
}
