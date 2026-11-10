import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LogStream, { TerminalLog, type LogLine } from '../LogStream';

const sample: LogLine[] = [
  { id: 'l1', timestamp: '10:00:01', level: 'info', source: 'auth', message: 'Server started' },
  { id: 'l2', timestamp: '10:00:02', level: 'warn', source: 'auth', message: 'Cache miss' },
  { id: 'l3', timestamp: '10:00:03', level: 'error', source: 'db', message: 'Connection refused' },
  { id: 'l4', timestamp: '10:00:04', level: 'debug', message: 'Probe ok' },
];

describe('LogStream', () => {
  it('renders all lines with timestamp, level, source, message', () => {
    render(<LogStream lines={sample} />);
    expect(screen.getByText('Server started')).toBeInTheDocument();
    expect(screen.getByText('Cache miss')).toBeInTheDocument();
    expect(screen.getByText('Connection refused')).toBeInTheDocument();
    expect(screen.getAllByTestId('log-stream-line')).toHaveLength(4);
    expect(screen.getByText('10:00:02')).toBeInTheDocument();
    expect(screen.getAllByText('[auth]')).toHaveLength(2);
    expect(screen.getByText('[db]')).toBeInTheDocument();
  });

  it('renders level glyphs', () => {
    render(<LogStream lines={sample} />);
    expect(screen.getByText('INFO')).toBeInTheDocument();
    expect(screen.getByText('WARN')).toBeInTheDocument();
    expect(screen.getByText('ERROR')).toBeInTheDocument();
    expect(screen.getByText('DEBUG')).toBeInTheDocument();
  });

  it('renders default empty state when lines is empty', () => {
    render(<LogStream lines={[]} />);
    expect(screen.getByText('No log lines yet.')).toBeInTheDocument();
    expect(screen.queryAllByTestId('log-stream-line')).toHaveLength(0);
  });

  it('shows the line count chip in the header', () => {
    render(<LogStream lines={sample} />);
    expect(screen.getByTestId('log-stream-count').textContent).toBe('4 lines');
  });

  it('singularizes the line count for exactly one line', () => {
    render(<LogStream lines={[sample[0]]} />);
    expect(screen.getByTestId('log-stream-count').textContent).toBe('1 line');
  });

  it('omits header when title is null', () => {
    render(<LogStream lines={sample} title={null} />);
    expect(screen.queryByText('Log stream')).not.toBeInTheDocument();
  });

  it('uses a custom title', () => {
    render(<LogStream lines={sample} title="Pipeline output" />);
    expect(screen.getByText('Pipeline output')).toBeInTheDocument();
  });

  it('renders a Clear button only when onClear is provided', () => {
    const { rerender } = render(<LogStream lines={sample} />);
    expect(screen.queryByTestId('log-stream-clear')).not.toBeInTheDocument();
    const onClear = vi.fn();
    rerender(<LogStream lines={sample} onClear={onClear} />);
    fireEvent.click(screen.getByTestId('log-stream-clear'));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('honors showTimestamp/showLevel/showSource toggles', () => {
    render(
      <LogStream
        lines={[sample[0]]}
        showTimestamp={false}
        showLevel={false}
        showSource={false}
      />,
    );
    expect(screen.queryByText('10:00:01')).not.toBeInTheDocument();
    expect(screen.queryByText('INFO')).not.toBeInTheDocument();
    expect(screen.queryByText('[auth]')).not.toBeInTheDocument();
    expect(screen.getByText('Server started')).toBeInTheDocument();
  });

  it('marks each line with its data-level attribute', () => {
    render(<LogStream lines={sample} />);
    const lines = screen.getAllByTestId('log-stream-line');
    expect(lines[0].getAttribute('data-level')).toBe('info');
    expect(lines[2].getAttribute('data-level')).toBe('error');
  });

  it('exposes the log container as a polite live region when following', () => {
    render(<LogStream lines={sample} />);
    const scroll = screen.getByTestId('log-stream-scroll');
    expect(scroll.getAttribute('role')).toBe('log');
    expect(scroll.getAttribute('aria-live')).toBe('polite');
  });

  it('disables the live region when follow=false', () => {
    render(<LogStream lines={sample} follow={false} />);
    expect(screen.getByTestId('log-stream-scroll').getAttribute('aria-live')).toBe('off');
  });

  it('uses a custom data-testid', () => {
    render(<LogStream lines={sample} data-testid="my-log" />);
    expect(screen.getByTestId('my-log')).toBeInTheDocument();
    expect(screen.getByTestId('my-log-count').textContent).toBe('4 lines');
  });

  it('TerminalLog is an alias for LogStream', () => {
    expect(TerminalLog).toBe(LogStream);
  });

  it('uses the dark console classes by default (tone="code")', () => {
    render(<LogStream lines={sample} />);
    const scroll = screen.getByTestId('log-stream-scroll');
    expect(scroll).toHaveClass('bg-[var(--color-surface-subtle,#0b1020)]');
    expect(scroll).not.toHaveClass('bg-surface-inset');
  });

  it('applies the surface classes when tone="surface"', () => {
    render(<LogStream lines={sample} tone="surface" />);
    const scroll = screen.getByTestId('log-stream-scroll');
    expect(scroll).toHaveClass('bg-surface-inset', 'text-text-primary');
    expect(scroll).not.toHaveClass('bg-[var(--color-surface-subtle,#0b1020)]');
  });

  it('paints the outer Card with bg-surface by default (tone="code")', () => {
    render(<LogStream lines={sample} />);
    expect(screen.getByTestId('log-stream')).toHaveClass('bg-surface');
  });

  it('strips bg-surface off the outer Card when tone="transparent" — the Card sits behind the scroll region and would otherwise show through it as an opaque slab', () => {
    render(<LogStream lines={sample} tone="transparent" />);
    const card = screen.getByTestId('log-stream');
    expect(card).not.toHaveClass('bg-surface');
    expect(card).toHaveClass('bg-transparent');
  });
});

// ---------------------------------------------------------------------------
// Crash resistance — unknown level values
//
// `LogLine.level` is a four-value TS union, but the type is erased at runtime
// and log lines arrive from a host API or a gateway socket. A server emitting
// `trace`, `fatal` or an upper-case `WARN` used to make `LEVEL_LABEL[level]`
// undefined, and the `.toLowerCase()` on it threw — unmounting the entire
// stream, so ALL lines vanished because of one unrecognised level.
// ---------------------------------------------------------------------------
describe('LogStream — unrecognised level values', () => {
  const withUnknown = [
    { id: 'u1', timestamp: '10:00:01', level: 'info', source: 'auth', message: 'Server started' },
    // Not in the union — this is the malformed row.
    { id: 'u2', timestamp: '10:00:02', level: 'trace', source: 'auth', message: 'Entering handler' },
    { id: 'u3', timestamp: '10:00:03', level: 'error', source: 'db', message: 'Connection refused' },
  ] as unknown as LogLine[];

  it('renders the well-formed lines alongside a line with an unknown level', () => {
    render(<LogStream lines={withUnknown} />);
    // The good data survives — this is what the crash used to destroy.
    expect(screen.getByText('Server started')).toBeInTheDocument();
    expect(screen.getByText('Connection refused')).toBeInTheDocument();
    expect(screen.getAllByTestId('log-stream-line')).toHaveLength(3);
  });

  it('renders the unknown level AS ITSELF rather than dropping or blanking it', () => {
    render(<LogStream lines={withUnknown} />);
    expect(screen.getByText('Entering handler')).toBeInTheDocument();
    // Degrades to the raw value, upper-cased like the known labels.
    expect(screen.getByText('TRACE')).toBeInTheDocument();
    expect(screen.getByLabelText('level trace')).toBeInTheDocument();
  });

  it('survives a non-string level (a number leaking out of a JSON payload)', () => {
    const numeric = [
      { id: 'n1', level: 3, message: 'numeric level' },
      { id: 'n2', level: 'warn', message: 'still here' },
    ] as unknown as LogLine[];
    render(<LogStream lines={numeric} />);
    expect(screen.getByText('still here')).toBeInTheDocument();
    expect(screen.getByText('numeric level')).toBeInTheDocument();
  });
});

describe('LogStream labels on the scale (2.515.12)', () => {
  it('level labels are 11px (were 10px) and take the -fg text tokens', () => {
    render(<LogStream lines={[{ id: 'w', level: 'warn', message: 'careful' }, { id: 'e', level: 'error', message: 'bad' }, { id: 'i', level: 'info', message: 'fine' }]} />);
    const warn = screen.getByLabelText('level warn');
    expect(warn).toHaveClass('text-[11px]');
    expect(warn.className).toContain('--color-warning-fg');
    expect(warn.className).not.toMatch(/--color-warning[,)]/);
    expect(screen.getByLabelText('level error').className).toContain('--color-danger-fg');
    expect(screen.getByLabelText('level info').className).toContain('--color-info-fg');
    expect(document.body.innerHTML).not.toContain('text-[10px]');
  });
});
