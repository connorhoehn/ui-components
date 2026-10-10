// conversationComposerModel.ts (2.439.0) — the pure half of ConversationComposer.
// No React, no DOM, no tiptap: a host (or node:test) can check what the
// composer will allow and where a send will go without mounting an editor.
//
// ## Capabilities are the server's answer
//
// `ConversationComposerCapabilities.maySend` is REQUIRED and has no default:
// the composer never assumes a reader may post. A missing `agent` means the
// composer has no Agent mode at all; a present one is on only when `allowed`.
// A missing `mayAttach` means no attachments. Nothing here widens any of them.

import type { ComposedMessage, ComposerMode } from './RichChatComposer';

/** What the server decided this reader may do here. */
export interface ConversationComposerCapabilities {
  /** The reader may post to the conversation. Required; there is no default. */
  maySend: boolean;
  /** Why not, when `maySend` is false (the off Chat mode and its placeholder say it). */
  readOnlyReason?: string | null;
  /**
   * Agent mode. Omitted: the composer has no Agent mode. `allowed` is the
   * server's per-subject answer (never a role-wide guess).
   */
  agent?: { allowed: boolean; reason?: string | null } | null;
  /** Files may be attached. Missing means no. */
  mayAttach?: boolean;
}

/** The page the draft is about — a chip in the card, carried as `{kind,id}` only. */
export interface ConversationReference {
  /** Stable id of the chip. */
  id: string;
  /** Composed by the host from what THIS viewer may see ("Org › Initiatives › Auth Migration"). */
  label: string;
  /** What a Chat send stores (`metadata.pageReference`); titles never travel. Null: display only. */
  page?: { kind: string; id: string } | null;
}

/** A To: destination. The first one is the default unless `defaultRecipient` names another. */
export interface ConversationRecipient {
  /** Stable id: `discussion`, `huddle:<callId>`, `person:<userId>`. */
  id: string;
  label: string;
  /** Groups the To: menu ("Direct message"). */
  group?: string;
  /** The chat channel this recipient's messages land in: typing and the one-input claim follow it. */
  channel?: string | null;
  /** Why it cannot take a message right now (said under To:, Send is off). */
  unavailableReason?: string | null;
  /** Chat-mode placeholder while it is chosen. */
  placeholder?: string;
  /** Carries the page reference (default true). */
  carriesReference?: boolean;
  /** Accepts files (default false). The capability `mayAttach` still has to allow them. */
  attachments?: boolean;
  /** Listed but not choosable (a huddle that has ended). */
  disabled?: boolean;
  /** A failure the destination reports (a refused send), said under To:. */
  error?: string | null;
  /**
   * Claim this recipient's channel for the composer (default true). `false`: a
   * thread elsewhere keeps its own input for it, and a focus request for it
   * goes past this composer (a huddle whose chat is the shell's pane).
   */
  claim?: boolean;
  /** Chosen in To: (open the pane that shows this destination's thread). */
  onSelect?: () => void;
  /**
   * The recipient's own confirmed send. Resolve `false` to keep the draft; a
   * rejection keeps it and shows its message. Default: the composer's `chat`.
   */
  send?: (message: ConversationOutgoing) => boolean | Promise<boolean>;
}

/** What a Chat send hands a recipient. */
export interface ConversationOutgoing {
  text: string;
  html: string;
  /** Files staged in the draft, before upload (a recipient with its own `send` uploads them itself). */
  files: readonly File[];
  /** Metadata for `chat.sendMessage`: displayName, replyTo, pageReference and the uploaded attachments. */
  metadata: Record<string, unknown>;
  /** The page reference the draft still carries, or null. */
  reference: ConversationReference | null;
}

/**
 * What a command handler is told. `argumentText` is what follows the trigger;
 * `argument` the item picked from its argument menu, when there was one.
 */
export interface ConversationCommandInput {
  trigger: string;
  text: string;
  argumentText: string;
  argument?: { id: string; label: string };
  mode: ComposerMode;
  reference: ConversationReference | null;
  recipientId: string | null;
  /** The whole composed message: html, `#` documents, mentions, files. */
  message: ComposedMessage;
}

