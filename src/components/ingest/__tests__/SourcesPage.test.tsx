import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { UseIngestSourcesReturn } from '../../../hooks/useIngestSources';
import type { IngestSource } from '../../../types/ingest';

const useIngestSourcesMock = vi.fn<() => UseIngestSourcesReturn>();
const navigateMock = vi.fn<(to: string) => void>();

vi.mock('../../../hooks/useIngestSources', () => ({
  useIngestSources: () => useIngestSourcesMock(),
}));

vi.mock('react-router', () => ({
  useNavigate: () => navigateMock,
}));

import SourcesPage from '../SourcesPage';

function makeSource(overrides: Partial<IngestSource> = {}): IngestSource {
  return {
    sourceId: 'src-1',
    name: 'My Source',
    type: 's3',
    config: {},
    syncSchedule: null,
    mappingRules: [],
    defaultPipelineId: null,
    status: 'active',
    lastSyncAt: new Date(Date.now() - 5 * 60_000).toISOString(),
    lastSyncStats: {
      filesFound: 10,
      filesNew: 2,
      filesUpdated: 0,
      filesSkipped: 8,
      errors: 0,
      durationMs: 1234,
    },
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    updatedAt: new Date(Date.now() - 86_400_000).toISOString(),
    ...overrides,
  };
}

function makeHook(overrides: Partial<UseIngestSourcesReturn> = {}): UseIngestSourcesReturn {
  return {
    sources: [],
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    createSource: vi.fn().mockResolvedValue(null),
    deleteSource: vi.fn().mockResolvedValue(true),
    triggerSync: vi.fn().mockResolvedValue(true),
    actionError: null, clearActionError: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  useIngestSourcesMock.mockReset();
  navigateMock.mockReset();
});

describe('SourcesPage', () => {
  it('renders the empty state when there are no sources and not loading/error', () => {
    useIngestSourcesMock.mockReturnValue(makeHook());
    render(<SourcesPage />);
    expect(screen.getByText('No sources configured')).toBeInTheDocument();
  });

  it('renders the error banner when error is set; clicking Retry calls refresh', () => {
    const refresh = vi.fn().mockResolvedValue(undefined);
    useIngestSourcesMock.mockReturnValue(makeHook({ error: 'network unavailable', refresh }));
    render(<SourcesPage />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load sources.');
    fireEvent.click(screen.getByText('Retry'));
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('renders skeleton placeholders while loading with no sources', () => {
    useIngestSourcesMock.mockReturnValue(makeHook({ loading: true }));
    render(<SourcesPage />);
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(3);
  });

  it('renders one row per source with name button, status, and files-synced cell', () => {
    const sources = [
      makeSource({ sourceId: 'src-a', name: 'Alpha', status: 'active' }),
      makeSource({ sourceId: 'src-b', name: 'Beta', status: 'paused' }),
    ];
    useIngestSourcesMock.mockReturnValue(makeHook({ sources }));
    render(<SourcesPage />);
    expect(screen.getByTestId('source-name-link-src-a')).toHaveTextContent('Alpha');
    expect(screen.getByTestId('source-name-link-src-b')).toHaveTextContent('Beta');
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('paused')).toBeInTheDocument();
    expect(screen.getByTestId('source-files-synced-src-a')).toHaveTextContent('10');
  });

  it('clicking a source name navigates to its detail page', () => {
    useIngestSourcesMock.mockReturnValue(makeHook({ sources: [makeSource({ sourceId: 'src-x' })] }));
    render(<SourcesPage />);
    fireEvent.click(screen.getByTestId('source-name-link-src-x'));
    expect(navigateMock).toHaveBeenCalledWith('/ingest/sources/src-x');
  });

  it('clicking Add Source navigates to the sources route', () => {
    useIngestSourcesMock.mockReturnValue(makeHook({ sources: [makeSource()] }));
    render(<SourcesPage />);
    fireEvent.click(screen.getByTestId('add-source-btn'));
    expect(navigateMock).toHaveBeenCalledWith('/ingest/sources');
  });

  it('clicking Sync Now invokes triggerSync(sourceId) then refresh', async () => {
    const triggerSync = vi.fn().mockResolvedValue(true);
    const refresh = vi.fn().mockResolvedValue(undefined);
    useIngestSourcesMock.mockReturnValue(
      makeHook({ sources: [makeSource({ sourceId: 'src-sync' })], triggerSync, refresh }),
    );
    render(<SourcesPage />);
    fireEvent.click(screen.getByTestId('sync-src-sync'));
    await Promise.resolve();
    await Promise.resolve();
    expect(triggerSync).toHaveBeenCalledWith('src-sync');
    expect(refresh).toHaveBeenCalled();
  });

  it('Sync Now button is disabled when status === "paused"', () => {
    useIngestSourcesMock.mockReturnValue(
      makeHook({ sources: [makeSource({ sourceId: 'src-p', status: 'paused' })] }),
    );
    render(<SourcesPage />);
    const btn = screen.getByTestId('sync-src-p') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('clicking Delete invokes deleteSource(sourceId) after confirm()', () => {
    const deleteSource = vi.fn().mockResolvedValue(true);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);
    useIngestSourcesMock.mockReturnValue(
      makeHook({ sources: [makeSource({ sourceId: 'src-del' })], deleteSource }),
    );
    render(<SourcesPage />);
    fireEvent.click(screen.getByTestId('delete-src-del'));
    expect(confirmSpy).toHaveBeenCalled();
    expect(deleteSource).toHaveBeenCalledWith('src-del');
    confirmSpy.mockRestore();
  });

  it('does not call deleteSource if confirm() is cancelled', () => {
    const deleteSource = vi.fn().mockResolvedValue(true);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);
    useIngestSourcesMock.mockReturnValue(
      makeHook({ sources: [makeSource({ sourceId: 'src-keep' })], deleteSource }),
    );
    render(<SourcesPage />);
    fireEvent.click(screen.getByTestId('delete-src-keep'));
    expect(deleteSource).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});
