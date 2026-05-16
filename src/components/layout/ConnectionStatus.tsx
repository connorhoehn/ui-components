// frontend/src/components/ConnectionStatus.tsx
import type { ConnectionState } from '../../types/gateway';
import { cn } from '../../lib/cn';

interface Props {
  state: ConnectionState;
}

const STATE_CONFIG: Record<ConnectionState, { label: string; colorClass: string; dot: string }> = {
  idle:          { label: 'Idle',          colorClass: 'text-[#6b7280]', dot: '⬤' },
  connecting:    { label: 'Connecting…',   colorClass: 'text-[#f59e0b]', dot: '⬤' },
  connected:     { label: 'Connected',     colorClass: 'text-[#10b981]', dot: '⬤' },
  reconnecting:  { label: 'Reconnecting…', colorClass: 'text-[#f59e0b]', dot: '⬤' },
  disconnected:  { label: 'Disconnected',  colorClass: 'text-[#ef4444]', dot: '⬤' },
};

export function ConnectionStatus({ state }: Props) {
  const cfg = STATE_CONFIG[state];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono">
      <span className={cfg.colorClass}>{cfg.dot}</span>
      <span className={cn(cfg.colorClass, 'font-semibold')}>{cfg.label}</span>
    </span>
  );
}
