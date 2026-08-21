import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from '../ToastProvider';

function Trigger({ message, opts }: { message: string; opts?: Parameters<ReturnType<typeof useToast>['toast']>[1] }) {
  const { toast } = useToast();
  return <button onClick={() => toast(message, opts)}>fire</button>;
}

describe('ToastProvider', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('useToast throws outside the provider', () => {
    const Naked = () => { useToast(); return null; };
    expect(() => render(<Naked />)).toThrow(/within a <ToastProvider>/);
  });

  it('queues a toast and auto-dismisses it after its duration', () => {
    render(
      <ToastProvider>
        <Trigger message="Saved" opts={{ type: 'success' }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('Saved')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(3000 + 200));
    expect(screen.queryByText('Saved')).toBeNull();
  });

  it('errors linger longer than info', () => {
    render(
      <ToastProvider>
        <Trigger message="Boom" opts={{ type: 'error' }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    act(() => vi.advanceTimersByTime(3200));
    expect(screen.getByText('Boom')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(3000 + 200));
    expect(screen.queryByText('Boom')).toBeNull();
  });

  it('stacks multiple toasts', () => {
    render(
      <ToastProvider>
        <Trigger message="One" />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getAllByText('One')).toHaveLength(2);
  });

  it('honors a custom duration', () => {
    render(
      <ToastProvider>
        <Trigger message="Quick" opts={{ durationMs: 500 }} />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    act(() => vi.advanceTimersByTime(500 + 200));
    expect(screen.queryByText('Quick')).toBeNull();
  });
});
