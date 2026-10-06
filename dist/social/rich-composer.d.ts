import { Editor } from '@tiptap/core';
import { ForwardRefExoticComponent } from 'react';
import { JSX } from 'react';
import { ReactNode } from 'react';
import { Ref } from 'react';
import { RefAttributes } from 'react';

/**
 * @deprecated Since 2.407.0 — use `ContextComposer` with
 * `context={{ kind: 'initiative' | 'search', id, title }}`. Kept as a preset
 * over it with the same props, look and test ids.
 */
export declare function AgentComposerDock({ presentation, defaultMode, modes, disabledModes: disabledModesProp, modeUnavailableReasons, draftKey, allowAttachments, allowEmoji, label, className, 'data-testid': testId, onSend, ...rest }: AgentComposerDockProps): JSX.Element;

export declare interface AgentComposerDockProps {
    /** `document` (default `compact`): the full editor strip and comfortable density, for a full-width page. */
    presentation?: 'compact' | 'document';
    /** Controlled mode. Pair with `onModeChange`. */
    mode?: ComposerMode;
    /** Uncontrolled starting mode. Default `agent`. */
    defaultMode?: ComposerMode;
    onModeChange?: (mode: ComposerMode) => void;
    /** Agent-mode placeholder (and the fallback for Chat). */
    placeholder?: string;
    /** Per-mode placeholders; win over `placeholder`. */
    modePlaceholders?: Partial<Record<ComposerMode, string>>;
    /** Chips naming what the draft is about ("● Auth Migration"). */
    references?: readonly ComposerReference[];
    /** Makes each chip removable. */
    onRemoveReference?: (id: string) => void;
    /** Slash commands — normally the same workflows as `workflows`. */
    commands?: ComposerCommand[];
    /** The `Workflow ⌄` menu. Absent or empty, no menu. */
    workflows?: readonly AgentComposerWorkflow[];
    /** A workflow was picked. Default: seed the draft with `/<id> ` and remount the editor. */
    onWorkflow?: (id: string) => void;
    /**
     * Which modes this composer offers at all (default all three). A mode left
     * out is ABSENT — no menu row, no shortcut, its trigger is plain text. Use
     * `disabledModes` instead to show a mode with the reason it is off.
     */
    modes?: readonly ComposerMode[];
    /**
     * Shown but unavailable, with `modeUnavailableReasons`. Default
     * `['chat', 'terminal']` — or none when `modes` is given (the host named
     * what it serves; `modes={['terminal']}` alone is a working Terminal).
     */
    disabledModes?: readonly ComposerMode[];
    /** Merged over the defaults for Chat and Terminal. */
    modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
    /**
     * Pinned to the composer's top edge, full width of the composer card — the
     * in-call shelf (`CallDock`). Placed like `ChatPanel.dock`: `shrink-0`, flush
     * on the composer. Absent (or `false`), nothing is drawn. Test id
     * `<data-testid>-dock-slot`.
     */
    dock?: ReactNode;
    /** Controlled draft. Pair with `onDraftChange`. */
    draft?: RichChatDraft;
    onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
    /** Uncontrolled prefill, as text or a draft. Re-read when `draftKey` changes. */
    defaultDraft?: string | RichChatDraft;
    /** The subject the draft belongs to. Changing it starts the draft (and the editor) over. */
    draftKey?: string;
    /** Receives what was typed (see the file note). Return `false` to keep the draft. */
    onSend: (message: ComposedMessage, context: AgentComposerSendContext) => boolean | Promise<boolean>;
    /** Resolves the `#` menu. */
    onSearchDocuments?: RichChatComposerProps['onSearchDocuments'];
    /** Draws the `#` menu as an "Add context" card. */
    documentMenu?: RichChatComposerProps['documentMenu'];
    /** Resolves the `@` menu. */
    onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
    /** Default true. Files arrive on send, in `message.files`. */
    allowAttachments?: boolean;
    allowEmoji?: boolean;
    disabled?: boolean;
    /** An agent is mid-turn. */
    working?: boolean;
    status?: ComposerStatus | null;
    hints?: readonly ComposerHint[];
    suggestions?: readonly string[];
    onSuggestion?: (suggestion: string) => void;
    /** Send's label, per mode or for all. */
    submitLabel?: RichChatComposerProps['submitLabel'];
    maxInputHeight?: number | string;
    /** The live composer — its `editor` for docref bookkeeping, `focus`, `insertText`. */
    composerRef?: Ref<RichChatComposerHandle>;
    /** Accessible name of the dock region. Default "Agent composer". */
    label?: string;
    /** Accessible name of the editor (the textbox) inside it. Default "Message". */
    inputLabel?: string;
    /** On the dock. */
    className?: string;
    /** The dock's test id. Default `agent-composer-dock`. */
    'data-testid'?: string;
    /** The composer's own test id (its parts derive from it). Default `rich-chat-composer`. */
    composerTestId?: string;
}

export declare interface AgentComposerSendContext {
    /** The mode the message was composed in. */
    mode: ComposerMode;
}

/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export declare interface AgentComposerWorkflow {
    /** Seeds the draft as `/<id> ` by default — match a `commands` trigger. */
    id: string;
    label: string;
    /** Second line of the row. */
    description?: string;
    disabled?: boolean;
    /** Second line and tooltip of a disabled row. */
    disabledReason?: string;
}

/** Where an agent task is. Shared by `TaskStrip` and `AgentTaskCard`. */
declare type AgentTaskStatus = 'queued' | 'running' | 'paused' | 'awaiting' | 'done' | 'failed' | 'stopped';

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
declare type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';

/** One row. Both a command and a command's argument fit this shape. */
export declare interface CommandSuggestionItem {
    /** Stable key. For a command, its trigger. */
    id: string;
    /** The typed token, rendered in mono — `/doc`. */
    code?: string;
    /** A glyph rendered where the token would be, for argument rows. */
    icon?: string;
    label: string;
    /** A second clause on the right: what it needs, or where it lives. */
    hint?: string;
    /** The long form, shown under the list for the highlighted row only. */
    description?: string;
    /**
     * A command row whose command takes an argument (2.407.2). Enter on it
     * always accepts it, even when the draft is exactly its trigger — see the
     * note at the top.
     */
    takesArgument?: boolean;
}

export declare const CommandSuggestions: ForwardRefExoticComponent<CommandSuggestionsProps & RefAttributes<CommandSuggestionsHandle>>;

export declare interface CommandSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface CommandSuggestionsProps {
    items: CommandSuggestionItem[];
    command: (item: CommandSuggestionItem) => void;
    /** The listbox's accessible name. */
    label?: string;
    /**
     * The whole draft, for the command menu only. When it equals the
     * highlighted row's `code` exactly, Enter is not a pick — see the note at
     * the top.
     */
    draft?: string;
    /**
     * `fit`: as wide as the rows need (11–20rem) instead of a fixed 26rem — for a
     * compact composer in a narrow column (a margin comment card), where a fixed
     * menu is wider than the card it opens from.
     */
    width?: 'fixed' | 'fit';
}

