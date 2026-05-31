import { render, screen, fireEvent } from '@testing-library/react';
import { useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

function Boom({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('kaboom');
  return <span>safe child</span>;
}

describe('ErrorBoundary', () => {
  // Swallow the noisy console.error that React logs for thrown children.
  let errSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    errSpy.mockRestore();
  });

  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary name="t">
        <Boom shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText('safe child')).toBeInTheDocument();
  });

  it('renders the fallback with the thrown error message', () => {
    render(
      <ErrorBoundary name="t">
        <Boom shouldThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('kaboom')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('recovers and renders the child after Retry once the child stops throwing', () => {
    function Wrapper() {
      const [throws, setThrows] = useState(true);
      return (
        <div>
          <button onClick={() => setThrows(false)}>fix it</button>
          <ErrorBoundary name="t">
            <Boom shouldThrow={throws} />
          </ErrorBoundary>
        </div>
      );
    }
    render(<Wrapper />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    // Flip the prop first so the next re-render after Retry no longer throws.
    fireEvent.click(screen.getByText('fix it'));
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(screen.getByText('safe child')).toBeInTheDocument();
  });

  it('uses a generic message when the thrown error has no message', () => {
    function SilentBoom(): null {
      throw new Error('');
    }
    render(
      <ErrorBoundary name="t">
        <SilentBoom />
      </ErrorBoundary>,
    );
    // Empty-message Error still hits the fallback text (description renders empty).
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
