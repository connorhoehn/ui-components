import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, render, screen } from '@testing-library/react';
import {
  TranscriptOverlay,
  REMOVE_AFTER_MS,
  STABLE_TRANSCRIPTION_FACTOR,
  type CaptionLine,
} from '../TranscriptOverlay';

// Fixed clock so since-last-update opacity/removal is deterministic.
const NOW = new Date('2026-05-28T20:00:00Z').getTime();

function line(partial: Partial<CaptionLine> & { id: string; speakerId: string }): CaptionLine {
  return {
    text: 'hello world',
    at: new Date(NOW).toISOString(),
    ...partial,
  };
}

describe('TranscriptOverlay — ticker constants', () => {
  it('exports the Jitsi-derived parameters', () => {
    expect(REMOVE_AFTER_MS).toBe(3000);
    expect(STABLE_TRANSCRIPTION_FACTOR).toBe(0.85);
  });
});

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

  it('lines within the 3s linger window render; older lines drop', () => {
    // 2.5s since emission with no updates → still inside REMOVE_AFTER_MS.
    const lingering = line({ id: 'a', speakerId: 's1', at: new Date(NOW - 2500).toISOString() });
    const first = render(<TranscriptOverlay lines={[lingering]} />);
    expect(screen.getByLabelText('Live transcript')).toBeInTheDocument();
    first.unmount();

    // 3.5s of silence → removed from the DOM entirely.
    const gone = line({ id: 'b', speakerId: 's1', at: new Date(NOW - 3500).toISOString() });
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

  it('opacity decays with time since last update — fresh ~1.0, half-faded ~0.5', () => {
    const fresh = line({ id: '1', speakerId: 's1', text: 'fresh', at: new Date(NOW).toISOString() });
    // Half of the default fade window (= REMOVE_AFTER_MS) since emission.
    const half = line({
      id: '2', speakerId: 's1', text: 'half',
      at: new Date(NOW - REMOVE_AFTER_MS / 2).toISOString(),
    });
    render(<TranscriptOverlay lines={[fresh, half]} />);
    const freshOpacity = parseFloat((screen.getByText('fresh').parentElement as HTMLElement).style.opacity);
    const halfOpacity = parseFloat((screen.getByText('half').parentElement as HTMLElement).style.opacity);
    expect(freshOpacity).toBeCloseTo(1, 5);
    expect(halfOpacity).toBeCloseTo(0.5, 5);
  });

  it('a long fadeAfterMs keeps a quiet line bright, but removal stays at 3s', () => {
    const l = line({ id: '1', speakerId: 's1', text: 'bright', at: new Date(NOW - 2500).toISOString() });
    render(<TranscriptOverlay lines={[l]} fadeAfterMs={60_000} />);
    // 2.5s into a 60s fade window → barely faded…
    expect(
      parseFloat((screen.getByText('bright').parentElement as HTMLElement).style.opacity),
    ).toBeCloseTo(1 - 2500 / 60_000, 5);
    // …but the 3s linger still governs removal.
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('bright')).not.toBeInTheDocument();
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

  it('renders each line\'s text on the transcript-line-scrim inline element', () => {
    const l = line({ id: '1', speakerId: 's1', text: 'scrimmed' });
    render(<TranscriptOverlay lines={[l]} />);
    expect((screen.getByText('scrimmed') as HTMLElement).className).toContain('transcript-line-scrim');
  });
});

describe('TranscriptOverlay — 3s linger after last update (REMOVE_AFTER_MS)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('drops a silent line 3s after emission as the interval ticks', () => {
    const l = line({ id: '1', speakerId: 's1', text: 'ephemeral' });
    const { container } = render(<TranscriptOverlay lines={[l]} />);
    expect(screen.getByText('ephemeral')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    expect(screen.getByText('ephemeral')).toBeInTheDocument();

    // Past REMOVE_AFTER_MS the line is removed even though the `lines`
    // prop still contains it.
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('ephemeral')).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  it('an update RESETS the linger timer — actively-updating lines never drop', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'hello', interim: true });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);

    // 2s in, an interim update arrives.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    const v2 = { ...v1, text: 'hello there' };
    rerender(<TranscriptOverlay lines={[v2]} />);

    // 2s later we are 4s past emission but only 2s past the last update.
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('hello there')).toBeInTheDocument();

    // 3s of silence after the update → gone.
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryByText('hello there')).not.toBeInTheDocument();
  });

  it('a rejected interim shrink still refreshes the linger timer', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'hello there friend', interim: true });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);

    act(() => {
      vi.advanceTimersByTime(2500);
    });
    // The ASR regressed; displayed text keeps the longer version, but the
    // speaker is clearly still talking, so the line should not drop at 3s.
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'hello' }]} />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.getByText('hello there friend')).toBeInTheDocument();
  });
});

