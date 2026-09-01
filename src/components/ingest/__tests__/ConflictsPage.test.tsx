// ConflictsPage, on the change-review pattern.
//
// The load-bearing rules are unchanged from the master-detail version this
// replaces, and they are what most of this file still guards:
//
//   * the object handed to `resolveConflict` always carries a `pick`,
//   * `fieldChoices` is never sent EMPTY (an empty map and no map mean
//     different things to the write-back engine),
//   * a whitespace-only note disappears entirely rather than being sent,
//   * "Auto-merged" can only be chosen on a field that actually has a merge —
//     picking one that does not exist would resolve the conflict to undefined,
//   * a failed action is reported as a failed ACTION, never as a failed load.
//
// What changed is the shape of the surface, so the interaction tests moved with
// it: there is no left rail and no selected conflict any more. Every pending
// conflict renders its own document-headed queue, which is the point — the
// operator sees WHICH DOCUMENT is about to change without clicking anything.

import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { UseIngestSourcesReturn } from '../../../hooks/useIngestSources';
import type { UseSyncConflictsReturn } from '../../../hooks/useSyncConflicts';
import type { SyncConflict, ConflictField, IngestSource } from '../../../types/ingest';

const useSyncConflictsMock = vi.fn<() => UseSyncConflictsReturn>();
const useIngestSourcesMock = vi.fn<() => UseIngestSourcesReturn>();

vi.mock('../../../hooks/useSyncConflicts', () => ({ useSyncConflicts: () => useSyncConflictsMock() }));
vi.mock('../../../hooks/useIngestSources', () => ({ useIngestSources: () => useIngestSourcesMock() }));

import ConflictsPage from '../ConflictsPage';

const now = () => new Date().toISOString();

function field(name: string, over: Partial<ConflictField> = {}): ConflictField {
  return { field: name, sourceValue: `${name}-source`, platformValue: `${name}-platform`, ...over };
}

function conflict(over: Partial<SyncConflict> = {}): SyncConflict {
  return {
    conflictId: 'c1',
    sourceId: 's1',
    documentId: 'd1',
    documentTitle: 'Acme MSA',
    documentTypeId: null,
    sourceRef: 'drive:abc',
    summary: 'Title changed on both sides',
    fields: [field('title')],
    status: 'pending',
    platformUpdatedAt: now(),
    sourceUpdatedAt: now(),
    detectedAt: now(),
    ...over,
  };
}

function renderPage(over: Partial<UseSyncConflictsReturn> = {}, sources: IngestSource[] = []) {
  const hook: UseSyncConflictsReturn = {
    conflicts: [conflict()],
    loading: false,
    error: null,
    usingMock: false,
    refresh: vi.fn().mockResolvedValue(undefined),
    resolveConflict: vi.fn().mockResolvedValue(true),
    discardConflict: vi.fn().mockResolvedValue(true),
    actionError: null,
    clearActionError: vi.fn(),
    ...over,
  };
  useSyncConflictsMock.mockReturnValue(hook);
  useIngestSourcesMock.mockReturnValue({
    sources, loading: false, error: null,
    refresh: vi.fn(), createSource: vi.fn(), deleteSource: vi.fn(), triggerSync: vi.fn(),
  } as unknown as UseIngestSourcesReturn);
  render(<ConflictsPage />);
  return hook;
}

beforeEach(() => {
  useSyncConflictsMock.mockReset();
  useIngestSourcesMock.mockReset();
});

describe('ConflictsPage — document-first framing', () => {
  // The regression this page existed to demonstrate: the heading named the
  // SYSTEM ("Sync Conflicts") and the document appeared only as a value inside
  // a diff cell, so you had to read the diff to learn what you were looking at.
  it('heads each queue with the DOCUMENT name, not the queue name', () => {
    renderPage({ conflicts: [conflict({ documentTitle: 'Acme MSA' })] });
    expect(screen.getByTestId('change-review-list-title')).toHaveTextContent('Acme MSA');
  });

  it('states the change count next to the document', () => {
    renderPage({ conflicts: [conflict({ fields: [field('title'), field('body.intro')] })] });
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('2 changes');
  });

  it('singularises a one-change queue', () => {
    renderPage();
    expect(screen.getByTestId('change-review-list-count')).toHaveTextContent('1 change to review');
  });

  it('falls back to the documentId when the connector gave no title', () => {
    renderPage({ conflicts: [conflict({ documentId: 'doc-42', documentTitle: undefined }) ] });
    expect(screen.getByTestId('change-review-list-title')).toHaveTextContent('doc-42');
  });

  it('gives every pending conflict its own document-headed queue', () => {
    renderPage({
      conflicts: [
        conflict({ conflictId: 'c1', documentTitle: 'Acme MSA' }),
        conflict({ conflictId: 'c2', documentTitle: 'Q2 Report' }),
      ],
    });
    const titles = screen.getAllByTestId('change-review-list-title').map((n) => n.textContent);
    expect(titles).toEqual(['Acme MSA', 'Q2 Report']);
  });
});

