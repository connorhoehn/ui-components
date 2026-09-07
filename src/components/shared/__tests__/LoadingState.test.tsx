import { render, screen } from '@testing-library/react';
import LoadingState from '../LoadingState';

describe('LoadingState', () => {
  it('renders the default label', () => {
    render(<LoadingState />);
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('uses role=status with aria-live=polite for screen readers', () => {
    render(<LoadingState testId="ls-root" />);
    const root = screen.getByTestId('ls-root');
    expect(root).toHaveAttribute('role', 'status');
    expect(root).toHaveAttribute('aria-live', 'polite');
  });

  it('renders the spinner as decoration, not as a second live region', () => {
    const { container } = render(<LoadingState />);
    // The container is the live region. The spinner used to carry its own
    // role=status + aria-label="Loading", so a screen reader announced the
    // wait twice — once for the ring and once for the label beside it.
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getAllByRole('status')).toHaveLength(1);
  });

  it('renders a custom label', () => {
    render(<LoadingState label="Fetching runs…" />);
    expect(screen.getByText('Fetching runs…')).toBeInTheDocument();
  });

  it('renders an optional description', () => {
    render(
      <LoadingState
        label="Fetching"
        description="This may take a few seconds for large pipelines."
      />,
    );
    expect(
      screen.getByText('This may take a few seconds for large pipelines.'),
    ).toBeInTheDocument();
  });

  it('honors custom testId', () => {
    render(<LoadingState testId="custom-loader" />);
    expect(screen.getByTestId('custom-loader')).toBeInTheDocument();
  });
});
