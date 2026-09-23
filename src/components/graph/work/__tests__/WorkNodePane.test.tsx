import { useState } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkNodePane } from '../WorkNodePane';
import type { WorkActivityNodeDetail, WorkGraphNodeData, WorkGraphSelection } from '../types';

const at = '2026-09-20T13:45:00Z';
const node = (id: string, kind: WorkGraphNodeData['kind'], title: string, extra: Partial<WorkGraphNodeData> = {}): WorkGraphNodeData =>
  ({ id, kind, title, status: 'running', disclosure: 'details', capabilities: ['view-document'], updatedAt: at, ...extra });

const slides = [
  { id: 'v2-slide-1', index: 1, title: 'Executive summary', preview: <span>Summary art</span> },
  { id: 'v2-slide-4', index: 4, title: 'Release readiness', preview: <span>Readiness art</span> },
];
const artifactDetail = (failing: boolean): WorkActivityNodeDetail => ({
  subtitle: 'Presentation · Shared with you',
  banner: failing
    ? { tone: 'error', title: 'v3 failed', description: 'v2 is still available · inspect run' }
    : { tone: 'info', title: 'Generating v3', description: 'v2 is available to review while the agent works' },
  sections: { sources: [{ id: 'transcript', title: 'Planning sync transcript', meta: 'Meeting · 08:30–09:00', selection: { kind: 'node', id: 'transcript' } }] },
  ...(failing ? { actions: [{ id: 'run', label: 'Inspect run', selection: { kind: 'node' as const, id: 'agent' } }] } : {}),
  artifact: {
    revisions: [
      { id: 'v1', label: 'v1', createdAt: at, preview: <span>First deck</span>, anchorId: 'v1-slide-4', anchorLabel: 'Slide 4' },
      { id: 'v2', label: 'v2', createdAt: at, preview: <span>Second deck</span>, anchorId: 'v2-slide-4', slides },
    ],
    pending: { id: 'v3', label: 'v3', status: failing ? 'failed' : 'generating' },
    onOpenPreview: vi.fn(),
  },
});

function Harness({ detail, entity, onReference, initial }: {
  detail?: WorkActivityNodeDetail; entity: WorkGraphNodeData;
  onReference?: (selection: Exclude<WorkGraphSelection, null>) => void;
  initial?: Extract<WorkGraphSelection, { kind: 'node' }>;
}) {
  const [selection, setSelection] = useState<Extract<WorkGraphSelection, { kind: 'node' }>>(initial ?? { kind: 'node', id: entity.id });
  return <WorkNodePane node={entity} detail={detail} selection={selection} onSelectionChange={(next) => next?.kind === 'node' && setSelection(next)} onClose={() => {}} onReference={onReference} />;
}

describe('a run pane says what the card says, and more', () => {
  it('drops a banner description that only repeats the pane title', () => {
    render(<WorkNodePane node={node('deck', 'document', 'audit-e2e-1790150600')} detail={{ subtitle: 'Presentation · Yours', banner: { tone: 'success', title: 'v4 ready', description: 'audit-e2e-1790150600' } }} selection={{ kind: 'node', id: 'deck' }} onSelectionChange={vi.fn()} onClose={vi.fn()} />);
    const banner = screen.getByTestId('work-pane-banner');
    expect(banner).toHaveTextContent('v4 ready');
    expect(banner).not.toHaveTextContent('audit-e2e-1790150600');
  });

  it('shows the instruction verbatim and the card lines, without repeating the banner', () => {
    const run = node('edit', 'run', 'Edit Sprint review · Shorter title', { status: 'completed', capabilities: ['view-run'] });
    render(<Harness entity={run} detail={{
      subtitle: 'Presentation edit',
      banner: { tone: 'success', title: 'Completed', description: 'Wrote v7 of Sprint review' },
      excerpt: 'Make the title name what the transcript decided',
      lines: ['Wrote v7 of Sprint review', 'Slide 2 “Transcript” · title', 'v6 → v7'],
      actions: [{ id: 'open', label: 'Open presentation at v7', selection: { kind: 'node', id: 'deck', revisionId: 'v7' } }],
    }} />);
    expect(screen.getByTestId('activity-inspector-excerpt')).toHaveTextContent('“Make the title name what the transcript decided”');
    const lines = within(screen.getByTestId('activity-inspector-lines')).getAllByRole('listitem').map((item) => item.textContent);
    expect(lines).toEqual(['Slide 2 “Transcript” · title', 'v6 → v7']);
    expect(screen.getAllByText('Wrote v7 of Sprint review')).toHaveLength(1);
  });

  it('skips a line the description or subtitle already says (WORK-144)', () => {
    const project = node('work-144', 'project', 'WORK-144', { status: 'running' });
    render(<Harness entity={project} detail={{
      subtitle: 'Project · 09:00 – 09:40 · Gateway · Coverage checks',
      sections: { description: 'Gateway · Coverage checks' },
      lines: ['Gateway · Coverage checks', 'gateway  ·  coverage checks', '3 of 5 checks passing', '3 of 5 checks passing', 'v2'],
    }} />);
    const lines = within(screen.getByTestId('activity-inspector-lines')).getAllByRole('listitem').map((item) => item.textContent);
    expect(lines).toEqual(['3 of 5 checks passing', 'v2']);
  });

  it('leaves an artifact’s lines to its own inspector', () => {
    const deck = node('deck', 'document', 'Sprint review');
    render(<Harness entity={deck} detail={{ ...artifactDetail(false), lines: ['v3 generating · v2 available'], excerpt: 'quoted' }} />);
    expect(screen.queryByTestId('activity-inspector-lines')).not.toBeInTheDocument();
    expect(screen.queryByTestId('activity-inspector-excerpt')).not.toBeInTheDocument();
  });
});

