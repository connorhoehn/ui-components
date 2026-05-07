import { ReactNode, useCallback, useRef, useMemo, useState, useEffect } from 'react';
import { WebSocketProvider } from '@/contexts/WebSocketContext';
import { IdentityProvider } from '@/contexts/IdentityContext';
import { PresenceProvider } from '@/contexts/PresenceContext';
import type { WebSocketContextValue } from '@/contexts/WebSocketContext';
import type { IdentityContextValue } from '@/contexts/IdentityContext';
import type { PresenceContextValue } from '@/contexts/PresenceContext';
import type { GatewayMessage } from '@/types/gateway';
import type { SimulationTimeline } from './types';
import { useEventSimulator } from './EventSimulator';
import { SimulationControlsPanel } from './SimulationControls';

interface SimulatedProviderProps {
  children: ReactNode;
  timeline?: SimulationTimeline;
  autoPlay?: boolean;
}

export function SimulatedProvider({ children, timeline, autoPlay = false }: SimulatedProviderProps) {
  const subscribersRef = useRef<Set<(msg: GatewayMessage) => void>>(new Set());
  const [lastDescription, setLastDescription] = useState<string | undefined>(undefined);

  const dispatch = useCallback((message: Record<string, unknown>) => {
    const gatewayMsg = message as GatewayMessage;
    subscribersRef.current.forEach((handler) => {
      try {
        handler(gatewayMsg);
      } catch {
        // Swallow errors in subscriber handlers during demo
      }
    });
  }, []);

  // Use a fallback empty timeline when none is provided
  const effectiveTimeline: SimulationTimeline = useMemo(() => {
    return timeline ?? { id: 'empty', name: 'No Timeline', description: '', events: [] };
  }, [timeline]);

  const controls = useEventSimulator(effectiveTimeline, dispatch);

  // Auto-play on mount if requested
  useEffect(() => {
    if (autoPlay && timeline && timeline.events.length > 0) {
      controls.play();
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track the current event description
  useEffect(() => {
    if (effectiveTimeline.events.length > 0 && controls.currentEventIndex > 0) {
      const lastIdx = controls.currentEventIndex - 1;
      if (lastIdx < effectiveTimeline.events.length) {
        setLastDescription(effectiveTimeline.events[lastIdx].description);
      }
    }
  }, [controls.currentEventIndex, effectiveTimeline.events]);

  const onMessage = useCallback((handler: (msg: GatewayMessage) => void): (() => void) => {
    subscribersRef.current.add(handler);
    return () => {
      subscribersRef.current.delete(handler);
    };
  }, []);

  const noop = useCallback(() => {}, []);

  const wsValue: WebSocketContextValue = useMemo(() => ({
    connectionState: 'connected',
    sendMessage: noop as (msg: Record<string, unknown>) => void,
    onMessage: onMessage as WebSocketContextValue['onMessage'],
    ws: {
      connectionState: 'connected' as const,
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
  }), [onMessage, noop]);

  const identityValue: IdentityContextValue = useMemo(() => ({
    userId: 'demo-user',
    displayName: 'Demo User',
    userEmail: 'demo@example.com',
    idToken: 'fake-id-token',
    onSignOut: noop,
  }), [noop]);

  const presenceValue: PresenceContextValue = useMemo(() => ({
    presenceUsers: [
      { clientId: 'demo-client-001', status: 'online' as const, metadata: { displayName: 'Demo User', color: '#6366f1' } },
      { clientId: 'demo-client-002', status: 'online' as const, metadata: { displayName: 'Alice Smith', color: '#ec4899' } },
      { clientId: 'demo-client-003', status: 'online' as const, metadata: { displayName: 'Bob Chen', color: '#10b981' } },
    ],
    currentClientId: 'demo-client-001',
    setTyping: noop as (isTyping: boolean) => void,
  }), [noop]);

  return (
    <WebSocketProvider value={wsValue}>
      <IdentityProvider value={identityValue}>
        <PresenceProvider value={presenceValue}>
          {children}
          {timeline && timeline.events.length > 0 && (
            <SimulationControlsPanel
              controls={controls}
              eventDescription={lastDescription}
            />
          )}
        </PresenceProvider>
      </IdentityProvider>
    </WebSocketProvider>
  );
}
