// A control held by a reason is reachable by keyboard, says why on focus and
// on hover in the library Tooltip, carries the reason as its accessible
// description, draws a focus ring, and does nothing when activated — on every
// call surface that takes a reason.

import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CircularIconToggle from '../CircularIconToggle';
import MediaControlsBar from '../MediaControlsBar';
import { CallControls } from '../CallControls';
import { CallWidget } from '../CallWidget';
import { CallDock, type CallDockProps } from '../CallDock';
import { DeviceToggleSelect } from '../DeviceToggleSelect';

const REASON = 'The host made you view-only';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function tooltipText(): string | null {
  return screen.queryByRole('tooltip')?.textContent ?? null;
}

/** The button draws a visible outline on keyboard focus, at full strength (no opacity on the button). */
function expectFocusRing(button: HTMLElement) {
  expect(button.className).toMatch(/focus-visible:outline-2/);
  expect(button.className).not.toMatch(/(^|\s)opacity-\d+/);
}

describe('MediaControlsBar — a held toggle on keyboard focus', () => {
  const handlers = () => ({ onToggleAudio: vi.fn(), onToggleVideo: vi.fn(), onToggleScreenShare: vi.fn(), onLeave: vi.fn() });

  it('Tab reaches the held mic, the reason shows in the Tooltip, and Enter / Space do nothing', async () => {
    const user = userEvent.setup();
    const h = handlers();
    render(<MediaControlsBar audioOn={false} videoOn={false} {...h} audioDisabledReason={REASON} videoDisabledReason={REASON} screenShareDisabledReason={REASON} />);
    await user.tab();
    const mic = screen.getByTestId('media-controls-mic');
    expect(mic).toHaveFocus();
    expect(mic).toHaveAttribute('aria-disabled', 'true');
    expect(mic).toHaveAccessibleDescription(REASON);
    expect(tooltipText()).toBe(REASON);
    expectFocusRing(mic);
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(h.onToggleAudio).not.toHaveBeenCalled();

    // On to the camera: the tooltip follows focus.
    await user.tab();
    expect(screen.getByTestId('media-controls-cam')).toHaveFocus();
    expect(tooltipText()).toBe(REASON);
    await user.tab();
    expect(screen.getByTestId('media-controls-screenshare')).toHaveFocus();
    await user.tab();
    expect(screen.getByTestId('media-controls-leave')).toHaveFocus();
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('hovering a held toggle shows the same Tooltip', () => {
    vi.useFakeTimers();
    render(<MediaControlsBar audioOn={false} videoOn={false} {...handlers()} audioDisabledReason={REASON} />);
    fireEvent.mouseEnter(screen.getByTestId('media-controls-mic'));
    act(() => { vi.advanceTimersByTime(400); });
    expect(tooltipText()).toBe(REASON);
  });

  it('a toggle that is not held has no reason tooltip and keeps its title', async () => {
    const user = userEvent.setup();
    render(<MediaControlsBar audioOn videoOn {...handlers()} />);
    await user.tab();
    const mic = screen.getByTestId('media-controls-mic');
    expect(mic).toHaveFocus();
    expect(mic).toHaveAttribute('title', 'Mute microphone');
    expect(screen.queryByRole('tooltip')).toBeNull();
    expectFocusRing(mic);
  });

  it('a reason that arrives while the toggle has focus keeps focus on it', () => {
    const h = handlers();
    const { rerender } = render(<MediaControlsBar audioOn videoOn {...h} />);
    const mic = screen.getByTestId('media-controls-mic');
    mic.focus();
    rerender(<MediaControlsBar audioOn={false} videoOn={false} {...h} audioDisabledReason={REASON} />);
    expect(screen.getByTestId('media-controls-mic')).toBe(mic);
    expect(mic).toHaveFocus();
    expect(mic).toHaveAccessibleDescription(REASON);
  });
});

describe('CircularIconToggle — layout unchanged by the tooltip wrapper', () => {
  it('the wrapper is display: contents, so the button stays its parent\'s flex item', () => {
    render(<div data-testid="row" className="flex"><CircularIconToggle on iconOn="on" iconOff="off" aria-label="Mute" disabledReason={REASON} className="ml-auto" /></div>);
    const button = screen.getByRole('button', { name: 'Mute' });
    expect(button.parentElement).toHaveClass('contents');
    expect(button).toHaveClass('ml-auto');
  });
});

describe('CallControls and CallWidget — held controls on keyboard focus', () => {
  it('the held mute in the control row is focusable and shows its reason', async () => {
    const user = userEvent.setup();
    const onToggleMute = vi.fn();
    render(<CallControls mode="video" onToggleMute={onToggleMute} onToggleCamera={() => {}} onEndCall={() => {}} audioDisabledReason={REASON} />);
    await user.tab();
    const mute = screen.getByTestId('mute-button');
    expect(mute).toHaveFocus();
    expect(tooltipText()).toBe(REASON);
    expectFocusRing(mute);
    await user.keyboard('{Enter}');
    expect(onToggleMute).not.toHaveBeenCalled();
  });

  it('the minimized pill\'s held mute shows its reason on focus', () => {
    render(<CallWidget state="active" mode="video" participants={[{ id: 'a', displayName: 'Ana' }]} minimized onMinimize={() => {}} onToggleMute={() => {}} audioDisabledReason={REASON} />);
    const mute = screen.getByTestId('call-pill-mute');
    act(() => { mute.focus(); });
    expect(tooltipText()).toBe(REASON);
    expectFocusRing(mute);
  });
});

function dockProps(over: Partial<CallDockProps> = {}): CallDockProps {
  const device = { on: false, onToggle: vi.fn(), devices: [{ deviceId: 'd1', label: 'Built-in' }], onSelectDevice: vi.fn(), permission: 'granted' as const };
  return {
    title: 'Design review',
    participantCount: 2,
    elapsedMs: 10_000,
    phase: 'active',
    participants: [
      { id: 'me', userId: 'me', displayName: 'Alice Chen', cameraOn: false, audioOn: false, screenSharing: false, presenting: false, connection: 'connected' },
      { id: 'bo', userId: 'bo', displayName: 'Bob Martinez', cameraOn: true, audioOn: true, screenSharing: false, presenting: false, connection: 'connected' },
    ],
    localParticipantId: 'me',
    mic: { ...device, disabledReason: REASON },
    camera: { ...device, disabledReason: REASON },
    screenShare: { on: false, disabledReason: REASON, onToggle: vi.fn() },
    onOpenPeople: vi.fn(),
    onOpenSettings: vi.fn(),
    onPopOut: vi.fn(),
    onLeave: vi.fn(),
    ...over,
  };
}

describe('CallDock — held mic, camera and share', () => {
  it('Tab walks mic, its ▾, camera, its ▾ and Share; each held one says why and does nothing', async () => {
    const user = userEvent.setup();
    const props = dockProps();
    render(<CallDock {...props} />);
    const mic = screen.getByTestId('call-dock-mic');
    act(() => { mic.focus(); });
    expect(mic).toHaveFocus();
    expect(mic).toHaveAttribute('aria-disabled', 'true');
    expect(mic).not.toBeDisabled();
    expect(mic).toHaveAccessibleDescription(REASON);
    expect(tooltipText()).toBe(REASON);
    expectFocusRing(mic);
    await user.keyboard('{Enter}');
    expect(props.mic.onToggle).not.toHaveBeenCalled();

    // The ▾ beside it is a working control (picking a device is not publishing).
    await user.tab();
    const micMenu = screen.getByTestId('call-dock-mic-menu');
    expect(micMenu).toHaveFocus();
    expect(micMenu).not.toHaveAttribute('aria-disabled');

    await user.tab();
    const camera = screen.getByTestId('call-dock-camera');
    expect(camera).toHaveFocus();
    expect(tooltipText()).toBe(REASON);

    await user.tab();
    await user.tab();
    const share = screen.getByTestId('call-dock-share');
    expect(share).toHaveFocus();
    expect(share).toHaveAttribute('aria-disabled', 'true');
    expect(share).toHaveAccessibleDescription(REASON);
    expect(share).not.toHaveAttribute('title');
    expect(tooltipText()).toBe(REASON);
    await user.keyboard(' ');
    expect(props.screenShare.onToggle).not.toHaveBeenCalled();
  });

  it('without reasons the controls work and carry their usual titles', () => {
    const device = { on: true, onToggle: vi.fn(), devices: [], onSelectDevice: vi.fn(), permission: 'granted' as const };
    const props = dockProps({ mic: device, camera: { ...device, onToggle: vi.fn() }, screenShare: { on: false, onToggle: vi.fn() } });
    render(<CallDock {...props} />);
    fireEvent.click(screen.getByTestId('call-dock-mic'));
    fireEvent.click(screen.getByTestId('call-dock-share'));
    expect(device.onToggle).toHaveBeenCalledTimes(1);
    expect(props.screenShare.onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('call-dock-share')).toHaveAttribute('title', 'Share your screen');
    expect(screen.getByTestId('call-dock-share')).not.toHaveAttribute('aria-disabled');
  });
});

describe('DeviceToggleSelect — a blocked device', () => {
  it('stays focusable and shows the browser reason on focus', () => {
    render(<DeviceToggleSelect kind="camera" on onToggle={() => {}} devices={[]} onSelectDevice={() => {}} permission="denied" data-testid="cam" />);
    const cam = screen.getByTestId('cam');
    act(() => { cam.focus(); });
    expect(cam).toHaveFocus();
    expect(tooltipText()).toBe('Camera blocked in the browser');
  });
});

describe('Tooltip — layer', () => {
  it('a held control inside a high floating layer gets its tooltip above that layer', () => {
    render(
      <div data-testid="floating" className="fixed" style={{ zIndex: 9999 }}>
        <MediaControlsBar audioOn={false} videoOn={false} onToggleAudio={() => {}} onToggleVideo={() => {}} onLeave={() => {}} audioDisabledReason={REASON} />
      </div>,
    );
    act(() => { screen.getByTestId('media-controls-mic').focus(); });
    expect(Number(screen.getByRole('tooltip').style.zIndex)).toBe(10000);
  });
});
