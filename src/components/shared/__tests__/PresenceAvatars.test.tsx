import { render, screen, fireEvent } from '@testing-library/react';
import { PresenceAvatars } from '../PresenceAvatars';
import type { PresenceUser } from '../PresenceAvatars';

const makeUsers = (n: number): PresenceUser[] =>
  Array.from({ length: n }, (_, i) => ({ id: `u${i}`, name: `User ${i + 1}` }));

describe('PresenceAvatars', () => {
  it('renders all users when under maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(3)} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders empty list with no users', () => {
    render(<PresenceAvatars users={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('shows overflow chip when users exceed maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(8)} maxVisible={5} />);
    expect(screen.getByLabelText('3 more users')).toBeInTheDocument();
  });

  it('does not show overflow chip when users equal maxVisible', () => {
    render(<PresenceAvatars users={makeUsers(5)} maxVisible={5} />);
    expect(screen.queryByLabelText(/more users/)).not.toBeInTheDocument();
  });

  it('calls onMoreClick when overflow chip is clicked', () => {
    const onMoreClick = vi.fn();
    render(<PresenceAvatars users={makeUsers(8)} maxVisible={5} onMoreClick={onMoreClick} />);
    fireEvent.click(screen.getByLabelText('3 more users'));
    expect(onMoreClick).toHaveBeenCalledTimes(1);
  });

  it('renders online status dot for users with online=true', () => {
    const users: PresenceUser[] = [
      { id: 'u1', name: 'Alice', online: true },
      { id: 'u2', name: 'Bob', online: false },
    ];
    render(<PresenceAvatars users={users} />);
    expect(screen.getByLabelText('Alice online')).toBeInTheDocument();
    expect(screen.getByLabelText('Bob offline')).toBeInTheDocument();
  });

  it('renders avatarUrl image when provided', () => {
    const users: PresenceUser[] = [
      { id: 'u1', name: 'Alice', avatarUrl: 'https://example.com/a.png' },
    ];
    render(<PresenceAvatars users={users} />);
    const img = screen.getByRole('img', { name: 'Alice' });
    expect(img).toHaveAttribute('src', 'https://example.com/a.png');
  });

  it('respects custom maxVisible prop', () => {
    render(<PresenceAvatars users={makeUsers(10)} maxVisible={3} />);
    expect(screen.getByLabelText('7 more users')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
