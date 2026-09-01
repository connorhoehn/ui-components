import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

import ChangeReviewList from './ChangeReviewList';
import ChangeReviewCard from './ChangeReviewCard';
import type { ChangeReviewVerdict } from './types';

const meta: Meta<typeof ChangeReviewList> = {
  title: 'Change Review/ChangeReviewList',
  component: ChangeReviewList,
  parameters: { layout: 'padded' },
};
export default meta;

type Story = StoryObj<typeof ChangeReviewList>;

// `[data-theme="dark"]` re-tones the design tokens for a subtree, which is how
// the consuming app themes itself. Every state below has a dark twin, because a
// token pair that only works in one palette is a rendering bug that light-only
// stories cannot see.
function Dark({ children }: { children: ReactNode }) {
  return (
    <div data-theme="dark" className="rounded-lg bg-surface-panel p-4">
      {children}
    </div>
  );
}

const REV = 'rev-7';

const PASS: ChangeReviewVerdict = {
  verdict: 'pass',
  headline: 'Matches the requested rename exactly.',
  reasoning:
    'The requester asked for the header to read "Acme Master Services Agreement". '
    + 'The proposed title is that string verbatim, and no other field is touched.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: REV,
};

const CONCERN: ChangeReviewVerdict = {
  verdict: 'concern',
  headline: 'Drops the year, which three other clauses cite.',
  reasoning:
    'Clauses 4.2, 7.1 and 11 refer to "the 2026 Agreement". Removing the year from the '
    + 'title leaves those cross-references without a referent. The rename is probably still '
    + 'right, but the citations need updating in the same pass.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: REV,
};

const FAIL: ChangeReviewVerdict = {
  verdict: 'fail',
  headline: 'Changes a signed, executed value.',
  reasoning:
    'The counterparty signature block is part of the executed contract. Editing it after '
    + 'execution changes the meaning of a document both parties have already signed.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: REV,
};

const TITLE_PAIR = [{
  before: 'Acme MSA 2026',
  after: 'Acme Master Services Agreement',
}];

function TitleCard(props: Partial<React.ComponentProps<typeof ChangeReviewCard>> = {}) {
  return (
    <ChangeReviewCard
      category="Title"
      author={{ name: 'Dana Whitfield' }}
      path={['Header']}
      pairs={TITLE_PAIR}
      revision={REV}
      onAccept={() => ({ ok: true })}
      onReject={() => {}}
      {...props}
    />
  );
}

// ── The whole pattern, as a reviewer meets it ───────────────────────────────

export const DocumentQueue: Story = {
  name: 'A document and its changes',
  render: () => (
    <ChangeReviewList documentTitle="Acme MSA" documentMeta="Contract · edited 12m ago">
      <TitleCard verdict={PASS} />
      <ChangeReviewCard
        category="Payment terms"
        author={{ name: 'Priya Raman' }}
        path={['Section 4', 'Payment terms']}
        locationHint="paragraph 2"
        pairs={[{
          before: 'Net 30 from date of invoice.',
          after: 'Net 45 from date of invoice.',
        }]}
        revision={REV}
        verdict={CONCERN}
        onAccept={() => ({ ok: true })}
        onReject={() => {}}
      />
      <ChangeReviewCard
        category="Signature block"
        author={{ name: 'Import agent', kind: 'agent' }}
        path={['Execution']}
        pairs={[{ before: 'Signed 2026-08-02 by both parties.', after: 'Awaiting counter-signature.' }]}
        revision={REV}
        verdict={FAIL}
        onAccept={() => ({ ok: true })}
        onReject={() => {}}
      />
    </ChangeReviewList>
  ),
};

export const DocumentQueueDark: Story = {
  name: 'A document and its changes (dark)',
  render: () => (
    <Dark>
      <ChangeReviewList documentTitle="Acme MSA" documentMeta="Contract · edited 12m ago">
        <TitleCard verdict={PASS} />
        <ChangeReviewCard
          category="Payment terms"
          author={{ name: 'Priya Raman' }}
          path={['Section 4', 'Payment terms']}
          locationHint="paragraph 2"
          pairs={[{ before: 'Net 30 from date of invoice.', after: 'Net 45 from date of invoice.' }]}
          revision={REV}
          verdict={CONCERN}
          onAccept={() => ({ ok: true })}
          onReject={() => {}}
        />
        <ChangeReviewCard
          category="Signature block"
          author={{ name: 'Import agent', kind: 'agent' }}
          path={['Execution']}
          pairs={[{ before: 'Signed 2026-08-02 by both parties.', after: 'Awaiting counter-signature.' }]}
          revision={REV}
          verdict={FAIL}
          onAccept={() => ({ ok: true })}
          onReject={() => {}}
        />
      </ChangeReviewList>
    </Dark>
  ),
};

