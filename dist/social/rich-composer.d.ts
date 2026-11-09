import { Context } from 'react';
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

/** The answer an option stands for, per the prompt's kind. */
export declare function answerForOption(prompt: ComposerPrompt, option: ComposerPromptOption): ComposerPromptAnswer;

/** Message text for a send whose body is empty: the names of what was shared. */
export declare function attachmentOnlyText(attachments: readonly ChatAttachmentDescriptor[]): string;

/** What a console surface paints behind itself. `none` keeps the ordinary surface. */
declare type BackdropTone = 'auto' | 'night' | 'graphite' | 'none';

/** One uploaded file as it rides in `metadata.attachments` (no preview: chat metadata is size-capped). */
export declare interface ChatAttachmentDescriptor {
    id: string;
    name: string;
    size: number;
    contentType: string;
    url: string;
    width?: number;
    height?: number;
}

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

export declare function ComposerConfirmFlow({ title, recipient, defaultMessage, message: messageProp, onMessageChange, messageLabel, placeholder, reviewTitle, note, doneTitle, doneMessage, continueLabel, confirmLabel, backLabel, doneActionLabel, onConfirm, onCancel, onDone, onStageChange, path, autoFocus, className, 'data-testid': testId, }: ComposerConfirmFlowProps): JSX.Element;

export declare interface ComposerConfirmFlowProps {
    /** The draft's heading ("Request more budget"). Omit when the frame around the flow already names it. */
    title?: string;
    /** "To Sienna Garcia · ORG-OBS-11", shown beside the heading in every stage. */
    recipient?: string;
    /** Uncontrolled: the prefilled message. */
    defaultMessage?: string;
    /** Controlled: the message and its change handler (a host that keeps the draft across its own view switches). */
    message?: string;
    onMessageChange?: (message: string) => void;
    /** The editor's label. Default "Message". */
    messageLabel?: string;
    placeholder?: string;
    /** The review stage's heading ("Confirm budget request"). Default: `title`. */
    reviewTitle?: string;
    /** A small line under the review ("Nothing is sent until you confirm."). */
    note?: ReactNode;
    /** The done stage's heading. Default "Done". */
    doneTitle?: string;
    /** The done stage's status line when `onConfirm` gives no receipt. Default "Confirmed." */
    doneMessage?: string;
    /** Button labels. Defaults: Continue / Confirm / Back / Back. */
    continueLabel?: string;
    confirmLabel?: string;
    backLabel?: string;
    doneActionLabel?: string;
    /** Called with the message as edited. Done shows only after this resolves without an error. */
    onConfirm: (message: string) => ComposerConfirmResult | Promise<ComposerConfirmResult>;
    /** Back from the draft. Without it the draft offers no Back. */
    onCancel?: () => void;
    /** The done stage's action. Without it the done stage offers none. */
    onDone?: () => void;
    onStageChange?: (stage: ComposerConfirmStage) => void;
    /**
     * The decision path above the flow, `current` at the drafting step; review
     * and done advance it by one and two.
     */
    path?: DecisionPathState;
    /** Focus the editor on mount. Default true: the flow replaces the choices that were just answered. */
    autoFocus?: boolean;
    className?: string;
    'data-testid'?: string;
}

/**
 * What `onConfirm` resolves to. Nothing or `{ receipt }`: confirmed — the done
 * stage shows (the receipt as its status line). `{ error }`: not confirmed —
 * the error shows inline and the flow stays on review with the message intact.
 */
export declare type ComposerConfirmResult = void | undefined | {
    error: string;
} | {
    receipt: string;
};

export declare type ComposerConfirmStage = 'draft' | 'review' | 'done';

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

export declare interface ComposerFocusRequest {
    mode: 'chat' | 'agent';
    target?: ComposerFocusTarget;
}

/** What a focus request addresses. `discussion` is the page's own thread. */
export declare type ComposerFocusTarget = {
    kind: 'huddle';
} | {
    kind: 'discussion';
} | {
    kind: 'person';
    userId: string;
} | {
    kind: 'channel';
    channel: string;
};

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

export declare type ComposerPresentation = 'card' | 'prompt';

export declare const ComposerPresentationContext: Context<ComposerPresentation | null>;

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

