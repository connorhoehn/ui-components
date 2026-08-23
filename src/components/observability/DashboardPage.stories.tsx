import { useState, useEffect, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import DashboardPage from './DashboardPage';
import ObservabilityContext, {
  type ClusterDashboard,
  type ObservabilityValue,
  type RecentEvent,
} from './context/ObservabilityContext';
import { IdentityProvider } from '../../contexts/IdentityContext';

// ---------------------------------------------------------------------------
// The page reads two independent sources:
//   1. ObservabilityContext — mocked here with a canned value (same pattern as
//      UserPicker.stories.tsx), so no polling provider is mounted.
//   2. usePipelineMetrics — a bare `fetch` against /api/pipelines/metrics with
//      no injectable seam, so the KPI row is driven by a story-only mock
//      backend below. Without it the hook falls back to all-null metrics,
//      which is itself a state worth showing (see `MetricsUnavailable`).
// ---------------------------------------------------------------------------

const IDENTITY = {
  userId: 'u-ops',
  displayName: 'Ops Operator',
  userEmail: 'ops@example.com',
  idToken: 'story-token',
  onSignOut: () => {},
};

/** Story-only mock backend: swaps `globalThis.fetch` and restores on unmount. */
function MockMetricsBackend({
  body,
  children,
}: {
  body: Record<string, unknown>;
  children: ReactNode;
}) {
  const [restore] = useState(() => {
    const original = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })) as typeof fetch;
    return () => {
      globalThis.fetch = original;
    };
  });
  useEffect(() => restore, [restore]);
  return <>{children}</>;
}

const healthyCluster: ClusterDashboard = {
  overview: {
    totalNodes: 4,
    healthyNodes: 4,
    totalResources: 128,
    totalConnections: 412,
    messagesPerSecond: 940,
    averageLatency: 38,
    clusterHealth: 'healthy',
  },
  regions: {
    'us-east-1': { nodes: 3, resources: 96, connections: 310, health: 1, latency: 31 },
    'eu-west-1': { nodes: 1, resources: 32, connections: 102, health: 1, latency: 58 },
  },
  hotspots: { highTrafficResources: [], overloadedNodes: [] },
  trends: { connectionGrowth: 4, messageVolumeGrowth: 11, nodeHealthTrend: 'stable' },
  alerts: [],
};

const degradedCluster: ClusterDashboard = {
  ...healthyCluster,
  overview: { ...healthyCluster.overview, healthyNodes: 2, clusterHealth: 'critical' },
  hotspots: {
    highTrafficResources: [
      { resourceId: 'room:general', connections: 210, messageRate: 480, node: 'node-1' },
    ],
    overloadedNodes: [
      { nodeId: 'node-1', cpuUsage: 91, memoryUsage: 78, resourceCount: 64 },
    ],
  },
  trends: { connectionGrowth: -18, messageVolumeGrowth: -6, nodeHealthTrend: 'degrading' },
  alerts: [
    {
      severity: 'critical',
      message: 'node-2 unreachable — 9 resources orphaned',
      timestamp: Date.now() - 2 * 60_000,
      category: 'health',
    },
    {
      severity: 'warning',
      message: 'Connection pool at 82% capacity',
      timestamp: Date.now() - 40 * 60_000,
      category: 'capacity',
    },
  ],
};

const recentEvents: RecentEvent[] = [
  { id: 'r1', timestamp: '10:48:21', type: 'pipeline.run.failed', summary: 'pipeline.run.failed · run-8801', severity: 'error' },
  { id: 'r2', timestamp: '10:48:02', type: 'pipeline.run.completed', summary: 'pipeline.run.completed · run-8812', severity: 'success' },
  { id: 'r3', timestamp: '10:47:31', type: 'pipeline.run.started', summary: 'pipeline.run.started · run-8813', severity: 'info' },
];

function observability(overrides: Partial<ObservabilityValue>): ObservabilityValue {
  return {
    dashboard: healthyCluster,
    loading: false,
    error: null,
    lastUpdatedAt: new Date().toISOString(),
    live: true,
    setLive: () => {},
    refreshDashboard: async () => {},
    recentEvents: [],
    activeRunsCount: 0,
    isLiveData: true,
    ...overrides,
  };
}

const BRIDGE_METRICS = {
  source: 'bridge',
  runsStarted: 1284,
  runsCompleted: 1240,
  runsFailed: 13,
  runsActive: 7,
  runsAwaitingApproval: 2,
  avgDurationMs: 4120,
  llmTokensIn: 921_400,
  llmTokensOut: 288_100,
  estimatedCostUsd: 18.42,
  avgFirstTokenLatencyMs: 412,
  asOf: new Date().toISOString(),
};

function Frame({
  value,
  metrics,
  children,
}: {
  value: ObservabilityValue;
  metrics: Record<string, unknown> | null;
  children: ReactNode;
}) {
  const page = (
    <MemoryRouter initialEntries={['/observability']}>
      <IdentityProvider value={IDENTITY}>
        <ObservabilityContext.Provider value={value}>
          {children}
        </ObservabilityContext.Provider>
      </IdentityProvider>
    </MemoryRouter>
  );
  return metrics ? (
    <MockMetricsBackend body={metrics}>{page}</MockMetricsBackend>
  ) : (
    page
  );
}

const meta = {
  title: 'Observability/Pages/DashboardPage',
  component: DashboardPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Everything green, bridge reporting every KPI, no alerts. */
export const HealthyCluster: Story = {
  render: () => (
    <Frame value={observability({ recentEvents })} metrics={BRIDGE_METRICS}>
      <DashboardPage />
    </Frame>
  ),
};

/** Two nodes down: critical + warning alerts, degrading trend. */
export const DegradedCluster: Story = {
  render: () => (
    <Frame
      value={observability({
        dashboard: degradedCluster,
        recentEvents,
        activeRunsCount: 3,
      })}
      metrics={{ ...BRIDGE_METRICS, runsFailed: 41, runsActive: 3 }}
    >
      <DashboardPage />
    </Frame>
  ),
};

/**
 * No bridge wired: the backend answers `source: 'stub'`, so the header shows
 * the amber "demo data" pill next to synthesized numbers.
 */
export const StubMetrics: Story = {
  render: () => (
    <Frame
      value={observability({ recentEvents })}
      metrics={{ ...BRIDGE_METRICS, source: 'stub' }}
    >
      <DashboardPage />
    </Frame>
  ),
};

/**
 * No mock backend at all — the real failure path. Every KPI collapses to an
 * em-dash rather than a misleading zero, and the source pill turns red.
 */
export const MetricsUnavailable: Story = {
  render: () => (
    <Frame
      value={observability({ isLiveData: false, error: 'Failed to load dashboard' })}
      metrics={null}
    >
      <DashboardPage />
    </Frame>
  ),
};

/** Provider mounted but the first poll hasn't resolved. */
export const NoDashboardYet: Story = {
  render: () => (
    <Frame
      value={observability({ dashboard: null, loading: true, isLiveData: false })}
      metrics={BRIDGE_METRICS}
    >
      <DashboardPage />
    </Frame>
  ),
};
