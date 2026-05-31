// src/integrations/realtime-modules/__tests__/NetworkErrorBoundary.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useState } from 'react';
import { NetworkErrorBoundary } from '../NetworkErrorBoundary';

function Boom({ shouldThrow }: { shouldThrow: boolean }): null {
  if (shouldThrow) throw new Error('hook failure');
  return null;
}

function Harness({ initiallyThrow = true }: { initiallyThrow?: boolean }) {
  const [shouldThrow, setShouldThrow] = useState(initiallyThrow);
  return (
    <NetworkErrorBoundary
      onRetry={() => setShouldThrow(false)}
    >
      <Boom shouldThrow={shouldThrow} />
      <span>healthy content</span>
    </NetworkErrorBoundary>
  );
}

describe('NetworkErrorBoundary', () => {
  // Silence React's expected console.error noise during throw tests so the
  // test output stays focused; we still assert onError separately.
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('renders children when no error is thrown', () => {
    render(
      <NetworkErrorBoundary>
        <span>healthy content</span>
      </NetworkErrorBoundary>,
    );
    expect(screen.getByText('healthy content')).toBeInTheDocument();
  });

  it('catches thrown error and renders default fallback', () => {
    render(
      <NetworkErrorBoundary>
        <Boom shouldThrow />
      </NetworkErrorBoundary>,
    );
    expect(screen.getByTestId('network-error-boundary-fallback')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('hook failure')).toBeInTheDocument();
  });

  it('honors title + description overrides', () => {
    render(
      <NetworkErrorBoundary title="Chat unreachable" description="The gateway dropped.">
        <Boom shouldThrow />
      </NetworkErrorBoundary>,
    );
    expect(screen.getByText('Chat unreachable')).toBeInTheDocument();
    expect(screen.getByText('The gateway dropped.')).toBeInTheDocument();
    expect(screen.queryByText('hook failure')).not.toBeInTheDocument();
  });

  it('invokes onError when an error is caught', () => {
    const onError = vi.fn();
    render(
      <NetworkErrorBoundary onError={onError}>
        <Boom shouldThrow />
      </NetworkErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((onError.mock.calls[0][0] as Error).message).toBe('hook failure');
  });

  it('uses console.error when onError is not provided', () => {
    render(
      <NetworkErrorBoundary>
        <Boom shouldThrow />
      </NetworkErrorBoundary>,
    );
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('renders custom fallback when provided', () => {
    render(
      <NetworkErrorBoundary
        fallback={(err, reset) => (
          <button type="button" onClick={reset}>
            Custom: {err.message}
          </button>
        )}
      >
        <Boom shouldThrow />
      </NetworkErrorBoundary>,
    );
    expect(screen.getByText('Custom: hook failure')).toBeInTheDocument();
  });

  it('resets and re-renders children when retry button is clicked', () => {
    render(<Harness initiallyThrow />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retry'));
    expect(screen.getByText('healthy content')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('invokes onRetry before clearing the error state', () => {
    const onRetry = vi.fn();
    function HarnessWithExternalRetry() {
      const [shouldThrow, setShouldThrow] = useState(true);
      return (
        <NetworkErrorBoundary
          onRetry={() => {
            onRetry();
            setShouldThrow(false);
          }}
        >
          <Boom shouldThrow={shouldThrow} />
          <span>healthy content</span>
        </NetworkErrorBoundary>
      );
    }
    render(<HarnessWithExternalRetry />);
    fireEvent.click(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByText('healthy content')).toBeInTheDocument();
  });
});