export declare interface ComposerPrompt {
    /** Stable while the question is the same; a new id is a new question (re-asked prompts take a new id). */
    id: string;
    title: string;
    /** A line above the title ("Prepare job", "Approval", "Agent question"). */
    eyebrow?: string;
    /**
     * The context that asked this question (a page, section or record key such
     * as `assets/artwork`). A deck given a `scope` drops prompts scoped to any
     * other context, so a question raised on one page never follows the user to
     * the next. Unscoped prompts show everywhere. Since 2.504.0.
     */
    scope?: string;
    /** The prepopulated header card. */
    fields?: readonly ComposerPromptField[];
    question: string;
    kind: ComposerPromptKind;
    /**
     * Choice: required. Confirm: default `Confirm` (1) / `Cancel` (2). Text /
     * number: optional quick answers beside the typed one.
     */
    options?: readonly ComposerPromptOption[];
    /** What Enter on an empty input picks. Confirm defaults to its first option. */
    defaultOptionId?: string;
    /** Text / number: the input's placeholder while this prompt is on screen. Choice / confirm under the quiet prompt box (2.512.0), where the input stays: its placeholder there. */
    placeholder?: string;
    /** Number: bounds a typed answer must sit inside. */
    min?: number;
    max?: number;
    /**
     * Optional host-owned draft for the deck's text / number input (no external
     * input bridge). The host may persist it by question identity across mounts.
     * The host also clears it after an accepted answer; refused answers and late
     * acknowledgments never clear another question's draft. Does not control a
     * compose prompt's separate message flow.
     *
     * Under `presentation="prompt"` (`ConversationComposer`, since 2.513.0) the
     * card's answer field IS the composer's own text box, and this binds it:
     * whenever the open card changes (its `id`), the text box is seeded from
     * `value` (the caret at its end; `''` empties it), and every edit there
     * calls `onChange(text)` with the box's plain text — so a "Use as typed"
     * option can enable once something is typed, and a "Refine" card reopens
     * with the saved words. Enter still answers the card as before. Changing
     * `value` while the same card stays open does not rewrite the box. Under any other
     * composer presentation it still drives only the deck's own input.
     */
    inputDraft?: {
        value: string;
        onChange: (value: string) => void;
    };
    /** Shown on the card instead of answers: the reader may look but not decide. */
    readOnlyReason?: string;
    /**
     * Where the card's keypad listens (since 2.515.2). `deck` (default): its
     * keys act only while focus is in the deck or the composer's input. `page`:
     * while this card is open (shown, not collapsed), an option key (1–9, or
     * the option's own key) pressed with focus anywhere on the page outside an
     * editable field (input, textarea, select, contenteditable) and outside
     * another dialog, menu or listbox also picks that option, exactly as it
     * would in the deck — so a reader who clicked the record beside the
     * composer still decides from the keypad. Only picks: Enter, Esc, Back and
     * paging stay the deck's (`pageKeypadTarget`). A page holds at most one
     * such card open at a time.
     */
    keypad?: 'deck' | 'page';
    /**
     * The decision path drawn above the card's header (2.482.0): `Choose →
     * Draft request → Confirm → Done` with `current` at this question's step.
     * On a compose prompt `current` is the drafting step; the flow advances it
     * through review (+1) and done (+2) itself.
     */
    path?: DecisionPathState;
    /** Compose: the message flow's wording and prefilled text. */
    compose?: ComposerPromptCompose;
    /**
     * Back in the card header (2.510.0), on a one-prompt deck too. A follow-up
     * reached through `{ next }` without its own `back` gets one that returns
     * to the question it followed (`deck.back()`) — except a compose follow-up,
     * whose flow already draws that Back. A rejected `onBack` shows its message
     * on the card like a refused answer.
     */
    back?: ComposerPromptBack;
    /**
     * Choice / confirm (2.512.0): words typed in the composer's input under
     * this card are a direction, not a message — "make her taller" under a
     * Generate confirm re-proposes. The deck hands the trimmed text here when
     * the input is not empty and Enter is pressed (the composer's send).
     * `{ error }` shows on the card; `{ next }` takes the card in place like an
     * answer's follow-up; `{ receipt }` is announced; nothing keeps the card on
     * screen — the host re-proposes by replacing this prompt in its queue (a
     * new id). Without it the input's placeholder says what the card takes and
     * Enter on an empty input picks the default option, as before.
     */
    onDirection?: (text: string) => ComposerPromptResult | Promise<ComposerPromptResult>;
    onAnswer: (answer: ComposerPromptAnswer) => ComposerPromptResult | Promise<ComposerPromptResult>;
}

export declare type ComposerPromptAnswer = {
    kind: 'choice';
    optionId: string;
} | {
    kind: 'confirm';
    optionId: string;
    confirmed: boolean;
} | {
    kind: 'text';
    text: string;
    optionId?: undefined;
} | {
    kind: 'number';
    value: number;
    optionId?: undefined;
}
/** A text / number prompt answered with one of its quick options instead of typing. */
| {
    kind: 'option';
    optionId: string;
}
/** A compose prompt confirmed with its (edited) message. Since 2.482.0. */
| {
    kind: 'compose';
    message: string;
    optionId?: undefined;
};

