// Pins the header to ONE source of document status, and pins the ask in front
// of the one action that cannot be undone.
//
// Two things are under test, and they are the same change seen from two sides:
//
//  1. The Y.Doc's `meta.status` is not a status any more. The header used to
//     render it as a pill AND derive its Finalize/Unlock pair from it, so a
//     value any connected client could set decided both what the document
//     looked like and what could be done to it. A version of this component
//     that merely HIDES those controls while still reading `meta.status` would
//     pass a screenshot review and fail the assertions here.
//
//  2. `finalize` is terminal. Every other dialog in this header guards
//     something a second action can put back, so the finalize ask has to break
//     the click-through reflex rather than look like its neighbours — and it
//     must not fire until it has been broken deliberately.
//
// The authorization for finalize is NOT tested here, because it is not here:
// the button exists iff the server offered `finalize` in availableActions, and
// the server refuses the POST regardless. See platform-api's
// routes/__tests__/documentLifecycle.test.ts for the deny paths.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import DocumentHeader from '../DocumentHeader';
import type { DocumentMeta } from '../../../types/document';
import type {
  DocumentLifecycleStatus,
  LifecycleAction,
} from '../documentLifecycleTypes';

const onLifecycleAction = vi.fn();

function meta(patch: Partial<DocumentMeta> = {}): DocumentMeta {
  return {
    id: 'doc-1',
    title: 'Q3 Launch Plan',
    sourceType: 'notes',
    sourceId: '',
    createdBy: 'u-1',
    createdAt: '',
    aiModel: '',
    status: 'draft',
    ...patch,
  };
}

function renderHeader(opts: {
  m?: DocumentMeta;
  status?: DocumentLifecycleStatus;
  actions?: LifecycleAction[];
  terminal?: boolean;
  legacyClaim?: { unreconciled: true; serverStatus: DocumentLifecycleStatus } | null;
} = {}) {
  return render(
    <DocumentHeader
      meta={opts.m ?? meta()}
      mode="editor"
      participants={[]}
      onUpdateMeta={vi.fn()}
      onPrint={vi.fn()} onExport={vi.fn()}
      onToggleHistory={vi.fn()}
      onClearDocument={vi.fn()}
      lifecycleStatus={opts.status ?? 'approved'}
      lifecycleActions={opts.actions ?? ['reopen', 'finalize']}
      lifecycleTerminal={opts.terminal ?? false}
      lifecycleLegacyClaim={opts.legacyClaim ?? null}
      onLifecycleAction={onLifecycleAction}
    />,
  );
}

const dialog = () => screen.queryByRole('dialog');
const confirmBtn = () => screen.getByTestId('confirm-dialog-confirm');
const cancelBtn = () => screen.getByTestId('confirm-dialog-cancel');
const typeWord = (word: string) =>
  fireEvent.change(screen.getByTestId('lifecycle-finalize-confirm-input'), {
    target: { value: word },
  });

beforeEach(() => vi.clearAllMocks());
afterEach(() => cleanup());

// ---------------------------------------------------------------------------
// One source of truth
// ---------------------------------------------------------------------------

