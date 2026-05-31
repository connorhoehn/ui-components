// src/integrations/realtime-modules/__tests__/ReconnectingShim.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReconnectingShim } from '../ReconnectingShim';

describe('ReconnectingShim', () => {
  it('renders skeleton placeholder when connecting', () => {
    render(
      <ReconnectingShim connectionState="connecting">
        <div>chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByTestId('reconnecting-shim-connecting')).toBeInTheDocument();
    expect(screen.getByTestId('skeleton-card')).toBeInTheDocument();
    expect(screen.queryByText('chat body')).not.toBeInTheDocument();
  });

  it('honors custom connectingPlaceholder', () => {
    render(
      <ReconnectingShim
        connectionState="connecting"
        connectingPlaceholder={<span>custom loader</span>}
      >
        <div>chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByText('custom loader')).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-card')).not.toBeInTheDocument();
  });

  it('renders children + reconnecting banner when reconnecting', () => {
    render(
      <ReconnectingShim connectionState="reconnecting" reconnectingLabel="Reconnecting now">
        <div data-testid="chat-body">chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByTestId('reconnecting-shim-reconnecting')).toBeInTheDocument();
    expect(screen.getByTestId('chat-body')).toBeInTheDocument();
    expect(screen.getByTestId('hangout-reconnecting-banner')).toBeInTheDocument();
    expect(screen.getByText('Reconnecting now')).toBeInTheDocument();
  });

  it('dims children at 60% opacity while reconnecting', () => {
    render(
      <ReconnectingShim connectionState="reconnecting">
        <div data-testid="chat-body">chat body</div>
      </ReconnectingShim>,
    );
    const body = screen.getByTestId('chat-body').parentElement;
    expect(body).toHaveClass('opacity-60');
    expect(body).toHaveClass('pointer-events-none');
  });

  it('renders disconnected EmptyState with retry button', () => {
    const onRetry = vi.fn();
    render(
      <ReconnectingShim connectionState="disconnected" onRetry={onRetry}>
        <div>chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByTestId('reconnecting-shim-disconnected')).toBeInTheDocument();
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    const retry = screen.getByText('Try again');
    fireEvent.click(retry);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('omits retry button when onRetry not provided', () => {
    render(
      <ReconnectingShim connectionState="disconnected">
        <div>chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });

  it('honors disconnectedFallback override', () => {
    render(
      <ReconnectingShim
        connectionState="disconnected"
        disconnectedFallback={<span>custom disconnect</span>}
      >
        <div>chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByText('custom disconnect')).toBeInTheDocument();
    expect(screen.queryByText('Disconnected')).not.toBeInTheDocument();
  });

  it('renders children when connected', () => {
    render(
      <ReconnectingShim connectionState="connected">
        <div data-testid="chat-body">chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByTestId('reconnecting-shim-connected')).toBeInTheDocument();
    expect(screen.getByTestId('chat-body')).toBeInTheDocument();
    expect(screen.queryByTestId('hangout-reconnecting-banner')).not.toBeInTheDocument();
  });

  it('renders children when idle (parent has not initiated)', () => {
    render(
      <ReconnectingShim connectionState="idle">
        <div data-testid="chat-body">chat body</div>
      </ReconnectingShim>,
    );
    expect(screen.getByTestId('reconnecting-shim-connected')).toBeInTheDocument();
    expect(screen.getByTestId('chat-body')).toBeInTheDocument();
  });
});
