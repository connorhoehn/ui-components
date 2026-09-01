import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DocumentGutter, { stackOffsets, type GutterItem } from '../DocumentGutter';

afterEach(cleanup);

function item(id: string, top: number, extra: Partial<GutterItem> = {}): GutterItem {
  return { id, top, content: <span>{id}</span>, ...extra };
}

// The stacking rule is the whole reason this component exists, so it is
// tested directly rather than through the DOM.
describe('stackOffsets', () => {
  it('leaves well-separated threads exactly where their anchors are', () => {
    const out = stackOffsets([{ id: 'a', top: 0 }, { id: 'b', top: 500 }], 120, 12);
    expect(out.get('a')).toBe(0);
    expect(out.get('b')).toBe(500);
  });

  it('pushes an overlapping thread down by height + gap', () => {
    const out = stackOffsets([{ id: 'a', top: 0 }, { id: 'b', top: 10 }], 120, 12);
    expect(out.get('a')).toBe(0);
    expect(out.get('b')).toBe(132);
  });

  // Never upward: a card above the text it refers to reads as belonging to
  // the paragraph before it, which is worse than sitting slightly low.
  it('only ever pushes down, never up', () => {
    const out = stackOffsets([{ id: 'a', top: 300 }, { id: 'b', top: 310 }], 120, 12);
    expect(out.get('a')).toBe(300);
    expect(out.get('b')).toBeGreaterThan(310);
  });

  // Input order is whatever the comment API returned. Resolving in that order
  // would let a thread anchored far down the page displace everything above.
  it('is independent of input order', () => {
    const asc = stackOffsets([{ id: 'a', top: 0 }, { id: 'b', top: 10 }, { id: 'c', top: 20 }], 100, 10);
    const desc = stackOffsets([{ id: 'c', top: 20 }, { id: 'b', top: 10 }, { id: 'a', top: 0 }], 100, 10);
    expect([...asc.entries()].sort()).toEqual([...desc.entries()].sort());
  });

  it('cascades a run of collisions instead of stacking them all at one offset', () => {
    const out = stackOffsets(
      [{ id: 'a', top: 0 }, { id: 'b', top: 1 }, { id: 'c', top: 2 }],
      100,
      10,
    );
    expect(out.get('a')).toBe(0);
    expect(out.get('b')).toBe(110);
    expect(out.get('c')).toBe(220);
  });

  it('handles an empty set', () => {
    expect(stackOffsets([], 100, 10).size).toBe(0);
  });

  // A flat estimate is wrong the moment threads differ: a card with two
  // replies is several times taller than one without, and spacing everything
  // by one guess leaves the tall card overlapping its neighbour. That was
  // visible the instant the gutter rendered real CommentThreadNodes.
  it('spaces by each card\'s own height, not one estimate', () => {
    const tall = { a: 300, b: 50 };
    const out = stackOffsets(
      [{ id: 'a', top: 0 }, { id: 'b', top: 10 }],
      (id) => tall[id as 'a' | 'b'],
      10,
    );
    // `b` clears `a`'s ACTUAL 300px, not a 120px default.
    expect(out.get('b')).toBe(310);
  });

  it('falls back to the estimate for a card not yet measured', () => {
    const measured: Record<string, number> = { a: 200 };
    const out = stackOffsets(
      [{ id: 'a', top: 0 }, { id: 'b', top: 5 }],
      (id) => measured[id] ?? 100,
      10,
    );
    expect(out.get('b')).toBe(210);
  });
});

describe('DocumentGutter', () => {
  it('shows an empty label rather than an empty column', () => {
    render(<DocumentGutter items={[]} />);
    expect(screen.getByTestId('document-gutter-empty')).toBeInTheDocument();
  });

  it('positions each thread at its resolved offset', () => {
    render(<DocumentGutter items={[item('a', 0), item('b', 4)]} estimatedHeight={100} gap={10} />);
    expect(screen.getByTestId('document-gutter-item-a')).toHaveStyle({ top: '0px' });
    // Pushed clear of `a` rather than overlapping it.
    expect(screen.getByTestId('document-gutter-item-b')).toHaveStyle({ top: '110px' });
  });

  it('marks the active thread so the anchored one is findable', () => {
    render(<DocumentGutter items={[item('a', 0), item('b', 400, { active: true })]} />);
    expect(screen.getByTestId('document-gutter-item-a')).toHaveAttribute('data-active', 'false');
    expect(screen.getByTestId('document-gutter-item-b')).toHaveAttribute('data-active', 'true');
  });

  it('renders the thread content', () => {
    render(<DocumentGutter items={[item('a', 0)]} />);
    expect(screen.getByText('a')).toBeInTheDocument();
  });

  it('focuses a thread on click when a handler is given', () => {
    const onFocusItem = vi.fn();
    render(<DocumentGutter items={[item('a', 0)]} onFocusItem={onFocusItem} />);
    fireEvent.click(screen.getByText('a'));
    expect(onFocusItem).toHaveBeenCalledWith('a');
  });

  // Clickable via mouse only would strand keyboard users on every thread.
  it('focuses a thread from the keyboard too', () => {
    const onFocusItem = vi.fn();
    render(<DocumentGutter items={[item('a', 0)]} onFocusItem={onFocusItem} />);
    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onFocusItem).toHaveBeenCalledWith('a');
  });

  it('is not interactive when no handler is given', () => {
    render(<DocumentGutter items={[item('a', 0)]} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  // The cards are absolutely positioned, so without an explicit height the
  // container collapses and the last thread is clipped.
  it('reserves height for the lowest card', () => {
    render(<DocumentGutter items={[item('a', 500)]} estimatedHeight={100} />);
    expect(screen.getByTestId('document-gutter')).toHaveStyle({ height: '600px' });
  });
});
