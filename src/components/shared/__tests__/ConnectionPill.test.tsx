import { render, screen } from '@testing-library/react';
import { ConnectionPill } from '../ConnectionPill';
import { ConnectionStatus } from '../../layout/ConnectionStatus';

describe('ConnectionPill', () => {
  const states = ['idle', 'connecting', 'connected', 'reconnecting', 'disconnected'] as const;

  it.each(states)('renders the %s state label by default', (state) => {
    render(<ConnectionPill state={state} />);
    const pill = screen.getByTestId('connection-pill');
    expect(pill).toHaveAttribute('data-state', state);
    expect(pill).toHaveAttribute('role', 'status');
    expect(pill).toHaveAttribute('aria-live', 'polite');
    // label text is present
    expect(pill.textContent?.trim()).not.toBe('');
  });

  it('renders dot-only when compact', () => {
    render(<ConnectionPill state="connected" compact />);
    const pill = screen.getByTestId('connection-pill');
    expect(pill).toHaveAttribute('aria-label', 'Connected');
    expect(screen.queryByText('Connected')).not.toBeInTheDocument();
  });

  it('omits the label when withLabel=false', () => {
    render(<ConnectionPill state="reconnecting" withLabel={false} />);
    expect(screen.queryByText('Reconnecting…')).not.toBeInTheDocument();
    expect(screen.getByTestId('connection-pill')).toHaveAttribute(
      'aria-label',
      'Reconnecting…',
    );
  });

  it('honors per-state label overrides', () => {
    render(
      <ConnectionPill
        state="disconnected"
        labels={{ disconnected: 'Offline' }}
      />,
    );
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('honors a custom testid', () => {
    render(<ConnectionPill state="connected" data-testid="ws-pill" />);
    expect(screen.getByTestId('ws-pill')).toBeInTheDocument();
  });
});

describe('ConnectionStatus (deprecated alias)', () => {
  it('still renders via ConnectionPill', () => {
    render(<ConnectionStatus state="connected" />);
    expect(screen.getByTestId('connection-pill')).toHaveAttribute(
      'data-state',
      'connected',
    );
  });
});
