// src/integrations/realtime-modules/__tests__/WrappedNotificationBell.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedNotificationBell } from '../WrappedNotificationBell';
import type { RMUseNotificationsReturn, RMNotificationEntry } from '../types';

function makeEntry(overrides: Partial<RMNotificationEntry> = {}): RMNotificationEntry {
  return {
    id: 'notif-1',
    type: 'mention',
    title: 'You were mentioned',
    timestamp: '2026-05-22T10:00:00.000Z',
    read: false,
    ...overrides,
  };
}

function makeHook(
  entries: RMNotificationEntry[] = [],
  overrides: Partial<RMUseNotificationsReturn> = {},
): RMUseNotificationsReturn {
  return {
    notifications: entries,
    unreadCount: entries.filter((n) => !n.read).length,
    markAsRead: vi.fn(),
    markAllRead: vi.fn(),
    remove: vi.fn(),
    clearAll: vi.fn(),
    ...overrides,
  };
}

const open = () => fireEvent.click(screen.getByTestId('notification-bell-button'));

describe('WrappedNotificationBell', () => {
  it("takes the hook's unreadCount for the badge and the name", () => {
    const hook = makeHook([makeEntry({ id: 'a' }), makeEntry({ id: 'b' })], { unreadCount: 5 });
    render(<WrappedNotificationBell notifications={hook} />);
    expect(screen.getByTestId('notification-bell-badge')).toHaveTextContent('5');
    expect(screen.getByRole('button', { name: 'Activity, 5 unread' })).toBeInTheDocument();
  });

  it('marks the clicked item read by default', () => {
    const hook = makeHook([makeEntry({ id: 'n1', title: 'Click me' })]);
    render(<WrappedNotificationBell notifications={hook} />);
    open();
    fireEvent.click(screen.getByText('Click me'));
    expect(hook.markAsRead).toHaveBeenCalledWith('n1');
  });

  it('hands a custom onItemClick the item and the original entry, skipping markAsRead', () => {
    const entry = makeEntry({ id: 'n1', title: 'Go there', channel: 'general' });
    const hook = makeHook([entry]);
    const onItemClick = vi.fn();
    render(<WrappedNotificationBell notifications={hook} onItemClick={onItemClick} />);
    open();
    fireEvent.click(screen.getByText('Go there'));
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'n1' }), entry);
    expect(hook.markAsRead).not.toHaveBeenCalled();
  });

  it('wires Mark all read and Clear all to the hook', () => {
    const hook = makeHook([makeEntry()]);
    render(<WrappedNotificationBell notifications={hook} />);
    open();
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(hook.markAllRead).toHaveBeenCalledTimes(1);
    expect(hook.clearAll).toHaveBeenCalledTimes(1);
  });

  it('shows the empty state with no notifications', () => {
    render(<WrappedNotificationBell notifications={makeHook([])} />);
    open();
    expect(screen.getByTestId('notification-bell-empty')).toHaveTextContent('Nothing new');
  });
});
