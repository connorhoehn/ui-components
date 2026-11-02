// ConversationComposer (2.439.0) — THE composer for a conversation: a thread,
// a page's discussion, a huddle, a document's chat, a search box.
//
//   const ConversationComposer = createConversationComposer({ useFileUpload });   // once, at module scope
//   <ConversationComposer channel="orgiq:initiative:p-1" chat={useChat(channel)}
//     context={{ kind: 'initiative', id: 'p-1', title: 'Auth Migration', reference }}
//     capabilities={{ maySend, readOnlyReason, agent: { allowed, reason }, mayAttach }}
//     commands={[{ trigger: '/deck', label: 'Status deck', run: buildDeck }]}
//     onAgent={ask} callBlock={useCallBlock(channel).block} />
//
// It is `ContextComposer` (the look: one idle row that expands to the card,
// modes, chips, `/` commands, Workflow ⌄) with the conversation's wiring that
// every app was composing around it, five times over:
//
//   - Modes from CAPABILITIES. `maySend` is required and has no default; Agent
//     exists only when `capabilities.agent` is passed and is on only when the
//     server said `allowed`. Off modes carry the server's reason.
//   - To: recipients. Chat goes to the conversation or to a recipient the host
//     lists (a huddle, a person); each says why it is off. The conversation's
//     own recipient is gated by `maySend` whatever the host lists.
//   - The page reference chip (`context.reference`): a removable chip; a Chat
//     send to a recipient that carries it stores `{kind,id}` only.
//   - Slash commands with HANDLERS: a typed `/deck` runs its `run`; `true`
//     clears the draft, `false` keeps it, a string is a refusal shown above it.
//   - Typing (`chat.setTyping`) while a Chat draft addressed to this channel
//     has words; cleared on send and when the draft leaves the channel.
//   - Attachments through realtime-modules' `useFileUpload` (injected): files
//     land first, the message cites only what the gateway confirmed, a failed
//     or stuck upload keeps the draft.
//   - Quote-reply (`reply`), the draft remembered per actor and conversation
//     on this device (unknown identities never restore a stored draft),
//     and a "sent; your newer draft was kept" note when the draft moved on
//     while a send was being confirmed.
//   - One input per conversation: with `claim`, it claims its channels
//     (ConversationInputs) so a thread pane on the same conversation draws the
//     thread only; with `answersFocus`, it takes the shell's focus requests
//     (the footer's Message) — Chat or Agent, to the asked-for recipient.
//   - The call block (`callBlock`): the huddle bar and tiles flush on the
//     composer's top edge, from `useCallBlock(channel)`.
//   - Read-only (2.450.0): when Chat is off for the chosen destination by a
//     verdict (`maySend` false, a destination's reason) the whole composer
//     reads as read-only — the editor takes no words, the note sits where the
//     placeholder was (or, when the To: row already says why, what to do),
//     every control is off and To: stays live. `capabilities.pending` (the
//     server has not answered) is quiet instead, so loading never flashes it.
//   - Density: under `DensityProvider value="compact"` (a side pane, a canvas
//     page) it takes the one-row pane form. There is no size prop.
//
// Scope-agnostic: the one realtime-modules hook it calls is injected, so the
// subpath loads under any install scope.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type Ref } from 'react';
import { cn } from '../../lib/cn';
import { useDensityForm } from '../shared/Density';
import { Select } from '../forms/Select';
import { Inline, Stack } from '../ui/Stack';
import { Text } from '../shared/Text';
import { useToastOptional } from '../shared/ToastProvider';
import { ContextComposer, type ContextComposerProps } from './ContextComposer';
import { ComposerReferences } from './ComposerReferences';
import { ComposerSendError } from './composerSendError';
import { ComposerPromptDeck, useComposerPromptDeck, type ComposerPromptInput } from './ComposerPromptDeck';
import type { ComposerPrompt } from './composerPromptModel';
import type { ComposedMessage, ComposerCommand, ComposerMode, RichChatComposerHandle, RichChatDraft } from './RichChatComposer';
import type { ComposerContext } from './composerContext';
import { composerDraftOf } from './agentComposerDraft';
import { useClaimConversationInput, useComposerFocusRequest } from './ConversationInputs';
import type { ComposerFocusRequest } from './conversationInputRegistry';
import {
  AttachmentWaiters,
  CONVERSATION_CHANGED,
  attachmentOnlyText,
  claimedChannels,
  conversationModes,
  matchConversationCommand,
  outgoingMetadata,
  readStoredDraft,
  resolveRecipient,
  typedAgentText,
  typingFor,
  uploadFailureMessage,
  writeStoredDraft,
  type ChatAttachmentDescriptor,
  type ConversationCommandInput,
  type ConversationCommandResult,
  type ConversationComposerCapabilities,
  type ConversationOutgoing,
  type ConversationRecipient,
  type ConversationReference,
} from './conversationComposerModel';

