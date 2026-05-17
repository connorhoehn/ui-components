import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { UseMappingReviewQueueResult } from '../../../hooks/useMappingReviewQueue';
import type { IngestItem } from '../../../types/ingest';

const useMappingReviewQueueMock = vi.fn<() => UseMappingReviewQueueResult>();
const useDocumentTypesMock = vi.fn<() => { types: Array<{ id: string; name: string }> }>();

vi.mock('../../../hooks/useMappingReviewQueue', () => ({
  useMappingReviewQueue: () => useMappingReviewQueueMock(),
}));

vi.mock('../../../hooks/useDocumentTypes', () => ({
  useDocumentTypes: () => useDocumentTypesMock(),
}));

vi.mock('../../../contexts/IdentityContext', () => ({
  useIdentityContext: () => ({ idToken: 'tok' }),
}));

import MappingReviewPage from '../MappingReviewPage';

function makeItem(overrides: Partial<IngestItem> = {}): IngestItem {
  return {
    itemId: 'itm-1',
    sourceId: 'src-abcdef0123456789',
    sourcePath: 'reports/q1/january.json',
    status: 'mapping',
    documentTypeId: 'dt-invoice',
    documentId: null,
    pipelineRunId: null,
    mappingMethod: 'llm-match',
    mappingConfidence: 0.45,
    attempts: 1,
    error: null,
    createdAt: '2026-05-17T00:00:00Z',
    updatedAt: '2026-05-17T00:00:01Z',
    ...overrides,
  };
}

function makeResult(overrides: Partial<UseMappingReviewQueueResult> = {}): UseMappingReviewQueueResult {
  return {
    items: [],
    threshold: 0.7,
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    remap: vi.fn().mockResolvedValue(undefined),
    skip: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  useMappingReviewQueueMock.mockReset();
  useDocumentTypesMock.mockReset();
  useMappingReviewQueueMock.mockReturnValue(makeResult());
  useDocumentTypesMock.mockReturnValue({
    types: [
      { id: 'dt-invoice', name: 'Invoice' },
      { id: 'dt-receipt', name: 'Receipt' },
      { id: 'dt-contract', name: 'Contract' },
    ],
  });
});

describe('MappingReviewPage', () => {
  it('renders the empty state when there are no items and not loading/error', () => {
    render(<MappingReviewPage />);
    expect(screen.getByTestId('mapping-review-empty')).toBeInTheDocument();
    expect(screen.getByText('No items need review')).toBeInTheDocument();
  });

  it('renders the threshold rounded to a percent in the header', () => {
    useMappingReviewQueueMock.mockReturnValue(makeResult({ threshold: 0.82 }));
    render(<MappingReviewPage />);
    expect(screen.getByText(/Showing items with confidence/)).toHaveTextContent('< 82%');
  });

  it('renders the error banner when error is set', () => {
    useMappingReviewQueueMock.mockReturnValue(makeResult({ error: 'unreachable' }));
    render(<MappingReviewPage />);
    expect(screen.getByTestId('mapping-review-error')).toHaveTextContent('unreachable');
  });

  it('renders skeleton placeholders while loading with no items', () => {
    useMappingReviewQueueMock.mockReturnValue(makeResult({ loading: true }));
    render(<MappingReviewPage />);
    expect(screen.getAllByTestId('skeleton-card')).toHaveLength(3);
    expect(screen.queryByTestId('mapping-review-list')).not.toBeInTheDocument();
  });

  it('renders one row per item with source path, confidence percent, and suggested type name', () => {
    const items = [
      makeItem({ itemId: 'itm-a', sourcePath: 'a.json', mappingConfidence: 0.5, documentTypeId: 'dt-invoice' }),
      makeItem({ itemId: 'itm-b', sourcePath: 'b.json', mappingConfidence: 0.61, documentTypeId: 'dt-receipt' }),
    ];
    useMappingReviewQueueMock.mockReturnValue(makeResult({ items }));
    render(<MappingReviewPage />);
    expect(screen.getByTestId('mapping-review-list')).toBeInTheDocument();
    const rowA = screen.getByTestId('review-row-itm-a');
    expect(rowA).toHaveTextContent('a.json');
    expect(rowA).toHaveTextContent('conf 50%');
    expect(rowA).toHaveTextContent('Invoice');
    const rowB = screen.getByTestId('review-row-itm-b');
    expect(rowB).toHaveTextContent('conf 61%');
    expect(rowB).toHaveTextContent('Receipt');
  });

  it('Accept button is disabled when item.documentTypeId is null', () => {
    const items = [makeItem({ itemId: 'itm-x', documentTypeId: null })];
    useMappingReviewQueueMock.mockReturnValue(makeResult({ items }));
    render(<MappingReviewPage />);
    const btn = screen.getByTestId('review-accept-itm-x') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
  });

  it('clicking Accept invokes remap(itemId, documentTypeId)', () => {
    const remap = vi.fn().mockResolvedValue(undefined);
    const items = [makeItem({ itemId: 'itm-acc', documentTypeId: 'dt-invoice' })];
    useMappingReviewQueueMock.mockReturnValue(makeResult({ items, remap }));
    render(<MappingReviewPage />);
    fireEvent.click(screen.getByTestId('review-accept-itm-acc'));
    expect(remap).toHaveBeenCalledWith('itm-acc', 'dt-invoice');
  });

  it('Re-map button is disabled until a type is picked, then fires remap(itemId, picked)', () => {
    const remap = vi.fn().mockResolvedValue(undefined);
    const items = [makeItem({ itemId: 'itm-rm' })];
    useMappingReviewQueueMock.mockReturnValue(makeResult({ items, remap }));
    render(<MappingReviewPage />);
    const remapBtn = screen.getByTestId('review-remap-itm-rm') as HTMLButtonElement;
    expect(remapBtn.disabled).toBe(true);
    fireEvent.change(screen.getByTestId('review-remap-picker-itm-rm'), { target: { value: 'dt-contract' } });
    const enabledBtn = screen.getByTestId('review-remap-itm-rm') as HTMLButtonElement;
    expect(enabledBtn.disabled).toBe(false);
    fireEvent.click(enabledBtn);
    expect(remap).toHaveBeenCalledWith('itm-rm', 'dt-contract');
  });

  it('clicking Discard invokes skip(itemId)', () => {
    const skip = vi.fn().mockResolvedValue(undefined);
    const items = [makeItem({ itemId: 'itm-skip' })];
    useMappingReviewQueueMock.mockReturnValue(makeResult({ items, skip }));
    render(<MappingReviewPage />);
    fireEvent.click(screen.getByTestId('review-discard-itm-skip'));
    expect(skip).toHaveBeenCalledWith('itm-skip');
  });
});
