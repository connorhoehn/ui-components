// CallBlockHost (2.439.0) — an app's ONE conversation call and its ONE media
// sink, and the call block every surface draws from them.
//
//   import * as video from '@connorhoehnslalom/realtime-modules/client/video';
//   export const calls = createCallBlockHost(video);          // once, at module scope
//
//   <calls.CallHostProvider self={…} tenant={…} platformApi={…} videoUrl={…} gateway={…} …>
//     …the app…
//     <calls.CallMediaOutlet …/>                             // the footer's sink, once
//   </calls.CallHostProvider>
//
//   const { block } = calls.useCallBlock(channel, { bind: { title } });
//   <ConversationComposer callBlock={block} …/>
//
// What it owns, so no app re-implements it:
//
//   - ONE `useConversationCall` for the whole shell: a call survives route
//     changes. A page BINDS its lobby (its realtime family name, or the dm
//     lobby of the people it would ring) while nothing is in progress; a ring
//     being answered or a call that is on holds the binding.
//   - Incoming rings (`useIncomingConversationCalls`) and the toast; Accept
//     binds the ring's lobby, tells the app (`onAccept`, to open the page the
//     call is about) and answers once the hook is bound.
//   - The pre-join device check before every start, join and accept, with
//     remembered capture intentions passed before any device or media join.
//   - The media sink's CLAIMS (callBlockModel.ts): a composer's call block, a
//     page's block, the shell's block, the side pane's media panel, else the
//     footer — the one dock moves, it is never mounted twice.
//   - `useCallBlock(channel)`: the block for a composer whose conversation
//     holds the call (the bar and tiles flush on its top edge), and the page's
//     lobby binding. Which lobbies admit whom is the SERVER's rule (the
//     gateway's lobby guard, platform-api's lobby authority); nothing here
//     decides it.
//
// Scope-agnostic: every realtime-modules function is injected.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { Stack, Inline } from '../../components/ui/Stack';
import { Button } from '../../components/ui/Button';
import { Text } from '../../components/shared/Text';
import Modal from '../../components/shared/Modal';
import Switch from '../../components/shared/Switch';
import { DeviceToggleSelect } from '../../components/video/DeviceToggleSelect';
import { SparklesIcon } from '../../components/video/MediaIcons';
import { DropdownMenu } from '../../components/shared/DropdownMenu';
import type { RMMediaEffectsControllerSource } from '../realtime-modules/WrappedMediaEffectsTray';
import { WrappedAudioVideoSettingsForm, type RMAudioVideoSettingsSource, type RMMediaDevicesSource } from '../realtime-modules/WrappedAudioVideoSettingsForm';
import { createConversationCallDock, type ConversationCallDockModules } from './ConversationCallDock';
import { IncomingCallToast } from './IncomingCallToast';
import { RecordingConsentNotice, useConsentDismissal } from '../../components/video/RecordingConsentNotice';
import type { RMConversationCallSource, RMIncomingConversationCall } from './conversationCallTypes';
import type { RMMeetingSource } from './meetingSource';
import {
  CallBlockClaims,
  callBlockLayout,
  callBlockNarrow,
  callDrawn,
  callOn,
  checkDevicesInitial,
  conversationHoldsCall,
  countdownSeconds,
  nextPreJoin,
  pageHuddleStart,
  parsePreJoin,
  preJoinCountdownMs,
  preJoinGate,
  shouldShowPreJoin,
  type CallBlockClaimPlacement,
  type CallBlockDocument,
  type CallBlockPlacement,
  type PreJoinChoice,
  type PreJoinKind,
} from './callBlockModel';

// ── what the host drives ──

/** The call the host drives: RM `useConversationCall()`'s result, restated to what is read here. */
export interface CallBlockCall extends RMConversationCallSource {
  call: (NonNullable<RMConversationCallSource['call']> & { callId: string; host?: string | null; startedAt?: number | null }) | null;
  /** realtime-modules 0.137.0: whether this client's media session records (older pins: absent). */
  recording?: { enabled: boolean; reason: string | null; sessionId: string } | null;
  start(targets: { userId: string; displayName?: string }[], opts?: { audioOnly?: boolean }): Promise<void>;
  accept(ring?: never): Promise<void>;
  rejoin(opts?: { audioOnly?: boolean }): Promise<void>;
  leave(): Promise<void>;
}

/** One ring, as RM `useIncomingConversationCalls()` reports it. */
export interface CallBlockRing extends RMIncomingConversationCall {
  lobbyName: string;
  channel: string | null;
}

/** A call event, for an app that keeps a call log. */
export type CallHostEventKind = 'started' | 'ended' | 'missed';
export interface CallHostEvent {
  callId: string;
  lobbyName: string;
  channel: string | null;
  peerUserIds: string[];
  direction?: 'outgoing' | 'incoming';
  durationMs?: number | null;
  [key: string]: unknown;
}
export type OnCallHostEvent = (kind: CallHostEventKind, event: CallHostEvent, ctx: { host: string | null; selfId: string }) => void;