/**
 * A Back control on a prompt's card (since 2.510.0): the step before this
 * question in the host's own flow (a wizard's previous question, the choice
 * that opened a plan). Rendered in the card header whenever present, single
 * prompt or not. Answers nothing: `onBack` decides what comes back.
 */
export declare interface ComposerPromptBack {
    /** Default "Back". */
    label?: string;
    onBack: () => void | Promise<void>;
    /** Off, with why (the button's title). */
    disabledReason?: string;
}

/**
 * A compose prompt's message flow (2.482.0): a prefilled, editable message
 * reviewed and confirmed inside the same card. Every label is the host's
 * wording; see `ComposerConfirmFlow` for the defaults.
 */
export declare interface ComposerPromptCompose {
    /** The prefilled message the person edits. */
    initialMessage?: string;
    /** "To Sienna Garcia · ORG-OBS-11", shown beside the title in every stage. */
    recipient?: string;
    /** The editor's label (default "Message") and placeholder. */
    messageLabel?: string;
    placeholder?: string;
    /** A heading for the review stage ("Confirm budget request"); default none (the card's title stands). */
    reviewTitle?: string;
    /** The done stage's heading (default "Done") and its status line when `onAnswer` gives no receipt (default "Confirmed."). */
    doneTitle?: string;
    doneMessage?: string;
    /** Button labels: Continue / Confirm / Back / the done stage's action (default "Back"). */
    continueLabel?: string;
    confirmLabel?: string;
    backLabel?: string;
    doneActionLabel?: string;
    /** A small line under the review ("Nothing is sent until you confirm."). */
    note?: ReactNode;
    /**
     * Back from the draft of a ROOT compose prompt (one that is not a `{ next }`
     * follow-up): the deck drops the prompt and calls this. A follow-up's Back
     * returns to the question it followed and never calls it. Without it a root
     * prompt's draft has no Back.
     */
    onCancel?: () => void;
}

export declare function ComposerPromptDeck({ deck: deckProp, prompts, scope, input, variant, presentation: presentationProp, className, 'data-testid': testId }: ComposerPromptDeckProps): JSX.Element | null;

/** The deck's state over the host's queue. Hosts that render the deck themselves call this once. */
export declare interface ComposerPromptDeckOptions {
    /**
     * The current context key (2.504.0). Prompts whose own `scope` differs are
     * dropped, and changing the scope resets the deck — the open card, a
     * collapsed state, the last receipt and errors — so navigating to another
     * context never leaves the previous one's card on screen.
     */
    scope?: string | null;
}

export declare interface ComposerPromptDeckProps {
    /** From `useComposerPromptDeck`; or pass `prompts` and the deck keeps its own state. */
    deck?: ComposerPromptDeckState;
    prompts?: readonly ComposerPrompt[];
    /** With `prompts`: the current context key; see `ComposerPromptDeckOptions.scope`. Since 2.504.0. */
    scope?: string | null;
    /** External answer input, when embedded above an existing editor. Without one, text/number prompts own a plain answer field; choices own focus. */
    input?: ComposerPromptInput | null;
    /**
     * `card` (default): a bordered card of its own, for a composer's `above`.
     * `inset`: the composer card's first section (`ConversationComposer
     * prompts`, `RichChatComposer header`) — no border of its own, a hairline
     * under it, the input below it in the same card. Since 2.446.0.
     */
    variant?: 'card' | 'inset';
    /**
     * `card` (default): numbered keycaps on the answers and a key-hint row.
     * `prompt` (2.512.0): plain Buttons and no hint row (the keys still work),
     * facts one per line clamped to one line. Defaults to the enclosing
     * composer's presentation (`ComposerPresentationContext`), else `card`.
     * `data-presentation` on the deck root.
     */
    presentation?: ComposerPresentation;
    className?: string;
    'data-testid'?: string;
}

