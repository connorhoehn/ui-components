// The whole point of this page is the object it hands to `resolveConflict`:
// a `pick` that always exists, a `fieldChoices` map that must be OMITTED
// rather than sent empty (an empty map and no map mean different things to
// the write-back engine), and a trimmed note that must disappear entirely
// when the operator typed only whitespace. The other load-bearing rule is
// that "Auto-merged" can only be chosen when the engine actually produced a
// merge — picking a merge that doesn't exist would resolve the conflict to
// undefined.

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

describe('ConflictsPage queue', () => {
  it('shows only pending conflicts and counts the rest as resolved', () => {
    renderPage({
      conflicts: [
        conflict({ conflictId: 'c1', summary: 'still pending' }),
        conflict({ conflictId: 'c2', summary: 'already handled', status: 'resolved' }),
      ],
    });
    expect(screen.getByTestId('conflict-row-c1')).toBeInTheDocument();
    expect(screen.queryByTestId('conflict-row-c2')).toBeNull();
    expect(screen.getByText(/1 pending/)).toHaveTextContent('1 resolved');
  });

  it('renders the empty state when everything pending has been cleared', () => {
    renderPage({ conflicts: [conflict({ status: 'discarded' })] });
    expect(screen.getByText('No pending conflicts')).toBeInTheDocument();
    expect(screen.queryByTestId('conflict-detail')).toBeNull();
  });

  it('auto-selects the first pending conflict so the detail pane is never blank', () => {
    renderPage({ conflicts: [conflict({ conflictId: 'c1', summary: 'first one' }), conflict({ conflictId: 'c2' })] });
    expect(within(screen.getByTestId('conflict-detail')).getByText('first one')).toBeInTheDocument();
  });

  it('selecting another conflict swaps the detail pane', () => {
    renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2', summary: 'the second one' })],
    });
    fireEvent.click(screen.getByTestId('conflict-row-c2'));
    expect(within(screen.getByTestId('conflict-detail')).getByText('the second one')).toBeInTheDocument();
  });

  it('prefers a resolved source name over the raw sourceId', () => {
    renderPage(
      { conflicts: [conflict({ sourceId: 's-42' })] },
      [{ sourceId: 's-42', name: 'Team Drive' } as IngestSource],
    );
    expect(within(screen.getByTestId('conflict-detail')).getByText('Team Drive')).toBeInTheDocument();
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
  it('defaults to the platform side and omits the optional keys entirely', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', { pick: 'platform' }));
  });

  it('carries the whole-conflict pick when the operator switches sides', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('global-pick-source'));
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', { pick: 'source' }));
  });

  it('includes only the fields the operator actually overrode', async () => {
    const hook = renderPage({
      conflicts: [conflict({ fields: [field('title'), field('body')] })],
    });
    fireEvent.click(screen.getByTestId('field-pick-body-source'));
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', {
      pick: 'platform',
      fieldChoices: { body: 'source' },
    }));
  });

  it('clearing an override removes the key rather than pinning the global pick', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('field-pick-title-source'));
    fireEvent.click(screen.getByTestId('field-clear-title'));
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', { pick: 'platform' }));
  });

  it('trims the note, and drops a whitespace-only one', async () => {
    const hook = renderPage();
    fireEvent.change(screen.getByTestId('conflict-note'), { target: { value: '   ' } });
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c1', { pick: 'platform' }));

    fireEvent.change(screen.getByTestId('conflict-note'), { target: { value: '  source wins  ' } });
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenLastCalledWith('c1', {
      pick: 'platform',
      note: 'source wins',
    }));
  });

  it('discard bypasses the resolution payload entirely', async () => {
    const hook = renderPage();
    fireEvent.click(screen.getByTestId('conflict-discard'));
    await waitFor(() => expect(hook.discardConflict).toHaveBeenCalledWith('c1'));
    expect(hook.resolveConflict).not.toHaveBeenCalled();
  });
});

describe('ConflictsPage merged-side guard', () => {
  it('disables the global Auto-merged pick when no field has a merge proposal', () => {
    renderPage();
    expect(screen.getByTestId('global-pick-merged')).toBeDisabled();
  });

  it('enables it as soon as any single field carries a mergedValue', () => {
    renderPage({ conflicts: [conflict({ fields: [field('title'), field('body', { mergedValue: 'merged body' })] })] });
    expect(screen.getByTestId('global-pick-merged')).not.toBeDisabled();
  });

  it('keeps the per-field Merged pick disabled on fields with no merge of their own', () => {
    renderPage({ conflicts: [conflict({ fields: [field('title'), field('body', { mergedValue: 'merged body' })] })] });
    expect(screen.getByTestId('field-pick-title-merged')).toBeDisabled();
    expect(screen.getByTestId('field-pick-body-merged')).not.toBeDisabled();
  });
});

describe('ConflictsPage per-conflict state isolation', () => {
  it('switching conflicts resets the pick, the overrides and the note', async () => {
    const hook = renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2' })],
    });
    fireEvent.click(screen.getByTestId('global-pick-source'));
    fireEvent.click(screen.getByTestId('field-pick-title-source'));
    fireEvent.change(screen.getByTestId('conflict-note'), { target: { value: 'leftover' } });

    fireEvent.click(screen.getByTestId('conflict-row-c2'));
    fireEvent.click(screen.getByTestId('conflict-resolve'));
    await waitFor(() => expect(hook.resolveConflict).toHaveBeenCalledWith('c2', { pick: 'platform' }));
  });
});

// REGRESSION (keyboard a11y): the left-rail conflict rows were bare
// `<div onClick>` — not focusable, not exposed as buttons, and with no key
// handler — so a keyboard-only operator could never pick which conflict to
// inspect or resolve. The whole queue was mouse-only. They are real
// `<button type="button">` now, so the browser supplies focus plus Enter and
// Space activation, and assistive tech announces them as buttons.
describe('ConflictsPage queue — keyboard selection', () => {
  it('exposes each conflict row as a button named after the conflict', () => {
    renderPage({ conflicts: [conflict({ conflictId: 'c1', summary: 'first one' })] });
    expect(screen.getByRole('button', { name: /first one/ })).toBe(
      screen.getByTestId('conflict-row-c1'),
    );
  });

  it('puts every conflict row in the tab order', () => {
    renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2', summary: 'the second one' })],
    });
    const row = screen.getByTestId('conflict-row-c2');
    expect(row.tagName).toBe('BUTTON');
    expect(row).toHaveAttribute('type', 'button');
    row.focus();
    expect(document.activeElement).toBe(row);
  });

  it('activating a focused row swaps the detail pane', () => {
    renderPage({
      conflicts: [conflict({ conflictId: 'c1' }), conflict({ conflictId: 'c2', summary: 'the second one' })],
    });
    const row = screen.getByRole('button', { name: /the second one/ });
    row.focus();
    // jsdom does not run the browser's Enter->click default action, so click
    // stands in for it; the focusability assertion above is what proves the
    // key press can reach this row at all.
    fireEvent.click(row);
    expect(within(screen.getByTestId('conflict-detail')).getByText('the second one')).toBeInTheDocument();
  });

  it('marks the active row with aria-pressed so SR users hear the selection', () => {
    renderPage({
      conflicts: [conflict({ conflictId: 'c1', summary: 'first one' }), conflict({ conflictId: 'c2', summary: 'the second one' })],
    });
    expect(screen.getByTestId('conflict-row-c1')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByTestId('conflict-row-c2')).toHaveAttribute('aria-pressed', 'false');
  });
});
