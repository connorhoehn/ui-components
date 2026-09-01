import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import ConflictsPage from './ConflictsPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { IngestSource, SyncConflict } from '../../types/ingest';

// `useSyncConflicts` + `useIngestSources` both call `fetch` directly, so these
// stories install a story-only mock backend keyed by URL fragment and restore
// `globalThis.fetch` on unmount.
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
const earlier = new Date(Date.now() - 42 * 60_000).toISOString();

const sources: IngestSource[] = [
  {
    sourceId: 'src-drive', name: 'Contracts (Google Drive)', type: 'google-drive',
    config: {}, syncSchedule: null, mappingRules: [], defaultPipelineId: null,
    status: 'active', lastSyncAt: now, lastSyncStats: null, createdAt: now, updatedAt: now,
  },
];

const conflicts: SyncConflict[] = [
  {
    conflictId: 'cf-1',
    sourceId: 'src-drive',
    documentId: 'doc-441',
    // The document's NAME. Without it the page could only show `doc-441`, and
    // the reviewer had to read a diff cell to learn which document they were
    // being asked to change.
    documentTitle: 'Acme MSA',
    documentTypeId: 'dt-contract',
    sourceRef: 'drive:1AbCdEfGh',
    summary: 'title and body changed remotely while an editor had the doc open',
    fields: [
      {
        field: 'title',
        // Drive revisions carry an editor, so this change is attributable.
        changedBy: 'Dana Whitfield',
        path: ['Header'],
        sourceValue: 'Acme MSA (2026, signed)',
        platformValue: 'Acme MSA 2026',
        mergedValue: 'Acme MSA (2026, signed)',
      },
      {
        field: 'body.summary',
        changedBy: 'Dana Whitfield',
        path: ['Body', 'Summary'],
        sourceValue: 'Signed 2026-08-02 by both parties.',
        platformValue: 'Awaiting counter-signature.',
      },
    ],
    status: 'pending',
    platformUpdatedAt: earlier,
    sourceUpdatedAt: now,
    detectedAt: now,
  },
  {
    conflictId: 'cf-2',
    sourceId: 'src-drive',
    documentId: 'doc-512',
    documentTitle: 'Acme Invoice #4471',
    documentTypeId: 'dt-invoice',
    sourceRef: 'drive:9ZyXwVu',
    summary: 'total amount differs',
    fields: [{
      // Deliberately NO `changedBy` — plenty of connectors cannot name an
      // editor, and the card must say "Unattributed" rather than credit the
      // source system as if it were a person.
      field: 'totalAmount',
      path: ['Summary'],
      sourceValue: 18_400,
      platformValue: 18_040,
    }],
    status: 'pending',
    platformUpdatedAt: earlier,
    sourceUpdatedAt: now,
    detectedAt: now,
  },
  {
    conflictId: 'cf-3',
    sourceId: 'src-drive',
    documentId: 'doc-118',
    documentTitle: 'Support Addendum',
    documentTypeId: 'dt-contract',
    sourceRef: 'drive:5QrStUv',
    summary: 'owner reassigned remotely',
    fields: [{ field: 'owner', sourceValue: 'legal@example.com', platformValue: 'ops@example.com' }],
    status: 'resolved',
    platformUpdatedAt: earlier,
    sourceUpdatedAt: earlier,
    detectedAt: earlier,
    resolvedAt: now,
  },
];

function Frame({ children }: { children: ReactNode }) {
  return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
}

const meta = {
  title: 'Ingest/ConflictsPage',
  component: ConflictsPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ConflictsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Two pending conflicts (one with an auto-merge proposal) plus one resolved. */
export const Loaded: Story = {
  render: () => (
    <MockApi routes={{ '/api/sync/conflicts': { conflicts }, '/api/ingest/sources': { sources } }}>
      <Frame>
        <ConflictsPage />
      </Frame>
    </MockApi>
  ),
};

/** The same queue under the dark palette — token pairs must hold in both. */
export const LoadedDark: Story = {
  render: () => (
    <MockApi routes={{ '/api/sync/conflicts': { conflicts }, '/api/ingest/sources': { sources } }}>
      <Frame>
        <div data-theme="dark" className="min-h-screen bg-surface-panel">
          <ConflictsPage />
        </div>
      </Frame>
    </MockApi>
  ),
};

/** A single multi-field conflict — the field-by-field pick UI. */
export const SingleConflict: Story = {
  render: () => (
    <MockApi
      routes={{ '/api/sync/conflicts': { conflicts: [conflicts[0]] }, '/api/ingest/sources': { sources } }}
    >
      <Frame>
        <ConflictsPage />
      </Frame>
    </MockApi>
  ),
};

/** Write-back is clean — the queue is empty. */
export const Empty: Story = {
  render: () => (
    <MockApi routes={{ '/api/sync/conflicts': { conflicts: [] }, '/api/ingest/sources': { sources } }}>
      <Frame>
        <ConflictsPage />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <ConflictsPage />
      </Frame>
    </MockApi>
  ),
};

export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <ConflictsPage />
      </Frame>
    </MockApi>
  ),
};
