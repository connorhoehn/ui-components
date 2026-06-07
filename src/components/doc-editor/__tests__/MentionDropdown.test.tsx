import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MentionDropdown, type MentionUser, type MentionDropdownHandle } from '../MentionDropdown';

function mkUser(overrides: Partial<MentionUser> = {}): MentionUser {
  return { userId: 'u1', displayName: 'Alice Smith', color: '#f00', online: true, type: 'user', ...overrides };
}

type RefHolder = { current: MentionDropdownHandle | null };

function Harness(props: {
  users: MentionUser[];
  query?: string;
  onSelect?: (u: MentionUser) => void;
  onDismiss?: () => void;
  refHolder?: RefHolder;
}) {
  const { users, query = '', onSelect = vi.fn(), onDismiss = vi.fn(), refHolder } = props;
  return (
    <MentionDropdown
      ref={(h) => { if (refHolder) refHolder.current = h; }}
      query={query}
      users={users}
      position={{ top: 10, left: 20 }}
      onSelect={onSelect}
      onDismiss={onDismiss}
    />
  );
}

function press(h: RefHolder, k: string) {
  const e = { key: k, preventDefault: vi.fn() } as unknown as KeyboardEvent;
  let consumed = false;
  act(() => { consumed = h.current!.handleKeyDown(e); });
  return { consumed, e };
}

const selected = () =>
  screen.getAllByRole('option').map((o) => o.getAttribute('aria-selected'));

describe('MentionDropdown', () => {
  it('renders a listbox portal mounted to document.body', () => {
    render(<Harness users={[mkUser()]} />);
    const lb = screen.getByRole('listbox');
    expect(document.body.contains(lb)).toBe(true);
  });

  it('shows "No users found" when filtered list is empty', () => {
    render(<Harness users={[mkUser({ displayName: 'Alice' })]} query="zzz" />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('filters case-insensitively against displayName', () => {
    render(<Harness query="alice" users={[
      mkUser({ userId: 'a', displayName: 'Alice Smith' }),
      mkUser({ userId: 'b', displayName: 'ALICE JONES' }),
      mkUser({ userId: 'c', displayName: 'bob example' }),
    ]} />);
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.queryByText('bob example')).not.toBeInTheDocument();
  });

  it('caps rendered list at 6', () => {
    const users = Array.from({ length: 10 }, (_, i) => mkUser({ userId: `u${i}`, displayName: `User ${i}` }));
    render(<Harness users={users} />);
    expect(screen.getAllByRole('option')).toHaveLength(6);
  });

  it('marks first row aria-selected initially', () => {
    render(<Harness users={[mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' })]} />);
    expect(selected()).toEqual(['true', 'false']);
  });

  it('ArrowDown advances active index and wraps at the end', () => {
    const refHolder: RefHolder = { current: null };
    render(<Harness refHolder={refHolder} users={[mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' })]} />);
    const { consumed, e } = press(refHolder, 'ArrowDown');
    expect(consumed).toBe(true);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(selected()).toEqual(['false', 'true']);
    press(refHolder, 'ArrowDown');
    expect(selected()).toEqual(['true', 'false']);
  });

  it('ArrowUp decrements and wraps to last row from index 0', () => {
    const refHolder: RefHolder = { current: null };
    render(<Harness refHolder={refHolder} users={[
      mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' }), mkUser({ userId: 'c', displayName: 'C' }),
    ]} />);
    const { consumed, e } = press(refHolder, 'ArrowUp');
    expect(consumed).toBe(true);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(selected()).toEqual(['false', 'false', 'true']);
  });

  it('Enter selects the active row and Tab behaves identically', () => {
    const refHolder: RefHolder = { current: null };
    const onSelect = vi.fn();
    const users = [mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' })];
    render(<Harness users={users} refHolder={refHolder} onSelect={onSelect} />);
    press(refHolder, 'ArrowDown');
    const { consumed, e } = press(refHolder, 'Enter');
    expect(consumed).toBe(true);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onSelect).toHaveBeenCalledWith(users[1]);
    press(refHolder, 'Tab');
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenLastCalledWith(users[1]);
  });

  it('Enter on empty filtered list is a no-op for onSelect but still consumes the key', () => {
    const refHolder: RefHolder = { current: null };
    const onSelect = vi.fn();
    render(<Harness users={[mkUser()]} query="zzz" refHolder={refHolder} onSelect={onSelect} />);
    const { consumed, e } = press(refHolder, 'Enter');
    expect(consumed).toBe(true);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('Escape fires onDismiss', () => {
    const refHolder: RefHolder = { current: null };
    const onDismiss = vi.fn();
    render(<Harness users={[mkUser()]} refHolder={refHolder} onDismiss={onDismiss} />);
    const { consumed, e } = press(refHolder, 'Escape');
    expect(consumed).toBe(true);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('Unknown key returns false and does not preventDefault', () => {
    const refHolder: RefHolder = { current: null };
    render(<Harness users={[mkUser()]} refHolder={refHolder} />);
    const { consumed, e } = press(refHolder, 'a');
    expect(consumed).toBe(false);
    expect(e.preventDefault).not.toHaveBeenCalled();
  });

  it('mouseenter updates active index without firing onSelect', () => {
    const onSelect = vi.fn();
    render(<Harness onSelect={onSelect} users={[mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' })]} />);
    fireEvent.mouseEnter(screen.getAllByRole('option')[1]);
    expect(selected()).toEqual(['false', 'true']);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('mousedown selects the row and preventDefault keeps focus on the parent', () => {
    const onSelect = vi.fn();
    const users = [mkUser({ userId: 'a', displayName: 'A' }), mkUser({ userId: 'b', displayName: 'B' })];
    render(<Harness onSelect={onSelect} users={users} />);
    const propagated = fireEvent.mouseDown(screen.getAllByRole('option')[1]);
    expect(propagated).toBe(false);
    expect(onSelect).toHaveBeenCalledWith(users[1]);
  });

  it('resets activeIndex to 0 when query changes', () => {
    const refHolder: RefHolder = { current: null };
    const users = [
      mkUser({ userId: 'a', displayName: 'Alice' }),
      mkUser({ userId: 'b', displayName: 'Albert' }),
      mkUser({ userId: 'c', displayName: 'Bob' }),
    ];
    const { rerender } = render(<Harness users={users} query="al" refHolder={refHolder} />);
    press(refHolder, 'ArrowDown');
    expect(selected()).toEqual(['false', 'true']);
    rerender(<Harness users={users} query="bo" refHolder={refHolder} />);
    expect(selected()).toEqual(['true']);
  });

  it('user row renders initials, online dot, and optional mode label', () => {
    render(<Harness users={[mkUser({ displayName: 'Alice Smith', online: true, mode: 'editing' })]} />);
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('editing')).toBeInTheDocument();
  });

  it('single-word user displayName produces a 1-char initial', () => {
    render(<Harness users={[mkUser({ displayName: 'Alice' })]} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('group row renders # glyph, @-prefixed lowercased name, and member count', () => {
    render(<Harness users={[{ userId: 'g1', displayName: 'Engineers', color: '#00f', online: false, type: 'group', memberCount: 5 }]} />);
    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('@engineers')).toBeInTheDocument();
    expect(screen.getByText('5 members')).toBeInTheDocument();
  });
});
