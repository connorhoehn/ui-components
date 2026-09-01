// The change-review pattern.
//
// Most of this file is about ONE rule: a verdict computed against an older
// revision of a change must never render as though it still applies. A
// confidently wrong "Pass" on a change that has since been edited is worse than
// showing no verdict at all, because it converts a review queue into a rubber
// stamp. The four non-ready states (absent / pending / failed / stale) each get
// their own visible treatment for the same reason — a queue where "no chip"
// silently means "nobody looked" teaches reviewers to read absence as approval.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ChangeReviewList from '../ChangeReviewList';
import ChangeReviewCard from '../ChangeReviewCard';
import ChangeLocation from '../ChangeLocation';
import ChangeDiff from '../ChangeDiff';
import VerdictChip from '../VerdictChip';
import { resolveVerdictState, type ChangeReviewVerdict } from '../types';

const PASS: ChangeReviewVerdict = {
  verdict: 'pass',
  headline: 'Matches the requested rename.',
  reasoning: 'The new title is the exact string the requester asked for.',
  producedAt: '2026-09-01T10:00:00.000Z',
  forRevision: 'rev-1',
};

function card(props: Partial<React.ComponentProps<typeof ChangeReviewCard>> = {}) {
  return render(
    <ChangeReviewCard
      category="Title"
      author={{ name: 'Dana Whitfield' }}
      pairs={[{ before: 'Acme MSA 2026', after: 'Acme Master Services Agreement' }]}
      {...props}
    />,
  );
}

// ── The staleness rule ──────────────────────────────────────────────────────

describe('resolveVerdictState', () => {
  it('is ready when the verdict was computed against the current revision', () => {
    expect(resolveVerdictState({ verdict: PASS, revision: 'rev-1' })).toBe('ready');
  });

  it('is STALE the moment the revision moves on', () => {
    expect(resolveVerdictState({ verdict: PASS, revision: 'rev-2' })).toBe('stale');
  });

  it('is absent when no verdict has been produced', () => {
    expect(resolveVerdictState({ revision: 'rev-1' })).toBe('absent');
  });

  it('is pending while a review is in flight', () => {
    expect(resolveVerdictState({ status: 'pending', revision: 'rev-1' })).toBe('pending');
  });

  it('is failed when the review could not be produced', () => {
    expect(resolveVerdictState({ status: 'failed', revision: 'rev-1' })).toBe('failed');
  });

  // A re-review already running is more useful to say than "the old answer is
  // out of date", and neither one shows the old verdict's colour.
  it('lets pending outrank staleness', () => {
    expect(resolveVerdictState({ verdict: PASS, status: 'pending', revision: 'rev-9' })).toBe('pending');
  });

  it('cannot be talked out of staleness by a failed status', () => {
    expect(resolveVerdictState({ verdict: PASS, status: 'failed', revision: 'rev-9' })).toBe('failed');
  });

  // A host that cannot tell us the current revision gets `ready` — we will not
  // invent staleness without evidence — which is exactly why `revision` is
  // documented as required on every consumer prop.
  it('renders ready when the host supplies no revision to compare against', () => {
    expect(resolveVerdictState({ verdict: PASS })).toBe('ready');
  });
});

describe('VerdictChip — the four non-ready states are all visible', () => {
  it('shows the verdict with a word, not colour alone', () => {
    render(<VerdictChip verdict={PASS} revision="rev-1" />);
    expect(screen.getByTestId('verdict-chip')).toHaveTextContent('Pass');
    expect(screen.getByTestId('verdict-headline')).toHaveTextContent('Matches the requested rename.');
  });

  it('carries a non-colour glyph alongside the label', () => {
    render(<VerdictChip verdict={{ ...PASS, verdict: 'fail' }} revision="rev-1" />);
    const chip = screen.getByTestId('verdict-chip');
    expect(chip).toHaveTextContent('Fail');
    expect(chip).toHaveTextContent('✕');
  });

  it('says plainly that nothing has reviewed the change', () => {
    render(<VerdictChip revision="rev-1" />);
    expect(screen.getByTestId('verdict')).toHaveAttribute('data-verdict-state', 'absent');
    expect(screen.getByTestId('verdict-chip')).toHaveTextContent('Not reviewed');
  });

  it('shows a review in flight', () => {
    render(<VerdictChip status="pending" revision="rev-1" />);
    expect(screen.getByTestId('verdict-chip')).toHaveTextContent('Reviewing');
  });

  it('shows why a review failed', () => {
    render(<VerdictChip status="failed" error="reviewer timed out" revision="rev-1" />);
    expect(screen.getByTestId('verdict-chip')).toHaveTextContent('Review failed');
    expect(screen.getByTestId('verdict-headline')).toHaveTextContent('reviewer timed out');
  });

  it('falls back to a plain sentence when a failure carries no reason', () => {
    render(<VerdictChip status="failed" revision="rev-1" />);
    expect(screen.getByTestId('verdict-headline')).toHaveTextContent(/could not be reached/i);
  });
});

