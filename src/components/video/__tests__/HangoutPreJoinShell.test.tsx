import { render, screen, fireEvent } from '@testing-library/react';
import HangoutPreJoinShell, {
  type HangoutPreJoinShellProps,
} from '../HangoutPreJoinShell';

function baseProps(overrides: Partial<HangoutPreJoinShellProps> = {}): HangoutPreJoinShellProps {
  return {
    channelName: 'test-room',
    previewStream: null,
    permission: 'granted',
    audioEnabled: true,
    videoEnabled: true,
    onToggleAudio: () => {},
    onToggleVideo: () => {},
    onJoin: () => {},
    onCancel: () => {},
    ...overrides,
  };
}

describe('HangoutPreJoinShell', () => {
  it('renders the channel name exactly once, in the heading block', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.getAllByText('test-room')).toHaveLength(1);
    expect(screen.getByTestId('prejoin-title')).toHaveTextContent('test-room');
  });

  it('renders the optional eyebrow above the title', () => {
    render(<HangoutPreJoinShell {...baseProps({ eyebrow: 'Before you go live' })} />);
    const eyebrow = screen.getByText('Before you go live');
    const title = screen.getByTestId('prejoin-title');
    expect(
      eyebrow.compareDocumentPosition(title) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('renders no eyebrow when the prop is omitted', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.queryByText('Before you go live')).not.toBeInTheDocument();
  });

  it('renders the subtitle exactly once — never repeated in the join column', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'ready',
          participants: [
            { participantId: 'alice-123', ready: true },
            { participantId: 'bob-456', ready: true },
          ],
        })}
      />,
    );
    expect(screen.getAllByText('2 people are in this call')).toHaveLength(1);
    expect(screen.getByTestId('prejoin-subtitle')).toHaveTextContent(
      '2 people are in this call',
    );
  });

  it('renders no "Ready to join?" second heading', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.queryByText(/Ready to join/i)).not.toBeInTheDocument();
  });

  it('shows the Join button enabled when permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'granted' })} />);
    const btn = screen.getByTestId('prejoin-join-button');
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveTextContent('Join now');
  });

  it('disables Join with "Allow camera to join" copy when permission denied', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'denied' })} />);
    const btn = screen.getByTestId('prejoin-join-button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveTextContent('Allow camera to join');
  });

  it('passes mic/cam intent to onJoin', () => {
    const onJoin = vi.fn();
    render(
      <HangoutPreJoinShell
        {...baseProps({
          onJoin,
          audioEnabled: false,
          videoEnabled: true,
        })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-join-button'));
    expect(onJoin).toHaveBeenCalledWith({ audio: false, video: true });
  });

  it('renders the permission-denied card with retry when permission is "denied"', () => {
    const onRetryPermission = vi.fn();
    render(
      <HangoutPreJoinShell
        {...baseProps({
          permission: 'denied',
          permissionMessage: 'Browser blocked the camera',
          onRetryPermission,
        })}
      />,
    );
    const card = screen.getByTestId('prejoin-permission-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('data-permission-kind', 'camera');
    expect(card).toHaveAttribute('data-permission-state', 'denied');
    expect(screen.getByText('Browser blocked the camera')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(onRetryPermission).toHaveBeenCalled();
  });

  it('renders "You\'ll be the first" subtitle on empty readyState', () => {
    render(<HangoutPreJoinShell {...baseProps({ readyState: 'empty' })} />);
    expect(screen.getAllByText(/first one in this room/i)).toHaveLength(1);
  });

  it('renders N-people copy + roster on ready readyState', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'ready',
          participants: [
            { participantId: 'alice-123', ready: true },
            { participantId: 'bob-456', ready: false },
          ],
        })}
      />,
    );
    expect(screen.getAllByText(/2 people are in this call/)).toHaveLength(1);
    expect(screen.getByText('alice-12')).toBeInTheDocument();
    expect(screen.getByText('bob-456')).toBeInTheDocument();
    expect(screen.getByText('live')).toBeInTheDocument();
    expect(screen.getByText('connecting')).toBeInTheDocument();
  });

  it('renders the "pending" caveat when readyState is pending', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'pending',
          participants: [{ participantId: 'alice', ready: false }],
        })}
      />,
    );
    expect(screen.getByText(/Other publishers are still connecting/)).toBeInTheDocument();
  });

  it('disables mic/cam toggles until permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ permission: 'pending' })} />);
    expect(screen.getByTestId('prejoin-toggle-audio')).toBeDisabled();
    expect(screen.getByTestId('prejoin-toggle-video')).toBeDisabled();
  });

  it('reflects audio/video disabled visually via aria-pressed', () => {
    const { rerender } = render(
      <HangoutPreJoinShell {...baseProps({ audioEnabled: true, videoEnabled: true })} />,
    );
    expect(screen.getByTestId('prejoin-toggle-audio')).toHaveAttribute('aria-pressed', 'true');
    rerender(
      <HangoutPreJoinShell {...baseProps({ audioEnabled: false, videoEnabled: false })} />,
    );
    expect(screen.getByTestId('prejoin-toggle-audio')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('prejoin-toggle-video')).toHaveAttribute('aria-pressed', 'false');
  });

  it('honors joinLabel override', () => {
    render(<HangoutPreJoinShell {...baseProps({ joinLabel: 'Start meeting' })} />);
    expect(screen.getByTestId('prejoin-join-button')).toHaveTextContent('Start meeting');
  });

  it('honors joinDisabled override even when permission is granted', () => {
    render(<HangoutPreJoinShell {...baseProps({ joinDisabled: true })} />);
    expect(screen.getByTestId('prejoin-join-button')).toBeDisabled();
  });

  it('renders subtitleOverride when provided', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ subtitleOverride: 'CUSTOM SUBTITLE' })}
      />,
    );
    expect(screen.getAllByText('CUSTOM SUBTITLE')).toHaveLength(1);
  });

  it('shows readyLoading spinner instead of roster when readyLoading=true', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyLoading: true,
          readyState: 'ready',
          participants: [{ participantId: 'alice', ready: true }],
        })}
      />,
    );
    // The subtitle owns "Checking room…"; the roster says something else,
    // so the same sentence never appears twice on screen.
    expect(screen.getAllByText(/Checking room/)).toHaveLength(1);
    expect(screen.getByText(/Finding people/)).toBeInTheDocument();
    expect(screen.queryByText('alice')).not.toBeInTheDocument();
  });

  it('fires onCancel from the single Cancel action beside Join', () => {
    const onCancel = vi.fn();
    render(<HangoutPreJoinShell {...baseProps({ onCancel })} />);
    // One Cancel only — the old header bar carried a second one.
    expect(screen.getAllByText('Cancel')).toHaveLength(1);
    fireEvent.click(screen.getByTestId('prejoin-cancel'));
    expect(onCancel).toHaveBeenCalled();
  });

  it('truncates roster to 8 entries + shows "+N more" overflow', () => {
    const participants = Array.from({ length: 12 }, (_, i) => ({
      participantId: `p-${i.toString().padStart(2, '0')}`,
      ready: true,
    }));
    render(
      <HangoutPreJoinShell {...baseProps({ readyState: 'ready', participants })} />,
    );
    // 8 visible
    expect(screen.getByText('p-00')).toBeInTheDocument();
    expect(screen.getByText('p-07')).toBeInTheDocument();
    expect(screen.queryByText('p-08')).not.toBeInTheDocument();
    expect(screen.getByText('+4 more')).toBeInTheDocument();
  });

  // ── camera-off identity tile (Meet/Teams parity) ───────────────────────
  // When `localIdentity` is provided, the camera-off branch renders an
  // avatar + name tile instead of the bare "Camera off" text. The bare
  // fallback is preserved for legacy consumers that don't pass identity.

  it('renders the identity tile (avatar + name + "Camera off") when localIdentity provided and camera toggled off', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          videoEnabled: false,
          localIdentity: { displayName: 'Alice Liddell' },
        })}
      />,
    );
    expect(screen.getByTestId('prejoin-identity-tile')).toBeInTheDocument();
    expect(screen.getByText('Alice Liddell')).toBeInTheDocument();
    expect(screen.getByText('Camera off')).toBeInTheDocument();
    // The bare text fallback must NOT also render — only one or the other.
    expect(screen.queryByTestId('prejoin-camera-off-fallback')).not.toBeInTheDocument();
  });

  it('falls back to the bare "Camera off" text when localIdentity is omitted (legacy consumer)', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ videoEnabled: false /* no localIdentity */ })}
      />,
    );
    expect(screen.getByTestId('prejoin-camera-off-fallback')).toBeInTheDocument();
    expect(screen.getByText('Camera off')).toBeInTheDocument();
    expect(screen.queryByTestId('prejoin-identity-tile')).not.toBeInTheDocument();
  });

  it('renders neither identity tile nor bare fallback when the camera is ON', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          videoEnabled: true,
          localIdentity: { displayName: 'Alice Liddell' },
        })}
      />,
    );
    expect(screen.queryByTestId('prejoin-identity-tile')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prejoin-camera-off-fallback')).not.toBeInTheDocument();
  });

  it('renders avatar image when avatarSrc is provided', () => {
    const { container } = render(
      <HangoutPreJoinShell
        {...baseProps({
          videoEnabled: false,
          localIdentity: {
            displayName: 'Alice Liddell',
            avatarSrc: 'https://example.test/alice.png',
          },
        })}
      />,
    );
    const img = container.querySelector('img[src="https://example.test/alice.png"]');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('alt', 'Alice Liddell');
  });

  it('falls back to initials when avatarSrc is absent', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          videoEnabled: false,
          localIdentity: { displayName: 'Alice Liddell' },
        })}
      />,
    );
    // Avatar with no src renders nameToInitials(name) — 'AL' for two words.
    const tile = screen.getByTestId('prejoin-identity-tile');
    expect(tile.textContent).toContain('AL');
  });

  it('camera-off identity tile suppresses the permission-pending spinner state', () => {
    // Edge case: localIdentity + permission='granted' + videoEnabled=false
    // is the ONLY combination that yields the identity tile. permission
    // != 'granted' takes a different render path entirely (permission
    // card / pending spinner), so the tile must not bleed across.
    render(
      <HangoutPreJoinShell
        {...baseProps({
          videoEnabled: false,
          permission: 'pending',
          localIdentity: { displayName: 'Alice Liddell' },
        })}
      />,
    );
    expect(screen.queryByTestId('prejoin-identity-tile')).not.toBeInTheDocument();
  });

  // ── effectsSlot (media-effects tray) ───────────────────────────────────
  // Optional slot between the camera preview and the Join controls,
  // intended for <MediaEffectsTray>. Omitted = rendering unchanged.

  it('renders the effectsSlot content when provided', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          effectsSlot: <div data-testid="my-effects-tray">effects</div>,
        })}
      />,
    );
    expect(screen.getByTestId('prejoin-effects-slot')).toBeInTheDocument();
    expect(screen.getByTestId('my-effects-tray')).toBeInTheDocument();
  });

  it('renders no slot wrapper at all when effectsSlot is omitted', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.queryByTestId('prejoin-effects-slot')).not.toBeInTheDocument();
  });

  it('places the effectsSlot between the pre-flight toggles and the Join button', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ effectsSlot: <div>effects</div> })}
      />,
    );
    const toggles = screen.getByTestId('prejoin-toggle-video');
    const slot = screen.getByTestId('prejoin-effects-slot');
    const join = screen.getByTestId('prejoin-join-button');
    expect(
      toggles.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      slot.compareDocumentPosition(join) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
  // ── device settings (Teams-style gear on the stage bar) ────────────────
  // The shell never enumerates devices — `devicesSlot` arrives whole. The
  // gear only exists when there is something for it to open.

  it('renders no gear when devicesSlot is omitted', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.queryByTestId('prejoin-devices-toggle')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();
  });

  it('renders the gear, closed, when devicesSlot is provided', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ devicesSlot: <div data-testid="my-devices">pickers</div> })}
      />,
    );
    const gear = screen.getByTestId('prejoin-devices-toggle');
    expect(gear).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();
    expect(screen.queryByTestId('my-devices')).not.toBeInTheDocument();
  });

  it('opens and closes the device panel from the gear (uncontrolled)', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ devicesSlot: <div data-testid="my-devices">pickers</div> })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    const panel = screen.getByTestId('prejoin-devices-panel');
    expect(panel).toBeInTheDocument();
    expect(screen.getByText('Device settings')).toBeInTheDocument();
    expect(screen.getByTestId('my-devices')).toBeInTheDocument();
    expect(screen.getByTestId('prejoin-devices-toggle')).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();
  });

  it('closes the device panel from its own close button', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ devicesSlot: <div data-testid="my-devices">pickers</div> })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    fireEvent.click(screen.getByTestId('prejoin-devices-close'));
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();
  });

  it('keeps the Join button rendered while the device panel is open', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({ devicesSlot: <div>pickers</div> })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    const panel = screen.getByTestId('prejoin-devices-panel');
    const join = screen.getByTestId('prejoin-join-button');
    expect(join).toBeInTheDocument();
    expect(
      panel.compareDocumentPosition(join) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('lets devicesOpen drive the panel and reports through onToggleDevices', () => {
    const onToggleDevices = vi.fn();
    const { rerender } = render(
      <HangoutPreJoinShell
        {...baseProps({
          devicesSlot: <div data-testid="my-devices">pickers</div>,
          devicesOpen: false,
          onToggleDevices,
        })}
      />,
    );
    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    expect(onToggleDevices).toHaveBeenCalledWith(true);
    // Controlled: the prop, not the click, decides what renders.
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();

    rerender(
      <HangoutPreJoinShell
        {...baseProps({
          devicesSlot: <div data-testid="my-devices">pickers</div>,
          devicesOpen: true,
          onToggleDevices,
        })}
      />,
    );
    expect(screen.getByTestId('prejoin-devices-panel')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('prejoin-devices-close'));
    expect(onToggleDevices).toHaveBeenLastCalledWith(false);
  });

  it('ignores devicesOpen when there is no devicesSlot to show', () => {
    render(<HangoutPreJoinShell {...baseProps({ devicesOpen: true })} />);
    expect(screen.queryByTestId('prejoin-devices-panel')).not.toBeInTheDocument();
    expect(screen.queryByTestId('prejoin-devices-toggle')).not.toBeInTheDocument();
  });

  it('swaps the roster for the device panel, then restores it on close', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          readyState: 'ready',
          participants: [{ participantId: 'alice-123', ready: true }],
          devicesSlot: <div>pickers</div>,
        })}
      />,
    );
    expect(screen.getByText('alice-12')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('prejoin-devices-toggle'));
    expect(screen.queryByText('alice-12')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('prejoin-devices-close'));
    expect(screen.getByText('alice-12')).toBeInTheDocument();
  });

  // ── secondaryActions ───────────────────────────────────────────────────

  it('renders secondaryActions between Join and Cancel', () => {
    render(
      <HangoutPreJoinShell
        {...baseProps({
          secondaryActions: <button type="button">Other join options</button>,
        })}
      />,
    );
    const join = screen.getByTestId('prejoin-join-button');
    const extra = screen.getByTestId('prejoin-secondary-actions');
    const cancel = screen.getByTestId('prejoin-cancel');
    expect(
      join.compareDocumentPosition(extra) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      extra.compareDocumentPosition(cancel) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('renders no secondaryActions wrapper when the prop is omitted', () => {
    render(<HangoutPreJoinShell {...baseProps()} />);
    expect(screen.queryByTestId('prejoin-secondary-actions')).not.toBeInTheDocument();
  });

  // ── the toggles live on the stage, not loose below it ──────────────────

  it('places the mic/cam toggles inside the preview stage', () => {
    const { container } = render(<HangoutPreJoinShell {...baseProps()} />);
    const stage = container.querySelector('.aspect-video');
    expect(stage).not.toBeNull();
    expect(stage!.contains(screen.getByTestId('prejoin-toggle-audio'))).toBe(true);
    expect(stage!.contains(screen.getByTestId('prejoin-toggle-video'))).toBe(true);
  });
});