/**
 * A slash command and what it does. `run` resolves `true` (or nothing) when
 * done — the draft clears; `false` keeps the draft; a string is a refusal the
 * composer shows, keeping the draft.
 */
export type ConversationCommandResult = boolean | string | void;

/** The modes a composer offers, and why each that is off is off. */
export interface ConversationModeState {
  modes: ComposerMode[];
  disabledModes: ComposerMode[];
  reasons: Partial<Record<ComposerMode, string>>;
}

export const DEFAULT_READ_ONLY_REASON = 'You can read this conversation but not post to it.';
export const DEFAULT_AGENT_OFF_REASON = 'The agent is not available to you here.';

/**
 * Chat is offered whenever the composer has a conversation or a To: recipient,
 * and is ON only while one of them can take a message (`choosable`) — a reader
 * still sees Chat, off, with the reason. Agent exists only when
 * `capabilities.agent` is given, and is on only when `allowed`. `offline` turns
 * both off with its reason.
 */
export function conversationModes(input: {
  capabilities: ConversationComposerCapabilities;
  /** The composer has a conversation or recipients at all. */
  hasChat: boolean;
  /** How many recipients can take a message now (the conversation counts when `maySend`). */
  choosable: number;
  offline?: string | null;
  /** Why Chat is off when nothing is choosable. Default: the read-only reason. */
  chatOffReason?: string | null;
}): ConversationModeState {
  const { capabilities, offline } = input;
  const modes: ComposerMode[] = [];
  const reasons: Partial<Record<ComposerMode, string>> = {};
  if (input.hasChat) {
    modes.push('chat');
    const chatReason = offline || (input.choosable > 0 ? null
      : input.chatOffReason || capabilities.readOnlyReason || DEFAULT_READ_ONLY_REASON);
    if (chatReason) reasons.chat = chatReason;
  }
  if (capabilities.agent) {
    modes.push('agent');
    const agentReason = !capabilities.agent.allowed ? (capabilities.agent.reason || DEFAULT_AGENT_OFF_REASON) : offline || null;
    if (agentReason) reasons.agent = agentReason;
  }
  return { modes, disabledModes: modes.filter((m) => !!reasons[m]), reasons };
}

/** The recipient a draft goes to: the chosen one when still listed, else `fallback`, else the first. */
export function resolveRecipient(recipients: readonly ConversationRecipient[], chosen: string | null, fallback?: string | null): ConversationRecipient | null {
  if (chosen) {
    const hit = recipients.find((r) => r.id === chosen);
    if (hit) return hit;
  }
  if (fallback) {
    const hit = recipients.find((r) => r.id === fallback);
    if (hit) return hit;
  }
  return recipients.find((r) => !r.disabled) ?? null;
}

/** The chat channels a composer claims (its thread, and every recipient's). */
export function claimedChannels(channel: string | null, recipients: readonly ConversationRecipient[]): string[] {
  return [...new Set([channel, ...recipients.map((r) => r.channel)].filter((c): c is string => !!c))];
}

