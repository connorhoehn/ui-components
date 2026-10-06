import type { ComposedMessage, ComposerCommand, ComposerHint, ComposerMode, ComposerStatus, DocumentCandidate, MentionCandidate, RichChatComposerHandle, RichChatComposerProps, RichChatDraft } from './RichChatComposer';
import type { ReactNode, Ref } from 'react';
import type { ComposerReference } from './ComposerReferences';
/** One row of the `Workflow ⌄` menu. A disabled row shows its reason and cannot be picked. */
export interface AgentComposerWorkflow {
    /** Seeds the draft as `/<id> ` by default — match a `commands` trigger. */
    id: string;
    label: string;
    /** Second line of the row. */
    description?: string;
    disabled?: boolean;
    /** Second line and tooltip of a disabled row. */
    disabledReason?: string;
}
export interface AgentComposerSendContext {
    /** The mode the message was composed in. */
    mode: ComposerMode;
}
export interface AgentComposerDockProps {
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
export type { DocumentCandidate, MentionCandidate };
/**
 * @deprecated Since 2.407.0 — use `ContextComposer` with
 * `context={{ kind: 'initiative' | 'search', id, title }}`. Kept as a preset
 * over it with the same props, look and test ids.
 */
export declare function AgentComposerDock({ presentation, defaultMode, modes, disabledModes: disabledModesProp, modeUnavailableReasons, draftKey, allowAttachments, allowEmoji, label, className, 'data-testid': testId, onSend, ...rest }: AgentComposerDockProps): import("react").JSX.Element;
export default AgentComposerDock;
//# sourceMappingURL=AgentComposerDock.d.ts.map