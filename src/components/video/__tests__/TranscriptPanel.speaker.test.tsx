// Regression: the recordings page went white with
// `TypeError: Cannot read properties of undefined (reading 'length')`.
// The `.length` was in this panel's speaker-colour hash, reading
// `segment.speakerId` — a field the type marked REQUIRED and real transcript
// payloads (whisper without diarization) simply do not carry.

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TranscriptPanel, type TranscriptSegment } from '../TranscriptPanel';

/** Exactly what an un-diarized transcript delivers: times and text. */
const MINIMAL: TranscriptSegment[] = [
  { startMs: 0, endMs: 2000, text: 'Morning, everyone.' },
  { startMs: 2000, endMs: 5000, text: 'Shall we start with the burndown?' },
];

describe('TranscriptPanel with no speaker attribution', () => {
  it('renders segments that carry no speakerId at all', () => {
    render(<TranscriptPanel status="ready" segments={MINIMAL} />);
    expect(screen.getByText('Morning, everyone.')).toBeInTheDocument();
    expect(screen.getByText('Shall we start with the burndown?')).toBeInTheDocument();
  });

  it('names the unnamed speaker rather than printing "undefined"', () => {
    render(<TranscriptPanel status="ready" segments={MINIMAL} />);
    expect(screen.getAllByText('Speaker')).toHaveLength(2);
    expect(screen.queryByText('undefined')).toBeNull();
  });

  it('still counts the segments in the header', () => {
    render(<TranscriptPanel status="ready" segments={MINIMAL} />);
    expect(screen.getByText('2 segments')).toBeInTheDocument();
  });

  it('gives a seekable un-attributed segment a usable accessible name', () => {
    render(<TranscriptPanel status="ready" segments={MINIMAL} onSeek={() => {}} />);
    expect(screen.getByRole('button', { name: 'Seek to 00:00 — Speaker' })).toBeInTheDocument();
  });

  it('falls back to the neutral text token when there is no speaker identity', () => {
    render(<TranscriptPanel status="ready" segments={MINIMAL} />);
    const name = screen.getAllByText('Speaker')[0] as HTMLElement;
    expect(name.className).toContain('text-text-secondary');
    expect(name.style.color).toBe('');
  });

  it('colours by the label when only the label is present', () => {
    render(
      <TranscriptPanel
        status="ready"
        segments={[{ startMs: 0, endMs: 1000, speakerLabel: 'Alice', text: 'Hi' }]}
      />,
    );
    // jsdom normalises hsl() to rgb(); what matters is that a colour was
    // derived at all rather than the neutral token.
    const color = (screen.getByText('Alice') as HTMLElement).style.color;
    expect(color).toMatch(/^rgb\(/);
    expect((screen.getByText('Alice') as HTMLElement).className)
      .not.toContain('text-text-secondary');
  });

  it('still colours diarized speakers apart from each other', () => {
    render(
      <TranscriptPanel
        status="ready"
        segments={[
          { startMs: 0, endMs: 1000, speakerId: 'spk-a', speakerLabel: 'Alice', text: 'Hi' },
          { startMs: 1000, endMs: 2000, speakerId: 'spk-b', speakerLabel: 'Bob', text: 'Hello' },
        ]}
      />,
    );
    const alice = screen.getByText('Alice') as HTMLElement;
    const bob = screen.getByText('Bob') as HTMLElement;
    expect(alice.style.color).not.toBe('');
    expect(alice.style.color).not.toBe(bob.style.color);
  });
});
