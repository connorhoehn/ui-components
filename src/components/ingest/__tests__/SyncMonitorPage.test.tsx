// This page is a live tail, and live tails have two classic defects: the
// progress bar divides by a file count that can legitimately be 0 before the
// first listing lands, and Pause has to freeze a SNAPSHOT rather than just
// stop scrolling — if it keeps reading the growing array, pausing does
// nothing. Both are pinned here, along with the two empty states, which say
// different things ("no events yet" vs "nothing matches your filter") and are
// the only signal telling an operator whether the stream or the filter is at
// fault.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ActiveSync, IngestProgressEvent, UseIngestProgressResult } from '../../../hooks/useIngestProgress';

const useIngestProgressMock = vi.fn<() => UseIngestProgressResult>();
const navigateMock = vi.fn<(to: string) => void>();

vi.mock('../../../hooks/useIngestProgress', () => ({ useIngestProgress: () => useIngestProgressMock() }));
vi.mock('react-router', () => ({ useNavigate: () => navigateMock }));

import SyncMonitorPage from '../SyncMonitorPage';

function ev(type: string, over: Partial<IngestProgressEvent> = {}): IngestProgressEvent {
  return { type, timestamp: '2026-01-01T10:00:00.000Z', ...over };
}

function sync(over: Partial<ActiveSync> = {}): ActiveSync {
  return {
    sourceId: 's1',
    sourceName: 'Team Drive',
    fileCount: 10,
    filesFetched: 5,
    itemsMapped: 3,
    itemsMaterialized: 2,
    startedAt: new Date(Date.now() - 5000).toISOString(),
    ...over,
  };
}

function renderPage(events: IngestProgressEvent[] = [], activeSyncs: ActiveSync[] = []) {
  const clearEvents = vi.fn();
  useIngestProgressMock.mockReturnValue({
    events,
    activeSyncs: new Map(activeSyncs.map((s) => [s.sourceId, s])),
    clearEvents,
  });
  const view = render(<SyncMonitorPage />);
  return { clearEvents, view };
}

function logLines(): string[] {
  const log = screen.queryByTestId('event-log');
  if (!log) return [];
  return Array.from(log.children).map((c) => c.textContent ?? '');
}

beforeEach(() => {
  useIngestProgressMock.mockReset();
  navigateMock.mockReset();
});

describe('SyncMonitorPage active syncs', () => {
  it('reports 0% instead of NaN when the file count is not known yet', () => {
    renderPage([], [sync({ fileCount: 0, filesFetched: 0 })]);
    expect(screen.getByText('Files: 0/0 (0%)')).toBeInTheDocument();
  });

  it('rounds the completion percentage', () => {
    renderPage([], [sync({ fileCount: 3, filesFetched: 1 })]);
    expect(screen.getByText('Files: 1/3 (33%)')).toBeInTheDocument();
  });

  it('shows the placeholder when no sync is running', () => {
    renderPage();
    expect(screen.getByText('No active syncs')).toBeInTheDocument();
  });
});

describe('SyncMonitorPage stats', () => {
  it('counts both failure kinds as errors and everything as events', () => {
    renderPage([
      ev('sync.started'), ev('item.mapped'), ev('item.failed'), ev('sync.failed'),
    ], [sync()]);
    // "Errors" is also a filter <option>, so pin the stat label to its <span>.
    const stat = (label: string) =>
      screen.getByText(label, { selector: 'span' }).parentElement!.querySelectorAll('span')[1].textContent;
    expect(stat('Events Received')).toBe('4');
    expect(stat('Errors')).toBe('2');
    expect(stat('Active Syncs')).toBe('1');
  });
});

