import { render, screen } from '@testing-library/react';
import { TranscriptOverlay, type CaptionLine } from '../TranscriptOverlay';

// Fixed clock so age-based opacity is deterministic.
const NOW = new Date('2026-05-28T20:00:00Z').getTime();

function line(partial: Partial<CaptionLine> & { id: string; speakerId: string }): CaptionLine {
  return {
    text: 'hello world',
    at: new Date(NOW).toISOString(),
    ...partial,
  };
}

describe('TranscriptOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders null when lines is empty', () => {
    const { container } = render(<TranscriptOverlay lines={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when every visible line floors above 0.35 but the slice is empty', () => {
    // Note: the floor is 0.35, so a line never has opacity 0 if it makes
    // it into the slice. The only way to render nothing with non-empty
    // input is if the slice is empty (lines.length === 0), already
    // covered above. Sanity-check that very-old lines still surface at
    // the floor.
    const old = line({ id: 'a', speakerId: 's1', at: new Date(NOW - 60_000).toISOString() });
    render(<TranscriptOverlay lines={[old]} />);
    expect(screen.getByLabelText('Live transcript')).toBeInTheDocument();
  });

  it('renders at most maxLines (default 3) — older lines are sliced off', () => {
    const lines: CaptionLine[] = Array.from({ length: 5 }, (_, i) =>
      line({ id: `id-${i}`, speakerId: 's1', text: `line ${i}` }),
    );
    render(<TranscriptOverlay lines={lines} />);
    // slice(-3) → last 3
    expect(screen.queryByText('line 0')).not.toBeInTheDocument();
    expect(screen.queryByText('line 1')).not.toBeInTheDocument();
    expect(screen.getByText('line 2')).toBeInTheDocument();
    expect(screen.getByText('line 3')).toBeInTheDocument();
    expect(screen.getByText('line 4')).toBeInTheDocument();
  });

  it('honors a caller-supplied maxLines', () => {
    const lines: CaptionLine[] = Array.from({ length: 4 }, (_, i) =>
      line({ id: `id-${i}`, speakerId: 's1', text: `line ${i}` }),
    );
    render(<TranscriptOverlay lines={lines} maxLines={2} />);
    expect(screen.queryByText('line 0')).not.toBeInTheDocument();
    expect(screen.queryByText('line 1')).not.toBeInTheDocument();
    expect(screen.getByText('line 2')).toBeInTheDocument();
    expect(screen.getByText('line 3')).toBeInTheDocument();
  });

  it('assigns the same color to two lines with the same speakerId (deterministic)', () => {
    const a = line({ id: '1', speakerId: 'alice', speakerName: 'Alice', text: 'one' });
    const b = line({ id: '2', speakerId: 'alice', speakerName: 'Alice', text: 'two' });
    render(<TranscriptOverlay lines={[a, b]} />);
    const colorA = (screen.getAllByText('Alice')[0] as HTMLElement).style.color;
    const colorB = (screen.getAllByText('Alice')[1] as HTMLElement).style.color;
    expect(colorA).toBeTruthy();
    expect(colorA).toBe(colorB);
  });

  it('assigns different colors when two speakerIds land in different hash buckets', () => {
    // Search for a second speakerId whose hash mod 6 differs from "alice"'s.
    // The deterministic hash ensures one of these candidates differs.
    const candidates = ['bob', 'carol', 'dave', 'eve', 'frank', 'grace'];
    const a = line({ id: '1', speakerId: 'alice', speakerName: 'Alice' });
    let other = candidates[0];
    for (const c of candidates) {
      const b = line({ id: '2', speakerId: c, speakerName: 'Other' });
      const { unmount } = render(<TranscriptOverlay lines={[a, b]} />);
      const colorA = (screen.getByText('Alice') as HTMLElement).style.color;
      const colorB = (screen.getByText('Other') as HTMLElement).style.color;
      unmount();
      if (colorA !== colorB) {
        other = c;
        break;
      }
    }
    // Re-render with the differing pair and assert.
    const b = line({ id: '2', speakerId: other!, speakerName: 'Other' });
    render(<TranscriptOverlay lines={[a, b]} />);
    const colorA = (screen.getByText('Alice') as HTMLElement).style.color;
    const colorB = (screen.getByText('Other') as HTMLElement).style.color;
    expect(colorA).not.toBe(colorB);
  });

  it('applies italic class when line.interim is true', () => {
    const interimLine = line({ id: '1', speakerId: 's1', text: 'partial...', interim: true });
    const finalLine = line({ id: '2', speakerId: 's1', text: 'finished.' });
    render(<TranscriptOverlay lines={[interimLine, finalLine]} />);
    const interimRow = screen.getByText('partial...').parentElement!;
    const finalRow = screen.getByText('finished.').parentElement!;
    expect(interimRow.className).toContain('italic');
    expect(finalRow.className).not.toContain('italic');
  });

  it('falls back to speakerId.slice(0,6) when speakerName is missing', () => {
    const l = line({ id: '1', speakerId: 'speakerXYZ123', text: 'hi' });
    render(<TranscriptOverlay lines={[l]} />);
    expect(screen.getByText('speake')).toBeInTheDocument();
  });

  it('emits aria-live="polite" and aria-label on the overlay band', () => {
    const l = line({ id: '1', speakerId: 's1' });
    render(<TranscriptOverlay lines={[l]} />);
    const band = screen.getByLabelText('Live transcript');
    expect(band).toHaveAttribute('aria-live', 'polite');
  });

  it('opacity decays with age — fresh ~1.0, half-aged ~0.5, very old floors at 0.35', () => {
    const fade = 8000;
    const fresh = line({ id: '1', speakerId: 's1', text: 'fresh', at: new Date(NOW).toISOString() });
    const halfAged = line({
      id: '2', speakerId: 's1', text: 'half',
      at: new Date(NOW - fade / 2).toISOString(),
    });
    const veryOld = line({
      id: '3', speakerId: 's1', text: 'old',
      at: new Date(NOW - fade * 4).toISOString(),
    });
    render(<TranscriptOverlay lines={[fresh, halfAged, veryOld]} fadeAfterMs={fade} />);
    const freshOpacity = parseFloat((screen.getByText('fresh').parentElement as HTMLElement).style.opacity);
    const halfOpacity = parseFloat((screen.getByText('half').parentElement as HTMLElement).style.opacity);
    const oldOpacity = parseFloat((screen.getByText('old').parentElement as HTMLElement).style.opacity);
    expect(freshOpacity).toBeCloseTo(1, 5);
    expect(halfOpacity).toBeCloseTo(0.5, 5);
    expect(oldOpacity).toBeCloseTo(0.35, 5);
  });
});

