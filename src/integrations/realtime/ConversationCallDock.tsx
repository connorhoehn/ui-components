// src/integrations/realtime/ConversationCallDock.tsx
//
// The conversation call's shelf — a DM or room call docked above a chat or
// agent composer — drawn from realtime-modules' `useConversationCall()` result:
//
//   const call = useConversationCall({ lobbyName, self, platformApi, gateway });
//   <AgentComposerDock dock={<ConversationCallDock call={call} title="Auth Migration" onOpenPeople={…} />} … />
//
// It is `CallDock` fed by RM's pure `conversationCallDockProps` mapping, plus
// what every host was composing around it:
//   - camera tiles (`StreamVideo` on each participant's stream, muted for you),
//   - the active speaker, measured here from the remote streams (the hook
//     does not analyse audio),
//   - an optional one-line notice above the shelf (who the call could not ring),
//   - the call's device settings (`AudioVideoSettingsForm` in a Modal, kept in
//     step with the live call's device preferences) unless the host passes its
//     own `onOpenSettings`.
// Renders nothing while the call is idle or ringing (IncomingCallToast answers
// a ring).
//
// Scope-agnostic: the two realtime-modules functions it calls are injected —
// `createConversationCallDock({ conversationCallDockProps, useAudioVideoSettings })`
// — and nothing here imports the package at runtime. `integrations/realtime-modules`
// exports it bound to the canonical install.

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type * as RMVideo from '@connorhoehn/realtime-modules/client/video';
import { CallDock, type CallDockProps, type CallDockTileSize } from '../../components/video/CallDock';
import { StreamVideo } from '../../components/video/StreamVideo';
import { AudioVideoSettingsForm } from '../../components/video/AudioVideoSettingsForm';
import InlineAlert from '../../components/shared/InlineAlert';
import Modal from '../../components/shared/Modal';
import { useActiveSpeaker } from '../../lib/video/useActiveSpeaker';
import type { RMConversationCallParticipant, RMConversationCallSource } from './conversationCallTypes';

/** The realtime-modules functions ConversationCallDock calls (spread `/client/video`). */
export interface ConversationCallDockModules {
  conversationCallDockProps: typeof RMVideo.conversationCallDockProps;
  useAudioVideoSettings: typeof RMVideo.useAudioVideoSettings;
}

export interface ConversationCallDockProps {
  /** `useConversationCall()`'s result, as-is. */
  call: RMConversationCallSource;
  /** The conversation's name (`#general`, `Alice Chen`, an initiative). */
  title: string;
  /** Opens the host's People panel (the dock's People button). */
  onOpenPeople: () => void;
  /** The People panel is open (the button reads pressed). */
  peopleOpen?: boolean;
  /**
   * The host's own settings surface. Omitted, the dock opens its built-in
   * "Call devices" dialog (AudioVideoSettingsForm bound to useAudioVideoSettings).
   */
  onOpenSettings?: () => void;
  onPopOut?: () => void;
  /** Host controls in the controls row, before the gear (reactions, recording chip). */
  extras?: ReactNode;
  /** Extra rows in the camera menu ("Blur background…"). */
  cameraMenuItems?: { label: string; onSelect: () => void }[];
  /** Override a participant's camera tile; `undefined` draws their initials. Default: StreamVideo on their stream. */
  tile?: (p: RMConversationCallParticipant) => ReactNode | undefined;
  /** An info line above the shelf while the call is on (e.g. who the call could not ring). */
  notice?: ReactNode;
  /**
   * Raised hand per call participant (2.458.1), by userId: `true`, a 1-based
   * queue position, or undefined. Bind to realtime-modules' useMeeting with
   * `const hands = meetingHandPositions(meeting.hands); handFor={(id) => hands.get(id)}`.
   */
  handFor?: (userId: string) => boolean | number | undefined;
  /** Name shown on the settings preview. */
  selfName?: string;
  /** 132 × 74 tiles instead of 176 × 88. */
  compact?: boolean;
  /** Shelf tile size (2.432.0): `sm` 132 × 74, `md` 176 × 88 (default), `lg` 240 × 135. Wins over `compact`. */
  tileSize?: CallDockTileSize;
  /**
   * The documents the call is about (2.432.0): the bar draws them as chips
   * after the meta (≥ 1240px of dock width) and, with `onOpenDocuments`, a
   * "Documents N" button. Omitted: a conversation call without documents.
   */
  documents?: { id: string; title: string; presenting?: boolean }[];
  onOpenDocuments?: () => void;
  documentsOpen?: boolean;
  onDocumentClick?: (id: string) => void;
  /**
   * `shelf` (default): the dock's header, device controls and Leave over a
   * row of tiles. `grid` (2.423.0): the call's media panel — only the tiles,
   * in a grid that reflows with the head count (1 / 2 / 2×2 / 3 columns), the
   * viewer first as "You". The host's bar keeps mic, camera and Leave. The
   * same single dock (and its media elements) serves either layout.
   * `stack` (2.432.0): the narrow `shelf` for a side pane — mic ▾, camera ▾
   * and Leave on the bar, the rest in its "⋯" menu, the tiles two to a row.
   */
  layout?: CallDockProps['layout'];
  className?: string;
  /** The dock's test id; the notice is `<id>-notice`, the settings dialog `<id>-settings`. Default `conversation-call-dock`. */
  'data-testid'?: string;
}

