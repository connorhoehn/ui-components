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

  it('renders a spinner', () => {
    render(<LoadingState />);
    // Spinner uses role=status — when nested inside our outer role=status,
    // both should be reachable by query.
    const statusEls = screen.getAllByRole('status');
    expect(statusEls.length).toBeGreaterThanOrEqual(2);
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
