// src/integrations/realtime-modules/__tests__/WrappedNotificationCenter.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedNotificationCenter } from '../WrappedNotificationCenter';
import type { RMUseNotificationsReturn, RMNotificationEntry } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TS = '2026-05-22T10:00:00.000Z';

function makeEntry(overrides: Partial<RMNotificationEntry> = {}): RMNotificationEntry {
  return {
    id: 'notif-1',
    type: 'mention',
    title: 'You were mentioned',
    timestamp: TS,
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

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('WrappedNotificationCenter', () => {
  it('renders all unread notifications', () => {
    const entries = [
      makeEntry({ id: 'n1', title: 'First notification' }),
      makeEntry({ id: 'n2', title: 'Second notification' }),
    ];
    const hook = makeHook(entries);
    render(<WrappedNotificationCenter notifications={hook} />);
    // Unread tab is active by default
    expect(screen.getByText('First notification')).toBeInTheDocument();
    expect(screen.getByText('Second notification')).toBeInTheDocument();
  });

  it('renders read notifications on the All tab', () => {
    const entries = [
      makeEntry({ id: 'n1', title: 'Unread one', read: false }),
      makeEntry({ id: 'n2', title: 'Read one', read: true }),
    ];
    const hook = makeHook(entries);
    render(<WrappedNotificationCenter notifications={hook} />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Unread one')).toBeInTheDocument();
    expect(screen.getByText('Read one')).toBeInTheDocument();
  });

  it('calls markAsRead with item id when an item is clicked (default handler)', () => {
    const entries = [makeEntry({ id: 'n1', title: 'Click me' })];
    const hook = makeHook(entries);
    render(<WrappedNotificationCenter notifications={hook} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(hook.markAsRead).toHaveBeenCalledWith('n1');
  });

  it('uses custom onItemClick when provided, skipping markAsRead', () => {
    const entries = [makeEntry({ id: 'n1', title: 'Custom click' })];
    const hook = makeHook(entries);
    const onItemClick = vi.fn();
    render(<WrappedNotificationCenter notifications={hook} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText('Custom click'));
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(hook.markAsRead).not.toHaveBeenCalled();
  });

  it('calls markAllRead when Mark all read is clicked', () => {
    const entries = [makeEntry()];
    const hook = makeHook(entries);
    render(<WrappedNotificationCenter notifications={hook} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(hook.markAllRead).toHaveBeenCalledTimes(1);
  });

  it('calls clearAll when Clear all is clicked on All tab', () => {
    const entries = [makeEntry()];
    const hook = makeHook(entries);
    render(<WrappedNotificationCenter notifications={hook} />);
    fireEvent.click(screen.getByText('All'));
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(hook.clearAll).toHaveBeenCalledTimes(1);
  });

  it('shows empty state when notifications list is empty', () => {
    const hook = makeHook([]);
    render(<WrappedNotificationCenter notifications={hook} />);
    // NotificationCenter shows empty state when no unread items
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
