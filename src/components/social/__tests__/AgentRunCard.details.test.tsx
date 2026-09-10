import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { AgentRunCard, agentRunRefFromMetadata, describeAgentRunOp, type AgentRunStatus } from '../AgentRunCard';

// The card is two lines until someone opens it. Everything the pipeline UI
// knows about the run — the document, the ops, the steps, the timings — is
// then INSIDE the same card, so "what did it actually do?" is answered in the
// thread. These pin the collapsed/expanded contract and the words each op
// becomes.

afterEach(cleanup);

const details: NonNullable<AgentRunStatus['details']> = {
  document: { id: 'd-1', title: 'Q3 audit plan', snippet: 'The audit covers the three regional offices and the shared services centre, starting in October.' },
  ops: [
    { op: 'setTitle', text: 'Q3 audit plan' },
    { op: 'appendBlock', text: 'Scope: the three regional offices and the shared services centre, plus every vendor contract renewed since January.' },
    { op: 'replaceBlock', index: 1 },
    { op: 'deleteBlock', index: 3 },
    { op: 'appendMacro', text: 'decision' },
    { op: 'copyBlock', index: 0 },
    { op: 'setDocumentType', text: 'Runbook' },
    { op: 'skip', text: 'The second paragraph already says this.' },
  ],
  steps: [
    { id: 'read', label: 'Read the document', status: 'completed' },
    { id: 'plan', label: 'Plan the edit', status: 'completed' },
    { id: 'approve', label: 'Approval', status: 'skipped' },
    { id: 'apply', label: 'Apply as Haiku', status: 'running' },
    { id: 'post', label: 'Post the card', status: 'pending' },
  ],
  startedAt: '2026-09-10T21:44:00.000Z',
  completedAt: '2026-09-10T21:45:20.000Z',
};

