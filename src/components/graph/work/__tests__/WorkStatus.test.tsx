import { act, render, screen } from '@testing-library/react';
import { WorkStatus, workPauseLabel } from '../WorkStatus';

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(event: { matches: boolean }) => void> = [];
  const query = {
    matches,
    addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      listeners.push(listener);
    },
    removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    },
  };
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: () => query,
  });
  return { query, listeners };
}

function marker(container: HTMLElement) {
  return container.querySelector('[aria-hidden="true"]') as HTMLElement;
}

describe('WorkStatus', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ['idle', 'Idle', '○'],
    ['running', 'Running', '▶'],
    ['waiting', 'Waiting', '⏸'],
    ['completed', 'Completed', '✓'],
    ['error', 'Error', '!'],
    ['stopped', 'Stopped', '■'],
    ['stale', 'Stale', '◌'],
  ] as const)('renders %s with a text and glyph distinction', (status, label, icon) => {
    mockMatchMedia(false);
    const { container } = render(<WorkStatus status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(marker(container)).toHaveTextContent(icon);
    expect(screen.getByRole('status')).toHaveAttribute('data-status', status);
  });

  it('pulses only while running work is shared with a fresh heartbeat', () => {
    mockMatchMedia(false);
    const { container, rerender } = render(<WorkStatus status="running" sharingFresh />);
    expect(marker(container)).toHaveClass('animate-pulse');

    rerender(<WorkStatus status="running" sharingFresh={false} />);
    expect(marker(container)).not.toHaveClass('animate-pulse');
    rerender(<WorkStatus status="completed" sharingFresh />);
    expect(marker(container)).not.toHaveClass('animate-pulse');
    rerender(<WorkStatus status="stale" sharingFresh />);
    expect(marker(container)).not.toHaveClass('animate-pulse');
  });

  it('swaps to a static marker when reduced motion changes live', () => {
    const { query, listeners } = mockMatchMedia(false);
    const { container } = render(<WorkStatus status="running" sharingFresh />);
    expect(marker(container)).toHaveClass('animate-pulse');

    act(() => {
      query.matches = true;
      listeners.forEach(listener => listener({ matches: true }));
    });
    expect(marker(container)).not.toHaveClass('animate-pulse');

    act(() => {
      query.matches = false;
      listeners.forEach(listener => listener({ matches: false }));
    });
    expect(marker(container)).toHaveClass('animate-pulse');
  });

  it('keeps the canonical status accessible when a display label is provided', () => {
    mockMatchMedia(false);
    render(<WorkStatus status="waiting" label="Needs your input" />);
    expect(screen.getByText('Needs your input')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveAccessibleName('Waiting: Needs your input');
  });
});

describe('workPauseLabel', () => {
  it('uses the run-card vocabulary and only for a waiting status', () => {
    expect(workPauseLabel('waiting', { reason: 'awaiting_approval', step: 'Approve' })).toBe('Needs approval');
    expect(workPauseLabel('waiting', { reason: 'paused_at_breakpoint', step: 'write' })).toBe('Paused at write');
    expect(workPauseLabel('waiting', { reason: 'paused_at_breakpoint' })).toBe('Paused');
    expect(workPauseLabel('waiting')).toBeUndefined();
    expect(workPauseLabel('running', { reason: 'paused_at_breakpoint', step: 'write' })).toBeUndefined();
  });
});

