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

  it('defaults to info type when no opts are provided', () => {
    function NoOptsConsumer() {
      const { toast } = useToast();
      return <button onClick={() => toast('No opts')}>Show</button>;
    }
    render(
      <ToastProvider>
        <NoOptsConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('No opts')).toBeInTheDocument();
  });

  it('uses the 5s default duration for warning toasts', () => {
    function WarningConsumer() {
      const { toast } = useToast();
      return <button onClick={() => toast('Heads up', { type: 'warning' })}>Show</button>;
    }
    render(
      <ToastProvider>
        <WarningConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    act(() => {
      vi.advanceTimersByTime(4900);
    });
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText('Heads up')).not.toBeInTheDocument();
  });

  it('uses the 6s default duration for error toasts', () => {
    function ErrorConsumer() {
      const { toast } = useToast();
      return <button onClick={() => toast('Something broke', { type: 'error' })}>Show</button>;
    }
    render(
      <ToastProvider>
        <ErrorConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    act(() => {
      vi.advanceTimersByTime(5900);
    });
    expect(screen.getByText('Something broke')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.queryByText('Something broke')).not.toBeInTheDocument();
  });

  it('lets explicit durationMs override the type default', () => {
    function CustomConsumer() {
      const { toast } = useToast();
      return (
        <button onClick={() => toast('Short error', { type: 'error', durationMs: 200 })}>
          Show
        </button>
      );
    }
    render(
      <ToastProvider>
        <CustomConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Short error')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(screen.queryByText('Short error')).not.toBeInTheDocument();
  });

  it('renders an action button, fires onAction, then removes the toast', () => {
    const onAction = vi.fn();
    function ActionConsumer() {
      const { toast } = useToast();
      return (
        <button
          onClick={() =>
            toast('Item deleted', { type: 'info', actionLabel: 'Undo', onAction })
          }
        >
          Show
        </button>
      );
    }
    render(
      <ToastProvider>
        <ActionConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    const undoBtn = screen.getByText('Undo');
    expect(undoBtn).toBeInTheDocument();
    fireEvent.click(undoBtn);
    expect(onAction).toHaveBeenCalledTimes(1);
    // Action click triggers dismiss; toast is removed after the fade-out window.
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText('Item deleted')).not.toBeInTheDocument();
  });

  it('keeps the toast mounted during the fade-out window after manual dismiss', () => {
    function ManualDismissConsumer() {
      const { toast } = useToast();
      return (
        <button onClick={() => toast('Long-lived', { durationMs: 100000 })}>Show</button>
      );
    }
    render(
      <ToastProvider>
        <ManualDismissConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('Long-lived')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Dismiss notification'));
    // Still mounted while the fade-out animation plays.
    expect(screen.getByText('Long-lived')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(screen.queryByText('Long-lived')).not.toBeInTheDocument();
  });

  it('queues multiple toasts simultaneously and dismisses each independently', () => {
    function MultiConsumer() {
      const { toast } = useToast();
      return (
        <button
          onClick={() => {
            toast('First', { durationMs: 1000 });
            toast('Second', { durationMs: 3000 });
          }}
        >
          Show
        </button>
      );
    }
    render(
      <ToastProvider>
        <MultiConsumer />
      </ToastProvider>
    );
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    // First toast disappears after its duration + fade-out.
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    // Second toast disappears after its own timer fires.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('Second')).not.toBeInTheDocument();
  });
});
