import { render, screen } from '@testing-library/react';
import { ErrorDisplay } from '../ErrorDisplay';

describe('ErrorDisplay', () => {
  it('renders nothing when error is null', () => {
    const { container } = render(<ErrorDisplay error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the code and the canonical description for a known code', () => {
    render(
      <ErrorDisplay
        error={{
          code: 'AUTH_TOKEN_EXPIRED',
          message: 'token gone',
          timestamp: new Date(0).toISOString(),
        }}
      />,
    );
    expect(screen.getByText('[AUTH_TOKEN_EXPIRED]')).toBeInTheDocument();
    expect(screen.getByText(/session token has expired/i)).toBeInTheDocument();
  });

  it('falls back to error.message when the code is unknown', () => {
    render(
      <ErrorDisplay
        error={{
          code: 'NOT_A_REAL_CODE_42',
          message: 'fallback description here',
          timestamp: new Date(0).toISOString(),
        }}
      />,
    );
    expect(screen.getByText('[NOT_A_REAL_CODE_42]')).toBeInTheDocument();
    expect(screen.getByText('fallback description here')).toBeInTheDocument();
  });
});
