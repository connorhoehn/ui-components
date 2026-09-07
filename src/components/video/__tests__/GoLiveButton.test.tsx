// What the "Go live" control CLAIMS, and whether it is true.
//
// The control is a prototype for an unanswered product question, so the tests
// are about the two things that must not be wrong regardless of how that
// question is settled: it must not offer to start something that is already
// running, and it must not invent an audience figure.

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

  // Ending a broadcast is a separate, undecided question — with no handler the
  // live state is a label, not a half-wired control.
  it('offers no way to end a broadcast unless the host supplies one', () => {
    const { rerender } = render(<GoLiveButton live />);
    expect(screen.queryByTestId('go-live-end')).toBeNull();
    const onEnd = vi.fn();
    rerender(<GoLiveButton live onEndBroadcast={onEnd} />);
    fireEvent.click(screen.getByTestId('go-live-end'));
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});
