import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentActivityCard } from '../DocumentActivityCard';
import { ChatPanel } from '../ChatPanel';
import { DocumentChip } from '../DocumentChip';

afterEach(cleanup);

const editors = [
  { userId: 'u1', displayName: 'Hank Anderson' },
  { userId: 'u2', displayName: 'Bob Martinez' },
];

describe('DocumentActivityCard', () => {
  it('names the document rather than describing the event', () => {
    render(<DocumentActivityCard documentId="d1" title="Upload path RFC" createdBy="Hank" />);
    expect(screen.getByText('Upload path RFC')).toBeInTheDocument();
  });

  // A document with two people in it is a different object from the same
  // document sitting idle, and the difference is the reason to look NOW.
  it('says who is editing, in the present tense', () => {
    render(<DocumentActivityCard documentId="d1" title="RFC" editors={editors} />);
    expect(screen.getByText('Hank Anderson and Bob Martinez are editing now')).toBeInTheDocument();
  });

  it('shows their faces, because a count answers how many and a face answers who', () => {
    render(<DocumentActivityCard documentId="d1" title="RFC" editors={editors} />);
    expect(screen.getByTestId('document-activity-card-editors')).toBeInTheDocument();
  });

  it('summarises a crowd instead of listing everyone', () => {
    render(
      <DocumentActivityCard
        documentId="d1"
        title="RFC"
        editors={[...editors, { userId: 'u3', displayName: 'Nora' }, { userId: 'u4', displayName: 'Sam' }]}
      />,
    );
    expect(screen.getByText(/and 2 others are editing now/)).toBeInTheDocument();
  });

  // The faces render every editor, named or not. Counting only the named
  // ones put one name beside two avatars.
  it('counts the editors it cannot name', () => {
    render(
      <DocumentActivityCard
        documentId="d1"
        title="RFC"
        editors={[{ userId: 'u1', displayName: 'Hank Anderson' }, { userId: 'anon-1' }]}
      />,
    );
    expect(screen.getByText('Hank Anderson and 1 other are editing now')).toBeInTheDocument();
  });

  it('pluralises the ones it cannot name', () => {
    render(
      <DocumentActivityCard
        documentId="d1"
        title="RFC"
        editors={[{ userId: 'u1', displayName: 'Hank Anderson' }, { userId: 'a1' }, { userId: 'a2' }]}
      />,
    );
    expect(screen.getByText('Hank Anderson and 2 others are editing now')).toBeInTheDocument();
  });

  it('does not say "1 others"', () => {
    render(
      <DocumentActivityCard
        documentId="d1"
        title="RFC"
        editors={[...editors, { userId: 'u3', displayName: 'Nora' }]}
      />,
    );
    expect(screen.getByText('Hank Anderson, Bob Martinez and 1 other are editing now')).toBeInTheDocument();
  });

  // Never a raw userId where a person should be.
  it('falls back to a count when nobody has a name', () => {
    render(<DocumentActivityCard documentId="d1" title="RFC" editors={[{ userId: 'dev-e2e-uo0cpk' }]} />);
    expect(screen.getByText('Someone is editing now')).toBeInTheDocument();
    expect(screen.queryByText(/uo0cpk/)).toBeNull();
  });

  it('falls back to who made it when nobody is in it', () => {
    render(<DocumentActivityCard documentId="d1" title="RFC" createdBy="Hank Anderson" />);
    expect(screen.getByText('Created by Hank Anderson')).toBeInTheDocument();
    expect(screen.queryByTestId('document-activity-card-editors')).toBeNull();
  });

  it('opens the document', () => {
    const onOpen = vi.fn();
    render(<DocumentActivityCard documentId="d1" title="RFC" onOpen={onOpen} />);
    fireEvent.click(screen.getByTestId('document-activity-card-open'));
    expect(onOpen).toHaveBeenCalledWith('d1');
  });

  // A document the viewer cannot reach should read as a record, not a dead
  // button.
  it('offers no way in when there is nowhere to go', () => {
    render(<DocumentActivityCard documentId="d1" title="RFC" />);
    expect(screen.queryByTestId('document-activity-card-open')).toBeNull();
  });

  it('says Untitled rather than rendering an empty card', () => {
    render(<DocumentActivityCard documentId="d1" title="" />);
    expect(screen.getByText('Untitled')).toBeInTheDocument();
  });
});

