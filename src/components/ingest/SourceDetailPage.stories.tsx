import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router';
import SourceDetailPage from './SourceDetailPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import { STORAGE_KEY } from '../../hooks/useDocumentTypes';
import type { IngestSource } from '../../types/ingest';

// ---------------------------------------------------------------------------
// The page reads its id from the router, then hits three endpoints through
// bare `fetch` (source detail, pipeline defs, per-source SLO metrics) and
// localStorage for document types. All four are mocked story-only below and
// restored on unmount; the page itself is untouched.
// ---------------------------------------------------------------------------

type ApiMode = 'ok' | 'error' | 'pending';

const now = new Date().toISOString();

const DOC_TYPES = [
  { id: 'dt-contract', name: 'Contract', description: 'Signed agreements', icon: '📄', fields: [], createdAt: now, updatedAt: now },
  { id: 'dt-invoice', name: 'Vendor Invoice', description: 'Inbound invoices', icon: '🧾', fields: [], createdAt: now, updatedAt: now },
];

function MockEnv({
  routes,
  mode = 'ok',
  children,
}: {
  routes?: Record<string, unknown>;
  mode?: ApiMode;
  children: ReactNode;
}) {
  const [restore] = useState(() => {
    const originalFetch = globalThis.fetch;
    const previousTypes = localStorage.getItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DOC_TYPES));
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      if (mode === 'pending') return new Promise<Response>(() => {});
      if (mode === 'error') return new Response('{}', { status: 503 });
      const url =
        typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      const hit = Object.keys(routes ?? {}).find((key) => url.includes(key));
      return new Response(JSON.stringify(hit ? routes![hit] : {}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }) as typeof fetch;
    return () => {
      globalThis.fetch = originalFetch;
      if (previousTypes === null) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, previousTypes);
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

const source: IngestSource = {
  sourceId: 'src-drive',
  name: 'Contracts (Google Drive)',
  type: 'google-drive',
  config: { folderId: '1AbCdEfGh', includeShared: true },
  syncSchedule: '0 */6 * * *',
  mappingRules: [
    { pattern: '**/*.pdf', documentTypeId: 'dt-contract', pipelineId: 'pl-contract', priority: 100 },
    { pattern: 'invoices/**', documentTypeId: 'dt-invoice', priority: 50 },
  ],
  defaultPipelineId: 'pl-contract',
  pipelineByDocType: { 'dt-invoice': 'pl-invoice' },
  status: 'active',
  lastSyncAt: now,
  lastSyncStats: {
    filesFound: 412, filesNew: 12, filesUpdated: 3, filesSkipped: 397,
    errors: 0, durationMs: 18_400,
  },
  createdAt: now,
  updatedAt: now,
};

const pipelines = {
  pipelines: [
    { id: 'pl-contract', name: 'Contract extraction', status: 'active' },
    { id: 'pl-invoice', name: 'Invoice extraction', status: 'active' },
  ],
};

const sloMetrics = {
  sourceId: 'src-drive',
  window: '1h',
  bucketSizeMs: 60_000,
  latencyP95: Array.from({ length: 60 }, (_, i) => ({
    at: new Date(Date.now() - (60 - i) * 60_000).toISOString(),
    value: 380 + Math.round(Math.sin(i / 6) * 60),
  })),
  errorRate: Array.from({ length: 60 }, (_, i) => ({
    at: new Date(Date.now() - (60 - i) * 60_000).toISOString(),
    value: 0,
  })),
  queueDepth: Array.from({ length: 60 }, (_, i) => ({
    at: new Date(Date.now() - (60 - i) * 60_000).toISOString(),
    value: Math.max(0, 4 + Math.round(Math.sin(i / 4) * 3)),
  })),
};

function Frame({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/ingest/sources/src-drive']}>
      <IdentityProvider value={IDENTITY}>
        <Routes>
          <Route path="/ingest/sources/:id" element={children} />
        </Routes>
      </IdentityProvider>
    </MemoryRouter>
  );
}

// Deeper URLs first — `/api/ingest/sources/src-drive/metrics` also contains
// `/api/ingest/sources/`, and the matcher takes the first key that matches.
function routesFor(detail: unknown) {
  return {
    '/metrics': sloMetrics,
    '/api/pipelines/defs': pipelines,
    '/api/ingest/sources/': detail,
  };
}

const meta = {
  title: 'Ingest/SourceDetailPage',
  component: SourceDetailPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SourceDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Healthy Drive source with two mapping rules and a per-DocType override. */
export const Loaded: Story = {
  render: () => (
    <MockEnv routes={routesFor(source)}>
      <Frame>
        <SourceDetailPage />
      </Frame>
    </MockEnv>
  ),
};

/** Freshly created: no schedule, no rules, never synced. */
export const NeverSynced: Story = {
  render: () => (
    <MockEnv
      routes={routesFor({
        ...source,
        name: 'New S3 bucket',
        type: 's3',
        syncSchedule: null,
        mappingRules: [],
        pipelineByDocType: {},
        defaultPipelineId: null,
        lastSyncAt: null,
        lastSyncStats: null,
      })}
    >
      <Frame>
        <SourceDetailPage />
      </Frame>
    </MockEnv>
  ),
};

/** Source in the error state after a run with per-file failures. */
export const ErrorStatus: Story = {
  render: () => (
    <MockEnv
      routes={routesFor({
        ...source,
        status: 'error',
        lastSyncStats: { ...source.lastSyncStats, errors: 14, filesNew: 0 },
      })}
    >
      <Frame>
        <SourceDetailPage />
      </Frame>
    </MockEnv>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockEnv mode="pending">
      <Frame>
        <SourceDetailPage />
      </Frame>
    </MockEnv>
  ),
};

/** The source id in the URL doesn't exist. */
export const NotFound: Story = {
  render: () => (
    <MockEnv mode="error">
      <Frame>
        <SourceDetailPage />
      </Frame>
    </MockEnv>
  ),
};
