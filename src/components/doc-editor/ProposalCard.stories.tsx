// ProposalCard had NO stories until now, which is a large part of why the
// review surface went unexamined for so long: the only way to see one was to
// speak at a live document and wait for a model. These cover the states that
// matter, including every verdict state, in both palettes.

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import { ProposalCard } from './ProposalCard';
import type { ChangeReviewVerdict } from '../change-review';

const meta: Meta<typeof ProposalCard> = {
  title: 'Doc Editor/ProposalCard',
  component: ProposalCard,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ProposalCard>;

function Dark({ children }: { children: ReactNode }) {
  return (
    <div data-theme="dark" className="rounded-lg bg-surface-panel p-4">
      {children}
    </div>
  );
}

const REV = 'prop-rev-3';

const PASS: ChangeReviewVerdict = {
  verdict: 'pass',
  headline: 'Matches the spoken request exactly.',
  reasoning:
    'The remark asked for the header to read "Acme Master Services Agreement". The '
    + 'proposed title is that string verbatim, and the change touches meta.title only.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: REV,
};

const CONCERN: ChangeReviewVerdict = {
  verdict: 'concern',
  headline: 'Drops the year that three clauses cite.',
  reasoning:
    'Clauses 4.2, 7.1 and 11 refer to "the 2026 Agreement". Removing the year leaves '
    + 'those cross-references without a referent.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: REV,
};

const base = {
  utterance: 'Update this document to have a different header — call it Acme Master Services Agreement',
  kind: 'field' as const,
  status: 'ready' as const,
  confidence: 'high' as const,
  category: 'Document title',
  author: { name: 'Bob Martinez' },
  path: ['Header'],
  before: 'Acme MSA 2026',
  after: 'Acme Master Services Agreement',
  rationale: 'User explicitly requested renaming the document header to this exact title.',
  revision: REV,
  onAccept: () => ({ ok: true }),
  onReject: () => {},
  onRedraft: () => {},
};

export const Reviewed: Story = {
  name: 'With a passing verdict',
  render: () => <ProposalCard {...base} verdict={PASS} />,
};

export const ReviewedDark: Story = {
  name: 'With a passing verdict (dark)',
  render: () => <Dark><ProposalCard {...base} verdict={PASS} /></Dark>,
};

export const Concern: Story = {
  render: () => <ProposalCard {...base} verdict={CONCERN} />,
};

// The state the live surface is in today: the verdict producer is not shipped,
// so every proposal is unreviewed — and says so, rather than leaving a gap that
// reads as approval.
export const NotReviewed: Story = {
  name: 'No verdict yet (today’s live state)',
  render: () => <ProposalCard {...base} />,
};

export const Stale: Story = {
  name: 'Stale verdict — must not read as a live Pass',
  render: () => (
    <ProposalCard {...base} verdict={{ ...PASS, forRevision: 'prop-rev-1' }} onRereview={() => {}} />
  ),
};

export const StaleDark: Story = {
  name: 'Stale verdict (dark)',
  render: () => (
    <Dark>
      <ProposalCard {...base} verdict={{ ...PASS, forRevision: 'prop-rev-1' }} onRereview={() => {}} />
    </Dark>
  ),
};

export const ReviewPending: Story = {
  render: () => <ProposalCard {...base} verdictStatus="pending" />,
};

export const ReviewFailed: Story = {
  render: () => (
    <ProposalCard
      {...base}
      verdictStatus="failed"
      verdictError="reviewer timed out after 30s"
      onRereview={() => {}}
    />
  ),
};

export const ProseEdits: Story = {
  name: 'A prose change with several edits',
  render: () => (
    <ProposalCard
      {...base}
      kind="prose"
      category="Body text"
      path={['Overview']}
      locationHint="paragraph 2"
      utterance="tighten the overview and drop the marketing language"
      edits={[
        { before: 'This agreement is a best-in-class partnership.', after: 'This agreement is between Acme and the customer.' },
        { before: 'Leveraging synergies across teams.', after: 'Covering services listed in Schedule A.' },
      ]}
      verdict={PASS}
    />
  ),
};

export const Unplaced: Story = {
  name: 'Unplaced, low confidence',
  render: () => (
    <ProposalCard {...base} confidence="low" attachState="inbox" path={[]} />
  ),
};

export const Healed: Story = {
  name: 'Re-found by quote',
  render: () => <ProposalCard {...base} attachState="healed" verdict={CONCERN} />,
};

export const Drafting: Story = {
  render: () => <ProposalCard {...base} status="drafting" />,
};

export const DraftFailed: Story = {
  render: () => (
    <ProposalCard {...base} draftError="The model returned no usable change for this remark." />
  ),
};

export const Applied: Story = {
  render: () => <ProposalCard {...base} status="applied" verdict={PASS} />,
};

// The bug this card is shaped to prevent: an accept that records a decision and
// never changes the document. The refusal stays on screen and the card stays
// actionable.
export const ApplyRefused: Story = {
  name: 'An apply the document refused',
  render: () => (
    <ProposalCard
      {...base}
      verdict={PASS}
      onAccept={() => ({
        ok: false,
        message: 'The title changed since this was drafted.',
        stale: { expected: 'Acme MSA 2026', actual: 'Acme MSA (2026, signed)' },
      })}
    />
  ),
};
