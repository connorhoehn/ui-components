// callBlockModel.ts (2.439.0) — the pure half of the call block. No React.
//
// An app has ONE conversation call at a time (one `useConversationCall`), and
// ONE media sink: the call dock whose tiles carry every remote stream. Where
// that sink draws is decided by CLAIMS, highest first:
//
//   stage     a dedicated call page; keeps media central even with chat open;
//   composer  a conversation composer whose conversation holds the call — the
//             full call bar over the tiles, flush on the composer's top edge
//             (`ConversationComposer callBlock`);
//   page      a page's own call block under its content column, for a call no
//             on-screen composer carries;
//   block     the shell's block under the routed page, the same, on a page
//             that docks none of its own;
//   pane      the shell's side-pane media panel (tiles only; the footer keeps
//             the controls).
//
// Within a placement the last claimant wins; a release falls back to the one
// before it; with no claim the footer's collapsed shelf holds the sink.
// Claims only MOVE the one sink: nothing can mount a second dock or a second
// media subscription, so a composer's bar and the footer read the same call.
//
// Before 2.439 an app kept this as its own model (aws-agentcore
// `components/shell/callShellModel.ts`) beside a hand-wired host.

export type CallPhase = 'idle' | 'calling' | 'ringing' | 'connecting' | 'live' | 'reconnecting' | 'ended' | 'failed';

/** Where the one call-media sink draws. */
export type CallBlockPlacement = 'stage' | 'composer' | 'page' | 'block' | 'pane' | 'footer';
export type CallBlockClaimPlacement = Exclude<CallBlockPlacement, 'footer'>;

/** What a call is about, drawn as the bar's document chips. */
export interface CallBlockDocument { id: string; title: string; href?: string }

export interface CallBlockClaimOptions {
  /** A narrow host: the bar's narrow form over tiles two to a row. Composer claims only. */
  compact?: boolean;
  /** The bar's document chips. Composer claims only. */
  documents?: readonly CallBlockDocument[];
}

const NO_DOCUMENTS: readonly CallBlockDocument[] = [];
const RANK: readonly CallBlockClaimPlacement[] = ['stage', 'composer', 'page', 'block', 'pane'];

