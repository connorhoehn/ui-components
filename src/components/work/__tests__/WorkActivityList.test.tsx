import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { WorkActivityList } from '../WorkActivityList';

const NOW = Date.parse('2026-09-23T12:00:00Z');

describe('WorkActivityList', () => {
  it('lists events newest first, whatever order they arrive in', () => {
    render(
      <WorkActivityList
        now={NOW}
        events={[
          { id: 'a', kind: 'status', at: '2026-09-20T12:00:00Z', text: 'Status changed from Open to In progress', actor: 'Layla Hassan' },
          { id: 'b', kind: 'run', at: '2026-09-22T12:00:00Z', text: 'Agent run finished', detail: '$0.18' },
        ]}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items.map((li) => li.getAttribute('data-testid'))).toEqual(['work-activity-b', 'work-activity-a']);
    expect(items[0]!.textContent).toContain('$0.18');
    expect(items[1]!.textContent).toContain('Layla Hassan');
  });

  it('sorts an unparseable time last and prints no time for it', () => {
    render(
      <WorkActivityList
        now={NOW}
        events={[
          { id: 'bad', kind: 'system', at: 'not a date', text: 'Mystery' },
          { id: 'ok', kind: 'comment', at: '2026-09-22T12:00:00Z', text: 'Commented' },
        ]}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items[1]!.getAttribute('data-testid')).toBe('work-activity-bad');
    expect(items[1]!.querySelector('time')).toBeNull();
  });

  it('says so when empty, loading or failed', () => {
    const { rerender } = render(<WorkActivityList events={[]} />);
    expect(screen.getByText('Nothing has happened on this item yet')).toBeTruthy();
    rerender(<WorkActivityList events={[]} loading />);
    expect(screen.getByText('Loading activity…')).toBeTruthy();
    rerender(<WorkActivityList events={[]} error="History could not be read" />);
    expect(screen.getByRole('alert').textContent).toBe('History could not be read');
  });

  it('opens an event through the host', () => {
    const onOpen = vi.fn();
    render(<WorkActivityList now={NOW} events={[{ id: 'r', kind: 'run', at: NOW, text: 'Run started', onOpen, openLabel: 'Open run' }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open run' }));
    expect(onOpen).toHaveBeenCalled();
  });

  const beat = (i: number, at: number) => ({ id: `h${i}`, kind: 'system' as const, at, text: 'Worker heartbeat', lowSignal: true });

  it('collapses a consecutive run of the same event into one row with a count', () => {
    render(
      <WorkActivityList
        now={NOW}
        events={[
          ...[1, 2, 3, 4].map((i) => ({ id: `p${i}`, kind: 'system' as const, at: NOW - i * 60_000, text: 'Worker progress' })),
          { id: 's', kind: 'status', at: NOW - 3_600_000, text: 'Started' },
          { id: 'p9', kind: 'system', at: NOW - 7_200_000, text: 'Worker progress' },
        ]}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
    expect(items[0]!.getAttribute('data-activity-count')).toBe('4');
    expect(items[0]!.textContent).toContain('×4');
    // Not consecutive with the first run, so it stays its own row.
    expect(items[2]!.getAttribute('data-activity-count')).toBeNull();
  });

  it('lists every event when grouping is off', () => {
    render(<WorkActivityList now={NOW} group={false} limit={null} events={[1, 2, 3].map((i) => ({ id: `p${i}`, kind: 'system' as const, at: NOW - i, text: 'Same' }))} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('hides low-signal events until "Show all events"', () => {
    render(
      <WorkActivityList
        now={NOW}
        isLowSignal={(e) => e.text === 'Worker progress'}
        events={[beat(1, NOW - 1000), beat(2, NOW - 2000), { id: 'pr', kind: 'system', at: NOW - 3000, text: 'Worker progress' }, { id: 'c', kind: 'comment', at: NOW - 4000, text: 'Commented' }]}
      />,
    );
    expect(screen.getAllByRole('listitem').map((li) => li.getAttribute('data-testid'))).toEqual(['work-activity-c']);
    const toggle = screen.getByRole('button', { name: 'Show all events (3 routine hidden)' });
    fireEvent.click(toggle);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Hide routine events' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('says so when every event is routine', () => {
    render(<WorkActivityList now={NOW} events={[beat(1, NOW)]} />);
    expect(screen.getByText('Only routine events so far')).toBeTruthy();
  });

  it('caps the rows at five with "Show N more", and limit={null} opts out', () => {
    const many = Array.from({ length: 8 }, (_, i) => ({ id: `e${i}`, kind: 'comment' as const, at: NOW - i * 1000, text: `Comment ${i}` }));
    const { unmount } = render(<WorkActivityList now={NOW} events={many} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: 'Show 3 more' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.queryByRole('button', { name: /more/ })).toBeNull();
    unmount();
    render(<WorkActivityList now={NOW} limit={null} events={many} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  it('does not repeat a relative time equal to the row above', () => {
    const DAY = 86_400_000;
    const events = [
      { id: 'a', kind: 'comment' as const, at: NOW - DAY - 1000, text: 'One' },
      { id: 'b', kind: 'comment' as const, at: NOW - DAY - 2000, text: 'Two' },
      { id: 'c', kind: 'comment' as const, at: NOW - 3 * DAY, text: 'Three' },
    ];
    const { unmount } = render(<WorkActivityList now={NOW} events={events} />);
    expect(screen.getAllByRole('listitem').map((li) => li.querySelector('time')?.textContent ?? null)).toEqual(['1d ago', null, '3d ago']);
    unmount();
    render(<WorkActivityList now={NOW} repeatTimes events={events} />);
    expect(screen.getAllByRole('listitem').map((li) => li.querySelector('time')?.textContent ?? null)).toEqual(['1d ago', '1d ago', '3d ago']);
  });
});