describe('ConflictsPage — the change itself', () => {
  it('leads each card with a human category rather than the machine path', () => {
    renderPage({ conflicts: [conflict({ fields: [field('body.summary')] })] });
    expect(screen.getByTestId('conflict-field-body.summary-category')).toHaveTextContent('Summary');
  });

  it('keeps the machine path available as the location hint', () => {
    renderPage({ conflicts: [conflict({ fields: [field('body.summary')] })] });
    expect(screen.getByTestId('conflict-field-body.summary-location')).toHaveTextContent('body.summary');
  });

  it('renders a document-relative location when the connector supplies one', () => {
    renderPage({
      conflicts: [conflict({ fields: [field('body.summary', { path: ['Body', 'Summary'] })] })],
    });
    const loc = screen.getByTestId('conflict-field-body.summary-location');
    expect(loc).toHaveTextContent('Body');
    expect(loc).toHaveTextContent('Summary');
  });

  it('shows the change on ONE axis: this copy → incoming', () => {
    renderPage({
      conflicts: [conflict({ fields: [field('title', {
        platformValue: 'Acme MSA 2026',
        sourceValue: 'Acme MSA (2026, signed)',
      })] })],
    });
    const card = screen.getByTestId('conflict-field-title');
    expect(within(card).getByTestId('conflict-field-title-diff-before-0'))
      .toHaveTextContent('Acme MSA 2026');
    expect(within(card).getByTestId('conflict-field-title-diff-after-0'))
      .toHaveTextContent('Acme MSA (2026, signed)');
  });

  it('names the editor when the connector knows one', () => {
    renderPage({ conflicts: [conflict({ fields: [field('title', { changedBy: 'Dana Whitfield' })] })] });
    expect(screen.getByTestId('conflict-field-title-author')).toHaveTextContent('Dana Whitfield');
  });

  // An S3 write carries no editor. The wrong fix is to credit the change to
  // the source system — a provenance is not a person.
  it('says "Unattributed" rather than crediting the source system', () => {
    renderPage(
      { conflicts: [conflict({ sourceId: 's-42', fields: [field('attachment.sha256')] })] },
      [{ sourceId: 's-42', name: 'Contracts (Google Drive)' } as IngestSource],
    );
    const author = screen.getByTestId('conflict-field-attachment.sha256-author');
    expect(author).toHaveTextContent('Unattributed');
    expect(author).not.toHaveTextContent('Google Drive');
  });

  // No verdict producer exists for sync conflicts, so this surface must show
  // the absent state honestly — not a blank where a verdict would go.
  it('shows the not-reviewed verdict state rather than nothing', () => {
    renderPage();
    expect(screen.getByTestId('conflict-field-title-verdict')).toHaveAttribute(
      'data-verdict-state', 'absent',
    );
  });
});

describe('ConflictsPage queue', () => {
  it('shows only pending conflicts', () => {
    renderPage({
      conflicts: [
        conflict({ conflictId: 'c1', documentTitle: 'still pending' }),
        conflict({ conflictId: 'c2', documentTitle: 'already handled', status: 'resolved' }),
      ],
    });
    expect(screen.getByText('still pending')).toBeInTheDocument();
    expect(screen.queryByText('already handled')).toBeNull();
  });

  it('renders the empty state when everything pending has been cleared', () => {
    renderPage({ conflicts: [conflict({ status: 'discarded' })] });
    expect(screen.getByText('No pending conflicts')).toBeInTheDocument();
  });

  it('prefers a resolved source name over the raw sourceId', () => {
    renderPage(
      { conflicts: [conflict({ sourceId: 's-42' })] },
      [{ sourceId: 's-42', name: 'Team Drive' } as IngestSource],
    );
    expect(screen.getByText(/Team Drive/)).toBeInTheDocument();
  });
});

describe('ConflictsPage banners', () => {
  it('flags mock data explicitly', () => {
    renderPage({ usingMock: true });
    expect(screen.getByTestId('conflicts-mock-banner')).toBeInTheDocument();
  });

  it('suppresses the load error while the mock fallback is standing in for it', () => {
    renderPage({ usingMock: true, error: '404' });
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows the load error when there is no fallback', () => {
    renderPage({ error: 'gateway timeout' });
    expect(screen.getByRole('alert')).toHaveTextContent('gateway timeout');
  });
});

