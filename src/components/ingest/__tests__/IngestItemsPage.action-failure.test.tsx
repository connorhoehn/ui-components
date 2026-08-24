// Regression: a failed Skip must not be reported as a failed load.
//
// `retryItem`/`skipItem` wrote their failures into `error` — the same state
// the list loader owns. `IngestItemsPage` renders `error` as the hard-coded
// "Failed to load ingest items." AND gates the table on `!error`, so one
// rejected Skip made the entire, correctly-loaded table vanish behind a
// banner making a false claim. Its Retry button re-fetched the list instead
// of re-trying the skip; the refresh then cleared `error`, everything
// reappeared, and the operator concluded the skip had worked. It had not.
//
// Driven against the REAL `useIngestItems` with a stubbed global `fetch` —
// mocking the hook (as the sibling page test does, for other reasons) would
// only test the page's own rendering of a value the bug never produced.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'tok' }),
}));
vi.mock('../../../hooks/useIngestProgress', () => ({
  useIngestProgress: () => ({ events: [], activeSyncs: new Map(), clearEvents: vi.fn() }),
}));

import IngestItemsPage from '../IngestItemsPage';

const ITEM = {
  itemId: 'item-1',
  sourceId: 's1',
  sourcePath: '/inbox/report.pdf',
  status: 'failed',
  documentId: null,
  documentTypeId: null,
  mappingMethod: null,
  mappingConfidence: null,
  error: 'upstream parse error',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function jsonRes(body: unknown) {
  return { ok: true, status: 200, json: () => Promise.resolve(body) } as unknown as Response;
}

/** Serves the list; every POST (retry/skip) goes through `postOutcome`. */
function stubApi(postOutcome: () => Promise<Response>) {
  return vi.fn((url: string, init?: RequestInit) => {
    if (init?.method === 'POST') return postOutcome();
    if (String(url).includes('/api/ingest/sources')) {
      return Promise.resolve(jsonRes({ sources: [] }));
    }
    return Promise.resolve(jsonRes({ items: [ITEM] }));
  });
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function renderAndSkip(postOutcome: () => Promise<Response>) {
  vi.stubGlobal('fetch', stubApi(postOutcome));
  render(<IngestItemsPage />);
  const table = await screen.findByRole('table');
  fireEvent.click(within(table).getByText('Skip'));
  return table;
}

describe('IngestItemsPage — a failed action is not a failed load', () => {
  it('keeps the table and does NOT claim the list failed to load', async () => {
    await renderAndSkip(() =>
      Promise.resolve({ ok: false, status: 503, json: () => Promise.resolve({}) } as unknown as Response),
    );

    await waitFor(() =>
      expect(screen.getByTestId('ingest-items-action-error')).toBeInTheDocument(),
    );
    // The load-bearing assertions: the claim is about the action, and the
    // operator's data is still on screen.
    expect(screen.queryByText('Failed to load ingest items.')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('/inbox/report.pdf')).toBeInTheDocument();
  });

  it('keeps the table when the skip fails at the transport', async () => {
    // Fresh Error per call — `mockRejectedValue` reuses one instance.
    await renderAndSkip(() => Promise.reject(new Error('Failed to fetch')));

    await waitFor(() =>
      expect(screen.getByTestId('ingest-items-action-error')).toBeInTheDocument(),
    );
    expect(screen.queryByText('Failed to load ingest items.')).not.toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows no action banner when the skip succeeds', async () => {
    await renderAndSkip(() => Promise.resolve(jsonRes({ ok: true })));

    await waitFor(() =>
      expect(screen.queryByText('/inbox/report.pdf')).not.toBeInTheDocument(),
    );
    expect(screen.queryByTestId('ingest-items-action-error')).not.toBeInTheDocument();
  });
});

describe('IngestItemDrawer — closing is a success signal', () => {
  // The drawer closed from a `finally`, so it slid away whether the retry had
  // landed or not. Closing is the only "done" cue this surface has: a rejected
  // Retry looked identical to an accepted one, and the operator moved on
  // leaving the item still `failed`. The page's own wrapper compounded it by
  // discarding the hook's boolean before the drawer could see it.
  async function openDrawer(postOutcome: () => Promise<Response>) {
    vi.stubGlobal('fetch', stubApi(postOutcome));
    render(<IngestItemsPage />);
    const table = await screen.findByRole('table');
    fireEvent.click(within(table).getByText('/inbox/report.pdf'));
    return screen.getByTestId('ingest-item-drawer');
  }

  it('stays open when the retry is rejected, and says why', async () => {
    const drawer = await openDrawer(() =>
      Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({}) } as unknown as Response),
    );

    fireEvent.click(within(drawer).getByText('Retry'));

    await waitFor(() =>
      expect(screen.getByTestId('ingest-items-action-error')).toBeInTheDocument(),
    );
    expect(screen.getByTestId('ingest-item-drawer')).toBeInTheDocument();
  });

  it('stays open when the skip is rejected', async () => {
    const drawer = await openDrawer(() => Promise.reject(new Error('Failed to fetch')));

    fireEvent.click(within(drawer).getByText('Discard'));

    await waitFor(() =>
      expect(screen.getByTestId('ingest-items-action-error')).toBeInTheDocument(),
    );
    expect(screen.getByTestId('ingest-item-drawer')).toBeInTheDocument();
  });

  it('closes when the retry actually lands', async () => {
    const drawer = await openDrawer(() => Promise.resolve(jsonRes({ ok: true })));

    fireEvent.click(within(drawer).getByText('Retry'));

    await waitFor(() =>
      expect(screen.queryByTestId('ingest-item-drawer')).not.toBeInTheDocument(),
    );
    expect(screen.queryByTestId('ingest-items-action-error')).not.toBeInTheDocument();
  });
});
