import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkActivityTimeline } from '../WorkActivityTimeline';
import type { WorkGraphEdgeData, WorkGraphNodeData } from '../types';

const nodes: WorkGraphNodeData[] = [
  { id: 'p', kind: 'project', title: 'Visible project', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T15:10:00Z', capabilities: [] },
  { id: 'd', kind: 'document', title: 'Visible document', status: 'completed', disclosure: 'summary', updatedAt: '2026-09-19T17:00:00Z', capabilities: [] },
];
const edges: WorkGraphEdgeData[] = [
  { id: 'e', fromId: 'p', toId: 'd', relation: 'produced', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T16:00:00Z', capabilities: [] },
];

describe('WorkActivityTimeline', () => {
  it('places only visible activity on the selected local day and selects an edge', () => {
    const onSelectionChange = vi.fn();
    render(<WorkActivityTimeline day="2026-09-19" timezone="America/New_York" nodes={nodes} edges={edges} selection={null} onSelectionChange={onSelectionChange} />);
    expect(screen.getByText(/3 visible work items across 3 hours/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Browse activity'));
    fireEvent.click(screen.getByRole('button', { name: /Visible project → Visible document/ }));
    expect(onSelectionChange).toHaveBeenCalledWith({ kind: 'edge', id: 'e' });
  });

  it('does not disclose timestamps or labels from other days', () => {
    render(<WorkActivityTimeline day="2026-09-18" timezone="America/New_York" nodes={nodes} edges={edges} selection={null} onSelectionChange={vi.fn()} />);
    expect(screen.getByText('No visible activity recorded for this day.')).toBeInTheDocument();
    expect(screen.queryByText('Browse activity')).not.toBeInTheDocument();
  });
});
