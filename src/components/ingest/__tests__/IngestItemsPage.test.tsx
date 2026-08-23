// Two behaviours here are worth more than the table markup. First, the
// filters are not applied client-side — they are handed to `useIngestItems`
// as query options, so a wiring mistake shows up as "the filter does nothing"
// rather than as an error. Second, per-row actions are status-gated: Retry
// only exists on failed items and Skip disappears once an item is done, which
// is what stops an operator re-queuing work that already landed. The row is
// also clickable, so the action cell and the document link have to stop
// propagation or every action would also open the drawer.

import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseIngestSourcesReturn } from '../../../hooks/useIngestSources';
import type { UseIngestItemsReturn, UseIngestItemsOptions } from '../../../hooks/useIngestItems';
import type { IngestItem, IngestItemStatus, IngestSource } from '../../../types/ingest';

const useIngestItemsMock = vi.fn<(o?: UseIngestItemsOptions) => UseIngestItemsReturn>();
const useIngestSourcesMock = vi.fn<() => UseIngestSourcesReturn>();

vi.mock('../../../hooks/useIngestItems', () => ({
  useIngestItems: (o?: UseIngestItemsOptions) => useIngestItemsMock(o),
}));
vi.mock('../../../hooks/useIngestSources', () => ({ useIngestSources: () => useIngestSourcesMock() }));
vi.mock('../../../hooks/useIngestProgress', () => ({
  useIngestProgress: () => ({ events: [], activeSyncs: new Map(), clearEvents: vi.fn() }),
}));
vi.mock('../../../contexts/IdentityContext', () => ({ useIdentityContext: () => ({ idToken: 'tok' }) }));

import IngestItemsPage from '../IngestItemsPage';

function item(over: Partial<IngestItem> = {}): IngestItem {
  return {
    itemId: 'i1',
    sourceId: 's1',
    sourcePath: '/inbox/report.pdf',
    status: 'queued' as IngestItemStatus,
    documentTypeId: null,
    documentId: null,
    pipelineRunId: null,
    mappingMethod: null,
    mappingConfidence: null,
    error: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...over,
  } as IngestItem;
}

function renderPage(items: IngestItem[] = [], over: Partial<UseIngestItemsReturn> = {}, sources: IngestSource[] = []) {
  const hook: UseIngestItemsReturn = {
    items, loading: false, error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    retryItem: vi.fn().mockResolvedValue(true),
    skipItem: vi.fn().mockResolvedValue(true),
    ...over,
  };
  useIngestItemsMock.mockReturnValue(hook);
  useIngestSourcesMock.mockReturnValue({
    sources, loading: false, error: null,
    refresh: vi.fn(), createSource: vi.fn(), deleteSource: vi.fn(), triggerSync: vi.fn(),
  } as unknown as UseIngestSourcesReturn);
  render(<IngestItemsPage />);
  return hook;
}

beforeEach(() => {
  useIngestItemsMock.mockReset();
  useIngestSourcesMock.mockReset();
});

