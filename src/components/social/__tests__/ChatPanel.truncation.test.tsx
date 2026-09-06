// A message that lost something has to admit it.
//
// Chat metadata has a size budget, and attachments share it with the rich
// body, the mentions and the reply. Past the cap the server sheds the largest
// keys and stamps `_truncated` / `_droppedKeys` on what survives — but until
// the transcript rendered that, an oversized send looked IDENTICAL to a
// successful one: the text appeared, the files the sender had just watched
// upload were simply not there, and nothing anywhere said so.

import { render, screen } from '@testing-library/react';
import { ChatPanel, truncationFromMetadata } from '../ChatPanel';
import type { ChatMessage } from '../../../hooks/useChat';

const message = (metadata?: Record<string, unknown>): ChatMessage => ({
  id: 'm1',
  clientId: 'c1',
  content: 'here you go',
  timestamp: '2026-01-01T12:34:00.000Z',
  displayName: 'Alice',
  ...(metadata ? { metadata } : {}),
});

describe('truncationFromMetadata', () => {
  it('is null for an ordinary message', () => {
    expect(truncationFromMetadata(undefined)).toBeNull();
    expect(truncationFromMetadata({})).toBeNull();
    expect(truncationFromMetadata({ mentions: ['alice'] })).toBeNull();
  });

  it('reads the dropped keys and names them in human words', () => {
    const t = truncationFromMetadata({
      _truncated: true,
      _droppedKeys: ['attachments', 'html'],
    });
    expect(t?.droppedKeys).toEqual(['attachments', 'html']);
    expect(t?.labels).toEqual(['files', 'formatting']);
  });

  // An older server stamps the marker with no key list.
  it('still reports truncation when no key list came back', () => {
    const t = truncationFromMetadata({ _truncated: true });
    expect(t).not.toBeNull();
    expect(t?.labels).toEqual([]);
  });

  it('ignores non-string entries rather than rendering [object Object]', () => {
    const t = truncationFromMetadata({
      _truncated: true,
      _droppedKeys: ['attachments', { nope: 1 }, 7],
    });
    expect(t?.labels).toEqual(['files']);
  });
});

describe('ChatPanel truncation notice', () => {
  it('says nothing when nothing was dropped', () => {
    render(<ChatPanel messages={[message()]} onSend={vi.fn()} />);
    expect(screen.queryByTestId('message-truncated')).toBeNull();
  });

  it('names what was too large to send', () => {
    render(
      <ChatPanel
        messages={[message({ _truncated: true, _droppedKeys: ['attachments'] })]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.getByTestId('message-truncated')).toHaveTextContent(
      'Too large to send: files',
    );
  });

  it('falls back to a general statement without a key list', () => {
    render(
      <ChatPanel messages={[message({ _truncated: true })]} onSend={vi.fn()} />,
    );
    expect(screen.getByTestId('message-truncated')).toHaveTextContent(
      'Part of this message was too large to send',
    );
  });

  // The text still posted — the notice sits WITH it rather than replacing it.
  it('keeps the message body alongside the notice', () => {
    render(
      <ChatPanel
        messages={[message({ _truncated: true, _droppedKeys: ['attachments'] })]}
        onSend={vi.fn()}
      />,
    );
    expect(screen.getByText('here you go')).toBeInTheDocument();
  });
});
