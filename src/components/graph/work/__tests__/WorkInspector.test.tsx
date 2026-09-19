import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkEntityList } from '../WorkEntityList';
import { WorkInspector } from '../WorkInspector';
import type { WorkGraphEdgeData, WorkGraphNodeData } from '../types';

const nodes: WorkGraphNodeData[] = [
  { id: 'document-1', kind: 'document', title: 'Release notes', description: 'Allowed summary', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T15:00:00.000Z', capabilities: ['view-document', 'edit-document'] },
  { id: 'locked-1', kind: 'task', title: 'Private title', description: 'Private details', locked: true, status: 'idle', disclosure: 'existence', updatedAt: '1970-01-01T00:00:00.000Z', capabilities: [] },
];
const edges: WorkGraphEdgeData[] = [{ id: 'edge-1', fromId: 'document-1', toId: 'locked-1', relation: 'produced', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T15:01:00.000Z', capabilities: [] }];

describe('WorkEntityList', () => {
  it('selects permitted nodes and edges by their stable graph IDs', () => {
    const onSelectionChange = vi.fn();
    render(<WorkEntityList nodes={nodes} edges={edges} selection={null} onSelectionChange={onSelectionChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Work item: Release notes' }));
    fireEvent.click(screen.getByRole('button', { name: /Relationship:/ }));
    expect(onSelectionChange).toHaveBeenNthCalledWith(1, { kind: 'node', id: 'document-1' });
    expect(onSelectionChange).toHaveBeenNthCalledWith(2, { kind: 'edge', id: 'edge-1' });
    expect(screen.queryByText('Private title')).not.toBeInTheDocument();
  });
  it('exposes selected state to assistive technology', () => {
    render(<WorkEntityList nodes={nodes} edges={edges} selection={{ kind: 'edge', id: 'edge-1' }} onSelectionChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: /Relationship:/ })).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('WorkInspector', () => {
  it('reports open, reference, and capability-specific collaboration callbacks', () => {
    const onOpen = vi.fn(); const onReference = vi.fn(); const onRequestCollaboration = vi.fn();
    const selection = { kind: 'node' as const, id: 'document-1' };
    render(<WorkInspector nodes={nodes} edges={edges} selection={selection} onSelectionChange={vi.fn()} onOpen={onOpen} onReference={onReference} onRequestCollaboration={onRequestCollaboration} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reference' }));
    fireEvent.click(screen.getByRole('button', { name: 'Edit document' }));
    expect(onOpen).toHaveBeenCalledWith(selection);
    expect(onReference).toHaveBeenCalledWith(selection);
    expect(onRequestCollaboration).toHaveBeenCalledWith(selection, 'edit-document');
  });
  it('does not render actions absent a callback or explicit capability', () => {
    render(<WorkInspector nodes={nodes} edges={edges} selection={{ kind: 'edge', id: 'edge-1' }} onSelectionChange={vi.fn()} onOpen={vi.fn()} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
  it('clears a selection removed by revocation', async () => {
    const onSelectionChange = vi.fn();
    render(<WorkInspector nodes={[]} edges={[]} selection={{ kind: 'node', id: 'document-1' }} onSelectionChange={onSelectionChange} />);
    await waitFor(() => expect(onSelectionChange).toHaveBeenCalledWith(null));
  });
});