/** Visible text in an HTML draft (markup stripped). */
export function draftText(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/** The draft is typing for `channel` only while it holds words, in Chat, addressed to that channel. */
export function typingFor(input: { html: string; mode: ComposerMode; recipientChannel: string | null | undefined; channel: string | null }): boolean {
  return input.mode === 'chat' && !!input.channel && input.recipientChannel === input.channel && draftText(input.html).length > 0;
}

/** Message metadata for a Chat send. */
export function outgoingMetadata(input: {
  displayName: string;
  reply?: { messageId: string; author: string; text: string; timestamp?: string } | null;
  reference?: ConversationReference | null;
  attachments?: readonly ChatAttachmentDescriptor[];
}): Record<string, unknown> {
  return {
    displayName: input.displayName,
    ...(input.reply ? { replyTo: input.reply } : {}),
    ...(input.reference?.page ? { pageReference: { kind: input.reference.page.kind, id: input.reference.page.id } } : {}),
    ...(input.attachments?.length ? { attachments: [...input.attachments] } : {}),
  };
}

/**
 * The Agent-mode text as TYPED. A conversation composer's router hands Agent
 * text over as `/agent <typed>`; a handler wants the typed words.
 */
export function typedAgentText(text: string): string {
  const trimmed = text.trim();
  return /^\/agent\s+/i.test(trimmed) ? trimmed.replace(/^\/agent\s+/i, '') : trimmed;
}

/** The command a typed text addresses, and the words after its trigger. */
export function matchConversationCommand<C extends { trigger: string }>(text: string, commands: readonly C[]): { command: C; argumentText: string } | null {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  for (const command of commands) {
    const t = command.trigger.toLowerCase();
    if (lower === t || lower.startsWith(`${t} `) || lower.startsWith(`${t}\n`)) {
      return { command, argumentText: trimmed.slice(command.trigger.length).trim() };
    }
  }
  return null;
}

// ── draft persistence ──

/** Where a draft is remembered: one key per conversation (and recipient), per device. */
export const DRAFT_STORAGE_PREFIX = 'ui.conversation-draft:';

export function draftStorageKey(draftKey: string): string {
  return `${DRAFT_STORAGE_PREFIX}${draftKey}`;
}

/** Reads a remembered draft; null for none, garbage or no storage. */
export function readStoredDraft(storage: Pick<Storage, 'getItem'> | null | undefined, draftKey: string): string | null {
  try {
    const raw = storage?.getItem(draftStorageKey(draftKey));
    if (!raw) return null;
    const value = JSON.parse(raw) as { html?: unknown } | null;
    return value && typeof value.html === 'string' && draftText(value.html) ? value.html : null;
  } catch { return null; }
}

/** Remembers a draft with words in it; forgets an empty one. Storage failures are ignored (a convenience). */
export function writeStoredDraft(storage: Pick<Storage, 'setItem' | 'removeItem'> | null | undefined, draftKey: string, html: string): void {
  try {
    if (draftText(html)) storage?.setItem(draftStorageKey(draftKey), JSON.stringify({ html }));
    else storage?.removeItem(draftStorageKey(draftKey));
  } catch { /* private mode, quota: drafts are a convenience */ }
}

// ── attachments ──

/** One uploaded file as it rides in `metadata.attachments` (no preview: chat metadata is size-capped). */
export interface ChatAttachmentDescriptor {
  id: string; name: string; size: number; contentType: string; url: string; width?: number; height?: number;
}

export const CONVERSATION_CHANGED = 'Conversation changed; draft retained.';

/** "Upload failed: <reason>" for the composer's alert. */
export function uploadFailureMessage(reason: string | undefined): string {
  const detail = (reason ?? '').replace(/^upload failed:?\s*/i, '').trim() || 'unknown error';
  return `Upload failed: ${detail}`;
}

/** Message text for a send whose body is empty: the names of what was shared. */
export function attachmentOnlyText(attachments: readonly ChatAttachmentDescriptor[]): string {
  return attachments.map((a) => a.name).join(', ');
}

/**
 * Pending uploads keyed by the SERVER-minted transfer id; settled by the
 * gateway's completion frame, a deadline, or a conversation change. A message
 * may cite a file only once the gateway says it landed, and a transfer that
 * never completes must not trap the person's text.
 */
export class AttachmentWaiters {
  private readonly pending = new Map<string, { resolve: (a: ChatAttachmentDescriptor) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> }>();
  wait(transferId: string, timeoutMs: number, label: string): Promise<ChatAttachmentDescriptor> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (this.pending.delete(transferId)) reject(new Error(uploadFailureMessage(`timed out (${label})`)));
      }, timeoutMs);
      this.pending.set(transferId, { resolve, reject, timer });
    });
  }
  complete(transferId: string, attachment: ChatAttachmentDescriptor): boolean {
    const waiter = this.pending.get(transferId);
    if (!waiter) return false;
    this.pending.delete(transferId); clearTimeout(waiter.timer); waiter.resolve(attachment);
    return true;
  }
  rejectAll(reason: string): void {
    for (const waiter of this.pending.values()) { clearTimeout(waiter.timer); waiter.reject(new Error(reason)); }
    this.pending.clear();
  }
  get size(): number { return this.pending.size; }
}
