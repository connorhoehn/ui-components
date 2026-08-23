import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import MappingReviewPage from './MappingReviewPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import { STORAGE_KEY } from '../../hooks/useDocumentTypes';
import type { IngestItem } from '../../types/ingest';

// ---------------------------------------------------------------------------
// Two mocked sources, both story-only:
//   * `/api/ingest/mapping/review` — `useMappingReviewQueue` calls `fetch`
//     directly, so `globalThis.fetch` is swapped during render and restored on
//     unmount.
//   * document types — `useDocumentTypes` reads localStorage, so the remap
//     dropdown is seeded there and the previous value put back afterwards.
// ---------------------------------------------------------------------------

type ApiMode = 'ok' | 'error' | 'pending';

const now = new Date().toISOString();

const DOC_TYPES = [
  { id: 'dt-contract', name: 'Contract', description: 'Signed agreements', icon: '📄', fields: [], createdAt: now, updatedAt: now },
  { id: 'dt-invoice', name: 'Vendor Invoice', description: 'Inbound invoices', icon: '🧾', fields: [], createdAt: now, updatedAt: now },
  { id: 'dt-report', name: 'Report', description: 'Analyst reports', icon: '📊', fields: [], createdAt: now, updatedAt: now },
];

function MockEnv({
  mode = 'ok',
  body,
  children,
}: {
  mode?: ApiMode;
  body?: unknown;
  children: ReactNode;
}) {
  const [restore] = useState(() => {
    const originalFetch = globalThis.fetch;
    const previousTypes = localStorage.getItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DOC_TYPES));
    globalThis.fetch = (async () => {
      if (mode === 'pending') return new Promise<Response>(() => {});
      if (mode === 'error') return new Response('{}', { status: 503 });
      return new Response(JSON.stringify(body ?? {}), {
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

function item(over: Partial<IngestItem> & { itemId: string }): IngestItem {
  return {
    sourceId: 'src-drive',
    sourcePath: 'contracts/unknown-form.pdf',
    status: 'mapping',
    documentTypeId: 'dt-contract',
    documentId: null,
    pipelineRunId: null,
    mappingMethod: 'llm-match',
    mappingConfidence: 0.58,
    attempts: 1,
    error: null,
    createdAt: now,
    updatedAt: now,
    ...over,
  };
}

const items: IngestItem[] = [
  item({ itemId: 'it-1', sourcePath: 'contracts/globex-msa-draft.pdf', mappingConfidence: 0.64 }),
  item({ itemId: 'it-2', sourcePath: 'inbound/inv-9931.pdf', sourceId: 'src-s3', documentTypeId: 'dt-invoice', mappingConfidence: 0.51 }),
  item({ itemId: 'it-3', sourcePath: 'reports/q3-analysis.docx', documentTypeId: 'dt-report', mappingMethod: 'llm-generate', mappingConfidence: 0.33 }),
  item({ itemId: 'it-4', sourcePath: 'misc/scan-0044.tiff', documentTypeId: null, mappingMethod: 'llm-generate', mappingConfidence: 0.12 }),
];

function Frame({ children }: { children: ReactNode }) {
  return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
}

const meta = {
  title: 'Ingest/MappingReviewPage',
  component: MappingReviewPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MappingReviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Four low-confidence mappings under the 0.7 threshold, worst last. */
export const Loaded: Story = {
  render: () => (
    <MockEnv body={{ items, threshold: 0.7 }}>
      <Frame>
        <MappingReviewPage />
      </Frame>
    </MockEnv>
  ),
};

/** A stricter threshold pulls more items into review. */
export const HighThreshold: Story = {
  render: () => (
    <MockEnv body={{ items, threshold: 0.95 }}>
      <Frame>
        <MappingReviewPage />
      </Frame>
    </MockEnv>
  ),
};

/** One item, no type guess at all — the operator must pick. */
export const UnmappedOnly: Story = {
  render: () => (
    <MockEnv body={{ items: [items[3]], threshold: 0.7 }}>
      <Frame>
        <MappingReviewPage />
      </Frame>
    </MockEnv>
  ),
};

/** Mapper is confident about everything — queue drained. */
export const Empty: Story = {
  render: () => (
    <MockEnv body={{ items: [], threshold: 0.7 }}>
      <Frame>
        <MappingReviewPage />
      </Frame>
    </MockEnv>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockEnv mode="pending">
      <Frame>
        <MappingReviewPage />
      </Frame>
    </MockEnv>
  ),
};
