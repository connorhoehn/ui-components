import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { WorkEdge } from '../WorkEdge';
import type { WorkGraphEdgeData } from '../types';

const edge = (overrides: Partial<WorkGraphEdgeData> = {}): WorkGraphEdgeData => ({
  id: 'edge-1',
  fromId: 'agent-1',
  toId: 'doc-1',
  relation: 'edited',
  label: 'Editing release notes',
  status: 'running',
  disclosure: 'details',
  updatedAt: '2026-09-19T15:00:00.000Z',
  capabilities: [],
  ...overrides,
});

describe('WorkEdge', () => {
  it('selects with pointer, Enter, and Space using native button semantics', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <WorkEdge
        edge={edge()}
        fromLabel="Build agent"
        toLabel="Release notes"
        onSelect={onSelect}
      />,
    );

    const control = screen.getByRole('button', {
      name: 'Build agent: edited Release notes',
    });
    await user.click(control);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(onSelect).toHaveBeenCalledTimes(3);
    expect(onSelect).toHaveBeenCalledWith('edge-1');
  });

  it('exposes selected, hover, focus, relation, status, and disclosure state', () => {
    render(
      <WorkEdge
        edge={edge({ relation: 'derived-from', status: 'waiting', disclosure: 'summary' })}
        selected
        fromLabel="Draft"
        toLabel="Source"
      />,
    );

    const control = screen.getByRole('button', { name: 'Draft: derived from Source' });
    expect(control).toHaveAttribute('aria-pressed', 'true');
    expect(control).toHaveAttribute('data-relation', 'derived-from');
    expect(control).toHaveAttribute('data-status', 'waiting');
    expect(control).toHaveAttribute('data-disclosure', 'summary');
    expect(control).toHaveClass('border-primary', 'focus-visible:ring-2');
    expect(screen.getByRole('status')).toHaveTextContent('Waiting');
  });

  it('uses a generic label for existence-only edges', () => {
    render(
      <WorkEdge
        edge={edge({ label: 'Private project codename', disclosure: 'existence' })}
        fromLabel="Shared item"
        toLabel="Restricted work item"
      />,
    );

    expect(screen.getByText('Shared connection')).toBeInTheDocument();
    expect(screen.queryByText('Private project codename')).not.toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAccessibleName(
      'Shared item: edited Restricted work item, details restricted',
    );
  });

  it('disables transitions when reduced motion is requested', () => {
    const { rerender } = render(
      <WorkEdge edge={edge()} fromLabel="Agent" toLabel="Document" reducedMotion />,
    );
    const control = screen.getByRole('button');
    expect(control).toHaveAttribute('data-reduced-motion', 'true');
    expect(control).not.toHaveClass('transition-colors');

    rerender(<WorkEdge edge={edge()} fromLabel="Agent" toLabel="Document" />);
    expect(control).toHaveAttribute('data-reduced-motion', 'false');
    expect(control).toHaveClass('transition-colors', 'hover:bg-surface-hover');
  });
});
