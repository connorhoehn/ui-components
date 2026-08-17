import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { observabilityTimeline } from './simulation';
import { MetricsPanel } from './MetricsPanel';
import { AlertsPanel } from './AlertsPanel';
import { NodeHealthGrid } from './NodeHealthGrid';

const SPARKLINE_BARS = [35, 42, 38, 55, 90, 85, 45, 30, 28, 32, 38, 35, 40, 42, 36, 33, 38, 95, 72, 38];

function sparklineBarColor(height: number) {
  if (height > 80) return 'bg-danger-bg';
  if (height > 60) return 'bg-warning-bg';
  return 'bg-success-bg';
}

function ChartPlaceholder() {
  return (
    <div className="bg-white rounded-[10px] border border-border p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm">📈</span>
        <span className="text-[13px] font-semibold text-text-primary">Latency P99</span>
        <span className="text-[11px] text-text-tertiary ml-auto">Last 5 minutes</span>
      </div>
      <div className="flex-1 flex items-end gap-[3px] px-1">
        {SPARKLINE_BARS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm transition-[height] duration-300 ease-out ${sparklineBarColor(h)}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-text-tertiary">
        <span>5m ago</span>
        <span>now</span>
      </div>
    </div>
  );
}

export default function ObservabilityShellDemo() {
  return (
    <SimulatedProvider timeline={observabilityTimeline} autoPlay>
      <div className="p-6 max-w-[1100px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-bold text-text-primary m-0">
              Observability Dashboard
            </h2>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-info-bg text-info-fg px-2 py-0.5 rounded">
              Live
            </span>
          </div>
          <p className="text-neutral text-sm m-0">
            Cluster monitoring with real-time metrics, alerts, and node health. Events from the simulation
            drive KPI updates, alert firing/resolution, and node status changes.
          </p>
        </div>

        <div className="mb-5">
          <MetricsPanel />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 h-[260px]">
          <ChartPlaceholder />
          <AlertsPanel />
        </div>

        <NodeHealthGrid />
      </div>
    </SimulatedProvider>
  );
}
