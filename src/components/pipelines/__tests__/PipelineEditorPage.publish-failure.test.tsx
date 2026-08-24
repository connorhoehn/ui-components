// Regression (null-conflation): "Pipeline published" must mean it published.
//
// `publishPipeline` (remote) returned `null` for a genuine 404 AND for any
// transport/5xx failure; `PipelineEditorContext.publish` returns `void` and
// swallowed the outcome; and `handlePublishConfirm` fired
// `toast('Pipeline published', { type: 'success' })` unconditionally the
// instant the button was clicked. So with the API down the user got a green
// success toast over a pipeline that was still a draft — and the status chip
// beside it still said Draft.
//
// Same provider stack as PipelineEditorPage.test.tsx, but the remote seam is
// driven at the module boundary so the real context/page failure handling is
// what's under test.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

const publishOutcome = { fn: vi.fn() };

vi.mock('../persistence/pipelineStorageRemote', async () => {
  const local = await vi.importActual<
    typeof import('../persistence/pipelineStorage')
  >('../persistence/pipelineStorage');
  return {
    loadPipeline: async (id: string) => local.loadPipeline(id),
    savePipeline: async (def: never) => local.savePipeline(def),
    publishPipeline: async (id: string) => publishOutcome.fn(id),
    deletePipeline: async (id: string) => local.deletePipeline(id),
    listPipelines: async () => local.listPipelines(),
  };
});

vi.mock('../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [] })),
}));

vi.mock('../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({
    triggerRun: vi.fn(async () => 'run-1'),
    isTriggering: false,
    lastError: null,
    isReplay: false,
  }),
}));

import PipelineEditorPage from '../PipelineEditorPage';
import { EventStreamProvider } from '../context/EventStreamContext';
import { PipelineRunsProvider } from '../context/PipelineRunsContext';
import { ToastProvider } from '../../shared/ToastProvider';
import { createPipeline } from '../persistence/pipelineStorage';
import { WebSocketProvider } from '../../../contexts/WebSocketContext';
import type { WebSocketContextValue } from '../../../contexts/WebSocketContext';
import type { UseWebSocketReturn } from '../../../hooks/useWebSocket';

function makeWsValue(): WebSocketContextValue {
  const ws = {
    connectionState: 'connected', lastError: null, sessionToken: null,
    clientId: 'client-test', currentChannel: null, switchChannel: vi.fn(),
    sendMessage: vi.fn(), disconnect: vi.fn(), reconnect: vi.fn(),
  } as unknown as UseWebSocketReturn;
  return {
    connectionState: 'connected', sendMessage: vi.fn(),
    onMessage: vi.fn(() => () => {}), ws, clientId: 'client-test',
    sessionToken: null,
  };
}

function renderPage(pipelineId: string) {
  return render(
    <MemoryRouter initialEntries={[`/pipelines/${pipelineId}`]}>
      <WebSocketProvider value={makeWsValue()}>
        <ToastProvider>
          <EventStreamProvider>
            <PipelineRunsProvider>
              <Routes>
                <Route path="/pipelines/:pipelineId" element={<PipelineEditorPage />} />
                <Route path="/pipelines" element={<div data-testid="pipelines-list" />} />
              </Routes>
            </PipelineRunsProvider>
          </EventStreamProvider>
        </ToastProvider>
      </WebSocketProvider>
    </MemoryRouter>,
  );
}

async function clickPublish() {
  fireEvent.click(await screen.findByTestId('publish-button'));
  // The confirm modal's own Publish button — the top-bar trigger shares the
  // accessible name, so take the one inside the dialog.
  const dialog = await screen.findByRole('dialog');
  const confirm = within(dialog).getByRole('button', { name: 'Publish' });
  fireEvent.click(confirm);
}

beforeEach(() => {
  localStorage.clear();
  publishOutcome.fn = vi.fn();
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

describe('PipelineEditorPage — publish outcome', () => {
  it('does NOT claim the pipeline published when the request fails', async () => {
    // Fresh Error per call — `mockRejectedValue` reuses one instance.
    publishOutcome.fn = vi.fn(() => Promise.reject(new Error('Failed to fetch')));

    const def = createPipeline({ name: 'Draft one', createdBy: 'tester' });
    renderPage(def.id);
    await waitFor(() => expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument());

    await clickPublish();

    await waitFor(() =>
      expect(screen.getByText(/Could not publish/i)).toBeInTheDocument(),
    );
    // The load-bearing assertion.
    expect(screen.queryByText('Pipeline published')).not.toBeInTheDocument();
  });

  it('does NOT claim the pipeline published when the server has no such pipeline', async () => {
    publishOutcome.fn = vi.fn(() => Promise.resolve(null));

    const def = createPipeline({ name: 'Draft two', createdBy: 'tester' });
    renderPage(def.id);
    await waitFor(() => expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument());

    await clickPublish();

    await waitFor(() =>
      expect(screen.getByText(/Could not publish/i)).toBeInTheDocument(),
    );
    expect(screen.queryByText('Pipeline published')).not.toBeInTheDocument();
  });

  it('DOES say it published when the server accepts it', async () => {
    const def = createPipeline({ name: 'Draft three', createdBy: 'tester' });
    publishOutcome.fn = vi.fn(() =>
      Promise.resolve({ ...def, status: 'published', publishedVersion: 2, version: 2 }),
    );

    renderPage(def.id);
    await waitFor(() => expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument());

    await clickPublish();

    await waitFor(() =>
      expect(screen.getByText('Pipeline published')).toBeInTheDocument(),
    );
    expect(screen.queryByText(/Could not publish/i)).not.toBeInTheDocument();
  });
});