// ── the injected hook ──

/** A transfer the gateway reports finished (realtime-modules `CompletedTransfer`, restated). */
export interface ConversationCompletedTransfer {
  transferId: string;
  /** True on the sender's client only. */
  mine: boolean;
  filename: string;
  size: number;
  contentType: string;
  downloadUrl: string;
  width?: number;
  height?: number;
}

/** The realtime-modules hook the composer calls: `useFileUpload` from `/client`, as installed. */
export interface ConversationComposerModules {
  useFileUpload: (
    channel: string,
    options?: { displayName?: string; onComplete?: (transfer: ConversationCompletedTransfer) => void },
  ) => { upload: (file: File) => Promise<{ status: string; transferId?: string; error?: string }> };
}

/** The slice of realtime-modules `useChat(channel)` the composer sends and types through. */
export interface ConversationChat {
  sendMessage: (text: string, metadata?: Record<string, unknown>) => void;
  setTyping?: (typing: boolean) => void;
}

/** A pending quote-reply, from the thread beside the composer. */
export interface ConversationReply {
  reply: { messageId: string; author: string; text: string; timestamp?: string } | null;
  clear: () => void;
}

/** A slash command and its handler. */
export interface ConversationCommand {
  trigger: string;
  label: string;
  hint?: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  argument?: ComposerCommand['argument'];
  /** Where it is offered. Default: every mode the composer has. */
  modes?: readonly ComposerMode[];
  run: (input: ConversationCommandInput) => ConversationCommandResult | Promise<ConversationCommandResult>;
}

type Owned =
  | 'context' | 'modes' | 'disabledModes' | 'modeUnavailableReasons' | 'chatAvailable' | 'agentUnavailableReason'
  | 'onSend' | 'commands' | 'onCommand' | 'dock' | 'reply' | 'allowAttachments' | 'responsive' | 'mode' | 'onModeChange'
  | 'draftKey' | 'disabled' | 'readOnly';

export interface ConversationComposerOwnProps {
  /** The conversation this composer writes to (its thread). Null: no thread (an agent-only search box). */
  channel: string | null;
  /** The host's `useChat(channel)` — one join per channel, shared with the thread. */
  chat?: ConversationChat | null;
  /** What the composer is attached to, and the page reference its Chat sends carry. */
  context: ComposerContext & { reference?: ConversationReference | null };
  /** The server's answer for this reader. Required. */
  capabilities: ConversationComposerCapabilities;
  /** Who is writing: `displayName` is stamped on every message. */
  identity?: { userId: string; displayName: string } | null;
  /** Why the gateway cannot take a message now (offline); turns Chat and Agent off with it. */
  offline?: string | null;
  /** To: destinations. Default: the conversation itself. */
  recipients?: readonly ConversationRecipient[];
  /** The recipient a fresh draft goes to (default: the first that can take a message). */
  defaultRecipient?: string;
  /** Controlled To: (the chosen recipient's id). Pair with `onRecipientChange`. */
  recipient?: string | null;
  onRecipientChange?: (id: string) => void;
  /** Slash commands with handlers (`/deck`, `/summarize`, `/doc`, `/agent`). */
  commands?: readonly ConversationCommand[];
  /** Agent-mode text that is no command. Without it, the `/agent` command (if any) takes it. */
  onAgent?: (text: string, input: ConversationCommandInput) => ConversationCommandResult | Promise<ConversationCommandResult>;
  /** The call bar and tiles, flush on the composer's top edge (`useCallBlock(channel).block`). */
  callBlock?: ReactNode;
  /** The quote-reply started in the thread; it travels with a Chat send to the conversation. */
  reply?: ConversationReply | null;
  /** Controlled mode. */
  mode?: ComposerMode;
  onModeChange?: (mode: ComposerMode) => void;
  /** The draft's subject (default: the channel, else the context). A new key starts a new draft. */
  draftKey?: string;
  /** Remember the draft per known `identity.userId` and conversation on this device (default true; ignored for a controlled `draft`). Unknown identities never read/write stored drafts. */
  persistDraft?: boolean;
  /**
   * Claim this conversation's input (and every recipient's), so a thread pane
   * on the same conversation draws the thread only. `label` names this
   * composer in that pane's hand-off.
   */
  claim?: { label: string; replies?: boolean; enabled?: boolean } | false;
  /** Take the shell's focus requests (the footer's Message) while mounted. */
  answersFocus?: boolean;
  /** Bring this composer on screen before it takes the caret (a tab switch). */
  onReveal?: () => void;
  /** Disable input regardless of mode (a host-side lock). */
  disabled?: boolean;
  /**
   * Modes listed but never available here, each with why ("Search has no
   * terminal"): shown off in the mode menu so the reader learns they exist.
   * Never turns a mode ON — capabilities do that.
   */
  offModes?: Partial<Record<ComposerMode, string>>;
  /**
   * Human-in-the-loop prompts replace the message editor while expanded.
   * Choices use numbered buttons; text/number prompts expose a plain answer
   * field. Hide or finish restores the conversation draft and its tools.
   */
  prompts?: readonly ComposerPrompt[];
}