describe('VerdictChip — a stale verdict never passes for a live one', () => {
  it('drops the verdict word from the chip and leads with the staleness', () => {
    render(<VerdictChip verdict={PASS} revision="rev-2" />);
    const chip = screen.getByTestId('verdict-chip');
    expect(chip).toHaveTextContent('Out of date');
    // The critical assertion: the chip must not read as a live "Pass".
    expect(chip).not.toHaveTextContent('Pass');
  });

  it('still reports what the old verdict WAS, as history', () => {
    render(<VerdictChip verdict={PASS} revision="rev-2" />);
    expect(screen.getByTestId('verdict-headline')).toHaveTextContent(/Was “Pass”/);
  });

  it('tells the reviewer what to do about it', () => {
    render(<VerdictChip verdict={PASS} revision="rev-2" />);
    expect(screen.getByTestId('verdict-stale-note')).toHaveTextContent(/Re-run the review/i);
  });

  it('marks the state in the DOM so hosts and tests can assert on it', () => {
    render(<VerdictChip verdict={PASS} revision="rev-2" />);
    expect(screen.getByTestId('verdict')).toHaveAttribute('data-verdict-state', 'stale');
  });
});

describe('VerdictChip — expandable reasoning', () => {
  it('keeps the reasoning collapsed by default', () => {
    render(<VerdictChip verdict={PASS} revision="rev-1" />);
    expect(screen.queryByTestId('verdict-reasoning')).toBeNull();
  });

  it('expands and collapses on request', () => {
    render(<VerdictChip verdict={PASS} revision="rev-1" />);
    fireEvent.click(screen.getByTestId('verdict-toggle'));
    expect(screen.getByTestId('verdict-reasoning')).toHaveTextContent('exact string');
    fireEvent.click(screen.getByTestId('verdict-toggle'));
    expect(screen.queryByTestId('verdict-reasoning')).toBeNull();
  });

  it('wires the toggle to the panel for assistive tech', () => {
    render(<VerdictChip verdict={PASS} revision="rev-1" />);
    const toggle = screen.getByTestId('verdict-toggle');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle.getAttribute('aria-controls')).toBe(screen.getByTestId('verdict-reasoning').id);
  });

  // "Absent" means the model gave none. Rendering a "no reasoning" placeholder
  // would be noise where there is simply nothing to say.
  it('offers no toggle when the model gave no reasoning', () => {
    const { reasoning: _drop, ...noReasoning } = PASS;
    render(<VerdictChip verdict={noReasoning} revision="rev-1" />);
    expect(screen.queryByTestId('verdict-toggle')).toBeNull();
  });

  it('still lets a stale verdict be unfolded — the reasoning is the evidence', () => {
    render(<VerdictChip verdict={PASS} revision="rev-2" />);
    fireEvent.click(screen.getByTestId('verdict-toggle'));
    expect(screen.getByTestId('verdict-reasoning')).toBeInTheDocument();
  });

  it('has nothing to unfold while a review is pending', () => {
    render(<VerdictChip verdict={PASS} status="pending" revision="rev-1" />);
    expect(screen.queryByTestId('verdict-toggle')).toBeNull();
  });
});

// ── Where and what ──────────────────────────────────────────────────────────

describe('ChangeLocation', () => {
  it('renders the breadcrumb in diff-hunk shape', () => {
    render(<ChangeLocation path={['Section 4', 'Payment terms']} />);
    const loc = screen.getByTestId('change-location');
    expect(loc).toHaveTextContent('Section 4');
    expect(loc).toHaveTextContent('Payment terms');
    expect(loc.textContent).toContain('@@');
  });

  it('names the document-level case rather than rendering an empty strip', () => {
    render(<ChangeLocation path={[]} />);
    expect(screen.getByTestId('change-location')).toHaveTextContent('Document level');
  });

  it('drops empty crumbs instead of rendering stray separators', () => {
    render(<ChangeLocation path={['Body', '', '  ']} />);
    expect(screen.getByTestId('change-location')).toHaveTextContent('Body');
  });

  it('appends a position hint when there is one', () => {
    render(<ChangeLocation path={['Body']} hint="paragraph 3" />);
    expect(screen.getByTestId('change-location')).toHaveTextContent('paragraph 3');
  });
});

