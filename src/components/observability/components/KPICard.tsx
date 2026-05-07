// frontend/src/components/observability/components/KPICard.tsx
//
// KPI card used on the observability dashboard (§18.6). Renders a title, large
// numeric value, optional delta indicator (up/down %), and optional sparkline.
// Card is clickable when `onClick` is provided — hover draws a primary border.

import { useState } from 'react';
import Sparkline from '../../shared/Sparkline';
import { cn } from '../../../lib/cn';

export interface KPICardProps {
  title: string;
  value: number | string;
  delta?: { value: number; direction: 'up' | 'down' };
  sparklineData?: number[];
  onClick?: () => void;
}

function formatValue(v: number | string): string {
  if (typeof v === 'number') {
    return v.toLocaleString();
  }
  return v;
}

function KPICard({ title, value, delta, sparklineData, onClick }: KPICardProps) {
  const [hover, setHover] = useState(false);

  const clickable = Boolean(onClick);

  return (
    <div
      data-testid="kpi-card"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        'flex-1 min-w-[180px] bg-surface border rounded-[10px] p-4',
        'flex flex-col gap-1.5 font-[inherit] transition-[border-color] duration-[120ms] ease-linear',
        clickable ? 'cursor-pointer' : 'cursor-default',
        hover && clickable ? 'border-primary' : 'border-border'
      )}
    >
      <div className="text-xs font-semibold text-text-secondary tracking-[0.2px]">
        {title}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-[28px] font-bold text-text-primary leading-[1.1]">
          {formatValue(value)}
        </div>
        {sparklineData && sparklineData.length > 0 && (
          <Sparkline
            data={sparklineData}
            width={80}
            height={20}
            color="#646cff"
          />
        )}
      </div>
      {delta && (
        <div
          className={cn(
            'text-[11px] font-semibold font-[inherit]',
            delta.direction === 'up' ? 'text-state-completed' : 'text-state-failed'
          )}
        >
          {delta.direction === 'up' ? '▲' : '▼'} {Math.abs(delta.value)}%
        </div>
      )}
    </div>
  );
}

export default KPICard;