// ── Every verdict state, side by side ───────────────────────────────────────

function AllVerdictStates() {
  return (
    <ChangeReviewList documentTitle="Acme MSA" changeCount={6} pageSize={6}>
      <TitleCard category="Pass" verdict={PASS} />
      <TitleCard category="Concern" verdict={CONCERN} />
      <TitleCard category="Fail" verdict={FAIL} />
      {/* STALE: the verdict was computed against rev-1, the change is now rev-7.
          The chip must not read as a live Pass. */}
      <TitleCard
        category="Stale — computed against an earlier revision"
        verdict={{ ...PASS, forRevision: 'rev-1' }}
        onRereview={() => {}}
      />
      <TitleCard category="Pending — a review is in flight" verdictStatus="pending" />
      <TitleCard
        category="Failed — the reviewer could not be reached"
        verdictStatus="failed"
        verdictError="reviewer timed out after 30s"
        onRereview={() => {}}
      />
    </ChangeReviewList>
  );
}

export const VerdictStates: Story = {
  name: 'Verdict states — pass/concern/fail + stale/pending/failed/absent',
  render: () => (
    <div className="flex flex-col gap-6">
      <AllVerdictStates />
      {/* ABSENT is its own story-worthy case: nothing has reviewed this. It must
          still paint a chip, or "no chip" starts to read as approval. */}
      <ChangeReviewList documentTitle="Q2 Financial Overview" changeCount={1}>
        <TitleCard category="Absent — nothing has reviewed this" />
      </ChangeReviewList>
    </div>
  ),
};

export const VerdictStatesDark: Story = {
  name: 'Verdict states (dark)',
  render: () => (
    <Dark>
      <div className="flex flex-col gap-6">
        <AllVerdictStates />
        <ChangeReviewList documentTitle="Q2 Financial Overview" changeCount={1}>
          <TitleCard category="Absent — nothing has reviewed this" />
        </ChangeReviewList>
      </div>
    </Dark>
  ),
};

// ── Individual behaviours ───────────────────────────────────────────────────

export const StaleVerdict: Story = {
  name: 'Stale verdict, expanded',
  render: () => (
    <ChangeReviewList documentTitle="Acme MSA" changeCount={1}>
      <TitleCard
        verdict={{ ...CONCERN, forRevision: 'rev-1' }}
        onRereview={() => {}}
      />
    </ChangeReviewList>
  ),
};

export const Unattributed: Story = {
  name: 'Unattributed change',
  render: () => (
    <ChangeReviewList documentTitle="Q2 Financial Overview" changeCount={1}>
      <ChangeReviewCard
        category="Attachment"
        // No author: an S3 object write carries no editor identity. The card
        // says so rather than crediting the source system as if it were a person.
        path={['Attachments']}
        locationHint="attachment.sha256"
        pairs={[{ before: 'sha256:9f8e7d…old', after: 'sha256:c1a2b3…new' }]}
        beforeLabel="This copy"
        afterLabel="Incoming"
        revision={REV}
      />
    </ChangeReviewList>
  ),
};

export const FewAtATime: Story = {
  name: 'A long queue stays short',
  render: () => (
    <ChangeReviewList documentTitle="Master Agreement" documentMeta="9 pending edits">
      {Array.from({ length: 9 }, (_, i) => (
        <TitleCard key={i} category={`Clause ${i + 1}`} verdict={i % 2 ? CONCERN : PASS} />
      ))}
    </ChangeReviewList>
  ),
};

export const ApplyRefused: Story = {
  name: 'An apply the document refused',
  render: () => (
    <ChangeReviewList documentTitle="Acme MSA" changeCount={1}>
      <TitleCard
        verdict={PASS}
        onAccept={() => ({
          ok: false,
          message: 'The title changed since this was drafted.',
          stale: { expected: 'Acme MSA 2026', actual: 'Acme MSA (2026, signed)' },
        })}
      />
    </ChangeReviewList>
  ),
};

export const Empty: Story = {
  name: 'Nothing to review',
  render: () => (
    <ChangeReviewList
      documentTitle="Acme MSA"
      emptyState={<p className="text-sm text-text-tertiary">No changes are waiting on you.</p>}
    >
      {null}
    </ChangeReviewList>
  ),
};
