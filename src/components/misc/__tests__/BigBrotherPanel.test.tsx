import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

import { BigBrotherPanel, type BigBrotherPanelProps } from '../BigBrotherPanel';
import type { PresenceUser } from '../../../hooks/usePresence';
import type { RoomItem } from '../../../hooks/useRooms';
import type { ActivityEvent } from '../../../hooks/useActivityBus';

const NOW_MS = Date.UTC(2026, 5, 7, 12, 0, 0);

function mkRoom(over: Partial<RoomItem> & Pick<RoomItem, 'roomId'>): RoomItem {
  return {
    roomId: over.roomId,
    channelId: over.channelId ?? 'ch-1',
    name: over.name ?? `room-${over.roomId}`,
    type: over.type ?? 'standalone',
    ownerId: over.ownerId ?? 'owner',
    createdAt: over.createdAt ?? '2026-01-15T08:30:00Z',
  };
}

function mkEvent(over: Partial<ActivityEvent> & Pick<ActivityEvent, 'id' | 'eventType'>): ActivityEvent {
  return {
    id: over.id,
    eventType: over.eventType,
    detail: over.detail ?? {},
    timestamp: over.timestamp ?? new Date(NOW_MS).toISOString(),
    userId: over.userId,
    displayName: over.displayName,
    color: over.color,
    source: over.source ?? 'remote',
  };
}

function mkUser(clientId: string): PresenceUser {
  return { clientId, status: 'online', metadata: {} };
}

function renderPanel(over: Partial<BigBrotherPanelProps> = {}) {
  return render(
    <BigBrotherPanel
      rooms={over.rooms ?? []}
      presenceUsers={over.presenceUsers ?? []}
      activityEvents={over.activityEvents ?? []}
      activityIsLive={over.activityIsLive ?? false}
    />,
  );
}

// Stats labels render in <div className="...uppercase">{label}</div>; the
// section headings (e.g. "Rooms") are <h2>. The selector restriction
// disambiguates the duplicate labels.
function statValue(label: string): string | null {
  return screen.getByText(label, { selector: 'div' }).previousElementSibling?.textContent?.trim() ?? null;
}

function firstEventRow(): HTMLElement {
  // h2("Live Events") → parent right-column div → first event row (div > div).
  return screen.getByText(/Live Events/).parentElement!.querySelector('div > div') as HTMLElement;
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(NOW_MS));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('BigBrotherPanel', () => {
  describe('stats bar', () => {
    it('shows online / rooms / events counts', () => {
      renderPanel({
        rooms: [mkRoom({ roomId: 'r1' }), mkRoom({ roomId: 'r2' })],
        presenceUsers: [mkUser('a'), mkUser('b'), mkUser('c')],
        activityEvents: [mkEvent({ id: 'e1', eventType: 'doc.add_section' })],
        activityIsLive: true,
      });
      expect(statValue('Online')).toBe('3');
      expect(statValue('Rooms')).toBe('2');
      expect(statValue('Events')).toBe('1');
    });

    it('handles zero counts cleanly', () => {
      renderPanel();
      expect(statValue('Online')).toBe('0');
      expect(statValue('Rooms')).toBe('0');
      expect(statValue('Events')).toBe('0');
    });
  });

  describe('rooms list', () => {
    it('shows "No rooms yet" empty state', () => {
      renderPanel();
      expect(screen.getByText('No rooms yet')).toBeInTheDocument();
    });

    it('renders room name, type badge and createdAt prefix for each room', () => {
      renderPanel({
        rooms: [
          mkRoom({ roomId: 'r1', name: 'Alpha', type: 'group', createdAt: '2026-03-04T11:22:33Z' }),
          mkRoom({ roomId: 'r2', name: 'Bravo', type: 'dm', createdAt: '2026-04-05T01:02:03Z' }),
        ],
      });
      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Bravo')).toBeInTheDocument();
      expect(screen.getByText('group')).toBeInTheDocument();
      expect(screen.getByText('dm')).toBeInTheDocument();
      expect(screen.getByText('2026-03-04')).toBeInTheDocument();
      expect(screen.getByText('2026-04-05')).toBeInTheDocument();
    });
  });

  describe('live events feed', () => {
    it('shows "No events yet" hint when feed empty', () => {
      renderPanel();
      expect(screen.getByText(/No events yet/)).toBeInTheDocument();
    });

    it('renders activityIsLive green dot only when isLive=true', () => {
      const { container, rerender } = renderPanel({ activityIsLive: false });
      expect(container.querySelector('[title="Live"]')).toBeNull();
      rerender(
        <BigBrotherPanel rooms={[]} presenceUsers={[]} activityEvents={[]} activityIsLive />,
      );
      expect(container.querySelector('[title="Live"]')).not.toBeNull();
    });

    it('renders displayName with color when present', () => {
      renderPanel({
        activityEvents: [
          mkEvent({ id: 'e1', eventType: 'doc.add_section', displayName: 'Alice', color: '#ff0080' }),
        ],
      });
      expect(screen.getByText('Alice')).toHaveStyle({ color: '#ff0080' });
    });
  });

  describe('formatActivity event-type mapping', () => {
    function renderEvent(eventType: string, detail: Record<string, unknown> = {}): HTMLElement {
      renderPanel({ activityEvents: [mkEvent({ id: 'e1', eventType, detail })] });
      return firstEventRow();
    }

    it('maps social.room.join to roomId-truncated text', () => {
      expect(within(renderEvent('social.room.join', { roomId: 'abcd1234ef' })).getByText(/Joined room abcd1234/)).toBeInTheDocument();
    });

    it('maps doc.ack to the acknowledged item text', () => {
      expect(within(renderEvent('doc.ack', { itemText: 'ship release' })).getByText(/Acknowledged ship release/)).toBeInTheDocument();
    });

    it('maps pipeline.run.started with pipelineId', () => {
      expect(within(renderEvent('pipeline.run.started', { pipelineId: 'pl-77' })).getByText(/Triggered pipeline pl-77/)).toBeInTheDocument();
    });

    it('maps pipeline.run.completed with durationMs', () => {
      expect(within(renderEvent('pipeline.run.completed', { durationMs: 1234 })).getByText(/completed in 1234ms/)).toBeInTheDocument();
    });

    it('maps pipeline.run.failed including error string', () => {
      expect(within(renderEvent('pipeline.run.failed', { error: 'boom' })).getByText(/Pipeline run failed: boom/)).toBeInTheDocument();
    });

    it('falls back to raw eventType for unknown types', () => {
      expect(within(renderEvent('some.unknown.thing')).getByText('some.unknown.thing')).toBeInTheDocument();
    });
  });

  describe('relativeTime helper (via rendered timestamp)', () => {
    function renderTs(timestamp: string): void {
      renderPanel({ activityEvents: [mkEvent({ id: 'e1', eventType: 'doc.add_section', timestamp })] });
    }

    it('"just now" for sub-minute deltas', () => {
      renderTs(new Date(NOW_MS - 30_000).toISOString());
      expect(screen.getByText('just now')).toBeInTheDocument();
    });

    it('"Xm ago" for sub-hour deltas', () => {
      renderTs(new Date(NOW_MS - 5 * 60_000).toISOString());
      expect(screen.getByText('5m ago')).toBeInTheDocument();
    });

    it('date prefix for deltas over an hour', () => {
      renderTs('2025-12-25T08:30:00Z');
      expect(screen.getByText('2025-12-25')).toBeInTheDocument();
    });
  });
});
