// frontend/src/components/ingest/SourceSloPanel.tsx
//
// Per-source SLO panel — three sparklines (p95 latency, error rate %,
// queue depth) over a configurable window. AGENTIC_ETL_VISION §F.
// Embedded into SourceDetailPage via <SourceSloPanel sourceId={...} />.

import type { CSSProperties } from 'react';
import { useState } from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { colors, fieldStyle } from '../../constants/styles';
import { useSourceSloMetrics } from '../../hooks/useSourceSloMetrics';
import type { SloPoint, SloWindow } from '../../hooks/useSourceSloMetrics';

const styles: Record<string, CSSProperties> = {
  panel: { padding: '12px 16px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: 10, marginBottom: 16 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 },
  title: { fontSize: 14, fontWeight: 700, color: colors.textPrimary },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 },
  chartCard: { padding: '8px 10px', background: colors.surfaceInset, borderRadius: 8 },
  chartLabel: { fontSize: 11, color: colors.textTertiary, marginBottom: 4 },
  chartValue: { fontSize: 16, fontWeight: 700, color: colors.textPrimary },
  errorBanner: { padding: '8px 12px', background: '#fef2f2', border: `1px solid ${colors.state.failed}`, color: colors.state.failed, borderRadius: 8, fontSize: 12 },
};

const WINDOW_OPTIONS: SloWindow[] = ['15m', '1h', '6h', '24h'];

interface MiniChartProps {
  points: SloPoint[];
  color: string;
  testId: string;
}

function MiniChart({ points, color, testId }: MiniChartProps) {
  // recharts wants `null` removed for line continuity; we pass through and
  // let the chart skip null values so a single gap shows correctly.
  const data = points.map((p) => ({ at: p.at, value: p.value ?? null }));
  return (
    <div data-testid={testId} style={{ height: 60 }}>
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
    <div data-testid="source-slo-panel" style={styles.panel}>
      <div style={styles.header}>
        <span style={styles.title}>Health (last {window})</span>
        <select
          data-testid="slo-window-picker"
          aria-label="Window"
          style={{ ...fieldStyle, flex: 'none', minWidth: 100 }}
          value={window}
          onChange={(e) => setWindow(e.target.value as SloWindow)}
        >
          {WINDOW_OPTIONS.map((w) => (
            <option key={w} value={w}>Last {w}</option>
          ))}
        </select>
      </div>
      {error ? (
        <div data-testid="slo-error" style={styles.errorBanner}>
          Couldn't load source metrics: {error}
        </div>
      ) : null}
      {metrics ? (
        <div style={styles.grid}>
          <div style={styles.chartCard}>
            <div style={styles.chartLabel}>p95 latency</div>
            <div data-testid="slo-latency-value" style={styles.chartValue}>
              {(() => {
                const v = lastNonNull(metrics.latencyP95);
                return v === null ? '—' : `${Math.round(v)} ms`;
              })()}
            </div>
            <MiniChart points={metrics.latencyP95} color={colors.state.completed} testId="slo-latency-chart" />
          </div>
          <div style={styles.chartCard}>
            <div style={styles.chartLabel}>error rate</div>
            <div data-testid="slo-error-rate-value" style={styles.chartValue}>
              {(() => {
                const v = lastNonNull(metrics.errorRate);
                return v === null ? '—' : `${v.toFixed(1)}%`;
              })()}
            </div>
            <MiniChart points={metrics.errorRate} color={colors.state.failed} testId="slo-error-rate-chart" />
          </div>
          <div style={styles.chartCard}>
            <div style={styles.chartLabel}>queue depth</div>
            <div data-testid="slo-queue-depth-value" style={styles.chartValue}>
              {lastNonNull(metrics.queueDepth) ?? 0}
            </div>
            <MiniChart points={metrics.queueDepth} color={colors.state.awaiting} testId="slo-queue-depth-chart" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
