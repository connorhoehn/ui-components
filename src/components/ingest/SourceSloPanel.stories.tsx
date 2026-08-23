import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SourceSloPanel from './SourceSloPanel';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { SloPoint, SourceSloMetrics } from '../../hooks/useSourceSloMetrics';

// `useSourceSloMetrics` polls `/api/ingest/sources/:id/metrics` directly, so
// these stories install a story-only mock backend (restored on unmount).
type ApiMode = 'ok' | 'error' | 'pending';

function MockApi({
  mode = 'ok',
  body,
  children,
}: {
  mode?: ApiMode;
  body?: unknown;
  children: ReactNode;
}) {
  const [restore] = useState(() => {
    const original = globalThis.fetch;
    globalThis.fetch = (async () => {
      if (mode === 'pending') return new Promise<Response>(() => {});
      if (mode === 'error') return new Response('{}', { status: 503 });
      return new Response(JSON.stringify(body ?? {}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;
    return () => {
      globalThis.fetch = original;
    };
  });
  useEffect(() => restore, [restore]);
  return <>{children}</>;
}

const IDENTITY = {
  userId: 'u-ops',
  displayName: 'Ops Operator',
  userEmail: 'ops@example.com',
  idToken: 'story-token',
  onSignOut: () => {},
};

const BUCKET_MS = 60_000;

function points(count: number, shape: (i: number) => number | null): SloPoint[] {
  const start = Date.now() - count * BUCKET_MS;
  return Array.from({ length: count }, (_, i) => ({
    at: new Date(start + i * BUCKET_MS).toISOString(),
    value: shape(i),
  }));
}

const healthy: SourceSloMetrics = {
  sourceId: 'src-drive',
  window: '1h',
  bucketSizeMs: BUCKET_MS,
  latencyP95: points(60, (i) => 380 + Math.round(Math.sin(i / 6) * 60)),
  errorRate: points(60, () => 0),
  queueDepth: points(60, (i) => Math.max(0, 4 + Math.round(Math.sin(i / 4) * 3))),
};

const degraded: SourceSloMetrics = {
  ...healthy,
  latencyP95: points(60, (i) => (i < 40 ? 400 : 400 + (i - 40) * 220)),
  errorRate: points(60, (i) => (i < 45 ? 0 : Math.min(0.4, (i - 45) * 0.03))),
  queueDepth: points(60, (i) => (i < 45 ? 5 : 5 + (i - 45) * 18)),
};

/** Buckets with no traffic report `null`, which must render as a gap. */
const sparse: SourceSloMetrics = {
  ...healthy,
  latencyP95: points(60, (i) => (i % 5 === 0 ? 410 : null)),
  errorRate: points(60, (i) => (i % 5 === 0 ? 0 : null)),
  queueDepth: points(60, (i) => (i % 5 === 0 ? 2 : null)),
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <IdentityProvider value={IDENTITY}>
      <div className="w-[760px]">{children}</div>
    </IdentityProvider>
  );
}

const meta = {
  title: 'Ingest/SourceSloPanel',
  component: SourceSloPanel,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { sourceId: 'src-drive' },
} satisfies Meta<typeof SourceSloPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Steady state: flat p95, zero errors, shallow queue. */
export const Healthy: Story = {
  render: () => (
    <MockApi body={healthy}>
      <Frame>
        <SourceSloPanel sourceId="src-drive" />
      </Frame>
    </MockApi>
  ),
};

/** Latency climbing, errors appearing, queue backing up. */
export const Degrading: Story = {
  render: () => (
    <MockApi body={degraded}>
      <Frame>
        <SourceSloPanel sourceId="src-drive" />
      </Frame>
    </MockApi>
  ),
};

/** Mostly-idle source — null buckets are gaps, not zeroes. */
export const SparseData: Story = {
  render: () => (
    <MockApi body={sparse}>
      <Frame>
        <SourceSloPanel sourceId="src-drive" />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <SourceSloPanel sourceId="src-drive" />
      </Frame>
    </MockApi>
  ),
};

export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <SourceSloPanel sourceId="src-drive" />
      </Frame>
    </MockApi>
  ),
};
