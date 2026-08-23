import { useEffect, useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import DocTypeProposalsPage from './DocTypeProposalsPage';
import { IdentityProvider } from '../../contexts/IdentityContext';
import type { DocTypeProposalRow } from '../../hooks/useDocTypeProposals';

// `useDocTypeProposals` fetches `/api/ingest/mapping/proposals` directly; these
// stories install a story-only mock backend and restore `fetch` on unmount.
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

const proposals: DocTypeProposalRow[] = [
  {
    proposalId: 'prop-1',
    sourceId: 'src-drive',
    signature: 'pdf:invoice-like:v2',
    sampleIngestIds: ['it-11', 'it-12', 'it-19'],
    proposedName: 'Vendor Invoice',
    proposedDescription: 'Invoices received from external vendors via the Drive drop folder.',
    proposedFields: [
      { name: 'vendorName', sectionType: 'text', required: true },
      { name: 'invoiceNumber', sectionType: 'text', required: true },
      { name: 'totalAmount', sectionType: 'number', required: true },
      { name: 'dueDate', sectionType: 'date', required: false },
    ],
    reasoning:
      '37 unmapped items share a header block with "Invoice #" and a totals table; no existing DocType covers them.',
    status: 'pending',
    createdAt: now,
  },
  {
    proposalId: 'prop-2',
    sourceId: 'src-s3',
    signature: 'pdf:sow:v1',
    sampleIngestIds: ['it-40'],
    proposedName: 'Statement of Work',
    proposedDescription: 'Scoped engagement documents with deliverables and milestones.',
    proposedFields: [
      { name: 'clientName', sectionType: 'text', required: true },
      { name: 'milestones', sectionType: 'list', required: false },
    ],
    reasoning: 'Single sample so far — low confidence, kept for operator review.',
    status: 'pending',
    createdAt: now,
  },
  {
    proposalId: 'prop-3',
    sourceId: 'src-drive',
    signature: 'pdf:receipt:v1',
    sampleIngestIds: ['it-3'],
    proposedName: 'Expense Receipt',
    proposedDescription: 'Scanned receipts attached to expense claims.',
    proposedFields: [{ name: 'merchant', sectionType: 'text', required: true }],
    reasoning: 'Superseded by the existing Expense DocType.',
    status: 'rejected',
    createdAt: now,
  },
];

function Frame({ children }: { children: ReactNode }) {
  return <IdentityProvider value={IDENTITY}>{children}</IdentityProvider>;
}

const meta = {
  title: 'Ingest/DocTypeProposalsPage',
  component: DocTypeProposalsPage,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof DocTypeProposalsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Two pending proposals plus one already rejected. */
export const Loaded: Story = {
  render: () => (
    <MockApi body={{ proposals }}>
      <Frame>
        <DocTypeProposalsPage />
      </Frame>
    </MockApi>
  ),
};

/** Only high-confidence proposals awaiting a promote/reject decision. */
export const PendingOnly: Story = {
  render: () => (
    <MockApi body={{ proposals: proposals.filter((p) => p.status === 'pending') }}>
      <Frame>
        <DocTypeProposalsPage />
      </Frame>
    </MockApi>
  ),
};

/** Mapping is keeping up — nothing to review. */
export const Empty: Story = {
  render: () => (
    <MockApi body={{ proposals: [] }}>
      <Frame>
        <DocTypeProposalsPage />
      </Frame>
    </MockApi>
  ),
};

export const Loading: Story = {
  render: () => (
    <MockApi mode="pending">
      <Frame>
        <DocTypeProposalsPage />
      </Frame>
    </MockApi>
  ),
};

export const ApiError: Story = {
  render: () => (
    <MockApi mode="error">
      <Frame>
        <DocTypeProposalsPage />
      </Frame>
    </MockApi>
  ),
};
