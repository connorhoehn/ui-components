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
});
