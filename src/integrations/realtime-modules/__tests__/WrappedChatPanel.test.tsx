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
