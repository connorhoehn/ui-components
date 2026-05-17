import { render, screen } from '@testing-library/react';
import { StatsCard } from '../StatsCard';

describe('StatsCard', () => {
  it('renders the "No stream data" placeholder when metrics is null', () => {
    render(<StatsCard metrics={null} />);
    expect(screen.getByText('No stream data')).toBeInTheDocument();
  });

  it('renders Bitrate, FPS, Resolution, Packets Lost rows when metrics is present', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 2_500_000,
          fps: 30,
          resolution: { width: 1280, height: 720 },
          packetsLost: 4,
        }}
      />,
    );
    expect(screen.getByText('Bitrate')).toBeInTheDocument();
    expect(screen.getByText('FPS')).toBeInTheDocument();
    expect(screen.getByText('Resolution')).toBeInTheDocument();
    expect(screen.getByText('Packets Lost')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('1280×720')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('formats bitrate in Mbps for ≥1_000_000 bps', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 2_500_000,
          fps: 30,
          resolution: { width: 1, height: 1 },
          packetsLost: 0,
        }}
      />,
    );
    expect(screen.getByText('2.5 Mbps')).toBeInTheDocument();
  });

  it('formats bitrate in Kbps for ≥1_000 and <1_000_000 bps', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 750_000,
          fps: 24,
          resolution: { width: 1, height: 1 },
          packetsLost: 0,
        }}
      />,
    );
    expect(screen.getByText('750 Kbps')).toBeInTheDocument();
  });

  it('formats bitrate in bps for <1_000 bps', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 800,
          fps: 24,
          resolution: { width: 1, height: 1 },
          packetsLost: 0,
        }}
      />,
    );
    expect(screen.getByText('800 bps')).toBeInTheDocument();
  });

  it('omits the Jitter row when jitter is undefined', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 1_000_000,
          fps: 30,
          resolution: { width: 1, height: 1 },
          packetsLost: 0,
        }}
      />,
    );
    expect(screen.queryByText('Jitter')).not.toBeInTheDocument();
  });

  it('renders the Jitter row when jitter is defined, formatted to 1 decimal ms', () => {
    render(
      <StatsCard
        metrics={{
          bitrateBps: 1_000_000,
          fps: 30,
          resolution: { width: 1, height: 1 },
          packetsLost: 0,
          jitter: 12.345,
        }}
      />,
    );
    expect(screen.getByText('Jitter')).toBeInTheDocument();
    expect(screen.getByText('12.3 ms')).toBeInTheDocument();
  });
});
