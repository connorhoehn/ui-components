import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import SourcesPage from './SourcesPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { IngestSource } from '../../types/ingest';

// ---------------------------------------------------------------------------
// `useIngestSources` calls `fetch` directly with no injectable seam, so these
// stories install a story-only mock backend: `globalThis.fetch` is swapped
// during render and restored on unmount. Nothing else about the page is faked.
// ---------------------------------------------------------------------------

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

const now = new Date().toISOString();

const sources: IngestSource[] = [
  {
    sourceId: 'src-drive',
    name: 'Contracts (Google Drive)',
    type: 'google-drive',
    config: { folderId: '1AbCdEf' },
    syncSchedule: '0 */6 * * *',
    mappingRules: [{ pattern: '**/*.pdf', documentTypeId: 'dt-contract', priority: 10 }],
    defaultPipelineId: 'pl-contract',
    status: 'active',
    lastSyncAt: now,
    lastSyncStats: {
      filesFound: 412, filesNew: 12, filesUpdated: 3, filesSkipped: 397,
      errors: 0, durationMs: 18_400,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    sourceId: 'src-s3',
    name: 'Invoice drop bucket',
    type: 's3',
    config: { bucket: 'acme-invoices', prefix: 'inbound/' },
    syncSchedule: '*/15 * * * *',
    mappingRules: [],
    defaultPipelineId: 'pl-invoice',
    status: 'error',
    lastSyncAt: now,
    lastSyncStats: {
      filesFound: 88, filesNew: 0, filesUpdated: 0, filesSkipped: 74,
      errors: 14, durationMs: 9_100,
    },
    createdAt: now,
    updatedAt: now,
  },
  {
    sourceId: 'src-local',
    name: 'Local scratch folder',
    type: 'local',
    config: { path: '/var/ingest/scratch' },
    syncSchedule: null,
    mappingRules: [],
    defaultPipelineId: null,
    status: 'paused',
    lastSyncAt: null,
    lastSyncStats: null,
    createdAt: now,
    updatedAt: now,
  },
];

function Frame({ children }: { children: ReactNode }) {
  return (
    <MemoryRouter initialEntries={['/ingest/sources']}>
      <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>
    </MemoryRouter>
  );
}

const meta = {
  title: 'Ingest/SourcesPage',
  component: SourcesPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SourcesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three sources, one per status: active, error, paused. */
export const Loaded: Story = {
  render: () => (
    <MockApi body={{ sources }}>
      <Frame>
        <SourcesPage />
      </Frame>
    </MockApi>
  ),
};

/** First run — the empty state carries the "add a source" call to action. */
export const NoSources: Story = {
  render: () => (
    <MockApi body={{ sources: [] }}>
      <Frame>
        <SourcesPage />
      </Frame>
    </MockApi>
  ),
};

/** Skeletons while the first request is in flight. */
export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <SourcesPage />
      </Frame>
    </MockApi>
  ),
};

/** Backend down: the page surfaces the HTTP status rather than an empty list. */
export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <SourcesPage />
      </Frame>
    </MockApi>
  ),
};
