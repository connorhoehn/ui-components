import { render, screen, fireEvent } from '@testing-library/react';
import { DisconnectReconnect } from '../DisconnectReconnect';
import type { ConnectionState } from '../../../types/gateway';

function renderAt(state: ConnectionState, handlers: { onDisconnect?: () => void; onReconnect?: () => void } = {}) {
  return render(
    <DisconnectReconnect
      connectionState={state}
      onDisconnect={handlers.onDisconnect ?? (() => {})}
      onReconnect={handlers.onReconnect ?? (() => {})}
    />,
  );
}

describe('DisconnectReconnect', () => {
  it('enables Disconnect and disables Reconnect when connected', () => {
    renderAt('connected');
    expect(screen.getByRole('button', { name: 'Disconnect' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reconnect' })).toBeDisabled();
  });

  it('enables Disconnect and disables Reconnect when connecting', () => {
    renderAt('connecting');
    expect(screen.getByRole('button', { name: 'Disconnect' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reconnect' })).toBeDisabled();
  });

  it('enables Disconnect and disables Reconnect when reconnecting', () => {
    renderAt('reconnecting');
    expect(screen.getByRole('button', { name: 'Disconnect' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reconnect' })).toBeDisabled();
  });

  it('disables Disconnect and enables Reconnect when disconnected', () => {
    renderAt('disconnected');
    expect(screen.getByRole('button', { name: 'Disconnect' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reconnect' })).not.toBeDisabled();
  });

  it('enables BOTH buttons when idle (neither disconnected nor active)', () => {
    renderAt('idle');
    expect(screen.getByRole('button', { name: 'Disconnect' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Reconnect' })).not.toBeDisabled();
  });

  it('invokes onDisconnect when Disconnect is clicked', () => {
    const onDisconnect = vi.fn();
    renderAt('connected', { onDisconnect });
    fireEvent.click(screen.getByRole('button', { name: 'Disconnect' }));
    expect(onDisconnect).toHaveBeenCalledTimes(1);
  });

  it('invokes onReconnect when Reconnect is clicked', () => {
    const onReconnect = vi.fn();
    renderAt('disconnected', { onReconnect });
    fireEvent.click(screen.getByRole('button', { name: 'Reconnect' }));
    expect(onReconnect).toHaveBeenCalledTimes(1);
  });

  it('does NOT invoke onDisconnect when Disconnect is disabled and clicked', () => {
    const onDisconnect = vi.fn();
    renderAt('disconnected', { onDisconnect });
    fireEvent.click(screen.getByRole('button', { name: 'Disconnect' }));
    expect(onDisconnect).not.toHaveBeenCalled();
  });

  it('renders the current state label', () => {
    renderAt('reconnecting');
    const strong = screen.getByText('reconnecting');
    expect(strong.tagName).toBe('STRONG');
  });
});
