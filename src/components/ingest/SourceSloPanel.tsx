// frontend/src/components/ingest/SourceSloPanel.tsx
//
// Per-source SLO panel — three sparklines (p95 latency, error rate %,
// queue depth) over a configurable window. AGENTIC_ETL_VISION §F.

import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { useSourceSloMetrics } from '../../hooks/useSourceSloMetrics';
import { Select } from '../forms/Select';
import type { SloPoint, SloWindow } from '../../hooks/useSourceSloMetrics';

const WINDOW_OPTIONS: SloWindow[] = ['15m', '1h', '6h', '24h'];

interface MiniChartProps {
  points: SloPoint[];
  color: string;
  testId: string;
}

function MiniChart({ points, color, testId }: MiniChartProps) {
  const data = points.map((p) => ({ at: p.at, value: p.value ?? null }));
  return (
    <div data-testid={testId} className="h-[60px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <YAxis hide />
          <Tooltip
            cursor={false}
            contentStyle={{ fontSize: 11, padding: '4px 6px' }}
            formatter={((v: any) => [v, '']) as any}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            connectNulls={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function lastNonNull(points: SloPoint[]): number | null {
  for (let i = points.length - 1; i >= 0; i--) {
    if (points[i].value !== null) return points[i].value;
  }
  return null;
}

interface Props {
  sourceId: string;
}

export default function SourceSloPanel({ sourceId }: Props) {
  const [window, setWindow] = useState<SloWindow>('1h');
  const { metrics, error } = useSourceSloMetrics(sourceId, window);

  return (
    <div data-testid="source-slo-panel" className="px-4 py-3 bg-surface border border-border rounded-[10px] mb-4">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="text-sm font-bold text-text-primary">Health (last {window})</span>
        <Select
          data-testid="slo-window-picker"
          aria-label="Window"
          className="w-auto min-w-[100px]"
          value={window}
          onChange={(e) => setWindow(e.target.value as SloWindow)}
          options={WINDOW_OPTIONS.map((w) => ({ value: w, label: `Last ${w}` }))}
        />
      </div>
      {error ? (
        <div role="alert" data-testid="slo-error" className="px-3 py-2 bg-danger-bg border border-[var(--color-state-failed)] text-[var(--color-state-failed)] rounded-lg text-xs">
          Couldn't load source metrics: {error}
        </div>
      ) : null}
      {metrics ? (
        <div className="grid grid-cols-3 gap-3">
          <div className="px-2.5 py-2 bg-surface-inset rounded-lg">
            <div className="text-[11px] text-text-tertiary mb-1">p95 latency</div>
            <div data-testid="slo-latency-value" className="text-base font-bold text-text-primary">
              {(() => {
                const v = lastNonNull(metrics.latencyP95);
                return v === null ? '—' : `${Math.round(v)} ms`;
              })()}
            </div>
            <MiniChart points={metrics.latencyP95} color="var(--color-state-completed)" testId="slo-latency-chart" />
          </div>
          <div className="px-2.5 py-2 bg-surface-inset rounded-lg">
            <div className="text-[11px] text-text-tertiary mb-1">error rate</div>
            <div data-testid="slo-error-rate-value" className="text-base font-bold text-text-primary">
              {(() => {
                const v = lastNonNull(metrics.errorRate);
                return v === null ? '—' : `${v.toFixed(1)}%`;
              })()}
            </div>
            <MiniChart points={metrics.errorRate} color="var(--color-state-failed)" testId="slo-error-rate-chart" />
          </div>
          <div className="px-2.5 py-2 bg-surface-inset rounded-lg">
            <div className="text-[11px] text-text-tertiary mb-1">queue depth</div>
            <div data-testid="slo-queue-depth-value" className="text-base font-bold text-text-primary">
              {/* `?? 0` rendered a confident "0" — "backlog drained, healthy" —
                  for a source that reported no queue-depth samples at all.
                  Both sibling tiles above already render an em-dash for the
                  no-data case; this one was the outlier. */}
              {(() => {
                const v = lastNonNull(metrics.queueDepth);
                return v === null ? '—' : v;
              })()}
            </div>
            <MiniChart points={metrics.queueDepth} color="var(--color-state-awaiting)" testId="slo-queue-depth-chart" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
