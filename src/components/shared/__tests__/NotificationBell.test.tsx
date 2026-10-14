import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NotificationBell } from '../NotificationBell';
import type { NotificationItem } from '../NotificationCenter';

const makeItems = (n: number, read = false): NotificationItem[] =>
  Array.from({ length: n }, (_, i) => ({ id: `n${i}`, title: `Notification ${i + 1}`, read }));

const button = () => screen.getByTestId('notification-bell-button');

describe('NotificationBell', () => {
  it('renders the unread count on the badge and hides it at 0', () => {
    const { rerender } = render(<NotificationBell items={makeItems(3)} />);
    expect(screen.getByTestId('notification-bell-badge')).toHaveTextContent('3');
    rerender(<NotificationBell items={makeItems(2, true)} />);
    expect(screen.queryByTestId('notification-bell-badge')).toBeNull();
  });

  it('caps the badge at 99+ and honours an explicit unreadCount', () => {
    const { rerender } = render(<NotificationBell items={makeItems(120)} />);
    expect(screen.getByTestId('notification-bell-badge')).toHaveTextContent('99+');
    rerender(<NotificationBell items={makeItems(1)} unreadCount={7} />);
    expect(screen.getByTestId('notification-bell-badge')).toHaveTextContent('7');
  });

  it('names the button with the label and the unread count', () => {
    const { rerender } = render(<NotificationBell items={makeItems(3)} />);
    expect(screen.getByRole('button', { name: 'Activity, 3 unread' })).toBe(button());
    expect(button()).toHaveAttribute('aria-haspopup', 'dialog');
    rerender(<NotificationBell items={[]} label="Inbox" />);
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('opens on click, closes on Escape and returns focus to the button', async () => {
    render(<NotificationBell items={makeItems(2)} />);
    expect(button()).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button());
    expect(button()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: 'Activity' })).toBeInTheDocument();
    expect(screen.getByTestId('notification-bell-center')).toBeInTheDocument();
    await act(async () => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(button()).toHaveAttribute('aria-expanded', 'false');
    expect(document.activeElement).toBe(button());
  });

  it('closes on an outside click and toggles on the button', () => {
    render(
      <div>
        <NotificationBell items={makeItems(1)} />
        <p data-testid="outside">elsewhere</p>
      </div>,
    );
    fireEvent.click(button());
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(button());
    fireEvent.click(button());
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('calls back on item click and closes; passes mark-all and clear-all through', () => {
    const onItemClick = vi.fn();
    const onMarkAllRead = vi.fn();
    const onClearAll = vi.fn();
    render(
      <NotificationBell
        items={makeItems(2)}
        onItemClick={onItemClick}
        onMarkAllRead={onMarkAllRead}
        onClearAll={onClearAll}
      />,
    );
    fireEvent.click(button());
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Notification 1'));
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'n0' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows "Nothing new" when there are no items', () => {
    render(<NotificationBell items={[]} />);
    fireEvent.click(button());
    expect(screen.getByTestId('notification-bell-empty')).toHaveTextContent('Nothing new');
    expect(screen.queryByTestId('notification-bell-center')).toBeNull();
  });

  it('sm is the 28px header control', () => {
    render(<NotificationBell items={[]} size="sm" />);
    expect(button().className).toMatch(/\bh-7\b/);
    expect(button().className).toMatch(/\bw-7\b/);
  });

  it('caps the panel at a fixed height so a 99+ feed scrolls inside it', () => {
    render(<NotificationBell items={makeItems(150)} />);
    fireEvent.click(button());
    const center = screen.getByTestId('notification-bell-center');
    expect(center.className).toContain('h-[min(70vh,560px)]');
    // The header with Mark all read sits outside the scrolling feed.
    const feed = center.querySelector('.overflow-y-auto');
    expect(feed).not.toBeNull();
    expect(feed?.contains(screen.getByRole('heading', { level: 2 }))).toBe(false);
  });

  it('pins a "See all activity" link under the feed that closes the popover first', () => {
    const onSelect = vi.fn();
    render(<NotificationBell items={makeItems(3)} seeAll={{ onSelect }} />);
    fireEvent.click(button());
    const link = screen.getByTestId('notification-bell-see-all');
    expect(link).toHaveTextContent('See all activity');
    expect(link.closest('[data-notification-footer]')).not.toBeNull();
    fireEvent.click(link);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(button()).toHaveAttribute('aria-expanded', 'false');
  });

  it('offers the link in the empty state too, and marks its root for the DOM audit', () => {
    const { container } = render(<NotificationBell items={[]} seeAll={{ label: 'Open activity', onSelect: () => {} }} />);
    expect(container.querySelector('[data-notification-bell]')).not.toBeNull();
    fireEvent.click(button());
    expect(screen.getByTestId('notification-bell-see-all')).toHaveTextContent('Open activity');
  });
});
