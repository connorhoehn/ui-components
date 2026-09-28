import { describe, it, expect, vi } from 'vitest';
import { useRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AudioVideoSettingsForm, type AudioVideoSettings } from '../AudioVideoSettingsForm';
import { IncomingCallPopover, type IncomingCallPopoverProps } from '../IncomingCallPopover';
import { StartCallDrawer, type StartCallDrawerProps } from '../StartCallDrawer';
import { CallSettingsDrawer } from '../CallSettingsDrawer';
import { CallDock, formatCallElapsed, type CallDockProps } from '../CallDock';
import { DocumentCallPanel, type DocumentCallPanelProps } from '../DocumentCallPanel';

const noop = () => {};
const DEV = {
  microphones: [{ deviceId: 'm', label: 'MacBook Pro Microphone' }],
  speakers: [{ deviceId: 's', label: 'MacBook Pro Speakers' }],
  cameras: [{ deviceId: 'c', label: 'FaceTime HD Camera' }],
};
const AV: AudioVideoSettings = {
  noiseSuppression: true,
  echoCancellation: true,
  autoGainControl: true,
  volume: 0.6,
  mirrorPreview: true,
  quality: 'auto',
  frameRate: 'auto',
  rememberDevices: true,
};

function av(over: Partial<Parameters<typeof AudioVideoSettingsForm>[0]> = {}) {
  return render(
    <AudioVideoSettingsForm
      value={AV}
      onChange={noop}
      devices={DEV}
      permission={{ microphone: 'granted', camera: 'granted' }}
      micLevel={0.5}
      previewStream={null}
      cameraOn={false}
      speakerSelectionSupported
      onTestMic={noop}
      onTestSound={noop}
      {...over}
    />,
  );
}

describe('AudioVideoSettingsForm', () => {
  it('lists the devices and reports changes immediately', () => {
    const onChange = vi.fn();
    av({ onChange });
    expect(screen.getByTestId('settings-mic-select')).toBeTruthy();
    expect(screen.getByTestId('settings-speaker-select')).toBeTruthy();
    fireEvent.click(screen.getByTestId('settings-noise'));
    expect(onChange).toHaveBeenCalledWith({ ...AV, noiseSuppression: false });
    expect(screen.getByText('Camera is off')).toBeTruthy();
  });

  it('hides Speakers when setSinkId is unsupported, keeping the volume row', () => {
    av({ speakerSelectionSupported: false });
    expect(screen.queryByTestId('settings-speaker-select')).toBeNull();
    expect(screen.getByTestId('settings-volume')).toBeTruthy();
    expect(screen.getByTestId('settings-test-sound')).toBeTruthy();
  });

  it('swaps the microphone select for the blocked alert', () => {
    av({ permission: { microphone: 'denied', camera: 'granted' } });
    expect(screen.queryByTestId('settings-mic-select')).toBeNull();
    expect(screen.getByTestId('settings-mic-denied').textContent).toContain('Microphone blocked');
    expect((screen.getByTestId('settings-test-mic') as HTMLButtonElement).disabled).toBe(true);
  });

  it('labels Test mic by its state', () => {
    av({ testMicState: 'recording' });
    expect(screen.getByTestId('settings-test-mic').textContent).toBe('Recording…');
  });
});

function Popover(props: Partial<IncomingCallPopoverProps>) {
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button ref={ref} type="button">Call</button>
      <IncomingCallPopover
        open
        anchorRef={ref}
        caller={{ name: 'Connor Hoehn' }}
        title="Auth architecture review"
        documents={[
          { id: 'a', title: 'Auth architecture' },
          { id: 'b', title: 'Migration brief' },
        ]}
        onOpenDocument={noop}
        participants={[{ id: '1', name: 'Connor Hoehn' }]}
        participantCount={3}
        mic={{ on: true, onToggle: noop, devices: DEV.microphones, onSelectDevice: noop, permission: 'granted' }}
        camera={{ on: false, onToggle: noop, devices: DEV.cameras, onSelectDevice: noop, permission: 'granted' }}
        onOpenSettings={noop}
        onJoin={noop}
        onDecline={noop}
        onDismiss={noop}
        {...props}
      />
    </>
  );
}

