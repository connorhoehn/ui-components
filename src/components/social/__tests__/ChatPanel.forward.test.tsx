// Forwarding a message into another conversation.
//
// The gate is deliberately TIGHTER than Reply's, and these tests pin the
// difference. Reply is withheld from system notices only; Forward is also
// withheld from cards and from attachments, because a forward RELOCATES the
// message and both of those are handles on something scoped to the
// conversation they were posted in — a document card's Open, a call card's
// Join, an attachment's bearer-authenticated download URL. Each would render
// in its new home and then do nothing, which is worse than not offering it.

import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChatPanel, forwardedFromMetadata } from '../ChatPanel';
// ChatMessage lives on the hook, not the panel — the panel consumes it.
import type { ChatMessage } from '../../../hooks/useChat';

afterEach(cleanup);

const NOOP = () => {};

function msg(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: 'm1',
    clientId: 'c1',
    content: 'the upload path is live',
    displayName: 'Hank Anderson',
    timestamp: new Date('2026-09-07T12:00:00Z').toISOString(),
    ...overrides,
  } as ChatMessage;
}

function renderPanel(messages: ChatMessage[], props: Record<string, unknown> = {}) {
  return render(
    <ChatPanel
      messages={messages}
      onSend={NOOP}
      onReply={NOOP}
      onTogglePin={NOOP}
      onToggleReaction={NOOP}
      currentUserId="u-me"
      {...props}
    />,
  );
}

describe('the Forward control', () => {
  // Every existing caller passes no handler and must see no change.
  it('renders nothing without a handler', () => {
    renderPanel([msg()]);
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  it('appears on a plain message once a handler is given', () => {
    renderPanel([msg()], { onForwardMessage: vi.fn() });
    expect(screen.getByTestId('message-actions-forward')).toBeInTheDocument();
  });

  it('hands back the message that was clicked', () => {
    const onForwardMessage = vi.fn();
    renderPanel([msg({ id: 'm-42' })], { onForwardMessage });
    fireEvent.click(screen.getByTestId('message-actions-forward'));
    expect(onForwardMessage).toHaveBeenCalledTimes(1);
    expect(onForwardMessage.mock.calls[0][0]).toMatchObject({ id: 'm-42' });
  });

  // Threading folds a REPLY onto its root, because a reply to a reply belongs
  // in the same thread. A forward is about the exact words that were clicked,
  // so the same fold here would quietly send a different message.
  it('forwards the clicked reply, not the thread root', () => {
    const onForwardMessage = vi.fn();
    const root = msg({ id: 'root-1', content: 'what broke?' });
    const reply = msg({
      id: 'reply-1',
      content: 'the upload path did',
      metadata: { replyTo: { messageId: 'root-1', author: 'Hank Anderson', text: 'what broke?' } },
    });
    renderPanel([root, reply], { onForwardMessage, threaded: true });
    const buttons = screen.getAllByTestId('message-actions-forward');
    // Root first, then its one reply.
    fireEvent.click(buttons[1]);
    expect(onForwardMessage.mock.calls[0][0]).toMatchObject({ id: 'reply-1' });
  });
});

describe('messages that cannot be forwarded', () => {
  // "Bob started a call" is a record of an event, not a thing to relocate —
  // the same reason Reply and Pin are withheld from it.
  it('is not offered on a system notice', () => {
    renderPanel(
      [msg({ id: 'call-1', content: 'Hank started a call', metadata: { system: true, kind: 'call', callId: 'c-1', live: false, participants: [] } })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // Wider than Reply's gate on purpose: a document card a PERSON posted is a
  // message they chose to send, so replying to it means what it normally
  // means — but its Open button resolves against a document the destination
  // may not be able to read.
  it('is not offered on a document card a person posted', () => {
    renderPanel(
      [msg({ id: 'share-1', content: '📄 Q3 plan', metadata: { kind: 'document', documentId: 'd-1', title: 'Q3 plan' } })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-reply')).toBeInTheDocument();
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // The descriptor's URL is scoped to the transfer in THIS channel; re-posting
  // it hands the destination a file row that comes back 403.
  it('is not offered on a message carrying an attachment', () => {
    renderPanel(
      [msg({
        id: 'file-1',
        content: 'here it is',
        attachments: [{ id: 'f1', name: 'spec.pdf', size: 12, contentType: 'application/pdf', url: '/dl/f1' }],
      })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  it('is not offered on a deleted message', () => {
    renderPanel(
      [msg({ id: 'gone-1', deletedAt: new Date().toISOString() })],
      { onForwardMessage: vi.fn() },
    );
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });

  // An attachment-only message has empty text; there is nothing to carry.
  it('is not offered on a message with no words', () => {
    renderPanel([msg({ id: 'blank-1', content: '   ' })], { onForwardMessage: vi.fn() });
    expect(screen.queryByTestId('message-actions-forward')).toBeNull();
  });
});

describe('a message that IS a forward', () => {
  const forward = msg({
    id: 'fwd-1',
    displayName: 'Carol Nguyen',
    content: 'Forwarded from #design — Hank Anderson:\nthe upload path is live',
    metadata: {
      forwardedFrom: {
        messageId: 'm-orig',
        channel: 'room:design',
        channelLabel: '#design',
        author: 'Hank Anderson',
        authorUserId: 'u-hank',
        timestamp: '2026-09-05T07:48:00Z',
      },
    },
  });

  it('is marked as one, so it does not read as Carol typing that sentence', () => {
    renderPanel([forward]);
    expect(screen.getByTestId('forwarded-marker')).toBeInTheDocument();
  });

  // The whole degradation story: the attribution is in the TEXT, so a client
  // that has never heard of `forwardedFrom` still shows whose words these are.
  it('says where it came from in the body, not only in metadata', () => {
    renderPanel([forward]);
    expect(screen.getByText(/Forwarded from #design — Hank Anderson/)).toBeInTheDocument();
    expect(screen.getByText(/the upload path is live/)).toBeInTheDocument();
  });

  // `replyTo` would have nested the forward under the original whenever the
  // two shared a channel, and offered a jump to a message that is elsewhere.
  it('carries no replyTo, so threading never nests it under the original', () => {
    expect((forward.metadata as Record<string, unknown>).replyTo).toBeUndefined();
    renderPanel([forward], { threaded: true, onJumpToMessage: NOOP });
    expect(screen.queryByTestId('quote-block')).toBeNull();
  });

  it('can itself be forwarded on — it is still just words', () => {
    renderPanel([forward], { onForwardMessage: vi.fn() });
    expect(screen.getByTestId('message-actions-forward')).toBeInTheDocument();
  });
});

describe('forwardedFromMetadata', () => {
  it('reads the shape the host writes', () => {
    expect(
      forwardedFromMetadata({ forwardedFrom: { messageId: 'm1', channel: 'room:design', author: 'Hank Anderson' } }),
    ).toEqual({ messageId: 'm1', channel: 'room:design', author: 'Hank Anderson' });
  });

  // Half a write renders as "Forwarded from undefined" if it is trusted, so a
  // partial one counts as no write at all.
  it('refuses a partial write rather than rendering a hole', () => {
    expect(forwardedFromMetadata({ forwardedFrom: { messageId: 'm1' } })).toBeNull();
    expect(forwardedFromMetadata({ forwardedFrom: { author: 'Hank' } })).toBeNull();
    expect(forwardedFromMetadata({ forwardedFrom: 'yes' as unknown as Record<string, unknown> })).toBeNull();
    expect(forwardedFromMetadata(undefined)).toBeNull();
  });
});
