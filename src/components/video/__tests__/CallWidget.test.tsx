import { vi } from 'vitest';
import { render, screen, fireEvent, createEvent } from '@testing-library/react';
import { CallWidget } from '../CallWidget';
import type { CallWidgetParticipant } from '../CallWidget';

function p(id: string, displayName?: string): CallWidgetParticipant {
  return { id, displayName: displayName ?? id };
}

// Smoke tests for CallWidget — verifies the composition mounts in each
// of the five states and that the extracted pieces (CallControls,
// CallParticipantStrip, CallStatsOverlay) show up where expected.
describe('CallWidget — state composition', () => {
  it('idle: renders nothing', () => {
    const { container } = render(
      <CallWidget state="idle" mode="video" participants={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('ended: renders nothing', () => {
    const { container } = render(
      <CallWidget state="ended" mode="video" participants={[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('ringing: renders the ringing view + answer/decline buttons', () => {
    render(
      <CallWidget
        state="ringing"
        mode="audio"
        participants={[]}
        callerName="Alice"
        onAnswer={() => undefined}
        onDecline={() => undefined}
      />,
    );
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-state', 'ringing');
    expect(screen.getByTestId('call-ringing-view')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Answer call')).toBeInTheDocument();
    expect(screen.getByLabelText('Decline call')).toBeInTheDocument();
  });

  // `onAnswer` / `onDecline` are optional on CallWidgetProps and neither has a
  // fallback inside the widget. Rendered unguarded, a host that wired only one
  // of them showed a live green Answer (or red Decline) button that swallowed
  // the click while the widget went on ringing.
  it('ringing: omits Answer when no onAnswer is wired, keeping Decline', () => {
    render(
      <CallWidget
        state="ringing"
        mode="audio"
        participants={[]}
        onDecline={() => undefined}
      />,
    );
    expect(screen.queryByLabelText('Answer call')).toBeNull();
    expect(screen.getByLabelText('Decline call')).toBeInTheDocument();
  });

  it('ringing: omits both call buttons when neither handler is wired', () => {
    render(<CallWidget state="ringing" mode="audio" participants={[]} />);
    // The ringing view itself still renders — the caller name is the point.
    expect(screen.getByTestId('call-ringing-view')).toBeInTheDocument();
    expect(screen.queryByLabelText('Answer call')).toBeNull();
    expect(screen.queryByLabelText('Decline call')).toBeNull();
  });

  it('connecting: renders the spinner view', () => {
    render(<CallWidget state="connecting" mode="video" participants={[]} />);
    expect(screen.getByTestId('call-connecting-view')).toBeInTheDocument();
    expect(screen.getByText('Connecting...')).toBeInTheDocument();
  });

  it('active (audio): renders the controls + participant strip', () => {
    render(
      <CallWidget
        state="active"
        mode="audio"
        participants={[p('alice', 'Alice'), p('bob', 'Bob')]}
        localParticipant={p('me', 'Me')}
      />,
    );
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-state', 'active');
    expect(screen.getByTestId('call-controls')).toBeInTheDocument();
    expect(screen.getByTestId('call-participant-strip')).toBeInTheDocument();
    expect(screen.getByTestId('call-participant-strip')).toHaveAttribute('data-count', '2');
    // Audio mode hides the camera button.
    expect(screen.queryByTestId('camera-button')).toBeNull();
  });

  it('active (video): renders the controls but NOT the audio strip', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        localParticipant={p('me', 'Me')}
        onToggleCamera={() => undefined}
      />,
    );
    expect(screen.getByTestId('call-controls')).toBeInTheDocument();
    expect(screen.queryByTestId('call-participant-strip')).toBeNull();
    // Video mode shows the camera button.
    expect(screen.getByTestId('camera-button')).toBeInTheDocument();
  });

  it('active + callStats: renders the CallStatsOverlay inside the video area', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        localParticipant={p('me', 'Me')}
        callStats={{ networkQuality: 'good', latencyMs: 120 }}
      />,
    );
    expect(screen.getByTestId('call-stats-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('call-stats-latency')).toHaveTextContent('latency120 ms');
  });

  it('active + no callStats: omits the CallStatsOverlay', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        localParticipant={p('me', 'Me')}
      />,
    );
    expect(screen.queryByTestId('call-stats-overlay')).toBeNull();
  });

  // INVERTED: this case used to render `minimized` with NO `onMinimize` and
  // assert the "Expand call widget" affordance was present — pinning a
  // role="button" pill that answered neither click nor Enter, with the user
  // stuck in the minimized state. The affordance now depends on the handler,
  // so the case wires one; the "pill instead of expanded content" half of the
  // assertion is what it was always about and is unchanged.
  it('minimized: renders the pill instead of expanded content', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        minimized
        duration={65}
        onMinimize={vi.fn()}
      />,
    );
    // The expanded controls bar is hidden when minimized.
    expect(screen.queryByTestId('call-controls')).toBeNull();
    // The pill's "Expand call widget" affordance is present.
    expect(screen.getByLabelText('Expand call widget')).toBeInTheDocument();
  });
});

describe('CallWidget — onExpand prop', () => {
  it('Expand button not rendered when onExpand is undefined', () => {
    const { queryByTestId } = render(
      <CallWidget state="active" mode="video" participants={[p('alice', 'Alice')]} />,
    );
    expect(queryByTestId('call-widget-expand-button')).toBeNull();
  });

  it('Expand button rendered when onExpand is provided', () => {
    const { getByTestId } = render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        onExpand={vi.fn()}
      />,
    );
    const btn = getByTestId('call-widget-expand-button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('aria-label', 'Expand to window');
    expect(btn).toHaveAttribute('title', 'Expand');
  });

  it('clicking the Expand button fires onExpand', () => {
    const onExpand = vi.fn();
    const { getByTestId } = render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        onExpand={onExpand}
      />,
    );
    getByTestId('call-widget-expand-button').click();
    expect(onExpand).toHaveBeenCalledTimes(1);
  });
});

// controlsExtras — the docked counterpart to MediaControlsBar's `extras`.
// A consumer-supplied node docked above the controls row; the gateway
// hangs its "add people to this call" trigger here.
//
// This test exists because the prop shipped once WITHOUT the
// pass-through from CallWidget down to ActiveCallContent: it typechecked
// against the props interface, built clean, and rendered nothing.
describe('CallWidget — controlsExtras', () => {
  it('active: renders the extras node above the controls', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('bob', 'Bob')]}
        controlsExtras={<button data-testid="extras-node">Add people</button>}
      />,
    );
    expect(screen.getByTestId('extras-node')).toBeInTheDocument();
  });

  it('minimized: suppresses extras along with the rest of the body', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        minimized
        participants={[p('bob', 'Bob')]}
        controlsExtras={<button data-testid="extras-node">Add people</button>}
      />,
    );
    expect(screen.queryByTestId('extras-node')).not.toBeInTheDocument();
  });
});

