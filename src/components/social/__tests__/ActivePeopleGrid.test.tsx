import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActivePeopleGrid, type ActivePerson } from '../ActivePeopleGrid';

const person = (overrides: Partial<ActivePerson> & { userId: string }): ActivePerson => ({
  displayName: 'Ada Lovelace',
  ...overrides,
});

describe('ActivePeopleGrid', () => {
  it('renders one tile per person, its accessible name carrying status and activity', () => {
    render(
      <ActivePeopleGrid
        people={[person({ userId: 'u1', displayName: 'Ada Lovelace', activity: 'Editing the roadmap' })]}
        data-testid="rail-active"
      />,
    );
    const tile = screen.getByTestId('rail-active-person-u1');
    expect(tile.tagName).toBe('DIV'); // no onSelectPerson → inert, not a button
    const label = tile.getAttribute('aria-label') ?? '';
    expect(label).toContain('Ada Lovelace');
    expect(label).toContain('Editing the roadmap');
    expect(screen.getByText('Ada')).toBeInTheDocument(); // first name only, under the bubble
  });

  it('reports the userId when a tile is clicked', () => {
    const onSelectPerson = vi.fn();
    render(
      <ActivePeopleGrid
        people={[person({ userId: 'u2', displayName: 'Grace Hopper' })]}
        onSelectPerson={onSelectPerson}
        data-testid="rail-active"
      />,
    );
    const tile = screen.getByTestId('rail-active-person-u2');
    expect(tile.tagName).toBe('BUTTON'); // onSelectPerson given → real button
    fireEvent.click(tile);
    expect(onSelectPerson).toHaveBeenCalledWith('u2');
  });

  it('collapses past maxVisible into a "+N" tile that reports through onShowAll', () => {
    const onShowAll = vi.fn();
    const people = Array.from({ length: 6 }, (_, i) => person({ userId: `u${i}`, displayName: `Person ${i}` }));
    render(
      <ActivePeopleGrid people={people} maxVisible={4} onShowAll={onShowAll} data-testid="rail-active" />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    const more = screen.getByTestId('rail-active-more');
    expect(more.tagName).toBe('BUTTON');
    expect(more).toHaveTextContent('+2');
    fireEvent.click(more);
    expect(onShowAll).toHaveBeenCalledTimes(1);
  });

  it('renders the overflow tile as inert text when onShowAll is not given', () => {
    const people = Array.from({ length: 5 }, (_, i) => person({ userId: `u${i}`, displayName: `Person ${i}` }));
    render(<ActivePeopleGrid people={people} maxVisible={4} data-testid="rail-active" />);
    const more = screen.getByTestId('rail-active-more');
    expect(more.tagName).toBe('DIV');
    expect(more).toHaveTextContent('+1');
  });

  it('renders the empty label when nobody is around', () => {
    render(<ActivePeopleGrid people={[]} data-testid="rail-active" />);
    expect(screen.getByTestId('rail-active-empty')).toHaveTextContent('Nobody is around right now.');
    expect(screen.queryByTestId('rail-active')).not.toBeInTheDocument();
  });

  it('supports a custom empty label', () => {
    render(<ActivePeopleGrid people={[]} emptyLabel="Everyone's offline." data-testid="rail-active" />);
    expect(screen.getByTestId('rail-active-empty')).toHaveTextContent("Everyone's offline.");
  });
});
