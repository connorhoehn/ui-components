// src/integrations/realtime-modules/__tests__/WrappedConnectionPill.test.tsx

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { WrappedConnectionPill } from '../WrappedConnectionPill';
import type { RMConnectionState } from '../WrappedConnectionPill';

function socket(state: RMConnectionState) {
  return { connectionState: state };
}

describe('WrappedConnectionPill', () => {
  it('forwards each connectionState to ConnectionPill via data-state', () => {
    const states: RMConnectionState[] = [
      'idle',
      'connecting',
      'connected',
      'reconnecting',
      'disconnected',
    ];
    for (const s of states) {
      const { unmount } = render(<WrappedConnectionPill socket={socket(s)} />);
      const pill = screen.getByRole('status');
      expect(pill).toHaveAttribute('data-state', s);
      unmount();
    }
  });

  it('renders the default label text when withLabel is unset', () => {
    render(<WrappedConnectionPill socket={socket('connected')} />);
    expect(screen.getByText('Connected')).toBeInTheDocument();
  });

  it('omits the label when compact is true', () => {
    render(<WrappedConnectionPill socket={socket('connected')} compact />);
    expect(screen.queryByText('Connected')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Connected');
  });

  it('honors custom labels override', () => {
    render(
      <WrappedConnectionPill
        socket={socket('reconnecting')}
        labels={{ reconnecting: 'Retrying…' }}
      />,
    );
    expect(screen.getByText('Retrying…')).toBeInTheDocument();
  });

  it('accepts any object with a connectionState field (structural typing)', () => {
    // Simulates a full useWebSocket() return shape — only connectionState matters.
    const fullSocket = {
      connectionState: 'disconnected' as const,
      lastError: null,
      sessionToken: null,
      clientId: null,
      currentChannel: '',
      switchChannel: () => {},
      sendMessage: () => {},
      disconnect: () => {},
      reconnect: () => {},
    };
    render(<WrappedConnectionPill socket={fullSocket} />);
    expect(screen.getByRole('status')).toHaveAttribute('data-state', 'disconnected');
  });
});