/** The sink's claims. Each read is a stable snapshot for `useSyncExternalStore`. */
export class CallBlockClaims<T> {
  private claims: { token: symbol; target: T; placement: CallBlockClaimPlacement; compact: boolean; documents: readonly CallBlockDocument[] }[] = [];
  private listeners = new Set<() => void>();
  claim(target: T, placement: CallBlockClaimPlacement = 'page', options: CallBlockClaimOptions = {}): () => void {
    const token = Symbol('call-block-claim');
    this.claims = [...this.claims, { token, target, placement, compact: !!options.compact, documents: options.documents ?? NO_DOCUMENTS }];
    this.emit();
    return () => {
      const before = this.claims.length;
      this.claims = this.claims.filter((claim) => claim.token !== token);
      if (this.claims.length !== before) this.emit();
    };
  }
  private top() {
    for (const placement of RANK) {
      for (let i = this.claims.length - 1; i >= 0; i -= 1) if (this.claims[i]!.placement === placement) return this.claims[i]!;
    }
    return null;
  }
  /** The element the sink renders into now, or null for the footer. */
  current = (): T | null => this.top()?.target ?? null;
  /** Where the sink renders now. */
  placement = (): CallBlockPlacement => this.top()?.placement ?? 'footer';
  /** The holder asked for the narrow form. */
  compact = (): boolean => this.top()?.compact ?? false;
  /** The holder's document chips (one stable array per claim). */
  documents = (): readonly CallBlockDocument[] => this.top()?.documents ?? NO_DOCUMENTS;
  /** A composer or page block holds the sink (so a side pane offers no second media panel). */
  pageClaimed = (): boolean => this.claims.some((claim) => claim.placement !== 'pane');
  subscribe = (listener: () => void): (() => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private emit() { for (const listener of this.listeners) listener(); }
}

/**
 * How the one dock draws for a placement: above a composer the full bar over
 * the tiles (`shelf`, or the narrow `stack` in a side pane); a page or shell
 * block the full bar too; the pane's media panel the reflowing tile grid; the
 * footer's collapsed shelf the thumbnail strip.
 */
export function callBlockLayout(placement: CallBlockPlacement, compact = false): 'grid' | 'shelf' | 'stack' | 'stage' {
  if (placement === 'stage') return 'stage';
  if (placement === 'composer') return compact ? 'stack' : 'shelf';
  return placement === 'pane' ? 'grid' : 'shelf';
}

/**
 * Below this width a composer's call block takes its narrow form (the bar's
 * ⋯ menu, tiles two to a row): three full-bar tiles need ~740px.
 */
export const CALL_BLOCK_NARROW_PX = 640;
export function callBlockNarrow(width: number): boolean {
  return width > 0 && width < CALL_BLOCK_NARROW_PX;
}

/** A call is drawn from the caller's first ring until the ended notice clears; an incoming ring is the toast's. */
export function callDrawn(phase: CallPhase | string, hasLobby: boolean): boolean {
  return hasLobby && phase !== 'idle' && phase !== 'ringing';
}

/** A call is on (drawn, and not over). */
export function callOn(phase: CallPhase | string, hasLobby: boolean): boolean {
  return callDrawn(phase, hasLobby) && phase !== 'ended' && phase !== 'failed';
}

/**
 * A conversation holds the call when the call's lobby, or the channel it
 * belongs to, is one of `conversations`, and the call is drawn.
 */
export function conversationHoldsCall(lobby: { lobbyName: string; channel: string | null } | null, phase: CallPhase | string,
  conversations: readonly (string | null | undefined)[]): boolean {
  if (!lobby || !callDrawn(phase, true)) return false;
  return conversations.some((name) => !!name && (name === lobby.lobbyName || name === lobby.channel));
}

/** People in the call (the server's distinct count), kept apart from invitees still ringing. */
export function callCounts(call: { participantCount: number; participants: readonly { state: string }[] } | null): { joined: number; ringing: number } {
  if (!call) return { joined: 0, ringing: 0 };
  const inCall = call.participants.filter((person) => person.state === 'in-call' || person.state === 'reconnecting').length;
  return { joined: Math.max(call.participantCount, inCall), ringing: call.participants.filter((person) => person.state === 'ringing').length };
}

/**
 * A page's huddle: walk into the huddle that is on (discovered while idle),
 * else open one with nobody rung. What a page's bound start does by default.
 */
export function pageHuddleStart(call: { phase: string; call: unknown; rejoin(): unknown; start(targets: { userId: string; displayName: string }[]): unknown }): 'rejoin' | 'start' | null {
  if (call.phase === 'idle' && call.call) { void call.rejoin(); return 'rejoin'; }
  if (call.phase === 'idle' || call.phase === 'ended' || call.phase === 'failed') { void call.start([]); return 'start'; }
  return null;
}

// ── the pre-join device check ──
//
// Every way into a call — a page's Start, the footer's Huddle, a room, a live
// huddle's Join, an incoming ring's Accept — passes the device check first,
// unless the person ticked "remember". `check` is the person's own request:
// it never gates a call and joins nothing.

/** What this person last chose for how they enter a call. Device ids live in the call's own device preferences. */
export interface PreJoinChoice { micOn: boolean; cameraOn: boolean; remember: boolean }
export type PreJoinKind = 'start' | 'join' | 'accept' | 'check';
export type PreJoinMethod = 'start' | 'rejoin' | 'accept';

export const DEFAULT_PRE_JOIN: PreJoinChoice = { micOn: true, cameraOn: true, remember: false };
/** An incoming ring's check dismisses itself into "join as last time" after this long. */
export const RING_AUTO_JOIN_MS = 10_000;

/** Tolerates a missing key, garbage and partial records. */
export function parsePreJoin(raw: string | null | undefined): PreJoinChoice {
  if (!raw) return DEFAULT_PRE_JOIN;
  try {
    const value = JSON.parse(raw) as Partial<PreJoinChoice> | null;
    if (!value || typeof value !== 'object') return DEFAULT_PRE_JOIN;
    return {
      micOn: typeof value.micOn === 'boolean' ? value.micOn : DEFAULT_PRE_JOIN.micOn,
      cameraOn: typeof value.cameraOn === 'boolean' ? value.cameraOn : DEFAULT_PRE_JOIN.cameraOn,
      remember: value.remember === true,
    };
  } catch { return DEFAULT_PRE_JOIN; }
}

/** Does this method enter a call (so the check applies)? A rejoin after a loss, or anything while a call is on, passes. */
export function preJoinGate(method: PreJoinMethod, phase: string, liveCallKnown: boolean): PreJoinKind | null {
  if (method === 'accept') return 'accept';
  if (method === 'start') return phase === 'idle' || phase === 'ended' || phase === 'failed' ? 'start' : null;
  return phase === 'idle' && liveCallKnown ? 'join' : null;
}

/** "Remember" skips the screen on the next join; otherwise every entry shows it. */
export function shouldShowPreJoin(choice: PreJoinChoice, kind: PreJoinKind): boolean {
  return kind === 'check' || !choice.remember;
}

/** Asking for the check clears the remembered skip: only a re-ticked Remember brings it back. */
export function checkDevicesInitial(choice: PreJoinChoice): PreJoinChoice {
  return { ...choice, remember: false };
}

/** Only a ring counts down: someone is waiting on the answer. */
export function preJoinCountdownMs(kind: PreJoinKind): number | null {
  return kind === 'accept' ? RING_AUTO_JOIN_MS : null;
}

/** What to toggle once media is up so the call opens muted / camera off as chosen. */
export function mediaFixups(choice: PreJoinChoice, self: { audioOn: boolean; cameraOn: boolean }): { toggleMic: boolean; toggleCamera: boolean } {
  return { toggleMic: !choice.micOn && self.audioOn, toggleCamera: !choice.cameraOn && self.cameraOn };
}

/** What is stored after Join: the choices always (so "as last time" works); `remember` only when ticked. */
export function nextPreJoin(choice: PreJoinChoice): PreJoinChoice {
  return { micOn: choice.micOn, cameraOn: choice.cameraOn, remember: choice.remember };
}

export function countdownSeconds(remainingMs: number): number {
  return Math.max(0, Math.ceil(remainingMs / 1000));
}