/** The realtime-modules functions the host calls (spread `/client/video`). */
export interface CallBlockModules extends ConversationCallDockModules {
  /** Shared pre-join and outgoing camera effects (realtime-modules 0.141+). */
  useCallMediaEffects?(): RMMediaEffectsControllerSource & {
    outputTrack: MediaStreamTrack | null;
    processStream(stream: MediaStream): MediaStream;
    detach(): void;
  };
  LVSProvider: ComponentType<{ baseUrl: string; getAuthToken: () => string; children: ReactNode }>;
  // Method syntax on purpose: the installed hooks' option types are wider than what is passed here.
  useConversationCall(opts: {
    lobbyName: string;
    /** realtime-modules 0.134.0+: the lobby the media joins (a breakout room's); older pins ignore it. */
    mediaLobby?: string | null;
    channel?: string | null;
    self: { userId: string; displayName: string; avatarUrl?: string };
    platformApi: { baseUrl: string; getIdToken: () => string | Promise<string> };
    gateway?: never;
    discover?: boolean;
    initialMedia?: { micOn: boolean; cameraOn: boolean };
    /** realtime-modules 0.136.0+: names (and pictures) for people the call's signalling knows only by id. */
    nameFor?: (userId: string) => { displayName: string; avatarUrl?: string } | null | undefined;
    onCallStarted?(e: never): void;
    onCallEnded?(e: never): void;
    onCallMissed?(e: never): void;
  }): CallBlockCall;
  useIncomingConversationCalls(opts: {
    gateway?: never;
    self: { userId: string | null; displayName?: string };
    onAccept?(ring: never): void;
  }): { rings: CallBlockRing[]; accept(ring: never): void; decline(ring: never): void };
  useMediaDevices(opts?: { requestOnMount?: boolean }): RMMediaDevicesSource;
  /**
   * realtime-modules 0.134.0+ `useMeeting`, for raise hand and breakout rooms
   * on the call (`CallHostProviderProps.meeting`). Optional: a host bound to
   * an older pin simply has no meeting. Since 2.476.0.
   */
  useMeeting?(meetingId: string | null, opts: {
    enabled?: boolean;
    chatChannel?: string;
    /** realtime-modules 0.136: ask organizer status again when this changes (an older pin ignores it). */
    roleKey?: string | number | null;
    socket?: { send(msg: Record<string, unknown>): void; onMessage(handler: (msg: never) => void): () => void };
  }): CallHostMeeting;
}

/** The meeting riding the call: the bindings' source plus where media and chat belong now. */
export type CallHostMeeting = RMMeetingSource & { activeLobby: string | null; activeChat: string | null };

/** A page's lobby: what the call host binds while nothing is in progress. */
export interface CallLobby {
  lobbyName: string;
  /** What the bar's title says (the initiative's name, the people on Search). */
  title: string;
  /** Rides the invite, so the callee's Accept can open what the call is about. */
  channel: string | null;
  /** Why the page cannot start its call right now; absent = it can. */
  startBlockedReason?: string;
}

export interface CallHostValue<C extends CallBlockCall> {
  call: C;
  /**
   * The one-line recording note while the call's media session records and
   * this viewer has not dismissed it for that session (2.480.2), else null.
   * A stage header puts it in its row (e.g. `MeetingToolbar start`); the
   * outlet draws it above the shelf when no meeting stage holds it.
   */
  recordingNote: ReactNode | null;
  /** The lobby the call is bound to; null until a page binds one or a ring is answered. */
  lobby: CallLobby | null;
  /** Bind this page's lobby. Ignored while a call is in progress or a ring is being answered. */
  bind(lobby: CallLobby, starter?: { start(): void }): void;
  /** The page leaves: drops its lobby while no call is in progress. */
  unbind(lobbyName: string): void;
  /** Runs the bound page's own start (null when the page registered none) — the footer's idle Huddle. */
  startBound: (() => void) | null;
  self: { userId: string; displayName: string } | null;
  tenant: string | null;
  gatewayConfigured: boolean;
  connectionState: string;
  platformApiUrl: string | null;
  /** Why no call can start here at all (no gateway, no platform-api, signed out, connecting), or null. */
  unavailableReason: string | null;
  /** Opens the device check on request (clears the remembered skip). */
  checkDevices(): void;
  /**
   * The call's meeting (raise hand, rooms, announcements) while a call is
   * live and the provider's `meeting` option is on; null otherwise. Feed it to
   * `meetingToolbarItems`, `WrappedBreakoutRoomsPanel`, `useMeetingChat`.
   * Since 2.476.0.
   */
  meeting: CallHostMeeting | null;
}

/** The media panel (the side pane's tile grid): open or collapsed. Opens by itself once per call. */
export interface CallMediaPanelState { open: boolean; setOpen(open: boolean): void; toggle(): void }

export interface CallHostProviderProps {
  self: { userId: string; displayName: string; avatarUrl?: string } | null;
  tenant: string | null;
  /** Actor and tenant: a change tears media down; refreshing the same identity does not. */
  scopeKey: string;
  /** platform-api base URL the browser can reach, or null (calls unavailable). */
  platformApiUrl: string | null;
  getIdToken: () => string | Promise<string>;
  /** The SFU's URL; latched within one scope, so a token refresh without it cannot move a call. */
  videoUrl: string | null;
  /** The gateway socket the app holds (RM `ConversationCallGateway`). */
  gateway: unknown;
  gatewayConfigured: boolean;
  connectionState: string;
  /** Accept was pressed on a ring: open the page the call is about. */
  onAccept?: (ring: CallBlockRing) => void;
  onCallEvent?: OnCallHostEvent;
  /**
   * The app's directory: a call participant's name and picture when the call
   * itself only knows their id (a page huddle rings nobody). Tiles, the
   * joinable footer and the rooms panes read names from the call (2.480.0;
   * realtime-modules 0.136.0, ignored by older pins). Keep the reference stable.
   */
  nameFor?: (userId: string) => { displayName: string; avatarUrl?: string } | null | undefined;
  /** The recording note's privacy link, or `false` for no note at all (2.480.2). */
  recordingConsent?: false | { privacyHref?: string; privacyLabel?: string };
  /**
   * Run a meeting beside the call (needs `useMeeting` in the modules): the
   * meeting id is the call's lobby, and the call's MEDIA follows the meeting
   * into a breakout room's lobby (realtime-modules 0.134 `mediaLobby`) while
   * the call itself stays. `chatChannelFor` names the call's chat channel in
   * the host's scheme, so a room's chat is `<that>~breakout~<roomId>`.
   * Off by default. Since 2.476.0.
   */
  meeting?: {
    chatChannelFor?(lobbyName: string, callId: string | null): string | null;
    /** Which lobbies get a meeting (2.477.0); default all. A host rolls surfaces out one at a time with this. */
    enabledFor?(lobbyName: string): boolean;
  } | false;
  /** Where the pre-join choices persist (one key per device). */
  preJoinStorageKey?: string;
  children: ReactNode;
}

