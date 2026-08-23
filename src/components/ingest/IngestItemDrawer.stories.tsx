import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import IngestItemDrawer from './IngestItemDrawer';
import { IdentityProvider } from '../../contexts/IdentityContext';
import { WebSocketProvider } from '../../contexts/WebSocketContext';
import type { IngestItem } from '../../types/ingest';

// ---------------------------------------------------------------------------
// The drawer is prop-driven apart from `useIngestProgress`, which subscribes
// to the gateway. These stories supply an inert WebSocket context value — no
// message ever arrives, which is the honest "item not currently syncing"
// state — plus the identity the retry/skip calls are signed with.
// ---------------------------------------------------------------------------

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

function Frame({ children }: { children: ReactNode }) {
  return (
    <IdentityProvider value={IDENTITY}>
      <WebSocketProvider value={SOCKET}>
        <div className="h-[620px] relative bg-surface-panel">{children}</div>
      </WebSocketProvider>
    </IdentityProvider>
  );
}

const meta = {
  title: 'Ingest/IngestItemDrawer',
  component: IngestItemDrawer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    sourceName: 'Contracts (Google Drive)',
    onClose: () => {},
    onRetry: async () => true,
    onSkip: async () => true,
  },
  decorators: [
    (Story) => (
      <Frame>
        <Story />
      </Frame>
    ),
  ],
} satisfies Meta<typeof IngestItemDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Completed item: full timeline, rule-based mapping at high confidence. */
export const Completed: Story = {
  args: { item: item({ itemId: 'it-1' }) },
};

/** Mid-flight — the timeline stops at the current step. */
export const InProgress: Story = {
  args: {
    item: item({
      itemId: 'it-2',
      status: 'materializing',
      documentId: null,
      mappingMethod: 'llm-match',
      mappingConfidence: 0.71,
    }),
  },
};

/** Failed after three attempts — retry and skip are the operator's options. */
export const Failed: Story = {
  args: {
    item: item({
      itemId: 'it-3',
      sourcePath: 'inbound/inv-9921.pdf',
      sourceId: 'src-s3',
      status: 'failed',
      error: 'HTTP 502 from materializer (attempt 3 of 3)',
      attempts: 3,
      documentTypeId: null,
      documentId: null,
      mappingMethod: null,
      mappingConfidence: null,
      pipelineRunId: null,
    }),
    sourceName: 'Invoice drop bucket',
  },
};

/** Low-confidence LLM-generated mapping — the review-queue candidate. */
export const LowConfidenceMapping: Story = {
  args: {
    item: item({
      itemId: 'it-4',
      sourcePath: 'contracts/unknown-form.pdf',
      status: 'mapping',
      mappingMethod: 'llm-generate',
      mappingConfidence: 0.34,
      documentTypeId: null,
      documentId: null,
      pipelineRunId: null,
    }),
  },
};

/** `item: null` closes the drawer — nothing renders. */
export const Closed: Story = { args: { item: null } };
