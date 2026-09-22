// "New document → Presentation", and the question it asks next.
//
// A deck is the one document type whose first draft is generated rather than
// typed, so the dialog's job is to collect the two things the generator needs:
// what to call it, and what to ground it in. The tests below are about that
// second field existing, being required when it matters, and reaching the host
// in the shape `POST /api/deck/fixture` takes.

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import NewDocumentModal from '../NewDocumentModal';

// The modal reconciles document types with the server on every open. Nothing
// here is about types, so the probe is stubbed to a quiet failure — which the
// modal already handles by keeping whatever the cache had.
beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
});

const recordings = [
  { id: 'rec-1', title: 'Sprint review call', kind: 'transcript' as const, subtitle: '42 min' },
  { id: 'rec-2', title: 'Design sync', kind: 'transcript' as const },
];

function open(props: Partial<React.ComponentProps<typeof NewDocumentModal>> = {}) {
  return render(
    <NewDocumentModal open onClose={props.onClose ?? vi.fn()} onCreate={props.onCreate ?? vi.fn()} {...props} />,
  );
}

describe('NewDocumentModal — Presentation', () => {
  it('offers Presentation as a shape', () => {
    open();
    const card = screen.getByTestId('doc-shape-presentation');
    expect(card).toHaveTextContent('Presentation');
    expect(card).toHaveTextContent('every slide cites its source');
  });

  it('asks where the first draft comes from, only once Presentation is picked', () => {
    open();
    expect(screen.queryByTestId('presentation-start-from')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    const select = screen.getByTestId('presentation-from');
    expect(select).toHaveValue('blank');
    expect(Array.from((select as HTMLSelectElement).options).map((option) => option.value)).toEqual([
      'blank',
      'transcript',
      'document',
    ]);
  });

  it('creates a blank deck through onCreateFromFixture', () => {
    const onCreateFromFixture = vi.fn();
    const onClose = vi.fn();
    open({ onCreateFromFixture, onClose });

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Q3 review' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(onCreateFromFixture).toHaveBeenCalledWith({ from: 'blank', title: 'Q3 review' });
    expect(onClose).toHaveBeenCalled();
  });

  it('will not create a derived deck until the source is named', () => {
    const onCreateFromFixture = vi.fn();
    open({ onCreateFromFixture, recordings });

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Sprint deck' } });
    fireEvent.change(screen.getByTestId('presentation-from'), { target: { value: 'transcript' } });

    expect(screen.getByTestId('new-doc-submit')).toBeDisabled();

    fireEvent.change(screen.getByTestId('presentation-source'), { target: { value: 'rec-1' } });
    expect(screen.getByTestId('new-doc-submit')).not.toBeDisabled();

    fireEvent.click(screen.getByTestId('new-doc-submit'));
    expect(onCreateFromFixture).toHaveBeenCalledWith({
      from: 'transcript',
      sourceId: 'rec-1',
      title: 'Sprint deck',
    });
  });

  it('feeds the document picker from the host’s Documents search', async () => {
    const onSearchDocuments = vi.fn().mockResolvedValue([{ id: 'doc-4', title: 'Roadmap Q3' }]);
    const onCreateFromFixture = vi.fn();
    open({ onSearchDocuments, onCreateFromFixture });

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('presentation-from'), { target: { value: 'document' } });
    fireEvent.change(screen.getByTestId('presentation-source-search'), { target: { value: 'road' } });

    await waitFor(() => expect(screen.getByTestId('presentation-source')).toBeInTheDocument());
    expect(onSearchDocuments).toHaveBeenCalledWith('road');
    expect(screen.getByTestId('presentation-source')).toHaveTextContent('Roadmap Q3');
  });

  it('says so honestly when there is nothing to draw on', () => {
    open({ recordings: [] });
    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('presentation-from'), { target: { value: 'transcript' } });
    expect(screen.getByTestId('presentation-no-sources')).toHaveTextContent('No transcripts to draw on');
  });

  it('drops a chosen source when the origin changes, so ids never cross', () => {
    const onCreateFromFixture = vi.fn();
    open({ recordings, onSearchDocuments: () => [], onCreateFromFixture });

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('presentation-from'), { target: { value: 'transcript' } });
    fireEvent.change(screen.getByTestId('presentation-source'), { target: { value: 'rec-2' } });
    fireEvent.change(screen.getByTestId('presentation-from'), { target: { value: 'document' } });
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Deck' } });

    expect(screen.getByTestId('new-doc-submit')).toBeDisabled();
  });

  it('falls back to a plain presentation document when the host has no generator seam', () => {
    const onCreate = vi.fn();
    open({ onCreate });

    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    fireEvent.change(screen.getByTestId('new-doc-title'), { target: { value: 'Empty deck' } });
    fireEvent.click(screen.getByTestId('new-doc-submit'));

    expect(onCreate).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Empty deck', shape: 'presentation', type: 'Presentation' }),
    );
  });

  it('has no document type, like a whiteboard', () => {
    open();
    fireEvent.click(screen.getByTestId('doc-shape-presentation'));
    // The "Your document types" group is not offered at all for a deck.
    expect(screen.queryByTestId('no-document-types')).not.toBeInTheDocument();
    expect(screen.getByTestId('starter-shape-note')).toHaveTextContent('switches to Page');
  });
});
