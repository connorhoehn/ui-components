import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, type AgentRunStatus } from '../AgentRunCard';

// The card renders in two very different columns — a document's ~267px
// conversation rail and the main chat — and the status row is the one row that
// runs out of room. These pin what the row sheds and in what order.
//
// jsdom evaluates no stylesheet, so a container query cannot be *measured*
// here: what these assert is the contract the classes encode — which element
// is the query container, which controls are marked wide-only, and which are
// marked never-to-give-way. The visual result is the designer's to look at.

afterEach(cleanup);

const suggested: AgentRunStatus = {
  phase: 'completed',
  detail: '3 changes suggested',
  suggestion: { key: 'sug-1', documentId: 'd1', applied: 3 },
};

/** The card's own width, not the viewport's, is what the row responds to. */
const isContainer = (el: HTMLElement) => el.className.split(/\s+/).includes('@container');

describe('AgentRunCard in a narrow column', () => {
  it('names the two open controls by what pressing them does, and marks them as controls at rest', () => {
    render(
      <AgentRunCard
        runId="r1"
        instruction="add one short sentence about the rollout"
        agentName="Haiku"
        status={suggested}
        onOpenRun={vi.fn()}
        onOpenDocument={vi.fn()}
        onReview={vi.fn()}
      />,
    );
    // The accessible name is a verb phrase: someone moving control to control
    // used to hear "run", "document" and learn nothing.
    const run = screen.getByRole('button', { name: 'Open run' });
    const doc = screen.getByRole('button', { name: 'Open document' });
    expect(run).toBe(screen.getByTestId('agent-run-card-open-run'));
    expect(doc).toBe(screen.getByTestId('agent-run-card-open-document'));
    // Underlined before the pointer arrives, not only under it.
    for (const el of [run, doc]) {
      expect(el.className).toContain('underline');
      expect(el.className).not.toMatch(/hover:underline/);
    }
  });

  it('does not give the expanded card two controls that announce the same words', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded onOpenRun={vi.fn()} status={{ phase: 'completed', details: { steps: [] } }} />);
    expect(screen.getByTestId('agent-run-card-open-run')).toHaveTextContent('Open run');
    expect(screen.getByTestId('agent-run-card-details-open-run')).toHaveTextContent('Open run in the pipeline');
    expect(screen.getAllByRole('button', { name: 'Open run' })).toHaveLength(1);
  });

  it('sheds the two open links first, and never the decision buttons', () => {
    render(
      <AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={suggested} onOpenRun={vi.fn()} onOpenDocument={vi.fn()} onReview={vi.fn()} />,
    );
    expect(isContainer(screen.getByTestId('agent-run-card'))).toBe(true);
    // Dropped below @md — a 267px column keeps neither.
    for (const id of ['agent-run-card-open-run', 'agent-run-card-open-document']) {
      const cls = screen.getByTestId(id).className.split(/\s+/);
      expect(cls).toContain('hidden');
      expect(cls).toContain('@md:inline');
    }
    // Accept / Reject are reachable at every width: nothing hides them, and
    // they are shrink-0 so they keep their labels rather than being squeezed.
    const review = screen.getByTestId('agent-run-card-review');
    expect(review.className).toContain('shrink-0');
    expect(review.className).not.toContain('hidden');
    expect(screen.getByTestId('agent-run-card-accept')).toBeInTheDocument();
    expect(screen.getByTestId('agent-run-card-reject-review')).toBeInTheDocument();
  });

  it('is still the same two-line card: the row wraps inside itself', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={suggested} onReview={vi.fn()} onOpenRun={vi.fn()} />);
    expect(screen.getByTestId('agent-run-card').children).toHaveLength(2);
    // The sentence takes a whole line of its own until @sm, pushing the
    // decision buttons onto their own line rather than crushing them.
    const group = screen.getByTestId('agent-run-card-detail').parentElement!;
    expect(group.className).toContain('basis-full');
    expect(group.className).toContain('@sm:basis-0');
  });

  it('spends no second line on a card with nothing to act on', () => {
    // "Updated", no decision, no result: there is nothing to wrap below the
    // sentence, so the narrow card stays exactly as short as it was.
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'completed', detail: 'Renamed to Q3 audit' }} onOpenRun={vi.fn()} onOpenDocument={vi.fn()} />);
    const group = screen.getByTestId('agent-run-card-detail').parentElement!;
    expect(group.className).not.toContain('basis-full');
  });

  it('keeps the run outcome at every width — the collapsed card has no other way to it', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Search" status={{ phase: 'completed', result: { kind: 'panel', panel: { kind: 'graph', id: 'k8s' } } }} onOpenResult={vi.fn()} />);
    const open = screen.getByTestId('agent-run-card-open-result');
    expect(open.className).not.toContain('hidden');
    expect(open.className).toContain('shrink-0');
  });
});
