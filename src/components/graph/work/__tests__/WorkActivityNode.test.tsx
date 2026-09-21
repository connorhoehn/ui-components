import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkActivityNode } from '../WorkActivityNode';
import type { WorkActivityNodeDetail, WorkGraphNodeData } from '../types';

const at = '2026-09-21T13:45:00Z';
const node = (id: string, kind: WorkGraphNodeData['kind'], title: string, status: WorkGraphNodeData['status'] = 'idle'): WorkGraphNodeData =>
  ({ id, kind, title, status, disclosure: 'details', capabilities: [], updatedAt: at });

const show = (entity: WorkGraphNodeData, detail?: WorkActivityNodeDetail, onSelect = vi.fn()) => {
  render(<WorkActivityNode node={entity} detail={detail} selected={false} live onSelect={onSelect} onFeedback={vi.fn()} />);
  return onSelect;
};

describe('Active Now node card', () => {
  it('is one hit target: header, body and footer all select the card', () => {
    const onSelect = vi.fn();
    show(node('terminal', 'terminal', 'Cloud terminal', 'running'), {
      fresh: true, lines: ['Gateway / WORK-144'], badge: 'Tests running', footer: { label: 'Cloud session · 09:15', note: 'Shared' },
    }, onSelect);
    for (const text of ['Cloud terminal', 'Gateway / WORK-144', 'Cloud session · 09:15']) fireEvent.click(screen.getByText(text));
    expect(onSelect).toHaveBeenCalledTimes(3);
    expect(onSelect).toHaveBeenLastCalledWith({ kind: 'node', id: 'terminal' });
  });

  it('activates from the keyboard on the card itself', () => {
    const onSelect = show(node('docs', 'document', 'Project documents'), { lines: ['Release plan · rev 6'] });
    fireEvent.keyDown(screen.getByRole('button', { name: /Project documents/ }), { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith({ kind: 'node', id: 'docs' });
  });

  it('colours the border by what is happening, and the accent bar by what this is', () => {
    const { container, rerender } = render(<WorkActivityNode node={node('agent', 'run', 'Generate presentation', 'error')} detail={{ lines: ['Presentation agent'] }} selected={false} live onSelect={vi.fn()} />);
    const card = () => container.querySelector('[data-work-card]')!;
    expect(card().className).toContain('border-danger');
    rerender(<WorkActivityNode node={node('agent', 'run', 'Generate presentation', 'running')} detail={{ fresh: true, lines: ['Presentation agent'] }} selected={false} live onSelect={vi.fn()} />);
    expect(card().className).toContain('border-info');
    // A finished artifact with something to read is green, not blue.
    rerender(<WorkActivityNode node={node('deck', 'document', 'Sprint review', 'completed')} detail={{ artifact: { revisions: [{ id: 'v2', label: 'v2', createdAt: at }] } }} selected={false} live onSelect={vi.fn()} />);
    expect(card().className).toContain('border-success');
    // Kind still owns the accent bar when nothing is in flight.
    rerender(<WorkActivityNode node={node('meeting', 'meeting', 'Planning sync', 'completed')} detail={{ emphasis: 'earlier', lines: ['08:30–09:00'] }} selected={false} live onSelect={vi.fn()} />);
    expect(card().querySelector('span[aria-hidden="true"]')!.className).toContain('bg-cat-human');
  });

  it('shows who was in the meeting, and says how many more', () => {
    show(node('meeting', 'meeting', 'Planning sync', 'completed'), {
      emphasis: 'earlier', lines: ['08:30–09:00 · 30 min'],
      participants: [{ id: 'a', label: 'Connor' }, { id: 'b', label: 'Frank' }, { id: 'c', label: 'Grace' }],
    });
    expect(screen.getByText('Connor, Frank +1')).toBeInTheDocument();
  });

  it('hangs a run’s tools off the card rather than inside it', () => {
    const { container } = render(<WorkActivityNode node={node('agent', 'run', 'Generate presentation', 'running')} detail={{ fresh: true, lines: ['Presentation agent · 3 tools'], tools: ['Slides', 'Charts', 'Files'] }} selected={false} live onSelect={vi.fn()} />);
    const tools = screen.getByText('Slides');
    expect(container.querySelector('[data-work-card]')!.contains(tools)).toBe(false);
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('invents no badge, no footer and no empty preview', () => {
    const { container } = render(<WorkActivityNode node={node('docs', 'document', 'Project documents', 'completed')} detail={{ lines: ['Release plan · rev 6 · 09:08'], artifact: { revisions: [{ id: 'v1', label: 'v1', createdAt: at }] } }} selected={false} live onSelect={vi.fn()} />);
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
    expect(screen.queryByText(/Updated/)).not.toBeInTheDocument();
    expect(screen.queryByText('Preview unavailable')).not.toBeInTheDocument();
    expect(container.querySelector('[aria-label*="preview"]')).toBeNull();
    // The revision chips still say what exists.
    expect(within(container.querySelector('[aria-label="Project documents revisions"]')!).getByText('v1')).toBeInTheDocument();
  });

  it('shows the host’s thumbnail when there is one', () => {
    show(node('deck', 'document', 'Sprint review', 'running'), {
      fresh: true, lines: ['v3 generating · v2 available'],
      artifact: { revisions: [{ id: 'v2', label: 'v2', createdAt: at, preview: <span>Release readiness</span> }], pending: { id: 'v3', label: 'v3', status: 'generating' } },
    });
    expect(screen.getByLabelText('Sprint review v2 preview')).toHaveTextContent('Release readiness');
    expect(screen.getByText('v3 generating')).toBeInTheDocument();
  });

  it('leaks no detail for a restricted item', () => {
    show({ ...node('secret', 'run', 'Secret run', 'running'), locked: true, disclosure: 'existence' }, { lines: ['Presentation agent'], badge: 'Ready', excerpt: 'nope' });
    expect(screen.getByText('Restricted work item')).toBeInTheDocument();
    expect(screen.queryByText('Presentation agent')).not.toBeInTheDocument();
    expect(screen.queryByText('Ready')).not.toBeInTheDocument();
  });
});
