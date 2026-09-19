import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkReferenceCard } from '../WorkReferenceCard';
import type { WorkGraphEdgeData, WorkGraphNodeData } from '../types';

const node: WorkGraphNodeData = { id: 'node-1', kind: 'document', title: 'Visible document', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T15:00:00.000Z', capabilities: ['view-document'] };
const edge: WorkGraphEdgeData = { id: 'edge-1', fromId: 'a', toId: 'b', relation: 'produced', label: 'Produced by run', status: 'completed', disclosure: 'summary', updatedAt: '2026-09-19T15:00:00.000Z', capabilities: [] };

describe('WorkReferenceCard', () => {
  it('renders loading without sender fallback content', () => {
    render(<WorkReferenceCard target={{ kind: 'node', id: 'secret' }} state="loading" />);
    expect(screen.getByRole('article')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText('secret')).not.toBeInTheDocument();
  });
  it.each(['deleted', 'denied', 'revoked'])('uses the same generic unavailable result for %s targets', () => {
    render(<WorkReferenceCard target={{ kind: 'node', id: `private-${Math.random()}` }} state="unavailable" />);
    expect(screen.getByText('This work item is unavailable.')).toBeInTheDocument();
  });
  it('selects and keyboard-opens an authorized node', () => {
    const onSelect = vi.fn(); const onOpen = vi.fn();
    render(<WorkReferenceCard target={{ kind: 'node', id: node.id }} state="available" node={node} onSelect={onSelect} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select reference: Visible document' }));
    const open = screen.getByRole('button', { name: 'Open shared work' });
    expect(open.tagName).toBe('BUTTON');
    fireEvent.click(open);
    expect(onSelect).toHaveBeenCalledWith({ kind: 'node', id: 'node-1' });
    expect(onOpen).toHaveBeenCalledWith({ kind: 'node', id: 'node-1' });
  });
  it('renders an edge but no open action without a capability', () => {
    render(<WorkReferenceCard target={{ kind: 'edge', id: edge.id }} state="available" edge={edge} onOpen={vi.fn()} />);
    expect(screen.getByText('Produced by run')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Open shared work' })).not.toBeInTheDocument();
  });
  it('does not reveal a locked node title', () => {
    render(<WorkReferenceCard target={{ kind: 'node', id: 'locked' }} state="available" node={{ ...node, id: 'locked', title: 'Private title', locked: true, capabilities: [] }} />);
    expect(screen.getByText('Restricted work item')).toBeInTheDocument();
    expect(screen.queryByText('Private title')).not.toBeInTheDocument();
  });
});
