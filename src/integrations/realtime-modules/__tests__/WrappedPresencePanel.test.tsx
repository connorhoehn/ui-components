// src/integrations/realtime-modules/__tests__/WrappedPresencePanel.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { WrappedPresencePanel } from '../WrappedPresencePanel';
import type { RMUsePresenceReturn, RMPresenceEntry } from '../types';

function makeEntry(overrides: Partial<RMPresenceEntry> = {}): RMPresenceEntry {
  return {
    clientId: 'client-a',
    status: 'online',
    metadata: { displayName: 'Alice' },
    channels: ['room-1'],
    nodeId: 'node-1',
    timestamp: '2026-05-30T10:00:00.000Z',
    lastSeen: '2026-05-30T10:00:00.000Z',
    lastHeartbeat: 0,
    ...overrides,
  };
}

function makePresence(
  roster: RMPresenceEntry[] = [],
  overrides: Partial<RMUsePresenceReturn> = {},
): RMUsePresenceReturn {
  return {
    roster,
    setStatus: vi.fn(),
    updateMetadata: vi.fn(),
    ...overrides,
  };
}

describe('WrappedPresencePanel', () => {
  it('renders PresencePanel without shim wrappers when wrapWithNetworkShim is omitted', () => {
    const presence = makePresence([makeEntry({ clientId: 'a' })]);
    render(<WrappedPresencePanel presence={presence} currentClientId="a" />);
    expect(screen.queryByTestId('reconnecting-shim-connected')).not.toBeInTheDocument();
    expect(screen.queryByTestId('reconnecting-shim-connecting')).not.toBeInTheDocument();
  });

  it('wraps PresencePanel in ReconnectingShim when wrapWithNetworkShim is set', () => {
    const presence = makePresence([makeEntry({ clientId: 'a' })]);
    render(
      <WrappedPresencePanel
        presence={presence}
        currentClientId="a"
        wrapWithNetworkShim={{ connectionState: 'connected' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connected')).toBeInTheDocument();
  });

  it('renders skeleton (not roster) when connectionState=connecting', () => {
    const presence = makePresence([makeEntry({ clientId: 'a' })]);
    render(
      <WrappedPresencePanel
        presence={presence}
        currentClientId="a"
        wrapWithNetworkShim={{ connectionState: 'connecting' }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-connecting')).toBeInTheDocument();
  });

  it('renders disconnected fallback when connectionState=disconnected with retry', () => {
    const onRetry = vi.fn();
    const presence = makePresence([makeEntry({ clientId: 'a' })]);
    render(
      <WrappedPresencePanel
        presence={presence}
        currentClientId="a"
        wrapWithNetworkShim={{
          connectionState: 'disconnected',
          onRetry,
          retryLabel: 'Reconnect',
        }}
      />,
    );
    expect(screen.getByTestId('reconnecting-shim-disconnected')).toBeInTheDocument();
    expect(screen.getByText('Reconnect')).toBeInTheDocument();
  });
});
