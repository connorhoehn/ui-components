// What the "Go live" control CLAIMS, and whether it is true.
//
// Broadcasting has three states and only two of them are obvious. The third —
// the call is up and NOTHING is being broadcast — looks exactly like success
// from the broadcaster's chair and is completely silent from the audience's,
// so it gets as much of this file as the happy path does.

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GoLiveButton } from '../GoLiveButton';

afterEach(cleanup);

describe('GoLiveButton', () => {
  it('starts the broadcast when pressed', () => {
    const onGoLive = vi.fn();
    render(<GoLiveButton onGoLive={onGoLive} />);
    fireEvent.click(screen.getByTestId('go-live'));
    expect(onGoLive).toHaveBeenCalledTimes(1);
  });

  // A second "Go live" over a live broadcast is an offer to start something
  // that is already running — the same category of lie as a Watch button
  // shown to the person broadcasting.
  it('stops being an action once it is live', () => {
    render(<GoLiveButton live />);
    expect(screen.getByTestId('go-live')).toHaveAttribute('data-live', 'true');
    expect(screen.getByTestId('go-live-status')).toHaveTextContent(/you are live/i);
    expect(screen.queryByRole('button', { name: /go live/i })).toBeNull();
  });

  it('will not fire twice while the broadcast is coming up', () => {
    const onGoLive = vi.fn();
    render(<GoLiveButton starting onGoLive={onGoLive} />);
    const btn = screen.getByTestId('go-live');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onGoLive).not.toHaveBeenCalled();
  });

  // The null/0 distinction, on the surface where it matters most. A
  // broadcaster shown "0 watching" knows the counter works and nobody came; a
  // broadcaster shown nothing knows only that nobody has told them. Collapsing
  // them hides a structurally-zero counter, which this codebase has shipped.
  it('shows a measured zero and stays silent about an unmeasured one', () => {
    const { rerender } = render(<GoLiveButton live viewerCount={0} />);
    expect(screen.getByTestId('go-live-viewers')).toHaveTextContent('0 watching');

    rerender(<GoLiveButton live viewerCount={null} />);
    expect(screen.queryByTestId('go-live-viewers')).toBeNull();

    rerender(<GoLiveButton live />);
    expect(screen.queryByTestId('go-live-viewers')).toBeNull();

    rerender(<GoLiveButton live viewerCount={7} />);
    expect(screen.getByTestId('go-live-viewers')).toHaveTextContent('7 watching');
  });

  // Ending a broadcast may not be distinct from leaving the call, and only the
  // host knows. With no handler there is no End button — but there is a way to
  // say where the real one is, which beats both a dead button and silence.
  it('offers no way to end a broadcast unless the host supplies one', () => {
    const { rerender } = render(<GoLiveButton live />);
    expect(screen.queryByTestId('go-live-end')).toBeNull();
    const onEnd = vi.fn();
    rerender(<GoLiveButton live onEndBroadcast={onEnd} />);
    fireEvent.click(screen.getByTestId('go-live-end'));
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('says where the stop control is when it owns no button', () => {
    const { rerender } = render(
      <GoLiveButton live streamReady endHint="Hang up in the call window to end it." />,
    );
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent('Hang up in the call window');

    // With a real End button the hint would be a second, worse answer to a
    // question the control has already answered.
    rerender(
      <GoLiveButton
        live
        streamReady
        endHint="Hang up in the call window to end it."
        onEndBroadcast={() => {}}
      />,
    );
    expect(screen.queryByTestId('go-live-hint')).toBeNull();
  });
});

// The state that used to report itself as success. "On a call" and "being
// watched" are different facts that fail separately: LVS can be unreachable,
// or simply not publishing yet, while the call itself is perfectly fine.
describe('GoLiveButton — a call with no stream is not a broadcast', () => {
  it('refuses to say "You are live" when nothing is being broadcast', () => {
    render(<GoLiveButton live streamReady={false} />);
    const pill = screen.getByTestId('go-live-status');
    expect(pill).not.toHaveTextContent(/you are live/i);
    expect(pill).toHaveTextContent(/no stream yet/i);
    expect(screen.getByTestId('go-live')).toHaveAttribute('data-stream', 'pending');
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent(/nobody can watch yet/i);
  });

  // A 0 next to "no stream yet" reads as an audience verdict — "nobody came" —
  // when the truth is that there is nothing for anyone to come to.
  it('does not report an audience for a stream that does not exist', () => {
    render(<GoLiveButton live streamReady={false} viewerCount={0} />);
    expect(screen.queryByTestId('go-live-viewers')).toBeNull();
  });

  it('claims nothing either way when nobody checked', () => {
    render(<GoLiveButton live />);
    expect(screen.getByTestId('go-live')).toHaveAttribute('data-stream', 'unknown');
    expect(screen.getByTestId('go-live-status')).toHaveTextContent(/you are live/i);
  });
});

// A tooltip is not a label. It never appears on a touch device, plenty of
// screen readers do not announce it, and "Go live" alone reads as a preview
// toggle — while the press also POSTS to a channel.
describe('GoLiveButton — the consequence is not hidden in a tooltip', () => {
  it('says both halves in the accessible name, visible text first', () => {
    render(<GoLiveButton onGoLive={() => {}} />);
    const btn = screen.getByTestId('go-live');
    expect(btn.getAttribute('aria-label')).toMatch(/^Go live —/);
    expect(btn.getAttribute('aria-label')).toMatch(/tell everyone in the channel/i);
  });

  it('keeps the host wording at the front of the name', () => {
    render(<GoLiveButton onGoLive={() => {}} label="Broadcast this room" />);
    expect(screen.getByTestId('go-live').getAttribute('aria-label')).toMatch(
      /^Broadcast this room —/,
    );
  });

  // "The channel" is vaguer than a product can afford to be about a message it
  // is going to post on your behalf.
  it('names the audience it is about to post to', () => {
    render(<GoLiveButton onGoLive={() => {}} channelName="#design" />);
    expect(screen.getByTestId('go-live').getAttribute('aria-label')).toMatch(/#design/);
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent(
      'Starts a broadcast in #design and tells everyone there.',
    );
  });

  // Visible to everyone, not just to whoever hovers. This is the sentence that
  // makes the press an informed one.
  it('states the cost on screen before the click', () => {
    render(<GoLiveButton onGoLive={() => {}} />);
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent('tells everyone there');
  });

  it('admits the wait instead of looking inert', () => {
    render(<GoLiveButton starting />);
    expect(screen.getByTestId('go-live')).toHaveTextContent('Going live…');
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent(/takes a few seconds/i);
  });

  // Pressing it REPLACES the button with a status pill, so the element the
  // user was on disappears. Without a live region they are told nothing.
  it('announces the state it becomes', () => {
    render(<GoLiveButton live />);
    expect(screen.getByTestId('go-live-status')).toHaveAttribute('role', 'status');
    expect(screen.getByRole('status')).toHaveTextContent('You are live');
  });
});

// A start that fails and silently reverts the button is indistinguishable from
// a click that never registered — so the person presses it again.
describe('GoLiveButton — failure says something true', () => {
  it('shows the reason as an alert, with the button offered again', () => {
    render(
      <GoLiveButton
        onGoLive={() => {}}
        error="Check no other app is using your camera, then try again."
      />,
    );
    const alert = screen.getByTestId('go-live-error');
    expect(alert).toHaveAttribute('role', 'alert');
    expect(alert).toHaveTextContent('no other app is using your camera');
    expect(screen.getByTestId('go-live')).not.toBeDisabled();
  });

  it('carries no stale failure into a live broadcast', () => {
    render(<GoLiveButton live streamReady error="something went wrong earlier" />);
    expect(screen.queryByTestId('go-live-error')).toBeNull();
  });
});

// The claim "you are live" is a claim about OTHER PEOPLE. It must not outlive
// the connection that would carry the broadcast to them.
//
// Observed 2026-09-08, driving a real broadcast: the broadcaster's context was
// taken offline mid-broadcast and the pill read "You are live · 1 watching" for
// the full 30s the drop lasted, while the audience side had already switched to
// "The stream has stopped responding." `streamReady` could not catch it — hosts
// latch it true at first publish and stop re-asking.
describe('GoLiveButton — a dropped broadcaster is not live', () => {
  it('retires the confident pill while the transport is retrying', () => {
    render(<GoLiveButton live streamReady connection="unstable" />);
    const status = screen.getByTestId('go-live-status');
    expect(status).not.toHaveTextContent(/you are live/i);
    expect(status).toHaveTextContent(/reconnecting/i);
    expect(screen.getByTestId('go-live')).toHaveAttribute('data-connection', 'unstable');
  });

  it('says plainly that nothing is going out when the transport is down', () => {
    render(<GoLiveButton live streamReady connection="offline" />);
    expect(screen.getByTestId('go-live-status')).toHaveTextContent(/offline — nobody is receiving/i);
    expect(screen.getByTestId('go-live-hint')).toHaveTextContent(/connection dropped/i);
  });

  // A count measured before the drop describes an audience that is no longer
  // receiving anything. Showing it beside a broken connection reads as "1
  // person is watching this right now", which is the specific false thing.
  it('drops the audience figure rather than reporting a stale one', () => {
    render(<GoLiveButton live streamReady connection="offline" viewerCount={1} />);
    expect(screen.queryByTestId('go-live-viewers')).toBeNull();
  });

  it('still says "You are live" when the connection is fine', () => {
    render(<GoLiveButton live streamReady connection="online" viewerCount={1} />);
    expect(screen.getByTestId('go-live-status')).toHaveTextContent(/you are live/i);
    expect(screen.getByTestId('go-live-viewers')).toHaveTextContent('1 watching');
  });

  // Defaulting matters: every existing caller omits the prop and none of them
  // meant "assume broken".
  it('assumes a healthy connection when the host does not say', () => {
    render(<GoLiveButton live streamReady />);
    expect(screen.getByTestId('go-live-status')).toHaveTextContent(/you are live/i);
  });
});
