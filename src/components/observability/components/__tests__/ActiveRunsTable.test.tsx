// A row here is a fake button: it carries role="button" and its own keyboard
// handler because a <tr> gets none for free. Two things have to hold or the
// table becomes a trap. First, the interactive affordances (role, tabIndex,
// aria-label, pointer cursor) must appear ONLY when a click handler was
// actually supplied — announcing a button that does nothing is worse than a
// plain row. Second, Cancel must stop propagation on both click and keydown;
// without it, cancelling a run also navigates away from the page that would
// show you whether the cancel worked.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ActiveRunsTable, { type ActiveRunRow } from '../ActiveRunsTable';

function run(over: Partial<ActiveRunRow> = {}): ActiveRunRow {
  return {
    pipelineId: 'p1',
    pipelineName: 'Nightly ETL',
    runId: 'r1',
    currentStep: 'transform',
    ownerNode: 'node-3',
    elapsed: '2m 10s',
    status: 'running',
    ...over,
  };
}

describe('ActiveRunsTable empty state', () => {
  it('replaces the table with a message rather than rendering headers over nothing', () => {
    render(<ActiveRunsTable runs={[]} />);
    expect(screen.getByTestId('active-runs-empty')).toHaveTextContent('No active runs');
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('tolerates a missing runs array instead of throwing', () => {
    render(<ActiveRunsTable runs={undefined as unknown as ActiveRunRow[]} />);
    expect(screen.getByTestId('active-runs-empty')).toBeInTheDocument();
  });
});

describe('ActiveRunsTable row interactivity', () => {
  it('a row with no handler advertises no button semantics at all', () => {
    render(<ActiveRunsTable runs={[run()]} />);
    const row = screen.getByTestId('active-run-row');
    expect(row).not.toHaveAttribute('role', 'button');
    expect(row).not.toHaveAttribute('tabindex');
    expect(row).not.toHaveAttribute('aria-label');
    expect(row.className).toContain('cursor-default');
  });

  it('a clickable row is focusable and names the run it opens', () => {
    render(<ActiveRunsTable runs={[run({ runId: 'r-42' })]} onRowClick={vi.fn()} />);
    const row = screen.getByRole('button', { name: 'Open run r-42 of pipeline Nightly ETL' });
    expect(row).toHaveAttribute('tabindex', '0');
  });

  it('hands the whole row object back, not just an id', () => {
    const onRowClick = vi.fn();
    const target = run({ runId: 'r-42' });
    render(<ActiveRunsTable runs={[target]} onRowClick={onRowClick} />);
    fireEvent.click(screen.getByTestId('active-run-row'));
    expect(onRowClick).toHaveBeenCalledWith(target);
  });

  it.each(['Enter', ' ', 'Spacebar'])('%s activates the row like a click', (key) => {
    const onRowClick = vi.fn();
    render(<ActiveRunsTable runs={[run()]} onRowClick={onRowClick} />);
    fireEvent.keyDown(screen.getByTestId('active-run-row'), { key });
    expect(onRowClick).toHaveBeenCalledTimes(1);
  });

  it('ignores keys that are not activation keys', () => {
    const onRowClick = vi.fn();
    render(<ActiveRunsTable runs={[run()]} onRowClick={onRowClick} />);
    fireEvent.keyDown(screen.getByTestId('active-run-row'), { key: 'a' });
    fireEvent.keyDown(screen.getByTestId('active-run-row'), { key: 'Tab' });
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('reveals the drill-in affordance on hover only, and only when interactive', () => {
    const { rerender } = render(<ActiveRunsTable runs={[run()]} onRowClick={vi.fn()} />);
    const row = screen.getByTestId('active-run-row');
    expect(screen.queryByTestId('active-run-link-icon')).toBeNull();
    fireEvent.mouseEnter(row);
    expect(screen.getByTestId('active-run-link-icon')).toBeInTheDocument();
    fireEvent.mouseLeave(row);
    expect(screen.queryByTestId('active-run-link-icon')).toBeNull();

    rerender(<ActiveRunsTable runs={[run()]} />);
    fireEvent.mouseEnter(screen.getByTestId('active-run-row'));
    expect(screen.queryByTestId('active-run-link-icon')).toBeNull();
  });
});

describe('ActiveRunsTable cancel column', () => {
  it('the column is absent entirely without an onCancelRun handler', () => {
    render(<ActiveRunsTable runs={[run()]} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(4);
    expect(screen.queryByTestId('active-run-cancel')).toBeNull();
  });

  it('the column exists but the control only appears on a running run', () => {
    render(<ActiveRunsTable runs={[run({ runId: 'a', status: 'running' }), run({ runId: 'b', status: 'awaiting' })]} onCancelRun={vi.fn()} />);
    expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    expect(screen.getAllByTestId('active-run-cancel')).toHaveLength(1);
  });

  it('cancelling does not also open the run', () => {
    const onRowClick = vi.fn();
    const onCancelRun = vi.fn();
    const target = run();
    render(<ActiveRunsTable runs={[target]} onRowClick={onRowClick} onCancelRun={onCancelRun} />);
    fireEvent.click(screen.getByTestId('active-run-cancel'));
    expect(onCancelRun).toHaveBeenCalledWith(target);
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('keyboard activation on Cancel does not bubble into the row handler', () => {
    const onRowClick = vi.fn();
    render(<ActiveRunsTable runs={[run()]} onRowClick={onRowClick} onCancelRun={vi.fn()} />);
    fireEvent.keyDown(screen.getByTestId('active-run-cancel'), { key: 'Enter', bubbles: true });
    expect(onRowClick).not.toHaveBeenCalled();
  });

  it('names the run it would cancel', () => {
    render(<ActiveRunsTable runs={[run({ runId: 'r-7' })]} onCancelRun={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Cancel run r-7' })).toBeInTheDocument();
  });
});

describe('ActiveRunsTable content', () => {
  it('renders one row per run with its step, owner and elapsed time', () => {
    render(<ActiveRunsTable runs={[run({ runId: 'a' }), run({ runId: 'b', pipelineName: 'Reindex' })]} />);
    const rows = screen.getAllByTestId('active-run-row');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('transform')).toBeInTheDocument();
    expect(within(rows[0]).getByText('node-3')).toBeInTheDocument();
    expect(within(rows[0]).getByText('2m 10s')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Reindex')).toBeInTheDocument();
  });
});
