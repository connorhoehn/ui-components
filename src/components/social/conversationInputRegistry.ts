// conversationInputRegistry.ts (2.439.0) — one input per conversation on screen, and
// the requests that put the caret in it. Pure: no React, no DOM.
//
// Every conversation surface is bound to a channel. A composer
// (`ConversationComposer`) CLAIMS the channels it can send to right now — its
// own thread, and the huddle while it offers that recipient. A thread pane
// (`WrappedChatPanel` in a side pane, the huddle chat) bound to a claimed
// channel draws the thread only and hands every send intent ("Write", "Reply")
// to the claiming composer. A thread whose channel no composer claims keeps its
// own input. The newest claim wins, so a later-mounted composer is the one a
// send intent lands in.
//
// The same bus carries the shell's FOCUS requests — the footer's Message, a
// huddle bar's chat toggle: "put the caret in a composer, in this mode, to this
// recipient". Revealers (a collapsed side pane) run first and cannot answer;
// the first mounted composer that answers takes the request.
//
// Before 2.439 an app kept both as module globals beside its composers
// (aws-agentcore `lib/conversationInputs.ts` + `lib/composerFocus.ts`). They
// are one instance per `ConversationInputProvider` here, so two shells (or two
// tests) never share claims.

/** What a focus request addresses. `discussion` is the page's own thread. */
export type ComposerFocusTarget =
  | { kind: 'huddle' }
  | { kind: 'discussion' }
  | { kind: 'person'; userId: string }
  | { kind: 'channel'; channel: string };

export interface ComposerFocusRequest {
  mode: 'chat' | 'agent';
  target?: ComposerFocusTarget;
}

/** A mounted composer and the conversations it can send to now. */
export interface ConversationInputClaim {
  readonly id: number;
  /** Channels this composer addresses now (its thread; the huddle when it offers that recipient). */
  readonly channels: readonly string[];
  /** Names the composer in a thread's hand-off ("the document composer"). */
  readonly label: string;
  /** The composer carries a quote-reply started in the thread. */
  readonly replies: boolean;
}

/** Who owns the input for a thread bound to one channel. */
export type ThreadInputOwner =
  | { readonly owner: 'thread' }
  | { readonly owner: 'composer'; readonly claimId: number; readonly label: string; readonly replies: boolean };

const OWN: ThreadInputOwner = { owner: 'thread' };

/** The thread bound to `channel` keeps its own input unless a composer claims that channel; the newest claim wins. */
export function threadInputOwner(channel: string | null | undefined, claims: readonly ConversationInputClaim[]): ThreadInputOwner {
  if (!channel) return OWN;
  for (let i = claims.length - 1; i >= 0; i -= 1) {
    const claim = claims[i]!;
    if (claim.channels.includes(channel)) return { owner: 'composer', claimId: claim.id, label: claim.label, replies: claim.replies };
  }
  return OWN;
}

/** A thread's send intent: the claiming composer selects `channel` and takes the caret. */
export interface ThreadInputIntent {
  channel: string;
  /** A quote-reply the thread started (offered only when the claim `replies`). */
  reply?: boolean;
}

export interface ClaimConversationInput {
  channels: readonly string[];
  label: string;
  replies?: boolean;
  /** Put the caret in the composer, switched to Chat and to `intent.channel`. True once handled. */
  focus(intent: ThreadInputIntent): boolean;
}

type FocusListener = (request: ComposerFocusRequest) => boolean;
type Revealer = (request: ComposerFocusRequest) => void;

/** One shell's claims and focus requests. Snapshots change identity only when their contents do. */
export class ConversationInputRegistry {
  private entries: Array<{ claim: ConversationInputClaim; focus: ClaimConversationInput['focus'] }> = [];
  private claimsValue: readonly ConversationInputClaim[] = [];
  private readonly listeners = new Set<() => void>();
  private readonly focusListeners: FocusListener[] = [];
  private readonly revealers = new Set<Revealer>();
  private nextId = 1;

  // ── one input per conversation ──

  claim(input: ClaimConversationInput): () => void {
    const entry = {
      claim: { id: this.nextId++, channels: [...new Set(input.channels)], label: input.label, replies: !!input.replies },
      focus: input.focus,
    };
    this.entries = [...this.entries, entry];
    this.publish();
    return () => {
      const before = this.entries.length;
      this.entries = this.entries.filter((candidate) => candidate !== entry);
      if (this.entries.length !== before) this.publish();
    };
  }

  /** The owning composer takes the caret; false when no composer claims `intent.channel`. */
  focusThread(intent: ThreadInputIntent): boolean {
    const owner = threadInputOwner(intent.channel, this.claimsValue);
    if (owner.owner !== 'composer') return false;
    const entry = this.entries.find((candidate) => candidate.claim.id === owner.claimId);
    return entry ? entry.focus(intent) : false;
  }

  readonly claims = (): readonly ConversationInputClaim[] => this.claimsValue;

  // ── focus requests ──

  /** A mounted composer answers requests; return true once handled. Asked in mount order. */
  onFocusRequest(listener: FocusListener): () => void {
    this.focusListeners.push(listener);
    this.publish();
    return () => {
      const at = this.focusListeners.lastIndexOf(listener);
      if (at >= 0) { this.focusListeners.splice(at, 1); this.publish(); }
    };
  }

  /** Runs before the composers on every request (a collapsed pane reveals itself); it cannot answer. */
  onReveal(revealer: Revealer): () => void {
    this.revealers.add(revealer);
    return () => { this.revealers.delete(revealer); };
  }

  /** True when a composer took the request; false → the caller opens its own panel. */
  requestFocus(request: ComposerFocusRequest): boolean {
    for (const reveal of this.revealers) reveal(request);
    for (const listener of [...this.focusListeners]) if (listener(request)) return true;
    return false;
  }

  /** Is any composer mounted to take a focus request? */
  readonly composerPresent = (): boolean => this.focusListeners.length > 0;

  readonly subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };

  private publish(): void {
    const next = this.entries.map((entry) => entry.claim);
    const same = next.length === this.claimsValue.length && next.every((claim, i) => claim === this.claimsValue[i]);
    if (!same) this.claimsValue = next;
    for (const listener of this.listeners) listener();
  }
}
