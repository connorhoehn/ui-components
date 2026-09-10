// chatCommands.ts — the registry contract for slash commands in a conversation.
//
// A ComposerCommand (composerCommands.ts) is what the composer needs to OFFER a
// command: trigger, label, argument menu. A ChatCommand is that plus what the
// command DOES when it is sent — `run` — and WHERE it is offered — `scope`.
// The library knows nothing about pipelines, graphs or search indexes: a host
// registers a command whose `run` calls its own route and returns an outcome,
// and the outcome says how the conversation should show it (an agent-run card,
// a side panel, a plain message, nothing).
//
// Deliberately tiptap-free: the `social` barrel re-exports everything here so a
// host can describe and test its commands without pulling the editor in.

import {
  type ComposerArgumentItem,
  type ComposerCommand,
  matchComposerCommand,
  composerCommandArgumentText,
} from './composerCommands';

/**
 * Something open BESIDE the conversation — a document, a search-result graph,
 * a run's trace. `kind` selects a renderer (see ChatSidePanelRegistry); `id`
 * is what that renderer opens. The library reserves `kind: 'document'` for the
 * `?doc=` URL form; every other kind is the host's.
 */
export interface ChatSidePanelRef {
  kind: string;
  id: string;
  /** A first guess at the header; a renderer may replace it once it knows more. */
  title?: string;
  /** Extra state the renderer needs — a query, a tab. Round-trips through the URL. */
  params?: Record<string, string>;
}

export type ChatChannelKind = 'room' | 'dm';

/** What a command sees when it runs, and what a scope sees when it decides. */
export interface ChatCommandContext {
  channel: string;
  /**
   * Room or direct message, when the host knows. Without it, the `room`/`dm`
   * scopes fall back to the gateway's `chat:dm:`/`chat:dmg:` prefixes.
   */
  channelKind?: ChatChannelKind;
  user: { id: string; displayName: string };
  idToken: string | null;
  /** The whole draft as sent, trigger included. */
  text: string;
  /** The text after the trigger, trimmed — the instruction, the query. */
  argumentText: string;
  /** The row picked from the command's argument menu, when there was one. */
  argument?: ComposerArgumentItem;
  sidePanel: {
    current: ChatSidePanelRef | null;
    open: (panel: ChatSidePanelRef) => void;
    close: () => void;
  };
  toast?: (message: string, opts?: { type?: 'info' | 'success' | 'error' }) => void;
  navigate?: (path: string) => void;
}

/** The context a scope decides on: everything but the draft, which does not exist yet. */
export type ChatCommandScopeContext = Omit<ChatCommandContext, 'text' | 'argumentText' | 'argument'>;

export type ChatCommandOutcome =
  /**
   * The command started a pipeline run. The host posts an `agent-run` message
   * whose metadata is `{ kind: 'agent-run', command, instruction, runId,
   * pipelineId, ...card }`, and the thread shows an AgentRunCard for it.
   *
   * `visibility: 'private'` asks the host NOT to post: the card is shown to
   * the person who ran the command alone (ChatPanel's `localMessages`), and
   * they decide whether it goes into the conversation once the run has
   * produced something worth sharing. Default `'shared'`.
   */
  | { kind: 'run'; runId: string; pipelineId: string; card: Record<string, unknown>; echo?: string; visibility?: 'shared' | 'private' }
  /** The command opened something beside the conversation, immediately. */
  | { kind: 'panel'; panel: ChatSidePanelRef; echo?: string }
  /** The command's whole result is a message in the thread. */
  | { kind: 'message'; text: string; metadata?: Record<string, unknown> }
  /** The command did its work out of band (a toast, a navigation). */
  | { kind: 'none' };

export type ChatCommandScope =
  | 'always'
  | 'document-open'
  | 'room'
  | 'dm'
  | ((ctx: ChatCommandScopeContext) => boolean);

export interface ChatCommand extends ComposerCommand {
  /** What sending the command does. Errors propagate to the host, which toasts. */
  run: (ctx: ChatCommandContext) => Promise<ChatCommandOutcome>;
  /** When the command is offered. Default `'always'`. Out of scope, it is listed disabled with a hint that says why. */
  scope?: ChatCommandScope;
  /** Overrides the hint shown while the command is out of scope. */
  disabledHint?: string;
}

const DM_CHANNEL = /^chat:dmg?:/;

/** Room or DM for a channel, from the host's word first and the gateway's prefix second. */
export function chatChannelKindOf(ctx: Pick<ChatCommandScopeContext, 'channel' | 'channelKind'>): ChatChannelKind {
  return ctx.channelKind ?? (DM_CHANNEL.test(ctx.channel) ? 'dm' : 'room');
}

