// A conversation can start a whiteboard, not only a document.
//
// The product has had two authoring surfaces for a while — a page you write
// down, and an infinite canvas you draw on with other people in real time —
// and the conversation's Documents tab could only ever start the first. The
// canvas was unreachable from the place people actually decide to sketch
// something out.
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChannelDocumentsPanel } from '../ChannelViews';

afterEach(cleanup);

describe('ChannelDocumentsPanel — starting a whiteboard', () => {
  it('offers both surfaces when both are allowed', () => {
    render(<ChannelDocumentsPanel documents={[]} onCreate={vi.fn()} onCreateWhiteboard={vi.fn()} />);
    // Short labels in the empty state: its description already says these stay
    // with the conversation, so repeating it on both buttons is noise.
    expect(screen.getByTestId('channel-documents-create')).toHaveTextContent('New document');
    expect(screen.getByTestId('channel-documents-create-whiteboard')).toHaveTextContent('New whiteboard');
  });

  it('spells the destination out once the rows sit above a list', () => {
    // There the row is one line among many and has to carry its own meaning:
    // "New document" alone, above a list of documents, says nothing about
    // where the new one goes.
    render(
      <ChannelDocumentsPanel
        documents={[{ documentId: 'd1', title: 'RFC' }]}
        onCreate={vi.fn()}
        onCreateWhiteboard={vi.fn()}
      />,
    );
    expect(screen.getByTestId('channel-documents-create')).toHaveTextContent('New document in this conversation');
    expect(screen.getByTestId('channel-documents-create-whiteboard')).toHaveTextContent('New whiteboard in this conversation');
  });

  it('hands back the whiteboard intent separately from the document one', () => {
    const onCreate = vi.fn();
    const onCreateWhiteboard = vi.fn();
    render(<ChannelDocumentsPanel documents={[]} onCreate={onCreate} onCreateWhiteboard={onCreateWhiteboard} />);
    fireEvent.click(screen.getByTestId('channel-documents-create-whiteboard'));
    expect(onCreateWhiteboard).toHaveBeenCalledTimes(1);
    // They are different surfaces, not one with a flag — the document handler
    // must not fire for a whiteboard.
    expect(onCreate).not.toHaveBeenCalled();
  });

  it('offers only the document when a whiteboard is not on offer', () => {
    render(<ChannelDocumentsPanel documents={[]} onCreate={vi.fn()} />);
    expect(screen.getByTestId('channel-documents-create')).toBeInTheDocument();
    expect(screen.queryByTestId('channel-documents-create-whiteboard')).toBeNull();
  });

  it('offers only the whiteboard when that is the only one allowed', () => {
    render(<ChannelDocumentsPanel documents={[]} onCreateWhiteboard={vi.fn()} />);
    expect(screen.queryByTestId('channel-documents-create')).toBeNull();
    expect(screen.getByTestId('channel-documents-create-whiteboard')).toBeInTheDocument();
  });

  it('renders neither for a viewer who may create nothing', () => {
    render(<ChannelDocumentsPanel documents={[]} />);
    expect(screen.queryByTestId('channel-documents-create')).toBeNull();
    expect(screen.queryByTestId('channel-documents-create-whiteboard')).toBeNull();
  });

  it('keeps both affordances above the list once documents exist', () => {
    // Hiding them behind the empty state makes them vanish exactly when a
    // second document becomes likely.
    render(
      <ChannelDocumentsPanel
        documents={[{ documentId: 'd1', title: 'Q3 plan' }]}
        onCreate={vi.fn()}
        onCreateWhiteboard={vi.fn()}
      />,
    );
    expect(screen.getByTestId('channel-documents-create')).toBeInTheDocument();
    expect(screen.getByTestId('channel-documents-create-whiteboard')).toBeInTheDocument();
    expect(screen.getByText('Q3 plan')).toBeInTheDocument();
  });
});
