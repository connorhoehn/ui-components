import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TaskStrip, taskPercent } from '../TaskStrip';

afterEach(cleanup);

describe('TaskStrip', () => {
  it('shows the phase and NO bar or percentage when the run reports none', () => {
    render(<TaskStrip label="Creating release-readiness deck" status="running" phase="Editing slide 4" />);
    const strip = screen.getByTestId('task-strip');
    expect(strip).toHaveTextContent('Creating release-readiness deck');
    expect(screen.getByTestId('task-strip-phase')).toHaveTextContent('Editing slide 4');
    expect(screen.queryByRole('progressbar')).toBeNull();
    expect(screen.queryByTestId('task-strip-percent')).toBeNull();
    expect(strip).not.toHaveTextContent('%');
    expect(strip).toHaveAttribute('aria-busy', 'true');
  });

  it('falls back to the status word when there is no phase', () => {
    render(<TaskStrip label="Deck" status="queued" />);
    expect(screen.getByTestId('task-strip-phase')).toHaveTextContent('Starting');
  });

  it('draws a bar only for a real percentage, clamped and rounded', () => {
    render(<TaskStrip label="Deck" status="running" percent={45.4} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '45');
    expect(screen.getByTestId('task-strip-percent')).toHaveTextContent('45%');
    expect(taskPercent(140)).toBe(100);
    expect(taskPercent(-3)).toBe(0);
    expect(taskPercent(Number.NaN)).toBeNull();
    expect(taskPercent(undefined)).toBeNull();
  });

  it('renders only the controls whose handlers are passed', () => {
    render(<TaskStrip label="Deck" status="running" />);
    for (const id of ['open', 'pause', 'resume', 'stop', 'dismiss']) {
      expect(screen.queryByTestId(`task-strip-${id}`)).toBeNull();
    }
  });

  it('offers Pause while running and Resume while paused, never both', () => {
    const onPause = vi.fn();
    const onResume = vi.fn();
    const { rerender } = render(<TaskStrip label="Deck" status="running" onPause={onPause} onResume={onResume} />);
    expect(screen.queryByTestId('task-strip-resume')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Pause task' }));
    expect(onPause).toHaveBeenCalledOnce();

    rerender(<TaskStrip label="Deck" status="paused" onPause={onPause} onResume={onResume} />);
    expect(screen.queryByTestId('task-strip-pause')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Resume task' }));
    expect(onResume).toHaveBeenCalledOnce();
  });

  it('drops Stop and Pause once the task has finished, keeps Open and Dismiss', () => {
    const handlers = { onPause: vi.fn(), onStop: vi.fn(), onOpen: vi.fn(), onDismiss: vi.fn() };
    render(<TaskStrip label="Deck" status="done" {...handlers} />);
    expect(screen.queryByTestId('task-strip-pause')).toBeNull();
    expect(screen.queryByTestId('task-strip-stop')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Open run' }));
    fireEvent.click(screen.getByRole('button', { name: 'Hide task strip' }));
    expect(handlers.onOpen).toHaveBeenCalledOnce();
    expect(handlers.onDismiss).toHaveBeenCalledOnce();
  });

  it('announces phase changes through one polite status region', () => {
    render(<TaskStrip label="Deck" status="running" phase="Reading sources" />);
    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toHaveTextContent('Reading sources');
  });

  it('is 30px tall', () => {
    render(<TaskStrip label="Deck" status="running" />);
    expect(screen.getByTestId('task-strip').className).toContain('h-[30px]');
  });
});

it('tints a live strip and radiates a ring from the dot while running (reduced motion hides it)', () => {
  const { rerender } = render(<TaskStrip label="Suggesting ideas" status="running" phase="Drafting choices" />);
  const strip = screen.getByTestId('task-strip');
  expect(strip.className).toContain('bg-primary-bg');
  expect(screen.getByTestId('task-strip-pulse').className).toContain('animate-ping');
  expect(screen.getByTestId('task-strip-pulse').className).toContain('motion-reduce:hidden');
  rerender(<TaskStrip label="Suggesting ideas" status="done" />);
  expect(screen.getByTestId('task-strip').className).toContain('bg-surface');
  expect(screen.queryByTestId('task-strip-pulse')).toBeNull();
});

