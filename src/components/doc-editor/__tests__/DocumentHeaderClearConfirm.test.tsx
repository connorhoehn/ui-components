// Pins the ask in front of "Clear Document".
//
// The regression this guards is not "the dialog looks different" — it is a
// menu item that fires straight into `onClearDocument`. Clear wipes every
// section for every person in the document, so the load-bearing assertions are
// the two negative ones: nothing happens on cancel, and the confirm button is
// not the element the browser hands focus to.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import DocumentHeader from '../DocumentHeader';
import type { DocumentMeta } from '../../../types/document';

const onClearDocument = vi.fn();

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

function renderHeader(m: DocumentMeta = meta()) {
  return render(
    <DocumentHeader
      meta={m}
      mode="editor"
      participants={[]}
      onUpdateMeta={vi.fn()}
      onPrint={vi.fn()} onExport={vi.fn()}
      onToggleHistory={vi.fn()}
      onClearDocument={onClearDocument}
    />,
  );
}

/** Opens the ⋯ menu and clicks Clear Document. */
function clickClear() {
  fireEvent.click(screen.getByTitle('More actions'));
  fireEvent.click(screen.getByTestId('clear-document-btn'));
}

const dialog = () => screen.queryByRole('dialog');
const confirmBtn = () => screen.getByTestId('confirm-dialog-confirm');
const cancelBtn = () => screen.getByTestId('confirm-dialog-cancel');

beforeEach(() => vi.clearAllMocks());
afterEach(() => cleanup());

describe('clearing a document', () => {
  it('asks nothing until the menu item is clicked', () => {
    renderHeader();
    // Absent, not hidden — a mounted-but-invisible dialog is a click away from
    // being reachable by keyboard.
    expect(dialog()).toBeNull();
    expect(onClearDocument).not.toHaveBeenCalled();
  });

  it('names the document it is about to empty', () => {
    renderHeader();
    clickClear();

    // Scoped to the dialog — the header's own title input carries the same
    // text, and a page-wide match would pass on an unnamed dialog.
    expect(dialog()).toHaveTextContent(/Q3 Launch Plan/);
    // The consequence, not just "are you sure".
    expect(dialog()).toHaveTextContent(/for everyone in the document/i);
  });

  it('labels the confirm control with the verb, never "OK"', () => {
    renderHeader();
    clickClear();

    expect(confirmBtn()).toHaveTextContent(/^Clear document$/);
    expect(confirmBtn()).not.toHaveTextContent(/^OK$/i);
  });

  it('does not put focus on the destructive control', () => {
    renderHeader();
    clickClear();

    // Cancel is the safe default. Someone hammering Enter must not wipe the doc.
    expect(document.activeElement).not.toBe(confirmBtn());
    expect(document.activeElement).toBe(cancelBtn());
  });

  it('confirming runs the same clear the old prompt ran', () => {
    renderHeader();
    clickClear();
    fireEvent.click(confirmBtn());

    expect(onClearDocument).toHaveBeenCalledTimes(1);
    expect(dialog()).toBeNull();
  });

  it('cancelling touches nothing', () => {
    renderHeader();
    clickClear();
    fireEvent.click(cancelBtn());

    expect(onClearDocument).not.toHaveBeenCalled();
    expect(dialog()).toBeNull();
  });

  it('falls back to the title placeholder rather than naming nothing', () => {
    renderHeader(meta({ title: '' }));
    clickClear();

    expect(dialog()).toHaveTextContent(/Untitled document/);
  });
});
