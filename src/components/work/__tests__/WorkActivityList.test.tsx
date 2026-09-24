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
});
