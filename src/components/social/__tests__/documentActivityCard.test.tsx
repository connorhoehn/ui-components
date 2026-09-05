import { render, screen, fireEvent, cleanup, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DocumentActivityCard } from '../DocumentActivityCard';
import { ChatPanel } from '../ChatPanel';

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
