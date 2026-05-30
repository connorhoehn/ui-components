import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from '../ErrorState';

describe('ErrorState', () => {
  it('renders title', () => {
    render(<ErrorState title="Failed to load runs" />);
    expect(screen.getByText('Failed to load runs')).toBeInTheDocument();
  });

  it('uses role=alert for screen readers', () => {
    render(<ErrorState title="Failed" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders default ⚠️ icon when none provided', () => {
    render(<ErrorState title="Failed" />);
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });

  it('renders custom string icon', () => {
    render(<ErrorState icon="🔥" title="Server fire" />);
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<ErrorState title="Failed" body="Network unreachable." />);
    expect(screen.getByText('Network unreachable.')).toBeInTheDocument();
  });

  it('prefers description over body when both are set', () => {
    render(
      <ErrorState
        title="Failed"
        body="ignore me"
        description={<span>Retry in 30s</span>}
      />,
    );
    expect(screen.getByText('Retry in 30s')).toBeInTheDocument();
    expect(screen.queryByText('ignore me')).not.toBeInTheDocument();
  });

  it('renders retry action when actionLabel + onAction are provided', () => {
    const onAction = vi.fn();
    render(<ErrorState title="Failed" actionLabel="Retry" onAction={onAction} />);
    fireEvent.click(screen.getByTestId('error-state-action'));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders custom action node when provided', () => {
    render(
      <ErrorState
        title="Failed"
        action={<a href="/status">View status</a>}
      />,
    );
    expect(screen.getByText('View status')).toBeInTheDocument();
  });

  it('honors custom testId', () => {
    render(<ErrorState title="Failed" testId="custom-error" />);
    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });
});
