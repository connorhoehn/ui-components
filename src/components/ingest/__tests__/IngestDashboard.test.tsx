// The dashboard is the only place the ingest subsystem does arithmetic on
// operator-facing numbers, and every one of those sums has a boundary an
// operator would notice being wrong: the queue-depth alert fires at >50 (not
// >=), the last-hour failure-rate alert needs a 5-item sample before it will
// divide (otherwise one failure out of one item screams 100%), and "recently
// completed" is a 24h window that must not count anything older. The activity
// list is also a sort + slice(0,5), which is exactly the shape that silently
// shows the wrong five rows if the comparator flips.

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseIngestSourcesReturn } from '../../../hooks/useIngestSources';
import type { UseIngestItemsReturn } from '../../../hooks/useIngestItems';
import type { IngestItem, IngestItemStatus, IngestSource } from '../../../types/ingest';

const useIngestSourcesMock = vi.fn<() => UseIngestSourcesReturn>();
const useIngestItemsMock = vi.fn<() => UseIngestItemsReturn>();
const navigateMock = vi.fn<(to: string) => void>();

vi.mock('../../../hooks/useIngestSources', () => ({ useIngestSources: () => useIngestSourcesMock() }));
vi.mock('../../../hooks/useIngestItems', () => ({ useIngestItems: () => useIngestItemsMock() }));
vi.mock('react-router', () => ({ useNavigate: () => navigateMock }));
vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'tok' }),
  useOptionalIdentityContext: () => ({ idToken: 'tok' }),
}));

import IngestDashboard from '../IngestDashboard';

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000).toISOString();

function source(over: Partial<IngestSource> = {}): IngestSource {
  return {
    sourceId: 's1',
    name: 'Drive',
    type: 's3',
    config: {},
    syncSchedule: null,
    mappingRules: [],
    defaultPipelineId: null,
    status: 'active',
    lastSyncAt: null,
    lastSyncStats: null,
    createdAt: minutesAgo(1000),
    updatedAt: minutesAgo(1000),
    ...over,
  } as IngestSource;
}

function item(status: IngestItemStatus, updatedMinutesAgo: number, over: Partial<IngestItem> = {}): IngestItem {
  return {
    itemId: `i-${status}-${updatedMinutesAgo}-${Math.random().toString(36).slice(2, 7)}`,
    sourceId: 's1',
    sourcePath: `/files/${status}.txt`,
    status,
    documentTypeId: null,
    documentId: null,
    pipelineRunId: null,
    mappingMethod: null,
    mappingConfidence: null,
    error: null,
    createdAt: minutesAgo(updatedMinutesAgo),
    updatedAt: minutesAgo(updatedMinutesAgo),
    ...over,
  } as IngestItem;
}

function renderDashboard(sources: IngestSource[] = [], items: IngestItem[] = [], over: {
  sources?: Partial<UseIngestSourcesReturn>;
  items?: Partial<UseIngestItemsReturn>;
} = {}) {
  const sourcesHook: UseIngestSourcesReturn = {
    sources, loading: false, error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    createSource: vi.fn().mockResolvedValue(null),
    deleteSource: vi.fn().mockResolvedValue(true),
    triggerSync: vi.fn().mockResolvedValue(true),
    actionError: null, clearActionError: vi.fn(),
    ...over.sources,
  };
  const itemsHook: UseIngestItemsReturn = {
    items, loading: false, error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    retryItem: vi.fn().mockResolvedValue(true),
    skipItem: vi.fn().mockResolvedValue(true),
    actionError: null, clearActionError: vi.fn(),
    ...over.items,
  };
  useIngestSourcesMock.mockReturnValue(sourcesHook);
  useIngestItemsMock.mockReturnValue(itemsHook);
  render(<IngestDashboard />);
  return { sourcesHook, itemsHook };
}

/** The number rendered in the summary card with the given label. */
function cardValue(label: string): string {
  const heading = screen.getByText(label);
  return heading.parentElement!.querySelectorAll('span')[1].textContent ?? '';
}

beforeEach(() => {
  useIngestSourcesMock.mockReset();
  useIngestItemsMock.mockReset();
  navigateMock.mockReset();
});

describe('IngestDashboard first paint', () => {
  it('shows skeletons only when loading with nothing cached at all', () => {
    renderDashboard([], [], { sources: { loading: true }, items: { loading: true } });
    expect(screen.queryByText('Recent Activity')).toBeNull();
  });

  it('renders the real dashboard as soon as either hook has data, even mid-load', () => {
    renderDashboard([source()], [], { sources: { loading: true } });
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
  });

  it('reports zeroes rather than blanks for an empty subsystem', () => {
    renderDashboard();
    expect(cardValue('Sources')).toBe('0');
    expect(cardValue('In Queue')).toBe('0');
    expect(cardValue('Errors')).toBe('0');
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
  });
});

