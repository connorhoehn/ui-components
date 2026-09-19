import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkNode } from '../WorkNode';
import type { WorkGraphNodeData } from '../types';

const node = (overrides: Partial<WorkGraphNodeData> = {}): WorkGraphNodeData => ({
  id: 'doc-1',
  kind: 'document',
  title: 'A document',
  description: 'A safe summary',
  status: 'running',
  disclosure: 'summary',
  updatedAt: '2026-09-19T15:00:00.000Z',
  capabilities: ['view-document'],
  ...overrides,
});

describe('WorkNode', () => {
  it('renders every frozen kind with a kind label and status', () => {
    const kinds: WorkGraphNodeData['kind'][] = [
      'project', 'terminal', 'agent', 'run', 'document', 'change',
      'conversation', 'meeting', 'transcript', 'task',
    ];
    for (const kind of kinds) {
      const { unmount } = render(<WorkNode node={node({ id: kind, kind })} />);
      expect(screen.getByTestId('work-node-title')).toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
      unmount();
    }
  });

  it('selects with click, Enter, and Space', () => {
    const onSelect = vi.fn();
    render(<WorkNode node={node()} onSelect={onSelect} />);
    const root = screen.getByRole('button', { name: /Document: A document/ });
    fireEvent.keyDown(root, { key: 'Enter' });
    fireEvent.keyDown(root, { key: ' ' });
    fireEvent.click(root);
    expect(onSelect).toHaveBeenCalledTimes(3);
    expect(onSelect).toHaveBeenCalledWith('doc-1');
  });

  it('uses a sanitized locked placeholder and avatar fallback', () => {
    render(<WorkNode node={node({ locked: true, title: 'secret document', description: 'secret text', avatarUrl: 'https://secret.invalid/avatar' })} />);
    expect(screen.getByTestId('work-node-title')).toHaveTextContent('Restricted work item');
    expect(screen.queryByText('secret text')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText('secret document')).not.toBeInTheDocument();
  });

  it('only offers an authorized action and disables it without a callback', () => {
    const onOpen = vi.fn();
    const { rerender } = render(<WorkNode node={node({ capabilities: [] })} onOpen={onOpen} />);
    expect(screen.queryByRole('button', { name: /view document/i })).not.toBeInTheDocument();
    rerender(<WorkNode node={node()} />);
    expect(screen.getByRole('button', { name: /view document/i })).toBeDisabled();
    rerender(<WorkNode node={node()} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: /view document/i }));
    expect(onOpen).toHaveBeenCalledWith('doc-1');
  });
});
