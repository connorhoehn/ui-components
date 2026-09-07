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

// ---------------------------------------------------------------------------
// One row per PERSON, not per socket.
//
// The gateway keys presence by clientId, so a person with two tabs arrived
// twice and this component rendered both — the "13 rows for 4 humans" bug the
// app's own usePresence collapses away and this one did not.
// ---------------------------------------------------------------------------

describe('WrappedPresencePanel collapses connections into people', () => {
  const conn = (
    clientId: string,
    over: Partial<RMPresenceEntry> = {},
  ): RMPresenceEntry => ({
    clientId,
    status: 'online',
    metadata: { userId: 'user-alice', displayName: 'Alice' },
    channels: ['room:general'],
    nodeId: 'node-1',
    timestamp: '2026-09-06T10:00:00.000Z',
    lastSeen: '2026-09-06T10:00:00.000Z',
    lastHeartbeat: 0,
    ...over,
  });

  const hook = (roster: RMPresenceEntry[]): RMUsePresenceReturn => ({
    roster,
    setStatus: vi.fn(),
    updateMetadata: vi.fn(),
  });

  it('shows one row for a person with two tabs open', () => {
    render(
      <WrappedPresencePanel
        presence={hook([conn('conn-1'), conn('conn-2')])}
        currentClientId={null}
      />,
    );
    expect(screen.getByText('Users in channel (1)')).toBeInTheDocument();
  });

  // The viewer must still recognise themselves in their own roster, whichever
  // of their tabs would otherwise have won the row.
  it('keeps the viewer’s own connection as their row', () => {
    render(
      <WrappedPresencePanel
        presence={hook([
          conn('conn-1', { status: 'away' }),
          conn('conn-2', { lastHeartbeat: 999 }),
        ])}
        currentClientId="conn-1"
      />,
    );
    expect(screen.getByText(/\(you\)/i)).toBeInTheDocument();
  });

  // A tab that has not published its metadata yet must not blank out the name
  // the other tab already published.
  it('merges metadata across a person’s tabs', () => {
    render(
      <WrappedPresencePanel
        presence={hook([
          conn('conn-1', { metadata: { userId: 'user-alice' } }),
          conn('conn-2'),
        ])}
        currentClientId={null}
      />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('is typing if ANY of the person’s tabs is', () => {
    render(
      <WrappedPresencePanel
        presence={hook([
          conn('conn-1'),
          conn('conn-2', { metadata: { userId: 'user-alice', displayName: 'Alice', isTyping: true } }),
        ])}
        currentClientId={null}
      />,
    );
    expect(screen.getByText(/typing/i)).toBeInTheDocument();
  });

  it('keeps anonymous connections apart — there is no person to collapse to', () => {
    render(
      <WrappedPresencePanel
        presence={hook([
          conn('conn-1', { metadata: { displayName: 'Guest' } }),
          conn('conn-2', { metadata: { displayName: 'Guest' } }),
        ])}
        currentClientId={null}
      />,
    );
    expect(screen.getByText('Users in channel (2)')).toBeInTheDocument();
  });

  it('can still show every socket when that is the subject', () => {
    render(
      <WrappedPresencePanel
        presence={hook([conn('conn-1'), conn('conn-2')])}
        currentClientId={null}
        perConnection
      />,
    );
    expect(screen.getByText('Users in channel (2)')).toBeInTheDocument();
  });
});
