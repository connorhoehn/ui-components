// The stage's whole job, tested without rendering a pixel.
//
// A watch surface is a claim about a stream, and every bug this one has
// shipped was the wrong claim: LIVE over a frozen frame, "waiting" over a
// broadcast that had ended, a spinner over a channel nobody was ever going to
// broadcast to. Those are decisions, not pixels, so they are tested as
// decisions — exhaustively, and cheaply enough that nobody is tempted to skip
// a case.

import { describe, expect, it } from 'vitest';
import {
  streamStagePhase,
  stagePhaseIsLive,
  stagePhaseIsShowingLiveMedia,
  type StreamStagePhaseInput,
} from '../streamStagePhase';

const base: StreamStagePhaseInput = {
  hasStream: false,
  hasPlaylist: false,
  hadSource: false,
  graceExpired: false,
};

const phase = (over: Partial<StreamStagePhaseInput>) => streamStagePhase({ ...base, ...over });

describe('with no source at all', () => {
  it('is idle while it is still reasonable to expect one', () => {
    expect(phase({})).toBe('idle');
  });

  // The forever-state. "Waiting for the stream to start…" with no source and
  // no timeout is a promise the stage cannot keep, and this codebase has
  // shipped that exact screen more than once.
  it('stops promising a stream once the grace period passes', () => {
    expect(phase({ graceExpired: true })).toBe('not-started');
  });

  // Opposite messages, identical appearance. Hanging up mid-watch used to
  // leave the audience reading "Waiting for the stream…" about something that
  // was over.
  it('says ENDED when this mount had a source and lost it', () => {
    expect(phase({ hadSource: true })).toBe('ended');
  });

  it('prefers ENDED over the grace period — the wait is not the story', () => {
    expect(phase({ hadSource: true, graceExpired: true })).toBe('ended');
  });
});

describe('on the realtime path', () => {
  // WHEP hands the stream over BEFORE its tracks arrive (`addtrack` fires
  // later), so an empty one is a subscription still being set up — or one that
  // never will be. Calling it `playing` is the realtime spelling of a LIVE
  // badge over a black rectangle.
  it('waits on a stream that has not delivered a track yet', () => {
    expect(phase({ hasStream: true, streamHasTracks: false })).toBe('connecting');
  });

  it('stops waiting on one that never does', () => {
    expect(phase({ hasStream: true, streamHasTracks: false, graceExpired: true })).toBe(
      'not-started',
    );
  });

  it('plays as soon as a track lands', () => {
    expect(phase({ hasStream: true, streamHasTracks: true })).toBe('playing');
  });

  // A stand-in object we cannot interrogate is not evidence of emptiness.
  it('does not punish a stream it cannot interrogate', () => {
    expect(phase({ hasStream: true, streamHasTracks: null })).toBe('playing');
  });

  // A MediaStream is evidence in itself: the caller could not have produced
  // one without a peer connection.
  it('is playing, whatever the (inert) HLS hook says', () => {
    expect(phase({ hasStream: true, hls: { phase: 'idle' } })).toBe('playing');
    expect(phase({ hasStream: true, hasPlaylist: true, hls: { phase: 'error', error: 'x' } })).toBe(
      'playing',
    );
  });
});

describe('on the HLS path', () => {
  it('is connecting before the first frame', () => {
    expect(phase({ hasPlaylist: true, hls: { phase: 'connecting' } })).toBe('connecting');
  });

  // HLS does not error on a channel nobody is broadcasting to — it simply
  // never delivers a segment.
  it('admits nothing is coming once connecting outlasts the grace period', () => {
    expect(phase({ hasPlaylist: true, graceExpired: true, hls: { phase: 'connecting' } })).toBe(
      'not-started',
    );
  });

  it('passes playing, buffering and stalled straight through', () => {
    expect(phase({ hasPlaylist: true, hls: { phase: 'playing' } })).toBe('playing');
    expect(phase({ hasPlaylist: true, hls: { phase: 'buffering' } })).toBe('buffering');
    expect(phase({ hasPlaylist: true, hls: { phase: 'stalled' } })).toBe('stalled');
  });

  // A stalled stream is not a stream that failed to start, and the grace
  // period must not relabel it.
  it('does not let the grace period rewrite a stall', () => {
    expect(phase({ hasPlaylist: true, graceExpired: true, hls: { phase: 'stalled' } })).toBe(
      'stalled',
    );
  });

  it('lets an error outrank everything else', () => {
    expect(
      phase({ hasPlaylist: true, graceExpired: true, hls: { phase: 'error', error: 'nope' } }),
    ).toBe('error');
  });

  // Callers and test doubles that predate `phase` still resolve correctly.
  it('falls back to the old error/loading pair', () => {
    expect(phase({ hasPlaylist: true, hls: { loading: true } })).toBe('connecting');
    expect(phase({ hasPlaylist: true, hls: { error: 'nope' } })).toBe('error');
    expect(phase({ hasPlaylist: true, hls: { loading: false } })).toBe('playing');
  });
});

describe('the LIVE badge', () => {
  it('is lit for a moving picture and for an ordinary rebuffer', () => {
    expect(stagePhaseIsLive('playing')).toBe(true);
    expect(stagePhaseIsLive('buffering')).toBe(true);
  });

  // The single most confident lie this component can tell: a frame that has
  // not moved in eight seconds, labelled LIVE.
  it('goes out on a stall', () => {
    expect(stagePhaseIsLive('stalled')).toBe(false);
  });

  it('goes out for every state that is not a stream', () => {
    expect(stagePhaseIsLive('connecting')).toBe(false);
    expect(stagePhaseIsLive('not-started')).toBe(false);
    expect(stagePhaseIsLive('ended')).toBe(false);
    expect(stagePhaseIsLive('error')).toBe(false);
  });

  // Nothing contradicts the caller yet, and the grace period is what turns
  // "not yet" into "not happening".
  it('is allowed while the stage is still idle', () => {
    expect(stagePhaseIsLive('idle')).toBe(true);
  });
});

describe('trusting the picture', () => {
  it('is only true while frames are advancing', () => {
    expect(stagePhaseIsShowingLiveMedia('playing')).toBe(true);
    for (const p of ['idle', 'not-started', 'ended', 'connecting', 'buffering', 'stalled', 'error'] as const) {
      expect(stagePhaseIsShowingLiveMedia(p)).toBe(false);
    }
  });
});
