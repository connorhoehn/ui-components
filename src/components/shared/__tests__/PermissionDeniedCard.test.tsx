import { render, screen, fireEvent } from '@testing-library/react';
import PermissionDeniedCard from '../PermissionDeniedCard';

describe('PermissionDeniedCard', () => {
  it('renders camera-denied title + default body', () => {
    render(<PermissionDeniedCard kind="camera" state="denied" data-testid="card" />);
    expect(screen.getByText('Camera access blocked')).toBeInTheDocument();
    expect(screen.getByText(/Click the icon in your browser/i)).toBeInTheDocument();
  });

  it('uses verbatim message override when provided', () => {
    render(
      <PermissionDeniedCard
        kind="microphone"
        state="denied"
        message="Custom error from browser"
      />,
    );
    expect(screen.getByText('Custom error from browser')).toBeInTheDocument();
    expect(screen.queryByText(/Click the icon/i)).not.toBeInTheDocument();
  });

  it('shows retry button only when onRetry is provided', () => {
    const { rerender } = render(
      <PermissionDeniedCard kind="camera" state="denied" />,
    );
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
    const onRetry = vi.fn();
    rerender(
      <PermissionDeniedCard kind="camera" state="denied" onRetry={onRetry} />,
    );
    expect(screen.getByText('Try again')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetry).toHaveBeenCalled();
  });

  it('renders all 4 permission states with appropriate copy', () => {
    const states = [
      { state: 'denied' as const, title: 'Camera access blocked' },
      { state: 'blocked' as const, title: 'Camera is in use' },
      { state: 'no-device' as const, title: 'No camera detected' },
      { state: 'unavailable' as const, title: 'Camera unavailable' },
    ];
    for (const { state, title } of states) {
      const { unmount } = render(
        <PermissionDeniedCard kind="camera" state={state} />,
      );
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    }
  });

  it('exposes data-permission-kind + data-permission-state attributes', () => {
    render(
      <PermissionDeniedCard
        kind="microphone"
        state="blocked"
        data-testid="card"
      />,
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveAttribute('data-permission-kind', 'microphone');
    expect(card).toHaveAttribute('data-permission-state', 'blocked');
  });

  it('honors retryLabel override', () => {
    render(
      <PermissionDeniedCard
        kind="camera"
        state="denied"
        onRetry={() => {}}
        retryLabel="Refresh"
      />,
    );
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.queryByText('Try again')).not.toBeInTheDocument();
  });

  it('screen kind shows "Screen sharing not supported" for no-device', () => {
    render(<PermissionDeniedCard kind="screen" state="no-device" />);
    expect(screen.getByText('Screen sharing not supported')).toBeInTheDocument();
  });
});
