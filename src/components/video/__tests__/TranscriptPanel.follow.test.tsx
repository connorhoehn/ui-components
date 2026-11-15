// 2.530.0: a transcript that grows while it is open (live captions) follows the newest line while the reader is at the
// bottom, stops when they scroll up, and offers one "Jump to latest". jsdom has no layout, so the scroller's geometry is set by hand.

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TranscriptPanel, type TranscriptSegment } from '../TranscriptPanel';

const seg = (n: number, extra: Partial<TranscriptSegment> = {}): TranscriptSegment =>
  ({ id: String(n), startMs: n * 1000, endMs: n * 1000 + 900, speakerId: 'u1', speakerLabel: 'Ada Park', text: `line ${n}`, ...extra });
const lines = (n: number) => Array.from({ length: n }, (_, i) => seg(i + 1));

/** Gives the list a height of 100 and content of `height`, so scrollTop decides whether it is at the bottom. */
function geometry(el: HTMLElement, height: number) {
  Object.defineProperty(el, 'clientHeight', { configurable: true, value: 100 });
  Object.defineProperty(el, 'scrollHeight', { configurable: true, value: height });
}
const scroller = () => screen.getByText('line 1').closest('[data-seg-index]')!.parentElement as HTMLElement;

describe('TranscriptPanel follow', () => {
  it('keeps the newest line in view as lines arrive while the reader is at the bottom', () => {
    const { rerender } = render(<TranscriptPanel status="ready" follow segments={lines(3)} data-testid="t" />);
    const el = scroller(); geometry(el, 600);
    rerender(<TranscriptPanel status="ready" follow segments={lines(4)} data-testid="t" />);
    expect(el.scrollTop).toBe(600);
    expect(screen.getByTestId('t')).toHaveAttribute('data-follow', 'following');
    expect(screen.queryByTestId('transcript-jump-latest')).toBeNull();
  });

  it('stops following when the reader scrolls up, offers Jump to latest, and follows again after it', () => {
    const { rerender } = render(<TranscriptPanel status="ready" follow segments={lines(3)} data-testid="t" />);
    const el = scroller(); geometry(el, 600);
    el.scrollTop = 100; fireEvent.scroll(el);
    expect(screen.getByTestId('t')).toHaveAttribute('data-follow', 'detached');
    rerender(<TranscriptPanel status="ready" follow segments={lines(5)} data-testid="t" />);
    expect(el.scrollTop).toBe(100);
    fireEvent.click(screen.getByRole('button', { name: 'Jump to latest' }));
    expect(el.scrollTop).toBe(600);
    expect(screen.queryByTestId('transcript-jump-latest')).toBeNull();
    geometry(el, 700);
    rerender(<TranscriptPanel status="ready" follow segments={lines(6)} data-testid="t" />);
    expect(el.scrollTop).toBe(700);
  });

  it('without follow nothing is offered and nothing moves', () => {
    const { rerender } = render(<TranscriptPanel status="ready" segments={lines(3)} />);
    const el = scroller(); geometry(el, 600);
    rerender(<TranscriptPanel status="ready" segments={lines(4)} />);
    expect(el.scrollTop).toBe(0);
    expect(screen.queryByTestId('transcript-jump-latest')).toBeNull();
  });
});

describe('TranscriptPanel live slots', () => {
  it('draws the header meta and actions in place of the count, and content above the first line', () => {
    render(<TranscriptPanel status="ready" frame="fill" title="Live transcript" segments={lines(2)} headerMeta="Listening"
      headerActions={<button type="button">Back</button>} beforeSegments={<button type="button">Load earlier</button>} />);
    expect(screen.getByText('Live transcript')).toBeInTheDocument();
    expect(screen.getByText('Listening')).toBeInTheDocument();
    expect(screen.queryByText('2 segments')).toBeNull();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    const earlier = screen.getByRole('button', { name: 'Load earlier' });
    expect(earlier.compareDocumentPosition(screen.getByText('line 1')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('an empty live transcript keeps its header and says the host words', () => {
    render(<TranscriptPanel status="ready" frame="fill" segments={[]} headerActions={<button type="button">Back</button>}
      emptyMessage="Nothing heard yet." data-testid="t" />);
    expect(screen.getByTestId('t-empty')).toHaveTextContent('Nothing heard yet.');
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  it('shows portraits only when the host passes them, initials where a speaker has no picture', () => {
    const { rerender, container } = render(<TranscriptPanel status="ready" segments={lines(1)} />);
    expect(container.querySelector('img')).toBeNull();
    expect(screen.queryByText('AP')).toBeNull();
    rerender(<TranscriptPanel status="ready" segments={[seg(1, { speakerAvatarUrl: null })]} />);
    expect(screen.getByText('AP')).toBeInTheDocument();
  });

  it('the card form without the new props is unchanged', () => {
    render(<TranscriptPanel status="ready" segments={lines(2)} />);
    expect(screen.getByText('2 segments')).toBeInTheDocument();
    render(<TranscriptPanel status="ready" segments={[]} />);
    expect(screen.getByText('No audible speech was captured in this recording.')).toBeInTheDocument();
  });
});
