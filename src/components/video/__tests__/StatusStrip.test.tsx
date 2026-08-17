import { render, screen } from '@testing-library/react';
import { StatusStrip } from '../StatusStrip';

describe('StatusStrip', () => {
  it('renders the special LIVE label for phase=playing', () => {
    render(<StatusStrip phase="playing" />);
    expect(screen.getByText('LIVE')).toBeInTheDocument();
  });

  it('uppercases the phase label for non-playing phases', () => {
    render(<StatusStrip phase="connecting" />);
    expect(screen.getByText('CONNECTING')).toBeInTheDocument();
  });

  it.each([
    ['live', 'text-success-fg'],
    ['playing', 'text-success-fg'],
    ['connecting', 'text-warning-fg'],
    ['reconnecting', 'text-warning-fg'],
    ['buffering', 'text-warning-fg'],
    ['idle', 'text-slate-400'],
    ['error', 'text-danger-fg'],
  ] as const)('applies the %s text-color tier', (phase, klass) => {
    render(<StatusStrip phase={phase} />);
    const label = phase === 'playing' ? 'LIVE' : phase.toUpperCase();
    expect(screen.getByText(label)).toHaveClass(klass);
  });

  it('omits bitrate / duration / viewerCount when undefined', () => {
    render(<StatusStrip phase="live" />);
    // No "Mbps" / "Kbps" digits and no "0:00"-style duration appear.
    expect(screen.queryByText(/Mbps/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Kbps/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^\d+:\d{2}/)).not.toBeInTheDocument();
  });

  it('renders bitrate in Mbps for ≥1_000_000 bps', () => {
    render(<StatusStrip phase="live" bitrateBps={2_500_000} />);
    expect(screen.getByText('2.5 Mbps')).toBeInTheDocument();
  });

  it('renders bitrate in Kbps below 1_000_000 bps', () => {
    render(<StatusStrip phase="live" bitrateBps={500_000} />);
    expect(screen.getByText('500 Kbps')).toBeInTheDocument();
  });

  it('formats duration as m:ss for sub-hour durations', () => {
    render(<StatusStrip phase="live" duration={75} />);
    expect(screen.getByText('1:15')).toBeInTheDocument();
  });

  it('formats duration as h:mm:ss for >= 1 hour', () => {
    render(<StatusStrip phase="live" duration={3725} />);
    expect(screen.getByText('1:02:05')).toBeInTheDocument();
  });

  it('renders viewerCount when supplied', () => {
    render(<StatusStrip phase="live" viewerCount={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