/** What the composer hands back on send. */
export declare interface ComposedMessage {
    /** Rich body. Empty when only files were attached. */
    html: string;
    /** Plain-text fallback, for clients and notifications that cannot render HTML. */
    text: string;
    /** Everyone the sender explicitly mentioned, de-duplicated, in document order. */
    mentions: MentionCandidate[];
    /** Files staged in the composer, sent WITH the message. */
    files: File[];
    /** Every document the sender referenced with `#`, de-duplicated, in document order. Absent when there are none. */
    documents?: Array<{
        id: string;
        label: string;
    }>;
    /**
     * Set when the draft starts with a known command trigger. `argument` is the
     * item picked from the argument menu, present only when the pick was made
     * in THIS draft and its label is still in the text — an edited-away label
     * means the person changed their mind, and the host should read `text`.
     */
    command?: {
        trigger: string;
        argument?: ComposerArgumentItem;
    };
    /**
     * Who can see this message. Mirrors the `privacy` prop at send time, so a
     * host with no opinion on the feature still gets `'visible'` rather than an
     * absent field.
     */
    privacy: 'visible' | 'hidden';
    /**
     * Which mode composed this. Present only while a host has wired
     * `onModeChange` — like `RichChatDraft.privacy`, a host that never adopts
     * the feature never sees the key. `'agent'` also rewrites `text` to
     * `/agent <what was typed>`, so the host's existing `/agent` command path
     * handles it with no second code path.
     */
    mode?: ComposerMode;
}

/**
 * Width thresholds, in CSS px of the composer's own box (not the window's):
 * below `narrow` it is narrow, below `wide` it is medium, else wide.
 *
 * - wide (≥ 600): the full toolbar and the hint row. 600, not less: a
 *   560px dock (a diagram's) drew a wrapped placeholder over the hint row.
 * - medium (380–599): hints fold into a `?` menu; strikethrough, code, lists
 *   and quote fold into a `⋯` overflow menu.
 * - narrow (< 380): input and Send share ONE row; the toolbar sits behind an
 *   `Aa` toggle; the mode switch is the compact `1 2 3` pill.
 */
export declare const COMPOSER_BREAKPOINTS: {
    readonly narrow: 380;
    readonly wide: 600;
};

export declare const COMPOSER_CONTEXT_KINDS: readonly ComposerContextKind[];

export declare const COMPOSER_CONTEXT_REASONS: {
    readonly terminal: "Attach an agent loop to use the terminal here";
    readonly noThread: "This view has no discussion thread — ask the agent instead";
    readonly diagramAgent: "The agent cannot edit diagrams yet — describe the change in Chat";
};

/** The order Option-1/2/3 and the compact `1 2 3` buttons follow. */
export declare const COMPOSER_MODE_ORDER: readonly ComposerMode[];

export declare interface ComposerArgumentItem {
    /** Stable identity — this is what travels to the host, not the label. */
    id: string;
    label: string;
    /** Shown on the right of the row: where it lives, who owns it. */
    hint?: string;
    /** A glyph for the row, e.g. `📄`. */
    icon?: string;
}

export declare function ComposerAttachments({ files, onRemove, disabled, className, 'data-testid': testId, }: ComposerAttachmentsProps): JSX.Element | null;

export declare interface ComposerAttachmentsProps {
    files: readonly StagedFile[];
    onRemove: (id: string) => void;
    disabled?: boolean;
    className?: string;
    'data-testid'?: string;
}

export declare interface ComposerCommand {
    /** The leading token, e.g. `/doc`. Matched case-insensitively at the start of the draft. */
    trigger: string;
    /** What it does — "Edit the open document with Haiku". */
    label: string;
    /** A second clause: what it needs, or what will happen. */
    hint?: string;
    /** True when the command cannot run right now (no document open); the bar says why via `hint`. */
    disabled?: boolean;
    /** The long form, shown as a tooltip on the bar: what will happen, step by step. */
    description?: string;
    /**
     * A glyph before the trigger in the docked card's command chip
     * (`modeControl="menu"`) — a branch mark for `/workflow`. Since 2.385.0.
     */
    icon?: ReactNode;
    /** What the command acts on, offered as a second menu once the trigger is typed. */
    argument?: ComposerCommandArgument;
}

export declare interface ComposerCommandArgument {
    /** Shown in the status bar while the argument is empty — "type a document name". */
    placeholder?: string;
    /**
     * Resolves the argument menu from the text after the trigger. A promise is
     * supported (and debounced ~120ms) so a host can hit an index rather than
     * filter a preloaded array; the previous list stays up while a new one is
     * in flight.
     */
    search: (query: string) => ComposerArgumentItem[] | Promise<ComposerArgumentItem[]>;
    /**
     * What picking a row does. `'execute'` clears the draft and calls
     * `onCommand` — the pick WAS the message. `'insert'` (the default) writes the
     * label into the draft so the person can keep typing, and the pick travels
     * on send as `ComposedMessage.command.argument`.
     */
    onPick?: (item: ComposerArgumentItem) => 'execute' | 'insert';
}

/**
 * The text after a matched command's trigger and its one separator:
 * `/doc Roadmap` → `Roadmap`, `/doc` → ``. Leading whitespace beyond the
 * separator is kept, so callers replacing the argument know its exact extent.
 */
export declare function composerCommandArgumentText(draft: string, command: ComposerCommand): string;

/** What the composer is attached to. */
export declare type ComposerContext = {
    kind: 'conversation';
    id: string;
    title: string; /** A one-to-one DM. */
    dm?: boolean;
} | {
    kind: 'document' | 'work-item' | 'diagram';
    id: string;
    title: string;
} | {
    kind: 'initiative' | 'search';
    id: string;
    title: string;
};

/** Which optional rows and controls a context allows. */
export declare interface ComposerContextFeatures {
    /** The context chip ("● Roadmap") at the card's row end. */
    contextChip: boolean;
    /** The `Workflow ⌄` menu (and the workflow command). */
    workflows: boolean;
    /**
     * The command a workflow pick writes: `/workflow <label>` with the pick as
     * the command's argument. `null`: the pick writes `/<id> ` (a command per
     * workflow, the initiative/search convention).
     */
    workflowCommand: string | null;
    /** Page actions under `Agent ⌄` — "Make a deck" and the host's `moreActions`. */
    pageActions: boolean;
    /** Send options (the split Send) and "Share a document". */
    sendOptions: boolean;
    /** A reply quote above the row. */
    reply: boolean;
    /** The task strip joined to the composer's top edge. */
    taskStrip: boolean;
    /** The "you are offline" notice. */
    offline: boolean;
    /** The "the model is unreachable" notice. */
    modelUnavailable: boolean;
    /** `chat-only`: attachments only while composing a Chat message. */
    attachments: 'always' | 'chat-only';
    emoji: boolean;
    mentions: boolean;
    /**
     * `onSend` receives what was TYPED (Agent mode's `/agent ` prefix removed,
     * the command re-matched). `false`: the chat router's form, `/agent …`,
     * which a conversation's command registry routes.
     */
    typedText: boolean;
}

export declare type ComposerContextKind = ComposerContext['kind'];

export declare interface ComposerContextPreset {
    kind: ComposerContextKind;
    /** The modes offered here at all. */
    modes: readonly ComposerMode[];
    /** Where a fresh composer starts. */
    defaultMode: ComposerMode;
    /** Offered but off, with `modeUnavailableReasons`. */
    disabledModes: readonly ComposerMode[];
    modeUnavailableReasons: Partial<Record<ComposerMode, string>>;
    modePlaceholders: Partial<Record<ComposerMode, string>>;
    /** The context chip's label, or null for none. */
    chipLabel: string | null;
    /** Accessible name of the composer region. */
    regionLabel: string;
    features: ComposerContextFeatures;
}