describe('IngestDashboard counters', () => {
  it('counts everything that is neither done nor failed as queued', () => {
    renderDashboard([], [
      item('queued', 1), item('mapping', 1), item('materializing', 1), item('triggering', 1),
      item('done', 1), item('failed', 1),
    ]);
    expect(cardValue('In Queue')).toBe('4');
    expect(cardValue('Errors')).toBe('1');
  });

  it('the 24h completion window excludes older completions', () => {
    renderDashboard([], [
      item('done', 60),          // 1h ago — inside
      item('done', 60 * 23),     // 23h ago — inside
      item('done', 60 * 25),     // 25h ago — outside
    ]);
    expect(cardValue('Completed (24h)')).toBe('2');
  });

  it('breaks sources down by status and hides the error clause when there are none', () => {
    renderDashboard([source({ sourceId: 'a' }), source({ sourceId: 'b', status: 'paused' })]);
    expect(cardValue('Sources')).toBe('2');
    expect(screen.getByText('1 active, 1 paused')).toBeInTheDocument();
  });

  it('appends the error clause once a source is failing', () => {
    renderDashboard([source({ sourceId: 'a' }), source({ sourceId: 'b', status: 'error' })]);
    expect(screen.getByText('1 active, 0 paused, 1 error')).toBeInTheDocument();
  });
});

describe('IngestDashboard alerts', () => {
  it('raises one critical alert per errored source, naming it', () => {
    renderDashboard([source({ sourceId: 'a', name: 'Drive', status: 'error' })]);
    const alert = screen.getByTestId('alert-source-error-a');
    expect(alert).toHaveTextContent('Source "Drive" is in error state');
  });

  it('will not compute a failure rate from fewer than five recent items', () => {
    renderDashboard([], [item('failed', 5), item('failed', 5), item('done', 5), item('done', 5)]);
    expect(screen.queryByTestId('alert-failure-rate-1h')).toBeNull();
  });

  it('raises the failure-rate alert once the sample is big enough and the rate clears 10%', () => {
    renderDashboard([], [
      item('failed', 5), item('done', 5), item('done', 5), item('done', 5), item('done', 5),
    ]);
    expect(screen.getByTestId('alert-failure-rate-1h')).toHaveTextContent('20% (1 of 5 items failed)');
  });

  it('ignores failures older than the one-hour window', () => {
    renderDashboard([], [
      item('failed', 90), item('done', 5), item('done', 5), item('done', 5), item('done', 5), item('done', 5),
    ]);
    expect(screen.queryByTestId('alert-failure-rate-1h')).toBeNull();
  });

  it('the queue-depth alert is strictly greater than 50, not at 50', () => {
    const fifty = Array.from({ length: 50 }, () => item('queued', 1));
    renderDashboard([], fifty);
    expect(screen.queryByTestId('alert-queue-depth')).toBeNull();

    useIngestSourcesMock.mockReset();
    useIngestItemsMock.mockReset();
    renderDashboard([], [...fifty, item('queued', 1)]);
    expect(screen.getByTestId('alert-queue-depth')).toHaveTextContent('Queue depth is 51 items');
  });

  it('renders no alerts strip at all when nothing is wrong', () => {
    renderDashboard([source()], [item('done', 5)]);
    expect(screen.queryByTestId('alerts-strip')).toBeNull();
  });
});

describe('IngestDashboard recent activity', () => {
  it('lists only completed items, newest first, capped at five', () => {
    const items = [
      item('done', 50, { sourcePath: '/oldest' }),
      item('done', 10, { sourcePath: '/newest' }),
      item('done', 40, { sourcePath: '/d' }),
      item('done', 30, { sourcePath: '/c' }),
      item('done', 20, { sourcePath: '/b' }),
      item('done', 45, { sourcePath: '/e' }),
      item('failed', 1, { sourcePath: '/failed' }),
    ];
    renderDashboard([], items);
    expect(screen.queryByText('/failed')).toBeNull();
    expect(screen.queryByText('/oldest')).toBeNull(); // 6th newest — sliced off
    const paths = screen.getAllByTitle(/^\//).map((el) => el.textContent);
    expect(paths).toEqual(['/newest', '/b', '/c', '/d', '/e']);
  });
});

describe('IngestDashboard error recovery', () => {
  it('a hook error surfaces a Retry that refreshes BOTH hooks', () => {
    const { sourcesHook, itemsHook } = renderDashboard([], [], { items: { error: 'boom' } });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(sourcesHook.refresh).toHaveBeenCalledTimes(1);
    expect(itemsHook.refresh).toHaveBeenCalledTimes(1);
  });

  it('Add Source navigates to the sources route', () => {
    renderDashboard();
    fireEvent.click(screen.getByTestId('add-source-btn'));
    expect(navigateMock).toHaveBeenCalledWith('/ingest/sources');
  });
});
