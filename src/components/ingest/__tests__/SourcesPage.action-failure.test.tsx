// Regression: a "Sync Now" that the server refused must not look exactly
// like one it accepted.
//
// `triggerSync` wrote its failure into `error` — the list loader's channel —
// and `handleSync` then called `refresh()` unconditionally, whose first act
// is `setError(null)`. So the failure was erased before it could ever be
// rendered: the "Syncing..." label reverted and nothing else changed. The
// operator walked away believing an ingest sync was running. And on the rare
// occasion the banner did survive, it read "Failed to load sources." —
// blaming the wrong operation entirely.
//
// Driven against the REAL `useIngestSources` with a stubbed global `fetch`.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'tok' }),
}));
vi.mock('react-router', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useNavigate: () => vi.fn(),
}));

import SourcesPage from '../SourcesPage';

const SOURCE = {
  sourceId: 'src-1',
  name: 'Inbox bucket',
  type: 's3',
  config: {},
  syncSchedule: null,
  mappingRules: [],
  defaultPipelineId: null,
  status: 'active',
  lastSyncAt: null,
  lastSyncStats: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function jsonRes(body: unknown) {
  return { ok: true, status: 200, json: () => Promise.resolve(body) } as unknown as Response;
}

function stubApi(syncOutcome: () => Promise<Response>) {
  return vi.fn((_url: string, init?: RequestInit) => {
    if (init?.method === 'POST') return syncOutcome();
    return Promise.resolve(jsonRes({ sources: [SOURCE] }));
  });
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function renderAndSync(syncOutcome: () => Promise<Response>) {
  vi.stubGlobal('fetch', stubApi(syncOutcome));
  render(<SourcesPage />);
  fireEvent.click(await screen.findByText('Sync Now'));
}

describe('SourcesPage — a refused sync says so', () => {
  it('surfaces the failure instead of silently reverting to idle', async () => {
    await renderAndSync(() =>
      Promise.resolve({ ok: false, status: 503, json: () => Promise.resolve({}) } as unknown as Response),
    );

    await waitFor(() =>
      expect(screen.getByTestId('sources-action-error')).toBeInTheDocument(),
    );
    // ...and it does NOT blame the list load, which succeeded.
    expect(screen.queryByText('Failed to load sources.')).not.toBeInTheDocument();
    expect(screen.getByText('Inbox bucket')).toBeInTheDocument();
  });

  it('surfaces a transport failure too', async () => {
    // Fresh Error per call — `mockRejectedValue` reuses one instance.
    await renderAndSync(() => Promise.reject(new Error('Failed to fetch')));

    await waitFor(() =>
      expect(screen.getByTestId('sources-action-error')).toBeInTheDocument(),
    );
    expect(screen.queryByText('Failed to load sources.')).not.toBeInTheDocument();
  });

  it('shows no banner when the sync is accepted', async () => {
    await renderAndSync(() => Promise.resolve(jsonRes({ ok: true })));

    await waitFor(() => expect(screen.getByText('Sync Now')).toBeInTheDocument());
    expect(screen.queryByTestId('sources-action-error')).not.toBeInTheDocument();
  });
});
