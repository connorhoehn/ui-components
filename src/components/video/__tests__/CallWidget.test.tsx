import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
      />,
    );
    expect(screen.getByTestId('call-widget')).toHaveAttribute('data-call-state', 'ringing');
    expect(screen.getByTestId('call-ringing-view')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Answer call')).toBeInTheDocument();
    expect(screen.getByLabelText('Decline call')).toBeInTheDocument();
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

  it('minimized: renders the pill instead of expanded content', () => {
    render(
      <CallWidget
        state="active"
        mode="video"
        participants={[p('alice', 'Alice')]}
        minimized
        duration={65}
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
