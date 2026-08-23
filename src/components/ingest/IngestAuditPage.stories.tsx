import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IngestAuditPage from './IngestAuditPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { IngestAuditEntry } from '../../hooks/useIngestAudit';

// `useIngestAudit` fetches `/api/ingest/audit` directly; these stories install
// a story-only mock backend and restore `fetch` on unmount.
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

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();

const entries: IngestAuditEntry[] = [
  {
    auditId: 'au-1',
    createdAt: ago(3),
    actor: 'ops@example.com',
    eventType: 'mapping.decided',
    targetType: 'item',
    targetId: 'it-9921',
    summary: 'Accepted LLM mapping to Vendor Invoice (confidence 0.71)',
    detail: { method: 'llm-match', confidence: 0.71, documentTypeId: 'dt-invoice' },
  },
  {
    auditId: 'au-2',
    createdAt: ago(28),
    actor: 'system',
    eventType: 'writeback.failed',
    targetType: 'document',
    targetId: 'doc-441',
    summary: 'Write-back to Drive rejected — file locked by another editor',
    detail: { sourceRef: 'drive:1AbCdEfGh', httpStatus: 423 },
  },
  {
    auditId: 'au-3',
    createdAt: ago(94),
    actor: 'admin@example.com',
    eventType: 'source.paused',
    targetType: 'source',
    targetId: 'src-s3',
    summary: 'Paused after 14 consecutive object fetch errors',
    detail: { errors: 14 },
  },
  {
    auditId: 'au-4',
    createdAt: ago(320),
    actor: 'admin@example.com',
    eventType: 'source.created',
    targetType: 'source',
    targetId: 'src-drive',
    summary: 'Created source "Contracts (Google Drive)"',
    detail: { type: 'google-drive' },
  },
];

function Frame({ children }: { children: ReactNode }) {
  return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
}

const meta = {
  title: 'Ingest/IngestAuditPage',
  component: IngestAuditPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof IngestAuditPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Four entries spanning every target type; filters are client-side. */
export const Loaded: Story = {
  render: () => (
    <MockApi body={{ entries }}>
      <Frame>
        <IngestAuditPage />
      </Frame>
    </MockApi>
  ),
};

/** Only failures — what you filter to after an alert. */
export const FailuresOnly: Story = {
  render: () => (
    <MockApi body={{ entries: entries.filter((e) => e.eventType === 'writeback.failed') }}>
      <Frame>
        <IngestAuditPage />
      </Frame>
    </MockApi>
  ),
};

/** Nothing recorded in the selected window. */
export const Empty: Story = {
  render: () => (
    <MockApi body={{ entries: [] }}>
      <Frame>
        <IngestAuditPage />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <IngestAuditPage />
      </Frame>
    </MockApi>
  ),
};

export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <IngestAuditPage />
      </Frame>
    </MockApi>
  ),
};