describe('IncomingCallPopover', () => {
  it('renders the full copy', () => {
    render(<Popover />);
    expect(screen.getByText('Incoming call')).toBeTruthy();
    expect(screen.getByText('invited you to a review')).toBeTruthy();
    expect(screen.getByTestId('incoming-call-more').textContent).toBe('+1 document');
    expect(screen.getByText('3 people in the call')).toBeTruthy();
    expect(screen.getByText('Mic on')).toBeTruthy();
    expect(screen.getByText('Camera off')).toBeTruthy();
  });

  it('renders the compact copy and declines from the ×', () => {
    const onDecline = vi.fn();
    render(<Popover compact onDecline={onDecline} />);
    expect(screen.getByTestId('incoming-call-caller').textContent).toContain('invited you');
    expect(screen.queryByText('invited you to a review')).toBeNull();
    expect(screen.getByTestId('incoming-call-more').textContent).toBe('+1');
    expect(screen.getByTestId('incoming-call-participants').textContent).toBe('3 in call');
    fireEvent.click(screen.getByTestId('incoming-call-close'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });

  it('offers Switch when busy', () => {
    const onSwitch = vi.fn();
    render(<Popover compact busy onSwitch={onSwitch} />);
    expect(screen.queryByTestId('incoming-call-join')).toBeNull();
    fireEvent.click(screen.getByTestId('incoming-call-switch'));
    expect(onSwitch).toHaveBeenCalled();
  });
});

function start(over: Partial<StartCallDrawerProps> = {}) {
  return render(
    <StartCallDrawer
      open
      onClose={noop}
      title="Auth architecture review"
      onTitleChange={noop}
      media="video"
      onMediaChange={noop}
      documents={{ items: [{ id: 'a', title: 'Auth architecture', removable: false }], onAdd: noop, onRemove: noop }}
      onManageAccess={noop}
      people={{ query: '', onQueryChange: noop, chips: [], onRemoveChip: noop, collaborators: { rows: [], selected: [], onToggle: noop } }}
      message=""
      onMessageChange={noop}
      ring
      onRingChange={noop}
      precheck={{ micOn: true, cameraOn: true, permission: 'granted', onToggleMic: noop, onToggleCamera: noop, onOpenSettings: noop }}
      selectedCount={0}
      onCopyLink={noop}
      onStart={noop}
      {...over}
    />,
  );
}

describe('StartCallDrawer', () => {
  it('says how many people are selected', () => {
    const { rerender } = start({ selectedCount: 0 });
    expect(screen.getByTestId('start-call-selected-count').textContent).toBe('No one selected');
    rerender(<></>);
    start({ selectedCount: 1 });
    expect(screen.getAllByTestId('start-call-selected-count').at(-1)!.textContent).toBe('1 person selected');
    start({ selectedCount: 2 });
    expect(screen.getAllByTestId('start-call-selected-count').at(-1)!.textContent).toBe('2 people selected');
  });

  it('disables Start call with a reason', () => {
    const onStart = vi.fn();
    start({ startDisabledReason: 'Waiting for microphone permission', onStart });
    const btn = screen.getByTestId('start-call-submit') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.title).toBe('Waiting for microphone permission');
  });

  it('hides the camera pre-check for an audio call', () => {
    start({ media: 'audio' });
    expect(screen.queryByTestId('start-call-precheck-camera')).toBeNull();
    expect(screen.getByTestId('start-call-precheck-mic')).toBeTruthy();
  });

  it('shows Starting… and the retry banner', () => {
    const onRetry = vi.fn();
    start({ starting: true, error: { message: 'nope', onRetry } });
    expect(screen.getByTestId('start-call-submit').textContent).toContain('Starting…');
    fireEvent.click(screen.getByTestId('start-call-retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});

describe('CallSettingsDrawer', () => {
  it('Done on Audio & video; changes/Cancel/Apply on Effects', () => {
    const onClose = vi.fn();
    const onApply = vi.fn();
    render(
      <CallSettingsDrawer
        open
        onClose={onClose}
        audioVideo={<p>av</p>}
        effects={<p>fx</p>}
        captions={<p>cc</p>}
        effectsFooter={{ changeCount: 2, onCancel: noop, onApply }}
      />,
    );
    expect(screen.getByText('Devices update immediately')).toBeTruthy();
    fireEvent.click(screen.getByTestId('settings-done'));
    expect(onClose).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('call-settings-tab-effects'));
    expect(screen.getByText('fx')).toBeTruthy();
    expect(screen.getByTestId('effects-changes').textContent).toBe('2 changes');
    fireEvent.click(screen.getByTestId('effects-apply'));
    expect(onApply).toHaveBeenCalled();
  });
});

const dockBase: CallDockProps = {
  title: 'Auth architecture review',
  participantCount: 2,
  elapsedMs: 581_000,
  phase: 'active',
  documents: [{ id: 'a', title: 'Auth architecture' }],
  participants: [
    { id: 'me', userId: 'me', displayName: 'Me', cameraOn: false, audioOn: true, screenSharing: false, presenting: false, connection: 'connected' },
    { id: 'al', userId: 'al', displayName: 'Alice Chen', cameraOn: false, audioOn: true, screenSharing: false, presenting: true, connection: 'connected' },
  ],
  localParticipantId: 'me',
  followingUserId: 'al',
  mic: { on: true, onToggle: noop, devices: DEV.microphones, onSelectDevice: noop, permission: 'granted' },
  camera: { on: false, onToggle: noop, devices: DEV.cameras, onSelectDevice: noop, permission: 'granted' },
  screenShare: { on: false, onToggle: noop },
  onOpenPeople: noop,
  onOpenDocuments: noop,
  onOpenSettings: noop,
  onPopOut: noop,
  onLeave: noop,
};

describe('CallDock', () => {
  it('formats elapsed time', () => {
    expect(formatCallElapsed(581_000)).toBe('09:41');
    expect(formatCallElapsed(3_723_000)).toBe('1:02:03');
  });

  it('shows the meta, the tiles and the followed ring', () => {
    render(<CallDock {...dockBase} />);
    expect(screen.getByTestId('call-dock-meta').textContent).toBe('2 people · 09:41');
    expect(screen.getByTestId('call-tile-al').getAttribute('data-highlighted')).toBe('true');
    expect(screen.getByTestId('call-dock-document-a')).toBeTruthy();
  });

  it('asks the host before leaving, and ends for everyone', () => {
    const onLeave = vi.fn();
    const onEndForEveryone = vi.fn();
    render(<CallDock {...dockBase} canEndForEveryone onEndForEveryone={onEndForEveryone} onLeave={onLeave} />);
    fireEvent.click(screen.getByTestId('call-dock-leave'));
    expect(onLeave).not.toHaveBeenCalled();
    expect(screen.getByText('Leave the call? Others stay on.')).toBeTruthy();
    fireEvent.click(screen.getByTestId('call-dock-end-for-everyone'));
    expect(onEndForEveryone).toHaveBeenCalled();
  });

  it('connecting disables the controls except Leave; ended and error have their own lines', () => {
    const { rerender } = render(<CallDock {...dockBase} phase="connecting" />);
    expect(screen.getByTestId('call-dock-meta').textContent).toBe('Connecting…');
    expect((screen.getByTestId('call-dock-people') as HTMLButtonElement).disabled).toBe(true);
    expect((screen.getByTestId('call-dock-leave') as HTMLButtonElement).disabled).toBe(false);
    rerender(<CallDock {...dockBase} phase="ended" endedSummary="Not recorded (off)" onDismiss={noop} />);
    expect(screen.getByTestId('call-dock-ended').textContent).toContain('Call ended · 09:41 · Not recorded (off)');
    const onRetry = vi.fn();
    rerender(<CallDock {...dockBase} phase="error" error={{ message: 'gone', onRetry }} />);
    fireEvent.click(screen.getByTestId('call-dock-rejoin'));
    expect(onRetry).toHaveBeenCalled();
  });
});

function panel(over: Partial<DocumentCallPanelProps> = {}) {
  const base = { isHost: false, state: 'in-call' as const, audioOn: true, cameraOn: true, screenSharing: false, presenting: false };
  return render(
    <DocumentCallPanel
      title="Auth architecture review"
      participantCount={2}
      elapsedMs={581_000}
      people={{
        people: [
          { ...base, userId: 'me', name: 'Connor', isLocal: true, isHost: true },
          { ...base, userId: 'al', name: 'Alice', isLocal: false },
        ],
        count: 2,
        canModerate: true,
        onInvite: noop,
        onFollow: noop,
        onMuteForMe: noop,
      }}
      documents={{ items: [{ id: 'a', title: 'Auth architecture' }], count: 1, onAdd: noop, onOpen: noop }}
      presenting={null}
      currentDocumentId="a"
      canPresent
      onPresent={noop}
      onCopyLink={noop}
      onManageAccess={noop}
      onPopOut={noop}
      onClose={noop}
      {...over}
    />,
  );
}

describe('DocumentCallPanel', () => {
  it('presents this document, then offers to stop', () => {
    const onPresent = vi.fn();
    const { rerender } = panel({ onPresent });
    fireEvent.click(screen.getByTestId('call-present'));
    expect(onPresent).toHaveBeenCalledWith('a');
    rerender(<></>);
    panel({ onPresent, presenting: { documentId: 'a', userId: 'me', name: 'Connor' } });
    expect(screen.getByTestId('call-present').textContent).toContain('Stop presenting');
    fireEvent.click(screen.getByTestId('call-present'));
    expect(onPresent).toHaveBeenLastCalledWith(null);
  });

  it('disables Present with the reason when someone else presents', () => {
    panel({ canPresent: false, presentDisabledReason: 'Alice is presenting', presenting: { documentId: 'a', userId: 'al', name: 'Alice' } });
    const btn = screen.getByTestId('call-present') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.title).toBe('Alice is presenting');
  });

  it('has the pop-out, close and copy-link hooks', () => {
    const onClose = vi.fn();
    panel({ onClose });
    fireEvent.click(screen.getByTestId('call-panel-close'));
    expect(onClose).toHaveBeenCalled();
    expect(screen.getByTestId('call-panel-popout')).toBeTruthy();
    expect(screen.getByTestId('call-copy-link')).toBeTruthy();
    expect(screen.getByTestId('call-panel-meta').textContent).toBe('2 people · 09:41');
  });
});

describe('CallDock camera-off audio (REQUEST A-4)', () => {
  it('keeps a camera-off remote person\'s media element mounted so their audio plays', () => {
    render(
      <CallDock
        {...dockBase}
        participants={[
          dockBase.participants[0]!,
          {
            ...dockBase.participants[1]!,
            cameraOn: false,
            videoElement: <video data-testid="alice-media" />,
            audioElement: <audio data-testid="alice-audio" />,
          },
        ]}
      />,
    );
    const tile = screen.getByTestId('call-tile-al');
    expect(tile.getAttribute('data-track-kind')).toBe('avatar');
    expect(screen.getByText('AC')).toBeTruthy();
    // Still in the DOM (inside an invisible sink), not unmounted.
    expect(screen.getByTestId('alice-media')).toBeTruthy();
    expect(screen.getByTestId('call-tile-al-media-sink').contains(screen.getByTestId('alice-media'))).toBe(true);
    expect(screen.getByTestId('call-tile-al-audio-sink').contains(screen.getByTestId('alice-audio'))).toBe(true);
  });

  it('shows the video when the camera is on', () => {
    render(
      <CallDock
        {...dockBase}
        participants={[dockBase.participants[0]!, { ...dockBase.participants[1]!, cameraOn: true, videoElement: <video data-testid="alice-media" /> }]}
      />,
    );
    expect(screen.getByTestId('call-tile-al').getAttribute('data-track-kind')).toBe('camera');
    expect(screen.queryByTestId('call-tile-al-media-sink')).toBeNull();
  });
});

describe('2.391.1 mockup-first follow-ups', () => {
  it('Present stays live as "take over" when the viewer may present over someone else', () => {
    const onPresent = vi.fn();
    panel({ onPresent, canPresent: true, presenting: { documentId: 'a', userId: 'al', name: 'Alice' } });
    const btn = screen.getByTestId('call-present') as HTMLButtonElement;
    expect(btn.disabled).toBe(false);
    expect(btn.title).toBe('Take over from Alice');
    expect(btn.textContent).toContain('Present this document');
    fireEvent.click(btn);
    expect(onPresent).toHaveBeenCalledWith('a');
  });

  it('your own row has a ⋯ menu with Call settings and Leave call', () => {
    const onLeave = vi.fn();
    const base = { isHost: false, state: 'in-call' as const, audioOn: true, cameraOn: true, screenSharing: false, presenting: false };
    panel({
      people: {
        people: [{ ...base, userId: 'me', name: 'Connor', isLocal: true, isHost: true }],
        count: 1,
        canModerate: true,
        onInvite: noop,
        onFollow: noop,
        onMuteForMe: noop,
        onOpenSelfSettings: noop,
        onLeave,
      },
    });
    fireEvent.click(screen.getByTestId('call-person-menu-me'));
    expect(screen.getByText('Call settings')).toBeTruthy();
    fireEvent.click(screen.getByText('Leave call'));
    expect(onLeave).toHaveBeenCalled();
  });

  it('a camera-off dock tile is the grey tile', () => {
    render(<CallDock {...dockBase} />);
    expect(screen.getByTestId('call-tile-al').className).toContain('bg-video-tile-off');
  });
});

describe('CallDock header sizing (2.394.0)', () => {
  it('title and meta keep their natural width; only the chips shrink, and they fold below 1240px', () => {
    render(<CallDock {...dockBase} />);
    expect(screen.getByTestId('call-dock-title').className).toContain('shrink-0');
    expect(screen.getByTestId('call-dock-meta').className).toContain('shrink-0');
    const chips = screen.getByTestId('call-dock-documents-chips').className;
    expect(chips).toContain('flex-1');
    expect(chips).toContain('overflow-hidden');
    expect(chips).toContain('@min-[1240px]:flex');
  });
});

describe('CallDock in a conversation (2.400.0)', () => {
  it('renders no document chips and no Documents button without documents', () => {
    const { documents: _d, onOpenDocuments: _o, ...rest } = dockBase;
    render(<CallDock {...rest} title="#general" />);
    expect(screen.getByTestId('call-dock-title').textContent).toBe('#general');
    expect(screen.queryByTestId('call-dock-documents-chips')).toBeNull();
    expect(screen.queryByTestId('call-dock-documents')).toBeNull();
    expect(screen.getByTestId('call-dock-people')).toBeTruthy();
  });

  it('places extras in the controls row after People and before the settings gear', () => {
    render(
      <CallDock
        {...dockBase}
        extras={
          <button type="button" data-testid="my-reactions">
            React
          </button>
        }
      />,
    );
    const extras = screen.getByTestId('call-dock-extras');
    expect(extras.contains(screen.getByTestId('my-reactions'))).toBe(true);
    const people = screen.getByTestId('call-dock-people');
    const gear = screen.getByTestId('call-dock-settings');
    expect(people.compareDocumentPosition(extras) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(extras.compareDocumentPosition(gear) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(people.parentElement).toBe(extras.parentElement);
  });
});
