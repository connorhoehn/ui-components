import { render, screen, fireEvent } from '@testing-library/react';
import { RecordingRow } from '../RecordingRow';

const baseProps = {
  id: 'rec-1',
  startIso: '2026-05-22T15:30:00Z',
  endIso: '2026-05-22T16:00:00Z',
  durationSec: 1800,
};

describe('RecordingRow', () => {
  it('renders as a button-role with aria-pressed when interactive', () => {
    render(<RecordingRow {...baseProps} onClick={() => {}} />);
    const row = screen.getByTestId('recording-row');
    expect(row).toHaveAttribute('role', 'button');
    expect(row).toHaveAttribute('tabindex', '0');
    expect(row).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders as a plain div with no role/tabindex when no onClick is provided', () => {
    render(<RecordingRow {...baseProps} />);
    const row = screen.getByTestId('recording-row');
    expect(row).not.toHaveAttribute('role');
    expect(row).not.toHaveAttribute('tabindex');
    expect(row).not.toHaveAttribute('aria-pressed');
  });

  it('aria-pressed reflects the selected prop', () => {
    render(<RecordingRow {...baseProps} onClick={() => {}} selected />);
    const row = screen.getByTestId('recording-row');
    expect(row).toHaveAttribute('aria-pressed', 'true');
    expect(row.className).toContain('ring-[var(--color-primary)]/40');
  });

  it('fires onClick with id when clicked or Enter/Space is pressed', () => {
    const onClick = vi.fn();
    render(<RecordingRow {...baseProps} onClick={onClick} />);
    const row = screen.getByTestId('recording-row');
    fireEvent.click(row);
    expect(onClick).toHaveBeenLastCalledWith('rec-1');
    fireEvent.keyDown(row, { key: 'Enter' });
    expect(onClick).toHaveBeenLastCalledWith('rec-1');
    fireEvent.keyDown(row, { key: ' ' });
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it('does not fire onClick on unrelated keys', () => {
    const onClick = vi.fn();
    render(<RecordingRow {...baseProps} onClick={onClick} />);
    fireEvent.keyDown(screen.getByTestId('recording-row'), { key: 'a' });
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders the status badge only for processing/failed', () => {
    const { rerender } = render(<RecordingRow {...baseProps} />);
    expect(screen.queryByTestId('recording-row-status')).not.toBeInTheDocument();

    rerender(<RecordingRow {...baseProps} status="processing" />);
    const processing = screen.getByTestId('recording-row-status');
    expect(processing).toHaveAttribute('data-status', 'processing');
    expect(processing.textContent).toContain('Processing');

    rerender(<RecordingRow {...baseProps} status="failed" />);
    const failed = screen.getByTestId('recording-row-status');
    expect(failed).toHaveAttribute('data-status', 'failed');
    expect(failed.textContent).toContain('Failed');
  });

  it('exposes data-status on the row for both ready (default) and explicit states', () => {
    const { rerender } = render(<RecordingRow {...baseProps} />);
    expect(screen.getByTestId('recording-row')).toHaveAttribute('data-status', 'ready');
    rerender(<RecordingRow {...baseProps} status="processing" />);
    expect(screen.getByTestId('recording-row')).toHaveAttribute('data-status', 'processing');
  });

  it('renders the actions slot when provided and stops click propagation', () => {
    const onClick = vi.fn();
    const onAction = vi.fn();
    render(
      <RecordingRow
        {...baseProps}
        onClick={onClick}
        actions={
          <button type="button" onClick={onAction}>
            Download
          </button>
        }
      />,
    );
    const slot = screen.getByTestId('recording-row-actions');
    expect(slot).toBeInTheDocument();

    // Clicking the action button must not trigger the row click.
    fireEvent.click(screen.getByText('Download'));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders thumbnail when provided and falls back to play icon when not', () => {
    const { container, rerender } = render(
      <RecordingRow {...baseProps} thumbnailUrl="https://x/t.png" />,
    );
    expect(container.querySelector('img[src="https://x/t.png"]')).not.toBeNull();

    rerender(<RecordingRow {...baseProps} />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('uses the label as the title and shows start-time on a second line; falls back to start-time when no label', () => {
    const { rerender } = render(
      <RecordingRow {...baseProps} label="Team standup" />,
    );
    expect(screen.getByText('Team standup')).toBeInTheDocument();

    rerender(<RecordingRow {...baseProps} />);
    const row = screen.getByTestId('recording-row');
    const title = row.querySelector('span.text-sm.font-medium')!;
    expect(title.textContent).toBeTruthy();
    expect(title.textContent).not.toBe('30m 0s');
  });

  it('formats duration for seconds-only, minutes+seconds, hours+minutes, and "—" for negative/NaN', () => {
    const cases: Array<[number, string]> = [
      [42, '42s'],
      [75, '1m 15s'],
      [3661, '1h 1m'],
      [-5, '—'],
      [NaN, '—'],
    ];
    for (const [sec, expected] of cases) {
      const { unmount } = render(
        <RecordingRow {...baseProps} id={`d-${sec}`} durationSec={sec} />,
      );
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders participant-count badge only when count > 0', () => {
    // On the badge's own description, not on "4 👥": the emoji was an ICON
    // beside the count and is a glyph now, so the count is the only text.
    const { rerender } = render(<RecordingRow {...baseProps} participantCount={4} />);
    expect(screen.getByTitle('4 people in this call')).toBeInTheDocument();
    rerender(<RecordingRow {...baseProps} participantCount={0} />);
    expect(screen.queryByTitle(/in this call/)).not.toBeInTheDocument();
    rerender(<RecordingRow {...baseProps} />);
    expect(screen.queryByTitle(/in this call/)).not.toBeInTheDocument();
  });
});

// The host's recordings list carries id/startIso/endIso/durationSec/label/
// thumbnailUrl/participantCount/status and nothing else — no participants
// array, no tags, no reactions. Renders of that exact shape are what the
// page actually does, so they are what is pinned here.
describe('RecordingRow with the minimal host item shape', () => {
  it('renders a row from exactly the fields the host sends', () => {
    render(
      <RecordingRow
        id="rec-9"
        startIso="2026-09-21T18:04:00Z"
        durationSec={912}
        label="Hank & Alice"
        thumbnailUrl="blob:thumb"
        participantCount={2}
        status="ready"
      />,
    );
    expect(screen.getByTestId('recording-row')).toHaveAttribute('data-recording-id', 'rec-9');
    expect(screen.getByText('Hank & Alice')).toBeInTheDocument();
    expect(screen.getByText('15m 12s')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders with every optional field absent', () => {
    render(<RecordingRow id="rec-10" startIso="2026-09-21T18:04:00Z" durationSec={0} />);
    expect(screen.getByTestId('recording-row')).toBeInTheDocument();
  });
});