/**
 * The preset for a context: its modes, reasons, placeholders, chip and the
 * rows it allows. Pure — the same context always gives the same preset.
 */
export declare function composerContextPreset(context: ComposerContext, wiring?: ComposerContextWiring): ComposerContextPreset;

/** What the preset needs to know about the host's wiring. */
export declare interface ComposerContextWiring {
    /** A terminal is attached (`onShellCommand`). Without one, Terminal is off with a reason. */
    terminal?: boolean;
    /** Chat has somewhere to go. Default true except for `initiative`/`search`. */
    chat?: boolean;
    /** The agent is unavailable here — Agent is shown off with this reason. */
    agentUnavailableReason?: string;
}

/** One paragraph holding `text` (newlines become `<br>`); `''` is an empty draft. */
export declare function composerDraftOf(text: string): RichChatDraft;

/** One key and what it does, for the row under the editor. */
export declare interface ComposerHint {
    /** The key itself, rendered monospace — `/`, `>_`, `⌘K`. */
    key: string;
    label: string;
    /** Wired, the hint is a button rather than a label. */
    onSelect?: () => void;
}

/** Identity claims a composer may read a name from (an ID token, a BFF session). */
export declare interface ComposerIdentity {
    displayName?: string | null;
    given_name?: string | null;
    family_name?: string | null;
    name?: string | null;
    email?: string | null;
}

/** What the composer is for, right now. */
export declare type ComposerMode = 'chat' | 'agent' | 'terminal';

/**
 * Something already running that this composer's owner started.
 *
 * A one-line status strip above the editor, because the question "is the thing
 * I asked for still going?" is asked WHILE typing the next thing — a person who
 * has to leave the composer to answer it has already lost the sentence.
 */
export declare interface ComposerProcess {
    id: string;
    label: string;
    tone: 'running' | 'idle' | 'failed' | 'done';
}

export declare type ComposerRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export declare interface ComposerReference {
    /** Stable across re-renders; what `onRemove` is called with. */
    id: string;
    /** Already composed by the host — "Sprint review · v2 · Slide 4". */
    label: string;
    /** The referenced thing's own glyph, when it has one. */
    icon?: string;
    /** Hover text; the label itself when absent. */
    title?: string;
    /**
     * Makes the chip a menu trigger — label + chevron — that opens these
     * choices ("This guide", "This guide + sources", "No context"). A chip with
     * a menu draws NO remove button even when `onRemove` is passed: choosing
     * "none" is one of the menu's items, not an ×. Since 2.389.0.
     */
    menu?: readonly DropdownMenuSection[];
    /** Accessible name of the menu trigger. Default: the label. Since 2.389.0. */
    menuLabel?: string;
    /**
     * The chip's leading mark when it has no `icon`. `icon` (default): the
     * document glyph. `dot`: a small brand-coloured dot — "● Observability
     * Platform", "● This work item": the draft is about a scope, not a file.
     * Ignored when `icon` is set. Since 2.390.0.
     */
    marker?: 'icon' | 'dot';
}

export declare function ComposerReferences({ references, onRemove, removeLabel, className, size, 'data-testid': testId, }: ComposerReferencesProps): JSX.Element | null;

export declare interface ComposerReferencesProps {
    references: readonly ComposerReference[];
    /** Omit to render the chips without a remove control. */
    onRemove?: (id: string) => void;
    /** Accessible name for a chip's remove button. */
    removeLabel?: (reference: ComposerReference) => string;
    className?: string;
    /** Chip type. `xs` (default) is the 11px chip of a chat composer; `sm` is the 12px chip of a docked editor card (2.377.0). */
    size?: 'xs' | 'sm' | 'md';
    'data-testid'?: string;
}

/** The message being replied to — drawn as a `QuoteBlock` above the row. */
export declare interface ComposerReply {
    author: string;
    /** Plain text of the original (excerpted for display). */
    quote: string;
    messageId?: string;
    /** ISO timestamp of the original. */
    timestamp?: string;
    onDismiss?: () => void;
    onJump?: (messageId: string) => void;
}

/** Reject `onSend` with this to show `message` in the composer's alert. */
export declare class ComposerSendError extends Error {
    constructor(message: string, options?: {
        cause?: unknown;
    });
}

/**
 * The person-facing reason carried by a rejected send, or null for the
 * generic alert. Matched by `name`, not `instanceof`: a host and the library
 * can load two copies of this module (a lazy chunk, a linked package), and a
 * reason must survive that.
 */
export declare function composerSendErrorReason(error: unknown): string | null;

/** An alternative way to send, offered from the Send button's own menu. */
export declare interface ComposerSendOption {
    id: string;
    label: string;
}

/** How much room the composer has, from its own width. */
export declare type ComposerSize = 'wide' | 'medium' | 'narrow';

/** `null` — not measured yet — is wide: a first paint that hides controls and then shows them is worse than one frame of overflow. */
export declare function composerSizeFor(width: number | null): ComposerSize;

/**
 * One line of news about the last thing this composer did — "Revised slide 2",
 * "v15 is the agent's edit" — with at most one action (Undo). It sits in the
 * composer's own status row, so a host has no banner stacked above the dock.
 */
export declare interface ComposerStatus {
    text: string;
    tone?: 'info' | 'success' | 'warning' | 'danger';
    /** The one thing to do about it. A button at the end of the line. */
    action?: {
        label: string;
        onSelect: () => void;
        'data-testid'?: string;
    };
    /** Wired, the line has a × that calls it. */
    onDismiss?: () => void;
    'data-testid'?: string;
}

/** A task in flight, drawn as the `TaskStrip` joined to the composer. */
export declare interface ComposerTaskReport {
    label: string;
    status: AgentTaskStatus;
    phase?: string;
    percent?: number;
    onOpen?: () => void;
    onStop?: () => void;
    onDismiss?: () => void;
}

/** See `RichChatComposerProps.toolbar`. */
export declare type ComposerToolbarPreset = 'full' | 'compact' | 'editor' | 'prompt' | 'basic';

/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export declare interface ComposerWorkflow {
    /** The pick's identity: `/<id> ` or the `/workflow` argument's id. */
    id: string;
    label: string;
    /** Second line of the row. */
    description?: string;
    disabled?: boolean;
    /** Second line and tooltip of a disabled row. */
    disabledReason?: string;
}

export declare function ContextComposer(props: ContextComposerProps): JSX.Element;

