import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ActivityFeed, type ActivityFeedItem } from '../ActivityFeed';

const ITEMS: ActivityFeedItem[] = [
  { id: '1', actor: 'Alex Chen', action: 'completed', subject: 'API cleanup', ticketId: 'K8S-1', kind: 'task' },
  { id: '2', actor: 'Bo Diaz', action: 'merged', subject: 'PR review', kind: 'pr' },
  { id: '3', actor: 'Cai Lund', action: 'decided', subject: 'Schema v2', kind: 'decision' },
  { id: '4', actor: 'Dee Park', action: 'commented', subject: 'Design doc', kind: 'comment' },
];

describe('ActivityFeed', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('shows the empty message with no items', () => {
    render(<ActivityFeed items={[]} />);
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
  });

  it('shows the first visibleCount items with shortened actor names', () => {
    render(<ActivityFeed items={ITEMS} visibleCount={2} rotateMs={0} />);
    expect(screen.getByText('Alex C.')).toBeInTheDocument();
    expect(screen.getByText('Bo D.')).toBeInTheDocument();
    expect(screen.queryByText('Cai L.')).toBeNull();
  });

  it('renders the ticket badge when present', () => {
    render(<ActivityFeed items={ITEMS} rotateMs={0} />);
    expect(screen.getByText('K8S-1')).toBeInTheDocument();
  });

  it('rotates the pool on the interval, newest first', () => {
    render(<ActivityFeed items={ITEMS} visibleCount={2} rotateMs={1000} />);
    expect(screen.queryByText('Cai L.')).toBeNull();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText('Cai L.')).toBeInTheDocument();
    // Oldest visible (Bo) has rotated out.
    expect(screen.queryByText('Bo D.')).toBeNull();
  });

  it('rotateMs=0 disables rotation', () => {
    render(<ActivityFeed items={ITEMS} visibleCount={2} rotateMs={0} />);
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.queryByText('Cai L.')).toBeNull();
  });

  it('kindColors overrides the dot palette per kind', () => {
    const { container } = render(
      <ActivityFeed
        items={[ITEMS[0]]}
        rotateMs={0}
        kindColors={{ task: 'var(--color-danger)' }}
      />,
    );
    const dot = container.querySelector('.uc-activity-row span') as HTMLElement;
    expect(dot.style.background).toBe('var(--color-danger)');
  });

  // Regression: the rotation carried only `prev[0]` and `prev[1]` forward, so
  // the window could never hold more than 3 rows however large `visibleCount`
  // was. `visibleCount={5}` rendered 5 rows on mount and permanently collapsed
  // to 3 on the first tick. `visibleCount` must be 4 or more here — at 2 or 3
  // the buggy and correct behaviour are identical.
  it('keeps rendering visibleCount rows across rotations when visibleCount > 3', () => {
    const many: ActivityFeedItem[] = Array.from({ length: 8 }, (_, i) => ({
      id: `m${i}`,
      actor: `Actor${i} Last`,
      action: 'did',
      subject: `thing ${i}`,
      kind: 'task',
    }));
    const { container } = render(
      <ActivityFeed items={many} visibleCount={5} rotateMs={1000} />,
    );
    const rowCount = () => container.querySelectorAll('.uc-activity-row').length;

    expect(rowCount()).toBe(5);
    act(() => vi.advanceTimersByTime(1000));
    expect(rowCount()).toBe(5);
    act(() => vi.advanceTimersByTime(3000));
    expect(rowCount()).toBe(5);
  });
});
