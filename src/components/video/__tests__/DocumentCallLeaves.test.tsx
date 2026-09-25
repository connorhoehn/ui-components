import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { DeviceToggleSelect } from '../DeviceToggleSelect';
import { CallTileRow } from '../CallTileRow';
import { ReviewDocumentList } from '../ReviewDocumentList';
import { CallPeopleList, callPersonStatus, type CallPerson } from '../CallPeopleList';
import { CollaboratorCheckList } from '../CollaboratorCheckList';
import { AudioLevelMeter } from '../AudioLevelMeter';
import { MediaPrecheckRow } from '../MediaPrecheckRow';

const MICS = [
  { deviceId: 'a', label: 'MacBook Pro Microphone' },
  { deviceId: 'b', label: 'AirPods Pro' },
];

describe('DeviceToggleSelect', () => {
  it('toggles without opening the menu, and the menu lists the devices', () => {
    const onToggle = vi.fn();
    const onSelectDevice = vi.fn();
    render(
      <DeviceToggleSelect kind="microphone" on onToggle={onToggle} devices={MICS} selectedDeviceId="a" onSelectDevice={onSelectDevice} permission="granted" data-testid="mic" />,
    );
    fireEvent.click(screen.getByTestId('mic'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('AirPods Pro')).toBeNull();

    fireEvent.click(screen.getByTestId('mic-menu'));
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(screen.getByText('MacBook Pro Microphone')).toBeTruthy();
    fireEvent.click(screen.getByText('AirPods Pro'));
    expect(onSelectDevice).toHaveBeenCalledWith('b');
  });

  it('is disabled with the reason when the browser blocks the device', () => {
    const onToggle = vi.fn();
    render(<DeviceToggleSelect kind="microphone" on onToggle={onToggle} devices={MICS} onSelectDevice={() => {}} permission="denied" data-testid="mic" />);
    const btn = screen.getByTestId('mic') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.title).toBe('Microphone blocked in the browser');
    fireEvent.click(btn);
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('shows the label form ("Mic on" / "Camera off")', () => {
    render(
      <>
        <DeviceToggleSelect kind="microphone" showLabel on onToggle={() => {}} devices={MICS} onSelectDevice={() => {}} permission="granted" />
        <DeviceToggleSelect kind="camera" showLabel on={false} onToggle={() => {}} devices={[]} onSelectDevice={() => {}} permission="granted" />
      </>,
    );
    expect(screen.getByText('Mic on')).toBeTruthy();
    expect(screen.getByText('Camera off')).toBeTruthy();
  });
});

describe('CallTileRow dock variant', () => {
  const people = Array.from({ length: 8 }, (_, i) => ({ id: `u${i}`, displayName: `Person ${i}` }));

  it('draws highlightedId with the accent ring and the viewer first as "You"', () => {
    render(
      <CallTileRow variant="dock" participants={people.slice(0, 3)} localParticipant={{ id: 'me', displayName: 'Me', isLocal: true }} highlightedId="u1" />,
    );
    const tiles = screen.getByTestId('call-tile-row').querySelectorAll('[data-peer-id]');
    expect(tiles[0]!.getAttribute('data-peer-id')).toBe('me');
    expect(within(tiles[0] as HTMLElement).getByText('You')).toBeTruthy();
    const hi = screen.getByTestId('call-tile-u1');
    expect(hi.getAttribute('data-highlighted')).toBe('true');
    expect(screen.getByTestId('call-tile-u1-ring').className).toContain('ring-primary');
    expect(screen.getByTestId('call-tile-u1-ring').className).toContain('ring-inset');
    expect(screen.getByTestId('call-tile-u0').getAttribute('data-highlighted')).toBe('false');
  });

  it('collapses past maxVisible to a +N tile, or keeps every tile when scrolling', () => {
    const { unmount } = render(<CallTileRow variant="dock" participants={people} maxVisible={6} />);
    expect(screen.getAllByTestId(/^call-tile-u/)).toHaveLength(5);
    expect(screen.getByTestId('call-tile-overflow').getAttribute('aria-label')).toBe('3 more');
    unmount();
    render(<CallTileRow variant="dock" participants={people} overflow="scroll" />);
    expect(screen.getAllByTestId(/^call-tile-u/)).toHaveLength(8);
    expect(screen.queryByTestId('call-tile-overflow')).toBeNull();
  });

  it('marks muted people and draws initials when the camera is off', () => {
    render(<CallTileRow variant="dock" participants={[{ id: 'b', displayName: 'Bob Martinez', isMuted: true }]} />);
    const t = screen.getByTestId('call-tile-b');
    expect(t.getAttribute('data-is-muted')).toBe('true');
    expect(t.getAttribute('data-track-kind')).toBe('avatar');
    expect(within(t).getByText('BM')).toBeTruthy();
  });
});

describe('ReviewDocumentList', () => {
  it('hides the × on rows that cannot be removed', () => {
    const onRemove = vi.fn();
    render(
      <ReviewDocumentList
        trailing="remove"
        onRemove={onRemove}
        rowTestIdPrefix="doc"
        items={[
          { id: 'a', title: 'Auth architecture', removable: false },
          { id: 'b', title: 'Migration brief' },
        ]}
      />,
    );
    expect(screen.queryByTestId('doc-remove-a')).toBeNull();
    fireEvent.click(screen.getByTestId('doc-remove-b'));
    expect(onRemove).toHaveBeenCalledWith('b');
  });

  it('open rows carry the subline and the selected state', () => {
    const onOpen = vi.fn();
    render(
      <ReviewDocumentList
        trailing="open"
        onOpen={onOpen}
        items={[
          { id: 'a', title: 'Auth architecture', selected: true, subline: 'Presenting · Alice' },
          { id: 'b', title: 'Migration brief', subline: 'Up next' },
        ]}
      />,
    );
    expect(screen.getByTestId('call-document-a').getAttribute('data-selected')).toBe('true');
    expect(screen.getByText('Presenting · Alice')).toBeTruthy();
    fireEvent.click(screen.getByTestId('call-document-open-b'));
    expect(onOpen).toHaveBeenCalledWith('b');
  });
});

const base: CallPerson = {
  userId: 'x',
  name: 'X',
  isLocal: false,
  isHost: false,
  state: 'in-call',
  audioOn: true,
  cameraOn: true,
  screenSharing: false,
  presenting: false,
};

describe('CallPeopleList', () => {
  it('picks one sub-status by precedence', () => {
    expect(callPersonStatus({ ...base, presenting: true, screenSharing: true, cameraOn: false }).label).toBe('Presenting');
    expect(callPersonStatus({ ...base, screenSharing: true, cameraOn: false }).label).toBe('Sharing screen');
    expect(callPersonStatus({ ...base, cameraOn: false }).label).toBe('Camera off');
    expect(callPersonStatus({ ...base, state: 'reconnecting' }).label).toBe('Reconnecting…');
    expect(callPersonStatus({ ...base, state: 'reconnecting', cameraOn: false }).label).toBe('Reconnecting…');
    expect(callPersonStatus({ ...base, state: 'ringing', cameraOn: false }).label).toBe('Ringing…');
    expect(callPersonStatus({ ...base, state: 'missed' }).label).toBe("Didn't answer");
    expect(callPersonStatus({ ...base, state: 'declined' }).label).toBe('Declined');
    expect(callPersonStatus({ ...base, state: 'left' }).label).toBe('Left');
    expect(callPersonStatus({ ...base, isHost: true }).label).toBe('Host');
    expect(callPersonStatus({ ...base, isHost: true, presenting: true }).label).toBe('Host · Presenting');
    expect(callPersonStatus(base).label).toBe('');
  });

  function renderList(canModerate: boolean) {
    const handlers = { onInvite: vi.fn(), onFollow: vi.fn(), onMuteForMe: vi.fn(), onMute: vi.fn(), onRemove: vi.fn(), onMakeHost: vi.fn() };
    render(
      <CallPeopleList
        people={[
          { ...base, userId: 'me', name: 'Connor Hoehn', isLocal: true, isHost: true },
          { ...base, userId: 'al', name: 'Alice Chen', presenting: true },
        ]}
        count={2}
        canModerate={canModerate}
        {...handlers}
      />,
    );
    return handlers;
  }

  it('shows host-only items to the host', () => {
    const h = renderList(true);
    fireEvent.click(screen.getByTestId('call-person-menu-al'));
    expect(screen.getByText('Follow')).toBeTruthy();
    expect(screen.getByText('Mute for me')).toBeTruthy();
    expect(screen.getByText('Mute')).toBeTruthy();
    expect(screen.getByText('Make host')).toBeTruthy();
    fireEvent.click(screen.getByText('Remove from call'));
    expect(h.onRemove).toHaveBeenCalledWith('al');
    expect(screen.getByText('(you)')).toBeTruthy();
    expect(screen.getByTestId('call-person-status-al').textContent).toContain('Presenting');
  });

  it('hides them from everyone else', () => {
    renderList(false);
    fireEvent.click(screen.getByTestId('call-person-menu-al'));
    expect(screen.getByText('Mute for me')).toBeTruthy();
    expect(screen.queryByText('Make host')).toBeNull();
    expect(screen.queryByText('Remove from call')).toBeNull();
    expect(screen.queryByText('Mute')).toBeNull();
  });

  it('offers Ring again on a missed row', () => {
    const onRingAgain = vi.fn();
    render(
      <CallPeopleList people={[{ ...base, userId: 'bob', name: 'Bob', state: 'missed' }]} count={1} canModerate={false} onInvite={() => {}} onFollow={() => {}} onMuteForMe={() => {}} onRingAgain={onRingAgain} />,
    );
    fireEvent.click(screen.getByTestId('call-person-ring-bob'));
    expect(onRingAgain).toHaveBeenCalledWith('bob');
  });
});

describe('CollaboratorCheckList', () => {
  it('ticks from anywhere on the row and disables self', () => {
    const onToggle = vi.fn();
    render(
      <CollaboratorCheckList
        rows={[
          { userId: 'a', name: 'Alice Chen', presence: 'online', statusLabel: 'Online' },
          { userId: 'me', name: 'Me', presence: 'online', statusLabel: 'Online', disabledReason: 'You' },
        ]}
        selected={[]}
        onToggle={onToggle}
      />,
    );
    fireEvent.click(screen.getByText('Alice Chen'));
    expect(onToggle).toHaveBeenCalledWith('a', true);
    expect((screen.getByTestId('start-call-collaborator-check-me') as HTMLInputElement).disabled).toBe(true);
  });

  it('has loading and empty states', () => {
    const { rerender } = render(<CollaboratorCheckList rows={[]} selected={[]} onToggle={() => {}} loading />);
    expect(screen.getByTestId('start-call-collaborators-loading')).toBeTruthy();
    rerender(<CollaboratorCheckList rows={[]} selected={[]} onToggle={() => {}} />);
    expect(screen.getByText('No one else has this document open')).toBeTruthy();
  });
});

describe('AudioLevelMeter / MediaPrecheckRow', () => {
  it('lights segments for the level', () => {
    render(<AudioLevelMeter level={0.6} />);
    expect(screen.getByTestId('audio-level-meter').getAttribute('data-lit')).toBe('6');
  });

  it('hides the camera for audio and disables a blocked mic with the reason', () => {
    render(<MediaPrecheckRow micOn cameraOn showCamera={false} permission={{ microphone: 'denied', camera: 'granted' }} onToggleMic={() => {}} onToggleCamera={() => {}} onOpenSettings={() => {}} />);
    expect(screen.queryByTestId('start-call-precheck-camera')).toBeNull();
    const mic = screen.getByTestId('start-call-precheck-mic') as HTMLButtonElement;
    expect(mic.disabled).toBe(true);
    expect(mic.title).toBe('Microphone blocked in the browser');
  });
});

describe('CallPeopleList notified (2.395.2, A-12)', () => {
  it('reads "Offline · notified", muted, dimmed, and yields to nothing in-call', () => {
    const s = callPersonStatus({ ...base, state: 'notified', cameraOn: false, presenting: false });
    expect(s).toEqual({ label: 'Offline · notified', tone: 'muted', kind: 'notified' });
    expect(callPersonStatus({ ...base, state: 'notified', isHost: true }).label).toBe('Host · Offline · notified');
    render(
      <CallPeopleList people={[{ ...base, userId: 'fd', name: 'Frank Davis', state: 'notified', presence: 'offline' }]} count={0} canModerate onInvite={() => {}} onFollow={() => {}} onMuteForMe={() => {}} />,
    );
    const status = screen.getByTestId('call-person-status-fd');
    expect(status.textContent).toBe('Offline · notified');
    expect(status.className).toContain('text-text-tertiary');
    expect(screen.getByTestId('call-person-fd').className).toContain('opacity-60');
    expect(screen.queryByTestId('call-person-mic-fd')).toBeNull();
  });
});

describe('CallTileRow dock ring inside the tile (2.395.3, A-13)', () => {
  it('draws the followed ring as an inset overlay inside the tile, not on the tile edge', () => {
    render(<CallTileRow variant="dock" overflow="scroll" participants={[{ id: 'a', displayName: 'Alice' }, { id: 'b', displayName: 'Bob' }]} highlightedId="a" activeSpeakerId="b" />);
    const tile = screen.getByTestId('call-tile-a');
    const ring = screen.getByTestId('call-tile-a-ring');
    expect(tile.contains(ring)).toBe(true);
    expect(tile.className).not.toContain('ring-');
    expect(ring.getAttribute('data-ring')).toBe('highlighted');
    expect(screen.getByTestId('call-tile-b-ring').getAttribute('data-ring')).toBe('speaking');
  });
});