export type ConversationComposerProps = ConversationComposerOwnProps & Omit<ContextComposerProps, Owned>;

const SENT_KEPT = 'Message sent. Your current draft has been kept.';
const GONE = 'This destination is no longer available. Choose a current destination.';
const NO_PAGE = 'This view has no page to attach.';

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === 'function') ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/** Lists `off` modes as off with their reasons; a mode already offered keeps its own state. */
function withOffModes(state: ReturnType<typeof conversationModes>, off: Partial<Record<ComposerMode, string>> | undefined): ReturnType<typeof conversationModes> {
  if (!off) return state;
  const extra = (Object.keys(off) as ComposerMode[]).filter((m) => !state.modes.includes(m) && off[m]);
  if (!extra.length) return state;
  return {
    modes: [...state.modes, ...extra],
    disabledModes: [...state.disabledModes, ...extra],
    reasons: { ...state.reasons, ...Object.fromEntries(extra.map((m) => [m, off[m]!])) },
  };
}

function storage(): Storage | null {
  try { return typeof window === 'undefined' ? null : window.localStorage; } catch { return null; }
}

/** Uploads files to `channel` through the gateway and resolves each once the gateway says it landed. */
export function useConversationUploads(rm: ConversationComposerModules, channel: string | null, displayName: string, timeoutMs = 60_000) {
  const waiters = useRef(new AttachmentWaiters());
  const channelRef = useRef(channel);
  channelRef.current = channel;
  useEffect(() => () => waiters.current.rejectAll(CONVERSATION_CHANGED), [channel]);
  const { upload } = rm.useFileUpload(channel ?? 'chat:no-conversation', {
    displayName,
    onComplete: (t) => {
      if (!t.mine) return;
      waiters.current.complete(t.transferId, {
        id: t.transferId, name: t.filename, size: t.size, contentType: t.contentType, url: t.downloadUrl,
        ...(t.width ? { width: t.width } : {}), ...(t.height ? { height: t.height } : {}),
      });
    },
  });
  const uploadOne = useCallback(async (file: File): Promise<ChatAttachmentDescriptor> => {
    const target = channelRef.current;
    if (!target) throw new ComposerSendError('This conversation cannot take files yet.');
    let state: { status: string; transferId?: string; error?: string };
    try { state = await upload(file); } catch (err) { throw new ComposerSendError(uploadFailureMessage(err instanceof Error ? err.message : String(err))); }
    if (channelRef.current !== target) throw new Error(CONVERSATION_CHANGED);
    if (state.status === 'failed') throw new ComposerSendError(uploadFailureMessage(state.error));
    if (!state.transferId) throw new ComposerSendError(uploadFailureMessage(`no transfer id for ${file.name}`));
    try { return await waiters.current.wait(state.transferId, timeoutMs, file.name); } catch (err) {
      throw err instanceof Error && err.message === CONVERSATION_CHANGED ? err : new ComposerSendError(err instanceof Error ? err.message : uploadFailureMessage(undefined));
    }
  }, [upload, timeoutMs]);
  return useCallback((files: readonly File[]) => Promise.all(files.map(uploadOne)), [uploadOne]);
}

/** The To: select. Library part, so every composer names its destination the same way. */
export function ComposerRecipientSelect({ id, value, recipients, onChange, readOnlyWayOut, disabled, 'data-testid': testId }: {
  id: string;
  value: string | null;
  recipients: readonly ConversationRecipient[];
  onChange: (id: string) => void;
  /**
   * The composer is read-only and this select is the way out (another
   * destination can take a message): marked `data-composer-readonly-allow`
   * with this reason, so the read-only rule reads it as deliberate. Since 2.479.0.
   */
  readOnlyWayOut?: string;
  disabled?: boolean;
  'data-testid'?: string;
}) {
  const flat = recipients.filter((r) => !r.group).map((r) => ({ value: r.id, label: r.label, ...(r.disabled ? { disabled: true } : {}) }));
  const groupNames = [...new Set(recipients.filter((r) => r.group).map((r) => r.group!))];
  const groups = groupNames.map((label) => ({
    label,
    options: recipients.filter((r) => r.group === label).map((r) => ({ value: r.id, label: r.label, ...(r.disabled ? { disabled: true } : {}) })),
  }));
  return (
    <Inline gap="xs" align="center" wrap={false} className="ml-1 min-w-0 shrink-0 self-start rounded-md border border-border bg-surface pl-2">
      <Text size="xs" tone="secondary" className="shrink-0">To:</Text>
      <Select id={id} aria-label="Chat recipient" value={value ?? ''} size="sm" placeholder="Choose a destination"
        wrapperClassName="max-w-[12rem]" className="max-w-[12rem] truncate border-0 bg-transparent pr-7 text-xs font-medium"
        options={flat} groups={groups} chevron="custom" {...(testId ? { 'data-testid': testId } : {})}
        {...(readOnlyWayOut ? { 'data-composer-readonly-allow': readOnlyWayOut } : {})}
        {...(disabled ? { disabled: true } : {})}
        onChange={(event) => onChange(event.target.value)} />
    </Inline>
  );
}

