import { render, screen, fireEvent } from '@testing-library/react';
import { RecordingList, type RecordingListItem } from '../RecordingList';

function rec(overrides: Partial<RecordingListItem> & { id: string }): RecordingListItem {
  return {
    startIso: '2026-05-22T15:30:00Z',
    endIso: '2026-05-22T16:00:00Z',
    durationSec: 1800,
    ...overrides,
  };
}

describe('RecordingList', () => {
  it('renders exactly 3 pulsing skeleton cards when loading', () => {
    const { container } = render(
      <RecordingList recordings={[]} loading onSelect={() => {}} />,
    );
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
    // No real row buttons in the skeleton view.
    expect(screen.queryAllByTestId('recording-row')).toHaveLength(0);
  });

  it('renders the default empty message when recordings is empty', () => {
    render(<RecordingList recordings={[]} onSelect={() => {}} />);
    expect(screen.getByText('No recordings yet.')).toBeInTheDocument();
  });

  it('honors a caller-supplied emptyState override', () => {
    render(
      <RecordingList
        recordings={[]}
        onSelect={() => {}}
        emptyState={<span>Nothing here, friend.</span>}
      />,
    );
    expect(screen.getByText('Nothing here, friend.')).toBeInTheDocument();
    expect(screen.queryByText('No recordings yet.')).not.toBeInTheDocument();
  });

  it('renders one button per recording with the recording-id data attribute', () => {
    const items = [rec({ id: 'a' }), rec({ id: 'b' }), rec({ id: 'c' })];
    render(<RecordingList recordings={items} onSelect={() => {}} />);
    const rows = screen.getAllByTestId('recording-row');
    expect(rows).toHaveLength(3);
    expect(rows[0]).toHaveAttribute('data-recording-id', 'a');
    expect(rows[1]).toHaveAttribute('data-recording-id', 'b');
    expect(rows[2]).toHaveAttribute('data-recording-id', 'c');
  });

  it('marks the selected row aria-pressed=true with the selection ring; others false', () => {
    const items = [rec({ id: 'a' }), rec({ id: 'b' })];
    render(<RecordingList recordings={items} selectedId="b" onSelect={() => {}} />);
    const rows = screen.getAllByTestId('recording-row');
    expect(rows[0]).toHaveAttribute('aria-pressed', 'false');
    expect(rows[1]).toHaveAttribute('aria-pressed', 'true');
    // Selection ring class is `ring-[var(--color-primary)]/40` — the
    // focus-visible ring uses a different color and only applies on
    // keyboard focus, so we assert on the selection-specific token.
    expect(rows[1].className).toContain('ring-[var(--color-primary)]/40');
    expect(rows[0].className).not.toContain('ring-[var(--color-primary)]/40');
  });

  it('fires onSelect with the clicked row id', () => {
    const onSelect = vi.fn();
    const items = [rec({ id: 'a' }), rec({ id: 'b' })];
    render(<RecordingList recordings={items} onSelect={onSelect} />);
    fireEvent.click(screen.getAllByTestId('recording-row')[1]!);
    expect(onSelect).toHaveBeenCalledWith('b');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('formats durations: seconds-only, minutes+seconds, hours+minutes, and "—" for negative/NaN', () => {
    const items = [
      rec({ id: 's', durationSec: 42 }),
      rec({ id: 'm', durationSec: 75 }),
      rec({ id: 'h', durationSec: 3661 }),
      rec({ id: 'neg', durationSec: -5 }),
      rec({ id: 'nan', durationSec: NaN }),
    ];
    render(<RecordingList recordings={items} onSelect={() => {}} />);
    expect(screen.getByText('42s')).toBeInTheDocument();
    expect(screen.getByText('1m 15s')).toBeInTheDocument();
    expect(screen.getByText('1h 1m')).toBeInTheDocument();
    // Both negative and NaN render "—" → 2 occurrences.
    expect(screen.getAllByText('—')).toHaveLength(2);
  });

  it('renders thumbnail img when thumbnailUrl is set; play-icon fallback when not', () => {
    const items = [
      rec({ id: 'with', thumbnailUrl: 'https://x/t.png' }),
      rec({ id: 'without' }),
    ];
    const { container } = render(<RecordingList recordings={items} onSelect={() => {}} />);
    const withRow = container.querySelector('[data-recording-id="with"]')!;
    const withoutRow = container.querySelector('[data-recording-id="without"]')!;
    expect(withRow.querySelector('img[src="https://x/t.png"]')).not.toBeNull();
    // Fallback play-icon svg present where there's no img.
    expect(withoutRow.querySelector('img')).toBeNull();
    expect(withoutRow.querySelector('svg')).not.toBeNull();
  });

  it('participant-count badge renders only when count > 0', () => {
    const items = [
      rec({ id: 'has', participantCount: 4 }),
      rec({ id: 'zero', participantCount: 0 }),
      rec({ id: 'missing' }),
    ];
    render(<RecordingList recordings={items} onSelect={() => {}} />);
    // Asserted on the badge's accessible description rather than on "4 👥":
    // the emoji was an ICON standing next to the count, and it is a glyph now.
    expect(screen.getByTitle('4 people in this call')).toBeInTheDocument();
    expect(screen.queryByTitle(/0 (person|people) in this call/)).not.toBeInTheDocument();
  });

  it('uses label as the title and a small line below for the start time when label is set', () => {
    const items = [rec({ id: 'a', label: 'Team standup' })];
    render(<RecordingList recordings={items} onSelect={() => {}} />);
    expect(screen.getByText('Team standup')).toBeInTheDocument();
    // Start-time secondary line is present too (some locale-specific string;
    // assert by structure: the row should have at least two text-bearing
    // spans beyond the duration badge).
    const row = screen.getByTestId('recording-row');
    expect(row.querySelectorAll('div').length).toBeGreaterThan(1);
  });

  it('falls back to formatted start time as the title when no label is set', () => {
    const items = [rec({ id: 'a', startIso: '2026-05-22T15:30:00Z' })];
    render(<RecordingList recordings={items} onSelect={() => {}} />);
    // The label render slot is the only place using `formatStart`; with
    // no label, this slot must render a non-empty string that is NOT
    // the duration "30m 0s".
    const row = screen.getByTestId('recording-row');
    const title = row.querySelector('span.text-sm.font-medium')!;
    expect(title.textContent).toBeTruthy();
    expect(title.textContent).not.toBe('30m 0s');
  });
});
