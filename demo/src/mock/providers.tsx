import { ReactNode, useCallback } from 'react';
import { WebSocketProvider } from '@/contexts/WebSocketContext';
import { IdentityProvider } from '@/contexts/IdentityContext';
import { PresenceProvider } from '@/contexts/PresenceContext';
import type { WebSocketContextValue } from '@/contexts/WebSocketContext';
import type { IdentityContextValue } from '@/contexts/IdentityContext';
import type { PresenceContextValue } from '@/contexts/PresenceContext';

export function MockProviders({ children }: { children: ReactNode }) {
  const noop = useCallback(() => {}, []);
  const noopUnsub = useCallback(() => () => {}, []);

  const wsValue: WebSocketContextValue = {
    connectionState: 'connected',
    sendMessage: noop as (msg: Record<string, unknown>) => void,
    onMessage: noopUnsub as any,
    ws: {
      connectionState: 'connected',
      lastError: null,
      sessionToken: 'demo-session-token',
      clientId: 'demo-client-001',
      currentChannel: 'demo-channel',
      switchChannel: noop as (channel: string) => void,
      sendMessage: noop as (msg: Record<string, unknown>) => void,
      disconnect: noop,
      reconnect: noop,
    },
    clientId: 'demo-client-001',
    sessionToken: 'demo-session-token',
  };

  const identityValue: IdentityContextValue = {
    userId: 'demo-user',
    displayName: 'Demo User',
    userEmail: 'demo@example.com',
    idToken: 'fake-id-token',
    onSignOut: noop,
  };

  const presenceValue: PresenceContextValue = {
    presenceUsers: [
      { clientId: 'demo-client-001', status: 'online', metadata: { displayName: 'Demo User', color: '#6366f1' } },
      { clientId: 'demo-client-002', status: 'online', metadata: { displayName: 'Alice Smith', color: '#ec4899' } },
    ],
    currentClientId: 'demo-client-001',
    setTyping: noop as (isTyping: boolean) => void,
  };

  return (
    <WebSocketProvider value={wsValue}>
      <IdentityProvider value={identityValue}>
        <PresenceProvider value={presenceValue}>
          {children}
        </PresenceProvider>
      </IdentityProvider>
    </WebSocketProvider>
  );
}
