// A write the server refused must never be reported as a write it accepted.
//
// `deletePipeline` / `createPipeline` used to swallow 5xx and transport
// failures (they were on `isNetworkError`, which folds those in, while
// `savePipeline` had already been narrowed to `isApiAbsent`). Both then
// resolved like a success, so this page removed the row, fired a green
// "Pipeline deleted" toast, and left the pipeline sitting on the server —
// back in the list on the next load, and still there for everyone else.
// The storage layer now rejects; these cases pin what the page does with it.
//
// The real ToastProvider is mounted rather than mocked, so the assertions are
// on what the operator actually reads.

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PipelineIndexEntry } from '../persistence/pipelineStorage';
import { ToastProvider } from '../../shared/ToastProvider';

const listPipelinesMock = vi.fn<() => Promise<PipelineIndexEntry[]>>();
const deletePipelineMock = vi.fn<(id: string) => Promise<void>>();
const createPipelineMock = vi.fn();
const navigateMock = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: () => navigateMock,
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));
vi.mock('../persistence/pipelineStorageRemote', () => ({
  listPipelines: () => listPipelinesMock(),
  deletePipeline: (id: string) => deletePipelineMock(id),
  createPipeline: (...args: unknown[]) => createPipelineMock(...args),
  // The page enriches each index entry with its full definition; a null here
  // would drop the row and render the empty state instead of a card.
  loadPipeline: (id: string) =>
    Promise.resolve({
      id, name: 'Nightly', version: 1, status: 'draft', nodes: [], edges: [],
      tags: [], createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z', createdBy: 'tester',
    }),
  publishPipeline: vi.fn().mockResolvedValue(null),
  savePipeline: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ userId: 'tester', displayName: 'Tester' }),
}));
vi.mock('../hooks/useTriggerRun', () => ({ useTriggerRun: () => vi.fn() }));

import PipelinesPage from '../PipelinesPage';

function row(over: Partial<PipelineIndexEntry> = {}): PipelineIndexEntry {
  return {
    id: 'p1', name: 'Nightly', status: 'draft', tags: [], icon: '🔀',
    version: 1, updatedAt: '2026-01-01T00:00:00.000Z', createdBy: 'tester',
    ...over,
  } as PipelineIndexEntry;
}

function renderPage() {
  render(
    <ToastProvider>
      <PipelinesPage />
    </ToastProvider>,
  );
}

beforeEach(() => {
  listPipelinesMock.mockReset().mockResolvedValue([row()]);
  deletePipelineMock.mockReset().mockResolvedValue(undefined);
  createPipelineMock.mockReset();
  navigateMock.mockReset();
});

async function confirmDelete() {
  await screen.findByTestId('pipeline-card-p1');
  fireEvent.click(screen.getByTestId('overflow-pipeline-p1'));
  fireEvent.click(screen.getByText('Delete'));
  fireEvent.click(screen.getByTestId('delete-pipeline-confirm'));
}

describe('PipelinesPage delete failure', () => {
  it('reports the failure instead of a green "Pipeline deleted"', async () => {
    deletePipelineMock.mockImplementation(() =>
      Promise.reject(new Error('Delete failed (503)')),
    );
    renderPage();
    await confirmDelete();

    expect(await screen.findByText(/still on the server/i)).toBeInTheDocument();
    expect(screen.queryByText('Pipeline deleted')).toBeNull();
  });

  it('still confirms when the delete really landed', async () => {
    renderPage();
    await confirmDelete();

    expect(await screen.findByText('Pipeline deleted')).toBeInTheDocument();
  });
});

describe('PipelinesPage create failure', () => {
  async function submitCreate() {
    await screen.findByTestId('pipeline-card-p1');
    fireEvent.click(screen.getByTestId('new-pipeline-btn'));
    fireEvent.change(screen.getByTestId('new-pipeline-name'), {
      target: { value: 'Fresh' },
    });
    fireEvent.click(screen.getByTestId('new-pipeline-confirm'));
  }

  it('does not navigate into an editor for a pipeline the server rejected', async () => {
    createPipelineMock.mockImplementation(() =>
      Promise.reject(new Error('Save failed (503)')),
    );
    renderPage();
    await submitCreate();

    expect(await screen.findByText(/could not create the pipeline/i)).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('navigates when the create landed', async () => {
    createPipelineMock.mockResolvedValue({ id: 'new-1', name: 'Fresh' });
    renderPage();
    await submitCreate();

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/pipelines/new-1'));
  });
});
