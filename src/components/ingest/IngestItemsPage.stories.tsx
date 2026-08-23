import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IngestItemsPage from './IngestItemsPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import { WebSocketProvider } from '../../contexts/WebSocketContext';
import type { IngestItem, IngestSource } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Story-only mock backend for the two `fetch` hooks behind this page
// (`/api/ingest/items`, `/api/ingest/sources`). The drawer this page opens
// also subscribes to the gateway, so an inert WebSocket context value is
// provided — it never receives a message, which is exactly the "no live sync"
// state.
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

const SOCKET = {
  connectionState: 'connected' as const,
  sendMessage: () => {},
  onMessage: () => () => {},
  clientId: 'story-client',
  sessionToken: 'story-session',
  ws: {
    connectionState: 'connected' as const,
    lastError: null,
    sessionToken: 'story-session',
    clientId: 'story-client',
    currentChannel: 'ingest:progress',
    switchChannel: () => {},
    sendMessage: () => {},
    disconnect: () => {},
    reconnect: () => {},
  },
};

const now = new Date().toISOString();

const sources: IngestSource[] = [
  {
    sourceId: 'src-drive', name: 'Contracts (Google Drive)', type: 'google-drive',
    config: {}, syncSchedule: null, mappingRules: [], defaultPipelineId: null,
    status: 'active', lastSyncAt: now, lastSyncStats: null, createdAt: now, updatedAt: now,
  },
  {
    sourceId: 'src-s3', name: 'Invoice drop bucket', type: 's3',
    config: {}, syncSchedule: null, mappingRules: [], defaultPipelineId: null,
    status: 'error', lastSyncAt: now, lastSyncStats: null, createdAt: now, updatedAt: now,
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
  item({ itemId: 'it-2', sourcePath: 'contracts/globex-msa.pdf', status: 'materializing', mappingMethod: 'llm-match', mappingConfidence: 0.71, documentId: null }),
  item({ itemId: 'it-3', sourcePath: 'contracts/unknown-form.pdf', status: 'mapping', mappingMethod: 'llm-generate', mappingConfidence: 0.34, documentTypeId: null, documentId: null }),
  item({ itemId: 'it-4', sourceId: 'src-s3', sourcePath: 'inbound/inv-9921.pdf', status: 'failed', error: 'HTTP 502 from materializer', attempts: 3, documentTypeId: null, documentId: null, mappingMethod: null, mappingConfidence: null }),
  item({ itemId: 'it-5', sourceId: 'src-s3', sourcePath: 'inbound/inv-9922.pdf', status: 'queued', documentTypeId: null, documentId: null, mappingMethod: null, mappingConfidence: null, pipelineRunId: null }),
];

function Frame({ children }: { children: ReactNode }) {
  return (
    <IdentityProvider value={IDENTITY}>
      <WebSocketProvider value={SOCKET}>{children}</WebSocketProvider>
    </IdentityProvider>
  );
}

const meta = {
  title: 'Ingest/IngestItemsPage',
  component: IngestItemsPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof IngestItemsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** One row per item status; click a row to open the detail drawer. */
export const Loaded: Story = {
  render: () => (
    <MockApi routes={{ '/api/ingest/items': { items }, '/api/ingest/sources': { sources } }}>
      <Frame>
        <IngestItemsPage />
      </Frame>
    </MockApi>
  ),
};

/** Only failures — the triage view an operator lands on from an alert. */
export const AllFailed: Story = {
  render: () => (
    <MockApi
      routes={{
        '/api/ingest/items': {
          items: items.map((i, n) => ({
            ...i,
            status: 'failed',
            error: `attempt ${n + 1} failed: upstream timeout`,
          })),
        },
        '/api/ingest/sources': { sources },
      }}
    >
      <Frame>
        <IngestItemsPage />
      </Frame>
    </MockApi>
  ),
};

/** Sources exist, no items have arrived. */
export const Empty: Story = {
  render: () => (
    <MockApi routes={{ '/api/ingest/items': { items: [] }, '/api/ingest/sources': { sources } }}>
      <Frame>
        <IngestItemsPage />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <IngestItemsPage />
      </Frame>
    </MockApi>
  ),
};
