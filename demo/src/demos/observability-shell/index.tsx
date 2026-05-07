import { SimulatedProvider } from '../../engine/SimulatedProvider';
import { observabilityTimeline } from './simulation';
import { MetricsPanel } from './MetricsPanel';
import { AlertsPanel } from './AlertsPanel';
import { NodeHealthGrid } from './NodeHealthGrid';

// ---------------------------------------------------------------------------
// Placeholder chart component (demonstrates where Recharts would go)
// ---------------------------------------------------------------------------

function ChartPlaceholder() {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 10,
      border: '1px solid #e2e8f0',
      padding: 20,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 14 }}>📈</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>Latency P99</span>
        <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>Last 5 minutes</span>
      </div>
      {/* Fake sparkline bars */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 3,
        padding: '0 4px',
      }}>
        {[35, 42, 38, 55, 90, 85, 45, 30, 28, 32, 38, 35, 40, 42, 36, 33, 38, 95, 72, 38].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: h > 80 ? '#fca5a5' : h > 60 ? '#fde68a' : '#bbf7d0',
              borderRadius: 2,
              transition: 'height 0.3s ease',
            }}
          />
        ))}
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 8,
        fontSize: 10,
        color: '#94a3b8',
      }}>
        <span>5m ago</span>
        <span>now</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main demo export
// ---------------------------------------------------------------------------

export default function ObservabilityShellDemo() {
  return (
    <SimulatedProvider timeline={observabilityTimeline} autoPlay>
      <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Observability Dashboard
            </h2>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: '#dbeafe',
              color: '#1d4ed8',
              padding: '3px 8px',
              borderRadius: 4,
            }}>
              Live
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
            Cluster monitoring with real-time metrics, alerts, and node health. Events from the simulation
            drive KPI updates, alert firing/resolution, and node status changes.
          </p>
        </div>

        {/* KPI Cards */}
        <div style={{ marginBottom: 20 }}>
          <MetricsPanel />
        </div>

        {/* Chart + Alerts row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 20,
          height: 260,
        }}>
          <ChartPlaceholder />
          <AlertsPanel />
        </div>

        {/* Node Health Grid */}
        <NodeHealthGrid />
      </div>
    </SimulatedProvider>
  );
}
