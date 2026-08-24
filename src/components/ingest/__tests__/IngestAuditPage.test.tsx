import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type {
  IngestAuditEntry,
  IngestAuditFilters,
  UseIngestAuditResult,
} from '../../../hooks/useIngestAudit';

const useIngestAuditMock = vi.fn<(filters?: IngestAuditFilters) => UseIngestAuditResult>();

vi.mock('../../../hooks/useIngestAudit', () => ({
  useIngestAudit: (filters?: IngestAuditFilters) => useIngestAuditMock(filters),
}));

import IngestAuditPage from '../IngestAuditPage';

function makeEntry(overrides: Partial<IngestAuditEntry> = {}): IngestAuditEntry {
  return {
    auditId: 'aud-1',
    createdAt: '2026-05-17T08:30:15.000Z',
    actor: 'alice@example.com',
    eventType: 'mapping.decided',
    targetType: 'source',
    targetId: 'src-abcdef0123456789',
    summary: 'Mapping rule applied',
    detail: { rule: 'json-pattern', confidence: 0.92 },
    ...overrides,
  };
}

function makeResult(overrides: Partial<UseIngestAuditResult> = {}): UseIngestAuditResult {
  return {
    entries: [],
    loading: false,
    error: null,
    refresh: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  useIngestAuditMock.mockReset();
  useIngestAuditMock.mockReturnValue(makeResult());
});