export declare interface ComposerPromptDeckState {
    /** Prompts still waiting, in the host's order. */
    pending: readonly ComposerPrompt[];
    /** The prompt on screen. */
    active: ComposerPrompt | null;
    /** Its 0-based position in `pending`. */
    index: number;
    collapsed: boolean;
    /** An answer is being taken. */
    busy: boolean;
    /** The refusal on the active prompt, if its last answer was refused. */
    error: string | null;
    /** The last answered prompt's receipt. */
    receipt: string | null;
    /** Something to draw: a waiting prompt or a receipt. */
    visible: boolean;
    /** The composer's input is the active prompt's answer field. */
    typed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    page: (delta: 1 | -1) => void;
    pick: (optionId: string) => Promise<boolean>;
    /** Answer the active text / number prompt with typed words. True when taken. */
    answerTyped: (raw: string) => Promise<boolean>;
    /** The open card takes typed words as a direction (`ComposerPrompt.onDirection`). Since 2.512.0. */
    direction: boolean;
    /**
     * Hand typed words under an open choice / confirm card to its
     * `onDirection` (2.512.0). True when the host took them (the input
     * clears); false — the words stay — on a refusal, an empty text, or a card
     * without `onDirection` (which shows what the card takes as its error).
     */
    answerDirection: (raw: string) => Promise<boolean>;
    /**
     * Confirm the active compose prompt with its edited message (2.482.0). The
     * host's `{ error }` comes back for the flow to show; ok leaves the prompt on
     * screen in its done state until `finish`.
     */
    answerCompose: (message: string) => Promise<ComposerConfirmResult>;
    /** The active prompt followed an answered question (`{ next }`), so `back` has somewhere to go. */
    isFollowUp: boolean;
    /** Return to the question the active follow-up came from. False when it is a root prompt. */
    back: () => boolean;
    /**
     * The card header's Back (2.510.0): the active prompt's own `back`, else a
     * follow-up's return to its question (not a compose follow-up: its flow
     * has that Back). Null when the card has none.
     */
    backControl: {
        label: string;
        disabledReason?: string;
    } | null;
    /**
     * Take the Back: the prompt's `onBack` (busy while it runs; a rejection is
     * the card's error), else `back()`. True when it ran.
     */
    goBack: () => Promise<boolean>;
    /** Drop the active prompt after its done state, with no receipt. */
    finish: () => void;
    dismissReceipt: () => void;
}

/** One prepopulated fact on the prompt's header card. */
export declare interface ComposerPromptField {
    label: string;
    value: ReactNode;
    /** Colours the value (a warning: "$4.10 left of $5.00"). */
    tone?: ComposerPromptTone;
    /** An identifier value (ids, repos): tabular figures in the body face, never monospace. */
    mono?: boolean;
}

/** The follow-up each answered prompt routed to (`{ next }`), by the answered prompt's id. */
export declare type ComposerPromptFollowUps = Readonly<Record<string, ComposerPrompt>>;

/** The composer input the deck reads and steers. */
export declare interface ComposerPromptInput {
    /** True when the input holds no text. */
    isEmpty: () => boolean;
    /** True when `node` is the input or inside it. */
    contains: (node: Node | null) => boolean;
    focus: () => void;
}

export declare type ComposerPromptKind = 'choice' | 'confirm' | 'text' | 'number' | 'compose';

/** One answer a prompt offers. Its position (1–9) is its default shortcut. */
export declare interface ComposerPromptOption {
    id: string;
    label: string;
    /** A short line under the label ("$0.40–$1.10 forecast"). */
    hint?: string;
    /** A single key that also picks it (default: its 1-based position). */
    shortcut?: string;
    /** Paints the option as the deciding action (`primary`) or a risky one (`danger`). */
    emphasis?: 'primary' | 'danger';
    /** Off, with why. */
    disabledReason?: string;
}

/**
 * What `onAnswer` resolves to. Nothing (or `{ receipt }`): answered — the prompt
 * drops off and the receipt (default: the answer's label) is announced. `{ error }`:
 * not answered — the error shows on the card and the prompt stays. `{ next }`
 * (2.482.0): answered, and the follow-up question takes the card in place with
 * no receipt (a choice that routes to a compose prompt); Back from the
 * follow-up returns to this question. A compose prompt's own result is
 * `{ receipt }` / `{ error }` only: ok shows its done state, error keeps it on
 * review.
 */
export declare type ComposerPromptResult = void | undefined | {
    error: string;
} | {
    receipt: string;
} | {
    next: ComposerPrompt;
};

export declare type ComposerPromptTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

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
    /** Chip type. `xs` (default) is the compact 12px chip of a chat composer (11px before 2.441.4); `sm` is the 12px chip of a docked editor card (2.377.0). */
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
export declare type ComposerToolbarPreset = 'full' | 'compact' | 'editor' | 'prompt' | 'prompt-card' | 'basic';

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

export declare const CONFIRM_OPTIONS: readonly ComposerPromptOption[];

export declare function ContextComposer(props: ContextComposerProps): JSX.Element;

