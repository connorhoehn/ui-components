import { describe, it, expect } from 'vitest';
import { deckTitleFrom, parseDeckText, recordingIdFor } from '../deckText';


const RECORDINGS = [
  { recordingId: 'rec-1', label: '#design · 21 Sept, 08:42', hint: '2 on the call' },
  { recordingId: 'rec-2', label: '#design · 21 Sept, 14:10' },
];

describe('parseDeckText', () => {
  it('lifts --preview and --from out and leaves everything else as the prompt', () => {
    expect(parseDeckText('the release risks --from transcript --preview')).toEqual({
      prompt: 'the release risks', preview: true, from: 'transcript',
    });
    expect(parseDeckText('--from=meeting sprint review')).toEqual({ prompt: 'sprint review', preview: false, from: 'transcript' });
    expect(parseDeckText('what shipped')).toEqual({ prompt: 'what shipped', preview: false });
  });

  it('reads the three spellings of the transcript, and anything else as documents', () => {
    for (const word of ['transcript', 'recording', 'meeting', 'transcripts']) {
      expect(parseDeckText(`x --from ${word}`).from).toBe('transcript');
    }
    expect(parseDeckText('x --from documents').from).toBe('documents');
  });

  it('keeps an unrecognised flag in the prompt rather than dropping it', () => {
    expect(parseDeckText('ship it --wide').prompt).toBe('ship it --wide');
  });

  it('reads the recording id straight out of a `recording:<id>` token — the one the picker inserts', () => {
    expect(parseDeckText('x --from recording:rec-2')).toEqual({
      prompt: 'x', preview: false, from: 'transcript', recordingId: 'rec-2',
    });
    expect(parseDeckText('--from=recording:rec-2 x')).toEqual({
      prompt: 'x', preview: false, from: 'transcript', recordingId: 'rec-2',
    });
  });

  it('finds --preview and a recording token anywhere in the text, not only trailing — the exact input that reached a real conversation', () => {
    // `/deck` with the recording picker's inserted token, then more typed
    // after it — the bug this guards: --preview must not be lost, and a
    // colon-bearing recording id must not corrupt anything downstream.
    expect(parseDeckText('--from recording:rec-2 Frank Davis · Sep 22, 08:30 AM --preview')).toEqual({
      prompt: 'Frank Davis · Sep 22, 08:30 AM', preview: true, from: 'transcript', recordingId: 'rec-2',
    });
  });
});

describe('deckTitleFrom', () => {
  it('takes the title before an em dash', () => {
    expect(deckTitleFrom('Sprint review — the release risks')).toBe('Sprint review');
    expect(deckTitleFrom('Sprint review – the release risks')).toBe('Sprint review');
  });

  it('keeps a colon rather than splitting on it — a time or a `key:value` option value is not a title separator', () => {
    // This is the exact truncation a real conversation hit: the recording
    // label "Frank Davis · Sep 22, 08:30 AM" has a colon in the time, and
    // splitting on any bare colon cut the title at "08".
    expect(deckTitleFrom('Frank Davis · Sep 22, 08:30 AM')).toBe('Frank Davis · Sep 22, 08:30 AM');
    expect(deckTitleFrom('Sprint review: the release risks')).toBe('Sprint review: the release risks');
  });

  it('otherwise uses the first few words, and falls back to the conversation', () => {
    expect(deckTitleFrom('what shipped this week')).toBe('what shipped this week');
    expect(deckTitleFrom('', '#design')).toBe('#design deck');
    expect(deckTitleFrom('')).toBe('Presentation');
  });
});

describe('recordingIdFor', () => {
  it('honours the pick when it names a real recording', () => {
    expect(recordingIdFor('rec-2', RECORDINGS)).toBe('rec-2');
  });

  it('refuses a pick that names nothing here — it is a stale id, not a hint', () => {
    expect(recordingIdFor('rec-gone', RECORDINGS)).toBeUndefined();
  });

  it('takes the only recording when there is exactly one, and none when there are several', () => {
    expect(recordingIdFor(undefined, [RECORDINGS[0]!])).toBe('rec-1');
    expect(recordingIdFor(undefined, RECORDINGS)).toBeUndefined();
    expect(recordingIdFor(undefined, [])).toBeUndefined();
  });
});
