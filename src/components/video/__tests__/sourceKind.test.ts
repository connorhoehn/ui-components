// Which playback path a URL takes.
//
// The bug: RecordingPlayer branched on `canPlayType(HLS)` alone. Chromium
// answers "maybe" to that and cannot play HLS, so an `.mp4` from the
// recordings API took the native branch and worked off a wrong answer.
// Firefox answers "" and the same file went to hls.js, which cannot parse an
// MP4 container. The share page — built precisely for people outside the org,
// who are least likely to be on the browser we test in — was broken there.

import { describe, expect, it } from 'vitest';
import { sourceKind } from '../RecordingPlayer';

describe('sourceKind', () => {
  it('calls the recordings API’s own URL shape progressive', () => {
    // The literal shape from platform-api's mediaView().
    expect(sourceKind(
      'http://localhost:3901/api/channels/arn%3Aaws%3Aivs%3A1/recordings/rec-1/segments/composed.mp4',
    )).toBe('progressive');
  });

  it('calls a playlist HLS', () => {
    expect(sourceKind('https://x/live/master.m3u8')).toBe('hls');
  });

  it('ignores query strings and fragments — a signed playlist is still a playlist', () => {
    expect(sourceKind('https://x/master.m3u8?X-Amz-Signature=abc&y=1')).toBe('hls');
    expect(sourceKind('https://x/composed.mp4?token=abc#t=10')).toBe('progressive');
  });

  it('is case-insensitive', () => {
    expect(sourceKind('https://x/CLIP.MP4')).toBe('progressive');
    expect(sourceKind('https://x/MASTER.M3U8')).toBe('hls');
  });

  it('recognises the other containers a recording can arrive in', () => {
    for (const ext of ['webm', 'mov', 'm4v', 'ogg', 'm4a', 'mp3', 'wav', 'aac']) {
      expect(sourceKind(`https://x/a.${ext}`)).toBe('progressive');
    }
  });

  it('answers unknown rather than guessing', () => {
    // An extensionless or signed-path URL keeps the old probe-first behaviour.
    // Guessing wrong in either direction breaks playback with no error.
    expect(sourceKind('https://x/stream/12345')).toBe('unknown');
    expect(sourceKind('https://x/')).toBe('unknown');
    expect(sourceKind('')).toBe('unknown');
  });

  it('does not match an extension that merely appears in the path', () => {
    expect(sourceKind('https://x/mp4-archive/master.m3u8')).toBe('hls');
    expect(sourceKind('https://x/m3u8-legacy/composed.mp4')).toBe('progressive');
  });
});