export declare interface ContextComposerProps {
    /** What the composer is attached to. Decides modes, chip, and which features may render. */
    context: ComposerContext;
    /** `document`: comfortable density, for a full-width page. Default `compact`. */
    presentation?: 'compact' | 'document';
    /** Controlled mode. Pair with `onModeChange`. */
    mode?: ComposerMode;
    /** Uncontrolled starting mode. Default: the context's. */
    defaultMode?: ComposerMode;
    onModeChange?: (mode: ComposerMode) => void;
    /** Which modes exist here. Default: the context's (a conversation: Chat, Agent). */
    modes?: readonly ComposerMode[];
    /** Shown but off. Default: the context's (Terminal until `onShellCommand`, a diagram's Agent). */
    disabledModes?: readonly ComposerMode[];
    /** Merged over the context's reasons. */
    modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
    /** The agent is unavailable here: Agent is shown off with this reason. */
    agentUnavailableReason?: string;
    /** Chat has somewhere to go. `false`: Chat is shown off with a reason. */
    chatAvailable?: boolean;
    /** Agent-mode placeholder. */
    placeholder?: string;
    /** Per-mode placeholders, over the context's. */
    modePlaceholders?: Partial<Record<ComposerMode, string>>;
    modeHints?: RichChatComposerProps['modeHints'];
    hints?: readonly ComposerHint[];
    submitLabel?: RichChatComposerProps['submitLabel'];
    /** The context chip. `false` hides it; a string relabels it. Default: the context's. */
    contextChip?: boolean | string;
    /** Makes the context chip removable. */
    onRemoveContext?: () => void;
    /** More chips (work references, a comment hand-off). */
    references?: readonly ComposerReference[];
    onRemoveReference?: (id: string) => void;
    commands?: ComposerCommand[];
    /** An argument pick that IS the message (`onPick → 'execute'`). */
    onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
    /** The `Workflow ⌄` menu. Allowed in every context but a conversation. */
    workflows?: readonly ComposerWorkflow[];
    /** A workflow was picked. Default: write it into the draft. */
    onWorkflow?: (id: string) => void;
    /** Send's label while the draft holds the workflow command. Default "Prepare run". */
    workflowSubmitLabel?: string;
    onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
    mentionMembers?: ReadonlySet<string>;
    onMentionNonMember?: (userId: string) => void;
    onSearchDocuments?: RichChatComposerProps['onSearchDocuments'];
    documentMenu?: RichChatComposerProps['documentMenu'];
    /** Default true (Chat mode only in a document-like context). */
    allowAttachments?: boolean;
    /** Default true. */
    allowEmoji?: boolean;
    onRequestLink?: RichChatComposerProps['onRequestLink'];
    /**
     * Who will see the message: `visible` (default) or `hidden` (only you — a
     * private question). Controlled; the toggle appears on the strip only when
     * `onPrivacyChange` is passed, and the sent message carries `privacy`.
     */
    privacy?: RichChatComposerProps['privacy'];
    /** Turns the privacy toggle on. Apply the value back through `privacy`. */
    onPrivacyChange?: RichChatComposerProps['onPrivacyChange'];
    /** The toggle's two labels. Default "Visible to everyone" / "Only you". */
    privacyLabels?: RichChatComposerProps['privacyLabels'];
    sendOptions?: readonly ComposerSendOption[];
    onSendOption?: (id: string) => void;
    /** "Share a document" on the strip. Receives the button, to anchor a picker. */
    onShareDocument?: (anchor: HTMLElement) => void;
    shareDocumentTestId?: string;
    /** Offline / held-messages notice, above the row. */
    offline?: string | null;
    /** "Make a deck from this page", under `Agent ⌄`. */
    onMakeDeck?: () => void;
    makeDeckLabel?: string;
    makeDeckTestId?: string;
    /** More page actions under `Agent ⌄`. */
    moreActions?: readonly DropdownMenuSection[];
    moreActionsLabel?: string;
    /** The call shelf, flush on the composer's top edge. Test id `<data-testid>-dock-slot`. */
    dock?: ReactNode;
    /** Notices above the row (an error banner). Forces the full card. */
    above?: ReactNode;
    /** A strip joined to the composer's top edge. Forces the full card. Wins over `task`. */
    strip?: ReactNode;
    /** A task in flight, as the `TaskStrip`. */
    task?: ComposerTaskReport | null;
    /** The message being replied to. Forces the full card. */
    reply?: ComposerReply | null;
    /** Rendered instead of the composer (a comment reply field), rows kept. */
    replacement?: ReactNode;
    /** The model is unreachable: a warning above the row. */
    modelUnavailable?: string | null;
    /** Controls on the strip after the built-in ones. */
    toolbarExtras?: ReactNode;
    /**
     * Beside Send, before it — a select that says what Send will do ("Draft
     * only ⌄"). Hidden on the idle row. Since 2.407.11.
     */
    submitLead?: ReactNode;
    /** At the end of the card's mode row — a scope switch ("This slide · Whole deck"). Hidden on the idle row. Since 2.407.11. */
    modeRowEnd?: ReactNode;
    /** At the START of the card's mode row, and on the idle row — a "Chat" label or the host's own mode select. Forwarded to `RichChatComposer`. Since 2.413.0. */
    modeRowStart?: ReactNode;
    /**
     * Send acts on an empty draft that has references (a message that is only
     * "this page"). The context chip counts as a reference. Forwarded to
     * `RichChatComposer`. Since 2.413.0.
     */
    sendWithReferencesOnly?: boolean;
    /** After the chips in the card's mode row — an "add another" control (a document picker). Hidden on the idle row. Since 2.407.11. */
    referencesAction?: ReactNode;
    /**
     * Makes the card a drop target for a host payload (not files) — dragged
     * documents joining the draft's chips. Works on the idle row too. Since 2.407.11.
     */
    referenceDrop?: RichChatComposerProps['referenceDrop'];
    processes?: readonly ComposerProcess[];
    onQuickOpen?: () => void;
    /** Where a Terminal line goes. Passing it turns Terminal on where the context offers it. */
    onShellCommand?: (command: string) => void;
    draft?: RichChatDraft;
    onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
    defaultDraft?: string | RichChatDraft;
    /** The subject the draft belongs to. Default: the context's kind and id. */
    draftKey?: string;
    /** Return `false` to keep the draft. */
    onSend: (message: ComposedMessage, context: ContextComposerSendContext) => void | boolean | Promise<void | boolean>;
    /** Who is writing — `author` in the send context. */
    identity?: ComposerIdentity | null;
    /** Force the full card. */
    expanded?: boolean;
    /** An agent is mid-turn: the console drifts faster. */
    working?: boolean;
    /** Default true: Agent/Terminal paint the console surface. */
    console?: boolean;
    disabled?: boolean;
    status?: ComposerStatus | null;
    suggestions?: readonly string[];
    onSuggestion?: (suggestion: string) => void;
    maxInputHeight?: number | string;
    composerRef?: Ref<RichChatComposerHandle>;
    /** Accessible name of the region. Default: the context's. */
    label?: string;
    inputLabel?: string;
    className?: string;
    /** Default `context-composer`. */
    'data-testid'?: string;
    /** The composer's own test id. Default `rich-chat-composer`. */
    composerTestId?: string;
}

export declare interface ContextComposerSendContext {
    /** The mode the message was composed in. */
    mode: ComposerMode;
    /** What the composer is attached to. */
    context: ComposerContext;
    /** The sender's name from `identity` (displayName first). */
    author?: string;
}

export declare interface DocumentCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    /** The document's title. */
    label: string;
    /** Shown under the title, e.g. the folder or who last edited it. */
    hint?: string;
    /** The document's own icon, when it has one; 📄 otherwise. */
    icon?: string;
    /** A drawn glyph for the row (wins over `icon`) — a person for a subject mask. Since 2.390.0. */
    glyph?: ReactNode;
    /**
     * The heading this row sits under in the `panel` menu ("MASKS IN THIS
     * PHOTO"). Consecutive rows with the same group share one heading; order is
     * the host's. Ignored by the plain menu. Since 2.390.0.
     */
    group?: string;
}

