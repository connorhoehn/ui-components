import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RecordGraphCard, recordGraphSummary } from '../RecordGraphCard';
import type { RecordGraphEdge, RecordGraphRecord } from '../../graph/recordGraphLayout';

// The expanded canvas is RecordGraph; its own suite covers the drawing. Here
// it is a stub that reports what the card handed it.
vi.mock('../../graph/RecordGraph', () => ({
  RecordGraph: (props: any) => (
    <div data-testid={props['data-testid']} data-focus={(props.focusKeys ?? []).join(',')} data-ask={props.onAskSelection ? 'yes' : 'no'}>
      <button type="button" onClick={() => props.onSelectionChange(['work:w-1'])}>select cutover</button>
    </div>
  ),
}));

afterEach(cleanup);

const records: RecordGraphRecord[] = [
  { id: 'vera', type: 'person', title: 'Vera Green', href: '/p/vera' },
  { id: 'nora', type: 'person', title: 'Nora Chang', href: '/p/nora' },
  { id: 'auth', type: 'initiative', title: 'Auth Migration', href: '/i/auth' },
  { id: 'w-1', type: 'work', title: 'Tenant-by-tenant cutover', status: 'blocked', href: '/w/1' },
  { id: 'lonely', type: 'knowledge', title: 'Unlinked guide', href: '/k/x' },
];
const edges: RecordGraphEdge[] = [
  { id: 'e1', source: 'person:vera', target: 'initiative:auth', label: 'owns' },
  { id: 'e2', source: 'person:nora', target: 'initiative:auth', label: 'SME on' },
  { id: 'e3', source: 'work:w-1', target: 'initiative:auth', label: 'part of' },
  { id: 'e4', source: 'person:nora', target: 'work:w-1', label: 'assigned' },
  // Points at a record the card does not hold — not a connection.
  { id: 'e5', source: 'person:vera', target: 'work:gone', label: 'assigned' },
];

