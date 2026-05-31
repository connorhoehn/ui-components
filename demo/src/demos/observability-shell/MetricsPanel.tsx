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

const SEVERITY_CLASSES: Record<NonNullable<KPI['severity']>, string> = {
  normal: 'bg-green-50 border-green-200',
  warning: 'bg-amber-50 border-amber-200',
  critical: 'bg-red-50 border-red-200',
};

const SEVERITY_TEXT: Record<NonNullable<KPI['severity']>, string> = {
  normal: 'text-green-800',
  warning: 'text-amber-800',
  critical: 'text-red-800',
};

const TREND_ARROW: Record<NonNullable<KPI['trend']>, string> = {
  up: '↑',
  down: '↓',
  stable: '→',
};

const TREND_COLOR: Record<NonNullable<KPI['trend']>, string> = {
  up: 'text-red-600',
  down: 'text-green-600',
  stable: 'text-slate-400',
};

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

  return (
    <div className="grid grid-cols-4 gap-3.5">
      {kpis.map((kpi) => {
        const severity = kpi.severity ?? 'normal';
        return (
          <div
            key={kpi.label}
            className={`rounded-[10px] border px-[18px] py-4 transition-all ${SEVERITY_CLASSES[severity]}`}
          >
            <div className="text-[11px] font-medium text-slate-500 mb-2">
              {kpi.label}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-2xl font-bold ${SEVERITY_TEXT[severity]}`}>
                {kpi.value}
              </span>
              {kpi.unit && <span className="text-xs text-slate-500">{kpi.unit}</span>}
              {kpi.trend && kpi.trend !== 'stable' && (
                <span className={`ml-auto text-sm font-semibold ${TREND_COLOR[kpi.trend]}`}>
                  {TREND_ARROW[kpi.trend]}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