/** The "Add context" card form of the `#` menu (RichChatComposer `documentMenu`). */
declare interface DocumentMenuPanel {
    /** The card's title. Default "Add context". */
    title?: string;
    /** Said when nothing matches. Default "Nothing matches". */
    emptyLabel?: string;
}

export declare const DocumentSuggestions: ForwardRefExoticComponent<DocumentSuggestionsProps & RefAttributes<DocumentSuggestionsHandle>>;

export declare interface DocumentSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface DocumentSuggestionsProps {
    items: DocumentCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
    /** What was typed after `#` (the suggestion plugin passes it). */
    query?: string;
    /** Clears the typed query, leaving the `#` (the panel's ⓧ). */
    onClearQuery?: () => void;
    /** Draw as the "Add context" card. */
    panel?: DocumentMenuPanel;
}

declare interface DropdownMenuItem {
    /** Visible item label. */
    label: string;
    /** Optional leading icon / glyph. */
    icon?: ReactNode;
    /** Highlight this item as the currently-active selection. */
    active?: boolean;
    /** Style this item as destructive. */
    danger?: boolean;
    /** Fires on click / Enter; the menu closes afterwards. Not needed on a row with a `submenu`. */
    onSelect?: () => void;
    /** Right-aligned hint after the label — a shortcut (`⌘P`), a count. */
    trailing?: ReactNode;
    /** A second, quieter line under the label. */
    description?: string;
    /** A setting that is on: a check leads the row (menuitemcheckbox). */
    checked?: boolean;
    /**
     * A flyout of further choices, opened from this row — "Share to ›",
     * "Download as ›". Opens on hover, click or ArrowRight; the row itself
     * runs no `onSelect`.
     */
    submenu?: DropdownMenuSection[];
    /**
     * Shown but not actionable: muted, `aria-disabled="true"` yet still
     * focusable (WAI-ARIA menu practice, so a screen reader can reach it and
     * hear why), and click / Enter / Space never run `onSelect` — the menu
     * stays open. A disabled row with a `submenu` does not open it. Since 2.390.3.
     */
    disabled?: boolean;
    /**
     * Why it is disabled — shown as the row's secondary line (in place of
     * `description`), its hover tooltip, and its `aria-describedby`.
     * Since 2.390.3; the visible line since 2.390.4.
     */
    disabledReason?: string;
    /** A hook for the spec that addresses this row. Without one the row is reachable by its label. */
    'data-testid'?: string;
}

declare interface DropdownMenuSection {
    /** Optional uppercase section heading. */
    label?: string;
    items: DropdownMenuItem[];
    /**
     * The group scrolls in place (`uic-menu-group-scroll`) so the sections
     * after it stay put. For a generated list — one row per room — that would
     * otherwise push the fixed actions below the fold.
     */
    scroll?: boolean;
    /**
     * A quiet line under the group's rows — what the group does as a whole
     * ("Creates a new document."). Since 2.390.3.
     */
    caption?: string;
    'data-testid'?: string;
}

export declare const EMOJI_SHORTCODES: readonly EmojiShortcode[];

export declare interface EmojiShortcode {
    /** The code typed between colons, without them. */
    code: string;
    emoji: string;
    /** Extra search terms, so `:party:` finds 🎉 even though its code is `tada`. */
    keywords?: readonly string[];
}

export declare const EmojiSuggestions: ForwardRefExoticComponent<EmojiSuggestionsProps & RefAttributes<EmojiSuggestionsHandle>>;

export declare interface EmojiSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface EmojiSuggestionsProps {
    items: EmojiShortcode[];
    command: (item: {
        emoji: string;
    }) => void;
}

/**
 * The local participant's name from identity claims: `displayName` first
 * (aws-agentcore's BFF tokens), then `given_name` + `family_name` (Cognito,
 * and the gateway's `SKIP_AUTH` bypass), then `name`, then the email's local
 * part. `undefined` when none of them says anything.
 */
export declare function identityDisplayName(identity: ComposerIdentity | null | undefined): string | undefined;

/** The command a draft is addressing, or null. `/doc`, `/doc …`, never `/document`. */
export declare function matchComposerCommand(draft: string, commands: readonly ComposerCommand[] | undefined): ComposerCommand | null;

/**
 * Whether a whole draft is a mode trigger. A prefix followed by a space
 * always counts (`/run `, `> `); a single-symbol prefix also counts alone,
 * because `> ` never reaches here — the editor's blockquote input rule eats
 * `> ` and leaves an empty quote. A word prefix does NOT count alone:
 * `/run` must be allowed to become `/running`.
 */
export declare function matchesModeTrigger(text: string, prefix: string): boolean;

export declare interface MentionCandidate {
    /** Stable identity — this is what travels in the message, not the label. */
    id: string;
    label: string;
    avatarUrl?: string;
    color?: string;
    /** Shown under the name, e.g. a role or team. */
    hint?: string;
    /**
     * False when the composer knows the chat's members and this person is not
     * one: the row lists under "Not in this chat" and picking it offers to add
     * them rather than mentioning someone who could not read the message.
     */
    member?: boolean;
}

export declare const MentionSuggestions: ForwardRefExoticComponent<MentionSuggestionsProps & RefAttributes<MentionSuggestionsHandle>>;

export declare interface MentionSuggestionsHandle {
    onKeyDown: (props: {
        event: KeyboardEvent;
    }) => boolean;
}

export declare interface MentionSuggestionsProps {
    items: MentionCandidate[];
    command: (item: {
        id: string;
        label: string;
    }) => void;
    /** Picked a non-member: no mention is inserted; the host opens its add flow. */
    onPickNonMember?: (userId: string) => void;
}

export declare const RichChatComposer: ForwardRefExoticComponent<RichChatComposerProps & RefAttributes<RichChatComposerHandle>>;

/** What a host can do to the composer from outside — focus it, prefill it. */
export declare interface RichChatComposerHandle {
    /** The live tiptap editor, or null before mount. */
    readonly editor: Editor | null;
    focus: () => void;
    /** Inserts plain text at the caret, as if typed. */
    insertText: (text: string) => void;
}