describe('a document event in the thread', () => {
  const message = {
    id: 'm1',
    clientId: 'system',
    content: 'Hank created Upload path RFC',
    timestamp: '2026-09-05T08:00:00Z',
    metadata: { kind: 'document', documentId: 'd1', title: 'Upload path RFC', system: true },
  };

  // The card IS the document, so it replaces the sentence rather than sitting
  // under it.
  it('renders as a card instead of the server sentence', () => {
    render(<ChatPanel messages={[message]} onSend={vi.fn()} />);
    expect(screen.getByTestId('document-activity-card')).toBeInTheDocument();
    expect(screen.queryByText('Hank created Upload path RFC')).toBeNull();
  });

  it('picks up whoever is editing it right now', () => {
    render(
      <ChatPanel messages={[message]} onSend={vi.fn()} documentEditors={() => editors} />,
    );
    expect(screen.getByText(/editing now/)).toBeInTheDocument();
  });

  it('opens the document from the thread', () => {
    const onOpenDocument = vi.fn();
    render(<ChatPanel messages={[message]} onSend={vi.fn()} onOpenDocument={onOpenDocument} />);
    fireEvent.click(screen.getByTestId('document-activity-card-open'));
    expect(onOpenDocument).toHaveBeenCalledWith('d1');
  });

  // An ordinary message must not become a card because it mentions a document.
  it('leaves a normal message alone', () => {
    render(
      <ChatPanel
        messages={[{ id: 'm2', clientId: 'c1', content: 'look at the RFC', timestamp: '2026-09-05T08:00:00Z' }]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('document-activity-card')).toBeNull();
    expect(screen.getByText('look at the RFC')).toBeInTheDocument();
  });

  // Metadata that claims to be a document event but names no document is not
  // one; rendering a card with no target gives an Open button to nowhere.
  it('ignores a document event with no documentId', () => {
    render(
      <ChatPanel
        messages={[{ ...message, metadata: { kind: 'document', system: true } }]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('document-activity-card')).toBeNull();
  });
});

describe('an editor we cannot name', () => {
  // Document presence stamps a truncated client id when it has nothing
  // better. An avatar reading "6e" because the id began "6ea7c8fd" names
  // somebody by their key.
  it('shows a neutral face rather than initials from an id', () => {
    const { container } = render(
      <DocumentActivityCard documentId="d1" title="RFC" editors={[{ userId: '6ea7c8fd-1234' }]} />,
    );
    expect(container.textContent).not.toContain('6e');
  });
});

describe('a document SHARED into the thread', () => {
  // Two features put a document into a conversation and each invented its own
  // metadata: the gateway announces a creation, Share-to-room posts a share.
  // Same fact, same card — and the share shape had no renderer at all, so it
  // arrived as a line of text with a URL in it.
  const shared = {
    id: 'm9',
    clientId: 'c1',
    displayName: 'Bob Martinez',
    content: 'Bob shared Upload path RFC — http://localhost/documents/d1',
    timestamp: '2026-09-05T08:00:00Z',
    metadata: {
      share: { kind: 'document', id: 'd1', title: 'Upload path RFC', url: 'http://localhost/documents/d1' },
    },
  };

  it('renders as the same card a created document gets', () => {
    render(<ChatPanel messages={[shared]} onSend={vi.fn()} />);
    expect(screen.getByTestId('document-activity-card')).toBeInTheDocument();
    expect(screen.getByText('Upload path RFC')).toBeInTheDocument();
  });

  it('replaces the text-and-URL body', () => {
    render(<ChatPanel messages={[shared]} onSend={vi.fn()} />);
    expect(screen.queryByText(/http:\/\/localhost\/documents\/d1/)).toBeNull();
  });

  it('picks up live editors, same as a created one', () => {
    render(
      <ChatPanel messages={[shared]} onSend={vi.fn()} documentEditors={() => editors} />,
    );
    expect(screen.getByText(/editing now/)).toBeInTheDocument();
  });

  it('opens the shared document', () => {
    const onOpenDocument = vi.fn();
    render(<ChatPanel messages={[shared]} onSend={vi.fn()} onOpenDocument={onOpenDocument} />);
    fireEvent.click(screen.getByTestId('document-activity-card-open'));
    expect(onOpenDocument).toHaveBeenCalledWith('d1');
  });

  // A share that names no document is not a document reference; a card with
  // no target is an Open button to nowhere.
  it('ignores a share with no id', () => {
    render(
      <ChatPanel
        messages={[{ ...shared, metadata: { share: { kind: 'document', title: 'x' } } }]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('document-activity-card')).toBeNull();
  });

  it('ignores a share of something that is not a document', () => {
    render(
      <ChatPanel
        messages={[{ ...shared, metadata: { share: { kind: 'pipeline', id: 'p1' } } }]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.queryByTestId('document-activity-card')).toBeNull();
  });
});

// A document shared into a thread and later deleted — or never shared with
// this reader — used to keep a live Open onto a 404. The card is history, so
// it stays; it says why it is not a way in, and offers none.
describe('an unavailable document', () => {
  it('a gone card is muted, labelled "No longer available", with no Open', () => {
    const onOpen = vi.fn();
    render(<DocumentActivityCard documentId="d1" title="Probe" createdBy="Hank" editors={editors} onOpen={onOpen} unavailable="gone" />);
    const card = screen.getByTestId('document-activity-card');
    expect(card).toHaveAttribute('data-unavailable', 'gone');
    expect(card).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByTestId('document-activity-card-unavailable')).toHaveTextContent('No longer available');
    expect(screen.queryByTestId('document-activity-card-open')).toBeNull();
    // Nobody is "editing now" in a document that is not there.
    expect(screen.queryByText(/editing now/)).toBeNull();
  });

  it('a forbidden card says the viewer has no access', () => {
    render(<DocumentActivityCard documentId="d1" title="Notes" onOpen={vi.fn()} unavailable="forbidden" />);
    expect(screen.getByTestId('document-activity-card-unavailable')).toHaveTextContent('You don’t have access');
    expect(screen.queryByTestId('document-activity-card-open')).toBeNull();
  });

  it('a chip is disabled and labelled, and does not open', () => {
    const onOpen = vi.fn();
    render(<DocumentChip documentId="d2" label="Roadmap" onOpen={onOpen} unavailable="gone" />);
    const chip = screen.getByTestId('chat-message-docref');
    expect(chip).toBeDisabled();
    expect(chip).toHaveAttribute('data-unavailable', 'gone');
    expect(screen.getByTestId('chat-message-docref-unavailable')).toHaveTextContent('No longer available');
    fireEvent.click(chip);
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('ChatPanel asks documentUnavailable per document, for cards and chips', () => {
    const lookup = vi.fn((id: string) => (id === 'gone-doc' ? 'gone' as const : undefined));
    render(
      <ChatPanel
        messages={[
          { id: 'm1', clientId: 'c1', displayName: 'Hank', content: 'x', timestamp: '2026-09-24T10:00:00Z', metadata: { share: { kind: 'document', id: 'gone-doc', title: 'Probe' } } },
          { id: 'm2', clientId: 'c1', displayName: 'Hank', content: 'see #Live', timestamp: '2026-09-24T10:01:00Z', metadata: { documents: [{ id: 'live-doc', label: 'Live' }, { id: 'gone-doc', label: 'Probe' }] } },
        ]}
        onSend={vi.fn()}
        onOpenDocument={vi.fn()}
        documentUnavailable={lookup}
      />,
    );
    expect(screen.getByTestId('document-activity-card')).toHaveAttribute('data-unavailable', 'gone');
    const chips = screen.getAllByTestId('chat-message-docref');
    expect(chips.find((c) => c.getAttribute('data-document-id') === 'live-doc')).not.toHaveAttribute('data-unavailable');
    expect(chips.find((c) => c.getAttribute('data-document-id') === 'gone-doc')).toHaveAttribute('data-unavailable', 'gone');
  });
});