export declare interface ContextComposerProps {
    /** What the composer is attached to. Decides modes, chip, and which features may render. */
    context: ComposerContext;
    /**
     * `document`: comfortable density, for a full-width page. Default `compact`.
     *
     * `prompt` (since 2.510.0): a quiet prompt box for a host whose composer
     * takes one instruction — the record (context chip) and any references in
     * one header row with `modeRowEnd`, the suggestion chips, the text box, and
     * one primary button showing `submitLabel` alone. Comfortable density;
     * `toolbar` defaults to `prompt` (attach only when allowed, then
     * `toolbarExtras`). No mode label, pill, picker, menu or `⌥n` badge in any
     * state, and no mode shortcuts or mode triggers: the mode stays what
     * `mode` / `defaultMode` says, so Enter still routes there. No `/ commands`
     * hint (typing `/` still opens the menu), and picking a command that has no
     * `argument` from that menu sends it at once — the draft is cleared and
     * `onSend` receives `{ text: trigger, command: { trigger } }` (in a
     * `ConversationComposer`, the command's `run` with empty `argumentText`),
     * so no command chip waits beside an empty box. Adding references never
     * changes the card's height. `data-presentation="prompt"` on the composer.
     */
    presentation?: 'compact' | 'document' | 'prompt';
    /**
     * The strip's preset, as `RichChatComposerProps.toolbar` (since 2.508.0).
     * Default `editor` (`prompt` under `presentation="prompt"`). `prompt` drops
     * every formatting control and keeps attach (when allowed), the divider
     * and the host's extras.
     */
    toolbar?: ComposerToolbarPreset;
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
    /** Inside the card, its first section (`RichChatComposer header`): a prompt deck. Forces the full card. Since 2.446.0. */
    header?: ReactNode;
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
    /** Offer an explicit collapse control. Keeps the editor, draft and files mounted;
     * a focus request reopens it. Prompt replacements keep their own controls. */
    collapsible?: boolean;
    /** Destination shown in the collapsed row (e.g. the selected conversation). */
    collapsedLabel?: string;
    /**
     * `pane` (since 2.431.0): the simplified responsive mode for a composer in
     * a side pane — one input row with a single mode · subject chip, icon-only
     * Send and a 1px focus border, chosen by the composer's own width (below
     * the wide breakpoint). See `RichChatComposerProps.responsive`.
     */
    responsive?: 'pane';
    /** An agent is mid-turn: the console drifts faster. */
    working?: boolean;
    /** Default true: Agent/Terminal paint the console surface. */
    console?: boolean;
    disabled?: boolean;
    /**
     * Read, not write (since 2.450.0): `RichChatComposer.readOnly` — the note
     * replaces the placeholder and every control is off — plus this
     * composer's Workflow ⌄, Share and reference removal. See there.
     */
    readOnly?: ReactNode;
    status?: ComposerStatus | null;
    suggestions?: readonly string[];
    onSuggestion?: (suggestion: string) => void;
    /** `RichChatComposerProps.suggestionsVisible` (since 2.508.0). Default `focused`. */
    suggestionsVisible?: 'focused' | 'empty';
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

/** The slice of realtime-modules `useChat(channel)` the composer sends and types through. */
export declare interface ConversationChat {
    sendMessage: (text: string, metadata?: Record<string, unknown>) => void;
    setTyping?: (typing: boolean) => void;
}

/** A slash command and its handler. */
export declare interface ConversationCommand {
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

/**
 * What a command handler is told. `argumentText` is what follows the trigger;
 * `argument` the item picked from its argument menu, when there was one.
 */
export declare interface ConversationCommandInput {
    trigger: string;
    text: string;
    argumentText: string;
    argument?: {
        id: string;
        label: string;
    };
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
export declare type ConversationCommandResult = boolean | string | void;

/** A transfer the gateway reports finished (realtime-modules `CompletedTransfer`, restated). */
export declare interface ConversationCompletedTransfer {
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

/** What the server decided this reader may do here. */
export declare interface ConversationComposerCapabilities {
    /** The reader may post to the conversation. Required; there is no default. */
    maySend: boolean;
    /** Why not, when `maySend` is false (the off Chat mode and its placeholder say it). */
    readOnlyReason?: string | null;
    /**
     * The server has not answered yet (since 2.450.0): `maySend` is a
     * placeholder `false`, not a verdict. Chat stays off but quiet — no
     * read-only note, no To: reason, no read-only look — so a loading page
     * never flashes "you cannot post". Omitted: `maySend` is the answer.
     */
    pending?: boolean;
    /**
     * Agent mode. Omitted: the composer has no Agent mode. `allowed` is the
     * server's per-subject answer (never a role-wide guess).
     */
    agent?: {
        allowed: boolean;
        reason?: string | null;
    } | null;
    /** Files may be attached. Missing means no. */
    mayAttach?: boolean;
}

export declare type ConversationComposerComponent = (props: ConversationComposerProps) => React.JSX.Element;

/** The realtime-modules hook the composer calls: `useFileUpload` from `/client`, as installed. */
export declare interface ConversationComposerModules {
    useFileUpload: (channel: string, options?: {
        displayName?: string;
        onComplete?: (transfer: ConversationCompletedTransfer) => void;
    }) => {
        upload: (file: File) => Promise<{
            status: string;
            transferId?: string;
            error?: string;
        }>;
    };
}

export declare interface ConversationComposerOwnProps {
    /** The conversation this composer writes to (its thread). Null: no thread (an agent-only search box). */
    channel: string | null;
    /** The host's `useChat(channel)` — one join per channel, shared with the thread. */
    chat?: ConversationChat | null;
    /** What the composer is attached to, and the page reference its Chat sends carry. */
    context: ComposerContext & {
        reference?: ConversationReference | null;
    };
    /** The server's answer for this reader. Required. */
    capabilities: ConversationComposerCapabilities;
    /** Who is writing: `displayName` is stamped on every message. */
    identity?: {
        userId: string;
        displayName: string;
    } | null;
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
    claim?: {
        label: string;
        replies?: boolean;
        enabled?: boolean;
    } | false;
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
     * Under `presentation="prompt"` (2.512.0) the editor stays: the card is the
     * composer's first section with plain answer buttons and no key hints, the
     * input answers a text / number card, and words typed under a choice /
     * confirm card go to its `onDirection` (a compose prompt still replaces).
     */
    prompts?: readonly ComposerPrompt[];
    /**
     * The context the composer is in (a page/section/record key). Prompts
     * scoped elsewhere are dropped and a change resets the deck. Since 2.504.0.
     */
    promptScope?: string | null;
}

export declare type ConversationComposerProps = ConversationComposerOwnProps & Omit<ContextComposerProps, Owned>;

/** One registry for everything under it: claims, thread hand-offs and focus requests. */
export declare function ConversationInputProvider({ children }: {
    children: ReactNode;
}): JSX.Element;

/** What a Chat send hands a recipient. */
export declare interface ConversationOutgoing {
    text: string;
    html: string;
    /** Files staged in the draft, before upload (a recipient with its own `send` uploads them itself). */
    files: readonly File[];
    /** Metadata for `chat.sendMessage`: displayName, replyTo, pageReference and the uploaded attachments. */
    metadata: Record<string, unknown>;
    /** The page reference the draft still carries, or null. */
    reference: ConversationReference | null;
}

/** A To: destination. The first one is the default unless `defaultRecipient` names another. */
export declare interface ConversationRecipient {
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

/** The page the draft is about — a chip in the card, carried as `{kind,id}` only. */
export declare interface ConversationReference {
    /** Stable id of the chip. */
    id: string;
    /** Composed by the host from what THIS viewer may see ("Org › Initiatives › Auth Migration"). */
    label: string;
    /** What a Chat send stores (`metadata.pageReference`); titles never travel. Null: display only. */
    page?: {
        kind: string;
        id: string;
    } | null;
}

/** A pending quote-reply, from the thread beside the composer. */
export declare interface ConversationReply {
    reply: {
        messageId: string;
        author: string;
        text: string;
        timestamp?: string;
    } | null;
    clear: () => void;
}

/** Bind the composer to the installed realtime-modules `useFileUpload`. Call once, at module scope. */
export declare function createConversationComposer(rm: ConversationComposerModules): ConversationComposerComponent;

/** Where a path stands: its labels and the 0-based current step. */
declare interface DecisionPathState {
    steps: readonly string[];
    /** 0-based; steps before it are complete. Past the end: every step is complete. */
    current: number;
}

declare interface DeckKey {
    key: string;
    altKey?: boolean;
    ctrlKey?: boolean;
    metaKey?: boolean;
    shiftKey?: boolean;
    /** The physical key (`Digit2`): macOS Alt+2 types a symbol, so Alt reads this. */
    code?: string;
}

declare type DeckKeyAction = {
    type: 'pick';
    optionId: string;
} | {
    type: 'default';
    optionId: string;
} | {
    type: 'page';
    delta: 1 | -1;
} | {
    type: 'back';
} | {
    type: 'collapse';
} | {
    type: 'expand';
} | null;

/**
 * What a key does to the deck. `inputEmpty` is the composer's input; `inDeck`
 * is focus inside the deck itself (a button). Anything that returns null is
 * the composer's own key: typing, sending, its menus.
 */
export declare function deckKeyAction(event: DeckKey, state: {
    prompt: ComposerPrompt | null;
    collapsed: boolean;
    inputEmpty: boolean;
    inDeck: boolean;
    busy: boolean;
    /** The card shows an enabled Back (2.510.0). */
    canBack?: boolean;
}): DeckKeyAction;

/** The option Enter picks on an empty input, if any. */
export declare function defaultOption(prompt: ComposerPrompt): ComposerPromptOption | null;

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

declare type Owned = 'context' | 'modes' | 'disabledModes' | 'modeUnavailableReasons' | 'chatAvailable' | 'agentUnavailableReason' | 'onSend' | 'commands' | 'onCommand' | 'dock' | 'reply' | 'allowAttachments' | 'responsive' | 'mode' | 'onModeChange' | 'draftKey' | 'disabled' | 'readOnly';

/**
 * Whether a key pressed with focus on `target` may reach a `keypad: 'page'`
 * card from outside the deck: anything but an editable field (input,
 * textarea, select, contenteditable) or a control inside another dialog,
 * menu or listbox — those keep their own keys. The document and body (focus
 * after a click on plain content) qualify.
 */
export declare function pageKeypadTarget(target: EventTarget | null): boolean;

/** A typed answer, checked: the answer, or why it is not one. */
export declare function parseTypedAnswer(prompt: ComposerPrompt, raw: string): {
    answer: ComposerPromptAnswer;
} | {
    error: string;
};

/** The options a prompt offers, with confirm's defaults filled in. */
export declare function promptOptions(prompt: ComposerPrompt): readonly ComposerPromptOption[];

/** The prompts that belong to `scope`: unscoped prompts, and prompts scoped to it. Without a scope, all. */
export declare function promptsInScope(prompts: readonly ComposerPrompt[], scope: string | null | undefined): readonly ComposerPrompt[];

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
     * A command with no `argument` picked from the `/` menu (click or Enter)
     * runs at once instead of being written into the draft (since 2.510.0):
     * the draft is cleared, then this is called. A thrown or rejected
     * `ComposerSendError` shows in the send-error line, like a refused send.
     * Commands that take an argument still write their trigger and open the
     * argument menu. Absent, every pick writes its trigger (the default).
     * `ContextComposer presentation="prompt"` wires it to `onSend`.
     */
    onCommandPick?: (command: ComposerCommand) => void | boolean | Promise<void | boolean>;
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
     * The reader may read here but not write (since 2.450.0): the whole
     * composer says so, not only Send. The editor is not editable or focusable
     * (`aria-readonly`), the placeholder is replaced by this line (a lock and
     * the note; `true` says "Read only"), every format button, the `/ commands`
     * hint, attachments and the `toolbarExtras` host menus are off in muted
     * ink, and the mode menu is off unless another mode is on (it is then the
     * way out, like a To: selector). The root carries `data-composer-readonly`.
     * Unlike `disabled` (a quiet pause: offline, loading) it is a verdict.
     */
    readOnly?: ReactNode;
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
     *   and numbered lists, quote and strikethrough are omitted. Docks like
     *   `editor` under `modeControl="menu"`, with
     *   the mode as a boxed picker ("Agent ⌄", no glyph), the input in its own
     *   bordered well and no rule over the strip — the Initiatives mockup.
     *
     * - `prompt` (2.508.0): a box for one instruction, not a document — no
     *   formatting controls at all. The strip is attach (only when
     *   `allowAttachments`), then the divider, then `toolbarExtras`; with
     *   neither there is no strip, only Send. Bold and italic keyboard
     *   shortcuts still work in the input. The `?` menu holds keyboard hints
     *   only (no "Formatting" section), and below wide the `Aa` toggle becomes
     *   "Show tools" and appears only when the strip has something to show.
     *   Docks like `basic` under `modeControl="menu"`: boxed mode picker,
     *   bordered input well, labelled Send.
     *
     * - `prompt-card` (2.389.11, named `prompt` until 2.508.0): the docked
     *   mockup card with `/ Commands`, `# Context`, the host's extras,
     *   "Return to send" and a round icon Send. Under any other `modeControl`
     *   it falls back to `prompt`.
     *
     * In docked mode, the mode menu contains modes, host actions and keyboard
     * hints only; formatting belongs on the editor's toolbar.
     * Sizes are unchanged in all of them: every control is the same 28px box.
     * Below wide the strip folds exactly as before, whichever preset is set.
     */
    toolbar?: ComposerToolbarPreset;
    /**
     * `prompt` (since 2.510.0): the docked card as a quiet prompt box — the
     * header row holds the references (left) and `modeRowEnd` (right) and keeps
     * one height whether or not there are references; then the suggestion
     * chips, the input (no bordered well), and the strip with attach, the
     * host's extras and Send showing `submitLabel` alone (no paper plane, no
     * arrow). No mode label, pill, picker, menu or `⌥n` badge in any state
     * (the mode is still `mode` and Enter still sends in it), and no
     * `/ commands` hint (typing `/` still opens the menu). Sets
     * `data-presentation="prompt"` on the root. `ContextComposer
     * presentation="prompt"` sets it. Default `card` (unchanged).
     */
    presentation?: 'card' | 'prompt';
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
    /**
     * When the wide chip row shows (2.508.0). `focused` (default): while the
     * input is empty and focused, as described at `suggestions`. `empty`: while
     * the input is empty, focused or not — the page's quick actions visible at
     * rest. Either way never on the one-row idle composer (`collapseWhenIdle`
     * folded), and below wide they stay in the `?` menu.
     */
    suggestionsVisible?: 'focused' | 'empty';
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
     * `pane` (since 2.431.0): a simplified responsive mode for a composer in a
     * side pane beside a page (a conversation pane in a four-column shell).
     * Chosen by the composer's OWN measured width, never the viewport: below
     * the `wide` breakpoint (`COMPOSER_BREAKPOINTS.wide`) the card is ONE input
     * row — the mode and the draft's first reference folded into a single
     * small leading chip ("Chat · Observability Platform", truncated in the
     * middle, its × on hover or focus; the mode switch is the chip's menu),
     * an icon-only Send, and a 1px focus border instead of the 2px ring. `Aa`,
     * `?`, `⋯` and `modeRowEnd` appear only while focus is inside, on a second
     * row at most. Wide, nothing changes. Default: off.
     */
    responsive?: 'pane';
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
     * The card's first section, above everything else inside the composer's
     * border — a `ComposerPromptDeck` (`variant="inset"`): the question and its
     * answers sit in the same card as the input that answers them. Since 2.446.0.
     */
    header?: ReactNode;
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

/** Whether typed words under this card are a direction for the host (`onDirection`): a choice / confirm card that takes one. */
export declare function takesDirection(prompt: ComposerPrompt | null | undefined): boolean;

/** Whether the composer's input carries a typed answer for this prompt. */
export declare function takesTypedAnswer(prompt: ComposerPrompt | null | undefined): boolean;

export declare type ThreadInput = ThreadInputOwner & {
    /** The thread's send intent: the claiming composer takes the caret. False when none claims it. */
    focus(reply?: boolean): boolean;
};

/**
 * Where a thread's own input would be when a composer elsewhere on the page
 * owns it: one button naming that composer, which puts the caret there. Not an
 * input — one per conversation.
 */
export declare function ThreadInputHandoff({ label, onFocus, 'data-testid': testId }: ThreadInputHandoffProps): JSX.Element;

export declare interface ThreadInputHandoffProps {
    /** The composer that owns this conversation's input ("the document composer"). */
    label: string;
    onFocus(): void;
    'data-testid'?: string;
}

/** Who owns the input for a thread bound to one channel. */
export declare type ThreadInputOwner = {
    readonly owner: 'thread';
} | {
    readonly owner: 'composer';
    readonly claimId: number;
    readonly label: string;
    readonly replies: boolean;
};

/** `request(…)`: true when a mounted composer took it; `present`: is one mounted to take it. */
export declare function useComposerFocus(): {
    request(request: ComposerFocusRequest): boolean;
    present: boolean;
};

/** Bring a surface on screen before any composer answers (a collapsed side pane). */
export declare function useComposerFocusReveal(revealer: (request: ComposerFocusRequest) => void, enabled?: boolean): void;

export declare function useComposerPromptDeck(prompts: readonly ComposerPrompt[] | null | undefined, options?: ComposerPromptDeckOptions): ComposerPromptDeckState;

/** Uploads files to `channel` through the gateway and resolves each once the gateway says it landed. */
export declare function useConversationUploads(rm: ConversationComposerModules, channel: string | null, displayName: string, timeoutMs?: number): (files: readonly File[]) => Promise<ChatAttachmentDescriptor[]>;

/** Who owns the input for the thread bound to `channel`. */
export declare function useThreadInput(channel: string | null | undefined): ThreadInput;

export { }


declare global {
    interface Window {
        /** Dev-only imperative canvas bridge — see `DevEditorBridge` above. */
        __pipelineEditor?: unknown;
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
        attachmentMacro: {
            /** Inserts a file card at the selection. Requires `name` and `url`. */
            insertAttachment: (draft: AttachmentDraft) => ReturnType;
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
        decisionMacro: {
            /** Inserts a decision record at the selection. */
            insertDecision: (draft: DecisionDraft) => ReturnType;
        };
    }
}


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
        fieldMacro: {
            /** Inserts a typed field at the selection. */
            insertField: (draft: FieldDraft) => ReturnType;
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
