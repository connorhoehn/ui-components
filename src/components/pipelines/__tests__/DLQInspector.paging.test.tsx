// REGRESSION — two ways the DLQ Inspector reported a wrong queue depth.
//
// 1. The 15s auto-refresh called `fetchEntries(false)`, which asks for a flat
//    100 rows and REPLACES the list. Everything "Load more" had appended was
//    silently discarded: the table went 200 rows -> 100 rows and
//    "Redrive All (200)" -> "(100)" with no indication anything had dropped.
// 2. The header badge printed `entries.length` bare. `DLQListResponse` carries
//    no server total, so a 4,312-message queue read "100" — and "200" after one
//    Load more. The badge was a function of how many times you had clicked.

import { vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { DLQEntry, DLQListResponse } from '../../../api/pipelineDLQ';

const listDLQEntries = vi.fn();

vi.mock('../../../api/pipelineDLQ', () => ({
  listDLQEntries: (opts?: unknown) => listDLQEntries(opts),
  redriveDLQEntries: vi.fn(),
  purgeDLQEntries: vi.fn(),
}));

import DLQInspector from '../DLQInspector';
import { ToastProvider } from '../../shared/ToastProvider';

const entry = (n: number): DLQEntry => ({
  messageId: `m${n}`,
  eventType: 'pipeline:step:failed',
  eventPayload: {},
  lastError: `boom ${n}`,
  failedAt: '2026-08-16T10:00:00.000Z',
  totalAttempts: 3,
  errorKind: 'timeout',
});

const page = (from: number, count: number, cursor?: string): DLQListResponse => ({
  items: Array.from({ length: count }, (_, i) => entry(from + i)),
  cursor,
});

function renderInspector() {
  return render(
    <MemoryRouter>
      <ToastProvider>
        <DLQInspector />
      </ToastProvider>
    </MemoryRouter>,
  );
}

describe('DLQInspector paging', () => {
  beforeEach(() => {
    listDLQEntries.mockReset();
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });
  afterEach(() => vi.useRealTimers());

  it('marks the depth badge as a floor while more remain behind the cursor', async () => {
    listDLQEntries.mockResolvedValue(page(0, 100, 'cursor-1'));
    renderInspector();
    await waitFor(() =>
      expect(screen.getByTestId('dlq-depth-badge')).toHaveTextContent('100+'),
    );
  });

  it('drops the "+" once the cursor is exhausted', async () => {
    listDLQEntries.mockResolvedValue(page(0, 40, undefined));
    renderInspector();
    await waitFor(() =>
      expect(screen.getByTestId('dlq-depth-badge')).toHaveTextContent('40'),
    );
    expect(screen.getByTestId('dlq-depth-badge').textContent).not.toContain('+');
  });

  it('does not collapse appended pages on the 15s auto-refresh', async () => {
    // Page 1, then Load more brings page 2. Select by request shape rather than
    // call index — StrictMode mounts effects twice.
    listDLQEntries.mockImplementation(
      async (opts: { cursor?: string; limit?: number } = {}) => {
        if (opts.cursor === 'cursor-1') return page(100, 100, 'cursor-2');
        // A non-appending fetch must honour the span already loaded.
        return page(0, Math.min(opts.limit ?? 100, 200), 'cursor-1');
      },
    );

    renderInspector();
    await waitFor(() =>
      expect(screen.getByTestId('dlq-depth-badge')).toHaveTextContent('100+'),
    );

    fireEvent.click(screen.getByRole('button', { name: 'Load more' }));
    await waitFor(() =>
      expect(screen.getByTestId('dlq-depth-badge')).toHaveTextContent('200+'),
    );

    // Fire the auto-refresh. The old code re-requested a flat 100 and replaced
    // the list, so the badge snapped back to "100+".
    await act(async () => {
      vi.advanceTimersByTime(15_000);
    });
    await waitFor(() =>
      expect(screen.getByTestId('dlq-depth-badge')).toHaveTextContent('200+'),
    );

    // …and the refresh really did ask for the full span.
    const refreshCalls = listDLQEntries.mock.calls
      .map(([opts]) => opts as { cursor?: string; limit?: number })
      .filter((o) => !o?.cursor);
    expect(refreshCalls.some((o) => (o?.limit ?? 0) >= 200)).toBe(true);
  });
});