describe('ConflictsPage resolution payload', () => {
  it('always carries a pick, and a per-field map that is never empty', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('conflict-resolve-c1'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', {
      pick: 'source',
      fieldChoices: { title: 'source' },
    }));
    const sent = (hook.resolveConflict as ReturnType<typeof vi.fn>).mock.calls[0]![1];
    expect(Object.keys(sent.fieldChoices ?? {}).length).toBeGreaterThan(0);
  });

  it('records a per-field override without disturbing the others', async () => {
    const hook = renderPage({
      conflicts: [conflict({ fields: [field('title'), field('body')] })],
    });
    fireEvent.click(screen.getByTestId('field-pick-body-platform'));
    fireEvent.click(screen.getByTestId('conflict-resolve-c1'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', {
      pick: 'source',
      fieldChoices: { title: 'source', body: 'platform' },
    }));
  });

  it('trims the note, and drops a whitespace-only one', async () => {
    const hook = renderPage();
    fireEvent.change(screen.getByTestId('conflict-note-c1'), { target: { value: '   ' } });
    fireEvent.click(screen.getByTestId('conflict-resolve-c1'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', {
      pick: 'source',
      fieldChoices: { title: 'source' },
    }));

    fireEvent.change(screen.getByTestId('conflict-note-c1'), { target: { value: '  source wins  ' } });
    fireEvent.click(screen.getByTestId('conflict-resolve-c1'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenLastCalledWith('c1', {
      pick: 'source',
      fieldChoices: { title: 'source' },
      note: 'source wins',
    }));
  });

  it('discard bypasses the resolution payload entirely', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('conflict-discard-c1'));
    await waitFor(() => expect(hook.discardConflict).toHaveBeenCalledWith('c1'));
    expect(hook.resolveConflict).not.toHaveBeenCalled();
  });

  // Each document commits on its own. Resolving one must not sweep the other.
  it('resolves only the document whose button was pressed', async () => {
    const hook = renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2' })],
    });
    fireEvent.click(screen.getByTestId('conflict-resolve-c2'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledTimes(1));
    expect(hook.resolveConflict).toHaveBeenCalledWith('c2', expect.anything());
  });

  // Per-field choices are keyed by conflict, so two documents that both have a
  // `title` field cannot bleed into one another.
  it('keeps per-field choices isolated between documents', async () => {
    const hook = renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2' })],
    });
    const [firstTitlePick] = screen.getAllByTestId('field-pick-title-platform');
    fireEvent.click(firstTitlePick!);
    fireEvent.click(screen.getByTestId('conflict-resolve-c2'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c2', {
      pick: 'source',
      fieldChoices: { title: 'source' },
    }));
  });
});

describe('ConflictsPage merged-side guard', () => {
  it('keeps the Merged pick disabled on a field with no merge of its own', () => {
    renderPage({ conflicts: [conflict({ fields: [field('title'), field('body', { mergedValue: 'merged body' })] })] });
    expect(screen.getByTestId('field-pick-title-merged')).toBeDisabled();
    expect(screen.getByTestId('field-pick-body-merged')).not.toBeDisabled();
  });

  it('never sends a merged pick for a field that has no merge', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('field-pick-title-merged'));
    fireEvent.click(screen.getByTestId('conflict-resolve-c1'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', {
      pick: 'source',
      fieldChoices: { title: 'source' },
    }));
  });
});

// The resolution controls must stay reachable without a mouse. They are real
// `<button type="button">` with `aria-pressed`, so the browser supplies focus
// plus Enter/Space and assistive tech announces the current choice.
describe('ConflictsPage — keyboard reachable resolution', () => {
  it('exposes each field choice as a focusable button', () => {
    renderPage();
    const pick = screen.getByTestId('field-pick-title-platform');
    expect(pick.tagName).toBe('BUTTON');
    expect(pick).toHaveAttribute('type', 'button');
    pick.focus();
    expect(document.activeElement).toBe(pick);
  });

  it('announces the active choice with aria-pressed', () => {
    renderPage();
    expect(screen.getByTestId('field-pick-title-source')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('field-pick-title-platform')).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(screen.getByTestId('field-pick-title-platform'));
    expect(screen.getByTestId('field-pick-title-platform')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('field-pick-title-source')).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('ConflictsPage action failures', () => {
  // A rejected Resolve is not a rejected load. Reporting it as one told the
  // operator the queue had failed to load while the queue sat right there,
  // fully loaded — and the next poll cleared the message, so the conflict
  // looked handled when it was still pending.
  it('reports a failed resolve without claiming the queue failed to load', () => {
    renderPage({ actionError: 'HTTP 422' });

    const banner = screen.getByTestId('conflicts-action-error');
    expect(banner).toHaveTextContent(/not updated/i);
    expect(banner).toHaveTextContent(/HTTP 422/);
    expect(screen.queryByText(/Failed to load conflicts/i)).not.toBeInTheDocument();
  });

  it('keeps the conflict queue on screen while an action error is showing', () => {
    renderPage({
      actionError: 'HTTP 500',
      conflicts: [conflict({ conflictId: 'c1', documentTitle: 'still needs a call' })],
    });

    expect(screen.getByTestId('conflicts-action-error')).toBeInTheDocument();
    expect(screen.getByTestId('change-review-list-title')).toHaveTextContent('still needs a call');
    expect(screen.getByTestId('conflict-field-title')).toBeInTheDocument();
  });

  it('Dismiss clears the action error through the hook', () => {
    const hook = renderPage({ actionError: 'HTTP 500' });

    fireEvent.click(within(screen.getByTestId('conflicts-action-error')).getByRole('button', { name: /dismiss/i }));
    expect(hook.clearActionError).toHaveBeenCalled();
  });
});
