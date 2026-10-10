import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CursorOverlay } from '../CursorOverlay';

describe('CursorOverlay', () => {
  it('renders children and one pointer per cursor with its label', () => {
    render(
      <CursorOverlay
        cursors={[
          { clientId: 'a', x: 10, y: 20, label: 'Ada', color: '#ff0000' },
          { clientId: 'b', x: 30, y: 40, label: 'Bo', color: '#00ff00' },
        ]}
      >
        <p>content</p>
      </CursorOverlay>,
    );
    expect(screen.getByText('content')).toBeInTheDocument();
    expect(screen.getAllByTestId('cursor-overlay-pointer')).toHaveLength(2);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });

  it('keeps users distinguishable: supplied colours win, fallbacks differ by id', () => {
    render(
      <CursorOverlay
        cursors={[
          { clientId: 'a', x: 0, y: 0, label: 'Ada', color: '#123456' },
          { clientId: 'u-1', x: 0, y: 0 },
          { clientId: 'u-2', x: 0, y: 0 },
        ]}
      />,
    );
    const labels = screen.getAllByTestId('cursor-overlay-label');
    expect(labels[0].style.background).toBe('rgb(18, 52, 86)');
    expect(labels[1].style.background).not.toBe('');
  });

  it('positions in fractions as percentages and skips non-finite cursors', () => {
    render(
      <CursorOverlay
        coordinates="fraction"
        cursors={[
          { clientId: 'a', x: 0.25, y: 0.5 },
          { clientId: 'bad', x: Number.NaN, y: 0 },
        ]}
      />,
    );
    const pointers = screen.getAllByTestId('cursor-overlay-pointer');
    expect(pointers).toHaveLength(1);
    expect(pointers[0].style.left).toBe('25%');
    expect(pointers[0].style.top).toBe('50%');
  });

  it('reports the local pointer, normalised and clamped in fraction mode', () => {
    const onMove = vi.fn();
    render(<CursorOverlay cursors={[]} coordinates="fraction" onMove={onMove} />);
    const root = screen.getByTestId('cursor-overlay');
    root.getBoundingClientRect = () =>
      ({ left: 100, top: 100, width: 200, height: 100, right: 300, bottom: 200, x: 100, y: 100, toJSON() {} }) as DOMRect;
    fireEvent.pointerMove(root, { clientX: 200, clientY: 150 });
    expect(onMove).toHaveBeenLastCalledWith(0.5, 0.5);
    fireEvent.pointerMove(root, { clientX: 900, clientY: 0 });
    expect(onMove).toHaveBeenLastCalledWith(1, 0);
  });

  it('does not intercept pointer events over its content', () => {
    render(<CursorOverlay cursors={[{ clientId: 'a', x: 1, y: 1 }]} />);
    expect(screen.getByTestId('cursor-overlay-layer').className).toContain('pointer-events-none');
  });
});
