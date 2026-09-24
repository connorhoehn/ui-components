import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { WorkOmittedGroup } from '../WorkOmittedGroup';
import type { WorkActivityOmitted, WorkGraphNodeData } from '../types';

const item = (id: string, kind: WorkGraphNodeData['kind'] = 'run'): WorkGraphNodeData => ({
  id, kind, title: `Item ${id}`, status: 'completed', disclosure: 'details', updatedAt: '2026-09-24T10:00:00.000Z', capabilities: [],
});
function omitted(patch: Partial<WorkActivityOmitted> = {}): WorkActivityOmitted {
  return { count: 1552, expanded: false, items: [], hasMore: true, onExpand: vi.fn(), onCollapse: vi.fn(), onLoadMore: vi.fn(), ...patch };
}

describe('WorkOmittedGroup (realtime-examples NFR #221)', () => {
  it('collapsed: one line with the count, and Show asks the host to expand', () => {
    const state = omitted();
    render(<WorkOmittedGroup omitted={state} />);
    expect(screen.getByTestId('work-omitted-group').dataset.expanded).toBe('false');
    expect(screen.getByText(`${(1552).toLocaleString()} more earlier`)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Show .* earlier items/ }));
    expect(state.onExpand).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('work-omitted-items')).toBeNull();
  });

  it('expanded: lists the paged items and pages the next set on demand', () => {
    const state = omitted({ expanded: true, items: [item('a'), item('b', 'document')], pageSize: 50 });
    render(<WorkOmittedGroup omitted={state} timezone="UTC" />);
    expect(screen.getAllByText(/^Item /)).toHaveLength(2);
    expect(screen.getByText(/Document ·/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Load 50 more' }));
    expect(state.onLoadMore).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Collapse' }));
    expect(state.onCollapse).toHaveBeenCalledTimes(1);
  });

  it('while a page loads the control says so and cannot be pressed twice; the last page has no control', () => {
    const { rerender } = render(<WorkOmittedGroup omitted={omitted({ expanded: true, items: [item('a')], loading: true })} />);
    expect((screen.getByRole('button', { name: 'Loading…' }) as HTMLButtonElement).disabled).toBe(true);
    rerender(<WorkOmittedGroup omitted={omitted({ expanded: true, items: [item('a')], hasMore: false })} />);
    expect(screen.queryByRole('button', { name: /Load|Loading/ })).toBeNull();
  });

  it('shows a failed page in the group', () => {
    render(<WorkOmittedGroup omitted={omitted({ expanded: true, error: 'Earlier work is unavailable right now.' })} />);
    expect(screen.getByText('Earlier work is unavailable right now.')).toBeTruthy();
  });
});
