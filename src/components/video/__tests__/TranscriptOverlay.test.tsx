import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
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

  it('lines inside the visible window surface at the 0.35 floor; fully-faded lines drop', () => {
    // Within fadeAfterMs * 1.6 (default 12.8s) a stale line clamps to the
    // floor instead of vanishing…
    const stale = line({ id: 'a', speakerId: 's1', at: new Date(NOW - 10_000).toISOString() });
    const first = render(<TranscriptOverlay lines={[stale]} />);
    expect(screen.getByLabelText('Live transcript')).toBeInTheDocument();
    first.unmount();

    // …but past the extended window it is removed from the DOM entirely —
    // the ticker never lingers at the floor forever.
    const gone = line({ id: 'b', speakerId: 's1', at: new Date(NOW - 60_000).toISOString() });
    const { container } = render(<TranscriptOverlay lines={[gone]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders at most maxLines (default 4) — older lines are sliced off', () => {
    const lines: CaptionLine[] = Array.from({ length: 6 }, (_, i) =>
      line({ id: `id-${i}`, speakerId: 's1', text: `line ${i}` }),
    );
    render(<TranscriptOverlay lines={lines} />);
    // slice(-4) → last 4
    expect(screen.queryByText('line 0')).not.toBeInTheDocument();
    expect(screen.queryByText('line 1')).not.toBeInTheDocument();
    expect(screen.getByText('line 2')).toBeInTheDocument();
    expect(screen.getByText('line 3')).toBeInTheDocument();
    expect(screen.getByText('line 4')).toBeInTheDocument();
    expect(screen.getByText('line 5')).toBeInTheDocument();
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

  it('opacity decays with age — fresh ~1.0, half-aged ~0.5, stale (within window) floors at 0.35', () => {
    const fade = 8000;
    const fresh = line({ id: '1', speakerId: 's1', text: 'fresh', at: new Date(NOW).toISOString() });
    const halfAged = line({
      id: '2', speakerId: 's1', text: 'half',
      at: new Date(NOW - fade / 2).toISOString(),
    });
    // 1.5× the fade window: past the 0.35-floor crossover but still inside
    // the 1.6× drop window, so it renders at the floor.
    const stale = line({
      id: '3', speakerId: 's1', text: 'old',
      at: new Date(NOW - fade * 1.5).toISOString(),
    });
    render(<TranscriptOverlay lines={[fresh, halfAged, stale]} fadeAfterMs={fade} />);
    const freshOpacity = parseFloat((screen.getByText('fresh').parentElement as HTMLElement).style.opacity);
    const halfOpacity = parseFloat((screen.getByText('half').parentElement as HTMLElement).style.opacity);
    const oldOpacity = parseFloat((screen.getByText('old').parentElement as HTMLElement).style.opacity);
    expect(freshOpacity).toBeCloseTo(1, 5);
    expect(halfOpacity).toBeCloseTo(0.5, 5);
    expect(oldOpacity).toBeCloseTo(0.35, 5);
  });

  it('applies the entrance animation class to newly-added lines', () => {
    const first = line({ id: '1', speakerId: 's1', text: 'first' });
    const { rerender } = render(<TranscriptOverlay lines={[first]} />);
    expect(screen.getByText('first').parentElement!.className).toContain('transcript-line-enter');

    const second = line({ id: '2', speakerId: 's2', text: 'second' });
    rerender(<TranscriptOverlay lines={[first, second]} />);
    // The class is present on every line element; because each line keeps a
    // stable key, the CSS animation only plays when the element first mounts.
    expect(screen.getByText('second').parentElement!.className).toContain('transcript-line-enter');
  });
});

describe('TranscriptOverlay — live fade interval', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('progresses the ghost fade between prop changes via the ~500ms tick', () => {
    const fade = 8000;
    const l = line({ id: '1', speakerId: 's1', text: 'ticking' });
    render(<TranscriptOverlay lines={[l]} fadeAfterMs={fade} />);
    expect(parseFloat((screen.getByText('ticking').parentElement as HTMLElement).style.opacity)).toBeCloseTo(1, 5);

    // 4s of fake time = half the fade window; the interval re-renders and
    // the opacity halves without any prop change.
    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(parseFloat((screen.getByText('ticking').parentElement as HTMLElement).style.opacity)).toBeCloseTo(0.5, 1);
  });

  it('drops fully-faded lines from the DOM as the interval ticks', () => {
    const fade = 1000;
    const l = line({ id: '1', speakerId: 's1', text: 'ephemeral' });
    const { container } = render(<TranscriptOverlay lines={[l]} fadeAfterMs={fade} />);
    expect(screen.getByText('ephemeral')).toBeInTheDocument();

    // Past fadeAfterMs * 1.6 the line is removed even though the `lines`
    // prop still contains it.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('ephemeral')).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it('starts an interval while lines exist and cleans it up on unmount', () => {
    const l = line({ id: '1', speakerId: 's1' });
    const { unmount } = render(<TranscriptOverlay lines={[l]} />);
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('tears the interval down when the line list empties', () => {
    const l = line({ id: '1', speakerId: 's1' });
    const { rerender } = render(<TranscriptOverlay lines={[l]} />);
    expect(vi.getTimerCount()).toBe(1);
    rerender(<TranscriptOverlay lines={[]} />);
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not run the interval when the `now` override is provided', () => {
    const l = line({ id: '1', speakerId: 's1' });
    render(<TranscriptOverlay lines={[l]} now={NOW} />);
    expect(vi.getTimerCount()).toBe(0);
  });
});

describe('TranscriptOverlay — entrance animation CSS', () => {
  const css = readFileSync(resolve(__dirname, '../../../styles.css'), 'utf8');

  it('defines the pop keyframes with the 8px rise', () => {
    expect(css).toContain('@keyframes transcript-line-pop');
    expect(css).toContain('translateY(8px)');
    expect(css).toMatch(/\.transcript-line-enter\s*\{\s*animation:\s*transcript-line-pop/);
  });

  it('provides a reduced-motion variant without the transform', () => {
    // The prefers-reduced-motion block swaps in the fade-only keyframes.
    const reducedBlock = css.split('prefers-reduced-motion').find((chunk) => chunk.includes('transcript-line-enter'));
    expect(reducedBlock).toBeTruthy();
    expect(reducedBlock).toContain('transcript-line-pop-reduced');
    // And the fade-only keyframes themselves carry no transform.
    const keyframes = css.slice(css.indexOf('@keyframes transcript-line-pop-reduced'));
    const body = keyframes.slice(0, keyframes.indexOf('}', keyframes.indexOf('to')));
    expect(body).not.toContain('transform');
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
          { id: '3', speakerId: 's1', text: 'floored', at: at(12_000) },
        ]}
      />,
    );
    expect(opacityOf('fresh')).toBeCloseTo(1, 5);
    expect(opacityOf('half')).toBeCloseTo(0.5, 5);
    expect(opacityOf('floored')).toBeCloseTo(0.35, 5);
  });

  it('drops lines older than fadeAfterMs * 1.6 from the DOM', () => {
    render(
      <TranscriptOverlay
        now={FIXED}
        fadeAfterMs={8000}
        lines={[
          { id: '1', speakerId: 's1', text: 'kept', at: at(12_000) },
          { id: '2', speakerId: 's1', text: 'dropped', at: at(13_000) },
        ]}
      />,
    );
    // 12s < 12.8s window → floored but present; 13s > 12.8s → gone.
    expect(opacityOf('kept')).toBeCloseTo(0.35, 5);
    expect(screen.queryByText('dropped')).not.toBeInTheDocument();
  });

  it('without `now`, the same fixed-timestamp fixture is ancient and renders nothing', () => {
    // This is the trap the prop exists to fix: a 2020 fixture is ~years old
    // against the real clock, so every line has aged past the drop window
    // and the overlay renders null.
    const { container } = render(
      <TranscriptOverlay
        fadeAfterMs={8000}
        lines={[
          { id: '1', speakerId: 's1', text: 'a', at: at(0) },
          { id: '2', speakerId: 's1', text: 'b', at: at(4000) },
        ]}
      />,
    );
    expect(container.firstChild).toBeNull();
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
    // 1 - 6000/8000 = 0.25, below the 0.35 floor (still inside the 12.8s
    // drop window, so the line renders).
    expect(opacityOf('line')).toBeCloseTo(0.35, 5);
    short.unmount();

    render(<TranscriptOverlay now={FIXED} fadeAfterMs={60_000} lines={lines} />);
    expect(opacityOf('line')).toBeCloseTo(0.9, 5);
  });
});
