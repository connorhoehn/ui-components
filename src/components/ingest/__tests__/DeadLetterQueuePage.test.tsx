import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { DLQEntryRow, UseIngestDLQResult } from '../../../hooks/useIngestDLQ';

const useIngestDLQMock = vi.fn<() => UseIngestDLQResult>();

vi.mock('../../../hooks/useIngestDLQ', () => ({
  useIngestDLQ: () => useIngestDLQMock(),
}));

import DeadLetterQueuePage from '../DeadLetterQueuePage';

function makeEntry(overrides: Partial<DLQEntryRow> = {}): DLQEntryRow {
  return {
    id: 'env-1',
    envelope: { id: 'env-1', body: { sourceId: 'src-abcdef123456' } },
    lastError: 'boom',
    failedAtMs: Date.now() - 5_000,
    totalAttempts: 3,
    ...overrides,
  };
}

function makeHook(overrides: Partial<UseIngestDLQResult> = {}): UseIngestDLQResult {
  return {
    entries: [],
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    replay: vi.fn().mockResolvedValue(undefined),
    drop: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  useIngestDLQMock.mockReset();
});

describe('DeadLetterQueuePage', () => {
  it('renders the empty state when there are no entries and no error', () => {
    useIngestDLQMock.mockReturnValue(makeHook());
    render(<DeadLetterQueuePage />);
    expect(screen.getByTestId('ingest-dlq-empty')).toBeInTheDocument();
    expect(screen.getByText('DLQ is empty')).toBeInTheDocument();
  });

  it('renders the error banner when error is set', () => {
    useIngestDLQMock.mockReturnValue(makeHook({ error: 'network unavailable' }));
    render(<DeadLetterQueuePage />);
    const banner = screen.getByTestId('ingest-dlq-error');
    expect(banner).toHaveTextContent('network unavailable');
  });

  it('renders skeleton placeholders while loading with no entries', () => {
    useIngestDLQMock.mockReturnValue(makeHook({ loading: true }));
    render(<DeadLetterQueuePage />);
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(3);
    expect(screen.queryByTestId('ingest-dlq-list')).not.toBeInTheDocument();
  });

  it('renders one row per entry with id, attempts, and lastError visible', () => {
    const entries = [
      makeEntry({ id: 'env-a', totalAttempts: 2, lastError: 'timeout' }),
      makeEntry({ id: 'env-b', totalAttempts: 7, lastError: 'parse failed' }),
    ];
    useIngestDLQMock.mockReturnValue(makeHook({ entries }));
    render(<DeadLetterQueuePage />);
    expect(screen.getByTestId('ingest-dlq-list')).toBeInTheDocument();
    expect(screen.getByTestId('dlq-row-env-a')).toHaveTextContent('env-a');
    expect(screen.getByTestId('dlq-row-env-a')).toHaveTextContent('timeout');
    expect(screen.getByTestId('dlq-row-env-b')).toHaveTextContent('parse failed');
    expect(screen.getByTestId('dlq-row-env-b')).toHaveTextContent('7');
  });

  it('invokes replay(entry.id) when the Replay button is clicked', () => {
    const replay = vi.fn().mockResolvedValue(undefined);
    useIngestDLQMock.mockReturnValue(
      makeHook({ entries: [makeEntry({ id: 'env-target' })], replay }),
    );
    render(<DeadLetterQueuePage />);
    fireEvent.click(screen.getByTestId('dlq-replay-env-target'));
    expect(replay).toHaveBeenCalledTimes(1);
    expect(replay).toHaveBeenCalledWith('env-target');
  });

  it('invokes drop(entry.id) when the Drop button is clicked', () => {
    const drop = vi.fn().mockResolvedValue(undefined);
    useIngestDLQMock.mockReturnValue(
      makeHook({ entries: [makeEntry({ id: 'env-target' })], drop }),
    );
    render(<DeadLetterQueuePage />);
    fireEvent.click(screen.getByTestId('dlq-drop-env-target'));
    expect(drop).toHaveBeenCalledTimes(1);
    expect(drop).toHaveBeenCalledWith('env-target');
  });
});

// `replay` / `drop` reject on a non-2xx response, and both call sites were a
// bare `void replay(...)`: the rejection went nowhere, the row stayed in the
// queue, and nothing on screen changed. A refused replay looked exactly like
// an accepted one that hadn't refreshed yet.
describe('DeadLetterQueuePage — a refused action says so', () => {
  const renderWithFailing = (key: 'replay' | 'drop', err: unknown) => {
    useIngestDLQMock.mockReturnValue(
      makeHook({
        entries: [makeEntry({ id: 'env-target' })],
        [key]: vi.fn().mockRejectedValue(err),
      }),
    );
    render(<DeadLetterQueuePage />);
    fireEvent.click(screen.getByTestId(`dlq-${key}-env-target`));
  };

  it('surfaces a rejected replay in its own banner', async () => {
    renderWithFailing('replay', new Error('HTTP 409'));
    const banner = await screen.findByTestId('ingest-dlq-action-error');
    expect(banner).toHaveTextContent('HTTP 409');
    expect(banner).toHaveAttribute('role', 'alert');
    // It must not claim the queue failed to LOAD — the list is fine.
    expect(screen.queryByTestId('ingest-dlq-error')).toBeNull();
    expect(screen.getByTestId('dlq-row-env-target')).toBeInTheDocument();
  });

  it('surfaces a rejected drop too, and dismisses on request', async () => {
    renderWithFailing('drop', new Error('HTTP 503'));
    expect(await screen.findByTestId('ingest-dlq-action-error')).toHaveTextContent('HTTP 503');
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByTestId('ingest-dlq-action-error')).toBeNull();
  });

  it('shows no banner when the action resolves', async () => {
    useIngestDLQMock.mockReturnValue(makeHook({ entries: [makeEntry({ id: 'env-target' })] }));
    render(<DeadLetterQueuePage />);
    fireEvent.click(screen.getByTestId('dlq-replay-env-target'));
    await Promise.resolve();
    expect(screen.queryByTestId('ingest-dlq-action-error')).toBeNull();
  });
});
