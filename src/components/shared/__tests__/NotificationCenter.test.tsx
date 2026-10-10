import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationCenter } from '../NotificationCenter';
import type { NotificationItem } from '../NotificationCenter';

const makeItems = (n: number, read = false): NotificationItem[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `n${i}`,
    title: `Notification ${i + 1}`,
    body: `Body text ${i + 1}`,
    read,
  }));

describe('NotificationCenter', () => {
  it('links each selected filter to its named content panel', () => {
    render(<NotificationCenter items={makeItems(1)} />);
    for (const name of [/Unread/, /^All$/]) {
      const tab = screen.getByRole('tab', { name });
      fireEvent.click(tab);
      const panel = screen.getByRole('tabpanel');
      expect(tab).toHaveAttribute('aria-controls', panel.id);
      expect(panel).toHaveAttribute('aria-labelledby', tab.id);
      expect(tab).toHaveAttribute('aria-selected', 'true');
    }
  });
  it('renders unread tab by default', () => {
    render(<NotificationCenter items={makeItems(3)} />);
    expect(screen.getByText(/^Unread/)).toBeInTheDocument();
  });

  it('shows empty state when no unread items', () => {
    render(<NotificationCenter items={makeItems(2, true)} />);
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('shows empty state in All tab when items is empty', () => {
    render(<NotificationCenter items={[]} />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('renders unread items on Unread tab', () => {
    const items: NotificationItem[] = [
      { id: '1', title: 'Unread one', read: false },
      { id: '2', title: 'Read one', read: true },
    ];
    render(<NotificationCenter items={items} />);
    expect(screen.getByText('Unread one')).toBeInTheDocument();
    expect(screen.queryByText('Read one')).not.toBeInTheDocument();
  });

  it('shows all items on All tab', () => {
    const items: NotificationItem[] = [
      { id: '1', title: 'Unread one', read: false },
      { id: '2', title: 'Read one', read: true },
    ];
    render(<NotificationCenter items={items} />);
    fireEvent.click(screen.getByText('All'));
    expect(screen.getByText('Unread one')).toBeInTheDocument();
    expect(screen.getByText('Read one')).toBeInTheDocument();
  });

  it('calls onItemClick when item is clicked', () => {
    const onItemClick = vi.fn();
    const items = makeItems(2);
    render(<NotificationCenter items={items} onItemClick={onItemClick} />);
    fireEvent.click(screen.getByText('Notification 1'));
    expect(onItemClick).toHaveBeenCalledWith(items[0]);
  });

  it('calls onMarkAllRead when button clicked', () => {
    const onMarkAllRead = vi.fn();
    render(<NotificationCenter items={makeItems(2)} onMarkAllRead={onMarkAllRead} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mark all read' }));
    expect(onMarkAllRead).toHaveBeenCalledTimes(1);
  });

  it('does not show Mark all read when no unread items', () => {
    render(<NotificationCenter items={makeItems(2, true)} onMarkAllRead={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Mark all read' })).not.toBeInTheDocument();
  });

  it('calls onClearAll when Clear all is clicked', () => {
    const onClearAll = vi.fn();
    render(<NotificationCenter items={makeItems(2)} onClearAll={onClearAll} />);
    fireEvent.click(screen.getByText('All'));
    fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('shows unread badge count in header', () => {
    render(<NotificationCenter items={makeItems(3)} />);
    // unread badge should show 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders notification body text', () => {
    const items: NotificationItem[] = [{ id: '1', title: 'Title', body: 'Some body', read: false }];
    render(<NotificationCenter items={items} />);
    expect(screen.getByText('Some body')).toBeInTheDocument();
  });

  it('renders notification icon when provided', () => {
    const items: NotificationItem[] = [{ id: '1', title: 'Alert', icon: '🔔', read: false }];
    render(<NotificationCenter items={items} />);
    expect(screen.getByText('🔔')).toBeInTheDocument();
  });
});