describe('AgentRunCard details', () => {
  it('is two lines until the chevron opens it, and the chevron closes it again', () => {
    render(<AgentRunCard runId="r1" instruction="tighten the scope" agentName="Haiku" status={{ phase: 'completed', detail: 'Renamed', details }} />);
    const card = screen.getByTestId('agent-run-card');
    expect(card.children).toHaveLength(2);
    expect(screen.queryByTestId('agent-run-card-details')).toBeNull();
    const toggle = screen.getByTestId('agent-run-card-toggle');
    expect(toggle).toHaveAttribute('aria-label', 'Show details');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(screen.getByTestId('agent-run-card-details')).toBeInTheDocument();
    expect(card.dataset.expanded).toBe('true');
    expect(toggle).toHaveAttribute('aria-label', 'Hide details');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);
    expect(screen.queryByTestId('agent-run-card-details')).toBeNull();
    expect(card.children).toHaveLength(2);
  });

  it('opens on a click on the card body, but not on one of its buttons', () => {
    const onOpenRun = vi.fn();
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" onOpenRun={onOpenRun} status={{ phase: 'completed', details }} />);
    fireEvent.click(screen.getByTestId('agent-run-card-instruction'));
    expect(screen.getByTestId('agent-run-card-details')).toBeInTheDocument();
    // The "run" link does its own job and leaves the card as it was.
    fireEvent.click(screen.getByTestId('agent-run-card-open-run'));
    expect(onOpenRun).toHaveBeenCalledWith('r1');
    expect(screen.getByTestId('agent-run-card-details')).toBeInTheDocument();
  });

  it('can start expanded', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded status={{ phase: 'completed', details }} />);
    expect(screen.getByTestId('agent-run-card-details')).toBeInTheDocument();
  });

  it('shows the document with its snippet and opens it beside the chat', () => {
    const onOpenDocument = vi.fn();
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded onOpenDocument={onOpenDocument} status={{ phase: 'completed', details }} />);
    const row = screen.getByTestId('agent-run-card-details-document');
    expect(row).toHaveTextContent('Q3 audit plan');
    expect(screen.getByTestId('agent-run-card-details-snippet')).toHaveTextContent('The audit covers the three regional offices');
    fireEvent.click(within(row).getByRole('button', { name: 'Open beside the chat' }));
    expect(onOpenDocument).toHaveBeenCalledTimes(1);
  });

  it('falls back to the carried title, then to "Document", and offers no Open button without a handler', () => {
    const { rerender } = render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded documentTitle="Roadmap" onOpenDocument={vi.fn()} status={{ phase: 'running', details: { steps: [] } }} />);
    expect(screen.getByTestId('agent-run-card-details-document')).toHaveTextContent('Roadmap');
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded status={{ phase: 'running', details: { document: { id: 'd' } } }} />);
    expect(screen.getByTestId('agent-run-card-details-document')).toHaveTextContent('Document');
    expect(screen.queryByTestId('agent-run-card-details-open-document')).toBeNull();
    // No document at all — a recording run — no row.
    rerender(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" command="recording" defaultExpanded status={{ phase: 'running', details: { steps: [{ id: 's', label: 'Recording', status: 'running' }] } }} />);
    expect(screen.queryByTestId('agent-run-card-details-document')).toBeNull();
  });

  it('phrases each op, lists at most six, and counts the rest', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded status={{ phase: 'completed', details }} />);
    const items = [...screen.getByTestId('agent-run-card-details-ops').querySelectorAll('li')];
    expect(items).toHaveLength(6);
    expect(items.map((li) => li.textContent)).toEqual([
      'Renamed to “Q3 audit plan”',
      'Added: “Scope: the three regional offices and the shared services c…”',
      'Rewrote block 2',
      'Removed block 4',
      'Added a decision',
      'Carried block 1',
    ]);
    expect(screen.getByTestId('agent-run-card-details-more-ops')).toHaveTextContent('+2 more');
    expect(describeAgentRunOp({ op: 'setDocumentType', text: 'Runbook' })).toBe('Type: Runbook');
    expect(describeAgentRunOp({ op: 'skip', text: 'The second paragraph already says this.' })).toBe('The second paragraph already says this.');
    expect(describeAgentRunOp({ op: 'insertBlock', text: 'Short' })).toBe('Added: “Short”');
    // A block's kind names what was added when there is no text worth quoting.
    expect(describeAgentRunOp({ op: 'appendBlock', kind: 'horizontalRule' })).toBe('Added a divider');
    expect(describeAgentRunOp({ op: 'insertBlock', kind: 'horizontalRule', index: 2, text: '' })).toBe('Added a divider');
    expect(describeAgentRunOp({ op: 'appendBlock', kind: 'heading', level: 2, text: 'Rollout plan' })).toBe('Added heading “Rollout plan”');
    expect(describeAgentRunOp({ op: 'insertBlock', kind: 'heading', text: '   ' })).toBe('Added an empty heading');
    expect(describeAgentRunOp({ op: 'appendBlock', kind: 'paragraph', text: 'A paragraph' })).toBe('Added: “A paragraph”');
    expect(describeAgentRunOp({ op: 'appendBlock', kind: 'paragraph' })).toBe('Added an empty block');
    expect(describeAgentRunOp({ op: 'appendBlock', text: '' })).toBe('Added an empty block');
    expect(describeAgentRunOp({ op: 'somethingNew' })).toBe('somethingNew');
  });

  it('renders the steps as a timeline with a dot per status', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded status={{ phase: 'running', details }} />);
    const steps = [...screen.getByTestId('agent-run-card-details-steps').querySelectorAll('li')];
    expect(steps.map((li) => li.dataset.status)).toEqual(['completed', 'completed', 'skipped', 'running', 'pending']);
    expect(steps.map((li) => li.textContent)).toEqual(['Read the document', 'Plan the edit', 'Approval', 'Apply as Haiku', 'Post the card']);
    expect(steps[3].querySelector('span[aria-hidden]')?.className).toContain('animate-pulse');
    expect(steps[0].querySelector('span[aria-hidden]')?.className).toContain('bg-success');
  });

  it('carries the footer links and the timings', () => {
    const onOpenRun = vi.fn();
    const onOpenResult = vi.fn();
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" defaultExpanded onOpenRun={onOpenRun} onOpenResult={onOpenResult} status={{ phase: 'completed', result: { kind: 'document', documentId: 'd-1' }, details }} />);
    fireEvent.click(screen.getByTestId('agent-run-card-details-open-run'));
    expect(onOpenRun).toHaveBeenCalledWith('r1');
    fireEvent.click(screen.getByTestId('agent-run-card-details-open-result'));
    expect(onOpenResult).toHaveBeenCalledWith({ kind: 'document', documentId: 'd-1' });
    // The clock reading is the viewer's locale; the duration is not.
    expect(screen.getByTestId('agent-run-card-details-timings')).toHaveTextContent(/^started .+ · 80s$/);
  });

  it('reads a declined run as "No change", with the reason on the line and in full on hover', () => {
    const reason = 'The document already has a title that says this; nothing to rename.';
    render(<AgentRunCard runId="r1" instruction="rename it" agentName="Haiku" status={{ phase: 'completed', noop: true, detail: reason }} />);
    expect(screen.getByTestId('agent-run-card-phase')).toHaveTextContent('No change');
    expect(screen.getByTestId('agent-run-card-phase').className).toContain('warning');
    const detail = screen.getByTestId('agent-run-card-detail');
    expect(detail).toHaveTextContent(reason);
    expect(detail).toHaveAttribute('title', reason);
    expect(screen.getByTestId('agent-run-card-phase')).not.toHaveTextContent('Updated');
  });

  it('reads a failed run as "Failed" in the danger tone, with the error on the line and in the details', () => {
    render(<AgentRunCard runId="r1" instruction="x" agentName="Haiku" status={{ phase: 'failed', detail: 'claude exited 1: rate limited', details: { error: 'claude exited 1: rate limited', steps: [{ id: 'apply', label: 'Apply as Haiku', status: 'failed' }] } }} />);
    const badge = screen.getByTestId('agent-run-card-phase');
    expect(badge).toHaveTextContent('Failed');
    expect(badge.className).toContain('danger');
    expect(screen.getByTestId('agent-run-card-detail')).toHaveTextContent('claude exited 1: rate limited');
    fireEvent.click(screen.getByTestId('agent-run-card-toggle'));
    expect(screen.getByTestId('agent-run-card-details-error')).toHaveTextContent('claude exited 1: rate limited');
    expect(screen.getByTestId('agent-run-card-details-steps').querySelector('li')?.dataset.status).toBe('failed');
  });

  it('reads the carried document title off the metadata', () => {
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', documentId: 'd', documentTitle: 'Roadmap' })).toMatchObject({ documentId: 'd', documentTitle: 'Roadmap' });
    expect(agentRunRefFromMetadata({ kind: 'agent-run', runId: 'r', documentId: 'd' })).not.toHaveProperty('documentTitle');
  });
});
