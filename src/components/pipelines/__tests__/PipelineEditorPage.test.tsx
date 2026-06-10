// __tests__/PipelineEditorPage.test.tsx
//
// Mounting / composition tests for the full pipeline editor page — the
// primary public export of `/pipelines`. Mounts the real provider stack
// (ToastProvider → EventStreamProvider → PipelineRunsProvider →
// PipelineEditorPage) with the persistence + transport seams mocked:
//   - pipelineStorageRemote → delegates to the real localStorage-backed store
//   - api/pipelineRuns      → empty history
//   - useTriggerRun         → stubbed (avoids IdentityContext + fetch)
//   - WebSocketProvider     → mounted with a stub gateway connection
//
// Covers: stale-URL redirect, full editor surface composition (top bar,
// palette, canvas, sidebar), and the Cmd+S save interaction.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';

// ---------------------------------------------------------------------------
// Seams
// ---------------------------------------------------------------------------

// Remote storage delegates to the real local (localStorage-backed) store so
// the page-level existence check and the provider load see the same data.
vi.mock('../persistence/pipelineStorageRemote', async () => {
  const local = await vi.importActual<
    typeof import('../persistence/pipelineStorage')
  >('../persistence/pipelineStorage');
  return {
    loadPipeline: async (id: string) => local.loadPipeline(id),
    savePipeline: async (def: never) => local.savePipeline(def),
    publishPipeline: async (id: string) => local.publishPipeline(id),
    deletePipeline: async (id: string) => local.deletePipeline(id),
    listPipelines: async () => local.listPipelines(),
  };
});

vi.mock('../../../api/pipelineRuns', () => ({
  listPipelineRuns: vi.fn(async () => ({ runs: [] })),
}));

const mockTriggerRun = vi.fn(async () => 'run-test-1');
vi.mock('../hooks/useTriggerRun', () => ({
  useTriggerRun: () => ({
    triggerRun: mockTriggerRun,
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

// Stub gateway connection — sendMessage is a sink; nothing connects.
function makeWsValue(): WebSocketContextValue {
  const ws = {
    connectionState: 'connected',
    lastError: null,
    sessionToken: null,
    clientId: 'client-test',
    currentChannel: null,
    switchChannel: vi.fn(),
    sendMessage: vi.fn(),
    disconnect: vi.fn(),
    reconnect: vi.fn(),
  } as unknown as UseWebSocketReturn;
  return {
    connectionState: 'connected',
    sendMessage: vi.fn(),
    onMessage: vi.fn(() => () => {}),
    ws,
    clientId: 'client-test',
    sessionToken: null,
  };
}

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

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

beforeEach(() => {
  localStorage.clear();
  mockTriggerRun.mockClear();
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PipelineEditorPage', () => {
  it('redirects to /pipelines when the pipeline id does not exist', () => {
    renderPage('no-such-pipeline');
    expect(screen.getByTestId('pipelines-list')).toBeInTheDocument();
    expect(screen.queryByTestId('pipeline-editor')).toBeNull();
  });

  it('mounts the full editor surface for an existing pipeline', async () => {
    const def = createPipeline({ name: 'Composed pipeline', createdBy: 'tester' });
    renderPage(def.id);

    // Editor frame appears once the provider load resolves.
    await waitFor(() => {
      expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument();
    });

    // Composition: top bar (name + run/publish controls), palette, canvas.
    expect(screen.getByTestId('pipeline-name')).toHaveTextContent('Composed pipeline');
    expect(screen.getByTestId('run-button')).toBeInTheDocument();
    expect(screen.getByTestId('publish-button')).toBeInTheDocument();
    expect(screen.getByTestId('palette-search')).toBeInTheDocument();
    expect(screen.getByTestId('pipeline-canvas')).toBeInTheDocument();
  });

  it('disables Run for an unpublished draft with an explanatory title', async () => {
    const def = createPipeline({ name: 'Draft pipeline', createdBy: 'tester' });
    renderPage(def.id);
    await waitFor(() => {
      expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument();
    });
    const runButton = screen.getByTestId('run-button');
    expect(runButton).toBeDisabled();
    expect(runButton).toHaveAttribute('title', 'Publish the pipeline to enable runs');
  });

  it('Cmd+S saves and surfaces a "Saved" toast', async () => {
    const def = createPipeline({ name: 'Shortcut pipeline', createdBy: 'tester' });
    renderPage(def.id);
    await waitFor(() => {
      expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: 's', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeInTheDocument();
    });
  });

  it('hides the tags row by default and seeds the trigger node into the canvas state', async () => {
    const def = createPipeline({ name: 'Tags pipeline', createdBy: 'tester' });
    renderPage(def.id);
    await waitFor(() => {
      expect(screen.getByTestId('pipeline-editor')).toBeInTheDocument();
    });
    expect(screen.queryByTestId('tags-row')).toBeNull();
    // The seeded pipeline has exactly one trigger node; the palette must
    // disable further trigger placement (single-trigger invariant).
    const paletteTrigger = screen.getByTestId('palette-item-trigger');
    expect(paletteTrigger).toHaveAttribute('data-disabled');
  });
});