// onOpenAddParticipant — consumer-owned "add people". Twice now a prop
// has been declared on CallWidget, typed into ActiveCallContent's Pick<>
// union, and never actually destructured or forwarded: it compiled, it
// built, and it rendered nothing. These assert the whole path.
describe('CallWidget — onOpenAddParticipant', () => {
  it('renders the add-people control inline with the other controls', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('bob', 'Bob')]}
        onOpenAddParticipant={() => {}}
      />,
    );
    expect(screen.getByTestId('add-participant-button')).toBeInTheDocument();
  });

  it('calls the consumer handler instead of opening the built-in picker', async () => {
    const onOpen = vi.fn();
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('bob', 'Bob')]}
        onOpenAddParticipant={onOpen}
      />,
    );
    screen.getByTestId('add-participant-button').click();
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('add-participant-picker')).not.toBeInTheDocument();
  });

  it('omits the control when neither add-participant path is wired', () => {
    render(<CallWidget state="active" mode="video" participants={[p('bob', 'Bob')]} />);
    expect(screen.queryByTestId('add-participant-button')).not.toBeInTheDocument();
  });
});

// NOTE: the pill's expand action is wired to `onMinimize` (it toggles the
// minimized state back off), not to `onExpand`.
// REGRESSION: the minimized pill is a `role="button"` div whose key handler
// was `e.key === 'Enter' && onExpand?.()` — Enter only, and with no
// preventDefault. Pressing Space on the collapsed call widget therefore did
// not expand the call; it scrolled the page instead, which is the browser
// default for Space on a non-button element.
describe('CallWidget — minimized pill keyboard activation', () => {
  function renderPill(onExpand: () => void) {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('bob', 'Bob')]}
        minimized
        onMinimize={onExpand}
      />,
    );
    return screen.getByRole('button', { name: 'Expand call widget' });
  }

  it('expands on Space', () => {
    const onExpand = vi.fn();
    fireEvent.keyDown(renderPill(onExpand), { key: ' ' });
    expect(onExpand).toHaveBeenCalledTimes(1);
  });

  it('preventDefaults Space so the page does not scroll instead', () => {
    const pill = renderPill(vi.fn());
    const event = createEvent.keyDown(pill, { key: ' ' });
    fireEvent(pill, event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('still expands on Enter', () => {
    const onExpand = vi.fn();
    fireEvent.keyDown(renderPill(onExpand), { key: 'Enter' });
    expect(onExpand).toHaveBeenCalledTimes(1);
  });
});

// `onMinimize` is optional and `minimized` is a controlled prop, so a host
// could drive the widget into the pill without wiring the way back out. The
// pill still claimed `role="button" aria-label="Expand call widget"` with a
// pointer cursor and answered neither click nor Enter — the user was pinned to
// a control that says it restores the call and does not. The minimize button
// in the expanded chrome was already gated on exactly this handler.
describe('CallWidget — the minimized pill only claims to expand when it can', () => {
  const renderPill = (props: Record<string, unknown> = {}) =>
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('bob', 'Bob')]}
        minimized
        {...props}
      />,
    );

  it('is not a button with no onMinimize wired', () => {
    renderPill();
    expect(screen.queryByRole('button', { name: 'Expand call widget' })).toBeNull();
    // The pill itself still renders — the call is still visibly in progress.
    expect(screen.getByTestId('call-widget')).toBeInTheDocument();
  });

  it('drops the pointer cursor with no onMinimize wired', () => {
    const { container } = renderPill();
    const pointered = container.querySelectorAll('.cursor-pointer');
    for (const el of pointered) {
      expect(el.getAttribute('aria-label')).not.toBe('Expand call widget');
    }
  });

  it('is the labelled button again once onMinimize is wired', () => {
    const onMinimize = vi.fn();
    renderPill({ onMinimize });
    const pill = screen.getByRole('button', { name: 'Expand call widget' });
    fireEvent.click(pill);
    expect(onMinimize).toHaveBeenCalledTimes(1);
  });
});
