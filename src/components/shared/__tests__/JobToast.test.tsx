import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider, useToast } from '../ToastProvider';
import type { JobToastOptions } from '../ToastProvider';

let api: ReturnType<typeof useToast>;
function Grab() { api = useToast(); return null; }
const mount = () => render(<ToastProvider><Grab /></ToastProvider>);
const job = (o: Partial<JobToastOptions> = {}): JobToastOptions => ({ id: 'j1', title: 'Nightly sweep', state: 'queued', ...o });

describe('toastJob', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('updates the same toast in place for the same id', () => {
    mount();
    act(() => api.toastJob(job()));
    expect(screen.getByTestId('job-toast-state')).toHaveTextContent('Queued');
    act(() => api.toastJob(job({ state: 'running', progress: 40, detail: 'step 2' })));
    expect(screen.getAllByTestId('job-toast-state')).toHaveLength(1);
    expect(screen.getByTestId('job-toast-state')).toHaveTextContent('Running');
    expect(screen.getByTestId('job-toast-detail')).toHaveTextContent('step 2');
    expect(screen.getByTestId('job-toast-progress')).toBeInTheDocument();
    act(() => api.toastJob(job({ id: 'j2', title: 'Other' })));
    expect(screen.getAllByTestId('job-toast-state')).toHaveLength(2);
  });

  it('shows the link when done and drops the bar', () => {
    mount();
    act(() => api.toastJob(job({ state: 'done', progress: 100, href: '/runs/1', hrefLabel: 'Open run' })));
    expect(screen.getByTestId('job-toast-link')).toHaveAttribute('href', '/runs/1');
    expect(screen.getByTestId('job-toast-link')).toHaveTextContent('Open run');
    expect(screen.queryByTestId('job-toast-progress')).toBeNull();
  });

  it('keeps an active job and removes a settled one after dismissAfterMs', () => {
    mount();
    act(() => api.toastJob(job({ state: 'running' })));
    act(() => vi.advanceTimersByTime(60000));
    expect(screen.getByTestId('job-toast-state')).toBeInTheDocument();
    act(() => api.toastJob(job({ state: 'done' })));
    act(() => vi.advanceTimersByTime(7900));
    expect(screen.getByTestId('job-toast-state')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(100 + 200));
    expect(screen.queryByTestId('job-toast-state')).toBeNull();
  });

  it('honors a custom dismissAfterMs', () => {
    mount();
    act(() => api.toastJob(job({ state: 'failed', dismissAfterMs: 1000 })));
    act(() => vi.advanceTimersByTime(1200));
    expect(screen.queryByTestId('job-toast-state')).toBeNull();
  });

  it('hover pauses the timer and leave resumes it', () => {
    mount();
    act(() => api.toastJob(job({ state: 'done' })));
    const el = screen.getByTestId('job-toast-job:j1');
    act(() => vi.advanceTimersByTime(5000));
    fireEvent.mouseEnter(el);
    act(() => vi.advanceTimersByTime(30000));
    expect(screen.getByTestId('job-toast-state')).toBeInTheDocument();
    fireEvent.mouseLeave(el);
    act(() => vi.advanceTimersByTime(2900));
    expect(screen.getByTestId('job-toast-state')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(100 + 200));
    expect(screen.queryByTestId('job-toast-state')).toBeNull();
  });

  it('manual close works while running', () => {
    mount();
    act(() => api.toastJob(job({ state: 'running' })));
    fireEvent.click(screen.getByTestId('job-toast-close'));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByTestId('job-toast-state')).toBeNull();
  });

  it('dismissJobToast removes it', () => {
    mount();
    act(() => api.toastJob(job()));
    act(() => api.dismissJobToast('j1'));
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByTestId('job-toast-state')).toBeNull();
  });

  it('onSettled fires once per settle', () => {
    mount();
    const onSettled = vi.fn();
    act(() => api.toastJob(job({ state: 'running', onSettled })));
    expect(onSettled).not.toHaveBeenCalled();
    act(() => api.toastJob(job({ state: 'done', href: '/x', onSettled })));
    act(() => api.toastJob(job({ state: 'done', href: '/x', onSettled })));
    expect(onSettled).toHaveBeenCalledTimes(1);
    expect(onSettled).toHaveBeenCalledWith(expect.objectContaining({ id: 'j1', state: 'done', href: '/x' }));
  });
});