export type ConversationCallDockComponent = (props: ConversationCallDockProps) => React.JSX.Element | null;

const defaultTile = (p: RMConversationCallParticipant): ReactNode | undefined =>
  p.stream ? <StreamVideo stream={p.stream} muted={p.isLocal} /> : undefined;

const speakerSelectionSupported = (): boolean =>
  typeof HTMLMediaElement !== 'undefined' && 'setSinkId' in HTMLMediaElement.prototype;

/**
 * Invitees whose phones are still ringing, after the people in the call, as
 * placeholder tiles (2.436.0): the caller sees who the call is reaching from
 * the first ring, not an empty row beside their own tile. RM's mapping keeps
 * only people in the call; ringing ones are drawn here, while the call is
 * being placed or is on. An answer moves the person into the call (a real
 * tile); a decline or timeout drops them.
 */
function withRingingInvitees(
  inCall: CallDockProps['participants'],
  everyone: readonly RMConversationCallParticipant[],
  phase: CallDockProps['phase'],
): CallDockProps['participants'] {
  if (phase !== 'calling' && phase !== 'connecting' && phase !== 'active' && phase !== 'reconnecting') return inCall;
  const seen = new Set(inCall.map((p) => p.userId));
  const ringing = everyone
    .filter((p) => !p.isLocal && p.state === 'ringing' && !seen.has(p.id))
    .map((p) => ({
      id: p.id,
      userId: p.id,
      displayName: p.displayName,
      ...(p.avatarUrl ? { avatarUrl: p.avatarUrl } : {}),
      isLocal: false,
      isMuted: false,
      cameraOn: false,
      audioOn: true,
      screenSharing: false,
      presenting: false,
      connection: 'ringing' as const,
    }));
  return ringing.length ? [...inCall, ...ringing] : inCall;
}

/** Raised hands onto the dock's participants; untouched objects when nobody's hand is up. */
function withHands(
  participants: CallDockProps['participants'],
  handFor: ConversationCallDockProps['handFor'],
): CallDockProps['participants'] {
  if (!handFor) return participants;
  let changed = false;
  const next = participants.map((p) => {
    const hand = handFor(p.userId);
    if (!hand) return p;
    changed = true;
    return { ...p, handRaised: hand };
  });
  return changed ? next : participants;
}

/** Remote in-call streams, keyed so the analyser set is rebuilt only when a stream changes. */
function useSpeakerStreams(call: RMConversationCallSource['call']) {
  const remote = (call?.participants ?? []).filter(
    (p) => !p.isLocal && p.stream && (p.state === 'in-call' || p.state === 'reconnecting'),
  );
  const key = remote.map((p) => `${p.id}=${p.stream!.id}`).join('|');
  return useMemo(() => remote.map((p) => ({ participantId: p.id, streams: [p.stream!] })), [key]);
}