export interface CallBlockProps {
  placement: CallBlockClaimPlacement;
  /** The narrow bar (mic, camera, Leave; the rest in ⋯). Composer and stage placements. */
  compact?: boolean;
  documents?: readonly CallBlockDocument[];
  className?: string;
}

export interface UseCallBlockOptions {
  /** Draw the block while the call is this conversation's (default true). */
  enabled?: boolean;
  /** A narrow host (a side pane). */
  compact?: boolean;
  /** The bar's document chips. */
  documents?: readonly CallBlockDocument[];
  /**
   * Bind this conversation's lobby so the footer's Huddle starts it: the lobby
   * defaults to the channel, the start to "walk into the huddle that is on,
   * else open one with nobody rung".
   */
  bind?: { title: string; lobbyName?: string | null; channel?: string | null; blockedReason?: string | null; start?: () => void } | null;
}

export interface CallBlockView {
  /** The bar and tiles for `ConversationComposer callBlock`; undefined while the call is not this conversation's. */
  block: ReactNode;
  /** The call is this conversation's and drawn. */
  holds: boolean;
  /** The shell's call is bound to this conversation's lobby. */
  here: boolean;
  /** A huddle is on in this lobby that you are not in (the host discovered it). */
  live: boolean;
}

export interface CallMediaOutletProps {
  /** The footer's collapsed shelf id (for its toggle's aria-controls). */
  id?: string;
  /** Opens the call's People (e.g. the page's contributors). */
  onOpenPeople?: (lobby: CallLobby, tenant: string | null) => void;
  /** A document chip was clicked. */
  onOpenDocument?: (document: CallBlockDocument) => void;
  /** Drawn over the tiles wherever the sink draws (floating reactions). */
  overlay?: ReactNode;
  /**
   * Drawn above the dock while it is expanded (a page or block holds it), e.g.
   * the meeting's `MeetingToolbar` and `WrappedBreakoutRoomBanner`. Never in
   * the collapsed footer shelf. Since 2.477.0.
   */
  header?: ReactNode;
  /** Host controls in the dock's controls row (ConversationCallDock `extras`). Since 2.477.0. */
  extras?: ReactNode;
  /** An info line above the shelf (ConversationCallDock `notice`). Since 2.477.0. */
  notice?: ReactNode;
  /**
   * The recording consent notice, drawn above the shelf while the call's media
   * session records (realtime-modules 0.137.0 `call.recording`), dismissed per
   * session. `false` turns it off; the object names the privacy link. Since 2.480.1.
   */
  recordingConsent?: false | { privacyHref?: string; privacyLabel?: string };
  /** The dock's test id for a lobby (default `conversation-call-dock`). */
  dockTestId?: (lobby: CallLobby, tenant: string | null) => string;
}

const PREJOIN_TITLE: Record<PreJoinKind, string> = { start: 'Start a huddle', join: 'Join the huddle', accept: 'Join the huddle', check: 'Check your devices' };
const UNBOUND = '__unbound__';
const noToken = (): string => '';
const noSubscribe = () => () => {};
const noTarget = () => null;
const noPlacement = (): CallBlockPlacement => 'footer';
const noFalse = () => false;
const NO_DOCUMENTS: readonly CallBlockDocument[] = [];
const noDocuments = () => NO_DOCUMENTS;
const DEFAULT_PRE_JOIN_KEY = 'ui.call-prejoin.v1';

/** Why no call can start here at all, in the bar's words; null when one can. */
export function callHostUnavailable(input: { gatewayConfigured: boolean; platformApiUrl: string | null; signedIn: boolean; connectionState: string }): string | null {
  if (!input.gatewayConfigured) return 'Calls need the realtime gateway — the middleware returned no gatewayUrl and VITE_GATEWAY_URL is not set';
  if (!input.platformApiUrl) return 'Calls need platform-api — the middleware returned no platformApiUrl (REALTIME_PLATFORM_PUBLIC_URL) and VITE_PLATFORM_API_URL is not set';
  if (!input.signedIn) return 'Sign in to start a call';
  if (input.connectionState !== 'connected') return 'Connecting to the realtime gateway…';
  return null;
}

/** The element's laid-out width (0 while detached or hidden). */
function useLaidOutWidth(element: HTMLElement | null): number {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (!element) { setWidth(0); return undefined; }
    const measure = () => setWidth(element.isConnected ? Math.round(element.getBoundingClientRect().width) : 0);
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);
  return width;
}

function readChoice(key: string): PreJoinChoice {
  try { return parsePreJoin(window.localStorage.getItem(key)); } catch { return parsePreJoin(null); }
}
function writeChoice(key: string, choice: PreJoinChoice) {
  try { window.localStorage.setItem(key, JSON.stringify(nextPreJoin(choice))); } catch { /* a convenience */ }
}

