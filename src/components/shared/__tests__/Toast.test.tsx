import { render, screen, fireEvent, act } from '@testing-library/react';
import Toast from '../Toast';
import { ToastProvider, useToast } from '../ToastProvider';

// Mock usePrefersReducedMotion to return false (normal motion)
vi.mock('../../../hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

describe('Toast', () => {
  const onDismiss = vi.fn();

  beforeEach(() => {
    onDismiss.mockClear();
  });

  it('renders with message', () => {
    render(
      <Toast id="t1" message="File saved" type="success" onDismiss={onDismiss} />
    );
    expect(screen.getByText('File saved')).toBeInTheDocument();
  });

  it('renders info variant with polite aria-live', () => {
    render(
      <Toast id="t1" message="Info toast" type="info" onDismiss={onDismiss} />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('renders error variant with assertive aria-live', () => {
    render(
      <Toast id="t1" message="Error toast" type="error" onDismiss={onDismiss} />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders warning variant with assertive aria-live', () => {
    render(
      <Toast id="t1" message="Warning toast" type="warning" onDismiss={onDismiss} />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders success variant with polite aria-live', () => {
    render(
      <Toast id="t1" message="Success toast" type="success" onDismiss={onDismiss} />
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
  });

  it('calls onDismiss when dismiss button is clicked', () => {
    render(
      <Toast id="t1" message="Dismissible" type="info" onDismiss={onDismiss} />
    );
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalledWith('t1');
  });
});

describe('ToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function TestConsumer() {
    const { toast } = useToast();
    return (
      <button onClick={() => toast('Hello toast', { type: 'success', durationMs: 1000 })}>
        Show Toast
      </button>
    );
  }

  it('shows toast when triggered via useToast', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Hello toast')).toBeInTheDocument();
  });

  it('auto-dismisses toast after duration', () => {
    render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Hello toast')).toBeInTheDocument();

    // Advance past the duration (1000ms) + fade out (160ms)
    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.queryByText('Hello toast')).not.toBeInTheDocument();
  });

  it('throws error when useToast is used outside ToastProvider', () => {
    // Suppress React error boundary output
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    function BadConsumer() {
      useToast();
      return null;
    }
    expect(() => render(<BadConsumer />)).toThrow(
      'useToast must be used within a <ToastProvider>'
    );
    consoleError.mockRestore();
  });
});