export declare interface RichChatComposerProps {
    /**
     * Resolve after accepting the send. Reject or return false to retain the
     * draft. A rejection shows an alert above the composer; reject with a
     * `ComposerSendError` to put its message there ("Upload failed: HTTP 500")
     * instead of the generic "Unable to send".
     */
    onSend: (message: ComposedMessage) => void | boolean | Promise<void | boolean>;
    /** Optional controlled draft; key the composer by conversation. */
    draft?: RichChatDraft;
    /**
     * `previous` is the exact previous draft object. A host retaining drafts
     * across unmounts should compare it before applying a delayed send clear.
     */
    onDraftChange?: (draft: RichChatDraft, previous: RichChatDraft | undefined) => void;
    /**
     * Called when a command argument is picked with `onPick` → `'execute'`. The
     * draft has already been cleared; nothing goes through `onSend`.
     */
    onCommand?: (command: ComposerCommand, argument: ComposerArgumentItem) => void;
    /**
     * Resolves the @ menu. A promise is supported so a host can hit a directory
     * rather than filter a preloaded array. Omit to disable mentions entirely.
     */
    onSearchPeople?: (query: string) => MentionCandidate[] | Promise<MentionCandidate[]>;
    /**
     * Who is in this conversation. Given, the @ menu lists anyone
     * `onSearchPeople` returns who is NOT in it under "Not in this chat", and
     * picking them calls `onMentionNonMember` instead of inserting a mention —
     * a mention of someone who cannot read the message is a message to nobody.
     * Read live, like `onSearchPeople`.
     */
    mentionMembers?: ReadonlySet<string>;
    /** The host's add-to-chat flow, opened for the person picked under "Not in this chat". */
    onMentionNonMember?: (userId: string) => void;
    /**
     * Resolves the `#` menu — the documents a message can refer to. Omit to
     * disable document references entirely. Read live, like `onSearchPeople`:
     * a new function identity does not rebuild the editor.
     */
    onSearchDocuments?: (query: string) => DocumentCandidate[] | Promise<DocumentCandidate[]>;
    /**
     * Enables attachments. False means this deployment has no file capability and
     * every attachment affordance disappears — not a disabled paperclip, which
     * promises something the product cannot do.
     *
     * Files arrive on SEND, in `ComposedMessage.files`, not on drop.
     */
    allowAttachments?: boolean;
    /** Turns the emoji picker on. */
    allowEmoji?: boolean;
    /**
     * Asks the host for a URL when the link button is pressed, receiving the
     * selected text so it can prefill. Returning nothing cancels.
     *
     * A callback rather than a built-in prompt: `window.prompt` is blocked in
     * some embeddings and unstyleable in all of them, and a library that opens
     * one has decided what the host's dialogs look like.
     */
    onRequestLink?: (selectedText: string) => string | null | undefined;
    placeholder?: string;
    /**
     * Accessible name of the editor — `aria-label` on the contenteditable, which
     * is always `role="textbox"` + `aria-multiline="true"`. The placeholder is
     * not a name (it vanishes once text is typed), so a host whose page has
     * more than one textbox should set this. Since 2.403.1.
     */
    inputLabel?: string;
    disabled?: boolean;
    /**
     * Slash commands the host understands. While the draft starts with one, the
     * composer says so — a bar naming the command above the text and a
     * different border — so a person typing `/doc rename…` knows before Send
     * that this is an instruction to an agent, not a message to the room.
     */
    commands?: ComposerCommand[];
    /**
     * Controlled per-message visibility. Defaults to `'visible'`. Passing
     * `onPrivacyChange` is what turns the feature on at all — see there.
     */
    privacy?: 'visible' | 'hidden';
    /**
     * Renders an eye / eye-off toggle in the toolbar, beside the attach and
     * document controls, and is called when it is pressed with the OTHER
     * state — the composer does not hold its own privacy state, so nothing
     * changes on screen until the host applies it back through `privacy`.
     *
     * Omitting this prop is the whole opt-in: no toggle, no hint row, no
     * `privacy` key on the published `RichChatDraft`. `ComposedMessage.privacy`
     * still reports `'visible'` on send either way, so a host that adopts the
     * field later does not have to touch every existing message.
     */
    onPrivacyChange?: (next: 'visible' | 'hidden') => void;
    /**
     * Tooltip/accessible-name text for each state. Defaults to
     * "Visible to everyone" / "Only you".
     */
    privacyLabels?: {
        visible: string;
        hidden: string;
    };
    /**
     * What this draft points at — a slide in a deck, a line in a transcript —
     * as a full-width row of chips above the editor.
     *
     * These are display labels the HOST resolved from what this viewer may see;
     * the composer neither resolves nor sends them. The reference itself belongs
     * in the message metadata the host attaches on send.
     *
     * They were previously passed through `toolbarExtras`, which is a strip of
     * icon-sized controls: a chip reading "Sprint review · v2 · Slide 4" either
     * truncated there or pushed Send out of the composer.
     */
    references?: readonly ComposerReference[];
    /** Makes each chip removable. Called with the reference's `id`. */
    onRemoveReference?: (id: string) => void;
    /** Rendered between the formatting controls and the send button. */
    toolbarExtras?: ReactNode;
    /**
     * Which formatting controls the strip shows at wide width.
     *
     * - `full` (default): B, I, S, code, link, bulleted, numbered, quote — the
     *   chat column's strip, unchanged.
     * - `compact`: B, I, link, bulleted list, attach (when attachments are on),
     *   no separators — the editor's docked card. Strikethrough, code, numbered
     *   list and quote move into the `?` menu under "Formatting" (the same menu
     *   the card already keeps its keyboard hints in), not a second `⋯` button
     *   beside the first: an editor already has a full toolbar above the page
     *   and the card's strip is the four things a prompt actually uses.
     *
     * - `editor` (2.385.6): the document page's docked card as the mockup draws
     *   it — B, I, code, link, bulleted list, quote, attach, then a divider
     *   before `toolbarExtras` (the host's `Workflow ▾`). Strikethrough and
     *   numbered list go under `?` → Formatting, as in `compact`.
     *
     * - `basic` (2.390.0): the docked card as a light prompt box — B, I, code,
     *   link, attach, then the divider before `toolbarExtras`. No lists and no
     *   quote on the strip (a prompt is a sentence, not a document); bulleted
     *   and numbered lists, quote and strikethrough go under the card's mode
     *   menu → Formatting. Docks like `editor` under `modeControl="menu"`, with
     *   the mode as a boxed picker ("Agent ⌄", no glyph), the input in its own
     *   bordered well and no rule over the strip — the Initiatives mockup.
     *
     * Sizes are unchanged in all of them: every control is the same 28px box.
     * Below wide the strip folds exactly as before, whichever preset is set.
     */
    toolbar?: ComposerToolbarPreset;
    /**
     * A `⋯` menu at the right of the toolbar row, before `submitLead` and Send —
     * for actions on the THING the composer is attached to ("Draft a
     * presentation from this page") rather than on the message. Lets a host
     * keep those off the strip instead of spending a labelled `submitLead` on
     * them. Absent or empty, nothing renders.
     */
    moreActions?: readonly DropdownMenuSection[];
    /** The `⋯` trigger's accessible name and title. Default "More actions". */
    moreActionsLabel?: string;
    /**
     * Long-running work this composer's owner started — a generating deck, a
     * terminal test run. Rendered as one status line above the editor, hidden
     * when the array is empty. Display only: the host owns what each one is and
     * what opening it does.
     */
    processes?: readonly ComposerProcess[];
    /**
     * Controlled mode. Defaults to `'chat'`. Passing `onModeChange` is what
     * turns the feature on at all — see there.
     */
    mode?: ComposerMode;
    /**
     * Renders the `Chat | Agent | Terminal` switch above the editor and is
     * called with the mode pressed. The composer holds no mode state of its own,
     * so nothing changes until the host applies it back through `mode`.
     *
     * Omitting this prop is the whole opt-in: no switch, no hints row, no `mode`
     * key on the published message. Every existing host renders exactly the
     * composer it rendered before.
     */
    onModeChange?: (mode: ComposerMode) => void;
    /**
     * Pins the composer to one mode with no switch. The surface is that mode's
     * (Agent and Terminal wear the console backdrop, the mode's placeholder
     * applies, and the published message carries `mode`), but there are no
     * `Chat | Agent | Terminal` tabs and no default hints row — for a surface
     * whose composer only ever talks to one thing, like the presentation
     * editor's agent box. The text is sent as typed: the `/agent` prefix that
     * the switchable Agent mode adds is for the chat's command router, and a
     * pinned composer's host is not one.
     */
    fixedMode?: ComposerMode;
    /**
     * Placeholder per mode. `chat` falls back to `placeholder`; the other two
     * have defaults that say what Enter will do, which is the thing that changes.
     */
    modePlaceholders?: Partial<Record<ComposerMode, string>>;
    /**
     * The keys worth knowing, under the editor. Defaults to `/` for commands,
     * `>_` for shell and `⌘K` to quickly open whenever the mode switch or
     * `onQuickOpen` is wired; absent all three, no row is rendered at all.
     */
    hints?: readonly ComposerHint[];
    /** Backs the default `⌘K` hint. Without it that hint is a label, not a button. */
    onQuickOpen?: () => void;
    /**
     * Other ways to send, offered from a caret beside Send — "Send as agent
     * task", "Run in shell". Send itself keeps doing what it always did.
     */
    sendOptions?: readonly ComposerSendOption[];
    /** Called with the chosen option's id. The composer does not clear the draft. */
    onSendOption?: (id: string) => void;
    /**
     * Where a line typed in terminal mode goes. Without it the prompt still
     * renders and still keeps its history, but Enter does nothing — which is
     * the honest state for a deployment with no shell behind the composer.
     */
    onShellCommand?: (command: string) => void;
    /**
     * How the mode switch is drawn. `'tabs'` (default) is the segmented
     * `Chat | Agent | Terminal` row every existing host has. `'compact'` is the
     * mode's name, three small numbered buttons (`1 2 3`) and the current
     * mode's `⌥n` — one short row, for a composer floating over a page.
     * `'menu'` (2.377.0) is the mode's glyph and name as ONE dropdown (`Agent ▾`)
     * with the current `⌥n` beside it and the other modes, their shortcuts and
     * any reason they are off inside the menu; the draft's references sit at
     * the row's end — the shape of an editor's docked composer.
     */
    modeControl?: 'tabs' | 'compact' | 'menu';
    /**
     * Option-1 / Option-2 / Option-3 (Alt on other platforms) switch to Chat /
     * Agent / Terminal while focus is anywhere inside the composer. Bound on
     * the composer root, not the window: with focus outside it, nothing
     * happens. Needs `onModeChange`. Default false.
     */
    modeShortcuts?: boolean;
    /**
     * Typing a prefix as the whole draft switches mode and consumes it: `>`
     * (alone) → Terminal, `/run ` (with its space) → Agent. `true` uses those
     * defaults; an object overrides either prefix. Needs `onModeChange`.
     * Default off.
     */
    modeTriggers?: boolean | {
        terminalPrefix?: string;
        agentPrefix?: string;
    };
    /**
     * Modes the host cannot serve right now — Terminal when no run is
     * attached. Their buttons are disabled, and a shortcut or trigger aimed at
     * one leaves the mode (and the typed prefix) alone and shows the reason
     * from `modeUnavailableReasons` instead.
     */
    disabledModes?: readonly ComposerMode[];
    /**
     * Which modes this composer offers at all, in the library's order
     * (Chat, Agent, Terminal). Defaults to all three. A mode left out is not
     * drawn disabled — it is absent: no tab, no menu row, no numbered button,
     * no `>_ for shell` hint, and its trigger prefix stays ordinary text. A
     * chat conversation passes `['chat', 'agent']`, since a shell line has
     * nowhere to go from a DM or a channel. Shortcuts number the offered modes
     * (`⌥1`, `⌥2`). A controlled `mode` that is not offered renders as the
     * first offered mode. Since 2.390.1.
     */
    modes?: readonly ComposerMode[];
    /** Why each disabled mode is unavailable — "Start an agent task first". */
    modeUnavailableReasons?: Partial<Record<ComposerMode, string>>;
    /** Per-mode hint rows. Wins over `hints` for the modes it names. */
    modeHints?: Partial<Record<ComposerMode, readonly ComposerHint[]>>;
    /**
     * Beside Send, before it — a model or skill picker ("Presentation skill ⌄").
     * Absent, the toolbar row is exactly as before.
     */
    submitLead?: ReactNode;
    /**
     * Send's label, per mode or for all of them. Defaults: "Send", and "Run"
     * in Terminal.
     */
    submitLabel?: string | Partial<Record<ComposerMode, string>>;
    /**
     * Corner radius. Unset, the composer is rounded by its OWN default (12px),
     * never by the host's `--radius-*` tokens — a host with square corners still
     * gets a finished composer. A `--composer-radius` on any ancestor overrides
     * the default; this prop overrides both.
     */
    radius?: ComposerRadius;
    /**
     * What Agent and Terminal paint behind the composer. `auto` (default) is
     * graphite on a light theme and night on a dark one, read from the nearest
     * `data-backdrop-tone` / `data-theme` ancestor, else `prefers-color-scheme`.
     * `none` keeps the ordinary surface in every mode.
     */
    backdropTone?: BackdropTone;
    /**
     * True while an agent is mid-turn: the console sky gets denser, brighter and
     * a little quicker — the same cue `ChatColumnBackdrop`'s `working` gives a
     * whole column, for a composer that stands alone (an editor's dock). Unset,
     * it follows an enclosing `ChatColumnBackdrop`. Inside one, the composer
     * paints no field of its own (the column's shows through), so this only
     * changes anything for a standalone composer. Reduced motion still parks
     * the field; the particle budget stays bounded by the box's area.
     */
    working?: boolean;
    /**
     * The tallest the input grows before it scrolls inside itself: pixels, or
     * any CSS length. Default `min(14rem, 40dvh)`.
     */
    maxInputHeight?: number | string;
    /**
     * The layout, when the host knows better than a measurement (stories, a
     * fixed-width dock). Default `auto`: the composer measures its OWN width and
     * picks `wide` / `medium` / `narrow` — see `COMPOSER_BREAKPOINTS`.
     */
    layout?: 'auto' | ComposerSize;
    /**
     * `compact` spends the fewest rows on chrome, for a dock pinned under a
     * canvas that needs the height (a slide stage): references share the mode
     * row, the hints row folds into the `?` menu at every width, and the
     * padding tightens. Default `comfortable`.
     */
    density?: 'comfortable' | 'compact';
    /** One status line above the input (see `ComposerStatus`). Replaces a host banner. */
    status?: ComposerStatus | null;
    /**
     * One-tap instructions. Wide, they show as a chip row only while the input
     * is EMPTY and FOCUSED — a prompt for a blank box, gone once you type or
     * look away. Medium and narrow, they live in the `?` menu. Picking one calls
     * `onSuggestion`; the composer does not send anything itself.
     */
    suggestions?: readonly string[];
    onSuggestion?: (suggestion: string) => void;
    /** At the end of the compact mode row — a scope switch, a count. */
    modeRowEnd?: ReactNode;
    /**
     * The docked card (`modeControl="menu"` + `toolbar="editor"`) with no mode
     * switch: the header row is the references alone, left-aligned, then
     * `referencesAction` — a page whose composer only ever does one thing
     * (the All documents page, 2.389.x). The mode menu's extra sections go
     * with it, so pass none.
     */
    hideModeMenu?: boolean;
    /**
     * With exactly one offered mode, name it as a static label instead of a
     * one-item switch: the mode's glyph and name where the pill or `Mode ⌄` sits,
     * no chevron, no menu, no `⌥1` badge — a call chat reads "Chat". Keeps the
     * `<testId>-mode-pill` test id and adds `data-single-mode="true"`. With the
     * docked card, `moreActions` move to the strip's `⋯`. Default false (the
     * one-item menu). `ContextComposer` sets it. Since 2.407.2.
     */
    singleModeLabel?: boolean;
    /** After the references in the docked header row — an "add another" control. Shown even with no references. */
    referencesAction?: ReactNode;
    /**
     * Where the references sit in the menu mode row. `end` (default): at the
     * row's end, the way an editor's dock reads. `start`: right after the mode
     * menu — "Agent ⌄ · ● Observability Platform ×", the draft's subject read
     * as the continuation of its mode. Since 2.390.0.
     */
    referencesPlacement?: 'end' | 'start';
    /**
     * Makes the whole card a drop target for a host's own payload (not files):
     * while a drag carrying one of `types` is over it, the card is ringed and
     * says `hint`; a drop calls `onDrop` with the DataTransfer. File drops keep
     * going to the attachment zone.
     */
    referenceDrop?: {
        types: readonly string[];
        onDrop: (dataTransfer: DataTransfer) => void;
        hint?: string;
    };
    /**
     * One row while idle: with the input EMPTY and the caret elsewhere (and no
     * status, process, attachment, command or notice to show), the composer is
     * a compact mode pill, any references, the input and Send on a single line.
     * References stay visible in that row — they are part of the draft. The
     * toolbar, status line and mode row come back the moment the input takes
     * focus or holds content. For a dock pinned under a canvas that needs the
     * height (a slide stage); the dock stays pinned and grows upward. The idle
     * row is plain (`bg-surface`) even in Agent/Terminal: the console sky comes
     * with the caret, unless an enclosing console column is already painting
     * one, in which case the row keeps that tint. Default off.
     */
    collapseWhenIdle?: boolean;
    /**
     * With `collapseWhenIdle`: `true` forces the full card whatever the idle
     * rule says — for host content the composer cannot see (a reply quote, a
     * comment hand-off, a task strip above it), which would otherwise sit over
     * a one-line row. `false`/absent is the idle rule unchanged. No effect
     * without `collapseWhenIdle`. Since 2.407.0.
     */
    expanded?: boolean;
    /**
     * Draws the `#` menu as an "Add context" card: a title, the typed query in
     * a search field with a clear button, results grouped under each
     * candidate's `group`, and the keys (↑↓ Choose · ↵ Insert · esc Close) at
     * its foot. Needs `onSearchDocuments`. Since 2.390.0.
     */
    documentMenu?: DocumentMenuPanel;
    /**
     * At the START of the docked card's header row, before the references — a
     * host's own mode select ("Assistant ▾") when `hideModeMenu` hides the
     * composer's. Since 2.390.0.
     */
    modeRowStart?: ReactNode;
    /**
     * Let Send act while the input is empty if the draft has `references` the
     * host will send with it (a message that is only "this page"). Default
     * false: an empty draft with a reference chip stays unsendable.
     */
    sendWithReferencesOnly?: boolean;
    /**
     * Which key sends. `enter` (default): Enter sends, Shift+Enter is a
     * newline — the chat convention. `mod-enter`: ⌘/Ctrl+Enter sends and Enter
     * is a newline — for a prompt that is written, not chatted. Since 2.390.0.
     */
    sendShortcut?: 'enter' | 'mod-enter';
    /**
     * The prompt card's command when the draft names none (`/adjust`): its chip
     * shows from the start, and the host treats a draft with no command as this
     * one. Switching from the chip writes the new trigger into the draft.
     * Since 2.389.12.
     */
    defaultCommand?: string;
    className?: string;
    'data-testid'?: string;
}

