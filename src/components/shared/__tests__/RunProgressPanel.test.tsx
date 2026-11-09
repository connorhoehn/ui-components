import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, afterEach } from 'vitest';
import { RunProgressPanel, formatRunDuration } from '../RunProgressPanel';

afterEach(() => { vi.useRealTimers(); });

describe('formatRunDuration', () => {
  it('reads seconds, minutes and hours', () => {
    expect(formatRunDuration(42_000)).toBe('42s');
    expect(formatRunDuration(222_000)).toBe('3m 42s');
    expect(formatRunDuration(3_900_000)).toBe('1h 05m');
    expect(formatRunDuration(undefined)).toBe('—');
    expect(formatRunDuration(-1)).toBe('—');
  });
});

describe('RunProgressPanel', () => {
  it('running: sentence, elapsed, ~remaining, a bar, Refresh and an in-place Cancel', async () => {
    const onCancel = vi.fn();
    const onRefresh = vi.fn();
    const user = userEvent.setup();
    render(
      <RunProgressPanel
        title="Generating 3D mesh"
        description="Meshy is generating a stylized mesh from the approved concept."
        progress={68}
        elapsedMs={222_000}
        remainingMs={105_000}
        onRefresh={onRefresh}
        onCancel={onCancel}
      />,
    );
    const panel = screen.getByTestId('run-progress-panel');
    expect(panel).toHaveAttribute('data-run-progress');
    expect(panel).toHaveAttribute('data-run-state', 'running');
    expect(panel).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('region', { name: 'Generating 3D mesh' })).toBe(panel);
    expect(panel).toHaveTextContent('3m 42s');
    expect(panel).toHaveTextContent('~1m 45s');
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '68');
    expect(screen.getByTestId('run-progress-panel-non-blocking')).toHaveTextContent('Non-blocking');
    await user.click(screen.getByRole('button', { name: 'Refresh status' }));
    expect(onRefresh).toHaveBeenCalledOnce();
    const cancel = screen.getByRole('button', { name: 'Cancel job' });
    expect(cancel).toHaveAttribute('data-action-kind', 'cancel');
    await user.click(cancel);
    expect(screen.getByRole('group', { name: 'Cancel this job?' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeNull();
    await user.click(screen.getByTestId('run-progress-panel-cancel-confirm'));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('counts elapsed live from startedAt while running', () => {
    vi.useFakeTimers();
    let t = 1_000_000;
    const now = () => t;
    render(<RunProgressPanel title="Drawing" startedAt={t - 5_000} now={now} />);
    expect(screen.getByTestId('run-progress-panel')).toHaveTextContent('5s');
    t += 3_000;
    act(() => { vi.advanceTimersByTime(1000); });
    expect(screen.getByTestId('run-progress-panel')).toHaveTextContent('8s');
  });

  it('leaves the bar out without a percentage, and Cancel and remaining out once done', () => {
    const { rerender } = render(<RunProgressPanel title="Drawing" onCancel={() => {}} />);
    expect(screen.queryByRole('progressbar')).toBeNull();
    rerender(<RunProgressPanel title="Drawing" state="done" progress={100} elapsedMs={60_000} remainingMs={10} onCancel={() => {}} />);
    const panel = screen.getByTestId('run-progress-panel');
    expect(panel).toHaveAttribute('data-run-state', 'done');
    expect(panel).not.toHaveAttribute('aria-busy');
    expect(screen.queryByRole('button', { name: 'Cancel job' })).toBeNull();
    expect(panel).not.toHaveTextContent('Est. remaining');
    expect(panel).toHaveTextContent('Done');
    expect(screen.queryByTestId('run-progress-panel-non-blocking')).toBeNull();
  });
});
