import { useEffect, useState } from 'react';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import type { GatewayMessage } from '@/types/gateway';

interface KPI {
  label: string;
  value: string;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
  severity?: 'normal' | 'warning' | 'critical';
}

export function MetricsPanel() {
  const { onMessage } = useWebSocketContext();
  const [kpis, setKpis] = useState<KPI[]>([
    { label: 'Latency P99', value: '--', unit: 'ms', trend: 'stable', severity: 'normal' },
    { label: 'Error Rate', value: '--', unit: '%', trend: 'stable', severity: 'normal' },
    { label: 'Requests/sec', value: '1,240', unit: 'req/s', trend: 'stable', severity: 'normal' },
    { label: 'Active Nodes', value: '12/12', unit: '', trend: 'stable', severity: 'normal' },
  ]);

  useEffect(() => {
    const unsubscribe = onMessage((msg: GatewayMessage) => {
      if (msg.type === 'metrics' && msg.action === 'datapoint') {
        const metric = msg.metric as string;
        const value = msg.value as number;

        setKpis((prev) => prev.map((kpi) => {
          if (metric === 'api.latency.p99' && kpi.label === 'Latency P99') {
            const severity: KPI['severity'] = value > 2000 ? 'critical' : value > 500 ? 'warning' : 'normal';
            const trend: KPI['trend'] = value > 1000 ? 'up' : 'down';
            return { ...kpi, value: value.toLocaleString(), severity, trend };
          }
          if (metric === 'api.error_rate' && kpi.label === 'Error Rate') {
            const severity: KPI['severity'] = value > 5 ? 'critical' : value > 2 ? 'warning' : 'normal';
            const trend: KPI['trend'] = value > 5 ? 'up' : 'down';
            return { ...kpi, value: value.toFixed(1), severity, trend };
          }
          return kpi;
        }));
      }

      if (msg.type === 'health' && msg.action === 'status.changed') {
        const currentStatus = msg.currentStatus as string;
        setKpis((prev) => prev.map((kpi) => {
          if (kpi.label === 'Active Nodes') {
            const severity: KPI['severity'] = currentStatus === 'degraded' ? 'warning' : 'normal';
            const nodeCount = currentStatus === 'degraded' ? '11/12' : '12/12';
            return { ...kpi, value: nodeCount, severity, trend: currentStatus === 'degraded' ? 'down' : 'stable' };
          }
          return kpi;
        }));
      }
    });
    return unsubscribe;
  }, [onMessage]);

  const severityColors: Record<string, { bg: string; border: string; text: string }> = {
    normal: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e' },
    critical: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
  };

  const trendArrow: Record<string, string> = {
    up: '↑',
    down: '↓',
    stable: '→',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
      {kpis.map((kpi) => {
        const colors = severityColors[kpi.severity ?? 'normal'];
        return (
          <div
            key={kpi.label}
            style={{
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              padding: '16px 18px',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: 11, color: '#64748b', fontWeight: 500, marginBottom: 8 }}>
              {kpi.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 24, fontWeight: 700, color: colors.text }}>
                {kpi.value}
              </span>
              {kpi.unit && (
                <span style={{ fontSize: 12, color: '#64748b' }}>{kpi.unit}</span>
              )}
              {kpi.trend && kpi.trend !== 'stable' && (
                <span style={{
                  fontSize: 14,
                  color: kpi.trend === 'up' ? '#dc2626' : '#16a34a',
                  marginLeft: 'auto',
                  fontWeight: 600,
                }}>
                  {trendArrow[kpi.trend]}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