// The `now` prop is the injectable-clock seam (same convention as
// `RunFilterCriteria.now` in pipelines/runsUtils.ts). Everything below runs
// on the REAL clock on purpose: the point of the prop is that a fixture of
// fixed ISO timestamps produces a reproducible fade ramp without any
// system-time mocking, which is what stories need and cannot do.
describe('TranscriptOverlay — injected clock (now prop)', () => {
  const FIXED = Date.parse('2020-01-01T00:00:00.000Z');

  function at(msAgo: number): string {
    return new Date(FIXED - msAgo).toISOString();
  }

  function opacityOf(text: string): number {
    return parseFloat((screen.getByText(text).parentElement as HTMLElement).style.opacity);
  }

  it('measures line age against the injected now instead of Date.now()', () => {
    render(
      <TranscriptOverlay
        now={FIXED}
        fadeAfterMs={8000}
        lines={[
          { id: '1', speakerId: 's1', text: 'fresh', at: at(0) },
          { id: '2', speakerId: 's1', text: 'half', at: at(4000) },
          { id: '3', speakerId: 's1', text: 'floored', at: at(60_000) },
        ]}
      />,
    );
    expect(opacityOf('fresh')).toBeCloseTo(1, 5);
    expect(opacityOf('half')).toBeCloseTo(0.5, 5);
    expect(opacityOf('floored')).toBeCloseTo(0.35, 5);
  });

  it('without `now`, the same fixed-timestamp fixture collapses onto the floor', () => {
    // This is the bug the prop exists to fix: a 2020 fixture is ~years old
    // against the real clock, so every line clamps and the ramp is untestable.
    render(
      <TranscriptOverlay
        fadeAfterMs={8000}
        lines={[
          { id: '1', speakerId: 's1', text: 'a', at: at(0) },
          { id: '2', speakerId: 's1', text: 'b', at: at(4000) },
        ]}
      />,
    );
    expect(opacityOf('a')).toBeCloseTo(0.35, 5);
    expect(opacityOf('b')).toBeCloseTo(0.35, 5);
  });

  it('reads the same for the same inputs across renders (no wall-clock drift)', () => {
    const lines = [{ id: '1', speakerId: 's1', text: 'line', at: at(2000) }];
    const first = render(<TranscriptOverlay now={FIXED} fadeAfterMs={8000} lines={lines} />);
    const a = opacityOf('line');
    first.unmount();
    render(<TranscriptOverlay now={FIXED} fadeAfterMs={8000} lines={lines} />);
    expect(opacityOf('line')).toBe(a);
    expect(a).toBeCloseTo(0.75, 5);
  });

  it('now interacts with fadeAfterMs — a longer window keeps an old line brighter', () => {
    const lines = [{ id: '1', speakerId: 's1', text: 'line', at: at(6000) }];
    const short = render(<TranscriptOverlay now={FIXED} fadeAfterMs={8000} lines={lines} />);
    // 1 - 6000/8000 = 0.25, below the 0.35 floor.
    expect(opacityOf('line')).toBeCloseTo(0.35, 5);
    short.unmount();

    render(<TranscriptOverlay now={FIXED} fadeAfterMs={60_000} lines={lines} />);
    expect(opacityOf('line')).toBeCloseTo(0.9, 5);
  });
});
