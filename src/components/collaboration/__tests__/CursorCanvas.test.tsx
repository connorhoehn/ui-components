import { render, screen, fireEvent } from '@testing-library/react';
import { CursorCanvas } from '../CursorCanvas';
import type { RemoteCursor } from '../../../hooks/useCursors';

function makeCursor(over: Partial<RemoteCursor> & Pick<RemoteCursor, 'clientId'>): RemoteCursor {
  return {
    clientId: over.clientId,
    position: over.position ?? { x: 10, y: 20 },
    metadata: over.metadata ?? { mode: 'freeform', displayName: 'Alice' },
  };
}

describe('CursorCanvas', () => {
  it('renders the prompt label', () => {
    render(<CursorCanvas cursors={new Map()} onMouseMove={() => {}} />);
    expect(screen.getByText(/Move your mouse here/i)).toBeInTheDocument();
  });

  it('renders remote cursors with derived initials', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['c1', makeCursor({ clientId: 'c1', metadata: { mode: 'freeform', displayName: 'Bob Smith' } })],
      ['c2', makeCursor({ clientId: 'c2', metadata: { mode: 'freeform', displayName: 'Carol Jones' } })],
    ]);
    render(<CursorCanvas cursors={cursors} onMouseMove={() => {}} />);
    // identityToInitials returns 2-letter initials from the displayName
    expect(screen.getByText('BS')).toBeInTheDocument();
    expect(screen.getByText('CJ')).toBeInTheDocument();
  });

  it('renders the local "You" cursor when in freeform mode', () => {
    const local = makeCursor({
      clientId: 'me',
      position: { x: 50, y: 50 },
      metadata: { mode: 'freeform', displayName: 'Me' },
    });
    render(<CursorCanvas cursors={new Map()} localCursor={local} onMouseMove={() => {}} />);
    expect(screen.getByText('You')).toBeInTheDocument();
  });

  it('fires onMouseMove with the cursor offset', () => {
    const onMouseMove = vi.fn();
    const { container } = render(
      <CursorCanvas cursors={new Map()} onMouseMove={onMouseMove} width={400} height={200} />,
    );
    const surface = container.firstChild as HTMLDivElement;
    fireEvent.mouseMove(surface, { clientX: 25, clientY: 40 });
    expect(onMouseMove).toHaveBeenCalledTimes(1);
    // jsdom's getBoundingClientRect returns zeroes, so the offsets equal client coords
    expect(onMouseMove).toHaveBeenCalledWith(25, 40);
  });
});