export type ConversationComposerComponent = (props: ConversationComposerProps) => React.JSX.Element;

/** Bind the composer to the installed realtime-modules `useFileUpload`. Call once, at module scope. */
export function createConversationComposer(rm: ConversationComposerModules): ConversationComposerComponent {
  function BoundConversationComposer(props: ConversationComposerProps) {
    return <ConversationComposerImpl rm={rm} {...props} />;
  }
  BoundConversationComposer.displayName = 'ConversationComposer';
  return BoundConversationComposer;
}

function ConversationComposerImpl({
  rm,
  channel,
  chat,
  context,
  capabilities,
  identity,
  offline,
  recipients: recipientsProp,
  defaultRecipient,
  recipient: recipientProp,
  onRecipientChange,
  commands = [],
  onAgent,
  callBlock,
  reply,
  mode: modeProp,
  onModeChange,
  defaultMode,
  draftKey: draftKeyProp,
  persistDraft = true,
  claim = false,
  answersFocus = false,
  onReveal,
  disabled: hostDisabled,
  offModes,
  prompts,
  composerRef,
  onDraftChange,
  defaultDraft,
  draft: draftProp,
  above: hostAbove,
  modeRowEnd: hostModeRowEnd,
  references: hostReferences,
  onRemoveReference: hostRemoveReference,
  modePlaceholders: hostPlaceholders,
  contextChip,
  sendWithReferencesOnly,
  console: consoleProp,
  'data-testid': testId = 'conversation-composer',
  ...rest
}: ConversationComposerProps & { rm: ConversationComposerModules }) {
  const compact = useDensityForm() === 'compact';
  const displayName = identity?.displayName || 'You';
  const draftKey = draftKeyProp ?? channel ?? `${context.kind}:${context.id}`;

  // ── recipients ── the conversation's own recipient is always gated by maySend.
  const readOnly = capabilities.readOnlyReason || 'You can read this conversation but not post to it.';
  const recipients = useMemo<ConversationRecipient[]>(() => {
    const listed = recipientsProp ?? (channel ? [{ id: 'discussion', label: context.title || 'This conversation', channel, attachments: true }] : []);
    return listed.map((r) => (r.channel && r.channel === channel && !capabilities.maySend
      ? { ...r, unavailableReason: r.unavailableReason ?? readOnly, disabled: listed.length > 1 ? true : r.disabled }
      : r));
  }, [recipientsProp, channel, context.title, capabilities.maySend, readOnly]);
  const [innerChosen, setChosen] = useState<string | null>(null);
  const chosen = recipientProp !== undefined ? recipientProp : innerChosen;
  // A chosen destination that has gone (a huddle that ended) stays chosen, off,
  // with why: a draft is never silently redirected to another destination.
  const gone = !!chosen && !recipients.some((r) => r.id === chosen);
  const recipient = gone
    ? { id: chosen!, label: 'Previous destination', disabled: true, unavailableReason: GONE }
    : resolveRecipient(recipients, chosen, defaultRecipient);
  const choosable = recipients.filter((r) => !r.disabled && !r.unavailableReason).length;
  const hasChat = recipients.length > 0;
  const modeState = withOffModes(conversationModes({ capabilities, hasChat, choosable, offline: offline ?? null, chatOffReason: recipient?.unavailableReason ?? null }), offModes);

  // ── mode ──
  const startMode: ComposerMode = defaultMode && modeState.modes.includes(defaultMode) ? defaultMode
    : modeState.modes.find((m) => !modeState.disabledModes.includes(m)) ?? modeState.modes[0] ?? 'chat';
  const [innerMode, setInnerMode] = useState<ComposerMode>(startMode);
  const mode = modeProp ?? innerMode;
  const changeMode = useCallback((next: ComposerMode) => {
    if (modeProp === undefined) setInnerMode(next);
    onModeChange?.(next);
  }, [modeProp, onModeChange]);
  // A mode taken away (the reader lost Agent) falls back to one still on.
  const modesKey = `${modeState.modes.join(',')}|${modeState.disabledModes.join(',')}`;
  useEffect(() => {
    if (modeState.modes.includes(mode) && !modeState.disabledModes.includes(mode)) return;
    const fallback = modeState.modes.find((m) => !modeState.disabledModes.includes(m));
    if (fallback && fallback !== mode) changeMode(fallback);
  }, [modesKey, mode, changeMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── reference ──
  const [withReference, setWithReference] = useState(true);
  const reference = context.reference ?? null;
  useEffect(() => { setWithReference(true); }, [reference?.id]);
  const carries = !!recipient && recipient.carriesReference !== false;
  // A reference with no page to store means nothing to a destination outside this thread.
  const pageless = !!reference && !reference.page;
  const offThread = !!recipient && recipient.channel !== channel;
  const showReference = !!reference && withReference && !(mode === 'chat' && (!carries || (pageless && offThread)));
  const sentReference = mode === 'chat' && carries && withReference && !(pageless && offThread) ? reference : null;

  // ── draft (remembered per conversation) ──
  const generation = useRef(0);
  const controlled = draftProp !== undefined;
  const actorId = identity?.userId?.trim() || null;
  // A logical conversation key is not an actor boundary. Old un-attributed
  // device drafts remain untouched; guessing their owner would expose them.
  const storedDraftKey = actorId ? JSON.stringify(['actor', actorId, draftKey]) : null;
  const editorDraftKey = persistDraft && !controlled
    ? JSON.stringify(['actor', actorId, draftKey])
    : draftKey;
  // A receipt belongs to the scope that submitted it, even if this component
  // remains mounted as the host changes actor, conversation or destination.
  const scopeKey = JSON.stringify([draftKey, channel ?? null, identity?.userId ?? null, recipient?.id ?? null, recipient?.channel ?? null]);
  const currentScope = useRef(scopeKey);
  if (currentScope.current !== scopeKey) {
    currentScope.current = scopeKey;
    generation.current += 1;
  }
  const currentControlledDraft = useRef(draftProp);
  currentControlledDraft.current = draftProp;
  const initialDraft = useMemo<string | RichChatDraft | undefined>(() => {
    if (controlled || !persistDraft || !storedDraftKey) return defaultDraft;
    const stored = readStoredDraft(storage(), storedDraftKey);
    return stored ? { html: stored, files: [] } : defaultDraft;
  }, [editorDraftKey, controlled, persistDraft]); // eslint-disable-line react-hooks/exhaustive-deps
  const lastHtml = useRef('');
  const handleDraftChange = useCallback((next: RichChatDraft, previous: RichChatDraft | undefined) => {
    generation.current += 1;
    lastHtml.current = next.html;
    if (persistDraft && !controlled && storedDraftKey) writeStoredDraft(storage(), storedDraftKey, next.html);
    chat?.setTyping?.(typingFor({ html: next.html, mode, recipientChannel: recipient?.channel, channel }));
    onDraftChange?.(next, previous);
  }, [persistDraft, controlled, storedDraftKey, chat, mode, recipient?.channel, channel, onDraftChange]);
  // Leaving Chat, or this channel, ends the typing announcement.
  useEffect(() => {
    if (!typingFor({ html: lastHtml.current, mode, recipientChannel: recipient?.channel, channel })) chat?.setTyping?.(false);
  }, [mode, recipient?.channel, channel]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── uploads ──
  const uploadChannel = mode === 'chat' && capabilities.mayAttach && recipient?.attachments && recipient.channel ? recipient.channel : null;
  const uploadAll = useConversationUploads(rm, uploadChannel, displayName);

  // ── notes ──
  const [note, setNote] = useState<string | null>(null);
  const notifications = useToastOptional();

  // ── the composer handle ──
  const handle = useRef<RichChatComposerHandle | null>(null);
  const setHandle = useCallback((next: RichChatComposerHandle | null) => {
    handle.current = next;
    assignRef(composerRef, next);
  }, [composerRef]);
  const focusSoon = useCallback(() => {
    onReveal?.();
    let frames = 20;
    const attempt = () => {
      if (handle.current) handle.current.focus();
      else if (frames-- > 0) requestAnimationFrame(attempt);
    };
    requestAnimationFrame(attempt);
  }, [onReveal]);

  // ── prompts ── the deck reads the input's emptiness and hands the caret back.
  const deck = useComposerPromptDeck(prompts);
  const dialogueOpen = !!deck.active && !deck.collapsed;
  const wasDialogueOpen = useRef(false);
  useEffect(() => {
    if (dialogueOpen) chat?.setTyping?.(false);
    else if (wasDialogueOpen.current) focusSoon();
    wasDialogueOpen.current = dialogueOpen;
  }, [dialogueOpen, chat, focusSoon]);
  const deckInput = useMemo<ComposerPromptInput>(() => ({
    isEmpty: () => !(handle.current?.editor?.getText().trim()),
    contains: (node: Node | null) => { try { return !!node && !!handle.current?.editor?.view.dom.contains(node); } catch { return false; } },
    focus: focusSoon,
  }), [focusSoon]);

  const choose = useCallback((id: string) => {
    setChosen(id);
    onRecipientChange?.(id);
    generation.current += 1;
    setNote(null);
    recipients.find((r) => r.id === id)?.onSelect?.();
  }, [recipients, onRecipientChange]);

  // ── one input per conversation ──
  const claimable = recipients.filter((r) => r.claim !== false);
  useClaimConversationInput({
    channels: claim ? claimedChannels(capabilities.maySend || recipientsProp === undefined ? channel : null, claimable) : [],
    label: claim ? claim.label : '',
    replies: claim ? !!claim.replies : false,
    enabled: !!claim && claim.enabled !== false,
    focus: (intent) => {
      const target = claimable.find((r) => r.channel === intent.channel);
      changeMode('chat');
      if (target) choose(target.id);
      focusSoon();
      return true;
    },
  });

  const answer = useCallback((request: ComposerFocusRequest): boolean => {
    if (request.mode === 'agent') {
      if (!modeState.modes.includes('agent') || modeState.disabledModes.includes('agent')) return false;
      changeMode('agent');
      focusSoon();
      return true;
    }
    if (!modeState.modes.includes('chat') || modeState.disabledModes.includes('chat')) return false;
    const wanted = request.target;
    const found = !wanted ? recipient
      : wanted.kind === 'discussion' ? recipients.find((r) => r.channel && r.channel === channel) ?? (recipientsProp ? recipients.find((r) => r.id === 'discussion') : recipient)
      : wanted.kind === 'huddle' ? claimable.find((r) => r.id.startsWith('huddle:')) ?? null
      : wanted.kind === 'person' ? recipients.find((r) => r.id === `person:${wanted.userId}`) ?? null
      : recipients.find((r) => r.channel === wanted.channel) ?? null;
    if (!found || found.disabled) return false;
    if (found.id !== recipient?.id) choose(found.id);
    changeMode('chat');
    focusSoon();
    return true;
  }, [modeState, changeMode, focusSoon, recipient, recipients, recipientsProp, claimable, channel, choose]);
  useComposerFocusRequest(answer, answersFocus);

  // ── commands ──
  const offered = useMemo(() => commands.filter((c) => !c.modes || c.modes.includes(mode)), [commands, mode]);
  const composerCommands = useMemo<ComposerCommand[]>(() => offered.map((c) => ({
    trigger: c.trigger, label: c.label,
    ...(c.hint ? { hint: c.hint } : {}), ...(c.description ? { description: c.description } : {}),
    ...(c.icon ? { icon: c.icon } : {}), ...(c.disabled ? { disabled: true } : {}), ...(c.argument ? { argument: c.argument } : {}),
  })), [offered]);

  const settle = (result: ConversationCommandResult): boolean => {
    if (typeof result === 'string') throw new ComposerSendError(result);
    return result !== false;
  };

  // ── send ──
  const send = async (message: ComposedMessage, sentMode: ComposerMode): Promise<boolean> => {
    setNote(null);
    if (deck.typed) {
      // The input is the prompt's answer field: the words answer it, nothing is posted.
      const taken = await deck.answerTyped(message.text);
      if (taken && persistDraft && !controlled && storedDraftKey) writeStoredDraft(storage(), storedDraftKey, '');
      return taken;
    }
    const input = (text: string, trigger: string, argumentText: string): ConversationCommandInput => ({
      trigger, text, argumentText, mode: sentMode, reference: sentReference ?? (withReference ? reference : null),
      recipientId: recipient?.id ?? null, message,
      ...(message.command?.argument ? { argument: { id: message.command.argument.id, label: message.command.argument.label } } : {}),
    });
    if (sentMode === 'agent') {
      if (!capabilities.agent?.allowed || offline) return false;
      const raw = message.text.trim();
      if (!raw) return false;
      const agentCommands = commands.filter((c) => !c.modes || c.modes.includes('agent'));
      // A command the person typed (`/agent supervisor …` included) first; then the
      // words under the router's `/agent ` prefix.
      const typed = typedAgentText(raw);
      const hit = matchConversationCommand(raw, agentCommands) ?? (typed !== raw ? matchConversationCommand(typed, agentCommands) : null);
      if (hit) {
        const text = matchConversationCommand(raw, [hit.command]) ? raw : typed;
        return hit.command.disabled ? false : settle(await hit.command.run(input(text, hit.command.trigger, hit.argumentText)));
      }
      if (!typed) return false;
      if (onAgent) return settle(await onAgent(typed, input(typed, '', typed)));
      const agentCommand = agentCommands.find((c) => c.trigger === '/agent');
      return agentCommand ? settle(await agentCommand.run(input(`/agent ${typed}`, '/agent', typed))) : false;
    }
    // Chat: a typed command runs as itself (not with files: a file-only send is a message).
    if (!message.files.length) {
      const hit = matchConversationCommand(message.text, commands.filter((c) => !c.modes || c.modes.includes('chat')));
      if (hit) {
        if (hit.command.disabled) return false;
        chat?.setTyping?.(false);
        return settle(await hit.command.run(input(message.text.trim(), hit.command.trigger, hit.argumentText)));
      }
    }
    if (!recipient || recipient.disabled || recipient.unavailableReason || offline) return false;
    const text = message.text.trim();
    // A message that is only "this page": the composer's reference, or a chip the host draws.
    const referenceOnly = !text && !message.files.length && !!sendWithReferencesOnly && (!!sentReference || (hostReferences?.length ?? 0) > 0);
    if (!text && !message.files.length && !referenceOnly) return false;
    if (message.files.length && !uploadChannel) return false;
    chat?.setTyping?.(false);
    const started = generation.current;
    const startedScope = currentScope.current;
    const uploaded = message.files.length ? await uploadAll(message.files) : [];
    const toConversation = !!recipient.channel && recipient.channel === channel;
    const metadata = outgoingMetadata({
      displayName,
      reply: toConversation ? reply?.reply ?? null : null,
      reference: sentReference,
      attachments: uploaded,
    });
    const body = text || attachmentOnlyText(uploaded);
    const out: ConversationOutgoing = { text: body, html: message.html, files: message.files, metadata, reference: sentReference };
    let sent: boolean;
    if (recipient.send) sent = await recipient.send(out);
    else if (chat) { chat.sendMessage(body, metadata); sent = true; } else sent = false;
    if (!sent) return false;
    // Keep the editor AND its saved draft together when a newer revision or
    // scope arrived while sending. Clearing storage first loses that newer
    // draft on reload even though RichChatComposer correctly keeps it visible.
    if (generation.current !== started || currentControlledDraft.current !== draftProp) {
      if (currentScope.current === startedScope) notifications?.toast(SENT_KEPT, { type: 'success' });
      return false;
    }
    if (toConversation) reply?.clear();
    if (persistDraft && !controlled && storedDraftKey) writeStoredDraft(storage(), storedDraftKey, '');
    return true;
  };

  // ── rows ──
  const pending = !!capabilities.pending;
  const chatBlocked = mode === 'chat' && (!recipient || !!recipient.unavailableReason || !!recipient.disabled);
  // Read-only (2.450.0): Chat is off for the chosen destination by a verdict —
  // not offline, not the host's own pause, not a server answer still pending.
  // The whole composer then says so, and the draft's chips stay put.
  const readOnlyOn = chatBlocked && !deck.typed && !hostDisabled && !offline && !pending;
  const referenceChip = showReference && reference ? (
    <ComposerReferences
      references={[{ id: reference.id, label: compact ? reference.label.split(' › ').pop() ?? reference.label : reference.label, title: reference.label }]}
      {...(readOnlyOn ? {} : { onRemove: () => { setWithReference(false); generation.current += 1; hostRemoveReference?.(reference.id); } })}
      removeLabel={(ref) => `Remove ${ref.label} from this draft`}
      size="md"
      className="min-w-0 max-w-[max(9rem,min(30rem,calc(100cqw-22rem)))] flex-nowrap p-0"
      data-testid="rich-chat-composer-references"
    />
  ) : null;
  const listed = gone && recipient ? [...recipients, recipient] : recipients;
  const showRecipients = mode === 'chat' && listed.length > 1;
  const noPage = mode === 'chat' && withReference && pageless && offThread && carries;
  const recipientReason = mode === 'chat' && listed.length > 1 && !pending ? recipient?.unavailableReason ?? (!recipient ? 'Choose a destination.' : null) : null;
  const recipientError = mode === 'chat' ? recipient?.error ?? null : null;
  const notices = showRecipients || recipientReason || note || noPage || recipientError || (hostAbove != null && hostAbove !== false) ? (
    <Stack gap="xs">
      {hostAbove}
      {/* One To: row (since 2.446.1): why the chosen destination cannot take
          a message sits beside the selector, after a divider, on one line —
          the full sentence on hover — instead of a second row under it. */}
      {(showRecipients || recipientReason) && (
        <Inline gap="sm" align="center" wrap={false} className="min-w-0" data-composer-recipient-row="">
          {showRecipients && <ComposerRecipientSelect id={`${draftKey}-recipient`} value={recipient?.id ?? null} recipients={listed} onChange={choose} data-testid={`${testId}-recipient`}
            // Read-only (2.479.0): To: is the way out when another destination can
            // take a message (marked so); with none, it offers nothing and is off.
            {...(readOnlyOn ? (choosable > 0 ? { readOnlyWayOut: 'Choose a destination you can post to' } : { disabled: true }) : {})} />}
          {recipientReason && (
            <Text size="xs" tone="tertiary" title={recipientReason}
              className={cn('min-w-0', showRecipients && 'border-0 border-l border-solid border-border pl-2')}
              data-composer-recipient-notice="" data-testid={`${testId}-recipient-unavailable`}>
              <span className="truncate">{recipientReason}</span>
            </Text>
          )}
        </Inline>
      )}
      {noPage && <Text size="xs" tone="tertiary" wrap>{NO_PAGE}</Text>}
      {note && <Text size="xs" tone="secondary" wrap data-testid={`${testId}-note`}>{note}</Text>}
      {recipientError && <Text size="xs" className="text-error" wrap data-testid={`${testId}-recipient-error`}>{recipientError}</Text>}
    </Stack>
  ) : undefined;

  // Pane form: the reference is the leading chip's second half; the full card puts it at the mode row's end.
  const referenceInRow = !compact;
  const modeRowEnd = (referenceInRow && referenceChip) || hostModeRowEnd
    ? <Inline gap="xs" align="center" wrap={false} className="min-w-0">{referenceInRow ? referenceChip : null}{hostModeRowEnd}</Inline>
    : undefined;
  const references = !referenceInRow && showReference && reference
    ? [{ id: reference.id, label: reference.label.split(' › ').pop() ?? reference.label, title: reference.label }, ...(hostReferences ?? [])]
    : hostReferences;
  const removeReference = (id: string) => {
    if (reference && id === reference.id) { setWithReference(false); generation.current += 1; }
    hostRemoveReference?.(id);
  };

  const placeholders: Partial<Record<ComposerMode, string>> = {
    ...hostPlaceholders,
    ...(mode === 'chat' && recipient?.placeholder ? { chat: recipient.placeholder } : {}),
    ...(!deck.collapsed && deck.active && !deck.active.readOnlyReason && deck.active.kind !== 'compose'
      ? { [mode]: deck.typed ? deck.active.placeholder ?? 'Type your answer and press Enter' : 'Choose an answer above, or press its number' }
      : {}),
  };
  // ONE note: when the To: row already carries the reason, the input says
  // only what to do; otherwise the input carries the reason itself.
  const readOnlyNote = readOnlyOn
    ? (recipientReason
      ? (choosable > 0 ? 'Read only. Choose another destination in To: to post.' : 'Read only')
      : recipient?.unavailableReason ?? (recipient ? readOnly : 'Choose a destination.'))
    : null;

  return (
    <ContextComposer
      collapsible
      {...rest}
      collapsedLabel={rest.collapsedLabel ?? (mode === 'chat' ? recipient?.label : context.reference?.label ?? context.title)}
      context={context}
      composerRef={setHandle}
      data-testid={testId}
      {...(compact ? { responsive: 'pane' as const } : {})}
      console={consoleProp ?? !!callBlock}
      dock={callBlock}
      mode={mode}
      onModeChange={changeMode}
      modes={modeState.modes}
      disabledModes={modeState.disabledModes}
      modeUnavailableReasons={modeState.reasons}
      chatAvailable={hasChat && !modeState.reasons.chat}
      contextChip={contextChip ?? (reference ? false : undefined)}
      above={dialogueOpen ? hostAbove : notices}
      {...(dialogueOpen ? { replacement: <ComposerPromptDeck deck={deck} data-testid={`${testId}-prompts`} /> }
        : deck.visible ? { header: <ComposerPromptDeck deck={deck} input={deckInput} variant="inset" data-testid={`${testId}-prompts`} /> } : {})}
      {...(modeRowEnd ? { modeRowEnd } : {})}
      {...(references ? { references, onRemoveReference: removeReference } : {})}
      modePlaceholders={placeholders}
      commands={composerCommands}
      reply={mode === 'chat' && reply?.reply && recipient?.channel === channel ? {
        author: reply.reply.author, quote: reply.reply.text, messageId: reply.reply.messageId,
        ...(reply.reply.timestamp ? { timestamp: reply.reply.timestamp } : {}), onDismiss: reply.clear,
      } : null}
      allowAttachments={!!uploadChannel}
      {...(sendWithReferencesOnly !== undefined ? { sendWithReferencesOnly } : {})}
      {...(readOnlyNote ? { readOnly: readOnlyNote } : {})}
      disabled={!!hostDisabled || (!deck.typed && (!!offline || chatBlocked || (mode === 'agent' && !capabilities.agent?.allowed)))}
      draftKey={editorDraftKey}
      {...(controlled ? { draft: draftProp } : {})}
      {...(initialDraft !== undefined ? { defaultDraft: initialDraft } : {})}
      onDraftChange={handleDraftChange}
      onSend={(message, ctx) => send(message, ctx.mode)}
      className={cn(rest.className)}
    />
  );
}

export { composerDraftOf };
export type {
  ConversationCommandInput,
  ConversationCommandResult,
  ConversationComposerCapabilities,
  ConversationOutgoing,
  ConversationRecipient,
  ConversationReference,
};