describe('SyncMonitorPage event log filters', () => {
  const MIXED = [
    ev('sync.started', { sourceId: 'b-src', sourceName: 'B' }),
    ev('item.mapped', { sourceId: 'a-src', sourcePath: '/one.pdf' }),
    ev('item.failed', { sourceId: 'a-src', sourcePath: '/two.pdf' }),
    ev('source.created', { sourceId: 'b-src' }),
  ];

  it('shows everything under the default bucket', () => {
    renderPage(MIXED);
    expect(logLines()).toHaveLength(4);
  });

  it('the Item bucket keeps only item.* events', () => {
    renderPage(MIXED);
    fireEvent.change(screen.getByTestId('event-type-filter'), { target: { value: 'item' } });
    expect(logLines()).toHaveLength(2);
  });

  it('the Errors bucket spans both sync and item failures, not a single prefix', () => {
    renderPage([...MIXED, ev('sync.failed', { sourceId: 'b-src', error: 'timeout' })]);
    fireEvent.change(screen.getByTestId('event-type-filter'), { target: { value: 'errors' } });
    expect(logLines()).toHaveLength(2);
  });

  it('the source filter and the type filter compose', () => {
    renderPage(MIXED);
    fireEvent.change(screen.getByTestId('event-type-filter'), { target: { value: 'item' } });
    fireEvent.change(screen.getByTestId('event-source-filter'), { target: { value: 'a-src' } });
    expect(logLines()).toHaveLength(2);
    fireEvent.change(screen.getByTestId('event-source-filter'), { target: { value: 'b-src' } });
    expect(logLines()).toHaveLength(0);
  });

  it('offers each source once, sorted, drawn from events and active syncs alike', () => {
    renderPage(
      [ev('item.mapped', { sourceId: 'z-src' }), ev('item.mapped', { sourceId: 'z-src' })],
      [sync({ sourceId: 'a-src' })],
    );
    const opts = within(screen.getByTestId('event-source-filter')).getAllByRole('option');
    expect(opts.map((o) => (o as HTMLOptionElement).value)).toEqual(['', 'a-src', 'z-src']);
  });

  it('distinguishes "nothing arrived" from "nothing matches"', () => {
    renderPage();
    expect(screen.getByText('No events yet')).toBeInTheDocument();

    useIngestProgressMock.mockReset();
    renderPage([ev('sync.started', { sourceId: 'b-src' })]);
    fireEvent.change(screen.getAllByTestId('event-type-filter')[1], { target: { value: 'item' } });
    expect(screen.getByText('No events match the current filter')).toBeInTheDocument();
  });
});

describe('SyncMonitorPage pause', () => {
  it('freezes the visible log against later arrivals, then catches up on resume', () => {
    const first = [ev('sync.started', { sourceId: 'a', sourceName: 'A' })];
    const { view } = renderPage(first);
    fireEvent.click(screen.getByTestId('event-pause-toggle'));
    expect(screen.getByTestId('event-pause-toggle')).toHaveTextContent('Resume');

    // A new event arrives while paused.
    useIngestProgressMock.mockReturnValue({
      events: [...first, ev('item.mapped', { sourceId: 'a', sourcePath: '/late.pdf' })],
      activeSyncs: new Map(),
      clearEvents: vi.fn(),
    });
    view.rerender(<SyncMonitorPage />);
    expect(logLines()).toHaveLength(1);

    fireEvent.click(screen.getByTestId('event-pause-toggle'));
    expect(logLines()).toHaveLength(2);
  });
});

describe('SyncMonitorPage event copy', () => {
  it('names the source from sourceName, falling back to sourceId', () => {
    renderPage([
      ev('sync.started', { sourceId: 's1', sourceName: 'Team Drive' }),
      ev('sync.completed', { sourceId: 's2' }),
    ]);
    expect(screen.getByText('Sync started for Team Drive')).toBeInTheDocument();
    expect(screen.getByText('Sync completed for s2')).toBeInTheDocument();
  });

  it('renders an unknown file count as "?" rather than 0', () => {
    renderPage([ev('sync.progress', { sourceName: 'Drive', filesFetched: 4 })]);
    expect(screen.getByText('Drive: fetched 4/? files')).toBeInTheDocument();
  });

  it('appends the failure reason only when one is present', () => {
    renderPage([
      ev('sync.failed', { sourceName: 'A', error: 'timeout' }),
      ev('sync.failed', { sourceName: 'B' }),
    ]);
    expect(screen.getByText('Sync failed for A: timeout')).toBeInTheDocument();
    expect(screen.getByText('Sync failed for B')).toBeInTheDocument();
  });

  it('identifies an item by path, then id, then "unknown"', () => {
    renderPage([
      ev('item.mapped', { sourcePath: '/a.pdf' }),
      ev('item.materialized', { itemId: 'i-7' }),
      ev('item.failed', {}),
    ]);
    expect(screen.getByText('Item mapped: /a.pdf')).toBeInTheDocument();
    expect(screen.getByText('Item materialized: i-7')).toBeInTheDocument();
    expect(screen.getByText('Item failed: unknown')).toBeInTheDocument();
  });

  it('falls back to the raw type for an event it has no copy for', () => {
    renderPage([ev('source.deleted')]);
    // The description column carries the copy in its title attribute; here it
    // is the bare event type because nothing maps it.
    expect(screen.getByTitle('source.deleted')).toHaveTextContent('source.deleted');
  });
});

describe('SyncMonitorPage controls', () => {
  it('offers Clear only once there is something to clear', () => {
    renderPage();
    expect(screen.queryByRole('button', { name: 'Clear' })).toBeNull();
  });

  it('Clear delegates to the hook', () => {
    const { clearEvents } = renderPage([ev('sync.started')]);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(clearEvents).toHaveBeenCalledTimes(1);
  });

  it('the Sources button navigates rather than filtering in place', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Sources' }));
    expect(navigateMock).toHaveBeenCalledWith('/ingest/sources');
  });
});