/** True when `command` is offered in `ctx`. */
export function isChatCommandInScope(command: Pick<ChatCommand, 'scope'>, ctx: ChatCommandScopeContext): boolean {
  const scope = command.scope ?? 'always';
  if (typeof scope === 'function') return scope(ctx);
  switch (scope) {
    case 'always': return true;
    case 'document-open': return ctx.sidePanel.current?.kind === 'document';
    case 'room': return chatChannelKindOf(ctx) === 'room';
    case 'dm': return chatChannelKindOf(ctx) === 'dm';
    default: return true;
  }
}

/** Why a command is disabled right now, in the words the composer's bar shows. */
export function chatCommandScopeHint(command: Pick<ChatCommand, 'scope' | 'disabledHint' | 'hint'>): string {
  if (command.disabledHint) return command.disabledHint;
  switch (command.scope) {
    case 'document-open': return 'Open a document beside the chat first';
    case 'room': return 'Only in rooms';
    case 'dm': return 'Only in direct messages';
    default: return command.hint ?? 'Not available here';
  }
}

/**
 * The composer's view of the registry: every command, in registry order,
 * with out-of-scope ones disabled and their hint replaced by the reason. The
 * composer never sees `run` or `scope`.
 */
export function chatCommandsToComposer(commands: readonly ChatCommand[], ctx: ChatCommandScopeContext): ComposerCommand[] {
  return commands.map((command) => {
    const { run, scope, disabledHint, ...composer } = command;
    if (isChatCommandInScope({ scope }, ctx)) return composer;
    return { ...composer, disabled: true, hint: chatCommandScopeHint({ scope, disabledHint, hint: composer.hint }) };
  });
}

/** The command a sent draft addresses and its argument, or null when the draft is plain text. */
export function parseChatCommand<C extends ComposerCommand = ChatCommand>(
  text: string,
  commands: readonly C[] | undefined,
): { command: C; argumentText: string } | null {
  const command = matchComposerCommand(text, commands) as C | null;
  if (!command) return null;
  return { command, argumentText: composerCommandArgumentText(text, command).trim() };
}

// ---------------------------------------------------------------------------
// URL form. `?doc=<id>` predates panels and stays, so links already shared keep
// opening; every other kind is `?panel=<kind>:<id>` plus `panel.<key>=<value>`
// for params. Both helpers leave unrelated params alone.

const DOC_PARAM = 'doc';
const PANEL_PARAM = 'panel';
const PANEL_PARAM_PREFIX = 'panel.';

function toParams(search: string | URLSearchParams | undefined): URLSearchParams {
  return search instanceof URLSearchParams ? new URLSearchParams(search) : new URLSearchParams(search ?? '');
}

function stripPanel(params: URLSearchParams) {
  params.delete(DOC_PARAM);
  params.delete(PANEL_PARAM);
  for (const key of [...params.keys()]) if (key.startsWith(PANEL_PARAM_PREFIX)) params.delete(key);
}

/**
 * Writes `panel` into `search` (an existing query string, or nothing) and
 * returns the new params. `null` closes: it removes `doc`, `panel` and every
 * `panel.*` entry.
 */
export function sidePanelToSearch(panel: ChatSidePanelRef | null, search?: string | URLSearchParams): URLSearchParams {
  const params = toParams(search);
  stripPanel(params);
  if (!panel) return params;
  if (panel.kind === 'document') {
    params.set(DOC_PARAM, panel.id);
  } else {
    if (panel.kind.includes(':')) throw new Error(`A side panel kind cannot contain ':' (got "${panel.kind}")`);
    params.set(PANEL_PARAM, `${panel.kind}:${panel.id}`);
  }
  for (const [key, value] of Object.entries(panel.params ?? {})) params.set(`${PANEL_PARAM_PREFIX}${key}`, value);
  return params;
}

/** Reads the panel a query string names, `doc` first; null when it names none. */
export function sidePanelFromSearch(search: string | URLSearchParams | undefined): ChatSidePanelRef | null {
  const params = toParams(search);
  const extra: Record<string, string> = {};
  for (const [key, value] of params.entries()) if (key.startsWith(PANEL_PARAM_PREFIX)) extra[key.slice(PANEL_PARAM_PREFIX.length)] = value;
  const withParams = (ref: ChatSidePanelRef): ChatSidePanelRef => (Object.keys(extra).length ? { ...ref, params: extra } : ref);
  const doc = params.get(DOC_PARAM);
  if (doc) return withParams({ kind: 'document', id: doc });
  const panel = params.get(PANEL_PARAM);
  if (!panel) return null;
  const at = panel.indexOf(':');
  if (at <= 0 || at === panel.length - 1) return null;
  return withParams({ kind: panel.slice(0, at), id: panel.slice(at + 1) });
}