/** In-memory draft. Hosts must keep File objects out of persistent storage. */
export declare interface RichChatDraft {
    html: string;
    files: File[];
    command?: ComposedMessage['command'];
    /**
     * The `privacy` prop as of the last publish, present only while a host has
     * wired `onPrivacyChange` — a host that never adopts the toggle never sees
     * this key on its draft. Ride-along storage, like `command`: the composer
     * does not read it back to set its own state, since `privacy` is already a
     * controlled prop; a host restoring a conversation reads `draft.privacy`
     * itself and passes it back in as `privacy`.
     */
    privacy?: 'visible' | 'hidden';
}

/**
 * Ranks shortcodes for a query.
 *
 * Prefix matches on the CODE come first: someone typing `:fi` means `fire`,
 * not `crossed_fingers` — a plain substring search buries the obvious answer
 * under coincidental matches, which is the difference between autocomplete
 * that feels instant and autocomplete you have to read.
 */
export declare function searchEmoji(query: string, list?: readonly EmojiShortcode[], limit?: number): EmojiShortcode[];

export declare interface StagedFile {
    /** Stable id for keying and removal — the File object itself is not a key. */
    id: string;
    file: File;
}

export { }


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        diagramMacro: {
            /**
             * Inserts a diagram block at the selection, minting an id unless one
             * is supplied.
             */
            insertDiagram: (id?: string) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasLineSpacing: {
            /**
             * Space the paragraphs in the selection.
             *
             * `'1'` UNSETS rather than storing `1`, so a paragraph returned to single
             * spacing carries no inline style at all and follows the paper — the same
             * rule the font picker's "Default" and the alignment's unset follow, and
             * the reason an untouched document stays untouched.
             */
            setLineSpacing: (spacing: LineSpacing) => ReturnType;
            /** Return the paragraphs in the selection to the paper's own leading. */
            unsetLineSpacing: () => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        canvasListStyle: {
            /**
             * Make the caret's block a list of the style's kind (if it is not one
             * already) and set its marker.
             */
            setListStyle: (style: ListStyle) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        actionItemsMacro: {
            /** Inserts an action-items block at the selection. */
            insertActionItems: (texts?: readonly string[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        hitlMacro: {
            /** Inserts an agent -> human callout at the selection. */
            insertHitl: (draft: HitlDraft) => ReturnType;
            /**
             * Records an answer that was given SOMEWHERE ELSE — the mirror row,
             * answered from an inbox by somebody who never opened this page.
             *
             * The same one-range edit answering in the page makes, addressed by
             * the callout's `id` instead of by a node view. Returns false when
             * no callout carries that id, when the body is not one
             * `answerHitlEdit` will write to, and — deliberately — when the
             * body ALREADY carries an answer: see `HITL_CONVERGENCE`.
             */
            answerHitl: (params: {
                id: string;
                answer: string;
                answeredBy?: string;
                answeredAt?: string;
            }) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        linksMacro: {
            /** Inserts a links block at the selection. */
            insertLinks: (rows?: readonly {
                label?: string;
                url?: string;
            }[]) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
        };
    }
}


declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        suggestChanges: {
            /** Turn suggestion mode on or off. */
            setSuggestionMode: (enabled: boolean) => ReturnType;
            /** Flip suggestion mode. */
            toggleSuggestionMode: () => ReturnType;
            /** Accept one suggestion: keep its insertions, remove its deletions. */
            acceptSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Reject one suggestion: drop its insertions, restore its deletions. */
            rejectSuggestion: (id: SuggestionIdentity) => ReturnType;
            /** Accept every suggestion in the document. */
            acceptAllSuggestions: () => ReturnType;
            /** Reject every suggestion in the document. */
            rejectAllSuggestions: () => ReturnType;
            /** Move the selection onto a suggestion. */
            selectSuggestion: (id: SuggestionIdentity) => ReturnType;
        };
    }
}


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
    }
}
