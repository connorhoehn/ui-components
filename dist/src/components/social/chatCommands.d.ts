import { type ComposerArgumentItem, type ComposerCommand } from './composerCommands';
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
    user: {
        id: string;
        displayName: string;
    };
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
    toast?: (message: string, opts?: {
        type?: 'info' | 'success' | 'error';
    }) => void;
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
{
    kind: 'run';
    runId: string;
    pipelineId: string;
    card: Record<string, unknown>;
    echo?: string;
    visibility?: 'shared' | 'private';
}
/** The command opened something beside the conversation, immediately. */
 | {
    kind: 'panel';
    panel: ChatSidePanelRef;
    echo?: string;
}
/** The command's whole result is a message in the thread. */
 | {
    kind: 'message';
    text: string;
    metadata?: Record<string, unknown>;
}
/** The command did its work out of band (a toast, a navigation). */
 | {
    kind: 'none';
};
export type ChatCommandScope = 'always' | 'document-open' | 'room' | 'dm' | ((ctx: ChatCommandScopeContext) => boolean);
export interface ChatCommand extends ComposerCommand {
    /** What sending the command does. Errors propagate to the host, which toasts. */
    run: (ctx: ChatCommandContext) => Promise<ChatCommandOutcome>;
    /** When the command is offered. Default `'always'`. Out of scope, it is listed disabled with a hint that says why. */
    scope?: ChatCommandScope;
    /** Overrides the hint shown while the command is out of scope. */
    disabledHint?: string;
}
/** Room or DM for a channel, from the host's word first and the gateway's prefix second. */
export declare function chatChannelKindOf(ctx: Pick<ChatCommandScopeContext, 'channel' | 'channelKind'>): ChatChannelKind;
/** True when `command` is offered in `ctx`. */
export declare function isChatCommandInScope(command: Pick<ChatCommand, 'scope'>, ctx: ChatCommandScopeContext): boolean;
/** Why a command is disabled right now, in the words the composer's bar shows. */
export declare function chatCommandScopeHint(command: Pick<ChatCommand, 'scope' | 'disabledHint' | 'hint'>): string;
/**
 * The composer's view of the registry: every command, in registry order,
 * with out-of-scope ones disabled and their hint replaced by the reason. The
 * composer never sees `run` or `scope`.
 */
export declare function chatCommandsToComposer(commands: readonly ChatCommand[], ctx: ChatCommandScopeContext): ComposerCommand[];
/** The command a sent draft addresses and its argument, or null when the draft is plain text. */
export declare function parseChatCommand<C extends ComposerCommand = ChatCommand>(text: string, commands: readonly C[] | undefined): {
    command: C;
    argumentText: string;
} | null;
/**
 * Writes `panel` into `search` (an existing query string, or nothing) and
 * returns the new params. `null` closes: it removes `doc`, `panel` and every
 * `panel.*` entry.
 */
export declare function sidePanelToSearch(panel: ChatSidePanelRef | null, search?: string | URLSearchParams): URLSearchParams;
/** Reads the panel a query string names, `doc` first; null when it names none. */
export declare function sidePanelFromSearch(search: string | URLSearchParams | undefined): ChatSidePanelRef | null;
//# sourceMappingURL=chatCommands.d.ts.map