import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableCursorGrid } from '../TableCursorGrid';
import type { RemoteCursor } from '../../../hooks/useCursors';

function mkRemote(
  clientId: string,
  mode: string,
  position: Record<string, unknown>,
  displayName?: string,
): RemoteCursor {
  return {
    clientId,
    position,
    metadata: displayName !== undefined ? { mode, displayName } : { mode },
  };
}

describe('TableCursorGrid', () => {
  it('renders 6 column headers (A–F) and 10 row headers (1–10)', () => {
    render(
      <TableCursorGrid cursors={new Map()} localCursor={null} onCellClick={() => {}} />,
    );
    for (const header of ['A', 'B', 'C', 'D', 'E', 'F']) {
      expect(screen.getByRole('columnheader', { name: header })).toBeInTheDocument();
    }
    // Row headers are <th> inside <tbody> rows without scope="row", so they
    // do not get the `rowheader` ARIA role automatically — match by text.
    for (let r = 1; r <= 10; r++) {
      expect(screen.getByText(String(r))).toBeInTheDocument();
    }
  });

  it('renders 60 data cells (10 × 6)', () => {
    const { container } = render(
      <TableCursorGrid cursors={new Map()} localCursor={null} onCellClick={() => {}} />,
    );
    const dataCells = container.querySelectorAll('tbody td');
    expect(dataCells).toHaveLength(60);
  });

  it('clicking a data cell invokes onCellClick(row, col)', () => {
    const onCellClick = vi.fn();
    const { container } = render(
      <TableCursorGrid cursors={new Map()} localCursor={null} onCellClick={onCellClick} />,
    );
    const cells = container.querySelectorAll('tbody td');
    // row=4, col=2 -> the 3rd cell in the 5th row -> index 4*6 + 2 = 26
    fireEvent.click(cells[26]);
    expect(onCellClick).toHaveBeenCalledTimes(1);
    expect(onCellClick).toHaveBeenCalledWith(4, 2);
    // row=0, col=0 -> index 0
    fireEvent.click(cells[0]);
    expect(onCellClick).toHaveBeenLastCalledWith(0, 0);
    // row=9, col=5 -> index 9*6 + 5 = 59 (last cell)
    fireEvent.click(cells[59]);
    expect(onCellClick).toHaveBeenLastCalledWith(9, 5);
  });

  it('local cursor with mode "table" and {row, col} shows "You" badge in matching cell', () => {
    const localCursor: RemoteCursor = {
      clientId: 'self',
      position: { row: 2, col: 3 },
      metadata: { mode: 'table' },
    };
    const { container } = render(
      <TableCursorGrid cursors={new Map()} localCursor={localCursor} onCellClick={() => {}} />,
    );
    const youBadge = screen.getByText('You');
    expect(youBadge).toBeInTheDocument();
    const cells = container.querySelectorAll('tbody td');
    const expectedCell = cells[2 * 6 + 3]; // row=2, col=3
    expect(expectedCell.contains(youBadge)).toBe(true);
  });

  it('local cursor with mode !== "table" is ignored (no "You" badge)', () => {
    const localCursor: RemoteCursor = {
      clientId: 'self',
      position: { row: 0, col: 0 },
      metadata: { mode: 'freeform' },
    };
    render(
      <TableCursorGrid cursors={new Map()} localCursor={localCursor} onCellClick={() => {}} />,
    );
    expect(screen.queryByText('You')).not.toBeInTheDocument();
  });

  it('local cursor with missing row or col is ignored', () => {
    const localCursorNoRow: RemoteCursor = {
      clientId: 'self',
      position: { col: 1 },
      metadata: { mode: 'table' },
    };
    const { rerender } = render(
      <TableCursorGrid cursors={new Map()} localCursor={localCursorNoRow} onCellClick={() => {}} />,
    );
    expect(screen.queryByText('You')).not.toBeInTheDocument();
    const localCursorNoCol: RemoteCursor = {
      clientId: 'self',
      position: { row: 1 },
      metadata: { mode: 'table' },
    };
    rerender(
      <TableCursorGrid cursors={new Map()} localCursor={localCursorNoCol} onCellClick={() => {}} />,
    );
    expect(screen.queryByText('You')).not.toBeInTheDocument();
  });

  it('remote cursor with mode "table" renders its initials badge on matching cell', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['alice', mkRemote('alice', 'table', { row: 0, col: 0 }, 'Jane Doe')],
    ]);
    const { container } = render(
      <TableCursorGrid cursors={cursors} localCursor={null} onCellClick={() => {}} />,
    );
    const badge = screen.getByText('JD');
    expect(badge).toBeInTheDocument();
    const cells = container.querySelectorAll('tbody td');
    expect(cells[0].contains(badge)).toBe(true);
  });

  it('remote cursor with mode !== "table" is filtered out', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['alice', mkRemote('alice', 'freeform', { row: 0, col: 0 }, 'Jane Doe')],
    ]);
    render(<TableCursorGrid cursors={cursors} localCursor={null} onCellClick={() => {}} />);
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
  });

  it('remote cursors with missing row or col are filtered out', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['alice', mkRemote('alice', 'table', { col: 0 }, 'Jane Doe')],
      ['bob', mkRemote('bob', 'table', { row: 0 }, 'Bob Smith')],
    ]);
    render(<TableCursorGrid cursors={cursors} localCursor={null} onCellClick={() => {}} />);
    expect(screen.queryByText('JD')).not.toBeInTheDocument();
    expect(screen.queryByText('BS')).not.toBeInTheDocument();
  });

  it('multiple remote cursors on the same cell coexist', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['alice', mkRemote('alice', 'table', { row: 1, col: 1 }, 'Jane Doe')],
      ['bob', mkRemote('bob', 'table', { row: 1, col: 1 }, 'Bob Smith')],
    ]);
    const { container } = render(
      <TableCursorGrid cursors={cursors} localCursor={null} onCellClick={() => {}} />,
    );
    const jdBadge = screen.getByText('JD');
    const bsBadge = screen.getByText('BS');
    const cells = container.querySelectorAll('tbody td');
    const sharedCell = cells[1 * 6 + 1];
    expect(sharedCell.contains(jdBadge)).toBe(true);
    expect(sharedCell.contains(bsBadge)).toBe(true);
  });

  it('remote cursor without displayName falls back to clientId slice for initials', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['xyz', mkRemote('xyz', 'table', { row: 0, col: 1 })],
    ]);
    render(<TableCursorGrid cursors={cursors} localCursor={null} onCellClick={() => {}} />);
    // identityToInitials("xy") -> "XY"
    expect(screen.getByText('XY')).toBeInTheDocument();
  });

  it('empty cursors Map + null localCursor renders no badges', () => {
    render(
      <TableCursorGrid cursors={new Map()} localCursor={null} onCellClick={() => {}} />,
    );
    expect(screen.queryByText('You')).not.toBeInTheDocument();
    // Column header "A" / "B" etc. are still in the document — that's the table chrome,
    // not a cursor badge. We just verify no two-letter initial badges sneak in by
    // checking the only initials-shaped strings are absent for this empty case.
    const probableInitialCandidates = ['JD', 'BS', 'XY', 'AB'];
    for (const candidate of probableInitialCandidates) {
      expect(screen.queryByText(candidate)).not.toBeInTheDocument();
    }
  });
});
