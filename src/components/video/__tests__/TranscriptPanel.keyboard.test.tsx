// TranscriptPanel — keyboard activation of a seekable segment.
//
// This was the worst shape of the bug class: the segment already advertised
// itself as a control (role="button" + tabIndex={0}) but had no onKeyDown at
// all. So a keyboard user could Tab onto a line of the transcript, see the
// focus ring, press Enter or Space — and nothing happened, while Space also
// scrolled the page out from under them. Only a mouse could seek the player.

import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TranscriptPanel, type TranscriptSegment } from '../TranscriptPanel';

function seg(over: Partial<TranscriptSegment> = {}): TranscriptSegment {
  return {
    startMs: 65_000,
    endMs: 70_000,
    speakerId: 'spk-1',
    speakerLabel: 'Alice',
    text: 'and that is why the migration stalled',
    ...over,
  };
}

function renderPanel(onSeek?: (ms: number) => void, segments: TranscriptSegment[] = [seg()]) {
  render(<TranscriptPanel status="ready" segments={segments} onSeek={onSeek} />);
}

describe('TranscriptPanel — seekable segments', () => {
  // REGRESSION: role="button" + tabIndex={0} with no key handler. The segment
  // looked focusable and activatable to assistive tech but Enter did nothing.
  it('seeks on Enter', () => {
    const onSeek = vi.fn();
    renderPanel(onSeek);
    fireEvent.keyDown(screen.getByRole('button', { name: /01:05/ }), { key: 'Enter' });
    expect(onSeek).toHaveBeenCalledWith(65_000);
  });

  // REGRESSION: Space was doubly broken — it did not seek, and because nothing
  // called preventDefault it scrolled the page instead.
  it('seeks on Space and suppresses the page scroll', () => {
    const onSeek = vi.fn();
    renderPanel(onSeek);
    const segment = screen.getByRole('button', { name: /01:05/ });
    const ev = createEvent.keyDown(segment, { key: ' ' });
    fireEvent(segment, ev);
    expect(onSeek).toHaveBeenCalledWith(65_000);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('accepts the legacy "Spacebar" key value', () => {
    const onSeek = vi.fn();
    renderPanel(onSeek);
    fireEvent.keyDown(screen.getByRole('button', { name: /01:05/ }), { key: 'Spacebar' });
    expect(onSeek).toHaveBeenCalledWith(65_000);
  });

  it('ignores keys that are not Enter or Space', () => {
    const onSeek = vi.fn();
    renderPanel(onSeek);
    fireEvent.keyDown(screen.getByRole('button', { name: /01:05/ }), { key: 'ArrowDown' });
    expect(onSeek).not.toHaveBeenCalled();
  });

  it('seeks the segment that was actually keyed, not the first one', () => {
    const onSeek = vi.fn();
    renderPanel(onSeek, [
      seg({ startMs: 0, speakerLabel: 'Alice', text: 'opening remarks' }),
      seg({ startMs: 125_000, speakerLabel: 'Bo', text: 'closing remarks' }),
    ]);
    fireEvent.keyDown(screen.getByRole('button', { name: /Seek to 02:05 — Bo/ }), { key: 'Enter' });
    expect(onSeek).toHaveBeenCalledTimes(1);
    expect(onSeek).toHaveBeenCalledWith(125_000);
  });

  it('gives each seekable segment an accessible name and a tab stop', () => {
    renderPanel(vi.fn());
    const segment = screen.getByRole('button', { name: /Seek to 01:05 — Alice/ });
    expect(segment).toHaveAttribute('tabindex', '0');
  });

  it('leaves segments inert when the panel is not seekable', () => {
    render(<TranscriptPanel status="ready" segments={[seg()]} />);
    expect(screen.queryByRole('button')).toBeNull();
    // and must not sit in the tab order as a dead stop
    expect(document.querySelector('[data-seg-index="0"]')).not.toHaveAttribute('tabindex');
  });
});
