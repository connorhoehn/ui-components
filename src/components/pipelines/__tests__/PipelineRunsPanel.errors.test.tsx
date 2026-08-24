// Regression: a failed run-history fetch must not read as "this pipeline has
// never run".
//
// `listPipelineRuns` used to catch its own transport/HTTP failure and resolve
// `{ runs: [] }`. The panel's error banner was therefore unreachable, and a
// backend outage rendered as the empty state — "No runs yet. Trigger this
// pipeline to see history here." — with no banner and no retry, telling the
// user their run history did not exist when in fact it could not be loaded.
//
// These drive the REAL api client with a failing `fetch`, not a mocked
// `listPipelineRuns`; mocking the client would assert the panel's catch block
// and pass just as happily against the bug.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

vi.mock('../context/EventStreamContext', () => ({
  useEventStream: () => undefined,
}));

import PipelineRunsPanel from '../PipelineRunsPanel';

function renderPanel() {
  return render(
    <MemoryRouter>
      <PipelineRunsPanel pipelineId="p1" onClose={() => undefined} />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('PipelineRunsPanel — failed run-history load', () => {
  it('shows the error, not the "no runs yet" empty state, when the network fails', async () => {
    // A fresh Error per call: one shared rejected instance can be re-thrown
    // with a mutated stack and masks ordering bugs.
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network down'))));

    renderPanel();

    expect(await screen.findByText(/network down/)).toBeInTheDocument();
    expect(screen.queryByText(/No runs yet/)).toBeNull();
  });

  it('shows the error, not the empty state, when the endpoint answers 500', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: () => Promise.resolve({}),
    })));

    renderPanel();

    expect(await screen.findByText(/Failed to list runs: 500/)).toBeInTheDocument();
    expect(screen.queryByText(/No runs yet/)).toBeNull();
  });

  it('still shows the empty state when the API genuinely returns no runs', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.resolve({ runs: [] }),
    })));

    renderPanel();

    await waitFor(() => {
      expect(screen.getByText(/No runs yet/)).toBeInTheDocument();
    });
  });
});
