import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkSharingControls } from '../WorkSharingControls';
import type { WorkGraphEdgeData, WorkGraphNodeData, WorkSharingControlsProps, WorkSharingFormValue } from '../types';

const nodes: WorkGraphNodeData[] = [
  { id: 'node-1', kind: 'document', title: 'Release notes', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T12:00:00Z', capabilities: [] },
  { id: 'node-2', kind: 'terminal', title: 'Build terminal', status: 'idle', disclosure: 'summary', updatedAt: '2026-09-19T12:00:00Z', capabilities: [] },
];
const edges: WorkGraphEdgeData[] = [
  { id: 'edge-1', fromId: 'node-2', toId: 'node-1', relation: 'produced', label: 'Produced release notes', status: 'running', disclosure: 'summary', updatedAt: '2026-09-19T12:00:00Z', capabilities: [] },
];
const value: WorkSharingFormValue = {
  audience: { kind: 'people', personIds: ['person-approved'] },
  selectedNodeIds: [],
  selectedEdgeIds: [],
  disclosure: 'summary',
  expiresAt: '2026-09-19T17:00',
};

function props(overrides: Partial<WorkSharingControlsProps> = {}): WorkSharingControlsProps {
  return {
    state: 'off',
    value,
    availableNodes: nodes,
    availableEdges: edges,
    onChange: vi.fn(),
    onStart: vi.fn(),
    onPause: vi.fn(),
    onResume: vi.fn(),
    onStop: vi.fn(),
    ...overrides,
  };
}

describe('WorkSharingControls', () => {
  it('is off by default and does not imply server acknowledgement', () => {
    render(<WorkSharingControls {...props()} />);
    expect(screen.getByText('Off')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start sharing' })).toBeEnabled();
    expect(screen.queryByText(/success|shared successfully/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: /Share selected history/ })).not.toBeChecked();
  });

  it('reports node and relationship selection as distinct controlled changes', () => {
    const onChange = vi.fn();
    render(<WorkSharingControls {...props({ onChange })} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Release notes/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Produced release notes/ }));
    expect(onChange).toHaveBeenNthCalledWith(1, { ...value, selectedNodeIds: ['node-1'] });
    expect(onChange).toHaveBeenNthCalledWith(2, { ...value, selectedEdgeIds: ['edge-1'] });
  });

  it('reports disclosure and live expiry through the controlled value', () => {
    const onChange = vi.fn();
    render(<WorkSharingControls {...props({ onChange })} />);
    fireEvent.change(screen.getByLabelText('Detail shared'), { target: { value: 'existence' } });
    fireEvent.change(screen.getByLabelText('Live sharing expires'), { target: { value: '2026-09-19T18:30' } });
    expect(onChange).toHaveBeenNthCalledWith(1, { ...value, disclosure: 'existence' });
    expect(onChange).toHaveBeenNthCalledWith(2, { ...value, expiresAt: '2026-09-19T18:30' });
  });

  it('requires an explicit history choice and controls its separate range and expiry', () => {
    const onChange = vi.fn();
    const { rerender } = render(<WorkSharingControls {...props({ onChange })} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Share selected history/ }));
    expect(onChange).toHaveBeenCalledWith({
      ...value,
      history: { dayFrom: '', dayThrough: '', expiresAt: value.expiresAt },
    });

    const withHistory = { ...value, history: { dayFrom: '2026-09-17', dayThrough: '2026-09-18', expiresAt: '2026-09-20T10:00' } };
    rerender(<WorkSharingControls {...props({ value: withHistory, onChange })} />);
    fireEvent.change(screen.getByLabelText('First day'), { target: { value: '2026-09-16' } });
    expect(onChange).toHaveBeenLastCalledWith({ ...withHistory, history: { ...withHistory.history, dayFrom: '2026-09-16' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /Share selected history/ }));
    expect(onChange).toHaveBeenLastCalledWith({ ...withHistory, history: undefined });
  });

  it.each([
    ['active', 'Pause sharing', 'onPause'],
    ['paused', 'Resume sharing', 'onResume'],
    ['active', 'Stop sharing', 'onStop'],
    ['stopped', 'Start sharing again', 'onStart'],
  ] as const)('provides the %s lifecycle action %s', (state, label, callback) => {
    const callbacks = { onStart: vi.fn(), onPause: vi.fn(), onResume: vi.fn(), onStop: vi.fn() };
    render(<WorkSharingControls {...props({ state, ...callbacks })} />);
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(callbacks[callback]).toHaveBeenCalledOnce();
  });

  it('shows saving, error, and conflict states without claiming success', () => {
    render(<WorkSharingControls {...props({ state: 'active', saving: true, error: 'Unable to save', conflict: true })} />);
    expect(screen.getByRole('status')).toHaveTextContent('Saving sharing settings');
    expect(screen.getByText('Unable to save')).toBeInTheDocument();
    expect(screen.getByText(/changed elsewhere/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause sharing' })).toBeDisabled();
    expect(screen.queryByText(/success|saved successfully/i)).not.toBeInTheDocument();
  });

  it('represents only the controlled audience and offers no arbitrary viewer input', () => {
    render(<WorkSharingControls {...props()} />);
    expect(screen.getByRole('list', { name: 'Current sharing audience' })).toHaveTextContent('person-approved');
    expect(screen.queryByRole('textbox', { name: /audience|person|viewer/i })).not.toBeInTheDocument();
  });
});

describe('WorkSharingControls on a real day', () => {
  const many: WorkGraphNodeData[] = Array.from({ length: 250 }, (_, i) => ({ ...nodes[0], id: `n-${i}`, title: i === 137 ? 'Sprint review' : `Step ${i}` }));

  it('keeps hundreds of work items in a bounded, filterable list', () => {
    const onChange = vi.fn();
    render(<WorkSharingControls {...props({ availableNodes: many, value: { ...value, selectedNodeIds: ['n-1', 'n-2'] }, onChange })} />);
    const items = screen.getByTestId('work-sharing-work-items');
    expect(items).toHaveTextContent('2 of 250 selected');
    const list = items.querySelector('[data-testid="work-sharing-checklist"]')!;
    expect(list.className).toContain('max-h-72');
    expect(list.className).toContain('overflow-y-auto');
    // Look the filter up by placeholder, then assert its accessible name directly:
    // getByLabelText walks every <label>/element pair, which is quadratic in jsdom
    // and took ~10s with 250 checklist rows (the source of the load-sensitive timeout).
    const filter = within(items).getByPlaceholderText('Filter work items');
    expect(filter).toHaveAttribute('aria-label', 'Filter work items');
    fireEvent.change(filter, { target: { value: 'sprint' } });
    expect(list.querySelectorAll('label')).toHaveLength(1);
    fireEvent.click(screen.getByLabelText(/Sprint review/));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ selectedNodeIds: ['n-1', 'n-2', 'n-137'] }));
  });

  it('shows no filter for a short list', () => {
    render(<WorkSharingControls {...props()} />);
    expect(screen.queryByLabelText('Filter work items')).toBeNull();
  });
});
