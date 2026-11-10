import { fireEvent, render, screen } from '@testing-library/react';
import { VideoOverlayChip } from '../VideoOverlayChip';

describe('VideoOverlayChip', () => {
  it('renders plain text with no button when there are no details', () => {
    render(<VideoOverlayChip>1.2 Mb/s</VideoOverlayChip>);
    expect(screen.getByText('1.2 Mb/s')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('is a disclosure when given details', () => {
    render(<VideoOverlayChip details="bytes: 42">1.2 Mb/s</VideoOverlayChip>);
    const button = screen.getByRole('button', { name: '1.2 Mb/s' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('bytes: 42')).not.toBeVisible();
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('bytes: 42')).toBeVisible();
    expect(button.getAttribute('aria-controls')).toBe(screen.getByText('bytes: 42').id);
  });

  it('honours controlled expansion', () => {
    const onExpandedChange = vi.fn();
    render(<VideoOverlayChip details="more" expanded onExpandedChange={onExpandedChange}>stats</VideoOverlayChip>);
    const button = screen.getByRole('button', { name: 'stats' });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(button);
    expect(onExpandedChange).toHaveBeenCalledWith(false);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('is a polite live region only when asked', () => {
    const { rerender } = render(<VideoOverlayChip>idle</VideoOverlayChip>);
    expect(screen.queryByRole('status')).toBeNull();
    rerender(<VideoOverlayChip live>live</VideoOverlayChip>);
    expect(screen.getByRole('status')).toHaveTextContent('live');
  });

  it('marks its tone', () => {
    render(<VideoOverlayChip tone="danger">failed</VideoOverlayChip>);
    expect(screen.getByTestId('video-overlay-chip')).toHaveAttribute('data-tone', 'danger');
  });
});
