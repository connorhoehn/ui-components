// frontend/src/components/observability/components/NodeGridTile.tsx
//
// 200x200 tile summarizing a single cluster node (§18.6 cluster health, §18.7
// node grid). Shows id, role/region tags, CPU%, MEM, CONN, RUNS, CPU sparkline,
// and a subtle [● kill] action (Phase 5 chaos — stub onKill for Phase 1).

import { useState } from 'react';
import Sparkline from '../../shared/Sparkline';
import { cn } from '../../../lib/cn';

export interface NodeSummary {
  id: string;
  status: 'healthy' | 'degraded' | 'dead' | 'idle';
  region?: string;
  role?: string;
  cpu: number;
  memoryMb: number;
  connections: number;
  activeRuns: number;
  cpuHistory: number[];
}

export interface NodeGridTileProps {
  node: NodeSummary;
  selected?: boolean;
  onClick?: () => void;
  onKill?: () => void;
}

const STATUS_COLOR: Record<NodeSummary['status'], string> = {
  healthy: '#16a34a',
  degraded: '#f59e0b',
  dead: '#dc2626',
  idle: '#d1d5db',
};

function formatMem(mb: number): string {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)}G`;
  }
  return `${Math.round(mb)}M`;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline text-xs font-[inherit]">
      <span className="text-text-secondary font-semibold">
        {label}
      </span>
      <span className="text-text-primary font-mono text-[11px]">
        {value}
      </span>
    </div>
  );
}

function NodeGridTile({ node, selected, onClick, onKill }: NodeGridTileProps) {
  const [hover, setHover] = useState(false);

  const statusColor = STATUS_COLOR[node.status];

  const runsText =
    node.activeRuns > 0
      ? `${node.activeRuns}`
      : '— idle';

  return (
    <div
      data-testid="node-grid-tile"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        'w-[200px] h-[200px] bg-surface rounded-[10px] p-3',
        'flex flex-col gap-1.5 font-[inherit] box-border',
        'transition-[box-shadow,border-color] duration-[120ms] ease-linear',
        onClick ? 'cursor-pointer' : 'cursor-default'
      )}
      style={{
        border: `1px solid ${selected ? '#646cff' : statusColor}`,
        boxShadow: selected
          ? '0 0 0 4px rgba(100, 108, 255, 0.18)'
          : hover
          ? '0 2px 8px rgba(100, 108, 255, 0.10)'
          : 'none',
      }}
    >
      {/* Header: id + status dot */}
      <div className="flex justify-between items-center">
        <div
          className="text-[13px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"
          title={node.id}
        >
          {node.id}
        </div>
        <span
          role="img"
          aria-label={`status ${node.status}`}
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: statusColor }}
        />
      </div>

      {/* Role + region tags */}
      {(node.role || node.region) && (
        <div className="text-[11px] text-text-tertiary font-[inherit]">
          {[node.role, node.region].filter(Boolean).join(' · ')}
        </div>
      )}

      {/* Stats */}
      <div className="flex flex-col gap-0.5">
        <Stat label="CPU" value={`${Math.round(node.cpu)}%`} />
        <Stat label="MEM" value={formatMem(node.memoryMb)} />
        <Stat label="CONN" value={`${node.connections}`} />
        <Stat label="RUNS" value={runsText} />
      </div>

      {/* CPU sparkline */}
      <div className="mt-auto">
        <Sparkline
          data={node.cpuHistory}
          width={176}
          height={18}
          color="#646cff"
        />
      </div>

      {/* Kill button (Phase 5 stub) */}
      {onKill && (
        <button
          data-testid="node-kill-btn"
          onClick={(e) => {
            e.stopPropagation();
            onKill();
          }}
          className="self-start px-2 py-0.5 text-[11px] font-semibold bg-transparent text-text-tertiary border border-border rounded-sm cursor-pointer font-[inherit]"
        >
          ● kill
        </button>
      )}
    </div>
  );
}

export default NodeGridTile;
