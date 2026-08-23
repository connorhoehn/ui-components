import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DeadLetterQueuePage from './DeadLetterQueuePage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { DLQEntryRow } from '../../hooks/useIngestDLQ';

// `useIngestDLQ` fetches `/api/ingest/dlq` directly, so these stories install a
// story-only mock backend (swapped on render, restored on unmount).
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

const entries: DLQEntryRow[] = [
  {
    id: 'dlq-1',
    envelope: { id: 'env-8812', body: { sourceId: 'src-s3', path: 'inbound/inv-9921.pdf' } },
    lastError: 'HTTP 502 from materializer',
    failedAtMs: Date.now() - 4 * 60_000,
    totalAttempts: 3,
  },
  {
    id: 'dlq-2',
    envelope: { id: 'env-8790', body: { sourceId: 'src-drive', path: 'contracts/legacy.doc' } },
    lastError: 'UnsupportedMediaType: application/msword',
    failedAtMs: Date.now() - 3 * 60 * 60_000,
    totalAttempts: 1,
  },
  {
    id: 'dlq-3',
    envelope: { id: 'env-8611', body: { sourceId: 'src-s3', path: 'inbound/scan-0044.tiff' } },
    lastError: 'TimeoutError: OCR step exceeded 120s',
    failedAtMs: Date.now() - 26 * 60 * 60_000,
    totalAttempts: 5,
  },
];

function Frame({ children }: { children: ReactNode }) {
  return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
}

const meta = {
  title: 'Ingest/DeadLetterQueuePage',
  component: DeadLetterQueuePage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DeadLetterQueuePage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Three dead envelopes, each with a different failure category. */
export const Loaded: Story = {
  render: () => (
    <MockApi body={{ items: entries }}>
      <Frame>
        <DeadLetterQueuePage />
      </Frame>
    </MockApi>
  ),
};

/** The state you want: nothing has permanently failed. */
export const Empty: Story = {
  render: () => (
    <MockApi body={{ items: [] }}>
      <Frame>
        <DeadLetterQueuePage />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <DeadLetterQueuePage />
      </Frame>
    </MockApi>
  ),
};

export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <DeadLetterQueuePage />
      </Frame>
    </MockApi>
  ),
};