describe('the header renders the server status and no other', () => {
  it('shows the lifecycle status', () => {
    renderHeader({ status: 'in_review' });
    expect(screen.getByTestId('lifecycle-status')).toHaveTextContent('in review');
  });

  it('does NOT render the Y.Doc status, even when the two disagree', () => {
    // The exact case the old two-badge layout existed to expose. There is now
    // nothing to expose: the CRDT value is not consulted.
    renderHeader({ m: meta({ status: 'final' }), status: 'draft' });
    expect(screen.getByTestId('lifecycle-status')).toHaveTextContent('draft');
    expect(screen.queryByText('final')).toBeNull();
  });

  it('offers no CRDT Finalize/Unlock pair, whatever the Y.Doc says', () => {
    // These are the controls that wrote status into the Y.Doc. The old header
    // keyed them off `meta.status === 'final'`, so both spellings are checked.
    renderHeader({ m: meta({ status: 'final' }), status: 'approved', actions: [] });
    expect(screen.queryByRole('button', { name: 'Unlock' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Finalize' })).toBeNull();
  });

  it('a passed-but-deprecated onFinalize is wired to nothing', () => {
    // The prop still exists so the editor page compiles. It must be inert —
    // "accepted and ignored" has to mean ignored.
    const onFinalize = vi.fn();
    const onUnlock = vi.fn();
    render(
      <DocumentHeader
        meta={meta({ status: 'final' })}
        mode="editor"
        participants={[]}
        onUpdateMeta={vi.fn()}
        onPrint={vi.fn()} onExport={vi.fn()}
        onToggleHistory={vi.fn()}
        onClearDocument={vi.fn()}
        onFinalize={onFinalize}
        onUnlock={onUnlock}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Finalize' })).toBeNull();
    expect(screen.queryByRole('button', { name: 'Unlock' })).toBeNull();
    expect(onFinalize).not.toHaveBeenCalled();
    expect(onUnlock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Finalize comes from the server's offer, like every other action
// ---------------------------------------------------------------------------

describe('the finalize button follows availableActions', () => {
  it('is rendered when the server offers it', () => {
    renderHeader({ actions: ['finalize'] });
    expect(screen.getByTestId('lifecycle-action-finalize')).toBeInTheDocument();
  });

  it('is absent — not disabled — when the server does not offer it', () => {
    renderHeader({ status: 'draft', actions: ['submit_for_review'] });
    expect(screen.queryByTestId('lifecycle-action-finalize')).toBeNull();
  });

  it('is absent for a terminal document, along with everything else', () => {
    renderHeader({ status: 'finalized', actions: [], terminal: true });
    expect(screen.queryByTestId('lifecycle-action-finalize')).toBeNull();
    expect(screen.queryByTestId('lifecycle-action-reopen')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The ask
// ---------------------------------------------------------------------------

describe('confirming a finalize', () => {
  it('asks nothing until the button is clicked', () => {
    renderHeader();
    expect(dialog()).toBeNull();
    expect(onLifecycleAction).not.toHaveBeenCalled();
  });

  it('names the document and says the door does not reopen', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));

    expect(dialog()).toHaveTextContent(/Q3 Launch Plan/);
    expect(dialog()).toHaveTextContent(/no unlock/i);
    expect(dialog()).toHaveTextContent(/cannot be undone/i);
  });

  it('says it applies to everyone, not just the person clicking', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    expect(dialog()).toHaveTextContent(/read-only for everyone/i);
  });

  it('will not fire until the word is typed', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));

    expect(confirmBtn()).toBeDisabled();
    fireEvent.click(confirmBtn());
    expect(onLifecycleAction).not.toHaveBeenCalled();
  });

  it('a near-miss does not unlock the confirm', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('FINAL');
    expect(confirmBtn()).toBeDisabled();
  });

  it('fires once the word is typed', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('FINALIZE');

    expect(confirmBtn()).not.toBeDisabled();
    fireEvent.click(confirmBtn());
    expect(onLifecycleAction).toHaveBeenCalledWith('finalize', undefined);
  });

  it('accepts the word in any case, and padded', () => {
    // The gate is there to interrupt a reflex, not to test typing accuracy.
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('  finalize ');
    expect(confirmBtn()).not.toBeDisabled();
  });

  it('passes the reason along when one is given', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('FINALIZE');
    fireEvent.change(screen.getByTestId('lifecycle-reason-input'), {
      target: { value: 'shipped in v4' },
    });
    fireEvent.click(confirmBtn());
    expect(onLifecycleAction).toHaveBeenCalledWith('finalize', 'shipped in v4');
  });

  it('cancelling changes nothing', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('FINALIZE');
    fireEvent.click(cancelBtn());

    expect(onLifecycleAction).not.toHaveBeenCalled();
    expect(dialog()).toBeNull();
  });

  it('does not carry the typed word over to the next dialog', () => {
    // Otherwise a cancelled finalize leaves the gate pre-opened for the next
    // one, which is the same as not having a gate.
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    typeWord('FINALIZE');
    fireEvent.click(cancelBtn());

    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    expect(confirmBtn()).toBeDisabled();
  });

  it('does not put focus on the confirm control', () => {
    renderHeader();
    fireEvent.click(screen.getByTestId('lifecycle-action-finalize'));
    expect(document.activeElement).not.toBe(confirmBtn());
  });

  it('reopen — a reversible action — asks for no typing', () => {
    renderHeader({ actions: ['reopen'] });
    fireEvent.click(screen.getByTestId('lifecycle-action-reopen'));

    expect(screen.queryByTestId('lifecycle-finalize-confirm-input')).toBeNull();
    expect(confirmBtn()).not.toBeDisabled();
  });
});

// ---------------------------------------------------------------------------
// Terminality, stated
// ---------------------------------------------------------------------------

describe('a finalized document says so', () => {
  it('states that it is permanent rather than leaving an empty toolbar', () => {
    renderHeader({ status: 'finalized', actions: [], terminal: true });
    expect(screen.getByTestId('lifecycle-terminal-note')).toHaveTextContent(
      /permanently.*for anyone/i,
    );
  });

  it('says nothing of the sort about a merely approved document', () => {
    renderHeader({ status: 'approved', terminal: false });
    expect(screen.queryByTestId('lifecycle-terminal-note')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The pre-lifecycle 'final' claim
// ---------------------------------------------------------------------------

describe('a document the OLD Finalize marked final', () => {
  it('reports the disagreement instead of silently unlocking it', () => {
    renderHeader({
      m: meta({ status: 'final' }),
      status: 'draft',
      legacyClaim: { unreconciled: true, serverStatus: 'draft' },
    });
    const banner = screen.getByTestId('lifecycle-legacy-claim');
    expect(banner).toHaveTextContent(/marked final before the status moved to the server/i);
    expect(banner).toHaveTextContent(/editable again/i);
  });

  it('points at the real route rather than offering a one-click restore', () => {
    // A "restore it" button here would be the original bug with a nicer
    // interface: a client asserting a terminal state.
    renderHeader({
      m: meta({ status: 'final' }),
      status: 'draft',
      legacyClaim: { unreconciled: true, serverStatus: 'draft' },
    });
    expect(screen.getByTestId('lifecycle-legacy-claim')).toHaveTextContent(
      /take it through review/i,
    );
    expect(screen.queryByRole('button', { name: /restore/i })).toBeNull();
  });

  it('is silent for a document with no such claim', () => {
    renderHeader({ status: 'draft', legacyClaim: null });
    expect(screen.queryByTestId('lifecycle-legacy-claim')).toBeNull();
  });
});
