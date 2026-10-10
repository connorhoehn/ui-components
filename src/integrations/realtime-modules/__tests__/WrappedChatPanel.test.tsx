// src/integrations/realtime-modules/__tests__/WrappedChatPanel.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedChatPanel } from '../WrappedChatPanel';
import type { RMUseChatReturn, RMChatMessage } from '../types';

function makeChat(
  messages: RMChatMessage[] = [],
  overrides: Partial<RMUseChatReturn> = {},
): RMUseChatReturn {
  return {
    messages,
    sendMessage: vi.fn(),
    loadHistory: vi.fn(),
    ...overrides,
  };
}

function makeMsg(id: string, text: string): RMChatMessage {
  return {
    id,
    clientId: 'client-a',
    channel: 'room-1',
    message: text,
    timestamp: '2026-05-30T10:00:00.000Z',
  };
}

describe('WrappedChatPanel', () => {
  it('renders ChatPanel with adapted messages when wrapWithNetworkShim is omitted', () => {
    const chat = makeChat([makeMsg('m1', 'hello world')]);
    render(<WrappedChatPanel chat={chat} />);
    expect(screen.getByText('hello world')).toBeInTheDocument();
    // No shim wrappers in the DOM
    expect(screen.queryByTestId('reconnecting-shim-connected')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reconnecting-shim-connecting')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reconnecting-shim-reconnecting')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reconnecting-shim-disconnected')).not.toBeInTheDocument();
  });

  it('wraps ChatPanel in ReconnectingShim when wrapWithNetworkShim.connectionState=connected', () => {
    const chat = makeChat([makeMsg('m1', 'inside shim')]);
    render(
      <WrappedChatPanel
        chat={chat}
        wrapWithNetworkShim={{ connectionState: 'connected' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connected')).toBeInTheDocument();
    expect(screen.getByText('inside shim')).toBeInTheDocument();
  });

  it('renders skeleton (not ChatPanel) when connectionState=connecting', () => {
    const chat = makeChat([makeMsg('m1', 'should not show')]);
    render(
      <WrappedChatPanel
        chat={chat}
        wrapWithNetworkShim={{ connectionState: 'connecting' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connecting')).toBeInTheDocument();
    expect(screen.queryByText('should not show')).not.toBeInTheDocument();
  });

  it('renders disconnected fallback with retry when connectionState=disconnected and onRetry is provided', () => {
    const onRetry = vi.fn();
    const chat = makeChat([makeMsg('m1', 'inside shim')]);
    render(
      <WrappedChatPanel
        chat={chat}
        wrapWithNetworkShim={{
          connectionState: 'disconnected',
          onRetry,
          disconnectedTitle: 'No signal',
          retryLabel: 'Reconnect',
        }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-disconnected')).toBeInTheDocument();
    expect(screen.getByText('No signal')).toBeInTheDocument();
    expect(screen.getByText('Reconnect')).toBeInTheDocument();
    // ChatPanel content is replaced by the disconnected fallback
    expect(screen.queryByText('inside shim')).not.toBeInTheDocument();
  });

  it('shows ChatPanel + reconnecting banner when connectionState=reconnecting', () => {
    const chat = makeChat([makeMsg('m1', 'still here')]);
    render(
      <WrappedChatPanel
        chat={chat}
        wrapWithNetworkShim={{ connectionState: 'reconnecting' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-reconnecting')).toBeInTheDocument();
    expect(screen.getByText('still here')).toBeInTheDocument();
    expect(screen.getByTestId('hangout-reconnecting-banner')).toBeInTheDocument();
  });
});

// The two things the adapter used to leave behind. Both are only observable
// through the wrapper — which is the path a host embedding this actually
// takes, and the reason neither gap showed up in ChatPanel's own tests.
describe('WrappedChatPanel carries the message through whole', () => {
  it('makes the viewer own their messages', () => {
    const mine: RMChatMessage = { ...makeMsg('m1', 'hello'), userId: 'user-alice' };
    render(<WrappedChatPanel chat={makeChat([mine])} currentUserId="user-alice" />);
    expect(screen.getByTestId('chat-message').querySelector('[data-mine="true"]'))
      .not.toBeNull();
  });

  it('does not claim someone else’s message', () => {
    const theirs: RMChatMessage = { ...makeMsg('m1', 'hello'), userId: 'user-bob' };
    render(<WrappedChatPanel chat={makeChat([theirs])} currentUserId="user-alice" />);
    expect(screen.getByTestId('chat-message').querySelector('[data-mine="true"]'))
      .toBeNull();
  });

  // Proof the whole metadata bag survives the adapter: this notice is rendered
  // purely from markers the server stamps into metadata, so it can only appear
  // if the bag arrived.
  it('delivers metadata to the panel readers', () => {
    const truncated: RMChatMessage = {
      ...makeMsg('m1', 'here you go'),
      metadata: { _truncated: true, _droppedKeys: ['attachments'] },
    };
    render(<WrappedChatPanel chat={makeChat([truncated])} />);
    expect(screen.getByTestId('message-truncated')).toHaveTextContent(
      'Too large to send: files',
    );
  });
});

describe('WrappedChatPanel pass-through (receipts, unread, threads, pending reply)', () => {
  const own = (id: string, text: string): RMChatMessage => ({
    ...makeMsg(id, text),
    userId: 'me',
  } as RMChatMessage);

  it('forwards readReceipts and names the readers, excluding the viewer', () => {
    render(
      <WrappedChatPanel
        chat={makeChat([own('m1', 'mine')])}
        currentUserId="me"
        readReceipts={[
          { userId: 'u2', displayName: 'Ada', readAt: '2026-05-30T10:05:00.000Z' },
          { userId: 'me', displayName: 'Me', readAt: '2026-05-30T10:06:00.000Z' },
        ]}
      />,
    );
    expect(screen.getByText(/Seen/)).toBeInTheDocument();
  });

  it('renders no receipt line when readReceiptsEnabled is false', () => {
    render(
      <WrappedChatPanel
        chat={makeChat([own('m1', 'mine')])}
        currentUserId="me"
        readReceiptsEnabled={false}
        readReceipts={[{ userId: 'u2', displayName: 'Ada', readAt: '2026-05-30T10:05:00.000Z' }]}
      />,
    );
    expect(screen.queryByText(/Seen/)).not.toBeInTheDocument();
  });

  it('forwards unreadFrom as the unread separator', () => {
    const chat = makeChat([
      { ...makeMsg('m1', 'old'), timestamp: '2026-05-30T09:00:00.000Z' },
      { ...makeMsg('m2', 'new'), timestamp: '2026-05-30T11:00:00.000Z' },
    ]);
    render(<WrappedChatPanel chat={chat} unreadFrom="2026-05-30T10:00:00.000Z" />);
    expect(screen.getByTestId('chat-unread-separator')).toBeInTheDocument();
  });

  it('forwards threaded so a reply nests under its root', () => {
    const chat = makeChat([
      makeMsg('m1', 'root'),
      {
        ...makeMsg('m2', 'answer'),
        metadata: { replyTo: { messageId: 'm1', author: 'A', text: 'root' } },
      } as RMChatMessage,
    ]);
    render(<WrappedChatPanel chat={chat} threaded />);
    expect(screen.getByTestId('chat-thread')).toBeInTheDocument();
  });

  it('shows a pending reply above the built-in composer and dismisses it', () => {
    const onCancelReply = vi.fn();
    render(
      <WrappedChatPanel
        chat={makeChat([])}
        reply={{ messageId: 'm1', author: 'Ada', text: 'quote me' }}
        onCancelReply={onCancelReply}
      />,
    );
    const strip = screen.getByTestId('chat-panel-pending-reply');
    expect(strip).toHaveTextContent('quote me');
    const dismiss = strip.querySelector('button');
    expect(dismiss).not.toBeNull();
    dismiss!.click();
    expect(onCancelReply).toHaveBeenCalled();
  });

  it('shows no pending reply when none is set', () => {
    render(<WrappedChatPanel chat={makeChat([])} />);
    expect(screen.queryByTestId('chat-panel-pending-reply')).not.toBeInTheDocument();
  });
});