describe('IngestAuditPage', () => {
  it('renders the empty state when there are no entries and not loading/error', () => {
    render(<IngestAuditPage />);
    expect(screen.getByTestId('audit-empty')).toBeInTheDocument();
    expect(screen.getByText('No audit entries')).toBeInTheDocument();
  });

  it('renders the error banner when error is set', () => {
    useIngestAuditMock.mockReturnValue(makeResult({ error: 'boom' }));
    render(<IngestAuditPage />);
    expect(screen.getByTestId('audit-error')).toHaveTextContent('boom');
  });

  it('renders skeleton placeholder while loading with no entries', () => {
    useIngestAuditMock.mockReturnValue(makeResult({ loading: true }));
    render(<IngestAuditPage />);
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    expect(screen.queryByTestId('audit-table')).not.toBeInTheDocument();
  });

  it('renders one row per entry with actor, event type, target, and summary', () => {
    const entries = [
      makeEntry({ auditId: 'aud-a', actor: 'ops@x.io', summary: 'Source paused' }),
      makeEntry({
        auditId: 'aud-b',
        actor: 'sys',
        eventType: 'source.paused',
        summary: 'Auto-paused after 5 failures',
      }),
    ];
    useIngestAuditMock.mockReturnValue(makeResult({ entries }));
    render(<IngestAuditPage />);
    expect(screen.getByTestId('audit-table')).toBeInTheDocument();
    const rowA = screen.getByTestId('audit-row-aud-a');
    expect(rowA).toHaveTextContent('ops@x.io');
    expect(rowA).toHaveTextContent('mapping.decided');
    expect(rowA).toHaveTextContent('Source paused');
    const rowB = screen.getByTestId('audit-row-aud-b');
    expect(rowB).toHaveTextContent('sys');
    expect(rowB).toHaveTextContent('source.paused');
    expect(rowB).toHaveTextContent('Auto-paused after 5 failures');
  });

  it('passes initial filters (24h range, limit 200, no event/actor/target) to the hook', () => {
    render(<IngestAuditPage />);
    const lastCall = useIngestAuditMock.mock.calls.at(-1)?.[0];
    expect(lastCall?.limit).toBe(200);
    expect(lastCall?.eventType).toBeUndefined();
    expect(lastCall?.actor).toBeUndefined();
    expect(lastCall?.targetId).toBeUndefined();
    expect(typeof lastCall?.since).toBe('string');
  });

  it('changing the event-type select re-runs the hook with the new eventType filter', () => {
    render(<IngestAuditPage />);
    fireEvent.change(screen.getByTestId('audit-event-type'), { target: { value: 'source.paused' } });
    const lastCall = useIngestAuditMock.mock.calls.at(-1)?.[0];
    expect(lastCall?.eventType).toBe('source.paused');
  });

  it('typing in the actor input re-runs the hook with the trimmed actor filter', () => {
    render(<IngestAuditPage />);
    fireEvent.change(screen.getByTestId('audit-actor'), { target: { value: '  alice@x.io  ' } });
    const lastCall = useIngestAuditMock.mock.calls.at(-1)?.[0];
    expect(lastCall?.actor).toBe('alice@x.io');
  });

  it('typing in the target input re-runs the hook with the trimmed targetId filter', () => {
    render(<IngestAuditPage />);
    fireEvent.change(screen.getByTestId('audit-target-id'), { target: { value: 'src-xyz' } });
    const lastCall = useIngestAuditMock.mock.calls.at(-1)?.[0];
    expect(lastCall?.targetId).toBe('src-xyz');
  });

  it('selecting "All time" drops the since filter', () => {
    render(<IngestAuditPage />);
    fireEvent.change(screen.getByTestId('audit-time-range'), { target: { value: 'all' } });
    const lastCall = useIngestAuditMock.mock.calls.at(-1)?.[0];
    expect(lastCall?.since).toBeUndefined();
  });

  // -------------------------------------------------------------------------
  // Label wiring — this filter bar carried the contradicting-label defect
  // -------------------------------------------------------------------------
  //
  // Three of the four filters announced a name DIFFERENT from the word printed
  // beside them: aria-label="Time range" next to a caption reading "Time",
  // "Event type" next to "Event", "Target ID" next to "Target". That is the
  // worst shape of the bug, because no sighted user can see the name being
  // read aloud, so nobody can report the mismatch. The captions were plain
  // <span>s that named nothing, so the invented aria-label was the ONLY name.
  //
  // The visible text wins. The captions are now real <label htmlFor>
  // associations and the aria-labels are gone, leaving one source of truth.

  it('names each filter with the word printed beside it', () => {
    render(<IngestAuditPage />);
    // Resolving the association, not asserting an attribute exists: an id
    // pointing at no element still "has an id".
    expect(screen.getByLabelText('Time')).toBe(screen.getByTestId('audit-time-range'));
    expect(screen.getByLabelText('Event')).toBe(screen.getByTestId('audit-event-type'));
    expect(screen.getByLabelText('Actor')).toBe(screen.getByTestId('audit-actor'));
    expect(screen.getByLabelText('Target')).toBe(screen.getByTestId('audit-target-id'));
  });

  it('no longer answers to the invented names that contradicted the captions', () => {
    // INVERTED expectation: "Time range" / "Event type" / "Target ID" were what
    // a screen reader used to say. Kept as a negative assertion so nobody
    // reintroduces a compensating aria-label on top of a visible caption.
    render(<IngestAuditPage />);
    expect(screen.queryByLabelText('Time range')).toBeNull();
    expect(screen.queryByLabelText('Event type')).toBeNull();
    expect(screen.queryByLabelText('Target ID')).toBeNull();
  });

  it('clicking the per-row detail toggle reveals the JSON detail, clicking again hides it', () => {
    const entries = [makeEntry({ auditId: 'aud-t', detail: { foo: 'bar' } })];
    useIngestAuditMock.mockReturnValue(makeResult({ entries }));
    render(<IngestAuditPage />);
    expect(screen.queryByTestId('audit-detail-aud-t')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('audit-detail-toggle-aud-t'));
    const detail = screen.getByTestId('audit-detail-aud-t');
    expect(detail).toHaveTextContent('"foo": "bar"');
    fireEvent.click(screen.getByTestId('audit-detail-toggle-aud-t'));
    expect(screen.queryByTestId('audit-detail-aud-t')).not.toBeInTheDocument();
  });
});
