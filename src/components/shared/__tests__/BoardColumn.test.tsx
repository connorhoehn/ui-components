import { render, screen } from '@testing-library/react';
import { BoardColumn } from '../BoardColumn';

describe('BoardColumn', () => {
  it('renders the caption and the count', () => {
    render(<BoardColumn label="In progress" count={3}><div>card</div></BoardColumn>);
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('takes the count as a prop rather than counting children', () => {
    // A paginated lane knows its real total; the DOM only holds a page of it.
    render(<BoardColumn label="Open" count={42}><div>one card</div></BoardColumn>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('omits the count entirely when none is given', () => {
    const { container } = render(<BoardColumn label="Open"><div>c</div></BoardColumn>);
    expect(container.querySelector('header')?.textContent).toBe('Open');
  });

  it('shows a placeholder — not a bare dash — for an empty lane', () => {
    render(<BoardColumn label="Done" count={0} />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('takes a lane-specific empty message', () => {
    render(<BoardColumn label="Blocked" count={0} emptyLabel="Nothing blocked" />);
    expect(screen.getByText('Nothing blocked')).toBeInTheDocument();
  });

  it.each([
    ['an empty array', [] as never[]],
    ['null', null],
    ['false', false],
  ])('treats %s as an empty lane', (_label, children) => {
    render(<BoardColumn label="Open">{children}</BoardColumn>);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders a mapped list of cards', () => {
    render(
      <BoardColumn label="Open" count={2}>
        {['a', 'b'].map((k) => <div key={k}>{k}</div>)}
      </BoardColumn>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    expect(screen.queryByText('Nothing here')).not.toBeInTheDocument();
  });

  it('lets an action replace the count in the header', () => {
    render(<BoardColumn label="Open" count={1} action={<button>Add</button>}><div>c</div></BoardColumn>);
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('is a landmark section, not an anonymous div', () => {
    const { container } = render(<BoardColumn label="Open" data-testid="lane" />);
    expect(container.querySelector('section')).not.toBeNull();
    expect(screen.getByTestId('lane')).toBeInTheDocument();
  });

  it('is a lane surface the DOM audit can find, with a tinted background', () => {
    const { container } = render(<BoardColumn label="Open"><div>c</div></BoardColumn>);
    const lane = container.querySelector('[data-ui-board-lane]');
    expect(lane).not.toBeNull();
    expect(lane?.className).toMatch(/bg-\[color-mix/);
    // Stretches with its grid row so every lane runs the board's full height.
    expect(lane?.className).toContain('h-full');
  });

  it('marks an empty lane with a drop-zone message inside the lane, not a bare dash', () => {
    const { container } = render(<BoardColumn label="Done" count={0} emptyLabel="No items" />);
    const empty = container.querySelector('[data-board-lane-empty]');
    expect(empty?.textContent).toBe('No items');
    expect(empty?.closest('[data-ui-board-lane]')).not.toBeNull();
  });
});
