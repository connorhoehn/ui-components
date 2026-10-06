import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedCursorOverlay } from '../WrappedCursorOverlay';
import { adaptCursors } from '../adapters';
import type { RMCursorEntry, RMUseCursorReturn } from '../types';

const entry = (clientId: string, position: Record<string, unknown>, metadata = {}): RMCursorEntry => ({
  clientId,
  channel: 'doc-1',
  position,
  metadata: { mode: 'freeform', userInitials: 'AB', userColor: '#112233', ...metadata },
  timestamp: '2026-05-30T10:00:00.000Z',
});

function hook(cursors: RMCursorEntry[], move = vi.fn()): RMUseCursorReturn {
  return { cursors, move };
}

describe('adaptCursors', () => {
  it('keeps service colour, prefers displayName, skips table/text cursors', () => {
    const out = adaptCursors([
      entry('a', { x: 1, y: 2 }, { displayName: 'Ada' }),
      entry('b', { x: 3, y: 4 }),
      entry('c', { row: 1, col: 2 }),
      entry('d', { position: 5 }),
    ]);
    expect(out.map((c) => c.clientId)).toEqual(['a', 'b']);
    expect(out[0]).toMatchObject({ label: 'Ada', color: '#112233' });
    expect(out[1].label).toBe('AB');
  });
});

describe('WrappedCursorOverlay', () => {
  it('draws remote cursors and hides selfClientId', () => {
    render(
      <WrappedCursorOverlay
        cursor={hook([entry('a', { x: 0.1, y: 0.2 }), entry('me', { x: 0.5, y: 0.5 })])}
        selfClientId="me"
      >
        <p>board</p>
      </WrappedCursorOverlay>,
    );
    expect(screen.getByText('board')).toBeInTheDocument();
    const pointers = screen.getAllByTestId('cursor-overlay-pointer');
    expect(pointers).toHaveLength(1);
    expect(pointers[0].dataset.clientId).toBe('a');
  });

  it('publishes local movement as fractional {x, y} through cursor.move', () => {
    const move = vi.fn();
    render(<WrappedCursorOverlay cursor={hook([], move)} />);
    const root = screen.getByTestId('cursor-overlay');
    root.getBoundingClientRect = () =>
      ({ left: 0, top: 0, width: 400, height: 200, right: 400, bottom: 200, x: 0, y: 0, toJSON() {} }) as DOMRect;
    fireEvent.pointerMove(root, { clientX: 100, clientY: 100 });
    expect(move).toHaveBeenCalledWith({ x: 0.25, y: 0.5 });
  });

  it('does not publish when publish is false', () => {
    const move = vi.fn();
    render(<WrappedCursorOverlay cursor={hook([], move)} publish={false} />);
    fireEvent.pointerMove(screen.getByTestId('cursor-overlay'), { clientX: 5, clientY: 5 });
    expect(move).not.toHaveBeenCalled();
  });
});