describe('RecordGraphCard', () => {
  it('summarises records and connections under the default title', () => {
    render(<RecordGraphCard records={records} edges={edges} />);
    expect(screen.getByRole('region', { name: 'Connections' })).toBeInTheDocument();
    expect(screen.getByTestId('record-graph-card-summary')).toHaveTextContent('5 records · 4 connections');
    expect(recordGraphSummary(1, 1)).toBe('1 record · 1 connection');
  });

  it('uses the host summary and title when given', () => {
    render(<RecordGraphCard records={records} edges={edges} title="How these connect" summary="3 selected" />);
    expect(screen.getByRole('region', { name: 'How these connect' })).toBeInTheDocument();
    expect(screen.getByTestId('record-graph-card-summary')).toHaveTextContent('3 selected');
  });

  it('shows the best-connected records when nothing is selected, the selection when something is', () => {
    const { rerender } = render(<RecordGraphCard records={records} edges={edges} />);
    const marks = () => within(screen.getByTestId('record-graph-card-marks')).getAllByRole('listitem').map((li) => li.getAttribute('title'));
    // auth has 3, nora and w-1 have 2 — the unlinked guide is not a mark.
    expect(marks()[0]).toBe('Auth Migration');
    expect(marks()).not.toContain('Unlinked guide');
    expect(screen.getByRole('list', { name: 'Most connected records' })).toBeInTheDocument();
    rerender(<RecordGraphCard records={records} edges={edges} selectedKeys={['work:w-1']} />);
    expect(marks()).toEqual(['Tenant-by-tenant cutover']);
    expect(screen.getByRole('list', { name: 'Selected records' })).toBeInTheDocument();
  });

  it('expands to the graph and collapses again (uncontrolled)', () => {
    const onToggle = vi.fn();
    render(<RecordGraphCard records={records} edges={edges} selectedKeys={['person:vera']} onToggleExpanded={onToggle} height={280} />);
    expect(screen.queryByTestId('record-graph-card-graph')).toBeNull();
    const toggle = screen.getByTestId('record-graph-card-toggle');
    expect(toggle).toHaveTextContent('Expand');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenLastCalledWith(true);
    expect(screen.getByTestId('record-graph-card')).toHaveAttribute('data-expanded', 'true');
    expect(screen.getByTestId('record-graph-card-canvas')).toHaveStyle({ height: '280px' });
    expect(screen.getByTestId('record-graph-card-graph')).toHaveAttribute('data-focus', 'person:vera');
    expect(screen.getByTestId('record-graph-card-graph')).toHaveAttribute('data-ask', 'no');
    expect(toggle).toHaveTextContent('Collapse');
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenLastCalledWith(false);
    expect(screen.queryByTestId('record-graph-card-graph')).toBeNull();
  });

  it('follows a controlled expanded prop and reports selection changes', () => {
    const onToggle = vi.fn(), onSelect = vi.fn();
    render(<RecordGraphCard records={records} edges={edges} expanded onToggleExpanded={onToggle} onSelectionChange={onSelect} />);
    expect(screen.getByTestId('record-graph-card-canvas')).toHaveStyle({ height: '320px' });
    fireEvent.click(screen.getByRole('button', { name: 'select cutover' }));
    expect(onSelect).toHaveBeenCalledWith(['work:w-1']);
    fireEvent.click(screen.getByTestId('record-graph-card-toggle'));
    expect(onToggle).toHaveBeenCalledWith(false);
    // Controlled: stays open until the host says otherwise.
    expect(screen.getByTestId('record-graph-card-graph')).toBeInTheDocument();
  });

  it('holds its own selection when the host does not', () => {
    render(<RecordGraphCard records={records} edges={edges} expanded />);
    fireEvent.click(screen.getByRole('button', { name: 'select cutover' }));
    expect(screen.getByTestId('record-graph-card-graph')).toHaveAttribute('data-focus', 'work:w-1');
  });

  it('opens the full graph', () => {
    const onOpen = vi.fn();
    render(<RecordGraphCard records={records} edges={edges} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button', { name: /Open graph/ }));
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it('draws no Open graph button without onOpen', () => {
    render(<RecordGraphCard records={records} edges={edges} />);
    expect(screen.queryByTestId('record-graph-card-open')).toBeNull();
  });

  it('says "No recorded connections" and hides Expand when there are no edges', () => {
    render(<RecordGraphCard records={records} edges={[]} expanded onOpen={vi.fn()} />);
    expect(screen.getByTestId('record-graph-card-summary')).toHaveTextContent('No recorded connections');
    expect(screen.queryByTestId('record-graph-card-toggle')).toBeNull();
    expect(screen.queryByTestId('record-graph-card-marks')).toBeNull();
    // Even asked to be expanded, there is nothing to draw.
    expect(screen.queryByTestId('record-graph-card-graph')).toBeNull();
    expect(screen.getByTestId('record-graph-card')).toHaveAttribute('data-expanded', 'false');
  });

  it('keeps every screen-reader label positioned inside the card (six marks)', () => {
    // A hub with six neighbours: six marks, six sr-only labels.
    const hub: RecordGraphRecord = { id: 'hub', type: 'initiative', title: 'Hub', href: '/i/hub' };
    const people: RecordGraphRecord[] = Array.from({ length: 6 }, (_, i) => ({ id: `p${i}`, type: 'person', title: `Person ${i}`, href: `/p/${i}` }));
    const spokes: RecordGraphEdge[] = people.map((p, i) => ({ id: `s${i}`, source: `person:${p.id}`, target: 'initiative:hub', label: 'SME on' }));
    render(<RecordGraphCard records={[hub, ...people]} edges={spokes} />);
    const card = screen.getByTestId('record-graph-card');
    const labels = card.querySelectorAll('.sr-only');
    expect(within(screen.getByTestId('record-graph-card-marks')).getAllByRole('listitem')).toHaveLength(6);
    expect(labels.length).toBeGreaterThanOrEqual(6);
    for (const label of labels) {
      const anchor = label.parentElement?.closest('.relative');
      expect(anchor).not.toBeNull();
      expect(card.contains(anchor!)).toBe(true);
    }
    expect(screen.getByTestId('record-graph-card-marks')).toHaveClass('relative');
  });
});