function ConversationCallDockImpl(
  rm: ConversationCallDockModules,
  {
    call,
    title,
    onOpenPeople,
    peopleOpen,
    onOpenSettings,
    onPopOut,
    extras,
    cameraMenuItems,
    tile = defaultTile,
    notice,
    handFor,
    selfName,
    compact = false,
    tileSize,
    documents,
    onOpenDocuments,
    documentsOpen,
    onDocumentClick,
    layout = 'shelf',
    className,
    'data-testid': testId = 'conversation-call-dock',
  }: ConversationCallDockProps,
) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const captureError = call.media?.captureError ?? null;
  const [dismissedCaptureError, setDismissedCaptureError] = useState<string | null>(null);
  useEffect(() => { if (!captureError) setDismissedCaptureError(null); }, [captureError]);
  // Same storage as the call's device preferences; the preview (camera + mic
  // level) runs only while the dialog is open.
  const avs = rm.useAudioVideoSettings({ preview: settingsOpen });
  const { activeSpeakerId } = useActiveSpeaker({ participants: useSpeakerStreams(call.call) });

  // RM's DeviceOption carries `kind`; the mapping reads only deviceId/label,
  // which the mirror guarantees.
  const dock = rm.conversationCallDockProps(call as unknown as Parameters<typeof rm.conversationCallDockProps>[0], {
    title,
    onOpenPeople,
    ...(peopleOpen !== undefined ? { peopleOpen } : {}),
    onOpenSettings: onOpenSettings ?? (() => setSettingsOpen(true)),
    ...(onPopOut ? { onPopOut } : {}),
    ...(extras !== undefined ? { extras } : {}),
    ...(cameraMenuItems ? { cameraMenuItems } : {}),
    tile,
    activeSpeakerId: activeSpeakerId ?? call.activeSpeakerId,
    compact,
    'data-testid': testId,
  });
  if (!dock) return null;
  const dockProps: CallDockProps = {
    ...dock,
    participants: withHands(withRingingInvitees(dock.participants as CallDockProps['participants'], call.call?.participants ?? [], dock.phase), handFor),
    layout,
    ...(tileSize ? { tileSize } : {}),
    ...(documents ? { documents } : {}),
    ...(onOpenDocuments ? { onOpenDocuments } : {}),
    ...(documentsOpen !== undefined ? { documentsOpen } : {}),
    ...(onDocumentClick ? { onDocumentClick } : {}),
    ...(className ? { className } : {}),
  };

  return (
    <>
      {notice ? <InlineAlert tone="info" data-testid={`${testId}-notice`}>{notice}</InlineAlert> : null}
      {captureError && captureError !== dismissedCaptureError ? <InlineAlert tone="warning"
        data-testid={`${testId}-capture-error`} onDismiss={() => setDismissedCaptureError(captureError)}>
        {captureError} You can keep listening. Check browser device access, then turn the device on to retry.
      </InlineAlert> : null}
      <CallDock {...dockProps} />
      {!onOpenSettings && (
        <Modal open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Call devices">
          <AudioVideoSettingsForm
            data-testid={`${testId}-settings`}
            value={avs.settings}
            onChange={(next) => {
              avs.update(next);
              // The live call reads its own preferences; keep them in step.
              call.devices.set({
                ...call.devices.prefs,
                ...(next.microphoneId ? { microphoneId: next.microphoneId } : {}),
                ...(next.cameraId ? { cameraId: next.cameraId } : {}),
                ...(next.speakerId ? { speakerId: next.speakerId } : {}),
              });
            }}
            devices={{
              microphones: call.devices.list.microphones,
              cameras: call.devices.list.cameras,
              speakers: call.devices.list.speakers,
            }}
            permission={call.devices.list.permission}
            micLevel={avs.micLevel}
            previewStream={avs.previewStream}
            cameraOn={call.self.cameraOn}
            speakerSelectionSupported={speakerSelectionSupported()}
            onTestMic={avs.testMic}
            onTestSound={avs.testSound}
            testMicState={avs.testMicState}
            {...(selfName !== undefined ? { selfName } : {})}
          />
        </Modal>
      )}
    </>
  );
}

/** Bind ConversationCallDock to injected realtime-modules functions. Call once, at module scope. */
export function createConversationCallDock(rm: ConversationCallDockModules): ConversationCallDockComponent {
  function ConversationCallDock(props: ConversationCallDockProps) {
    return ConversationCallDockImpl(rm, props);
  }
  return ConversationCallDock;
}