/** Bind the host to the installed realtime-modules call hooks. Call once, at module scope. */
export function createCallBlockHost<M extends CallBlockModules>(rm: M) {
  type Call = ReturnType<M['useConversationCall']>;
  const HostContext = createContext<CallHostValue<Call> | null>(null);
  const ClaimsContext = createContext<CallBlockClaims<HTMLElement> | null>(null);
  const MediaPanelContext = createContext<CallMediaPanelState | null>(null);
  const ConversationCallDock = createConversationCallDock(rm);
  const { LVSProvider } = rm;
  const usePreJoinEffects = rm.useCallMediaEffects ?? (() => null);

  // ── the device check ──

  function PreJoinDialog({ kind, title, selfName, selfAvatarUrl, initial, onJoin, onCancel }: {
    kind: PreJoinKind; title: string; selfName: string; selfAvatarUrl?: string; initial: PreJoinChoice;
    onJoin(choice: PreJoinChoice, devices: { microphoneId?: string; cameraId?: string; speakerId?: string }): void;
    onCancel(): void;
  }) {
    const [choice, setChoice] = useState(initial);
    const devices = rm.useMediaDevices({ requestOnMount: false });
    const settings = rm.useAudioVideoSettings({ preview: choice.micOn || choice.cameraOn, previewAudio: choice.micOn, previewVideo: choice.cameraOn } as never) as unknown as RMAudioVideoSettingsSource;
    const effects = usePreJoinEffects();
    const [processedPreview, setProcessedPreview] = useState<MediaStream | null>(null);
    const processPreview = effects?.processStream;
    const detachPreview = effects?.detach;
    useEffect(() => {
      if (!settings.previewStream) { detachPreview?.(); setProcessedPreview(null); return; }
      setProcessedPreview(processPreview?.(settings.previewStream) ?? settings.previewStream);
    }, [settings.previewStream, processPreview, detachPreview, effects?.outputTrack]);
    const total = preJoinCountdownMs(kind);
    const [remaining, setRemaining] = useState<number | null>(total);
    const stopped = useRef(false);
    const latest = useRef({ choice, settings: settings.settings });
    latest.current = { choice, settings: settings.settings };
    const join = () => {
      const { choice: c, settings: s } = latest.current;
      onJoin(c, { ...(s.microphoneId ? { microphoneId: s.microphoneId } : {}), ...(s.cameraId ? { cameraId: s.cameraId } : {}), ...(s.speakerId ? { speakerId: s.speakerId } : {}) });
    };
    const joinRef = useRef(join);
    joinRef.current = join;
    // Any change by the person ends the countdown: they are choosing.
    const first = useRef(true);
    useEffect(() => {
      if (first.current) { first.current = false; return; }
      stopped.current = true;
      setRemaining(null);
    }, [choice, settings.settings]);
    useEffect(() => {
      if (total === null) return undefined;
      const started = Date.now();
      const timer = window.setInterval(() => {
        if (stopped.current) { window.clearInterval(timer); return; }
        const left = total - (Date.now() - started);
        if (left <= 0) { window.clearInterval(timer); joinRef.current(); return; }
        setRemaining(left);
      }, 250);
      return () => window.clearInterval(timer);
    }, [total]);
    return (
      <Modal open onClose={onCancel} ariaLabel={PREJOIN_TITLE[kind]} maxWidth={1000} rawChildren
        cardClassName="flex max-h-[90dvh] flex-col gap-5 overflow-hidden border border-border p-5 sm:p-6" backdropTestId="prejoin-backdrop">
        <Inline justify="between" align="baseline" gap="md" wrap={false} className="min-w-0 shrink-0 border-b border-border pb-4" data-testid="prejoin-header">
          <h2 className="m-0 shrink-0 text-lg font-semibold text-text-primary">{PREJOIN_TITLE[kind]}</h2>
          <Text size="sm" weight="medium" className="min-w-0 truncate text-right" title={title} data-testid="prejoin-title">{title}</Text>
        </Inline>
        <Stack gap="md" className="min-h-0 overflow-y-auto" data-testid="prejoin-dialog"
          onPointerDownCapture={() => { stopped.current = true; setRemaining(null); }}
          onKeyDownCapture={() => { stopped.current = true; setRemaining(null); }}>
          <Text size="xs" tone="secondary">Joining as {selfName}</Text>
          <WrappedAudioVideoSettingsForm devices={devices} settings={{ ...settings, previewStream: processedPreview }} cameraOn={choice.cameraOn}
            selfName={selfName} selfAvatarUrl={selfAvatarUrl} layout="prejoin" data-testid="prejoin-devices"
            previewControls={<>
              <DeviceToggleSelect kind="microphone" on={choice.micOn} onToggle={() => setChoice(c => ({ ...c, micOn: !c.micOn }))}
                devices={devices.microphones} selectedDeviceId={settings.settings.microphoneId} onSelectDevice={microphoneId => settings.update({ microphoneId })}
                permission={devices.permission.microphone} level={settings.micLevel} showLabel data-testid="prejoin-mic" />
              <DeviceToggleSelect kind="camera" on={choice.cameraOn} onToggle={() => setChoice(c => ({ ...c, cameraOn: !c.cameraOn }))}
                devices={devices.cameras} selectedDeviceId={settings.settings.cameraId} onSelectDevice={cameraId => settings.update({ cameraId })}
                permission={devices.permission.camera} showLabel data-testid="prejoin-camera" />
              {effects && <>
                <Button size="sm" variant="secondary" aria-pressed={effects.backgroundMode === 'blur'}
                  onClick={() => effects.setBackgroundMode(effects.backgroundMode === 'blur' ? 'none' : 'blur')} data-testid="prejoin-blur"><SparklesIcon size={16} />Blur</Button>
                <DropdownMenu trigger="Effects" triggerLabel="Camera effects" triggerVariant="secondary" triggerTestId="prejoin-effects"
                  sections={[
                    { label: 'Background', items: [{ label: 'None', checked: effects.backgroundMode === 'none', onSelect: () => effects.setBackgroundMode('none') },
                      { label: 'Blur background', checked: effects.backgroundMode === 'blur', onSelect: () => effects.setBackgroundMode('blur') },
                      ...effects.backgrounds.map(bg => ({ label: bg.label, checked: effects.backgroundMode === 'image' && effects.backgroundImageUrl === bg.url,
                        onSelect: () => { effects.setBackgroundImageUrl(bg.url); effects.setBackgroundMode('image'); } }))] },
                    { label: 'Appearance', items: effects.filters.map(filter => ({ label: filter.label, checked: effects.filterId === filter.id, onSelect: () => effects.setFilter(filter.id) })) },
                  ]} />
              </>}
            </>} />
        </Stack>
        <Inline justify="between" align="center" gap="md" wrap className="shrink-0 border-t border-border pt-4" data-testid="prejoin-footer">
          <Inline gap="sm" align="center" wrap={false}>
            <Switch checked={choice.remember} onChange={(remember: boolean) => setChoice((c) => ({ ...c, remember }))} aria-label="Remember and skip this check next time" data-testid="prejoin-remember" />
            <Text size="xs" tone="secondary">Skip device setup next time</Text>
          </Inline>
          <Inline gap="sm" justify="end" className="ml-auto">
            <Button variant="secondary" onClick={onCancel} data-testid="prejoin-cancel">{kind === 'accept' ? 'Decline' : 'Cancel'}</Button>
            <Button onClick={join} data-testid="prejoin-join">{remaining !== null ? `Join as last time (${countdownSeconds(remaining)})` : kind === 'check' ? 'Save' : 'Join now'}</Button>
          </Inline>
        </Inline>
      </Modal>
    );
  }

  // ── the host ──

  interface PreJoinRequest { kind: PreJoinKind; run(call: Call): void; cancel?(): void; initial: PreJoinChoice }

  function Host({ self, tenant, platformApiUrl, getIdToken, gateway, gatewayConfigured, connectionState, onAccept, onCallEvent, nameFor, recordingConsent: consentOption, meeting: meetingOption, preJoinStorageKey = DEFAULT_PRE_JOIN_KEY, children }: Omit<CallHostProviderProps, 'scopeKey' | 'videoUrl'>) {
    const [lobby, setLobby] = useState<CallLobby | null>(null);
    const pendingRing = useRef<CallBlockRing | null>(null);
    const hostRef = useRef<string | null>(null);
    const eventRef = useRef(onCallEvent);
    eventRef.current = onCallEvent;
    const emit = (kind: CallHostEventKind, event: CallHostEvent) => {
      eventRef.current?.(kind, event, { host: hostRef.current, selfId: self?.userId ?? '' });
    };
    const [initialMedia, setInitialMedia] = useState(() => readChoice(preJoinStorageKey));
    // The meeting rides a LIVE call: its id is the call's lobby. `inCall`
    // trails the call by a render (set below), which is what lets the media
    // lobby feed back into the one useConversationCall without a cycle.
    const [liveCall, setLiveCall] = useState<{ lobbyName: string; callId: string | null; phase: string } | null>(null);
    const meetingId = meetingOption && rm.useMeeting && liveCall && (!meetingOption.enabledFor || meetingOption.enabledFor(liveCall.lobbyName))
      ? liveCall.lobbyName : null;
    const g = gateway as { send?(m: Record<string, unknown>): void; sendMessage?(m: Record<string, unknown>): void; onMessage?(h: (m: never) => void): () => void } | null | undefined;
    const meetingSocket = useMemo(() => (g?.onMessage
      ? { send: (m: Record<string, unknown>) => (g.send ?? g.sendMessage)?.call(g, m), onMessage: (h: (m: never) => void) => g.onMessage!(h) }
      : undefined), [g]);
    const chatChannel = meetingId && meetingOption && meetingOption.chatChannelFor
      ? meetingOption.chatChannelFor(meetingId, liveCall?.callId ?? null) ?? undefined
      : undefined;
    // Same function on every render: rm.useMeeting is fixed per createCallBlockHost.
    const meetingResult = rm.useMeeting
      // roleKey: the server answers "organizer?" when asked; ask again once this socket's call is seated
      // (the caller organizes, and the first subscribe can beat the call's own registration).
      ? rm.useMeeting(meetingId, { enabled: !!meetingId, socket: meetingSocket, roleKey: liveCall ? `${liveCall.callId ?? ''}:${liveCall.phase}` : null, ...(chatChannel ? { chatChannel } : {}) })
      : null;
    const meeting = meetingId && meetingResult ? meetingResult : null;
    const rawCall = rm.useConversationCall({
      lobbyName: lobby?.lobbyName ?? UNBOUND,
      ...(meeting?.activeLobby ? { mediaLobby: meeting.activeLobby } : {}),
      channel: lobby?.channel ?? null,
      self: self ?? { userId: '', displayName: '' },
      platformApi: { baseUrl: platformApiUrl ?? '', getIdToken },
      gateway: gateway as never,
      discover: !!lobby && gatewayConfigured,
      initialMedia: { micOn: initialMedia.micOn, cameraOn: initialMedia.cameraOn },
      ...(nameFor ? { nameFor } : {}),
      ...(onCallEvent ? {
        onCallStarted: (e: never) => emit('started', e as CallHostEvent),
        onCallEnded: (e: never) => emit('ended', e as CallHostEvent),
        onCallMissed: (e: never) => emit('missed', e as CallHostEvent),
      } : {}),
    }) as Call;
    // The ONE pre-join step: every way into a call (start, join, accept) is gated here.
    const callRef = useRef(rawCall);
    callRef.current = rawCall;
    const [prompt, setPrompt] = useState<PreJoinRequest | null>(null);
    const [go, setGo] = useState<{ run(call: Call): void } | null>(null);
    const request = useCallback((kind: PreJoinKind, run: (call: Call) => void, cancel?: () => void) => {
      const initial = readChoice(preJoinStorageKey);
      if (!shouldShowPreJoin(initial, kind)) { setInitialMedia(initial); setGo({ run }); return; }
      setPrompt((current) => current ?? { kind, run, ...(cancel ? { cancel } : {}), initial });
    }, [preJoinStorageKey]);
    const gatedStart = useCallback<Call['start']>((targets, opts) => {
      if (!preJoinGate('start', callRef.current.phase, !!callRef.current.call)) return callRef.current.start(targets, opts);
      request('start', (c) => { void c.start(targets, opts); });
      return Promise.resolve();
    }, [request]);
    const gatedRejoin = useCallback<Call['rejoin']>((opts) => {
      const c = callRef.current;
      if (!preJoinGate('rejoin', c.phase, !!c.call)) return c.rejoin(opts);
      request('join', (next) => { void next.rejoin(opts); });
      return Promise.resolve();
    }, [request]);
    const checkDevices = useCallback(() => {
      setPrompt((current) => current ?? { kind: 'check', run: () => {}, initial: checkDevicesInitial(readChoice(preJoinStorageKey)) });
    }, [preJoinStorageKey]);
    const call = useMemo<Call>(() => ({ ...rawCall, start: gatedStart, rejoin: gatedRejoin }), [rawCall, gatedStart, gatedRejoin]);
    useEffect(() => {
      if (!go) return;
      go.run(callRef.current);
      setGo(null);
    }, [go]);
    // The native hook receives the selected capture intent on the render before go.run.
    // No post-capture mute: an off device must never be opened just to turn it off.
    hostRef.current = call.call?.host ?? hostRef.current;
    if (call.phase === 'idle') hostRef.current = null;
    const phaseRef = useRef(call.phase);
    phaseRef.current = call.phase;

    // The bound page's start and lobby name, kept in refs set by bind/unbind
    // themselves (never inside a state updater, which React may replay): an
    // unbind followed by a re-bind in one commit (a remount) ends bound.
    const starterRef = useRef<{ start(): void } | null>(null);
    const boundRef = useRef<string | null>(null);
    const bind = useCallback((next: CallLobby, starter?: { start(): void }) => {
      if (pendingRing.current) return;
      const phase = phaseRef.current;
      if (phase !== 'idle' && phase !== 'ringing') return;
      starterRef.current = starter ?? null;
      boundRef.current = next.lobbyName;
      setLobby((cur) => (cur && cur.lobbyName === next.lobbyName && cur.title === next.title && cur.channel === next.channel
        && cur.startBlockedReason === next.startBlockedReason ? cur : next));
    }, []);
    const unbind = useCallback((lobbyName: string) => {
      if (pendingRing.current) return;
      const phase = phaseRef.current;
      if (phase !== 'idle' && phase !== 'ringing') return;
      if (boundRef.current !== lobbyName) return;
      boundRef.current = null;
      starterRef.current = null;
      setLobby((cur) => (cur && cur.lobbyName === lobbyName ? null : cur));
    }, []);
    const startBound = useCallback(() => { starterRef.current?.start(); }, []);

    const acceptRef = useRef(onAccept);
    acceptRef.current = onAccept;
    const rings = rm.useIncomingConversationCalls({
      gateway: gateway as never,
      self: { userId: self?.userId ?? null, ...(self ? { displayName: self.displayName } : {}) },
      onAccept: ((ring: CallBlockRing) => {
        pendingRing.current = ring;
        boundRef.current = ring.lobbyName;
        starterRef.current = null;
        setLobby({ lobbyName: ring.lobbyName, title: ring.callerName, channel: ring.channel });
        acceptRef.current?.(ring);
      }) as never,
    });
    // Answer once the hook is bound to the ring's lobby: it joins under ITS lobby name.
    const promptedRing = useRef<string | null>(null);
    useEffect(() => {
      const ring = pendingRing.current;
      if (!ring || lobby?.lobbyName !== ring.lobbyName) return;
      if (promptedRing.current === ring.callId) return;
      promptedRing.current = ring.callId;
      request('accept', (c) => { pendingRing.current = null; void c.accept(ring as never); }, () => {
        pendingRing.current = null;
        rings.decline(ring as never);
        unbind(ring.lobbyName);
      });
    }, [lobby, request, rings, unbind]);

    const unavailableReason = callHostUnavailable({ gatewayConfigured, platformApiUrl, signedIn: !!self, connectionState });
    const selfValue = useMemo(() => (self ? { userId: self.userId, displayName: self.displayName } : null), [self?.userId, self?.displayName]); // eslint-disable-line react-hooks/exhaustive-deps
    // Track the live call for the meeting (see `liveCall` above).
    const liveLobby = lobby && callOn(rawCall.phase, true) && rawCall.call ? lobby.lobbyName : null;
    const liveCallId = rawCall.call?.callId ?? null;
    const livePhase = liveLobby ? String(rawCall.phase) : '';
    useEffect(() => {
      setLiveCall((cur) => (liveLobby
        ? (cur && cur.lobbyName === liveLobby && cur.callId === liveCallId && cur.phase === livePhase ? cur : { lobbyName: liveLobby, callId: liveCallId, phase: livePhase })
        : null));
    }, [liveLobby, liveCallId, livePhase]);

    // Recording consent: one dismissal per media session, shared by the stage header and the dock.
    const recording = consentOption !== false && callDrawn(call.phase, true) ? call.recording ?? null : null;
    const consent = useConsentDismissal(recording?.enabled ? `call-recording:${recording.sessionId}` : null);
    const privacyHref = consentOption ? consentOption.privacyHref : undefined;
    const privacyLabel = consentOption ? consentOption.privacyLabel : undefined;
    const recordingNote = useMemo(() => (recording?.enabled && !consent.dismissed
      ? <RecordingConsentNotice open kind="recording" placement="line" onDismiss={consent.dismiss}
          {...(privacyHref ? { privacyHref } : {})} {...(privacyLabel ? { privacyLabel } : {})} />
      : null), [recording?.enabled, consent.dismissed, consent.dismiss, privacyHref, privacyLabel]);
    const value = useMemo<CallHostValue<Call>>(() => ({
      call, recordingNote, lobby, bind, unbind, startBound: lobby && starterRef.current ? startBound : null, self: selfValue, tenant,
      gatewayConfigured, connectionState, platformApiUrl, unavailableReason, checkDevices, meeting,
    }), [call, recordingNote, lobby, bind, unbind, startBound, selfValue, tenant, gatewayConfigured, connectionState, platformApiUrl, unavailableReason, checkDevices, meeting]);

    const head = rings.rings[0] ?? null;
    return (
      <HostContext.Provider value={value}>
        {children}
        {prompt && <PreJoinDialog
          kind={prompt.kind}
          title={lobby?.title ?? 'this huddle'}
          selfName={self?.displayName ?? ''}
          selfAvatarUrl={self?.avatarUrl}
          initial={prompt.initial}
          onCancel={() => { const p = prompt; setPrompt(null); p.cancel?.(); }}
          onJoin={(choice, devices) => {
            const p = prompt;
            writeChoice(preJoinStorageKey, choice);
            callRef.current.devices.set({ ...callRef.current.devices.prefs, ...devices });
            setPrompt(null);
            if (p.kind === 'check') return;
            setInitialMedia(choice);
            setGo({ run: p.run });
          }}
        />}
        {head && <IncomingCallToast ring={head} onAccept={() => rings.accept(head as never)} onDecline={() => rings.decline(head as never)} />}
      </HostContext.Provider>
    );
  }

  function MediaPanelProvider({ children }: { children: ReactNode }) {
    const host = useContext(HostContext);
    const [open, setOpen] = useState(false);
    const inCall = !!host?.lobby && callOn(host.call.phase, true);
    // Opens by itself once per call, from the caller's first ring (the self
    // tile shows at once); after that only the footer's toggle moves it.
    useEffect(() => { setOpen(inCall); }, [inCall]);
    const value = useMemo<CallMediaPanelState>(() => ({ open: inCall && open, setOpen, toggle: () => setOpen((current) => !current) }), [inCall, open]);
    return <MediaPanelContext.Provider value={value}>{children}</MediaPanelContext.Provider>;
  }

  /** The shell mount: a stable LVS context around the call host; actor/tenant changes tear media down. */
  function CallHostProvider({ scopeKey, videoUrl, children, ...rest }: CallHostProviderProps) {
    return <ScopedHost key={scopeKey} videoUrl={videoUrl} {...rest}>{children}</ScopedHost>;
  }
  function ScopedHost({ videoUrl, children, ...rest }: Omit<CallHostProviderProps, 'scopeKey'>) {
    const latched = useRef<string | null>(null);
    if (videoUrl && !latched.current) latched.current = videoUrl;
    const [claims] = useState(() => new CallBlockClaims<HTMLElement>());
    return (
      <LVSProvider baseUrl={latched.current ?? ''} getAuthToken={noToken}>
        <Host {...rest}>
          <ClaimsContext.Provider value={claims}>
            <MediaPanelProvider>{children}</MediaPanelProvider>
          </ClaimsContext.Provider>
        </Host>
      </LVSProvider>
    );
  }

  function useCallHost(): CallHostValue<Call> | null {
    return useContext(HostContext);
  }

  function useCallMediaPanel(): CallMediaPanelState | null {
    return useContext(MediaPanelContext);
  }

  function useClaimsSnapshot<T>(read: (claims: CallBlockClaims<HTMLElement>) => () => T, fallback: () => T): T {
    const claims = useContext(ClaimsContext);
    const get = claims ? read(claims) : fallback;
    return useSyncExternalStore(claims?.subscribe ?? noSubscribe, get, get);
  }

  /** Where the one sink draws now. */
  function useCallBlockPlacement(): CallBlockPlacement {
    return useClaimsSnapshot((c) => c.placement, noPlacement);
  }

  /** A composer or page block holds the sink (a side pane offers no second media panel). */
  function useCallBlockPageClaimed(): boolean {
    return useClaimsSnapshot((c) => c.pageClaimed, noFalse);
  }

  /** Claim the sink into `target` while `enabled`; true while this claim holds it. */
  function useClaimCallBlock(target: HTMLElement | null, placement: CallBlockClaimPlacement, enabled = true, options: { compact?: boolean; documents?: readonly CallBlockDocument[] } = {}): boolean {
    const claims = useContext(ClaimsContext);
    const compact = !!options.compact;
    const documentsKey = JSON.stringify(options.documents ?? []);
    const documents = useMemo(() => JSON.parse(documentsKey) as CallBlockDocument[], [documentsKey]);
    useLayoutEffect(() => (claims && target && enabled ? claims.claim(target, placement, { compact, documents }) : undefined), [claims, target, enabled, placement, compact, documents]);
    const current = useClaimsSnapshot((c) => c.current, noTarget);
    return !!target && current === target;
  }

  /**
   * Where the call draws on this surface. `composer`: the full bar over the
   * tiles, flush on a composer's top edge (claimed only while laid out on
   * screen; narrow below 640px). `page` / `block`: a content column's block
   * for a call no composer carries, while the media panel is open. `pane`: the
   * side pane's tile grid. `stage`: a dedicated call page that owns the full
   * grid regardless of the media-panel toggle and takes precedence over chat.
   */
  function CallBlock({ placement, compact = false, documents, className }: CallBlockProps) {
    const host = useContext(HostContext);
    const media = useContext(MediaPanelContext);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const width = useLaidOutWidth(target);
    const drawn = !!host?.lobby && callDrawn(host.call.phase, true);
    const enabled = placement === 'stage' ? drawn && width > 0
      : placement === 'composer' ? width > 0
      : placement === 'pane' ? true
      : drawn && !!media?.open && width > 0;
    const sized = placement === 'composer' || placement === 'stage';
    const narrow = sized && (compact || callBlockNarrow(width));
    const holds = useClaimCallBlock(target, placement, enabled, { compact: narrow, ...(documents ? { documents } : {}) });
    const testId = placement === 'stage' ? 'call-stage' : placement === 'composer' ? 'composer-call-dock' : placement === 'page' ? 'page-call-block' : placement === 'block' ? 'shell-call-block' : 'call-block-pane';
    return <Stack ref={setTarget} gap="none" className={className ?? (placement === 'composer' ? 'min-w-0' : 'shrink-0 min-w-0')} aria-label="Huddle"
      data-testid={testId} data-holds-media={holds ? 'true' : 'false'} {...(sized ? { 'data-compact': narrow ? 'true' : 'false' } : {})} />;
  }

  /** Bind a page's lobby (with its start) while mounted; returns whether the shell's call is this lobby's. */
  function useCallLobby(lobby: CallLobby | null, start?: () => void): { here: boolean; live: boolean } {
    const host = useContext(HostContext);
    const bind = host?.bind;
    const unbind = host?.unbind;
    const startRef = useRef<() => void>(() => {});
    startRef.current = start ?? (() => {});
    const starter = useMemo(() => ({ start: () => startRef.current() }), []);
    const lobbyName = lobby?.lobbyName ?? null;
    const title = lobby?.title ?? '';
    const channel = lobby?.channel ?? null;
    const blocked = lobby?.startBlockedReason;
    useEffect(() => {
      if (bind && lobbyName) bind({ lobbyName, title, channel, ...(blocked ? { startBlockedReason: blocked } : {}) }, starter);
    }, [bind, lobbyName, title, channel, blocked, starter]);
    useEffect(() => {
      if (!unbind || !lobbyName) return undefined;
      return () => unbind(lobbyName);
    }, [unbind, lobbyName]);
    const here = !!host && !!lobbyName && host.lobby?.lobbyName === lobbyName;
    return { here, live: here && !!host && host.call.phase === 'idle' && !!host.call.call };
  }

  /**
   * The call block for a conversation: while the shell's call belongs to one
   * of `conversations` (its lobby, or the channel the call is about) and is
   * drawn — the caller's ring, joining, in call, the ended notice — `block` is
   * the bar and tiles for the composer's `callBlock` slot. With `bind`, the
   * conversation's lobby is bound so the footer's Huddle starts it.
   */
  function useCallBlock(conversations: string | null | readonly (string | null | undefined)[], options: UseCallBlockOptions = {}): CallBlockView {
    const host = useContext(HostContext);
    const list = typeof conversations === 'string' || conversations === null ? [conversations] : conversations;
    const first = list.find((c): c is string => !!c) ?? null;
    const bindTo = options.bind ?? null;
    const lobbyName = bindTo ? (bindTo.lobbyName === undefined ? first : bindTo.lobbyName) : null;
    const blocked = bindTo ? (bindTo.blockedReason ?? host?.unavailableReason ?? undefined) : undefined;
    const lobby = bindTo && lobbyName ? { lobbyName, title: bindTo.title, channel: bindTo.channel === undefined ? lobbyName : bindTo.channel, ...(blocked ? { startBlockedReason: blocked } : {}) } : null;
    const view = useCallLobby(lobby, () => {
      if (blocked || !host) return;
      if (bindTo?.start) { bindTo.start(); return; }
      if (host.lobby?.lobbyName === lobbyName) pageHuddleStart(host.call);
    });
    const holds = options.enabled !== false && conversationHoldsCall(host?.lobby ?? null, host?.call.phase ?? 'idle', list);
    const block = holds ? <CallBlock placement="composer" compact={!!options.compact} {...(options.documents ? { documents: options.documents } : {})} /> : undefined;
    return { block, holds, ...view };
  }

  /**
   * The ONE playback sink: the call dock, mounted for the whole call (camera
   * tiles also carry the audio). It draws into the current claimant, else
   * stays in the footer collapsed (`display: none`; media keeps playing).
   * Moving between claimants moves this one dock — no second subscription.
   */
  function CallMediaOutlet({ id, onOpenPeople, onOpenDocument, overlay, header, extras, notice, recordingConsent, dockTestId }: CallMediaOutletProps) {
    const host = useContext(HostContext);
    const target = useClaimsSnapshot((c) => c.current, noTarget);
    const placement = useClaimsSnapshot((c) => c.placement, noPlacement);
    const holderCompact = useClaimsSnapshot((c) => c.compact, noFalse);
    const documents = useClaimsSnapshot((c) => c.documents, noDocuments);
    const draw = !!host?.lobby && callDrawn(host.call.phase, true);
    const inComposer = !!target && placement === 'composer';
    const fullBar = !!target && placement !== 'pane';
    const layout = callBlockLayout(target ? placement : 'footer', holderCompact);
    const lobby = host?.lobby ?? null;
    // Hands on tiles from the call's meeting, when one rides the call (2.477.0).
    const hands = host?.meeting?.hands;
    const handFor = useMemo(() => {
      if (!hands || hands.length === 0) return undefined;
      const at = new Map(hands.map((h, i) => [h.userId, i + 1]));
      return (userId: string) => at.get(userId);
    }, [hands]);
    // The recording note: in the meeting stage's own row when a stage header holds it, else above the shelf.
    // Only while the header is actually drawn: a page holds the dock (the footer shelf draws no header).
    const stageHoldsNote = !!target && header !== undefined && header !== null && !!host?.meeting;
    const consentNotice = recordingConsent === false || stageHoldsNote ? null : host?.recordingNote ?? null;
    const shownNotice = consentNotice && notice !== undefined ? <Stack gap="xs">{consentNotice}{notice}</Stack> : consentNotice ?? notice;
    const dock = draw && lobby && host ? <ConversationCallDock
      call={host.call}
      title={lobby.title}
      onOpenPeople={() => onOpenPeople?.(lobby, host.tenant)}
      selfName={host.self?.displayName ?? ''}
      compact={!fullBar || holderCompact}
      {...(fullBar && !holderCompact ? { tileSize: 'lg' as const } : {})}
      {...(inComposer && documents.length ? {
        documents: documents.map((doc) => ({ id: doc.id, title: doc.title })),
        onDocumentClick: (docId: string) => { const doc = documents.find((d) => d.id === docId); if (doc) onOpenDocument?.(doc); },
      } : {})}
      layout={layout}
      {...(handFor ? { handFor } : {})}
      {...(extras !== undefined ? { extras } : {})}
      {...(shownNotice !== undefined && shownNotice !== null ? { notice: shownNotice } : {})}
      data-testid={dockTestId ? dockTestId(lobby, host.tenant) : 'conversation-call-dock'}
    /> : null;
    if (!dock) return null;
    return target
      ? createPortal(<Stack gap="none" className={placement === 'stage' ? 'relative h-full min-h-0' : 'relative'} data-testid="shell-call-media" data-placement={placement} data-layout={layout} data-expanded="true">{header}{dock}{overlay}</Stack>, target)
      : <Stack id={id} gap="none" className="hidden" data-testid="shell-call-media" data-placement="footer" data-layout={layout} data-expanded="false">{dock}</Stack>;
  }

  return {
    CallHostProvider,
    CallMediaOutlet,
    CallBlock,
    PreJoinDialog,
    ConversationCallDock,
    useCallHost,
    useCallBlock,
    useCallLobby,
    useCallMediaPanel,
    useCallBlockPlacement,
    useCallBlockPageClaimed,
    useClaimCallBlock,
  };
}

export type CallBlockHost<M extends CallBlockModules> = ReturnType<typeof createCallBlockHost<M>>;