describe('per-kind detail panes', () => {
  it('shows the artifact pane with revisions, slides and a reference that carries the exact page', () => {
    const detail = artifactDetail(false);
    const onReference = vi.fn();
    render(<Harness entity={node('deck', 'document', 'Sprint review')} detail={detail} onReference={onReference} />);
    expect(screen.getByTestId('activity-inspector-subtitle')).toHaveTextContent('Presentation · Shared with you');
    expect(screen.getByTestId('work-pane-banner')).toHaveAttribute('data-tone', 'info');
    expect(screen.getByTestId('work-pane-banner')).toHaveTextContent('Generating v3');
    const pending = screen.getByRole('tab', { name: /v3/ });
    expect(pending).toBeDisabled();
    expect(screen.getByText('Slide 4 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(screen.getByText('Slide 1 of 2')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open larger preview' }));
    expect(detail.artifact!.onOpenPreview).toHaveBeenCalledWith('v2', 'v2-slide-1');
    fireEvent.click(screen.getByRole('button', { name: 'Reference in chat' }));
    expect(onReference).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'v2', anchorId: 'v2-slide-1' });
  });

  // Regression: the pane's slide preview (a 1280×720 SVG served as an object
  // URL by the host) was once clipped into a black ellipse because its box
  // carried `rounded-full`. It is a 16:9 rounded RECTANGLE with a neutral
  // border, never a circle.
  it('frames the artifact preview as a 16:9 rectangle, never a circle', () => {
    render(<Harness entity={node('deck', 'document', 'Sprint review')} detail={artifactDetail(false)} />);
    const box = screen.getByLabelText('v2 preview');
    expect(box.className).not.toContain('rounded-full');
    expect(box.className).toContain('aspect-video');
    expect(box.className).toContain('rounded-lg');
    expect(box.className).toContain('border-border');
  });

  it('offers no pending tab and routes to the run when the attempt failed', () => {
    const onSelectionChange = vi.fn();
    render(<WorkNodePane node={node('deck', 'document', 'Sprint review')} detail={artifactDetail(true)} selection={{ kind: 'node', id: 'deck' }} onSelectionChange={onSelectionChange} onClose={() => {}} />);
    expect(screen.getByTestId('work-pane-banner')).toHaveAttribute('data-tone', 'error');
    expect(screen.queryByRole('tab', { name: /v3/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Inspect run' }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'agent' });
  });

  it('opens a source row as a new selection', () => {
    const onSelectionChange = vi.fn();
    render(<WorkNodePane node={node('deck', 'document', 'Sprint review')} detail={artifactDetail(false)} selection={{ kind: 'node', id: 'deck' }} onSelectionChange={onSelectionChange} onClose={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /Planning sync transcript/ }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'transcript' });
  });

  it('reads a transcript and asks it a question through the host', async () => {
    const onAsk = vi.fn(() => ({ text: 'Review the release risks before noon.', citations: [{ id: 'c1', label: '08:42 in transcript' }], note: 'Grounded in the shared transcript.' }));
    const detail: WorkActivityNodeDetail = {
      subtitle: 'Meeting transcript · Shared with you',
      banner: { tone: 'success', title: 'Transcript ready', description: 'Planning sync · 08:30–09:00 · 2 speakers' },
      transcript: { segments: [{ id: 's1', at: '08:42', speaker: 'Connor', text: 'Frank, can you review the release risks?' }], ask: { enabled: true, onAsk } },
    };
    render(<Harness entity={node('meeting', 'meeting', 'Planning sync')} detail={detail} />);
    expect(screen.getByText('Frank, can you review the release risks?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Ask' }));
    fireEvent.change(screen.getByPlaceholderText('Anything for me?'), { target: { value: 'Anything for me?' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ask' }));
    await waitFor(() => expect(screen.getByTestId('work-ask-answer')).toHaveTextContent('Review the release risks before noon.'));
    expect(onAsk).toHaveBeenCalledWith('Anything for me?');
    expect(within(screen.getByTestId('work-ask-answer')).getByText('08:42 in transcript')).toBeInTheDocument();
  });

  it('says so instead of answering when Ask is unavailable', () => {
    const detail: WorkActivityNodeDetail = { transcript: { segments: [], ask: { enabled: false, unavailableLabel: 'Ask is unavailable for this transcript.', onAsk: vi.fn() } } };
    render(<Harness entity={node('meeting', 'meeting', 'Planning sync')} detail={detail} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Ask' }));
    expect(screen.getByText('Ask is unavailable for this transcript.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ask' })).not.toBeInTheDocument();
  });

  it('shows a run pane with its inputs, tools and one way on', () => {
    const onSelectionChange = vi.fn();
    const detail: WorkActivityNodeDetail = {
      subtitle: 'Presentation agent · Running',
      banner: { tone: 'info', title: 'Presentation agent running', description: 'Creating the next revision of Sprint review' },
      sections: { inputs: ['Planning sync transcript', 'Release plan · rev 6'], tools: ['Slides', 'Charts', 'Files'] },
      actions: [{ id: 'v2', label: 'Inspect available v2', selection: { kind: 'node', id: 'deck', revisionId: 'v2' } }],
    };
    render(<WorkNodePane node={node('agent', 'run', 'Generate presentation')} detail={detail} selection={{ kind: 'node', id: 'agent' }} onSelectionChange={onSelectionChange} onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Inputs' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tools in this run' })).toBeInTheDocument();
    expect(screen.getByText('Release plan · rev 6')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Inspect available v2' }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'deck', revisionId: 'v2' });
  });

  it('keeps two inputs apart when they read the same', () => {
    const detail: WorkActivityNodeDetail = {
      sections: { inputs: [{ id: 'a', title: 'Release plan', meta: 'rev 6' }, { id: 'b', title: 'Release plan', meta: 'rev 4' }, 'Planning sync transcript'] },
    };
    render(<WorkNodePane node={node('agent', 'run', 'Generate presentation')} detail={detail} selection={{ kind: 'node', id: 'agent' }} onSelectionChange={vi.fn()} onClose={() => {}} />);
    expect(screen.getAllByText('Release plan')).toHaveLength(2);
    expect(screen.getByText('Planning sync transcript')).toBeInTheDocument();
  });

  it('shows a context pane for an input document and a work item', () => {
    const detail: WorkActivityNodeDetail = {
      subtitle: 'Shared with you',
      banner: { tone: 'success', title: 'Project documents', description: 'Shared work context' },
      sections: { description: 'Release plan · Revision 6. Used with the meeting transcript.' },
    };
    render(<Harness entity={node('docs', 'document', 'Project documents')} detail={detail} />);
    expect(screen.getByText('Release plan · Revision 6. Used with the meeting transcript.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sources used' })).not.toBeInTheDocument();
  });

  it('shows the terminal pane work item and says what it cannot show', () => {
    const onSelectionChange = vi.fn();
    const detail: WorkActivityNodeDetail = {
      subtitle: 'Cloud project · Shared with you',
      banner: { tone: 'info', title: 'Tests running in cloud terminal', description: 'Session started 09:15 · Shared with you' },
      sections: { workItem: { id: 'workitem', title: 'WORK-144', meta: 'Gateway · Coverage checks', selection: { kind: 'node', id: 'workitem' } } },
      note: 'Terminal output depends on an authorized observation capability.',
    };
    render(<WorkNodePane node={node('terminal', 'terminal', 'Cloud terminal')} detail={detail} selection={{ kind: 'node', id: 'terminal' }} onSelectionChange={onSelectionChange} onClose={() => {}} />);
    expect(screen.getByRole('heading', { name: 'Work item' })).toBeInTheDocument();
    expect(screen.getByText('Terminal output depends on an authorized observation capability.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /WORK-144/ }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'node', id: 'workitem' });
  });

  it('leaks nothing for a restricted node and offers no reference', () => {
    const onReference = vi.fn();
    render(<WorkNodePane node={node('secret', 'run', 'Secret run', { locked: true, disclosure: 'existence' })} detail={artifactDetail(false)} selection={{ kind: 'node', id: 'secret' }} onSelectionChange={vi.fn()} onClose={() => {}} onReference={onReference} />);
    expect(screen.getByTestId('activity-inspector-title')).toHaveTextContent('Restricted work item');
    expect(screen.queryByTestId('work-pane-banner')).not.toBeInTheDocument();
    expect(screen.queryByText('Planning sync transcript')).not.toBeInTheDocument();
    expect(screen.getByText('Only the existence of this work is shared with you.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Reference in chat' })).not.toBeInTheDocument();
  });

  it('closes from its own control', () => {
    const onClose = vi.fn();
    render(<WorkNodePane node={node('docs', 'document', 'Project documents')} selection={{ kind: 'node', id: 'docs' }} onSelectionChange={vi.fn()} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close details' }));
    expect(onClose).toHaveBeenCalled();
  });
});