describe('IngestItemsPage states', () => {
  it('shows skeletons while the first page loads, and no table', () => {
    renderPage([], { loading: true });
    expect(screen.queryByRole('table')).toBeNull();
  });

  it('keeps the table visible during a refresh that already has rows', () => {
    renderPage([item()], { loading: true });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('shows the filtered-empty message when the query returns nothing', () => {
    renderPage();
    expect(screen.getByText('No items found')).toBeInTheDocument();
  });

  it('replaces the table with the error banner, not both', () => {
    renderPage([item()], { error: 'boom' });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('table')).toBeNull();
  });
});

describe('IngestItemsPage filters', () => {
  it('starts with both filters unset', () => {
    renderPage();
    expect(useIngestItemsMock).toHaveBeenLastCalledWith({ sourceId: null, status: null });
  });

  it('pushes the chosen source down into the query rather than filtering locally', () => {
    renderPage([], {}, [{ sourceId: 's-42', name: 'Team Drive' } as IngestSource]);
    fireEvent.change(screen.getByTestId('source-filter'), { target: { value: 's-42' } });
    expect(useIngestItemsMock).toHaveBeenLastCalledWith({ sourceId: 's-42', status: null });
  });

  it('maps the "All" option back to null instead of an empty string', () => {
    renderPage();
    fireEvent.change(screen.getByTestId('status-filter'), { target: { value: 'failed' } });
    expect(useIngestItemsMock).toHaveBeenLastCalledWith({ sourceId: null, status: 'failed' });
    fireEvent.change(screen.getByTestId('status-filter'), { target: { value: '' } });
    expect(useIngestItemsMock).toHaveBeenLastCalledWith({ sourceId: null, status: null });
  });
});

describe('IngestItemsPage row actions', () => {
  it('offers Retry only on a failed item', () => {
    renderPage([item({ itemId: 'ok', status: 'queued' }), item({ itemId: 'bad', status: 'failed' })]);
    expect(screen.queryByTestId('retry-ok')).toBeNull();
    expect(screen.getByTestId('retry-bad')).toBeInTheDocument();
  });

  it('withdraws Skip once an item is done', () => {
    renderPage([item({ itemId: 'live', status: 'mapping' }), item({ itemId: 'settled', status: 'done' })]);
    expect(screen.getByTestId('skip-live')).toBeInTheDocument();
    expect(screen.queryByTestId('skip-settled')).toBeNull();
  });

  it('passes the itemId to the hook and does not also open the drawer', () => {
    const hook = renderPage([item({ itemId: 'bad', status: 'failed' })]);
    fireEvent.click(screen.getByTestId('retry-bad'));
    expect(hook.retryItem).toHaveBeenCalledWith('bad');
    // The drawer would have mounted if the row click had gone through.
    expect(screen.queryByTestId('ingest-item-drawer')).toBeNull();
  });

  it('skip likewise reports just the id', () => {
    const hook = renderPage([item({ itemId: 'live', status: 'mapping' })]);
    fireEvent.click(screen.getByTestId('skip-live'));
    expect(hook.skipItem).toHaveBeenCalledWith('live');
  });
});

describe('IngestItemsPage table content', () => {
  it('resolves the source name, falling back to a truncated id', () => {
    renderPage(
      [item({ itemId: 'a', sourceId: 's-known' }), item({ itemId: 'b', sourceId: 'abcdefghijklmnop' })],
      {},
      [{ sourceId: 's-known', name: 'Team Drive' } as IngestSource],
    );
    expect(within(screen.getByTestId('item-row-a')).getByText('Team Drive')).toBeInTheDocument();
    expect(within(screen.getByTestId('item-row-b')).getByText('abcdefgh')).toBeInTheDocument();
  });

  it('keeps the full path in the title attribute even when the cell is truncated', () => {
    const long = `/very/deep/${'x'.repeat(80)}/file.pdf`;
    renderPage([item({ sourcePath: long })]);
    const cell = screen.getByTitle(long);
    expect(cell.textContent!.startsWith('...')).toBe(true);
    expect(cell.textContent!.length).toBeLessThan(long.length);
  });

  it('leaves short paths untouched', () => {
    renderPage([item({ sourcePath: '/a.pdf' })]);
    expect(screen.getByTitle('/a.pdf')).toHaveTextContent('/a.pdf');
  });

  it('renders em-dashes for the optional mapping columns', () => {
    renderPage([item({ documentTypeId: null, mappingMethod: null, documentId: null })]);
    const cells = within(screen.getByTestId('item-row-i1')).getAllByText('—');
    expect(cells).toHaveLength(3);
  });
});

describe('IngestItemsPage drawer', () => {
  it('stays closed until a row is clicked', () => {
    renderPage([item()]);
    expect(screen.queryByTestId('ingest-item-drawer')).toBeNull();
    fireEvent.click(screen.getByTestId('item-row-i1'));
    expect(screen.getByTestId('ingest-item-drawer')).toBeInTheDocument();
  });

  it('closes again without leaving the row selected', () => {
    renderPage([item()]);
    fireEvent.click(screen.getByTestId('item-row-i1'));
    fireEvent.click(screen.getByTestId('ingest-item-drawer-close'));
    expect(screen.queryByTestId('ingest-item-drawer')).toBeNull();
  });
});
