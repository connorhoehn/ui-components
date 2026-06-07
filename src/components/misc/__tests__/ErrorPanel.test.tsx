import { render, screen } from '@testing-library/react';
import { ErrorPanel } from '../ErrorPanel';
import { ERROR_CODE_DESCRIPTIONS } from '../errorCodes';
import type { GatewayError } from '../../../types/gateway';

function mkError(over: Partial<GatewayError> & Pick<GatewayError, 'code'>): GatewayError {
  return {
    code: over.code,
    message: over.message ?? 'raw fallback message',
    timestamp: over.timestamp ?? new Date(0).toISOString(),
  };
}

describe('ErrorPanel', () => {
  it('renders the empty state when no errors', () => {
    render(<ErrorPanel errors={[]} />);
    expect(screen.getByText('No errors.')).toBeInTheDocument();
    expect(screen.getByText('(0)')).toBeInTheDocument();
  });

  it('renders one row per error with bracketed code', () => {
    render(
      <ErrorPanel
        errors={[
          mkError({ code: 'AUTH_TOKEN_EXPIRED' }),
          mkError({ code: 'RATE_LIMIT_EXCEEDED' }),
          mkError({ code: 'INVALID_MESSAGE' }),
        ]}
      />,
    );
    expect(screen.getByText('[AUTH_TOKEN_EXPIRED]')).toBeInTheDocument();
    expect(screen.getByText('[RATE_LIMIT_EXCEEDED]')).toBeInTheDocument();
    expect(screen.getByText('[INVALID_MESSAGE]')).toBeInTheDocument();
    expect(screen.getByText('(3)')).toBeInTheDocument();
  });

  it('resolves a known code to the ERROR_CODE_DESCRIPTIONS lookup', () => {
    render(<ErrorPanel errors={[mkError({ code: 'AUTH_TOKEN_EXPIRED', message: 'unused raw' })]} />);
    expect(screen.getByText(ERROR_CODE_DESCRIPTIONS.AUTH_TOKEN_EXPIRED)).toBeInTheDocument();
    // The raw `message` is suppressed when a known code resolves.
    expect(screen.queryByText('unused raw')).not.toBeInTheDocument();
  });

  it('falls back to error.message for an unknown code', () => {
    render(
      <ErrorPanel
        errors={[mkError({ code: 'TOTALLY_NEW_CODE', message: 'forward-compat fallback' })]}
      />,
    );
    expect(screen.getByText('forward-compat fallback')).toBeInTheDocument();
    expect(screen.getByText('[TOTALLY_NEW_CODE]')).toBeInTheDocument();
  });

  it('uses a danger-colored count when errors.length > 0', () => {
    const { container } = render(
      <ErrorPanel errors={[mkError({ code: 'AUTHZ_FORBIDDEN' })]} />,
    );
    const countSpan = container.querySelector('h3 > span');
    expect(countSpan?.className).toMatch(/text-danger/);
  });

  it('uses a muted-color count when errors.length === 0', () => {
    const { container } = render(<ErrorPanel errors={[]} />);
    const countSpan = container.querySelector('h3 > span');
    expect(countSpan?.className).toMatch(/text-\[#9ca3af\]/);
  });
});
