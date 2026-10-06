import { type ReactNode, type Ref } from 'react';
import { type DropdownMenuSection } from '../shared/DropdownMenu';
import { type AgentTaskStatus } from '../shared/TaskStrip';
import { type ComposedMessage, type ComposerCommand, type ComposerHint, type ComposerMode, type ComposerProcess, type ComposerSendOption, type ComposerStatus, type ComposerToolbarPreset, type MentionCandidate, type RichChatComposerHandle, type RichChatComposerProps, type RichChatDraft } from './RichChatComposer';
import type { ComposerArgumentItem } from './composerCommands';
import type { ComposerReference } from './ComposerReferences';
import { type ComposerContext, type ComposerContextPreset, type ComposerIdentity } from './composerContext';
/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export interface ComposerWorkflow {
    /** The pick's identity: `/<id> ` or the `/workflow` argument's id. */
    id: string;
    label: string;
    /** Second line of the row. */
    description?: string;
    disabled?: boolean;
    /** Second line and tooltip of a disabled row. */
    disabledReason?: string;
}
/** The message being replied to — drawn as a `QuoteBlock` above the row. */
export interface ComposerReply {
    author: string;
    /** Plain text of the original (excerpted for display). */
    quote: string;
    messageId?: string;
    /** ISO timestamp of the original. */
    timestamp?: string;
    onDismiss?: () => void;
    onJump?: (messageId: string) => void;
}
/** A task in flight, drawn as the `TaskStrip` joined to the composer. */
export interface ComposerTaskReport {
    label: string;
    status: AgentTaskStatus;
    phase?: string;
    percent?: number;
    onOpen?: () => void;
    onStop?: () => void;
    onDismiss?: () => void;
}
export interface ContextComposerSendContext {
    /** The mode the message was composed in. */
    mode: ComposerMode;
    /** What the composer is attached to. */
    context: ComposerContext;
    /** The sender's name from `identity` (displayName first). */
    author?: string;
}
export interface ContextComposerProps {
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
/**
 * The fixed look, and the preset as resolved — what `ContextComposer`
 * computes and the deprecated `AgentComposerDock` supplies itself. Internal.
 */
export interface ContextComposerLook {
    preset: ComposerContextPreset;
    toolbar: ComposerToolbarPreset;
    density: 'comfortable' | 'compact';
    collapseWhenIdle: boolean;
    /** Pass `modes` to the composer (false: undefined → every mode). */
    passModes: boolean;
    /** One offered mode renders as a static label, not a one-item menu. */
    singleModeLabel?: boolean;
    className?: string;
}
export declare function ContextComposer(props: ContextComposerProps): import("react").JSX.Element;
/** Internal: the composite with its look supplied. Not exported from any barrel. */
export declare function ContextComposerBase({ look, context, mode: modeProp, defaultMode, onModeChange, modes: modesProp, disabledModes: disabledModesProp, modeUnavailableReasons, placeholder, modePlaceholders, modeHints, hints, submitLabel, contextChip, onRemoveContext, references, onRemoveReference, commands, onCommand, workflows, onWorkflow, workflowSubmitLabel, onSearchPeople, mentionMembers, onMentionNonMember, onSearchDocuments, documentMenu, allowAttachments, allowEmoji, onRequestLink, privacy, onPrivacyChange, privacyLabels, sendOptions, onSendOption, onShareDocument, shareDocumentTestId, offline, onMakeDeck, makeDeckLabel, makeDeckTestId, moreActions, moreActionsLabel, dock, above, strip, task, reply, replacement, modelUnavailable, toolbarExtras, submitLead, modeRowEnd, modeRowStart, sendWithReferencesOnly, referencesAction, referenceDrop, processes, onQuickOpen, onShellCommand, draft: draftProp, onDraftChange, defaultDraft, draftKey: draftKeyProp, onSend, identity, expanded, working, console: consoleOn, disabled, status, suggestions, onSuggestion, maxInputHeight, composerRef, label, inputLabel, className, 'data-testid': testId, composerTestId, }: ContextComposerProps & {
    look: ContextComposerLook;
}): import("react").JSX.Element;
export type { ComposerContext, ComposerContextPreset, ComposerIdentity };
export default ContextComposer;
//# sourceMappingURL=ContextComposer.d.ts.map