describe('ChangeDiff', () => {
  it('labels both sides so the diff does not depend on colour', () => {
    render(<ChangeDiff pairs={[{ before: 'old', after: 'new' }]} />);
    expect(screen.getByTestId('change-diff-before-0')).toHaveTextContent('Now');
    expect(screen.getByTestId('change-diff-after-0')).toHaveTextContent('Proposed');
  });

  it('distinguishes an empty starting value from a removal', () => {
    render(<ChangeDiff pairs={[{ before: '', after: '' }]} />);
    expect(screen.getByTestId('change-diff-before-0')).toHaveTextContent('(empty)');
    expect(screen.getByTestId('change-diff-after-0')).toHaveTextContent('(removed)');
  });

  it('renders one row per edit for a multi-edit change', () => {
    render(<ChangeDiff pairs={[{ before: 'a', after: 'b' }, { before: 'c', after: 'd' }]} />);
    expect(screen.getByTestId('change-diff-before-1')).toHaveTextContent('c');
  });

  it('renders nothing at all when there is no diff to show', () => {
    const { container } = render(<ChangeDiff pairs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

// ── The card ────────────────────────────────────────────────────────────────

describe('ChangeReviewCard', () => {
  it('leads with the category and the author', () => {
    card();
    expect(screen.getByTestId('change-review-card-category')).toHaveTextContent('Title');
    expect(screen.getByTestId('change-review-card-author')).toHaveTextContent('Dana Whitfield');
  });

  it('marks a machine author as one', () => {
    card({ author: { name: 'Drafting agent', kind: 'agent' } });
    expect(screen.getByTestId('change-review-card-agent')).toHaveTextContent('AI');
  });

  it('renders the absence of an author rather than leaving a blank', () => {
    card({ author: undefined });
    expect(screen.getByTestId('change-review-card-author')).toHaveTextContent('Unattributed');
  });

  it('shows the request verbatim when there is one', () => {
    card({ utterance: 'call it the Master Services Agreement' });
    expect(screen.getByText(/call it the Master Services Agreement/)).toBeInTheDocument();
  });

  it('replaces the diff with the draft error when drafting failed', () => {
    card({ draftError: 'the model returned no change' });
    expect(screen.getByTestId('change-review-card-draft-error')).toBeInTheDocument();
    expect(screen.queryByTestId('change-review-card-diff')).toBeNull();
  });

  // The bug this shape exists to prevent: an accept that records a decision and
  // never changes the document. A refused apply stays on screen and the card
  // stays actionable, rather than congratulating the user and moving on.
  it('keeps a failed apply on screen and does not mark the change applied', async () => {
    const onAccept = vi.fn().mockResolvedValue({ ok: false, message: 'the document refused it' });
    card({ onAccept });
    fireEvent.click(screen.getByTestId('change-review-card-accept'));
    await waitFor(() =>
      expect(screen.getByTestId('change-review-card-apply-error')).toHaveTextContent('the document refused it'),
    );
    expect(screen.queryByTestId('change-review-card-applied')).toBeNull();
    expect(screen.getByTestId('change-review-card-accept')).toBeEnabled();
  });

  it('reports a thrown accept as a failure rather than losing it', async () => {
    const onAccept = vi.fn().mockRejectedValue(new Error('network died'));
    card({ onAccept });
    fireEvent.click(screen.getByTestId('change-review-card-accept'));
    await waitFor(() =>
      expect(screen.getByTestId('change-review-card-apply-error')).toHaveTextContent('network died'),
    );
  });

  it('spells out a compare-and-set refusal in both values', async () => {
    const onAccept = vi.fn().mockResolvedValue({
      ok: false, stale: { expected: 'Acme MSA 2026', actual: 'Acme MSA (signed)' },
    });
    card({ onAccept });
    fireEvent.click(screen.getByTestId('change-review-card-accept'));
    await waitFor(() => {
      const err = screen.getByTestId('change-review-card-apply-error');
      expect(err).toHaveTextContent('Acme MSA 2026');
      expect(err).toHaveTextContent('Acme MSA (signed)');
    });
  });

  it('collects a rejection reason before rejecting', () => {
    const onReject = vi.fn();
    card({ onReject });
    fireEvent.click(screen.getByTestId('change-review-card-reject'));
    fireEvent.change(screen.getByTestId('change-review-card-reason'), { target: { value: 'wrong section' } });
    fireEvent.click(screen.getByTestId('change-review-card-reject-confirm'));
    expect(onReject).toHaveBeenCalledWith('wrong section');
  });

  it('withdraws the decision controls once the change is decided', () => {
    card({ status: 'applied', onAccept: vi.fn() });
    expect(screen.getByTestId('change-review-card-applied')).toBeInTheDocument();
    expect(screen.queryByTestId('change-review-card-accept')).toBeNull();
  });

  it('passes staleness through to its verdict chip', () => {
    card({ verdict: PASS, revision: 'rev-2' });
    expect(screen.getByTestId('change-review-card-verdict'))
      .toHaveAttribute('data-verdict-state', 'stale');
  });

  it('offers a re-review action', () => {
    const onRereview = vi.fn();
    card({ verdict: PASS, revision: 'rev-2', onRereview });
    fireEvent.click(screen.getByTestId('change-review-card-rereview'));
    expect(onRereview).toHaveBeenCalled();
  });
});

// ── The list ────────────────────────────────────────────────────────────────

function list(props: Partial<React.ComponentProps<typeof ChangeReviewList>> = {}, n = 5) {
  return render(
    <ChangeReviewList documentTitle="Acme MSA" {...props}>
      {Array.from({ length: n }, (_, i) => <div key={i} data-testid={`c${i}`}>change {i}</div>)}
    </ChangeReviewList>,
  );
}

describe('ChangeReviewList', () => {
  it('heads the queue with the document, not the queue name', () => {
    list();
    expect(screen.getByTestId('change-review-list-title')).toHaveTextContent('Acme MSA');
  });

  it('counts the changes beside it', () => {
    list({}, 3);
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('3 changes to review');
  });

  it('singularises one change', () => {
    list({}, 1);
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('1 change to review');
  });

  it('lets the host state a total larger than what it rendered', () => {
    list({ changeCount: 40 }, 3);
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('40 changes');
  });

  // Review quality falls off a cliff with queue length: hand a reviewer
  // nineteen changes and they skim nineteen changes.
  it('shows only a few at a time', () => {
    list({}, 5);
    expect(screen.getByTestId('c2')).toBeInTheDocument();
    expect(screen.queryByTestId('c3')).toBeNull();
  });

  it('says how many are left rather than hiding the remainder', () => {
    list({}, 5);
    expect(screen.getByTestId('change-review-list-remaining')).toHaveTextContent('2 left');
  });

  it('reveals the next batch on request', () => {
    list({}, 5);
    fireEvent.click(screen.getByTestId('change-review-list-more'));
    expect(screen.getByTestId('c4')).toBeInTheDocument();
    expect(screen.queryByTestId('change-review-list-more')).toBeNull();
  });

  it('offers no batch control when everything already fits', () => {
    list({}, 2);
    expect(screen.queryByTestId('change-review-list-more')).toBeNull();
  });

  // A commit control passed as a child would be one of the paged items, so on a
  // queue longer than `pageSize` the surface would become unsubmittable.
  it('keeps the footer outside the paging window', () => {
    render(
      <ChangeReviewList documentTitle="Acme MSA" footer={<button data-testid="commit">Apply</button>}>
        {Array.from({ length: 9 }, (_, i) => <div key={i}>change {i}</div>)}
      </ChangeReviewList>,
    );
    expect(screen.getByTestId('commit')).toBeInTheDocument();
  });

  it('renders the empty state instead of a queue when there is nothing to review', () => {
    render(
      <ChangeReviewList documentTitle="Acme MSA" emptyState={<p>All clear</p>}>
        {null}
      </ChangeReviewList>,
    );
    expect(screen.getByText('All clear')).toBeInTheDocument();
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('No changes to review');
  });

  it('puts notices above the queue', () => {
    list({ notices: <p data-testid="notice">heads up</p> });
    expect(screen.getByTestId('notice')).toBeInTheDocument();
  });

  it('composes with real cards', () => {
    render(
      <ChangeReviewList documentTitle="Acme MSA">
        <ChangeReviewCard
          category="Title"
          author={{ name: 'Dana Whitfield' }}
          path={['Header']}
          pairs={[{ before: 'a', after: 'b' }]}
          verdict={PASS}
          revision="rev-1"
        />
      </ChangeReviewList>,
    );
    const queue = screen.getByTestId('change-review-list-queue');
    expect(within(queue).getByTestId('change-review-card-category')).toHaveTextContent('Title');
    expect(within(queue).getByTestId('change-review-card-verdict'))
      .toHaveAttribute('data-verdict-state', 'ready');
  });
});
