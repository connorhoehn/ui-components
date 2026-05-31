import { render, screen } from '@testing-library/react';
import { CallStatsOverlay } from '../CallStatsOverlay';

describe('CallStatsOverlay', () => {
  it('renders nothing when stats is undefined', () => {
    const { container } = render(<CallStatsOverlay />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when stats is an empty object', () => {
    const { container } = render(<CallStatsOverlay stats={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the NetworkQualityBadge when networkQuality is set', () => {
    render(<CallStatsOverlay stats={{ networkQuality: 'good' }} />);
    expect(screen.getByText('Good')).toBeInTheDocument();
    // The metrics box is absent because no numeric metrics are set.
    expect(screen.queryByTestId('call-stats-overlay-metrics')).toBeNull();
  });

  it('renders bitrate, latency, and packet-loss when set', () => {
    render(
      <CallStatsOverlay
        stats={{
          bitrateKbps: 1234,
          latencyMs: 42.6,
          packetLossPct: 1.25,
        }}
      />,
    );
    expect(screen.getByTestId('call-stats-bitrate')).toHaveTextContent('bitrate1.2 Mb/s');
    expect(screen.getByTestId('call-stats-latency')).toHaveTextContent('latency43 ms');
    expect(screen.getByTestId('call-stats-packet-loss')).toHaveTextContent('loss1.3%');
  });

  it('formats sub-mbit bitrate as kb/s', () => {
    render(<CallStatsOverlay stats={{ bitrateKbps: 750 }} />);
    expect(screen.getByTestId('call-stats-bitrate')).toHaveTextContent('750 kb/s');
  });

  it('hides individual metric rows when their value is undefined', () => {
    render(<CallStatsOverlay stats={{ latencyMs: 80 }} />);
    expect(screen.queryByTestId('call-stats-bitrate')).toBeNull();
    expect(screen.getByTestId('call-stats-latency')).toBeInTheDocument();
    expect(screen.queryByTestId('call-stats-packet-loss')).toBeNull();
  });

  it('applies the selected corner position classes', () => {
    const { container } = render(
      <CallStatsOverlay
        stats={{ networkQuality: 'medium' }}
        position="bottom-right"
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('bottom-2');
    expect(root.className).toContain('right-2');
  });

  it('defaults position to top-left', () => {
    const { container } = render(
      <CallStatsOverlay stats={{ networkQuality: 'medium' }} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('top-2');
    expect(root.className).toContain('left-2');
  });

  it('uses the provided testId when supplied', () => {
    render(
      <CallStatsOverlay
        stats={{ networkQuality: 'good' }}
        testId="my-stats"
      />,
    );
    expect(screen.getByTestId('my-stats')).toBeInTheDocument();
  });
});
