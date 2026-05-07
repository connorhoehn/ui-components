import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { createElement } from 'react';
import {
  WebSocketProvider,
  useWebSocketContext,
} from '../WebSocketContext';
import type { WebSocketContextValue } from '../WebSocketContext';
import {
  IdentityProvider,
  useIdentityContext,
} from '../IdentityContext';
import type { IdentityContextValue } from '../IdentityContext';
import {
  PresenceProvider,
  usePresenceContext,
} from '../PresenceContext';
import type { PresenceContextValue } from '../PresenceContext';

describe('WebSocketProvider', () => {
  const mockValue: WebSocketContextValue = {
    connectionState: 'connected',
    sendMessage: vi.fn(),
    onMessage: vi.fn(() => () => {}),
    ws: {
      connectionState: 'connected',
      lastError: null,
      sessionToken: 'token-123',
      clientId: 'client-abc',
      currentChannel: 'general',
      switchChannel: vi.fn(),
      sendMessage: vi.fn(),
      disconnect: vi.fn(),
      reconnect: vi.fn(),
    },
    clientId: 'client-abc',
    sessionToken: 'token-123',
  };

  it('provides context values to children', () => {
    function Consumer() {
      const ctx = useWebSocketContext();
      return (
        <div>
          <span data-testid="state">{ctx.connectionState}</span>
          <span data-testid="client">{ctx.clientId}</span>
          <span data-testid="token">{ctx.sessionToken}</span>
        </div>
      );
    }

    render(
      <WebSocketProvider value={mockValue}>
        <Consumer />
      </WebSocketProvider>
    );

    expect(screen.getByTestId('state')).toHaveTextContent('connected');
    expect(screen.getByTestId('client')).toHaveTextContent('client-abc');
    expect(screen.getByTestId('token')).toHaveTextContent('token-123');
  });

  it('throws when useWebSocketContext is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useWebSocketContext());
    }).toThrow('useWebSocketContext must be used within a <WebSocketProvider>');
    consoleError.mockRestore();
  });
});

describe('IdentityProvider', () => {
  const mockValue: IdentityContextValue = {
    userId: 'user-1',
    displayName: 'Alice',
    userEmail: 'alice@example.com',
    idToken: 'id-token-xyz',
    onSignOut: vi.fn(),
  };

  it('provides user info to children', () => {
    function Consumer() {
      const ctx = useIdentityContext();
      return (
        <div>
          <span data-testid="userId">{ctx.userId}</span>
          <span data-testid="name">{ctx.displayName}</span>
          <span data-testid="email">{ctx.userEmail}</span>
        </div>
      );
    }

    render(
      <IdentityProvider value={mockValue}>
        <Consumer />
      </IdentityProvider>
    );

    expect(screen.getByTestId('userId')).toHaveTextContent('user-1');
    expect(screen.getByTestId('name')).toHaveTextContent('Alice');
    expect(screen.getByTestId('email')).toHaveTextContent('alice@example.com');
  });

  it('throws when useIdentityContext is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useIdentityContext());
    }).toThrow('useIdentityContext must be used within an <IdentityProvider>');
    consoleError.mockRestore();
  });
});

describe('PresenceProvider', () => {
  const mockValue: PresenceContextValue = {
    presenceUsers: [
      { clientId: 'c1', status: 'online', metadata: { name: 'Bob' } },
      { clientId: 'c2', status: 'away', metadata: { name: 'Carol' } },
    ],
    currentClientId: 'c1',
    setTyping: vi.fn(),
  };

  it('provides presence state to children', () => {
    function Consumer() {
      const ctx = usePresenceContext();
      return (
        <div>
          <span data-testid="count">{ctx.presenceUsers.length}</span>
          <span data-testid="clientId">{ctx.currentClientId}</span>
          <span data-testid="user0">{ctx.presenceUsers[0].status}</span>
        </div>
      );
    }

    render(
      <PresenceProvider value={mockValue}>
        <Consumer />
      </PresenceProvider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByTestId('clientId')).toHaveTextContent('c1');
    expect(screen.getByTestId('user0')).toHaveTextContent('online');
  });

  it('throws when usePresenceContext is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => usePresenceContext());
    }).toThrow('usePresenceContext must be used within a <PresenceProvider>');
    consoleError.mockRestore();
  });
});