describe('TranscriptOverlay — stable-transcription factor (anti shrink-flicker)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ignores an interim update that shrinks below 0.85× the displayed text', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'twenty characters ok', interim: true });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);
    // 20 chars displayed; 0.85 × 20 = 17 → a 10-char interim is rejected.
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'twenty cha' }]} />);
    expect(screen.getByText('twenty characters ok')).toBeInTheDocument();
    expect(screen.queryByText('twenty cha')).not.toBeInTheDocument();
  });

  it('accepts an interim update that grows past 0.85× the displayed text', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'twenty characters ok', interim: true });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);
    // 18 chars > 17 → accepted even though slightly shorter than displayed.
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'twenty chars okay!' }]} />);
    expect(screen.getByText('twenty chars okay!')).toBeInTheDocument();

    // And an outright longer interim always lands.
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'twenty characters okay then' }]} />);
    expect(screen.getByText('twenty characters okay then')).toBeInTheDocument();
  });

  it('FINAL text always replaces, even when much shorter', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'a very long interim hypothesis', interim: true });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'Short.', interim: false }]} />);
    expect(screen.getByText('Short.')).toBeInTheDocument();
    expect(screen.queryByText('a very long interim hypothesis')).not.toBeInTheDocument();
  });

  it('a line omitting `interim` is treated as final (back-compat default)', () => {
    const v1 = line({ id: '1', speakerId: 's1', text: 'a very long final sentence here' });
    const { rerender } = render(<TranscriptOverlay lines={[v1]} />);
    rerender(<TranscriptOverlay lines={[{ ...v1, text: 'Nope.' }]} />);
    expect(screen.getByText('Nope.')).toBeInTheDocument();
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
    const l = line({ id: '1', speakerId: 's1', text: 'ticking' });
    render(<TranscriptOverlay lines={[l]} />);
    expect(parseFloat((screen.getByText('ticking').parentElement as HTMLElement).style.opacity)).toBeCloseTo(1, 5);

    // 1.5s of fake time = half the default fade window; the interval
    // re-renders and the opacity halves without any prop change.
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(parseFloat((screen.getByText('ticking').parentElement as HTMLElement).style.opacity)).toBeCloseTo(0.5, 1);
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

describe('TranscriptOverlay — caption CSS (styles.css)', () => {
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

  it('scrim hugs wrapped text: inline padding + box-decoration-break clone (both prefixes)', () => {
    const start = css.indexOf('.transcript-line-scrim');
    expect(start).toBeGreaterThan(-1);
    const body = css.slice(start, css.indexOf('}', start));
    expect(body).toMatch(/background:\s*rgba\(/);
    expect(body).toMatch(/padding:/);
    expect(body).toContain('-webkit-box-decoration-break: clone');
    expect(body).toMatch(/[^-]box-decoration-break: clone/);
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

  it('measures the linger against the injected now instead of Date.now()', () => {
    render(
      <TranscriptOverlay
        now={FIXED}
        lines={[
          { id: '1', speakerId: 's1', text: 'fresh', at: at(0) },
          { id: '2', speakerId: 's1', text: 'half', at: at(1500) },
          { id: '3', speakerId: 's1', text: 'dropped', at: at(4000) },
        ]}
      />,
    );
    expect(opacityOf('fresh')).toBeCloseTo(1, 5);
    expect(opacityOf('half')).toBeCloseTo(0.5, 5);
    // 4s of silence > REMOVE_AFTER_MS → not rendered.
    expect(screen.queryByText('dropped')).not.toBeInTheDocument();
  });

  it('keeps lines exactly at the linger boundary and drops just past it', () => {
    render(
      <TranscriptOverlay
        now={FIXED}
        lines={[
          { id: '1', speakerId: 's1', text: 'kept', at: at(3000) },
          { id: '2', speakerId: 's1', text: 'gone', at: at(3001) },
        ]}
      />,
    );
    expect(opacityOf('kept')).toBeCloseTo(0.35, 5);
    expect(screen.queryByText('gone')).not.toBeInTheDocument();
  });

  it('without `now`, the same fixed-timestamp fixture is ancient and renders nothing', () => {
    // This is the trap the prop exists to fix: a 2020 fixture is ~years old
    // against the real clock, so every line is long past the linger window
    // and the overlay renders null.
    const { container } = render(
      <TranscriptOverlay
        lines={[
          { id: '1', speakerId: 's1', text: 'a', at: at(0) },
          { id: '2', speakerId: 's1', text: 'b', at: at(1000) },
        ]}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('reads the same for the same inputs across renders (no wall-clock drift)', () => {
    const lines = [{ id: '1', speakerId: 's1', text: 'line', at: at(750) }];
    const first = render(<TranscriptOverlay now={FIXED} lines={lines} />);
    const a = opacityOf('line');
    first.unmount();
    render(<TranscriptOverlay now={FIXED} lines={lines} />);
    expect(opacityOf('line')).toBe(a);
    expect(a).toBeCloseTo(0.75, 5);
  });

  it('now interacts with fadeAfterMs — a longer window keeps an old line brighter', () => {
    const lines = [{ id: '1', speakerId: 's1', text: 'line', at: at(2500) }];
    const short = render(<TranscriptOverlay now={FIXED} lines={lines} />);
    // 1 - 2500/3000 ≈ 0.167, below the 0.35 floor (still inside the linger
    // window, so the line renders at the floor).
    expect(opacityOf('line')).toBeCloseTo(0.35, 5);
    short.unmount();

    render(<TranscriptOverlay now={FIXED} fadeAfterMs={60_000} lines={lines} />);
    expect(opacityOf('line')).toBeCloseTo(1 - 2500 / 60_000, 5);
  });
});
