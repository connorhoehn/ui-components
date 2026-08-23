import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import IngestDashboard from './IngestDashboard';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { IngestItem, IngestSource } from '../../types/ingest';

// ---------------------------------------------------------------------------
// The dashboard pulls `/api/ingest/sources` and `/api/ingest/items` through
// bare `fetch` hooks with no injectable seam, so these stories install a
// story-only mock backend keyed by URL fragment. Everything else — filtering,
// counts, navigation — is the real component.
// ---------------------------------------------------------------------------

type ApiMode = 'ok' | 'error' | 'pending';

function MockApi({
  routes,
  mode = 'ok',
  children,
}: {
  routes?: Record<string, unknown>;
  mode?: ApiMode;
  children: ReactNode;
}) {
  const [restore] = useState(() => {
    const original = globalThis.fetch;
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

const now = new Date().toISOString();

const sources: IngestSource[] = [
  {
    sourceId: 'src-drive', name: 'Contracts (Google Drive)', type: 'google-drive',
    config: {}, syncSchedule: '0 */6 * * *', mappingRules: [],
    defaultPipelineId: 'pl-contract', status: 'active', lastSyncAt: now,
    lastSyncStats: { filesFound: 412, filesNew: 12, filesUpdated: 3, filesSkipped: 397, errors: 0, durationMs: 18_400 },
    createdAt: now, updatedAt: now,
  },
  {
    sourceId: 'src-s3', name: 'Invoice drop bucket', type: 's3',
    config: {}, syncSchedule: '*/15 * * * *', mappingRules: [],
    defaultPipelineId: 'pl-invoice', status: 'error', lastSyncAt: now,
    lastSyncStats: { filesFound: 88, filesNew: 0, filesUpdated: 0, filesSkipped: 74, errors: 14, durationMs: 9_100 },
    createdAt: now, updatedAt: now,
  },
];

function item(over: Partial<IngestItem> & { itemId: string }): IngestItem {
  return {
    sourceId: 'src-drive',
    sourcePath: 'contracts/acme-2026.pdf',
    status: 'done',
    documentTypeId: 'dt-contract',
    documentId: 'doc-1',
    pipelineRunId: 'run-8812',
    mappingMethod: 'rule',
    mappingConfidence: 0.98,
    attempts: 1,
    error: null,
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

const items: IngestItem[] = [
  item({ itemId: 'it-1' }),
  item({ itemId: 'it-2', status: 'mapping', mappingMethod: 'llm-match', mappingConfidence: 0.62, documentId: null }),
  item({
    itemId: 'it-3', sourceId: 'src-s3', sourcePath: 'inbound/inv-9921.pdf',
    status: 'failed', error: 'HTTP 502 from materializer', attempts: 3,
    documentTypeId: null, documentId: null, mappingMethod: null, mappingConfidence: null,
  }),
  item({ itemId: 'it-4', sourceId: 'src-s3', sourcePath: 'inbound/inv-9922.pdf', status: 'queued', documentTypeId: null, documentId: null, mappingMethod: null, mappingConfidence: null }),
];

function Frame({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/ingest']}>
      <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>
    </MemoryRouter>
  );
}

const meta = {
  title: 'Ingest/IngestDashboard',
  component: IngestDashboard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof IngestDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Two sources, four items — one of each interesting item status. */
export const Loaded: Story = {
  render: () => (
    <MockApi routes={{ '/api/ingest/sources': { sources }, '/api/ingest/items': { items } }}>
      <Frame>
        <IngestDashboard />
      </Frame>
    </MockApi>
  ),
};

/** Nothing configured yet — the first-run state. */
export const Empty: Story = {
  render: () => (
    <MockApi routes={{ '/api/ingest/sources': { sources: [] }, '/api/ingest/items': { items: [] } }}>
      <Frame>
        <IngestDashboard />
      </Frame>
    </MockApi>
  ),
};

/** Sources configured but nothing has been ingested through them yet. */
export const SourcesButNoItems: Story = {
  render: () => (
    <MockApi routes={{ '/api/ingest/sources': { sources }, '/api/ingest/items': { items: [] } }}>
      <Frame>
        <IngestDashboard />
      </Frame>
    </MockApi>
  ),
};

/** Both requests in flight — skeleton cards. */
export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <IngestDashboard />
      </Frame>
    </MockApi>
  ),
};

/** Backend unreachable. */
export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <IngestDashboard />
      </Frame>
    </MockApi>
  ),
};
